var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.prod.conf')

var webpackConfig = merge(baseConfig, {
    devtool: '#inline-source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }]
        }]
    },
})

delete webpackConfig.entry


module.exports = webpackConfig
