var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var path = require('path')

webpack(webpackConfig, function (err, stats) {
    //
    webpack({
        //页面入口文件配置
        entry: {
            index: path.join(__dirname, "../dist/my-picker"),
        },
        output: {
            path: path.join(__dirname, "../dist/"),
            filename: 'my-picker.min.js',
        },
        //插件项
        plugins: [
            // JS 压缩插件
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
                sourceMap: true
            })
        ],
        devtool: 'source-map',
    }, function (err, stats) {

    })
})
