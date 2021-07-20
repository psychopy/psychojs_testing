const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');
const TestCollector = require('../../scripts/shared/TestCollector.cjs');
const lotus = true;
const wave = 1;

module.exports = {
  run: () => {
    // Smartphone or keyboard
    let dev = ['ios', 'and'].includes(browser.getPlatformName().substr(0, 3))? 'sm': 'kb';
    let respond;
    console.log('[int_flanker.cjs] dev is ' + dev);

    // *** Calibration
    // Store current testConfig
    let testConfig = browser.getTestConfig();
    // Setup rotation required during calibration
    let rotateTo = dev === 'sm'? 'landscape': null;
    // Perform calibration
    console.log('[int_flanker.cjs] perform calibration');
    let calibrationTest = TestCollector.collectTests('wdio_calibration').wdio[0];
    browser.setTestConfig(calibrationTest);
    console.log('[int_flanker.cjs] ' + calibrationTest.path);
    let calibration = SharedBehaviors.performCalibrationExperiment(true, rotateTo);
    if (dev === 'sm') {
      console.log('[int_flanker.cjs] turn to portrait');
      browser.setOrientation('portrait');
    }

    // Restore testconfig for current test
    browser.setTestConfig(testConfig);

    // *** Before QN
    console.log('[int_flanker.cjs] perform before');
    if (lotus) {
      browser.url(
        'https://www.lab.uva.nl/lotus/arrow_task/event/MJ_start?&cid=678&sid=111&sam=st&str=kb_st_st_st' +
        '&wid=' + wave +
        '&dev=' + dev +
        '&pid=' + browser.getPlatformName()
      );
      // Info brochure
      browser.pause(8000);
      console.log('[int_flanker.cjs] info brochure');
      browser.writeScreenshot('info_brochure');
      //browser.touchScroll(0, 1000);
      browser.pause(2000);
      $('#NextButton').click();
      // Informed consent
      browser.pause(2000);
      console.log('[int_flanker.cjs] consent');
      $('#QID15-2-label').click();
      $('#NextButton').click();
      // Post yes consent
      console.log('[int_flanker.cjs] post consent');
      browser.pause(2000);
      $('#NextButton').click();
      browser.pause(8000);
    } else {
      browser.url(browser.getExperimentUrl());
    }


    console.log('[int_flanker.cjs] perform int_flanker');
    SharedBehaviors.performPavloviaPrelude(waitForCanvas = true);
    // Wait for prepare_trial, make screenshot, go landscape
    browser.pause(500);
    browser.writeScreenshot('prepare');
    if (dev === 'sm') {
      console.log('[int_flanker.cjs] turn to landscape');
      browser.setOrientation('landscape');
    }
    browser.pause(2000);

    // Go through slideshow
    let buttons;
    for (let i = 0; i < 11; i++) {
      console.log('[int_flanker.cjs] slide_' + i);
      SharedBehaviors.waitForReport('slideshow_trial');
      browser.pause(500);
      browser.writeScreenshot('slideshow_' + i);
      if (i == 0) {
        // Get button coordinates, setup response
        buttons = JSON.parse($('<body>').getAttribute('data-info'));
        console.log(buttons);
        if (dev === 'kb') {
          respond = function(response) {
            let key = {
              'flanker_left': 's',
              'flanker_right': 'l'
            }[response];
            browser.performActions([{
              "type": "key",
              "id": "test1",
              "actions": [
                {"type": "keyDown", "value": key},
                {"type": "keyUp", "value": key}
              ]
            }]);
          }
        }
        if (dev ==='sm') {
          respond = function (response) {
            let button = response === 'flanker_left'? 'left_button': 'right_button';
            /*console.log([
              response,
              button,
              buttons[button][0],
              calibration.transformX(buttons[button][0]),
              buttons[button][1],
              calibration.transformY(buttons[button][1])
            ]);*/
            SharedBehaviors.tapAtCoordinate(
              calibration.transformX(buttons[button][0]), 
              calibration.transformY(buttons[button][1])
            );
          }
        }
      }
      respond('flanker_right');
    } 

    // Each block
    let nReps = [1, 2, 2];
    let correct_response, button;
    for (let block = 0; block < nReps.length; block++) {
      for (let i = 0; i < 4 * nReps[block]; i++) {
        // Wait for next trial
        console.log('[int_flanker.cjs] flanker_' + i);
        SharedBehaviors.waitForReport('flanker_trial');
        correct_response = $('<body>').getAttribute('data-info');
        // Make a screenshot of first trial
        if (block === 0 && i === 0) {
          browser.writeScreenshot('flanker');
        }
        // Wait a sec, make screenshot, Give correct response
        browser.pause(1000);
        browser.writeScreenshot('rehearsal_flanker_' + i);
        respond(correct_response);
        if (block === 0) {
          // Wait for feedback
          console.log('[int_flanker.cjs] feedback_' + i);
          SharedBehaviors.waitForReport('feedback_trial');
          // Wait a sec, make screenshot, Give correct response
          browser.pause(500);
          browser.writeScreenshot('rehearsal_fb_' + i);
          respond('flanker_right');
        }
      } 
      // Tap past post-block slide
      console.log('[int_flanker.cjs] postblock');
      browser.pause(2000);
      respond('flanker_right');
    }

    // *** After QN
    if (lotus) {
      // Wait until all data is in
      browser.pause(8000);
      $('#NextButton').click();
    }
  }
};