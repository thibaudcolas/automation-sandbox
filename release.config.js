const pkg = require("./package.json");

module.exports = {
  release: {
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
      releaseRules: [
        {
          type: "docs",
          scope: "README",
          release: "patch",
        },
        {
          type: "refactor",
          release: "patch",
        },
      ],
    },
    verifyRelease: [],
    generateNotes: ["@semantic-release/release-notes-generator"],
    prepare: [
      {
        path: "@semantic-release/changelog",
        changelogFile: "CHANGELOG.md",
      },
      "@semantic-release/npm",
      {
        path: "@semantic-release/git",
        message:
          "chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    publish: [
      "@semantic-release/changelog",
      "@semantic-release/npm",
      {
        path: "@semantic-release/git",
        assets: ["package.json", "package-lock.json", "CHANGELOG.md"],
      },
      {
        path: "@semantic-release/github",
        assets: [
          "package.json",
          {
            path: pkg.main,
            label: "CommonJS",
          },
          {
            path: pkg.module,
            label: "ES modules",
          },
        ],
      },
    ],
    success: ["@semantic-release/github"],
    fail: ["@semantic-release/github"],
  },
};
