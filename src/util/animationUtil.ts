declare function require(name: string): any
const animationUtil = require("./animationUtil.js")

export default {
    /**
     * 动画开始函数
     * @param {()=>void} fn             东航的回调
     * @returns {number}                动画id
     */
    startAnimation: function (fn: ()=>void): number {
        return animationUtil.startAnimation(fn)
    },
    /**
     * 动画终止函数
     * @param {number} animationId       动画id
     */
    stopAnimation : function (animationId: number) {
        animationUtil.stopAnimation(animationId);
    },
    /**
     * 渐入效果插值
     * @param {number} t            current time（当前时间）
     * @param {number} b            beginning value（初始值）
     * @param {number} c            change in value（变化量）
     * @param {number} d            duration（持续时间）    
     * @returns {number}            插值的结果     
     */
    easeIn: function(t: number, b: number, c: number, d: number): number{
        return animationUtil.easeIn(t, b, c, d);
    },
    /**
     * 淡出效果
     * @param {number} t            current time（当前时间）
     * @param {number} b            beginning value（初始值）
     * @param {number} c            change in value（变化量）
     * @param {number} d            duration（持续时间）    
     * @returns {number}            插值的结果 
     */
    easeOut : function(t: number, b: number, c: number, d: number): number{
        return animationUtil.easeOut(t, b, c, d);
    },
    /**
     * 淡入并淡出效果
     * @param {number} t            current time（当前时间）
     * @param {number} b            beginning value（初始值）
     * @param {number} c            change in value（变化量）
     * @param {number} d            duration（持续时间）    
     * @returns {number}            插值的结果 
     */
    easeInOut : function(t: number, b: number, c: number, d: number): number{
        return animationUtil.easeInOut(t, b, c, d);
    },
}
