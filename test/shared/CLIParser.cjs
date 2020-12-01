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
  platform: function(processMe) {
    let argv = yargs(hideBin(process.argv)).argv;
    if (processMe !== '*' && argv._.length > 1) {
      return processMe + ' ' + argv._.slice(1, argv._.length).join(' ');
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
    let errorMessage = '[CLIParser.cjs] ' + optionKey + ' was required, but had no value in ' + JSON.stringify(sources);
    console.log('\x1b[31m' + errorMessage + '\x1b[0m');
    throw new Error(errorMessage);
  }
  // Still here? Return optionValue (undefined)
  console.log('[CLIParser.cjs] ' + optionKey + ' was not required and had no value in ' + JSON.stringify(sources));
  return optionValue;
}

module.exports = {
  processors: processors,
  parseOption: parseOption,
  logFull: logFull,
  logCensor: logCensor,
  logSilent: logSilent
};