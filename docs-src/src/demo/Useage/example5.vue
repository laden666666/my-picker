<template>
    <a id="example5" class="selector" placeholder="请选择任意值" @click="select"></a>
</template>
<script>
import myPicker from 'my-picker'
var picker = new myPicker({
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
export default {
    methods: {
        select(){
            picker.show();
        },
    }
}
</script>
