#!/usr/bin/env node

const fs = require('fs');
const xlsx = require('exceljs');
const args = process.argv.slice(2);
let reportFile = args[0];
const excelFilePath = args[1];

const { exec } = require('node:child_process');

// Function to get a list of report files in a directory
function getReportFiles(directory) {
  return fs.readdirSync(directory)
    .filter(file => file.endsWith('.json'))
    .map(file => `${directory}/${file}`);
}

function writeToExcelNew(reportFile,excelFilePath){
  let reportData;
  const workbook = new xlsx.Workbook();
  let worksheet;
  if(reportFile===null||reportFile===""||excelFilePath===""||excelFilePath===null){
    console.error("Please check the argument values to the copyToExcel command");
    return -1;
  }
  try{
  reportData = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
  }
  catch(error){
    console.error("Please check the input json file");
    return -1;
  }
  let testNames = reportData.results.flatMap(result =>
    result.suites.flatMap(suite =>
      suite.tests.map(test => test.title)
    )
  ).filter((value, index, self) => {
    return self.indexOf(value) === index; // Filter out duplicate test names
  });
  console.log("Searching for valid cypress tests....");
  if (fs.existsSync(excelFilePath)) {
    // If the Excel file exists, load the workbook and get the worksheet
    workbook.xlsx.readFile(excelFilePath)
      .then(() => {
        worksheet = workbook.getWorksheet('Test Names');
        const existingTestNames = worksheet.getColumn('A').values.slice(1); // Assuming test names start from row 3

        // Filter out the new test names that are not already in the Excel file
        const filteredNewTestNames = testNames.filter(newTest => !existingTestNames.includes(newTest));
    
        appendTestNames(worksheet, filteredNewTestNames,workbook,excelFilePath);
      })
      .catch(err => {
        console.error(`Error reading Excel file: ${err.message}`);
      });
  } else {
    // If the Excel file does not exist, create a new workbook and worksheet
    worksheet = workbook.addWorksheet('Test Names');
    worksheet.addRow(['Test Name']); // Add header row
    appendTestNames(worksheet, testNames,workbook,excelFilePath);
  }

}
function appendTestNames(worksheet,testNames,workbook,excelFilePath){
  
  testNames.forEach(testName => {
    worksheet.addRow([testName]);
  });
  

  // Save the workbook with the appended data
  workbook.xlsx.writeFile(excelFilePath)
    .then(() => {
      console.log(`Test description ${fs.existsSync(excelFilePath) ? 'appended to' : 'written to'} ${excelFilePath}`);
    })
    .catch(err => {
      console.error(`Error saving Excel file: ${err.message}`);
    });
  }
writeToExcelNew(reportFile,excelFilePath);