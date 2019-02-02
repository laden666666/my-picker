<template>
    <Doc>
        <H1>my-picker</H1>
        <P>我们将最常用的几种例子展现给大家，如果对例子中的API不是很明白，可以查看<A href="#/API">API</A>。</P>

        <H2>简单的选择器</H2>
        <P>可以设置简单的选择器，高仿IOS的PickerView控件，3D形式的滚轮选择器。</P>
        <Demo :demo="example1" :code="code1" title="简单的选择器"></Demo>
        
        <H2>带前缀与后缀的选择器</H2>
        <P>可以让选择器的滚轮左右两边设置固定的显示值，实现对选择器增加统一的单位、称呼、序列的文案。</P>
        <Demo :demo="example2" :code="code2" title="带前缀与后缀的选择器"></Demo>
        
        <H2>多滚轮的选择器</H2>
        <P>支持多个滚轮同时选择，并且每个滚轮都是3d的，而且还有水平方向的透视效果。建议滚轮最多只能设置3个，否则可能会出现显示异常。</P>
        <Demo :demo="example3" :code="code3" title="多滚轮的选择器"></Demo>
        
        <H2>设置默认值及动态设置</H2>
        <P>通过api可以设置默认值，并且可以通过api代替用户选择所选值。如下边的例子，两个picker通过相互调用api，给对方设置值，让两个选择器值保存同步。</P>
        <Demo :demo="example4" :code="code4" title="设置默认值及动态设置"></Demo>
        
        <H2>动态设置选择器的可选值</H2>
        <P>通过api可以动态修改可选值。下边的例子中，每选择一次，都会修改可选值列表。</P>
        <Demo :demo="example5" :code="code5" title="动态设置选择器的可选值"></Demo>

        <H2>label和value的选择器</H2>
        <P>picker不但可以选择字符串数组，还支持选择json，不过必须要提供json的属性中的label和value的key。</P>
        <Demo :demo="example6" :code="code6" title="label和value的选择器"></Demo>
        
        <H2>级联选择器</H2>
        <P>通过api修改可选值，可以实现级联选择的功能。</P>
        <Demo :demo="example7" :code="code7" title="级联选择器"></Demo>
        
        <H2>构建简单的日期选择器</H2>
        <P>基于picker控件，可以进一步封装出更多选择器控件。这里是一个日期选择控件的例子，代码实现仅做参考。</P>
        <Demo :demo="example8" :code="code8" title="构建简单的日期选择器"></Demo>
        
        <H2>非3D模式</H2>
        <P><Strong>myPicker</Strong>默认是使用3D形式的picker，但是它也支持一套平面模式的picker，用于在不兼容css3的<Strong>transform-style: preserve-3d</Strong>属性的浏览器中使用。</P>
        <Demo :demo="example9" :code="code9" title="非3D模式"></Demo>
    </Doc>
</template>
<script>
import example1 from '../demo/Useage/example1.vue'
import example2 from '../demo/Useage/example2.vue'
import example3 from '../demo/Useage/example3.vue'
import example4 from '../demo/Useage/example4.vue'
import example5 from '../demo/Useage/example5.vue'
import example6 from '../demo/Useage/example6.vue'
import example7 from '../demo/Useage/example7.vue'
import example8 from '../demo/Useage/example8.vue'
import example9 from '../demo/Useage/example9.vue'
export default {
    data(){
        return {
            example1,
            example2,
            example3,
            example4,
            example5,
            example6,
            example7,
            example8,
            example9,
            code1:
`<a id="example1" class="selector" placeholder="请选择你喜欢的编程语言"></a>
<script>
    var picker1 = new myPicker({
        cols: ['java','c#','JavaScript','php','Python'],
        title:"请选择你喜欢的编程语言",
        onOkClick: function (values) {
            document.querySelector('#example1').textContent = (values[0]);
        },
    })
    document.querySelector('#example1').addEventListener('click', function () {
        picker1.show();
    })
<\/script>`,
            code2:
`<a id="example2" class="selector" @click="select" placeholder="选择要阅读的章节"></a>
<script>
    var picker2 = new myPicker({
        cols: [{
            prefix: '  第',
            options: ['一', '二', '三', '四', '五'],
            suffix: '章  ',
        }],
        title:"选择要阅读的章节",
        onOkClick: function (values) {
            document.querySelector('#example2').textContent = '第' + (values[0]) + '章';
        },
    })
    document.querySelector('#example2').addEventListener('click', function () {
        picker2.show();
    })
<\/script>`,
            code3:
`<a id="example3" class="selector" @click="select" placeholder="选择要阅读的章节"></a>
<script>
    var picker3 = new myPicker({
        cols: [{
            options:["一", "二", "三", "四", "五", "六"],
            suffix: '年',
        },{
            options:['1', '2', '3', '4', '5'],
            suffix: '班  ',
        }],
        title:"请选择年级和班级",
        onOkClick: function (values) {
            document.querySelector('#example3').textContent = (values[0] + "年" + values[1] + "班");
        },
    })
    document.querySelector('#example3').addEventListener('click', function () {
        picker3.show();
    })
<\/script>`,
            code4:
`<a id="example4_1" class="selector">2</a>
<a id="example4_2" class="selector">2</a>
<script>
    var picker4_1 = new myPicker({
        cols: ['1', '2', '3', '4', '5'],
        setValues: [2],
        onOkClick: function (values) {
            document.querySelector('#example4_1').textContent = values[0];
            document.querySelector('#example4_2').textContent = values[0];
            picker4_2.setValue(0, values[0]);
        },
    })
    document.querySelector('#example4_1').addEventListener('click', function () {
        picker4_1.show();
    })
    var picker4_2 = new myPicker({
        cols: ['1', '2', '3', '4', '5'],
        setValues: [2],
        onOkClick: function (values) {
            document.querySelector('#example4_1').textContent = values[0];
            document.querySelector('#example4_2').textContent = values[0];
            picker4_1.setValue(0, values[0]);
        },
    })
    document.querySelector('#example4_2').addEventListener('click', function () {
        picker4_2.show();
    })

<\/script>`,
            code5:
`<a id="example5" class="selector" placeholder="请选择任意值"></a>
<script>
    var picker5 = new myPicker({
        cols: [
            ['选择A共0次', '选择B共0次', '选择C共0次'],
            ['选择D共0次', '选择E共0次', '选择F共0次']
        ],
        onSelectItem: function (level, selectedIndex, selectedValue) {
            //获取可选值列表
            var options = this.getOptions(level);

            //计算新的可选值列表,并设置到picker控件中
            var count = /(\d+)/.exec(options[selectedIndex])[0];
            options[selectedIndex] = options[selectedIndex].replace(count, parseInt(count) + 1 + "");

            //这里必须要设置新的可选值列表中的默认值,否则会自动选择第一个值
            this.setOptions(level, options, options[selectedIndex]);
        },
        onOkClick: function (values) {
            document.querySelector('#example5').textContent = values[0] + " " + values[1];
        },
    })
    document.querySelector('#example5').addEventListener('click', function () {
        picker5.show();
    })
<\/script>`,
            code6:
`<a id="example6" class="selector" placeholder="请选择人员的userId"></a>
<script>
    var picker6 = new myPicker({
        cols: {
            options:[{
                userId:1,
                name:"张三(userId:1)"
            },{
                userId:2,
                name:"李四(userId:2)"
            },{
                userId:3,
                name:"王五(userId:3)"
            },{
                userId:4,
                name:"贾六(userId:4)"
            },],
            labelKey: 'name',
            valueKey: 'userId',
        },
        title:"请选择人员的userId",
        onOkClick: function (values) {
            document.querySelector('#example6').textContent = '备选人的userId是' + values[0];
        },
    })
    document.querySelector('#example6').addEventListener('click', function () {
        picker6.show();
    })
<\/script>`,
            code7:
`<a id="example7" class="selector" placeholder="请选择你最喜欢的运动员"></a>
<script>
    var athlete = [{
        name:"足球",
        athlete: ['梅西','c罗','小贝','小罗']
    },{
        name:"篮球",
        athlete: ['科比','乔丹','詹姆斯']
    }]
    var picker7 = new myPicker({
        cols: [
            {
                options: athlete,
                labelKey: 'name',
                valueKey: 'name',
            },
            //因为运动项的默认值是足球,所以运动员列表使用足球的列表
            athlete[0].athlete
        ],
        setValues: ['足球','小贝'],
        onSelectItem: function (level, selectedIndex, selectedValue) {
            if(level == 0){
            this.setOptions(1, athlete[selectedIndex].athlete);
            }

        },
        title:"请选择你最喜欢的运动员",
        onOkClick: function (values) {
            document.querySelector('#example7').textContent = '你最喜欢的运动员是:' + values[1];
        },
    })
    document.querySelector('#example7').addEventListener('click', function () {
        picker7.show();
    })
<\/script>`,
            code8:
`<a id="example8" class="selector" placeholder="请选择日期"></a>
<script>
    var year = [];
    for(var i = 16; i < 30 ; i++){
        year.push(i + 2000);
    }

    var month = [];
    for(var i = 1; i <= 12 ; i++){
        month.push(i);
    }

    var today = new Date();

    var picker8  = new myPicker({
        cols : [{
            options: year,
            suffix: "年",
        },{
            options: month,
            suffix: "月",
        },{
            options: [],
            suffix: "日",
        },],
        onOkClick: function (values) {
            document.querySelector('#example8').textContent = values[0] + "年" + values[1] + "月" + values[2] + "日";
        },
        setValues: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
        onSelectItem : function (i, index, value) {

            if(i != 2){
            var year = this.getValue(0);
            var month = this.getValue(1);

            if(year == null || month == null)
                return

            var curDate = new Date();
            curDate.setYear(year)
            curDate.setMonth(month);
            curDate.setDate(0);

            var day = [];
            for(var i = 1; i <= curDate.getDate() ; i++){
                day.push(i);
            }
            this.setOptions(2, day);
            }
        }
    });
    document.querySelector('#example8').addEventListener('click', function () {
        picker8.show();
    })
<\/script>`,
            code9:
`<a id="example9" class="selector" placeholder="请选择日期"></a>
<script>
    var year = [];
    for(var i = 16; i < 30 ; i++){
        year.push(i + 2000);
    }

    var month = [];
    for(var i = 1; i <= 12 ; i++){
        month.push(i);
    }

    var today = new Date();

    var picker9  = new myPicker({
        cols : [{
            options: year,
            suffix: "年",
        },{
            options: month,
            suffix: "月",
        },{
            options: [],
            suffix: "日",
        },],
        onOkClick: function (values) {
            document.querySelector('#example8').textContent = values[0] + "年" + values[1] + "月" + values[2] + "日";
        },
        setValues: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
        onSelectItem : function (i, index, value) {

            if(i != 2){
            var year = this.getValue(0);
            var month = this.getValue(1);

            if(year == null || month == null)
                return

            var curDate = new Date();
            curDate.setYear(year)
            curDate.setMonth(month);
            curDate.setDate(0);

            var day = [];
            for(var i = 1; i <= curDate.getDate() ; i++){
                day.push(i);
            }
            this.setOptions(2, day);
            }
        }
    });
    document.querySelector('#example8').addEventListener('click', function () {
        picker9.show();
    })
<\/script>`,
        }
    }
}
</script>
<style>

.selector{
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 0, 0, 0.2);
    border-style: solid;
    border-width: 1px;
    border-radius: 0.3rem;
    transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    padding: 10px;
    width: auto;
    display: block;
    cursor: pointer;
    position: relative;
  }
  .selector:empty::before{
    color: #999;
    content: attr(placeholder);
  }
  .selector::after{
    position: absolute;
    right: 10px;
    top:14px;
    width: 10px;
    height: 10px;
    content: "";
    display: block;
    border: solid;
    border-width: 0 0 2px 2px;
    border-color: #000;
    transform: rotate(-45deg);
  }
  .selector:hover {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 0, 0, 0.3);
  }
  
</style>
