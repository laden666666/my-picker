import $ from './util/domUtil';
import {em} from './em';
import constant from './constant';
import browserUtil from './util/browserUtil'

// 阻止事件冒泡
let preventDefault = function(e){e.preventDefault()}

//构建主框架
function Frame(picker, option) {

	//picker对象
	this.picker = picker;
	//option
	this.option = option;

	//构建cover
	this.cover = $("<div class='my-picker-cover' style='z-index: " + option.zIndex + "'>").hide();

	this.frame =
		$('<div class="picker picker-frame" style="z-index: ' + (option.zIndex + 1) + '">'
			+ '<header class="picker-head">'
				+ '<a class="picker-btn-cancel"><span class="picker-header-text"></span></a>'
				+ '<h4 class="picker-title"><span class="picker-header-text"></span></h4>'
				// 未来显示多选时候使用
				+ '<span class="picker-selected">已选0</span>'
				+ '<a class="picker-btn-ok"><span class="picker-header-text"></span></a>'
			+ '</header>'
			+ '<div class="picker-body">'
				+ '<div class="picker-glass-over-border-top">'
				+ '</div>'
				+ '<div class="picker-glass-over-border-bottom">'
				+ '</div>'
			+ '</div>'
		+ '</div>').css('height', (constant.WHEEL_HEIGHT + 15) / 100 + "em").hide();

	//如果是3d透视模式，增加3d透视的样式
	if( (!browserUtil.isIE() && !(browserUtil.isAndroid() && browserUtil.androidVersion() < 4.4) && this.option.isPerspective)){
		this.frame.addClass('s-3d').find(".picker-body")
			.css("perspective",(constant.WHEEL_HEIGHT) / 100 + "em")
			.css("webkitPerspective",(constant.WHEEL_HEIGHT) / 100 + "em")
			.css("mozPerspective",(constant.WHEEL_HEIGHT) / 100 + "em")
			.css("msPerspective",(constant.WHEEL_HEIGHT) / 100 + "em")
	}

	// 修复显示模糊的问题，如果浏览器支持zoom，就s-zoom-body修复模糊的问题
	if( browserUtil.isWebKit() && document.body.style.zoom != undefined) {
		this.frame.find(".picker-body").addClass('s-zoom-body')
	}

	// 如果是webkit内核，可以使用玻璃罩特性
	if(option.hasGlassCover == true){
		this.frame.addClass('s-glass-over')
		if(browserUtil.isWebKit()){
			this.frame.addClass('s-webkit-glass-over')
		} 
	}

	//设置标题按钮名
	this.frame.find(".picker-title .picker-header-text").text(option.title);
	this.frame.find(".picker-btn-cancel .picker-header-text").text( option.buttons[1] || '取消');
	this.frame.find(".picker-btn-ok .picker-header-text").text( option.buttons[0] || '确定');
	
	//阻止的滚轮和触摸事件冒泡，防止悲剧的滚动条在选择的时候改变
	this.frame.find(".picker-body").on('touchstart', preventDefault)
	this.frame.on('wheel', preventDefault)
	this.cover.on('touchstart', preventDefault).on('wheel', preventDefault)

	$("body").append(this.frame).append(this.cover);

	//绑定主架的事件
	var that = this;
	this.frame.find(".picker-btn-cancel").on("click", function (event) {
		if(typeof that.option.onCancelClick == 'function'){
			that.option.onCancelClick.call(that.picker);
		}
		that.picker.hide();
	});
	this.frame.find(".picker-btn-ok").on("click", function (event) {
		if(typeof that.option.onOkClick == 'function'){
			var result = that.option.onOkClick.call(that.picker, picker.getValue());
			if(result === false){
				return;
			}
		}
		that.picker.hide();
	});

	this._resizeHandle = function(){
		this.frame.css('fontSize', em() * 100 + 'px')
	}.bind(this)

	window.addEventListener('resize', this._resizeHandle)
	this._resizeHandle()
}


Frame.prototype = {
	//显示cover
	showCover : function(){
		this.cover.show();
		setTimeout(()=>{
            this.cover.addClass('s-open');
		}, 0);
	},
	//隐藏cover
	hideCover : function(){
		this.cover.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.cover.hide();
		}, 200);
	},
	//显示frame
	showFrame : function(){
		this.frame.show();
		setTimeout(()=>{
            this.frame.addClass('s-open');
		}, 0);
	},
	//显示frame
	hideFrame : function(){
		this.frame.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.frame.hide();
		}, 200);
	},
	dom: function(){
		return this.frame;
	},
	body: function(){
		return this.frame.find('.picker-body');
	},
	//关闭
	close:function () {
		this.remove();
		window.removeEventListener('resize', this._resizeHandle)
		this.frame.find(".picker-body").off('touchstart', preventDefault)
		this.frame.off('wheel', preventDefault)
		this.cover.off('touchstart', preventDefault).off('wheel', preventDefault)
	},
	//移除
	remove:function () {
		this.frame.remove();
	}
}

module.exports = Frame;

