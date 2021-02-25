const SharedBehaviors = require('../../shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    // Rough calibration1
    SharedBehaviors.performPavloviaPrelude(waitForCanvas = false);
    // Wait for correct report value
    SharedBehaviors.waitForReport('not_implemented begin_experiment begin_routine each_frame end_routine end_experiment');
  }
};