var Frame = require("./frame");
var Wheel = require("./wheel");
var Col = require("./wheel/col");
var util = require("./util/util");
var defaultOption = require("./option");
require("./style/style.scss");



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
    this[KEY_OPTION] = util.extends({} , defaultOption ,option);

    //主架
    this[KEY_FRAME] = new Frame(this, this[KEY_OPTION]);

    //解析cols属性,将其转换为Cols的数组
    var cols = [], i= 0;
    if(Array.isArray(this[KEY_OPTION].cols)){
        //如果cols为空数组,或者里面的元素是字符串,表示仅一个滚轮,就是cols本身
        if(this[KEY_OPTION].cols.length === 0 || typeof this[KEY_OPTION].cols[0] === 'string'){
            cols.push(new Col(this[KEY_OPTION].cols))
        } else {
            //否则表示数组中的每个元素都是个滚轮
            for(i =0; i < this[KEY_OPTION].cols.length; i++){
                cols.push(new Col(this[KEY_OPTION].cols[i]))
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
    for(i = 0; i < cols.length ; i++){
        var col = cols[i];

        //设置滚轮
		wheel = new Wheel(this, col, this[KEY_OPTION], i);
		this[KEY_WHEELS].push(wheel);
		this[KEY_FRAME].body().append(wheel.dom );

        //重写wheel的onSelectItem事件
        var that = this;
        wheel.$onSelectItem = (function (i) {
            return function (index, value) {
                //如果用户注册了onSelectItem
                if(typeof that[KEY_OPTION].onSelectItem == 'function'){
                    that[KEY_OPTION].onSelectItem.call(that, i, index, value);
                }
            }
        })(i)


    }

    for(i = 0; i < cols.length ; i++) {

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
}

/**
 * 隐藏
 */
Picker.prototype.hide = function () {
    this[KEY_FRAME].hideCover();
    this[KEY_FRAME].hideFrame();
    this.visible = false;
}

/**
 * 关闭
 */
Picker.prototype.close = function () {
    debugger
    this[KEY_FRAME].remove();
    this[KEY_OPTION] = null;
    this[KEY_WHEELS] = null;
    this[KEY_FRAME] = null;
    this[KEY_COLS] = null;
}

/**
 * 设置滚轮的可选值列表
 * @param index             滚轮的index,从0开始记录
 * @param list              滚轮的可选值列表
 * @param defaultValue      默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值
 */
Picker.prototype.setOptions = function(index, list, defaultValue){
    if(this[KEY_WHEELS][index])
        this[KEY_WHEELS][index].setOptions(list, defaultValue);
}


/**
 * 获取滚轮的可选值列表
 * @param index             滚轮的index,从0开始记录
 */
Picker.prototype.getOptions = function(index){
    if(this[KEY_WHEELS][index]){
        return this[KEY_WHEELS][index].getOptions();
    } else {
        return null;
    }
}

/**
 * 设置滚轮的可选值
 * @param index             滚轮的index,从0开始记录
 * @param value             设置的值
 */
Picker.prototype.setValue = function(index, value){
    if(this[KEY_WHEELS][index])
        this[KEY_WHEELS][index].selectOption(value);
}

/**
 * 获取滚轮的值,如果index为空表示获取所有滚轮的值
 * @param index             滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
 */
Picker.prototype.getValue = function(index){
    if(index != null){
        if(this[KEY_WHEELS][index])
            return this[KEY_WHEELS][index].getValue();
    } else {
        var values = [];
        for(i = 0; i < this[KEY_COLS].length ; i++){
            values.push(this[KEY_WHEELS][i].getValue());
        }
        return values;
    }

}

module.exports = function(option){
    return new Picker(option);
};



