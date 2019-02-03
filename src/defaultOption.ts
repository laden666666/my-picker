import {IOptions} from './API'

/**
 * 用户默认配置
 */
let defaultOptions: IOptions = {
	cols: [
		[]
	],
	setValues: [],
	onSelectItem : null,
	onOkClick: null,
	onCancelClick: null,
	fontSize: 15,
	isPerspective: true,
	hasGlassCover: true,
	hasVoice: true,
	title: '',
	buttons: ["确定", "取消"],
	zIndex : 100,
}

export default defaultOptions