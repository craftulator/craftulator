# react-router-dom-llm-template

A React, React Router DOM, and React Intl application template for LLM-assisted development.

## Features

- Vite React application source in `src/`.
- React Router DOM route setup for home, about, and not-found pages.
- React Intl provider and message catalog structure.
- TypeScript strict mode.
- Vitest, jsdom, and Testing Library tests.
- ESLint and Prettier checks.
- GitHub Actions CI for full template verification.

## Commands

```sh
npm run dev
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run preview
npm run check
```

## Application Entry

- `src/main.tsx` mounts the app.
- `src/routing/AppRoutes.tsx` defines browser routes.
- `src/i18n/AppIntlProvider.tsx` wires React Intl.
- `src/i18n/messages.ts` stores supported locales and messages.

## Documentation

Project documentation lives in `docs/`.
