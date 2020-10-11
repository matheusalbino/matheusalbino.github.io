const { getFileName } = require('./getFileName');
const { getPlugins } = require('./getPlugins');
const { getModuleRules } = require('./getModuleRules');
const { getDevtool } = require('./getDevtool');
const { getDevServer } = require('./getDevServer');
const { getMode } = require('./getMode');
const { getEntry } = require('./getEntry');
const { getResolve } = require('./getResolve');

module.exports = (env, argv) => {
  const { outputPath } = argv;

  return {
    mode: getMode(env),
    cache: {
      type: 'filesystem'
    },
    devtool: getDevtool(env),
    entry: getEntry(env),
    module: {
      rules: getModuleRules(env)
    },
    resolve: getResolve(env),
    output: {
      filename: `static/js/${getFileName(env)}.js`,
      path: outputPath
    },
    stats: {
      colors: true
    },
    plugins: getPlugins(env, { outputPath }),
    devServer: getDevServer(env, { outputPath })
  };
};
