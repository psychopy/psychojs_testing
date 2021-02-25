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
      throw new Error('test wdio_slider requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    SharedBehaviors.performPavloviaPrelude();
    // Tap past intro screen
    SharedBehaviors.waitForReport('intro_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // slider_trial_1: Move slider to -0.25    
    SharedBehaviors.waitForReport('slider_trial');    
    pointerActions([
      {"type": "pointerMove", "duration": 0, "x": calibration.transformX(0), "y":  calibration.transformY(0.3), origin: 'viewport'},
      {"type": "pointerDown", "duration": 0, "button": 0},
      {"type": "pointerMove", "duration": 1000, "x": calibration.transformX(-0.2), "y":  calibration.transformY(0.3), origin: 'viewport'},
      //{"type": "pointerUp", "duration": 0, "button": 0}
    ]);
    browser.writeScreenshot('wdio_slider', 'slider_at_-0.2');
    /*
    // slider_trial_2: Move slider to 0.5
    SharedBehaviors.waitForReport('slider_trial_2');    
    pointerActions([
      {"type": "pointerMove", "duration": 0, "x": calibration.transformX(0), "y":  calibration.transformY(0.3), origin: 'viewport'},
      {"type": "pointerDown", "duration": 0, "button": 0},
      {"type": "pointerMove", "duration": 1000, "x": calibration.transformX(0.5), "y":  calibration.transformY(0.3), origin: 'viewport'},
      {"type": "pointerUp", "duration": 0, "button": 0}
    ]);
    // Wait for FINISHED
    SharedBehaviors.waitForReport('FINISHED');
    // Check data
    let data = JSON.parse($('<body>').getAttribute('data-trialsdata'));
    expect(data[0]['slider.response']).toBeCloseTo(2, 1, 'data of slider was not 2');
    expect(data[0]['slider_2.response']).toBeCloseTo(5, 1, 'data of slider_2 was not 5');
    */
  }
};