/**
 * @file 选择器滚轮类的接口
 */

import { MyJQuery } from 'my-jquery/types/MyJQuery'
import { Picker } from './picker';
import { IOptions } from './API';

export interface IWheel{
	setOptions(list: any[], defaultValue: any);
	getOptions(): any[];
	selectOption(value: any);
	getValue(): any;
	getDOM(): MyJQuery;
	addSelectItemListener(fn: {(index:number, value:any):void})
	removeSelectItemListener(fn: {(index:number, value:any):void})
	destroy(): void
}

export abstract class AWheel implements IWheel{
    ////////////////////主属性
	//picker对象
	protected picker: Picker;
	//option对象
	protected option: IOptions;
	//记录当前滚轮是容器中第几个滚轮
	protected index: number;
	//转轮主体
	protected dom: MyJQuery;
	//转轮上面标签的容器，同时也是转动的轴
	protected contains: MyJQuery;
    //被选值的值
    protected selectedValue;

    ////////////////////可选项属性
    //可选项列表
    protected list = [];
    //根据值生成的hashmap,主要是为了快速获得value对应可选项的index
    protected valueHashMap = {};
    //如果items数组里的值是对象,其中显示的key
    protected labelKey: string;
    //如果items数组里的值是对象,其中值的key
    protected itemValueKey: string;

    ////////////////////事件
    protected onSelectItemCallbackList: {(index:number, value:any):void}[] = []

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
    * 获取被选值
    */
   	getValue(){
		return this.selectedValue;
	}

	/**
	 * 给定指定备选标签的index,自动设定标签的各个位置
	 * @param index					要选择的index
	 * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
	 */
	protected abstract selectIndex(index: number, showAnimation?: boolean);


	abstract setOptions(list: any[], defaultValue: any);

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
	
	abstract destroy(): void
	
    ////////////////////////////DOM相关
    getDOM(){
        return this.dom
    }
}