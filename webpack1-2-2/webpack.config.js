var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//entry:'./src/script/main.js',
    //entry: ['./src/script/main.js','./src/script/a.js'],
   /* output: {
        path: './dist/js',
        filename: 'bundle.js'
    }*/
    entry: {
    	main:'./src/script/main.js',
    	a:'./src/script/a.js'
    },
    /*output: {
        path: './dist/js',
        filename: '[name]-[hash].js'
    }*/
    /*output: {
        path: './dist/js',
        filename: '[name]-[chunkhash].js'
    },*/
    output: {
        path: './dist',
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn' // 线上地址 显示为：http://cdn/js/xx.js
    },
    plugins: [
    	new htmlWebpackPlugin({
    		filename: 'index-[hash].html',
    		template: 'index.html', // 生成的文件与自定义的index.html相关联
    		//inject: 'body', // 指定script引用js的标签放置位置 head or body
    		inject: false,
    		title: 'webpack is good!', // 模板数据
    		date: new Date(), // 模板数据
    		minify: {
    			removeComments: true, // 删除注释
    			collapseWhitespace: true // 删除空白
    		}
    	})
    ]
};