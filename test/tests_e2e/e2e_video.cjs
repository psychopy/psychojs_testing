const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_video'));
    SharedBehaviors.performPavloviaPrelude();
    // If no calibration specified, get from viewport
    if (calibration === null) {
      calibration = SharedBehaviors.getViewportResolutions();    
    }  
    // Wait for intro_trial and tap past it
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // Wait for video_trial and take screenshot
    SharedBehaviors.waitForReport('video_trial');
    browser.writeScreenshot('video');
    // Check if experiment finishes
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));    
    SharedBehaviors.waitForReport("FINISHED");
  }
};