/**
 * 用户配置
 *  item: number			滚轮的高度
 *  itemKey: number			每个可选项在滚轮上的角度
 *  itemVale: number	滚轮的惯性减速滑动时间
 *
 */
module.exports = {
	//数据相关
	items: [],
	itemKey : "label",
	itemVale : "vale",
	selected: [],
	onSelectItem : function () {

	},

	//显示相关
	show3D : true,
	showButton: true,
	buttons:["确定","取消"],
}