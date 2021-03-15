const Paths = require('./Paths.cjs');

module.exports = {
  getWebdriverCapabilities: () => {
    let generalSettings = {
      'bstack:options': {
        os: 'local',
        osVersion: 'local',
        resolution: 'local'
      }
    };

    // Trying out window WAD
    capability = JSON.parse(JSON.stringify(generalSettings));
    capability['bstack:options'] = {
      sessionName: 'local_local_windows_local'
    };
    capability.platformName = 'windows';
    capability['appium:deviceName'] = 'WindowsPC';
    capability['appium:app'] = 'testing';
    return [capability];

    /*
    let browsers = [
      'chrome'//, 'firefox'//, 'MicrosoftEdge'
    ];
    let output = [], capability;
    for (let browser of browsers) {
      capability = JSON.parse(JSON.stringify(generalSettings));
      capability.browserName = browser;
      capability['bstack:options'] = {
        sessionName: 'local_local_' + browser + '_local'
      };
      output.push(capability);
    }
    return output;
    */
  },

  // getWdioServices; services for local Selenium server
  getWdioServices: () => {
    return [
      // Selenium-standalone; takes care of local browserdrivers 
      ['selenium-standalone', {
        logPath: Paths.dir_results_selenium,
        installArgs: {
          drivers: {
            chrome: { version: '87.0.4280.88' },
            firefox: { version: '0.26.0' },
            MicrosoftEdge: { version: '84.0.522.40' }
          }
        },
        args: {
          drivers: {
            chrome: { version: '87.0.4280.88' },
            firefox: { version: '0.26.0' },
            MicrosoftEdge: { version: '84.0.522.40' }
          }
        }
      }]
    ];
  }
};