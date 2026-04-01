const core = require('@actions/core');
const exec = require('@actions/exec');
// const github = require('@actions/github');

// function run() {
//   core.notice('Hello from my custom JavaScript Action!');
// }

function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl); // echo "website-url=..." >> $GITHUB_OUTPUT

  // to interact with the GitHub API, we can use the @actions/github package
  // e.g., to comment on the PR that the site has been deployed
  // github.getOctokit(process.env.GITHUB_TOKEN).rest.issues.createComment({
  //   ...github.context.repo,
  //   issue_number: github.context.issue.number,
  //   body: `Deployed to ${websiteUrl}`
  // });

  //Or
  // e.g., to get the name of the workflow that triggered the action
  // github.context.action
}

run();