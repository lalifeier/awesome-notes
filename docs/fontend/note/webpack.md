# webpack

## 安装

```shell
yarn init -y
yarn add webpack webpack-cli -D

# 全局安装
yarn global add webpack webpack-cli
# 使用webpack
node_modules/.bin/webpack
npx webpack
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
      {
        test: /\.(sass|scss)$/,
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
# 解析class类的属性
yarn add @babel/plugin-proposal-class-properties -D
# 解析装饰器模式语法
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
# yarn add html-withimg-loader -D
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
              esModule: false,
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
      // {
      //   test: /\.(htm|html)$/i,
      //   loader: 'html-withimg-loader',
      // },
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

### 全局变量

- [expose-loader](https://webpack.js.org/loaders/expose-loader/)

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

### [add-asset-html-webpack-plugin](https://github.com/SimenB/add-asset-html-webpack-plugin)

```shell
yarn add add-asset-html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new AddAssetHtmlPlugin({ filepath: require.resolve('./some-file') }),
  ],
}
```

### [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)

```js
yarn add jquery
```

```js
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
}
```

### [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```shell
yarn add webpack-bundle-analyzer -D
```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
}
```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],
}
```

```js
// package.json
{
  "scripts": {
    "generateAnalyzFile": "webpack --config webpack.prod.js --profile --json > ./dist/stats.json",
    "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json"
  },
}
```

## 优化

### [noParse](https://webpack.js.org/configuration/module/)

```js
module.exports = {
  module: {
    // 不去解析文件
    noParse: '/jquery|lodash/',
  },
}
```

### [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/)

```js
module.exports = {
  plugins: [
    // 忽略第三方包指定目录
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
}
```

```js
import 'moment/locale/zh-cn'
```

### [DllPlugin](https://webpack.js.org/plugins/dll-plugin/)

```js
// webpack.dll.config.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'lodash', 'element-ui', 'axios'],
  },
  output: {
    path: path.resolve(__dirname, 'public/vendor'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    // 动态链接库DLL
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.join(__dirname, 'public', 'vendor', '[name]-manifest.json'),
    }),
  ],
}
```

```js
// webpack.config.js
const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  plugins: [
    new AddAssetHtmlPlugin({
      filepath: require.resolve(
        path.resolve(__dirname, 'public/vendor/vendor.dll.js')
      ),
      outputPath: 'vendor',
      publicPath: 'vendor',
    }),
    new HtmlWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.join(
        __dirname,
        'public',
        'vendor',
        'vendor-manifest.json'
      ),
    }),
  ],
}
```

```json
// package.json
{
  "scripts": {
    "dll": "webpack --config webpack.dll.config.js"
  }
}
```

### [happypack](https://github.com/amireh/happypack)

```shell
yarn add happypack -D
```

```js
const HappyPack = require('happypack')

module.exports = {
  plugins: [
    //并行打包
    new HappyPack({
      id: 'babel',
      loaders: [
        {
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
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: 'happypack/loader?id=babel',
      },
    ],
  },
}
```

### [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

### Scope Hoisting

- [ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)

### 提取公共代码

- [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)
- [common-chunk-and-vendor-chunk](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)

### 懒加载

- [Lazy Loading](https://webpack.js.org/guides/lazy-loading/)
- [Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)

```js
//main.js
document.getElementById('btn').addEventListener('click', function() {
  import(/* webpackChunkName:"show" */ './show').then(show => {
    show('Webpack')
  })
})
//show.js
module.exports = function(content) {
  window.alert('Hello ' + content)
}
```

### 热更新

```js
const webpack = require('webpack')

module.exports = {
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
```

```js
// 业务代码
if (module.hot) {
  module.hot.accept('./hello.js', function() {
    div.innerHTML = hello()
  })
}
```

### CDN

```js
module.exports = {
  entry: {
    pageA: './pageA',
    pageB: './pageB',
    pageC: './pageC',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
}
```
