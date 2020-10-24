const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: '8081',
    host: '127.0.0.1',
    proxy: {
      '/': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
}
