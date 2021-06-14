/******************** 
 * Wdio_Button Test *
 ********************/


// store info about the experiment session:
let expName = 'wdio_button';  // from the Builder filename that created this script
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
flowScheduler.add(button1_trialRoutineBegin());
flowScheduler.add(button1_trialRoutineEachFrame());
flowScheduler.add(button1_trialRoutineEnd());
flowScheduler.add(button2_trialRoutineBegin());
flowScheduler.add(button2_trialRoutineEachFrame());
flowScheduler.add(button2_trialRoutineEnd());
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
var myCallbackSingle;
var myCallbackMultiple;
var button1_trialClock;
var button1;
var button2_trialClock;
var button2;
var button_finish;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "intro_trial"
  intro_trialClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'wdio_button\n\nThis experiment presents a clickable button. The first routine ends on a click on the button, calling a callback once. The second routine does not end on a click, calling the callback so long as the button is depressed.\n\nClick anywhere to continue...\n',
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
  
  // Callback for a single click
  myCallbackSingle = function() {
      document.body.setAttribute('data-output', 'callback');
  }
  
  // Callback for multiple clicks: increment a counter
  var callbackCounter = 0;
  myCallbackMultiple = function() {
      callbackCounter++;
      document.body.setAttribute('data-output', callbackCounter);
  }
  
  // Initialize components for Routine "button1_trial"
  button1_trialClock = new util.Clock();
  button1 = new visual.ButtonStim({
    win: psychoJS.window,
    name: 'button1',
    text: 'Click here',
    pos: [0, 0.25], letterHeight: 0.05,
    size: null
  });
  button1.clock = new util.Clock();
  
  // Initialize components for Routine "button2_trial"
  button2_trialClock = new util.Clock();
  button2 = new visual.ButtonStim({
    win: psychoJS.window,
    name: 'button2',
    text: 'Click here',
    pos: [0, (- 0.25)], letterHeight: 0.05,
    size: null
  });
  button2.clock = new util.Clock();
  
  button_finish = new visual.ButtonStim({
    win: psychoJS.window,
    name: 'button_finish',
    text: 'Click to finish',
    pos: [0, 0], letterHeight: 0.05,
    size: null
  });
  button_finish.clock = new util.Clock();
  
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
    
    intro_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
function intro_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'intro_trial'-------
    intro_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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


var button1_trialComponents;
function button1_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'button1_trial'-------
    t = 0;
    button1_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'button1_trial');
    document.body.setAttribute('data-output', '');
    // keep track of which components have finished
    button1_trialComponents = [];
    button1_trialComponents.push(button1);
    
    button1_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function button1_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'button1_trial'-------
    // get current time
    t = button1_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *button1* updates
    if (t >= 0 && button1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button1.tStart = t;  // (not accounting for frame time here)
      button1.frameNStart = frameN;  // exact frame index
      
      button1.setAutoDraw(true);
    }

    if (button1.status === PsychoJS.Status.STARTED) {
      // check whether button1 has been pressed
      if (button1.isClicked) {
        if (!button1.wasClicked) {
          // store time of first click
          button1.timesOn.push(button1.clock.getTime());
          // store time clicked until
          button1.timesOff.push(button1.clock.getTime());
        } else {
          // update time clicked until;
          button1.timesOff[button1.timesOff.length - 1] = button1.clock.getTime();
        }
        if (!button1.wasClicked) {
          // end routine when button1 is clicked
          continueRoutine = false;
          myCallbackSingle();
        }
        // if button1 is still clicked next frame, it is not a new click
        button1.wasClicked = true;
      } else {
        // if button1 is clicked next frame, it is a new click
        button1.wasClicked = false
      }
    } else {
      // keep clock at 0 if button1 hasn't started / has finished
      button1.clock.reset();
      // if button1 is clicked next frame, it is a new click
      button1.wasClicked = false;
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
    button1_trialComponents.forEach( function(thisComponent) {
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


function button1_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'button1_trial'-------
    button1_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "button1_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var button2_trialComponents;
function button2_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'button2_trial'-------
    t = 0;
    button2_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'button2_trial');
    // keep track of which components have finished
    button2_trialComponents = [];
    button2_trialComponents.push(button2);
    button2_trialComponents.push(button_finish);
    
    button2_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function button2_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'button2_trial'-------
    // get current time
    t = button2_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *button2* updates
    if (t >= 0 && button2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button2.tStart = t;  // (not accounting for frame time here)
      button2.frameNStart = frameN;  // exact frame index
      
      button2.setAutoDraw(true);
    }

    if (button2.status === PsychoJS.Status.STARTED) {
      // check whether button2 has been pressed
      if (button2.isClicked) {
        if (!button2.wasClicked) {
          // store time of first click
          button2.timesOn.push(button2.clock.getTime());
          // store time clicked until
          button2.timesOff.push(button2.clock.getTime());
        } else {
          // update time clicked until;
          button2.timesOff[button2.timesOff.length - 1] = button2.clock.getTime();
        }
        myCallbackMultiple();
        // if button2 is still clicked next frame, it is not a new click
        button2.wasClicked = true;
      } else {
        // if button2 is clicked next frame, it is a new click
        button2.wasClicked = false
      }
    } else {
      // keep clock at 0 if button2 hasn't started / has finished
      button2.clock.reset();
      // if button2 is clicked next frame, it is a new click
      button2.wasClicked = false;
    }
    
    // *button_finish* updates
    if (t >= 0 && button_finish.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_finish.tStart = t;  // (not accounting for frame time here)
      button_finish.frameNStart = frameN;  // exact frame index
      
      button_finish.setAutoDraw(true);
    }

    if (button_finish.status === PsychoJS.Status.STARTED) {
      // check whether button_finish has been pressed
      if (button_finish.isClicked) {
        if (!button_finish.wasClicked) {
          // store time of first click
          button_finish.timesOn.push(button_finish.clock.getTime());
          // store time clicked until
          button_finish.timesOff.push(button_finish.clock.getTime());
        } else {
          // update time clicked until;
          button_finish.timesOff[button_finish.timesOff.length - 1] = button_finish.clock.getTime();
        }
        if (!button_finish.wasClicked) {
          // end routine when button_finish is clicked
          continueRoutine = false;
          null;
        }
        // if button_finish is still clicked next frame, it is not a new click
        button_finish.wasClicked = true;
      } else {
        // if button_finish is clicked next frame, it is a new click
        button_finish.wasClicked = false
      }
    } else {
      // keep clock at 0 if button_finish hasn't started / has finished
      button_finish.clock.reset();
      // if button_finish is clicked next frame, it is a new click
      button_finish.wasClicked = false;
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
    button2_trialComponents.forEach( function(thisComponent) {
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


function button2_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'button2_trial'-------
    button2_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "button2_trial" was not non-slip safe, so reset the non-slip timer
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
