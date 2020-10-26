// Upload or delete test on Stager via CLI arguments

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// CLI option: argv.action
if (argv.action === undefined) {
  throw 'updateStager.js: No action CLI option specified';
}

// Get branch (if any specified)
let branch;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('updateStager.js: branch specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  branch = process.env.TRAVIS_BRANCH;
} else if (argv.branch !== undefined) {
  console.log('updateBrowserStack.js: branch specified via CLI option as ' + argv.branch);
  branch = argv.branch;
} else {
  console.log('updateStager.js: no branch specified via TRAVIS_BRANCH no CLI option');
  branch = '';
}

// Depending on branch and test CLI option, construct test
let path;
if (argv.test === undefined && branch === '') {
  throw 'updateStager.js: No branch nor test CLI option specified';
} else if(branch === '') {
  // Only from test
  path = argv.test;
} else if (argv.test === undefined) {
  // Only from branch
  path = branch;
} else {
  // Both branch and test
  path = branch + '/' + argv.test;
}

// *** Perform argv.action
const Stager = require('../shared/Stager.js');
switch (argv.action) {
  // Delete remote test 
  case 'delete':
    console.log('updateStager.js: argv.action delete, path ' + path);
    Stager.deleteDirectory(path);
    break;
  // Upload to remote test 
  case 'upload':
    console.log('updateStager.js: argv.action upload, path ' + path);
    Stager.uploadDirectory('./.tmp', path);
    break;
  default:
    throw 'updateStager.js argv.action CLI option not recognized: ' + argv.action;
}
