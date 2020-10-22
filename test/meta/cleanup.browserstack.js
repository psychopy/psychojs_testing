const child_process = require('child_process');
// buildName to delete
let buildName = process.argv.pop();
// Prefix of curl command
const curlPrefix = 'curl -u "' + process.env.BROWSERSTACK_USER + ':' + process.env.BROWSERSTACK_ACCESSKEY + '"';

// Get the last 5 builds and extract buildId of buildName build
console.log('cleanup.browserstack.js: deleting Browserstack logs with buildName ' + buildName);
const builds = JSON.parse(
  child_process.execSync(
    curlPrefix + 
    ' https://api.browserstack.com/automate/builds.json'
  ).toString()
);
const developmentBuilds = builds.filter((build) => {
  return build.automation_build.name === buildName
});
if (developmentBuilds.length > 0) {
  const buildId = developmentBuilds[0].automation_build.hashed_id;
  console.log('cleanup.browserstack.js: deleting logs with buildId ' + buildId);
  child_process.execSync(
    curlPrefix + 
    ' -X DELETE https://api.browserstack.com/automate/builds/' + buildId + '.json'
  );
} else {
  console.log('cleanup.browserstack.js: did npt find any logs with matching buildName');
}