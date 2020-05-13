const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.join(__dirname, dir)

module.exports = function(env, argv) {
  const IS_PROD = env === 'production'
  return {
    context: resolve('src'),
    mode: IS_PROD ? 'none' : 'production',
    entry: './app.js',
    output: {
      path: resolve('./dist'),
      filename: '[name].js',
      globalObject: 'wx'
    },
    devtool: IS_PROD ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
            },
          ],
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyWebpackPlugin([
        {
          from: '**/*',
          to: './',
          ignore: ['**/*.js', '**/*.less']
        }
      ]),
      new MinaWebpackPlugin({
        scriptExtensions: ['.js'],
        assetExtensions: ['.less'],
      }),
      new MiniCssExtractPlugin({ filename: '[name].wxss' })
    ],
    watchOptions: {
			ignored: /dist|manifest|node_modules/,
			aggregateTimeout: 300
		}
  }
}
