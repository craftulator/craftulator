# Development

## Requirements

- Node.js `v24.16.0`, as pinned in `.nvmrc`
- npm `>=10`

## Install

```sh
nvm use
npm install
```

The repository uses `.npmrc` with `save-exact=true`. All dependencies must be recorded with exact versions in
`package.json`.

If an existing package is a good fit for a task, propose installing it instead of hand-rolling the functionality.

Before adding any new dependency, ask the user for explicit permission.

When adding a dependency, use:

```sh
npm install --save-exact <package>
npm install --save-dev --save-exact <package>
```

Do not commit dependency versions with `^` or `~` ranges.

## Workflow

Stay on the current branch unless the user explicitly asks for a different branch. Run the relevant checks, then commit
small logical changes to the current branch after verification. Do not put unrelated changes into one commit.

Pre-commit checks are managed by Husky and lint-staged. The pre-commit hook runs linters and Prettier only for staged
files.

Use npm scripts as the source of truth:

```sh
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run preview
npm run check
```

Do not edit generated `dist/` files manually.

## Code Style

- Use kebab-case for code and config file names. Standard files such as `README.md`, `LICENSE`, `AGENTS.md`, and
  historical log or decision filenames are exempt.
- Use separate `import type` declarations for TypeScript types.
- Do not mix type imports and runtime value imports in the same import statement.
- Use `useIntl()` and local `defineMessages()` descriptors for UI text. Do not use `FormattedMessage` or other React
  Intl formatting components.
- Keep `src/pages` as URL-shaped re-export files from `@templates`; page implementation code belongs in `src/templates`.
