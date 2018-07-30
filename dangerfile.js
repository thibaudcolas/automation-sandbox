const { danger, message, warn, fail, schedule } = require("danger");

const hasLabels = danger.github.issue.labels.length !== 0;

if (!hasLabels) {
  message("What labels should we add to this PR?");
}

// Fails if the description is too short.
if (!danger.github.pr.body || danger.github.pr.body.length < 10) {
  fail(":grey_question: This pull request needs a description.");
}

// Warns if the PR title contains [WIP]
const isWIP = danger.github.pr.title.includes("WIP");
if (isWIP) {
  const title = ":construction_worker: Work In Progress";
  const idea =
    "This PR appears to be a work in progress, and may not be ready to be merged yet.";
  warn(`${title} - <i>${idea}</i>`);
}
