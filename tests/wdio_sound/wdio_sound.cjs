const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    // Rough calibration
    let calibration = SharedBehaviors.performPavloviaPrelude();
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