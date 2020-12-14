// Compile PsychoJS library, deploy test experiments, and run tests

// Modules
const child_process = require('child_process');
const CLIParser = require('./test/shared/CLIParser.cjs');

// Get target option: local or stager
let target = parseOption({cli: 'target'}, false);
if (!(['local', 'stager'].includes(target))) {
  throw new Error('[test.cjs] The target option (' + target + ') was not recognized. Use "local" for local selenium and web-server or "stager" for BrowserStack and stager.');
}

// String of options passed to this script; we pass these on to child processes
let cliString = process.argv.slice(2, process.argv.length).join(' ');

// execSync options
let execSyncOptions = { 
  stdio: ['inherit', 'inherit', 'inherit']
};

// Compile library
child_process.execSync(
  'npm run build:css', 
  execSyncOptions
);
child_process.execSync(
  'npm run build:js', 
  execSyncOptions
);

// Deploy experiments
child_process.execSync(
  target === 'local'?
    'node test/cli/deployExperiments.cjs ' + cliString:
    'node test/cli/deployExperiments.cjs --upload ' + cliString,
  execSyncOptions
);

// Run e2e tests
child_process.execSync(
  target === 'local'?
    'npx wdio test/wdio.conf.cjs --server local --url http://localhost/psychojs/{{experiment}} ' + cliString:
    'npx wdio test/wdio.conf.cjs --server bs --upload ' + cliString,
  execSyncOptions
);