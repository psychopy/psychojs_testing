/********************* 
 * Wdio_Textbox Test *
 *********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2022.2.4.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'wdio_textbox';  // from the Builder filename that created this script
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
flowScheduler.add(intro_trialRoutineBegin());
flowScheduler.add(intro_trialRoutineEachFrame());
flowScheduler.add(intro_trialRoutineEnd());
flowScheduler.add(textbox_trial1RoutineBegin());
flowScheduler.add(textbox_trial1RoutineEachFrame());
flowScheduler.add(textbox_trial1RoutineEnd());
flowScheduler.add(textbox_trial2RoutineBegin());
flowScheduler.add(textbox_trial2RoutineEachFrame());
flowScheduler.add(textbox_trial2RoutineEnd());
flowScheduler.add(textbox_trial3RoutineBegin());
flowScheduler.add(textbox_trial3RoutineEachFrame());
flowScheduler.add(textbox_trial3RoutineEnd());
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


var intro_trialClock;
var intro_text;
var intro_mouse;
var intro_polygon;
var textbox_trial1Clock;
var textbox1;
var polygon1;
var mouse1;
var text1;
var textbox_trial2Clock;
var textbox2;
var polygon2;
var mouse2;
var text2;
var textbox_trial3Clock;
var textbox3;
var text3;
var key3;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "intro_trial"
  intro_trialClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'wdio_textbox\n\nThis experiment presents a couple of textboxes\n\nClick anywhere to continue. Click in the blue square to trigger the bug shown in the next routine.\n',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.25], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  intro_mouse.mouseClock = new util.Clock();
  // Expose psychoJS to the browser window
  window.psychoJS = psychoJS;
  intro_polygon = new visual.Rect ({
    win: psychoJS.window, name: 'intro_polygon', 
    width: [0.1, 0.1][0], height: [0.1, 0.1][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: -3, interpolate: true,
  });
  
  // Initialize components for Routine "textbox_trial1"
  textbox_trial1Clock = new util.Clock();
  textbox1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox1',
    text: '',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.8, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: 1,
    padding: undefined,
    alignment: 'center',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  polygon1 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon1', 
    width: [0.1, 0.1][0], height: [0.1, 0.1][1],
    ori: 0, pos: [0, (- 0.25)],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  mouse1 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse1.mouseClock = new util.Clock();
  text1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text1',
    text: 'textbox_trial1: A non-editable textbox with the text "This is a test"  set via code.  If in the previous routine you clicked where the textbox would appear in this routine, only then do you need to click twice on the blue square (#237).\n\nClick the blue squareto continue.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.25], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "textbox_trial2"
  textbox_trial2Clock = new util.Clock();
  textbox2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox2',
    text: 'Can you see me?',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.8, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: 1,
    padding: undefined,
    alignment: 'center',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  polygon2 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon2', 
    width: [0.1, 0.1][0], height: [0.1, 0.1][1],
    ori: 0, pos: [0, (- 0.25)],
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  mouse2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse2.mouseClock = new util.Clock();
  text2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text2',
    text: 'textbox_trial2: A non-editable textbox with the text "Can you see me"  set via a component parameter. Note text isn\'t visible. (#395)\n\nClick the blue square to continue.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.25], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "textbox_trial3"
  textbox_trial3Clock = new util.Clock();
  textbox3 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox3',
    text: 'Type text here...',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.8, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: 1,
    padding: undefined,
    alignment: 'center',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  text3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text3',
    text: 'textbox_trial3: An editable textbox with a keyboard component that listens to the "x" key.  Bugs: (1) When the textbox has focus and you press an "x", the "x" should not be registered as textbox input but finish the routine (#380). (2) On mobile Edge, the on-screen keyboard "flickers"; it shows up then disappears, then shows up again... (#213)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.25], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  key3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
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
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'intro_trial' ---
    t = 0;
    intro_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the intro_mouse
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-report', 'intro');
    // keep track of which components have finished
    intro_trialComponents = [];
    intro_trialComponents.push(intro_text);
    intro_trialComponents.push(intro_mouse);
    intro_trialComponents.push(intro_polygon);
    
    for (const thisComponent of intro_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function intro_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'intro_trial' ---
    // get current time
    t = intro_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text* updates
    if (t >= 0.0 && intro_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text.tStart = t;  // (not accounting for frame time here)
      intro_text.frameNStart = frameN;  // exact frame index
      
      intro_text.setAutoDraw(true);
    }

    // *intro_mouse* updates
    if (t >= 0.0 && intro_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_mouse.tStart = t;  // (not accounting for frame time here)
      intro_mouse.frameNStart = frameN;  // exact frame index
      
      intro_mouse.status = PsychoJS.Status.STARTED;
      intro_mouse.mouseClock.reset();
      prevButtonState = intro_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (intro_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = intro_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    
    // *intro_polygon* updates
    if (t >= 0.0 && intro_polygon.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_polygon.tStart = t;  // (not accounting for frame time here)
      intro_polygon.frameNStart = frameN;  // exact frame index
      
      intro_polygon.setAutoDraw(true);
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
  return async function () {
    //--- Ending Routine 'intro_trial' ---
    for (const thisComponent of intro_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = intro_mouse.getPos();
    _mouseButtons = intro_mouse.getPressed();
    psychoJS.experiment.addData('intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('intro_mouse.rightButton', _mouseButtons[2]);
    // the Routine "intro_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var msg;
var textbox_trial1Components;
function textbox_trial1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'textbox_trial1' ---
    t = 0;
    textbox_trial1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'textbox_trial1');
    msg = "This is a test";
    textbox1.setText(msg);
    // setup some python lists for storing info about the mouse1
    mouse1.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial1Components = [];
    textbox_trial1Components.push(textbox1);
    textbox_trial1Components.push(polygon1);
    textbox_trial1Components.push(mouse1);
    textbox_trial1Components.push(text1);
    
    for (const thisComponent of textbox_trial1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'textbox_trial1' ---
    // get current time
    t = textbox_trial1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox1* updates
    if (t >= 0.0 && textbox1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox1.tStart = t;  // (not accounting for frame time here)
      textbox1.frameNStart = frameN;  // exact frame index
      
      textbox1.setAutoDraw(true);
    }

    
    // *polygon1* updates
    if (t >= 0.0 && polygon1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon1.tStart = t;  // (not accounting for frame time here)
      polygon1.frameNStart = frameN;  // exact frame index
      
      polygon1.setAutoDraw(true);
    }

    // *mouse1* updates
    if (t >= 0.0 && mouse1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse1.tStart = t;  // (not accounting for frame time here)
      mouse1.frameNStart = frameN;  // exact frame index
      
      mouse1.status = PsychoJS.Status.STARTED;
      mouse1.mouseClock.reset();
      prevButtonState = mouse1.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse1.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse1.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [polygon1]) {
            if (obj.contains(mouse1)) {
              gotValidClick = true;
              mouse1.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *text1* updates
    if (t >= 0.0 && text1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text1.tStart = t;  // (not accounting for frame time here)
      text1.frameNStart = frameN;  // exact frame index
      
      text1.setAutoDraw(true);
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
    for (const thisComponent of textbox_trial1Components)
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


function textbox_trial1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'textbox_trial1' ---
    for (const thisComponent of textbox_trial1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse1.getPos();
    _mouseButtons = mouse1.getPressed();
    psychoJS.experiment.addData('mouse1.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse1.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse1.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse1.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse1.rightButton', _mouseButtons[2]);
    if (mouse1.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse1.clicked_name', mouse1.clicked_name[0]);}
    // the Routine "textbox_trial1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var textbox_trial2Components;
function textbox_trial2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'textbox_trial2' ---
    t = 0;
    textbox_trial2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'textbox_trial2');
    // setup some python lists for storing info about the mouse2
    mouse2.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial2Components = [];
    textbox_trial2Components.push(textbox2);
    textbox_trial2Components.push(polygon2);
    textbox_trial2Components.push(mouse2);
    textbox_trial2Components.push(text2);
    
    for (const thisComponent of textbox_trial2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'textbox_trial2' ---
    // get current time
    t = textbox_trial2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox2* updates
    if (t >= 0.0 && textbox2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox2.tStart = t;  // (not accounting for frame time here)
      textbox2.frameNStart = frameN;  // exact frame index
      
      textbox2.setAutoDraw(true);
    }

    
    // *polygon2* updates
    if (t >= 0.0 && polygon2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon2.tStart = t;  // (not accounting for frame time here)
      polygon2.frameNStart = frameN;  // exact frame index
      
      polygon2.setAutoDraw(true);
    }

    // *mouse2* updates
    if (t >= 0.0 && mouse2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse2.tStart = t;  // (not accounting for frame time here)
      mouse2.frameNStart = frameN;  // exact frame index
      
      mouse2.status = PsychoJS.Status.STARTED;
      mouse2.mouseClock.reset();
      prevButtonState = mouse2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [polygon2]) {
            if (obj.contains(mouse2)) {
              gotValidClick = true;
              mouse2.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *text2* updates
    if (t >= 0.0 && text2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text2.tStart = t;  // (not accounting for frame time here)
      text2.frameNStart = frameN;  // exact frame index
      
      text2.setAutoDraw(true);
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
    for (const thisComponent of textbox_trial2Components)
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


function textbox_trial2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'textbox_trial2' ---
    for (const thisComponent of textbox_trial2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse2.getPos();
    _mouseButtons = mouse2.getPressed();
    psychoJS.experiment.addData('mouse2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse2.rightButton', _mouseButtons[2]);
    if (mouse2.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse2.clicked_name', mouse2.clicked_name[0]);}
    // the Routine "textbox_trial2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key3_allKeys;
var textbox_trial3Components;
function textbox_trial3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'textbox_trial3' ---
    t = 0;
    textbox_trial3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    textbox3.setText('Type text here...');
    textbox3.refresh();
    document.body.setAttribute('data-report', 'textbox_trial3');
    key3.keys = undefined;
    key3.rt = undefined;
    _key3_allKeys = [];
    // keep track of which components have finished
    textbox_trial3Components = [];
    textbox_trial3Components.push(textbox3);
    textbox_trial3Components.push(text3);
    textbox_trial3Components.push(key3);
    
    for (const thisComponent of textbox_trial3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial3RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'textbox_trial3' ---
    // get current time
    t = textbox_trial3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox3* updates
    if (t >= 0.0 && textbox3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox3.tStart = t;  // (not accounting for frame time here)
      textbox3.frameNStart = frameN;  // exact frame index
      
      textbox3.setAutoDraw(true);
    }

    
    // *text3* updates
    if (t >= 0.0 && text3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text3.tStart = t;  // (not accounting for frame time here)
      text3.frameNStart = frameN;  // exact frame index
      
      text3.setAutoDraw(true);
    }

    
    // *key3* updates
    if (t >= 0.0 && key3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key3.tStart = t;  // (not accounting for frame time here)
      key3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key3.clearEvents(); });
    }

    if (key3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key3.getKeys({keyList: ['x'], waitRelease: false});
      _key3_allKeys = _key3_allKeys.concat(theseKeys);
      if (_key3_allKeys.length > 0) {
        key3.keys = _key3_allKeys[_key3_allKeys.length - 1].name;  // just the last key pressed
        key3.rt = _key3_allKeys[_key3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
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
    for (const thisComponent of textbox_trial3Components)
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


function textbox_trial3RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'textbox_trial3' ---
    for (const thisComponent of textbox_trial3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('textbox3.text',textbox3.text)
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key3.corr, level);
    }
    psychoJS.experiment.addData('key3.keys', key3.keys);
    if (typeof key3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key3.rt', key3.rt);
        routineTimer.reset();
        }
    
    key3.stop();
    // the Routine "textbox_trial3" was not non-slip safe, so reset the non-slip timer
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
