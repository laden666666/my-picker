/**
 * @file 选择器滚轮类的接口
 */
export interface IWheel {
    setOptions(list: any[], defaultValue: any): any;
    getOptions(): any[];
    selectOption(value: any): any;
    getValue(): any;
}
