const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    // Rough calibration
    SharedBehaviors.performPavloviaPrelude(waitForCanvas = false);
    
    // Check if error message is set
    let errorMessage = $('<body>').getAttribute('data-error');
    expect(errorMessage).not.toBeNull();
  }
};