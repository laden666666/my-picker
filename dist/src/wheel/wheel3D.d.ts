import { MyJQuery } from 'my-jquery/types/MyJQuery';
import { IWheel } from '../IWheel';
import { Col } from '../Col';
import { Picker } from '../Picker';
import { IOptions } from '../IOptions';
export declare class Wheel3D implements IWheel {
    picker: Picker;
    option: IOptions;
    index: number;
    dom: MyJQuery;
    contains: MyJQuery;
    maxAngle: number;
    minAngle: number;
    radius: number;
    visibleAngle: number;
    isPerspective: boolean;
    em: () => number;
    offsetTop: number;
    originalAngle: number;
    lastIndexAngle: number;
    changeMaxAngle: number;
    angle: number;
    selectedIndex: number;
    selectedValue: any;
    animationId: number;
    speed: number;
    timeStamp: number;
    lastY: number;
    isDraging: boolean;
    audio: any;
    list: any[];
    valueHashMap: {};
    labelKey: string;
    itemValueKey: string;
    constructor(picker: Picker, col: Col, option: IOptions, index: number);
    /**
     * 开始拖拽
     * @param {number} offsetY  当前用户手指(鼠标)的y坐标
     */
    startDrag(offsetY: number): void;
    /**
     * 拖拽
     * @param {number} offsetY			当前用户手指(鼠标)的y坐标
     */
    drag(offsetY: number): void;
    /**
     * 拖拽结束
     */
    endDrag(): void;
    /**
     * 生成用户可选的标签
     * @param {any[]} list                  用户可选项数组
     * @param {*} selectedValue             默认值
     * @param {boolean} [isInti=false]      是否是初始化,初始化不执行设置默认值操作
     */
    setOptions(list: any[], selectedValue: any, isInti?: boolean): void;
    /**
    * 获得用户可选的标签
    */
    getOptions(): any[];
    /**
    * 给定指定标签的值,选择指定标签
    */
    selectOption(value: any, showAnimation?: boolean): void;
    /**
    * 给定指定备选标签的index,自动设定标签的各个位置
    * @param index					要选择的index
    * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
    */
    selectIndex(index: number, showAnimation?: boolean): void;
    /**
    * 给定指定角度,自动设定标签的各个位置
    * @param {number} angle		要转到的角度
    * @returns {number}			修正后的角度,即最终的实际角度
    */
    setAngle(angle: number): number;
    /**
    * 通过角度计算被选项的id
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    calcSelectedIndexByAngle(angle: number): number;
    /**
    * 通过角度计算被选项的id
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    calcAngleBySelectedIndex(index: number): number;
    /**
    * 限制转角超过极限值
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    rangeAngle(angle: number): number;
    /**
    * 刷新各个标签的状态,确定应该显示哪些标签
    */
    flushLabel(): void;
    /**
    * 获取被选值
    */
    getValue(): any;
    /**
    * 设置后缀
    * @param text			后缀显示的文本
    */
    setSuffix(text: any): void;
    /**
    * 设置前缀
    * @param text			前缀显示的文本
    */
    setPrefix(text: any): void;
    /**
    * 触发回调函数的接口
    * @param index			当前被选值的索引
    * @param value			当前被选值的值
    */
    toggleSelected(index: any, value: any): void;
    /**
    * 选择后的默认回调。会被packer覆盖掉
    * @param index			当前被选值的索引
    * @param value			当前被选值的值
    */
    $onSelectItem(index: any, value: any): void;
}
