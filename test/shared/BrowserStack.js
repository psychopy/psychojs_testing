// Helper functions for making calls to the BrowserStack REST API

// Module for OS calls
const child_process = require('child_process');

// Default project name
const projectName = "PsychoJS";

// CURL shorthand
curlCommand = (postfix, infix = '') => {
  return '' +
    'curl -u "' + process.env.BROWSERSTACK_USER + ':' + process.env.BROWSERSTACK_ACCESSKEY + '" ' +
    infix +
    ' https://api.browserstack.com/automate/' +
    postfix;
};

getProjectIdByName = (projectName) => {
  console.log('BrowserStack.js: finding projectId with projectName ' + projectName);
  // Query projects
  console.log(curlCommand('projects.json'));
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

/// Delete builds as speficied via filterFunction
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
    console.log(curlCommand(
      'builds/' + buildIdToDelete + '.json',
      '-X DELETE'
    ));
    child_process.execSync(curlCommand(
      'builds/' + buildIdToDelete + '.json',
      '-X DELETE'
    ));
  }
};  

// Delete one build named buildName
deleteOneBuild = (buildName) => {
  console.log('BrowserStack.js: deleting one build with buildName ' + buildName);
  deleteBuilds((build) => {
    return build.name === buildName;
  });
};

// Delete all builds except those named buildNames
deleteAllBuildsExcept = (buildNames) => {
  console.log('BrowserStack.js: deleting all builds except those with buildNames ' + JSON.stringify(buildNames));
  deleteBuilds((build) => {
    return !buildNames.includes(build.name);
  });

};

module.exports = {
  getProjectIdByName: getProjectIdByName,
  getBuildsByProjectId: getBuildsByProjectId,
  deleteOneBuild: deleteOneBuild,
  deleteAllBuildsExcept: deleteAllBuildsExcept
};