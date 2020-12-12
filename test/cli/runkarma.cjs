// Runs karma tests and processes logs after testrun
const fs = require('fs');
const child_process = require('child_process');
const CLIParser = require('./../shared/CLIParser.cjs');
const BrowserStack = require('./../shared/BrowserStack.cjs');
const Stager = require('./../shared/Stager.cjs');
const Paths = require('./../shared/Paths.cjs');
const ReportSummarizer = require('./../shared/ReportSummarizer.cjs');

// Get CLI options
let [server, upload, platform, test, testrun, branch, subset] = CLIParser.parseTestrunCLIOptions();

// Construct buildName
const buildName = BrowserStack.createBuildName(branch, testrun, test);
console.log('[runkarma.cjs] buildName is ' + buildName);

// Clean up logs
Paths.cleanupTemporaryDirectories([
  [Paths.dir_tmp_unit, true]
]);

// Delete BrowserStack logs
if (server === 'bs') {
  BrowserStack.deleteOneBuild('PsychoJS_unit', buildName);
}

(async () => {
  // Wait until BrowserStack is available
  if (server === 'bs') {
    await BrowserStack.waitUntilReady();
  }

  // Run karma
  try {
    // String of options passed to this script; we pass these on to karma.conf.js
    let cliString = process.argv.slice(2, process.argv.length).join(' ');
    child_process.execSync('karma ' + cliString, { 
      stdio: ['inherit', 'inherit', 'inherit']
    });
  } catch (e) {
    console.log(e.message);
  }
  // Get sessions and store them
  if (server == 'bs') {
    const sessions = BrowserStack.getSessionsByBuildName('PsychoJS_unit', 'thomas:all_tests:all_tests');
    fs.writeFileSync(
      './.tmp_unit/sessions.json',
      JSON.stringify(sessions)
    );  
  }
  // Summarize reports
  let joinedReports = ReportSummarizer.mergeKarma(server === 'bs');
//  ReportSummarizer.writeJsonAndCsv('./.tmp_unit' + '/report', joinedReports);
  // Aggregate
  ReportSummarizer.aggregateAndStoreKarma(
    joinedReports,
    './.tmp_unit', 
    server === 'bs'
  );

  // If upload enabled, update stager
  if (upload) {
    const stagerPath = Stager.createReportPath(branch, testrun, test);
    console.log('[runkarma.cjs] stagerPath is ' + stagerPath);
    // Delete old logs
    console.log('[runkarma.cjs] Deleting old reports on Stager');
    await Stager.deleteDirectory(Paths.subdir_report_unit + '/' + stagerPath);
    // Upload logs
    console.log('[runkarma.cjs] Uploading new reports to Stager');
    await Stager.uploadDirectory(Paths.dir_tmp_unit, Paths.subdir_report_unit + '/' + stagerPath);
  }
})();