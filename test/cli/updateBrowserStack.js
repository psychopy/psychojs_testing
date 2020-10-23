// Delete BrowserStack logs via CLI arguments

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// *** Get build name from TRAVIS_BRANCH or CLI argument
let build;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('updateBrowserStack.js: build specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  build = process.env.TRAVIS_BRANCH;
} else if (argv.build !== undefined) {
  console.log('updateBrowserStack.js: build specified via CLI argument as ' + argv.build);
  build = argv.build;
} else {
  throw "updateBrowserStack.js: No build specified via TRAVIS_BRANCH or CLI argument";
}

// Delete build in BrowserStack logs
BrowserStack.deleteOneBuild(build);
