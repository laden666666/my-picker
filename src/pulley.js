var $ = require("./util/domUtil");
var config = require("./config");

function Pulley(list){
	if(Array.isArray(list)){
		this.list = list;
	} else {
		throw new TypeError("list is not a array.")
	}
	//转轮主体
	this.dom = $(`<div class='picker-pulley'>\
					<ul></ul>\
				</div>`).height(config.pulleyHeight);
	//转轮上面标签的容器，同时也是转动的轴
	this.contains = this.dom.find('ul');
	//最大转角
	this.maxAngle = 0;
	//最小转角
	this.minAngle = -1 * config.pulleyItemAngle * (Math.max(0, this.list.length - 1) );
	//当前滚轮转角
	this.angle = 0;
	//速度，供触摸离开时候使用
	this.speed = 0;
	//当前时间戳
	this.timeStamp = 0;
	
	
	var radius = config.pulleyHeight / Math.sqrt(5);
	
	//生成滚轮
	var that = this;
	this.list.forEach(function(item,index){
		var li = $("<li>").text(item);
		var angle = config.pulleyItemAngle * index;
		var height = radius * Math.PI * config.pulleyItemAngle / 180;
		
		li.css("transform","rotateX(" + angle + "deg) translateZ(" + radius + "px)")
		.height(height)	
		.css("line-height", height + "px");
		li.data("angle", angle);
		that.contains.append(li);
	});
	this.showLabel();

	this.dom[0].addEventListener("touchstart", function(event){
		that.lastY = event.touches[0].screenY;
		that.timeStamp = Date.now();
		
		cancelAnimationFrame(that.animationId)
	});
	this.dom[0].addEventListener("touchmove", function(event){
		var yMove = event.touches[0].screenY - that.lastY;
		var _angle = yMove * (config.pulleyHeight - radius) / (config.pulleyHeight) * -1.0 / (radius * Math.PI * 2) * 360;
		var angle = _angle + that.angle; 
		
		angle = Math.max(that.minAngle, angle);
		angle = Math.min(that.maxAngle, angle);
		
		that.contains.css("transform","rotateX(" + angle + "deg)");
		that.angle = angle;
		that.lastY = event.touches[0].screenY;
		if(_angle){
			that.speed = _angle / (Date.now() - that.timeStamp);
		} else{
			that.speed = 0;
		}
		that.timeStamp = Date.now();
		that.showLabel();
	});
	
	
	this.dom[0].addEventListener("touchend", function(event){
		that.lastY = 0;
		cancelAnimationFrame(that.animationId)
		
		var angle = that.speed / 2 * config.pulleyTransitionTime;
		var angle = angle + that.angle; 
		
		angle = Math.max(that.minAngle, angle);
		angle = Math.min(that.maxAngle, angle);
		
		angle = Math.round(angle / config.pulleyItemAngle) * config.pulleyItemAngle;

		
		that.speed = 0;
		
		var start = 0, during = 100;
	    var _run = function() {
	        start++;
	        var top =easeOut(start, that.angle, angle - that.angle, during);
	        that.contains.css("transform","rotateX(" + top + "deg)");
	        that.angle = top;
	        that.showLabel();
	        if (top != angle) {
	         	that.animationId = requestAnimationFrame(_run);
	        } else {
	        	console.log(1)
	        }
	    };
	    _run();
	});
	
}

Pulley.prototype.showLabel = function(){
	var that = this;
	this.dom.find("li").each(function(index, li){
		li = $(li);
		var angle = li.data("angle") + that.angle;
		if(angle > 63 || angle < -63){
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


module.exports = Pulley;