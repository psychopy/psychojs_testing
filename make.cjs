// Compile test experiments and deploy them 

// Modules
const child_process = require('child_process');
const CLIParser = require('./tests/shared/CLIParser.cjs');
const TestCollector = require('./tests/shared/TestCollector.cjs');

// Get target option: local or stager
/*
let target = parseOption({cli: 'target'}, false);
if (!(['local', 'stager'].includes(target))) {
  throw new Error('[test.cjs] The target option (' + target + ') was not recognized. Use "local" for local selenium and web-server or "stager" for BrowserStack and stager.');
}
*/
// String of options passed to this script; we pass these on to child processes
let cliString = process.argv.slice(2, process.argv.length).join(' ');

// execSync options
let execSyncOptions = { 
  stdio: ['inherit', 'inherit', 'inherit']
};

// Collect tests
let tests = TestCollector.collectTests(parseOption({cli: 'label'}));

// Any wdio tests? Deploy experiments and run them
if (tests.wdio.length > 0) {
  // Compile experiments
  child_process.execSync(
    'node tests/cli/compileExperiments.cjs ' + cliString,
    execSyncOptions
  );
  
  // Deploy experiments
  child_process.execSync(
    'node tests/cli/deployExperiments.cjs ' + cliString,
    execSyncOptions
  );
}