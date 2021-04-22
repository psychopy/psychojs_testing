// Compile PsychoJS library, deploy test experiments, and run tests

// Modules
const child_process = require('child_process');
const CLIParser = require('./scripts/shared/CLIParser.cjs');
const TestCollector = require('./scripts/shared/TestCollector.cjs');

// Get psychoJSPath
const psychoJSPath = CLIParser.parseOption({env: 'PSYCHOJS_PATH'});
console.log('[test.cjs] psychoJSPath is ' + psychoJSPath);

// String of options passed to this script; we pass these on to child processes
let cliString = CLIParser.constructCLIString(2);

// execSync options
let execSyncOptions = { 
  stdio: ['inherit', 'inherit', 'inherit']
};

console.log('[test.cjs] Building library');

// Compile library
child_process.execSync(
  'npm --prefix ' + psychoJSPath + ' run build:css', 
  execSyncOptions
);
child_process.execSync(
  'npm --prefix ' + psychoJSPath + ' run build:js', 
  execSyncOptions
);

// Collect tests
let tests = TestCollector.collectTests(CLIParser.parseOption({cli: 'label'}));

// Any karma tests? Run them
if (tests.karma.length > 0) {
  console.log('[test.cjs] Starting karma tests');
  child_process.execSync(
    'node scripts/cli/runkarma.cjs ' + cliString,
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
    'node scripts/cli/deployExperiments.cjs ' + cliString,
    execSyncOptions
  );

  // Run e2e tests
  child_process.execSync(
   'npx wdio scripts/shared/wdio.conf.cjs ' + cliString,
    execSyncOptions
  );
}