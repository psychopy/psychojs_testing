// Compile PsychoJS library, deploy test experiments, and run tests

// Modules
const CLIParser = require('./tests/shared/CLIParser.cjs');

let test = CLIParser.parseOption({cli: 'platform'});
console.log(test);

let [server, uploadReport, platform, label, testrun, branch, subset] = CLIParser.parseTestrunCLIOptions();
console.log(platform);

console.log(process.env);