const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    open: true, // uygulama servis edilince browser'da otomatik olarak açılır.
    hot: true,
    disableHostCheck: true // Bunu koymayınca development sunucusunda 'Invalid Host Header [WDS] Disconnected!' şeklinde sürekli hata aldım.
  },
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};