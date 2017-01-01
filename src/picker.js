var Frame = require("./frame");
var Wheel = require("./wheel");
var util = require("./util/util");
var defaultOption = require("./option");
var style = require("./style/style.scss");

//Picker的私有成员的key
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
    this[KEY_WHEELS] = [];
    var i = 0, wheel;
    for(i = 0; i < this[KEY_OPTION].levelCount ; i++){


        //设置滚轮
		wheel = new Wheel(this, this[KEY_OPTION], i);
		this[KEY_WHEELS].push(wheel);
		this[KEY_FRAME].body().append(wheel.dom );

        //重写wheel的onSelectItem事件
        var that = this;
        wheel.$onSelectItem = function (index, value) {
            //如果用户注册了onSelectItem
            if(typeof that[KEY_OPTION].onSelectItem == 'function'){
                that[KEY_OPTION].onSelectItem(index, value);
            }
        }

        wheel.setSuffix('年')
    }
}

Picker.prototype.setLabel = function(index, list){
    this[KEY_WHEELS][index].setOption(list);
}

Picker.prototype.selectOption = function(index, value){
    this[KEY_WHEELS][index].selectOption(value);
}


Picker.prototype.setLabel = function(index, list){
    this[KEY_WHEELS][index].setOption(list);
}

Picker.prototype.selectOption = function(index, value){
    this[KEY_WHEELS][index].selectOption(value);
}


window.picker = function(option){
	return new Picker(option);
};
window._picker = window.picker({
    levelCount : 3,
    itemsSuffix : ['年','月','日'],
    onSelectItem : function (index, value) {
    }
});

var year = [];
for(var i = 16; i < 30 ; i++){
    year.push(i + 2000);
}
var month = [];
for(var i = 0; i < 12 ; i++){
    month.push(i + 1);
}
var day = [];
for(var i = 0; i < 31 ; i++){
    day.push(i + 1);
}


window._picker.setLabel(0,year);
window._picker.setLabel(1,month);
window._picker.setLabel(2,day);
