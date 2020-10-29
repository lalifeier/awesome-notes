const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 入口js路径
  entry: {
    index: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50 * 1024,
            outputPath: 'assets/img',
            name: '[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1 * 1024,
              outputPath: 'assets/font',
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          outputPath: 'assets/music',
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    // 自动清空dist目录
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // 只对异步引入代码起作用，设置all时并同时配置vendors才对两者起作用
      minSize: 30000, // 引入的库大于30kb时才会做代码分割
      minChunks: 1, // 一个模块至少被用了1次才会被分割
      maxAsyncRequests: 5, // 同时异步加载的模块数最多是5个，如果超过5个则不做代码分割
      maxInitialRequests: 3, // 入口文件进行加载时，引入的库最多分割出3个js文件
      automaticNameDelimiter: '~', // 生成文件名的文件链接符
      name: true, // 开启自定义名称效果
      cacheGroups: {
        vendors: {
          // 配合chunks： ‘all’使用，表示如果引入的库是在node-modules中，那就会把这个库分割出来并起名为vendors.js
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js',
        },
        default: {
          // 为非node-modules库中分割出的代码设置默认存放名称
          priority: -20,
          reuseExistingChunk: true, // 避免被重复打包分割
          filename: 'common.js',
        },
        commons: {
          test: /jquery/,
          name: 'jquery',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    extensions: ['*', '.js', '.vue'],
  },
  // 编译输出配置
  output: {
    publicPath: '/',
    // 输出路径为dist
    path: path.resolve(__dirname, 'dist'),
  },
}
