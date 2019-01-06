const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  mode: 'production',

  output: {
    filename: 'js/[hash].js',
  },

  devtool: 'source-map',

  bail: true,

  module: {
    rules: [
      {
        test: /\.(css|styl)$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ]
      }
    ]
  }
});