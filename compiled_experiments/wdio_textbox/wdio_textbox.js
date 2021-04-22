/********************* 
 * Wdio_Textbox Test *
 *********************/

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
let expName = 'wdio_textbox';  // from the Builder filename that created this script
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
flowScheduler.add(textbox_trial1RoutineBegin());
flowScheduler.add(textbox_trial1RoutineEachFrame());
flowScheduler.add(textbox_trial1RoutineEnd());
flowScheduler.add(feedback1RoutineBegin());
flowScheduler.add(feedback1RoutineEachFrame());
flowScheduler.add(feedback1RoutineEnd());
flowScheduler.add(textbox_trial2RoutineBegin());
flowScheduler.add(textbox_trial2RoutineEachFrame());
flowScheduler.add(textbox_trial2RoutineEnd());
flowScheduler.add(feedback2RoutineBegin());
flowScheduler.add(feedback2RoutineEachFrame());
flowScheduler.add(feedback2RoutineEnd());
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
var intro_text;
var intro_mouse;
var textbox_trial1Clock;
var textbox1;
var button_submit1;
var mouse_resp1;
var feedback1Clock;
var feedback_text1;
var feedback_keyboard1;
var textbox_trial2Clock;
var textbox2;
var button_submit2;
var mouse_resp2;
var feedback2Clock;
var feedback_text2;
var feedback_mouse2;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "intro_trial"
  intro_trialClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: "wdio_textbox\n\nThis experiment presents an editable textbox and a keyboard response that registers the 'enter' key. Upon pressing the 'enter' key, the text that was just typed in is presented.\n\nClick anywhere to continue...\n",
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
  // Initialize components for Routine "textbox_trial1"
  textbox_trial1Clock = new util.Clock();
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
  // Initialize components for Routine "feedback1"
  feedback1Clock = new util.Clock();
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
  
  // Initialize components for Routine "textbox_trial2"
  textbox_trial2Clock = new util.Clock();
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
  // Initialize components for Routine "feedback2"
  feedback2Clock = new util.Clock();
  feedback_text2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_text2',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  feedback_mouse2 = new core.Mouse({
    win: psychoJS.window,
  });
  feedback_mouse2.mouseClock = new util.Clock();
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
function intro_trialRoutineEachFrame(snapshot) {
  return function () {
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
function intro_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_trial'-------
    for (const thisComponent of intro_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
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


var textbox_trial1Components;
function textbox_trial1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'textbox_trial1'-------
    t = 0;
    textbox_trial1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'textbox1');
    // setup some python lists for storing info about the mouse_resp1
    mouse_resp1.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial1Components = [];
    textbox_trial1Components.push(textbox1);
    textbox_trial1Components.push(button_submit1);
    textbox_trial1Components.push(mouse_resp1);
    
    for (const thisComponent of textbox_trial1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'textbox_trial1'-------
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
  return function () {
    //------Ending Routine 'textbox_trial1'-------
    for (const thisComponent of textbox_trial1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('textbox1.text',textbox1.text)
    textbox1.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_resp1.getPos();
    _mouseButtons = mouse_resp1.getPressed();
    psychoJS.experiment.addData('mouse_resp1.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_resp1.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_resp1.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_resp1.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_resp1.rightButton', _mouseButtons[2]);
    if (mouse_resp1.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_resp1.clicked_name', mouse_resp1.clicked_name[0]);}
    // the Routine "textbox_trial1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _feedback_keyboard1_allKeys;
var feedback1Components;
function feedback1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'feedback1'-------
    t = 0;
    feedback1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_text1.setText(textbox1.getText());
    document.body.setAttribute('data-output', textbox1.getText());
    document.body.setAttribute('data-report', 'feedback1');
    feedback_keyboard1.keys = undefined;
    feedback_keyboard1.rt = undefined;
    _feedback_keyboard1_allKeys = [];
    // keep track of which components have finished
    feedback1Components = [];
    feedback1Components.push(feedback_text1);
    feedback1Components.push(feedback_keyboard1);
    
    for (const thisComponent of feedback1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function feedback1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'feedback1'-------
    // get current time
    t = feedback1Clock.getTime();
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
    for (const thisComponent of feedback1Components)
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


function feedback1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'feedback1'-------
    for (const thisComponent of feedback1Components) {
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
    // the Routine "feedback1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var textbox_trial2Components;
function textbox_trial2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'textbox_trial2'-------
    t = 0;
    textbox_trial2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'textbox2');
    // setup some python lists for storing info about the mouse_resp2
    mouse_resp2.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    textbox_trial2Components = [];
    textbox_trial2Components.push(textbox2);
    textbox_trial2Components.push(button_submit2);
    textbox_trial2Components.push(mouse_resp2);
    
    for (const thisComponent of textbox_trial2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function textbox_trial2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'textbox_trial2'-------
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
  return function () {
    //------Ending Routine 'textbox_trial2'-------
    for (const thisComponent of textbox_trial2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('textbox2.text',textbox2.text)
    textbox2.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_resp2.getPos();
    _mouseButtons = mouse_resp2.getPressed();
    psychoJS.experiment.addData('mouse_resp2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_resp2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_resp2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_resp2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_resp2.rightButton', _mouseButtons[2]);
    if (mouse_resp2.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_resp2.clicked_name', mouse_resp2.clicked_name[0]);}
    // the Routine "textbox_trial2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var feedback2Components;
function feedback2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'feedback2'-------
    t = 0;
    feedback2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_text2.setText(textbox2.getText());
    // setup some python lists for storing info about the feedback_mouse2
    gotValidClick = false; // until a click is received
    document.body.setAttribute('data-output', textbox2.getText());
    document.body.setAttribute('data-report', 'feedback2');
    // keep track of which components have finished
    feedback2Components = [];
    feedback2Components.push(feedback_text2);
    feedback2Components.push(feedback_mouse2);
    
    for (const thisComponent of feedback2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function feedback2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'feedback2'-------
    // get current time
    t = feedback2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_text2* updates
    if (t >= 0.0 && feedback_text2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_text2.tStart = t;  // (not accounting for frame time here)
      feedback_text2.frameNStart = frameN;  // exact frame index
      
      feedback_text2.setAutoDraw(true);
    }

    // *feedback_mouse2* updates
    if (t >= 0.0 && feedback_mouse2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_mouse2.tStart = t;  // (not accounting for frame time here)
      feedback_mouse2.frameNStart = frameN;  // exact frame index
      
      feedback_mouse2.status = PsychoJS.Status.STARTED;
      feedback_mouse2.mouseClock.reset();
      prevButtonState = feedback_mouse2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (feedback_mouse2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = feedback_mouse2.getPressed();
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
    for (const thisComponent of feedback2Components)
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


function feedback2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'feedback2'-------
    for (const thisComponent of feedback2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = feedback_mouse2.getPos();
    _mouseButtons = feedback_mouse2.getPressed();
    psychoJS.experiment.addData('feedback_mouse2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('feedback_mouse2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('feedback_mouse2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('feedback_mouse2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('feedback_mouse2.rightButton', _mouseButtons[2]);
    // the Routine "feedback2" was not non-slip safe, so reset the non-slip timer
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
