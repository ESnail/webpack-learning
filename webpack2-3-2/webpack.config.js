var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        //path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-bundle.js'
    },
    module: {
        loaders:[
            { 
                test: /\.js$/,
                loader:'babel-loader',
                exclude: __dirname + '/node_modules', // 排除处理范围, 该范围下的已打包，否则会耗时
                include: __dirname + '/src', // 指定打包范围，提高打包速度
                //include: path.resolve(__dirname, 'node_modules'),
                //exclude: path.resolve(__dirname, 'src'),
                options:{
                    presets: ['env'] // 告诉babel如何处理es2015[2016|2017]的转换特性
                }
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            {
                test: /\.tpl/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                // importLoaders=1 处理 css-loader之前需要处理的loader个数
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader' //执行顺序，从左到右
                //loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                // importLoaders=1 处理 css文件@simport中引入的css,也添加前缀
                //loader: 'style!css!less'
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
               /* //loader: 'file-loader',
                loader: 'url-loader',
                options: {
                    limit: 500000, // 500k
                    name: 'assets/[name]-[hash].[ext]' // 生成图片路径及图片名称后缀
                }*/
                loaders: [
                    'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader' // 图片压缩
                ]
            }
        ]
    },
    plugins: [
    	new htmlWebpackPlugin({
    		filename: 'index.html', // 生成的文件路径及名称
    		template: 'index.html', // 模板文件，根目录下的index.html
    		inject: 'body',  // 指定生成的html文件script引用打包的js的标签放置位置 head or body
            title: 'webpack is good!', // 模板数据
          /*  minify: {
                removeComments: true, // 压缩 删除注释
                collapseWhitespace: true // 压缩 删除空白
            }*/
    	})
    ]
};