#!/usr/bin/env node
// Shorthand for karma start test/karma.conf.js
// Processes logs after testrun
const child_process = require('child_process');
// String of options passed to this script
let cliString = process.argv.slice(2, process.argv.length).join(' ');
// Run karma
try {
  child_process.execSync('karma start test/karma.conf.cjs ' + cliString, { 
    stdio: ['inherit', 'inherit', 'inherit']
  });
} catch (e) {
  
}
// Summarize reports
child_process.execSync('node test/cli/summarizeUnitReports.cjs ' + cliString);