# Architecture

## Application Shape

This repository is a Vite single-page application for Craftulator, a universal production-chain calculator for games. It
uses React, React Router DOM, React Intl, and AntD v5.

The app starts in `src/main.tsx`, mounts into `index.html`, and renders routes from `src/app/app-routes.tsx`.
`src/layouts/root` owns the shared shell and route outlet.

## FSD-Like Layers

The project follows an FSD-like structure:

- `src/app`: application wiring, providers, and route definitions.
- `src/pages`: URL-shaped route exports only.
- `src/templates`: page implementations and page-level messages.
- `src/layouts`: reusable route layouts.
- `src/entities`, `src/features`, `src/widgets`: future FSD layers.
- `src/shared`: shared components, hooks, helpers, utils, libs, and types.
- `src/utils`: project-wide utilities such as the `@intl` instance.
- `src/consts`: project-wide constants.

`src/pages` must mirror the real URL structure. Files inside `src/pages` only re-export templates from `@templates`;
they do not contain UI or business logic. App routes import page components only from `@pages`.

## Routing

Routes are declared with React Router DOM and must use `BrowserRouter` without `basename`, because the target GitHub
Pages URL is the root-path organization site `https://craftulator.github.io/`.

- `/`: home page with a hardcoded starter game list.
- `/editor`: recipe and calculator data editor.
- `/games/:gameId/calculator`: not registered yet; links may point to this shape, but they currently resolve through the
  404 page.
- `*`: localized not-found page.

`AppRoutes` is exported so tests and future templates can render the same route tree used by the browser entrypoint.

GitHub Pages must include a `404.html` fallback so direct navigation to client-side routes can load the single-page
application.

## Internationalization

`AppIntlProvider` wraps the app with React Intl. UI code formats messages through `useIntl()` and local
`defineMessages()` descriptors. `FormattedMessage` and other React Intl formatting components are not used.

The `@intl` alias points to `src/utils/intl.ts`, which exports a shared `createIntl()` instance for places where hooks
cannot be called, such as modal APIs or other non-component code.

## Constants

Global constants live in `src/consts`. `src/consts/index.ts` only re-exports constants from specialized files:

- localStorage keys: `ls.ts`, `LS__[VARIABLE_NAME]`
- environment values: `env.ts`, `ENV_[VARIABLE_NAME]`
- runtime values: `rt.ts`, `RT_[VARIABLE_NAME]`
- links: `links.ts`, `LINK_[VARIABLE_NAME]`
- cookie keys: `cookie.ts`, `COOKIE_[VARIABLE_NAME]`

Ask the user before adding a new constants category.

## Component Structure

Use this component structure when the corresponding files are needed:

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
  images/
  lib/
  ui/
```

Store images that belong to a specific component in that component's `images/` directory. Shared or global image assets
should remain in their owning shared asset location until a component explicitly imports them.

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

## Build Tool

Vite builds the app into `dist/`. The TypeScript compiler is used for strict type checking through `npm run typecheck`.
