/**
 * 用户配置
 */
module.exports = {
	///////////////可选值相关
	//级联的层级,默认是1级。最多支持3级
	levelCount : 1,
	//第一级可选项,是个数组。数组的值可以是字符串,也可以是对象,如果是对象必须为{[itemLabelKey]:xxx,[itemValeKey],xxx}结构
	firstItems: [],
	//如果items数组里的值是对象,其中显示的key
	itemLabelKey : "label",
	//如果items数组里的值是对象,其中值的key
	itemValeKey: "vale",
	//显示时候的前缀,是个数组,与行是对应关系
	itemsPrefix: [],
	//显示时候的后缀,是个数组,与行是对应关系
	itemsSuffix: [],
	//已选择的对象。结构必须和items里面的值的结构一样
	selected: [],
	/**
	 * 用户转动滚轮停止时,响应的事件
	 * @param level				被选值所在的层级,从0开始计数
	 * @param selectedObj		被选值
     */
	onSelectItem : null,
	/**
	 * 如果是多选,最后一级滚轮会显示checkbox,点击checkbox的事件
	 * @param selectedObj		被选值
	 * @param isSelected		是否被选中。如果是取消选择,值是false
	 */
	onChickCheck : null,

	///////////////显示相关
	//是否使用水平透视,使用水平透视后,显示时滚轮水平方向有透视效果
	isPerspective : true,
	//是否显示按钮,如果显示按钮
	showButton: true,
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
}