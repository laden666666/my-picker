/**
 * @file 定义Picker的接口
 */
import {IOptions} from './IOptions'

export interface IPicker {
    /**
     * 控件的版本
     * @type {string}
     */
    version: string

    /**
     * 显示
     */
    show(): void;

    /**
     * 隐藏
     */
    hide(): void;

    /**
     * 关闭
     */
    close(): void;

    /**
     * 设置滚轮的可选值列表
     * @param {number} index    滚轮的index,从0开始记录
     * @param {any[]} list      滚轮的可选值列表
     * @param {*} defaultValue  默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值
     */
    setOptions(index: number, list: any[], defaultValue: any): void;


    /**
     * 获取滚轮的可选值列表
     * @param {number} index    滚轮的index,从0开始记录
     * @returns {any[]}         滚轮的可选值列表
     */

    getOptions(index: number): any[]

    /**
     * 设置滚轮的可选值
     * @param {number} index    滚轮的index,从0开始记录
     * @param {*} value         设置的值
     */
    setValue(index: number, value: any): void;

    /**
     * 获取滚轮的值,如果index为空表示获取所有滚轮的值
     * @param {number} index    滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
     * @returns {*}             设置的值
     */
    getValue(index: number): any;
}
