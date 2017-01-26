var fs = require("fs");
var path = require('path');

/**
 * 因为因为intersectionY是个纯函数是个纯函数,因此可以缓存,这样有利于减少计算,增加动画流畅度。尤其在移动端效果十分明显。这里实现对其的计算
 */
var intersectionY = require('../src/wheel/intersectionY');

//将原来根据vmin的计算,全部改为基于百分比的,因为半径和滚轮高度比例是定值,触摸坐标的范围不超出滚轮高度,所有设滚轮高度wheelHeight是2
var wheelHeight = 2;
var radius = wheelHeight / Math.sqrt(5);

//缓存的值,因为上下是对称的,所有仅计算一半的值就可以
var cache = {};
var y = 0;
for(;y<=100;y+=1){
    cache[y] = intersectionY(y/100, radius, wheelHeight);
}

var w_data = 'module.exports = ' + JSON.stringify(cache);
var w_data = new Buffer(w_data);
fs.writeFile(__dirname + '/../src/wheel/cacheData.js', w_data, {flag: 'w'}, function (err) {
    if(err) {
        console.error(err);
    } else {
        console.log('生成成功!');
    }
});