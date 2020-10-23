// Delete BrowserStack logs via CLI arguments

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const build = argv.build;
if (build === undefined) {
  throw "updateBrowserStack.js: No build CLI argument specified"
}
console.log('updateBrowserStack.js: build ' + build);
BrowserStack.deleteOneBuild(build);
