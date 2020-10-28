const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', //模式 默认两种 production development
  entry: './src/index.js', //入口
  output: {
    filename: 'bundle.[hash:8].js', //打包后的文件名
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    //开发服务器配置
    port: 3000, //端口
    progress: true, //显示编译进度
    contentBase: './build', //指定访问资源目录
    compress: true, //gzip压缩
    open: false, //自动打开浏览器
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', //指定模板
      filename: 'index.html', //指定打包后的文件名字
      hash: true, //生成一个hash值
      //压缩打包后的html文件
      //https://github.com/kangax/html-minifier
      minify: {
        collapseWhitespace: true, //折叠空行
        removeComments: true,
        removeAttributeQuotes: true, //删除双引号
        removeEmptyAttributes: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader 把css插入到head标签中
        //load顺序 默认从右向左执行
        use: [
          {
            loader: 'style-loader',
            options: {},
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}
