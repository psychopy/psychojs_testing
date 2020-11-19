// Modules
const fs = require('fs');
const BrowserStack = require('./BrowserStack.js');
const Paths = require('./Paths.js');

// Returns index of highest number in array that is not NaN
const indexOfMax = (values) => {
  let max = undefined;
  let maxIndex = undefined;
  for (let i = 0; i < values.length; i++) {
    if (!isNaN(values[i]) && (max === undefined || values[i] > max)) {
      max = values[i];
      maxIndex = i;
    }
  }
  return maxIndex;
};

// For pattern matching of strings with * and . wildcards
// From: https://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
const wildTest = (wildcard, str) => {
  let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
  const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
  return re.test(str); // remove last 'i' above to have case sensitive
}

// Returns browsers from BrowserStack after basic filtering
const getBrowsers = () => {
  // Get all available browsers from local HDD (cachedBrowsersFile), otherwise cache from BrowserStack's REST API
  const cachedBrowsersFile = Paths.dir_logs_capabilities + '/browsers.json';
  let allBrowsers;
  if (fs.existsSync(cachedBrowsersFile)) {
    allBrowsers = JSON.parse(fs.readFileSync(cachedBrowsersFile));
  } else {
    allBrowsers = BrowserStack.getBrowsers();
    // Workaround for constructing directories (since log cleanup may not have been performed yet)
    if (!fs.existsSync(Paths.dir_tmp)) {
      console.log('capabilities.bs.js. Creating directory: ' + Paths.dir_tmp)
      fs.mkdirSync(Paths.dir_tmp);
    };    
    if (!fs.existsSync(Paths.dir_logs_capabilities)) {
      console.log('capabilities.bs.js. Creating directory: ' + Paths.dir_logs_capabilities)
      fs.mkdirSync(Paths.dir_logs_capabilities);
    };    
    fs.writeFileSync(cachedBrowsersFile, JSON.stringify(allBrowsers));
  }
  // Select browsers that match these filters
  let browserFilters = [
    { 
      os: ['Windows'], 
      os_version: ['7', '8.1', '10'], 
      browser: ['chrome', 'edge', 'firefox', 'ie']
    },
    {
      os: ['OS X'], 
      os_version: ['Catalina', 'Mojave', 'High Sierra'], 
      browser: ['chrome', 'edge', 'firefox', 'safari']
    },
    {
      os: ['ios'], 
      os_version: ['13', '14'], 
      browser: ['iphone']
    },
    { 
      os: ['android'], 
      os_version: ['6.0', '7.0', '7.1', '8.0', '8.1', '9.0', '10.0', '11.0'], 
      browser: ['android']
    }
  ];

  // Browsers that meet filters
  let browsers = [];

  // For each filter, select browsers that match filter
  // Then, if browser_version is not null, select highest browser_version
  let selectedBrowsers, browser_versions, indexLatestBrowser; 
  for (let browserFilter of browserFilters) {
    for (let os of browserFilter.os) {
      for (let os_version of browserFilter.os_version) {
        for (let browserName of browserFilter.browser) {
          // Browsers that meet current filter
          selectedBrowsers = allBrowsers.filter((browser) => {
            return browser.os == os && browser.os_version == os_version && browser.browser == browserName;
          });
          
          if (['ios', 'android'].includes(os)) {
            // For ios and android, add all selectedBrowsers
            browsers = browsers.concat(selectedBrowsers);
          } else {
            // For other OSs, select highest browser_version
            browser_versions = selectedBrowsers.map((browser) => {
              // Convert browser_version from string to number 
              return +(browser.browser_version);
            })
            indexLatestBrowser = indexOfMax(browser_versions);
            browsers.push(selectedBrowsers[indexLatestBrowser])          
          }
        }
      }
    }
  }
  return browsers; b
}

// An array of browserNames to test on if subset === true
const browserSubsets = [
  'Windows_10_Chrome_*'
];


// Generates browserstack capabilities
// buildName is used as build in browserstack logs
// platformPattern is a string with wildcards for selecting platformNames
// if subset is true, besides platformPattern, platformNames are selected that meet platformSubset
const getCapabilities = (buildName, platformPattern, subset) => {
  // Get platforms in BrowserStack's browsers.json format
  let browsers = getBrowsers();

  // Additional browserstack options to add to each capability
  const generalOptions = {
    projectName: 'PsychoJS',
    buildName: buildName,
    video: 'true',
    debug: 'true',
    local: 'false'
  };
  
  // Convert browsers to capabilities
  let capabilities = browsers.map((browser) => {
    // Recode browser properties
    let capability = {
      browserName: browser.browser,
      'bstack:options': {
        os: browser.os,
        osVersion: browser.os_version
      }
    };
    // Add general options
    capability['bstack:options'] = Object.assign(capability['bstack:options'], generalOptions);
    // Add desktop/mobile-specific options
    if (['android', 'ios'].includes(browser.os)) {
      // mobile-specific
      let platformName = 
        browser.os + '_' +
        browser.os_version + '_' +
        browser.device + '_' +
        browser.browser;      

      capability['bstack:options'] = Object.assign(capability['bstack:options'], {
        deviceName:  browser.device,
        appiumLogs: 'false',
        sessionName: platformName,
        appiumVersion: '1.17.0'
      });
    } else {
      // desktop-specific
      let platformName =           
        browser.os + '_' +
        browser.os_version + '_' +
        browser.browser + '_' +
        browser.browser_version;
      capability['bstack:options'] = Object.assign(capability['bstack:options'], {
        sessionName: platformName,
        seleniumVersion: '3.141.59',
        resolution: '1280x1024'
      });
      capability.browserVersion = browser.browser_version;
    }
    return capability;
  });
  // Filter on platformPattern and subset
  capabilities = capabilities.filter((capability) => {
    // Filter on platformSubsets if subset === true
    let matchesFilter;
    if (subset) {
      matchesFilter = false;
      for (platformSubset of platformSubsets) {
        matchesFilter = matchesFilter || wildTest(platformSubset, capability['bstack:options'].sessionName);
      }
    } else {
      matchesFilter = true;
    }
    // Filter on platformPattern
    if (matchesFilter) {
      matchesFilter = wildTest(platformPattern, capability['bstack:options'].sessionName);
    }
    return matchesFilter;
  });
  //console.log(capabilities);
  return capabilities;
}

module.exports = { 
  getCapabilities: getCapabilities
};
