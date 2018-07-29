const pkg = require("./package.json");

const CHANGELOG_HEADER = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).
`;

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
      successComment:
        ":tada: This issue has been resolved in version ${nextRelease.version} :tada:\n\nThe release is available on [GitHub release](<github_release_url>)",
    },
  ],
  fail: ["@semantic-release/github"],
};
