// Karma configuration
// Generated on Tue Dec 01 2020 14:30:27 GMT+0000 (Greenwich Mean Time)
const CLIParser = require('./shared/CLIParser.cjs');

// *** Parse CLI arguments
// Parse server CLI option
const server = CLIParser.parseOption({cli: 'server'});
if (!(['local', 'bs'].includes(server))) {
  throw new Error('[wdio.conf.cjs] The server option (' + server + ') was not recognized. Use "local" for local server or "bs" for BrowserStack.');
}
console.log('[wdio.conf.cjs] server is ' + server);

// Get branch from CLI or GITHUB_REF
let branch;
if (server === 'bs') {
  branch = CLIParser.parseOption({cli: 'branch', env: 'GITHUB_REF'});
}
console.log('[wdio.conf.cjs] branch is ' + branch);

// Construct browsers
let customLaunchers, browsers;
if (server === 'bs') {
  customLaunchers = {
    bstack_chrome_windows: {
      base: 'BrowserStack',
      browser: 'chrome',
      browser_version: '72.0',
      os: 'Windows',
      os_version: '10',
      'bstack:options' : {sessionName: 'dummy'}
    },

    bstack_iphoneX: {
      base: 'BrowserStack',
      device: 'iPhone X',
      os: 'ios',
      real_mobile: true,
      os_version: '11.0'
    }
  };
  browsers = Object.keys(customLaunchers);  
} else {
  customLaunchers = [];
  browsers = ['Chrome'];
}

module.exports = function(config) {
  config.set({
    browserStack: {
      username: server === 'bs'? CLIParser.parseOption({env: 'BROWSERSTACK_USER'}, true, CLIParser.logSilent): undefined,
      accessKey: server === 'bs'? CLIParser.parseOption({env: 'BROWSERSTACK_ACCESSKEY'}, true, CLIParser.logSilent): undefined,
      project: 'PsychoJS unit',
      build: branch
    },

    // define browsers
    customLaunchers: customLaunchers,
    browsers: browsers,
    
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css', type: 'css'},
      {pattern: 'dist/psychojs.css', type: 'css'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.1/seedrandom.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.7/pixi.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/PreloadJS/1.0.1/preloadjs.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.2/xlsx.full.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/log4javascript/1.4.9/log4javascript.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/tone/13.8.6/Tone.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.2/howler.min.js', type: 'js'},
      {pattern: 'https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.10/pako.min.js', type: 'js'},
      {pattern: 'dist/*.js', type: 'module', included: false},
      {pattern: 'test/specs_unit/*.js', type: 'module'}
    ],


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
      outputFile: '.tmp_unit/results.json'
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
    concurrency: Infinity
  })
}
