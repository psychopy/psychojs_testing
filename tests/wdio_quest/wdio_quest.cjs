const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    //console.log(JSON.stringify(browser.getExperimentUrl()))
    browser.url(browser.getExperimentUrl());

    // Rough calibration
    let calibration = SharedBehaviors.performPavloviaPrelude();
    // Wait for check_trial and check parameters
    SharedBehaviors.waitForReport('check_trial');
    const output = JSON.parse($('<body>').getAttribute('data-output'));
    expect(output[0]).withContext('Checking mean').toBeCloseTo(79.046);
    expect(output[1]).withContext('Checking SD').toBeCloseTo(4.182);
    // Finish experiment
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    SharedBehaviors.waitForReport('FINISHED');
  }
};