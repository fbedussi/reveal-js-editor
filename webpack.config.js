var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
//var json = require('json-loader!./file.json');

var options = {
  entry: './lib/front/src/renderer.js',
  output: {
    path: './lib/front/',
    filename: 'renderer-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass!'
      },{
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: 'source-map'
};

options.target = webpackTargetElectronRenderer(options);

module.exports = options;