const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('int_gonogo'));
    SharedBehaviors.performPavloviaPrelude();
    // Wait for slideshow
    SharedBehaviors.waitForReport('slideshow');
    // Make a screenshot
    browser.writeScreenshot('slideshow');
  }
};