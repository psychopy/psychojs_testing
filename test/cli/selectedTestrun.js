// Delete reports on staging server and browserstack logs
var child_process = require('child_process');

var spawnOptions =   {
  shell: true,
  stdio: ['inherit', 'inherit', 'inherit']
};

// Parse CLI options, if any
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// Construct CLI options for WDIO test and updateStager
let wdioArgs = [];
let updateStagerArgs = ['--action', 'upload'];
// CLI option: branch
if (argv.branch !== undefined) {
  console.log('selectedTestrun.js: branch CLI option specified as ' + argv.branch);
  wdioArgs = wdioArgs.concat(['--build', argv.branch]);  
  updateStagerArgs = updateStagerArgs.concat(['--branch', argv.branch])
} 
// CLI option: test
if (argv.test !== undefined) {
  console.log('selectedTestrun.js: test CLI option specified as ' + argv.test);
  wdioArgs = wdioArgs.concat(['--test', argv.test]);  
  updateStagerArgs = updateStagerArgs.concat(['--test', argv.test])
} 

// Run test
child_process.spawnSync(
  'npx wdio wdio.conf.js --wdioServer bs',
  wdioArgs,
  spawnOptions
);

// Run screenshot comparison
child_process.spawnSync(
  'node test/cli/compareScreenshots.js',
  [],
  spawnOptions
);

// Summarize reports
child_process.spawnSync(
  'node test/cli/summarizeReport.js',
  [],
  spawnOptions
);

// Upload reports
child_process.spawnSync(
  'node test/cli/updateStager.js',
  updateStagerArgs,
  spawnOptions
);

// Run updateStager.js
//child_process.fork('test/cli/updateStager.js', updateStagerArgs);
