
const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // This experiment requires fine calibration; throw error if no calibration provided
    if (calibration === null) {
      throw new Error('test wdio_textbox requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    SharedBehaviors.performPavloviaPrelude();
    // Go through intro
    SharedBehaviors.waitForReport('intro');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));

    // *** button1_trial
    // Make screenshot, click button, check data-output
    SharedBehaviors.waitForReport('button1_trial');
    browser.writeScreenshot('button1_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0.25));
    browser.waitUntil(() => {
      return $('<body>').getAttribute('data-output') === 'callback';
    }, {timeoutMsg: 'Attribute data-output of body in HTML was not callback; maybe the button callback was not called?'});

    // *** button2_trial
    // Click button (for a second), check data-output
    SharedBehaviors.waitForReport('button2_trial');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25), 1000);
    const numberOfFrames = Number($('<body>').getAttribute('data-output'));
    expect(numberOfFrames).withContext('Checking if thecallback of button2 was called more than once').toBeGreaterThan(1);
    // Finish routine and wait until experiment finished
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    SharedBehaviors.waitForReport('FINISHED');
  }
};