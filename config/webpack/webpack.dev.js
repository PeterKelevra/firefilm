const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './build',
    inline: true,
    host: 'localhost',
    port: 3000,
    stats: 'errors-only',
    hot: true,
    clientLogLevel: 'silent',
    historyApiFallback: true
  }
});
