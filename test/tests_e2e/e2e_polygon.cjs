const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_polygon'));
    SharedBehaviors.performPavloviaPrelude();
    // If no calibration specified, get from viewport
    if (calibration === null) {
      calibration = SharedBehaviors.getViewportResolutions();    
    }
    // Tap past intro screen
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // Make screenshots of test1 to test6
    for (let test_i = 1; test_i <= 2; test_i++) {
      testName = 'polygon' + test_i;      
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