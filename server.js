const express = require('express');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./analytics.db');

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Files table
  db.run(`CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Analytics table
  db.run(`CREATE TABLE IF NOT EXISTS analytics (
    id TEXT PRIMARY KEY,
    file_id TEXT NOT NULL,
    analysis_type TEXT NOT NULL,
    results TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (file_id) REFERENCES files (id)
  )`);
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only Excel and CSV files are allowed.'));
    }
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    db.run(
      'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)',
      [userId, username, email, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Username or email already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }

        const token = jwt.sign(
          { id: userId, username },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: { id: userId, username, email }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    }
  );
});

// File upload
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileId = uuidv4();
    const { originalname, filename, size } = req.file;

    db.run(
      'INSERT INTO files (id, user_id, filename, original_name, file_size) VALUES (?, ?, ?, ?, ?)',
      [fileId, req.user.id, filename, originalname, size],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
          message: 'File uploaded successfully',
          file: {
            id: fileId,
            originalName: originalname,
            size: size,
            uploadDate: new Date().toISOString()
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user files
app.get('/api/files', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM files WHERE user_id = ? ORDER BY upload_date DESC',
    [req.user.id],
    (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(files);
    }
  );
});

// Parse Excel file
app.post('/api/parse/:fileId', authenticateToken, (req, res) => {
  const { fileId } = req.params;

  db.get(
    'SELECT * FROM files WHERE id = ? AND user_id = ?',
    [fileId, req.user.id],
    (err, file) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = path.join(__dirname, 'uploads', file.filename);

      try {
        const workbook = XLSX.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        const sheets = {};

        sheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          sheets[sheetName] = jsonData;
        });

        res.json({
          message: 'File parsed successfully',
          data: sheets,
          sheetNames: sheetNames
        });
      } catch (error) {
        res.status(500).json({ error: 'Error parsing file' });
      }
    }
  );
});

// Basic analytics
app.post('/api/analytics/:fileId', authenticateToken, (req, res) => {
  const { fileId } = req.params;
  const { sheetName, columnName } = req.body;

  db.get(
    'SELECT * FROM files WHERE id = ? AND user_id = ?',
    [fileId, req.user.id],
    (err, file) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = path.join(__dirname, 'uploads', file.filename);

      try {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          return res.status(400).json({ error: 'No data found in sheet' });
        }

        // Basic statistics
        const columnData = jsonData.map(row => row[columnName]).filter(val => val !== undefined);
        const numericData = columnData.filter(val => !isNaN(val) && val !== null);

        const analytics = {
          totalRows: jsonData.length,
          totalValues: columnData.length,
          numericValues: numericData.length,
          min: numericData.length > 0 ? Math.min(...numericData) : null,
          max: numericData.length > 0 ? Math.max(...numericData) : null,
          sum: numericData.length > 0 ? numericData.reduce((a, b) => a + b, 0) : null,
          average: numericData.length > 0 ? numericData.reduce((a, b) => a + b, 0) / numericData.length : null,
          uniqueValues: [...new Set(columnData)].length
        };

        // Save analytics to database
        const analyticsId = uuidv4();
        db.run(
          'INSERT INTO analytics (id, file_id, analysis_type, results) VALUES (?, ?, ?, ?)',
          [analyticsId, fileId, 'basic_stats', JSON.stringify(analytics)],
          function(err) {
            if (err) {
              console.error('Error saving analytics:', err);
            }
          }
        );

        res.json({
          message: 'Analytics generated successfully',
          analytics: analytics,
          data: jsonData.slice(0, 100) // Return first 100 rows for preview
        });
      } catch (error) {
        res.status(500).json({ error: 'Error analyzing file' });
      }
    }
  );
});

// Get analytics history
app.get('/api/analytics/:fileId', authenticateToken, (req, res) => {
  const { fileId } = req.params;

  db.all(
    'SELECT * FROM analytics WHERE file_id = ? ORDER BY created_at DESC',
    [fileId],
    (err, analytics) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(analytics);
    }
  );
});

// Serve the main application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Excel Analytics Platform running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
}); 