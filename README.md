This is a port of [react-app-rewire-babel-loader](https://github.com/dashed/react-app-rewire-babel-loader) to [`CRACO`](https://github.com/sharegate/craco) instead of [react-app-rewired](https://github.com/timarney/react-app-rewired). `react-app-rewired` was not being updated for version 2 of CRA, and I wanted to use the rewired babel loader with a solution designed for CRA 2.

> Rewire [`babel-loader`](https://github.com/babel/babel-loader) loader in your [`create-react-app`](https://github.com/facebookincubator/create-react-app) project using [`CRACO`](https://github.com/sharegate/craco).

Say there is an awesome library you found on npm that you want to use within your **un-ejected**  [`create-react-app`](https://github.com/facebookincubator/create-react-app) project, but unfortunately, it's published in ES6+ (since `node_modules` doesn't go through `babel-loader`), so you cannot *really* use it. It's also effective for working with monorepos which was my original use case.

However, with [`CRACO`](https://github.com/sharegate/craco) and this library, `craco-babel-loader`, you can use that awesome library you've found.

See below for usage.

## Install


```sh
$ yarn add craco-babel-loader
# npm v5+
$ npm install craco-babel-loader
# before npm v5
$ npm install --save craco-babel-loader
```

## Usage

```js
// crago.config.js
// see: https://github.com/sharegate/craco

const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require("craco-babel-loader");

// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
        //This is a craco plugin: https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview
        { plugin: rewireBabelLoader, 
          options: { 
            includes: [resolveApp("node_modules/isemail")], //put things you want to include in array here
            excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            //you can omit include or exclude if you only want to use one option
          }
        }
    ]
}

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
