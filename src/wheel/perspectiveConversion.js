/**
 * 根据坐标y、圆半径、总长度计算偏移角度。用户触摸的是滚轮的div,而滚轮却被透视效果缩放了,这里要计算这个缩放比例,以模拟出是在触摸透视后的滚轮,而不是透视前的。
 * @param y                 相对于滚轮高度2分之一处的坐标。这里将滚轮2分之一处设为x轴。所有参数坐标单位都是vmin
 * @param radius            滚轮的半径。其实他是定值,根据滚轮高度计算而来
 * @param wheelHeight       滚轮的高度
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