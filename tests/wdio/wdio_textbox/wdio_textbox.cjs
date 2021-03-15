
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
      throw new Error('test wdio_textbox requires fine calibration')
    }
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    SharedBehaviors.performPavloviaPrelude();
    // Go through intro
    SharedBehaviors.waitForReport('intro');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));

    // *** textbox1
    // type something in textbox, make screenshot
    SharedBehaviors.waitForReport('textbox1');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    browser.performActions([{
      "type": "key",
      "id": "hello",
      "actions": typeText('hello')
    }]);
    browser.writeScreenshot('textbox1_immediate');
    browser.pause(1000);
    browser.writeScreenshot('textbox1_delayed');
    // Tap submit button (twice)
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    browser.pause(100);
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    // Check what's in the textbox is what's typed in, then press "y"
    SharedBehaviors.waitForReport('feedback1');
    expect($('<body>').getAttribute('data-output')).toBe('hello');
    browser.performActions([{
      "type": "key",
      "id": "press",
      "actions": typeText('y')
    }]);

    // *** textbox1
    // type something in textbox, make screenshot
    SharedBehaviors.waitForReport('textbox2');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    browser.performActions([{
      "type": "key",
      "id": "goodbye",
      "actions": typeText('goodbye')
    }]);
    browser.writeScreenshot('textbox2_immediate');
    browser.pause(1000);
    browser.writeScreenshot('textbox2_delayed');
    // Tap submit button (twice)
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    browser.pause(100);
    //SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    // Check what's in the textbox is what's typed in, then press "y"
    SharedBehaviors.waitForReport('feedback2');
    expect($('<body>').getAttribute('data-output')).toBe('goodbye');
    
    // Finish experiment
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    SharedBehaviors.waitForReport('FINISHED');
  }
};