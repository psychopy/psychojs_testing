// Modules (temporary edit here)
const fs = require('fs');
const Jimp = require('jimp');
const VisualRegressor = require('./test/shared/VisualRegressor.js');
const ReportSummarizer = require('./test/shared/ReportSummarizer.js');
const BrowserStack = require('./test/shared/BrowserStack.js');
const Stager = require('./test/shared/Stager.js');

// Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// Parse server CLI option
const server = argv.server;
if (server === undefined) {
  throw new Error('No server CLI argument specified');
}
if (!(['local', 'bs'].includes(server))) {
  throw new Error('The server CLI argument (' + server + ') was not recognized. Use "local" for local server or "bs" for BrowserStack.');
}
console.log('wdio.conf.js: server is ' + server);

// Parse upload CLI option
const upload = argv.upload !== undefined && upload === 'yes';

// Parse platform CLI option
const platform = argv.platform === undefined? '*': argv.platform;
console.log('wdio.conf.js: platform is ' + platform);

// Parse test CLI option
let specs, test, specFile;
if (argv.test === undefined) {
  test = 'all_tests';
  specFile = 'all_tests'
  specs = ['./test/specs/' + specFile + '.js'];  
  console.log('wdio.conf.js: no test specified, so running all tests');
} else {
  test = argv.test;
  specFile = 'single_test';
  specs = ['./test/specs/' + specFile + '.js'];
  console.log('wdio.conf.js: test is ' + test);
}

// Get branch from CLI or TRAVIS_BRANCH
let branch;
if (upload || server === 'bs') {
  if (process.env.TRAVIS_BRANCH !== undefined) {
    console.log('wdio.conf.js: branch specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
    branch = process.env.TRAVIS_BRANCH;
  } else if (argv.branch !== undefined) {
    console.log('wdio.conf.js: branch specified via CLI option as ' + argv.branch);
    branch = argv.branch;
  } else {
    throw new Error('wdio.conf.js: No branch specified via TRAVIS_BRANCH or CLI option');
  }
}

// Get subset from CLI
let subset = argv.subset !== undefined;

exports.config = {
  // Connect to browserstack is server is 'bs'
  user: server === 'bs' ? process.env.BROWSERSTACK_USER : undefined,
  key: server === 'bs' ? process.env.BROWSERSTACK_ACCESSKEY : undefined,

  // Number of instances run at same time
  maxInstances: 3, // 3

  // Local (local) or BrowserStack (bs) capabilities
  capabilities: require('./test/shared/capabilities.' + server).capabilities(branch, platform, test, subset),

  // Local test-runner
  runner: 'local',

  // Test files & patterns to include & exclude
  specs: specs,
  exclude: [],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'warn',
  //
  // Set specific log levels per logger
  //    logLevels: {
  //        webdriver: 'debug',
  //        '@wdio/applitools-service': 'debug',
  //        '@wdio/browserstack-service': 'debug'
  //    },
  logLevels: {
    webdriver: 'silent',
    '@wdio/applitools-service': 'silent',
    '@wdio/browserstack-service': 'silent'
  },
  outputDir: './.tmp/raw_logs',

  // Give up after X tests have failed (0 - don't bail)
  bail: 0,
  //
  // String prepended to each url
  baseUrl: '',

  // Default timeout for all waitFor* commands.
  waitforTimeout: 1000,

  // Test runner services
  services: server === 'bs' ? [] :
    [
      // Selenium-standalone; takes care of local browserdrivers 
      ['selenium-standalone', {
        logPath: './.tmp/selenium_logs',
        installArgs: {
          drivers: {
            chrome: { version: '84.0.4147.30' },
            firefox: { version: '0.26.0' },
            MicrosoftEdge: { version: '84.0.522.40' }
          }
        },
        args: {
          drivers: {
            chrome: { version: '84.0.4147.30' },
            firefox: { version: '0.26.0' },
            MicrosoftEdge: { version: '84.0.522.40' }
          }
        }
      }]
    ],

  // Framework settings
  framework: 'jasmine',
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: server === 'bs' ? 2 : 0,
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: true,
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    // Jasmine default timeout
    defaultTimeoutInterval: 90000,
    // Fail whole suite after first failed spec
    failFast: true,
    //
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function (passed, assertion) {
      // do something
    }
  },

  // Test reporters
  reporters: [
    'dot',
    ['json', {
      outputDir: './.tmp/json_logs',
      stdout: false
    }],
    // ['junit', {
    //   outputDir: './.tmp/junit_logs'
    // }]
  ],

  // =====
  // Hooks
  // =====
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    // Construct and clean up .tmp
    let tmpDir = '.tmp';
    let subDirs = [
      'json_logs',       // json test reporter
      'processed_logs',  // Aggregated logs
      'raw_logs',        // webdriverio and web API logs
      // Images
      'screenshots',
      'cutouts',
      'cutouts_resized',
      'selenium_logs'    // local selenium server logs
    ];
    if (!fs.existsSync(tmpDir)) {
      console.log('Creating directory: ' + tmpDir)
      fs.mkdirSync(tmpDir);
    };
    let files, path;
    for (subDir of subDirs) {
      path = tmpDir + '/' + subDir;
      if (!fs.existsSync(path)) {
        console.log('Creating directory: ' + path);
        fs.mkdirSync(path);
      } else {
        console.log('Deleting files in directory: ' + path);
        files = fs.readdirSync(path);
        for (let file_i in files) {
          fs.unlinkSync(path + '/' + files[file_i]);
        }
      }
    }
    // Delete old test logs
    console.log('Deleting BrowserStack logs of build ' + test + ':' + branch);
    BrowserStack.deleteOneTest(test + ':' + branch);
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
    // These function concern getting capabilities that are specified
    // in the config but not available in browser.capabilities during
    // the test run.
    browser.addCommand('getPlatformName', () => {
      return capabilities['e2e_robot:platform'];
    });
    browser.addCommand('getOsName', () => {
      return capabilities['bstack:options'].os;
    });
    browser.addCommand('getDeviceName', () => {
      return capabilities['bstack:options'].deviceName;
    });
   
    // Get resolution depending on OS and whether we're running local
    browser.addCommand('getResolution', () => {
      // Local; return a dummy resolution (1x1)
      if (browser.runningLocal()) {
        return "1x1";
      }
      let os = browser.getOsName();
      if (os === "OS X" || os === "Windows") {
        return capabilities['bstack:options'].resolution;
      } else if (os === "Android") {
        return browser.capabilities.deviceScreenSize;
      } else {
        // iOS, lookup from table
        return {
          'iPhone XS': '1125x2436',
          'iPhone 11 Pro Max': '1242x2688',
          'iPhone 11 Pro': '1125x2436',
          'iPhone 11': '828x1792',
          'iPhone 8': '750x1334',
          'iPhone SE 2020': '750x1334',
          'iPad Pro 12.9 2020': '2048x2732',
          'iPad Pro 12.9 2018': '2048x2732',
          'iPad Pro 11 2020': '1668x2388',
          'iPad 7th': '1620x2160'
        }[browser.getDeviceName()];
      }
    });
    // returns pointer type for use in Actions API
    browser.addCommand('getPointerType', () => {
      return browser.isMobile ? "touch" : "mouse";
    });    
    // returns true if we're running a local Selenium server
    browser.addCommand('runningLocal', () => {
      return server === 'local';
    });    
    // Making screenshots and saving them
    browser.addCommand('writeJimpImg', (img, name) => {
      img.write('.tmp/screenshots/' + name + '#' + browser.getPlatformName() + '.png');
    });
    browser.addCommand('getJimpScreenshot', async () => {
      let screenshotBase64 = await browser.takeScreenshot();
      return (await Jimp.read(new Buffer.from(screenshotBase64, 'base64')));
    });
    browser.addCommand('writeScreenshot', (name) => {
      browser.writeJimpImg(browser.getJimpScreenshot(), name);
    });
    // Perform a visual regression test
    browser.addCommand('compareScreenshot', async (name) => {
      // Make screenshot
      let screenshotImg = await browser.getJimpScreenshot();
      // Write screenshot to file
      browser.writeJimpImg(screenshotImg, name);
      // Get reference
      let referenceImg = await VisualRegressor.getReferenceImg(name);
      // If reference available, perform comparison
      if (referenceImg === null) {
        // No reference; test passed
        return true;
      } else {
        // Yes reference, compare
        let platformName = await browser.getPlatformName();
        let comparisonResult = await VisualRegressor.compareScreenshotWithReference(
          screenshotImg,
          referenceImg,
          name + '#' + platformName + '.png'
        );
        // Add results to log
        for (let comparisonResultKey in comparisonResult) {
          browser.logAdd(
            name + '.' + comparisonResultKey,
            comparisonResult[comparisonResultKey]
          );
        }
        // Return RMS value
        return comparisonResult.rms;
      }
    });


    // Managing custom log-file
    browser.addCommand('logInit', () => {
      browser.capabilities.customLogs = {};
    });
    browser.addCommand('logAdd', (key, value) => {
      browser.capabilities.customLogs[key] = value;
    });
    browser.addCommand('logGet', () => {
      return browser.capabilities.customLogs;
    });

    // Get test
    browser.addCommand('getTest', () => {
      return test;
    });

    // Print current sessionId and platformName
    console.log('sessionId: ' + browser.sessionId);
    console.log('platformName: ' + browser.getPlatformName())
    // Init custom log
    browser.logInit();
    browser.logAdd('platform', browser.getPlatformName())
    browser.logAdd('resolution', browser.getResolution());
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: async function (exitCode, config, capabilities, results) {
    console.log("***AFTER***");
    // Summarize reports
    ReportSummarizer.merge(['custom', specFile], test);
    // If upload enabled, update stager
    if (upload) {
      // Delete old logs
      await Stager.deleteDirectory(branch + '/' + test);
      // Upload logs
      await Stager.uploadDirectory('./.tmp', branch + '/' + test);
    }
  }
}
