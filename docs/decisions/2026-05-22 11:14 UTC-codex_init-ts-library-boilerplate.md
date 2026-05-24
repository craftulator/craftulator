- Context: Pull request checks and release publishing need safer automation before real npm publication is enabled.
- Decision: Keep CI on pull requests and pushes to `main`, document required GitHub branch protection status checks,
  trigger the publish workflow from `v*.*.*` tags, replace `npm publish` with a dry-run log message, and use Husky with
  lint-staged for staged-file pre-commit checks.
- Consequences: Pull requests expose required check statuses for branch protection, version-tag workflow behavior can be
  validated without publishing to npm, and local commits run focused linting and formatting on staged files.
- Status: accepted
