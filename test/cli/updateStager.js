// Upload or delete path on Stager via CLI arguments

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const action = argv.action;
if (action === undefined) {
  throw "updateStager.js: No action CLI argument specified";
}
const path = argv.path;
if (path === undefined) {
  throw "updateStager.js: No path CLI argument specified";
}

// *** Perform action
const Stager = require('../shared/Stager.js');
switch (action) {
  // Delete remote path 
  case 'delete':
    console.log('updateStager.js: action delete, path ' + path);
    Stager.deleteDirectory(path);
    break;
  // Upload to remote path 
  case 'upload':
    console.log('updateStager.js: action upload, path ' + path);
    Stager.uploadDirectory('./.tmp', path);
    break;
  default:
    throw 'updateStager.js action CLI argument not recognized: ' + action;
}
