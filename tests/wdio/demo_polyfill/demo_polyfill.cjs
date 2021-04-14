const SharedBehaviors = require('../../shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());

    // Rough calibration
    let calibration = SharedBehaviors.performPavloviaPrelude(waitForCanvas = false);

    // Tap past intro screen
    //SharedBehaviors.waitForReport('intro_trial');
    //SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));

    // Check if experiment finishes
    SharedBehaviors.waitForReport("FINISHED");
  }
};