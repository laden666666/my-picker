<template>
    <a id="example2" class="selector" @click="select" placeholder="选择要阅读的章节"></a>
</template>
<script>
import myPicker from 'my-picker'
var picker = new myPicker({
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
export default {
    methods: {
        select(){
            picker.show();
        }
    }
}
</script>
