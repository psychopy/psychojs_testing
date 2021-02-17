// Synchronize BrowserStack and Stager logs with GitHub
// i.e. delete any logs that don't have matching branches in GitHub
// Any unnamed CLI options are 'pseudo-branches' whose logs will be kept, regardless of whether they exist on GitHub

// *** Modules
const GitHub = require('../shared/GitHub.cjs');
const BrowserStack = require('../shared/BrowserStack.cjs');
const Stager = require('../shared/Stager.cjs');

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
  BrowserStack.deleteAllBranchesExcept('PsychoJS_e2e', branchNames);
  BrowserStack.deleteAllBranchesExcept('PsychoJS_unit', branchNames);
  
  console.log('[syncWithGithub.cjs] deleting staging server reports');
  await Stager.deleteAllDirectoriesExcept(Paths.subdir_report_e2e, branchNames);
  await Stager.deleteAllDirectoriesExcept(Paths.subdir_report_unit, branchNames);

  console.log('[syncWithGithub.cjs] deleting staging server html experiments');
  await Stager.deleteAllDirectoriesExcept('experiments/html', branchNames);
})();