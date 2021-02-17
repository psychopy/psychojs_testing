const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_video'));
    // Rough calibration
    let calibration = SharedBehaviors.performPavloviaPrelude();
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