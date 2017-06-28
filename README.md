# webpack-learning

webpack 学习记录
---

**1.webpack基本配置**

  @1:output:{path:'./dist/js', filename:'bundle.js'};
  但是在@2下运行，会报错'./dist/js'不是绝对路径的错误，在@下要配置为:
  @2:output:{path:__dirname+'/dist/js', filename:'bundle.js'};
  __dirname:Node.js中，任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名

**2.多入口配置**

  entry:{main:'./src/srcipt/main.js','b':'./src/srcipt/a.js'},
  output:{path:'./dist/js',filename:'[name]-[chunkhash].js'}
  输出映射 
  	[name]-entry对象中的key值  
  	[hash]-每次打包的hash 
  	[chunkhash]-每个文件的版本号或md5值(保证唯一性,同一文件不改变打包,不变,版本控制只更新版本号不一致的) 
  	注意：name、hash、chunkhash不能同时使用 

**3.把动态打包好的js路径动态的生成到index.html中（默认生成到output的path目录下）**

  安装插件：npm install html-webpack-plugin --save-dev
  配置：
  var htmlWebpackPlugin = require('html-webpack-plugin');
  plugins:[
  	new htmlWebpackPlugin()
  ]

**4.将插件生成的index.html与项目根目录下的index关联起来，给插件添加template参数( index.html，路径默认在编译文件的上下文环境(context)，即根目录)**

   plugins:[
  	new htmlWebpackPlugin({
		template:'index.html'
	})
   ]

**5.index.html生成的路径在js外，改变output**
```js
   output:{
 	  path: './dist',
    filename:'js/[name]-[chunkhash].js'
   }
```

**6.html-webpack-plugin插件参数，可指定生成文件的名称**

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

**7.多入口、单模板生成多页面**

    1.entry：{}   多个key-value 即多个chunk
    
    2.plugins:[]  多个htmlWebpackPlugin配置
    
    3.需要打开inject:'body',自动生成js, 而不是在index.html中指定
    
    4.配置如下：chunks 、excludeChunks使用一个即可
    
      new htmlWebpackPlugin({
        filename: 'a.html',
        template: 'index.html', // 生成的文件与自定义的index.html相关联
        inject: 'body', // 指定script引用js的标签放置位置 head or body
        title: 'This is the a page', // 模板数据
        chunks:['main','a'], // 指定当前html包含的chunk,即引用的js
        //excludeChunks: ['b','c'] // 当chunk比较多时,指定当前页面不包含的chunk
      })
      
    5.为了提升性能，需要将初始化的js代码(main.js)直接嵌入到head中，而不是引入js。而其他jis在body中引入。
    
        1.inject:false
	
        2.在index.html中处理
            (1) 在head中嵌入main.js代码
            默认entry带 publicPath地址 htmlWebpackPlugin.files.chunks.main.entry 
                http://cdn.com/js/main-4d84e8a1dcfe9230c8d3.js
            嵌入部分初始化的js代码,要去除publicPath地址 htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length) 
                js/main-4d84e8a1dcfe9230c8d3.js
            js嵌入html需要用到webpack的内部方法compilation.asserts['去除publicPath的js路径'].source() 
                <script type="text/javascript" src="<%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>"></script>
            (2) <!-- 循环判断引入非初始化的其他js -->
                <% for (var key in htmlWebpackPlugin.files.chunks) { %>
                  <% if(key !== 'main') { %>
                    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks[key].entry %>"></script>
                  <% } %>
                <% } %>
