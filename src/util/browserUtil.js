module.exports = {
    isIE : !!~navigator.userAgent.toUpperCase().indexOf("MSIE"),
    isFirefox : !!~navigator.userAgent.toUpperCase().indexOf("Firefox"),
    isChrome : window.navigator.userAgent.indexOf("Chrome") !== -1 
}