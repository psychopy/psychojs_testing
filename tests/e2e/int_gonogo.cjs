const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration) => {
    // Fine calibration required
    if (calibration === undefined) {
      throw new Error('test int_gonogo requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('int_gonogo'));
    SharedBehaviors.performPavloviaPrelude();
    // Wait for slideshow
    SharedBehaviors.waitForReport('slideshow');
    // Make a screenshot
    browser.writeScreenshot('slideshow');
  }
};