var path = require('path');
var fs = require("fs");
var essi = require("essi")


// no code assistance in nodejs
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var less = require("less");
var app = express();
var http = require('http');

var compiler = webpack(config);

const ROOT_PATH = "./src/";

app.get("*", function(req, res, next){
    
     if( req.path == "/" ){
        fs.readFile(path.join(ROOT_PATH, "/view/index.html"), 'utf-8', function (err, data) {
            if (err) {
                console.log(err)
                next();
            } else {
                data = data.replace("</body>", '<script src="/static/index.bundle.js"></script></body>')
                res.end(data);
            }
        })
    }else{
        next();
    }
})

if (process.argv[2] == 'build') {
    app.use("/", express.static(__dirname + '/build'));
    /* 创建UI静态服务器 */
    http.createServer(app).listen(3000, '0.0.0.0', function (err) {
        if (err) {
            console.log(err);
            return false;
        }
    });
    console.log(__dirname + '/build');
} else if (process.argv[2] == 'dev') {
    console.log("run dev");

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    /*
     *   在html文件中动态插入同名的js文件
     * */
    app.get("*", function (req, res, next) {

        if (req.path.indexOf("/view/") != -1 && req.path.indexOf(".html") != -1) {

            var basename = path.basename(req.path, ".html");
            fs.readFile(path.join(ROOT_PATH, req.path), 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                    next();
                } else {
                    data = data.replace("</body>", '<script src="/static/' + basename + '.bundle.js"></script></body>')
                    res.end(data);
                }
            })

        } else {
            next();
        }
    });


    app.use(essi({
        strictPage: true,
        supportedFile: ['.html']
    }));


//解析 demo 文件
    app.get("*", function (req, res, next) {


        if (req.path.indexOf(".html") != -1) {
            res.sendFile(path.join(__dirname, "./src/" + req.path));
            return;
        }

        ///demo/index.less
        if (req.path.indexOf(".less") != -1) {
            console.log(path.join(__dirname, "./src" + req.path.replace(".css", "")))
            fs.readFile(path.join(__dirname, "./src" + req.path.replace(".css", "")), 'utf-8', function (err, data) {

                if (err) {
                    console.log(err);
                    next();

                } else {

                    less.render(data, function (err, output) {
                        if (err) {
                            console.log(err)
                            res.end("")
                        } else {
                            res.setHeader("content-type", "text/css");
                            res.end(output.css);
                        }
                    });

                }
            });

        } else {

            next();
        }


    });


    app.listen(3000, '0.0.0.0', function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at http://0.0.0.0:3000');
    });
}
