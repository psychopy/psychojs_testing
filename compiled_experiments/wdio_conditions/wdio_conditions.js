﻿/************************ 
 * Wdio_Conditions Test *
 ************************/

import { PsychoJS } from './lib/core-2021.1.4.js';
import * as core from './lib/core-2021.1.4.js';
import { TrialHandler } from './lib/data-2021.1.4.js';
import { Scheduler } from './lib/util-2021.1.4.js';
import * as visual from './lib/visual-2021.1.4.js';
import * as sound from './lib/sound-2021.1.4.js';
import * as util from './lib/util-2021.1.4.js';
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;

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

// store info about the experiment session:
let expName = 'wdio_conditions';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
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
flowScheduler.add(intro_random_csvRoutineBegin());
flowScheduler.add(intro_random_csvRoutineEachFrame());
flowScheduler.add(intro_random_csvRoutineEnd());
const random_csvLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(random_csvLoopBegin, random_csvLoopScheduler);
flowScheduler.add(random_csvLoopScheduler);
flowScheduler.add(random_csvLoopEnd);
flowScheduler.add(intro_random_xlsxRoutineBegin());
flowScheduler.add(intro_random_xlsxRoutineEachFrame());
flowScheduler.add(intro_random_xlsxRoutineEnd());
const random_xlsxLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(random_xlsxLoopBegin, random_xlsxLoopScheduler);
flowScheduler.add(random_xlsxLoopScheduler);
flowScheduler.add(random_xlsxLoopEnd);
flowScheduler.add(intro_random_funkyRoutineBegin());
flowScheduler.add(intro_random_funkyRoutineEachFrame());
flowScheduler.add(intro_random_funkyRoutineEnd());
const random_funkyLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(random_funkyLoopBegin, random_funkyLoopScheduler);
flowScheduler.add(random_funkyLoopScheduler);
flowScheduler.add(random_funkyLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'resources/conditions.csv', 'path': 'resources/conditions.csv'},
    {'name': 'resources/conditions.xlsx', 'path': 'resources/conditions.xlsx'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.1.4';
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
var text_2;
var mouse_4;
var intro_random_csvClock;
var text_random_csv;
var mouse;
var trial_csvClock;
var text;
var mouse_5;
var intro_random_xlsxClock;
var text_random_xlsx;
var mouse_2;
var trial_xlsxClock;
var text_3;
var mouse_6;
var intro_random_funkyClock;
var text_fullRandom;
var mouse_3;
var trial_funkyClock;
var text_4;
var mouse_7;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "intro_general"
  intro_generalClock = new util.Clock();
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: 'wdio_conditions\n\nThis experiment tests reading in condition files and randomizations.\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_4 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_4.mouseClock = new util.Clock();
  // Initialize components for Routine "intro_random_csv"
  intro_random_csvClock = new util.Clock();
  text_random_csv = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_random_csv',
    text: 'wdio_conditions: random_csv\n\nReading in a csv conditions file; looping random with nReps == 1\n\nYou should see the following sequence of numbers.\nPsychoPy: 1, 4, 3, 2\nPsychoJS: 4, 2, 3, 1\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "trial_csv"
  trial_csvClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_5 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_5.mouseClock = new util.Clock();
  // Initialize components for Routine "intro_random_xlsx"
  intro_random_xlsxClock = new util.Clock();
  text_random_xlsx = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_random_xlsx',
    text: 'wdio_conditions: random_xlsx\n\nReading in an xlsx conditions file; looping random with nReps == 2\n\nYou should see the following sequence of letters.\nPsychoPy: A, B, B, A\nPsychoJS: B, A, A, B\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  // Initialize components for Routine "trial_xlsx"
  trial_xlsxClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_6 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_6.mouseClock = new util.Clock();
  // Initialize components for Routine "intro_random_funky"
  intro_random_funkyClock = new util.Clock();
  text_fullRandom = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_fullRandom',
    text: 'wdio_conditions: random_funky\n\nReading in a csv conditions file; selecting rows 0:2; looping fullRandom with nReps == 3\n\nYou should see the following sequence of letters.\nPsychoPy: 2, 2, 2, 1, 1, 1\nPsychoJS: 2, 1, 1, 2, 1, 2\n\nNB. For PsychoJS I would expect: 2, 2, 2, 1, 1, 1\n\nClick anywhere to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_3 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_3.mouseClock = new util.Clock();
  // Initialize components for Routine "trial_funky"
  trial_funkyClock = new util.Clock();
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_7 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_7.mouseClock = new util.Clock();
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
  return function () {
    //------Prepare to start Routine 'intro_general'-------
    t = 0;
    intro_generalClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_4
    gotValidClick = false; // until a click is received
    window.counter = 0;
    document.body.setAttribute('data-report', 'intro_general');
    // keep track of which components have finished
    intro_generalComponents = [];
    intro_generalComponents.push(text_2);
    intro_generalComponents.push(mouse_4);
    
    for (const thisComponent of intro_generalComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function intro_generalRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'intro_general'-------
    // get current time
    t = intro_generalClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_2* updates
    if (t >= 0.0 && text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_2.tStart = t;  // (not accounting for frame time here)
      text_2.frameNStart = frameN;  // exact frame index
      
      text_2.setAutoDraw(true);
    }

    // *mouse_4* updates
    if (t >= 0.0 && mouse_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_4.tStart = t;  // (not accounting for frame time here)
      mouse_4.frameNStart = frameN;  // exact frame index
      
      mouse_4.status = PsychoJS.Status.STARTED;
      mouse_4.mouseClock.reset();
      prevButtonState = mouse_4.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_4.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_4.getPressed();
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
    for (const thisComponent of intro_generalComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var _mouseXYs;
function intro_generalRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_general'-------
    for (const thisComponent of intro_generalComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_4.getPos();
    _mouseButtons = mouse_4.getPressed();
    psychoJS.experiment.addData('mouse_4.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_4.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_4.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_4.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_4.rightButton', _mouseButtons[2]);
    // the Routine "intro_general" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var intro_random_csvComponents;
function intro_random_csvRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'intro_random_csv'-------
    t = 0;
    intro_random_csvClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_random_csv');
    // keep track of which components have finished
    intro_random_csvComponents = [];
    intro_random_csvComponents.push(text_random_csv);
    intro_random_csvComponents.push(mouse);
    
    for (const thisComponent of intro_random_csvComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function intro_random_csvRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'intro_random_csv'-------
    // get current time
    t = intro_random_csvClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_random_csv* updates
    if (t >= 0.0 && text_random_csv.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_random_csv.tStart = t;  // (not accounting for frame time here)
      text_random_csv.frameNStart = frameN;  // exact frame index
      
      text_random_csv.setAutoDraw(true);
    }

    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse.tStart = t;  // (not accounting for frame time here)
      mouse.frameNStart = frameN;  // exact frame index
      
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse.getPressed();
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
    for (const thisComponent of intro_random_csvComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function intro_random_csvRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_random_csv'-------
    for (const thisComponent of intro_random_csvComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse.getPos();
    _mouseButtons = mouse.getPressed();
    psychoJS.experiment.addData('mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse.rightButton', _mouseButtons[2]);
    // the Routine "intro_random_csv" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var random_csv;
var currentLoop;
function random_csvLoopBegin(random_csvLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  random_csv = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'resources/conditions.csv',
    seed: 42, name: 'random_csv'
  });
  psychoJS.experiment.addLoop(random_csv); // add the loop to the experiment
  currentLoop = random_csv;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisRandom_csv of random_csv) {
    const snapshot = random_csv.getSnapshot();
    random_csvLoopScheduler.add(importConditions(snapshot));
    random_csvLoopScheduler.add(trial_csvRoutineBegin(snapshot));
    random_csvLoopScheduler.add(trial_csvRoutineEachFrame(snapshot));
    random_csvLoopScheduler.add(trial_csvRoutineEnd(snapshot));
    random_csvLoopScheduler.add(endLoopIteration(random_csvLoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function random_csvLoopEnd() {
  psychoJS.experiment.removeLoop(random_csv);

  return Scheduler.Event.NEXT;
}


var random_xlsx;
function random_xlsxLoopBegin(random_xlsxLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  random_xlsx = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 2, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'resources/conditions.xlsx',
    seed: 42, name: 'random_xlsx'
  });
  psychoJS.experiment.addLoop(random_xlsx); // add the loop to the experiment
  currentLoop = random_xlsx;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisRandom_xlsx of random_xlsx) {
    const snapshot = random_xlsx.getSnapshot();
    random_xlsxLoopScheduler.add(importConditions(snapshot));
    random_xlsxLoopScheduler.add(trial_xlsxRoutineBegin(snapshot));
    random_xlsxLoopScheduler.add(trial_xlsxRoutineEachFrame(snapshot));
    random_xlsxLoopScheduler.add(trial_xlsxRoutineEnd(snapshot));
    random_xlsxLoopScheduler.add(endLoopIteration(random_xlsxLoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function random_xlsxLoopEnd() {
  psychoJS.experiment.removeLoop(random_xlsx);

  return Scheduler.Event.NEXT;
}


var random_funky;
function random_funkyLoopBegin(random_funkyLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  random_funky = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 3, method: TrialHandler.Method.FULLRANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: TrialHandler.importConditions(psychoJS.serverManager, 'resources/conditions.csv', '0:2'),
    seed: 42, name: 'random_funky'
  });
  psychoJS.experiment.addLoop(random_funky); // add the loop to the experiment
  currentLoop = random_funky;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisRandom_funky of random_funky) {
    const snapshot = random_funky.getSnapshot();
    random_funkyLoopScheduler.add(importConditions(snapshot));
    random_funkyLoopScheduler.add(trial_funkyRoutineBegin(snapshot));
    random_funkyLoopScheduler.add(trial_funkyRoutineEachFrame(snapshot));
    random_funkyLoopScheduler.add(trial_funkyRoutineEnd(snapshot));
    random_funkyLoopScheduler.add(endLoopIteration(random_funkyLoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function random_funkyLoopEnd() {
  psychoJS.experiment.removeLoop(random_funky);

  return Scheduler.Event.NEXT;
}


var trial_csvComponents;
function trial_csvRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'trial_csv'-------
    t = 0;
    trial_csvClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text.setText(word);
    document.body.setAttribute('data-report', window.counter + '_' + word);
    console.log(JSON.stringify({ 
        'trialList': random_csv.trialList,
        'thisIndex': random_csv.thisIndex,
        'nTotal': random_csv.nTotal,
        'nRemaining': random_csv.nRemaining,
        'thisN': random_csv.thisN,
        'thisRepN': random_csv.thisRepN,
        'thisTrialN': random_csv.thisTrialN,
        'thisTrial': random_csv.thisTrial,
        'finished': random_csv.finished,
        'extraInfo': random_csv.extraInfo,
        'origin': random_csv.origin
    }));
    console.log(snapshot);
    window.counter++;
    // setup some python lists for storing info about the mouse_5
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    trial_csvComponents = [];
    trial_csvComponents.push(text);
    trial_csvComponents.push(mouse_5);
    
    for (const thisComponent of trial_csvComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function trial_csvRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'trial_csv'-------
    // get current time
    t = trial_csvClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    // *mouse_5* updates
    if (t >= 0.0 && mouse_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_5.tStart = t;  // (not accounting for frame time here)
      mouse_5.frameNStart = frameN;  // exact frame index
      
      mouse_5.status = PsychoJS.Status.STARTED;
      mouse_5.mouseClock.reset();
      prevButtonState = mouse_5.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_5.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_5.getPressed();
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
    for (const thisComponent of trial_csvComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trial_csvRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'trial_csv'-------
    for (const thisComponent of trial_csvComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_5.getPos();
    _mouseButtons = mouse_5.getPressed();
    psychoJS.experiment.addData('mouse_5.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_5.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_5.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_5.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_5.rightButton', _mouseButtons[2]);
    // the Routine "trial_csv" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var intro_random_xlsxComponents;
function intro_random_xlsxRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'intro_random_xlsx'-------
    t = 0;
    intro_random_xlsxClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_2
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_random_xlsx');
    // keep track of which components have finished
    intro_random_xlsxComponents = [];
    intro_random_xlsxComponents.push(text_random_xlsx);
    intro_random_xlsxComponents.push(mouse_2);
    
    for (const thisComponent of intro_random_xlsxComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function intro_random_xlsxRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'intro_random_xlsx'-------
    // get current time
    t = intro_random_xlsxClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_random_xlsx* updates
    if (t >= 0.0 && text_random_xlsx.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_random_xlsx.tStart = t;  // (not accounting for frame time here)
      text_random_xlsx.frameNStart = frameN;  // exact frame index
      
      text_random_xlsx.setAutoDraw(true);
    }

    // *mouse_2* updates
    if (t >= 0.0 && mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_2.tStart = t;  // (not accounting for frame time here)
      mouse_2.frameNStart = frameN;  // exact frame index
      
      mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_2.getPressed();
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
    for (const thisComponent of intro_random_xlsxComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function intro_random_xlsxRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_random_xlsx'-------
    for (const thisComponent of intro_random_xlsxComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_2.getPos();
    _mouseButtons = mouse_2.getPressed();
    psychoJS.experiment.addData('mouse_2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_2.rightButton', _mouseButtons[2]);
    // the Routine "intro_random_xlsx" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var trial_xlsxComponents;
function trial_xlsxRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'trial_xlsx'-------
    t = 0;
    trial_xlsxClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_3.setText(word);
    document.body.setAttribute('data-report', window.counter + '_' + word);
    console.log(JSON.stringify({ 
        'trialList': random_xlsx.trialList,
        'thisIndex': random_xlsx.thisIndex,
        'nTotal': random_xlsx.nTotal,
        'nRemaining': random_xlsx.nRemaining,
        'thisN': random_xlsx.thisN,
        'thisRepN': random_xlsx.thisRepN,
        'thisTrialN': random_xlsx.thisTrialN,
        'thisTrial': random_xlsx.thisTrial,
        'finished': random_xlsx.finished,
        'extraInfo': random_xlsx.extraInfo,
        'origin': random_xlsx.origin
    }));
    window.counter++;
    // setup some python lists for storing info about the mouse_6
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    trial_xlsxComponents = [];
    trial_xlsxComponents.push(text_3);
    trial_xlsxComponents.push(mouse_6);
    
    for (const thisComponent of trial_xlsxComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function trial_xlsxRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'trial_xlsx'-------
    // get current time
    t = trial_xlsxClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }

    // *mouse_6* updates
    if (t >= 0.0 && mouse_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_6.tStart = t;  // (not accounting for frame time here)
      mouse_6.frameNStart = frameN;  // exact frame index
      
      mouse_6.status = PsychoJS.Status.STARTED;
      mouse_6.mouseClock.reset();
      prevButtonState = mouse_6.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_6.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_6.getPressed();
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
    for (const thisComponent of trial_xlsxComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trial_xlsxRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'trial_xlsx'-------
    for (const thisComponent of trial_xlsxComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_6.getPos();
    _mouseButtons = mouse_6.getPressed();
    psychoJS.experiment.addData('mouse_6.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_6.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_6.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_6.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_6.rightButton', _mouseButtons[2]);
    // the Routine "trial_xlsx" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var intro_random_funkyComponents;
function intro_random_funkyRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'intro_random_funky'-------
    t = 0;
    intro_random_funkyClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_3
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_random_funky');
    // keep track of which components have finished
    intro_random_funkyComponents = [];
    intro_random_funkyComponents.push(text_fullRandom);
    intro_random_funkyComponents.push(mouse_3);
    
    for (const thisComponent of intro_random_funkyComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function intro_random_funkyRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'intro_random_funky'-------
    // get current time
    t = intro_random_funkyClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_fullRandom* updates
    if (t >= 0.0 && text_fullRandom.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_fullRandom.tStart = t;  // (not accounting for frame time here)
      text_fullRandom.frameNStart = frameN;  // exact frame index
      
      text_fullRandom.setAutoDraw(true);
    }

    // *mouse_3* updates
    if (t >= 0.0 && mouse_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_3.tStart = t;  // (not accounting for frame time here)
      mouse_3.frameNStart = frameN;  // exact frame index
      
      mouse_3.status = PsychoJS.Status.STARTED;
      mouse_3.mouseClock.reset();
      prevButtonState = mouse_3.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_3.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_3.getPressed();
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
    for (const thisComponent of intro_random_funkyComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function intro_random_funkyRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_random_funky'-------
    for (const thisComponent of intro_random_funkyComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_3.getPos();
    _mouseButtons = mouse_3.getPressed();
    psychoJS.experiment.addData('mouse_3.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_3.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_3.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_3.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_3.rightButton', _mouseButtons[2]);
    // the Routine "intro_random_funky" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var trial_funkyComponents;
function trial_funkyRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'trial_funky'-------
    t = 0;
    trial_funkyClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_4.setText(word);
    document.body.setAttribute('data-report', window.counter + '_' + word);
    console.log(JSON.stringify({ 
        'trialList': random_funky.trialList,
        'thisIndex': random_funky.thisIndex,
        'nTotal': random_funky.nTotal,
        'nRemaining': random_funky.nRemaining,
        'thisN': random_funky.thisN,
        'thisRepN': random_funky.thisRepN,
        'thisTrialN': random_funky.thisTrialN,
        'thisTrial': random_funky.thisTrial,
        'finished': random_funky.finished,
        'extraInfo': random_funky.extraInfo,
        'origin': random_funky.origin
    }));
    window.counter++;
    // setup some python lists for storing info about the mouse_7
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    trial_funkyComponents = [];
    trial_funkyComponents.push(text_4);
    trial_funkyComponents.push(mouse_7);
    
    for (const thisComponent of trial_funkyComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function trial_funkyRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'trial_funky'-------
    // get current time
    t = trial_funkyClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_4* updates
    if (t >= 0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index
      
      text_4.setAutoDraw(true);
    }

    // *mouse_7* updates
    if (t >= 0.0 && mouse_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_7.tStart = t;  // (not accounting for frame time here)
      mouse_7.frameNStart = frameN;  // exact frame index
      
      mouse_7.status = PsychoJS.Status.STARTED;
      mouse_7.mouseClock.reset();
      prevButtonState = mouse_7.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_7.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_7.getPressed();
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
    for (const thisComponent of trial_funkyComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trial_funkyRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'trial_funky'-------
    for (const thisComponent of trial_funkyComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_7.getPos();
    _mouseButtons = mouse_7.getPressed();
    psychoJS.experiment.addData('mouse_7.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_7.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_7.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_7.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_7.rightButton', _mouseButtons[2]);
    // the Routine "trial_funky" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
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
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
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