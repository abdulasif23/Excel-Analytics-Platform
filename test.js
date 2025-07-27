// Simple test script to verify the Excel Analytics Platform setup
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Excel Analytics Platform Setup...\n');

// Check if required files exist
const requiredFiles = [
    'package.json',
    'server.js',
    'public/index.html',
    'public/styles.css',
    'public/app.js',
    'README.md',
    'env.example',
    '.gitignore'
];

console.log('📁 Checking required files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
});

// Check if public directory exists
const publicExists = fs.existsSync('public');
console.log(`  ${publicExists ? '✅' : '❌'} public/ directory`);

// Check if uploads directory exists (will be created automatically)
const uploadsExists = fs.existsSync('uploads');
console.log(`  ${uploadsExists ? '✅' : '⚠️'} uploads/ directory (will be created automatically)`);

// Check package.json for required dependencies
console.log('\n📦 Checking package.json dependencies:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = [
        'express', 'multer', 'xlsx', 'cors', 'helmet', 'compression',
        'morgan', 'dotenv', 'bcryptjs', 'jsonwebtoken', 'sqlite3', 'uuid'
    ];
    
    let allDepsExist = true;
    requiredDeps.forEach(dep => {
        const exists = packageJson.dependencies && packageJson.dependencies[dep];
        console.log(`  ${exists ? '✅' : '❌'} ${dep}`);
        if (!exists) allDepsExist = false;
    });
    
    console.log(`\n📋 Summary:`);
    console.log(`  Files: ${allFilesExist ? '✅ All present' : '❌ Missing files'}`);
    console.log(`  Dependencies: ${allDepsExist ? '✅ All present' : '❌ Missing dependencies'}`);
    
    if (allFilesExist && allDepsExist) {
        console.log('\n🎉 Setup looks good! You can now run:');
        console.log('   npm install');
        console.log('   cp env.example .env');
        console.log('   npm run dev');
        console.log('\nThen visit http://localhost:3000 to access the application.');
    } else {
        console.log('\n⚠️  Some files or dependencies are missing. Please check the setup.');
    }
    
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
}

// Check for common issues
console.log('\n🔍 Additional checks:');
console.log('  ⚠️  Make sure to create a .env file from env.example');
console.log('  ⚠️  Ensure Node.js version 14+ is installed');
console.log('  ⚠️  Check that port 3000 is available');

console.log('\n📚 For more information, see README.md'); 