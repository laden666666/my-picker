<template>
    <a id="example7" class="selector" placeholder="请选择你最喜欢的运动员" @click="select"></a>
</template>
<script>
import myPicker from 'my-picker'

var athlete = [{
    name:"足球",
    athlete: ['梅西','c罗','小贝','小罗']
},{
    name:"篮球",
    athlete: ['科比','乔丹','詹姆斯']
}]

var picker = new myPicker({
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
export default {
    methods: {
        select(){
            picker.show();
        },
    }
}
</script>
