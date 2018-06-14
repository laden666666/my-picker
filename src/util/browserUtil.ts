let isIE: boolean;
let androidVersion: number
const userAgent = navigator.userAgent

export default {
    /**
     * 是否是IE
     * @returns
     */
    isIE(){
        if(isIE == null){
            isIE = (function () {
                let matches;
                const tridentMap = {
                    '4': 8,
                    '5': 9,
                    '6': 10,
                    '7': 11
                };

                matches = userAgent.match(/MSIE (\d+)/i);
                if(matches && matches[1]) {
                    return !!+matches[1];
                }
                matches = userAgent.match(/Trident\/(\d+)/i);
                if(matches && matches[1]) {
                    return !!tridentMap[matches[1]] || false;
                }
                //we did what we could
                return false;
            } ());
        }
        return isIE;
    },
    /**
     * 是否是webkit
     * @returns
     */
    isWebKit(){
        return userAgent.indexOf('AppleWebKit') > -1;
    },
    /**
     * 是否是火狐
     * @returns
     */
    isFirefox(){
        return (userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') == -1);
    },
    /**
     * 判断是否是本安卓
     */
    isAndroid(){
        return (/Android/i).test(userAgent)
    },
    /**
     * 判断是否是老版本安卓（小于安卓4.4）
     */
    androidVersion(){
        if(!androidVersion){
            const webkitVersionMap = (/AppleWebKit\/([\d.]+)/i).exec(userAgent);
            const appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
            androidVersion = (function() {
                // This matches Android Major.Minor.Patch versions
                // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
                const match = userAgent.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);

                if (!match) {
                return null;
                }

                const major = match[1] && parseFloat(match[1]);
                const minor = match[2] && parseFloat(match[2]);

                if (major && minor) {
                    return parseFloat(match[1] + '.' + match[2]);
                } else if (major) {
                    return major;
                }
                return null;
            }());
        }

        return androidVersion
    },
}

