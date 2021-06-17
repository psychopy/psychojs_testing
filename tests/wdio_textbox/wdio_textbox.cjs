
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

    // *** textbox_trial1
    // Make a screenshot, then tap once on the blue square
    SharedBehaviors.waitForReport('textbox_trial1');
    browser.writeScreenshot('textbox_trial1');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));
    browser.pause(100);
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));

    // *** textbox_trial2
    // Make a screenshot, then tap once on the blue square
    SharedBehaviors.waitForReport('textbox_trial2');
    browser.writeScreenshot('textbox_trial2');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(-0.25));

    // *** textbox_trial2
    // Type in "test", make a screenshot, then press "x" to finish the routine
    SharedBehaviors.waitForReport('textbox_trial3');
    browser.performActions([{
      "type": "key",
      "id": "test1",
      "actions": typeText('test')
    }]);
    browser.writeScreenshot('textbox3');
    browser.performActions([{
      "type": "key",
      "id": "intro_trial2",
      "actions": typeText('x')
    }]);

    // *** Finish
    // Wait until experiment finished, then check whether typed in text is indeed "test"
    SharedBehaviors.waitForReport('FINISHED');
    let data = browser.execute(function() {
      return psychoJS.experiment._trialsData;
    });        
    console.log(data);
    expect(data[0]['textbox3.text']).toBe('testx');
  }
};