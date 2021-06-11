/********************* 
 * Wdio_Textbox Test *
 *********************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.2.0.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'wdio_textbox';  // from the Builder filename that created this script
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
flowScheduler.add(intro_trialRoutineBegin());
flowScheduler.add(intro_trialRoutineEachFrame());
flowScheduler.add(intro_trialRoutineEnd());
flowScheduler.add(textbox_trial1RoutineBegin());
flowScheduler.add(textbox_trial1RoutineEachFrame());
flowScheduler.add(textbox_trial1RoutineEnd());
flowScheduler.add(textbox_trial2RoutineBegin());
flowScheduler.add(textbox_trial2RoutineEachFrame());
flowScheduler.add(textbox_trial2RoutineEnd());
flowScheduler.add(intro_trial3RoutineBegin());
flowScheduler.add(intro_trial3RoutineEachFrame());
flowScheduler.add(intro_trial3RoutineEnd());
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


var intro_trialClock;
var intro_text;
var intro_mouse;
var textbox_trial1Clock;
var textbox1_2;
var button_submit1_2;
var mouse_resp1_2;
var textbox_trial2Clock;
var textbox1;
var button_submit1;
var mouse_resp1;
var intro_trial3Clock;
var feedback_text1;
var feedback_keyboard1;
var textbox_trial3Clock;
var textbox2;
var button_submit2;
var mouse_resp2;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "intro_trial"
  intro_trialClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'wdio_textbox\n\nThis experiment presents an non-editable textbox, followed by an editable textbox.\n\nClick anywhere to continue...\n',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  intro_mouse.mouseClock = new util.Clock();
  // Expose psychoJS to the browser window
  window.psychoJS = psychoJS;
  // Initialize components for Routine "textbox_trial1"
  textbox_trial1Clock = new util.Clock();
  textbox1_2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox1_2',
    text: '',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.8, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: 1,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  button_submit1_2 = new visual.Rect ({
    win: psychoJS.window, name: 'button_submit1_2', 
    width: [0.1, 0.1][0], height: [0.1, 0.1][1],
    ori: 0, pos: [0, (- 0.25)],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  mouse_resp1_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_resp1_2.mouseClock = new util.Clock();
  // Initialize components for Routine "textbox_trial2"
  textbox_trial2Clock = new util.Clock();
  textbox1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox1',
    text: 'Type your response here',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.8, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: 1,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  button_submit1 = new visual.Rect ({
    win: psychoJS.window, name: 'button_submit1', 
    width: [0.1, 0.1][0], height: [0.1, 0.1][1],
    ori: 0, pos: [0, (- 0.25)],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  mouse_resp1 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_resp1.mouseClock = new util.Clock();
  // Initialize components for Routine "intro_trial3"
  intro_trial3Clock = new util.Clock();
  feedback_text1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_text1',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  feedback_keyboard1 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "textbox_trial3"
  textbox_trial3Clock = new util.Clock();
  textbox2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox2',
    text: 'Type your response here',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.8, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: 1,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  button_submit2 = new visual.Rect ({
    win: psychoJS.window, name: 'button_submit2', 
    width: [0.1, 0.1][0], height: [0.1, 0.1][1],
    ori: 0, pos: [0, (- 0.25)],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), 1]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  mouse_resp2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_resp2.mouseClock = new util.Clock();
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
    
    //------Prepare to start Routine 'intro_trial'-------
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
    //------Loop for each frame of Routine 'intro_trial'-------
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
function intro_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_trial'-------
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
    
    return Scheduler.Event.NEXT;
  };
}


var msg;
var textbox_trial1Components;
function textbox_trial1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'textbox_trial1'-------
    t = 0;
    textbox_trial1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    textbox1_2.setText(msg)
    textbox1_2.reset()
    document.body.setAttribute('data-report', 'textbox1');
    msg = "This is a test";
    // setup some python lists for storing info about the mouse_resp1_2
    mouse_resp1_2.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial1Components = [];
    textbox_trial1Components.push(textbox1_2);
    textbox_trial1Components.push(button_submit1_2);
    textbox_trial1Components.push(mouse_resp1_2);
    
    for (const thisComponent of textbox_trial1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'textbox_trial1'-------
    // get current time
    t = textbox_trial1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox1_2* updates
    if (t >= 0.0 && textbox1_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox1_2.tStart = t;  // (not accounting for frame time here)
      textbox1_2.frameNStart = frameN;  // exact frame index
      
      textbox1_2.setAutoDraw(true);
    }

    
    // *button_submit1_2* updates
    if (t >= 0.0 && button_submit1_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_submit1_2.tStart = t;  // (not accounting for frame time here)
      button_submit1_2.frameNStart = frameN;  // exact frame index
      
      button_submit1_2.setAutoDraw(true);
    }

    // *mouse_resp1_2* updates
    if (t >= 0.0 && mouse_resp1_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_resp1_2.tStart = t;  // (not accounting for frame time here)
      mouse_resp1_2.frameNStart = frameN;  // exact frame index
      
      mouse_resp1_2.status = PsychoJS.Status.STARTED;
      mouse_resp1_2.mouseClock.reset();
      prevButtonState = mouse_resp1_2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_resp1_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_resp1_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [button_submit1]) {
            if (obj.contains(mouse_resp1_2)) {
              gotValidClick = true;
              mouse_resp1_2.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
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


function textbox_trial1RoutineEnd() {
  return async function () {
    //------Ending Routine 'textbox_trial1'-------
    for (const thisComponent of textbox_trial1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_resp1_2.getPos();
    _mouseButtons = mouse_resp1_2.getPressed();
    psychoJS.experiment.addData('mouse_resp1_2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_resp1_2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_resp1_2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_resp1_2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_resp1_2.rightButton', _mouseButtons[2]);
    if (mouse_resp1_2.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_resp1_2.clicked_name', mouse_resp1_2.clicked_name[0]);}
    // the Routine "textbox_trial1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var textbox_trial2Components;
function textbox_trial2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'textbox_trial2'-------
    t = 0;
    textbox_trial2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    textbox1.reset()
    document.body.setAttribute('data-report', 'textbox1');
    // setup some python lists for storing info about the mouse_resp1
    mouse_resp1.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial2Components = [];
    textbox_trial2Components.push(textbox1);
    textbox_trial2Components.push(button_submit1);
    textbox_trial2Components.push(mouse_resp1);
    
    for (const thisComponent of textbox_trial2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'textbox_trial2'-------
    // get current time
    t = textbox_trial2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox1* updates
    if (t >= 0.0 && textbox1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox1.tStart = t;  // (not accounting for frame time here)
      textbox1.frameNStart = frameN;  // exact frame index
      
      textbox1.setAutoDraw(true);
    }

    
    // *button_submit1* updates
    if (t >= 0.0 && button_submit1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_submit1.tStart = t;  // (not accounting for frame time here)
      button_submit1.frameNStart = frameN;  // exact frame index
      
      button_submit1.setAutoDraw(true);
    }

    // *mouse_resp1* updates
    if (t >= 0.0 && mouse_resp1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_resp1.tStart = t;  // (not accounting for frame time here)
      mouse_resp1.frameNStart = frameN;  // exact frame index
      
      mouse_resp1.status = PsychoJS.Status.STARTED;
      mouse_resp1.mouseClock.reset();
      prevButtonState = mouse_resp1.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_resp1.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_resp1.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [button_submit1]) {
            if (obj.contains(mouse_resp1)) {
              gotValidClick = true;
              mouse_resp1.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
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


function textbox_trial2RoutineEnd() {
  return async function () {
    //------Ending Routine 'textbox_trial2'-------
    for (const thisComponent of textbox_trial2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('textbox1.text',textbox1.text)
    console.log(textbox1.getText())
    console.log(textbox1.text)
    document.body.setAttribute('data-output', textbox1.getText());
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_resp1.getPos();
    _mouseButtons = mouse_resp1.getPressed();
    psychoJS.experiment.addData('mouse_resp1.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_resp1.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_resp1.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_resp1.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_resp1.rightButton', _mouseButtons[2]);
    if (mouse_resp1.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_resp1.clicked_name', mouse_resp1.clicked_name[0]);}
    // the Routine "textbox_trial2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _feedback_keyboard1_allKeys;
var intro_trial3Components;
function intro_trial3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intro_trial3'-------
    t = 0;
    intro_trial3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_text1.setText('Press a key to continue...');
    document.body.setAttribute('data-report', 'intro_trial2');
    feedback_keyboard1.keys = undefined;
    feedback_keyboard1.rt = undefined;
    _feedback_keyboard1_allKeys = [];
    // keep track of which components have finished
    intro_trial3Components = [];
    intro_trial3Components.push(feedback_text1);
    intro_trial3Components.push(feedback_keyboard1);
    
    for (const thisComponent of intro_trial3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function intro_trial3RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intro_trial3'-------
    // get current time
    t = intro_trial3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_text1* updates
    if (t >= 0.0 && feedback_text1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_text1.tStart = t;  // (not accounting for frame time here)
      feedback_text1.frameNStart = frameN;  // exact frame index
      
      feedback_text1.setAutoDraw(true);
    }

    
    // *feedback_keyboard1* updates
    if (t >= 0.0 && feedback_keyboard1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_keyboard1.tStart = t;  // (not accounting for frame time here)
      feedback_keyboard1.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { feedback_keyboard1.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { feedback_keyboard1.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { feedback_keyboard1.clearEvents(); });
    }

    if (feedback_keyboard1.status === PsychoJS.Status.STARTED) {
      let theseKeys = feedback_keyboard1.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _feedback_keyboard1_allKeys = _feedback_keyboard1_allKeys.concat(theseKeys);
      if (_feedback_keyboard1_allKeys.length > 0) {
        feedback_keyboard1.keys = _feedback_keyboard1_allKeys[_feedback_keyboard1_allKeys.length - 1].name;  // just the last key pressed
        feedback_keyboard1.rt = _feedback_keyboard1_allKeys[_feedback_keyboard1_allKeys.length - 1].rt;
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
    for (const thisComponent of intro_trial3Components)
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


function intro_trial3RoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_trial3'-------
    for (const thisComponent of intro_trial3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('feedback_keyboard1.keys', feedback_keyboard1.keys);
    if (typeof feedback_keyboard1.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('feedback_keyboard1.rt', feedback_keyboard1.rt);
        routineTimer.reset();
        }
    
    feedback_keyboard1.stop();
    // the Routine "intro_trial3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var textbox_trial3Components;
function textbox_trial3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'textbox_trial3'-------
    t = 0;
    textbox_trial3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    textbox2.reset()
    document.body.setAttribute('data-report', 'textbox2');
    // setup some python lists for storing info about the mouse_resp2
    mouse_resp2.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial3Components = [];
    textbox_trial3Components.push(textbox2);
    textbox_trial3Components.push(button_submit2);
    textbox_trial3Components.push(mouse_resp2);
    
    for (const thisComponent of textbox_trial3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial3RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'textbox_trial3'-------
    // get current time
    t = textbox_trial3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox2* updates
    if (t >= 0.0 && textbox2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox2.tStart = t;  // (not accounting for frame time here)
      textbox2.frameNStart = frameN;  // exact frame index
      
      textbox2.setAutoDraw(true);
    }

    
    // *button_submit2* updates
    if (t >= 0.0 && button_submit2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_submit2.tStart = t;  // (not accounting for frame time here)
      button_submit2.frameNStart = frameN;  // exact frame index
      
      button_submit2.setAutoDraw(true);
    }

    // *mouse_resp2* updates
    if (t >= 0.0 && mouse_resp2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_resp2.tStart = t;  // (not accounting for frame time here)
      mouse_resp2.frameNStart = frameN;  // exact frame index
      
      mouse_resp2.status = PsychoJS.Status.STARTED;
      mouse_resp2.mouseClock.reset();
      prevButtonState = mouse_resp2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_resp2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_resp2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [button_submit2]) {
            if (obj.contains(mouse_resp2)) {
              gotValidClick = true;
              mouse_resp2.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
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


function textbox_trial3RoutineEnd() {
  return async function () {
    //------Ending Routine 'textbox_trial3'-------
    for (const thisComponent of textbox_trial3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('textbox2.text',textbox2.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_resp2.getPos();
    _mouseButtons = mouse_resp2.getPressed();
    psychoJS.experiment.addData('mouse_resp2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_resp2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_resp2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_resp2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_resp2.rightButton', _mouseButtons[2]);
    if (mouse_resp2.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_resp2.clicked_name', mouse_resp2.clicked_name[0]);}
    // the Routine "textbox_trial3" was not non-slip safe, so reset the non-slip timer
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
