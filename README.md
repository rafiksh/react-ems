# React Redux Employee Management System

## Description

This is a React.js template fully written in Typescript. The template is based on [Redux](https://redux.js.org/) for global state management, following the "features" or "ducks" pattern. This pattern enforces that all files for a feature are in the same folder, and that all Redux logic for a feature is in a single file. As a result, the template omits the old component-container pattern resulting in smaller chunks of code, significantly less file count, easier debugging and limited use of parent-child props.

## Commands

|    command     |                         action                         |
| :------------: | :----------------------------------------------------: |
| `yarn install` |             Downloads project dependencies             |
|  `yarn start`  |          Runs the app in the development mode          |
|  `yarn test`   | Launches the test runner in the interactive watch mode |
|  `yarn build`  |   Builds the app for production to the build folder    |
|  `yarn serve`  |    Starts a static server to serve production build    |

## Production

- Web:

  - run `yarn build` to perform production build. Build files will be generated in a new directory `/build`.
  - run `yarn serve` to serve production build locally

## Structure

The project root directory structure is as follows:

```
  '|-- <root>',
  '    |-- cli',
  '    |-- public',
  '    |-- readme',
  '    |-- src',
  '        |-- assets',
  '        |-- config',
  '        |-- features',
  '        |   |-- core',
  '        |   |-- employees',
  '        |-- locales',
  '        |-- store',
  '        |-- styled',
  '        |-- utils',
  ''
```

As mentioned before, following the "features" or "ducks" pattern organizes the folders in the following manner:

- [`/public`](public) for public files
- [`/readme`](readme) for assets used in [`README.md`](README.md)
- [`/src`](src) for all source files
- [`src/assets`](src/assets) for assets (.png, .svg, etc ...)
- [`src/config`](src/config) for configuration files (colors, headers, strings, etc ...)
- [`src/features`](src/features) for project features (core, employees, dashboard, settings ...)
- [`src/locales`](src/locales) for i18n localization files (en, ar ...)
- [`src/store`](src/store) for redux configurations (combineReducers, middleware, persist etc ...)
- [`src/styled`](src/styled) for multiple use stateless styled components
- [`src/utils`](src/utils) for utils used throughout the project

### path alias

The template supports path aliases to shorten `import` statements. Ex : for accessing a deeply nested module from another, use `&<some module>/<some file>` instead of `../../<some module>/<some file>` and so on.

For adding new path aliases, follow these two steps:

1. Add `"&<your alias>/*": ["path/to/your/alias/*"]` in [`tsconfig.paths.json`](tsconfig.paths.json)

2. Add `"&<your alias>": path.resolve(__dirname, "path/to/your/alias")` in [`config-overrides.js`](config-overrides.js)

Note:

- You can remove or replace "&" symbol with any other symbol, but make sure to be consistent.

- Reload or restart your IDE or text editor for configurations to appear.

## Project Features

- [Typescript](https://www.typescriptlang.org/) for scalability, code clarity, ease of debugging, etc ...
- [redux-toolkit](https://redux-toolkit.js.org/) toolset for efficient Redux development
- [redux-persist](https://github.com/rt2zz/redux-persist) to persist and rehydrate Redux store
- [react-i18next](https://react.i18next.com/) for internationalization and localization
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) for routing, with
- [redux-first-history](https://github.com/salvoravida/redux-first-history) middleware
- [ant-design](https://ant.design/) for responsive high quality reusable components and forms
- fully functional components
- path aliases to reduce import statements' length
