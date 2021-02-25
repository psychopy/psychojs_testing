// Modules
const fs = require('fs');
const BrowserStack = require('./BrowserStack.cjs');
const minimatch = require('minimatch');
const Paths = require('./Paths.cjs');

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

// Returns browsers from BrowserStack after basic filtering
const getBrowsers = () => {
  // Get all available browsers from local HDD (cachedBrowsersFile), otherwise cache from BrowserStack's REST API
  const cachedBrowsersFile = Paths.dir_cache + '/browsers.json';
  let allBrowsers;
  if (fs.existsSync(cachedBrowsersFile)) {
    allBrowsers = JSON.parse(fs.readFileSync(cachedBrowsersFile));
  } else {
    allBrowsers = BrowserStack.getBrowsers();
    // Workaround for constructing directories (since log cleanup may not have been performed yet)
    if (!fs.existsSync(Paths.dir_cache)) {
      console.log('[capabilities.bs.cjs] Creating directory: ' + Paths.dir_cache)
      fs.mkdirSync(Paths.dir_cache);
    }  
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
  return browsers; 
}

// Contstruct platformName from browser and return it
getPlatformFromBrowser = (browser) => {
  if (['android', 'ios'].includes(browser.os)) {
    return '' +
      browser.os + '_' +
      browser.os_version + '_' +
      browser.device + '_' +
      browser.browser;      
  } else {
    return '' +
      browser.os + '_' +
      browser.os_version + '_' +
      browser.browser + '_' +
      browser.browser_version;
  }
};

// Return capabilities that meet subset and platformPattern filters
// platform element is extracted via platformFunction
filterCapabilities = (capabilities, platformPattern, subset, platformFunction) => {
  // Filter on platformPattern and subset
  return capabilities.filter((capability) => {
    // Filter on platformSubsets if subset === true
    let matchesFilter;
    let platform = platformFunction(capability);
    if (subset) {
      matchesFilter = false;
      for (let platformSubset of platformSubsets) {
        matchesFilter = matchesFilter || minimatch(platform.toLowerCase(), platformSubset.toLowerCase());
      }
    } else {
      matchesFilter = true;
    }
    // Filter on platformPattern
    if (matchesFilter) {
      matchesFilter = minimatch(platform.toLowerCase(), platformPattern.toLowerCase());
    }
    return matchesFilter;
  });
};

// An array of browserNames to test on if subset === true
const platformSubsets = [
  'Windows_10_chrome_*',
  'Windows_10_firefox_*',
  'Windows_10_edge_*',
  'OS X_Catalina_chrome_*',
  'OS X_Catalina_edge_*',
  'OS X_Catalina_firefox_*',
  'OS X_Catalina_safari_*',
  'android_11.0_Google Pixel 4_android',
  'android_10.0_Google Pixel 3_android',
  'android_9.0_Samsung Galaxy S9 Plus_android',
  'android_7.0_Samsung Galaxy S8 Plus_android',
  'ios_14_iPhone XS_iphone',
  'ios_13_iPhone 8_iphone'
];

// Generate browserstack WebDriver capabilities 
// buildName is used as build in browserstack logs
// platformPattern is a string with wildcards for selecting platformNames
// if subset is true, besides platformPattern, platformNames are selected that meet platformSubset
const getWebdriverCapabilities = (buildName, platformPattern, subset) => {
  // Get platforms in BrowserStack's browsers.json format
  let browsers = getBrowsers();

  // Additional browserstack options tos add to each capability
  const generalOptions = {
    projectName: 'PsychoJS_wdio',
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
        osVersion: browser.os_version,
        sessionName: getPlatformFromBrowser(browser)
        // consoleLogs: 'verbose'
      }
    };
    // Add general options
    capability['bstack:options'] = Object.assign(capability['bstack:options'], generalOptions);
    // Add desktop/mobile-specific options
    if (['android', 'ios'].includes(browser.os)) {
      // mobile-specific
      capability['bstack:options'] = Object.assign(capability['bstack:options'], {
        deviceName:  browser.device,
        appiumLogs: 'false',
        appiumVersion: '1.17.0'
      });
    } else {
      // desktop-specific
      capability['bstack:options'] = Object.assign(capability['bstack:options'], {
        seleniumVersion: '3.141.5',
        resolution: '1280x1024'
      });
      capability.browserVersion = browser.browser_version;
    }
    return capability;
  });
  // Filter capabilities
  capabilities = filterCapabilities(capabilities, platformPattern, subset, (capability) => {
    return capability['bstack:options'].sessionName;
  });
  console.log('[capabilities.bs.cjs] Filtered out ' + capabilities.length + ' platforms');
  return capabilities;
}

// Generate browserstack WebDriver capabilities 
// buildName is used as build in browserstack logs
// platformPattern is a string with wildcards for selecting platformNames
// if subset is true, besides platformPattern, platformNames are selected that meet platformSubset
const getApiCapabilities = (platformPattern, subset) => {
  // Get platforms in BrowserStack's browsers.json format
  let browsers = getBrowsers();
  // Add platform
  let capabilities = browsers.map((browser) => {
    browser.displayName = getPlatformFromBrowser(browser);
    browser.base = 'BrowserStack';
    return browser;
  });
  // Filter capabilities
  capabilities = filterCapabilities(capabilities, platformPattern, subset, (capability) => {
    return capability.displayName;
  });

  // Convert to object with platform as key
  let customLaunchers = {};
  for (capability of capabilities) {
    customLaunchers[capability.displayName] = capability;
  }
  console.log('[capabilities.bs.cjs] Filtered out ' + capabilities.length + ' platforms');
  return customLaunchers;
}

// getWdioServices; no services required when running via BrowserStack
const getWdioServices = () => {
  return [];
};

module.exports = { 
  getWebdriverCapabilities: getWebdriverCapabilities,
  getApiCapabilities: getApiCapabilities,
  getWdioServices: getWdioServices
};
