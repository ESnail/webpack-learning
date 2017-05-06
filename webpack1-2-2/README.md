# webpack-learning

webpack 学习记录

1.webpack基本配置
  @1:output:{path:'./dist/js', filename:'bundle.js'};
  但是在@2下运行，会报错'./dist/js'不是绝对路径的错误，在@下要配置为:
  @2:output:{path:__dirname+'/dist/js', filename:'bundle.js'};
  __dirname:Node.js中，任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名

2.多入口配置
  entry:{main:'./src/srcipt/main.js','b':'./src/srcipt/a.js'},
  output:{path:'./dist/js',filename:'[name]-[chunkhash].js'}
  输出映射 
  	[name]-entry对象中的key值  
  	[hash]-每次打包的hash 
  	[chunkhash]-每个文件的版本号或md5值(保证唯一性,同一文件不改变打包,不变,版本控制只更新版本号不一致的) 
  	注意：name、hash、chunkhash不能同时使用 

3.把动态打包好的js路径动态的生成到index.html中（默认生成到output的path目录下）
  安装插件：npm install html-webpack-plugin --save-dev
  配置：
  var htmlWebpackPlugin = require('html-webpack-plugin');
  plugins:[
  	new htmlWebpackPlugin()
  ]

  4.将插件生成的index.html与项目根目录下的index关联起来，给插件添加template参数( index.html，路径默认在编译文件的上下文环境(context)，即根目录)
   plugins:[
  	new htmlWebpackPlugin({
		template:'index.html'
	})
   ]

  5.index.html生成的路径在js外，改变output
   output:{
 	path: './dist',
    filename:'js/[name]-[chunkhash].js'
   }

  6.html-webpack-plugin插件参数，可指定生成文件的名称
	new htmlWebpackPlugin({
	filename:'index-[hash].html',
	template:'index.html'
	})
	指定script引入js的代码的放置位置 head中还是body中（默认body尾部）
	new htmlWebpackPlugin({
		filename:'index-[hash].html',
		template:'index.html'，
		inject: 'head'
	})
