/**
 * 滚轮类,是显示选择器可选项的滚轮体，3D模式型的，有透视效果
 */
import { Col } from '../Col';
import { Picker } from '../Picker';
import { IOptions } from '../API';
import { AWheel } from './AWheel';
export declare class Wheel3D extends AWheel {
    private maxAngle;
    private minAngle;
    private radius;
    private visibleAngle;
    private em;
    private offsetTop;
    private originalAngle;
    private lastIndexAngle;
    private changeMaxAngle;
    private angle;
    private animationId;
    private speed;
    private timeStamp;
    private lastY;
    private isDraging;
    constructor(picker: Picker, col: Col, option: IOptions, index: number);
    /**
     * 开始拖拽
     * @param {number} offsetY  当前用户手指(鼠标)的y坐标
     */
    protected startDrag(offsetY: number): void;
    /**
     * 拖拽
     * @param {number} offsetY			当前用户手指(鼠标)的y坐标
     */
    protected drag(offsetY: number): void;
    /**
     * 拖拽结束
     */
    protected endDrag(): void;
    /**
     * 生成用户可选的标签
     * @param {any[]} list                  用户可选项数组
     * @param {*} selectedValue             默认值
     * @param {boolean} [isInti=false]      是否是初始化,初始化不执行设置默认值操作
     */
    setOptions(list: any[], selectedValue: any, isInti?: boolean): void;
    /**
    * 给定指定备选标签的index,自动设定标签的各个位置
    * @param index					要选择的index
    * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
    */
    protected selectIndex(index: number, showAnimation?: boolean): void;
    /**
    * 给定指定角度,自动设定标签的各个位置
    * @param {number} angle		要转到的角度
    * @returns {number}			修正后的角度,即最终的实际角度
    */
    private setAngle;
    /**
    * 通过角度计算被选项的id
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    private calcSelectedIndexByAngle;
    /**
    * 通过角度计算被选项的id
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    private calcAngleBySelectedIndex;
    /**
    * 限制转角超过极限值
    * @param angle {number}		要计算的角度
    * @returns {number}		    被选项id
    */
    private rangeAngle;
    /**
    * 刷新各个标签的状态,确定应该显示哪些标签
    */
    private flushLabel;
    /**
    * 设置后缀
    * @param text			后缀显示的文本
    */
    private setSuffix;
    /**
    * 设置前缀
    * @param text			前缀显示的文本
    */
    private setPrefix;
}
