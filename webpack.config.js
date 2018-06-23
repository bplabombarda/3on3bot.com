const { resolve }       = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const autoprefixer      = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.npm_lifecycle_event === 'build' ? 'prod' : 'dev';

const commonConfig = {
  output: {
    path:   resolve(__dirname, 'dist'),
    pathinfo: !ENV.prod,
  },

  context: resolve(__dirname),

  devtool: ENV.prod ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    stats: 'minimal'
  },

  bail: ENV.prod,

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
    extensions: [".js", ".json", ".css", ".scss"]
  }
}

if ( ENV === 'dev') {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {
    mode: 'development',

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

if ( ENV === 'prod') {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {
    mode: 'production',

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
} 