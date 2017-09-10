const path = require('path');
const babelConfigNode = require('./babel.config').node;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    app: [
      './src/server.jsx',
    ],
  },
  externals: [nodeExternals()],
  target: 'node',
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   addImport: [path.resolve(__dirname, 'addImport'), 'add'],
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
     {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfigNode,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
