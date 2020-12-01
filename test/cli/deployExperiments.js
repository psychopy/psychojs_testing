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

// Base URL to experiment on Stager
let baseURL = 'https://staging.psychopy.org/experiments/html/' + branch;

// get files in dirPath and each of its subdirectories
// https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
const getAllFiles = (dirPath, arrayOfFiles) => {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  })

  return arrayOfFiles;
}

// get files in fromPath and each of its subdirectories. Returned files have:
// (a) their fromPath replaced by toPath and (b) slashes as separators
const readDirSyncRecursive = (fromPath, toPath) => {
  let files = getAllFiles(fromPath);
  // If fromPath starts with ./, remove it
  if (fromPath.substr(0, 2) === './') {
    fromPath = fromPath.substr(2, fromPath.length);
  }
  // Add a trailing slash to fromPAth
  fromPath += '/';
  // perform (a) and (b) transformations
  files = files.map( (file) => {
    // replace backslashed by slashes
    file = file.replace(/\\/g, '/');
    // replace fromPath by toPath
    file = file.replace(fromPath, toPath)
    return file;
  });
  return files;
}

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
  let resources;
  for (let experiment of experiments) {
    console.log('deployExperiments.js: deploying ' + experiment);

    // Compile and write index.html
    console.log('deployExperiments.js: compiling index.html');
    let compiled = Mustache.render(template, { experiment: experiment });
    fs.writeFileSync(
      Paths.dir_experiments + '/' + experiment + '/index.html', 
      compiled
    );
    
    // Compile and write resources
    try {
      console.log(Paths.dir_experiments + '/' + experiment + '/resources');
      resources = readDirSyncRecursive(Paths.dir_experiments + '/' + experiment + '/resources', '');
    } catch (e) {
      resources = [];
    }
    fs.writeFileSync(
      Paths.dir_experiments + '/' + experiment + '/resources.json', 
      JSON.stringify({
        resources: resources,
        resourceDirectory: baseURL + '/' + experiment + '/resources/'
      })
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
    'experiments/html/' + branch
  )
})();
