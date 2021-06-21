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
const loop_simplesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_simplesLoopBegin(loop_simplesLoopScheduler));
flowScheduler.add(loop_simplesLoopScheduler);
flowScheduler.add(loop_simplesLoopEnd);
flowScheduler.add(intro_nestedRoutineBegin());
flowScheduler.add(intro_nestedRoutineEachFrame());
flowScheduler.add(intro_nestedRoutineEnd());
const loop_outerLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_outerLoopBegin(loop_outerLoopScheduler));
flowScheduler.add(loop_outerLoopScheduler);
flowScheduler.add(loop_outerLoopEnd);
flowScheduler.add(intro_noconditionRoutineBegin());
flowScheduler.add(intro_noconditionRoutineEachFrame());
flowScheduler.add(intro_noconditionRoutineEnd());
const loop_noconditionLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_noconditionLoopBegin(loop_noconditionLoopScheduler));
flowScheduler.add(loop_noconditionLoopScheduler);
flowScheduler.add(loop_noconditionLoopEnd);
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
var text_nested_word;
var mouse_nested;
var text_nested_counter;
var intro_noconditionClock;
var text_intro_nocondition;
var mouse_intro_nocondition;
var trial_noconditionClock;
var text_nocondition;
var mouse_nocondition;
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
    text: 'wdio_conditions: random_csv\n\nReading in a csv conditions file; looping random with nReps == 1\n\nYou should see the following sequence:\nPsychoJS: w3, w2, w0, w2\n\nNote this loop is called "loop_simples" to check whether a conditions variable named "word" can be referenced via "thisLoop_simple.word".\n\nClick anywhere to continue...',
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
    text: 'wdio_conditions: random_nested\n\nThe innerLoop selects rows 0:2; looping fullRandom with nReps == 4, from a CSV. The outerLoop is a sequential XLSX. After the counter reaches 18, both inner and outer loop are finished.\n\nYou should see the following sequence:.\nPsychoJS: w1, w0, w0, w1, w1, w1, w0, w0, w1, w0, w0, w1, w1, w1, (w0, w0 are not presented as the loops are finished early)\n\nClick anywhere to continue...',
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
  text_nested_word = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_nested_word',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.25)], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_nested = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_nested.mouseClock = new util.Clock();
  text_nested_counter = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_nested_counter',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.25], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "intro_nocondition"
  intro_noconditionClock = new util.Clock();
  text_intro_nocondition = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_intro_nocondition',
    text: 'wdio_conditions: nocondition\n\nA loop that runs twice, but does not have associated conditions file.\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_intro_nocondition = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_intro_nocondition.mouseClock = new util.Clock();
  // Initialize components for Routine "trial_nocondition"
  trial_noconditionClock = new util.Clock();
  text_nocondition = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_nocondition',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_nocondition = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_nocondition.mouseClock = new util.Clock();
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


var loop_simples;
var currentLoop;
function loop_simplesLoopBegin(loop_simplesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_simples = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/loop_inner.csv',
      seed: 43, name: 'loop_simples'
    });
    psychoJS.experiment.addLoop(loop_simples); // add the loop to the experiment
    currentLoop = loop_simples;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop_simples.forEach(function() {
      const snapshot = loop_simples.getSnapshot();
    
      loop_simplesLoopScheduler.add(importConditions(snapshot));
      loop_simplesLoopScheduler.add(trial_simpleRoutineBegin(snapshot));
      loop_simplesLoopScheduler.add(trial_simpleRoutineEachFrame());
      loop_simplesLoopScheduler.add(trial_simpleRoutineEnd());
      loop_simplesLoopScheduler.add(endLoopIteration(loop_simplesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_simplesLoopEnd() {
  psychoJS.experiment.removeLoop(loop_simples);

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


var loop_nocondition;
function loop_noconditionLoopBegin(loop_noconditionLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_nocondition = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 2, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop_nocondition'
    });
    psychoJS.experiment.addLoop(loop_nocondition); // add the loop to the experiment
    currentLoop = loop_nocondition;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop_nocondition.forEach(function() {
      const snapshot = loop_nocondition.getSnapshot();
    
      loop_noconditionLoopScheduler.add(importConditions(snapshot));
      loop_noconditionLoopScheduler.add(trial_noconditionRoutineBegin(snapshot));
      loop_noconditionLoopScheduler.add(trial_noconditionRoutineEachFrame());
      loop_noconditionLoopScheduler.add(trial_noconditionRoutineEnd());
      loop_noconditionLoopScheduler.add(endLoopIteration(loop_noconditionLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_noconditionLoopEnd() {
  psychoJS.experiment.removeLoop(loop_nocondition);

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
        'loop_simples_finished': loop_simples.finished,
        'loop_simples_nRemaining': loop_simples.nRemaining,
        'loop_simples_nTotal': loop_simples.nTotal,
        'loop_simples_thisIndex': loop_simples.thisIndex,
        'loop_simples_thisN': loop_simples.thisN,
        'loop_simples_thisRepN': loop_simples.thisRepN,
        'loop_simples_thisTrial': loop_simples.thisTrial,
        'loop_simples_thisTrial_inner_id': loop_simples.thisTrial.inner_id,
        'loop_simples_thisTrial_word': loop_simples.thisTrial.word,
        'loop_simples_thisTrialN': loop_simples.thisTrialN,
        'loop_simples_trialList': loop_simples.trialList,
        'inner_id': inner_id,
        'word': word,
        'thisLoop_simple_inner_id': thisLoop_simple.inner_id,
        'thisLoop_simple_word': thisLoop_simple.word
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
    text_nested_word.setText(word);
    let loopData = { 
        'loop_inner_finished': loop_inner.finished,
        'loop_inner_nRemaining': loop_inner.nRemaining,
        'loop_inner_nTotal': loop_inner.nTotal,
        'loop_inner_thisIndex': loop_inner.thisIndex,
        'loop_inner_thisN': loop_inner.thisN,
        'loop_inner_thisRepN': loop_inner.thisRepN,
        'loop_inner_thisTrial': loop_inner.thisTrial,
        'loop_inner_thisTrialN': loop_inner.thisTrialN,
        'loop_inner_trialList': loop_inner.trialList,
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
    text_nested_counter.setText(counter);
    // keep track of which components have finished
    trial_nestedComponents = [];
    trial_nestedComponents.push(text_nested_word);
    trial_nestedComponents.push(mouse_nested);
    trial_nestedComponents.push(text_nested_counter);
    
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
    
    // *text_nested_word* updates
    if (t >= 0 && text_nested_word.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_nested_word.tStart = t;  // (not accounting for frame time here)
      text_nested_word.frameNStart = frameN;  // exact frame index
      
      text_nested_word.setAutoDraw(true);
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
    
    // *text_nested_counter* updates
    if (t >= 0.0 && text_nested_counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_nested_counter.tStart = t;  // (not accounting for frame time here)
      text_nested_counter.frameNStart = frameN;  // exact frame index
      
      text_nested_counter.setAutoDraw(true);
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
    if (counter === 18) {
        loop_inner.finished = true;
        loop_outer.finished = true;
    }
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


var intro_noconditionComponents;
function intro_noconditionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intro_nocondition'-------
    t = 0;
    intro_noconditionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_intro_nocondition
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_nocondition');
    // keep track of which components have finished
    intro_noconditionComponents = [];
    intro_noconditionComponents.push(text_intro_nocondition);
    intro_noconditionComponents.push(mouse_intro_nocondition);
    
    intro_noconditionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function intro_noconditionRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intro_nocondition'-------
    // get current time
    t = intro_noconditionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_intro_nocondition* updates
    if (t >= 0.0 && text_intro_nocondition.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_intro_nocondition.tStart = t;  // (not accounting for frame time here)
      text_intro_nocondition.frameNStart = frameN;  // exact frame index
      
      text_intro_nocondition.setAutoDraw(true);
    }

    // *mouse_intro_nocondition* updates
    if (t >= 0.0 && mouse_intro_nocondition.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_intro_nocondition.tStart = t;  // (not accounting for frame time here)
      mouse_intro_nocondition.frameNStart = frameN;  // exact frame index
      
      mouse_intro_nocondition.status = PsychoJS.Status.STARTED;
      mouse_intro_nocondition.mouseClock.reset();
      prevButtonState = mouse_intro_nocondition.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_intro_nocondition.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_intro_nocondition.getPressed();
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
    intro_noconditionComponents.forEach( function(thisComponent) {
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


function intro_noconditionRoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_nocondition'-------
    intro_noconditionComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_intro_nocondition.getPos();
    _mouseButtons = mouse_intro_nocondition.getPressed();
    psychoJS.experiment.addData('mouse_intro_nocondition.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_intro_nocondition.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_intro_nocondition.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_intro_nocondition.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_intro_nocondition.rightButton', _mouseButtons[2]);
    // the Routine "intro_nocondition" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var trial_noconditionComponents;
function trial_noconditionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'trial_nocondition'-------
    t = 0;
    trial_noconditionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_nocondition.setText('Click twice to finish experiment');
    let loopData = { 
        'loop_nocondition_finished': loop_nocondition.finished,
        'loop_nocondition_nRemaining': loop_nocondition.nRemaining,
        'loop_nocondition_nTotal': loop_nocondition.nTotal,
        'loop_nocondition_thisIndex': loop_nocondition.thisIndex,
        'loop_nocondition_thisN': loop_nocondition.thisN,
        'loop_nocondition_thisRepN': loop_nocondition.thisRepN,
        'loop_nocondition_thisTrial': loop_nocondition.thisTrial,
        'loop_nocondition_thisTrialN': loop_nocondition.thisTrialN,
        'loop_nocondition_trialList': loop_nocondition.trialList
    };
    console.log(loopData);
    document.body.setAttribute('data-output', JSON.stringify(loopData));
    document.body.setAttribute('data-report', counter);
    counter++;
    // setup some python lists for storing info about the mouse_nocondition
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    trial_noconditionComponents = [];
    trial_noconditionComponents.push(text_nocondition);
    trial_noconditionComponents.push(mouse_nocondition);
    
    trial_noconditionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function trial_noconditionRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'trial_nocondition'-------
    // get current time
    t = trial_noconditionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_nocondition* updates
    if (t >= 0 && text_nocondition.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_nocondition.tStart = t;  // (not accounting for frame time here)
      text_nocondition.frameNStart = frameN;  // exact frame index
      
      text_nocondition.setAutoDraw(true);
    }

    // *mouse_nocondition* updates
    if (t >= 0.0 && mouse_nocondition.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_nocondition.tStart = t;  // (not accounting for frame time here)
      mouse_nocondition.frameNStart = frameN;  // exact frame index
      
      mouse_nocondition.status = PsychoJS.Status.STARTED;
      mouse_nocondition.mouseClock.reset();
      prevButtonState = mouse_nocondition.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_nocondition.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_nocondition.getPressed();
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
    trial_noconditionComponents.forEach( function(thisComponent) {
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


function trial_noconditionRoutineEnd() {
  return async function () {
    //------Ending Routine 'trial_nocondition'-------
    trial_noconditionComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_nocondition.getPos();
    _mouseButtons = mouse_nocondition.getPressed();
    psychoJS.experiment.addData('mouse_nocondition.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_nocondition.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_nocondition.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_nocondition.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_nocondition.rightButton', _mouseButtons[2]);
    // the Routine "trial_nocondition" was not non-slip safe, so reset the non-slip timer
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
