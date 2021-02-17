// Collects tests from ./tests/ 
const Paths = require('./Paths.cjs');
const GlobMatcher = require('./GlobMatcher.cjs');
const fs = require('fs');

// Recursively collects all tests from tests directory and not-ignored subdirectories whose labels include label.
// Additionally, it performs the following checks:
// - It collects all of the tests recursively and performs the checks mentioned in collectTestsRecursive
// - It checks whether each test has a unique filename
collectTests = (label) => {
  // Perform checks on all tests
  let results = collectTestsRecursive(
    '*',
    Paths.dir_tests,
    {'karma': [], 'wdio': [], 'fine_calibration': false},
    false
  );
  // Check if all filenames are unique
  let filenamesWithPath = results.wdio.concat(results.karma);
  let filenames = filenamesWithPath.map(testNameFromPath);
  // true for every duplicate
  let isDuplicate = filenames.map((filenameToCheck) => {
    return filenames.reduce((count, filename) => {
      return count + (filename === filenameToCheck? 1: 0);
    }, 0) > 1;
  });
  // filenamesWithPaths for every duplicate
  let duplicates = filenamesWithPath.filter((filenameWithPath, index) => {
    return isDuplicate[index];
  });
  // Error if any duplicates found
  if (duplicates.length > 0) {
    throw new Error('Duplicate filenames not allowed for tests. Found these duplicates: ' + JSON.stringify(duplicates));
  }

  // Collect tests for current label and return them
  return collectTestsRecursive(
    label,
    Paths.dir_tests,
    {'karma': [], 'wdio': [], 'fine_calibration': false}
  );
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
collectTestsRecursive = (label, path, results, adjustPath = true) => {
  // Contents of current sub-directory
  let dirContents = fs.readdirSync(path);
  // All config files
  let configFiles = dirContents.filter((dirContent) => {
    return dirContent.endsWith('.json');
  });
  // All test-script files
  let testScriptFiles = dirContents.filter((dirContent) => {
    return dirContent.endsWith('.js') | dirContent.endsWith('.cjs');
  });
  // Mismatch between number of configFiles and testScriptFiles?
  if (configFiles.length !== testScriptFiles.length) {
    throw new Error(
      'In directory ' + path + ' I found ' + configFiles.length + 
      ' config files (ending with .json), but ' + testScriptFiles.length + 
      ' test-script files files (ending with .js or .cjs)'
    );
  }
  // All test-script files found via config files
  let testScriptsFound = [];
  // Parse each config file
  let config, dirContentWithPath, testScriptFile, labelMatches;
  for (let configFile of configFiles) {
    dirContentWithPath = path + '/' + configFile;
    try {
      config = JSON.parse(
        fs.readFileSync(dirContentWithPath).toString()
      );  
    } catch (e) {
      throw new Error('JSON in test config file ' + dirContentWithPath + ' could not be parsed');
    }
    // Check if there is a label property
    if (!config.hasOwnProperty('labels')) {
      throw new Error('Test config file ' + dirContentWithPath + ' did not have a "labels" property');
    }
    // Label matches? check if test-script file exists and add to results
    labelMatches = config.labels.some((labelToMatch) => {
      return GlobMatcher.match(label, labelToMatch);
    });
    if (labelMatches) {
      if (config.test_framework === 'karma') {
        // karma test: path relative to root of repo, js extension
        testScriptFile = dirContentWithPath.substring(0, dirContentWithPath.length - ".json".length) + '.js';
        if (!fs.existsSync(testScriptFile)) {
          throw new Error('Test config file ' + dirContentWithPath + ' with test_framework === "karma" did not have a matching test-script file ' + testScriptFile);
        }
        results[config.test_framework].push(
          dirContentWithPath.substring(0, dirContentWithPath.length - ".json".length) +
          '.js'
        );
      } else if (config.test_framework === 'wdio') {
        // wdio test: path relative to ./tests/shared, cjs extension
        testScriptFile = dirContentWithPath.substring(0, dirContentWithPath.length - ".json".length) + '.cjs';
        if (!fs.existsSync(testScriptFile)) {
          throw new Error('Test config file ' + dirContentWithPath + ' with test_framework === "wdio" did not have a matching test-script file ' + testScriptFile);
        }
        // Relative paths if adjustPath === true
        if (adjustPath) {
          results[config.test_framework].push(
            '../..' +
            dirContentWithPath.substring(1, dirContentWithPath.length - ".json".length) +
            '.cjs'
          );
        } else {
          results[config.test_framework].push(
            dirContentWithPath.substring(0, dirContentWithPath.length - ".json".length) +
            '.cjs'
          );
        }
        // If fine_calibration property exists and is true, set results.fine_calibration to true
        if (config.hasOwnProperty('fine_calibration') && config.hasOwnProperty('fine_calibration') === true) {
          results.fine_calibration = true;
        }
      } else {
        throw new Error('Test config file ' + dirContentWithPath + ' had a "test_framework" property that was missing or not recognized (found ' + JSON.stringify(config.test_framework) + ' but expected "karma" or "wdio")');
      }
    }
  }
  // Directories to ignore during test-collection
  const directoriesToIgnore = [
    Paths.dir_tests + '/shared',
    Paths.dir_tests + '/cli',
    Paths.dir_tests + '/staging'
  ];
  // Parse each subdirectory
  let subDirs = dirContents.filter((dirContent) => {
    dirContentWithPath = path + '/' + dirContent;
    return fs.lstatSync(dirContentWithPath).isDirectory()
  });
  for (let subDir of subDirs) {
    dirContentWithPath = path + '/' + subDir;
    if (!directoriesToIgnore.includes(dirContentWithPath)) {
      results = collectTestsRecursive(label, dirContentWithPath, results, adjustPath);
    }
  }
  return results;
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