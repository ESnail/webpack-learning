var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'js/[name]-bundle.js'
    },
    module: {
        loaders:[
            { 
                test: /\.js$/,
                loader:'babel-loader',
                exclude: './node_modules/', // 排除处理范围, 该范围下的已打包，否则会耗时
                include: './src/', // 指定打包范围，提高打包速度
                query:{
                    presets: ['latest'] // 告诉babel如何处理es2015[2016|2017]的转换特性
                }
            }
        ]
    },
    plugins: [
    	new htmlWebpackPlugin({
    		filename: 'index.html',
    		template: 'index.html', 
    		inject: 'body'
    	})
    ]
};