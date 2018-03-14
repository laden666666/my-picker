/**
 * @file 选择器滚轮类的接口
 */

import {MyJQuery} from 'my-jquery/types/MyJQuery'
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
