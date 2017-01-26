var cacheData = require("./cacheData");

/**
 * 因为intersectionY是个纯函数,因此可以缓存,这样有利于减少计算,增加动画流畅度。尤其在移动端效果十分明显。
 * 计算工作由test/calcIntersectionCache完成,这里只是将其计算结果封装为一个函数
 */
module.exports = function (y, radius, wheelHeight) {

    //计算比例
    var ratio = Math.round(y * 200 / wheelHeight);
    ratio = Math.max(-100,ratio);
    ratio = Math.min(100,ratio)
    return y < 0 ? -1 * cacheData[Math.abs(ratio)] : cacheData[Math.abs(ratio)];
}