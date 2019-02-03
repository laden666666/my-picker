declare const _default: {
    /**
     * 是否是IE
     * @returns
     */
    isIE(): boolean;
    /**
     * 是否是webkit
     * @returns
     */
    isWebKit(): boolean;
    /**
     * 是否是火狐
     * @returns
     */
    isFirefox(): boolean;
    /**
     * 判断是否是本安卓
     */
    isAndroid(): boolean;
    /**
     * 判断是否是老版本安卓（小于安卓4.4）
     */
    androidVersion(): number;
};
export default _default;
