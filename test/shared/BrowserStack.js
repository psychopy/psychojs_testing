// Helper functions for making calls to the BrowserStack REST API

// Modules
const child_process = require('child_process');
const CLIParser = require('./CLIParser.js');

// Default project name
const projectName = "PsychoJS";

// CURL shorthand
curlCommand = (postfix, infix = '') => {
  return '' +
    'curl -s -u "' + 
    CLIParser.parseOption({env: 'BROWSERSTACK_USER'}, true, CLIParser.logSilent) + 
    ':' + 
    CLIParser.parseOption({env: 'BROWSERSTACK_ACCESSKEY'}, true, CLIParser.logSilent) + 
    '" ' +
    infix +
    ' https://api.browserstack.com/automate/' +
    postfix;
};

getProjectIdByName = (projectName) => {
  console.log('BrowserStack.js: finding projectId with projectName ' + projectName);
  // Query projects
  let projects = JSON.parse(child_process.execSync(curlCommand('projects.json')));
  console.log('BrowserStack.js: ' + projects.length + ' projects in total');
  // Project with matching name
  const matchingProject = projects.filter((project) => {
    return project.name === projectName
  });  
  if (matchingProject.length !== 1) {
    throw 'Searching for a project with name ' + projectName + ' did not yield a single result, but ' + matchingProject.length;
  }
  console.log('BrowserStack.js: matching projectId is ' + matchingProject[0].id);
  return matchingProject[0].id;
}

getBuildsByProjectId = (projectId) => {
  console.log('BrowserStack.js: finding builds with projectId ' + projectId);
  // Query project details
  let projectDetails = JSON.parse(child_process.execSync(curlCommand('projects/' + projectId + '.json')));
  // Return builds
  console.log('BrowserStack.js: ' + projectDetails.project.builds.length + ' builds in total');
  return projectDetails.project.builds;
}

// Delete builds as speficied via filterFunction
deleteBuilds = (filterFunction) => {
  console.log('BrowserStack.js: deleting builds');
  // Get all builds of projectName
  let projectId = getProjectIdByName(projectName);
  let builds = getBuildsByProjectId(projectId);
  // Select which builds to delete
  let buildsToDelete = builds.filter(filterFunction);
  let buildIdsToDelete = buildsToDelete.map((build) => {
    return build.hashed_id;
  })
  console.log('BrowserStack.js: deleting builds with buildIds ' + JSON.stringify(buildIdsToDelete));
  for (let buildIdToDelete of buildIdsToDelete) {
    console.log('BrowserStack.js: deleting build with buildId ' + JSON.stringify(buildIdToDelete));
    child_process.execSync(curlCommand(
      'builds/' + buildIdToDelete + '.json',
      '-X DELETE'
    ));
  }
};  

// Get all available browsers
getBrowsers = () => {
  console.log('BrowserStack.js: getting all available capabilities');
  let browsers = JSON.parse(child_process.execSync(curlCommand('browsers.json')));
  return browsers;
};


// Delete one test + branch named testName
deleteOneTest = (testName) => {
  console.log('BrowserStack.js: deleting one test + branch with testName ' + testName);
  deleteBuilds((build) => {
    return build.name === testName;
  });
};

// Delete all branches except those named branchNames (i.e. the string after ":" in the buildName)
deleteAllBranchesExcept = (branchNames) => {
  console.log('BrowserStack.js: deleting all builds except those with branchNames ' + JSON.stringify(branchNames));
  deleteBuilds((build) => {
    return !branchNames.includes(build.name.split(':')[1]);
  });
};

module.exports = {
  getProjectIdByName: getProjectIdByName,
  getBuildsByProjectId: getBuildsByProjectId,
  getBrowsers: getBrowsers,
  deleteOneTest: deleteOneTest,
  deleteAllBranchesExcept: deleteAllBranchesExcept
};