// Downloads the merged reports of each testrun, joins them together, summarizes them, and uploads the result
// Upload or delete test on Stager via CLI arguments

// Modules
const Stager = require('../shared/Stager.cjs');
const ReportSummarizer = require('../shared/ReportSummarizer.cjs');
const fs = require('fs');
const Paths = require('../shared/Paths.cjs');
const CLIParser = require('../shared/CLIParser.cjs');
const BrowserStack = require('../shared/BrowserStack.cjs');

// Get branch 
let branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});

// Get testrun
let testrun = CLIParser.parseOption({cli: 'testrun'});

// Join reports
(async () => {
  console.log('[joinReports.cjs] Inventorizing tests');
  // Get all testruns of branch
  let listResults = await Stager.ftpRequest((client, basePath) => {
    return client.list(basePath + '/' + Paths.subdir_report_e2e + '/' + Stager.createReportPath(branch, testrun));
  }, false);
  // Filter out directories
  listResults = listResults.filter((listResult) => {
    return listResult.type === 'd';
  });
  // Get names of tests
  let tests = listResults.map((listResult) => {
    return listResult.name;
  })
  console.log('[joinReports.cjs] Found ' + tests.length + ' tests');
  // Merge reports of each test together
  let joinedReports = [], report, getResults;
  let buildNamesToBuildIdsMap = {}, buildName;
  for (let test of tests) {
    console.log('[joinReports.cjs] Adding test ' + test);
    // Add test to joinedReports
    getResults = await Stager.ftpRequest((client, basePath) => {
      return client.get(basePath + '/' + Paths.subdir_report_e2e + '/' + Stager.createReportPath(branch, testrun, test) + '/' + Paths.subdir_logs_processed + '/report.json');
    }, false);
    report = JSON.parse(getResults);
    joinedReports = joinedReports.concat(report);

    // Add buildId to map
    buildName = BrowserStack.createBuildName(branch, testrun, test);
    let buildIds = BrowserStack.getBuildIds('PsychoJS_e2e', (build) => {
      return build.name === buildName;
    });
    if (buildIds.length !== 1) {
      throw new Error('[wdio.conf.cjs] During onComplete, found ' + buildIds.length + ' builds on BrowserStack with name ' + buildName);
    }
    buildNamesToBuildIdsMap[buildName] = buildIds[0];
  }
  console.log('[joinReports.cjs] buildNamesToBuildIdsMap is ' + JSON.stringify(buildNamesToBuildIdsMap));
  // Create a tmp folder if it doesn't exist yet
  if (!fs.existsSync(Paths.dir_tmp_e2e)) {
    fs.mkdirSync(Paths.dir_tmp_e2e);
  };  
  // Create a logs_joined folder if it doesn't exist yet
  if (!fs.existsSync(Paths.dir_logs_joined)) {
    fs.mkdirSync(Paths.dir_logs_joined);
  };    
  ReportSummarizer.aggregateAndStoreWdio(
    joinedReports,
    Paths.dir_logs_joined,
    true, 
    BrowserStack.createBuildName(branch, testrun, undefined, trailingSeparator = true),
    buildNamesToBuildIdsMap
  );
  // Upload to stager
  console.log('[joinReports.cjs] Uploading joined logs');
  await Stager.uploadDirectory(Paths.dir_logs_joined, Paths.subdir_report_e2e + '/'  + Stager.createReportPath(branch, testrun));
})();


