// Delete reports on staging server and browserstack logs
var child_process = require('child_process');

// Parse CLI options, if any
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// Construct CLI options for updateStager.js and updateBrowserStack.js
let updateBrowserStackArgs = [];
let updateStagerArgs = ['--action', 'delete'];
// CLI option: branch
if (argv.branch !== undefined) {
  console.log('deleteLogs.js: branch CLI option specified as ' + argv.branch);
  updateBrowserStackArgs = updateBrowserStackArgs.concat(['--build', argv.branch]);  
  updateStagerArgs = updateStagerArgs.concat(['--branch', argv.branch])
} 

// Run updateBrowserStack.js
child_process.fork('test/cli/updateBrowserStack.js', updateBrowserStackArgs);
// Run updateStager.js
child_process.fork('test/cli/updateStager.js', updateStagerArgs);
