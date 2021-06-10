
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

    // *** button
    // Click button, check data-report (and later data-output)
    SharedBehaviors.waitForReport('button');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0.25));

    // Wait until experiment finished
    SharedBehaviors.waitForReport('FINISHED');
    browser.waitUntil(() => {
      return $('<body>').getAttribute('data-output') === 'callback';
    }, {timeoutMsg: 'Attribute data-output of body in HTML was not callback; maybe the button callback was not called?'});
  }
};