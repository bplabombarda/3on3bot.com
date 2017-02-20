const { resolve }       = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const autoprefixer      = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// detemine build env
var ENV = process.env.npm_lifecycle_event === 'build' ? 'prod' : 'dev';

const commonConfig = {
  output: {
    path:   resolve(__dirname, 'dist'),
    pathinfo: !ENV.prod,
    //  publicPath: '',
  },

  context: resolve(__dirname),

  devtool: ENV.prod ? 'source-map' : 'cheap-module-eval-source-map',

  bail: ENV.prod,

  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         rules: { semi: 0 }
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          },
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

if ( ENV === 'dev') {
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

if ( ENV === 'prod') {
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
          from: 'src/images/',
          to:   'images/'
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
