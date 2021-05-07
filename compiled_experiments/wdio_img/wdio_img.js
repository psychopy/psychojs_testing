/***************** 
 * Wdio_Img Test *
 *****************/

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
let expName = 'wdio_img';  // from the Builder filename that created this script
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
flowScheduler.add(intro_trialRoutineBegin());
flowScheduler.add(intro_trialRoutineEachFrame());
flowScheduler.add(intro_trialRoutineEnd());
flowScheduler.add(kitten_png_trialRoutineBegin());
flowScheduler.add(kitten_png_trialRoutineEachFrame());
flowScheduler.add(kitten_png_trialRoutineEnd());
flowScheduler.add(kitten_png5_trialRoutineBegin());
flowScheduler.add(kitten_png5_trialRoutineEachFrame());
flowScheduler.add(kitten_png5_trialRoutineEnd());
flowScheduler.add(kitten_jpg_trialRoutineBegin());
flowScheduler.add(kitten_jpg_trialRoutineEachFrame());
flowScheduler.add(kitten_jpg_trialRoutineEnd());
flowScheduler.add(kitten_jpg5_trialRoutineBegin());
flowScheduler.add(kitten_jpg5_trialRoutineEachFrame());
flowScheduler.add(kitten_jpg5_trialRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'resources/kitten_jpg.jpg', 'path': 'resources/kitten_jpg.jpg'},
    {'name': 'resources/kitten_png.png', 'path': 'resources/kitten_png.png'}
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


var intro_trialClock;
var text;
var mouse;
var kitten_png_trialClock;
var background_2;
var kitten_png;
var mouse_2;
var kitten_png5_trialClock;
var background_3;
var kitten_png5;
var mouse_3;
var kitten_jpg_trialClock;
var background;
var kitten_jpg;
var mouse_4;
var kitten_jpg5_trialClock;
var background_4;
var kitten_jpg5;
var mouse_5;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "intro_trial"
  intro_trialClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'wdio_img\n\nIn this test, you should see a square image of a kitten with a pink ornament. \n\nThe kitten is presented four times: (1) with a straight orientation, (2) rotated 5 degrees to the right, (3) straight again, and (4) rotated again. The first two times the kitten is a PNG image, the second two times JPG.\n\nClick anywhere to continue...',
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
  // Initialize components for Routine "kitten_png_trial"
  kitten_png_trialClock = new util.Clock();
  background_2 = new visual.Rect ({
    win: psychoJS.window, name: 'background_2', 
    width: [0.8, 0.8][0], height: [0.8, 0.8][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  kitten_png = new visual.ImageStim({
    win : psychoJS.window,
    name : 'kitten_png', units : undefined, 
    image : 'resources/kitten_png.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.72, 0.72],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -1.0 
  });
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  // Initialize components for Routine "kitten_png5_trial"
  kitten_png5_trialClock = new util.Clock();
  background_3 = new visual.Rect ({
    win: psychoJS.window, name: 'background_3', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  kitten_png5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'kitten_png5', units : undefined, 
    image : 'resources/kitten_png.png', mask : undefined,
    ori : 5, pos : [0, 0], size : [0.81, 0.81],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -1.0 
  });
  mouse_3 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_3.mouseClock = new util.Clock();
  // Initialize components for Routine "kitten_jpg_trial"
  kitten_jpg_trialClock = new util.Clock();
  background = new visual.Rect ({
    win: psychoJS.window, name: 'background', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  kitten_jpg = new visual.ImageStim({
    win : psychoJS.window,
    name : 'kitten_jpg', units : undefined, 
    image : 'resources/kitten_jpg.jpg', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.81, 0.81],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -1.0 
  });
  mouse_4 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_4.mouseClock = new util.Clock();
  // Initialize components for Routine "kitten_jpg5_trial"
  kitten_jpg5_trialClock = new util.Clock();
  background_4 = new visual.Rect ({
    win: psychoJS.window, name: 'background_4', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  kitten_jpg5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'kitten_jpg5', units : undefined, 
    image : 'resources/kitten_jpg.jpg', mask : undefined,
    ori : 5, pos : [0, 0], size : [0.81, 0.81],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -1.0 
  });
  mouse_5 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_5.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var intro_trialComponents;
function intro_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'intro_trial'-------
    t = 0;
    intro_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse
    gotValidClick = false; // until a click is received
    window.psychoJS = psychoJS;
    document.body.setAttribute('data-report', 'intro_trial');
    // keep track of which components have finished
    intro_trialComponents = [];
    intro_trialComponents.push(text);
    intro_trialComponents.push(mouse);
    
    for (const thisComponent of intro_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function intro_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'intro_trial'-------
    // get current time
    t = intro_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
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
    for (const thisComponent of intro_trialComponents)
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
function intro_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_trial'-------
    for (const thisComponent of intro_trialComponents) {
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
    // the Routine "intro_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var kitten_png_trialComponents;
function kitten_png_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'kitten_png_trial'-------
    t = 0;
    kitten_png_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_2
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'img1');
    // keep track of which components have finished
    kitten_png_trialComponents = [];
    kitten_png_trialComponents.push(background_2);
    kitten_png_trialComponents.push(kitten_png);
    kitten_png_trialComponents.push(mouse_2);
    
    for (const thisComponent of kitten_png_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function kitten_png_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'kitten_png_trial'-------
    // get current time
    t = kitten_png_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background_2* updates
    if (t >= 0.0 && background_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_2.tStart = t;  // (not accounting for frame time here)
      background_2.frameNStart = frameN;  // exact frame index
      
      background_2.setAutoDraw(true);
    }

    
    // *kitten_png* updates
    if (t >= 0.0 && kitten_png.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      kitten_png.tStart = t;  // (not accounting for frame time here)
      kitten_png.frameNStart = frameN;  // exact frame index
      
      kitten_png.setAutoDraw(true);
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
    for (const thisComponent of kitten_png_trialComponents)
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


function kitten_png_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'kitten_png_trial'-------
    for (const thisComponent of kitten_png_trialComponents) {
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
    // the Routine "kitten_png_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var kitten_png5_trialComponents;
function kitten_png5_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'kitten_png5_trial'-------
    t = 0;
    kitten_png5_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_3
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'img2');
    // keep track of which components have finished
    kitten_png5_trialComponents = [];
    kitten_png5_trialComponents.push(background_3);
    kitten_png5_trialComponents.push(kitten_png5);
    kitten_png5_trialComponents.push(mouse_3);
    
    for (const thisComponent of kitten_png5_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function kitten_png5_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'kitten_png5_trial'-------
    // get current time
    t = kitten_png5_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background_3* updates
    if (t >= 0.0 && background_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_3.tStart = t;  // (not accounting for frame time here)
      background_3.frameNStart = frameN;  // exact frame index
      
      background_3.setAutoDraw(true);
    }

    
    // *kitten_png5* updates
    if (t >= 0.0 && kitten_png5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      kitten_png5.tStart = t;  // (not accounting for frame time here)
      kitten_png5.frameNStart = frameN;  // exact frame index
      
      kitten_png5.setAutoDraw(true);
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
    for (const thisComponent of kitten_png5_trialComponents)
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


function kitten_png5_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'kitten_png5_trial'-------
    for (const thisComponent of kitten_png5_trialComponents) {
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
    // the Routine "kitten_png5_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var kitten_jpg_trialComponents;
function kitten_jpg_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'kitten_jpg_trial'-------
    t = 0;
    kitten_jpg_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_4
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'img3');
    // keep track of which components have finished
    kitten_jpg_trialComponents = [];
    kitten_jpg_trialComponents.push(background);
    kitten_jpg_trialComponents.push(kitten_jpg);
    kitten_jpg_trialComponents.push(mouse_4);
    
    for (const thisComponent of kitten_jpg_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function kitten_jpg_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'kitten_jpg_trial'-------
    // get current time
    t = kitten_jpg_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background* updates
    if (t >= 0.0 && background.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background.tStart = t;  // (not accounting for frame time here)
      background.frameNStart = frameN;  // exact frame index
      
      background.setAutoDraw(true);
    }

    
    // *kitten_jpg* updates
    if (t >= 0.0 && kitten_jpg.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      kitten_jpg.tStart = t;  // (not accounting for frame time here)
      kitten_jpg.frameNStart = frameN;  // exact frame index
      
      kitten_jpg.setAutoDraw(true);
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
    for (const thisComponent of kitten_jpg_trialComponents)
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


function kitten_jpg_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'kitten_jpg_trial'-------
    for (const thisComponent of kitten_jpg_trialComponents) {
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
    // the Routine "kitten_jpg_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var kitten_jpg5_trialComponents;
function kitten_jpg5_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'kitten_jpg5_trial'-------
    t = 0;
    kitten_jpg5_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_5
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'img4');
    // keep track of which components have finished
    kitten_jpg5_trialComponents = [];
    kitten_jpg5_trialComponents.push(background_4);
    kitten_jpg5_trialComponents.push(kitten_jpg5);
    kitten_jpg5_trialComponents.push(mouse_5);
    
    for (const thisComponent of kitten_jpg5_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function kitten_jpg5_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'kitten_jpg5_trial'-------
    // get current time
    t = kitten_jpg5_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background_4* updates
    if (t >= 0.0 && background_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_4.tStart = t;  // (not accounting for frame time here)
      background_4.frameNStart = frameN;  // exact frame index
      
      background_4.setAutoDraw(true);
    }

    
    // *kitten_jpg5* updates
    if (t >= 0.0 && kitten_jpg5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      kitten_jpg5.tStart = t;  // (not accounting for frame time here)
      kitten_jpg5.frameNStart = frameN;  // exact frame index
      
      kitten_jpg5.setAutoDraw(true);
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
    for (const thisComponent of kitten_jpg5_trialComponents)
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


function kitten_jpg5_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'kitten_jpg5_trial'-------
    for (const thisComponent of kitten_jpg5_trialComponents) {
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
    // the Routine "kitten_jpg5_trial" was not non-slip safe, so reset the non-slip timer
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
  
  document.body.setAttribute('data-report', 'FINISHED');
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
