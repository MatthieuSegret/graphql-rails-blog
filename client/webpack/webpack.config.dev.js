/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config.base')({
  // Add hot reloading in development
  entry: {
    'webpack-hot-middleware': 'webpack-hot-middleware/client',
    main: path.join(process.cwd(), 'app/main.js')
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  sassLoaders: ['style-loader', 'css-loader', 'sass-loader'],
  cssLoaders: ['style-loader', 'css-loader'],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('app/index.html'),
      hash: false,
      inject: true
    })
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    presets: ['react-hmre']
  },

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
  performance: { hints: false }
});
