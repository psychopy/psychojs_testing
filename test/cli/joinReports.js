// Downloads the merged reports of each testrun, joins them together, summarizes them, and uploads the result
// Upload or delete test on Stager via CLI arguments

// Modules
const Stager = require('../shared/Stager.js');
const ReportSummarizer = require('../shared/ReportSummarizer.js');
const fs = require('fs');
const Paths = require('./test/shared/Paths.js');

// Get branch 
let branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});

// Join reports
joinReports = async () => {
  // Get all testruns of branch
  let listResults = await Stager.ftpRequest((client, basePath) => {
    return client.list(basePath + '/report/' + branch);
  });
  let testruns = listResults.map((listResult) => {
    return listResult.name;
  })
  console.log("joinReports.js: Found " + testruns.length + ' testruns');
  // Merge reports of each testrun together
  let joinedReports = [], report, getResults;
  for (let testrun of testruns) {
    getResults = await Stager.ftpRequest((client, basePath) => {
      return client.get(basePath + '/report/' + branch + '/' + testrun + '/processed_logs/results.json');
    }, false);
    report = JSON.parse(getResults);
    joinedReports = joinedReports.concat(joinedReports, report);
  }
  // Create a .tmp/ folder if it doesn't exist yet
  if (!fs.existsSync(Paths.dir_tmp)) {
    fs.mkdirSync(Paths.dir_tmp);
  };  
  // Store joined reports in .tmp
  ReportSummarizer.writeJsonAndCsv(Paths.dir_logs_processed + '/results', joinedReports);
  // Summarize reports
  let summaries = ReportSummarizer.summarize(joinedReports, ['platform']);
  // Store summaries
  ReportSummarizer.writeJsonAndCsv(Paths.dir_logs_processed + '/summary', summaries);
  // Store summaries of all tests with at least on fail
  let summariesFailed = summaries.filter( (summary) => {
    return summary.failed > 0
  })
  ReportSummarizer.writeJsonAndCsv(Paths.dir_logs_processed + '/failed', summariesFailed);
  // Merge together in an XLSX file
  ReportSummarizer.writeXLSX(Paths.dir_logs_processed + '/combined_report.xlsx', {
    failed: summariesFailed,
    summary: summaries,
    report: joinedReports
  });
};
joinReports();

