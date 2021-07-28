// PsychoPolyfill Version 2021.1.3

// This JS file bundles up the JS workarounds listed in the 
// Python to JavaScript Crib Sheet by Wakefield Morys-Carter.
// Some of the functions listed in the Crib Sheet have been adapted
// to act more like their Python equivalents and/or be more robust.
// https://docs.google.com/document/d/13jp0QAqQeFlYSjeZS0fDInvgaDzBXjGQNe4VNKbbNHQ

// For a demo on how to use the PsychoPolyfill, see:
// https://pavlovia.org/tpronk/demo_polyfill

// For issues with this polyfill, see:
// https://example.com

// Developed by Thomas Pronk, with contributions of:
//  - Asia2
//  - David Bridges
//  - Rebecca Hirst 
//  - Sotiri Bakagiannis
//  - Wakefield Morys-Carter


// ********************************
// *** Checking Version Numbers ***
// ********************************

// Oldest and newest PsychoPy version of which we are sure that this version of PsychoPolyfill is compatible with
const oldestVersion = '2021.1.0';
const newestVersion = '2021.3.0';
// URL to page with assistance about this module
const helpUrl = 'For more information, see https://gitlab.pavlovia.org/tpronk/demo_polyfill';

// Return whether currentVersion 'older', 'newer', 'same' than referenceVersion
function compareVersion(currentVersion, referenceVersion) {
  // Split version numbers into arrays
  let referenceVersionArray = referenceVersion.split('.');
  let currentVersionArray = currentVersion.split('.');
  // If currentVersion doesn't have a major minor and patch number, assume it's an older verion
  if (currentVersionArray.length < 3) {
    return 'older';
  }
  // Check each part of the version number
  let currentVersionNumber, referenceVersionNumber;
  for (let i = 0; i < referenceVersionArray.length; i++) {
    currentVersionNumber = Number(currentVersionArray[i]);
    referenceVersionNumber = Number(referenceVersionArray[i]);
    if (isNaN(currentVersionArray[i])) {
      // Invalid version number part? Assume older version
      return 'older';
    } else if (currentVersionArray[i] < referenceVersionNumber) {
      // Lower version number part? Older version
      return 'older';
    } else if (currentVersionArray[i] > referenceVersionNumber) {
      // Higher version number part? Newer version
      return 'newer';
    }
  }
  // Still here? currentVersion is same as referenceVersion
  return 'same';
}

// **************************************************************
// *** Check version and create aliases of PsychoJS variables ***
// **************************************************************
export default function (currentVersion, psychoJS, util) {
  if(compareVersion(currentVersion, oldestVersion) === 'older' || compareVersion(currentVersion, newestVersion) === 'newer') {
    throw new Error(
      'This version of PsychoPolyfill is compatible with PsychoJS version ' + oldestVersion + ' to ' + newestVersion +
      ', but the experiment had version ' + currentVersion + '; ' +
      helpUrl
    );
  }
  window.thisExp = psychoJS.experiment;
  window.win = psychoJS.window;
  window.event = psychoJS.eventManager;
  window.shuffle = util.shuffle;
}

// **************************************************
// *** Utility functions and Prototype extensions ***
// **************************************************

// Python's append; adapted from David Bridges
// https://discourse.psychopy.org/t/typeerror-blocks-append-is-not-a-function/12038/5
Array.prototype.append = [].push;

// Python's sort; adapted from Crib Sheet
// Extended to dynamically handle numberic and alphabetic sorting, depending on array content
window.sort = (array) => {
  // If all elements are numbers, do a numeric sort
  if(array.every((element) => {
    return(typeof element === "number") 
  })) {
    return array.sort((a, b) => (a - b));
  }
  // If all elements are strings, do an alphabetic sort
  if(array.every((element) => {
    return(typeof element === "string") 
  })) {
    return array.sort();
  }
  // Neither? Throw an error
  throw new Error(
    'PsychoPolyfill::sort can only sort arrays that consist either solely of numbers or solely of strings. ' + helpUrl
  );
}

// Returns function for matching index to value, depending on type of value
function createMatchFunction (value) {
  if (typeof value === 'function') {
    throw new Error(
      'PsychoPolyfill::createMatchFunction was requested to match a value that was a function. ' + helpUrl
    );
  } else if (Number.isNaN(value)) {
    // NaN; can't be checked via ===
    return (item) => {
      return Number.isNaN(item);
    }
  } else if (value === null) {
    // null is an object, but we should still use ===
    return (item) => {
      return item === value;
    }
  } else if (typeof value === 'object') {
    // Object; try to match value and item, both converted to JSON 
    let valueJSON = JSON.stringify(value);
    if (valueJSON === undefined) {
      throw new Error(
        'PsychoPolyfill::createMatchFunction was requested to match a value that was an object that could not be converted to JSON. ' + helpUrl
      );
    }
    return (item) => {
      let itemJSON = JSON.stringify(item);
      return itemJSON === valueJSON;
    }
  } else {
    // All other cases, use ===
    return (item) => {
      return item === value;
    }    
  }
}

// Python's count; adapted from Rebecca Hirst 
// https://twitter.com/HirstRj
// Extended to handle NaN and any value that can be converted to JSON
Array.prototype.count = function(value) {
  let matches = createMatchFunction(value);

  // Ready to count!
  let count = 0;
  this.forEach(item => {
    if (matches(item)) {
      count++;
    }
  });
  return count;
}

// Python's indedOf; adapted from Crib Sheet
// Extended to handle NaN and any value that can be converted to JSON
// Altered to throw an error when value is not in array;
// In that case JS' indexOf return -1, but Python throws an error
Array.prototype.index = function(value) {
  let matches = createMatchFunction(value);

  // Ready to find index!
  for (let i = 0; i < this.length; i++) {
    if (matches(this[i])) {
      return i;
    }
  }
  // Still here? Index not found; throw error
  throw new Error(
    'PsychoPolyfill::Array.prototype.index was requested to find the index of a value that it could not find in the array. ' + helpUrl
  );
}

// Python's webbrowser.
// Example usage: webbrowser.open("link")
window.webbrowser = window;

// ***********************
// *** Maths functions ***
// ***********************

// numpy.random.random
window.random = Math.random();

// numpy.random.randint
// Adapted as follows:
// - to match numpy, renamed arguments to low and high (instead of min and high)
// - low and high get rounded down to nearest integer
// - throw Error if low or high couldn't be converted to numbers, or if low >= high 
// - throw Error if more than two arguments are passed (size and dtype in numpy)
window.randint = function(low, high) {
  let lowFloored = Math.floor(low);
  let highFloored = Math.floor(high);
  if (arguments.length !== 2) {
    throw new Error(
      'PsychoPolyfill::randint only supports two arguments (the "low" and "high" arguments). ' + helpUrl
    );
  }
  if (isNaN(lowFloored)) {
    throw new Error(
      'PsychoPolyfill::randint received an argument for "low" that could not be converted to a number. ' + helpUrl
    );
  }
  if (isNaN(highFloored)) {
    throw new Error(
      'PsychoPolyfill::randint received an argument for "high" that could not be converted to a number. ' + helpUrl
    );
  }
  if (lowFloored >= highFloored) {
    throw new Error(
      'PsychoPolyfill::randint received a "low" argument that was higher than or equal to (>=) the "high" argument. ' + helpUrl
    );
  }
  return Math.floor(Math.random() * (high - low) ) + low;
}

// Python's range
// Adapted as follows:
// - Supports start, stop, and step arguments
// - Throws error if any argument is not an integer
function range(start, stop, step) {
  if (!Number.isInteger(start)) {
    throw new Error(
      'PsychoPolyfill::range received an argument for "start" that was not an integer (a whole number). ' + helpUrl
    );
  }
  if (!Number.isInteger(stop)) {
    throw new Error(
      'PsychoPolyfill::range received an argument for "stop" that was not an integer (a whole number). ' + helpUrl
    );
  }
  if (!Number.isInteger(step)) {
    throw new Error(
      'PsychoPolyfill::range received an argument for "step" that was not an integer (a whole number). ' + helpUrl
    );
  }
  // start >= stop? empty range
  if (start >= stop) {
    return [];
  }
  let result = [];
  for (let i = start; i < stop; i += step) {
    result.push(i);
  }
  return result;
}

// The exposed version of range treats arguments differently depending on how many there are provided
window.range = function() {
  if (arguments.length < 1) {
    throw new Error(
      'PsychoPolyfill::range requires at least one argument. ' + helpUrl
    );
  }
  if (arguments.length > 3) {
    throw new Error(
      'PsychoPolyfill::range requires at most three arguments. ' + helpUrl
    );
  }
  // One argument? That's stop; start = 0, step = 1
  if (arguments.length == 1) {
    return range(0, arguments[0], 1);
  }
  // Two arguments? That's start and stop; step = 1
  if (arguments.length == 2) {
    return range(arguments[0], arguments[1], 1);
  }
  // Three arguments? That's start, stop, and step
  if (arguments.length == 3) {
    return range(arguments[0], arguments[1], arguments[2]);
  }
}

// Numpy's linspace
window.linspace = function(start, stop, num = 50, endpoint = true) {
  
}

// Python's sum
// Adapted as follows:
// - renamed arr to iterable, added start
// - throws error if iterable is not an array
// - throws error if any element of iterable is not a number
window.sum = function (iterable, start = 0) {
  if (!Array.isArray(iterable)) {
    throw new Error(
      'PsychoPolyfill::sum received an argument for "iterable" that was not an array. ' + helpUrl
    );
  }
  if (typeof start !== 'number') {
    throw new Error(
      'PsychoPolyfill::sum received an argument for "start" that was not a number. ' + helpUrl
    );
  }
  return iterable.reduce(
    (a,b) => {
      if (typeof b !== 'number') {
        throw new Error(
          'PsychoPolyfill::sum received an argument for "iterable" which had an element that was not a number. ' + helpUrl
        );
      }
      return a + b;
    },
    start
  );
}
  
// Numpy's average
// Adapted as follows:
// - Renamed arr argument to a (that's how numpy calls it)
// - Throws an error if any element of a is not a number
// - Throws an error if more than 1 argument is passed
window.average = function (a) {
  if (arguments.length > 1) {
    throw new Error(
      'PsychoPolyfill::average only supports one arguments (the "a" argument, which is the array to calculate the average of). ' + helpUrl
    );
  }
  if (!Array.isArray(a)) {
    throw new Error(
      'PsychoPolyfill::average received an argument that was not an array. ' + helpUrl
    );
  }
  return a.reduce(
    (a,b) => {
      if (typeof b !== 'number') {
        throw new Error(
          'PsychoPolyfill::average received an argument which had an element that was not a number. ' + helpUrl
        );
      }
      return a + b;
    },
    0
  ) / a.length;
}