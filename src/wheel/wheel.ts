/**
 * 滚轮类,是显示选择器可选项的滚轮体，3D模式型的，有透视效果
 */

import $ from '../util/domUtil';
import {em} from '../em';
import animationUtil from '../util/animationUtil';
import constant from '../constant';
import {Col} from '../Col'
import {Picker} from '../Picker'
import {IOptions} from '../API'
import { AWheel } from './AWheel';

declare function require<T>(name: string): T

const tick = require<{(): {play()}}>("../tick/tick")();

export class Wheel extends AWheel{

    ///////////////////滚轮显示属性
    //最大位移
    private maxDistance = 0;
    //最小位移,设置可选项列表后需重新计算
    private minDistance = 0;
    //获取0.01em的实际像素值
    private em: () => number = em;
    //获得控件到body最顶端的距离,计算触摸事件的offsetY时候使用
    private offsetTop = 0;

    ////////////////////滚动属性
    //滚轮转动前初始的位移,用于计算滚轮是否转动过
    private originalDistance = 0;
    //一次拖动过程中滚轮被转动的最大位移
    private lastIndexDistance = 0;
    //当前的刻度,计算发声时候会用到。发声要进过一个刻度线或者达到一个新刻度新才会发声。所以需要记录上一次的刻度线。
    private changeMaxDistance = 0;
    //当前滚轮位移
    private distance = 0;
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

    constructor(picker: Picker, col: Col, option: IOptions, index: number){
        super()
        
        ///////////////////主要属性
        //picker对象
        this.picker = picker;
        //option对象
        this.option = option;
        //记录当前滚轮是容器中第几个滚轮
        this.index = index;
        //转轮主体
        this.dom = $(
            `<div class="picker-wheel">
                <div class="picker-label"><span class="picker-text"></span></div>
                <ul></ul>
                <div class="picker-label"><span class="picker-text"></span></div>
            </div>`).css('height', constant.WHEEL_HEIGHT / 100 + 'em');

        //转轮上面标签的容器，同时也是转动的轴
        this.contains = this.dom.find('ul');
        this.setDistance(0)

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

        // 注册滚轮事件
        this.initMouseWheel()

        //设置标签
        this.setSuffix(col.suffix);
        this.setPrefix(col.prefix);
        this.setOptions(col.options, null, true)

    }

    /**
     * 开始拖拽
     * @param {number} offsetY  当前用户手指(鼠标)的y坐标
     */
    startDrag(offsetY: number) {
        //记录触摸相关信息,为下一步计算用.计算时候,要将坐标系移至中心,并将单位转为em
        this.lastY = (constant.WHEEL_HEIGHT / 2 -  offsetY / this.em()) * -1 ;
        this.timeStamp = Date.now();
        this.isDraging = true;
        this.offsetTop = this.dom[0].offsetTop;
        this.originalDistance = this.distance;
        this.changeMaxDistance = 0;
        this.lastIndexDistance = this.selectedIndex;
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
    drag(offsetY: number) {

        if(!this.isDraging){
            return;
        }

        //根据触摸位移(鼠标移动位移)计算位移变化量
        //现将坐标系移植中心,并将单位转为vm
        var y = (constant.WHEEL_HEIGHT / 2 -  offsetY / this.em()) * -1;
        //计算位移,因为z轴有透视,所以位移量不是真正的曲面的位移量,要做一次透视变换

        var changeDistance = this.lastY - y
        var distance = changeDistance + this.distance;

        //记录滚轮滚动的最大位移
        this.changeMaxDistance = Math.max( Math.abs( this.originalDistance - distance ), this.changeMaxDistance);

        //记录当前位移
        this.setDistance(distance);

        //计算并记录速度
        this.lastY = y;
        if(changeDistance){
            this.speed = changeDistance / (Date.now() - this.timeStamp);
        } else{
            this.speed = 0;
        }
        this.timeStamp = Date.now();
    }

    /**
     * 拖拽结束
     */
    endDrag(): void {
        if(!this.isDraging){
            return;
        }

        //速度*4,做均减少运动,计算滚动后的Distance。之所以乘4是根据偏移效果经验得到的
        var changeDistance = this.speed * Math.abs( this.speed) * 8 * constant.WHEEL_TRANSITION_TIME;
        var distance = changeDistance + this.distance;

        //根据位移计算最终的被选值
        var selectedIndex = this.calcSelectedIndexByDistance(distance);

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

        //计算最小位移
        this.maxDistance = constant.WHEEL_ITEM_HIGHT * (Math.max(0, this.list.length - 1) );

        //生成滚轮的标签
        //标签的index
        var i = 0,
            //标签显示值
            label;

        this.list.forEach(function(item,index){

            //如果是对象,取labelKey对应值显示。否则直接显示它本身
            if(typeof item === 'object'){
                label = item[that.labelKey];
                that.valueHashMap[item[that.itemValueKey]] = i;
            } else {
                label = item;
                that.valueHashMap[item] = i;
            }

            //创建label的显示dom,并计算他在容器中的位置(位移)
            var li = $("<li></li>").css('top', `${constant.WHEEL_ITEM_HIGHT / 100 * i}em`);
            li.append($('<span class="picker-text"></span>').text(label));
            var distance = constant.WHEEL_ITEM_HIGHT * -index;

            //将标签的位移保存到其dom中
            li.data("distance", distance);
            //将标签的index保存到其dom中
            li.data("index", i);

            //将标签的dom放到contains上,contains的事件全部委托于容器,即标签不监听事件
            that.contains.append(li);

            //增加点击选择功能
            var clickHandle = function (event) {
                if(that.changeMaxDistance < 0.1) {
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
                this.selectIndex(0);
            }
        } else {
            this.selectedIndex = -1;
            this.selectedValue = undefined;
        }
    }

    /**
    * 给定指定备选标签的index,自动设定标签的各个位置
    * @param index					要选择的index
    * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
    */
    protected selectIndex(index: number, showAnimation = false){

        var distance = this.calcDistanceBySelectedIndex(index);
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
                var _Distance = animationUtil.easeOut(start, that.distance, distance - that.distance, during);
                if(Math.abs(_Distance - distance) < 1){
                    _Distance = distance;
                }

                that.setDistance(_Distance);

                if (_Distance != distance) {
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
            this.setDistance(distance);
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
    * 给定指定位移,自动设定标签的各个位置
    * @param {number} distance		要转到的位移
    * @returns {number}			修正后的位移,即最终的实际位移
    */
    private setDistance(distance: number): number{

        //修正位移,要求位移不能大于maxDistance,不能小于minDistance
        distance = this.rangeDistance(distance);
        // 如果位移变化经过刻度,则放声
        if(this.option.hasVoice && this.picker.visible){
            var lastIndexDistance = this.lastIndexDistance;
            var index = this.calcSelectedIndexByDistance(distance);
            if(lastIndexDistance != index ){
                if(this.option.hasVoice){
                    tick.play()
                }
            }
            this.lastIndexDistance = index;
        }

        var translateValue = "translate3d(0, " + (constant.WHEEL_HEIGHT / 2 - constant.WHEEL_ITEM_HIGHT / 2 - distance)  / 100 + "em, 0)"
        this.contains.css("-webkit-transform", translateValue).css("transform", translateValue)
        this.distance = distance;

        return distance;
    }

    /**
    * 通过位移计算被选项的id
    * @param distance {number}		要计算的位移
    * @returns {number}		    被选项id
    */
    private calcSelectedIndexByDistance(distance: number): number{
        distance = this.rangeDistance(distance);
        return Math.round(Math.abs(distance / constant.WHEEL_ITEM_HIGHT));
    }

    /**
    * 通过位移计算被选项的id
    * @param Distance {number}		要计算的位移
    * @returns {number}		    被选项id
    */
    private calcDistanceBySelectedIndex(index: number): number {
        return index * constant.WHEEL_ITEM_HIGHT;
    }

    /**
    * 限制位移超过极限值
    * @param distance {number}		要计算的位移
    * @returns {number}		    被选项id
    */
    private rangeDistance(distance: number): number {
        //修正位移,要求位移不能大于maxDistance,不能小于minDistance
        distance = Math.max(this.minDistance, distance);
        distance = Math.min(this.maxDistance, distance);
        return distance;
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
}
