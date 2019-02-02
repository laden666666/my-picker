<template>
    <a id="example8" class="selector" placeholder="请选择日期" @click="select"></a>
</template>
<script>
import myPicker from 'my-picker'

var year = [];
for(var i = 16; i < 30 ; i++){
  year.push(i + 2000);
}

var month = [];
for(var i = 1; i <= 12 ; i++){
  month.push(i);
}

var today = new Date();

var picker  = new myPicker({
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
    isPerspective: false,
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
export default {
    methods: {
        select(){
            picker.show();
        },
    }
}
</script>
