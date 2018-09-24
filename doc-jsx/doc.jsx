
<doc>
    <title>my-picker</title>
    <p>高仿IOS的PickerView的JavaScript插件，3D形式的滚轮选择器，同时支持最多三级联动的选择效果，支持pc端和移动端两种平台浏览器。支持chrome及移动端默认浏览器、ie（9-11）、火狐浏览器</p>

    <h2>安装</h2>
    <h3>浏览器环境</h3>
    <p>浏览器环境直接导入dist下的**my-picker.js**和**my-picker.css**文件即可</p>
    <h3>webpack环境</h3>
    <p>执行cli命令</p>
    <code lang="javascript">{
`npm i my-picker -S`
    }</code>
    <p>并在js文件中引用</p>
    <code lang="javascript">{
`import myPicker form 'my-picker'
import 'my-picker/my-picker.css'`
    }</code>

    <h2>初始化：</h2>
    <code lang="javascript">{
`new myPicker(option)`}</code>
    <p>option是控件的初始化配置，具体配置项有：</p>
    <table>
        <tr>
            <th>配置项名</th>
            <th>类型</th>
            <th>默认值</th>
            <th>配置项说明</th>
        </tr>
        <tr>
            <td>cols</td>
            <td>Object 或 Array</td>
            <td>必须配置</td>
            <td>可选值列表的配置，是个数组,，数组每项一列，一列的配置项的完整格式为一个json对象，最多支持3列</td>
        </tr>
        <tr>
            <td>setValues</td>
            <td>Array</td>
            <td>[]</td>
            <td>配置每一列已选择的值。是个数组，索引必须和cols里面的可选值列表的索引一样</td>
        </tr>
        <tr>
            <td>hasVoice</td>
            <td>Boolean</td>
            <td>true</td>
            <td>是否启动刻度声音。如果值为true，转动滚轮时候，是否可以发出声音。boolean型，默认是true，即要求发出滴答声。</td>
        </tr>
        <tr>
            <td>title</td>
            <td>String</td>
            <td>''</td>
            <td>显示的标题。</td>
        </tr>
        <tr>
            <td>zIndex</td>
            <td>Number</td>
            <td>100</td>
            <td>控件的z-index的属性值。</td>
        </tr>
        <tr>
            <td>isPerspective</td>
            <td>Boolean</td>
            <td>随浏览器变化</td>
            <td>是否以3D透视显示picker的滚轮。如果为true，picker的滚轮会以3D的形式显示，否则会以一个平面的模式显示。如果浏览器支持3D模式，默认值会优先显示3D模式。</td>
        </tr>
        <tr>
            <td>fontSize</td>
            <td>Number</td>
            <td>15</td>
            <td>显示的字体大小，只支持数字，单位是px</td>
        </tr>
        <tr>
            <td>buttons</td>
            <td>Array</td>
            <td>["确定", "取消"]</td>
            <td>显示按钮的名称，第一个是按钮是确定，第二个是取消。</td>
        </tr>
        <tr>
            <td>onSelectItem</td>
            <td>Function</td>
            <td>无</td>
            <td>用户转动滚轮停止时,响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数。
            </td>
        </tr>
        <tr>
            <td>onOkClick</td>
            <td>Function</td>
            <td>无</td>
            <td>点击"确定按钮"的事件函数,函数会返回一个数组,数组里面是被选值。
            </td>
        </tr>
        <tr>
            <td>onCancelClick</td>
            <td>Function</td>
            <td>无</td>
            <td>点击取消按钮的事件。执行后会关闭picker。</td>
        </tr>
    </table>

    <p>这里对几个主要配置项做解释</p>
    <h3>cols</h3>
    <p>可选值列表的配置，是个数组，数组每项一列，一列的配置项的完整格式为一个json对象，最多支持3列。如:</p>
    <code lang="JavaScript">{
`new myPicker({
    cols:[{
        options:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },{
        options:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    }]
})`
    }</code>
    <p>如果cols的参数是一个json，将视为只有一列可选值列表,如:</p>
    <code lang="javascript">{
`new myPicker({
    cols:{
        prefix: '第'，
        options: ['一', '二', '三', '四', '五'],
        suffix: '章',
    }
})`}</code>
    <p>prefix是前缀，suffix是后缀，他们会显示在滚轮两侧。</p>

    <p>同时options里面的值可以是一个字符串，也可以是一个json结构。如果是json结构，需要给出显示的key，和其值的key。如:</p>

    <code lang="javascript">{
`new myPicker({
    cols:{
        labelKey: 'name',
        valueKey: 'name',
        options: [{name: '张三'},{name: '李四'},{name: '王五'}],
    }
})`}</code>

    <p>如果如果可选值列表只有一列,且是个字符串数组,可进一步简化配置为:</p>
    <code>{
        `new myPicker({cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']})`}</code>

    <h3>setValues</h3>
    <p>已选择的对象。是个数组,索引必须和cols里面的可选值列表的索引一样。如:</p>
    <code>{
        `new myPicker({
   cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
   setValues: ['钱'],
})`}</code>

    <h3>onSelectItem</h3>
    <api>{
`
* 用户转动滚轮停止时,响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数
* @param {number}  level				被选值所在的层级,从0开始计数
* @param {number}  selectedIndex		被选值在数组中的索引
* @param {any}       selectedValue		被选值
`}</api>
    <code>{
        `new myPicker({
    cols: ...,
    onSelectItem: function(index, selectedIndex, selectedValue){
        var options = [];// 根据selectedIndex或者selectedValue确定下一级的可选项
        this.setOptions(index + 1, options)
    }
})`}</code>

    <h3>onOkClick</h3>
    <api>{
`
* 点击"确定按钮"的事件函数,函数会返回一个数组,数组里面是被选值。
* @param {any[]} values         一个数组，对应每个滚轮当前已经选择的值
* @returns {boolean}            如果返回值是false,picker不关闭,否则会关闭picker
`}</api>
    <code>{
        `new myPicker({
    cols: ...,
    onOkClick: function(values){
        if(values[0] is 错误){        //伪码,表示选项错误
            alert("不可以选择这个选项!");
            //返回false,不准关闭,继续选择
            return false;
        }
    },
})`}</code>

    <h2>方法</h2>
    <h3>显示隐藏相关api：</h3>

    <h4>Picker.prototype.show</h4>
    <p>new出picker对象后，是隐藏状态，需要调用此接口显示。</p>

    <h4>Picker.prototype.hide</h4>
    <p>将显示出来的picker隐藏起来。</p>

    <h4>Picker.prototype.close</h4>
    <p>删除picker，picker将不能再被打开。</p>

    <h3>已选值相关api：</h3>
    <h4>Picker.prototype.setOptions</h4>
    <api>{
`* 设置滚轮的可选值列表
* @param {number} index    滚轮的index,从0开始记录
* @param {any[]} list      滚轮的可选值列表，是个数组，和cols里面配置的列一样
* @param {any} defaultValue  默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值`}</api>

    <h4>Picker.prototype.getOptions</h4>
    <api>{
`* 获取滚轮的可选值列表
* @param {number} index    滚轮的index,从0开始记录
* @returns {any[]}         滚轮的可选值列表`}</api>

    <h3>选项列表相关api：</h3>
    <h4>Picker.prototype.setValue(index, value)</h4>
    <api>{
`* 设置滚轮的可选值
* @param {number} index    滚轮的index,从0开始记录
* @param {any} value         设置的值`}</api>

    <h4>Picker.prototype.getValue(index)</h4>
    <api>{
`* 获取滚轮的值,如果index为空表示获取所有滚轮的值
* @param {number} index    滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
* @returns {any}             设置的值`}</api>
</doc>
