// Compile PsychoJS library, deploy test experiments, and run tests

// Modules
const CLIParser = require('./tests/shared/CLIParser.cjs');
const TestCollector = require('./tests/shared/TestCollector.cjs');

let label = CLIParser.parseOption({cli: 'label'});
console.log(label);