# webpack-learning

多入口、单模板生成多页面
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

为了提升性能，需要将初始化的js代码(main.js)直接嵌入到head中，而不是引入js。而其他jis在body中引入。
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
