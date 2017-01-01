/**
 * Created by njz on 17/1/1.
 */
module.exports = function (y, radius, wheelHeight) {
    if(Math.abs(y) >= wheelHeight / 2){
        return Math.sign(y) * Math.atan(1 / 2);
    }

    var a = (y * y + wheelHeight * wheelHeight)/ (wheelHeight * wheelHeight);
    var b = -2 * y * y / wheelHeight;
    var c = (y * y) - (radius * radius);

    var x = (-1 * b + Math.sqrt(b * b - 4 * a * c) ) / 2 / a;
    var y = -1 * y * x / wheelHeight + y;

    return Math.atan(y / x);
}