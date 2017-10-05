// 实例1  基本使用示例
var picker1 = new myPicker({
    cols: ['java', 'c#', 'JavaScript', 'php', 'Python'],
    title: "请选择你喜欢的编程语言",
    onOkClick: function (values) {
        document.querySelector('#example1').textContent = (values[0]);
    },
})
document.querySelector('#example1').addEventListener('click', function () {
    picker1.show();
})

// 实例2  前缀和后缀使用示例
var picker2 = new myPicker({
    cols: [{
        prefix: '  第',
        options: ['一', '二', '三', '四', '五'],
        suffix: '章  ',
    }],
    title: "选择要阅读的章节",
    onOkClick: function (values) {
        document.querySelector('#example2').textContent = '第' + (values[0]) + '章';
    },
})
document.querySelector('#example2').addEventListener('click', function () {
    picker2.show();
})

// 实例三  多个选择项目(多滚轮)示例
var picker3 = new myPicker({
    cols: [{
        options: ["一", "二", "三", "四", "五", "六"],
        suffix: '年',
    }, {
        options: ['1', '2', '3', '4', '5'],
        suffix: '班  ',
    }],
    title: "请选择年级和班级",
    onOkClick: function (values) {
        document.querySelector('#example3').textContent = (values[0] + "年" + values[1] + "班");
    },
})
document.querySelector('#example3').addEventListener('click', function () {
    picker3.show();
})

// 实例四  通过setValue设置值的示例
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

// 实例五  通过getOptions设置可选值的实例
var picker5 = new myPicker({
    cols: [['选择A共0次', '选择B共0次', '选择C共0次'], ['选择D共0次', '选择E共0次', '选择F共0次']],
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

// 实例六  通过labelKey、valueKey解析json可选项的实例
var picker6 = new myPicker({
    cols: {
        options: [{
            userId: 1,
            name: "张三(userId:1)"
        }, {
            userId: 2,
            name: "李四(userId:2)"
        }, {
            userId: 3,
            name: "王五(userId:3)"
        }, {
            userId: 4,
            name: "贾六(userId:4)"
        },],
        labelKey: 'name',
        valueKey: 'userId',
    },
    title: "请选择人员的userId",
    onOkClick: function (values) {
        document.querySelector('#example6').textContent = '备选人的userId是' + values[0];
    },
})
document.querySelector('#example6').addEventListener('click', function () {
    picker6.show();
})

// 实例七   实现级联选择的示例
var athlete = [{
    name: "足球",
    athlete: ['梅西', 'c罗', '小贝', '小罗']
}, {
    name: "篮球",
    athlete: ['科比', '乔丹', '詹姆斯']
}]
var picker7 = new myPicker({
    cols: [{
        options: athlete,
        labelKey: 'name',
        valueKey: 'name',
    },
    //因为运动项的默认值是足球,所以运动员列表使用足球的列表
    athlete[0].athlete
    ],
    setValues: ['足球', '小贝'],
    onSelectItem: function (level, selectedIndex, selectedValue) {
        if (level == 0) {
            this.setOptions(1, athlete[selectedIndex].athlete);
        }

    },
    title: "请选择你最喜欢的运动员",
    onOkClick: function (values) {
        document.querySelector('#example7').textContent = '你最喜欢的运动员是:' + values[1];
    },
})
document.querySelector('#example7').addEventListener('click', function () {
    picker7.show();
})

// 实例八    简单日期示例
var year = [];
for (var i = 16; i < 30; i++) {
    year.push(i + 2000);
}

var month = [];
for (var i = 1; i <= 12; i++) {
    month.push(i);
}

var today = new Date();

var picker8 = new myPicker({
    cols: [{
        options: year,
        suffix: "年",
    }, {
        options: month,
        suffix: "月",
    }, {
        options: [],
        suffix: "日",
    },],
    onOkClick: function (values) {
        document.querySelector('#example8').textContent = values[0] + "年" + values[1] + "月" + values[2] + "日";
    },
    setValues: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
    onSelectItem: function (i, index, value) {

        if (i != 2) {
            var year = this.getValue(0);
            var month = this.getValue(1);

            if (year == null || month == null)
                return

            var curDate = new Date();
            curDate.setYear(year)
            curDate.setMonth(month);
            curDate.setDate(0);

            var day = [];
            for (var i = 1; i <= curDate.getDate(); i++) {
                day.push(i);
            }
            this.setOptions(2, day);
        }
    }
});
document.querySelector('#example8').addEventListener('click', function () {
    picker8.show();
})
