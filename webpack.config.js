var webpack = require('webpack');

module.exports={
  entry:'./lib/front/renderer.js',
  output:{
    filename:'./lib/front/renderer-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query:{
          presets:['react','es2015']
        }
      }
    ]
  },
  terget: 'electron-renderer'
}
