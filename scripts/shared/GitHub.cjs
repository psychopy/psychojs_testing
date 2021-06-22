// Helper functions for making calls to the GitHub REST API

// Module for OS calls
const child_process = require('child_process');

// Default repo
const repoName = "psychopy/psychojs";

// Get branch names of default repo
getBranchNames = () => {
  let branches = JSON.parse(child_process.execSync(
    'curl -s https://api.github.com/repos/' + repoName + '/branches'
  ));
  let branchNames = branches.map((branch) => {
    return branch.name;
  })  
  return branchNames;
}

module.exports = {
  getBranchNames: getBranchNames
};
  