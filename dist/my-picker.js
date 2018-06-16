(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myPicker"] = factory();
	else
		root["myPicker"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var myJquery = __webpack_require__(12);
exports.default = myJquery(document);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @file 获取0.01em的实际像素值
 */

Object.defineProperty(exports, "__esModule", { value: true });
function em() {
    //根据屏幕的dpr判断em大小。如果dpr不是1，说明不是pc屏幕，此时选取window.innerWidth和window.innerHeight最小值的100分之一做1em。
    //如果dpr是1，表示可能是pc屏幕，此时要求控件不能过大，所以去window.innerWidth、window.innerHeight、650当中的最小值的100分之一做1em
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return Math.min(window.innerWidth, window.innerHeight) / 100;
    } else {
        return Math.min(window.innerWidth, window.innerHeight, 650) / 100;
    }
}
exports.em = em;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //滚轮的高度
    WHEEL_HEIGHT: 85,
    //在3D透视滚轮中，每个可选项在滚轮上的角度
    WHEEL_ITEM_ANGLE: 15,
    //在非3D透视滚轮中，一个滚轮的一个刻度的高度，单位是0.01em
    // WHEEL_ITEM_HIGHT : 85 - (85 * 41.6 * 2 / 100) ,
    WHEEL_ITEM_HIGHT: 85 - 85 * 41.6 * 2 / 100,
    //滚轮因惯性而发生的减速滑动时间
    WHEEL_TRANSITION_TIME: 400
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var _isIE = void 0;
var _androidVersion = void 0;
var userAgent = navigator.userAgent;
exports.default = {
    /**
     * 是否是IE
     * @returns
     */
    isIE: function isIE() {
        if (_isIE == null) {
            _isIE = function () {
                var matches = void 0;
                var tridentMap = {
                    '4': 8,
                    '5': 9,
                    '6': 10,
                    '7': 11
                };
                matches = userAgent.match(/MSIE (\d+)/i);
                if (matches && matches[1]) {
                    return !!+matches[1];
                }
                matches = userAgent.match(/Trident\/(\d+)/i);
                if (matches && matches[1]) {
                    return !!tridentMap[matches[1]] || false;
                }
                //we did what we could
                return false;
            }();
        }
        return _isIE;
    },

    /**
     * 是否是webkit
     * @returns
     */
    isWebKit: function isWebKit() {
        return userAgent.indexOf('AppleWebKit') > -1;
    },

    /**
     * 是否是火狐
     * @returns
     */
    isFirefox: function isFirefox() {
        return userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') == -1;
    },

    /**
     * 判断是否是本安卓
     */
    isAndroid: function isAndroid() {
        return (/Android/i.test(userAgent)
        );
    },

    /**
     * 判断是否是老版本安卓（小于安卓4.4）
     */
    androidVersion: function androidVersion() {
        if (!_androidVersion) {
            var webkitVersionMap = /AppleWebKit\/([\d.]+)/i.exec(userAgent);
            var appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
            _androidVersion = function () {
                // This matches Android Major.Minor.Patch versions
                // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
                var match = userAgent.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
                if (!match) {
                    return null;
                }
                var major = match[1] && parseFloat(match[1]);
                var minor = match[2] && parseFloat(match[2]);
                if (major && minor) {
                    return parseFloat(match[1] + '.' + match[2]);
                } else if (major) {
                    return major;
                }
                return null;
            }();
        }
        return _androidVersion;
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var animationUtil = __webpack_require__(13);
exports.default = {
    /**
     * 动画开始函数
     * @param {()=>void} fn             东航的回调
     * @returns {number}                动画id
     */
    startAnimation: function startAnimation(fn) {
        return animationUtil.startAnimation(fn);
    },
    /**
     * 动画终止函数
     * @param {number} animationId       动画id
     */
    stopAnimation: function stopAnimation(animationId) {
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
    easeIn: function easeIn(t, b, c, d) {
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
    easeOut: function easeOut(t, b, c, d) {
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
    easeInOut: function easeInOut(t, b, c, d) {
        return animationUtil.easeInOut(t, b, c, d);
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cacheData = __webpack_require__(14);

/**
 * 因为perspectiveConversion是个纯函数,因此可以缓存,这样有利于减少计算,增加动画流畅度。尤其在移动端效果十分明显。
 * 计算工作由test/calcIntersectionCache完成,这里只是将其计算结果封装为一个函数
 */
module.exports = function (y, radius, wheelHeight) {

    //计算比例
    var ratio = Math.round(y * 200 / wheelHeight);
    ratio = Math.max(-100, ratio);
    ratio = Math.min(100, ratio);
    return y < 0 ? -1 * cacheData[Math.abs(ratio)] : cacheData[Math.abs(ratio)];
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domUtil = __webpack_require__(0);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _browserUtil = __webpack_require__(3);

var _browserUtil2 = _interopRequireDefault(_browserUtil);

var _dataURLtoU8arr = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 滚轮滚动时候发声的函数,是一个单例模式
 */
var tick = __webpack_require__(16);


function AudioImpl() {
    var _this = this;

    //#4，如果支持mse优先使用mse，这样解决base64禁止发音的问题
    this.audio = (0, _domUtil2.default)('<audio></audio>')[0];

    var MediaSource = window.MediaSource || window.WebkitMediaSource;
    if (MediaSource && MediaSource.isTypeSupported('audio/mpeg')) {
        var mediaSource = new MediaSource();
        this.audio.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', function (e) {
            var sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            sourceBuffer.addEventListener('updateend', function () {
                mediaSource.endOfStream();
            });
            sourceBuffer.appendBuffer((0, _dataURLtoU8arr.dataURLtoU8arr)(tick));
        });
    } else {
        this.audio.src = tick;
    }
    (0, _domUtil2.default)(this.audio).on('loadedmetadata', function () {
        _this.audio.volume = 0.2;
    });
}

AudioImpl.prototype.play = function () {
    try {
        if (this.audio) {
            // #5 参考https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
            var isPlaying = this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;

            if (!isPlaying) {
                this.audio.play();
                if (_browserUtil2.default.isAndroid() && _browserUtil2.default.androidVersion() < 5) {
                    this.audio = (0, _domUtil2.default)('<audio></audio>')[0];
                    this.audio.src = tick;
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
};

var audioImpl;

module.exports = function () {
    if (audioImpl) {
        return audioImpl;
    } else {
        audioImpl = new AudioImpl();
        return audioImpl;
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Picker_1 = __webpack_require__(8);
module.exports = function (option) {
    return new Picker_1.Picker(option);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Col_1 = __webpack_require__(9);
var defaultOption_1 = __webpack_require__(10);
var Wheel3D_1 = __webpack_require__(11);
var Wheel_1 = __webpack_require__(17);
var browserUtil_1 = __webpack_require__(3);
var util_1 = __webpack_require__(18);
var Frame = __webpack_require__(19);
__webpack_require__(20);

var Picker = function () {
    function Picker(options) {
        _classCallCheck(this, Picker);

        //滚轮列表
        this._wheels = [];
        //主框架
        this._cols = [];
        this.version = '0.1.5';
        //用用户配置,覆盖默认配置,生成当前控件的实例的配置
        this._option = util_1.default.assign({}, defaultOption_1.default, options);
        //主架
        this._frame = new Frame(this, this._option);
        //解析cols属性,将其转换为Cols的数组
        var cols = [],
            i = 0;
        if (Array.isArray(this._option.cols)) {
            //如果cols为空数组,或者里面的元素是字符串,表示仅一个滚轮,就是cols本身
            if (this._option.cols.length === 0 || typeof this._option.cols[0] === 'string') {
                cols.push(new Col_1.Col(this._option.cols));
            } else {
                //否则表示数组中的每个元素都是个滚轮
                for (i = 0; i < this._option.cols.length; i++) {
                    cols.push(new Col_1.Col(this._option.cols[i]));
                }
            }
        } else {
            //如果不是数组,表示有cols是一个json形式配置的滚轮
            cols.push(new Col_1.Col(this._option.cols));
        }
        this._cols = cols;
        //构造滚轮
        this._wheels = [];
        var wheel, col;
        for (var _i = 0; _i < cols.length; _i++) {
            var _col = cols[_i];
            //设置滚轮
            wheel = !browserUtil_1.default.isIE() && !(browserUtil_1.default.isAndroid() && browserUtil_1.default.androidVersion() < 4.4) && this._option.isPerspective ? new Wheel3D_1.Wheel3D(this, _col, this._option, _i) : new Wheel_1.Wheel(this, _col, this._option, _i);
            this._wheels.push(wheel);
            this._frame.body().append(wheel.getDOM());
            //重写wheel的onSelectItem事件
            var that = this;
            wheel.addSelectItemListener(function (i) {
                return function (index, value) {
                    //如果用户注册了onSelectItem
                    if (typeof that._option.onSelectItem == 'function') {
                        that._option.onSelectItem.call(that, i, index, value);
                    }
                };
            }(_i));
        }
        for (var _i2 = 0; _i2 < cols.length; _i2++) {
            //设置滚轮的选项
            that.setValue(_i2, that._option.setValues[_i2]);
        }
        //是否可见
        this._visible = false;
    }
    //是否可见


    _createClass(Picker, [{
        key: "show",

        /**
         * 显示
         */
        value: function show() {
            this._frame.showCover();
            this._frame.showFrame();
            this._visible = true;
        }
        /**
         * 隐藏
         */

    }, {
        key: "hide",
        value: function hide() {
            this._frame.hideCover();
            this._frame.hideFrame();
            this._visible = false;
        }
        /**
         * 关闭
         */

    }, {
        key: "close",
        value: function close() {
            this._frame.close();
            this._frame.hideCover();
            this._option = null;
            this._wheels.forEach(function (wheel) {
                return wheel.destroy();
            });
            this._wheels = null;
            this._frame = null;
            this._cols = null;
        }
        /**
         * 设置滚轮的可选值列表
         * @param {number} index    滚轮的index,从0开始记录
         * @param {any[]} list      滚轮的可选值列表
         * @param {*} defaultValue  默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值
         */

    }, {
        key: "setOptions",
        value: function setOptions(index, list, defaultValue) {
            if (this._wheels[index]) this._wheels[index].setOptions(list, defaultValue);
        }
        /**
         * 获取滚轮的可选值列表
         * @param {number} index    滚轮的index,从0开始记录
         */

    }, {
        key: "getOptions",
        value: function getOptions(index) {
            if (this._wheels[index]) {
                return this._wheels[index].getOptions();
            } else {
                return null;
            }
        }
        /**
         * 设置滚轮的可选值
         * @param {number} index    滚轮的index,从0开始记录
         * @param {*} value         设置的值
         */

    }, {
        key: "setValue",
        value: function setValue(index, value) {
            if (this._wheels[index]) this._wheels[index].selectOption(value);
        }
        /**
         * 获取滚轮的值,如果index为空表示获取所有滚轮的值
         * @param {number} index    滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
         */

    }, {
        key: "getValue",
        value: function getValue(index) {
            if (index != null) {
                if (this._wheels[index]) return this._wheels[index].getValue();
            } else {
                var values = [];
                var i;
                for (i = 0; i < this._cols.length; i++) {
                    values.push(this._wheels[i].getValue());
                }
                return values;
            }
        }
    }, {
        key: "visible",
        get: function get() {
            return this._visible;
        }
    }]);

    return Picker;
}();

exports.Picker = Picker;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @file 将用户数据封装为列对象
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Col = function () {
    function Col(colOption) {
        _classCallCheck(this, Col);

        this.prefix = "";
        this.suffix = "";
        this.labelKey = "label";
        this.valueKey = "value";
        //列的类型，0：未知 1：字符串数组 2：对象数组
        this.type = 0;
        //如果option是一个数组,视为仅存在options的情况
        if (Array.isArray(colOption)) {
            this.options = colOption;
            this.type = 1;
        } else {
            this.options = colOption.options || [];
            if (this.options.length > 0) {
                if (typeof this.options[0] === 'string') {
                    this.type = 1;
                } else {
                    this.type = 2;
                }
            } else {
                this.type = 0;
            }
            this.prefix = colOption.prefix || "";
            this.suffix = colOption.suffix || "";
            this.labelKey = colOption['labelKey'] || this.labelKey;
            this.valueKey = colOption['valueKey'] || this.valueKey;
        }
    }

    _createClass(Col, [{
        key: "push",
        value: function push(item) {
            this.options.push(item);
        }
    }, {
        key: "set",
        value: function set(index, item) {
            if (this.type == 0) {
                this.type = typeof item === 'string' ? 1 : 2;
            }
            this.options[index] = item;
        }
    }, {
        key: "setCol",
        value: function setCol() {}
    }, {
        key: "getValue",
        value: function getValue(index) {
            if (this.type == 1) {
                return this.options[index];
            } else {
                return this.options[index][this.valueKey];
            }
        }
    }, {
        key: "getLabel",
        value: function getLabel(index) {
            if (this.type == 1) {
                return this.options[index];
            } else {
                return this.options[index][this.labelKey];
            }
        }
    }]);

    return Col;
}();

exports.Col = Col;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户默认配置
 */
var defaultOptions = {
    cols: [[]],
    setValues: [],
    onSelectItem: null,
    onOkClick: null,
    onCancelClick: null,
    fontSize: 15,
    isPerspective: true,
    hasVoice: true,
    title: '',
    buttons: ["确定", "取消"],
    zIndex: 100
};
exports.default = defaultOptions;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * 滚轮类,是显示选择器可选项的滚轮体，3D模式型的，有透视效果
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var domUtil_1 = __webpack_require__(0);
var em_1 = __webpack_require__(1);
var animationUtil_1 = __webpack_require__(4);
var constant_1 = __webpack_require__(2);
var perspectiveConversion = __webpack_require__(5);
var tick = __webpack_require__(6)();

var Wheel3D = function () {
    function Wheel3D(picker, col, option, index) {
        _classCallCheck(this, Wheel3D);

        ///////////////////滚轮显示属性
        //最大转角
        this.maxAngle = 0;
        //最小转角,设置可选项列表后需重新计算
        this.minAngle = 0;
        //滚轮的实际半径,因为有透视效果,所以滚轮实际半径比容器的高度的一半还小。根据勾股定理,计算得实际半径是容器高度的根号5分之1
        this.radius = constant_1.default.WHEEL_HEIGHT / Math.sqrt(5);
        //计算标签可显示的角度的绝对值。因为透视关系,所以可见的标签角度小于90度
        this.visibleAngle = 0;
        //获取0.01em的实际像素值
        this.em = em_1.em;
        //获得控件到body最顶端的距离,计算触摸事件的offsetY时候使用
        this.offsetTop = 0;
        ////////////////////滚动属性
        //滚轮转动前初始的转角,用于计算滚轮是否转动过
        this.originalAngle = 0;
        //一次拖动过程中滚轮被转动的最大角度
        this.lastIndexAngle = 0;
        //当前的刻度,计算发声时候会用到。发声要进过一个刻度线或者达到一个新刻度新才会发声。所以需要记录上一次的刻度线。
        this.changeMaxAngle = 0;
        //当前滚轮转角
        this.angle = 0;
        //当前被选值的index
        this.selectedIndex = -1;
        //记录惯性滑动动画的id
        this.animationId = -1;
        //速度，供触摸离开时候的惯性滑动动画使用
        this.speed = 0;
        //当前时间戳,主要是计算转动速度使用的
        this.timeStamp = 0;
        //记录上一次触摸节点的offsetY,主要是是计算转动速度使用的
        this.lastY = 0;
        //是否开始触摸,主要给鼠标事件使用
        this.isDraging = false;
        //正在播放的刻度音
        this.audio = null;
        ////////////////////可选项属性
        //可选项列表
        this.list = [];
        //根据值生成的hashmap,主要是为了快速获得value对应可选项的index
        this.valueHashMap = {};
        ////////////////////事件
        this.onSelectItemCallbackList = [];
        ///////////////////主要属性
        //picker对象
        this.picker = picker;
        //option对象
        this.option = option;
        //记录当前滚轮是容器中第几个滚轮
        this.index = index;
        //转轮主体
        this.dom = domUtil_1.default('<div class="picker-wheel3d">' + '<div class="picker-label"><span class="picker-text"></span></div>' + '<ul></ul>' + '<div class="picker-label"><span class="picker-text"></span></div>' + '</div>').css('height', constant_1.default.WHEEL_HEIGHT / 100 + 'em');
        //转轮上面标签的容器，同时也是转动的轴
        this.contains = this.dom.find('ul');
        ///////////////////滚轮显示属性
        //计算标签可显示的角度的绝对值。因为透视关系,所以可见的标签角度小于90度
        this.visibleAngle = 90 - Math.acos(this.radius / constant_1.default.WHEEL_HEIGHT * 2) / Math.PI * 180;
        ////////////////////可选项属性
        //如果items数组里的值是对象,其中显示的key
        this.labelKey = col.labelKey;
        //如果items数组里的值是对象,其中值的key
        this.itemValueKey = col.valueKey;
        ////////////////////注册dom事件
        var that = this;
        //注册拖拽开始事件
        function startDrag(event) {
            //计算offsetTop,为计算触摸事件的offset使用
            var target = event.currentTarget;
            that.offsetTop = 0;
            while (target) {
                that.offsetTop += target.offsetTop;
                var target = target.parentElement;
            }
            var offsetY = event.touches ? event.touches[0].clientY - that.offsetTop : event.clientY - that.offsetTop;
            that.startDrag(offsetY);
        }
        this.dom[0].addEventListener("touchstart", startDrag);
        this.dom[0].addEventListener("mousedown", startDrag);
        //注册拖拽事件
        function drag(event) {
            var offsetY = event.touches ? event.touches[0].clientY - that.offsetTop : event.clientY - that.offsetTop;
            that.drag(offsetY);
        }
        this.dom[0].addEventListener("touchmove", drag);
        this.dom[0].addEventListener("mousemove", drag);
        //注册拖拽结束事件
        function endDrag() {
            that.endDrag();
        }
        this.dom[0].addEventListener("touchend", endDrag);
        this.dom[0].addEventListener("mouseup", endDrag);
        this.dom[0].addEventListener("mouseleave", endDrag);
        //初始化标签
        var transformValue = "translateZ(" + this.radius / 100 + "em) scale(0.75)";
        this.dom.find(".picker-label").css("-webkit-transform", transformValue).css("transform", transformValue);
        //设置标签
        this.setSuffix(col.suffix);
        this.setPrefix(col.prefix);
        this.setOptions(col.options, null, true);
    }
    /**
     * 开始拖拽
     * @param {number} offsetY  当前用户手指(鼠标)的y坐标
     */


    _createClass(Wheel3D, [{
        key: "startDrag",
        value: function startDrag(offsetY) {
            //记录触摸相关信息,为下一步计算用.计算时候,要将坐标系移至中心,并将单位转为em
            this.lastY = (constant_1.default.WHEEL_HEIGHT / 2 - offsetY / this.em()) * -1;
            this.timeStamp = Date.now();
            this.isDraging = true;
            this.offsetTop = this.dom[0].offsetTop;
            this.originalAngle = this.angle;
            this.changeMaxAngle = 0;
            this.lastIndexAngle = this.selectedIndex;
            for (var parent = this.dom[0].parentElement; parent; parent = parent.parentElement) {
                this.offsetTop += parent.offsetTop;
            }
            //终止之前的动画
            animationUtil_1.default.stopAnimation(this.animationId);
        }
        /**
         * 拖拽
         * @param {number} offsetY			当前用户手指(鼠标)的y坐标
         */

    }, {
        key: "drag",
        value: function drag(offsetY) {
            if (!this.isDraging) {
                return;
            }
            //根据触摸位移(鼠标移动位移)计算转角变化量
            //现将坐标系移植中心,并将单位转为vm
            var y = (constant_1.default.WHEEL_HEIGHT / 2 - offsetY / this.em()) * -1;
            //计算位移,因为z轴有透视,所以位移量不是真正的曲面的位移量,要做一次透视变换
            var changeAngle = (perspectiveConversion(this.lastY, this.radius, constant_1.default.WHEEL_HEIGHT) - perspectiveConversion(y, this.radius, constant_1.default.WHEEL_HEIGHT)) / Math.PI * 180;
            var angle = changeAngle + this.angle;
            //记录滚轮滚动的最大转角
            this.changeMaxAngle = Math.max(Math.abs(this.originalAngle - angle), this.changeMaxAngle);
            //记录当前角度
            this.setAngle(angle);
            //计算并记录速度
            this.lastY = y;
            if (changeAngle) {
                this.speed = changeAngle / (Date.now() - this.timeStamp);
            } else {
                this.speed = 0;
            }
            this.timeStamp = Date.now();
        }
        /**
         * 拖拽结束
         */

    }, {
        key: "endDrag",
        value: function endDrag() {
            if (!this.isDraging) {
                return;
            }
            //速度*4,做均减少运动,计算滚动后的angle。之所以乘4是根据偏移效果经验得到的
            var changeAngle = this.speed * Math.abs(this.speed) * 8 * constant_1.default.WHEEL_TRANSITION_TIME;
            var angle = changeAngle + this.angle;
            //根据角度计算最终的被选值
            var selectedIndex = this.calcSelectedIndexByAngle(angle);
            //开启动画,选中被选中
            this.selectIndex(selectedIndex, true);
            //计算完成,清空速度相关变量,并去除之前的动画效果
            this.isDraging = false;
            this.lastY = 0;
            this.speed = 0;
        }
        /////////////////////////////////设置相关
        /**
         * 生成用户可选的标签
         * @param {any[]} list                  用户可选项数组
         * @param {*} selectedValue             默认值
         * @param {boolean} [isInti=false]      是否是初始化,初始化不执行设置默认值操作
         */

    }, {
        key: "setOptions",
        value: function setOptions(list, selectedValue) {
            var isInti = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var that = this;
            list = list || [];
            if (Array.isArray(list)) {
                //清空容器
                that.contains.html("");
                this.list = list;
            } else {
                throw new TypeError("list is not a array.");
            }
            //计算valueHashMap
            this.valueHashMap = {};
            //计算最小转角
            this.maxAngle = constant_1.default.WHEEL_ITEM_ANGLE * Math.max(0, this.list.length - 1);
            //生成滚轮的标签
            //标签的index
            var i = 0,

            //标签显示值
            label,

            //显示标签的dom的高度,要求根据wheelItemAngle计算,使各个标签dom的边缘刚好挨在一起,确保没有空细
            height = this.radius * Math.PI * constant_1.default.WHEEL_ITEM_ANGLE / 180;
            this.list.forEach(function (item, index) {
                //如果是对象,取labelKey对应值显示。否则直接显示它本身
                if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === 'object') {
                    label = item[that.labelKey];
                    that.valueHashMap[item[that.itemValueKey]] = i;
                } else {
                    label = item;
                    that.valueHashMap[item] = i;
                }
                //创建label的显示dom,并计算他在容器中的位置(角度)
                var li = domUtil_1.default("<li></li>");
                li.append(domUtil_1.default('<span class="picker-text"></span>').text(label));
                var angle = constant_1.default.WHEEL_ITEM_ANGLE * -index;
                //为了解决3d放大后，文字模糊的问题，故采用zoom=2的方案，所以li的尺寸方面，统一缩小一半
                var transformValue = "rotateX(" + angle + "deg) translateZ(" + that.radius / 100 + "em) scale(0.75)";
                li.css("-webkit-transform", transformValue).css("transform", transformValue).css("padding", height / 5.9 / 100 + "em 0").css("height", height / 100 + "em").css("line-height", height / 100 + "em");
                //将标签的角度保存到其dom中
                li.data("angle", angle);
                //将标签的index保存到其dom中
                li.data("index", i);
                //将标签的dom放到contains上,contains的事件全部委托于容器,即标签不监听事件
                that.contains.append(li);
                //增加点击选择功能
                var clickHandle = function clickHandle(event) {
                    if (that.changeMaxAngle < 1) {
                        //计算完成,清空速度相关变量,并去除之前的动画效果
                        that.isDraging = false;
                        that.lastY = 0;
                        that.speed = 0;
                        that.selectIndex(index, true);
                        event.stopPropagation();
                        event.preventDefault();
                    }
                };
                li[0].addEventListener('mouseup', clickHandle);
                li[0].addEventListener('touchend', clickHandle);
                i++;
            });
            //刷新标签
            this.flushLabel();
            if (isInti) {
                if (list.length > 0) {
                    this.selectedIndex = 0;
                    if (_typeof(list[0]) === 'object') {
                        this.selectedValue = this.list[0][this.itemValueKey];
                    } else {
                        this.selectedValue = this.list[0];
                    }
                } else {
                    this.selectedIndex = -1;
                    this.selectedValue = undefined;
                }
                return;
            }
            //设置被选值。如果用户给定被选值,使用给定被选值。如果没有且之前有被选值,并仍在新options里面,保存之前的值。都没有返回0
            if (list.length > 0) {
                if (selectedValue != null && this.valueHashMap[selectedValue] != null) {
                    this.selectOption(selectedValue);
                } else if (this.valueHashMap[this.selectedValue] != null) {
                    this.selectOption(this.selectedValue);
                } else {
                    this.selectIndex(0);
                }
            } else {
                this.selectedIndex = -1;
                this.selectedValue = undefined;
            }
        }
        /**
        * 获得用户可选的标签
        */

    }, {
        key: "getOptions",
        value: function getOptions() {
            return this.list;
        }
        /**
        * 给定指定标签的值,选择指定标签
        */

    }, {
        key: "selectOption",
        value: function selectOption(value) {
            var showAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //如果valueHashMap里面没有value,表示没有这个标签,否则自动选中这个标签
            if (this.valueHashMap[value] != null) {
                var index = this.valueHashMap[value];
                this.selectIndex(index, showAnimation);
            }
        }
        /**
        * 给定指定备选标签的index,自动设定标签的各个位置
        * @param index					要选择的index
        * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
        */

    }, {
        key: "selectIndex",
        value: function selectIndex(index) {
            var showAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var angle = this.calcAngleBySelectedIndex(index);
            animationUtil_1.default.stopAnimation(this.animationId);
            if (showAnimation) {
                //用50帧渲染动画,并使用easeOut,使其有匀减速效果
                //当前帧数
                var start = 0,

                //总帧数
                during = 50,
                    that = this;
                //动画渲染函数
                var _run = function _run() {
                    start++;
                    var _angle = animationUtil_1.default.easeOut(start, that.angle, angle - that.angle, during);
                    if (Math.abs(_angle - angle) < 1) {
                        _angle = angle;
                    }
                    that.setAngle(_angle);
                    if (_angle != angle) {
                        that.animationId = animationUtil_1.default.startAnimation(_run);
                    } else {
                        //记录下原有的index,确定选择是否发生了改变
                        var oldSelectedIndex = that.selectedIndex;
                        that.selectedIndex = index;
                        that.selectedValue = that.list[index];
                        if (_typeof(that.selectedValue) == 'object') {
                            that.selectedValue = that.selectedValue[that.itemValueKey];
                        }
                        if (oldSelectedIndex != that.selectedIndex) that.toggleSelected(that.selectedIndex, that.selectedValue);
                    }
                };
                //启动动画
                that.animationId = animationUtil_1.default.startAnimation(_run);
            } else {
                //记录下原有的index,确定选择是否发生了改变
                var oldSelectedIndex = this.selectedIndex;
                //如果不显示动画,直接赋值
                this.setAngle(angle);
                this.selectedIndex = index;
                this.selectedValue = this.list[index];
                if (_typeof(this.selectedValue) == 'object') {
                    this.selectedValue = this.selectedValue[this.itemValueKey];
                }
                if (oldSelectedIndex != this.selectedIndex) this.toggleSelected(this.selectedIndex, this.selectedValue);
            }
        }
        /**
        * 给定指定角度,自动设定标签的各个位置
        * @param {number} angle		要转到的角度
        * @returns {number}			修正后的角度,即最终的实际角度
        */

    }, {
        key: "setAngle",
        value: function setAngle(angle) {
            //修正转角,要求转角不能大于maxAngle,不能小于minAngle
            angle = this.rangeAngle(angle);
            // 如果角度变化经过刻度,则放声
            if (this.option.hasVoice && this.picker.visible) {
                var lastIndexAngle = this.lastIndexAngle;
                var index = this.calcSelectedIndexByAngle(angle);
                if (lastIndexAngle != index) {
                    if (this.option.hasVoice) {
                        tick.play();
                    }
                }
                this.lastIndexAngle = index;
            }
            this.contains.css("-webkit-transform", "rotateX(" + angle + "deg)").css("transform", "rotateX(" + angle + "deg)");
            this.angle = angle;
            this.flushLabel();
            return angle;
        }
        /**
        * 通过角度计算被选项的id
        * @param angle {number}		要计算的角度
        * @returns {number}		    被选项id
        */

    }, {
        key: "calcSelectedIndexByAngle",
        value: function calcSelectedIndexByAngle(angle) {
            angle = this.rangeAngle(angle);
            return Math.round(Math.abs(angle / constant_1.default.WHEEL_ITEM_ANGLE));
        }
        /**
        * 通过角度计算被选项的id
        * @param angle {number}		要计算的角度
        * @returns {number}		    被选项id
        */

    }, {
        key: "calcAngleBySelectedIndex",
        value: function calcAngleBySelectedIndex(index) {
            return index * constant_1.default.WHEEL_ITEM_ANGLE;
        }
        /**
        * 限制转角超过极限值
        * @param angle {number}		要计算的角度
        * @returns {number}		    被选项id
        */

    }, {
        key: "rangeAngle",
        value: function rangeAngle(angle) {
            //修正转角,要求转角不能大于maxAngle,不能小于minAngle
            angle = Math.max(this.minAngle, angle);
            angle = Math.min(this.maxAngle, angle);
            return angle;
        }
        /**
        * 刷新各个标签的状态,确定应该显示哪些标签
        */

    }, {
        key: "flushLabel",
        value: function flushLabel() {
            var that = this;
            this.dom.find("li").each(function (index, li) {
                li = domUtil_1.default(li);
                var angle = li.data("angle") + that.angle;
                if (angle > that.visibleAngle || angle < -that.visibleAngle) {
                    if (li.css("display") != "none") {
                        li.css("display", "none");
                    }
                } else {
                    if (li.css("display") != "block") {
                        li.css("display", "block");
                    }
                }
            });
        }
        /**
        * 获取被选值
        */

    }, {
        key: "getValue",
        value: function getValue() {
            return this.selectedValue;
        }
        /////////////////////////////设置前缀后缀
        /**
        * 设置后缀
        * @param text			后缀显示的文本
        */

    }, {
        key: "setSuffix",
        value: function setSuffix(text) {
            this.dom.find('.picker-label .picker-text').eq(1).text(text);
        }
        /**
        * 设置前缀
        * @param text			前缀显示的文本
        */

    }, {
        key: "setPrefix",
        value: function setPrefix(text) {
            this.dom.find('.picker-label .picker-text').eq(0).text(text);
        }
        /////////////////////////////wheel事件相关
        /**
        * 触发回调函数的接口
        * @param index			当前被选值的索引
        * @param value			当前被选值的值
        */

    }, {
        key: "toggleSelected",
        value: function toggleSelected(index, value) {
            var _this = this;

            this.onSelectItemCallbackList.forEach(function (fn) {
                fn.call(_this, index, value);
            });
        }
        /**
         * 注册SelectItem的回调事件
         * @param {{(index:number, value:any):void}} fn
         */

    }, {
        key: "addSelectItemListener",
        value: function addSelectItemListener(fn) {
            this.onSelectItemCallbackList.push(fn);
        }
        /**
         * 移除注册的SelectItem回调事件
         * @param {{(index:number, value:any):void}} fn
         */

    }, {
        key: "removeSelectItemListener",
        value: function removeSelectItemListener(fn) {
            this.onSelectItemCallbackList = this.onSelectItemCallbackList.filter(function (_fn) {
                return _fn !== fn;
            });
        }
        /**
         * 销毁
         */

    }, {
        key: "destroy",
        value: function destroy() {
            this.onSelectItemCallbackList = null;
        }
        ////////////////////////////DOM相关

    }, {
        key: "getDOM",
        value: function getDOM() {
            return this.dom;
        }
    }]);

    return Wheel3D;
}();

exports.Wheel3D = Wheel3D;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function (global, factory) {
	"use strict"

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = factory;
	} else {
		global.$ = factory(global.document);
	}
})(typeof window !== "undefined" ? window : this, function (document) {

	//用于插入使用的DocumentFragment
	var fragment = document.createDocumentFragment();

	//将html解析为my-jquery对象
	function buildHTML(selector) {
		selector = selector.trim();
		//如果是构建字符串，需要判断是否是<>格式，如果不是表示是选择器
		if(selector[0] === "<"){
			//用于使用innerHTML生成dom的div
			var div = document.createElement("DIV");
			div.innerHTML = selector;
			return $(div.children);
		} else {
			return $([]);
		}
	}

	//将html解析为fragment对象
	function buildFragment(dom) {
		var dom = $(dom);
		fragment.textContent = "";
		dom.each(function (i, item) {
			fragment.appendChild(item);
		})
		return fragment;
	}

	//将各种要插入对象做成一个buildFragment,根据fn插入
	function insertDom(targets, dom, fn) {
		//如果插入到的元素是多个,克隆之后再插入
		targets.each(function (i, item) {
			if(i != targets.length-1){
				fn(this, buildFragment(dom.clone()));
			} else {
				fn(this, buildFragment(dom));
			}
		});
	}

	//一个模板,用于生成setter和getter重载函数
	function access(myjq, setter, getter, key, value) {
		//是否是setter方法,如果是setter方法,value不能是undefined
		return value === undefined ? (myjq.length ? getter(myjq[0], key) : undefined) : myjq.each(function (index, item) {
			return setter(item, key, value)
		})
	}

    //短横线隔开式命名转驼峰命名
    function toCamelCase(name) {
        return name.replace(/-\S/g, function (splitChar) {
            return splitChar[1].toUpperCase();
        });
    }

    //克隆dom
	function domClone(item, hasSystem) {
		var dom = item.cloneNode(true);
		hasSystem && item[dataKey] && (dom[dataKey] = item[dataKey]);

		return dom;
	}

	//删除dom时候使用
	function clearData(item) {
		var arr;
		if(item.nodeType == 1){
			delete item[dataKey];
			arr = item.children;
		} else if(item && item.length != null){
			arr = item;
		} else {
			return;
		}

		for(var i; i < arr.length; i++){
			clearData(arr[i]);
		}
	}

	//防止冲突的id
	var $$mjid = ("" + Date.now() +  Math.random()).replace('.', '');
	//dom缓存的key
	var dataKey = "$$mjid" + $$mjid

	var $ = function(selector){
		return new $.fn.init(selector);
	}

	$.fn = $.prototype = {
		//唯一id
		$$mjid : $$mjid,

		//jquery对象原型
		init : function(selector){

			//如果没有选择器，直接返回
			if(!selector){
				return this;
			}

			if(typeof selector == "string"){
				//如果是字符串，表示可能是选择器，或者是构建字符串
				selector = selector.trim();
				//如果是构建字符串，需要判断是否是<>格式，如果不是表示是选择器
				if(selector[0] === "<"){
					return $(buildHTML(selector));
				} else {
					//如果不是，说明是选择器，直接选择
					var doms = document.querySelectorAll(selector);

					//递归调用$，从新封装一次
					return $(doms);
				}
			} else if(typeof selector == "object" && !isNaN(selector["length"])){
				//类似数组就表示是数组。遍历数组或者是$.init对象，如果里面是dom元素封装返回
				for(var i = 0,length = 0; i < selector.length; i++){
					var dom = selector[i];
					if(dom && dom.nodeType == 1){
						this[length] = dom;
						length++;
					}
				}
				this.length = length;
				return this;
			} else if(selector.nodeType){
				//如果本身就是一个dom元素，直接封装返回
				this.length = 1;
				this[0] = selector;
				return this;
			}
		},

		//使init变为类数组对象
		length : 0,

		//模仿each
		each : function (fn) {
			for(var i =0; i < this.length; i++){
				if(typeof fn == 'function' && fn.call(this[i], i, this[i]) === false){
					break;
				};
			}
			return this;
		},

		eq: function(i){
			return $(this[i]);
		},

		//往集合增加一个dom
		add: function (item) {
			if(item && item.nodeType == 1){
				this[this.length++] = item;
			}
			return this;
		},

		//在某个节点下面找div
		find: function(selector){
			return access(this,null,function (dom, selector) {
				return $(dom.querySelectorAll(selector));
			},selector)
		},

		//用于将文档增添于
		append : function(child){
			insertDom(this, $(child), function ( parent,child) {
				parent.appendChild(child);
			})
			return this;
		},
		appendTo: function(parent){
			$(parent).append(this);
			return this;
		},
		prepend: function(child){
			insertDom(this, $(child), function ( parent,child) {
				parent.childNodes.length ?  parent.insertBefore(child, parent.childNodes[0]) : parent.appendChild(child);
			})
			return this;
		},
		prependTo: function(parent){
			$(parent).prepend(this);
			return this;
		},
		after: function(child){
			insertDom(this, $(child), function ( parent,child) {
				if(parent.parentNode.lastChild == parent){
					parent.parentNode.appendChild(child);
				} else {
					parent.parentNode.insertBefore(child, parent.nextSibling);
				}
			})
			return this;
		},
		insertAfter: function(parent){
			$(parent).after(this);
			return this;
		},
		before: function(child){
			insertDom(this, $(child), function ( parent,child) {
				parent.parentNode.insertBefore(child, parent);
			})
			return this;
		},
		insertBefore: function(parent){
			$(parent).before(this);
			return $(this[0]);
		},
		
		clone: function () {
			var arr = [];
			this.each(function (i, item) {
				arr.push(domClone(item, true));
			})
			return $(arr);
		},

		/**
		 * 删除dom
		 */
		remove: function () {
			this.each(function (i, item) {
				item.parentElement && item.parentElement.removeChild(item)
			})
			return this;
		},
				
		data: function (key, value) {
			return access(this, function (item, key, value) {
				if(!item[dataKey]){
					item[dataKey] = {};
				}
				item[dataKey][key] = value;
			}, function (item, key) {
				return item[dataKey] && item[dataKey][key];
			}, key, value);
		},

		attr: function (key, value) {
			return access(this, function (item, key, value) {
				item.setAttribute(key, value)
			}, function (item, key) {
				return item.getAttribute(key);
			}, key, value)
		},

		removeAttr: function (key) {
			return this.each(function (i, item) {
				if(key) {
					item.removeAttr(key);
				}
			})
		},

		addClass: function (className) {
			return this.each(function (i, item) {
				if(className) {
					item.classList.add(className)
				}
			});
		},

		removeClass: function (className) {
			return this.each(function (i, item) {
				if(className) {
					item.classList.remove(className)
				}
			});
		},

		hasClass: function (className) {
			return this.length ? this[0].classList.contains(className) : false;
		},

		toggleClass: function (className) {
			return this.each(function (i, item) {
				if(className) {
					if(item.classList.contains(className)){
						item.classList.remove(className);
					} else {
						item.classList.add(className);
					}
				}
			});
		},

		prop: function (key, value) {
			return access(this, function (item, key, value) {
				item[key] = value;
			}, function (item, key) {
				return item[key];
			}, key, value)
		},


		html: function(value) {
			return access(this, function (item, key, value) {
				clearData(item.children || {length : 0});
				item.innerHTML = value;
			}, function (item, key) {
				return item.innerHTML;
			}, "-", value)
		},
		text: function(value) {
			return access(this, function (item, key, value) {
				item.textContent = value;
			}, function (item, key) {
				return item.textContent;
			}, "-", value)
		},
		val: function(value) {
			return access(this, function (item, key, value) {
				item.value = value;
			}, function (item, key) {
				return item.value;
			}, "-", value)
		},
		hide: function() {
			return this.each(function (i, item) {
				if(item.style.display){
					$(item).data("my-jquery-style-display",item.style.display);
				}
				item.style.display="none";
			})
		},
		show: function() {
			return this.each(function (i, item) {
				item.style.display= $(item).data("my-jquery-style-display") || "";
			})
		},
		css: function (key, value) {
			return access(this, function (item, key, value) {
				item.style[toCamelCase(key)] = value;
			}, function (item, key) {
				return item.style[toCamelCase(key)];
			}, key, value)
		},

		on: function(eventName, fn){
            return this.each(function (i, item) {
                if(typeof fn != 'function'){
                	return;
                }

            	//注册的函数
            	var cacheFn = function (event) {
					if(fn.call(this, event) === false){
						event.preventDefault();
						event.stopPropagation();
					}
                }
                cacheFn.fn = fn;

                //缓存该函数
                var cacheEvent = $(item).data("my-jquery-event-cache") || {};
                cacheEvent[eventName] = cacheEvent[eventName] || [];
                cacheEvent[eventName].push(cacheFn)

                this.addEventListener(eventName, cacheFn, false);
                $(this).data("my-jquery-event-cache", cacheEvent)
            })
		},
		off: function(eventName, fn){
            return this.each(function (i, item) {
                var cacheEvent = $(this).data("my-jquery-event-cache");

                if(!cacheEvent)
                	return;

                var self = this;
                if(cacheEvent[eventName] instanceof Array){
                	var tempArr = [];
                    cacheEvent[eventName].forEach(function (cacheFn) {
                        if(typeof fn == 'function'){
                        	if( fn == cacheFn.fn){
                                self.removeEventListener(eventName, cacheFn, false);
                            } else {
                                tempArr.push(cacheFn)
                            }
                        } else {
                            self.removeEventListener(eventName, cacheFn, false);
						}
                    })

                    cacheEvent[eventName] = tempArr;
                    $(this).data("my-jquery-event-cache", cacheEvent)
                }
            })

		},
		toggle: function(eventName){
            return this.each(function (i, item) {
            	if(typeof this[eventName] == 'function'){
                    this[eventName]();
				}
            })
		}

	}

	$.fn.init.prototype = $.fn;

	return $;
})

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    startAnimation: function startAnimation(fn) {
        return requestAnimationFrame(fn);
    },
    /**
     * 动画终止函数
     * @param animationId       动画id
     */
    stopAnimation: function stopAnimation(animationId) {
        cancelAnimationFrame(animationId);
    },
    easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    /**
     * 淡出效果
     * @param t
     * @param b
     * @param c
     * @param d
     * @returns {*}
     */
    easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    /**
     * 淡入并淡出效果
     * @param t
     * @param b
     * @param c
     * @param d
     * @returns {*}
     */
    easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "0": 0, "1": 0.006180474730027776, "2": 0.012361758667979887, "3": 0.01854466178595427, "4": 0.024729995586343003, "5": 0.030918573871856408, "6": 0.03711121352142655, "7": 0.043308735273995536, "8": 0.04951196452223301, "9": 0.05572173211827738, "10": 0.06193887519365582, "11": 0.06816423799561012, "12": 0.07439867274213974, "13": 0.08064304049816978, "14": 0.08689821207536214, "15": 0.0931650689582126, "16": 0.09944450425921704, "17": 0.1057374237060475, "18": 0.11204474666385271, "19": 0.11836740719599605, "20": 0.12470635516675682, "21": 0.13106255738976524, "22": 0.13743699882620672, "23": 0.1438306838371266, "24": 0.1502446374944947, "25": 0.15667990695605222, "26": 0.163137562909363, "27": 0.16961870109094018, "28": 0.1761244438868085, "29": 0.18265594202141244, "30": 0.189214376342388, "31": 0.1958009597093892, "32": 0.20241693899591295, "33": 0.20906359721390222, "34": 0.21574225577183714, "35": 0.2224542768780669, "36": 0.22920106610229693, "37": 0.23598407510944647, "38": 0.24280480458155373, "39": 0.24966480734504126, "40": 0.2565656917224997, "41": 0.26350912513022323, "42": 0.2704968379450743, "43": 0.27753062766690556, "44": 0.28461236340577195, "45": 0.2917439907265723, "46": 0.298927536887646, "47": 0.30616511651426775, "48": 0.3134589377530486, "49": 0.3208113089590395, "50": 0.32822464597399087, "51": 0.3357014800618854, "52": 0.3432444665767064, "53": 0.3508563944476478, "54": 0.35854019657886727, "55": 0.3662989612747276, "56": 0.37413594481766604, "57": 0.38205458534478537, "58": 0.39005851819157766, "59": 0.3981515928975172, "60": 0.4063378920994586, "61": 0.41462175257587425, "62": 0.42300778874928274, "63": 0.4315009190073606, "64": 0.4401063952672662, "65": 0.4488298362852176, "66": 0.45767726530766856, "67": 0.4666551527757603, "68": 0.47577046493656705, "69": 0.4850307193901132, "70": 0.4944440488195467, "71": 0.5040192744255141, "72": 0.5137659909310855, "73": 0.523694665462527, "74": 0.5338167531736872, "75": 0.5441448332086339, "76": 0.5546927695451231, "77": 0.5654759025098686, "78": 0.5765112784180985, "79": 0.5878179270265199, "80": 0.5994171995371129, "81": 0.6113331840998124, "82": 0.6235932216642447, "83": 0.6362285534378791, "84": 0.6492751433974548, "85": 0.6627747373240171, "86": 0.6767762470698537, "87": 0.6913375909489355, "88": 0.7065281883018284, "89": 0.7224324166263504, "90": 0.7391545276252866, "91": 0.7568258524516188, "92": 0.7756157498195769, "93": 0.7957489855645078, "94": 0.8175348626997212, "95": 0.8414195586288256, "96": 0.8680892494981647, "97": 0.8987014263951989, "98": 0.935517870959519, "99": 0.9843911534692572, "100": 1.1071487177940906 };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataURLtoU8arr = dataURLtoU8arr;
function dataURLtoU8arr(dataurl) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return u8arr;
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:audio/mpeg;base64,SUQzAwAAAAACPVRBTEIAAAABAAAAVENPTgAAAAEAAABUSVQyAAAAAQAAAFRQRTEAAAABAAAAVFJDSwAAAAEAAABUWUVSAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAGuQCPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+urq6urq6urq6urq6urq6urq6urq6urq6u6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6/////////////////////////////////8AAAAeTEFNRTMuOTlyBJwAAAAALhMAADUgJANyQQABrgAABrkfUWHWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vAxAAAA5gBQ3QAAArvJu6/M4BIhIKgoegEQ8/8DMz/Pgf+Yf8BwB+Z+b+ADgDw/8+o7VqAHMDBTAEFQenlPGADeAWECp4LYcVu9VS9CSRlFhkxw1oMkWM4jYWZOwux2kYYKQWsQ/2ZaUwdEtrLj/YqSyOwMh4qeJUr7XMoYikU+IQ0Fl0qjk87jLrdekgfWb+RhON84zDsakKgs3Zou0k5nT9ylE43Waiz7cwfWGpbM3rXMP1hzuFJScikNSFdLvQXPWYEqZ4yq3KaWd1zPOx//nn+cHSnUZqZYyWap5ZWy7/41ioa/pDolQNStZm24myAA0oAUsytJS4qVtLyfMrafUJqVaJSmQrtBIraqcZqrtu95KNI5Tb+dX71Vet2iXNymBj6gporC+5XVsSQTKC2K/35teC8/0KL/Ff/DEEyiT8rZKIyGuoyeRCzI7wpna5Q2KpYgzmMbLM2XlUCNv/oaWZSlouqkB3Zb7aW79MPu16Zr2jv1vKHhqqZmIaHhnb/SsKAAAAAnUXYNay0jZfhQ+kLcL/BQ6ZSJ0DwHKktA4gjBzi4QMDNC+5PGxEWWbh40wv+9jpbNzzEOEnImHyHThqblErKOHjUUkLlFjHeHR6Nq1opOiMmMmikPRZ/u/x0Cth2kTD7P+kpMxMPLuzvDuzxt5IyAAAAAT4RIEE6AqAAYh4w4CYYcQCEJbMcTOkDjlQ4CXbZKsEICzN+AkpphSMMLBX4hBMIAvInATJvUotAhWGpsGVGrKHEJUEr6wj7S4DFigYJAEKqhw1KjypsnuPCUiwz6RR9m+iRb5Fxo0DuEj06kR1A1DDs5jIKWtturEoLjFDV5jvHH8cef///1e28q4udUp5b876l8u22Gw9HwtDYAAAAAADQL1KAwBl18Zc1OLY7qQ/Dtb/YVtTHz+dBb4SUL6wf9iQ0E6aaWnOVk//Zl9dJdnet0b1//9sX76evxGZ3NZ//+zDE9oBKCIFfvPMACOsSai6eIAXrTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+3DE9IAOXMFX+ZiAAoaaKj81kABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxPwACcCNT7mngAAAAD/DgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/w=="

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * 滚轮类,是显示选择器可选项的滚轮体，3D模式型的，有透视效果
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var domUtil_1 = __webpack_require__(0);
var em_1 = __webpack_require__(1);
var animationUtil_1 = __webpack_require__(4);
var constant_1 = __webpack_require__(2);
var perspectiveConversion = __webpack_require__(5);
var tick = __webpack_require__(6)();

var Wheel = function () {
    function Wheel(picker, col, option, index) {
        _classCallCheck(this, Wheel);

        ///////////////////滚轮显示属性
        //最大位移
        this.maxDistance = 0;
        //最小位移,设置可选项列表后需重新计算
        this.minDistance = 0;
        //获取0.01em的实际像素值
        this.em = em_1.em;
        //获得控件到body最顶端的距离,计算触摸事件的offsetY时候使用
        this.offsetTop = 0;
        ////////////////////滚动属性
        //滚轮转动前初始的位移,用于计算滚轮是否转动过
        this.originalDistance = 0;
        //一次拖动过程中滚轮被转动的最大位移
        this.lastIndexDistance = 0;
        //当前的刻度,计算发声时候会用到。发声要进过一个刻度线或者达到一个新刻度新才会发声。所以需要记录上一次的刻度线。
        this.changeMaxDistance = 0;
        //当前滚轮位移
        this.distance = 0;
        //当前被选值的index
        this.selectedIndex = -1;
        //记录惯性滑动动画的id
        this.animationId = -1;
        //速度，供触摸离开时候的惯性滑动动画使用
        this.speed = 0;
        //当前时间戳,主要是计算转动速度使用的
        this.timeStamp = 0;
        //记录上一次触摸节点的offsetY,主要是是计算转动速度使用的
        this.lastY = 0;
        //是否开始触摸,主要给鼠标事件使用
        this.isDraging = false;
        //正在播放的刻度音
        this.audio = null;
        ////////////////////可选项属性
        //可选项列表
        this.list = [];
        //根据值生成的hashmap,主要是为了快速获得value对应可选项的index
        this.valueHashMap = {};
        ////////////////////事件
        this.onSelectItemCallbackList = [];
        ///////////////////主要属性
        //picker对象
        this.picker = picker;
        //option对象
        this.option = option;
        //记录当前滚轮是容器中第几个滚轮
        this.index = index;
        //转轮主体
        this.dom = domUtil_1.default("<div class=\"picker-wheel\">\n                <div class=\"picker-label\"><span class=\"picker-text\"></span></div>\n                <ul></ul>\n                <div class=\"picker-label\"><span class=\"picker-text\"></span></div>\n            </div>").css('height', constant_1.default.WHEEL_HEIGHT / 100 + 'em');
        //转轮上面标签的容器，同时也是转动的轴
        this.contains = this.dom.find('ul');
        this.setDistance(0);
        ////////////////////可选项属性
        //如果items数组里的值是对象,其中显示的key
        this.labelKey = col.labelKey;
        //如果items数组里的值是对象,其中值的key
        this.itemValueKey = col.valueKey;
        ////////////////////注册dom事件
        var that = this;
        //注册拖拽开始事件
        function startDrag(event) {
            //计算offsetTop,为计算触摸事件的offset使用
            var target = event.currentTarget;
            that.offsetTop = 0;
            while (target) {
                that.offsetTop += target.offsetTop;
                var target = target.parentElement;
            }
            var offsetY = event.touches ? event.touches[0].clientY - that.offsetTop : event.clientY - that.offsetTop;
            that.startDrag(offsetY);
        }
        this.dom[0].addEventListener("touchstart", startDrag);
        this.dom[0].addEventListener("mousedown", startDrag);
        //注册拖拽事件
        function drag(event) {
            var offsetY = event.touches ? event.touches[0].clientY - that.offsetTop : event.clientY - that.offsetTop;
            that.drag(offsetY);
        }
        this.dom[0].addEventListener("touchmove", drag);
        this.dom[0].addEventListener("mousemove", drag);
        //注册拖拽结束事件
        function endDrag() {
            that.endDrag();
        }
        this.dom[0].addEventListener("touchend", endDrag);
        this.dom[0].addEventListener("mouseup", endDrag);
        this.dom[0].addEventListener("mouseleave", endDrag);
        //设置标签
        this.setSuffix(col.suffix);
        this.setPrefix(col.prefix);
        this.setOptions(col.options, null, true);
    }
    /**
     * 开始拖拽
     * @param {number} offsetY  当前用户手指(鼠标)的y坐标
     */


    _createClass(Wheel, [{
        key: "startDrag",
        value: function startDrag(offsetY) {
            //记录触摸相关信息,为下一步计算用.计算时候,要将坐标系移至中心,并将单位转为em
            this.lastY = (constant_1.default.WHEEL_HEIGHT / 2 - offsetY / this.em()) * -1;
            this.timeStamp = Date.now();
            this.isDraging = true;
            this.offsetTop = this.dom[0].offsetTop;
            this.originalDistance = this.distance;
            this.changeMaxDistance = 0;
            this.lastIndexDistance = this.selectedIndex;
            for (var parent = this.dom[0].parentElement; parent; parent = parent.parentElement) {
                this.offsetTop += parent.offsetTop;
            }
            //终止之前的动画
            animationUtil_1.default.stopAnimation(this.animationId);
        }
        /**
         * 拖拽
         * @param {number} offsetY			当前用户手指(鼠标)的y坐标
         */

    }, {
        key: "drag",
        value: function drag(offsetY) {
            if (!this.isDraging) {
                return;
            }
            //根据触摸位移(鼠标移动位移)计算位移变化量
            //现将坐标系移植中心,并将单位转为vm
            var y = (constant_1.default.WHEEL_HEIGHT / 2 - offsetY / this.em()) * -1;
            //计算位移,因为z轴有透视,所以位移量不是真正的曲面的位移量,要做一次透视变换
            var changeDistance = this.lastY - y;
            var distance = changeDistance + this.distance;
            //记录滚轮滚动的最大位移
            this.changeMaxDistance = Math.max(Math.abs(this.originalDistance - distance), this.changeMaxDistance);
            //记录当前位移
            this.setDistance(distance);
            //计算并记录速度
            this.lastY = y;
            if (changeDistance) {
                this.speed = changeDistance / (Date.now() - this.timeStamp);
            } else {
                this.speed = 0;
            }
            this.timeStamp = Date.now();
        }
        /**
         * 拖拽结束
         */

    }, {
        key: "endDrag",
        value: function endDrag() {
            if (!this.isDraging) {
                return;
            }
            //速度*4,做均减少运动,计算滚动后的Distance。之所以乘4是根据偏移效果经验得到的
            var changeDistance = this.speed * Math.abs(this.speed) * 8 * constant_1.default.WHEEL_TRANSITION_TIME;
            var distance = changeDistance + this.distance;
            //根据位移计算最终的被选值
            var selectedIndex = this.calcSelectedIndexByDistance(distance);
            //开启动画,选中被选中
            this.selectIndex(selectedIndex, true);
            //计算完成,清空速度相关变量,并去除之前的动画效果
            this.isDraging = false;
            this.lastY = 0;
            this.speed = 0;
        }
        /////////////////////////////////设置相关
        /**
         * 生成用户可选的标签
         * @param {any[]} list                  用户可选项数组
         * @param {*} selectedValue             默认值
         * @param {boolean} [isInti=false]      是否是初始化,初始化不执行设置默认值操作
         */

    }, {
        key: "setOptions",
        value: function setOptions(list, selectedValue) {
            var isInti = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var that = this;
            list = list || [];
            if (Array.isArray(list)) {
                //清空容器
                that.contains.html("");
                this.list = list;
            } else {
                throw new TypeError("list is not a array.");
            }
            //计算valueHashMap
            this.valueHashMap = {};
            //计算最小位移
            this.maxDistance = constant_1.default.WHEEL_ITEM_HIGHT * Math.max(0, this.list.length - 1);
            //生成滚轮的标签
            //标签的index
            var i = 0,

            //标签显示值
            label;
            this.list.forEach(function (item, index) {
                //如果是对象,取labelKey对应值显示。否则直接显示它本身
                if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === 'object') {
                    label = item[that.labelKey];
                    that.valueHashMap[item[that.itemValueKey]] = i;
                } else {
                    label = item;
                    that.valueHashMap[item] = i;
                }
                //创建label的显示dom,并计算他在容器中的位置(位移)
                var li = domUtil_1.default("<li></li>").css('top', constant_1.default.WHEEL_ITEM_HIGHT / 100 * i + "em");
                li.append(domUtil_1.default('<span class="picker-text"></span>').text(label));
                var distance = constant_1.default.WHEEL_ITEM_HIGHT * -index;
                //将标签的位移保存到其dom中
                li.data("distance", distance);
                //将标签的index保存到其dom中
                li.data("index", i);
                //将标签的dom放到contains上,contains的事件全部委托于容器,即标签不监听事件
                that.contains.append(li);
                //增加点击选择功能
                var clickHandle = function clickHandle(event) {
                    if (that.changeMaxDistance < 0.1) {
                        //计算完成,清空速度相关变量,并去除之前的动画效果
                        that.isDraging = false;
                        that.lastY = 0;
                        that.speed = 0;
                        that.selectIndex(index, true);
                        event.stopPropagation();
                        event.preventDefault();
                    }
                };
                li[0].addEventListener('mouseup', clickHandle);
                li[0].addEventListener('touchend', clickHandle);
                i++;
            });
            if (isInti) {
                if (list.length > 0) {
                    this.selectedIndex = 0;
                    if (_typeof(list[0]) === 'object') {
                        this.selectedValue = this.list[0][this.itemValueKey];
                    } else {
                        this.selectedValue = this.list[0];
                    }
                } else {
                    this.selectedIndex = -1;
                    this.selectedValue = undefined;
                }
                return;
            }
            //设置被选值。如果用户给定被选值,使用给定被选值。如果没有且之前有被选值,并仍在新options里面,保存之前的值。都没有返回0
            if (list.length > 0) {
                if (selectedValue != null && this.valueHashMap[selectedValue] != null) {
                    this.selectOption(selectedValue);
                } else if (this.valueHashMap[this.selectedValue] != null) {
                    this.selectOption(this.selectedValue);
                } else {
                    this.selectIndex(0);
                }
            } else {
                this.selectedIndex = -1;
                this.selectedValue = undefined;
            }
        }
        /**
        * 获得用户可选的标签
        */

    }, {
        key: "getOptions",
        value: function getOptions() {
            return this.list;
        }
        /**
        * 给定指定标签的值,选择指定标签
        */

    }, {
        key: "selectOption",
        value: function selectOption(value) {
            var showAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //如果valueHashMap里面没有value,表示没有这个标签,否则自动选中这个标签
            if (this.valueHashMap[value] != null) {
                var index = this.valueHashMap[value];
                this.selectIndex(index, showAnimation);
            }
        }
        /**
        * 给定指定备选标签的index,自动设定标签的各个位置
        * @param index					要选择的index
        * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
        */

    }, {
        key: "selectIndex",
        value: function selectIndex(index) {
            var showAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var distance = this.calcDistanceBySelectedIndex(index);
            animationUtil_1.default.stopAnimation(this.animationId);
            if (showAnimation) {
                //用50帧渲染动画,并使用easeOut,使其有匀减速效果
                //当前帧数
                var start = 0,

                //总帧数
                during = 50,
                    that = this;
                //动画渲染函数
                var _run = function _run() {
                    start++;
                    var _Distance = animationUtil_1.default.easeOut(start, that.distance, distance - that.distance, during);
                    if (Math.abs(_Distance - distance) < 1) {
                        _Distance = distance;
                    }
                    that.setDistance(_Distance);
                    if (_Distance != distance) {
                        that.animationId = animationUtil_1.default.startAnimation(_run);
                    } else {
                        //记录下原有的index,确定选择是否发生了改变
                        var oldSelectedIndex = that.selectedIndex;
                        that.selectedIndex = index;
                        that.selectedValue = that.list[index];
                        if (_typeof(that.selectedValue) == 'object') {
                            that.selectedValue = that.selectedValue[that.itemValueKey];
                        }
                        if (oldSelectedIndex != that.selectedIndex) that.toggleSelected(that.selectedIndex, that.selectedValue);
                    }
                };
                //启动动画
                that.animationId = animationUtil_1.default.startAnimation(_run);
            } else {
                //记录下原有的index,确定选择是否发生了改变
                var oldSelectedIndex = this.selectedIndex;
                //如果不显示动画,直接赋值
                this.setDistance(distance);
                this.selectedIndex = index;
                this.selectedValue = this.list[index];
                if (_typeof(this.selectedValue) == 'object') {
                    this.selectedValue = this.selectedValue[this.itemValueKey];
                }
                if (oldSelectedIndex != this.selectedIndex) this.toggleSelected(this.selectedIndex, this.selectedValue);
            }
        }
        /**
        * 给定指定位移,自动设定标签的各个位置
        * @param {number} distance		要转到的位移
        * @returns {number}			修正后的位移,即最终的实际位移
        */

    }, {
        key: "setDistance",
        value: function setDistance(distance) {
            //修正位移,要求位移不能大于maxDistance,不能小于minDistance
            distance = this.rangeDistance(distance);
            // 如果位移变化经过刻度,则放声
            if (this.option.hasVoice && this.picker.visible) {
                var lastIndexDistance = this.lastIndexDistance;
                var index = this.calcSelectedIndexByDistance(distance);
                if (lastIndexDistance != index) {
                    if (this.option.hasVoice) {
                        tick.play();
                    }
                }
                this.lastIndexDistance = index;
            }
            var translateValue = "translate3d(0, " + (constant_1.default.WHEEL_HEIGHT / 2 - constant_1.default.WHEEL_ITEM_HIGHT / 2 - distance) / 100 + "em, 0)";
            this.contains.css("-webkit-transform", translateValue).css("transform", translateValue);
            this.distance = distance;
            return distance;
        }
        /**
        * 通过位移计算被选项的id
        * @param distance {number}		要计算的位移
        * @returns {number}		    被选项id
        */

    }, {
        key: "calcSelectedIndexByDistance",
        value: function calcSelectedIndexByDistance(distance) {
            distance = this.rangeDistance(distance);
            return Math.round(Math.abs(distance / constant_1.default.WHEEL_ITEM_HIGHT));
        }
        /**
        * 通过位移计算被选项的id
        * @param Distance {number}		要计算的位移
        * @returns {number}		    被选项id
        */

    }, {
        key: "calcDistanceBySelectedIndex",
        value: function calcDistanceBySelectedIndex(index) {
            return index * constant_1.default.WHEEL_ITEM_HIGHT;
        }
        /**
        * 限制位移超过极限值
        * @param distance {number}		要计算的位移
        * @returns {number}		    被选项id
        */

    }, {
        key: "rangeDistance",
        value: function rangeDistance(distance) {
            //修正位移,要求位移不能大于maxDistance,不能小于minDistance
            distance = Math.max(this.minDistance, distance);
            distance = Math.min(this.maxDistance, distance);
            return distance;
        }
        /**
        * 获取被选值
        */

    }, {
        key: "getValue",
        value: function getValue() {
            return this.selectedValue;
        }
        /////////////////////////////设置前缀后缀
        /**
        * 设置后缀
        * @param text			后缀显示的文本
        */

    }, {
        key: "setSuffix",
        value: function setSuffix(text) {
            this.dom.find('.picker-label .picker-text').eq(1).text(text);
        }
        /**
        * 设置前缀
        * @param text			前缀显示的文本
        */

    }, {
        key: "setPrefix",
        value: function setPrefix(text) {
            this.dom.find('.picker-label .picker-text').eq(0).text(text);
        }
        /////////////////////////////wheel事件相关
        /**
        * 触发回调函数的接口
        * @param index			当前被选值的索引
        * @param value			当前被选值的值
        */

    }, {
        key: "toggleSelected",
        value: function toggleSelected(index, value) {
            var _this = this;

            this.onSelectItemCallbackList.forEach(function (fn) {
                fn.call(_this, index, value);
            });
        }
        /**
         * 注册SelectItem的回调事件
         * @param {{(index:number, value:any):void}} fn
         */

    }, {
        key: "addSelectItemListener",
        value: function addSelectItemListener(fn) {
            this.onSelectItemCallbackList.push(fn);
        }
        /**
         * 移除注册的SelectItem回调事件
         * @param {{(index:number, value:any):void}} fn
         */

    }, {
        key: "removeSelectItemListener",
        value: function removeSelectItemListener(fn) {
            this.onSelectItemCallbackList = this.onSelectItemCallbackList.filter(function (_fn) {
                return _fn !== fn;
            });
        }
        /**
         * 销毁
         */

    }, {
        key: "destroy",
        value: function destroy() {
            this.onSelectItemCallbackList = null;
        }
        ////////////////////////////DOM相关

    }, {
        key: "getDOM",
        value: function getDOM() {
            return this.dom;
        }
    }]);

    return Wheel;
}();

exports.Wheel = Wheel;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * 兼容es7的assign方法，这样可以省略polyfill
     * @param {object} target
     * @param {...object[]} source
     * @returns {object}
     */
    assign: function assign(target) {
        for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            source[_key - 1] = arguments[_key];
        }

        // 第一个参数为空，则抛错
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
        }
        var to = Object(target);
        // 遍历剩余所有参数
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            // 参数为空，则跳过，继续下一个
            if (nextSource === undefined || nextSource === null) {
                continue;
            }
            nextSource = Object(nextSource);
            // 获取改参数的所有key值，并遍历
            var keysArray = Object.keys(nextSource);
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                // 如果不为空且可枚举，则直接浅拷贝赋值
                if (desc !== undefined && desc.enumerable) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domUtil = __webpack_require__(0);

var _domUtil2 = _interopRequireDefault(_domUtil);

var _em = __webpack_require__(1);

var _constant = __webpack_require__(2);

var _constant2 = _interopRequireDefault(_constant);

var _browserUtil = __webpack_require__(3);

var _browserUtil2 = _interopRequireDefault(_browserUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//构建主框架
function Frame(picker, option) {

	//picker对象
	this.picker = picker;
	//option
	this.option = option;

	//构建cover
	this.cover = (0, _domUtil2.default)("<div class='my-picker-cover' style='z-index: " + option.zIndex + "'>").hide();

	this.frame = (0, _domUtil2.default)('<div class="picker picker-frame" style="z-index: ' + (option.zIndex + 1) + '">' + '<header class="picker-head">' + '<a class="picker-btn-cancel"><span class="picker-header-text"></span></a>' + '<h4 class="picker-title"><span class="picker-header-text"></span></h4>' + '<span class="picker-selected">已选0</span>' + '<a class="picker-btn-ok"><span class="picker-header-text"></span></a>' + '</header>' + '<div class="picker-body"></div>' + '</div>').css('height', (_constant2.default.WHEEL_HEIGHT + 15) / 100 + "em").hide();
	this.frame.find(".picker-body")[0].addEventListener('touchstart', function (event) {
		event.preventDefault();
		event.stopPropagation();
	});

	//如果是3d透视模式，增加3d透视的样式
	if (!_browserUtil2.default.isIE() && !(_browserUtil2.default.isAndroid() && _browserUtil2.default.androidVersion() < 4.4) && this.option.isPerspective) {
		this.frame.addClass('s-3d').find(".picker-body").css("perspective", _constant2.default.WHEEL_HEIGHT / 100 + "em").css("webkitPerspective", _constant2.default.WHEEL_HEIGHT / 100 + "em").css("mozPerspective", _constant2.default.WHEEL_HEIGHT / 100 + "em").css("msPerspective", _constant2.default.WHEEL_HEIGHT / 100 + "em");
	}

	//设置标题按钮名
	this.frame.find(".picker-title .picker-header-text").text(option.title);
	this.frame.find(".picker-btn-cancel .picker-header-text").text(option.buttons[1] || '取消');
	this.frame.find(".picker-btn-ok .picker-header-text").text(option.buttons[0] || '确定');

	(0, _domUtil2.default)("body").append(this.frame).append(this.cover);

	//绑定主架的事件
	var that = this;
	this.frame.find(".picker-btn-cancel").on("click", function (event) {
		if (typeof that.option.onCancelClick == 'function') {
			that.option.onCancelClick.call(that.picker);
		}
		that.picker.hide();
	});
	this.frame.find(".picker-btn-ok").on("click", function (event) {
		if (typeof that.option.onOkClick == 'function') {
			var result = that.option.onOkClick.call(that.picker, picker.getValue());
			if (result === false) {
				return;
			}
		}
		that.picker.hide();
	});

	this._resizeHandle = function () {
		this.frame.css('fontSize', (0, _em.em)() * 100 + 'px');
	}.bind(this);

	window.addEventListener('resize', this._resizeHandle);
	this._resizeHandle();
}

Frame.prototype = {
	//显示cover
	showCover: function showCover() {
		var _this = this;

		this.cover.show();
		setTimeout(function () {
			_this.cover.addClass('s-open');
		}, 0);
	},
	//隐藏cover
	hideCover: function hideCover() {
		this.cover.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.cover.hide();
		}, 200);
	},
	//显示frame
	showFrame: function showFrame() {
		var _this2 = this;

		this.frame.show();
		setTimeout(function () {
			_this2.frame.addClass('s-open');
		}, 0);
	},
	//显示frame
	hideFrame: function hideFrame() {
		this.frame.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.frame.hide();
		}, 200);
	},
	dom: function dom() {
		return this.frame;
	},
	body: function body() {
		return this.frame.find('.picker-body');
	},
	//关闭
	close: function close() {
		this.remove();
		window.removeEventListener('resize', this._resizeHandle);
	},
	//移除
	remove: function remove() {
		this.frame.remove();
	}
};

module.exports = Frame;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=my-picker.js.map