/**
 * @file 将用户数据封装为列对象
 */

import {StringCol, GenericCol} from './IOptions'

export class Col {
    options: any[]
    prefix = ""
    suffix = ""
    labelKey = "label";
    valueKey = "value";
    //列的类型，0：未知 1：字符串数组 2：对象数组
    private type = 0
    
    constructor(colOption: StringCol | GenericCol<any> | string[]){
        //如果option是一个数组,视为仅存在options的情况
        if(Array.isArray(colOption)){
            this.options = colOption;
            this.type = 1
        } else {
            this.options = colOption.options || [];
            if(this.options.length > 0){
                if(typeof this.options[0] === 'string'){
                    this.type = 1
                } else {
                    this.type = 2
                }
            } else {
                this.type = 0
            }
            this.prefix = colOption.prefix || "";
            this.suffix = colOption.suffix || "";
            this.labelKey = colOption['labelKey'] || this.labelKey;
            this.valueKey = colOption['valueKey'] || this.valueKey;
        }
    }

    push(item: any){
        this.options.push(item)
    }

    set(index: number, item: any){
        if(this.type == 0){
            this.type = typeof item === 'string' ? 1 : 2;
        }
        this.options[index] = item
    }

    setCol(){
    }

    getValue(index: number){
        if(this.type == 1){
            return this.options[index]
        } else {
            return this.options[index][this.valueKey]
        }
    }

    getLabel(index: number){
        if(this.type == 1){
            return this.options[index]
        } else {
            return this.options[index][this.labelKey]
        }
    }
}