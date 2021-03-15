// Compile experiments from psyexp to JS

// Modules
const Paths = require('../shared/Paths.cjs');
const CLIParser = require('../shared/CLIParser.cjs');
const TestCollector = require('../shared/TestCollector.cjs');
const child_process = require('child_process');
const fs = require('fs-extra');

// Get path to psychopy
const psychopyPath = CLIParser.parseOption({env: 'PSYCHOPY_PATH'});
console.log('[compileExperiments.cjs] psychopyPath is ' + psychopyPath);

// Get label and collect experiments
let label = CLIParser.parseOption({cli: 'label'});
let tests = TestCollector.collectTests(label, true);

// Perform compilation
(async () => {
  // Copy and compile each experiment
  console.log('[compileExperiments.cjs] Compiling ' + tests.wdio.length + ' experiments');

  for (let test of tests.wdio) {
    console.log('[compileExperiments.cjs] Copying ' + test.path);
    // Copy experiment to staging
    fs.copySync(
      Paths.dir_tests + '/' + test.path, 
      Paths.dir_staging + '/' + test.path
    );
    // Remove config, test-script, and references
    fs.removeSync(Paths.dir_staging + '/' + test.path + '/testconfig.json');
    fs.removeSync(Paths.dir_staging + '/' + test.path + '/' + test.testscript_file);
    fs.removeSync(Paths.dir_staging + '/' + test.path + '/references');
    // Compile psyexp
    console.log('[compileExperiments.cjs] Compiling psyexp for ' + test.path);
    compileCommand = '' +
      'python ' + psychopyPath + '/psychopy/scripts/psyexpCompile.py ' + 
      Paths.dir_staging + '/' + test.path + '/' + test.experiment_file +
      ' --outfile ' + Paths.dir_staging + '/' + test.path + '/' + 
      test.experiment_file.substring(0, test.experiment_file.length - '.psyexp'.length) + '.js';
    console.log(compileCommand)          
    child_process.execSync(compileCommand);
  }
})();

