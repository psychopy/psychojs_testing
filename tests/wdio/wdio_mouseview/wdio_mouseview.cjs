const SharedBehaviors = require('../../shared/SharedBehaviors.cjs');

pointerActions = (actions) => {
  browser.performActions([{
    "type": "pointer",
    "id": "my_pointer",
    "parameters": {"pointerType": browser.getPointerType()},
    "actions": actions
  }]);
};

module.exports = {
  run: (calibration) => {
    // Fine calibration required
    if (calibration === undefined) {
      throw new Error('test wdio_mouseview requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    // Rough calibration
    SharedBehaviors.performPavloviaPrelude();
    // Tap past intro screen
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    browser.pause(1000);
    // Wait until mouseview_trial, then wait another second
    SharedBehaviors.waitForReport('mouseview_trial');
    browser.pause(1000);
    // Move the mouse to the center
    pointerActions([
      {"type": "pointerMove", "duration": 0, "x": calibration.transformX(0.1), "y":  calibration.transformY(0.1), origin: 'viewport'},      
      {"type": "pointerMove", "duration": 100, "x": calibration.transformX(0), "y":  calibration.transformY(0), origin: 'viewport'}
    ]);
    // Make screenshot
    browser.writeScreenshot('mouse_center');
  }
};