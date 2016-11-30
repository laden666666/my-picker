/**
 * 滚轮类,是显示选择器可选项的滚轮体
 */

var $ = require("./util/domUtil");
var animationUtil = require("./util/animationUtil");
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
	//当前被选值的index
	this.selectedIndex = -1;
	//记录惯性滑动动画的id
	this.animationId = -1;
	//速度，供触摸离开时候的惯性滑动动画使用
	this.speed = 0;
	//当前时间戳,主要是计算转动速度使用的
	this.timeStamp = 0;
	//记录上一次触摸节点的screenY,主要是是计算转动速度使用的
	this.lastY = 0;
	//是否开始触摸,主要给鼠标事件使用
	this.isDraging = false;

	////////////////////可选项属性
	//可选项列表
	this.list = [];
	//根据值生成的hashmap,主要是为了快速获得value对应可选项的index
	this.valueHashMap = {};
	//如果items数组里的值是对象,其中显示的key
	this.itemLabelKey = this.option.itemLabelKey;
	//如果items数组里的值是对象,其中值的key
	this.itemValeKey = this.option.itemValeKey;

	////////////////////注册dom事件
	var that = this;
	//注册拖拽开始事件
	function startDrag(event) {
		var point = event.touches ?  event.touches[0] : {screenY: event.screenY,screenX: event.screenX};
		that.startDrag(point.screenY);
	}
	this.dom[0].addEventListener("touchstart", startDrag);
	this.dom[0].addEventListener("mousedown", startDrag);

	//注册拖拽事件
	function drag(event){
		var point = event.touches ?  event.touches[0] : {screenY: event.screenY,screenX: event.screenX};
		that.drag(point.screenY);
	}
	this.dom[0].addEventListener("touchmove", drag);
	this.dom[0].addEventListener("mousemove", drag);

	//注册拖拽结束事件
	function endDrag(){
		that.endDrag();
	}
	this.dom[0].addEventListener("touchend", endDrag);
	this.dom[0].addEventListener("mouseup", endDrag);

}

/////////////////////////////////拖拽相关事件
/**
 *
 * 开始拖拽
 * @param screenY			当前用户手指(鼠标)的y坐标
 */
Wheel.prototype.startDrag = function (screenY) {
	//记录触摸相关信息,为下一步计算用
	this.lastY = screenY;
	this.timeStamp = Date.now();
	this.isDraging = true;

	//终止之前的动画
	animationUtil.stopAnimation(this.animationId);
}

/**
 * 拖拽
 * @param screenY			当前用户手指(鼠标)的y坐标
 */
Wheel.prototype.drag = function (screenY) {
	if(!this.isDraging){
		return;
	}

	//根据触摸位移(鼠标移动位移)计算转角变化量,由于透视关系,所以实际位移需要做一次变换
	var yMove = screenY - this.lastY;
	var changeAngle = yMove * (config.wheelHeight - this.radius) / (config.wheelHeight) * -1.0 / (this.radius * Math.PI * 2) * 360;
	var angle = changeAngle + this.angle;

	//记录当前角度
	this.setAngle(angle);

	//计算并记录速度
	this.lastY = screenY;
	if(changeAngle){
		this.speed = changeAngle / (Date.now() - this.timeStamp);
	} else{
		this.speed = 0;
	}
	this.timeStamp = Date.now();
}

/**
 * 拖拽结束
 */
Wheel.prototype.endDrag = function () {
	if(!this.isDraging){
		return;
	}

	//速度*4,做均减少运动,计算滚动后的angle。之所以乘4是根据偏移效果经验得到的
	var changeAngle = this.speed * Math.abs( this.speed) * 2 * config.wheelTransitionTime;
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
 * @param list				用户可选项数组
 */
Wheel.prototype.setOption = function (list, selectedValue) {
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
	this.valueHashMap = {};

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

		//将标签的dom放到contains上,contains的事件全部委托于容器,即标签不监听事件
		that.contains.append(li);
		i++;
	});

	//刷新标签
	this.flushLabel();

	if(list.length > 0 ){
		if(selectedValue !== undefined){
			this.selectOption(selectedValue);
		} else {
			this.selectIndex(0);
		}
	}
}

/**
 * 给定指定标签的值,选择指定标签
 */
Wheel.prototype.selectOption = function(value, showAnimation){
	//如果valueHashMap里面没有value,表示没有这个标签,否则自动选中这个标签
	if(this.valueHashMap[value] !== undefined){
		var index = this.valueHashMap[value];

		this.selectIndex(index, showAnimation);
	}
}

/**
 * 给定指定备选标签的index,自动设定标签的各个位置
 * @param index					要选择的index
 * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
 */
Wheel.prototype.selectIndex = function(index, showAnimation){

	var angle = this.calcAngleBySelectedIndex(index);
	animationUtil.stopAnimation(this.animationId);
	
	if(showAnimation){

		//用100帧渲染动画,并使用easeOut,使其有匀减速效果
		//当前帧数
		var start = 0,
			//总帧数
			during = 100,
			that = this;
		//动画渲染函数
		var _run = function() {
			start++;
			var _angle = animationUtil.easeOut(start, that.angle, angle - that.angle, during);

			that.setAngle(_angle);

			if (_angle != angle) {
				that.animationId = animationUtil.startAnimation(_run);
			} else {

				that.selectedIndex = index;
				that.toggleSelected(that.index, that.selectedIndex);
			}
		};

		//启动动画
		that.animationId = animationUtil.startAnimation(_run);
	} else {
		//如果不显示动画,直接赋值
		this.setAngle(angle);
		this.selectedIndex = index;
		this.toggleSelected(this.index, this.selectedIndex);
	}
}

/**
 * 给定指定角度,自动设定标签的各个位置
 * @param angle					要转到的角度
 * @returns {number}			修正后的角度,即最终的实际角度
 */
Wheel.prototype.setAngle = function(angle){

	//修正转角,要求转角不能大于maxAngle,不能小于minAngle
	angle = this.rangeAngle(angle);

	this.contains.css("transform","rotateX(" + angle + "deg)");
	this.angle = angle;
	this.flushLabel();

	return angle;
}

/**
 * 通过角度计算被选项的id
 * @param angle				要计算的角度
 * @returns {number}		被选项id
 */
Wheel.prototype.calcSelectedIndexByAngle = function (angle) {
	angle = this.rangeAngle(angle);
	return Math.round(Math.abs(angle / -config.wheelItemAngle));
}

/**
 * 通过角度计算被选项的id
 * @param angle				要计算的角度
 * @returns {number}		被选项id
 */
Wheel.prototype.calcAngleBySelectedIndex = function (index) {
	return index * -config.wheelItemAngle;
}

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

/////////////////////////////wheel事件相关
/**
 *
 */
Wheel.prototype.toggleSelected = function (index, value) {
	this.$onSelectItem(index, value);
}
Wheel.prototype.$onSelectItem = function (index, value) {

}

module.exports = Wheel;