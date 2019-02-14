<template>
    <a id="example3" class="selector" @click="select" placeholder="请选择年级和班级"></a>
</template>
<script>
import myPicker from 'my-picker'
var picker = new myPicker({
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
export default {
    methods: {
        select(){
            picker.show();
        }
    }
}
</script>
