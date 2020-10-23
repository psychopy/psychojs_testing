// Upload or delete path on Stager via CLI arguments

// *** Get branchPath (if any specified)
let branchPath;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('updateStager.js: branchPath specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  branchPath = process.env.TRAVIS_BRANCH + '/';
} else {
  console.log('updateStager.js: no branchPath specified via TRAVIS_BRANCH');
  branchPath = '';
}

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const action = argv.action;
if (action === undefined) {
  throw 'updateStager.js: No action CLI argument specified';
}
const path = argv.path;
if (path === undefined) {
  throw 'updateStager.js: No path CLI argument specified';
}

// *** Perform action
const Stager = require('../shared/Stager.js');
switch (action) {
  // Delete remote path 
  case 'delete':
    console.log('updateStager.js: action delete, path ' + branchPath + path);
    Stager.deleteDirectory(path);
    break;
  // Upload to remote path 
  case 'upload':
    console.log('updateStager.js: action upload, path ' + branchPath + path);
    Stager.uploadDirectory('./.tmp', path);
    break;
  default:
    throw 'updateStager.js action CLI argument not recognized: ' + action;
}
