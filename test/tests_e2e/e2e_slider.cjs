const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // If no calibration specified, get from e2e_calibration
    if (calibration === null) {
      calibration = SharedBehaviors.performCalibrationExperiment(false);    
    }
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_slider'));
    SharedBehaviors.performPavloviaPrelude();
    // Tap past intro screen
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // Tap on slider
    SharedBehaviors.waitForReport('slider_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0.3));
    // Wait for FINISHED
    SharedBehaviors.waitForReport('FINISHED');
  }
};