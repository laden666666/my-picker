/**
 * 调试样式和js时候使用的文件入口。在调试模式下,会将样式文件和js文件打包在一起。而生存环境下会分开打包
 */
require("./../src/style/style.scss");

module.exports = require("./../src/picker");