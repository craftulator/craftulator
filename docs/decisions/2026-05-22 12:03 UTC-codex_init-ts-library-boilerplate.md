- Context: CI runs `npm ci` on Node 20, 22, and 24. npm 10 on Node 20 rejected the lockfile because optional `@emnapi`
  package entries were missing, and `lint-staged@17.0.5` depended on packages requiring newer Node versions.
- Decision: Use `lint-staged@16.2.7`, which supports Node `>=20.17`, and regenerate `package-lock.json` with npm 10 so
  optional dependency entries required by `npm ci` are present.
- Consequences: The CI matrix can keep Node 20 coverage, `npm ci` works with npm 10, and the pre-commit workflow remains
  available through Husky and lint-staged.
- Status: accepted
