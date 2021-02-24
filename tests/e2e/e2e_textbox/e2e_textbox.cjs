
const SharedBehaviors = require('../../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    // Returns a sequence of actions in which element of text is translated to a key press
    let typeText = (text) => {
      result = [];
      for (let i = 0; i < text.length; i++) {
        result = result.concat([
          {"type": "keyDown", "value": text[i]},
          {"type": "keyUp", "value": text[i]}
        ]);
      }
      return result;
    }
    // Skip iPhone (no support of key actions)
    // if (browser.getPlatformName().includes('iPhone')) {
    //   pending();
    // }
    // This experiment requires fine calibration; throw error if no calibration provided
    if (calibration === null) {
      throw new Error('test e2e_textbox requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    SharedBehaviors.performPavloviaPrelude();
    // Go through intro, type something in textbox, make screenshot
    SharedBehaviors.waitForReport('intro');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    SharedBehaviors.waitForReport('textbox');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    browser.performActions([{
      "type": "key",
      "id": "hello",
      "actions": typeText('hello')
    }]);
    browser.writeScreenshot('textbox_immediate');
    browser.pause(1000);
    browser.writeScreenshot('textbox_delayed');
    // Tap submit button
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    //browser.pause(1000);
    //SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    SharedBehaviors.waitForReport('feedback');
    browser.writeScreenshot('textbox_feedback');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    SharedBehaviors.waitForReport('FINISHED');
  }
};