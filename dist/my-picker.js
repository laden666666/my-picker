(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myPicker"] = factory();
	else
		root["myPicker"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(4);
module.exports = $(document);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 私有配置
 */
module.exports = {
	//滚轮的高度
	wheelHeight: 85,
	//每个可选项在滚轮上的角度
	wheelItemAngle: 15,
	//滚轮因惯性而发生的减速滑动时间
	wheelTransitionTime: 400
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Frame = __webpack_require__(3);
var Wheel = __webpack_require__(5);
var Col = __webpack_require__(12);
var util = __webpack_require__(13);
var defaultOption = __webpack_require__(14);
__webpack_require__(15);

//Picker的私有成员的key
//配置
var KEY_OPTION = Symbol("option");
//滚轮列表
var KEY_WHEELS = Symbol("wheels");
//主框架
var KEY_FRAME = Symbol("frame");
//列的初始数据
var KEY_COLS = Symbol("cols");

function Picker(option) {
    //用用户配置,覆盖默认配置,生成当前控件的实例的配置
    this[KEY_OPTION] = util.extends({}, defaultOption, option);

    //主架
    this[KEY_FRAME] = new Frame(this, this[KEY_OPTION]);

    //解析cols属性,将其转换为Cols的数组
    var cols = [],
        i = 0;
    if (Array.isArray(this[KEY_OPTION].cols)) {
        //如果cols为空数组,或者里面的元素是字符串,表示仅一个滚轮,就是cols本身
        if (this[KEY_OPTION].cols.length === 0 || typeof this[KEY_OPTION].cols[0] === 'string') {
            cols.push(new Col(this[KEY_OPTION].cols));
        } else {
            //否则表示数组中的每个元素都是个滚轮
            for (i = 0; i < this[KEY_OPTION].cols.length; i++) {
                cols.push(new Col(this[KEY_OPTION].cols[i]));
            }
        }
    } else {
        //如果不是数组,表示有cols是一个json形式配置的滚轮
        cols.push(new Col(this[KEY_OPTION].cols));
    }
    this[KEY_COLS] = cols;

    //构造滚轮
    this[KEY_WHEELS] = [];
    var wheel, col;
    for (i = 0; i < cols.length; i++) {
        var col = cols[i];

        //设置滚轮
        wheel = new Wheel(this, col, this[KEY_OPTION], i);
        this[KEY_WHEELS].push(wheel);
        this[KEY_FRAME].body().append(wheel.dom);

        //重写wheel的onSelectItem事件
        var that = this;
        wheel.$onSelectItem = function (i) {
            return function (index, value) {
                //如果用户注册了onSelectItem
                if (typeof that[KEY_OPTION].onSelectItem == 'function') {
                    that[KEY_OPTION].onSelectItem.call(that, i, index, value);
                }
            };
        }(i);
    }

    for (i = 0; i < cols.length; i++) {

        //设置滚轮的选项
        that.setValue(i, that[KEY_OPTION].setValues[i]);
    }

    //是否可见
    this.visible = false;
}

/**
 * 显示
 */
Picker.prototype.show = function () {
    this[KEY_FRAME].showCover();
    this[KEY_FRAME].showFrame();
    this.visible = true;
};

/**
 * 隐藏
 */
Picker.prototype.hide = function () {
    this[KEY_FRAME].hideCover();
    this[KEY_FRAME].hideFrame();
    this.visible = false;
};

/**
 * 关闭
 */
Picker.prototype.close = function () {
    this[KEY_FRAME].remove();
    this[KEY_FRAME].hideCover();
    this[KEY_OPTION] = null;
    this[KEY_WHEELS] = null;
    this[KEY_FRAME] = null;
    this[KEY_COLS] = null;
};

/**
 * 设置滚轮的可选值列表
 * @param index             滚轮的index,从0开始记录
 * @param list              滚轮的可选值列表
 * @param defaultValue      默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值
 */
Picker.prototype.setOptions = function (index, list, defaultValue) {
    if (this[KEY_WHEELS][index]) this[KEY_WHEELS][index].setOptions(list, defaultValue);
};

/**
 * 获取滚轮的可选值列表
 * @param index             滚轮的index,从0开始记录
 */
Picker.prototype.getOptions = function (index) {
    if (this[KEY_WHEELS][index]) {
        return this[KEY_WHEELS][index].getOptions();
    } else {
        return null;
    }
};

/**
 * 设置滚轮的可选值
 * @param index             滚轮的index,从0开始记录
 * @param value             设置的值
 */
Picker.prototype.setValue = function (index, value) {
    if (this[KEY_WHEELS][index]) this[KEY_WHEELS][index].selectOption(value);
};

/**
 * 获取滚轮的值,如果index为空表示获取所有滚轮的值
 * @param index             滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
 */
Picker.prototype.getValue = function (index) {
    if (index != null) {
        if (this[KEY_WHEELS][index]) return this[KEY_WHEELS][index].getValue();
    } else {
        var values = [];
        for (i = 0; i < this[KEY_COLS].length; i++) {
            values.push(this[KEY_WHEELS][i].getValue());
        }
        return values;
    }
};

module.exports = function (option) {
    return new Picker(option);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var config = __webpack_require__(1);

//构建主框架
function Frame(picker, option) {

	//picker对象
	this.picker = picker;
	//option
	this.option = option;

	//构建cover
	this.cover = $("<div class='my-picker-cover' style='z-index: " + option.zIndex + "'>").hide();

	this.frame = $('<div class="picker picker-frame" style="z-index: ' + (option.zIndex + 1) + '">' + '<header class="picker-head">' + '<a class="picker-btn-cancel"></a>' + '<h4 class="picker-title"></h4>' + '<span class="picker-selected">已选0</span>' + '<a class="picker-btn-ok"></a>' + '</header>' + '<div class="picker-body"></div>' + '</div>').css('height', config.wheelHeight + 15 + "vmin").hide();
	this.frame.find(".picker-body").css("webkitPerspective", config.wheelHeight + "vmin").css("mozPerspective", config.wheelHeight + "vmin").css("msPerspective", config.wheelHeight + "vmin").css("perspective", config.wheelHeight + "vmin")[0].addEventListener('touchstart', function (event) {
		event.preventDefault();
		event.stopPropagation();
	});

	//设置标题按钮名
	this.frame.find(".picker-title").text(option.title);
	this.frame.find(".picker-btn-cancel").text(option.buttons[1] || '取消');
	this.frame.find(".picker-btn-ok").text(option.buttons[0] || '确定');

	$("body").append(this.frame).append(this.cover);

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
}

Frame.prototype = {
	//显示cover
	showCover: function showCover() {
		this.cover.show();
		this.cover.addClass('s-open');
	},
	//隐藏cover
	hideCover: function hideCover() {
		this.cover.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.cover.hide();
		}, 500);
	},
	//显示frame
	showFrame: function showFrame() {
		this.frame.show();
		this.frame.addClass('s-open');
	},
	//显示frame
	hideFrame: function hideFrame() {
		this.frame.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.frame.hide();
		}, 500);
	},
	dom: function dom() {
		return this.frame;
	},
	body: function body() {
		return this.frame.find('.picker-body');
	},
	//移除
	remove: function remove() {
		this.frame.remove();
	}
};

module.exports = Frame;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function (global, factory) {
	"use strict"

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = factory;
	} else {
		global.$ = factory(global.document);
	}
})(typeof window !== "undefined" ? window : this, function (document) {

	//用于使用innerHTML生成dom的div
	var div = document.createElement("DIV");
	//用于插入使用的DocumentFragment
	var fragment = document.createDocumentFragment();

	//将html解析为my-jquery对象
	function buildHTML(selector) {
		selector = selector.trim();
		//如果是构建字符串，需要判断是否是<>格式，如果不是表示是选择器
		if(selector.startsWith("<")){
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
				if(selector.startsWith("<")){
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 滚轮类,是显示选择器可选项的滚轮体
 */

var $ = __webpack_require__(0);
var animationUtil = __webpack_require__(6);
var config = __webpack_require__(1);
var perspectiveConversion = __webpack_require__(7);
var browserUtil = __webpack_require__(9);
var tick = __webpack_require__(10)();

function Wheel(picker, col, option, index) {

	///////////////////主要属性
	//picker对象
	this.picker = picker;
	//option对象
	this.option = option;
	//记录当前滚轮是容器中第几个滚轮
	this.index = index;
	//转轮主体
	this.dom = $('<div class="picker-wheel">' + '<div class="picker-label"></div>' + '<ul></ul>' + '<div class="picker-label"></div>' + '</div>').css('height', config.wheelHeight + 'vmin');

	//转轮上面标签的容器，同时也是转动的轴
	this.contains = this.dom.find('ul');

	///////////////////滚轮显示属性
	//最大转角
	this.maxAngle = 0;
	//最小转角,设置可选项列表后需重新计算
	this.minAngle = 0;
	//滚轮的实际半径,因为有透视效果,所以滚轮实际半径比容器的高度的一半还小。根据勾股定理,计算得实际半径是容器高度的根号5分之1
	this.radius = config.wheelHeight / Math.sqrt(5);
	//计算标签可显示的角度的绝对值。因为透视关系,所以可见的标签角度小于90度
	this.visibleAngle = 90 - Math.acos(this.radius / config.wheelHeight * 2) / Math.PI * 180;
	//是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
	this.isPerspective = this.option.isPerspective;
	//获取1vmin的实际像素值
	this.vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
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
	//被选值的值
	this.selectedValue;
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
	this.dom.find(".picker-label").css("transform", "translateZ(" + this.radius + "vmin) scale(1)");

	//设置标签
	this.setSuffix(col.suffix);
	this.setPrefix(col.prefix);
	this.setOptions(col.options, null, true);
}

/////////////////////////////////拖拽相关事件
/**
 *
 * 开始拖拽
 * @param offsetY			当前用户手指(鼠标)的y坐标
 */
Wheel.prototype.startDrag = function (offsetY) {
	//记录触摸相关信息,为下一步计算用.计算时候,要将坐标系移至中心,并将单位转为vm
	this.lastY = (config.wheelHeight / 2 - offsetY / this.vmin) * -1;
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
	animationUtil.stopAnimation(this.animationId);
};

/**
 * 拖拽
 * @param offsetY			当前用户手指(鼠标)的y坐标
 */
Wheel.prototype.drag = function (offsetY) {

	if (!this.isDraging) {
		return;
	}

	//根据触摸位移(鼠标移动位移)计算转角变化量
	//现将坐标系移植中心,并将单位转为vm
	var y = (config.wheelHeight / 2 - offsetY / this.vmin) * -1;
	//计算位移,因为z轴有透视,所以位移量不是真正的曲面的位移量,要做一次透视变换

	var changeAngle = (perspectiveConversion(this.lastY, this.radius, config.wheelHeight) - perspectiveConversion(y, this.radius, config.wheelHeight)) / Math.PI * 180;
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
};

/**
 * 拖拽结束
 */
Wheel.prototype.endDrag = function () {
	if (!this.isDraging) {
		return;
	}

	//速度*4,做均减少运动,计算滚动后的angle。之所以乘4是根据偏移效果经验得到的
	var changeAngle = this.speed * Math.abs(this.speed) * 8 * config.wheelTransitionTime;
	var angle = changeAngle + this.angle;

	//根据角度计算最终的被选值
	var selectedIndex = this.calcSelectedIndexByAngle(angle);

	//开启动画,选中被选中
	this.selectIndex(selectedIndex, true);

	//计算完成,清空速度相关变量,并去除之前的动画效果
	this.isDraging = false;
	this.lastY = 0;
	this.speed = 0;
};

/////////////////////////////////设置相关
/**
 * 生成用户可选的标签
 * @param list				用户可选项数组
 * @param selectedValue		默认值
 * @param isInti			是否是初始化,初始化不执行设置默认值操作
 */
Wheel.prototype.setOptions = function (list, selectedValue, isInti) {
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
	this.maxAngle = config.wheelItemAngle * Math.max(0, this.list.length - 1);

	//生成滚轮的标签
	//标签的index
	var i = 0,

	//标签显示值
	label,

	//显示标签的dom的高度,要求根据wheelItemAngle计算,使各个标签dom的边缘刚好挨在一起,确保没有空细
	height = this.radius * Math.PI * config.wheelItemAngle / 180;

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
		var li = $("<li></li>");
		li.append($("<span></span>").text(label));
		var angle = config.wheelItemAngle * -index;

		//为了解决3d放大后，文字模糊的问题，故采用zoom=2的方案，所以li的尺寸方面，统一缩小一半
		li.css("transform", "rotateX(" + angle + "deg) translateZ(" + that.radius + "vmin)").css("height", height + "vmin").css("line-height", height + "vmin");
		//将标签的角度保存到其dom中
		li.data("angle", angle);
		//将标签的index保存到其dom中
		li.data("index", i);

		//将标签的dom放到contains上,contains的事件全部委托于容器,即标签不监听事件
		that.contains.append(li);

		//增加点击选择功能
		var clickHandle = function clickHandle(event) {
			if (that.changeMaxAngle < 10) {
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
};

/**
 * 获得用户可选的标签
 */
Wheel.prototype.getOptions = function () {
	return this.list;
};

/**
 * 给定指定标签的值,选择指定标签
 */
Wheel.prototype.selectOption = function (value, showAnimation) {
	//如果valueHashMap里面没有value,表示没有这个标签,否则自动选中这个标签
	if (this.valueHashMap[value] != null) {
		var index = this.valueHashMap[value];

		this.selectIndex(index, showAnimation);
	}
};

/**
 * 给定指定备选标签的index,自动设定标签的各个位置
 * @param index					要选择的index
 * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
 */
Wheel.prototype.selectIndex = function (index, showAnimation) {

	var angle = this.calcAngleBySelectedIndex(index);
	animationUtil.stopAnimation(this.animationId);

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
			var _angle = animationUtil.easeOut(start, that.angle, angle - that.angle, during);
			if (Math.abs(_angle - angle) < 1) {
				_angle = angle;
			}

			that.setAngle(_angle);

			if (_angle != angle) {
				that.animationId = animationUtil.startAnimation(_run);
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
		that.animationId = animationUtil.startAnimation(_run);
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
};

/**
 * 给定指定角度,自动设定标签的各个位置
 * @param angle					要转到的角度
 * @returns {number}			修正后的角度,即最终的实际角度
 */
Wheel.prototype.setAngle = function (angle) {

	//修正转角,要求转角不能大于maxAngle,不能小于minAngle
	angle = this.rangeAngle(angle);
	// 如果角度变化经过刻度,则放声
	if (this.option.hasVoice && this.picker.visible) {
		var lastIndexAngle = this.lastIndexAngle;
		var index = this.calcSelectedIndexByAngle(angle);
		if (lastIndexAngle != index) {
			tick.play();
		}
		this.lastIndexAngle = index;
	}

	this.contains.css("transform", "rotateX(" + angle + "deg)");
	this.angle = angle;
	this.flushLabel();

	return angle;
};

/**
 * 通过角度计算被选项的id
 * @param angle				要计算的角度
 * @returns {number}		被选项id
 */
Wheel.prototype.calcSelectedIndexByAngle = function (angle) {
	angle = this.rangeAngle(angle);
	return Math.round(Math.abs(angle / config.wheelItemAngle));
};

/**
 * 通过角度计算被选项的id
 * @param angle				要计算的角度
 * @returns {number}		被选项id
 */
Wheel.prototype.calcAngleBySelectedIndex = function (index) {
	return index * config.wheelItemAngle;
};

/**
 * 限制转角超过极限值
 * @param angle				要计算的角度
 * @returns {number}		被选项id
 */
Wheel.prototype.rangeAngle = function (angle) {
	//修正转角,要求转角不能大于maxAngle,不能小于minAngle
	angle = Math.max(this.minAngle, angle);
	angle = Math.min(this.maxAngle, angle);
	return angle;
};

/**
 * 刷新各个标签的状态,确定应该显示哪些标签
 */
Wheel.prototype.flushLabel = function () {
	var that = this;
	this.dom.find("li").each(function (index, li) {
		li = $(li);
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
};

/**
 * 获取被选值
 */
Wheel.prototype.getValue = function () {
	return this.selectedValue;
};

/////////////////////////////设置前缀后缀
/**
 * 设置后缀
 * @param text			后缀显示的文本
 */
Wheel.prototype.setSuffix = function (text) {
	$(this.dom.find('.picker-label')[1]).text(text);
};
/**
 * 设置前缀
 * @param text			前缀显示的文本
 */
Wheel.prototype.setPrefix = function (text) {
	$(this.dom.find('.picker-label')[0]).text(text);
};

/////////////////////////////wheel事件相关
/**
 * 触发回调函数的接口
 * @param index			当前被选值的索引
 * @param value			当前被选值的值
 */
Wheel.prototype.toggleSelected = function (index, value) {
	this.$onSelectItem(index, value);
};
/**
 * 选择后的默认回调。会被packer覆盖掉
 * @param index			当前被选值的索引
 * @param value			当前被选值的值
 */
Wheel.prototype.$onSelectItem = function (index, value) {};

module.exports = Wheel;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cacheData = __webpack_require__(8);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "0": 0, "1": 0.006180474730027776, "2": 0.012361758667979887, "3": 0.01854466178595427, "4": 0.024729995586343003, "5": 0.030918573871856408, "6": 0.03711121352142655, "7": 0.043308735273995536, "8": 0.04951196452223301, "9": 0.05572173211827738, "10": 0.06193887519365582, "11": 0.06816423799561012, "12": 0.07439867274213974, "13": 0.08064304049816978, "14": 0.08689821207536214, "15": 0.0931650689582126, "16": 0.09944450425921704, "17": 0.1057374237060475, "18": 0.11204474666385271, "19": 0.11836740719599605, "20": 0.12470635516675682, "21": 0.13106255738976524, "22": 0.13743699882620672, "23": 0.1438306838371266, "24": 0.1502446374944947, "25": 0.15667990695605222, "26": 0.163137562909363, "27": 0.16961870109094018, "28": 0.1761244438868085, "29": 0.18265594202141244, "30": 0.189214376342388, "31": 0.1958009597093892, "32": 0.20241693899591295, "33": 0.20906359721390222, "34": 0.21574225577183714, "35": 0.2224542768780669, "36": 0.22920106610229693, "37": 0.23598407510944647, "38": 0.24280480458155373, "39": 0.24966480734504126, "40": 0.2565656917224997, "41": 0.26350912513022323, "42": 0.2704968379450743, "43": 0.27753062766690556, "44": 0.28461236340577195, "45": 0.2917439907265723, "46": 0.298927536887646, "47": 0.30616511651426775, "48": 0.3134589377530486, "49": 0.3208113089590395, "50": 0.32822464597399087, "51": 0.3357014800618854, "52": 0.3432444665767064, "53": 0.3508563944476478, "54": 0.35854019657886727, "55": 0.3662989612747276, "56": 0.37413594481766604, "57": 0.38205458534478537, "58": 0.39005851819157766, "59": 0.3981515928975172, "60": 0.4063378920994586, "61": 0.41462175257587425, "62": 0.42300778874928274, "63": 0.4315009190073606, "64": 0.4401063952672662, "65": 0.4488298362852176, "66": 0.45767726530766856, "67": 0.4666551527757603, "68": 0.47577046493656705, "69": 0.4850307193901132, "70": 0.4944440488195467, "71": 0.5040192744255141, "72": 0.5137659909310855, "73": 0.523694665462527, "74": 0.5338167531736872, "75": 0.5441448332086339, "76": 0.5546927695451231, "77": 0.5654759025098686, "78": 0.5765112784180985, "79": 0.5878179270265199, "80": 0.5994171995371129, "81": 0.6113331840998124, "82": 0.6235932216642447, "83": 0.6362285534378791, "84": 0.6492751433974548, "85": 0.6627747373240171, "86": 0.6767762470698537, "87": 0.6913375909489355, "88": 0.7065281883018284, "89": 0.7224324166263504, "90": 0.7391545276252866, "91": 0.7568258524516188, "92": 0.7756157498195769, "93": 0.7957489855645078, "94": 0.8175348626997212, "95": 0.8414195586288256, "96": 0.8680892494981647, "97": 0.8987014263951989, "98": 0.935517870959519, "99": 0.9843911534692572, "100": 1.1071487177940906 };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    isIE: !!~navigator.userAgent.toUpperCase().indexOf("MSIE"),
    isFirefox: !!~navigator.userAgent.toUpperCase().indexOf("Firefox"),
    isChrome: window.navigator.userAgent.indexOf("Chrome") !== -1
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 滚轮滚动时候发声的函数,是一个单例模式
 */
var tick = __webpack_require__(11);

function AudioImpl() {
    if (Audio) {
        this.audio = new Audio(tick);
        this.audio.volume = 0.2;
    }
}

AudioImpl.prototype.play = function () {
    try {
        if (this.audio) {
            this.audio.currentTime = 0;
            this.audio.play();
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
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:audio/x-wav;base64,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bP4X/4//vf+d/4n/Wf8V//n+A/8o/zb/PP8Q/+T+zf7R/hT/Kv8m/xr/Cv8C/+r+/P4K/y//jf/D//b/3//U/9P/3v/u/+b/6//K/8j/xf/A/8j/2/+1/0r/v/5s/nD+4P4W/yX/F/85/23/iP+V/4//sv8TAE4AagBuAJUAoABSACUA/f/Q/7r/0v/q/9T/g/8r/7X+ZP4g/hX+X/6q/gX/M/8y/+j+r/7R/gL/RP97/5j/xP/I/6j/mP/E//X/CwAZAPz/vf+0/67/n/9q/zz/HP/4/uT+4f4K/xz/Iv8x/yr/JP9B/2f/j/+b/43/Zv9a/2f/mf+f/6b/c/9T/y3/DP/s/r7+j/5g/mv+iP7A/hr/Zf+V/6r/vP+w/8T/l/9z/3z/iv9p/wr/qv5f/o/+zf76/h3/Q/9j/1//Gf+r/of+fv7X/hr/Vf+I/4n/d/9p/2v/XP99/5X/pf+b/2z/Kf8G/+7+8v7+/hr/Rf94/2T/Hf/U/rL+tP7E/tT+0f70/l7/7f8VADEAQQA+ACIArv8x/9H+gv4p/g7+Tv7I/hj/EP8C/wn/Ev/3/tT+wv7D/vf+G/8N/wr/W//Q////1/+//6f/bv8M/7j+x/4M/yz/Gv/6/t7+zf4C/2T/rP+z/33/Rf8C/+T+u/7Y/gr/P/9e/z3/DP8w/2n/Zv81/x3/Gv8F/+T+2f7t/vz+6f7K/q3+yP7o/gz/Ov9h/2P/K//R/on+mv6s/sj+4P4S/1P/hP+Q/23/Wv8y/xH/0f6G/mr+ev7A/lL/rP/f/7//jv8x/wr/+v4r/07/Sv9P/2L/fv+1/8P/k/9n/0f/Pf9l/3L/cv9a/x//+/4m/0r/Vv8j/xb/Df8o/zn/Sf8u/xr/Lf9F/1X/U/99/8X/8v/1/93/wP+m/4H/Qf8N//v+2v7O/sP+0f4P/zT/P/9M/0b/J/8v/y3/QP9Y/3j/if+E/3z/ZP8i//v+6v4B/xb/I/8q/x//N/9D/yH/Bf8H/w7/Mv9q/4X/d/+S/3D/O/8W/x//Kf9H/33/qf+h/1T/A//6/hT/Iv9I/2T/sP/u/+X/1v+b/1v/Nf80/1j/Zf9c/0P/Q/9h/37/mP+Z/3z/XP9a/1n/YP9n/33/XP8z/+r+vf7H/uP+Mv92/6v/wf+r/6P/bf9E/w//HP9S/0j/E/8H/yX/Qf8Y/wL/Iv8c/+7+pP6u/v3+Sv+d/+z/DQARANH/ef9B/wb/+f7U/qf+mv6u/uL+Af8i/0f/e/8="

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by njz on 17/1/21.
 */
function Cal(option) {
    //默认的显示key
    var defaultLabelKey = "label";
    //默认的值key
    var defaultValueKey = "value";

    //如果option是一个数组,视为仅存在options的情况
    if (Array.isArray(option)) {
        this.options = option;
        this.prefix = "";
        this.suffix = "";
        this.labelKey = defaultLabelKey;
        this.valueKey = defaultValueKey;
    } else {
        this.options = option.options || [];
        this.prefix = option.prefix || "";
        this.suffix = option.suffix || "";
        this.labelKey = option.labelKey || defaultLabelKey;
        this.valueKey = option.valueKey || defaultValueKey;
    }
}

module.exports = Cal;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = {
    extends: function _extends(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

};

module.exports = _;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 用户配置
 */
module.exports = {
	///////////////可选值相关

	/**
  * 可选值列表的配置,是个数组,数组每项一列,一列的配置项的完整格式为一个json对象,最多支持3列。如:
  * [{
  * 	options:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  * },{
  * 	options:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
  * }]
  *
  * 如果cols的参数是一个json,将视为只有一列可选值列表。,如:
  * {
     *  prefix: '第',
     *  options: ['一', '二', '三', '四', '五'],
     *  suffix: '章',
     * }
  * prefix是前缀,suffix是后缀,他们会显示在滚轮两侧。
  *
  * 同时options里面的值可以是一个字符串,也可以是一个json结构。如果是json结构,需要给出显示的key,和其值的key。如:
  * {
     *  labelKey: 'name',
     *  valueKey: 'name',
     *  options: [{name: '张三'},{name: '李四'},{name: '王五'}],
     * }
  *
  * 如果如果可选值列表只有一列,且是个字符串数组,可进一步简化配置为:
  * ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
     */
	cols: [[]],

	//已选择的对象。是个数组,索引必须和cols里面的可选值列表的索引一样
	setValues: [],
	/**
  * 用户转动滚轮停止时,响应的事件
  * @param level				被选值所在的层级,从0开始计数
  * @param selectedIndex		被选值在数组中的索引
  * @param selectedValue		被选值
     */
	onSelectItem: null,
	/**
  * 如果是多选,最后一级滚轮会显示checkbox,点击checkbox的事件
  * @param selectedObj		被选值
  * @param isSelected		是否被选中。如果是取消选择,值是false
  */
	onChickCheckBox: null,

	/**
  * 点击"确定按钮"的事件函数,函数会返回一个数组,数组里面是被选值。接受一个返回值,如果返回值是false,picker不关闭,否则会关闭picker
     */
	onOkClick: null,

	/**
  * 点击取消按钮的事件。执行后会关闭picker
  */
	onCancelClick: null,

	///////////////显示相关
	//显示的字体,只支持数字,单位是px
	fontSize: 15,
	//是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
	isPerspective: true,
	//有声音
	hasVoice: true,
	//标题
	title: '',
	//显示按钮的名称,第一个是按钮是确定,第二个是取消。
	buttons: ["确定", "取消"],
	/**
  * 控件创建完成的回调。控件创建完成,默认是隐藏状态
  */
	onLoad: null,
	/**
  * 每次显示时候的回调
  */
	onShow: null,
	/**
  * zindex属性
  */
	zIndex: 100
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=my-picker.js.map