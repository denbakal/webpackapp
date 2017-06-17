const webpack = require('webpack');
const path = require('path');
const posrcss = require('postcss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    app: path.join(__dirname, 'src/app'),
    build: path.join(__dirname, 'dist')
};

// configuration
module.exports = {
    entry: {
        'polyfills': PATHS.source + '/polyfills.ts',
        'vendor': PATHS.source + '/vendor.ts',
        'app': PATHS.app + '/main.ts'
    },
    output: {
        path: PATHS.build,
        publicPath: '/',
        filename: '[name].[hash].js',
        // chunkFilename: 'chunk.[id].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: {configFileName: path.resolve('tsconfig.json')}
                }, 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpeg|gif|svg|woff|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash.[ext]]'
            },
            {
                test: /\.css$/,
                exclude: path.resolve('src', 'app'),
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader:'css-loader?sourceMap'})
            },
            {
                test: /\.css$/,
                include: path.resolve('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new ExtractTextPlugin('[name].[hash].css'),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        })
    ]
};