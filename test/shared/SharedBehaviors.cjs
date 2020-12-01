// experimentUrls = {
//   e2e_calibration: 'https://run.pavlovia.org/tpronk/e2e_calibration/',
//   e2e_code: 'https://run.pavlovia.org/tpronk/e2e_code/html/',
//   e2e_conditions: 'https://run.pavlovia.org/tpronk/e2e_conditions/html/',
//   e2e_img: 'https://run.pavlovia.org/thewhodidthis/e2e_img/html/',
//   e2e_polygon: 'https://run.pavlovia.org/tpronk/e2e_polygon/html/',
//   e2e_sound: 'https://run.pavlovia.org/tpronk/e2e_sound/html/',
//   e2e_text: 'https://run.pavlovia.org/tpronk/e2e_text/html/',
//   e2e_textbox: 'https://run.pavlovia.org/tpronk/e2e_textbox/html/',
//   e2e_video: 'https://run.pavlovia.org/tpronk/e2e_video/',
//   e2e_combined: 'https://run.pavlovia.org/tpronk/e2e_combined/html/',
//   int_gonogo: 'https://run.pavlovia.org/tpronk/int_gonogo/',
// };
getExperimentUrl = (experiment) => {
  let branch = browser.getBranch();
  if (branch === 'pavlovia') {
    return 'https://run.pavlovia.org/tpronk/' + experiment;
  } else {
    return 'https://staging.psychopy.org/app/' + branch + '/' + experiment;
  }
};


/**
 * Goes through the Pavlovia loading procedure that precedes a PsychoJS experiment:
 *
 * @function
 * @public
 * @param {boolean} waitForCanvas - Wait for the canvas to exist
 * @param {number} resourceTimeout - Maximum number of milliseconds to wait for loading of resources
*/
performPavloviaPrelude = (waitForCanvas = true, resourceTimeout = 20000) => {
  // Wait for root element and OK button  
  $('#root').waitForExist({timeout: 10000, timeoutMsg: 'root not found'});
  $('#buttonOk').waitForExist({timeout: 10000, timeoutMsg: 'buttonOK not found'});
  // Wait until resource have loaded, then click OK
  $('#buttonOk').waitForEnabled({timeout: resourceTimeout, timeoutMsg: 'buttonOK not enabled'});
  $('#buttonOk').click();    
  // Wait for canvas, then wait 3 seconds for any status bars to disappear after full-screen is enabled
  if (waitForCanvas) {
    $('<canvas />').waitForExist({timeoutMsg: 'canvas not found'});
  }
  browser.pause(3000);
};

/**
 * Queries viewport resolutions via in-browser JS and provides functions that roughly transform
 * normalized X and Y coordinates (using the top-left of the screen as origin) to coordinates that 
 * can be used in Webdriver/Appium's Action API using the viewport as origin. Properties returned:
 * screen.width, screen.height, window.innerWidth, window.innerHeight, transformX, transformY
 *
 * @function
 * @public
 * @returns {Object.Number} viewport resolutions
 */
getViewportResolutions = () => {
  let viewport = browser.execute(function() {
    return {
      'window.innerWidth': window.innerWidth,
      'window.innerHeight': window.innerHeight,
      'window.devicePixelRatio': window.devicePixelRatio,
      'screen.width': screen.width,
      'screen.height': screen.height
    };
  });        
  // On iPhones, use screen.width and screen.height for calibration taps, otherwise use windows.innerWidth and windows.innerHeight
  let width, height;
  if (browser.getDeviceName() !== undefined && browser.getDeviceName().startsWith('iPhone')) {
    width = viewport['screen.width'];
    height = viewport['screen.height']
  } else {
    width = viewport['window.innerWidth'];
    height = viewport['window.innerHeight'];
  }  
  viewport.transformX = function(x) {
    return x * width;
  }
  viewport.transformY = function(y) {
    return y * height;
  }
  return viewport;
};

/**
 * Taps/clicks at a given x and y location via WebDriver/Appium's Action API, given the viewport as origin
 * @function
 * @public
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
tapAtCoordinate = (x, y) => {
  browser.performActions([{
    "type": "pointer",
    "id": "my_pointer",
    "parameters": {"pointerType": browser.getPointerType()},
    "actions": [
      {"type": "pointerMove", "duration": 0, "x": Math.round(x), "y":  Math.round(y), origin: 'viewport'},
      {"type": "pointerDown", "duration": 0, "button": 0},
      {"type": "pause", "duration": 200},
      {"type": "pointerUp", "duration": 0, "button": 0}
    ]
  }]);
};


/**
 * Performs calibration procedure: 
 * <li>obtains viewport resolutions 
 * <li>performs two calibration taps based on rough transformations of [0.25, 0.25] and [0.5, 0.5] yielded by getViewportResolutions()
 * <li>calculates intercept and coefficient for converting canvas coordinates to coordinates that can be used in WebDriver/Appium's Action API, given the viewport as origin.
 * <li>performs a verification tap at transformed [0.25, 0.25] to calculate deviation of transformed coordinates from expected coordinates
 * Returns an object with the following properties
 * <li>viewport; see getViewportResolutions()
 * <li>interceptX, coefX; intercept and coefficient for X coordinates
 * <li>interceptY, coefY; intercept and coefficient for Y coordinates
 * <li>deviationX, deviationY; deviation of transformed coordinated from expected coordinates, in height units
 * @function
 * @public
 * @param {boolean} screenshots - If true, logs screenshots of every calibration step
 * @returns {Object} results of calibration procedure
 */  
performCalibrationProcedure = (screenshots = true) => {
  // Local variables
  let actionX = [], actionY = [], coefX, interceptX, deviationX, transformX;
  let canvasX = [], canvasY = [], coefY, interceptY, deviationY, transformY;
  let viewport;

  // Get viewport resolutions
  viewport = getViewportResolutions();

  // *** First tap
  // Wait for confirmation we're at the first calibration routine
  waitForReport('calibration_0');
  // Perform first calibration tap
  actionX.push(viewport.transformX(0.25));
  actionY.push(viewport.transformY(0.25));
  tapAtCoordinate(actionX[0], actionY[0]);
  // Wait for confirmation we're at the next first calibration routine
  waitForReport('calibration_1');
  // Take a screenshot
  if (screenshots) {
    browser.writeScreenshot('afterc0');
  }
  // Store first canvas coordinates
  canvasX.push($('<body>').getAttribute('data-x'));
  canvasY.push($('<body>').getAttribute('data-y'));

  // *** Second tap
  // Perform second calibration tap
  actionX.push(viewport.transformX(0.5));
  actionY.push(viewport.transformY(0.5));
  tapAtCoordinate(actionX[1], actionY[1]);
  // Wait for confirmation we're at the verification routine
  waitForReport('verification');
  // Take a screenshot
  if (screenshots) {  
    browser.writeScreenshot('afterc1');
  }
  // Store second canvas coordinates  
  canvasX.push($('<body>').getAttribute('data-x'));
  canvasY.push($('<body>').getAttribute('data-y'));

  // *** Calculate transformation from canvas coordinates to action coordinates
  coefX = (actionX[0] - actionX[1]) / (canvasX[0] - canvasX[1]);
  interceptX = actionX[0] - coefX * canvasX[0];
  coefY = (actionY[0] - actionY[1]) / (canvasY[0] - canvasY[1]);
  interceptY = actionY[0] - coefY * canvasY[0];
  transformX = function(x) {
    return interceptX + coefX * x;
  }
  transformY = function(y) {
    return interceptY + coefY * y;
  }

  // *** Verification tap
  // Tap at transformed [0.25, 0.25] coordinates
  tapAtCoordinate(transformX(0.25), transformY(0.25));
  // Wait for confirmation we're at the verification_feedback routine
  waitForReport('verification_feedback');
  // Take a screenshot
  if (screenshots) {  
    browser.writeScreenshot('afterv');
  }
  // Record deviation in canvas coordinates
  deviationX = Number($('<body>').getAttribute('data-x')) - 0.25;
  deviationY = Number($('<body>').getAttribute('data-y')) - 0.25;

  // ** Return results
  return {
    viewport: viewport,
    interceptX: interceptX,
    coefX: coefX,
    interceptY: interceptY,
    coefY: coefY,
    transformX: transformX,
    deviationX: deviationX,
    deviationY: deviationY,
    transformY: transformY
  };
};

/**
 * Wait until body.data-report has a particular value
 * @function
 * @public
 * @param {boolean} value - Value to wait for
 */  
waitForReport = (value) => {
  browser.waitUntil(() => {
    return $('<body>').getAttribute('data-report') === value;
  }, {timeoutMsg: 'data-report not ' + value});
};


/**
 * Performs calibration experiment: 
 * <li>Navigates to calibration experiment
 * <li>performPavloviaPredule()
 * <li>performCalibrationProcedure
 * <li>Adds calibration results to custom log, adds transformation functions to results
 * <li>Finished experiment
 * @function
 * @public
 * @param {boolean} screenshots - If true, logs screenshots of every calibration step
 * @returns {Object} results of calibration procedure
 */  
e2e_calibration = (screenshots) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_calibration'));
  performPavloviaPrelude();

  // Perform calibration procedure, store results
  calibration = performCalibrationProcedure();
  browser.logAdd('window.innerWidth', calibration.viewport['window.innerWidth']);
  browser.logAdd('window.innerHeight', calibration.viewport['window.innerHeight']);
  browser.logAdd('window.devicePixelRatio', calibration.viewport['window.devicePixelRatio']);
  browser.logAdd('screen.width', calibration.viewport['screen.width']);
  browser.logAdd('screen.height', calibration.viewport['screen.height']);
  browser.logAdd('interceptX', calibration.interceptX);
  browser.logAdd('coefX', calibration.coefX);
  browser.logAdd('deviationX', calibration.deviationX);
  browser.logAdd('interceptY', calibration.interceptY);
  browser.logAdd('coefY', calibration.coefY);
  browser.logAdd('deviationY', calibration.deviationY);

  // Finish experiment
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  waitForReport('FINISHED');

  // Return results
  return calibration;
};

/**
 * Performs e2e_code
 * @function
 * @public
 */  
e2e_code = () => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_code'));
  performPavloviaPrelude(waitForCanvas = false);
  // Wait for correct report value
  waitForReport('not_implemented begin_experiment begin_routine each_frame end_routine end_experiment');
};

/**
 * Performs e2e_conditions
 * @function
 * @public
 * @param {Object} calibration - object with properties transformX and transformY
 */  
e2e_conditions = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_conditions'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }
  // Check successive data-report values
  let reportValues = [
    'intro_general',
    'intro_random_csv',
    '0_4',
    '1_2',
    '2_3',
    '3_1',
    'intro_random_xlsx',
    '4_B',
    '5_A',
    '6_A',
    '7_B',
    'intro_random_funky',
    '8_2',
    '9_1',
    '10_1',
    '11_2',
    '12_1',
    '13_2'    
  ];
  for (reportValue of reportValues) {
    waitForReport(reportValue);
    tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  }
  // Check if experiment finishes
  waitForReport("FINISHED");
};

/**
 * Performs e2e_img
 * @function
 * @public
 * @param {boolean} calibration - object with properties transformX and transformY
 */  
e2e_img = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_img'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }
  // Tap past intro screen
  waitForReport('intro_trial');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  // Make screenshots of test1 to test6
  let rms;
  for (let test_i = 1; test_i <= 4; test_i++) {
    testName = 'img' + test_i;      
    // Wait for confirmation we're at the next test routine
    waitForReport(testName);
    // Wait a moment, then take screenshot
    //browser.pause(200);    
    rms = browser.compareScreenshot(testName);
    expect(rms).toBeLessThanOrEqual(50, {message: testName + ' rms > 50'});
    // Next routine
    tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  }
  // Wait for FINISHED
  waitForReport('FINISHED');
};

/**
 * Performs e2e_polygon
 * @function
 * @public
 * @param {boolean} calibration - object with properties transformX and transformY
 */  
e2e_polygon = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_polygon'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }
  // Tap past intro screen
  waitForReport('intro_trial');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  // Make screenshots of test1 to test6
  for (let test_i = 1; test_i <= 2; test_i++) {
    testName = 'polygon' + test_i;      
    // Wait for confirmation we're at the next test routine
    waitForReport(testName);
    // Wait a moment, then take screenshot
    //browser.pause(200);    
    browser.writeScreenshot(testName);
    // Next routine
    tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  }
  // Wait for FINISHED
  waitForReport('FINISHED');
};


/**
 * Performs e2e_sound
 * @function
 * @public
 * @param {boolean} calibration - object with properties transformX and transformY
 */  
e2e_sound = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_sound'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }  
  // Wait for intro_trial and tap past it
  waitForReport('intro_trial');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  // Wait for sound_trial
  waitForReport('sound_trial');
  // Check if experiment finishes
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));    
  waitForReport("FINISHED");
};

/**
 * Performs e2e_conditions
 * @function
 * @public
 * @param {boolean} calibration - object with properties transformX and transformY
 */  
e2e_text = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_text'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }
  // Tap past intro screen
  waitForReport('STARTED');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  // Make screenshots of test1 to test6
  for (let test_i = 1; test_i <= 6; test_i++) {
    testName = 'text' + test_i;      
    // Wait for confirmation we're at the next test routine
    waitForReport(testName);
    // Wait a moment, then take screenshot
    //browser.pause(200);    
    browser.writeScreenshot(testName);
    // Next routine
    tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  }
  // Wait for FINISHED
  waitForReport('FINISHED');
};

/**
 * Performs e2e_textbox
 * @function
 * @public
 * @param {boolean} calibration - object with properties transformX and transformY
 */  
e2e_textbox = (calibration = null) => {
  // Returns a sequence of actions in which element of text is translated to a key press
  let typeText = (text) => {
    result = [];
    for (let i = 0; i < text.length; i++) {
      result = result.concat([
        {"type": "keyDown", "value": text[i]},
        {"type": "keyUp", "value": text[i]}
      ]);
    }
    return result;
  }
  // Skip iPhone (no support of key actions)
  if (browser.getPlatformName().includes('iPhone')) {
    pending();
  }
  // If no calibration specified, get from e2e_calibration
  if (calibration === null) {
    calibration = e2e_calibration(false);    
  }
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_textbox'));
  performPavloviaPrelude();
  // Go through intro, type something in textbox, make screenshot
  waitForReport('intro');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  waitForReport('textbox');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  browser.performActions([{
    "type": "key",
    "id": "hello",
    "actions": typeText('hello')
  }]);
  browser.writeScreenshot('textbox_immediate');
  browser.pause(10000);
  browser.writeScreenshot('textbox_delayed');
  // Submit text, screenshot of feedback, finish
  browser.performActions([{
    "type": "key",
    "id": "enter",
    "actions": typeText(['\uE006'])
  }]);
  waitForReport('feedback');
  browser.writeScreenshot('textbox_feedback');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  console.log("double tap after feedback");
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  waitForReport('FINISHED');
};

/**
 * Performs e2e_video
 * @function
 * @public
 * @param {boolean} calibration - object with properties transformX and transformY
 */  
e2e_video = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_video'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }  
  // Wait for intro_trial and tap past it
  waitForReport('intro_trial');
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  // Wait for video_trial and take screenshot
  waitForReport('video_trial');
  browser.writeScreenshot('video');
  // Check if experiment finishes
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));    
  waitForReport("FINISHED");
};


e2e_combined = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('e2e_combined'));
  performPavloviaPrelude();
  // If no calibration specified, get from viewport
  if (calibration === null) {
    calibration = getViewportResolutions();    
  }  
  // Wait for intro_trial
  waitForReport('intro_trial');
  // Attach a callback for modifying stimulus
  browser.execute(
    'window.e2e_callback = function(stimulus) { \
      stimulus.setOpacity(0.5);  \
    };'
  );  
  // Tap past intro  
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
  // Wait for combined_trial and take screenshot
  waitForReport('combined_trial');
  browser.writeScreenshot('combined');
  // Check if experiment finishes
  tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));    
  waitForReport("FINISHED");
}

int_gonogo = (calibration = null) => {
  // Navigate to experiment and perform prelude
  browser.url(getExperimentUrl('int_gonogo'));
  performPavloviaPrelude();
  // Wait for slideshow
  waitForReport('slideshow');
  // Make a screenshot
  browser.writeScreenshot('slideshow');
}

module.exports = {
  //experimentUrls: experimentUrls,
  performPavloviaPrelude: performPavloviaPrelude,
  getViewportResolutions: getViewportResolutions,
  tapAtCoordinate: tapAtCoordinate,
  performCalibrationProcedure: performCalibrationProcedure,
  waitForReport: waitForReport,
  e2e_calibration: e2e_calibration,  
  tests: {
    e2e_code: e2e_code,
    e2e_conditions: e2e_conditions,
    e2e_img: e2e_img,
    e2e_polygon: e2e_polygon,
    e2e_sound: e2e_sound,
    e2e_text: e2e_text,
    e2e_textbox: e2e_textbox,
    e2e_video: e2e_video,
    e2e_combined: e2e_combined,
    int_gonogo: int_gonogo
  }
};