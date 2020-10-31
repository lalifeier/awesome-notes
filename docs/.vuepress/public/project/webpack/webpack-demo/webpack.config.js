const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production', //模式 默认两种 production development
  entry: './src/index.js', //入口
  watch: true,
  watchOptions: {
    aggregateTimeout: 500, //防抖
    poll: 1000, //每秒,
    ignored: /node_modules/,
  },
  output: {
    filename: 'bundle.[hash:8].js', //打包后的文件名
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/', //cdn
  },
  resolve: {
    modules: ['node_modules'],
    // 支持缩写
    extensions: [
      '.jsx',
      '.js',
      '.web.ts',
      '.web.tsx',
      '.web.js',
      '.web.jsx',
      '.ts',
      '.tsx',
      '.json',
    ],
    // 别名
    alias: {
      '@': path.join(__dirname, 'src'),
      '@components': path.resolve(__dirname, '../components'),
      '@utils': path.resolve(__dirname, '../utils'),
    },
    mainFields: ['browser', 'module', 'main'],
    mainFiles: ['index'],
  },
  devtool: 'source-map', //source-map eval-source-map cheap-module-source-map cheap-module-eval-source-map
  devServer: {
    //开发服务器配置
    port: 3000, //端口
    progress: true, //显示编译进度
    contentBase: './build', //指定访问资源目录
    compress: true, //gzip压缩
    open: false, //自动打开浏览器
    //mock
    // before: function(app, server, compiler) {
    //   app.get('/some/path', function(req, res) {
    //     res.json({ custom: 'response' })
    //   })
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
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
    // 自动清空dist目录
    new CleanWebpackPlugin(),
    // 拷贝文件
    new CopyPlugin({
      patterns: [{ from: 'doc', to: './' }],
    }),
    //版权声明
    new webpack.BannerPlugin({
      banner: '2020 by lalifeier',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
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
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre',
      //     },
      //   },
      // },
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1 * 1024,
              outputPath: 'img/',
              publicPath: '',
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
