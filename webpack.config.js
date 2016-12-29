var path = require('path')
var glob = require('glob')
var webpack = require('webpack')
var HappyPack = require('happypack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('lodash/object/merge')

var distPath = './build'

var environment = process.env.NODE_ENV || 'dev'

var dev_environment = environment.indexOf('dev')
var daily_environment = environment.indexOf('build')
var dist_environment = environment.indexOf('dist')


var daily_publicPath = ''
var dist_publicPath = ''
var dev_publicPath = ''

var publicPath = daily_environment != -1 ? daily_publicPath : (dist_environment != -1 ? dist_publicPath : dev_publicPath)



var entries = getEntry('src/*.js', 'src/')
var chunks = Object.keys(entries)

var config = {
  // devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: path.resolve(__dirname, distPath),
    filename: '[name].bundle.js?[hash]',
    publicPath: publicPath
  },
  plugins: [
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


switch (environment) {
  case 'dev':
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        },
         __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    break;
  default:
      config.entry = merge(config.entry, {
          public: ['react', 'react-dom', 'redux', 'react-redux', 'redux-devtools-log-monitor', 'redux-devtools-dock-monitor', 'redux-devtools', 'isomorphic-fetch']
      })
      config.plugins = [new CommonsChunkPlugin({
            names: ['public', 'manifest']
            // chunks: chunks,
            // minChunks: chunks.length
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new ExtractTextPlugin('[name].css'),
        new HappyPack({
            id: 'js' ,
            threads: 4
        })
      ]
      config.module = {
          loaders: [
              {
                  test: /\.jsx?$/,
                  loader: 'babel',
                  exclude: /node_modules/,
                  query: {
                      presets: ['es2015-loose', 'stage-0'],
                      //缓存增加打包效率
                      cacheDirectory: true
                  },
                  happy: {id:'js'}
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
    break
}

if(dist_environment != -1){
	config.plugins.unshift(
		new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify:false,
            comments:false
        })
    )
}



var pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'))
pages.forEach(function (pathname) {
  var conf = {
    filename: (dev_environment != -1 ? '' : '../build/') + pathname + '.html', //生成的html存放路径，相对于path
    template: 'src/view/' + pathname + '.html', //html模板路径
    inject: false,	//js插入的位置，true/'head'/'body'/false
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true //删除空白符与换行符
    }
  }
  if (pathname in config.entry) {
    conf.inject = true
    conf.chunks = ['public', pathname]
    conf.hash = true
  }

  config.plugins.push(new HtmlWebpackPlugin(conf))
})

console.log(config.entry)

module.exports = config

















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
