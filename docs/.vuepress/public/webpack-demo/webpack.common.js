const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HappyPack = require('happypack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  entry: {
    index: './src/index.js',
    // app: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, '../components'),
      '@utils': path.resolve(__dirname, '../utils'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
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
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
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
    new AddAssetHtmlPlugin({
      filepath: require.resolve(
        path.resolve(__dirname, 'public/vendor/vendor.dll.js')
      ),
      outputPath: 'vendor',
      publicPath: 'vendor',
    }),
    new webpack.DllReferencePlugin({
      manifest: path.join(
        __dirname,
        'public',
        'vendor',
        'vendor-manifest.json'
      ),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: 'by lalifeier',
    }),
    // new CopyPlugin({
    //   patterns: [{ from: 'public/vendor', to: 'vendor' }],
    // }),
  ],
  module: {
    noParse: '/jquery|lodash/',
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: 'happypack/loader?id=babel',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1 * 1024,
              outputPath: 'assets/img/',
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
              outputPath: 'assets/font/',
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
}
