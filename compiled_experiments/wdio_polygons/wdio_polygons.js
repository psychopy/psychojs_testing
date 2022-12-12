/********************** 
 * Wdio_Polygons Test *
 **********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2022.2.4.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'wdio_polygons';  // from the Builder filename that created this script
let expInfo = {
    'participant': '',
    'session': '001',
};

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
flowScheduler.add(into_trialRoutineBegin());
flowScheduler.add(into_trialRoutineEachFrame());
flowScheduler.add(into_trialRoutineEnd());
flowScheduler.add(polygon_trialRoutineBegin());
flowScheduler.add(polygon_trialRoutineEachFrame());
flowScheduler.add(polygon_trialRoutineEnd());
flowScheduler.add(polygon5_trialRoutineBegin());
flowScheduler.add(polygon5_trialRoutineEachFrame());
flowScheduler.add(polygon5_trialRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.ERROR);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2022.2.4';
  expInfo['OS'] = window.navigator.platform;

  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);

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


var into_trialClock;
var introduction_text;
var mouse;
var polygon_trialClock;
var s_background;
var s_triangle;
var s_rectangle;
var s_cross;
var s_star;
var mouse_2;
var polygon5_trialClock;
var s_background_2;
var s_triangle_2;
var s_rectangle_2;
var s_cross_2;
var s_star_2;
var mouse_3;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "into_trial"
  into_trialClock = new util.Clock();
  introduction_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'introduction_text',
    text: 'wdio_polgyons\n\nIn this test, you should the following polygons presented: a triangle (top-left), a square (top-right), a cross (bottom-left), and a star (bottom-right). \n\nFiirst, the polygons are presented with a straight orientation. Next, the polygons are presented rotated 5 degrees to the right.\n\nClick anywhere to continue...\n',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  window.psychoJS = psychoJS
  // Initialize components for Routine "polygon_trial"
  polygon_trialClock = new util.Clock();
  s_background = new visual.Rect ({
    win: psychoJS.window, name: 's_background', 
    width: [1, 1][0], height: [1, 1][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  s_triangle = new visual.ShapeStim ({
    win: psychoJS.window, name: 's_triangle', 
    vertices: [[-[0.4, 0.4][0]/2.0, -[0.4, 0.4][1]/2.0], [+[0.4, 0.4][0]/2.0, -[0.4, 0.4][1]/2.0], [0, [0.4, 0.4][1]/2.0]],
    ori: 0, pos: [(- 0.25), 0.25],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  s_rectangle = new visual.Rect ({
    win: psychoJS.window, name: 's_rectangle', 
    width: [0.4, 0.4][0], height: [0.4, 0.4][1],
    ori: 0, pos: [0.25, 0.25],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -3, interpolate: true,
  });
  
  s_cross = new visual.ShapeStim ({
    win: psychoJS.window, name: 's_cross', 
    vertices: 'cross', size:[0.4, 0.4],
    ori: 0, pos: [(- 0.25), (- 0.25)],
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -4, interpolate: true,
  });
  
  s_star = new visual.ShapeStim ({
    win: psychoJS.window, name: 's_star', 
    vertices: 'star7', size: [0.4, 0.4],
    ori: 0, pos: [0.25, (- 0.25)],
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -5, interpolate: true,
  });
  
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  // Initialize components for Routine "polygon5_trial"
  polygon5_trialClock = new util.Clock();
  s_background_2 = new visual.Rect ({
    win: psychoJS.window, name: 's_background_2', 
    width: [1, 1][0], height: [1, 1][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  s_triangle_2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 's_triangle_2', 
    vertices: [[-[0.4, 0.4][0]/2.0, -[0.4, 0.4][1]/2.0], [+[0.4, 0.4][0]/2.0, -[0.4, 0.4][1]/2.0], [0, [0.4, 0.4][1]/2.0]],
    ori: 5, pos: [(- 0.25), 0.25],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  s_rectangle_2 = new visual.Rect ({
    win: psychoJS.window, name: 's_rectangle_2', 
    width: [0.4, 0.4][0], height: [0.4, 0.4][1],
    ori: 5, pos: [0.25, 0.25],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -3, interpolate: true,
  });
  
  s_cross_2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 's_cross_2', 
    vertices: 'cross', size:[0.4, 0.4],
    ori: 5, pos: [(- 0.25), (- 0.25)],
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -4, interpolate: true,
  });
  
  s_star_2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 's_star_2', 
    vertices: 'star7', size: [0.4, 0.4],
    ori: 5, pos: [0.25, (- 0.25)],
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -5, interpolate: true,
  });
  
  mouse_3 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_3.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var into_trialComponents;
function into_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'into_trial' ---
    t = 0;
    into_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro_trial');
    // keep track of which components have finished
    into_trialComponents = [];
    into_trialComponents.push(introduction_text);
    into_trialComponents.push(mouse);
    
    for (const thisComponent of into_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function into_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'into_trial' ---
    // get current time
    t = into_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *introduction_text* updates
    if (t >= 0.0 && introduction_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      introduction_text.tStart = t;  // (not accounting for frame time here)
      introduction_text.frameNStart = frameN;  // exact frame index
      
      introduction_text.setAutoDraw(true);
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
    for (const thisComponent of into_trialComponents)
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
function into_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'into_trial' ---
    for (const thisComponent of into_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse.getPos();
    _mouseButtons = mouse.getPressed();
    psychoJS.experiment.addData('mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse.rightButton', _mouseButtons[2]);
    // the Routine "into_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var polygon_trialComponents;
function polygon_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'polygon_trial' ---
    t = 0;
    polygon_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'polygon1');
    // setup some python lists for storing info about the mouse_2
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    polygon_trialComponents = [];
    polygon_trialComponents.push(s_background);
    polygon_trialComponents.push(s_triangle);
    polygon_trialComponents.push(s_rectangle);
    polygon_trialComponents.push(s_cross);
    polygon_trialComponents.push(s_star);
    polygon_trialComponents.push(mouse_2);
    
    for (const thisComponent of polygon_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function polygon_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'polygon_trial' ---
    // get current time
    t = polygon_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *s_background* updates
    if (t >= 0.0 && s_background.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_background.tStart = t;  // (not accounting for frame time here)
      s_background.frameNStart = frameN;  // exact frame index
      
      s_background.setAutoDraw(true);
    }

    
    // *s_triangle* updates
    if (t >= 0.0 && s_triangle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_triangle.tStart = t;  // (not accounting for frame time here)
      s_triangle.frameNStart = frameN;  // exact frame index
      
      s_triangle.setAutoDraw(true);
    }

    
    // *s_rectangle* updates
    if (t >= 0 && s_rectangle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_rectangle.tStart = t;  // (not accounting for frame time here)
      s_rectangle.frameNStart = frameN;  // exact frame index
      
      s_rectangle.setAutoDraw(true);
    }

    
    // *s_cross* updates
    if (t >= 0 && s_cross.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_cross.tStart = t;  // (not accounting for frame time here)
      s_cross.frameNStart = frameN;  // exact frame index
      
      s_cross.setAutoDraw(true);
    }

    
    // *s_star* updates
    if (t >= 0 && s_star.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_star.tStart = t;  // (not accounting for frame time here)
      s_star.frameNStart = frameN;  // exact frame index
      
      s_star.setAutoDraw(true);
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
    for (const thisComponent of polygon_trialComponents)
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


function polygon_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'polygon_trial' ---
    for (const thisComponent of polygon_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_2.getPos();
    _mouseButtons = mouse_2.getPressed();
    psychoJS.experiment.addData('mouse_2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_2.rightButton', _mouseButtons[2]);
    // the Routine "polygon_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var polygon5_trialComponents;
function polygon5_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'polygon5_trial' ---
    t = 0;
    polygon5_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'polygon2');
    // setup some python lists for storing info about the mouse_3
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    polygon5_trialComponents = [];
    polygon5_trialComponents.push(s_background_2);
    polygon5_trialComponents.push(s_triangle_2);
    polygon5_trialComponents.push(s_rectangle_2);
    polygon5_trialComponents.push(s_cross_2);
    polygon5_trialComponents.push(s_star_2);
    polygon5_trialComponents.push(mouse_3);
    
    for (const thisComponent of polygon5_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function polygon5_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'polygon5_trial' ---
    // get current time
    t = polygon5_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *s_background_2* updates
    if (t >= 0.0 && s_background_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_background_2.tStart = t;  // (not accounting for frame time here)
      s_background_2.frameNStart = frameN;  // exact frame index
      
      s_background_2.setAutoDraw(true);
    }

    
    // *s_triangle_2* updates
    if (t >= 0.0 && s_triangle_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_triangle_2.tStart = t;  // (not accounting for frame time here)
      s_triangle_2.frameNStart = frameN;  // exact frame index
      
      s_triangle_2.setAutoDraw(true);
    }

    
    // *s_rectangle_2* updates
    if (t >= 0 && s_rectangle_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_rectangle_2.tStart = t;  // (not accounting for frame time here)
      s_rectangle_2.frameNStart = frameN;  // exact frame index
      
      s_rectangle_2.setAutoDraw(true);
    }

    
    // *s_cross_2* updates
    if (t >= 0 && s_cross_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_cross_2.tStart = t;  // (not accounting for frame time here)
      s_cross_2.frameNStart = frameN;  // exact frame index
      
      s_cross_2.setAutoDraw(true);
    }

    
    // *s_star_2* updates
    if (t >= 0 && s_star_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      s_star_2.tStart = t;  // (not accounting for frame time here)
      s_star_2.frameNStart = frameN;  // exact frame index
      
      s_star_2.setAutoDraw(true);
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
    for (const thisComponent of polygon5_trialComponents)
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


function polygon5_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'polygon5_trial' ---
    for (const thisComponent of polygon5_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_3.getPos();
    _mouseButtons = mouse_3.getPressed();
    psychoJS.experiment.addData('mouse_3.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_3.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_3.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_3.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_3.rightButton', _mouseButtons[2]);
    // the Routine "polygon5_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
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
