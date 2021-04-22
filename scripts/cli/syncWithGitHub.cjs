// Synchronize BrowserStack and Stager logs with GitHub
// i.e. delete any logs that don't have matching branches in GitHub
// Any unnamed CLI options are 'pseudo-branches' whose logs will be kept, regardless of whether they exist on GitHub

// *** Modules
const GitHub = require('../shared/GitHub.cjs');
const BrowserStack = require('../shared/BrowserStack.cjs');
const Stager = require('../shared/Stager.cjs');
const Paths = require('../shared/Paths.cjs');

// Get pseudoBranches; list of unnamed CLI options
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const pseudoBranches = argv._;

// Sync BrowserStack logs
(async () => {
  console.log('[syncWithGithub.cjs] retrieving GitHub branches');
  let branchNames = GitHub.getBranchNames().concat(pseudoBranches);

  console.log('[syncWithGithub.cjs] deleting BrowserStack logs');
  BrowserStack.deleteAllBranchesExcept('PsychoJS_wdio', branchNames);
  BrowserStack.deleteAllBranchesExcept('PsychoJS_karma', branchNames);
  
  console.log('[syncWithGithub.cjs] deleting staging server reports');
  await Stager.deleteAllDirectoriesExcept(Paths.subdir_results_wdio, branchNames);
  await Stager.deleteAllDirectoriesExcept(Paths.subdir_results_karma, branchNames);
  await Stager.deleteAllDirectoriesExcept(Paths.subdir_results_joined, branchNames);

  console.log('[syncWithGithub.cjs] deleting staging server html experiments');
  await Stager.deleteAllDirectoriesExcept('experiments', branchNames);
})();