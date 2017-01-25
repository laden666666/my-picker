/**
 * 用户配置
 */
module.exports = {
	///////////////可选值相关

	/**
	 * 列的配置,是个数组,数组每项一列,一列的配置项的完整格式为一个json对象,最多支持3列。如:
	 * [{
	 * 	values:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	 * },{
	 * 	values:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
	 * }]
	 *
	 * 如果cols的参数是一个json,将视为只有一列。,如:
	 * {
     *  prefix: '第',
     *  values: ['一', '二', '三', '四', '五'],
     *  suffix: '章',
     * }
	 * prefix是前缀,suffix是后缀,他们会显示在滚轮两侧。
	 *
	 * 同时values里面的值可以是一个字符串,或者是一个json结构.如果是json结构,需要给出显示的key,和其值的key如:
	 * {
     *  labelKey: 'name',
     *  valueKey: 'name',
     *  values: [{name: '张三'},{name: '李四'},{name: '王五'}],
     * }
	 *
	 * 如果一个配置项是一个数组,将视为列配置项仅存在values的情况,如
	 * ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
     */
	cols: [
		[]
	],

	//已选择的对象。结构必须和items里面的值的结构一样
	setValues: [],
	/**
	 * 用户转动滚轮停止时,响应的事件
	 * @param level				被选值所在的层级,从0开始计数
	 * @param selectedIndex		被选值在数组中的索引
	 * @param selectedValue		被选值
     */
	onSelectItem : null,
	/**
	 * 如果是多选,最后一级滚轮会显示checkbox,点击checkbox的事件
	 * @param selectedObj		被选值
	 * @param isSelected		是否被选中。如果是取消选择,值是false
	 */
	onChickCheckBox : null,

	/**
	 * 点击"确定按钮"的事件函数,函数会返回一个数组,数组里面是被选值。接受一个返回值,如果返回值是false,picker不关闭,否则会关闭picker
     */
	onOkClick: null,

	/**
	 * 点击取消按钮的事件。执行后会关闭picker
	 */
	onCancelClick: null,

	///////////////显示相关
	//显示的字体,只支持数字,单位是px
	fontSize: 15,
	//是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
	isPerspective : true,
	//是否显示按钮,如果显示按钮
	showButton: true,
	//标题
	title: '',
	//显示按钮的名称,第一个是按钮是确定,第二个是取消。
	buttons:["确定","取消"],
	/**
	 * 控件创建完成的回调。控件创建完成,默认是隐藏状态
	 */
	onLoad : null,
	/**
	 * 每次显示时候的回调
	 */
	onShow : null,
	/**
	 * 点击确定按钮的事件
	 * @param selectedArray		被选值的数组,数组长度等于的级联的级数。如果是多选,数组最后的值也是个数组
     */
	onOk : null,
	/**
	 * 每次显示时候的回调
	 */
	onCancel : null,
	/**
	 * zindex属性
	 */
	zIndex : 100,
}