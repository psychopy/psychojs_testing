// Modules
const CLIParser = require('../shared/CLIParser.cjs');
const TestCollector = require('../shared/TestCollector.cjs');
// CLI Options
let tests = TestCollector.collectTests(parseOption({cli: 'label'}));
process.stdout.write(JSON.stringify(tests.wdio));
