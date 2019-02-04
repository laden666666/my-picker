<h2 align="center">my-picker</h2>
A picker that mimics the IOS PickerView JavaScript. It offers 3D selectors and supports up to three levels of linkage. It supports both a PC-side browser and a mobile browser.


## Installation

### Browser

Directly import the **my-picker.js** and **my-picker.css** file under dist in the browser.



### webpack

Executive cli

```javascript
npm i my-picker -S
```

Referenced in the js file

```javascript
import myPicker form 'my-picker'
import 'my-picker/dist/my-picker.css'
```



## Start
```javascript
new myPicker(option)
```

The option is an initial configuration. The specific configuration items are as follows:


||||||||||

||cols||Object or Array||required||The configuration of the optional list. It is an array. Each column of the array has a complete format of a json object and supports up to 3 columns.||

||setValues||Array||[]||Configure the value of each column selected. Is an array, the index must be the same as the index of the list of optional values ​​in cols||

||hasVoice||Boolean||true||Whether to use sound. If the value is true, it is possible to make a sound when the wheel is rotated. Boolean type, the default is true. ||

||title||String||&#39;&#39;||Displayed title. ||

||zIndex||Number||100||The z-index attribute value of the control. ||

||isPerspective||Boolean||Change with browser||Whether to display the picker&#39;s scroll wheel in 3D perspective. If true, the picker&#39;s scroll wheel will be displayed in 3D, otherwise it will be displayed in a flat mode. If the browser supports 3D mode, the default value will give priority to 3D mode. ||

||fontSize||Number||15||Display font size, only supports numbers, the unit is &#39;px&#39;||

||buttons||Array||[&quot;OK&quot;, &quot;Cancel&quot;]||Displays the name of the button, the first is that the button is OK, and the second is canceled. ||

||onSelectItem||Function||no||The event that responded when the user turned the wheel to stop. When you stop, you will choose an option. The index and value of this option will be passed as a callback to the callback function of this event.             ||

||onOkClick||Function||no||Click on the &quot;OK button&quot; event, the function will return an array, the selected value inside the array.             ||

||onCancelClick||Function||no||Click the event of the Cancel button. The picker will be closed after execution. ||

Several main configuration items to explain


### cols

The configuration of the optional list. It is an array. Each column of the array has a complete format of a json object and supports up to 3 columns.Such as:

```JavaScript
new myPicker({
    cols:[{
        options:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },{
        options:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
})
```

If the argument to cols is a JSON, the list of optional values has only one column, such as:

```javascript
new myPicker({
    cols:{
        prefix: 'chapter'，
        options: ['1', '2', '3', '4', '5'],
        suffix: '.',
    }
})
```

&#39;prefix&#39; is the prefix, &#39;suffix&#39; is the suffix, they will be displayed on both sides of the wheel.


At the same time, the value in the option can be a string, or it can be a JSON structure. If it is a JSON structure, you need to give the key of the display, and the keys of its value, such as:

```javascript
new myPicker({
    cols:{
        labelKey: 'name',
        valueKey: 'name',
        options: [{name: 'Tom'},{name: 'John'},{name: 'Smith'}],
    }
})
```

If the list of optional values has only one column and is an array of strings, the configuration can be further simplified as:

```javascript
new myPicker({cols: ['Tom', 'John', 'Smith']})
```


### setValues

The selected object is an array, and the index must be the same as the index of the list of optional values in the cols. :

```javascript
new myPicker({
   cols: ['Tom', 'John', 'Smith'],
   setValues: ['Tom'],
})
```


### onSelectItem

>
The event that responds when the user rolls the wheel to stop. When you stop, you will choose an option. The index and value of this option will be passed as a callback to the callback function of this event.


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|level|number|The level at which the selected value is located, counting from 0||selectedIndex|number|The index of the selected value in the array||selectedValue|any|Selected value|



```javascript
new myPicker({
    cols: ...,
    onSelectItem: function(index, selectedIndex, selectedValue){
        // Determine the next level of options based on "selectedIndex" or "selectedValue"
        var options = [];
        this.setOptions(index + 1, options)
    }
})
```


### onOkClick

>
Click on the &quot;OK button&quot; event function, the function will return an array, the selected value inside the array.


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|values|any[]|The value currently selected by each wheel|



```javascript
new myPicker({
    cols: ['Not selected', 'Tom', 'John', 'Smith'],
    onOkClick: function(values){
        if(values[0] == 'Not selected'){
            alert('Must choose a value');
            // return false, not allowed to close, continue to choose
            return false;
        }
    },
})
```



## Methods

### Show hidden related apis:

#### Picker.prototype.show

After the picker object is new, it is hidden and needs to be called to display this interface.



#### Picker.prototype.hide

Hide the displayed picker.



#### Picker.prototype.close

Deleting the picker, the picker will no longer be opened.




### Selected value related API:

#### Picker.prototype.setOptions

>
Set the optional list of values for the scroll wheel


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|The index of the scroll wheel, starting from 0||list|any[]|The list of optional values for the scroll wheel is an array, just like the column configured in cols.||defaultValue|any|The default value, if empty, will use the current value as the default. If there is no current value, the first value will be used as the default value.|





#### Picker.prototype.getOptions

>
Get the list of optional values for the scroll wheel


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|The index of the scroll wheel, starting from 0|






### 选项列表相关api：

#### Picker.prototype.setValue(index, value)

>
Set the optional value of the wheel


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|The index of the scroll wheel, starting from 0||value|any|Value|





#### Picker.prototype.getValue(index)

>
Get the value of the scroll wheel. If index is empty, it means to get the value of all the scroll wheels.


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|index|number|The index of the scroll wheel is recorded from 0. If it is empty, it means to get the value of all the wheels.|






