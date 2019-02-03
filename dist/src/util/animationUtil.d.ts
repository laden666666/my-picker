declare const _default: {
    /**
     * 动画开始函数
     * @param {()=>void} fn             东航的回调
     * @returns {number}                动画id
     */
    startAnimation: (fn: () => void) => number;
    /**
     * 动画终止函数
     * @param {number} animationId       动画id
     */
    stopAnimation: (animationId: number) => void;
    /**
     * 渐入效果插值
     * @param {number} t            current time（当前时间）
     * @param {number} b            beginning value（初始值）
     * @param {number} c            change in value（变化量）
     * @param {number} d            duration（持续时间）
     * @returns {number}            插值的结果
     */
    easeIn: (t: number, b: number, c: number, d: number) => number;
    /**
     * 淡出效果
     * @param {number} t            current time（当前时间）
     * @param {number} b            beginning value（初始值）
     * @param {number} c            change in value（变化量）
     * @param {number} d            duration（持续时间）
     * @returns {number}            插值的结果
     */
    easeOut: (t: number, b: number, c: number, d: number) => number;
    /**
     * 淡入并淡出效果
     * @param {number} t            current time（当前时间）
     * @param {number} b            beginning value（初始值）
     * @param {number} c            change in value（变化量）
     * @param {number} d            duration（持续时间）
     * @returns {number}            插值的结果
     */
    easeInOut: (t: number, b: number, c: number, d: number) => number;
};
export default _default;
