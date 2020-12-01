module.exports = {
  getCapabilities: () => {
    let generalSettings = {
      'bstack:options': {
        os: 'local',
        osVersion: 'local',
        resolution: 'local'
      }
    };
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
  }
};