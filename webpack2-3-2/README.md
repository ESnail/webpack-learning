# webpack-learning

css

安装
npm install css-loader style-loader --save-dev
前缀
npm install postcss-loader --save-dev
npm install autoprefixer --save-dev
less
npm install less-loader --save-dev

配置
{
    test: /\.css$/,
    loaders: ['style-loader','css-loader','postcss-loader']
}
postcss: [
    require('autoprefixer')({
        broswers: ['last 5 versions'] // 针对浏览器 最新的5个版本
    })
]
