const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getModuleRules(env) {
  const cssLoader = [];

  if (env.production) {
    cssLoader.push({
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    });
  } else {
    cssLoader.push('style-loader');
  }

  cssLoader.push('css-loader', 'postcss-loader');

  return [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/i,
      use: cssLoader
    }
  ];
}

exports.getModuleRules = getModuleRules;
