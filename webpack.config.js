const path = require('path');
const webpack = require('webpack');
const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bable: 'babel-polyfill',
        index: './demo/index',
        custom: './demo/custom/index',
        autosort: './demo/autosort/index',
        animate: './demo/animate/index'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },

            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9'
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './',
        port: 9999,
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: './demo/custom/index.html',
            template: './demo/custom/index.html',
            inject: true,
            chunks: ['custom']
        }),
        new HtmlWebpackPlugin({
            filename: './demo/autosort/index.html',
            template: './demo/autosort/index.html',
            inject: true,
            chunks: ['autosort']
        }),
        new HtmlWebpackPlugin({
            filename: './demo/animate/index.html',
            template: './demo/animate/index.html',
            inject: true,
            chunks: ['animate']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};