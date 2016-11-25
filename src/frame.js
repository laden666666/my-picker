var $ = require("./util/domUtil");
var config = require("./config");


//构建主框架
function  Frame() {
	
	//构建cover
	this.cover = $("<div class='picker-cover'>")//.hide();
	
	this.frame =
		$('<div class="picker picker-frame">'
			+ '<div class="picker-head">'
				+ '<a class="picker-btn-cancel">取消</a>'
				+ '<span class="picker-selected">已选0</span>'
				+ '<a class="picker-btn-ok">确定</a>'
			+ '</div>'
			+ '<div class="picker-body"></div>'
		+ '</div>').height(config.wheelHeight + 40); //.hide();
	this.frame.find(".picker-body").css("perspective",(config.wheelHeight) + "px")

	$("body").append(this.frame).append(this.cover);
}


Frame.prototype = {
	//显示cover
	showCover : function(){
		this.cover.show();
	},
	//隐藏cover
	hideCover : function(){
		this.cover.hide();
	},
	//显示frame
	showFrame : function(){
		this.frame.show();
	},
	//
	dom: function(){
		return this.frame;
	},
	body: function(){
		return this.frame.find('.picker-body');
	}
}

module.exports = Frame;

