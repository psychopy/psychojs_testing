// Compile PsychoJS library, deploy test experiments, and run tests

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
let cliString = CLIParser.constructCLIString(2);

// execSync options
let execSyncOptions = { 
  stdio: ['inherit', 'inherit', 'inherit']
};

console.log('[test.cjs] Building library');

// Compile library
child_process.execSync(
  'npm run build:css', 
  execSyncOptions
);
child_process.execSync(
  'npm run build:js', 
  execSyncOptions
);

// Collect tests
let tests = TestCollector.collectTests(CLIParser.parseOption({cli: 'label'}));

// Any karma tests? Run them
if (tests.karma.length > 0) {
  console.log('[test.cjs] Starting karma tests');
  child_process.execSync(
    'node tests/cli/runkarma.cjs ' + cliString,
    execSyncOptions  
  );
}

// Any wdio tests? Deploy experiments and run them
if (tests.wdio.length > 0) {
  console.log('[test.cjs] Starting wdio tests');
  // Check if uploadExperiments is enabled when target == stager
  if (parseOption({cli: 'url'}) == 'stager' && !CLIParser.parseOption({cli: 'uploadExperiments'})) {
    throw new Error('[test.cjs] The target CLI option was "stager" but uploadExperiments was disabled. Please enable uploadExperiments')
  }

  // Deploy experiments
  child_process.execSync(
    'node tests/cli/deployExperiments.cjs ' + cliString,
    execSyncOptions
  );

  // Run e2e tests
  child_process.execSync(
   'npx wdio tests/shared/wdio.conf.cjs ' + cliString,
    execSyncOptions
  );
}