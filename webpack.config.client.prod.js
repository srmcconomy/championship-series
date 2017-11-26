const path = require('path');
const babelConfigClientProd = require('./babel.config').clientProd;
const webpack = require('webpack');
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.client.common');

module.exports = merge(common, {
  entry: {
    // app: [
    //   './src/client.jsx',
    // ],
    login: [
      './src/login.jsx',
    ],
    leaderboard: [
      './src/leaderboard.jsx',
    ],
    rupeeGoal: [
      './src/rupeeClient.jsx',
    ],
    chestGoal: [
      './src/chestClient.jsx',
    ],
    heartGoal: [
      './src/heartClient.jsx',
    ],
    enemyGoal: [
      './src/enemyClient.jsx',
    ],
    admin: [
      './src/admin.jsx',
    ],
  },
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: config.clientOutputPath,
    publicPath: '/dist/',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ],
        }),
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfigClientProd,
        },
      }, {
        test: /(\.svg$|\.otf$|\.png$)/,
        use: {
          loader: 'file-loader',
        }
      }
    ],
  },
});
