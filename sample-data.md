# Sample Data for Testing

To test the Excel Analytics Platform, you can create sample Excel files with the following data structures:

## Sample 1: Sales Data

Create an Excel file named `sales-data.xlsx` with the following columns:

| Date | Product | Category | Sales | Quantity | Price | Region |
|------|---------|----------|-------|----------|-------|--------|
| 2024-01-01 | Laptop | Electronics | 1200 | 2 | 600 | North |
| 2024-01-02 | Mouse | Electronics | 50 | 10 | 5 | South |
| 2024-01-03 | Keyboard | Electronics | 150 | 5 | 30 | East |
| 2024-01-04 | Monitor | Electronics | 800 | 1 | 800 | West |
| 2024-01-05 | Headphones | Electronics | 200 | 4 | 50 | North |
| 2024-01-06 | Tablet | Electronics | 600 | 1 | 600 | South |
| 2024-01-07 | Phone | Electronics | 800 | 2 | 400 | East |
| 2024-01-08 | Speaker | Electronics | 100 | 2 | 50 | West |
| 2024-01-09 | Camera | Electronics | 450 | 1 | 450 | North |
| 2024-01-10 | Printer | Electronics | 300 | 1 | 300 | South |

## Sample 2: Employee Data

Create an Excel file named `employee-data.xlsx` with the following columns:

| ID | Name | Department | Salary | Age | Experience | Performance |
|----|------|------------|--------|-----|------------|-------------|
| 1 | John Smith | Engineering | 75000 | 28 | 5 | 85 |
| 2 | Sarah Johnson | Marketing | 65000 | 32 | 8 | 92 |
| 3 | Mike Davis | Sales | 55000 | 25 | 3 | 78 |
| 4 | Lisa Wilson | HR | 60000 | 29 | 6 | 88 |
| 5 | David Brown | Engineering | 80000 | 35 | 10 | 95 |
| 6 | Emily Taylor | Marketing | 70000 | 27 | 4 | 82 |
| 7 | James Anderson | Sales | 60000 | 31 | 7 | 89 |
| 8 | Amanda White | HR | 65000 | 33 | 9 | 91 |
| 9 | Robert Garcia | Engineering | 85000 | 38 | 12 | 96 |
| 10 | Jennifer Lee | Marketing | 72000 | 26 | 5 | 87 |

## Sample 3: Survey Data

Create an Excel file named `survey-data.xlsx` with the following columns:

| Respondent | Age | Gender | Education | Income | Satisfaction | Recommendation |
|------------|-----|--------|-----------|--------|--------------|----------------|
| 1 | 25 | Male | Bachelor's | 45000 | 4 | Yes |
| 2 | 32 | Female | Master's | 65000 | 5 | Yes |
| 3 | 28 | Male | High School | 35000 | 3 | No |
| 4 | 45 | Female | PhD | 85000 | 5 | Yes |
| 5 | 22 | Male | Bachelor's | 40000 | 4 | Yes |
| 6 | 38 | Female | Master's | 70000 | 4 | Yes |
| 7 | 29 | Male | Bachelor's | 50000 | 3 | No |
| 8 | 41 | Female | High School | 30000 | 2 | No |
| 9 | 26 | Male | Master's | 60000 | 5 | Yes |
| 10 | 35 | Female | Bachelor's | 55000 | 4 | Yes |

## How to Create These Files

1. **Using Microsoft Excel:**
   - Open Excel
   - Enter the data in the format shown above
   - Save as `.xlsx` format

2. **Using Google Sheets:**
   - Open Google Sheets
   - Enter the data
   - File → Download → Microsoft Excel (.xlsx)

3. **Using LibreOffice Calc:**
   - Open LibreOffice Calc
   - Enter the data
   - File → Save As → Excel 2007-365 (.xlsx)

## Testing Scenarios

### Numerical Analysis
- **Sales Data**: Analyze the "Sales", "Quantity", and "Price" columns
- **Employee Data**: Analyze the "Salary", "Age", "Experience", and "Performance" columns
- **Survey Data**: Analyze the "Age", "Income", and "Satisfaction" columns

### Categorical Analysis
- **Sales Data**: Analyze the "Product", "Category", and "Region" columns
- **Employee Data**: Analyze the "Department" column
- **Survey Data**: Analyze the "Gender", "Education", and "Recommendation" columns

### Mixed Data Analysis
- Test with columns that contain both text and numbers
- Test with empty cells and null values
- Test with special characters and long text

## Expected Results

### For Numerical Columns:
- Total rows count
- Total values count
- Minimum and maximum values
- Average (mean)
- Sum
- Histogram visualization

### For Categorical Columns:
- Total rows count
- Total values count
- Unique values count
- Pie chart visualization showing distribution

## Tips for Testing

1. **Start with small datasets** (10-20 rows) for quick testing
2. **Test with different data types** (numbers, text, dates)
3. **Test edge cases** (empty cells, very large numbers, special characters)
4. **Test file upload limits** (try files close to 50MB)
5. **Test multiple sheets** in a single Excel file
6. **Test different Excel formats** (.xlsx, .xls, .csv)

## Common Issues to Watch For

1. **Date formatting** - Excel dates might be parsed as numbers
2. **Currency symbols** - May affect numerical analysis
3. **Commas in numbers** - Can cause parsing issues
4. **Special characters** - May not display correctly
5. **Very long text** - May cause UI layout issues

## Performance Testing

1. **Small files** (< 1MB) - Should load instantly
2. **Medium files** (1-10MB) - Should load within 5-10 seconds
3. **Large files** (10-50MB) - May take 30-60 seconds
4. **Multiple sheets** - Each sheet should load independently

## Browser Compatibility

Test the application in:
- Chrome (recommended)
- Firefox
- Safari
- Edge

The application should work consistently across all modern browsers. 