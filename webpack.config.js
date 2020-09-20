const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
  const OUTPUT_DIR = path.resolve(__dirname, 'dist');
  const isProduction = process.env.NODE_ENV === 'production';

  const plugins = [
    new Dotenv({
      path: `.env.${process.env.NODE_ENV}`
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'Matheus Albino'
    })
  ];

  if (isProduction) {
    plugins.push(
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: 'public', to: OUTPUT_DIR }]
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css'
      }),
      new BundleStatsWebpackPlugin({
        outDir: '../'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../bundle-analyzer.html',
        defaultSizes: 'gzip'
      }),
      new LicenseCheckerWebpackPlugin({
        allow: '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC)',
        emitError: true,
        outputFilename: 'ThirdPartyNotices.txt'
      })
    );
  }

  const cssLoader = [];

  if (isProduction) {
    cssLoader.push(
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader'
    );
  } else {
    cssLoader.push('style-loader', 'css-loader', 'postcss-loader');
  }

  let optimization;
  let mode;
  let cache;

  if (isProduction) {
    mode = 'production';
    cache = true;
    optimization = {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    };
  } else {
    mode = 'development';
    cache = {
      type: 'filesystem'
    };
  }

  return {
    mode,
    cache,
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: cssLoader
        }
      ]
    },
    optimization,
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'static/js/[name].[hash].js',
      path: OUTPUT_DIR
    },
    plugins,
    devServer: {
      contentBase: OUTPUT_DIR,
      hot: true,
      compress: true,
      port: 3000
    }
  };
};
