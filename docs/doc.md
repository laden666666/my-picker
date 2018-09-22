<h1 align="center">my-picker</h1>

高仿IOS的PickerView的JavaScript插件，3D形式的滚轮选择器，同时支持最多三级联动的选择效果，支持pc端和移动端两种平台浏览器。支持chrome及移动端默认浏览器、ie（9-11）、火狐浏览器


## 安装

### 浏览器环境

浏览器环境直接导入dist下的**my-picker.js**和**my-picker.css**文件即可



### webpack环境

执行cli命令

```javascript
npm i my-picker -S
```

并在js文件中引用

```javascript
import myPicker form 'my-picker'
import 'my-picker/my-picker.css'
```



## 初始化：
```javascript
new myPicker(option)
```

option是控件的初始化配置，具体配置项有：

|配置项名|类型|默认值|配置项说明|
|----|----|----|----|
|cols|Object | Array|必须配置|可选值列表的配置，是个数组,，数组每项一列，一列的配置项的完整格式为一个json对象，最多支持3列|
|setValues|Array|[]|配置每一列已选择的值。是个数组，索引必须和cols里面的可选值列表的索引一样|
|hasVoice|Boolean|true|是否启动刻度声音。如果值为true，转动滚轮时候，是否可以发出声音。boolean型，默认是true，即要求发出滴答声。|
|title|String|&#39;&#39;|显示的标题。|
|zIndex|Number|100|控件的z-index的属性值。|
|isPerspective|Boolean|随浏览器变化|是否以3D透视显示picker的滚轮。如果为true，picker的滚轮会以3D的形式显示，否则会以一个平面的模式显示。如果浏览器支持3D模式，默认值会优先显示3D模式。|
|fontSize|Number|15|显示的字体大小，只支持数字，单位是px|
|buttons|Array|[&quot;确定&quot;, &quot;取消&quot;]|显示按钮的名称，第一个是按钮是确定，第二个是取消。|
|onSelectItem|Function|无|用户转动滚轮停止时,响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数。|
|onOkClick|Function|无|点击&quot;确定按钮&quot;的事件函数,函数会返回一个数组,数组里面是被选值。|
|onCancelClick|Function|无|点击取消按钮的事件。执行后会关闭picker。|

这里对几个主要配置项做解释


### cols

可选值列表的配置，是个数组，数组每项一列，一列的配置项的完整格式为一个json对象，最多支持3列。如:

```JavaScript
new myPicker({
    cols:[{
        options:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },{
        options:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    }]
})
```

如果cols的参数是一个json，将视为只有一列可选值列表,如:

```javascript
new myPicker({
    cols:{
        prefix: '第'，
        options: ['一', '二', '三', '四', '五'],
        suffix: '章',
    }
})
```

prefix是前缀，suffix是后缀，他们会显示在滚轮两侧。


同时options里面的值可以是一个字符串，也可以是一个json结构。如果是json结构，需要给出显示的key，和其值的key。如:

```javascript
new myPicker({
    cols:{
        labelKey: 'name',
        valueKey: 'name',
        options: [{name: '张三'},{name: '李四'},{name: '王五'}],
    }
})
```

如果如果可选值列表只有一列,且是个字符串数组,可进一步简化配置为:

```javascript
new myPicker({cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']})
```


### setValues

已选择的对象。是个数组,索引必须和cols里面的可选值列表的索引一样。如:

```javascript
new myPicker({
   cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
   setValues: ['钱'],
})
```


### onSelectItem

>
用户转动滚轮停止时,响应的事件。停止的时候会选择一个可选项，这个可选项的索引和值会作为回调传给这个事件的回调函数
}       selectedValue		被选值


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|level|number|被选值所在的层级,从0开始计数|
|selectedIndex|number|被选值在数组中的索引|



```javascript
new myPicker({
    cols: ...,
    onSelectItem: function(index, selectedIndex, selectedValue){
        var options = [];// 根据selectedIndex或者selectedValue确定下一级的可选项
        this.setOptions(index + 1, options)
    }
})
```


### onOkClick

>
点击&quot;确定按钮&quot;的事件函数,函数会返回一个数组,数组里面是被选值。


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|values|any[]|一个数组，对应每个滚轮当前已经选择的值|



```javascript
new myPicker({
    cols: ...,
    onOkClick: function(values){
        if(values[0] is 错误){        //伪码,表示选项错误
            alert("不可以选择这个选项!");
            //返回false,不准关闭,继续选择
            return false;
        }
    },
})
```



## 方法

### 显示隐藏相关api：

#### Picker.prototype.show

new出picker对象后，是隐藏状态，需要调用此接口显示。



#### Picker.prototype.hide

将显示出来的picker隐藏起来。



#### Picker.prototype.close

删除picker，picker将不能再被打开。




### 已选值相关api：

#### Picker.prototype.setOptions

>
设置滚轮的可选值列表
} defaultValue  默认值,如果为空会以当前值作为默认值。如果没有当前值会以第一个值作为默认值


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|滚轮的index,从0开始记录|
|list|any[]|滚轮的可选值列表，是个数组，和cols里面配置的列一样|





#### Picker.prototype.getOptions

>
获取滚轮的可选值列表


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|滚轮的index,从0开始记录|






### 选项列表相关api：

#### Picker.prototype.setValue(index, value)

>
设置滚轮的可选值
} value         设置的值


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|滚轮的index,从0开始记录|





#### Picker.prototype.getValue(index)

>
获取滚轮的值,如果index为空表示获取所有滚轮的值


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|滚轮的index,从0开始记录。如果为空表示获取所有滚轮的值|






