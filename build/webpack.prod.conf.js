var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

// webpack配置
module.exports = {

    entry: '../src/picker.js',
    output: {
        path: path.join(__dirname, "../dist/"),
        library: 'myPicker',
        libraryTarget: 'umd',
        filename: 'my-picker.js'
    },
    plugins: [
        //压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        //css独立打包
        new ExtractTextPlugin("my-picker.css"),
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: "style!css!sass",
        },{
            test: /\.(css)$/,
            // 多个加载器通过“!”连接
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            // url-loader 支持base64 编码的行内资源
            loader: 'url-loader?size=8192'
        }, {
            test: /\.(wav|mp3)?$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    postcss: [
        autoprefixer({
            browsers: ['last 3 versions', '> 1%']
        })
    ],
};