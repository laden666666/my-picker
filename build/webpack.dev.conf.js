var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('../package.json')
var port = '8088';

module.exports = {
	//页面入口文件配置
	entry: {
		index: path.join(__dirname, "../src/index.ts"),
	},
	output: {
		path: path.join(__dirname, "../dist/"),
		library: 'myPicker',
		libraryTarget: 'umd',
		// 生成的打包文件名  
		filename: 'my-picker.js',
        publicPath: '/'
	},
    resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
	},
	module: {
        //加载器配置
        loaders: [{
            test: /\.(js)$/,
			include: path.join(__dirname, '../src'),
			use: {
				loader: 'babel-loader',
				options: {
					"presets": ["es2015", "stage-3"],
				}
			}
        }, {
			test: /\.ts(x?)$/,
			include: path.join(__dirname, '../src'),
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					"presets": ["es2015", "stage-3"],
				}
			}, {
				loader: 'ts-loader',
			}]
		}, {
            test: /\.(png|jpg|gif|wav|mp3)$/,
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
			use: [
				"style-loader",
				'css-loader?minimize',
				'sass-loader',
				{
					loader: 'postcss-loader',
					options: {
						config: {
							path: path.join(__dirname, '../.postcssrc.js')
						}
					}
				},
			],
        },]
	},
	//插件项
	plugins: [
		// 读取版本
        new webpack.DefinePlugin({
            PLUGIN_VERSION: '"v' + package.version + '"'
        }),
		// 启用作用域提升（scope hoisting）
		new webpack.optimize.ModuleConcatenationPlugin(),
		// 代码热替换
		new webpack.HotModuleReplacementPlugin(),
		// 生成最终HTML
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './build/index.html',
			inject: 'head',
			hash: true,
			minify: {
				// 移除HTML中的注释
				removeComments: true,
				// 删除空白符与换行符   
				collapseWhitespace: false
			}
		}),
	],
	devtool: 'source-map',
	devServer: {
		port: port,
		// gzip
		compress: true,
		// 不跳转
		historyApiFallback: false,
		// 实时刷新
		inline: true,
		// 隐藏 webpack 包 bundle 信息，错误和警告仍然会显示。
		noInfo: false
	}
};