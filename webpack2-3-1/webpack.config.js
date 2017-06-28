var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + 'dist',
        //path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-bundle.js'
    },
    module: {
        loaders:[
            { 
                test: /\.js$/,
                loader:'babel-loader',
                exclude: __dirname + 'node_modules', // 排除处理范围, 该范围下的已打包，否则会耗时
                include: __dirname + 'src', // 指定打包范围，提高打包速度
                //include: path.resolve(__dirname, 'node_modules'),
                //exclude: path.resolve(__dirname, 'src'),
                options:{
                    presets: ['env'] // 告诉babel如何处理es2015[2016|2017]的转换特性
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