// Downloads the merged reports of each testrun, joins them together, summarizes them, and uploads the result
// Upload or delete test on Stager via CLI arguments

// Modules
const Stager = require('../shared/Stager.cjs');
const ReportSummarizer = require('../shared/ReportSummarizer.cjs');
const fs = require('fs');
const Paths = require('../shared/Paths.cjs');
const CLIParser = require('../shared/CLIParser.cjs');

// Get branch 
let branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});

// Get testrun
let testrun = CLIParser.parseOption({cli: 'testrun'});

// Join reports
(async () => {
  console.log('[joinReports.cjs] Inventorizing tests');
  // Get all testruns of branch
  let listResults = await Stager.ftpRequest((client, basePath) => {
    return client.list(basePath + '/report/' + Stager.createReportPath(branch, testrun));
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
  for (let test of tests) {
    console.log('[joinReports.cjs] Adding test ' + test);
    getResults = await Stager.ftpRequest((client, basePath) => {
      return client.get(basePath + '/report/' + Stager.createReportPath(branch, testrun, test) + '/' + Paths.subdir_logs_processed + '/report.json');
    }, false);
    report = JSON.parse(getResults);
    joinedReports = joinedReports.concat(report);
  }
  // Create a tmp folder if it doesn't exist yet
  if (!fs.existsSync(Paths.dir_tmp)) {
    fs.mkdirSync(Paths.dir_tmp);
  };  
  // Create a logs_joined folder if it doesn't exist yet
  if (!fs.existsSync(Paths.dir_logs_joined)) {
    fs.mkdirSync(Paths.dir_logs_joined);
  };    
  // Store joined reports
  console.log('[joinReports.cjs] write "report" logs');
  ReportSummarizer.writeJsonAndCsv(Paths.dir_logs_joined + '/report', joinedReports);
  // Summarize reports
  let aggregations = ReportSummarizer.aggregate(joinedReports, ['platform']);
  // Store summaries
  console.log('[joinReports.cjs] write "summary" logs');
  ReportSummarizer.writeJsonAndCsv(Paths.dir_logs_processed + '/' + 'summary', aggregations.summaries);
  console.log('[joinReports.cjs] write "failed" logs');
  ReportSummarizer.writeJsonAndCsv(Paths.dir_logs_processed + '/' + 'failed', aggregations.failed);
  // Store failed, summaries, and reports in a single XLSX
  console.log('[joinReports.cjs] write XLSX');
  ReportSummarizer.writeXLSX(Paths.dir_logs_processed + '/' + 'combined_report.xlsx', {
    failed: aggregations.failed,
    summary: aggregations.summaries,
    report: joinedReports
  });
  // Upload to stager
  console.log('[joinReports.cjs] Uploading joined logs');
  await Stager.uploadDirectory(Paths.dir_logs_joined, 'report/'  + Stager.createReportPath(branch, testrun));
})();


