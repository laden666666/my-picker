/**
 * 滚轮类,是显示选择器可选项的滚轮体，3D模式型的，有透视效果
 */

import $ from '../util/domUtil';
import {MyJQuery} from 'my-jquery/types/MyJQuery'
import animationUtil from '../util/animationUtil';
import browserUtil from '../util/browserUtil';
import constant from '../constant';
import {IWheel} from '../IWheel'
import {Col} from '../Col'
import {Picker} from '../Picker'
import {IOptions} from '../IOptions'

declare function require<T>(name: string): T

const perspectiveConversion = require<{(y: number, radius: number, wheelHeight: number): number}>("./perspectiveConversionCache")
const tick = require<{(): {play()}}>("../tick/tick")();

export class Wheel3D implements IWheel{

    //picker对象
    private picker: Picker;
    //option对象
    private option: IOptions;
    //记录当前滚轮是容器中第几个滚轮
    private index: number;
    //转轮主体
    private dom: MyJQuery;
    //转轮上面标签的容器，同时也是转动的轴
    private contains: MyJQuery;

    ///////////////////滚轮显示属性
    //最大转角
    private maxAngle = 0;
    //最小转角,设置可选项列表后需重新计算
    private minAngle = 0;
    //滚轮的实际半径,因为有透视效果,所以滚轮实际半径比容器的高度的一半还小。根据勾股定理,计算得实际半径是容器高度的根号5分之1
    private radius = constant.WHEEL_HEIGHT / Math.sqrt(5);
    //计算标签可显示的角度的绝对值。因为透视关系,所以可见的标签角度小于90度
    private visibleAngle = 0;
    //获取0.01em的实际像素值
    private em: () => number = ()=>Math.min(window.innerWidth, window.innerHeight) / 100;
    //获得控件到body最顶端的距离,计算触摸事件的offsetY时候使用
    private offsetTop = 0;

    ////////////////////滚动属性
    //滚轮转动前初始的转角,用于计算滚轮是否转动过
    private originalAngle = 0;
    //一次拖动过程中滚轮被转动的最大角度
    private lastIndexAngle = 0;
    //当前的刻度,计算发声时候会用到。发声要进过一个刻度线或者达到一个新刻度新才会发声。所以需要记录上一次的刻度线。
    private changeMaxAngle = 0;
    //当前滚轮转角
    private angle = 0;
    //当前被选值的index
    private selectedIndex = -1;
    //被选值的值
    private selectedValue;
    //记录惯性滑动动画的id
    private animationId = -1;
    //速度，供触摸离开时候的惯性滑动动画使用
    private speed = 0;
    //当前时间戳,主要是计算转动速度使用的
    private timeStamp = 0;
    //记录上一次触摸节点的offsetY,主要是是计算转动速度使用的
    private lastY = 0;
    //是否开始触摸,主要给鼠标事件使用
    private isDraging = false;
    //正在播放的刻度音
    private audio = null;

    ////////////////////可选项属性
    //可选项列表
    private list = [];
    //根据值生成的hashmap,主要是为了快速获得value对应可选项的index
    private valueHashMap = {};
    //如果items数组里的值是对象,其中显示的key
    private labelKey: string;
    //如果items数组里的值是对象,其中值的key
    private itemValueKey: string;

    ////////////////////事件
    private onSelectItemCallbackList: {(index:number, value:any):void}[] = []

    constructor(picker: Picker, col: Col, option: IOptions, index: number){
        ///////////////////主要属性
        //picker对象
        this.picker = picker;
        //option对象
        this.option = option;
        //记录当前滚轮是容器中第几个滚轮
        this.index = index;
        //转轮主体
        this.dom = $(
            '<div class="picker-wheel3d">'
            + '<div class="picker-label"><span class="picker-text"></span></div>'
            + '<ul></ul>'
            + '<div class="picker-label"><span class="picker-text"></span></div>'
            + '</div>').css('height', constant.WHEEL_HEIGHT / 100 + 'em');

        //转轮上面标签的容器，同时也是转动的轴
        this.contains = this.dom.find('ul');

        ///////////////////滚轮显示属性
        //计算标签可显示的角度的绝对值。因为透视关系,所以可见的标签角度小于90度
        this.visibleAngle = 90 - (Math.acos(this.radius / constant.WHEEL_HEIGHT * 2) / Math.PI * 180);

        ////////////////////可选项属性
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

            var offsetY = event.touches ?  event.touches[0].clientY - that.offsetTop : event.clientY - that.offsetTop;
            that.startDrag(offsetY);
        }
        this.dom[0].addEventListener("touchstart", startDrag);
        this.dom[0].addEventListener("mousedown", startDrag);

        //注册拖拽事件
        function drag(event){
            var offsetY = event.touches ?  event.touches[0].clientY - that.offsetTop : event.clientY - that.offsetTop;
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
        this.dom[0].addEventListener("mouseleave", endDrag);

        //初始化标签
        this.dom.find(".picker-label").css("transform",`translateZ(${this.radius / 100}em) scale(0.75)`);

        //设置标签
        this.setSuffix(col.suffix);
        this.setPrefix(col.prefix);
        this.setOptions(col.options, null, true)
    }

    /**
     * 开始拖拽
     * @param {number} offsetY  当前用户手指(鼠标)的y坐标
     */
    private startDrag(offsetY: number) {
        //记录触摸相关信息,为下一步计算用.计算时候,要将坐标系移至中心,并将单位转为em
        this.lastY = (constant.WHEEL_HEIGHT / 2 -  offsetY / this.em()) * -1 ;
        this.timeStamp = Date.now();
        this.isDraging = true;
        this.offsetTop = this.dom[0].offsetTop;
        this.originalAngle = this.angle;
        this.changeMaxAngle = 0;
        this.lastIndexAngle = this.selectedIndex;
        for(var parent = this.dom[0].parentElement;parent; parent = parent.parentElement){
            this.offsetTop += parent.offsetTop;
        }

        //终止之前的动画
        animationUtil.stopAnimation(this.animationId);
    }

    /**
     * 拖拽
     * @param {number} offsetY			当前用户手指(鼠标)的y坐标
     */
    private drag(offsetY: number) {

        if(!this.isDraging){
            return;
        }

        //根据触摸位移(鼠标移动位移)计算转角变化量
        //现将坐标系移植中心,并将单位转为vm
        var y = (constant.WHEEL_HEIGHT / 2 -  offsetY / this.em()) * -1;
        //计算位移,因为z轴有透视,所以位移量不是真正的曲面的位移量,要做一次透视变换

        var changeAngle = (perspectiveConversion(this.lastY, this.radius, constant.WHEEL_HEIGHT) - perspectiveConversion(y, this.radius, constant.WHEEL_HEIGHT))
            / Math.PI * 180;
        var angle = changeAngle + this.angle;

        //记录滚轮滚动的最大转角
        this.changeMaxAngle = Math.max( Math.abs( this.originalAngle - angle ), this.changeMaxAngle);

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
    private endDrag(): void {
        if(!this.isDraging){
            return;
        }

        //速度*4,做均减少运动,计算滚动后的angle。之所以乘4是根据偏移效果经验得到的
        var changeAngle = this.speed * Math.abs( this.speed) * 8 * constant.WHEEL_TRANSITION_TIME;
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
     * @param {any[]} list                  用户可选项数组
     * @param {*} selectedValue             默认值
     * @param {boolean} [isInti=false]      是否是初始化,初始化不执行设置默认值操作
     */
    setOptions(list: any[], selectedValue: any, isInti: boolean = false) {
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
        this.maxAngle = constant.WHEEL_ITEM_ANGLE * (Math.max(0, this.list.length - 1) );

        //生成滚轮的标签
        //标签的index
        var i = 0,
            //标签显示值
            label,
            //显示标签的dom的高度,要求根据wheelItemAngle计算,使各个标签dom的边缘刚好挨在一起,确保没有空细
            height = this.radius * Math.PI * constant.WHEEL_ITEM_ANGLE / 180;

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
            var li = $("<li></li>");
            li.append($('<span class="picker-text"></span>').text(label));
            var angle = constant.WHEEL_ITEM_ANGLE * -index;

            //为了解决3d放大后，文字模糊的问题，故采用zoom=2的方案，所以li的尺寸方面，统一缩小一半
            li.css("transform","rotateX(" + angle + "deg) translateZ(" + that.radius  / 100 + "em) scale(0.75)")
                .css("padding",  `${height / 5.9 / 100}em 0`)
                .css("height",  height / 100 + "em")
                .css("line-height", height / 100 + "em");
            //将标签的角度保存到其dom中
            li.data("angle", angle);
            //将标签的index保存到其dom中
            li.data("index", i);

            //将标签的dom放到contains上,contains的事件全部委托于容器,即标签不监听事件
            that.contains.append(li);

            //增加点击选择功能
            var clickHandle = function (event) {
                if(that.changeMaxAngle < 1) {
                    //计算完成,清空速度相关变量,并去除之前的动画效果
                    that.isDraging = false;
                    that.lastY = 0;
                    that.speed = 0;

                    that.selectIndex(index, true);
                    event.stopPropagation();
                    event.preventDefault();
                }
            }

            li[0].addEventListener('mouseup',clickHandle);
            li[0].addEventListener('touchend',clickHandle);

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
    * 获得用户可选的标签
    */
    getOptions(): any[]{
        return this.list;
    }

    /**
    * 给定指定标签的值,选择指定标签
    */
    selectOption(value: any, showAnimation = false){
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
    private selectIndex(index: number, showAnimation = false){

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
                if(Math.abs(_angle - angle) < 1){
                    _angle = angle;
                }

                that.setAngle(_angle);

                if (_angle != angle) {
                    that.animationId = animationUtil.startAnimation(_run);
                } else {
                    //记录下原有的index,确定选择是否发生了改变
                    var oldSelectedIndex = that.selectedIndex;

                    that.selectedIndex = index;
                    that.selectedValue = that.list[index];
                    if(typeof that.selectedValue == 'object'){
                        that.selectedValue = that.selectedValue[that.itemValueKey];
                    }
                    if(oldSelectedIndex != that.selectedIndex)
                        that.toggleSelected(that.selectedIndex, that.selectedValue);
                }
            };

            //启动动画
            that.animationId = animationUtil.startAnimation(_run);
        } else {
            //记录下原有的index,确定选择是否发生了改变
            var oldSelectedIndex = this.selectedIndex;

            //如果不显示动画,直接赋值
            this.setAngle(angle);
            this.selectedIndex = index;
            this.selectedValue = this.list[index];
            if(typeof this.selectedValue == 'object'){
                this.selectedValue = this.selectedValue[this.itemValueKey];
            }
            if(oldSelectedIndex != this.selectedIndex)
                this.toggleSelected(this.selectedIndex, this.selectedValue);
        }
    }

    /**
    * 给定指定角度,自动设定标签的各个位置
    * @param {number} angle		要转到的角度
    * @returns {number}			修正后的角度,即最终的实际角度
    */
    private setAngle(angle: number): number{

        //修正转角,要求转角不能大于maxAngle,不能小于minAngle
        angle = this.rangeAngle(angle);
        // 如果角度变化经过刻度,则放声
        if(this.option.hasVoice && this.picker.visible){
            var lastIndexAngle = this.lastIndexAngle;
            var index = this.calcSelectedIndexByAngle(angle);
            if(lastIndexAngle != index){
                if(this.option.hasVoice){
                    tick.play()
                }
            }
            this.lastIndexAngle = index;
        }

        this.contains.css("transform","rotateX(" + angle + "deg)");
        this.angle = angle;
        this.flushLabel();

        return angle;
    }

    /**
    * 通过角度计算被选项的id
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    private calcSelectedIndexByAngle(angle: number): number{
        angle = this.rangeAngle(angle);
        return Math.round(Math.abs(angle / constant.WHEEL_ITEM_ANGLE));
    }

    /**
    * 通过角度计算被选项的id
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    private calcAngleBySelectedIndex(index: number): number {
        return index * constant.WHEEL_ITEM_ANGLE;
    }

    /**
    * 限制转角超过极限值
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    private rangeAngle(angle: number): number {
        //修正转角,要求转角不能大于maxAngle,不能小于minAngle
        angle = Math.max(this.minAngle, angle);
        angle = Math.min(this.maxAngle, angle);
        return angle;
    }

    /**
    * 刷新各个标签的状态,确定应该显示哪些标签
    */
    private flushLabel(){
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
    getValue(){
        return this.selectedValue;
    }

    /////////////////////////////设置前缀后缀
    /**
    * 设置后缀
    * @param text			后缀显示的文本
    */
    private setSuffix(text) {
        this.dom.find('.picker-label .picker-text').eq(1).text(text);
    }
    /**
    * 设置前缀
    * @param text			前缀显示的文本
    */
    private setPrefix(text) {
        this.dom.find('.picker-label .picker-text').eq(0).text(text);
    }

    /////////////////////////////wheel事件相关
    /**
    * 触发回调函数的接口
    * @param index			当前被选值的索引
    * @param value			当前被选值的值
    */
    private toggleSelected(index, value) {
        this.onSelectItemCallbackList.forEach(fn=>{
            fn.call(this, index, value)
        })
    }
   
    /**
     * 注册SelectItem的回调事件
     * @param {{(index:number, value:any):void}} fn 
     */
    addSelectItemListener(fn: {(index:number, value:any):void}){
        this.onSelectItemCallbackList.push(fn)
    }

    /**
     * 移除注册的SelectItem回调事件
     * @param {{(index:number, value:any):void}} fn 
     */
    removeSelectItemListener(fn: {(index:number, value:any):void}){
        this.onSelectItemCallbackList = this.onSelectItemCallbackList.filter(_fn=>_fn !== fn)
    }

    /**
     * 销毁
     */
    destroy(){
        this.onSelectItemCallbackList = null
    }

    ////////////////////////////DOM相关
    getDOM(){
        return this.dom
    }
}
