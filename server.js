var path = require('path');
var fs = require('fs');


// no code assistance in nodejs
var express = require('express');
var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack');
var config = require('./webpack.config');
var app = express();
var http = require('http');
var port = '3000';
var hosts = '0.0.0.0'

for (var key in config['entry']) {
    var arr = [];
    arr.unshift('babel-polyfill', config['entry'][key]);
    config['entry'][key] = arr;
}


var compiler = webpack(config);


if (process.argv[2] == 'build') {
    app.use('/', express.static(__dirname + '/build'));
    /* 创建UI静态服务器 */
    http.createServer(app).listen(3000, '0.0.0.0', function (err) {
        if (err) {
            console.log(err);
            return false;
        }
    });
    console.log(__dirname + '/build');
} else if (process.argv[2] == 'dev') {
    var compiler = webpack(config);

    var server = new WebpackDevServer(compiler, {
        hot:true,
        //热加载必须的 inline
        inline:true,

        quiet: false,
        compress: false,
        historyApiFallback: true,
        stats: {
            // Config for minimal console.log mess.
            assets: true,
            colors: true,
            version: false,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: true
        }
    });

    server.listen(port);
    console.log(`Listening at http://${hosts}:${port}`);
}