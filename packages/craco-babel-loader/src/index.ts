import { getLoader, loaderByName } from "@craco/craco";

// see: https://webpack.js.org/configuration/module/#condition
type Condition =
  | string
  | RegExp
  | Array<Condition>
  | ((arg: any) => boolean)
  | {
      test?: Condition;
      include?: Condition;
      exclude?: Condition;
      and?: Array<Condition>;
      or?: Array<Condition>;
      not?: Array<Condition>;
    };

type LoaderRule = {
  include?: Condition;
  exclude?: Condition;
};

const getArray = (source?: Condition): Array<Condition> => {
  if (!source) {
    return [];
  }

  return Array.isArray(source) ? source : [source];
};

const include = (babel_loader: LoaderRule, ...includes: Array<Condition>) => {
  const include_config = getArray(babel_loader.include);

  const newIncludes = includes.reduce((accumulator, include) => {
    if (Array.isArray(accumulator)) {
      if (Array.isArray(include)) {
        return accumulator.concat(include);
      }

      accumulator.push(include);
    }
    return accumulator;
  }, include_config);

  babel_loader.include = newIncludes;
};

const exclude = (babel_loader: LoaderRule, ...excludes: Array<Condition>) => {
  const exclude_config = getArray(babel_loader.exclude);
  const newExcludes = excludes.reduce((accumulator, exclude) => {
    if (Array.isArray(accumulator)) {
      if (Array.isArray(exclude)) {
        return accumulator.concat(exclude);
      }

      accumulator.push(exclude);
    }
    return accumulator;
  }, exclude_config);

  babel_loader.exclude = newExcludes;
};

export const overrideWebpackConfig = ({
  webpackConfig,
  pluginOptions: { includes = [], excludes = [] },
}) => {
  const { isFound, match } = getLoader(
    webpackConfig,
    loaderByName("babel-loader")
  ) as
    | { isFound: false; match: undefined }
    | { isFound: true; match: { loader: LoaderRule } };
  if (isFound) {
    includes.forEach((path) => include(match?.loader, path));
    excludes.forEach((path) => exclude(match?.loader, path));
  }
  return webpackConfig;
};
