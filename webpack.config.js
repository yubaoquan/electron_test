const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vue: 'vue',
        VueRouter: 'vue-router',
        main: './script/s1',
    },
    target: 'electron-renderer',
    resolve: {
        alias: {
            js: path.resolve('./script'),
            vue: 'vue/dist/vue.js',
            'vue-router': 'vue-router/dist/vue-router.js'
        }
    },
    output: {
        path: path.resolve('./dist/script'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.vue$/, // a regex for matching all files that end in `.vue`
            loader: 'vue-loader'   // loader to use for matched files
        }, {
            test: /\.css$|\.html$/,
            loader: 'raw-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vue', 'VueRouter', 'manifest']
        })
    ]
};
