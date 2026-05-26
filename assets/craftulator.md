# Craftulator

## General Information

We want to create a website for a universal production-chain calculator for games, such as Factorio or DSP. The site
name is Craftulator.

The site must consist of three main pages:

- a home page with a list of games (`"/"`)
- a page for creating and editing recipes for a game (`"/editor"`)
- a calculator page for a specific game (`"/games/:gameId/calculator"`); do not implement it for now, links should lead
  to 404 for the time being
- additionally, a 404 page for all other routes

## Architecture

- Use the current repository as the foundation.
- Use BrowserRouter with a 404.html fallback.
- Use the root domain for GitHub Pages.

## Language

Initially, build the site in English using react-intl.

## Deployment

The site must be deployed to GitHub Pages; configure CI accordingly.

## Technology Stack

The site must be based on AntD v5.

If new dependencies are needed, ask the user for confirmation before install.

## Data and Assets

### Fav Icon

The fav icon draft is located at `assets/fav-icon/image.png`.

### Themes

Available site themes:

```ts
type Theme =
  | 'general'
  | 'precise'
  | 'engineering'
  | 'space'
  | 'alchemical'
  | 'fantasy'
  | 'biological'
  | 'animal'
  | 'medieval'
  | 'futuristic'
  | 'esoteric';
```

Color information for themes is located in `assets/themes/themes.json`.

Logos for each theme are located in `assets/themes/images`.

### Calculator Information

The main data source for calculators is a JSON object (hereinafter `GAME_CALCULATOR_DATA`):

```ts
type GameCalculatorData = {
  game: {
    name: string;
    image: string; // base64, min 160x160px, max 1000x1000px
    link: string; // link to a store (for example Steam) or the game's website; during import, any value is allowed, including an empty string
    description: string; // field for adding calculator information, for example the game version or the calculator author's name, could be empty string
    theme: Theme;
    productionPeriod: number; // for example 60 for 1 minute
  };
  icons: string[]; // array of base64 images
  factories: {
    id: string; // use nanoid
    name: {
      en: string; // right now only in en
    };
    image: string; // base64 string copied from icons
  }[];
  groups: {
    id: string; // use nanoid
    name: {
      en: string; // right now only in en
    };
    goods: {
      id: string; // use nanoid
      name: {
        en: string; // right now only in en
      };
      image: string; // base64 string copied from icons
    }[];
  }[];
  recipes: {
    id: string; // use nanoid
    factories: {
      factoryId: string;
      efficiency: number;
    }[];
    image?: string; // base64 string copied from icons
    name: {
      en: string; // right now only in en
    };
    goods: {
      // goods must contain at least one item during validation
      type: 'input' | 'output';
      goodId: string;
      amount: number;
    }[];
  }[];
};
```

- The site works without a backend and generates calculator pages for games from a list of `.json` files with
  `GAME_CALCULATOR_DATA` during the build.
- The `/editor` page allows importing and exporting data in the `GAME_CALCULATOR_DATA` format.
- The `icons` field stores base64 strings that can be copied into factory, goods, and recipe image fields. These image
  fields keep their own copied base64 value, so deleting an item from `icons` does not update or remove images already
  assigned to factories, goods, or recipes.
- Information about the data source for the home page will be added later.
- Information about generating the calculator page for an individual game will be added later.
- New games are added through a pull request.

## Detailed Description of Templates and Pages

### Common Elements

- Game information block (`GameInfo`)
  - game name (with a placeholder)
  - game logo/image (with a placeholder)
  - description (optional)
  - store/site link (optional)
- Footer with a notice that all rights to games belong to their respective owners (`CommonFooter`)

### Main Layout

Elements:

- fixed header
  - logo on the left (different logo variants depending on the current theme)
  - on the right, a "Create" link button that navigates to `/editor` (this button is hidden on the `/editor` page
    itself)
  - to the right of that button, a "?" icon button that opens a modal with help for the current page; for now, include a
    summary for the page, and we will return to this later
- main scrollable content
- `CommonFooter`

### Home Page

Data:

- sample data for generating the home page will be added later; for now, create a hardcoded design with 4 games:
  Factorio, Dyson Sphere Program, Satisfactory, and Shapez

Theme:

- the home page always uses the `general` theme

Elements:

- a simple form with an input for filtering the game list by name (case-insensitive search)
- game list, where each item includes:
  - game name
  - description (optional)
  - game logo/image
  - link to navigate to the calculator for the specific game
- `CommonFooter`

### Editor Page

Stages:

- building the editor page must be split into stages and done incrementally

Import:

- when importing a JSON file, validate it; if the file is valid, replace all form data with the data from the file
- during validation:
  - empty string values are considered valid
  - broken images are removed from the affected image field, but the surrounding entity is kept

Persistence:

- form data must be written to localStorage and loaded from there after a page reload

Theme:

- depends on the current selection in the form

Elements:

- `GameInfo` block that takes information from the form
- form for entering or editing information
  - header
    - title on the left side
    - "Clear data" button on the right side
  - section with main game information
    - input for the game name
    - button for choosing the game logo/image from the computer, min 160x160px, max 1000x1000px
    - input for entering the store/site link
    - textarea field for adding calculator information, for example the game version or the calculator author's name,
      could be empty

  - calculator configuration section
    - theme selection for the game (changing the theme must change the theme for the current page)
    - production period selection (1 minute, 1 hour, 1 day); in the UI, the value must be displayed as the words
      "Minute"/"Hour"/"Day", and it must be saved as seconds for the corresponding period

  - added icons section
    - list of added icons
      - icon preview at 64x64 size (independent of the icon's real physical dimensions)
      - cross button for deleting the icon (deleting an icon does not affect factories, goods, or recipes where this
        icon was used)

    - button for adding an icon (starts the icon-adding flow; see below)
    - the added-icons panel must be sticky so icons can always be dragged and dropped from it while scrolling

  - factory management section
    - list of added factories
      - icon (with a placeholder) sized 64x64 with the ability to drag and drop an icon from the list of all icons; an
        icon is required
      - input with the factory name, currently only for `en`, for example "Factory"; required field
      - cross button for deleting the factory (on click, show a modal warning that the action is irreversible and will
        delete all recipes involving this factory after confirmation)
      - factories can be dragged and dropped to change their order

    - button for adding a new factory

  - goods management section
    - list of goods groups
      - input with the group name, currently only for `en`, for example "Tier 1"; required field
      - list of goods
        - icon (with a placeholder) sized 64x64 with the ability to drag and drop an icon from the list of all icons; an
          icon is required
        - input with the goods name, currently only for `en`, for example "Steel"; required field
        - cross button for deleting the goods item (on click, show a modal warning that the action is irreversible and
          will delete all recipes involving this goods item after confirmation)
        - goods can be dragged and dropped to change their order within a group or moved to another group
      - button for deleting the group (on click, show a modal warning that the action is irreversible and will delete
        all recipes involving goods from this group after confirmation)
    - groups can be dragged and dropped to change their order
    - button for adding a new group

  - recipe management section
    - list of recipes
      - input with the recipe name
      - icon (with a placeholder) sized 64x64 with the ability to drag and drop an icon from the list of all icons; an
        icon is optional, and if no icon is provided, use the icon of the first output goods item from the recipe

      - list of factories for this recipe
        - each factory in list
          - select for choosing a factory
          - input to set efficiency for this factory, percents, required
          - button to delete factory
        - button to add factory

      - list of goods
        - select for choosing from the list of added goods
        - input for entering the expected amount of goods for the selected period of time for base 100% efficiency
        - cross button for deleting the current goods item
        - select for choosing input/output: input means the goods item is required for the recipe, output means the
          goods item is produced by the recipe
        - goods must be draggable and droppable to change their order in the recipe

  - export button; on click, validate the form
    - if the form is valid, generate and download a JSON file with `GAME_CALCULATOR_DATA`; the file name must be based
      on the game name
    - if any field is invalid, scroll to that field and show some kind of hint

- `CommonFooter`

Icon-adding flow:

- choose an image file from the computer
- open a modal with a preview of the selected image
  - at the top, a select for choosing the icon sizing mode: manual or "fixed size". When "fixed size" is selected, show
    an input for specifying the icon size (width and height). Changing the select value or input affects the icons
    already marked on the preview and changes their size
  - ability to mark icon areas with the mouse (the selected sizes are displayed inside the icons) and drag them
  - ability to zoom the preview for more precise icon selection
  - minimum icon size is 32x32 pixels, maximum icon size is 256x256 pixels
  - at the bottom, "Cancel" and "Add icons" buttons. Clicking "Add icons" adds them to the form in `GameInfo.icons` as
    base64 and displays them in the list of added icons

### Calculator Page for a Game

- Information about this page will be added later; for now, do not create any placeholders and/or perform any work on
  it.
- Do not register a route for `/games/:gameId/calculator` for now. Links to calculator pages must point to that URL
  shape, but the current router should resolve them through the 404 page.
