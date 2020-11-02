// Delete BrowserStack logs via CLI arguments

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// *** Get branch name from TRAVIS_BRANCH or CLI argument
let branch;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('updateBrowserStack.js: branch specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  branch = process.env.TRAVIS_BRANCH;
} else if (argv.branch !== undefined) {
  console.log('updateBrowserStack.js: branch specified via CLI option as ' + argv.branch);
  branch = argv.branch;
} else {
  throw "updateBrowserStack.js: No branch specified via TRAVIS_BRANCH or CLI option";
}

// Delete branch in BrowserStack logs
const BrowserStack = require('../shared/BrowserStack.js');
BrowserStack.deleteOnebranch(branch);
