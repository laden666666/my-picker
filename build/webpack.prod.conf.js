var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
    //页面入口文件配置
    entry: {
        index: path.join(__dirname, "../src/picker"),
    },
    output: {
        path: path.join(__dirname, "../dist/"),
        library: 'myPicker',
        libraryTarget: 'umd',
        // 生成的打包文件名
        filename: 'my-picker.js',
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					"presets": ["es2015", "stage-3"],
				}
			}
        }, {
            test: /\.(png|jpg|gif|wav)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10,
                        name: 'images/[name].[ext]?[hash:8]'
                    }
                }
            ]
        }, {
            test: /\.(scss|sass|css)$/,  // pack sass and css files
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    'css-loader?minimize',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(__dirname, 'postcss.config.js')
                            }
                        }
                    },
                ],
            })
        },]
    },
    //插件项
    plugins: [
        // 单独抽离 CSS
        new ExtractTextPlugin("my-picker.css"),
    ],
    devtool: 'source-map'
};
