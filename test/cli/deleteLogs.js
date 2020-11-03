// Delete reports on staging server and browserstack logs

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// *** Get branch name from TRAVIS_BRANCH or CLI argument
let branch;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('deleteLogs.js: branch specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  branch = process.env.TRAVIS_BRANCH;
} else if (argv.branch !== undefined) {
  console.log('deleteLogs.js: branch specified via CLI option as ' + argv.branch);
  branch = argv.branch;
} else {
  throw "deleteLogs.js: No branch specified via TRAVIS_BRANCH or CLI option";
}

// Delete branch in BrowserStack logs if required environment vars are available
if (process.env.BROWSERSTACK_USER === undefined || process.env.BROWSERSTACK_ACCESSKEY === undefined) {
  console.log('deleteLogs.js: could not find BROWSERSTACK_USER or BROWSERSTACK_ACCESSKEY. Skipping deletion of BrowserStack logs');
} else {
  const BrowserStack = require('../shared/BrowserStack.js');
  BrowserStack.deleteOneBuild(branch);
}

// Delete branch on staging server if required environment vars are available
if (process.env.STAGING_PORT === undefined ||  process.env.STAGING_USERNAME === undefined || process.env.STAGING_PASSWORD === undefined) {
  console.log('deleteLogs.js: could not find STAGING_PORT, STAGING_USERNAME, or STAGING_PASSWORD. Skipping deletion of reports on staging server');
} else {
  const Stager = require('../shared/Stager.js');
  Stager.deleteDirectory(branch);
}

