// Helper functions for making calls to the BrowserStack REST API

// Modules
const child_process = require('child_process');
const CLIParser = require('./CLIParser.cjs');

// CURL shorthand
curlCommand = (postfix, infix = '') => {
  return '' +
    'curl -s -u "' + 
    CLIParser.parseOption({env: 'BROWSERSTACK_USER'}, true, CLIParser.logSilent) + 
    ':' + 
    CLIParser.parseOption({env: 'BROWSERSTACK_ACCESSKEY'}, true, CLIParser.logSilent) + 
    '" ' +
    infix +
    ' https://api.browserstack.com/' +
    postfix;
};

getProjectIdByName = (projectName) => {
  console.log('[BrowserStack.cjs] finding projectId with projectName ' + projectName);
  // Query projects
  let projects = JSON.parse(child_process.execSync(curlCommand('automate/projects.json')));
  console.log('[BrowserStack.cjs] ' + projects.length + ' projects in total');
  // Project with matching name
  const matchingProject = projects.filter((project) => {
    return project.name === projectName
  });
  if (matchingProject.length == 0) {
    console.log('[BrowserStack.cjs] no projectId found');
    return undefined;
  }
  if (matchingProject.length > 1) {
    throw 'Searching for a project with name ' + projectName + ' did not yield a single result, but ' + matchingProject.length;
  }
  console.log('[BrowserStack.cjs] matching projectId is ' + matchingProject[0].id);
  return matchingProject[0].id;
}

getBuildsByProjectId = (projectId) => {
  console.log('[BrowserStack.cjs] finding builds with projectId ' + projectId);
  // Query project details
  let projectDetails = JSON.parse(child_process.execSync(curlCommand('automate/projects/' + projectId + '.json')));
  // Return builds
  console.log('[BrowserStack.cjs] ' + projectDetails.project.builds.length + ' builds in total');
  return projectDetails.project.builds;
}

// Get build IDs that match filterFunction
getBuildIds  = (projectName, filterFunction) => {
  console.log('[BrowserStack.cjs] Getting buildIds');
  // Get all builds of projectName
  let projectId = getProjectIdByName(projectName);
  // No project? No builds
  if (projectId === undefined) {
    return [];
  }
  let builds = getBuildsByProjectId(projectId);
  // Filter out builds
  let filteredBuilds = builds.filter(filterFunction);
  let filteredBuildIds = filteredBuilds.map((filteredBuild) => {
    return filteredBuild.hashed_id;
  })
  return filteredBuildIds;
};

// Terminate workers of a build (only works with karma tests)
terminateWorkersByBuildName = (projectName, buildName) => {
  console.log('[BrowserStack.cjs] Terminating workers of build with buildName ' + buildName);
  let sessions = getSessionsByBuildName(projectName, buildName);
  let workerIds = sessions.map((session) => {
    return JSON.parse(session.automation_session.name)[1];
  });
  console.log('[BrowserStack.cjs] Terminating ' + workerIds.length + ' workers');
  for (let workerId of workerIds) {
    console.log(child_process.execSync(curlCommand(
      '5/worker/' + workerId,
      '-X DELETE'
    )).toString());    
  }
};

getSessionsByBuildName = (projectName, buildName) => {
// Get sesions matching a buildName
  console.log('[BrowserStack.cjs] Getting sessions from build with buildName ' + buildName);
  // Get build with buildName
  let buildIds = getBuildIds(projectName, (build) => {
    return build.name === buildName;
  });
  // No buildId? No sessions
  if (buildIds.length === 0) {
    return [];
  } else if (buildIds.length > 1) {
    throw new Error('[BrowserStack.cjs] Found ' + buildId.length + ' builds on BrowserStack with name ' + buildName);
  }
  // Get sessions; keep on querying until no sessions returned by BrowserStack
  let sessions = [], limit = 100, offset = 0;
  let newSessions, sessionsLeft = true;
  while (sessionsLeft) {
    newSessions = JSON.parse(child_process.execSync(curlCommand('automate/builds/' + buildIds[0] + '/sessions.json?limit=' + limit + '^&offset=' + offset)));
    console.log('[BrowserStack.cjs] Retrieving ' + newSessions.length + ' sessions');
    sessions = sessions.concat(newSessions);
    if (newSessions.length === limit) {
      offset += limit;
    } else {
      sessionsLeft = false;
    }
  }
  return sessions;
};


// Construct a map of buildNames to buildIds
getBuildNamesToBuildIdsMap  = (projectName, buildNames) => {
  console.log('[BrowserStack.cjs] Constructing map of buildNames to buildIds');
  let result = {};
  for (buildName of buildNames) {
    let buildIds = BrowserStack.getBuildIds(projectName, (build) => {
      return build.name === buildName;
    });
    if (buildIds.length !== 1) {
      throw new Error('[BrowserStack.cjs] Found ' + buildIds.length + ' builds on BrowserStack with name ' + buildName);
    }
    result[buildName] = buildIds[0];
  }
  return result;
};

// Delete builds that match filterFunction
deleteBuilds = (projectName, filterFunction) => {
  console.log('[BrowserStack.cjs] deleting builds');
  let buildIdsToDelete = getBuildIds(projectName, filterFunction);
  console.log('[BrowserStack.cjs] deleting builds with buildIds ' + JSON.stringify(buildIdsToDelete));
  for (let buildIdToDelete of buildIdsToDelete) {
    console.log('[BrowserStack.cjs] deleting build with buildId ' + JSON.stringify(buildIdToDelete));
    child_process.execSync(curlCommand(
      'automate/builds/' + buildIdToDelete + '.json',
      '-X DELETE'
    ));
  }
};  

// Get all available browsers
getBrowsers = () => {
  console.log('[BrowserStack.cjs] getting all available capabilities');
  let browsers = JSON.parse(child_process.execSync(curlCommand('automate/browsers.json')));
  return browsers;
};

// Delete logs of one build
deleteOneBuild = (projectName, buildName) => {
  console.log('[BrowserStack.cjs] deleting build with buildName ' + buildName);
  deleteBuilds(projectName, (build) => {
    return build.name === buildName;
  });
};

// Delete all builds that start with buildPrefix
deleteAllBuildsStartingWith = (projectName, buildPrefix) => {
  console.log('[BrowserStack.cjs] deleting all builds that start with ' + buildPrefix);
  deleteBuilds(projectName, (build) => {
    return build.name.startsWith(buildPrefix);
  });
};

// Delete all branches except those named branchNames (i.e. the string after ":" in the buildName)
deleteAllBranchesExcept = (projectName, branchNames) => {
  console.log('[BrowserStack.cjs] deleting all builds except those with branchNames ' + JSON.stringify(branchNames));
  deleteBuilds(projectName, (build) => {
    return !branchNames.includes(build.name.split(':')[0]);
  });
};

// Returns true of any sessions are running or queued
isBusy = () => {
  let plan = JSON.parse(child_process.execSync(curlCommand('automate/plan.json')));
  return plan.parallel_sessions_running > 0 || plan.queued_sessions > 0;
}

// Wait until BrowserStack is available
waitUntilReady = async() => {
  let browserStackBusy = isBusy();
  while(browserStackBusy) {
    // Check every 10 seconds if BrowserStack is still busy        
    console.log('[BrowserStack.cjs] BrowserStack is busy; waiting 10 seconds');
    browserStackBusy = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(isBusy()), 10000)
    });
  }
}

// Construct a build name (for BrowserStack logs) given branch, testrun, and test
createBuildName = (branch, testrun, test, trailingSeparator = false) => {
  let buildName = '';
  if (branch !== undefined) {
    buildName += branch;
    if (testrun !== undefined) {
      buildName += ':' + testrun;
      if (test !== undefined) {
        buildName += ':' + test;
      } 
    }
  }     
  if (trailingSeparator) {
    buildName += ':';
  }
  return buildName;
} 

module.exports = {
  getProjectIdByName: getProjectIdByName,
  getBuildsByProjectId: getBuildsByProjectId,
  getBrowsers: getBrowsers,
  getBuildIds: getBuildIds,
  getSessionsByBuildName: getSessionsByBuildName,
  deleteOneBuild: deleteOneBuild,
  deleteAllBranchesExcept: deleteAllBranchesExcept,
  deleteAllBuildsStartingWith: deleteAllBuildsStartingWith,
  terminateWorkersByBuildName: terminateWorkersByBuildName,
  createBuildName: createBuildName,
  isBusy: isBusy,
  waitUntilReady: waitUntilReady
};