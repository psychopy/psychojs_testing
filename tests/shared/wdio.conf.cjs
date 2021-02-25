// Modules 
const fs = require('fs');
const Jimp = require('jimp');
const Mustache = require('mustache');
const VisualRegressor = require('./VisualRegressor.cjs');
const ReportSummarizer = require('./ReportSummarizer.cjs');
const BrowserStack = require('./BrowserStack.cjs');
const Stager = require('./Stager.cjs');
const Paths = require('./Paths.cjs');
const CLIParser = require('./CLIParser.cjs');
const TestCollector = require('./TestCollector.cjs');

// *** Parse CLI arguments
let [server, uploadReport, platform, label, testrun, branch, subset] = CLIParser.parseTestrunCLIOptions();

// Construct tests
let tests = TestCollector.collectTests(label).wdio;
console.log('[wdio.conf.cjs] Running ' + tests.length + ' tests');

// Construct testrun (2 remove!!!)
testrun = testrun === undefined? label: testrun;

// Construct buildName (for browserStack logs)
const buildName = BrowserStack.createBuildName(branch, testrun, label);
console.log('[wdio.conf.cjs] buildName is ' + buildName);

// Get pavlovia CLI option
let pavlovia = parseOption({cli: 'pavlovia'}, false);
pavlovia = pavlovia === undefined? false: pavlovia;
console.log('[wdio.conf.cjs] pavlovia is ' + pavlovia);

// Get url CLI option and construct baseUrl
let url = parseOption({cli: 'url'});

// Include capability generator module
const CapabilityGenerator = require('./capabilities.' + server + '.cjs');

// *** WebdriverIO config
exports.config = {
  // Connect to browserstack is server is 'bs'
  user: server === 'bs' ? CLIParser.parseOption({env: 'BROWSERSTACK_USER'}, true, CLIParser.logSilent): undefined,
  key: server === 'bs' ? CLIParser.parseOption({env: 'BROWSERSTACK_ACCESSKEY'}, true, CLIParser.logSilent): undefined,

  // Number of instances run at same time
  maxInstances: 3, // 3

  // Local (local) or BrowserStack (bs) capabilities
  capabilities: CapabilityGenerator.getWebdriverCapabilities(buildName, platform, subset),

  // Local test-runner
  runner: 'local',

  // Test files & patterns to include & exclude
  specs: ['./tests/shared/wdio_specfile.cjs'],
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
    webdriver: 'warn',
    '@wdio/applitools-service': 'warn',
    '@wdio/browserstack-service': 'warn'
  },
  outputDir: Paths.dir_logs_wdio,

  // Give up after X tests have failed (0 - don't bail)
  bail: 0,
  //
  // String prepended to each url
  baseUrl: '',

  // Default timeout for all waitFor* commands.
  waitforTimeout: 1000,

  // Test runner services
  services: [].concat(CapabilityGenerator.getWdioServices()),

  // Framework settings
  framework: 'jasmine',
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: server === 'bs' ? 2: 0,
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
      outputDir: Paths.dir_logs_json,
      stdout: false
    }]
  ],

  // =====
  // Hooks
  // =====
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: async function (config, capabilities) {
    try {
      // *** Clean up temporary directories
      Paths.cleanupTemporaryDirectories([
        [Paths.dir_tmp_e2e, false],
        [Paths.dir_cache, true],
        [Paths.dir_logs_capabilities, true],
        [Paths.dir_logs_joined, true],
        [Paths.dir_logs_json, true],
        [Paths.dir_logs_processed, true],
        [Paths.dir_logs_wdio, true],
        [Paths.dir_logs_selenium, true],
        [Paths.dir_screenshots_cutout, true],
        [Paths.dir_screenshots_raw, true],
        [Paths.dir_screenshots_scaled, true]
      ]);    
      // *** Delete old BrowserStack logs
      if (server === 'bs') {
        console.log('[wdio.conf.cjs] Deleting BrowserStack logs');
        BrowserStack.deleteOneBuild('PsychoJS_e2e', buildName);
      }
      // *** Log all capabilities
      fs.writeFileSync(Paths.dir_logs_capabilities + '/capabilities.json', JSON.stringify(capabilities));
    } catch (e) {
      console.log('\x1b[31m' + e.stack + '\x1b[0m');
      process.exit(1);
    }
    // Wait until BrowserStack is available
    if (server === 'bs') {
      await BrowserStack.waitUntilReady();
    }
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
    //console.log(this)

    // These function concern getting capabilities that are specified
    // in the config but not available in browser.capabilities during
    // the test run.
    browser.addCommand('getPlatformName', () => {
      return capabilities['bstack:options'].sessionName;
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
    browser.addCommand('writeJimpImg', (img, experimentName, screenshotName) => {
      img.write(Paths.dir_screenshots_raw + '/' + screenshotName + '#' + experimentName + '#' + browser.getPlatformName() + '.png');
    });
    browser.addCommand('getJimpScreenshot', async () => {
      let screenshotBase64 = await browser.takeScreenshot();
      return (await Jimp.read(new Buffer.from(screenshotBase64, 'base64')));
    });
    browser.addCommand('writeScreenshot', (experimentName, screenshotName) => {
      browser.writeJimpImg(browser.getJimpScreenshot(), experimentName, screenshotName);
    });
    // Perform a visual regression test
    browser.addCommand('compareScreenshot', async (experimentName, screenshotName) => {
      try {
        // Make screenshot
        let screenshotImg = await browser.getJimpScreenshot();
        // Write screenshot to file
        browser.writeJimpImg(screenshotImg, experimentName, screenshotName);
        // Get reference
        let referenceImg = await VisualRegressor.getReferenceImg(experimentName, screenshotName);
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
            screenshotName + '#' + platformName + '.png'
          );
          // Add results to log
          for (let comparisonResultKey in comparisonResult) {
            browser.logAdd(
              screenshotName + '.' + comparisonResultKey,
              comparisonResult[comparisonResultKey]
            );
          }
          // Return RMS value
          return comparisonResult.rms;
        }
      } catch (e) {
        console.log('\x1b[31m' + e.stack + '\x1b[0m');
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

    // Get label
    browser.addCommand('getLabel', () => {
      return label;
    });

    // Set and get test config
    browser.addCommand('setTestConfig', (testConfig) => {
      browser.capabilities.testConfig = testConfig;
    });
    browser.addCommand('getTestConfig', () => {
      return browser.capabilities.testConfig;
    });

    // Get URL of test experiment
    browser.addCommand('getExperimentUrl', () => {
      let baseUrl;
      switch (url) {
        // Url points to staging server; construct using branch
        case 'stager':
          if (branch === undefined) {
            throw new Error('[wdio.conf.cjs] url was "stager", but no branch was specified, so baseUrl could not be constructed');
          }
          baseUrl = 'https://staging.psychopy.org/experiments/html/' + branch + '/{{experiment}}';
          break;
        // Url points to pavlovia server; get from test config
        case 'pavlovia':
          // Note that in the browser.capabilities object, slashes get replaced by their HTML entities (&#x2F;), hence we convert those back again       
          if (browser.capabilities.testConfig.pavlovia_url === undefined) {
            throw new Error(
              '[wdio.conf.cjs] url was "pavlovia", but no pavlovia_url could be found in ' +
              browser.capabilities.testConfig.path + '/config.json'
            );
          }
          baseUrl = browser.capabilities.testConfig.pavlovia_url.replace(/&#x2F;/g, '/');
          break;
        // Url points to local webserver; assume 'https://localhost/psychojs/{{experiment}}
        case 'local':
          baseUrl = 'http://localhost/psychojs/{{experiment}}';
          break;
        // url is a template
        default:
          baseUrl = url;
          break;
      }
      // Construct URL
      // Note that in the browser.capabilities object, slashes get replaced by their HTML entities (&#x2F;), hence we convert those back again
      let experimentUrl = Mustache.render(baseUrl + '?__noOutput', {experiment: browser.capabilities.testConfig.path}).replace(/&#x2F;/g, '/');
      console.log('[wdio.conf.js] experimentUrl is ' + experimentUrl);
      return experimentUrl;
    });


    browser.addCommand('getTests', () => {
      console.log('getTests');
      console.log(tests);
      return tests;
    });

    // Print current sessionId and platformName
    console.log('sessionId is ' + browser.sessionId);
    console.log('platformName is ' + browser.getPlatformName())
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
    try {
       // Merge reports
      let joinedReports = ReportSummarizer.mergeWdio(['custom', 'wdio_specfile'], label);
      // Construct buildPrefix and map of buildNames to buildIds
      let buildNamesToBuildIdsMap = {}, buildPrefix = '';
      if (server === 'bs') {
        // buildPrefix
        buildPrefix = BrowserStack.createBuildName(branch, testrun, undefined, trailingSeparator = true);
        // buildNamesToBuildIdsMap
        let buildIds = BrowserStack.getBuildIds('PsychoJS_e2e', (build) => {
          return build.name === buildName;
        });
        if (buildIds.length !== 1) {
          throw new Error('[wdio.conf.cjs] During onComplete, found ' + buildIds.length + ' builds on BrowserStack with name ' + buildName);
        }
        buildNamesToBuildIdsMap[buildName] = buildIds[0];
      }
      ReportSummarizer.aggregateAndStoreWdio(
        joinedReports,
        Paths.dir_logs_processed, 
        server === 'bs',
        buildPrefix,
        buildNamesToBuildIdsMap
      );
      // If upload enabled, update stager
      if (uploadReport) {
        const stagerPath = Stager.createReportPath(branch, testrun, label);
        console.log('[wdio.conf.cjs] stagerPath is ' + stagerPath);
        // Delete old logs
        console.log('[wdio.conf.cjs] Deleting old reports on Stager');
        await Stager.deleteDirectory(Paths.subdir_report_e2e + '/' + stagerPath);
        // Upload logs
        console.log('[wdio.conf.cjs] Uploading new reports to Stager');
        await Stager.uploadDirectory(Paths.dir_tmp_e2e, Paths.subdir_report_e2e + '/' + stagerPath);
      }
    } catch (e) {
      console.log('\x1b[31m' + e.stack + '\x1b[0m');
    }

  },

  afterTest: function (test, context, { error, result, duration, passed, retries }) {
  }
}
