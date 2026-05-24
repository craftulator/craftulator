# Agent Instructions

These instructions apply to the whole repository.

## Language

- Write all documentation in English, regardless of the language used by the user.
- Keep commit messages, code comments, release notes, and docs clear and concise.

## Dependency Policy

- If an existing package is a good fit for a task, propose installing it instead of hand-rolling the functionality.
- Ask the user for explicit permission before adding any new dependency.
- Always use exact dependency versions.
- Do not add semver ranges such as `^` or `~` to `package.json`.
- Keep `save-exact=true` in `.npmrc`.
- Use `npm install --save-exact` when adding or updating dependencies.

## Branch And Commit Workflow

- Work on the current branch unless the user explicitly asks for a different branch.
- Run the relevant tests and checks before committing.
- After verification, commit changes to the current branch without asking for additional confirmation.
- Keep commits small, logical, and reviewable. Do not batch unrelated changes into one commit.
- Preserve user changes. Do not revert unrelated edits unless the user explicitly asks for it.

## Code Style

- Use kebab-case for code and config file names. Standard repository files such as `README.md`, `LICENSE`, `AGENTS.md`,
  and historical log or decision filenames are exempt.
- Import TypeScript types only with separate `import type` declarations.
- Do not mix imported types and runtime values in the same import statement.
- Use `react-intl` through `useIntl()` and local `defineMessages()` descriptors. Do not use `FormattedMessage` or other
  formatting components from `react-intl`.

## Architecture

- Follow an FSD-like structure.
- App routes must import route components from `@pages`.
- `src/pages` mirrors the URL structure and only re-exports from `@templates`.
- Page implementation code belongs in `src/templates`.
- Shared route-independent constants belong in `src/consts`.
- `src/consts/index.ts` must only re-export other constants files.
- Use constant prefixes by kind:
  - localStorage keys: `src/consts/ls.ts`, `LS__[VARIABLE_NAME]`
  - environment values: `src/consts/env.ts`, `ENV_[VARIABLE_NAME]`
  - runtime values: `src/consts/rt.ts`, `RT_[VARIABLE_NAME]`
  - links: `src/consts/links.ts`, `LINK_[VARIABLE_NAME]`
  - cookie keys: `src/consts/cookie.ts`, `COOKIE_[VARIABLE_NAME]`
- Ask the user before introducing a new constants category.
- Use `@intl` for the shared `createIntl()` instance when `useIntl()` cannot be called.

## Component Structure

Use this structure for React components when the corresponding files are needed:

```text
component-name/
  index.ts
  ui.tsx
  ui.tests.ts
  ui.stories.tsx
  styles.module.scss
  types.ts
  consts.ts
  model.ts
  messages.ts
  lib/
  ui/
```

Example `messages.ts`:

```ts
import {defineMessages} from 'react-intl';

export const messages = defineMessages({
  example: {
    id: 'example',
    defaultMessage: 'Example text',
  },
});
```

## Tests

- Non-e2e tests must live next to the file they cover.
- Name non-e2e test files as the covered file name plus `.tests`, for example `ui.tests.ts` or `app-routes.tests.tsx`.

## Documentation Logs

- Store summaries of task discussions with the user in `docs/logs/`.
- Store summaries of decisions made by the agent in `docs/decisions/`.
- Name log and decision files with this pattern:

```text
[YYYY-MM-DD HH:mm UTC]-[CURRENT_BRANCH_NAME].md
```

- If a branch name contains path separators, replace them by "\_".
- Decision files must use this template:

```md
- Context:
- Decision:
- Consequences:
- Status: proposed | accepted | superseded
```

## Project Commands

- Use npm scripts as the source of truth.
- Run `npm run check` before finalizing broad changes.
- Do not edit generated `dist/` files manually.
- Verify the work before reporting completion.
