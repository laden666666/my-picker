<template>
    <Doc>
        <H1>源代码展示控件——Code</H1>
        <P>使用<Strong>Code</Strong>标签先显示源代码。</P>
        <Demo :demo="Code" title="源代码展示控件">
            <div >使用Code可以标签展示源代码。</div>
        </Demo>

        <H2>按钮形式</H2>
        <P>设置<Strong>onlyBtn</Strong>属性，Code控件将仅展示一个按钮，而不直接展示源码。</P>
        <Demo :demo="CodeOnlyBtn" title="按钮形式">
            <div >设置<Strong>onlyBtn</Strong>属性。</div>
        </Demo>

        <H2>Props</H2>
        <Props type="h3" :data="`{
            // 展示代码的语言
            lang: {
                type: String,
                default: 'javascript'
            },
            // 只渲染一个展示代码的按钮，而不直接显示代码
            onlyBtn: {
                type: Boolean,
                default: false
            },
            // 源代码
            code: {
                type: String,
                required: true
            }
        }`"></Props>
    </Doc>
</template>
<script>
import Code from '../../demo/Advanced/Code/Code';
import CodeOnlyBtn from "../../demo/Advanced/Code/CodeOnlyBtn";
export default {
    data(){
        return {
            Code,
            CodeOnlyBtn,
        }
    }
}
</script>
