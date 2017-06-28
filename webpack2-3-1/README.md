# webpack-learning

loader
webpack2
presets 值 latest 要换成 env 
安装
npm install --save-dev babel-loader babel-core
npm install --save-dev babel-preset-env

配置
module: {
    loaders:[
        {
            test: /\.js$/,
            loader:'babel',
            options:{
                presets: ['env'] // 告诉babel如何处理es2015[2016|2017]的转换特性
            }
        }
    ]
}
可以将presets配置单独放到.babelrc文件中，或者放到package.js中 
放于script之前
"babel": {
    "presets": ["env"]
}
此时,不需要query
 module: {
    loaders:[
        { 
            test: /\.js$/,
            loader:'babel-loader'
        }
    ]
}

为了提高打包速度，可以使用配置loader相关的配置参数include(包含)、exclude(排除)
注意：include、exclude的值必须是绝对路径,可以使用node的__dirname + 相对路径
exclude: __dirname + 'node_modules', // 排除处理范围, 该范围下的已打包，否则会耗时
include: __dirname + 'src', // 指定打包范围，提高打包速度


也可以使用node的path.resolve(__dirname,'相对路径')API得到绝对路径
include: path.resolve(__dirname, 'node_modules'),
exclude: path.resolve(__dirname, 'src')
使用这种方式比上面的方式,打包速度会变慢很多

