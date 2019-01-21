const loaderUtils = require('loader-utils');
const fs = require('fs-extra');
const btoa = require('btoa');
const path = require('path');

let demoPath = path.join(__dirname, '../../src/demo/')

module.exports = function codeLoader(source) {

    // 不处理不在demoPath目录以外的文件
    if(path.relative(demoPath, this.resource).startsWith('..')){
        return source
    }

    // 获取base64后的源码
    let sourceCode = btoa(encodeURI(fs.readFileSync(this.resource).toString()))
    let insertCode = 
`;
if(typeof Component !== 'undefined' && Component.exports){
    Component.exports.__vueSource = '${sourceCode}'
}
`

    source = source + insertCode
    return source
};