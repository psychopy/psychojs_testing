const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    //console.log(JSON.stringify(browser.getExperimentUrl()))
    browser.url(browser.getExperimentUrl());

    // Rough calibration
    let calibration = SharedBehaviors.performPavloviaPrelude();
    // Tap past intro screen
    
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));

    //SharedBehaviors.resize(true)();
    //browser.pause(10000);
    // Make screenshots of test1 to test6
    let rms;
    for (let test_i = 1; test_i <= 4; test_i++) {
      testName = 'img' + test_i;      
      // Wait for confirmation we're at the next test routine
      SharedBehaviors.waitForReport(testName);
      // Wait a moment, then take screenshot
      //rms = browser.compareScreenshot(testName);
      //expect(rms).toBeLessThanOrEqual(50, {message: 'Visual regression of screenshot ' + testName + ' gave an RMS > 50'});
      // Next routine
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    }
    // Wait for FINISHED
    SharedBehaviors.waitForReport('FINISHED');
  }
};