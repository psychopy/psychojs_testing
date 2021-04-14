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

// Delete BrowserStack logs
const buildPrefix = BrowserStack.createBuildName(branch, testrun, test);
BrowserStack.deleteAllBuildsStartingWith('PscyhoJS_wdio', buildPrefix);
BrowserStack.deleteAllBuildsStartingWith('PscyhoJS_karma', buildPrefix);

// Delete Stager reports
const stagerPath = Stager.createReportPath(branch, testrun, test);
Stager.deleteDirectory(Paths.subdir_results_wdio + '/' + stagerPath);
Stager.deleteDirectory(Paths.subdir_report_karma + '/' + stagerPath);
