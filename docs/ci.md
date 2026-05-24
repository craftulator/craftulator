# Continuous Integration

## Pull Requests

The CI workflow runs on pull requests targeting `main` and on pushes to `main`. It installs dependencies with `npm ci`
and runs `npm run check` on the Node.js version pinned in `.nvmrc`.

To prevent merging when tests or linters fail, configure the repository's `main` branch protection or ruleset in GitHub
to require the CI status checks:

- `Node 24.16.0`

GitHub branch protection is repository settings state, not a workflow file. The workflow provides the required status
checks; the repository settings must mark them as required.
