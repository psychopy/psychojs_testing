// Download experiments from stager, compile index.html, add library, and upload

// Modules
const Paths = require('../shared/Paths.cjs');
const Stager = require('../shared/Stager.cjs');
const fs = require('fs');
const Mustache = require('mustache');
const CLIParser = require('../shared/CLIParser.cjs');
const path = require('path');

// Get download CLI option (download JS files from stager?)
let download = CLIParser.parseOption({cli: 'download'}, false);
download = download !== undefined;
console.log('[compileExperiments.cjs] download is ' + download);

// Get upload CLI option (upload comiled JS files to stager?)
let upload = CLIParser.parseOption({cli: 'upload'}, false);
upload = upload !== undefined;
console.log('[compileExperiments.cjs] upload is ' + upload);

// If upload enabled, get branch CLI option
let branch;
if (upload) {
  branch = CLIParser.parseOption({env: 'GITHUB_REF', cli: 'branch'});
  console.log('[deployExperiments.cjs] branch is ' + branch);
}

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
  if (download) {
    // Delete experiments directory (it not empty)
    console.log('[deployExperiments.cjs] cleaning up temporary folders');
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
    console.log('[deployExperiments.cjs] downloading experiments');
    downloadResults = await Stager.ftpRequest((client, basePath) => {
      return client.downloadDir(basePath + '/experiments/js', Paths.dir_experiments);
    }, true);
  }
  
  // List of experiments
  let experiments = fs.readdirSync(Paths.dir_experiments);
  console.log('[deployExperiments.cjs] preparing ' + experiments.length + ' experiments');
  // Get template
  let template = fs.readFileSync('./src/index.html', 'utf8');
  // Get root node (it's in a separate file for injecting in karma tests)
  let rootNode = fs.readFileSync('./src/root.html', 'utf8');
  // Get includes
  let includes = fs.readdirSync('./dist');


  // For each experiment, compile index.html and copy dist/ to lib/
  let resources;
  for (let experiment of experiments) {
    console.log('[deployExperiments.cjs] deploying ' + experiment);

    // Compile and write index.html
    console.log('[deployExperiments.cjs] compiling index.html');
    let compiled = Mustache.render(template, { 
      rootNode: rootNode,
      experiment: experiment
    });
    fs.writeFileSync(
      Paths.dir_experiments + '/' + experiment + '/index.html', 
      compiled
    );
    
    // Copy dist/ to lib/
    if (fs.existsSync(Paths.dir_experiments + '/' + experiment + '/lib')) {
      console.log('[deployExperiments.cjs] lib directory already exists');
    } else {
      console.log('[deployExperiments.cjs] creating lib directory');
      fs.mkdirSync(Paths.dir_experiments + '/' + experiment + '/lib');
    }
    console.log('[deployExperiments.cjs] copying lib');    
    includes.map((include) => { 
      fs.copyFileSync(
        './dist/' + include,
        Paths.dir_experiments + '/' + experiment + '/lib/' + include, 
      );
    });  
  }

  // Upload compiled experiments to stager
  if (upload) {
    console.log('[deployExperiments.cjs] uploading experiments');
    Stager.uploadDirectory(
      Paths.dir_experiments,
      'experiments/html/' + branch
    )
  }
})();
