declare const _default: {
    /**
     * 兼容es7的assign方法，这样可以省略polyfill
     * @param {object} target
     * @param {...object[]} source
     * @returns {object}
     */
    assign: (target: object, ...source: any[]) => object;
};
export default _default;
