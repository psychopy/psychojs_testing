const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // trialList per loop
    let loop_simples = [{"inner_id":"i0","word":"w0"},{"inner_id":"i1","word":"w1"},{"inner_id":"i2","word":"w2"},{"inner_id":"i3","word":"w3"}];
    let loop_inner = [{"inner_id":"i0","word":"w0"},{"inner_id":"i1","word":"w1"}];
    let loop_outer = [{"outer_id":"o0"},{"outer_id":"o1"}];
    // Specific properties per loop iteration
    let loopData = [
      {"loop_simples_nRemaining":3,"loop_simples_nTotal":4,"loop_simples_thisIndex":3,"loop_simples_thisN":0,"loop_simples_thisRepN":0,"loop_simples_thisTrial":{"inner_id":"i3","word":"w3"},"loop_simples_thisTrialN":0,"loop_simples_trialList":loop_simples,"inner_id":"i3","word":"w3", "loop_simples_thisTrial_inner_id": "i3", "thisLoop_simple_inner_id": "i3", "thisLoop_simple_word": "w3"},
      {"loop_simples_nRemaining":2,"loop_simples_nTotal":4,"loop_simples_thisIndex":1,"loop_simples_thisN":1,"loop_simples_thisRepN":0,"loop_simples_thisTrial":{"inner_id":"i1","word":"w1"},"loop_simples_thisTrialN":1,"loop_simples_trialList":loop_simples,"inner_id":"i1","word":"w1", "thisLoop_simple_inner_id": "i1", "thisLoop_simple_word": "w1"},
      {"loop_simples_nRemaining":1,"loop_simples_nTotal":4,"loop_simples_thisIndex":0,"loop_simples_thisN":2,"loop_simples_thisRepN":0,"loop_simples_thisTrial":{"inner_id":"i0","word":"w0"},"loop_simples_thisTrialN":2,"loop_simples_trialList":loop_simples,"inner_id":"i0","word":"w0", "thisLoop_simple_inner_id": "i0", "thisLoop_simple_word": "w0"},
      {"loop_simples_nRemaining":0,"loop_simples_nTotal":4,"loop_simples_thisIndex":2,"loop_simples_thisN":3,"loop_simples_thisRepN":0,"loop_simples_thisTrial":{"inner_id":"i2","word":"w2"},"loop_simples_thisTrialN":3,"loop_simples_trialList":loop_simples,"inner_id":"i2","word":"w2", "thisLoop_simple_inner_id": "i2", "thisLoop_simple_word": "w2"},
      {"loop_inner_nRemaining":7,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":0,"loop_inner_thisRepN":0,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i1","word":"w1","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":6,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":1,"loop_inner_thisRepN":0,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i0","word":"w0","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":5,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":2,"loop_inner_thisRepN":1,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i0","word":"w0","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":4,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":3,"loop_inner_thisRepN":1,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i1","word":"w1","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":3,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":4,"loop_inner_thisRepN":2,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i1","word":"w1","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":2,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":5,"loop_inner_thisRepN":2,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i1","word":"w1","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":1,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":6,"loop_inner_thisRepN":3,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i0","word":"w0","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":0,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":7,"loop_inner_thisRepN":3,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":1,"loop_outer_nTotal":2,"loop_outer_thisIndex":0,"loop_outer_thisN":0,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o0"},"loop_outer_thisTrialN":0,"inner_id":"i0","word":"w0","outer_id":"o0","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":7,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":0,"loop_inner_thisRepN":0,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i1","word":"w1","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":6,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":1,"loop_inner_thisRepN":0,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i0","word":"w0","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":5,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":2,"loop_inner_thisRepN":1,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i0","word":"w0","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":4,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":3,"loop_inner_thisRepN":1,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i1","word":"w1","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":3,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":4,"loop_inner_thisRepN":2,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i1","word":"w1","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":2,"loop_inner_nTotal":8,"loop_inner_thisIndex":1,"loop_inner_thisN":5,"loop_inner_thisRepN":2,"loop_inner_thisTrial":{"inner_id":"i1","word":"w1"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i1","word":"w1","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      /* // This part is skipped by setting the loop finished attributes
      {"loop_inner_nRemaining":1,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":6,"loop_inner_thisRepN":3,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i0","word":"w0","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":0,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":7,"loop_inner_thisRepN":3,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i0","word":"w0","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer}      
      */
      {"loop_nocondition_nRemaining":1,"loop_nocondition_nTotal":2,"loop_nocondition_thisIndex":0,"loop_nocondition_thisN":0,"loop_nocondition_thisRepN":0,"loop_nocondition_thisTrialN":0},
      {"loop_nocondition_nRemaining":0,"loop_nocondition_nTotal":2,"loop_nocondition_thisIndex":0,"loop_nocondition_thisN":1,"loop_nocondition_thisRepN":1,"loop_nocondition_thisTrialN":0}
    ];
    
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    let calibration = SharedBehaviors.performPavloviaPrelude();
    
    // Tap through general intro
    SharedBehaviors.waitForReport('intro_general');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));

    // *** loop_simples
    // Tap through intro slide
    SharedBehaviors.waitForReport('intro_simple');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    var counter = 0;
    let output;
    // 4 iterations of loop_simples
    for (let i = 0; i < 4; i++) {
      SharedBehaviors.waitForReport(counter.toString());
      // Get current loop output
      output = JSON.parse($('<body>').getAttribute('data-output'));
      // Check each property of loopData against loop output
      for (let property in loopData[counter]) {
        expect(output[property]).withContext('loop_simples, iteration ' + i + ' (counter ' + counter + '), property ' + property).toEqual(loopData[counter][property]);
      }
      // Tap to next trial
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
      // Increment global counter
      counter++;
    }

    // *** loop_nested
    // Tap through intro slide
    SharedBehaviors.waitForReport('intro_nested');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // 16 iterations of loop_nested
    for (let i = 0; i < 14; i++) {
      SharedBehaviors.waitForReport(counter.toString());
      // Get current loop output
      output = JSON.parse($('<body>').getAttribute('data-output'));
      // Check each property of loopData against loop output
      for (let property in loopData[counter]) {
        expect(output[property]).withContext('loop_nested, iteration ' + i + ' (counter ' + counter + '), property ' + property).toEqual(loopData[counter][property]);
      }
      // Tap to next trial
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
      // Increment global counter
      counter++;
    }

    // *** loop_nocondition
    // Tap through intro slide
    SharedBehaviors.waitForReport('intro_nocondition');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // 16 iterations of loop_nested
    for (let i = 0; i < 2; i++) {
      SharedBehaviors.waitForReport(counter.toString());
      // Get current loop output
      output = JSON.parse($('<body>').getAttribute('data-output'));
      // Check each property of loopData against loop output
      for (let property in loopData[counter]) {
        expect(output[property]).withContext('loop_nocondition, iteration ' + i + ' (counter ' + counter + '), property ' + property).toEqual(loopData[counter][property]);
      }
      // Tap to next trial
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
      // Increment global counter
      counter++;
    }
    
    // Check if experiment finishes
    SharedBehaviors.waitForReport("FINISHED");
  }
};