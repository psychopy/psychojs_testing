/****************** 
 * Wdio_Text Test *
 ******************/


// store info about the experiment session:
let expName = 'wdio_text';  // from the Builder filename that created this script
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
flowScheduler.add(introductionRoutineBegin());
flowScheduler.add(introductionRoutineEachFrame());
flowScheduler.add(introductionRoutineEnd());
flowScheduler.add(text1RoutineBegin());
flowScheduler.add(text1RoutineEachFrame());
flowScheduler.add(text1RoutineEnd());
flowScheduler.add(text2RoutineBegin());
flowScheduler.add(text2RoutineEachFrame());
flowScheduler.add(text2RoutineEnd());
flowScheduler.add(text3RoutineBegin());
flowScheduler.add(text3RoutineEachFrame());
flowScheduler.add(text3RoutineEnd());
flowScheduler.add(text4RoutineBegin());
flowScheduler.add(text4RoutineEachFrame());
flowScheduler.add(text4RoutineEnd());
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
  expInfo['psychopyVersion'] = '2021.3.0';
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


var introductionClock;
var text_intro;
var mouse_intro;
var text1Clock;
var polygon1;
var turkish_arial;
var mouse1;
var text2Clock;
var polygon2;
var chinese_arial;
var mouse2;
var text3Clock;
var polygon3;
var arabic_arial;
var mouse3;
var text4Clock;
var polygon4;
var hebrew_arial;
var mouse4;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "introduction"
  introductionClock = new util.Clock();
  document.body.setAttribute("data-report", "STARTED");
  
  text_intro = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_intro',
    text: 'wdio_text\n\nThis test presents the following words in succession: "many good mornings my dear" in Turkish, and "hello" in Chinese, Arabic, and Hebrew. \n\nClick to continue...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  mouse_intro = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_intro.mouseClock = new util.Clock();
  // Initialize components for Routine "text1"
  text1Clock = new util.Clock();
  polygon1 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon1', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  turkish_arial = new visual.TextStim({
    win: psychoJS.window,
    name: 'turkish_arial',
    text: 'çok güzel sabahlar aşkım',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.2,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  mouse1 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse1.mouseClock = new util.Clock();
  // Initialize components for Routine "text2"
  text2Clock = new util.Clock();
  polygon2 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon2', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  chinese_arial = new visual.TextStim({
    win: psychoJS.window,
    name: 'chinese_arial',
    text: '你好',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.2,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  mouse2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse2.mouseClock = new util.Clock();
  // Initialize components for Routine "text3"
  text3Clock = new util.Clock();
  polygon3 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon3', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  arabic_arial = new visual.TextStim({
    win: psychoJS.window,
    name: 'arabic_arial',
    text: 'مرحبا',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.2,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  mouse3 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse3.mouseClock = new util.Clock();
  // Initialize components for Routine "text4"
  text4Clock = new util.Clock();
  polygon4 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon4', 
    width: [0.9, 0.9][0], height: [0.9, 0.9][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  hebrew_arial = new visual.TextStim({
    win: psychoJS.window,
    name: 'hebrew_arial',
    text: 'שלום',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.2,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  mouse4 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse4.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var introductionComponents;
function introductionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'introduction'-------
    t = 0;
    introductionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_intro
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    introductionComponents = [];
    introductionComponents.push(text_intro);
    introductionComponents.push(mouse_intro);
    
    introductionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function introductionRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'introduction'-------
    // get current time
    t = introductionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_intro* updates
    if (t >= 0.0 && text_intro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_intro.tStart = t;  // (not accounting for frame time here)
      text_intro.frameNStart = frameN;  // exact frame index
      
      text_intro.setAutoDraw(true);
    }

    // *mouse_intro* updates
    if (t >= 0.0 && mouse_intro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_intro.tStart = t;  // (not accounting for frame time here)
      mouse_intro.frameNStart = frameN;  // exact frame index
      
      mouse_intro.status = PsychoJS.Status.STARTED;
      mouse_intro.mouseClock.reset();
      prevButtonState = mouse_intro.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_intro.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_intro.getPressed();
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
    introductionComponents.forEach( function(thisComponent) {
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
function introductionRoutineEnd() {
  return async function () {
    //------Ending Routine 'introduction'-------
    introductionComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_intro.getPos();
    _mouseButtons = mouse_intro.getPressed();
    psychoJS.experiment.addData('mouse_intro.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_intro.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_intro.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_intro.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_intro.rightButton', _mouseButtons[2]);
    // the Routine "introduction" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var text1Components;
function text1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'text1'-------
    t = 0;
    text1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'text1');
    // setup some python lists for storing info about the mouse1
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    text1Components = [];
    text1Components.push(polygon1);
    text1Components.push(turkish_arial);
    text1Components.push(mouse1);
    
    text1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function text1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'text1'-------
    // get current time
    t = text1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon1* updates
    if (t >= 0.0 && polygon1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon1.tStart = t;  // (not accounting for frame time here)
      polygon1.frameNStart = frameN;  // exact frame index
      
      polygon1.setAutoDraw(true);
    }

    
    // *turkish_arial* updates
    if (t >= 0.0 && turkish_arial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      turkish_arial.tStart = t;  // (not accounting for frame time here)
      turkish_arial.frameNStart = frameN;  // exact frame index
      
      turkish_arial.setAutoDraw(true);
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
    text1Components.forEach( function(thisComponent) {
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


function text1RoutineEnd() {
  return async function () {
    //------Ending Routine 'text1'-------
    text1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse1.getPos();
    _mouseButtons = mouse1.getPressed();
    psychoJS.experiment.addData('mouse1.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse1.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse1.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse1.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse1.rightButton', _mouseButtons[2]);
    // the Routine "text1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var text2Components;
function text2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'text2'-------
    t = 0;
    text2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'text2');
    // setup some python lists for storing info about the mouse2
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    text2Components = [];
    text2Components.push(polygon2);
    text2Components.push(chinese_arial);
    text2Components.push(mouse2);
    
    text2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function text2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'text2'-------
    // get current time
    t = text2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon2* updates
    if (t >= 0.0 && polygon2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon2.tStart = t;  // (not accounting for frame time here)
      polygon2.frameNStart = frameN;  // exact frame index
      
      polygon2.setAutoDraw(true);
    }

    
    // *chinese_arial* updates
    if (t >= 0.0 && chinese_arial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      chinese_arial.tStart = t;  // (not accounting for frame time here)
      chinese_arial.frameNStart = frameN;  // exact frame index
      
      chinese_arial.setAutoDraw(true);
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
    text2Components.forEach( function(thisComponent) {
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


function text2RoutineEnd() {
  return async function () {
    //------Ending Routine 'text2'-------
    text2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse2.getPos();
    _mouseButtons = mouse2.getPressed();
    psychoJS.experiment.addData('mouse2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse2.rightButton', _mouseButtons[2]);
    // the Routine "text2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var text3Components;
function text3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'text3'-------
    t = 0;
    text3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'text3');
    // setup some python lists for storing info about the mouse3
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    text3Components = [];
    text3Components.push(polygon3);
    text3Components.push(arabic_arial);
    text3Components.push(mouse3);
    
    text3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function text3RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'text3'-------
    // get current time
    t = text3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon3* updates
    if (t >= 0.0 && polygon3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon3.tStart = t;  // (not accounting for frame time here)
      polygon3.frameNStart = frameN;  // exact frame index
      
      polygon3.setAutoDraw(true);
    }

    
    // *arabic_arial* updates
    if (t >= 0.0 && arabic_arial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      arabic_arial.tStart = t;  // (not accounting for frame time here)
      arabic_arial.frameNStart = frameN;  // exact frame index
      
      arabic_arial.setAutoDraw(true);
    }

    // *mouse3* updates
    if (t >= 0.0 && mouse3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse3.tStart = t;  // (not accounting for frame time here)
      mouse3.frameNStart = frameN;  // exact frame index
      
      mouse3.status = PsychoJS.Status.STARTED;
      mouse3.mouseClock.reset();
      prevButtonState = mouse3.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse3.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse3.getPressed();
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
    text3Components.forEach( function(thisComponent) {
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


function text3RoutineEnd() {
  return async function () {
    //------Ending Routine 'text3'-------
    text3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse3.getPos();
    _mouseButtons = mouse3.getPressed();
    psychoJS.experiment.addData('mouse3.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse3.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse3.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse3.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse3.rightButton', _mouseButtons[2]);
    // the Routine "text3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var text4Components;
function text4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'text4'-------
    t = 0;
    text4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.setAttribute('data-report', 'text4');
    // setup some python lists for storing info about the mouse4
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    text4Components = [];
    text4Components.push(polygon4);
    text4Components.push(hebrew_arial);
    text4Components.push(mouse4);
    
    text4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function text4RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'text4'-------
    // get current time
    t = text4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon4* updates
    if (t >= 0.0 && polygon4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon4.tStart = t;  // (not accounting for frame time here)
      polygon4.frameNStart = frameN;  // exact frame index
      
      polygon4.setAutoDraw(true);
    }

    
    // *hebrew_arial* updates
    if (t >= 0.0 && hebrew_arial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      hebrew_arial.tStart = t;  // (not accounting for frame time here)
      hebrew_arial.frameNStart = frameN;  // exact frame index
      
      hebrew_arial.setAutoDraw(true);
    }

    // *mouse4* updates
    if (t >= 0.0 && mouse4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse4.tStart = t;  // (not accounting for frame time here)
      mouse4.frameNStart = frameN;  // exact frame index
      
      mouse4.status = PsychoJS.Status.STARTED;
      mouse4.mouseClock.reset();
      prevButtonState = mouse4.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse4.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse4.getPressed();
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
    text4Components.forEach( function(thisComponent) {
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


function text4RoutineEnd() {
  return async function () {
    //------Ending Routine 'text4'-------
    text4Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse4.getPos();
    _mouseButtons = mouse4.getPressed();
    psychoJS.experiment.addData('mouse4.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse4.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse4.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse4.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse4.rightButton', _mouseButtons[2]);
    // the Routine "text4" was not non-slip safe, so reset the non-slip timer
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
