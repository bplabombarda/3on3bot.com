const merge = require('webpack-merge');

const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  mode: 'development',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
  ],

  output: {
    filename: 'js/bundle.js',
    pathinfo: true,
  },

  devServer: {
    stats: 'minimal'
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
});