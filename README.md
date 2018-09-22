<h1 align="center">my-picker</h1>
<p class="mydoc_api_npm-info" align="center">
            <a href="https://www.npmjs.com/package/my-picker"><img src="https://img.shields.io/npm/v/my-picker.svg" alt="Version"></a>
            <a href="https://www.npmjs.com/package/my-picker"><img src="https://img.shields.io/npm/dm/my-picker.svg" alt="Downloads"></a>
            <a href="https://www.npmjs.com/package/my-picker"><img src="https://img.shields.io/npm/l/my-picker.svg" alt="License"></a>
        </p>

高仿IOS的PickerView的JavaScript插件，3D形式的滚轮选择器，同时支持最多三级联动的选择效果，支持pc端和移动端两种平台浏览器。支持chrome及移动端默认浏览器、ie（9-11）、火狐浏览器


## 兼容性

3D模式

<center>
    <table cellspacing="1" style="margin: 0 auto;font-size: 14px;background-color: #f9f9f9;color: #036;padding: 3px;border-radius: 4px;border: 1px solid rgba(220, 220, 220, .5);">
        <colgroup width="100" span="6" align="center"></colgroup>
        <tr style="height: 30px;">
            <th align="center">Android</td><th align="center">Firefox</td><th align="center">Chrome</td><th align="center">iPhone</td><th align="center">Edge</td><th align="center">Safari</td>
        </tr>
        <tr style="color: #000;line-height: 28px;font-weight: bold;">
            <td align="center" style="background-color: #60d848">>=5</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td>
        </tr>
    </table>
</center>


非3D模式

<center>
    <table cellspacing="1" style="margin: 0 auto;font-size: 14px;background-color: #f9f9f9;color: #036;padding: 3px;border-radius: 4px;border: 1px solid rgba(220, 220, 220, .5);">
        <colgroup width="100" span="7" align="center"></colgroup>
        <tr style="height: 30px;">
            <th align="center">Android</td><th align="center">Firefox</td><th align="center">Chrome</td><th align="center">IE</td><th align="center">iPhone</td><th align="center">Edge</td><th align="center">Safari</td>
        </tr>
        <tr style="color: #000;line-height: 28px;font-weight: bold;">
            <td align="center" style="background-color: #60d848">>=4.4</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">>=9</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td>
        </tr>
    </table>
</center>


移动端demo效果图:

![Alt](./docs/images/mobileDemo.gif)

pc端demo效果图:

![Alt](./docs/images/mobileDemo.gif)


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



## 使用文档

请参考[doc.md](./docs/doc.md "") 


