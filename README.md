# Excel Analytics Platform

A modern, web-based platform for uploading, analyzing, and visualizing Excel data with powerful analytics tools and beautiful visualizations.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **File Upload**: Drag-and-drop Excel file upload with support for .xlsx, .xls, and .csv files
- **Data Parsing**: Automatic parsing of Excel files with multi-sheet support
- **Data Preview**: Interactive table view of uploaded data
- **Analytics Tools**: 
  - Basic statistical analysis (min, max, average, sum, count)
  - Data distribution analysis
  - Unique value counting
- **Data Visualization**: 
  - Interactive charts using Chart.js
  - Histograms for numerical data
  - Pie charts for categorical data
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Processing**: Fast data analysis with immediate results
- **File Management**: Organize and manage uploaded files

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **Multer** - File upload handling
- **XLSX** - Excel file parsing
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Inter Font** - Typography
- **CSS Grid & Flexbox** - Modern layout

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd excel-analytics-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📖 Usage Guide

### 1. Getting Started
- Visit the application homepage
- Click "Get Started" or "Register" to create an account
- Fill in your username, email, and password
- Log in to access your dashboard

### 2. Uploading Files
- In the dashboard, you'll see the file upload area
- Drag and drop your Excel file or click "Choose File"
- Supported formats: `.xlsx`, `.xls`, `.csv`
- Maximum file size: 50MB

### 3. Analyzing Data
- Click on any uploaded file to start analysis
- Select the sheet you want to analyze
- View the data preview table
- Choose a column for analysis
- Click "Analyze Column" to generate insights

### 4. Viewing Results
- **Basic Statistics**: Total rows, values, unique counts, min/max/average for numerical data
- **Visualizations**: 
  - Histograms for numerical data showing distribution
  - Pie charts for categorical data showing proportions
- **Data Preview**: First 10 rows of your data in a table format

## 🏗️ Project Structure

```
excel-analytics-platform/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── app.js            # Frontend JavaScript
├── uploads/               # File upload directory (auto-created)
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
├── env.example           # Environment variables template
├── analytics.db          # SQLite database (auto-created)
└── README.md            # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### File Management
- `POST /api/upload` - Upload Excel file
- `GET /api/files` - Get user's files
- `POST /api/parse/:fileId` - Parse Excel file

### Analytics
- `POST /api/analytics/:fileId` - Generate analytics for a column
- `GET /api/analytics/:fileId` - Get analytics history

## 🎨 Customization

### Styling
The application uses a modern design system with:
- CSS custom properties for colors
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first approach

### Adding New Analytics
To add new analytics features:
1. Extend the analytics endpoint in `server.js`
2. Add new visualization types in `app.js`
3. Update the UI components in `index.html`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **File Validation**: Type and size validation for uploads
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet.js**: Security headers
- **Input Sanitization**: Protection against malicious input

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in your `.env` file
   - Kill the process using the port

2. **File upload fails**
   - Check file size (max 50MB)
   - Ensure file is .xlsx, .xls, or .csv format
   - Verify uploads directory exists

3. **Database errors**
   - Delete `analytics.db` file to reset
   - Check file permissions

4. **Authentication issues**
   - Clear browser localStorage
   - Check JWT_SECRET in .env file

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

## 🔮 Future Enhancements

- [ ] Advanced analytics (correlation, regression)
- [ ] Export functionality (PDF, Excel)
- [ ] Data filtering and sorting
- [ ] Multiple chart types
- [ ] Real-time collaboration
- [ ] API rate limiting
- [ ] User roles and permissions
- [ ] Data backup and restore 