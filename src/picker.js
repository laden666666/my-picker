var frame = require("./frame");
var Wheel = require("./wheel");
var util = require("./util/util");
var defaultOption = require("./option");
var style = require("./style/style.scss");

//Picker的私有变量key
//配置
var KEY_OPTION = new Symbol("option");
//滚轮列表
var KEY_WHEELS = new Symbol("wheels");
//主框架
var KEY_FRAME = new Symbol("frame");

function Picker(option) {
    //用用户配置,覆盖默认配置,生成当前控件的实例的配置
    this[KEY_OPTION] = util.extends({} , defaultOption ,option);

    //构造滚轮
    var i = 0, wheel;
    for(i = 0; i < this[KEY_OPTION].levelCount ; i++){
        wheel = new Wheel(arr);

        frame.body().append(wheel.dom );
    }


}

var arr = [];
for(var i = 0; i < 100; i++) arr.push(i);
var wheel = new Wheel(arr);
var wheel2 = new Wheel(arr);
//var wheel3 = new Wheel(arr);

frame.body().append(wheel.dom );
frame.body().append(wheel2.dom );
//frame.body().append(wheel3.dom );

window.picker = frame;
