const XLSX = require('xlsx');
const fs = require('fs');

console.log('📊 Creating sample Excel files for testing...\n');

// Sample 1: Sales Data
const salesData = [
    ['Date', 'Product', 'Category', 'Sales', 'Quantity', 'Price', 'Region'],
    ['2024-01-01', 'Laptop', 'Electronics', 1200, 2, 600, 'North'],
    ['2024-01-02', 'Mouse', 'Electronics', 50, 10, 5, 'South'],
    ['2024-01-03', 'Keyboard', 'Electronics', 150, 5, 30, 'East'],
    ['2024-01-04', 'Monitor', 'Electronics', 800, 1, 800, 'West'],
    ['2024-01-05', 'Headphones', 'Electronics', 200, 4, 50, 'North'],
    ['2024-01-06', 'Tablet', 'Electronics', 600, 1, 600, 'South'],
    ['2024-01-07', 'Phone', 'Electronics', 800, 2, 400, 'East'],
    ['2024-01-08', 'Speaker', 'Electronics', 100, 2, 50, 'West'],
    ['2024-01-09', 'Camera', 'Electronics', 450, 1, 450, 'North'],
    ['2024-01-10', 'Printer', 'Electronics', 300, 1, 300, 'South']
];

// Sample 2: Employee Data
const employeeData = [
    ['ID', 'Name', 'Department', 'Salary', 'Age', 'Experience', 'Performance'],
    [1, 'John Smith', 'Engineering', 75000, 28, 5, 85],
    [2, 'Sarah Johnson', 'Marketing', 65000, 32, 8, 92],
    [3, 'Mike Davis', 'Sales', 55000, 25, 3, 78],
    [4, 'Lisa Wilson', 'HR', 60000, 29, 6, 88],
    [5, 'David Brown', 'Engineering', 80000, 35, 10, 95],
    [6, 'Emily Taylor', 'Marketing', 70000, 27, 4, 82],
    [7, 'James Anderson', 'Sales', 60000, 31, 7, 89],
    [8, 'Amanda White', 'HR', 65000, 33, 9, 91],
    [9, 'Robert Garcia', 'Engineering', 85000, 38, 12, 96],
    [10, 'Jennifer Lee', 'Marketing', 72000, 26, 5, 87]
];

// Sample 3: Survey Data
const surveyData = [
    ['Respondent', 'Age', 'Gender', 'Education', 'Income', 'Satisfaction', 'Recommendation'],
    [1, 25, 'Male', 'Bachelor\'s', 45000, 4, 'Yes'],
    [2, 32, 'Female', 'Master\'s', 65000, 5, 'Yes'],
    [3, 28, 'Male', 'High School', 35000, 3, 'No'],
    [4, 45, 'Female', 'PhD', 85000, 5, 'Yes'],
    [5, 22, 'Male', 'Bachelor\'s', 40000, 4, 'Yes'],
    [6, 38, 'Female', 'Master\'s', 70000, 4, 'Yes'],
    [7, 29, 'Male', 'Bachelor\'s', 50000, 3, 'No'],
    [8, 41, 'Female', 'High School', 30000, 2, 'No'],
    [9, 26, 'Male', 'Master\'s', 60000, 5, 'Yes'],
    [10, 35, 'Female', 'Bachelor\'s', 55000, 4, 'Yes']
];

// Create workbook with multiple sheets
function createWorkbook(data, sheetName) {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    return wb;
}

// Create sample files
try {
    // Sales Data
    const salesWb = createWorkbook(salesData, 'Sales');
    XLSX.writeFile(salesWb, 'sample-sales-data.xlsx');
    console.log('✅ Created: sample-sales-data.xlsx');

    // Employee Data
    const employeeWb = createWorkbook(employeeData, 'Employees');
    XLSX.writeFile(employeeWb, 'sample-employee-data.xlsx');
    console.log('✅ Created: sample-employee-data.xlsx');

    // Survey Data
    const surveyWb = createWorkbook(surveyData, 'Survey');
    XLSX.writeFile(surveyWb, 'sample-survey-data.xlsx');
    console.log('✅ Created: sample-survey-data.xlsx');

    // Multi-sheet workbook
    const multiWb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(multiWb, XLSX.utils.aoa_to_sheet(salesData), 'Sales');
    XLSX.utils.book_append_sheet(multiWb, XLSX.utils.aoa_to_sheet(employeeData), 'Employees');
    XLSX.utils.book_append_sheet(multiWb, XLSX.utils.aoa_to_sheet(surveyData), 'Survey');
    XLSX.writeFile(multiWb, 'sample-multi-sheet-data.xlsx');
    console.log('✅ Created: sample-multi-sheet-data.xlsx');

    console.log('\n🎉 All sample files created successfully!');
    console.log('\n📋 Testing Instructions:');
    console.log('1. Go to http://localhost:3000');
    console.log('2. Register a new account');
    console.log('3. Upload these sample files');
    console.log('4. Test the analytics features');
    
} catch (error) {
    console.error('❌ Error creating sample files:', error.message);
} 