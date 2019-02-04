<doc>
    <title>my-picker</title>
    <npm-info version downloads license name="my-picker"></npm-info>

    <p>高仿IOS的PickerView的JavaScript插件，3D形式的滚轮选择器，同时支持最多三级联动的选择效果，支持pc端和移动端两种平台浏览器。支持chrome及移动端默认浏览器、ie（10-11）、火狐浏览器。</p>

    <h3>功能</h3>
    <li>0、3D形式的滚轮选择器，带有透视效果</li>
    <li>1、选择器的前缀与后缀</li>
    <li>2、级联选择器</li>
    <li>3、提供选择音效，更接近原生控件</li>
    <li>4、支持手机和pc</li>

    <h2>使用文档</h2>
    <p>请参考<a href="https://laden666666.github.io/my-picker/">https://laden666666.github.io/my-picker/</a></p>

    <h2>源码</h2>
    <p><a href="https://github.com/laden666666/my-picker">github</a>，<a href="https://gitee.com/laden666666/my-picker">码云</a></p>

    <h2>兼容性</h2>
    <p>3D模式</p>
    <browser-list Android=">=5" Firefox Chrome iPhone Edge Safari/>

    <p>非3D模式</p>
    <browser-list Android=">=4.4" Firefox Chrome IE=">=10" iPhone Edge Safari/>

    <p>移动端demo效果图:</p>
    <img src="./doc-jsx/images/mobileDemo.gif"/>

    <p>pc端demo效果图:</p>
    <img src="./doc-jsx/images/pcDemo.gif"/>

    <h2>安装</h2>
    <h3>浏览器环境</h3>
    <p>浏览器环境直接导入dist下的**my-picker.js**和**my-picker.css**文件即可，也可以使用npm提供的cdn：</p>
    <code lang="html">{
`<link rel="stylesheet" href="//unpkg.com/my-picker/dist/my-picker.css">
<script src="//unpkg.com/iview/dist/my-picker.min.js"><\/script></script>`
    }</code>

    
    <h3>webpack环境</h3>
    <p>执行cli命令</p>
    <code lang="javascript">{
`npm i my-picker -S`
    }</code>
    <p>并在js文件中引用</p>
    <code lang="javascript">{
`import myPicker form 'my-picker'
import 'my-picker/my-picker.css'`
    }</code>
</doc>
