/**
 * @file 选择器滚轮类的接口
 */
export interface IWheel{
	setOptions(list: any[], defaultValue: any);
	getOptions(): any[];
	selectOption(value: any);
	getValue(): any;
}
