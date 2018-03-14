import {IOptions, StringCol} from './IOptions'
import {Col} from './Col'
import {IPicker} from './IPicker'
import defaultOption from './defaultOption'
import {Wheel3D} from './wheel/wheel3D'
import {Wheel} from './wheel/wheel'
import {IWheel} from './IWheel'

declare function require(name: string): any
var Frame = require("./frame");
require("./style/style.scss");

export class Picker implements IPicker{
    //用户配置
    private _option: IOptions
    //滚轮列表
    private _wheels: IWheel[] = []
    //主框架
    private _frame: any
    //主框架
    private _cols: Col[] = []
    //是否可见
    get visible(): boolean{
        return this._visible
    }
    private _visible: boolean

    constructor(options: IOptions){
        //用用户配置,覆盖默认配置,生成当前控件的实例的配置
        this._option = {...defaultOption, ...options};

        //主架
        this._frame = new Frame(this, this._option);

        //解析cols属性,将其转换为Cols的数组
        var cols = [], i= 0;
        if(Array.isArray(this._option.cols)){
            //如果cols为空数组,或者里面的元素是字符串,表示仅一个滚轮,就是cols本身
            if(this._option.cols.length === 0 || typeof this._option.cols[0] === 'string'){
                cols.push(new Col(this._option.cols as string[]))
            } else {
                //否则表示数组中的每个元素都是个滚轮
                for(i =0; i < this._option.cols.length; i++){
                    cols.push(new Col(this._option.cols[i] as StringCol))
                }
            }

        } else {
            //如果不是数组,表示有cols是一个json形式配置的滚轮
            cols.push(new Col(this._option.cols));
        }
        this._cols = cols;

        //构造滚轮
        this._wheels = [];
        var wheel:IWheel, col:Col;
        for(let i = 0; i < cols.length ; i++){
            let col = cols[i];

            //设置滚轮
            wheel = this._option.isPerspective ? new Wheel3D(this, col, this._option, i) : new Wheel(this, col, this._option, i);
            this._wheels.push(wheel);
            this._frame.body().append(wheel.getDOM() );

            //重写wheel的onSelectItem事件
            var that = this;
            wheel.addSelectItemListener((function (i) {
                return function (index, value) {
                    //如果用户注册了onSelectItem
                    if(typeof that._option.onSelectItem == 'function'){
                        that._option.onSelectItem.call(that, i, index, value);
                    }
                }
            })(i))
        }

        for(let i = 0; i < cols.length ; i++) {

            //设置滚轮的选项
            that.setValue(i, that._option.setValues[i]);
        }

        //是否可见
        this._visible = false;
    }

    version: string

    /**
     * 显示
     */
    show () {
        this._frame.showCover();
        this._frame.showFrame();
        this._visible = true;
    }

    /**
     * 隐藏
     */
    hide() {
        this._frame.hideCover();
        this._frame.hideFrame();
        this._visible = false;
    }

    /**
     * 关闭
     */
    close() {
        this._frame.close();
        this._frame.hideCover();
        this._option = null;
        this._wheels.forEach(wheel=>wheel.destroy())
        this._wheels = null;
        this._frame = null;
        this._cols = null;
    }

    /**
     * 设置滚轮的可选值列表
     * @param {number} index    滚轮的index,从0开始记录
     * @param {any[]} list      滚轮的可选值列表
     * @param {*} defaultValue  默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值
     */
    setOptions(index: number, list: any[], defaultValue: any): void{
        if(this._wheels[index])
            this._wheels[index].setOptions(list, defaultValue);
    }


    /**
     * 获取滚轮的可选值列表
     * @param {number} index    滚轮的index,从0开始记录
     */
    getOptions(index: number) {
        if(this._wheels[index]){
            return this._wheels[index].getOptions();
        } else {
            return null;
        }
    }

    /**
     * 设置滚轮的可选值
     * @param {number} index    滚轮的index,从0开始记录
     * @param {*} value         设置的值
     */
    setValue(index: number, value: any) {
        if(this._wheels[index])
            this._wheels[index].selectOption(value);
    }

    /**
     * 获取滚轮的值,如果index为空表示获取所有滚轮的值
     * @param {number} index    滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
     */
    getValue(index: number){
        if(index != null){
            if(this._wheels[index])
                return this._wheels[index].getValue();
        } else {
            var values = [];
            var i;
            for(i = 0; i < this._cols.length ; i++){
                values.push(this._wheels[i].getValue());
            }
            return values;
        }
    }
}