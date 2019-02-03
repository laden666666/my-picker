/**
 * @file 选择器滚轮类的接口
 */
import { MyJQuery } from 'my-jquery/types/MyJQuery';
import { Picker } from './picker';
import { IOptions } from './API';
export interface IWheel {
    setOptions(list: any[], defaultValue: any): any;
    getOptions(): any[];
    selectOption(value: any): any;
    getValue(): any;
    getDOM(): MyJQuery;
    addSelectItemListener(fn: {
        (index: number, value: any): void;
    }): any;
    removeSelectItemListener(fn: {
        (index: number, value: any): void;
    }): any;
    destroy(): void;
}
export declare abstract class AWheel implements IWheel {
    protected picker: Picker;
    protected option: IOptions;
    protected index: number;
    protected dom: MyJQuery;
    protected contains: MyJQuery;
    protected selectedValue: any;
    protected list: any[];
    protected valueHashMap: {};
    protected labelKey: string;
    protected itemValueKey: string;
    protected onSelectItemCallbackList: {
        (index: number, value: any): void;
    }[];
    /**
    * 获得用户可选的标签
    */
    getOptions(): any[];
    /**
    * 给定指定标签的值,选择指定标签
    */
    selectOption(value: any, showAnimation?: boolean): void;
    /**
    * 获取被选值
    */
    getValue(): any;
    /**
     * 给定指定备选标签的index,自动设定标签的各个位置
     * @param index					要选择的index
     * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
     */
    protected abstract selectIndex(index: number, showAnimation?: boolean): any;
    abstract setOptions(list: any[], defaultValue: any): any;
    /**
     * 注册SelectItem的回调事件
     * @param {{(index:number, value:any):void}} fn
     */
    addSelectItemListener(fn: {
        (index: number, value: any): void;
    }): void;
    /**
     * 移除注册的SelectItem回调事件
     * @param {{(index:number, value:any):void}} fn
     */
    removeSelectItemListener(fn: {
        (index: number, value: any): void;
    }): void;
    getDOM(): MyJQuery;
    /**
    * 触发回调函数的接口
    * @param index			当前被选值的索引
    * @param value			当前被选值的值
    */
    toggleSelected(index: any, value: any): void;
    /**
     * 销毁
     */
    destroy(): void;
}
