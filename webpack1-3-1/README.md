# webpack-learning

loader

安装
npm install --save-dev babel-loader@ babel-core
npm install --save-dev babel-preset-latest

配置
module: {
    loaders:[
        {
            test: /\.js$/,
            loader:'babel',
            query:{
                presets: ['latest'] // 告诉babel如何处理es2015[2016|2017]的转换特性
            }
        }
    ]
}
可以将presets配置单独放到.babelrc文件中，或者放到package.js中 
放于script之前
"babel": {
    "presets": ["latest"]
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