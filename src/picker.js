var frame = require("./frame");
var Wheel = require("./wheel");
var util = require("./util/util");
var defaultOption = require("./option");
var style = require("./style/style.scss");

//Picker的私有变量key
var KEY_OPTION = new Symbol("option");

function Picker(option) {
    this[KEY_OPTION] = util.extends({} ,option , defaultOption);

    this[KEY_OPTION].levelCount
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
