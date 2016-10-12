var path              = require( 'path' );
var webpack           = require( 'webpack' );
var merge             = require( 'webpack-merge' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var autoprefixer      = require( 'autoprefixer' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var CopyWebpackPlugin = require( 'copy-webpack-plugin' );

console.log( 'WEBPACK GO!');

// detemine build env
var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

// common webpack config
var commonConfig = {

    output: {
        path:     path.resolve( __dirname, 'dist/' ),
        filename: '[hash].js',
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: '/node_modules/',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject:     'body',
            filename: 'index.html'
        }),
        /**
         * This plugin assigns the module and chunk ids by occurence count. What this
         * means is that frequently used IDs will get lower/shorter IDs - so they become
         * more predictable.
         */
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ],

};

// additional webpack settings for local env (when invoked by 'npm start')
if ( TARGET_ENV === 'development' ) {
    console.log( 'Serving locally...');

    module.exports = merge( commonConfig, {

        devtool: 'cheap-module-eval-source-map',

        entry: [
            'whatwg-fetch',
            'webpack-dev-server/client?http://localhost:8080',
            path.join( __dirname, 'src/index.js' )
        ],

        devServer: {
            inline:   true,
            progress: true
        },

        module: {
            loaders: [
                {
                    test: /\.(css|scss)$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }

    });
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if ( TARGET_ENV === 'production' ) {
    console.log( 'Building for prod...');

    module.exports = merge( commonConfig, {

        devtool: 'source-map',

        entry: [
            'whatwg-fetch',
            path.join( __dirname, 'src/index.js' )
        ],

        module: {
            loaders: [
                {
                    test: /\.(css|scss)$/,
                    loader: ExtractTextPlugin.extract( 'style-loader', [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ])
                }
            ]
        },

        plugins: [
            new CopyWebpackPlugin([
                {
                    from: 'src/img/',
                    to:     'img/'
                },
                {
                    from: 'src/favicon.ico'
                },
            ]),
            // extract CSS into a separate file
            new ExtractTextPlugin( './[hash].css', { allChunks: false } ),
            // minify & mangle JS/CSS
            new webpack.optimize.UglifyJsPlugin({
                minimize:     true,
                compressor: { warnings: false }
                // mangle:    true
            })
        ]
    });
}
