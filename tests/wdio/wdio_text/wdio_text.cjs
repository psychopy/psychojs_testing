const SharedBehaviors = require('../../shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    // Rough calibration
    let calibration = SharedBehaviors.performPavloviaPrelude();
    // Tap past intro screen
    SharedBehaviors.waitForReport('STARTED');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // Make screenshots of test1 to test6
    for (let test_i = 1; test_i <= 6; test_i++) {
      testName = 'text' + test_i;      
      // Wait for confirmation we're at the next test routine
      SharedBehaviors.waitForReport(testName);
      // Wait a moment, then take screenshot
      //browser.pause(200);    
      browser.writeScreenshot(testName);
      // Next routine
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    }
    // Wait for FINISHED
    SharedBehaviors.waitForReport('FINISHED');
  }
};