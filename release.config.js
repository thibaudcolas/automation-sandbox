const pkg = require("./package.json");

const CHANGELOG_HEADER = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), enforced with [semantic-release](https://github.com/semantic-release/semantic-release).
`;

const SUCCESS_COMMENT = `:tada: This \${issue.pull_request ? 'pull request is included' : 'issue is fixed'} in version v\${nextRelease.version}. Get [${
  pkg.name
}@\${nextRelease.version} on npm](https://www.npmjs.com/package/${pkg.name}).`;

/**
 * See:
 * https://semantic-release.gitbook.io/semantic-release/
 * https://github.com/semantic-release/npm
 * https://github.com/semantic-release/github
 * https://github.com/semantic-release/git
 * https://github.com/semantic-release/release-notes-generator
 * https://github.com/semantic-release/commit-analyzer
 * https://github.com/semantic-release/changelog
 */
module.exports = {
  branch: "master",
  tagFormat: "v${version}",
  npmPublish: true,
  tarballDir: "dist",
  assets: "dist/*.tgz",
  verifyConditions: [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github",
  ],
  analyzeCommits: {
    preset: "angular",
  },
  verifyRelease: [],
  generateNotes: ["@semantic-release/release-notes-generator"],
  prepare: [
    {
      path: "@semantic-release/changelog",
      changelogFile: "CHANGELOG.md",
      changelogTitle: CHANGELOG_HEADER,
    },
    "@semantic-release/npm",
    {
      path: "@semantic-release/git",
      message:
        "chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
    },
  ],
  publish: [
    "@semantic-release/npm",
    {
      path: "@semantic-release/github",
      assets: ["dist/*.tgz"],
    },
  ],
  success: [
    {
      path: "@semantic-release/github",
      successComment: SUCCESS_COMMENT,
    },
  ],
  fail: ["@semantic-release/github"],
};
