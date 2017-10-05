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
            library: 'myPicker',
            libraryTarget: 'umd',
            // 生成的打包文件名
            filename: 'my-picker.js',
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

    }, function (err, stats) {

    })
})
