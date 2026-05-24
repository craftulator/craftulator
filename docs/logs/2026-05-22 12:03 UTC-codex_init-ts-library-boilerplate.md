# Task Discussion Summary

- The user reported a GitHub CI failure caused by `package-lock.json` being out of sync with `package.json`.
- The CI error identified missing `@emnapi/core@1.10.0` and `@emnapi/runtime@1.10.0` lockfile entries.
- The CI error also identified a Node.js engine mismatch: `listr2@10.2.1` requires Node `>=22.13.0`, while the CI matrix
  runs Node `20.20.2`.
- The fix keeps the work on the existing branch, downgrades the existing `lint-staged` dev dependency to a Node
  20-compatible exact version, and regenerates the lockfile with npm 10 compatibility.
