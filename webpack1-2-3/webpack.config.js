var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
    	main:'./src/script/main.js',
    	a:'./src/script/a.js',
        b:'./src/script/b.js',
        c:'./src/script/c.js'
    },
    output: {
        path: './dist',
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com/' // 线上地址 显示为：http://cdn/js/xx.js
    },
    plugins: [
    	new htmlWebpackPlugin({
    		filename: 'a.html',
    		template: 'index.html', // 生成的文件与自定义的index.html相关联
    		//inject: 'body', // 指定script引用js的标签放置位置 head or body
    		inject: false,
            title: 'This is the a page', // 模板数据
    		//chunks:['main','a'], // 指定当前html包含的chunk,即引用的js
            excludeChunks: ['b','c'] // 当chunk比较多时,指定当前页面不包含的chunk
    	}),
        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html', // 生成的文件与自定义的index.html相关联
            //inject: 'body', // 指定script引用js的标签放置位置 head or body
            inject: false,
            title: 'This is the b page', // 模板数据
            //chunks:['main','b'], // 指定当前html包含的chunk,即引用的js
            excludeChunks: ['a','c'] // 当chunk比较多时,指定当前页面不包含的chunk
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html', // 生成的文件与自定义的index.html相关联
            //inject: 'body', // 指定script引用js的标签放置位置 head or body
            inject: false,
            title: 'This is the c page', // 模板数据
            //chunks:['c'], // 指定当前html包含的chunk,即引用的js
            excludeChunks: ['a','b'] // 当chunk比较多时,指定当前页面不包含的chunk
        })
    ]
};