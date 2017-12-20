react-app-rewire-babel-loader
=============================

> Rewire [`babel-loader`](https://github.com/babel/babel-loader) loader in your [`create-react-app`](https://github.com/facebookincubator/create-react-app) project using [`react-app-rewired`](https://github.com/timarney/react-app-rewired).

Say there is an awesome library you found on npm that you want to use within your **un-ejected**  [`create-react-app`](https://github.com/facebookincubator/create-react-app) project, but unfortunately, it's published in ES6+ (since `node_modules` doesn't go through `babel-loader`), so you cannot *really* use it.

However, with [`react-app-rewired`](https://github.com/timarney/react-app-rewired) and this library, `react-app-rewire-babel-loader`, you can use that awesome library you've found.

See below for usage.

Usage
=====

```js
// config-overrides.js
// see: https://github.com/timarney/react-app-rewired

const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require("react-app-rewire-babel-loader");

// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {

  // white-list some npm modules to the babel-loader pipeline
  // see: https://webpack.js.org/configuration/module/#rule-include

  config = rewireBabelLoader.include(
    config,
    resolveApp("node_modules/isemail")
  );

  // black-list some modules from the babel-loader pipeline
  // see: https://webpack.js.org/configuration/module/#rule-exclude

  config = rewireBabelLoader.exclude(
    config,
    /(node_modules|bower_components)/
  );

  return config;

};
```


Development
===========

- `node.js` and `npm`. See: https://github.com/creationix/nvm#installation
- `yarn`. See: https://yarnpkg.com/en/docs/install
- `npm` dependencies. Run: `yarn install`

## Chores

- Lint: `yarn run lint`
- Prettier: `yarn run pretty`
- Test: `yarn run test`
- Pre-publish: `yarn run prepublish`
- Build: `yarn run build`

License
=======

MIT.
