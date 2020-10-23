// Helper functions for making calls to the GitHub REST API

// Default repo
const repoName = "tpronk/e2e_robot";

// Get branch names of default repo
getBranchNames = () => {
  let branches = JSON.parse(child_process.execSync(
    'curl https://api.github.com/repos/' + repoName + '/branches'
  ));
  let branchNames = branches.map((branch) => {
    return branch.name;
  })  
  return branchNames;
}

module.exports = {
  getBranchNames: getBranchNames
};
  