var $ = require("./util/domUtil");
var config = require("./config");


//构建主框架
function  Frame(picker, option) {

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
				+ '<span class="picker-selected">已选0</span>'
				+ '<a class="picker-btn-ok"><span class="picker-header-text"></span></a>'
			+ '</header>'
			+ '<div class="picker-body"></div>'
		+ '</div>').css('height', (config.wheelHeight + 15) / 100 + "em").hide();
	this.frame.find(".picker-body")
	.css("webkitPerspective",(config.wheelHeight) / 100 + "em")
	.css("mozPerspective",(config.wheelHeight) / 100 + "em")
	.css("msPerspective",(config.wheelHeight) / 100 + "em")
	.css("perspective",(config.wheelHeight) / 100 + "em")
	[0].addEventListener('touchstart', function (event) {
		event.preventDefault();
		event.stopPropagation();
	});

	//设置标题按钮名
	this.frame.find(".picker-title .picker-header-text").text(option.title);
	this.frame.find(".picker-btn-cancel .picker-header-text").text( option.buttons[1] || '取消');
	this.frame.find(".picker-btn-ok .picker-header-text").text( option.buttons[0] || '确定');

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
		this.frame.css('fontSize', Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) + 'px')
	}.bind(this)

	window.addEventListener('resize', this._resizeHandle)
	this._resizeHandle()
}


Frame.prototype = {
	//显示cover
	showCover : function(){
		this.cover.show();
		this.cover.addClass('s-open');
	},
	//隐藏cover
	hideCover : function(){
		this.cover.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.cover.hide();
		},500);
	},
	//显示frame
	showFrame : function(){
		this.frame.show();
		this.frame.addClass('s-open');
	},
	//显示frame
	hideFrame : function(){
		this.frame.removeClass('s-open');
		var that = this;
		setTimeout(function () {
			that.frame.hide();
		},500);
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
	},
	//移除
	remove:function () {
		this.frame.remove();
	}
}

module.exports = Frame;

