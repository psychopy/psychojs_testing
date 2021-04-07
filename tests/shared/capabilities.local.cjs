const Paths = require('./Paths.cjs');
const seleniumArgs = {
  drivers: {
    chrome: 'latest'
  }
};

module.exports = {
  getWebdriverCapabilities: () => {
    let generalSettings = {
      'bstack:options': {
        os: 'local',
        osVersion: 'local',
        resolution: 'local'
      }
    };

    let browsers = ['chrome'];
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
  },

  // getWdioServices; services for local Selenium server
  getWdioServices: () => {
    return [
      // Selenium-standalone; takes care of local browserdrivers 
      ['selenium-standalone', {
        logPath: Paths.dir_results_selenium,
        installArgs: seleniumArgs,
        args: seleniumArgs
      }]
    ];
  }
};