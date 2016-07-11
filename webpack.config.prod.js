var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');


var entries = getEntry('src/*.js', 'src/');
var chunks = Object.keys(entries);

for (var key in entries) {
    var arr = [];
    arr.unshift('babel-polyfill', entries[key]);
    entries[key] = arr;
}

var config = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.min.js',
        publicPath: ''
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CommonsChunkPlugin({
            name: 'public',
            chunks: chunks,
            minChunks: chunks.length
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
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


var pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'));
pages.forEach(function (pathname) {
    var conf = {
        filename: '../build/' + pathname + '.html', //生成的html存放路径，相对于path
        template: 'src/view/' + pathname + '.html', //html模板路径
        inject: false,	//js插入的位置，true/'head'/'body'/false
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
        }
    };
    if (pathname in config.entry) {
        conf.inject = true;
        conf.chunks = ['public', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
    // config.plugins.push(new ESSIPlugin(conf));
});


module.exports = config;

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
