module.exports = {
    isIE : !!~navigator.userAgent.toUpperCase().indexOf("MSIE"),
    isFirefox : !!~navigator.userAgent.toUpperCase().indexOf("FIREFOX"),
    isChrome : window.navigator.userAgent.indexOf("Chrome") !== -1 
}

window.browserUtil = {
    isIE : !!~navigator.userAgent.toUpperCase().indexOf("MSIE"),
    isFirefox : !!~navigator.userAgent.toUpperCase().indexOf("FIREFOX"),
    isChrome : window.navigator.userAgent.indexOf("Chrome") !== -1 
}