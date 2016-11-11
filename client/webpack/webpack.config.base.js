/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
  entry: Object.assign({
    vendor: ['react', 'react-dom', 'chalk']
  }, options.entry),
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/'
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: options.babelQuery
    }, {
      test: /\.scss$/,
      include: /node_modules/,
      loader: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader', 'autoprefixer-loader']
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
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
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devtool: options.devtool,
  target: 'web'
});
