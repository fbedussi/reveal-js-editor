var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var options = {
  entry: './lib/front/renderer.js',
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
      }
    ]
  }
};

options.target = webpackTargetElectronRenderer(options);

module.exports = options;