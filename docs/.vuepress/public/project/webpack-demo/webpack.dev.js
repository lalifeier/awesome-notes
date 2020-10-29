const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  // 动态监测并实时更新页面
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    // 默认端口8080，可不填
    port: 9000,
    compress: true,
    // 热更新，无需刷新
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
}

module.exports = merge(commonConfig, devConfig)
