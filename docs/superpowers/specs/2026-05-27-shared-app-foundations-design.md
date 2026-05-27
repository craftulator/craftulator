# Shared App Foundations Design

## Context

Milestone 4 adds reusable app foundations before the home and editor pages become feature-rich. The work builds on the
existing FSD-like route structure: routes import from `@pages`, page files re-export templates, and implementation stays
under `src/templates` or shared route-independent modules.

The site must use Ant Design v5. The project does not currently include `antd`, so this milestone will add `antd@5.29.3`
as an exact dependency with `npm install --save-exact`.

## User-Approved Direction

Use route-owned theme and help configuration. Each route template owns the current page theme and help summary, while
the root layout renders shared app chrome around the active route.

This keeps `/editor` ready to update the theme from editor form state in later milestones without putting editor state
in global route configuration.

## Architecture

Theme definitions will be exposed from shared constants based on `assets/themes/themes.json`. Runtime defaults and route
links will stay in `src/consts` using the required constant prefixes.

The root layout will provide a small app shell context with these responsibilities:

- hold the current theme key, defaulting to `general`;
- hold the current page help summary;
- expose route-safe setters through a hook used by templates;
- apply theme values through Ant Design `ConfigProvider` and CSS variables;
- render the fixed header, main outlet, help modal, and common footer.

The route templates will call the hook on mount to set page-specific shell state. Home and 404 use the `general` theme.
The editor uses `general` for now and can switch to editor form state in later milestones.

## Components

`ThemeLogo` explicitly imports every theme logo image from `assets/themes/images` and renders the logo for the current
theme key. This keeps image paths known to Vite and avoids public-directory assumptions.

`CommonFooter` renders the shared rights notice that game rights belong to their respective owners.

`GameInfo` accepts optional name, image, description, and link fields. Missing values render clear placeholders so home
and editor work can reuse the same block before real game data exists.

The header renders the theme logo, Craftulator brand, a `Create` link to `/editor`, and a help icon button. The `Create`
link is hidden while the current pathname is `/editor`.

## Localization

All user-facing text added in this milestone uses local `defineMessages()` descriptors and `useIntl()`. Shared
components keep their messages next to the component.

## Testing

Focused tests will cover:

- the selected route renders inside the shared shell;
- the `Create` link is present outside `/editor` and hidden on `/editor`;
- the help button opens route-specific help content;
- the shell applies the current theme to the app root;
- `GameInfo` renders placeholders for missing name, image, description, and link.

## Out Of Scope

This milestone does not add the home game list, editor state persistence, editor form fields, calculator routes, or real
game data. Those remain scheduled for later milestones.
