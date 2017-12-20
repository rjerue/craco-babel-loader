// @flow

const { getBabelLoader } = require("react-app-rewired");

// see: https://webpack.js.org/configuration/module/#condition
type Condition =
    | string
    | RegExp
    | Array<Condition>
    | ((arg: any) => boolean)
    | {
          +test?: Condition,
          +include?: Condition,
          +exclude?: Condition,
          +and?: Array<Condition>,
          +or?: Array<Condition>,
          +not?: Array<Condition>
      };

type ConfigType = {
    module: {
        rules: {
            // omitted
        }
    }
};

type LoaderRule = {
    include?: Condition,
    exclude?: Condition
};

const getArray = (source: ?Condition): Array<Condition> => {
    if (!source) {
        return [];
    }

    return Array.isArray(source) ? source : [source];
};

export const include = (config: ConfigType, ...includes: Array<Condition>) => {
    const babel_loader: LoaderRule = getBabelLoader(config.module.rules);

    const include_config = getArray(babel_loader.include);

    includes = includes.reduce((accumulator, include) => {
        if (Array.isArray(include)) {
            return accumulator.concat(include);
        }

        accumulator.push(include);
        return accumulator;
    }, include_config);

    babel_loader.include = includes;

    return config;
};

export const exclude = (config: ConfigType, ...excludes: Array<Condition>) => {
    const babel_loader: LoaderRule = getBabelLoader(config.module.rules);

    const exclude_config = getArray(babel_loader.exclude);

    excludes = excludes.reduce((accumulator, exclude) => {
        if (Array.isArray(exclude)) {
            return accumulator.concat(exclude);
        }

        accumulator.push(exclude);
        return accumulator;
    }, exclude_config);

    babel_loader.exclude = excludes;

    return config;
};
