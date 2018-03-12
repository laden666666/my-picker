let isIE: boolean;
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
}