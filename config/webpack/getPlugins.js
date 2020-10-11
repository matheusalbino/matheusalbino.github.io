const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleStatsWebpackPlugin = require('bundle-stats-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getFileName } = require('./getFileName');
const { getMode } = require('./getMode');

function getPlugins(env, { outputPath }) {
  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: getMode(env)
    }),
    new Dotenv({
      path: `.env.${getMode(env)}`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'Matheus Albino'
    })
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: 'public', to: './' }]
      }),
      new MiniCssExtractPlugin({
        filename: `static/css/${getFileName()}.css`
      }),
      new BundleStatsWebpackPlugin({
        outDir: path.resolve(path.basename(outputPath), '..')
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(path.basename(outputPath), '..', 'bundle-analyzer.html'),
        defaultSizes: 'gzip'
      }),
      new LicenseCheckerWebpackPlugin({
        allow: '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC OR 0BSD)',
        emitError: true,
        outputFilename: 'ThirdPartyNotices.txt'
      })
    );
  }

  return plugins;
}

exports.getPlugins = getPlugins;
