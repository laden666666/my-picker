var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var path = require('path')

var spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig, function (err, stats) {
    //
    if (err) {
        spinner.stop()
        throw err
    }
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
    }, function (err) {
        spinner.stop()
        if (err) {
            throw err
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('    Build failed with errors.\n'))
            process.exit(1)
        }

    })
})
