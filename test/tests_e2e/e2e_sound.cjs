const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_sound'));
    SharedBehaviors.performPavloviaPrelude();
    // If no calibration specified, get from viewport
    if (calibration === null) {
      calibration = SharedBehaviors.getViewportResolutions();    
    }  
    // Wait for intro_trial and tap past it
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // Wait for sound_trial
    SharedBehaviors.waitForReport('sound_trial');
    // Check if experiment finishes
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));    
    SharedBehaviors.waitForReport("FINISHED");
  }
};