// example.js

const runTests = require('./index');
//const writeToExcel= require('./index')
// Extract test names from Cypress tests and save to Excel
runTests('./output.json','./test-names.xlsx',);
//writeToExcel();

