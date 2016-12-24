/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (options) => ({
  entry: Object.assign({
    vendor: ['react', 'react-dom', 'react-router', 'chalk', 'apollo-client', 'react-apollo']
  }, options.entry),
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/'
  }, options.output),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: options.babelQuery,
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: options.sassLoaders
    }, {
      test: /\.css$/,
      loader: options.cssLoaders,
      include: /node_modules/
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|ico)$/,
      loader: 'file-loader'
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
        'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
      ]
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.NamedModulesPlugin(),
    new FaviconsWebpackPlugin(path.resolve('app/assets/images/icon.png'))
  ]),
  resolve: {
    modules: [path.resolve('./app'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devtool: options.devtool,
  performance: options.performance,
  target: 'web'
});
