# webpack

## 安装

```shell
yarn init -y
yarn add webpack webpack-cli -D

//指定配置文件打包
npx webpack --config webpack.config.js
```

## 配置

### 使用 webpack-dev-server

- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

```shell
# 安装
yarn add webpack-dev-server -D
```

```js
module.exports = {
  devServer: {
    //开发服务器配置
    port: 3000, //端口
    progress: true, //显示编译进度
    contentBase: './dist', //指定访问资源目录
    compress: true, //gzip压缩
    open: false, //自动打开浏览器
  },
}
```

简化启动命令

```js
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
}

```

### 使用 html-webpack-plugin

- [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)

```shell
# 安装
yarn add html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
}
```

### 样式

- [css-loader style-loader](https://www.webpackjs.com/loaders/style-loader/)

```shell
yarn add css-loader style-loader -D
```

```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        //load顺序 默认从右向左执行
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}

//指定参数
//https://www.webpackjs.com/loaders/style-loader/#insertat
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
}
```

- less

```shell
yarn add less less-loader -D
```

- sass

```shell
yarn add node-sass sass-loader -D
```

- stylus

```shell
yarn add stylus stylus-loader -D
```

- [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
