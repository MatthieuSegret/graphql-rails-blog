// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

  plugins: [
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
