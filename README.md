# Craftulator

Craftulator is a universal production-chain calculator for games such as Factorio, Dyson Sphere Program, Satisfactory,
and Shapez.

## Project Status

The project is in early foundation work. The planned site includes:

- a home page with a game list;
- an editor for importing, editing, and exporting calculator data;
- future game-specific calculator pages;
- a 404 page for unknown routes.

## Technical Foundation

- Vite React application source in `src/`.
- React Router DOM routing with `BrowserRouter` and no `basename`.
- React Intl provider and local `defineMessages()` descriptors.
- TypeScript strict mode.
- Vitest, jsdom, and Testing Library tests.
- ESLint and Prettier checks.
- Root-path Vite deployment for `https://craftulator.github.io/`.

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

- `src/main.tsx` mounts the app and wraps it in `BrowserRouter`.
- `src/app/app-routes.tsx` defines the route table.
- `src/app/app-intl-provider.tsx` wires React Intl.
- `src/utils/intl.ts` exports the shared `@intl` instance for non-component code.

## Documentation

Project documentation lives in `docs/`. The implementation roadmap is in `docs/roadmap.md`.
