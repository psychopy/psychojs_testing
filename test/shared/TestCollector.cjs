// Collects tests from ./tests/ 
const Paths = require('./Paths.cjs');
const fs = require('fs');

collectTests = (label, path = Paths.dir_tests, tests = {'karma': [], 'wdio': []}) => {
  // Contents of current sub-directory
  let dirContents = fs.readdirSync(path);
  // All config files
  let configFiles = dirContents.filter((dirContent) => {
    return dirContent.endsWith('.json');
  });
  // Parse each config file
  let config, dirContentWithPath;
  for (let configFile of configFiles) {
    dirContentWithPath = path + '/' + configFile;
    config = JSON.parse(
      fs.readFileSync(dirContentWithPath).toString()
    );  
    // Label matches? add to test

    if (config.labels.includes(label)) {
      console.log();
      tests[config.test_framework].push(dirContentWithPath.substring(
        0, 
        dirContentWithPath.length - ".json".length
      ) + (config.test_framework === 'wdio'? '.cjs': '.js'));
    }
  }
  // Parse each subdirectory
  let subDirs = dirContents.filter((dirContent) => {
    dirContentWithPath = path + '/' + dirContent;
    return fs.lstatSync(dirContentWithPath).isDirectory()
  });
  for (let subDir of subDirs) {
    dirContentWithPath = path + '/' + subDir;
    tests = collectTests(label, dirContentWithPath, tests);
  }
  return tests;
};
tests = collectTests('batch');
console.log(tests);