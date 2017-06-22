/**
 * PRODUCTION WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = require('./webpack.config.base')({
  // In production, we skip all hot-reloading stuff
  entry: {
    main: path.join(process.cwd(), 'app/main.js')
  },

  output: {
    path: path.resolve(process.cwd(), '../public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  sassLoaders: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'sass-loader']
  }),

  cssLoaders: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader']
  }),

  plugins: [

    // Extract the CSS into a seperate file
    new ExtractTextPlugin('[name].[contenthash].css'),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.LoaderOptionsPlugin({
      options: { postcss: [autoprefixer()] }
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: path.resolve('app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ]
});
