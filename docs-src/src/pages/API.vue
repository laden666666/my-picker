<template>
    <Doc>
        <H1>my-picker的API</H1>

        <H2>初始化：</H2>
        <P>通过new<Strong>myPicker</Strong>即可创建选择器：</P>
        <Code lang="javascript" code="new myPicker(option)"></Code>

        <P>option是控件的初始化配置，具体配置项有：</P>
        <Instructions :data="[{
            name: 'cols',
            type: 'Object 或 Array', 
            required: true, 
            describe: '可选值列表的配置，是个数组，数组每项一列，一列的配置项的完整格式为一个json对象，最多支持3列'
        }, {
            name: 'setValues',
            type: 'Array', 
            default: '[]',
            describe: '配置每一列已选择的值。是个数组，索引必须和cols里面的可选值列表的索引一样', 
        }, {
            name: 'hasVoice',
            type: 'Boolean', 
            default: 'true',
            describe: '是否启动刻度声音。如果值为true，转动滚轮时候，是否可以发出声音。boolean型，默认是true，即要求发出滴答声。', 
        }, {
            name: 'title',
            type: 'String', 
            default: '\'\'',
            describe: '显示的标题。', 
        }, {
            name: 'zIndex',
            type: 'Number', 
            default: '100',
            describe: '控件的z-index的属性值。', 
        }, {
            name: 'isPerspective',
            type: 'Boolean', 
            default: '随浏览器变化',
            describe: '是否以3D透视显示picker的滚轮。如果为true，picker的滚轮会以3D的形式显示，否则会以一个平面的模式显示。\n如果浏览器支持3D模式，默认值会优先显示3D模式；如果浏览器无法支持运行3D模式，即使设置为true也以平面模式显示', 
        }, {
            name: 'hasGlassCover',
            type: 'Boolean', 
            default: 'true',
            describe: '是否有玻璃罩。如果为true，滚轮会被一层渐变层罩住，给人一种类似玻璃遮罩的感觉。\n默认值会优先用webkit-mask-box-image显示玻璃罩；如果浏览器不支持会使用box-shadow实现', 
        }, {
            name: 'fontSize',
            type: 'Number', 
            default: '15',
            describe: '显示的字体大小，只支持数字，单位是px', 
        }, {
            name: 'buttons',
            type: 'Array', 
            default: '[\'确定\', \'取消\']',
            describe: '显示按钮的名称，第一个是按钮是确定，第二个是取消。', 
        }, {
            name: 'onSelectItem',
            type: 'Function', 
            describe: '用户转动滚轮停止时，响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数。', 
        }, {
            name: 'onOkClick',
            type: 'Function', 
            describe: '点击“确定按钮”的事件函数，函数会返回一个数组，数组里面是被选值。', 
        }, {
            name: 'onCancelClick',
            type: 'Function', 
            describe: '点击取消按钮的事件。执行后会关闭picker。', 
        },]"></Instructions>

        <P>这里对几个主要配置项做解释。</P>

        <H3>cols</H3>
        <P>可选值列表的配置，是个数组，数组每项一列，一列的配置项的完整格式为一个json对象，最多支持3列。如:</P>
        <Code lang="javascript" :code="
`new myPicker({
    cols:[{
        options:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },{
        options:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    }]
})`"></Code>
        <Col1></Col1>

        <P>如果cols的参数是一个json，将视为只有一列可选值列表，如:</P>
        <Code lang="javascript" :code="
`new myPicker({
    cols:{
        options: ['一', '二', '三', '四', '五'],
    }
})`"></Code>
        <Col2></Col2>

        <P>同时options里面的值可以是一个字符串，也可以是一个json结构。如果是json结构，需要给出显示的key，和其值的key。如:</P>
        <Code lang="javascript" :code="
`new myPicker({
    cols:{
        labelKey: 'name',
        valueKey: 'name',
        options: [{name: '张三'},{name: '李四'},{name: '王五'}],
    }
})`"></Code>
        <Col3></Col3>

        <P>如果如果可选值列表只有一列,且是个字符串数组,可进一步简化配置为:</P>
        <Code lang="javascript" :code="`new myPicker({cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']})`"></Code>
        <Col4></Col4>

        <P>除了配置options，cols也可以配置显示在两个的前缀、后缀。prefix是前缀，suffix是后缀，他们会显示在滚轮两侧。</P>
        <Code lang="javascript" :code="
`new myPicker({
    cols:{
        prefix: '第'，
        options: ['一', '二', '三', '四', '五'],
        suffix: '章',
    }
})`"></Code>
        <Col5></Col5>

        <H3>setValues</H3>
        <P>已选择的对象。是个数组,索引必须和cols里面的可选值列表的索引一样。如:</P>
        <Code lang="javascript" :code="
`new myPicker({
    cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
    setValues: ['钱'],
})`"></Code>
        <setValues></setValues>
        <Alert>cols里面设置了几个Col，setValues可以设置几个多设置几个值。</Alert>

        <H3>onSelectItem</H3>
        <Function :data="`
            /**
             * 用户转动滚轮停止时,响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数
             * @param {number}  level				被选值所在的层级,从0开始计数
             * @param {number}  selectedIndex		被选值在数组中的索引
             * @param {any}       selectedValue		被选值
             */
            `"></Function>
        <Demo :demo="onSelectItem" title="onSelectItem示例" :vertical="true" lang="javascript" :code="`let picker = new myPicker({
    cols: [
        ['一', '二', '三', '四', '五'],
        ['I', 'II', 'III', 'IV', 'V'],
    ],
    onSelectItem(level, selectedIndex, selectedValue){
        alert(\`第\${level + 1}个滚轮第\${selectedIndex + 1}值被选中，值为“\${selectedValue}”\`)
    }
})
picker.show()`">
            <P>请点击查看按钮，注意onSelectItem的部分</P>
        </Demo>

        <H3>onOkClick</H3>
        <Function :data="`
            /**
             * 点击“确定按钮”的事件函数,函数会返回一个数组,数组里面是被选值。
             * @param {any[]} values         一个数组，对应每个滚轮当前已经选择的值
             * @returns {boolean}            如果返回值是false,picker不关闭,否则会关闭picker
             */
            `"></Function>
        <Demo :demo="onOkClick" title="onOkClick示例" :vertical="true" lang="javascript" :code="`let picker = new myPicker({
    cols: [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    title: '第一列选奇数，第二列选偶数',
    onOkClick: function(values){
        if(values[0] % 2 === 0 || values[1] % 2 === 1){
            alert('第一列只能选奇数，第二列只能选偶数!');
            //返回false,不准关闭,继续选择
            return false;
        }
    },
})
picker.show()`">
            <P>请点击查看按钮，注意onOkClick的部分</P>
        </Demo>

        <H2>显示隐藏相关API：</H2>

        <H3>myPicker.prototype.show</H3>
        <P>new出picker对象后，是隐藏状态，需要调用此接口显示。</p>

        <H3>myPicker.prototype.hide</H3>
        <P>将显示出来的picker隐藏起来。</p>

        <H3>myPicker.prototype.close</H3>
        <P>删除picker，picker将不能再被打开。</p>

        <Demo :demo="show" title="显示隐藏相关API示例" :vertical="true" lang="html" :code="showCode">
            <P>显示隐藏相关API示例</P>
        </Demo>

        <H2>已选值相关API：</H2>
        <H3>myPicker.prototype.setOptions</H3>
        <Function :data="
    `/**
        * 设置滚轮的可选值列表
        * @param {number} index    滚轮的index,从0开始记录
        * @param {any[]} list      滚轮的可选值列表，是个数组，和cols里面配置的列一样
        * @param {any} defaultValue  默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值
        */`"></Function>

        <H3>myPicker.prototype.getOptions</H3>
        <Function :data="
    `/**
        * 获取滚轮的可选值列表
        * @param {number} index    滚轮的index,从0开始记录
        * @returns {any[]}         滚轮的可选值列表
        */`"></Function>

        <H2>选项列表相关api：</H2>
        <H3>myPicker.prototype.setValue(index, value)</H3>
        <Function :data="
    `/**
        * 设置滚轮的可选值
        * @param {number} index    滚轮的index,从0开始记录
        * @param {any} value         设置的值
        */`"></Function>

        <H3>myPicker.prototype.getValue(index)</H3>
        <Function :data="
    `/**
        * 获取滚轮的值,如果index为空表示获取所有滚轮的值
        * @param {number} index    滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值
        * @returns {any}             设置的值
        */`"></Function>
    </Doc>
</template>
<script>
import Col1 from '../demo/API/cols/Col1'
import Col2 from '../demo/API/cols/Col2'
import Col3 from '../demo/API/cols/Col3'
import Col4 from '../demo/API/cols/Col4'
import Col5 from '../demo/API/cols/Col5'
import setValues from '../demo/API/setValues'
import onSelectItem from '../demo/API/onSelectItem'
import onOkClick from '../demo/API/onOkClick'
import show from '../demo/API/show'
export default {
    data(){
        return {
            onSelectItem,
            onOkClick,
            show,
            showCode: 
`<a onclick="show">显示picker，两秒后自动关闭picker</a>
<a onclick="close">销毁picker</a>
<script>
    let picker = new myPicker({
        cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
    });

    function show(){
        try{
            picker.show()
            setTimeout(()=>{
                picker.hide()
            }, 2000)
        } catch(e){
            alert('出现错误，应该是picker已经被销毁，不能再显示')
        }
    }

    function close(){
        try{
            picker.close()
            alert('picker销毁成功')
        } catch(e){
            alert('出现错误，应该是picker已经被销毁，不能再销毁')
        }
    }
<\/script>`
        }
    },
    components: {
        Col1,
        Col2,
        Col3,
        Col4,
        Col5,
        setValues,
    }
}
</script>
