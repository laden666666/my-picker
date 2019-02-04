<template>
    <a id="example11" class="selector" @click="select" placeholder="请选择你喜欢的编程语言"></a>
</template>
<script>
import myPicker from 'my-picker'
var picker = new myPicker({
    cols: ['java','c#','JavaScript','php','Python'],
    title:"请选择你喜欢的编程语言",
    hasGlassCover: false,
    onOkClick: function (values) {
        document.querySelector('#example11').textContent = (values[0]);
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
