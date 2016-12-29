var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var distPath = baseConfig.distPath;
var entries = baseConfig.entries;

var dev_publicPath = '';
var chunks = Object.keys(entries);

var config = {
  // devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: path.resolve(__dirname, distPath),
    filename: '[name].bundle.js',
    publicPath: dev_publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development')
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
}

module.exports = config