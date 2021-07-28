/********************** 
 * Demo_Polyfill Test *
 **********************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.3.0.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'demo_polyfill';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
// Import the polyfill
import PsychoPolyFill from './PsychoPolyfill.js';
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
flowScheduler.add(import_polyfillRoutineBegin());
flowScheduler.add(import_polyfillRoutineEachFrame());
flowScheduler.add(import_polyfillRoutineEnd());
flowScheduler.add(run_testsRoutineBegin());
flowScheduler.add(run_testsRoutineEachFrame());
flowScheduler.add(run_testsRoutineEnd());
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


var import_polyfillClock;
var run_testsClock;
var test_text;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "import_polyfill"
  import_polyfillClock = new util.Clock();
  // Initialize the polyfill
  PsychoPolyFill(expInfo.psychopyVersion, psychoJS, util);
  
  // Initialize components for Routine "run_tests"
  run_testsClock = new util.Clock();
  test_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_text',
    text: 'Running tests of PsychoPolyfill...',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var import_polyfillComponents;
function import_polyfillRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'import_polyfill'-------
    t = 0;
    import_polyfillClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // The line of code below is only for our automated testing system
    document.body.setAttribute('data-report', 'intro_trial');
    // keep track of which components have finished
    import_polyfillComponents = [];
    
    for (const thisComponent of import_polyfillComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function import_polyfillRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'import_polyfill'-------
    // get current time
    t = import_polyfillClock.getTime();
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
    for (const thisComponent of import_polyfillComponents)
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


function import_polyfillRoutineEnd() {
  return async function () {
    //------Ending Routine 'import_polyfill'-------
    for (const thisComponent of import_polyfillComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "import_polyfill" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var checkRandomInteger;
var run_testsComponents;
function run_testsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'run_tests'-------
    t = 0;
    run_testsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    // *******************************
    // *** Tests of PsychoPolyfill ***
    // *******************************
    
    // Sort a couple of numbers
    if (JSON.stringify(sort([4.3, 1, 2])) !== JSON.stringify([1, 2, 4.3])) {
        throw new Error('Failed sorting [4.3, 1, 2]');
    }
    // Sort a couple of strings
    if (JSON.stringify(sort(['a', 'b', 'ab'])) !== JSON.stringify(['a', 'ab', 'b'])) {
        throw new Error('Failed sorting [\'a\', \'b\', \'ab\']');
    }
    // Sort a mix of numbers and string; should throw an error
    try {
        sort([1, 2, 'a']);
        throw new Error('Sorting [1, 2, \'a\'] should throw an Error, but it did not');
    } catch (e) {}
    
    // A haystack with an assortment of different types of values
    let haystack = [1, 1, 2, 3, 'word', null, undefined, NaN, true, [1, 2, 3], {a:2}, function() {}];
    
    // Test count function
    if (haystack.count(1) !== 2) {
        throw new Error('Did not count 2 occurences of 1 in haystack');
    }
    if (haystack.count('word') !== 1) {
        throw new Error('Did not count 1 occurence of \'word\' in haystack');
    }
    if (haystack.count(null) !== 1) {
        throw new Error('Did not count 1 occurence of null in haystack');
    }
    if (haystack.count(undefined) !== 1) {
        throw new Error('Did not count 1 occurence of undefined in haystack');
    }
    if (haystack.count(NaN) !== 1) {
        throw new Error('Did not count 1 occurence of NaN in haystack');
    }
    if (haystack.count(true) !== 1) {
        throw new Error('Did not count 1 occurence of true in haystack');
    }
    if (haystack.count([1,2,3]) !== 1) {
        throw new Error('Did not count 1 occurence of [1,2,3] in haystack');
    }
    if (haystack.count({a:2}) !== 1) {
        throw new Error('Did not count 1 occurence of {a:2} in haystack');
    }
    try {
        haystack.count(function() {});
        throw new Error('Counting function() {} should throw an Error, but it did not');
    } catch (e) {}
    
    try {
        haystack.count(Symbol('a'));
        throw new Error('Counting Symbol(\'a\') should throw an Error, but it did not');
    } catch (e) {}
    
    // Test index function
    if (haystack.index({a:2}) !== 10) {
        throw new Error('Did not find the index of {a:2} a position 10');
    }
    try {
        haystack.index('missing');
        throw new Error('Finding the index of \'missing\' should throw an Error, but it did not');
    } catch (e) {}
    
    // Test randint function
    checkRandomInteger = (checkMe, low, high, context) => {
    }
    // Generate and check a bunch of random integers
    let checkMe, low = 4, high = 8;
    for (let i = 0; i < 1000; i++) {
        checkMe = randint(low, high);
        if (!Number.isInteger(checkMe)) {
            throw new Error('Calling randint yielded a number that was not an integer');
        }
        if (checkMe < low) {
            throw new Error('Calling randint yielded a number that was < ' + low);
        }
        if (checkMe >= high) {
            throw new Error('Calling randint yielded a number that was >= ' + high);
        }
    }
    // Check errors thrown calling randint with invalid arguments
    try {
        randint('a', 8);
        throw new Error('Calling randint(\'a\', 8) should throw an Error, but it did not');
    } catch (e) {}
    try {
        randint(8, 'a');
        throw new Error('Calling randint(8, \'a\') should throw an Error, but it did not');
    } catch (e) {}
    try {
        randint(8, 8.1);
        throw new Error('Calling randint(8, 8.1) should throw an Error, but it did not');
    } catch (e) {}
    try {
        randint(1, 2, 3);
        throw new Error('Calling randint(1, 2, 3) should throw an Error, but it did not');
    } catch (e) {}
    
    // Test range
    if (JSON.stringify(range(5)) !== JSON.stringify([0, 1, 2, 3, 4])) {
        throw new Error('range(5) did not yield [0, 1, 2, 3, 4]');
    }
    if (JSON.stringify(range(1, 1)) !== JSON.stringify([])) {
        throw new Error('range(1, 1) did not yield []');
    }
    if (JSON.stringify(range(1, 5)) !== JSON.stringify([1, 2, 3, 4])) {
        throw new Error('range(1, 5) did not yield [1, 2, 3, 4]');
    }
    if (JSON.stringify(range(1, 5, 2)) !== JSON.stringify([1, 3])) {
        throw new Error('range(1, 5, 2) did not yield [1, 3]');
    }
    try {
        range(1.1);
        throw new Error('Calling range(1.1) should throw an Error, but it did not');
    } catch (e) {}
    try {
        range(1, 1.1);
        throw new Error('Calling range(1, 1.1) should throw an Error, but it did not');
    } catch (e) {}
    try {
        range(1, 1, 1.1);
        throw new Error('Calling range(1, 1, 1.1) should throw an Error, but it did not');
    } catch (e) {}
    try {
        range(1, 2, 3, 4);
        throw new Error('Calling range(1, 2, 3, 4) should throw an Error, but it did not');
    } catch (e) {}
    
    // Test sum
    if (sum([1,2,3]) !== 6) {
        throw new Error('sum([1,2,3]) did not yield 6');
    }
    if (sum([1,2,3], 2) !== 8) {
        throw new Error('sum([1,2,3], 2) did not yield 8');
    }
    try {
        sum('hello');
        throw new Error('Calling sum(\'hello\') should throw an Error, but it did not');
    } catch (e) {}
    try {
        sum([1,2,'a']);
        throw new Error('Calling sum([1,2,\'a\']) should throw an Error, but it did not');
    } catch (e) {}
    try {
        sum([1,2,3], 'hello');
        throw new Error('Calling sum([1,2,3], \'hello\') should throw an Error, but it did not');
    } catch (e) {}
    try {
        sum({a:3});
        throw new Error('Calling sum({a:3}) should throw an Error, but it did not');
    } catch (e) {}
    try {
        sum([1,2,3], 2, 2);
        throw new Error('Calling sum([1,2,3], 2, 2) should throw an Error, but it did not');
    } catch (e) {}
    
    
    // Test average
    if (average([1,2,3]) !== 2) {
        throw new Error('average([1,2,3]) did not yield 2');
    }
    try {
        average('hello');
        throw new Error('Calling average(\'hello\') should throw an Error, but it did not');
    } catch (e) {}
    try {
        average([1,2,'a']);
        throw new Error('Calling average([1,2,\'a\']) should throw an Error, but it did not');
    } catch (e) {}
    try {
        average([1,2,3], 2);
        throw new Error('Calling average([1,2,3], 2) should throw an Error, but it did not');
    } catch (e) {}
    
    // keep track of which components have finished
    run_testsComponents = [];
    run_testsComponents.push(test_text);
    
    for (const thisComponent of run_testsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function run_testsRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'run_tests'-------
    // get current time
    t = run_testsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *test_text* updates
    if (t >= 0.0 && test_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_text.tStart = t;  // (not accounting for frame time here)
      test_text.frameNStart = frameN;  // exact frame index
      
      test_text.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (test_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      test_text.setAutoDraw(false);
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
    for (const thisComponent of run_testsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function run_testsRoutineEnd() {
  return async function () {
    //------Ending Routine 'run_tests'-------
    for (const thisComponent of run_testsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
  
  // The line of code below is only for our automated testing system
  document.body.setAttribute('data-report', 'FINISHED');
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
