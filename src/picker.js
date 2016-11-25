var Frame = require("./frame");
var Wheel = require("./wheel");
var util = require("./util/util");
var defaultOption = require("./option");
var style = require("./style/style.scss");

//Picker的私有变量key
//配置
var KEY_OPTION = Symbol("option");
//滚轮列表
var KEY_WHEELS = Symbol("wheels");
//主框架
var KEY_FRAME = Symbol("frame");

function Picker(option) {
    //用用户配置,覆盖默认配置,生成当前控件的实例的配置
    this[KEY_OPTION] = util.extends({} , defaultOption ,option);
    
    //主架
    this[KEY_FRAME] = new Frame();

    //构造滚轮
    var i = 0, wheel;
    for(i = 0; i < this[KEY_OPTION].levelCount ; i++){
    }

	var arr = [];
	for(var i = 0; i < 100; i++) arr.push(i);
	var wheel = new Wheel(arr);
	var wheel2 = new Wheel(arr);
	//var wheel3 = new Wheel(arr);
	
	this[KEY_FRAME].body().append(wheel.dom );
	this[KEY_FRAME].body().append(wheel2.dom );
}

window.picker = function(option){
	new Picker(option);
};
window.picker()
