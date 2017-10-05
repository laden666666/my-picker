var webpackConfig = require('./webpack.prod.conf')
var webpack = require('webpack');

webpackConfig.output.filename = 'my-picker.min.js'
webpackConfig.plugins.push(
    // JS 压缩插件
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        sourceMap: true
    })
)

module.exports = webpackConfig
