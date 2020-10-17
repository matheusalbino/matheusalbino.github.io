const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getFileName } = require('./getFileName');
const { getMode } = require('./getMode');

function getPlugins(env) {
  const plugins = [
    new Dotenv({
      path: `.env.${getMode(env)}`
    }),
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      title: 'Matheus Albino',
      appMountId: 'root',
      mobile: true,
      lang: 'en-US',
      favicon: 'public/favicon.ico'
    })
  ];

  if (env.local) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (env.production) {
    plugins.push(
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: 'public/robots.txt', to: './' }]
      }),
      new MiniCssExtractPlugin({
        filename: `static/css/${getFileName(env)}.css`
      }),
      new BundleStatsWebpackPlugin({
        outDir: '..'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.join('..', 'bundle-analyzer.html'),
        defaultSizes: 'gzip'
      })
    );
  }

  return plugins;
}

exports.getPlugins = getPlugins;
