// Synchronize BrowserStack and Stager logs with GitHub
// i.e. delete any logs that don't have matching branches in GitHub

// *** Modules
const GitHub = require('../shared/GitHub.js');
const BrowserStack = require('../shared/BrowserStack.js');
const Stager = require('../shared/Stager.js');

// *** Perform action
console.log('syncWithGithub.js: retrieving GitHub branches');
const branchNames = GitHub.getBranchNames();
console.log('syncWithGithub.js: deleting BrowserStack builds');
BrowserStack.deleteAllBranchesExcept(branchNames);
console.log('syncWithGithub.js: deleting staging server reports');
Stager.deleteAllDirectoriesExcept(branchNames);