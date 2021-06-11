const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(browser.getExperimentUrl());
    let calibration = SharedBehaviors.performPavloviaPrelude();
    // trialList per loop
    let loop_simple = [{"inner_id":"i0","word":"w0"},{"inner_id":"i1","word":"w1"},{"inner_id":"i2","word":"w2"},{"inner_id":"i3","word":"w3"}];
    let loop_inner = [{"inner_id":"i0","word":"w0"},{"inner_id":"i1","word":"w1"}];
    let loop_outer = [{"outer_id":"o0"},{"outer_id":"o1"}];
    // Specific properties per loop iteration
    let loopData = [
      {"loop_simple_nRemaining":3,"loop_simple_nTotal":4,"loop_simple_thisIndex":3,"loop_simple_thisN":0,"loop_simple_thisRepN":0,"loop_simple_thisTrial":{"inner_id":"i3","word":"w3"},"loop_simple_thisTrialN":0,"loop_simple_trialList":loop_simple,"inner_id":"i3","word":"w3"},
      {"loop_simple_nRemaining":2,"loop_simple_nTotal":4,"loop_simple_thisIndex":1,"loop_simple_thisN":1,"loop_simple_thisRepN":0,"loop_simple_thisTrial":{"inner_id":"i1","word":"w1"},"loop_simple_thisTrialN":1,"loop_simple_trialList":loop_simple,"inner_id":"i1","word":"w1"},
      {"loop_simple_nRemaining":1,"loop_simple_nTotal":4,"loop_simple_thisIndex":0,"loop_simple_thisN":2,"loop_simple_thisRepN":0,"loop_simple_thisTrial":{"inner_id":"i0","word":"w0"},"loop_simple_thisTrialN":2,"loop_simple_trialList":loop_simple,"inner_id":"i0","word":"w0"},
      {"loop_simple_nRemaining":0,"loop_simple_nTotal":4,"loop_simple_thisIndex":2,"loop_simple_thisN":3,"loop_simple_thisRepN":0,"loop_simple_thisTrial":{"inner_id":"i2","word":"w2"},"loop_simple_thisTrialN":3,"loop_simple_trialList":loop_simple,"inner_id":"i2","word":"w2"},
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
      {"loop_inner_nRemaining":1,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":6,"loop_inner_thisRepN":3,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":0,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i0","word":"w0","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer},
      {"loop_inner_nRemaining":0,"loop_inner_nTotal":8,"loop_inner_thisIndex":0,"loop_inner_thisN":7,"loop_inner_thisRepN":3,"loop_inner_thisTrial":{"inner_id":"i0","word":"w0"},"loop_inner_thisTrialN":1,"loop_outer_nRemaining":0,"loop_outer_nTotal":2,"loop_outer_thisIndex":1,"loop_outer_thisN":1,"loop_outer_thisRepN":0,"loop_outer_thisTrial":{"outer_id":"o1"},"loop_outer_thisTrialN":1,"inner_id":"i0","word":"w0","outer_id":"o1","loop_inner_trialList":loop_inner,"loop_outer_trialList": loop_outer}      
    ];
    // Tap through intro slides
    SharedBehaviors.waitForReport('intro_general');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    SharedBehaviors.waitForReport('intro_simple');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    var counter = 0;
    let output;
    // 4 iterations of loop_simple
    for (let i = 0; i < 4; i++) {
      SharedBehaviors.waitForReport(counter.toString());
      // Get current loop output
      output = JSON.parse($('<body>').getAttribute('data-output'));
      // Check each property of loopData against loop output
      for (let property in loopData[counter]) {
        expect(output[property]).withContext('loop_simple, iteration ' + i + ' (counter ' + counter + '), property ' + property).toEqual(loopData[counter][property]);
      }
      // Tap to next trial
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
      // Increment glocal counter
      counter++;
    }
    // Tap through intro slide
    SharedBehaviors.waitForReport('intro_nested');
    SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    // 16 iterations of loop_nested
    for (let i = 0; i < 16; i++) {
      SharedBehaviors.waitForReport(counter.toString());
      // Get current loop output
      output = JSON.parse($('<body>').getAttribute('data-output'));
      // Check each property of loopData against loop output
      for (let property in loopData[counter]) {
        expect(output[property]).withContext('loop_simple, iteration ' + i + ' (counter ' + counter + '), property ' + property).toEqual(loopData[counter][property]);
      }
      // Tap to next trial
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
      // Increment glocal counter
      counter++;
    }
    
    // Check if experiment finishes
    SharedBehaviors.waitForReport("FINISHED");
  }
};