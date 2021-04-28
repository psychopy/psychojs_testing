
const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

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
    // type something in textbox, wait 100ms, make screenshot, submit
    SharedBehaviors.waitForReport('textbox1');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    browser.performActions([{
      "type": "key",
      "id": "test1",
      "actions": typeText('test1')
    }]);
    browser.pause(100);
    //browser.writeScreenshot('textbox1');
    browser.pause(100);
    // Tap submit button (once)
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    browser.pause(100);
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));

    // Go through intro2
    SharedBehaviors.waitForReport('intro_trial2');
    browser.performActions([{
      "type": "key",
      "id": "intro_trial2",
      "actions": typeText('y')
    }]);

    // *** textbox2
    // type something in textbox, wait 100ms, make screenshot, submit
    SharedBehaviors.waitForReport('textbox2');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    browser.performActions([{
      "type": "key",
      "id": "test2",
      "actions": typeText('test2')
    }]);
    browser.pause(1000);
    //browser.writeScreenshot('textbox2');
    // Tap submit button (once)
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));

    // Wait until experiment finished
    SharedBehaviors.waitForReport('FINISHED');

    // Check data
    let data = browser.execute(function() {
      return psychoJS.experiment._trialsData;
    });        
    console.log(data);
    expect(data[0]['textbox1.text']).toBe('test1');
    expect(data[0]['textbox2.text']).toBe('test2');
  }
};