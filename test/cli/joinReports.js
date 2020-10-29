// Downloads the merged reports of each testrun, joins them together, summarizes them, and uploads the result
// Upload or delete test on Stager via CLI arguments

// *** Modules
const Stager = require('../shared/Stager.js');
const json2csv = require('json2csv');
const fs = require('fs');

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// Get branch parameter
let build;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('joinReports.js: branch specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  branch = process.env.TRAVIS_BRANCH;
} else if (argv.branch !== undefined) {
  console.log('joinReports.js: branch specified via CLI option as ' + argv.branch);
  branch = argv.branch;
} else {
  throw "joinReports.js: No branch specified via TRAVIS_BRANCH or CLI option";
}

// Join reports
joinReports = async () => {
  // Get all testruns of branch
  let listResults = await Stager.ftpRequest((client, basePath) => {
    return client.list(basePath + '/' + branch);
  });
  let testruns = listResults.map((listResult) => {
    return listResult.name;
  })
  console.log("joinReports.js: Found " + testruns.length + ' testruns');
  // Merge reports of each testrun together
  let joinedReports = [], report, getResults;
  for (let testrun of testruns) {
    getResults = await Stager.ftpRequest((client, basePath) => {
      return client.get(basePath + '/' + branch + '/' + testrun + '/processed_logs/results.json');
    }, false);
    report = JSON.parse(getResults);
    joinedReports = joinedReports.concat(joinedReports, report);
  }
  console.log(joinedReports);
  // Create a .tmp/ folder if it doesn't exist yet
  if (!fs.existsSync('.tmp')) {
    fs.mkdirSync('.tmp');
  };  
  // Store joined reports in .tmp/
  fs.writeFileSync(
    '.tmp/results.json',
    JSON.stringify(joinedReports)
  );

  // Store output as CSV
  fs.writeFileSync(
    '.tmp/results.csv',
    json2csv.parse(joinedReports)
  );  
};
joinReports();

