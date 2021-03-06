// Delete logs of a banch/testrun/test in BrowserStack and on Stager

// *** Modules
const BrowserStack = require('../shared/BrowserStack.cjs');
const Stager = require('../shared/Stager.cjs');
const CLIParser = require('../shared/CLIParser.cjs');
const Paths = require('../shared/Paths.cjs')

// Get branch, testrun, and test
const branch = CLIParser.parseOption({cli: 'branch', env: 'GITHUB_REF'}, false);
const testrun = CLIParser.parseOption({cli: 'testrun'}, false);
const test = CLIParser.parseOption({cli: 'test'}, false);

(async () => {
  // Delete BrowserStack logs
  const buildPrefix = BrowserStack.createBuildName(branch, testrun, test);
  await BrowserStack.deleteAllBuildsStartingWith('PscyhoJS_wdio', buildPrefix);
  await BrowserStack.deleteAllBuildsStartingWith('PscyhoJS_karma', buildPrefix);

  // Delete Stager reports
  const stagerPath = Stager.createReportPath(branch, testrun, test);
  await Stager.deleteDirectory(Paths.subdir_results_wdio + '/' + stagerPath);
  await Stager.deleteDirectory(Paths.subdir_results_karma + '/' + stagerPath);
})();