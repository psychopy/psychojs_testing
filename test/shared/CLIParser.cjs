// Parses options provided via the environment and/or a CLI optoin

// Modules
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');

// List of functions to process environment variables
const processors = {
  // Return branch; last element of slash-separated string in github_ref
  GITHUB_REF: function(processMe) {
    return processMe.split('/').pop()
  },
  // Return platform CLI argument plus all unnamed arguments (hack for spaces in platform name)
  // Ignore any unnamed arguments with 'conf.cjs' in it (hack for karma start karma.conf.cjs)
  platform: function(processMe) {
    let argv = yargs(hideBin(process.argv)).argv;
    let startIndex = 1;
    // Karma workaround, start parsing unnamed arguments after conf.cjs
    if (argv._.indexOf('test/karma.conf.cjs') !== -1) {
      startIndex = argv._.indexOf('test/karma.conf.cjs') + 1;
    }
    if (processMe !== '*' && argv._.length > startIndex) {
      return processMe + ' ' + argv._.slice(startIndex, argv._.length).join(' ');
    }
    return processMe;
  }
};

// Log levels
const logFull   = 3; // Log option and value
const logCensor = 2; // Log option, not value
const logSilent = 1; // Log nothing

// Parses names from two sources: command line interface options (cli) and/or environment variables (env). 
// If sources.cli and sources.env are strings, they are used as names of the CLI option and environment 
// option. If they are defined, and a corresponding name exists in PROCESSORS, the corresponding function
// is called to preprocess the option value before it's returned. If cli or env are arrays, the first 
// element is considered the name of the option, and the second a processor function that can parse the 
// option value and return a parsed value. If neither cli or env option are definied, and required is
// true, an error is thrown. If both are defined, earlier elements in sources take precedence.
// If censor === true; the value of the option is not printed to the console
parseOption = (sources = {}, required = true, logLevel = logFull) => {
  // Key in cli/environment
  let optionKey;
  // Processor function
  let processor;
  // Value of option; processed and raw
  let optionValue = undefined, optionValueRaw = undefined;
  // Report for logging to console
  let report;
  for (let sourceKey in sources) {
    processor = undefined;
    report = '';
    // Setup optionKey (name of cli or env option) and processor
    if (typeof sources[sourceKey] === 'string') {
      optionKey = sources[sourceKey];
      processor = processors[optionKey];
    } else {
      optionKey = sources[sourceKey][0];
      processor = sources[sourceKey][1];
    }
    // Get raw option value (CLI option or environment)
    switch (sourceKey) {
      case 'cli':
        optionValueRaw = yargs(hideBin(process.argv)).argv[optionKey];
        report += optionKey + ' was found as cli option';
        report += logLevel < logFull? '': ' with value ' + optionValueRaw;
        break;
      case 'env':
        optionValueRaw = process.env[optionKey];
        report += optionKey + ' was found as env var';
        report += logLevel < logFull? '': ' with value ' + optionValueRaw;
        break;
    }
    // Feed to processor
    if (optionValueRaw !== undefined && processor !== undefined) {
      optionValue = processor(optionValueRaw);
      report +=  logLevel < logFull? '': ', which was parsed to ' + optionValue;
    } else {
      optionValue = optionValueRaw;
    }
    if (optionValue !== undefined) {
      if (logLevel > logSilent) {
        console.log('[CLIParser.cjs] ' + report);
      }
      return optionValue;
    }
  }
  // Still here? No value 
  if (required) {
    let errorMessage = '[CLIParser.cjs] Option was required, but had no value in ' + JSON.stringify(sources);
    console.log('\x1b[31m' + errorMessage + '\x1b[0m');
    throw new Error(errorMessage);
  }
  // Still here? Return optionValue (undefined)
  console.log('[CLIParser.cjs] Option was not required and had no value in ' + JSON.stringify(sources));
  return optionValue;
}

// Parse CLI options for running e2e and unit testruns
parseTestrunCLIOptions = () => {
  // Get server CLI option
  const server = parseOption({cli: 'server'});
  if (!(['local', 'bs'].includes(server))) {
    throw new Error('[CLIParser.cjs] The server option (' + server + ') was not recognized. Use "local" for local server or "bs" for BrowserStack.');
  }
  console.log('[CLIParser.cjs] server is ' + server);

  // Get upload CLI option
  let upload = parseOption({cli: 'upload'}, false);
  upload = upload !== undefined;
  console.log('[CLIParser.cjs] upload is ' + upload);

  // Get platform CLI option
  let platform = parseOption({cli: 'platform'}, false);
  platform = platform === undefined? '*': platform;
  console.log('[CLIParser.cjs] platform is ' + platform);

  // Get test CLI option
  let test = parseOption({cli: 'test'}, false);
  test = test === undefined? 'all_tests': test;
  console.log('[CLIParser.cjs] testrun is ' + test);

  // Get testrun CLI option
  let testrun = parseOption({cli: 'testrun'}, false);
  testrun = testrun === undefined? test: testrun;
  console.log('[CLIParser.cjs] testrun is ' + testrun);

  // Get branch from CLI or GITHUB_REF
  const branch = parseOption({cli: 'branch', env: 'GITHUB_REF'}, false);
  if ((upload || server === 'bs') && branch === undefined) {
    throw new Error('[CLIParser.cjs] upload was enabled or server was bs, but branch was not defined');
  }
  console.log('[CLIParser.cjs] branch is ' + branch);

  // Get subset from CLI
  let subset =  parseOption({cli: 'subset'}, false);
  subset = subset !== undefined;
  console.log('[CLIParser.cjs] subset is ' + subset);

  return [server, upload, platform, test, testrun, branch, subset];
};


module.exports = {
  processors: processors,
  parseOption: parseOption,
  logFull: logFull,
  logCensor: logCensor,
  logSilent: logSilent,
  parseTestrunCLIOptions: parseTestrunCLIOptions
};