/**
 * 滚轮类,是显示选择器可选项的滚轮体
 */

var $ = require("./util/domUtil");
var animationUtil = require("./util/animationUtil");
var config = require("./config");
var intersectionY = require("./wheel/intersectionY")

function Wheel(picker, col, option, index){

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
		+ '<div class="picker-label"></div>'
		+ '<ul></ul>'
		+ '<div class="picker-label"></div>'
		+ '</div>').height((config.wheelHeight) + 'vmin');

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
	this.visibleAngle = 90 - (Math.acos(this.radius / config.wheelHeight * 2) / Math.PI * 180);
	//是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
	this.isPerspective = this.option.isPerspective;
	//获取1vmin的实际像素值
	this.vmin = Math.min(document.body.scrollWidth, document.body.scrollHeight) / 100;
	//获得控件到body最顶端的距离,计算触摸事件的offsetY时候使用
	this.offsetTop = 0;

	////////////////////滚动属性
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
		while (target){
			that.offsetTop += target.offsetTop;
			var target = target.parentElement;
		}

		var offsetY = event.touches ?  event.touches[0].pageY - that.offsetTop : event.pageY - that.offsetTop;
		that.startDrag(offsetY);
	}
	this.dom[0].addEventListener("touchstart", startDrag);
	this.dom[0].addEventListener("mousedown", startDrag);

	//注册拖拽事件
	function drag(event){
		var offsetY = event.touches ?  event.touches[0].pageY - that.offsetTop : event.pageY - that.offsetTop;
		that.drag(offsetY);
	}
	this.dom[0].addEventListener("touchmove", drag);
	this.dom[0].addEventListener("mousemove", drag);

	//注册拖拽结束事件
	function endDrag(){
		that.endDrag();
	}
	this.dom[0].addEventListener("touchend", endDrag);
	this.dom[0].addEventListener("mouseup", endDrag);


	//初始化标签
	this.dom.find(".picker-label").css("transform","translateZ(" + this.radius + "vmin)");

	//设置标签
	this.setSuffix(col.suffix);
	this.setPrefix(col.prefix);
	this.setOptions(col.values, null, true)
}

/////////////////////////////////拖拽相关事件
/**
 *
 * 开始拖拽
 * @param offsetY			当前用户手指(鼠标)的y坐标
 */
Wheel.prototype.startDrag = function (offsetY) {
	//记录触摸相关信息,为下一步计算用.计算时候,要将坐标系移至中心,并将单位转为vm
	this.lastY = (config.wheelHeight / 2 -  offsetY / this.vmin) * -1 ;
	this.timeStamp = Date.now();
	this.isDraging = true;
	this.offsetTop = this.dom[0].offsetTop;
	for(var parent = this.dom[0].parentElement;parent; parent = parent.parentElement){
		this.offsetTop += parent.offsetTop;
	}

	//终止之前的动画
	animationUtil.stopAnimation(this.animationId);
}

/**
 * 拖拽
 * @param offsetY			当前用户手指(鼠标)的y坐标
 */
Wheel.prototype.drag = function (offsetY) {

	if(!this.isDraging){
		return;
	}

	//根据触摸位移(鼠标移动位移)计算转角变化量
	//现将坐标系移植中心,并将单位转为vm
	var y = (config.wheelHeight / 2 -  offsetY / this.vmin) * -1;
	//计算位移,因为z轴有透视,所以位移量不是真正的曲面的位移量,要做一次透视变换

	var changeAngle = (intersectionY(this.lastY, this.radius, config.wheelHeight) - intersectionY(y, this.radius, config.wheelHeight))
		/ Math.PI * 180;
	var angle = changeAngle + this.angle;

	//记录当前角度
	this.setAngle(angle);

	//计算并记录速度
	this.lastY = y;
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
	var changeAngle = this.speed * Math.abs( this.speed) * 8 * config.wheelTransitionTime;
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
 * @param selectedValue		默认值
 * @param isInti			是否是初始化,初始化不执行设置默认值操作
 */
Wheel.prototype.setOptions = function (list, selectedValue, isInti) {
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
	this.maxAngle = config.wheelItemAngle * (Math.max(0, this.list.length - 1) );

	//生成滚轮的标签
	//标签的index
	var i = 0,
		//标签显示值
		label,
		//显示标签的dom的高度,要求根据wheelItemAngle计算,使各个标签dom的边缘刚好挨在一起,确保没有空细
		height = this.radius * Math.PI * config.wheelItemAngle / 180;

	this.list.forEach(function(item,index){

		//如果是对象,取labelKey对应值显示。否则直接显示它本身
		if(typeof item === 'object'){
			label = item[that.labelKey];
			that.valueHashMap[item[that.itemValueKey]] = i;
		} else {
			label = item;
			that.valueHashMap[item] = i;
		}

		//创建label的显示dom,并计算他在容器中的位置(角度)
		var li = $("<li>").text(item);
		var angle = config.wheelItemAngle * -index;

		li.css("transform","rotateX(" + angle + "deg) translateZ(" + that.radius + "vmin)")
			.height((height) + "vmin")
			.css("line-height", height + "vmin");
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

	if(isInti){
		if(list.length > 0 ){
			this.selectedIndex = 0;
			if(typeof list[0] === 'object'){
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
	if(list.length > 0 ){
		if(selectedValue != null && this.valueHashMap[selectedValue] != null){
			this.selectOption(selectedValue);
		} else if(this.valueHashMap[this.selectedValue] != null){
			this.selectOption(this.selectedValue);
		} else {
			this.selectIndex( 0);
		}
	} else {
		this.selectedIndex = -1;
		this.selectedValue = undefined;
	}
}

/**
 * 给定指定标签的值,选择指定标签
 */
Wheel.prototype.selectOption = function(value, showAnimation){
	//如果valueHashMap里面没有value,表示没有这个标签,否则自动选中这个标签
	if(this.valueHashMap[value] != null){
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

		//用50帧渲染动画,并使用easeOut,使其有匀减速效果
		//当前帧数
		var start = 0,
			//总帧数
			during = 50,
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
				that.selectedValue = that.list[index];
				if(typeof that.selectedValue == 'object'){
					that.selectedValue = that.selectedValue[that.valueKey];
				}
				that.toggleSelected(that.selectedIndex, that.selectedValue);
			}
		};

		//启动动画
		that.animationId = animationUtil.startAnimation(_run);
	} else {
		//如果不显示动画,直接赋值
		this.setAngle(angle);
		this.selectedIndex = index;
		this.selectedValue = this.list[index];
		if(typeof this.selectedValue == 'object'){
			this.selectedValue = this.selectedValue[this.valueKey];
		}
		this.toggleSelected(this.selectedIndex, this.selectedValue);
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
	return Math.round(Math.abs(angle / config.wheelItemAngle));
}

/**
 * 通过角度计算被选项的id
 * @param angle				要计算的角度
 * @returns {number}		被选项id
 */
Wheel.prototype.calcAngleBySelectedIndex = function (index) {
	return index * config.wheelItemAngle;
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
		if(angle > that.visibleAngle || angle < (-that.visibleAngle)){
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

/**
 * 获取被选值
 */
Wheel.prototype.getValue = function(){
	return this.selectedValue;
}

/////////////////////////////设置前缀后缀
/**
 * 设置后缀
 * @param text			后缀显示的文本
 */
Wheel.prototype.setSuffix = function (text) {
	$(this.dom.find('.picker-label')[1]).text(text);
}
/**
 * 设置前缀
 * @param text			前缀显示的文本
 */
Wheel.prototype.setPrefix = function (text) {
	$(this.dom.find('.picker-label')[0]).text(text);
}

/////////////////////////////wheel事件相关
/**
 * 触发回调函数的接口
 * @param index			当前被选值的索引
 * @param value			当前被选值的值
 */
Wheel.prototype.toggleSelected = function (index, value) {
	this.$onSelectItem(index, value);
}
/**
 * 选择后的默认回调。会被packer覆盖掉
 * @param index			当前被选值的索引
 * @param value			当前被选值的值
 */
Wheel.prototype.$onSelectItem = function (index, value) {

}

module.exports = Wheel;