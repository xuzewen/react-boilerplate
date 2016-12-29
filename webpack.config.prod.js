var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var version = require('./package.json').version;
var baseConfig = require('./webpack.config.base');


var distPath = baseConfig.distPath;
var entries = baseConfig.entries;
var pages = baseConfig.pages;
var pagePluginArr = baseConfig.pagePluginArr;

var prod_publicPath = '';
var chunks = Object.keys(entries);


for (var key in entries) {
    var arr = [];
    arr.unshift('babel-polyfill', entries[key]);
    entries[key] = arr;
}

var config = {
    entry: merge(entries, {
        public: ['react', 'react-dom', 'redux', 'react-redux', 'redux-devtools-log-monitor', 'redux-devtools-dock-monitor', 'redux-devtools', 'isomorphic-fetch']
    }),
    output: {
        path: path.resolve(__dirname, distPath),
        filename: '[name].bundle.min.js?[chunkhash]',
        publicPath: prod_publicPath
    },
    plugins: [
        new CommonsChunkPlugin({
            names: ['public', 'manifest']
            // chunks: chunks,
            // minChunks: chunks.length
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify:false,
            comments:false
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015-loose', 'stage-0']
                }
            },
            {test: /\.less$/, loader: ExtractTextPlugin.extract('css!less')},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ],
        postLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['es3ify-loader']
            }
        ]
    }
};

pagePluginArr.forEach(function (item) {
    config.plugins.push(item);
})


module.exports = config;