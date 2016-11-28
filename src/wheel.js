/**
 * 滚轮类,是显示选择器可选项的滚轮体
 */

var $ = require("./util/domUtil");
var config = require("./config");

function Wheel(picker, option, index){

	///////////////////主要属性
	//picker对象
	this.picker = picker;
	//option对象
	this.option = option;
	//记录当前滚轮是容器中第几个滚轮
	this.index = index;
	//转轮主体
	this.dom = $(
		'<div class="picker-wheel">'
		+ '<ul></ul>'
		+ '</div>').height(config.wheelHeight);

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
	this.visibleAngle = 90 - Math.acos(this.radius / config.wheelHeight / 2) / Math.PI * 180;
	//是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
	this.isPerspective = this.option.isPerspective;

	////////////////////滚动属性
	//当前滚轮转角
	this.angle = 0;
	//速度，供触摸离开时候使用
	this.speed = 0;
	//当前时间戳,主要是计算转动速度使用的
	this.timeStamp = 0;

	////////////////////可选项属性
	//可选项列表
	this.list = [];
	//根据值生成的hashmap,主要是为了快速获得value对应可选项的index
	this.valueHashMap = {};
	//如果items数组里的值是对象,其中显示的key
	this.itemLabelKey = this.option.itemLabelKey;
	//如果items数组里的值是对象,其中值的key
	this.itemValeKey = this.option.itemValeKey;


	var that = this;
	function touchstart(event) {
		var point = event.touches ?  event.touches[0] : {screenY: event.screenY,screenX: event.screenX};

		that.lastY = point.screenY;
		that.timeStamp = Date.now();
		that.starttouch = true;

		cancelAnimationFrame(that.animationId);
	}
	this.dom[0].addEventListener("touchstart", touchstart);
	this.dom[0].addEventListener("mousedown", touchstart);

	function touchmove(event){
		if(!that.starttouch){
			return;
		}

		var point = event.touches ?  event.touches[0] : {screenY: event.screenY,screenX: event.screenX};

		//根据触摸位移(鼠标移动位移)计算转角变化量,由于透视关系,所以实际位移需要做一次变换
		var yMove = point.screenY - that.lastY;
		var changeAngle = yMove * (config.wheelHeight - that.radius) / (config.wheelHeight) * -1.0 / (that.radius * Math.PI * 2) * 360;
		var angle = changeAngle + that.angle;

		that.setAngle(angle);

		//记录速度,供触摸离开事件用
		that.lastY = point.screenY;
		if(changeAngle){
			that.speed = changeAngle / (Date.now() - that.timeStamp);
		} else{
			that.speed = 0;
		}
		that.timeStamp = Date.now();
	}
	this.dom[0].addEventListener("touchmove", touchmove);
	this.dom[0].addEventListener("mousemove", touchmove);

	function touchend(event){
		if(!that.starttouch){
			return;
		}
		that.starttouch = false;

		that.lastY = 0;
		cancelAnimationFrame(that.animationId)

		var angle = that.speed * Math.abs( that.speed) * 2 * config.wheelTransitionTime;
		var angle = angle + that.angle;

		angle = Math.max(that.minAngle, angle);
		angle = Math.min(that.maxAngle, angle);

		angle = Math.round(angle / config.wheelItemAngle) * config.wheelItemAngle;


		that.speed = 0;

		var start = 0, during = 100;
		var _run = function() {
			start++;
			var top =easeOut(start, that.angle, angle - that.angle, during);
			that.contains.css("transform","rotateX(" + top + "deg)");
			that.angle = top;
			that.flushLabel();
			if (top != angle) {
				that.animationId = requestAnimationFrame(_run);
			} else {
				console.log(1)
			}
		};
		_run();
	}
	this.dom[0].addEventListener("touchend", touchend);
	this.dom[0].addEventListener("mouseup", touchend);

}

/**
 * 生成用户可选的标签
 * @param list				用户可选项数组
 */
Wheel.prototype.setOption = function (list) {
	var that = this;

	list = list || [];
	if(Array.isArray(list)){
		//清空容器
		that.contains.html("");
		this.list = list;
	} else {
		throw new TypeError("list is not a array.")
	}

	//计算valueHashMap
	this.valueHashMap = {}

	//计算最小转角
	this.minAngle = -1 * config.wheelItemAngle * (Math.max(0, this.list.length - 1) );

	//生成滚轮的标签
	//标签的index
	var i = 0,
		//标签显示值
		label,
		//显示标签的dom的高度,要求根据wheelItemAngle计算,使各个标签dom的边缘刚好挨在一起,确保没有空细
		height = this.radius * Math.PI * config.wheelItemAngle / 180;

	this.list.forEach(function(item,index){

		//如果是对象,取itemLabelKey对应值显示。否则直接显示它本身
		if(item instanceof Object){
			label = item[that.itemLabelKey];
			that.valueHashMap[item[that.itemValeKey]] = i;
		} else {
			label = item;
			that.valueHashMap[item] = i;
		}

		//创建label的显示dom,并计算他在容器中的位置(角度)
		var li = $("<li>").text(item);
		var angle = config.wheelItemAngle * index;

		li.css("transform","rotateX(" + angle + "deg) translateZ(" + that.radius + "px)")
			.height(height)
			.css("line-height", height + "px");
		//将标签的角度保存到其dom中
		li.data("angle", angle);
		//将标签的index保存到其dom中
		li.data("index", i);
		that.contains.append(li);
		i++;
	});

	//刷新标签
	this.flushLabel();
}

/**
 * 给定指定标签的值,选择指定标签
 */
Wheel.prototype.selectOption = function(value){
	var that = this;

	//如果valueHashMap里面没有value,表示没有这个标签,否则自动选中这个标签
	if(this.valueHashMap[value] !== undefined){
		var index = this.valueHashMap[value];

		that.selectIndex(index);
	}
}

/**
 * 给定指定备选标签的index,自动设定标签的各个位置
 */
Wheel.prototype.selectIndex = function(index){
	var that = this;

	var angle = index * -config.wheelItemAngle;
	this.setAngle(angle);
}

/**
 * 给定指定角度,自动设定标签的各个位置
 */
Wheel.prototype.setAngle = function(angle){
	angle = Math.max(this.minAngle, angle);
	angle = Math.min(this.maxAngle, angle);

	this.contains.css("transform","rotateX(" + angle + "deg)");
	this.angle = angle;
	this.flushLabel();

	return angle;
}

/**
 * 刷新各个标签的状态,确定应该显示哪些标签
 */
Wheel.prototype.flushLabel = function(){
	var that = this;
	this.dom.find("li").each(function(index, li){
		li = $(li);
		var angle = li.data("angle") + that.angle;
		if(angle > this.visibleAngle || angle < (-this.visibleAngle)){
			if(li.css("display") != "none"){
				li.css("display","none");
			}
		} else {
			if(li.css("display") != "block"){
				li.css("display","block");
			}
		}
	})
}

function easeOut(t, b, c, d) {
	return c * ((t = t/d - 1) * t * t + 1) + b;
}

function easeInOut(t, b, c, d) {
	if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	return -c / 2 * ((--t) * (t-2) - 1) + b;
}


module.exports = Wheel;