const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');

const PUBLIC_PATH = process.env.PUBLIC_PATH || '';

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: PUBLIC_PATH + '/'
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.scss$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8
    })
  ]
});
