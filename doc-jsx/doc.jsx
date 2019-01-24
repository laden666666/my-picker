
<doc>
    <title>my-picker</title>
    <p>A picker that mimics the IOS PickerView JavaScript. It offers 3D selectors and supports up to three levels of linkage. It supports both a PC-side browser and a mobile browser.</p>

    <h2>Installation</h2>
    <h3>Browser</h3>
    <p>Directly import the **my-picker.js** and **my-picker.css** file under dist in the browser.</p>
    <h3>webpack</h3>
    <p>Executive cli</p>
    <code lang="javascript">{
`npm i my-picker -S`
    }</code>
    <p>Referenced in the js file</p>
    <code lang="javascript">{
`import myPicker form 'my-picker'
import 'my-picker/dist/my-picker.css'`
    }</code>

    <h2>Start</h2>
    <code lang="javascript">{
`new myPicker(option)`}</code>
    <p>The option is an initial configuration. The specific configuration items are as follows:</p>
    <table>
        <tr>
            <th>Configuration</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>cols</td>
            <td>Object or Array</td>
            <td>required</td>
            <td>The configuration of the optional list. It is an array. Each column of the array has a complete format of a json object and supports up to 3 columns.</td>
        </tr>
        <tr>
            <td>setValues</td>
            <td>Array</td>
            <td>[]</td>
            <td>Configure the value of each column selected. Is an array, the index must be the same as the index of the list of optional values ​​in cols</td>
        </tr>
        <tr>
            <td>hasVoice</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Whether to use sound. If the value is true, it is possible to make a sound when the wheel is rotated. Boolean type, the default is true. </td>
        </tr>
        <tr>
            <td>title</td>
            <td>String</td>
            <td>''</td>
            <td>Displayed title. </td>
        </tr>
        <tr>
            <td>zIndex</td>
            <td>Number</td>
            <td>100</td>
            <td>The z-index attribute value of the control. </td>
        </tr>
        <tr>
            <td>isPerspective</td>
            <td>Boolean</td>
            <td>Change with browser</td>
            <td>Whether to display the picker's scroll wheel in 3D perspective. If true, the picker's scroll wheel will be displayed in 3D, otherwise it will be displayed in a flat mode. If the browser supports 3D mode, the default value will give priority to 3D mode. </td>
        </tr>
        <tr>
            <td>fontSize</td>
            <td>Number</td>
            <td>15</td>
            <td>Display font size, only supports numbers, the unit is 'px'</td>
        </tr>
        <tr>
            <td>buttons</td>
            <td>Array</td>
            <td>["OK", "Cancel"]</td>
            <td>Displays the name of the button, the first is that the button is OK, and the second is canceled. </td>
        </tr>
        <tr>
            <td>onSelectItem</td>
            <td>Function</td>
            <td>no</td>
            <td>The event that responded when the user turned the wheel to stop. When you stop, you will choose an option. The index and value of this option will be passed as a callback to the callback function of this event.
            </td>
        </tr>
        <tr>
            <td>onOkClick</td>
            <td>Function</td>
            <td>no</td>
            <td>Click on the "OK button" event, the function will return an array, the selected value inside the array.
            </td>
        </tr>
        <tr>
            <td>onCancelClick</td>
            <td>Function</td>
            <td>no</td>
            <td>Click the event of the Cancel button. The picker will be closed after execution. </td>
        </tr>
    </table>

    <p>Several main configuration items to explain</p>
    <h3>cols</h3>
    <p>The configuration of the optional list. It is an array. Each column of the array has a complete format of a json object and supports up to 3 columns.Such as:</p>
    <code lang="JavaScript">{
`new myPicker({
    cols:[{
        options:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },{
        options:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
})`
    }</code>
    <p>If the argument to cols is a JSON, the list of optional values has only one column, such as:</p>
    <code lang="javascript">{
`new myPicker({
    cols:{
        prefix: 'chapter'，
        options: ['1', '2', '3', '4', '5'],
        suffix: '.',
    }
})`}</code>
    <p>'prefix' is the prefix, 'suffix' is the suffix, they will be displayed on both sides of the wheel.</p>

    <p>At the same time, the value in the option can be a string, or it can be a JSON structure. If it is a JSON structure, you need to give the key of the display, and the keys of its value, such as:</p>

    <code lang="javascript">{
`new myPicker({
    cols:{
        labelKey: 'name',
        valueKey: 'name',
        options: [{name: 'Tom'},{name: 'John'},{name: 'Smith'}],
    }
})`}</code>

    <p>If the list of optional values has only one column and is an array of strings, the configuration can be further simplified as:</p>
    <code>{
        `new myPicker({cols: ['Tom', 'John', 'Smith']})`}</code>

    <h3>setValues</h3>
    <p>The selected object is an array, and the index must be the same as the index of the list of optional values in the cols. :</p>
    <code>{
        `new myPicker({
   cols: ['Tom', 'John', 'Smith'],
   setValues: ['Tom'],
})`}</code>

    <h3>onSelectItem</h3>
    <api>{
`
* The event that responds when the user rolls the wheel to stop. When you stop, you will choose an option. The index and value of this option will be passed as a callback to the callback function of this event.
* @param {number}  level				The level at which the selected value is located, counting from 0
* @param {number}  selectedIndex		The index of the selected value in the array
* @param {any}       selectedValue		Selected value
`}</api>
    <code>{
        `new myPicker({
    cols: ...,
    onSelectItem: function(index, selectedIndex, selectedValue){
        // Determine the next level of options based on "selectedIndex" or "selectedValue"
        var options = [];
        this.setOptions(index + 1, options)
    }
})`}</code>

    <h3>onOkClick</h3>
    <api>{
`
* Click on the "OK button" event function, the function will return an array, the selected value inside the array.
* @param {any[]} values         The value currently selected by each wheel
* @returns {boolean}            If the return value is false, the selector does not close, otherwise the selector will be closed
`}</api>
    <code>{
        `new myPicker({
    cols: ['Not selected', 'Tom', 'John', 'Smith'],
    onOkClick: function(values){
        if(values[0] == 'Not selected'){
            alert('Must choose a value');
            // return false, not allowed to close, continue to choose
            return false;
        }
    },
})`}</code>

    <h2>Methods</h2>
    <h3>Show hidden related apis:</h3>

    <h4>Picker.prototype.show</h4>
    <p>After the picker object is new, it is hidden and needs to be called to display this interface.</p>

    <h4>Picker.prototype.hide</h4>
    <p>Hide the displayed picker.</p>

    <h4>Picker.prototype.close</h4>
    <p>Deleting the picker, the picker will no longer be opened.</p>

    <h3>Selected value related API:</h3>
    <h4>Picker.prototype.setOptions</h4>
    <api>{
`* Set the optional list of values for the scroll wheel
* @param {number} index    The index of the scroll wheel, starting from 0
* @param {any[]} list      The list of optional values for the scroll wheel is an array, just like the column configured in cols.
* @param {any} defaultValue  The default value, if empty, will use the current value as the default. If there is no current value, the first value will be used as the default value.`}</api>

    <h4>Picker.prototype.getOptions</h4>
    <api>{
`* Get the list of optional values for the scroll wheel
* @param {number} index    The index of the scroll wheel, starting from 0
* @returns {any[]}         List of optional values for the scroll wheel`}</api>

    <h3>选项列表相关api：</h3>
    <h4>Picker.prototype.setValue(index, value)</h4>
    <api>{
`* Set the optional value of the wheel
* @param {number} index    The index of the scroll wheel, starting from 0
* @param {any} value         Value`}</api>

    <h4>Picker.prototype.getValue(index)</h4>
    <api>{
`* Get the value of the scroll wheel. If index is empty, it means to get the value of all the scroll wheels.
* @param {number} index    The index of the scroll wheel is recorded from 0. If it is empty, it means to get the value of all the wheels.
* @returns {any}             Value`}</api>
</doc>
