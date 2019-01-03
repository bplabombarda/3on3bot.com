global.__rootdir = require('path').resolve(__dirname, '../../')

const autoprefixer      = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');

const IN_PATH = `${ __rootdir }/src/index.js`
const OUT_PATH = `${ __rootdir }/build`

module.exports = {
  entry: [
    IN_PATH
  ],

  output: {
    path: OUT_PATH
  },

  context: __rootdir,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg|png)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject:   'body',
      filename: 'index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css/,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ]
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.json', '.css', '.scss']
  }
}