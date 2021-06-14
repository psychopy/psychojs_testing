﻿/******************** 
 * Wdio_Button Test *
 ********************/

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
let expName = 'wdio_button';  // from the Builder filename that created this script
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
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "intro_trial"
  intro_trialClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'wdio_button\n\nThis experiment presents a clickable button.\n\nClick anywhere to continue...\n',
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
    
    intro_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    intro_trialComponents.forEach( function(thisComponent) {
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
function intro_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_trial'-------
    intro_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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


var myFunction;
var textbox_trial1Components;
function textbox_trial1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'textbox_trial1'-------
    t = 0;
    textbox_trial1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'button');
    document.body.setAttribute('data-output', '');
    myFunction = function() {
        document.body.setAttribute('data-output', 'callback');
    }
    // keep track of which components have finished
    textbox_trial1Components = [];
    
    textbox_trial1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    textbox_trial1Components.forEach( function(thisComponent) {
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


function textbox_trial1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'textbox_trial1'-------
    textbox_trial1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "textbox_trial1" was not non-slip safe, so reset the non-slip timer
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
