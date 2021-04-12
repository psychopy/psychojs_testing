// Collects tests from ./tests/ 
const Paths = require('./Paths.cjs');
const NameSanitizer = require('./NameSanitizer.cjs');
const minimatch = require('minimatch');
const fs = require('fs-extra');

// Recursively collects all tests from tests directory and not-ignored subdirectories whose labels include label.
// Additionally, it performs the following checks:
// - It collects all of the tests recursively and performs the checks mentioned in collectTestsRecursive
// - It checks whether each test has a unique filename
collectTests = (label, addCalibration = false) => {
  // Perform checks on all tests
  let results = collectTestsRecursive(
    '*',
    Paths.dir_tests
  );

  // If label contains any slashes, assume it's a path
  let labelToFind, basePath;
  if (label.includes('/')) {
    labelToFind = '*';
    basePath = Paths.dir_tests + '/' + label;
  } else {
    labelToFind = label;
    basePath = Paths.dir_tests;
  }

  // Collect tests for current label and return them
  let tests = collectTestsRecursive(
    labelToFind,
    basePath
  );

  // If tests.fine_calibration is true and addCalibration is true, add wdio_calibration to tests.wdio (if not already there)
  if (tests.fine_calibration && addCalibration) {
    let hasCalibration = tests.wdio.reduce((hasCalibration, test) => {
      return hasCalibration || test.labels.includes('wdio_calibration');
    }, false);
    if (!hasCalibration) {
      let calibrationTest = collectTestsRecursive(
        'wdio_calibration',
        Paths.dir_tests
      );
      tests.wdio = tests.wdio.concat(calibrationTest.wdio);
    }
  }

  return tests;
};



// Recursively collects tests tests from tests directory and not-ignored subdirectories whose labels include label.
// Arguments:
// - path and results are pre-filled by collectTests
// - if adjustPath is true, paths to wdio tests are made relative
// Returns an object with two poperties, each of whose values is an array:
// - 'karma' contains the paths to all matching karma tests
// - 'wdio' contains the paths to all matching wdio tests
// - 'fine_calibration' is true if any of the wdio tests require fine calibration
// Additionally, it performs the following checks:
// - Whether in each directory, the number of .json (config) files matches the number of .js and .cjs (test-script) files
// - Whether each .json (config) file contains valid JSON
// - Whether each .json (config) file has a labels property
// For config files whose "labels" property matches the label argument provided, it checks:
// - Whether the .json (config) file has a test_framework property that is either 'karma' or 'wdio'
// - Whether the .json (config) file with test_framework === "karma" has a matching .cjs file (.cjs is for wdio)
// - Whether the .json (config) file with test_framework === "wdio" has a matching .cjs file (.js is for karma)
collectTestsRecursive = (label, path, results = {'karma': [], 'wdio': [], 'fine_calibration': false}) => {
  // This directory contains a testconfig.json, parse it
  if (fs.existsSync(path + '/testconfig.json')) {
    // Parse config and add to results
    let config = parseConfig(label, path);
    if (config !== undefined) {
      results[config.test_framework].push(config);
      results.fine_calibration = results.fine_calibration || config.fine_calibration;
    }
  // This directory does not contain a testconfig.json, parse subdirectories
  } else {
    // Directories to ignore during test-collection
    const directoriesToIgnore = [
      Paths.dir_tests + '/shared',
      Paths.dir_tests + '/cli',
      Paths.dir_tests + '/staging'
    ];
    // Parse each subdirectory
    let dirContents = fs.readdirSync(path);    
    let subDirs = dirContents.filter((subDir) => {
      return fs.lstatSync(path + '/' + subDir).isDirectory()
    });
    for (let subDir of subDirs) {
      if (!directoriesToIgnore.includes(path + '/' + subDir)) {
        results = collectTestsRecursive(label, path + '/' + subDir, results);
      }
    }
  }
  return results;
};

// Parse a config file
// - if current config does not match label, returns undefined
// - if current config does match label, returns parsed config
parseConfig = (label, path) => {
  let config;
  try {
    config = JSON.parse(
      fs.readFileSync(path + '/testconfig.json').toString()
    );  
  } catch (e) {
    throw new Error(
      'Error in test-configuration: JSON in ' + 
      path + 
      '/testconfig.json could not be parsed'
    );
  }
  // Check if there is a labels property
  if (!config.hasOwnProperty('labels')) {
    throw new Error(
      'Error in test-configuration: ' +
      path + 
      '/testconfig.json did not have a "labels" property'
    );
  }
  // Check if labels are valid and any match label. No matches? stop
  labelMatches = config.labels.some((labelToMatch) => {
    NameSanitizer.validate(
      'one of the labels in ' + path + '/testconfig.json',
      labelToMatch
    );
    return minimatch(labelToMatch, label);
  });
  if (!labelMatches) {
    return;
  }
  // Check if there is a description property
  if (!config.hasOwnProperty('description')) {
    throw new Error(
      'Error in test-configuration: ' +
      path + 
      '/testconfig.json did not have a "description" property'
    );
  }
  // Remove leading './tests/' from config.path
  config.path = path.substring(
    './tests/'.length, 
    path.length
  );
  // Parse testscript_file
  if (!fs.existsSync(path + '/' + config.testscript_file)) {
    throw new Error(
      'Error in test-configuration: ' + 
      path + 
      '/testconfig.json has "testscript_file" property ' + 
      JSON.stringify(config.testscript_file) +
      ', but I could not find this file at ' +
      path + '/' + config.testscript_file
    );
  }
  // *** Parse test_framework
  // karma-specific parsing; nothing so far
  if (config.test_framework === 'karma') {
  // wdio-specific parsing
  } else if (config.test_framework === 'wdio') {
    // Check if experiment_file exists
    if (!fs.existsSync(path + '/' + config.experiment_file)) {
      throw new Error(
        'Error in test-configuration: ' + 
        path + 
        '/testconfig.json has "experiment_file" property ' + 
        JSON.stringify(config.experiment_file) +
        ', but I could not find this file at ' +
        path + '/' + config.experiment_file
      );
    }
  // Invalid value for test_framework
  } else {
    throw new Error(
      'Error in test-configuration: ' + 
      path + 
      '/testconfig.json has "test_framework" property that was missing or not recognized (found ' + 
      JSON.stringify(config.test_framework) + 
      ' but expected "karma" or "wdio")'
    );
  }
  // Parse fine_calibration
  config.fine_calibration = config.hasOwnProperty('fine_calibration') && config.hasOwnProperty('fine_calibration') === true;
  // Done
  return config;
};


// Extracts test name from a path & filename (i.e. from ./tests/my_test.cjs it returns my_test)
testNameFromPath = (path) => {
  let name = path.split('/').pop();
  return name.split('.')[0];
};

module.exports = {
  collectTests: collectTests,
  testNameFromPath: testNameFromPath
}