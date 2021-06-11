/************************ 
 * Wdio_Conditions Test *
 ************************/


// store info about the experiment session:
let expName = 'wdio_conditions';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
let counter = 0;
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
flowScheduler.add(intro_generalRoutineBegin());
flowScheduler.add(intro_generalRoutineEachFrame());
flowScheduler.add(intro_generalRoutineEnd());
flowScheduler.add(intro_simpleRoutineBegin());
flowScheduler.add(intro_simpleRoutineEachFrame());
flowScheduler.add(intro_simpleRoutineEnd());
const loop_simpleLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_simpleLoopBegin(loop_simpleLoopScheduler));
flowScheduler.add(loop_simpleLoopScheduler);
flowScheduler.add(loop_simpleLoopEnd);
flowScheduler.add(intro_nestedRoutineBegin());
flowScheduler.add(intro_nestedRoutineEachFrame());
flowScheduler.add(intro_nestedRoutineEnd());
const loop_outerLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_outerLoopBegin(loop_outerLoopScheduler));
flowScheduler.add(loop_outerLoopScheduler);
flowScheduler.add(loop_outerLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'resources/loop_outer.xlsx', 'path': 'resources/loop_outer.xlsx'},
    {'name': 'resources/loop_inner.csv', 'path': 'resources/loop_inner.csv'}
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


var intro_generalClock;
var text_intro_general;
var mouse_intro_general;
var intro_simpleClock;
var text_intro_simple;
var mouse_intro_simple;
var trial_simpleClock;
var text_simple;
var mouse_simple;
var intro_nestedClock;
var text_intro_nested;
var mouse_intro_nested;
var trial_nestedClock;
var text_nested;
var mouse_nested;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "intro_general"
  intro_generalClock = new util.Clock();
  text_intro_general = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_intro_general',
    text: 'wdio_conditions\n\nThis experiment tests reading in condition files and randomizations.\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_intro_general = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_intro_general.mouseClock = new util.Clock();
  // Initialize components for Routine "intro_simple"
  intro_simpleClock = new util.Clock();
  text_intro_simple = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_intro_simple',
    text: 'wdio_conditions: random_csv\n\nReading in a csv conditions file; looping random with nReps == 1\n\nYou should see the following sequence:\nPsychoPy: 1, 4, 3, 2\nPsychoJS: w3, w2, w0, w2\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_intro_simple = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_intro_simple.mouseClock = new util.Clock();
  // Initialize components for Routine "trial_simple"
  trial_simpleClock = new util.Clock();
  text_simple = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_simple',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_simple = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_simple.mouseClock = new util.Clock();
  // Initialize components for Routine "intro_nested"
  intro_nestedClock = new util.Clock();
  text_intro_nested = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_intro_nested',
    text: 'wdio_conditions: random_nested\n\nThe innerLoop selects rows 0:2; looping fullRandom with nReps == 3, from a CSV. The outerLoop is a sequential XLSX\n\nYou should see the following sequence:.\nPsychoPy: 2, 2, 2, 1, 1, 1\nPsychoJS: w1, w0, w0, w1, w1, w1, w0, w0, w1, w0, w0, w1, w1, w1, w0, w0\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_intro_nested = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_intro_nested.mouseClock = new util.Clock();
  // Initialize components for Routine "trial_nested"
  trial_nestedClock = new util.Clock();
  text_nested = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_nested',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_nested = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_nested.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var intro_generalComponents;
function intro_generalRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intro_general'-------
    t = 0;
    intro_generalClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_intro_general
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_general');
    // keep track of which components have finished
    intro_generalComponents = [];
    intro_generalComponents.push(text_intro_general);
    intro_generalComponents.push(mouse_intro_general);
    
    intro_generalComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function intro_generalRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intro_general'-------
    // get current time
    t = intro_generalClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_intro_general* updates
    if (t >= 0.0 && text_intro_general.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_intro_general.tStart = t;  // (not accounting for frame time here)
      text_intro_general.frameNStart = frameN;  // exact frame index
      
      text_intro_general.setAutoDraw(true);
    }

    // *mouse_intro_general* updates
    if (t >= 0.0 && mouse_intro_general.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_intro_general.tStart = t;  // (not accounting for frame time here)
      mouse_intro_general.frameNStart = frameN;  // exact frame index
      
      mouse_intro_general.status = PsychoJS.Status.STARTED;
      mouse_intro_general.mouseClock.reset();
      prevButtonState = mouse_intro_general.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_intro_general.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_intro_general.getPressed();
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
    intro_generalComponents.forEach( function(thisComponent) {
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
function intro_generalRoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_general'-------
    intro_generalComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_intro_general.getPos();
    _mouseButtons = mouse_intro_general.getPressed();
    psychoJS.experiment.addData('mouse_intro_general.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_intro_general.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_intro_general.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_intro_general.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_intro_general.rightButton', _mouseButtons[2]);
    // the Routine "intro_general" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var intro_simpleComponents;
function intro_simpleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intro_simple'-------
    t = 0;
    intro_simpleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_intro_simple
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_simple');
    // keep track of which components have finished
    intro_simpleComponents = [];
    intro_simpleComponents.push(text_intro_simple);
    intro_simpleComponents.push(mouse_intro_simple);
    
    intro_simpleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function intro_simpleRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intro_simple'-------
    // get current time
    t = intro_simpleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_intro_simple* updates
    if (t >= 0.0 && text_intro_simple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_intro_simple.tStart = t;  // (not accounting for frame time here)
      text_intro_simple.frameNStart = frameN;  // exact frame index
      
      text_intro_simple.setAutoDraw(true);
    }

    // *mouse_intro_simple* updates
    if (t >= 0.0 && mouse_intro_simple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_intro_simple.tStart = t;  // (not accounting for frame time here)
      mouse_intro_simple.frameNStart = frameN;  // exact frame index
      
      mouse_intro_simple.status = PsychoJS.Status.STARTED;
      mouse_intro_simple.mouseClock.reset();
      prevButtonState = mouse_intro_simple.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_intro_simple.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_intro_simple.getPressed();
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
    intro_simpleComponents.forEach( function(thisComponent) {
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


function intro_simpleRoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_simple'-------
    intro_simpleComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_intro_simple.getPos();
    _mouseButtons = mouse_intro_simple.getPressed();
    psychoJS.experiment.addData('mouse_intro_simple.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_intro_simple.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_intro_simple.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_intro_simple.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_intro_simple.rightButton', _mouseButtons[2]);
    // the Routine "intro_simple" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var loop_simple;
var currentLoop;
function loop_simpleLoopBegin(loop_simpleLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_simple = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/loop_inner.csv',
      seed: 43, name: 'loop_simple'
    });
    psychoJS.experiment.addLoop(loop_simple); // add the loop to the experiment
    currentLoop = loop_simple;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop_simple.forEach(function() {
      const snapshot = loop_simple.getSnapshot();
    
      loop_simpleLoopScheduler.add(importConditions(snapshot));
      loop_simpleLoopScheduler.add(trial_simpleRoutineBegin(snapshot));
      loop_simpleLoopScheduler.add(trial_simpleRoutineEachFrame());
      loop_simpleLoopScheduler.add(trial_simpleRoutineEnd());
      loop_simpleLoopScheduler.add(endLoopIteration(loop_simpleLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_simpleLoopEnd() {
  psychoJS.experiment.removeLoop(loop_simple);

  return Scheduler.Event.NEXT;
}


var loop_outer;
function loop_outerLoopBegin(loop_outerLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_outer = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/loop_outer.xlsx',
      seed: 42, name: 'loop_outer'
    });
    psychoJS.experiment.addLoop(loop_outer); // add the loop to the experiment
    currentLoop = loop_outer;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop_outer.forEach(function() {
      const snapshot = loop_outer.getSnapshot();
    
      loop_outerLoopScheduler.add(importConditions(snapshot));
      const loop_innerLoopScheduler = new Scheduler(psychoJS);
      loop_outerLoopScheduler.add(loop_innerLoopBegin(loop_innerLoopScheduler, snapshot));
      loop_outerLoopScheduler.add(loop_innerLoopScheduler);
      loop_outerLoopScheduler.add(loop_innerLoopEnd);
      loop_outerLoopScheduler.add(endLoopIteration(loop_outerLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var loop_inner;
function loop_innerLoopBegin(loop_innerLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_inner = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'resources/loop_inner.csv', '0:2'),
      seed: 42, name: 'loop_inner'
    });
    psychoJS.experiment.addLoop(loop_inner); // add the loop to the experiment
    currentLoop = loop_inner;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop_inner.forEach(function() {
      const snapshot = loop_inner.getSnapshot();
    
      loop_innerLoopScheduler.add(importConditions(snapshot));
      loop_innerLoopScheduler.add(trial_nestedRoutineBegin(snapshot));
      loop_innerLoopScheduler.add(trial_nestedRoutineEachFrame());
      loop_innerLoopScheduler.add(trial_nestedRoutineEnd());
      loop_innerLoopScheduler.add(endLoopIteration(loop_innerLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_innerLoopEnd() {
  psychoJS.experiment.removeLoop(loop_inner);

  return Scheduler.Event.NEXT;
}


async function loop_outerLoopEnd() {
  psychoJS.experiment.removeLoop(loop_outer);

  return Scheduler.Event.NEXT;
}


var trial_simpleComponents;
function trial_simpleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'trial_simple'-------
    t = 0;
    trial_simpleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_simple.setText(word);
    let loopData = { 
        //'loop_simple_extraInfo': loop_simple.extraInfo,    
        'loop_simple_finished': loop_simple.finished,
        'loop_simple_nRemaining': loop_simple.nRemaining,
        'loop_simple_nTotal': loop_simple.nTotal,
        'loop_simple_thisIndex': loop_simple.thisIndex,
        'loop_simple_thisN': loop_simple.thisN,
        'loop_simple_thisRepN': loop_simple.thisRepN,
        'loop_simple_thisTrial': loop_simple.thisTrial,
        'loop_simple_thisTrialN': loop_simple.thisTrialN,
        'loop_simple_trialList': loop_simple.trialList,
        'inner_id': inner_id,
        'word': word,
    };
    document.body.setAttribute('data-output', JSON.stringify(loopData));
    document.body.setAttribute('data-report', counter);
    counter++;
    // setup some python lists for storing info about the mouse_simple
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    trial_simpleComponents = [];
    trial_simpleComponents.push(text_simple);
    trial_simpleComponents.push(mouse_simple);
    
    trial_simpleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function trial_simpleRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'trial_simple'-------
    // get current time
    t = trial_simpleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_simple* updates
    if (t >= 0 && text_simple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_simple.tStart = t;  // (not accounting for frame time here)
      text_simple.frameNStart = frameN;  // exact frame index
      
      text_simple.setAutoDraw(true);
    }

    // *mouse_simple* updates
    if (t >= 0.0 && mouse_simple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_simple.tStart = t;  // (not accounting for frame time here)
      mouse_simple.frameNStart = frameN;  // exact frame index
      
      mouse_simple.status = PsychoJS.Status.STARTED;
      mouse_simple.mouseClock.reset();
      prevButtonState = mouse_simple.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_simple.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_simple.getPressed();
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
    trial_simpleComponents.forEach( function(thisComponent) {
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


function trial_simpleRoutineEnd() {
  return async function () {
    //------Ending Routine 'trial_simple'-------
    trial_simpleComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_simple.getPos();
    _mouseButtons = mouse_simple.getPressed();
    psychoJS.experiment.addData('mouse_simple.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_simple.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_simple.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_simple.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_simple.rightButton', _mouseButtons[2]);
    // the Routine "trial_simple" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var intro_nestedComponents;
function intro_nestedRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intro_nested'-------
    t = 0;
    intro_nestedClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_intro_nested
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_nested');
    // keep track of which components have finished
    intro_nestedComponents = [];
    intro_nestedComponents.push(text_intro_nested);
    intro_nestedComponents.push(mouse_intro_nested);
    
    intro_nestedComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function intro_nestedRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intro_nested'-------
    // get current time
    t = intro_nestedClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_intro_nested* updates
    if (t >= 0.0 && text_intro_nested.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_intro_nested.tStart = t;  // (not accounting for frame time here)
      text_intro_nested.frameNStart = frameN;  // exact frame index
      
      text_intro_nested.setAutoDraw(true);
    }

    // *mouse_intro_nested* updates
    if (t >= 0.0 && mouse_intro_nested.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_intro_nested.tStart = t;  // (not accounting for frame time here)
      mouse_intro_nested.frameNStart = frameN;  // exact frame index
      
      mouse_intro_nested.status = PsychoJS.Status.STARTED;
      mouse_intro_nested.mouseClock.reset();
      prevButtonState = mouse_intro_nested.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_intro_nested.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_intro_nested.getPressed();
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
    intro_nestedComponents.forEach( function(thisComponent) {
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


function intro_nestedRoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_nested'-------
    intro_nestedComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_intro_nested.getPos();
    _mouseButtons = mouse_intro_nested.getPressed();
    psychoJS.experiment.addData('mouse_intro_nested.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_intro_nested.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_intro_nested.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_intro_nested.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_intro_nested.rightButton', _mouseButtons[2]);
    // the Routine "intro_nested" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var trial_nestedComponents;
function trial_nestedRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'trial_nested'-------
    t = 0;
    trial_nestedClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_nested.setText(word);
    let loopData = { 
        //'loop_inner_extraInfo': loop_inner.extraInfo,    
        'loop_inner_finished': loop_inner.finished,
        'loop_inner_nRemaining': loop_inner.nRemaining,
        'loop_inner_nTotal': loop_inner.nTotal,
        'loop_inner_thisIndex': loop_inner.thisIndex,
        'loop_inner_thisN': loop_inner.thisN,
        'loop_inner_thisRepN': loop_inner.thisRepN,
        'loop_inner_thisTrial': loop_inner.thisTrial,
        'loop_inner_thisTrialN': loop_inner.thisTrialN,
        'loop_inner_trialList': loop_inner.trialList,
        //'loop_outer_extraInfo': loop_outer.extraInfo,    
        'loop_outer_finished': loop_outer.finished,
        'loop_outer_nRemaining': loop_outer.nRemaining,
        'loop_outer_nTotal': loop_outer.nTotal,
        'loop_outer_thisIndex': loop_outer.thisIndex,
        'loop_outer_thisN': loop_outer.thisN,
        'loop_outer_thisRepN': loop_outer.thisRepN,
        'loop_outer_thisTrial': loop_outer.thisTrial,
        'loop_outer_thisTrialN': loop_outer.thisTrialN,
        'loop_outer_trialList': loop_outer.trialList,
        'inner_id': inner_id,
        'word': word,
        'outer_id': outer_id
    };
    document.body.setAttribute('data-output', JSON.stringify(loopData));
    document.body.setAttribute('data-report', counter);
    counter++;
    // setup some python lists for storing info about the mouse_nested
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    trial_nestedComponents = [];
    trial_nestedComponents.push(text_nested);
    trial_nestedComponents.push(mouse_nested);
    
    trial_nestedComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function trial_nestedRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'trial_nested'-------
    // get current time
    t = trial_nestedClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_nested* updates
    if (t >= 0 && text_nested.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_nested.tStart = t;  // (not accounting for frame time here)
      text_nested.frameNStart = frameN;  // exact frame index
      
      text_nested.setAutoDraw(true);
    }

    // *mouse_nested* updates
    if (t >= 0.0 && mouse_nested.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_nested.tStart = t;  // (not accounting for frame time here)
      mouse_nested.frameNStart = frameN;  // exact frame index
      
      mouse_nested.status = PsychoJS.Status.STARTED;
      mouse_nested.mouseClock.reset();
      prevButtonState = mouse_nested.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_nested.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_nested.getPressed();
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
    trial_nestedComponents.forEach( function(thisComponent) {
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


function trial_nestedRoutineEnd() {
  return async function () {
    //------Ending Routine 'trial_nested'-------
    trial_nestedComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_nested.getPos();
    _mouseButtons = mouse_nested.getPressed();
    psychoJS.experiment.addData('mouse_nested.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_nested.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_nested.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_nested.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_nested.rightButton', _mouseButtons[2]);
    // the Routine "trial_nested" was not non-slip safe, so reset the non-slip timer
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
  
  document.body.setAttribute(
      'data-trialsData', 
      JSON.stringify(psychoJS.experiment._trialsData)
  );
  document.body.setAttribute('data-report', 'FINISHED');
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
