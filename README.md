# webpack-learning

webpack 学习记录

1.webpack基本配置
  @1:output:{path:'./dist/js', filename:'bundle.js'};
  但是在@2下运行，会报错'./dist/js'不是绝对路径的错误，在@下要配置为:
  @2:output:{path:__dirname+'/dist/js', filename:'bundle.js'};
  __dirname:Node.js中，任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名
  
