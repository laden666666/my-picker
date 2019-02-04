/**
 * 滚轮类,是显示选择器可选项的滚轮体，3D模式型的，有透视效果
 */
import { Col } from '../Col';
import { Picker } from '../Picker';
import { IOptions } from '../API';
import { AWheel } from './AWheel';
export declare class Wheel extends AWheel {
    private maxDistance;
    private minDistance;
    private em;
    private offsetTop;
    private originalDistance;
    private lastIndexDistance;
    private changeMaxDistance;
    private distance;
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
    * 给定指定备选标签的index,自动设定标签的各个位置
    * @param index					要选择的index
    * @param showAnimation			是否显示动画,如果显示动画,会用100帧来显示动画
    */
    protected selectIndex(index: number, showAnimation?: boolean): void;
    /**
    * 给定指定位移,自动设定标签的各个位置
    * @param {number} distance		要转到的位移
    * @returns {number}			修正后的位移,即最终的实际位移
    */
    private setDistance;
    /**
    * 通过位移计算被选项的id
    * @param distance {number}		要计算的位移
    * @returns {number}		    被选项id
    */
    private calcSelectedIndexByDistance;
    /**
    * 通过位移计算被选项的id
    * @param Distance {number}		要计算的位移
    * @returns {number}		    被选项id
    */
    private calcDistanceBySelectedIndex;
    /**
    * 限制位移超过极限值
    * @param distance {number}		要计算的位移
    * @returns {number}		    被选项id
    */
    private rangeDistance;
    /**
    * 获取被选值
    */
    getValue(): any;
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
