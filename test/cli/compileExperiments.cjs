// Download experiments from stager, compile psyexp file, and upload

// Modules
const Paths = require('../shared/Paths.cjs');
const Stager = require('../shared/Stager.cjs');
const CLIParser = require('../shared/CLIParser.cjs');
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

// Get path to psychopy
const psychopyPath = CLIParser.parseOption({env: 'PSYCHOPY_PATH'});
console.log('[compileExperiments.cjs] psychopyPath is ' + psychopyPath);

// Download experiments to temporary directory
(async () => {
  console.log('[compileExperiments.cjs] cleaning up temporary folders');
  // Delete experiments directory (it not empty)
  try {
    fs.rmdirSync(Paths.dir_experiments, {recursive: true});
  } catch (e) {}
  // Recreate experiments directory (with workaround for Windows)
  let dirCreated = false;
  // Keep trying for 10 seconds
  let startTime = new Date().getTime();
  while (!dirCreated) {
    try {
      fs.mkdirSync(Paths.dir_experiments);
      dirCreated = true;
    } catch (e) {
      // 10 seconds passed? Throw error
      if ((new Date().getTime()) - startTime > 10000) {
        throw (e);
      }
    }
  }

  // Download experiments
  console.log('[compileExperiments.cjs] downloading experiments');
  downloadResults = await Stager.ftpRequest((client, basePath) => {
    return client.downloadDir(basePath + '/experiments/psyexp', Paths.dir_experiments);
  }, true);
  
  // List of  experiments
  let experiments = fs.readdirSync(Paths.dir_experiments);
  console.log('[compileExperiments.cjs] compiling ' + experiments.length + ' experiments');

  // Local path to directory of current experiment
  let experimentPath;
  // For each experiment, compile psyexp (if applicable) index.html and copy dist/ to lib/
  for (let experiment of experiments) {
    console.log('[compileExperiments.cjs] compiling psyexp for ' + experiment);
    experimentPath = path.resolve(Paths.dir_experiments + '/' + experiment);
    child_process.execSync(
      'python ' + psychopyPath + '/psychopy/scripts/psyexpCompile.py ' + 
      experimentPath + '/' + experiment + '.psyexp ' +
      '--outfile ' + experimentPath + '/' + experiment + '.cjs'
    );
  }

  // Upload compiled experiments to stager
  Stager.uploadDirectory(
    Paths.dir_experiments,
    'experiments/js'
  )
})();

