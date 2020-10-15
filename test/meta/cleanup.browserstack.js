const child_process = require('child_process');
const curlPrefix = 'curl -u "' + process.env.BROWSERSTACK_USER + ':' + process.env.BROWSERSTACK_ACCESSKEY + '"';

// Get the last 5 builds and extract buildId of "development" build
console.log("Deleting old BrowserStack logs");
const builds = JSON.parse(
  child_process.execSync(
    curlPrefix + 
    ' https://api.browserstack.com/automate/builds.json'
  ).toString()
);
const developmentBuilds = builds.filter((build) => {
  return build.automation_build.name === 'development'
});
if (developmentBuilds.length > 0) {
  const buildId = developmentBuilds[0].automation_build.hashed_id;
  // Delete "development" build
  child_process.execSync(
    curlPrefix + 
    ' -X DELETE https://api.browserstack.com/automate/builds/' + buildId + '.json'
  );
}