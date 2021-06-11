/************************* 
 * Wdio_Calibration Test *
 *************************/


// store info about the experiment session:
let expName = 'wdio_calibration';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0, 0, 0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(calibration_0_trialRoutineBegin());
flowScheduler.add(calibration_0_trialRoutineEachFrame());
flowScheduler.add(calibration_0_trialRoutineEnd());
flowScheduler.add(calibration_1_trialRoutineBegin());
flowScheduler.add(calibration_1_trialRoutineEachFrame());
flowScheduler.add(calibration_1_trialRoutineEnd());
flowScheduler.add(verification_trialRoutineBegin());
flowScheduler.add(verification_trialRoutineEachFrame());
flowScheduler.add(verification_trialRoutineEnd());
flowScheduler.add(verification_fb_trialRoutineBegin());
flowScheduler.add(verification_fb_trialRoutineEachFrame());
flowScheduler.add(verification_fb_trialRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
async function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.2.0';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var calibration_0_trialClock;
var c0_text;
var c0_mouse;
var calibration_1_trialClock;
var c1_background;
var c1_pointer;
var c1_mouse;
var verification_trialClock;
var v_background;
var v_pointer;
var v_mouse;
var verification_fb_trialClock;
var vfb_background;
var vfb_expected;
var vfb_pointer;
var vfb_mouse;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "calibration_0_trial"
  calibration_0_trialClock = new util.Clock();
  c0_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'c0_text',
    text: 'wdio_map_click\n\nThis experiment draws a small square a the location of a click/tap. This way, we can examine where a click occurs in an automated end-to-end test that invokes "performActions" to click at a particular coordinate.\n\nClick anywhere to continue and draw the square...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  c0_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  c0_mouse.mouseClock = new util.Clock();
  //document.body.setAttribute("data-report", "STARTED");
  
  // Initialize components for Routine "calibration_1_trial"
  calibration_1_trialClock = new util.Clock();
  c1_background = new visual.Rect ({
    win: psychoJS.window, name: 'c1_background', 
    width: [1, 1][0], height: [1, 1][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  c1_pointer = new visual.Rect ({
    win: psychoJS.window, name: 'c1_pointer', 
    width: [0.02, 0.02][0], height: [0.02, 0.02][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -1, interpolate: true,
  });
  
  c1_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  c1_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "verification_trial"
  verification_trialClock = new util.Clock();
  v_background = new visual.Rect ({
    win: psychoJS.window, name: 'v_background', 
    width: [1, 1][0], height: [1, 1][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), 1, (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  v_pointer = new visual.Rect ({
    win: psychoJS.window, name: 'v_pointer', 
    width: [0.02, 0.02][0], height: [0.02, 0.02][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -1, interpolate: true,
  });
  
  v_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  v_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "verification_fb_trial"
  verification_fb_trialClock = new util.Clock();
  vfb_background = new visual.Rect ({
    win: psychoJS.window, name: 'vfb_background', 
    width: [1, 1][0], height: [1, 1][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  vfb_expected = new visual.Rect ({
    win: psychoJS.window, name: 'vfb_expected', 
    width: [0.02, 0.02][0], height: [0.02, 0.02][1],
    ori: 0, pos: [0.25, 0.25],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), (- 1)]),
    opacity: 1, depth: -1, interpolate: true,
  });
  
  vfb_pointer = new visual.Rect ({
    win: psychoJS.window, name: 'vfb_pointer', 
    width: [0.02, 0.02][0], height: [0.02, 0.02][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  vfb_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  vfb_mouse.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var calibration_0_trialComponents;
function calibration_0_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'calibration_0_trial'-------
    t = 0;
    calibration_0_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the c0_mouse
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'calibration_0');
    // keep track of which components have finished
    calibration_0_trialComponents = [];
    calibration_0_trialComponents.push(c0_text);
    calibration_0_trialComponents.push(c0_mouse);
    
    calibration_0_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function calibration_0_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'calibration_0_trial'-------
    // get current time
    t = calibration_0_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *c0_text* updates
    if (t >= 0.0 && c0_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      c0_text.tStart = t;  // (not accounting for frame time here)
      c0_text.frameNStart = frameN;  // exact frame index
      
      c0_text.setAutoDraw(true);
    }

    // *c0_mouse* updates
    if (t >= 0.0 && c0_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      c0_mouse.tStart = t;  // (not accounting for frame time here)
      c0_mouse.frameNStart = frameN;  // exact frame index
      
      c0_mouse.status = PsychoJS.Status.STARTED;
      c0_mouse.mouseClock.reset();
      prevButtonState = c0_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (c0_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = c0_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    calibration_0_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var _mouseXYs;
function calibration_0_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'calibration_0_trial'-------
    calibration_0_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = c0_mouse.getPos();
    _mouseButtons = c0_mouse.getPressed();
    psychoJS.experiment.addData('c0_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('c0_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('c0_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('c0_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('c0_mouse.rightButton', _mouseButtons[2]);
    // the Routine "calibration_0_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var calibration_1_trialComponents;
function calibration_1_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'calibration_1_trial'-------
    t = 0;
    calibration_1_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    c1_pointer.setPos([c0_mouse.getPos()[0], c0_mouse.getPos()[1]]);
    // setup some python lists for storing info about the c1_mouse
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'calibration_1');
    document.body.setAttribute('data-x', c0_mouse.getPos()[0]);
    document.body.setAttribute('data-y', c0_mouse.getPos()[1]);
    // keep track of which components have finished
    calibration_1_trialComponents = [];
    calibration_1_trialComponents.push(c1_background);
    calibration_1_trialComponents.push(c1_pointer);
    calibration_1_trialComponents.push(c1_mouse);
    
    calibration_1_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function calibration_1_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'calibration_1_trial'-------
    // get current time
    t = calibration_1_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *c1_background* updates
    if (t >= 0.0 && c1_background.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      c1_background.tStart = t;  // (not accounting for frame time here)
      c1_background.frameNStart = frameN;  // exact frame index
      
      c1_background.setAutoDraw(true);
    }

    
    // *c1_pointer* updates
    if (t >= 0.0 && c1_pointer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      c1_pointer.tStart = t;  // (not accounting for frame time here)
      c1_pointer.frameNStart = frameN;  // exact frame index
      
      c1_pointer.setAutoDraw(true);
    }

    // *c1_mouse* updates
    if (t >= 0.0 && c1_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      c1_mouse.tStart = t;  // (not accounting for frame time here)
      c1_mouse.frameNStart = frameN;  // exact frame index
      
      c1_mouse.status = PsychoJS.Status.STARTED;
      c1_mouse.mouseClock.reset();
      prevButtonState = c1_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (c1_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = c1_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    calibration_1_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function calibration_1_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'calibration_1_trial'-------
    calibration_1_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = c1_mouse.getPos();
    _mouseButtons = c1_mouse.getPressed();
    psychoJS.experiment.addData('c1_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('c1_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('c1_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('c1_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('c1_mouse.rightButton', _mouseButtons[2]);
    // the Routine "calibration_1_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var verification_trialComponents;
function verification_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'verification_trial'-------
    t = 0;
    verification_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    v_pointer.setPos([c1_mouse.getPos()[0], c1_mouse.getPos()[1]]);
    // setup some python lists for storing info about the v_mouse
    // current position of the mouse:
    v_mouse.x = [];
    v_mouse.y = [];
    v_mouse.leftButton = [];
    v_mouse.midButton = [];
    v_mouse.rightButton = [];
    v_mouse.time = [];
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'verification');
    document.body.setAttribute('data-x', c1_mouse.getPos()[0]);
    document.body.setAttribute('data-y', c1_mouse.getPos()[1]);
    // keep track of which components have finished
    verification_trialComponents = [];
    verification_trialComponents.push(v_background);
    verification_trialComponents.push(v_pointer);
    verification_trialComponents.push(v_mouse);
    
    verification_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function verification_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'verification_trial'-------
    // get current time
    t = verification_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *v_background* updates
    if (t >= 0.0 && v_background.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      v_background.tStart = t;  // (not accounting for frame time here)
      v_background.frameNStart = frameN;  // exact frame index
      
      v_background.setAutoDraw(true);
    }

    
    // *v_pointer* updates
    if (t >= 0.0 && v_pointer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      v_pointer.tStart = t;  // (not accounting for frame time here)
      v_pointer.frameNStart = frameN;  // exact frame index
      
      v_pointer.setAutoDraw(true);
    }

    // *v_mouse* updates
    if (t >= 0.0 && v_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      v_mouse.tStart = t;  // (not accounting for frame time here)
      v_mouse.frameNStart = frameN;  // exact frame index
      
      v_mouse.status = PsychoJS.Status.STARTED;
      v_mouse.mouseClock.reset();
      prevButtonState = v_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (v_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = v_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = v_mouse.getPos();
          v_mouse.x.push(_mouseXYs[0]);
          v_mouse.y.push(_mouseXYs[1]);
          v_mouse.leftButton.push(_mouseButtons[0]);
          v_mouse.midButton.push(_mouseButtons[1]);
          v_mouse.rightButton.push(_mouseButtons[2]);
          v_mouse.time.push(v_mouse.mouseClock.getTime());
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    verification_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function verification_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'verification_trial'-------
    verification_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    if (v_mouse.x) {  psychoJS.experiment.addData('v_mouse.x', v_mouse.x[0])};
    if (v_mouse.y) {  psychoJS.experiment.addData('v_mouse.y', v_mouse.y[0])};
    if (v_mouse.leftButton) {  psychoJS.experiment.addData('v_mouse.leftButton', v_mouse.leftButton[0])};
    if (v_mouse.midButton) {  psychoJS.experiment.addData('v_mouse.midButton', v_mouse.midButton[0])};
    if (v_mouse.rightButton) {  psychoJS.experiment.addData('v_mouse.rightButton', v_mouse.rightButton[0])};
    if (v_mouse.time) {  psychoJS.experiment.addData('v_mouse.time', v_mouse.time[0])};
    
    // the Routine "verification_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var verification_fb_trialComponents;
function verification_fb_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'verification_fb_trial'-------
    t = 0;
    verification_fb_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    vfb_pointer.setPos([v_mouse.getPos()[0], v_mouse.getPos()[1]]);
    document.body.setAttribute('data-report', 'verification_feedback');
    document.body.setAttribute('data-x', v_mouse.getPos()[0]);
    document.body.setAttribute('data-y', v_mouse.getPos()[1]);
    // setup some python lists for storing info about the vfb_mouse
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    verification_fb_trialComponents = [];
    verification_fb_trialComponents.push(vfb_background);
    verification_fb_trialComponents.push(vfb_expected);
    verification_fb_trialComponents.push(vfb_pointer);
    verification_fb_trialComponents.push(vfb_mouse);
    
    verification_fb_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function verification_fb_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'verification_fb_trial'-------
    // get current time
    t = verification_fb_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *vfb_background* updates
    if (t >= 0.0 && vfb_background.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vfb_background.tStart = t;  // (not accounting for frame time here)
      vfb_background.frameNStart = frameN;  // exact frame index
      
      vfb_background.setAutoDraw(true);
    }

    
    // *vfb_expected* updates
    if (t >= 0.0 && vfb_expected.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vfb_expected.tStart = t;  // (not accounting for frame time here)
      vfb_expected.frameNStart = frameN;  // exact frame index
      
      vfb_expected.setAutoDraw(true);
    }

    
    // *vfb_pointer* updates
    if (t >= 0.0 && vfb_pointer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vfb_pointer.tStart = t;  // (not accounting for frame time here)
      vfb_pointer.frameNStart = frameN;  // exact frame index
      
      vfb_pointer.setAutoDraw(true);
    }

    // *vfb_mouse* updates
    if (t >= 0.0 && vfb_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vfb_mouse.tStart = t;  // (not accounting for frame time here)
      vfb_mouse.frameNStart = frameN;  // exact frame index
      
      vfb_mouse.status = PsychoJS.Status.STARTED;
      vfb_mouse.mouseClock.reset();
      prevButtonState = vfb_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (vfb_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = vfb_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    verification_fb_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function verification_fb_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'verification_fb_trial'-------
    verification_fb_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = vfb_mouse.getPos();
    _mouseButtons = vfb_mouse.getPressed();
    psychoJS.experiment.addData('vfb_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('vfb_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('vfb_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('vfb_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('vfb_mouse.rightButton', _mouseButtons[2]);
    // the Routine "verification_fb_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  document.body.setAttribute('data-report', 'FINISHED');
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
