const { resolve }       = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const autoprefixer      = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const commonConfig = {
  output: {
    path:   resolve(__dirname, 'dist'),
    pathinfo: !prod,
  },

  context: resolve(__dirname),

  devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',

  bail: prod,

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
      test: /\.css|scss/,
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
    extensions: [".js", ".json", ".jsx", ".css", ".scss"]
  }
}

if (prod) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {
    entry: resolve(__dirname, 'src/index.js'),

    output: {
      filename: 'js/[hash].js',
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ]
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/assets/',
          to:   'assets/'
        },
      ]),
      // new ExtractTextPlugin({
      //   filename: 'css/[hash].css',
      //   allChunks: false
      // }),
      new webpack.optimize.UglifyJsPlugin({
        minimize:   true,
        compressor: { warnings: false }
        // mangle:  true
      }),
    ],
  });
} else {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      resolve(__dirname, 'src/index.js'),
    ],

    output: {
      filename: 'js/bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ]
        }
      ]
    },
  });
}
