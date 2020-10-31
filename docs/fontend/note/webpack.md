# webpack

## 安装

```shell
yarn init -y
yarn add webpack webpack-cli -D

//指定配置文件打包
npx webpack --config webpack.config.js
```

## 配置

### [mode](https://webpack.js.org/configuration/mode/)

```js
module.exports = {
  mode: 'development', //模式 development production none
}
```

### entry & output

- [entry](https://webpack.js.org/configuration/entry-context/)
- [output](https://webpack.js.org/configuration/output/)

```js
const path = require('path')
module.exports = {
  //入口
  entry: {
    index: './src/index.js',
    // 可以添加多个入口
    // app: './src/app.js',
  },
  //输出
  output: {
    //打包后的文件名
    filename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
}
```

### [devtool](https://webpack.js.org/configuration/devtool/)

```js
module.exports = {
  //sourceMap模式 cheap-module-eval-source-map cheap-module-source-map
  devtool: 'cheap-module-eval-source-map',
}
```

### [devServer](https://webpack.js.org/configuration/dev-server/)

```shell
yarn add webpack-dev-server -D
```

```js
module.exports = {
  //开发服务器
  devServer: {
    //端口
    port: 3000,
    //显示编译进度
    progress: true,
    //指定访问资源目录
    contentBase: './dist',
    //gzip压缩
    compress: true,
    //自动打开浏览器
    open: false,
  },
}
```

```json
// package.json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  }
}
```

### html

- [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- [html-minifier](https://github.com/kangax/html-minifier)

```shell
yarn add html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // html模板文件
      template: './src/index.html',
      // 输出路径(包含文件名)
      filename: 'index.html',
      //自动插入js脚本
      // true body head false 默认为true:script标签位于html文件的 body 底部
      inject: true,
      // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
      chunks: ['index'],
      // 压缩html
      minify: {
        // 移除注释
        removeComments: true,
        // 不要留下任何空格
        collapseWhitespace: true,
        // 当值匹配默认值时删除属性
        removeRedundantAttributes: true,
        // 使用短的doctype替代doctype
        useShortDoctype: true,
        // 移除空属性
        removeEmptyAttributes: true,
        // 从style和link标签中删除type="text/css"
        removeStyleLinkTypeAttributes: true,
        // 保留单例元素的末尾斜杠。
        keepClosingSlash: true,
        // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyJS: true,
        // 缩小CSS样式元素和样式属性
        minifyCSS: true,
        // 在各种属性中缩小url
        minifyURLs: true,
      },
    }),
  ],
}
```

### css

```shell
# css
# css-loader 解析js中引入的css
# style-loader 把加载的css作为style标签内容插入到html中
yarn add css-loader style-loader -D
# mini-css-extract-plugin 将js中的css抽离出来，打包成单独的文件
yarn add mini-css-extract-plugin -D
# postcss
# autoprefixer 将css代码自动加兼容性前缀
yarn add postcss postcss-loader autoprefixer -D
# 压缩 css
yarn add optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D
# 删除文件夹
yarn add clean-webpack-plugin -D
# less 将less代码转为css
yarn add less less-loader -D
# sass
yarn add node-sass sass-loader -D
# stylus
yarn add stylus stylus-loader -D
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    new CleanWebpackPlugin(),
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
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
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

### babel

```shell
# 将es6语法转为es5
yarn add babel-loader @babel/core @babel/preset-env -D

yarn add @babel/plugin-proposal-class-properties -D
yarn add @babel/plugin-proposal-decorators -D

yarn add @babel/plugin-transform-runtime -D
yarn add @babel/runtime
yarn add @babel/polyfill
```

```js
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
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

### 图片 & 字体

- [file-loader](https://webpack.js.org/loaders/file-loader/)
- [url-loader](https://webpack.js.org/loaders/url-loader/)
- [html-withimg-loader](https://github.com/wzsxyz/html-withimg-loader)

```shell
yarn add file-loader url-loader -D
yarn add html-withimg-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              outputPath: 'img/',
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1 * 1024,
              outputPath: 'font',
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader',
      },
    ],
  },
}
```

### [watch](https://webpack.js.org/configuration/watch/)

```js
module.exports = {
  watch: true,
  watchOptions: {
    //防抖
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
}
```

### vue

- [vue-cli](https://vue-loader.vuejs.org/zh/guide/#vue-cli)

```shell
yarn add vue -D
yarn add vue-loader vue-template-compiler -D
```

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
  ],
}
```

### eslint

```shell
yarn add eslint eslint-loader -D
```

```js
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

### performance

```js
module.exports = {
  //性能提示
  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: 'warning',
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000,
  },
}
```

## 插件

### [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)

```js
const path = require('path')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
}
```

### [webpack-merge](https://webpack.js.org/guides/production/)

```shell
yarn add webpack-merge -D
```

```js
// webpack.common.js
module.exports = {}
```

```js
// webpack.dev.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
})
```

```js
// webpack.prod.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
})
```

### [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin)

```shell
# 拷贝文件
yarn add copy-webpack-plugin -D
```

```js
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'source', to: 'dest' }],
    }),
  ],
}
```

### [banner-plugin](https://webpack.js.org/plugins/banner-plugin/)

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    //版权声明
    new webpack.BannerPlugin({
      banner: '2020 by lalifeier',
    }),
  ],
}
```
