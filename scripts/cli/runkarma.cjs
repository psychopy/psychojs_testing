// Runs karma tests and processes logs after testrun
const fs = require('fs-extra');
const child_process = require('child_process');
const CLIParser = require('./../shared/CLIParser.cjs');
const BrowserStack = require('./../shared/BrowserStack.cjs');
const Stager = require('./../shared/Stager.cjs');
const Paths = require('./../shared/Paths.cjs');
const ReportSummarizer = require('./../shared/ReportSummarizer.cjs');
const NameSanitizer = require('./../shared/NameSanitizer.cjs');

// Get CLI options
let [server, uploadResults, platform, label, testrun, branch, subset] = CLIParser.parseTestrunCLIOptions();
// Construct buildName
let buildName = undefined;
if (server === 'bs') {
  buildName = BrowserStack.createBuildName(branch, testrun, NameSanitizer.sanitize(label));
  console.log('[runkarma.cjs] buildName is ' + buildName);
}

// Clean up logs and dist
Paths.recreateDirectories([
  Paths.dir_results
], false);
Paths.recreateDirectories([
  Paths.dir_results_karma,
  'dist'
], true);

// Copy dist from PsychoJS repo to this repo
const psychoJSPath = CLIParser.parseOption({env: 'PSYCHOJS_PATH'});
console.log('[runkarma.cjs] psychoJSPath is ' + psychoJSPath);

console.log('[runkarma.cjs] Copying dist from PsychoJS repo to this repo');
// Copy dist/ to lib/
fs.copySync(
  psychoJSPath + '/dist',
  'dist'
);

// Delete BrowserStack logs
if (server === 'bs') {
  BrowserStack.deleteOneBuild('PsychoJS_karma', buildName);
}

(async () => {
  // Wait until BrowserStack is available
  if (server === 'bs') {
    await BrowserStack.waitUntilReady();
  }

  // Run karma
  try {
    // String of options passed to this script; we pass these on to karma.conf.js
    let cliString = CLIParser.constructCLIString(2);
    child_process.execSync('npx karma start scripts/shared/karma.conf.cjs ' + cliString, { 
      stdio: ['inherit', 'inherit', 'inherit']
    });
  } catch (e) {
    console.log(e.message);
  }
  // Get sessions and store them
  if (server == 'bs') {
    const sessions = BrowserStack.getSessionsByBuildName('PsychoJS_karma', buildName);
    fs.outputFileSync(
      Paths.dir_results_karma + '/sessions.json',
      JSON.stringify(sessions)
    );  
  }
  // Summarize reports
  let joinedReports = ReportSummarizer.mergeKarma(server === 'bs');

  // Aggregate
  ReportSummarizer.aggregateAndStoreKarma(
    joinedReports,
    Paths.dir_results_karma, 
    server === 'bs'
  );

  // If uploadResults enabled, update stager
  if (uploadResults) {
    const stagerPath = Stager.createReportPath(branch, testrun, NameSanitizer.sanitize(label));
    console.log('[runkarma.cjs] stagerPath is ' + stagerPath);
    // Delete old logs
    console.log('[runkarma.cjs] Deleting old reports on Stager');
    await Stager.deleteDirectory(Paths.subdir_results_karma + '/' + stagerPath);
    // Upload logs
    console.log('[runkarma.cjs] Uploading new reports to Stager');
    await Stager.uploadDirectory(Paths.dir_results_karma, Paths.subdir_results_karma + '/' + stagerPath);
  }
})();