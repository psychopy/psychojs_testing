// Generates markdown tables for all available Karma and WebdriverIO tests
// The table is stored in tests/cache/table_of_tests.md
// Note that json2md appends a newline to links, which confuses the table generation,
// so the code below contains some workarounds to remove the newline.

// Modules
const CLIParser = require('../shared/CLIParser.cjs');
const TestCollector = require('../shared/TestCollector.cjs');
const json2md = require('json2md');
const Paths = require('../shared/Paths.cjs');
const fs= require('fs-extra');

// CLI Options
// Tests matching label option
let tests = TestCollector.collectTests(parseOption({cli: 'label'}));
// Output format (markdown table or paths)
let outputFormat = parseOption({cli: 'outputFormat'});
if (!['table', 'paths'].includes(outputFormat)) {
  throw new Error('CLI option outputFormat was ' + outputFormat + ', but it should be either "table" or "paths');
}

if (outputFormat == 'paths') {
  let paths = tests.karma.map((test) => {
    return test.path;
  }).concat(tests.wdio.map((test) => {
    return test.path;
  }));
  //process.stdout.write(JSON.stringify(paths));
  process.stdout.write(JSON.stringify(['this', 'is', 'a', 'test']));
} else {
  // Prepare karma tests for tabulation
  let karmaTests = tests.karma.map((test) => {
    let pathLink = json2md({link:{title: test.path, source: '../tree/master/tests/' + test.path}});
    test.Path =  pathLink.substring(0, pathLink.length - '\n'.length);
    test.Labels = test.labels.join(', ');
    test.Description = test.description;
    return test;
  });
  let karmaTable = {
    headers: ['Path', 'Labels', 'Description'],
    aligns: ['left', 'left', 'left'],
    rows: karmaTests
  };
  // Prepare wdio tests for tabulation
  let wdioTests = tests.wdio.map((test) => {
    let pathLink = json2md({link:{title: test.path, source: '../tree/master/tests/' + test.path}});
    test.Path =  pathLink.substring(0, pathLink.length - '\n'.length);
    let urls = '';
    if (test.hasOwnProperty('pavlovia_url')) {
      let runLink = json2md({link:{title: 'Run', source: test.pavlovia_url}});
      let gitlabLink = json2md({link:{title: 'GitLab', source: test.pavlovia_url.replace('run.pavlovia.org', 'gitlab.pavlovia.org')}});
      urls = runLink.substring(0, runLink.length - '\n'.length) + ' ' + gitlabLink.substring(0, gitlabLink.length - '\n'.length)
    }
    test.URLs = urls;
    test.Labels = test.labels.join(', ');
    test.Description = test.description;
    return test;
  });
  let wdioTable = {
    headers: ['Path', 'Labels', 'URLs', 'Description'],
    aligns: ['left', 'left', 'left', 'left'],
    rows: wdioTests
  };
  // Generate the final markdown, with headers
  let markdown = json2md([
    {h1: 'Karma tests'},
    {table: karmaTable},
    {h1: 'WebdriverIO tests'},
    {table: wdioTable}
  ]);
  console.log(markdown);
  fs.outputFileSync(Paths.dir_cache + '/table_of_tests.md', markdown);
}