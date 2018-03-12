/**
 * 可选值是字符串的列类型
 */
export type Col = {
    /**
     * 滚轮的前缀提示
     * @type {string}
     */
    prefix?: string,
    /**
     * 滚轮的后缀提示
     * @type {string}
     */
    suffix?: string,
}

/**
 * 可选值是字符串的列类型
 */
export interface StringCol extends Col {
    /**
     * 可选值的数组
     * @type {(Array<T | string>)}
     */
    options: Array<string>,
}

/**
 * 可选值是泛型的列类型
 */
export interface GenericCol<T> extends Col {
    /**
     * 需要指定那个key是返回的值。如果不设置，将返回整个对象
     * @type {string}
     */
    valueKey?: keyof T,
    /**
     * 需要指定那个key是显示的值
     * @type {string}
     */
    labelKey: keyof T,
    /**
     * 可选值的数组
     * @type {(Array<T>)}
     */
    options: Array<T>,
}

/**
 * @file 定义picker初始化的配置接口
 */
export interface IOptions<T = any>{
    /**
	 * 可选值列表的配置,是个数组,数组每项一列,一列的配置项的完整格式为一个json对象,最多支持3列。如:
	 * [{
	 * 	options:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	 * },{
	 * 	options:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
	 * }]
	 *
	 * 如果cols的参数是一个json,将视为只有一列可选值列表。,如:
	 * {
     *  prefix: '第',
     *  options: ['一', '二', '三', '四', '五'],
     *  suffix: '章',
     * }
	 * prefix是前缀,suffix是后缀,他们会显示在滚轮两侧。
	 *
	 * 同时options里面的值可以是一个字符串,也可以是一个json结构。如果是json结构,需要给出显示的key,和其值的key。如:
	 * {
     *  labelKey: 'name',
     *  valueKey: 'name',
     *  options: [{name: '张三'},{name: '李四'},{name: '王五'}],
     * }
	 *
	 * 如果如果可选值列表只有一列,且是个字符串数组,可进一步简化配置为:
	 * ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
     * @type {(string[] | StringCol[] | GenericCol<T>[] | StringCol | GenericCol<T>)}
     */
    cols: string[] | string[][] | StringCol[] | GenericCol<T>[] | StringCol | GenericCol<T>,

    /**
     * 已选择的对象。是个数组,索引必须和cols里面的可选值列表的索引一样
     * @type {string[]}
     */
    setValues?: string[],

	/**
	 * 用户转动滚轮停止时,响应的事件
	 * @param {number}  level				被选值所在的层级,从0开始计数
	 * @param {number}  selectedIndex		被选值在数组中的索引
	 * @param {*}       selectedValue		被选值
     */
    onSelectItem: {(level: number, selectedIndex: number, selectedValue: any): void},
    
	/**
	 * 点击"确定按钮"的事件函数,函数会返回一个数组,数组里面是被选值。接受一个返回值,如果返回值是false,picker不关闭,否则会关闭picker
     */
    onOkClick: {(values: any[]): boolean},

	/**
	 * 点击取消按钮的事件。执行后会关闭picker
	 */
	onCancelClick: {(): void},

	///////////////显示相关
    /**
     * 显示的字体,只支持数字,单位是px
     * @type {number}
     */
    fontSize: number,

	/**
     * 是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
     * 在IE等不支持“transform-style: preserve-3d”的浏览器中，将无法使用透视模式
     * @type {true}
     */
    isPerspective : boolean,

    /**
     * 转动滚轮时候，是否可以发出声音。boolean型，默认是true，即要求发出滴答声。
     * @type {true}
     */
    hasVoice: boolean,

    /**
     * 显示的标题
     * @type {string}
     */
    title: string,

    /**
     * 显示按钮的名称,第一个是按钮是确定,第二个是取消。
     * @type {string[]}
     */
    buttons: string[],

    /**
     * 控件的z-index的属性值。
     * @type {number}
     */
    zIndex : number,
}

