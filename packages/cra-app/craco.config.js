const path = require("path");
const fs = require("fs");

const cracoBabelLoader = require("craco-babel-loader");

const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [resolvePackage("../code-to-include")],
        excludes: [/(node_modules|bower_components)/], //things you want to exclude here
      },
    },
  ],
};
