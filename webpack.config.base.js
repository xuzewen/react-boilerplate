var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var distPath = './build';
var entries = getEntry('src/*.js', 'src/');
var pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'));
var pagePluginArr = [];

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
    if (pathname in entries) {
        conf.inject = true;
        conf.chunks = ['public', pathname];
        conf.hash = true;
    }
    pagePluginArr.push(new HtmlWebpackPlugin(conf));
});

module.exports = {
    distPath,
    entries,
    pages,
    pagePluginArr
}

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