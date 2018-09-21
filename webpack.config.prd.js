const path = require('path');
const webpack = require('webpack');
const resolve = require('path').resolve;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        bable: 'babel-polyfill',
        index: './demo/index',
        custom: './demo/custom/index',
        autosort: './demo/autosort/index',
        animate: './demo/animate/index',
        process: './demo/process/index'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
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
    plugins: [
        new CleanWebpackPlugin(['dist']),
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
        new HtmlWebpackPlugin({
            filename: './demo/process/index.html',
            template: './demo/process/index.html',
            inject: true,
            chunks: ['process']
        }),
        new webpack.NamedModulesPlugin()
    ]
};