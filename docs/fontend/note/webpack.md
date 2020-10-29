# webpack

## 安装

```shell
yarn init -y
yarn add webpack webpack-cli -D

//指定配置文件打包
npx webpack --config webpack.config.js
```

## 配置

### 基本配置

```js
// webpack.config.js
module.exports = {
  mode: 'development', //模式 默认两种 production development
  entry: './src/index.js', //入口
  output: {
    filename: 'bundle.[hash:8].js', //打包后的文件名
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/', //cdn路径
  },
}
```

### webpack-dev-server

```shell
yarn add webpack-dev-server -D
```

```js
// webpack.config.js
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

### html

```shell
yarn add html-webpack-plugin -D
```

```js
// webpack.config.js
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

### css

```shell
# css
yarn add css-loader style-loader -D
# less
yarn add less less-loader -D
# sass
yarn add node-sass sass-loader -D
# stylus
yarn add stylus stylus-loader -D
# mini-css-extract-plugin
yarn add mini-css-extract-plugin -D
# autoprefixer
yarn add postcss-loader autoprefixer -D
# 压缩 css
yarn add optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D
```

```js
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/main.css',
    }),
  ],
  optimization: {
    //优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true, //并发打包
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader 把css插入到head标签中
        //load顺序 默认从右向左执行
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
}
```

```js
// .postcss.config.js
module.exports = {
  plugins: [require('autoprefixer')()],
}
```

```
// .browserslistrc
last 1 version
>1%
maintained node versions
not dead
```

### js

```shell
# es6转es5
yarn add babel-loader @babel/core @babel/preset-env -D

yarn add @babel/plugin-proposal-class-properties -D
yarn add @babel/plugin-proposal-decorators -D

yarn add @babel/plugin-transform-runtime -D
yarn add @babel/runtime
yarn add @babel/polyfill
```

```js
// webpack.config.js
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //用babel-loader es6转es5
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
    ],
  },
}
```

### eslint

```shell
yarn add eslint eslint-loader -D
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre',
          },
        },
      },
    ],
  },
}
```

```js
// .eslintrc.json
```

### 全局变量

```shell
yarn add jquery
yarn add expose-loader -D
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: {
              exposes: {
                globalName: '$',
                override: true,
              },
            },
          },
        ],
      },
    ],
  },
}
```

### 图片 字体

```shell
yarn add file-loader  -D
yarn add html-withimg-loader -D
# base64
yarn add url-loader -D
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50 * 1024,
              outputPath: 'assets/img/',
              // publicPath: '', //cdn路径
            },
          },
        ],
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1 * 1024,
              outputPath: 'assets/font',
              // name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
}
```
