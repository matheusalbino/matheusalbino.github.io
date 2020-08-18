const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ()=> {

  const OUTPUT_DIR = path.resolve(__dirname, 'dist');
  const isProduction = process.env.NODE_ENV === 'production';

  const plugins = [
    new Dotenv({
      path: `.env.${process.env.NODE_ENV}`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'My App',
    })
  ];

  const cssLoader = [];

  let optimization;
  let mode;

  if(isProduction === true) {
    mode = 'production';

    optimization = {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }

    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: 'public', to: OUTPUT_DIR },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css',
      }),
      new CleanWebpackPlugin()
    );

    cssLoader.push(
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      },
     'css-loader',
     'postcss-loader'
    );
  } else {
    mode = 'development';

    cssLoader.push('style-loader', 'css-loader', 'postcss-loader')
  }

  return {
    mode,
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: cssLoader,
        },
      ],
    },
    optimization,
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'static/js/[name].[hash].js',
      path: OUTPUT_DIR,
    },
    plugins,
    devServer: {
      contentBase: OUTPUT_DIR,
      compress: true,
      port: 3000
    }
  };
};
