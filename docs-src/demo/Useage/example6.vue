<template>
    <a id="example6" class="selector" placeholder="请选择人员的userId" @click="select"></a>
</template>
<script>
import myPicker from 'my-picker'
var picker = new myPicker({
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
export default {
    methods: {
        select(){
            picker.show();
        },
    }
}
</script>
