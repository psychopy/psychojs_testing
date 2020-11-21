// Modules
const Paths = require('../shared/Paths.js');
const Stager = require('../shared/Stager.js');
const fs = require('fs');
const Mustache = require('mustache');
const CLIParser = require('../shared/CLIParser.js');

// Get branch
let branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});

// Download experiments to temporary directory
deployExperiments = async () => {
  // Delete experiments directory (it not empty)
  try {
    fs.rmdirSync(Paths.dir_experiments, {recursive: true});
  } catch (e) {}
  // Recreate experiments directory (with workaround for Windows)
  let dirCreated = false;
  while (!dirCreated) {
    try {
      fs.mkdirSync(Paths.dir_experiments);
      dirCreated = true;
    } catch (e) {}
  }

  // Download experiments
  console.log('deployExperiments.js: downloading experiments');
  downloadResults = await Stager.ftpRequest((client, basePath) => {
    return client.downloadDir(basePath + '/experiments', Paths.dir_experiments);
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
    // Compile and write template
    let compiled = Mustache.render(template, { experiment: experiment });
    fs.writeFileSync(
      Paths.dir_experiments + '/' + experiment + '/index.html', 
      compiled
    );
    // Copy dist/ to lib/
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
    'app/' + branch
  )
};
deployExperiments();
