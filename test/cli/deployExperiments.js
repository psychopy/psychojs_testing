// Download experiments from stager, compile index.html, add library, and upload

// Modules
const Paths = require('../shared/Paths.js');
const Stager = require('../shared/Stager.js');
const fs = require('fs');
const Mustache = require('mustache');
const CLIParser = require('../shared/CLIParser.js');
const path = require('path');
const child_process = require('child_process');

// Get branch
let branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});
console.log('deployExperiments.js: branch is ' + branch);

// Download experiments to temporary directory
(async () => {
  // Delete experiments directory (it not empty)
  console.log('deployExperiments.js: cleaning up temporary folders');
  try {
    fs.rmdirSync(Paths.dir_experiments, {recursive: true});
  } catch (e) {}
  // Recreate experiments directory (with workaround for Windows)
  let dirCreated = false;
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
  console.log('deployExperiments.js: downloading experiments');
  downloadResults = await Stager.ftpRequest((client, basePath) => {
    return client.downloadDir(basePath + '/experiments/js', Paths.dir_experiments);
  }, true);
  
  // List of  experiments
  let experiments = fs.readdirSync(Paths.dir_experiments);
  console.log('deployExperiments.js: preparing ' + experiments.length + ' experiments');
  // Get template
  let template = fs.readFileSync('./src/index.html', 'utf8');
  // Get includes
  let includes = fs.readdirSync('./dist');

  // For each experiment, compile index.html and copy dist/ to lib/
  for (let experiment of experiments) {
    console.log('deployExperiments.js: deploying ' + experiment);
    // Compile and write template
    console.log('deployExperiments.js: compiling index.html');
    let compiled = Mustache.render(template, { experiment: experiment });
    fs.writeFileSync(
      Paths.dir_experiments + '/' + experiment + '/index.html', 
      compiled
    );
    // Copy dist/ to lib/
    console.log('deployExperiments.js: copying lib');
    fs.mkdirSync(Paths.dir_experiments + '/' + experiment + '/lib');
    includes.map((include) => { 
      fs.copyFileSync(
        './dist/' + include,
        Paths.dir_experiments + '/' + experiment + '/lib/' + include, 
      );
    });  
  }

  // Upload compiled experiments to stager
  Stager.uploadDirectory(
    Paths.dir_experiments,
    'eperiments/html/' + branch
  )
}();
deployExperiments();
