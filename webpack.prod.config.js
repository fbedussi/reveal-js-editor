var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var webpack = require("webpack");

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
					plugins: ["transform-es2015-modules-commonjs"],
					presets: ['react']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass!'
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     output: {
        //         ascii_only: true
        //     },
        //     beautify: false,
        //     mangle: {
        //         screw_ie8: true,
        //         keep_fnames: true
        //     },
        //     compress: {
        //         screw_ie8: true
        //     },
        //     comments: false
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
	devtool: 'cheap-module-source-map'
};

options.target = webpackTargetElectronRenderer(options);

module.exports = options;
