# Testing

## Unit Tests

Non-e2e tests must live next to the file they cover. Name test files as the covered file name plus `.tests`, for example
`ui.tests.ts` or `app-routes.tests.tsx`.

Run unit tests with:

```sh
npm run test
```

Run coverage with:

```sh
npm run test:coverage
```

## Full Verification

Before finalizing a task, run:

```sh
npm run check
```

This command runs type checking, linting, formatting checks, tests, and the Vite production build.
