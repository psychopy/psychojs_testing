/******************** 
 * Int_Flanker Test *
 ********************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.2.0.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'int_flanker';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
import * as Slideshow from './js/Slideshow.js';
import * as Layout from './js/Layout.js';
import * as ScreenMetrics from './js/ScreenMetrics.js';
// Type of device we're administering the Flanker on (sm = smartphone, kb = keyboard)
var deviceType = 'kb';
// If rehearsing, give more extensive feedback
var rehearsing;
// Number of times each stimulus is replicated each block
var nReps;
// For informing e2e test it can start giving responses
var layoutReady = false;
var preparation_phase = 'landscape';
// Setup a layout
var slideshowLayout;
// Slideshow logic
var slideshow;
// Layout drawn? Then inform wdio about the button positions
var layoutReady;
var flankerLayout;
// How long to wait before a response on the feedback is registered?
var feedback_response_start;
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
flowScheduler.add(load_modules_trialRoutineBegin());
flowScheduler.add(load_modules_trialRoutineEachFrame());
flowScheduler.add(load_modules_trialRoutineEnd());
const preparationsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(preparationsLoopBegin(preparationsLoopScheduler));
flowScheduler.add(preparationsLoopScheduler);
flowScheduler.add(preparationsLoopEnd);
const slidesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(slidesLoopBegin(slidesLoopScheduler));
flowScheduler.add(slidesLoopScheduler);
flowScheduler.add(slidesLoopEnd);
const blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocksLoopBegin(blocksLoopScheduler));
flowScheduler.add(blocksLoopScheduler);
flowScheduler.add(blocksLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'img/fb_correct_sm.png', 'path': 'img/fb_correct_sm.png'},
    {'name': 'img/post_block_halfway_kb.png', 'path': 'img/post_block_halfway_kb.png'},
    {'name': 'img/request_landscape.png', 'path': 'img/request_landscape.png'},
    {'name': 'img/post_block_rehearsal_sm.png', 'path': 'img/post_block_rehearsal_sm.png'},
    {'name': 'img/slide_2.png', 'path': 'img/slide_2.png'},
    {'name': 'img/fb_incorrect2_sm.png', 'path': 'img/fb_incorrect2_sm.png'},
    {'name': 'img/fb_correct_kb.png', 'path': 'img/fb_correct_kb.png'},
    {'name': 'img/slide_9.png', 'path': 'img/slide_9.png'},
    {'name': 'img/fb_incorrect1_kb.png', 'path': 'img/fb_incorrect1_kb.png'},
    {'name': 'img/slide_4.png', 'path': 'img/slide_4.png'},
    {'name': 'img/slide_7_sm.jpg', 'path': 'img/slide_7_sm.jpg'},
    {'name': 'img/post_block_rehearsal_kb.png', 'path': 'img/post_block_rehearsal_kb.png'},
    {'name': 'img/fb_too_fast1.png', 'path': 'img/fb_too_fast1.png'},
    {'name': 'img/slide_5.png', 'path': 'img/slide_5.png'},
    {'name': 'img/fb_incorrect2_kb.png', 'path': 'img/fb_incorrect2_kb.png'},
    {'name': 'img/go_fullscreen.png', 'path': 'img/go_fullscreen.png'},
    {'name': 'img/inc_left.png', 'path': 'img/inc_left.png'},
    {'name': 'img/post_block_main_sm.png', 'path': 'img/post_block_main_sm.png'},
    {'name': 'img/slide_8.png', 'path': 'img/slide_8.png'},
    {'name': 'img/slide_7_kb.jpg', 'path': 'img/slide_7_kb.jpg'},
    {'name': 'img/aspect_ratio.png', 'path': 'img/aspect_ratio.png'},
    {'name': 'img/slide_3.png', 'path': 'img/slide_3.png'},
    {'name': 'img/slide_10.png', 'path': 'img/slide_10.png'},
    {'name': 'img/con_left.png', 'path': 'img/con_left.png'},
    {'name': 'img/slide_1_sm.png', 'path': 'img/slide_1_sm.png'},
    {'name': 'img/slide_6_kb.png', 'path': 'img/slide_6_kb.png'},
    {'name': 'sheet/conditions.xlsx', 'path': 'sheet/conditions.xlsx'},
    {'name': 'img/quit.png', 'path': 'img/quit.png'},
    {'name': 'img/inc_right.png', 'path': 'img/inc_right.png'},
    {'name': 'img/fb_incorrect1_sm.png', 'path': 'img/fb_incorrect1_sm.png'},
    {'name': 'img/request_fullscreen.png', 'path': 'img/request_fullscreen.png'},
    {'name': 'img/fb_none.png', 'path': 'img/fb_none.png'},
    {'name': 'img/slide_1_kb.png', 'path': 'img/slide_1_kb.png'},
    {'name': 'img/fixation.png', 'path': 'img/fixation.png'},
    {'name': 'img/slide_0_sm.png', 'path': 'img/slide_0_sm.png'},
    {'name': 'img/slide_0_kb.png', 'path': 'img/slide_0_kb.png'},
    {'name': 'img/fb_too_fast2_kb.png', 'path': 'img/fb_too_fast2_kb.png'},
    {'name': 'img/post_block_halfway_sm.png', 'path': 'img/post_block_halfway_sm.png'},
    {'name': 'img/request_portrait.png', 'path': 'img/request_portrait.png'},
    {'name': 'img/slide_6_sm.png', 'path': 'img/slide_6_sm.png'},
    {'name': 'img/fb_too_fast2_sm.png', 'path': 'img/fb_too_fast2_sm.png'},
    {'name': 'img/con_right.png', 'path': 'img/con_right.png'},
    {'name': 'img/post_block_main_kb.png', 'path': 'img/post_block_main_kb.png'}
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


var load_modules_trialClock;
var prepare_trialClock;
var prepare_mouse;
var quit;
var go_fullscreen;
var request_landscape;
var aspect_ratio;
var request_fullscreen;
var slideshow_trialClock;
var slideshow_mouse;
var slideshow_image;
var slideshow_next;
var slideshow_previous;
var slideshowLayout;
var slideshow;
var slideshowReady;
var slideshow_keyboard;
var pre_block_trialClock;
var flanker_trialClock;
var flanker_mouse;
var flanker_image;
var flanker_left;
var flanker_right;
var flanker_fixation;
var flankerLayout;
var flanker_keyboard;
var feedback_trialClock;
var feedback_mouse;
var feedback_image1;
var feedback_image2;
var feedback_keyboard;
var post_block_trialClock;
var post_block_mouse;
var post_block_image;
var post_block_keyboard;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "load_modules_trial"
  load_modules_trialClock = new util.Clock();
  window.document.documentElement.style.overflow = 'hidden';
  window.psychoJS = psychoJS;
  // Initialize components for Routine "prepare_trial"
  prepare_trialClock = new util.Clock();
  prepare_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  prepare_mouse.mouseClock = new util.Clock();
  quit = new visual.ImageStim({
    win : psychoJS.window,
    name : 'quit', units : undefined, 
    image : 'img/quit.png', mask : undefined,
    ori : 0.0, pos : [(- 0.25), (- 0.25)], size : [0.4, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  go_fullscreen = new visual.ImageStim({
    win : psychoJS.window,
    name : 'go_fullscreen', units : undefined, 
    image : 'img/go_fullscreen.png', mask : undefined,
    ori : 0.0, pos : [0.25, (- 0.25)], size : [0.4, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  request_landscape = new visual.ImageStim({
    win : psychoJS.window,
    name : 'request_landscape', units : undefined, 
    image : 'img/request_landscape.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 1],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  aspect_ratio = new visual.ImageStim({
    win : psychoJS.window,
    name : 'aspect_ratio', units : undefined, 
    image : 'img/aspect_ratio.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 1],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  request_fullscreen = new visual.ImageStim({
    win : psychoJS.window,
    name : 'request_fullscreen', units : undefined, 
    image : 'img/request_fullscreen.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 1],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  // Initialize components for Routine "slideshow_trial"
  slideshow_trialClock = new util.Clock();
  slideshow_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  slideshow_mouse.mouseClock = new util.Clock();
  slideshow_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'slideshow_image', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.6, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  slideshow_next = new visual.Rect ({
    win: psychoJS.window, name: 'slideshow_next', 
    width: [1, 0.5][0], height: [1, 0.5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 0.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  slideshow_previous = new visual.Rect ({
    win: psychoJS.window, name: 'slideshow_previous', 
    width: [1, 0.5][0], height: [1, 0.5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 0.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  // Setup a layout
  slideshowLayout = Layout.init(psychoJS,  [
    {stim: slideshow_previous, anchor: Layout.midLeft, pos: [0, -0.25], width: 0.3},  
    {stim: slideshow_next, anchor: Layout.midRight, pos: [0, -0.25], width: 0.3},
    {stim: slideshow_image, anchor: Layout.top, pos: [0, -0.25]}
  ]);
  // Setup a slideshow
  slideshow = Slideshow.init(
      [
        "img/slide_0_" + deviceType + ".png", 
        "img/slide_1_" + deviceType + ".png",
        "img/slide_2.png", 
        "img/slide_3.png",
        "img/slide_4.png", 
        "img/slide_5.png",
        "img/slide_6_" + deviceType + ".png", 
        "img/slide_7_" + deviceType + ".jpg",
        "img/slide_8.png", 
        "img/slide_9.png", 
        "img/slide_10.png"
      ], 
      slideshow_image,
      slideshow_previous
  );
  // Have we drawn the slideshow graphics?
  slideshowReady = false;
  slideshow_keyboard = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pre_block_trial"
  pre_block_trialClock = new util.Clock();
  // Initialize components for Routine "flanker_trial"
  flanker_trialClock = new util.Clock();
  flanker_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  flanker_mouse.mouseClock = new util.Clock();
  flanker_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'flanker_image', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.6, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  flanker_left = new visual.Rect ({
    win: psychoJS.window, name: 'flanker_left', 
    width: [1, 0.5][0], height: [1, 0.5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 0.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  flanker_right = new visual.Rect ({
    win: psychoJS.window, name: 'flanker_right', 
    width: [1, 0.5][0], height: [1, 0.5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 0.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  flanker_fixation = new visual.ImageStim({
    win : psychoJS.window,
    name : 'flanker_fixation', units : undefined, 
    image : 'img/fixation.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.6, 0.5],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  flankerLayout = Layout.init(psychoJS, [
    {stim: flanker_left, anchor: Layout.midLeft, pos: [0, -0.25], width: 0.3},  
    {stim: flanker_right, anchor: Layout.midRight, pos: [0, -0.25], width: 0.3},
    {stim: flanker_image, anchor: Layout.top, pos: [0, -0.25]},
    {stim: flanker_fixation, anchor: Layout.top, pos: [0, -0.25]}
  ]);
  
  flanker_keyboard = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "feedback_trial"
  feedback_trialClock = new util.Clock();
  feedback_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  feedback_mouse.mouseClock = new util.Clock();
  feedback_image1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'feedback_image1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.6, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  feedback_image2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'feedback_image2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.6, 0.5],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  feedback_keyboard = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "post_block_trial"
  post_block_trialClock = new util.Clock();
  post_block_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  post_block_mouse.mouseClock = new util.Clock();
  post_block_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'post_block_image', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.6, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  post_block_keyboard = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var load_modules_trialComponents;
function load_modules_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'load_modules_trial'-------
    t = 0;
    load_modules_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    load_modules_trialComponents = [];
    
    for (const thisComponent of load_modules_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function load_modules_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'load_modules_trial'-------
    // get current time
    t = load_modules_trialClock.getTime();
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
    for (const thisComponent of load_modules_trialComponents)
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


function load_modules_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'load_modules_trial'-------
    for (const thisComponent of load_modules_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "load_modules_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var preparations;
var currentLoop;
function preparationsLoopBegin(preparationsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    preparations = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1000, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'preparations'
    });
    psychoJS.experiment.addLoop(preparations); // add the loop to the experiment
    currentLoop = preparations;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisPreparation of preparations) {
      const snapshot = preparations.getSnapshot();
      preparationsLoopScheduler.add(importConditions(snapshot));
      preparationsLoopScheduler.add(prepare_trialRoutineBegin(snapshot));
      preparationsLoopScheduler.add(prepare_trialRoutineEachFrame());
      preparationsLoopScheduler.add(prepare_trialRoutineEnd());
      preparationsLoopScheduler.add(endLoopIteration(preparationsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function preparationsLoopEnd() {
  psychoJS.experiment.removeLoop(preparations);

  return Scheduler.Event.NEXT;
}


var slides;
function slidesLoopBegin(slidesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    slides = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1000, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'slides'
    });
    psychoJS.experiment.addLoop(slides); // add the loop to the experiment
    currentLoop = slides;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisSlide of slides) {
      const snapshot = slides.getSnapshot();
      slidesLoopScheduler.add(importConditions(snapshot));
      slidesLoopScheduler.add(slideshow_trialRoutineBegin(snapshot));
      slidesLoopScheduler.add(slideshow_trialRoutineEachFrame());
      slidesLoopScheduler.add(slideshow_trialRoutineEnd());
      slidesLoopScheduler.add(endLoopIteration(slidesLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function slidesLoopEnd() {
  psychoJS.experiment.removeLoop(slides);

  return Scheduler.Event.NEXT;
}


var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisBlock of blocks) {
      const snapshot = blocks.getSnapshot();
      blocksLoopScheduler.add(importConditions(snapshot));
      blocksLoopScheduler.add(pre_block_trialRoutineBegin(snapshot));
      blocksLoopScheduler.add(pre_block_trialRoutineEachFrame());
      blocksLoopScheduler.add(pre_block_trialRoutineEnd());
      const trialsLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      blocksLoopScheduler.add(trialsLoopScheduler);
      blocksLoopScheduler.add(trialsLoopEnd);
      blocksLoopScheduler.add(post_block_trialRoutineBegin(snapshot));
      blocksLoopScheduler.add(post_block_trialRoutineEachFrame());
      blocksLoopScheduler.add(post_block_trialRoutineEnd());
      blocksLoopScheduler.add(endLoopIteration(blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nReps, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'sheet/conditions.xlsx',
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      const snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(flanker_trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(flanker_trialRoutineEachFrame());
      trialsLoopScheduler.add(flanker_trialRoutineEnd());
      trialsLoopScheduler.add(feedback_trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(feedback_trialRoutineEachFrame());
      trialsLoopScheduler.add(feedback_trialRoutineEnd());
      trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);

  return Scheduler.Event.NEXT;
}


async function blocksLoopEnd() {
  psychoJS.experiment.removeLoop(blocks);

  return Scheduler.Event.NEXT;
}


var gotValidClick;
var prepare_trialComponents;
function prepare_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'prepare_trial'-------
    t = 0;
    prepare_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the prepare_mouse
    prepare_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Turn off all screen messages
    quit.opacity = 0;
    go_fullscreen.opacity = 0;
    request_landscape.opacity = 0;
    aspect_ratio.opacity = 0;
    request_fullscreen.opacity = 0;
    
    document.body.setAttribute('data-report', 'prepare_trial');
    // keep track of which components have finished
    prepare_trialComponents = [];
    prepare_trialComponents.push(prepare_mouse);
    prepare_trialComponents.push(quit);
    prepare_trialComponents.push(go_fullscreen);
    prepare_trialComponents.push(request_landscape);
    prepare_trialComponents.push(aspect_ratio);
    prepare_trialComponents.push(request_fullscreen);
    
    for (const thisComponent of prepare_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
var preparation_phase;
function prepare_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'prepare_trial'-------
    // get current time
    t = prepare_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // *prepare_mouse* updates
    if (t >= 0.0 && prepare_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      prepare_mouse.tStart = t;  // (not accounting for frame time here)
      prepare_mouse.frameNStart = frameN;  // exact frame index
      
      prepare_mouse.status = PsychoJS.Status.STARTED;
      prepare_mouse.mouseClock.reset();
      prevButtonState = prepare_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (prepare_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = prepare_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [quit, go_fullscreen]) {
            if (obj.contains(prepare_mouse)) {
              gotValidClick = true;
              prepare_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *quit* updates
    if (t >= 0.5 && quit.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      quit.tStart = t;  // (not accounting for frame time here)
      quit.frameNStart = frameN;  // exact frame index
      
      quit.setAutoDraw(true);
    }

    
    // *go_fullscreen* updates
    if (t >= 0.5 && go_fullscreen.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      go_fullscreen.tStart = t;  // (not accounting for frame time here)
      go_fullscreen.frameNStart = frameN;  // exact frame index
      
      go_fullscreen.setAutoDraw(true);
    }

    
    // *request_landscape* updates
    if (t >= 0.5 && request_landscape.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      request_landscape.tStart = t;  // (not accounting for frame time here)
      request_landscape.frameNStart = frameN;  // exact frame index
      
      request_landscape.setAutoDraw(true);
    }

    
    // *aspect_ratio* updates
    if (t >= 0.5 && aspect_ratio.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      aspect_ratio.tStart = t;  // (not accounting for frame time here)
      aspect_ratio.frameNStart = frameN;  // exact frame index
      
      aspect_ratio.setAutoDraw(true);
    }

    
    // *request_fullscreen* updates
    if (t >= 0.5 && request_fullscreen.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      request_fullscreen.tStart = t;  // (not accounting for frame time here)
      request_fullscreen.frameNStart = frameN;  // exact frame index
      
      request_fullscreen.setAutoDraw(true);
    }

    // Turn off all screen messages
    quit.opacity = 0;
    go_fullscreen.opacity = 0;
    request_landscape.opacity = 0;
    aspect_ratio.opacity = 0;
    request_fullscreen.opacity = 0;
    
    // Check landscape
    if (!ScreenMetrics.isLandscape()) {
        request_landscape.opacity = 1;
        preparation_phase = 'landscape';
    } else if (ScreenMetrics.getScreenAspectRatio() < 1.6) {
        quit.opacity = 1;
        aspect_ratio.opacity = 1;
        preparation_phase = 'aspect_ratio';
    } else if (!ScreenMetrics.isFullscreen()) {
        quit.opacity = 1;
        go_fullscreen.opacity = 1;
        request_fullscreen.opacity = 1;
        preparation_phase = 'fullscreen';
    } else {
        preparation_phase = 'ready';
        continueRoutine = false;
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
    for (const thisComponent of prepare_trialComponents)
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
function prepare_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'prepare_trial'-------
    for (const thisComponent of prepare_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = prepare_mouse.getPos();
    _mouseButtons = prepare_mouse.getPressed();
    psychoJS.experiment.addData('prepare_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('prepare_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('prepare_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('prepare_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('prepare_mouse.rightButton', _mouseButtons[2]);
    if (prepare_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('prepare_mouse.clicked_name', prepare_mouse.clicked_name[0]);}
    // Store phase and screen state 
    psychoJS.experiment.addData('phase', preparation_phase);
    psychoJS.experiment.addData('landscape', ScreenMetrics.isLandscape());
    psychoJS.experiment.addData('fullscreen', ScreenMetrics.isFullscreen());
    
    // quit; write data (current phase), then quit task
    if (
         (preparation_phase === 'aspect_ratio' || preparation_phase === 'fullscreen') 
      && prepare_mouse.clicked_name[0] === 'quit'
    ) {
        psychoJS.experiment.nextEntry();
        quitPsychoJS('The [quit] button was pressed. Goodbye!', false)
    }
    
    // fullscreen; request fullscreen
    if (
         preparation_phase === 'fullscreen'
      && prepare_mouse.clicked_name[0] === 'go_fullscreen'
    ) {
        psychoJS.window.adjustScreenSize()
    }
    
    // we're ready; end loop
    if (preparation_phase === 'ready') {
        preparations.finished = true;
    }
    
    // the Routine "prepare_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _slideshow_keyboard_allKeys;
var slideshow_trialComponents;
function slideshow_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'slideshow_trial'-------
    t = 0;
    slideshow_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the slideshow_mouse
    // current position of the mouse:
    slideshow_mouse.x = [];
    slideshow_mouse.y = [];
    slideshow_mouse.leftButton = [];
    slideshow_mouse.midButton = [];
    slideshow_mouse.rightButton = [];
    slideshow_mouse.time = [];
    slideshow_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    slideshow_mouse.mouseClock.reset();
    // Update the adaptive layout (if needed)
    slideshowLayout();
    slideshow.draw();
    document.body.setAttribute('data-report', 'slideshow_trial');
    // If we're running on keyboard, make slideshow_next and slideshow_previous transparent
    if (deviceType === 'kb') {
        slideshow_next.opacity = 0;
        slideshow_previous.opacity = 0;
    }
    slideshow_keyboard.keys = undefined;
    slideshow_keyboard.rt = undefined;
    _slideshow_keyboard_allKeys = [];
    // keep track of which components have finished
    slideshow_trialComponents = [];
    slideshow_trialComponents.push(slideshow_mouse);
    slideshow_trialComponents.push(slideshow_image);
    slideshow_trialComponents.push(slideshow_next);
    slideshow_trialComponents.push(slideshow_previous);
    slideshow_trialComponents.push(slideshow_keyboard);
    
    for (const thisComponent of slideshow_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var layoutReady;
function slideshow_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'slideshow_trial'-------
    // get current time
    t = slideshow_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // *slideshow_mouse* updates
    if (t >= 0.0 && slideshow_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slideshow_mouse.tStart = t;  // (not accounting for frame time here)
      slideshow_mouse.frameNStart = frameN;  // exact frame index
      
      slideshow_mouse.status = PsychoJS.Status.STARTED;
      prevButtonState = slideshow_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (slideshow_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = slideshow_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = slideshow_mouse.getPos();
          slideshow_mouse.x.push(_mouseXYs[0]);
          slideshow_mouse.y.push(_mouseXYs[1]);
          slideshow_mouse.leftButton.push(_mouseButtons[0]);
          slideshow_mouse.midButton.push(_mouseButtons[1]);
          slideshow_mouse.rightButton.push(_mouseButtons[2]);
          slideshow_mouse.time.push(slideshow_mouse.mouseClock.getTime());
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [slideshow_previous, slideshow_next]) {
            if (obj.contains(slideshow_mouse)) {
              gotValidClick = true;
              slideshow_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *slideshow_image* updates
    if (t >= 0.0 && slideshow_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slideshow_image.tStart = t;  // (not accounting for frame time here)
      slideshow_image.frameNStart = frameN;  // exact frame index
      
      slideshow_image.setAutoDraw(true);
    }

    
    // *slideshow_next* updates
    if (t >= 0.0 && slideshow_next.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slideshow_next.tStart = t;  // (not accounting for frame time here)
      slideshow_next.frameNStart = frameN;  // exact frame index
      
      slideshow_next.setAutoDraw(true);
    }

    
    // *slideshow_previous* updates
    if (t >= 0.0 && slideshow_previous.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slideshow_previous.tStart = t;  // (not accounting for frame time here)
      slideshow_previous.frameNStart = frameN;  // exact frame index
      
      slideshow_previous.setAutoDraw(true);
    }

    // Update the adaptive layout (if needed)
    slideshowLayout();
    // Layout graphics weren't ready yet, but now they are;
    // inform any wdio tests where the left and right buttons are
    if (!layoutReady) {
      document.body.setAttribute('data-info', JSON.stringify({
        'left_button': slideshow_previous.pos,
        'right_button': slideshow_next.pos
      }));
      layoutReady = true;
    }
    
    // *slideshow_keyboard* updates
    if (t >= 0.0 && slideshow_keyboard.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slideshow_keyboard.tStart = t;  // (not accounting for frame time here)
      slideshow_keyboard.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { slideshow_keyboard.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { slideshow_keyboard.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { slideshow_keyboard.clearEvents(); });
    }

    if (slideshow_keyboard.status === PsychoJS.Status.STARTED) {
      let theseKeys = slideshow_keyboard.getKeys({keyList: ['s', 'l'], waitRelease: false});
      _slideshow_keyboard_allKeys = _slideshow_keyboard_allKeys.concat(theseKeys);
      if (_slideshow_keyboard_allKeys.length > 0) {
        slideshow_keyboard.keys = _slideshow_keyboard_allKeys[_slideshow_keyboard_allKeys.length - 1].name;  // just the last key pressed
        slideshow_keyboard.rt = _slideshow_keyboard_allKeys[_slideshow_keyboard_allKeys.length - 1].rt;
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
    for (const thisComponent of slideshow_trialComponents)
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


function slideshow_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'slideshow_trial'-------
    for (const thisComponent of slideshow_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    if (slideshow_mouse.x) {  psychoJS.experiment.addData('slideshow_mouse.x', slideshow_mouse.x[0])};
    if (slideshow_mouse.y) {  psychoJS.experiment.addData('slideshow_mouse.y', slideshow_mouse.y[0])};
    if (slideshow_mouse.leftButton) {  psychoJS.experiment.addData('slideshow_mouse.leftButton', slideshow_mouse.leftButton[0])};
    if (slideshow_mouse.midButton) {  psychoJS.experiment.addData('slideshow_mouse.midButton', slideshow_mouse.midButton[0])};
    if (slideshow_mouse.rightButton) {  psychoJS.experiment.addData('slideshow_mouse.rightButton', slideshow_mouse.rightButton[0])};
    if (slideshow_mouse.time) {  psychoJS.experiment.addData('slideshow_mouse.time', slideshow_mouse.time[0])};
    if (slideshow_mouse.clicked_name) {  psychoJS.experiment.addData('slideshow_mouse.clicked_name', slideshow_mouse.clicked_name[0])};
    
    // Add current slide index and screen state
    psychoJS.experiment.addData('phase', 'slide_' + slideshow.currentSlide());
    psychoJS.experiment.addData('landscape', ScreenMetrics.isLandscape());
    psychoJS.experiment.addData('fullscreen', ScreenMetrics.isFullscreen());
    // Update slideshow
    if (deviceType === 'sm') {
        slideshow.update(slideshow_mouse.clicked_name[0]);
    } else if (deviceType === 'kb') {
        slideshow.update({
            's': 'slideshow_previous',
            'l': 'slideshow_next',
        }[slideshow_keyboard.keys]);
    }
    
    // Finish loop if we're done
    if (slideshow.done()) {
        // Update the slideshow
        slides.finished = true;
    }
    
    psychoJS.experiment.addData('slideshow_keyboard.keys', slideshow_keyboard.keys);
    if (typeof slideshow_keyboard.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('slideshow_keyboard.rt', slideshow_keyboard.rt);
        routineTimer.reset();
        }
    
    slideshow_keyboard.stop();
    // the Routine "slideshow_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var rehearsing;
var nReps;
var pre_block_trialComponents;
function pre_block_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'pre_block_trial'-------
    t = 0;
    pre_block_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if (snapshot.thisN === 0) {
      rehearsing = true;
      nReps = 1;
    } else {
      rehearsing = false;
      nReps = 2;
    }
    
    
    // keep track of which components have finished
    pre_block_trialComponents = [];
    
    for (const thisComponent of pre_block_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function pre_block_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'pre_block_trial'-------
    // get current time
    t = pre_block_trialClock.getTime();
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
    for (const thisComponent of pre_block_trialComponents)
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


function pre_block_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'pre_block_trial'-------
    for (const thisComponent of pre_block_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "pre_block_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _flanker_keyboard_allKeys;
var flanker_trialComponents;
function flanker_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'flanker_trial'-------
    t = 0;
    flanker_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the flanker_mouse
    // current position of the mouse:
    flanker_mouse.x = [];
    flanker_mouse.y = [];
    flanker_mouse.leftButton = [];
    flanker_mouse.midButton = [];
    flanker_mouse.rightButton = [];
    flanker_mouse.time = [];
    flanker_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    flanker_mouse.mouseClock.reset();
    flanker_image.setImage(stimulus);
    // Setup a layout
    document.body.setAttribute('data-report', 'flanker_trial');
    document.body.setAttribute('data-info', correct_response);
    flankerLayout();
    // If we're running on keyboard, make slideshow_next and slideshow_previous transparent
    if (deviceType === 'kb') {
        flanker_left.opacity = 0;
        flanker_right.opacity = 0;
    }
    flanker_keyboard.keys = undefined;
    flanker_keyboard.rt = undefined;
    _flanker_keyboard_allKeys = [];
    // keep track of which components have finished
    flanker_trialComponents = [];
    flanker_trialComponents.push(flanker_mouse);
    flanker_trialComponents.push(flanker_image);
    flanker_trialComponents.push(flanker_left);
    flanker_trialComponents.push(flanker_right);
    flanker_trialComponents.push(flanker_fixation);
    flanker_trialComponents.push(flanker_keyboard);
    
    for (const thisComponent of flanker_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function flanker_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'flanker_trial'-------
    // get current time
    t = flanker_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // *flanker_mouse* updates
    if (t >= 0.0 && flanker_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      flanker_mouse.tStart = t;  // (not accounting for frame time here)
      flanker_mouse.frameNStart = frameN;  // exact frame index
      
      flanker_mouse.status = PsychoJS.Status.STARTED;
      prevButtonState = flanker_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (flanker_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = flanker_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = flanker_mouse.getPos();
          flanker_mouse.x.push(_mouseXYs[0]);
          flanker_mouse.y.push(_mouseXYs[1]);
          flanker_mouse.leftButton.push(_mouseButtons[0]);
          flanker_mouse.midButton.push(_mouseButtons[1]);
          flanker_mouse.rightButton.push(_mouseButtons[2]);
          flanker_mouse.time.push(flanker_mouse.mouseClock.getTime());
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [flanker_left, flanker_right]) {
            if (obj.contains(flanker_mouse)) {
              gotValidClick = true;
              flanker_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *flanker_image* updates
    if (t >= soa && flanker_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      flanker_image.tStart = t;  // (not accounting for frame time here)
      flanker_image.frameNStart = frameN;  // exact frame index
      
      flanker_image.setAutoDraw(true);
    }

    
    // *flanker_left* updates
    if (t >= 0.0 && flanker_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      flanker_left.tStart = t;  // (not accounting for frame time here)
      flanker_left.frameNStart = frameN;  // exact frame index
      
      flanker_left.setAutoDraw(true);
    }

    
    // *flanker_right* updates
    if (t >= 0.0 && flanker_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      flanker_right.tStart = t;  // (not accounting for frame time here)
      flanker_right.frameNStart = frameN;  // exact frame index
      
      flanker_right.setAutoDraw(true);
    }

    
    // *flanker_fixation* updates
    if (t >= 0.0 && flanker_fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      flanker_fixation.tStart = t;  // (not accounting for frame time here)
      flanker_fixation.frameNStart = frameN;  // exact frame index
      
      flanker_fixation.setAutoDraw(true);
    }

    flankerLayout();
    
    
    // *flanker_keyboard* updates
    if (t >= 0.0 && flanker_keyboard.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      flanker_keyboard.tStart = t;  // (not accounting for frame time here)
      flanker_keyboard.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { flanker_keyboard.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { flanker_keyboard.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { flanker_keyboard.clearEvents(); });
    }

    if (flanker_keyboard.status === PsychoJS.Status.STARTED) {
      let theseKeys = flanker_keyboard.getKeys({keyList: ['s', 'l'], waitRelease: false});
      _flanker_keyboard_allKeys = _flanker_keyboard_allKeys.concat(theseKeys);
      if (_flanker_keyboard_allKeys.length > 0) {
        flanker_keyboard.keys = _flanker_keyboard_allKeys[_flanker_keyboard_allKeys.length - 1].name;  // just the last key pressed
        flanker_keyboard.rt = _flanker_keyboard_allKeys[_flanker_keyboard_allKeys.length - 1].rt;
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
    for (const thisComponent of flanker_trialComponents)
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


function flanker_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'flanker_trial'-------
    for (const thisComponent of flanker_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    if (flanker_mouse.x) {  psychoJS.experiment.addData('flanker_mouse.x', flanker_mouse.x[0])};
    if (flanker_mouse.y) {  psychoJS.experiment.addData('flanker_mouse.y', flanker_mouse.y[0])};
    if (flanker_mouse.leftButton) {  psychoJS.experiment.addData('flanker_mouse.leftButton', flanker_mouse.leftButton[0])};
    if (flanker_mouse.midButton) {  psychoJS.experiment.addData('flanker_mouse.midButton', flanker_mouse.midButton[0])};
    if (flanker_mouse.rightButton) {  psychoJS.experiment.addData('flanker_mouse.rightButton', flanker_mouse.rightButton[0])};
    if (flanker_mouse.time) {  psychoJS.experiment.addData('flanker_mouse.time', flanker_mouse.time[0])};
    if (flanker_mouse.clicked_name) {  psychoJS.experiment.addData('flanker_mouse.clicked_name', flanker_mouse.clicked_name[0])};
    
    psychoJS.experiment.addData('flanker_keyboard.keys', flanker_keyboard.keys);
    if (typeof flanker_keyboard.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('flanker_keyboard.rt', flanker_keyboard.rt);
        routineTimer.reset();
        }
    
    flanker_keyboard.stop();
    // the Routine "flanker_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var response;
var rt;
var feedback1;
var feedback2;
var feedback_mouse_start;
var _feedback_keyboard_allKeys;
var feedback_trialComponents;
function feedback_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'feedback_trial'-------
    t = 0;
    feedback_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Setup a layout
    window.layout = Layout.init(psychoJS, [
      {stim: feedback_image1, anchor: Layout.top, pos: [0, -0.25]},
      {stim: feedback_image2, anchor: Layout.top, pos: [0, -0.25]},
    ]);
    // Determine feedback
    let response, rt;
    if (deviceType === 'sm') {
        response = flanker_mouse.clicked_name[0];
        rt = flanker_mouse.time;
    } else if (deviceType === 'kb') {
        response = {
            's': 'flanker_left',
            'l': 'flanker_right'
        }[flanker_keyboard.keys];
        rt = flanker_keyboard.time;
    }
    if (rt < soa) {
      feedback1 = 'img/fb_too_fast1_' + deviceType + '.png';
      feedback2 = 'img/fb_too_fast2_' + deviceType + '.png';
      feedback_mouse_start = 1;
    } else if (response !== correct_response) {
      feedback1 = 'img/fb_incorrect1_' + deviceType + '.png';
      feedback2 = 'img/fb_incorrect2_' + deviceType + '.png';
      feedback_response_start = 1;
    } else {
      if (rehearsing) {
        feedback1 = 'img/fb_correct_' + deviceType + '.png';
        feedback2 = 'img/fb_correct_' + deviceType + '.png';
        feedback_response_start  = 0;
      } else {
        feedback1 = 'img/fb_none.png';
        feedback2 = 'img/fb_none.png';
        feedback_response_start  = 0;
      }
    }
    document.body.setAttribute('data-report', 'feedback_trial');
    // setup some python lists for storing info about the feedback_mouse
    feedback_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    feedback_image1.setImage(feedback1);
    feedback_image2.setImage(feedback2);
    feedback_keyboard.keys = undefined;
    feedback_keyboard.rt = undefined;
    _feedback_keyboard_allKeys = [];
    // keep track of which components have finished
    feedback_trialComponents = [];
    feedback_trialComponents.push(feedback_mouse);
    feedback_trialComponents.push(feedback_image1);
    feedback_trialComponents.push(feedback_image2);
    feedback_trialComponents.push(feedback_keyboard);
    
    for (const thisComponent of feedback_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function feedback_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'feedback_trial'-------
    // get current time
    t = feedback_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (feedback1 === 'img/fb_none.png') {
      continueRoutine = false;
    } else {
      window.layout();
    }
    
    // *feedback_mouse* updates
    if (t >= feedback_response_start && feedback_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_mouse.tStart = t;  // (not accounting for frame time here)
      feedback_mouse.frameNStart = frameN;  // exact frame index
      
      feedback_mouse.status = PsychoJS.Status.STARTED;
      feedback_mouse.mouseClock.reset();
      prevButtonState = feedback_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (feedback_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = feedback_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [flanker_left, flanker_right]) {
            if (obj.contains(feedback_mouse)) {
              gotValidClick = true;
              feedback_mouse.clicked_name.push(obj.name)
            }
          }
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    
    // *feedback_image1* updates
    if (t >= 0.0 && feedback_image1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_image1.tStart = t;  // (not accounting for frame time here)
      feedback_image1.frameNStart = frameN;  // exact frame index
      
      feedback_image1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_image1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_image1.setAutoDraw(false);
    }
    
    // *feedback_image2* updates
    if (t >= 0.8 && feedback_image2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_image2.tStart = t;  // (not accounting for frame time here)
      feedback_image2.frameNStart = frameN;  // exact frame index
      
      feedback_image2.setAutoDraw(true);
    }

    
    // *feedback_keyboard* updates
    if (t >= feedback_response_start && feedback_keyboard.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_keyboard.tStart = t;  // (not accounting for frame time here)
      feedback_keyboard.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { feedback_keyboard.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { feedback_keyboard.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { feedback_keyboard.clearEvents(); });
    }

    if (feedback_keyboard.status === PsychoJS.Status.STARTED) {
      let theseKeys = feedback_keyboard.getKeys({keyList: ['s', 'l'], waitRelease: false});
      _feedback_keyboard_allKeys = _feedback_keyboard_allKeys.concat(theseKeys);
      if (_feedback_keyboard_allKeys.length > 0) {
        feedback_keyboard.keys = _feedback_keyboard_allKeys[_feedback_keyboard_allKeys.length - 1].name;  // just the last key pressed
        feedback_keyboard.rt = _feedback_keyboard_allKeys[_feedback_keyboard_allKeys.length - 1].rt;
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
    for (const thisComponent of feedback_trialComponents)
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


function feedback_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'feedback_trial'-------
    for (const thisComponent of feedback_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('phase', 'task');
    psychoJS.experiment.addData('landscape', ScreenMetrics.isLandscape());
    psychoJS.experiment.addData('fullscreen', ScreenMetrics.isFullscreen());
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = feedback_mouse.getPos();
    _mouseButtons = feedback_mouse.getPressed();
    psychoJS.experiment.addData('feedback_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('feedback_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('feedback_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('feedback_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('feedback_mouse.rightButton', _mouseButtons[2]);
    if (feedback_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('feedback_mouse.clicked_name', feedback_mouse.clicked_name[0]);}
    psychoJS.experiment.addData('feedback_keyboard.keys', feedback_keyboard.keys);
    if (typeof feedback_keyboard.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('feedback_keyboard.rt', feedback_keyboard.rt);
        routineTimer.reset();
        }
    
    feedback_keyboard.stop();
    // the Routine "feedback_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var post_block;
var _post_block_keyboard_allKeys;
var post_block_trialComponents;
function post_block_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'post_block_trial'-------
    t = 0;
    post_block_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Setup a layout
    window.layout = Layout.init(psychoJS, [
      {stim: post_block_image, anchor: Layout.top, pos: [0, -0.25]},
    ]);
    // Determine post-block slide
    if (snapshot.thisN === 0) {
      post_block = 'img/post_block_rehearsal_' + deviceType + '.png';
    } else if (snapshot.thisN === 1) {
        post_block = 'img/post_block_halfway_' + deviceType + '.png';
    } else {
        post_block = 'img/post_block_main_' + deviceType + '.png';
    }
    // setup some python lists for storing info about the post_block_mouse
    post_block_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    post_block_image.setImage(post_block);
    post_block_keyboard.keys = undefined;
    post_block_keyboard.rt = undefined;
    _post_block_keyboard_allKeys = [];
    // keep track of which components have finished
    post_block_trialComponents = [];
    post_block_trialComponents.push(post_block_mouse);
    post_block_trialComponents.push(post_block_image);
    post_block_trialComponents.push(post_block_keyboard);
    
    for (const thisComponent of post_block_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function post_block_trialRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'post_block_trial'-------
    // get current time
    t = post_block_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    window.layout();
    
    // *post_block_mouse* updates
    if (t >= 1 && post_block_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      post_block_mouse.tStart = t;  // (not accounting for frame time here)
      post_block_mouse.frameNStart = frameN;  // exact frame index
      
      post_block_mouse.status = PsychoJS.Status.STARTED;
      post_block_mouse.mouseClock.reset();
      prevButtonState = post_block_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (post_block_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = post_block_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [flanker_left, flanker_right]) {
            if (obj.contains(post_block_mouse)) {
              gotValidClick = true;
              post_block_mouse.clicked_name.push(obj.name)
            }
          }
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    
    // *post_block_image* updates
    if (t >= 1.0 && post_block_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      post_block_image.tStart = t;  // (not accounting for frame time here)
      post_block_image.frameNStart = frameN;  // exact frame index
      
      post_block_image.setAutoDraw(true);
    }

    
    // *post_block_keyboard* updates
    if (t >= 1 && post_block_keyboard.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      post_block_keyboard.tStart = t;  // (not accounting for frame time here)
      post_block_keyboard.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { post_block_keyboard.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { post_block_keyboard.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { post_block_keyboard.clearEvents(); });
    }

    if (post_block_keyboard.status === PsychoJS.Status.STARTED) {
      let theseKeys = post_block_keyboard.getKeys({keyList: ['s', 'l'], waitRelease: false});
      _post_block_keyboard_allKeys = _post_block_keyboard_allKeys.concat(theseKeys);
      if (_post_block_keyboard_allKeys.length > 0) {
        post_block_keyboard.keys = _post_block_keyboard_allKeys[_post_block_keyboard_allKeys.length - 1].name;  // just the last key pressed
        post_block_keyboard.rt = _post_block_keyboard_allKeys[_post_block_keyboard_allKeys.length - 1].rt;
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
    for (const thisComponent of post_block_trialComponents)
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


function post_block_trialRoutineEnd() {
  return async function () {
    //------Ending Routine 'post_block_trial'-------
    for (const thisComponent of post_block_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = post_block_mouse.getPos();
    _mouseButtons = post_block_mouse.getPressed();
    psychoJS.experiment.addData('post_block_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('post_block_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('post_block_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('post_block_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('post_block_mouse.rightButton', _mouseButtons[2]);
    if (post_block_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('post_block_mouse.clicked_name', post_block_mouse.clicked_name[0]);}
    psychoJS.experiment.addData('post_block_keyboard.keys', post_block_keyboard.keys);
    if (typeof post_block_keyboard.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('post_block_keyboard.rt', post_block_keyboard.rt);
        routineTimer.reset();
        }
    
    post_block_keyboard.stop();
    // the Routine "post_block_trial" was not non-slip safe, so reset the non-slip timer
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
