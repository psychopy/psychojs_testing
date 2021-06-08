// Karma configuration
const fs = require('fs-extra');
const CLIParser = require('./CLIParser.cjs');
const BrowserStack = require('./BrowserStack.cjs');
const Paths = require('./Paths.cjs');
const TestCollector = require('./TestCollector.cjs');
const NameSanitizer = require('./../shared/NameSanitizer.cjs');

// *** Parse CLI arguments
let [server, uploadResults, platform, label, testrun, branch, subset] = CLIParser.parseTestrunCLIOptions();

// Get label and construct specFiles
let tests = TestCollector.collectTests(label);
let specFiles = tests.karma.map((test) => {
  return {pattern: 'tests/' + test.path + '/' + test.testscript_file, type: 'module'};
});
console.log('[karma.conf.cjs] running ' + specFiles.length + ' specFiles');

// Construct browsers
let customLaunchers, browsers;
if (server === 'bs') {
  customLaunchers = require('./capabilities.' + server + '.cjs').getApiCapabilities(platform, subset);
} else {
  customLaunchers = {
    local_local_chrome_local: {
      base: 'Chrome',
      displayName: 'local_local_chrome_local'
    }
  };
}
browsers = Object.keys(customLaunchers);  

// Construct proxies for each JS and CCS file in lib 
// E.g., from within the browser lib/util-2021.1.3.js can be referenced as /util.js and as /util-2021.1.3.js
let libraryFiles = fs.readdirSync('lib');
let cssFiles = []; 
let libraryProxies = {};
for (let libraryFile of libraryFiles) {
  // Ends with iife.js or LEGAL.txt? Ignore
  if (libraryFile.endsWith('iife.js') || libraryFile.endsWith('LEGAL.txt')) { 
  // Ends with css? Add to cssFiles   
  } else if (libraryFile.endsWith('css')) {
    cssFiles.push({pattern: 'lib/' + libraryFile, type: 'css'});
  // Else, make a proxy
  } else {
    // Get the part before the '-', that + '.js' is the proxy
    libraryProxies['/' + libraryFile.split('-')[0] + '.js'] = 'http://localhost:9876/base/lib/' + libraryFile;
    libraryProxies['/' + libraryFile] = 'http://localhost:9876/base/lib/' + libraryFile;
  }
}

module.exports = function(config) {
  config.set({
    browserStack: server !== 'bs'? {}:
    {
      username: server === 'bs'? CLIParser.parseOption({env: 'BROWSERSTACK_USER'}, true, CLIParser.logSilent): undefined,
      accessKey: server === 'bs'? CLIParser.parseOption({env: 'BROWSERSTACK_ACCESSKEY'}, true, CLIParser.logSilent): undefined,
      project: 'PsychoJS_karma',
      build: BrowserStack.createBuildName(branch, testrun, NameSanitizer.sanitize(label))
    },

    // define browsers
    customLaunchers: customLaunchers,
    browsers: browsers,
    
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.min.css', type: 'css'},
      {pattern: 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js', type: 'js'},
      {pattern: 'https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.min.js', type: 'js'},
      {pattern: 'lib/*.js', type: 'module', included: false, served: true},
      {pattern: 'scripts/shared/root.html', type: 'dom'}
    ].concat(cssFiles).concat(specFiles),

    proxies: libraryProxies,  

    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: server === 'bs'? ['dots', 'json', 'BrowserStack']: ['dots', 'json'],
    jsonReporter: {
      stdout: false,
      outputFile: Paths.dir_results_karma + '/results.json'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: server === 'bs'? 3: Infinity
  })
}
