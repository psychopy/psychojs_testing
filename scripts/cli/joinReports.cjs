// Downloads the merged reports of each testrun, joins them together, summarizes them, and uploads the result
// Upload or delete test on Stager via CLI arguments

// Modules
const Stager = require('../shared/Stager.cjs');
const ReportSummarizer = require('../shared/ReportSummarizer.cjs');
const fs = require('fs-extra');
const Paths = require('../shared/Paths.cjs');
const CLIParser = require('../shared/CLIParser.cjs');
const BrowserStack = require('../shared/BrowserStack.cjs');

// Get branch 
let branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});

// Get testrun
let testrun = CLIParser.parseOption({cli: 'testrun'});

// Join reports
(async () => {
  // Any failed tests?
  let anyFailed = false;
  let thisFailed;
  // Create directories we need for aggregating
  Paths.recreateDirectories(
    [Paths.dir_results],
    false
  );
  Paths.recreateDirectories(
    [
      Paths.dir_results_joined,
      Paths.dir_results_joined + '/wdio',
      Paths.dir_results_joined + '/karma'
    ],
    true
  );
  let joinedReports, report, getResults, listResults, tests;
  
  // *** Karma reports
  console.log('[joinReports.cjs] Inventorizing karma tests');
  // Get all testruns of branch
  listResults = await Stager.ftpRequest((client, basePath) => {
    return client.list(basePath + '/' + Paths.subdir_results_karma + '/' + Stager.createReportPath(branch, testrun));
  }, false);
  if (listResults === undefined) {
    console.log('[joinReports.cjs] No karma tests found on stager');
  } else {
    // Filter out directories
    listResults = listResults.filter((listResult) => {
      return listResult.type === 'd';
    });
    // Get names of tests
    tests = listResults.map((listResult) => {
      return listResult.name;
    })
    console.log('[joinReports.cjs] Found ' + tests.length + ' karma tests');
    // Merge reports of each test together
    joinedReports = [];
    for (let test of tests) {
      console.log('[joinReports.cjs] Adding karma test ' + test);
      // Add test to joinedReports
      getResults = await Stager.ftpRequest((client, basePath) => {
        return client.get(basePath + '/' + Paths.subdir_results_karma + '/' + Stager.createReportPath(branch, testrun, test) + '/report.json');
      }, false);
      report = JSON.parse(getResults);
      joinedReports = joinedReports.concat(report);
    }
    thisFailed = ReportSummarizer.aggregateAndStoreKarma(
      joinedReports,
      Paths.dir_results_joined + '/karma', 
      true
    );
    anyFailed = anyFailed || thisFailed;
  }

  // *** WDIO reports
  console.log('[joinReports.cjs] Inventorizing wdio tests');
  // Get all testruns of branch
  listResults = await Stager.ftpRequest((client, basePath) => {
    return client.list(basePath + '/' + Paths.subdir_results_wdio + '/' + Stager.createReportPath(branch, testrun));
  }, false);
  if (listResults === undefined) {
    console.log('[joinReports.cjs] No wdio tests found on stager');
  } else {
    // Filter out directories
    listResults = listResults.filter((listResult) => {
      return listResult.type === 'd';
    });
    // Get names of tests
    tests = listResults.map((listResult) => {
      return listResult.name;
    })
    console.log('[joinReports.cjs] Found ' + tests.length + ' wdio tests');
    // Merge reports of each test together
    joinedReports = [];
    let buildNamesToBuildIdsMap = {}, buildName;
    for (let test of tests) {
      console.log('[joinReports.cjs] Adding wdio test ' + test);
      // Add test to joinedReports
      getResults = await Stager.ftpRequest((client, basePath) => {
        return client.get(basePath + '/' + Paths.subdir_results_wdio + '/' + Stager.createReportPath(branch, testrun, test) + '/' + Paths.subdir_results_processed + '/report.json');
      }, false);
      report = JSON.parse(getResults);
      joinedReports = joinedReports.concat(report);
  
      // Add buildId to map
      buildName = BrowserStack.createBuildName(branch, testrun, test);
      let buildIds = BrowserStack.getBuildIds('PsychoJS_wdio', (build) => {
        return build.name === buildName;
      });
      if (buildIds.length !== 1) {
        throw new Error('[wdio.conf.cjs] During onComplete, found ' + buildIds.length + ' builds on BrowserStack with name ' + buildName);
      }
      buildNamesToBuildIdsMap[buildName] = buildIds[0];
    }
    console.log('[joinReports.cjs] buildNamesToBuildIdsMap is ' + JSON.stringify(buildNamesToBuildIdsMap));
    thisFailed = ReportSummarizer.aggregateAndStoreWdio(
      joinedReports,
      Paths.dir_results_joined + '/wdio',
      true, 
      BrowserStack.createBuildName(branch, testrun, undefined, trailingSeparator = true),
      buildNamesToBuildIdsMap
    );
    anyFailed = anyFailed || thisFailed;
  }
  
  // Upload to stager
  console.log('[joinReports.cjs] Deleting old joined logs')
  await Stager.deleteDirectory(Paths.subdir_results_joined + '/'  + Stager.createReportPath(branch, testrun));

  console.log('[joinReports.cjs] Uploading joined logs');
  console.log([
    Paths.dir_results_joined,
    Paths.subdir_results_joined + '/'  + Stager.createReportPath(branch, testrun)
  ]);
  await Stager.uploadDirectory(Paths.dir_results_joined, Paths.subdir_results_joined + '/'  + Stager.createReportPath(branch, testrun));

  process.exit(anyFailed? 1: 0);
})();


