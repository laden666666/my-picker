<template>
    <div>
        <a id="example4_1" class="selector" @click="select1">2</a>
        <a id="example4_2" class="selector" @click="select2">2</a>
    </div>
</template>
<script>
import myPicker from 'my-picker'
var picker1 = new myPicker({
    cols: ['1', '2', '3', '4', '5'],
    setValues: [2],
    onOkClick: function (values) {
        document.querySelector('#example4_1').textContent = values[0];
        document.querySelector('#example4_2').textContent = values[0];
        picker2.setValue(0, values[0]);
    },
})
var picker2 = new myPicker({
    cols: ['1', '2', '3', '4', '5'],
    setValues: [2],
    onOkClick: function (values) {
        document.querySelector('#example4_1').textContent = values[0];
        document.querySelector('#example4_2').textContent = values[0];
        picker1.setValue(0, values[0]);
    },
})
export default {
    methods: {
        select1(){
            picker1.show();
        },
        select2(){
            picker2.show();
        },
    }
}
</script>
