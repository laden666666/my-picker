/**
 * Created by njz on 16/11/29.
 */


// 对动画的封装,支持requestAnimationFrame使用requestAnimationFrame封装。
// 若览器不支持requestAnimationFrame情况下的回退，回退到使用setTmeout的情况。
var requestAnimationFrame, cancelAnimationFrame;
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
requestAnimationFrame = requestAnimationFrame || window.requestAnimationFrame || function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};
cancelAnimationFrame = cancelAnimationFrame || window.cancelAnimationFrame || window.cancelRequestAnimationFrame || function (id) {
    clearTimeout(id);
};


module.exports = {
    /**
     * 动画开始函数
     * @param fn
     * @returns {number}        动画id
     */
    startAnimation : function (fn) {
        return requestAnimationFrame(fn);
    },
    /**
     * 动画终止函数
     * @param animationId       动画id
     */
    stopAnimation : function (animationId) {
        cancelAnimationFrame(animationId);
    },
    /**
     * 淡出效果
     * @param t
     * @param b
     * @param c
     * @param d
     * @returns {*}
     */
    easeOut : function (t, b, c, d) {
        return c * ((t = t/d - 1) * t * t + 1) + b;
    },
    /**
     * 淡入并淡出效果
     * @param t
     * @param b
     * @param c
     * @param d
     * @returns {*}
     */
    easeInOut : function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t-2) - 1) + b;
    }
}