## web
### 目录结构
	root
	├── README.md       //说明文档
	├── build           //生产目录
	│   ├── a.html      //html文件a
	│   ├── b.html      //html文件b
	│   ├── javascript  //压缩后js目录
	│   └── styles      //压缩后css目录
	├── src             //开发目录
	│   ├── a.js        //入口a
	│   ├── b.js        //入口b
	│   ├── components  //模块目录
	│   ├── less        //样式目录
	│   ├── demo        //demo目录
	│   └── view        //html模板目录
	│       ├── a.html  //a模板
	│       └── b.html  //b模板
	├── server.js       //测试服务文件
	├── package.json    //项目工程文件
	├── webpack.config.dev.js   //webpack开发配置文件
	├── webpack.config.prod.js  //webpack生产配置文件
	└── webpack.config.build.js  //webpack线上包测试配置文件

### 本地开发测试
		
+	本地开发测试

		npm start
        
+   兼容ie8测试

	    npm run build
		
+	打开 http://localhost:3000
		
### 生产文件生成

	npm run dist		
		
### 代码热替换
http://s.yuantutech.com/i4/55832b977c286e17320b9dc514410a32-1153-600.gif
<img style="width: 500px" src="http://s.yuantutech.com/i4/55832b977c286e17320b9dc514410a32-1153-600.gif" />
