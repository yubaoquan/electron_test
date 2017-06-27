const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vue: 'vue',
        axios: 'axios',
        VueRouter: 'vue-router',
        main: './script/s1',
    },
    target: 'electron-renderer',
    resolve: {
        alias: {
            js: path.resolve('./script'),
            vueDir: path.resolve('./vue'),
            vue: 'vue/dist/vue.js',
            'vue-router': 'vue-router/dist/vue-router.js'
        }
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'script/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$|\.less$/i,
                use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
            },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
            // },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'   // loader to use for matched files
                }
            }, {
                test: /\.html$/,
                use: {
                    loader: 'raw-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vue', 'VueRouter', 'axios', 'manifest']
        }),
        new ExtractTextPlugin('./stylesheet/main.css')
    ]
};
