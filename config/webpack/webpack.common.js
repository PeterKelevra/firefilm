const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
require('dotenv').config();

module.exports = {
  context: path.join(process.cwd(), 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@public': path.join(process.cwd(), 'public/')
    }
  },
  entry: ['./index.tsx'],
  output: {
    path: path.join(process.cwd(), 'build')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.pdf$/i,
        loader: 'file-loader',
        options: {
          mimetype: 'application/octet-stream',
          esModule: false
        }
      },
      {
        test: /\.(png|jpg|ico|gif|svg)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false
        }
      },
      {
        test: /\.(woff(2)?|otf|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_DATABASE_URL',
        'FIREBASE_PROJECT_ID',
        'REACT_APP_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID'
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true
    }),
    new CopyWebpackPlugin({ patterns: [
      { from: '../public/images', to: 'assets/images' }
    ] })
  ]
};
