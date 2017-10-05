# my-picker
高仿IOS的PickerView的JavaScript插件，3D形式的滚轮选择器，同时支持最多三级联动的选择效果，支持pc端和移动端两种平台浏览器。目前仅支持chrome及移动端默认浏览器，后续增加ie、火狐浏览器的支持

## 高仿ios的PickerView控件

控件使用了**transform-style: preserve-3d**，有一种立体3d的效果。同时增加了滑动的声音，使其更接近原生控件的拖动效果。
移动端demo效果图:
-
![image](https://github.com/laden666666/my-picker/blob/master/docs/images/mobileDemo.gif)

pc端demo效果图:
-
![image](https://github.com/laden666666/my-picker/blob/master/docs/images/pcDemo.gif)

## 安装
### 浏览器环境
浏览器环境直接导入dist下的**my-picker.js**和**my-picker.css**文件即可

### webpack环境
执行cli命令
```
npm i my-picker -S
```

并在js文件中引用
```
import myPicker form 'my-picker'
import 'my-picker/my-picker.css'
```

## api
### 初始化：
```
new myPicker(option)
```
option是控件的初始化配置，具体配置项有：
#### cols:
可选值列表的配置,是个数组,数组每项一列,一列的配置项的完整格式为一个json对象,最多支持3列。如:
```
{
    cols:[{
        options:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },{
        options:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    }]
}
```
如果cols的参数是一个json,将视为只有一列可选值列表,如:
```
{
    cols:{
        prefix: '第',
        options: ['一', '二', '三', '四', '五'],
        suffix: '章',
    }
}
```
prefix是前缀,suffix是后缀,他们会显示在滚轮两侧。

同时options里面的值可以是一个字符串,也可以是一个json结构。如果是json结构,需要给出显示的key,和其值的key。如:
```
{
    cols:{
        labelKey: 'name',
        valueKey: 'name',
        options: [{name: '张三'},{name: '李四'},{name: '王五'}],
    }
}
```

如果如果可选值列表只有一列,且是个字符串数组,可进一步简化配置为:
```
{cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']}
```

#### setValues:
已选择的对象。是个数组,索引必须和cols里面的可选值列表的索引一样。如:
```
{
   cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
   setValues: ['钱'],
}
```

#### onSelectItem:
用户转动滚轮停止时,响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数。参数如下：
 * index				被选值所在的层级,从0开始计数
 * selectedIndex		被选值在数组中的索引
 * selectedValue		被选值
这个事件和Picker.prototype.setOptions一起使用,可以实现级联选择,如:
```
{
    cols: ...,
    onSelectItem: function(index, selectedIndex, selectedValue){
        var options = [];// 根据selectedIndex或者selectedValue确定下一级的可选项
        this.setOptions(index + 1, options)
    }
}
```
#### onOkClick
点击"确定按钮"的事件函数,函数会返回一个数组,数组里面是被选值。
回调函数的参数含义如下：
*  values            一个数组,是各个滚轮被选的值
同时回调函数可以有个返回值,如果返回值是false,picker将不关闭,否则会关闭picker。利用这个可以实现选择校验。如果:
```
{
    cols: ...,
    onOkClick: function(values){
        if(values[0] is 错误){        //伪码,表示选项错误
            alert("不可以选择这个选项!");
            //返回false,不准关闭,继续选择
            return false;
        }
    },
}
```

其他api请参照api文档：[使用文档](https://github.com/laden666666/my-picker/blob/master/docs/doc.md)
