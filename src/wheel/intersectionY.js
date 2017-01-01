/**
 * 根据坐标y、圆半径、总长度计算偏移角度
 * @param y
 * @param radius
 * @param wheelHeight
 * @returns {number}
 */
module.exports = function (y, radius, wheelHeight) {
    if(Math.abs(y) >= wheelHeight / 2){
        return Math.sign(y) * Math.atan(2);
    }

    var a = (y * y + wheelHeight * wheelHeight)/ (wheelHeight * wheelHeight);
    var b = -2 * y * y / wheelHeight;
    var c = (y * y) - (radius * radius);

    var x = (-1 * b + Math.sqrt(b * b - 4 * a * c) ) / 2 / a;
    var y = -1 * y * x / wheelHeight + y;

    return Math.atan(y / x);
}