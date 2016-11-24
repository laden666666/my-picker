var $ = require("./util/domUtil");
var config = require("./config");

//构建cover
var cover = $("<div class='picker-cover'>")//.hide();

//构建主框架
var frame = 
	$(`<div class="picker picker-frame">\
		<div class="picker-head">\
			<a class="picker-btn-cancel">取消</a>\
			<span class="picker-selected">已选0</span>\
			<a class="picker-btn-ok">确定</a>\
		</div>\
		<div class="picker-body">\
			
		</div>\
	</div>`).height(config.wheelHeight + 40) //.hide();
frame.find(".picker-body").css("perspective",(config.wheelHeight) + "px")

document.addEventListener("DOMContentLoaded",function(){
	$("body").append(frame).append(cover);
})

module.exports = {
	//显示cover
	showCover : function(){
		cover.show();
	},
	//隐藏cover
	hideCover : function(){
		cover.hide();
	},
	//显示frame
	showFrame : function(){
		frame.show();
	},
	//
	dom(){
		return frame;
	},
	body(){
		return frame.find('.picker-body');
	}
}

