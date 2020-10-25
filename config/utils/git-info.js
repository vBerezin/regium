const child_process = require('child_process');

const localBranch = String(child_process.spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout).trim().toLowerCase();
const localCommit = String(child_process.spawnSync('git', ['rev-parse', localBranch]).stdout).trim().toLowerCase();
const gitlabCommit = process.env.CI_COMMIT_SHORT_SHA;

module.exports = {
  branch: localBranch,
  commit: gitlabCommit || localCommit,
};
