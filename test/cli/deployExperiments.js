// *** Modules
const Paths = require('./../shared/Paths.js');
const Stager = require('./../shared/Stager.js');
const fs = require('fs');
const Mustache = require('mustache');

// *** Parse CLI arguments
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const { fileURLToPath } = require('url');
const argv = yargs(hideBin(process.argv)).argv

// Get branch (if any specified)
let branch;
if (process.env.TRAVIS_BRANCH !== undefined) {
  console.log('deployExperiments.js: branch specified via TRAVIS_BRANCH as ' + process.env.TRAVIS_BRANCH);
  branch = process.env.TRAVIS_BRANCH;
} else if (argv.branch !== undefined) {
  console.log('deployExperiments.js: branch specified via CLI option as ' + argv.branch);
  branch = argv.branch;
} else {
  throw 'deployExperiments.js: no branch specified via TRAVIS_BRANCH no CLI option';
}

// Download experiments to temporary directory
deployExperiments = async () => {
  // Recreate experiments directory
  fs.rmdirSync(Paths.dir_experiments, {recursive: true});
  fs.mkdirSync(Paths.dir_experiments);

  // Download experiments
  console.log('deployExperiments.js: downloading experiments');
  downloadResults = await Stager.ftpRequest((client, basePath) => {
    return client.downloadDir(basePath + '/experiments', Paths.dir_experiments);
  }, false);
  console.log(downloadResults);

  // List of  experiments
  let experiments = fs.readdirSync(Paths.dir_experiments);
  console.log('deployExperiments.js: preparing ' + experiments.length + ' experiments');
  // Get template
  let template = fs.readFileSync('./src/index.html', 'utf8');
  // Get includes
  let includes = fs.readdirSync('./dist');

  // For each experiment, compile index.html and copy dist/ to lib/
  for (let experiment of experiments) {
    // Compile template
    let compiled = Mustache.render(template, { experiment: experiment });
    console.log(compiled);
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





/*
joinedReports = joinedReports.concat(joinedReports, report);



// Depending on branch and test CLI option, construct test
let path;
if (argv.test === undefined && branch === '') {
  throw 'updateStager.js: No branch nor test CLI option specified';
} else if(branch === '') {
  // Only from test
  path = argv.test;
} else if (argv.test === undefined) {
  // Only from branch
  path = branch;
} else {
  // Both branch and test
  path = branch + '/' + argv.test;
}

// *** Perform argv.action
const Stager = require('../shared/Stager.js');
switch (argv.action) {
  // Delete remote test 
  case 'delete':
    console.log('updateStager.js: argv.action delete, path ' + path);
    Stager.deleteDirectory(path);
    break;
  // Upload to remote test 
  case 'upload':
    console.log('updateStager.js: argv.action upload, path ' + path);
    Stager.uploadDirectory(Paths.dir_tmp, path);
    break;
  default:
    throw 'updateStager.js argv.action CLI option not recognized: ' + argv.action;
}
*/