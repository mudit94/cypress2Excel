// index.js

const fs = require('fs');
const xlsx = require('exceljs');
//const { exec } = require('node:child_process');
//const cypress = require('cypress');
const { stdout } = require('process');
//const fs = require('fs');
const mochawesome = require('mochawesome');
const { merge } = require('mochawesome-merge')


const { exec } = require('node:child_process');

// Function to get a list of report files in a directory
function getReportFiles(directory) {
  return fs.readdirSync(directory)
    .filter(file => file.endsWith('.json'))
    .map(file => `${directory}/${file}`);
}

// Directory containing the Mochawesome JSON reports

// See Params section below

//const reportFile = './output.json';
// Load the JSON report file generated by Mochawesome
  function parseReport(reportFile, excelFilePath){


//const reportsDirectory = './cypress/reports';

// // Get a list of report files in the directory
// const reportFiles = getReportFiles(reportsDirectory);

// // Check if there are any reports to merge
// if (reportFiles.length === 0) {
//   console.error('No Mochawesome reports found in the specified directory.');
//   process.exit(1);
// }

// Command to merge Mochawesome reports using mochawesome-merge CLI
// const mergeCommand = `mochawesome-merge -f ./cypress/reports/*.json  -o ./output.json`;
// console.log("merge command is"+mergeCommand)
// Execute the merge command
//await new Promise(resolve => setTimeout(resolve, 5000));

// let res=  await exec(mergeCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error("Error executing merge command:" +error.message);
//     return;
//   }
//   if (stderr) {
//     console.error("Merge command stderr:"+stderr);
//     return;
//   }
//   console.log("Merge command stdout:" +stdout);
//   console.log('Reports merged successfully.');
   writeToExcelNew(reportFile,excelFilePath)
// });
 }


// function storeUniqueTestsAsExcel(reportData, excelFilePath) {
//   const uniqueTestNames = new Set();

//   // Extract unique test names
//   reportData.results.forEach(result => {
//     result.suites.forEach(suite => {
//       suite.tests.forEach(test => {
//         uniqueTestNames.add(test.title);
//       });
//     });
//   });

//   // Convert set to array for json2xls
//   const uniqueTestArray = Array.from(uniqueTestNames).map(testName => ({ testName }));

//   // Convert array to Excel file
//   const xls = json2xls(uniqueTestArray);

//   // Write to Excel file
//   fs.writeFileSync(outputFileName, xls, 'binary');

//   console.log(`Unique test names saved to ${outputFileName}`);
// }
function writeToExcelNew(reportFile,excelFilePath){
  
  const workbook = new xlsx.Workbook();
  let worksheet;
  const reportData = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
  const testNames = reportData.results.flatMap(result =>
    result.suites.flatMap(suite =>
      suite.tests.map(test => test.title)
    )
  ).filter((value, index, self) => {
    return self.indexOf(value) === index; // Filter out duplicate test names
  });
  console.log("test "+testNames);
  console.log("inside write to excel dfun");
  if (fs.existsSync(excelFilePath)) {
    console.log("file exists");
    // If the Excel file exists, load the workbook and get the worksheet
    workbook.xlsx.readFile(excelFilePath)
      .then(() => {
        console.log("pop");
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
//    status=0
    // If the Excel file does not exist, create a new workbook and worksheet
    worksheet = workbook.addWorksheet('Test Names');
    worksheet.addRow(['Test Name']); // Add header row
    appendTestNames(worksheet, testNames,workbook,excelFilePath);
  }

}
function appendTestNames(worksheet,testNames,workbook,excelFilePath){
  
  testNames.forEach(testName => {
    //const existingTest = worksheet.find(row => row.getCell(1).value === testName);
  //if(!existingTest)
    worksheet.addRow([testName]);
  });
  

  // Save the workbook with the appended data
  workbook.xlsx.writeFile(excelFilePath)
    .then(() => {
      console.log(`Test names ${fs.existsSync(excelFilePath) ? 'appended to' : 'written to'} ${excelFilePath}`);
    })
    .catch(err => {
      console.error(`Error saving Excel file: ${err.message}`);
    });
}



 
 function runTests(reportFile,excelFilePath) {
  //  cy.wait(6000);
    try {
      // const results = await cypress.run({
      //   spec: 'cypress/e2e/**/*.cy.js', // Path to your test files
      //   browser: 'electron', // Specify the browser to use (optional)
      //   headless: false, 
      //   quiet:true,
      //   configFile:'./cypress.config.js',
      //   // Run tests in headless mode (optional)
      //   // Add more configuration options as needed
        
      // });
     console.log(excelFilePath)
      parseReport(reportFile,excelFilePath);
     //  writeToExcel();
    }








    catch (error) {
      console.error('Error running Cypress tests:', error);
      process.exit(1); // Exit with error code
    }
  }
  
  
  // 

  //const fs = require('fs');

// Path to the Mochawesome JSON report file

  //     await exec("rmdir -R mochawesome-report && npx mochawesome-merge ./cypress/results/*.json > ./cypress/results/mochawesome.json",(err,results)=>{
  //       if(err)
  //       return -1;
  //       //console.log(results);
  //       console.log("Mudit maheshwari")
  //       // for(elem in results){
  //  //     parseReport();
  //       //          const result = JSON.parse("./mochawesome-report/mochawesome.json");
//       const testNames = result.runs[0].tests.map(test => test.title);
   
       // Create Excel workbook and worksheet
      //  const workbook = xlsx.utils.book_new();
      //  const worksheet = xlsx.utils.json_to_sheet(testNames);
   
      //  // Add worksheet to the workbook
      //  xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Names');
   
      //  // Write workbook to Excel file
      //  const excelFilename = 'test-names.xlsx';
      //  xlsx.writeFile(workbook, excelFilename);
      //  console.log(`Test names extracted and saved to ${excelFilename}`);
   
//      })
      // Process test results if needed
    //   console.log(results);
    //  // for(elem in results){
    //     const result = JSON.parse(results);
    // const testNames = result.runs[0].tests.map(test => test.title);

    // // Create Excel workbook and worksheet
    // const workbook = xlsx.utils.book_new();
    // const worksheet = xlsx.utils.json_to_sheet(testNames);

    // // Add worksheet to the workbook
    // xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Names');

    // // Write workbook to Excel file
    // const excelFilename = 'test-names.xlsx';
    // xlsx.writeFile(workbook, excelFilename);
    // console.log(`Test names extracted and saved to ${excelFilename}`);

      
      
    //   const result = JSON.parse(results);
    // const testNames = result.runs[0].tests.map(test => test.title);

    // // Create Excel workbook and worksheet
    // const workbook = xlsx.utils.book_new();
    // const worksheet = xlsx.utils.json_to_sheet(testNames);

    // // Add worksheet to the workbook
    // xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Names');

    // // Write workbook to Excel file
    // const excelFilename = 'test-names.xlsx';
    // xlsx.writeFile(workbook, excelFilename);
    // console.log(`Test names extracted and saved to ${excelFilename}`);

// function extractTestNamesFromCypress() {
//   // Run Cypress command to get test names
//   exec('npx cypress run', (err, stdout) => {
//     if (err) {
//       console.error('Error running Cypress:', err);
//       return;
//     }
//     const result = JSON.parse(stdout);
//     const testNames = result.runs[0].tests.map(test => test.title);

//     // Create Excel workbook and worksheet
//     const workbook = xlsx.utils.book_new();
//     const worksheet = xlsx.utils.json_to_sheet(testNames);

//     // Add worksheet to the workbook
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Names');

//     // Write workbook to Excel file
//     const excelFilename = 'test-names.xlsx';
//     xlsx.writeFile(workbook, excelFilename);
//     console.log(`Test names extracted and saved to ${excelFilename}`);
//   });
// }

module.exports = runTests
