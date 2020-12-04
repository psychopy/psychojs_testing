const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_code'));
    SharedBehaviors.performPavloviaPrelude(waitForCanvas = false);
    // Wait for correct report value
    SharedBehaviors.waitForReport('not_implemented begin_experiment begin_routine each_frame end_routine end_experiment');
  }
};