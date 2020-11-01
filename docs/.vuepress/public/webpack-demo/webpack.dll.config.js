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
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.join(__dirname, 'public', 'vendor', '[name]-manifest.json'),
    }),
  ],
}
