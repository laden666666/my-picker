<doc>
    <title>my-picker</title>
    <npm-info version downloads license name="my-picker"></npm-info>

    <p>A picker that mimics the IOS PickerView JavaScript. It offers 3D selectors and supports up to three levels of linkage. It supports both a PC-side browser and a mobile browser.<a href="https://laden666666.github.io/my-picker/">demo</a></p>

    <h3>Features</h3>

    <li>Roller selector in the form of 0, 3D with perspective effect</li>
    <li>1. The prefix and suffix of the selector</li>
    <li>2, cascade selector</li>
    <li>3, provide selection sound, closer to native controls</li>
    <li>4, support mobile phones and pc</li>

    <h2>Source</h2>
    <p><a href="https://github.com/laden666666/my-picker">github</a>，<a href="https://gitee.com/laden666666/my-picker">码云</a></p>

    <h2>Compatibility</h2>
    <p>3D mode</p>
    <browser-list Android=">=5" Firefox Chrome iPhone Edge Safari/>

    <p>Non-3D mode</p>
    <browser-list Android=">=4.4" Firefox Chrome IE=">=9" iPhone Edge Safari/>

    <p>Effect chart (mobile phone):</p>
    <img src="./doc-jsx/images/mobileDemo.gif"/>

    <p>Effect chart (PC):</p>
    <img src="./doc-jsx/images/pcDemo.gif"/>

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
import 'my-picker/my-picker.css'`
    }</code>

    <h2>Documents</h2>
    <p>Please refer to <a href="./docs/doc.md">doc.md</a></p>
</doc>
