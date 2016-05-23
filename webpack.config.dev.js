var path = require('path');
var glob = require('glob');
var webpack = require('webpack');


var entries = getEntry('src/*.js', 'src/');

for(var key in entries) {
    var arr = [];
    arr.unshift('eventsource-polyfill','webpack-hot-middleware/client',entries[key]);
    entries[key] = arr;
}

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
        loaders: [
            {
                test: /\.jsx?/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
  };



function getEntry(globPath, pathDir) {
	var files = glob.sync(globPath);
	var entries = {},
		entry, dirname, basename, pathname, extname;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.join(dirname, basename);
		pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
		entries[pathname] = './' + entry;
	}
	return entries;
}