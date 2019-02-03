/**
 * @file 将用户数据封装为列对象
 */
import { StringCol, GenericCol } from './API';
export declare class Col {
    options: any[];
    prefix: string;
    suffix: string;
    labelKey: string;
    valueKey: string;
    private type;
    constructor(colOption: StringCol | GenericCol<any> | string[]);
    push(item: any): void;
    set(index: number, item: any): void;
    setCol(): void;
    getValue(index: number): any;
    getLabel(index: number): any;
}
