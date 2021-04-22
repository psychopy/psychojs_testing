const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

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
    // Fine calibration expected
    if (calibration === undefined) {
      throw new Error('test wdio_slide_combinatorial requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    SharedBehaviors.performPavloviaPrelude();
    // Tap past intro screen
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // Perform each of the 64 slider trials
    for (let i = 0; i < 64; i++) {
      // Wait for trial
      SharedBehaviors.waitForReport('slider_trial_' + i);
      // Tap and slide to -0.2
      pointerActions([
        {"type": "pointerMove", "duration": 0, "x": calibration.transformX(0), "y":  calibration.transformY(0), origin: 'viewport'},
        {"type": "pointerDown", "duration": 0, "button": 0},
        {"type": "pointerMove", "duration": 100, "x": calibration.transformX(-0.2), "y":  calibration.transformY(0), origin: 'viewport'},
      ]);
      // Screenshot
      browser.writeScreenshot('wdio_slider', 'slider_trial_' + i);
      // Release
      pointerActions([
        {"type": "pointerUp", "duration": 0, "button": 0}
      ]);
      // Tap button
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.3));
    }
  }
};