// Synchronize BrowserStack and Stager logs with GitHub
// i.e. delete any logs that don't have matching branches in GitHub
// Any unnamed CLI options are 'pseudo-branches' whose logs will be kept, regardless of whether they exist on GitHub

// *** Modules
const GitHub = require('../shared/GitHub.js');
const BrowserStack = require('../shared/BrowserStack.js');
const Stager = require('../shared/Stager.js');

// Get pseudoBranches; list of unnamed CLI options
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const pseudoBranches = argv._;

// *** Perform action
console.log('syncWithGithub.js: retrieving GitHub branches');
let branchNames = GitHub.getBranchNames().concat(pseudoBranches);
console.log('syncWithGithub.js: deleting BrowserStack builds');
BrowserStack.deleteAllBranchesExcept(branchNames);
// Prefix branchesNames with 'report/'
let directories = branchNames.map((branchName) => {
  return 'report/' + branchName;
});
console.log('syncWithGithub.js: deleting staging server reports');
Stager.deleteAllDirectoriesExcept(directories);
