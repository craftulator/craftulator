# Craftulator Roadmap

This roadmap fixes the implementation order for the Craftulator site. It records the plan only; implementation happens
in later tasks.

## Principles

- Keep the app buildable after each small step.
- Implement the full requested scope, but split large features into reviewable increments.
- Ask for explicit permission before adding any new dependency.
- Use exact dependency versions when dependencies are approved.
- Keep CI/CD and GitHub Pages deployment work until the end.
- Use `npm run check` before broad completion points.

## Milestone 1: Project Foundation

- [x] Update project metadata for Craftulator in `package.json`, `README.md`, and related documentation.
- [ ] Confirm the repository is hosted under the `craftulator` GitHub organization.
- [x] Configure Vite for root-path deployment with `base: '/'`.
- [x] Keep `BrowserRouter` without `basename`.
- [x] Verify TypeScript path aliases and FSD-like boundaries match the planned app structure.
- [x] Run relevant checks for configuration-only changes.

## Milestone 2: Basic Branding And Static Assets

- [ ] Generate production favicon assets from `assets/fav-icon/image.png`.
- [ ] Wire favicon files into `index.html`.
- [ ] Update the document `<title>` to `Craftulator`.
- [ ] Update package and app display names where they still reference the template.
- [ ] Add theme logo assets from `assets/themes/images` through normal app imports or public assets.
- [ ] Verify favicon and title in a local browser.

## Milestone 3: Base Routing And 404 Behavior

- [ ] Create the main route table.
- [ ] Add the home route at `/`.
- [ ] Add the editor route at `/editor`.
- [ ] Do not register `/games/:gameId/calculator` yet.
- [ ] Add a 404 route for all unmatched paths.
- [ ] Add a `404.html` fallback for GitHub Pages and `BrowserRouter`.
- [ ] Verify direct navigation and reload behavior for `/`, `/editor`, and an unknown route.

## Milestone 4: Shared App Foundations

- [ ] Add shared theme constants based on `assets/themes/themes.json`.
- [ ] Add shared route-independent constants in `src/consts` using the required prefixes.
- [ ] Add React Intl message structure with local `defineMessages()` descriptors.
- [ ] Add a root app shell that applies the current theme.
- [ ] Add a fixed header with the theme logo, Create link, and help button.
- [ ] Hide the Create link on `/editor`.
- [ ] Add per-page help modal summaries.
- [ ] Add `CommonFooter` with the game rights notice.
- [ ] Add `GameInfo` with placeholders for missing game name, image, description, and link.
- [ ] Cover shared behavior with focused component tests where useful.

## Milestone 5: Home Page

- [ ] Add temporary hardcoded game data for Factorio, Dyson Sphere Program, Satisfactory, and Shapez.
- [ ] Apply the `general` theme on the home page.
- [ ] Add a case-insensitive game-name filter input.
- [ ] Add a game list with name, optional description, image, and calculator link.
- [ ] Make calculator links point to `/games/:gameId/calculator`.
- [ ] Verify calculator links currently resolve through the 404 page.
- [ ] Add focused tests for filtering and link generation.

## Milestone 6: Editor Page Shell

- [ ] Create the `/editor` template and route export.
- [ ] Apply the selected editor theme to the page.
- [ ] Add the `GameInfo` preview wired to editor form state.
- [ ] Add the editor header with title and Clear data button.
- [ ] Add localStorage persistence and reload restoration.
- [ ] Add the import button and JSON file reading shell.
- [ ] Add the export button shell.
- [ ] Add tests for persistence, clear behavior, and basic import/export entry points.

## Milestone 7: Editor Game Configuration

- [ ] Add game name input.
- [ ] Add game logo upload with 160x160 minimum and 1000x1000 maximum validation.
- [ ] Add store or site link input.
- [ ] Add description textarea.
- [ ] Add theme selection and update the current page theme immediately.
- [ ] Add production period selection for Minute, Hour, and Day.
- [ ] Store production periods as seconds.
- [ ] Add tests for state updates and production period serialization.

## Milestone 8: Editor Data Model And Validation

- [ ] Define the `GameCalculatorData` TypeScript model.
- [ ] Add default empty editor state.
- [ ] Add import validation for the full JSON shape.
- [ ] Allow empty strings during import validation.
- [ ] Remove broken images from affected image fields during import while keeping the surrounding entity.
- [ ] Preserve valid imported factories, groups, goods, recipes, and icons.
- [ ] Add export validation for required fields and recipe goods requirements.
- [ ] Scroll to the first invalid field and show a useful hint on export validation failure.
- [ ] Add tests for valid import, broken image cleanup, empty strings during import, and invalid export.

## Milestone 9: Editor Icons Panel

- [ ] Add the sticky added-icons panel.
- [ ] Render icon previews at 64x64 regardless of physical image dimensions.
- [ ] Add icon delete buttons.
- [ ] Ensure deleting an icon does not update factories, goods, or recipes that already copied the base64 string.
- [ ] Add drag source behavior for icons.
- [ ] Add tests for icon deletion and copied image independence.

## Milestone 10: Full Icon-Adding Flow

- [ ] Add image file selection for source sheets or images.
- [ ] Open a modal with source image preview.
- [ ] Add icon sizing mode selection: manual and fixed size.
- [ ] Add fixed width and height input when fixed size is selected.
- [ ] Enforce 32x32 minimum and 256x256 maximum icon sizes.
- [ ] Add mouse selection for icon areas.
- [ ] Display selected dimensions inside each selected icon area.
- [ ] Allow selected icon areas to be dragged.
- [ ] Add preview zoom controls for precise selection.
- [ ] Update existing selections when sizing mode or fixed size values change.
- [ ] Add Cancel behavior that discards pending selections.
- [ ] Add Add icons behavior that crops selected areas to base64 strings and appends them to `icons`.
- [ ] Add tests for sizing rules, selection state, cancel behavior, and generated icon insertion.

## Milestone 11: Editor Factories

- [ ] Add factory list rendering.
- [ ] Add factory creation.
- [ ] Add 64x64 factory image placeholder.
- [ ] Add dropping an icon onto a factory to copy its base64 string.
- [ ] Add factory name input for `en`.
- [ ] Add factory ordering via drag and drop.
- [ ] Add delete confirmation modal.
- [ ] Delete recipes involving a factory after confirmed factory deletion.
- [ ] Add tests for creation, icon assignment, reorder, and destructive delete behavior.

## Milestone 12: Editor Goods And Groups

- [ ] Add goods group list rendering.
- [ ] Add group creation.
- [ ] Add group name input for `en`.
- [ ] Add group ordering via drag and drop.
- [ ] Add goods list rendering inside each group.
- [ ] Add goods creation.
- [ ] Add 64x64 goods image placeholder.
- [ ] Add dropping an icon onto goods to copy its base64 string.
- [ ] Add goods name input for `en`.
- [ ] Add goods ordering inside a group.
- [ ] Add moving goods between groups.
- [ ] Add delete confirmation for goods.
- [ ] Delete recipes involving a goods item after confirmed goods deletion.
- [ ] Add delete confirmation for groups.
- [ ] Delete recipes involving any goods from a group after confirmed group deletion.
- [ ] Add tests for group and goods creation, icon assignment, moving, reorder, and destructive deletes.

## Milestone 13: Editor Recipes

- [ ] Add recipe list rendering.
- [ ] Add recipe creation.
- [ ] Add recipe name input.
- [ ] Add optional recipe icon assignment by dropping an icon.
- [ ] Use the first output goods icon when a recipe has no explicit icon.
- [ ] Add recipe factory rows.
- [ ] Add factory selection for each recipe factory row.
- [ ] Add required efficiency input in percent.
- [ ] Add delete button for recipe factory rows.
- [ ] Add recipe goods rows.
- [ ] Add goods selection for each recipe goods row.
- [ ] Add amount input for the selected production period at base 100 percent efficiency.
- [ ] Add input/output selection for each recipe goods row.
- [ ] Add delete button for recipe goods rows.
- [ ] Add recipe goods ordering via drag and drop.
- [ ] Add tests for recipe icon fallback, factory rows, goods rows, and validation rules.

## Milestone 14: Editor Import And Export Completion

- [ ] Export valid form data as `GAME_CALCULATOR_DATA`.
- [ ] Base the downloaded JSON file name on the game name.
- [ ] Replace all form data when importing a valid JSON file.
- [ ] Keep the editor responsive while parsing and validating imported JSON.
- [ ] Show clear import errors without losing current form data.
- [ ] Add regression tests for import replacement, export file naming, and invalid import preservation.

## Milestone 15: Polish And Accessibility

- [ ] Verify keyboard navigation for header, modals, forms, and drag-and-drop alternatives where practical.
- [ ] Verify color contrast across all available themes.
- [ ] Verify responsive layout on mobile and desktop widths.
- [ ] Verify text does not overflow controls or cards.
- [ ] Verify help modal summaries for the home, editor, and 404 pages.
- [ ] Run `npm run check`.

## Milestone 16: CI/CD And GitHub Pages Deployment

- [ ] Add or update GitHub Actions checks for typecheck, lint, format, tests, and build.
- [ ] Configure GitHub Pages deployment for the organization Pages site at `https://craftulator.github.io/`.
- [ ] Ensure the build uses root-path assets with Vite `base: '/'`.
- [ ] Ensure the deployment includes the `404.html` fallback.
- [ ] Verify the deployed `/`, `/editor`, and unknown routes after release.
- [ ] Document the release and deployment workflow in `docs/ci.md`.
