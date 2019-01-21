<template>
    <Doc>
        <H1>Vue的Demo展示——Demo</H1>
        <P>使用<Strong>Demo控件</Strong>展示一个Demo，里面包含一个真实例子，以及生成例子的源代码。</P>
        <Demo :demo="Demo" title="Vue的Demo展示">
            <div >使用Demo生成一个Vue语言的实例展示。</div>
        </Demo>

        <H2>自动读取例子源代码</H2>
        <P>Demo如果定义在<Strong>/src/demo目录</Strong>里面，通过Loader，框架会将源码自动地取出来。</P>
        <Demo :demo="DemoAutoCode" title="自动取出源代码">
            <div >使用Demo生成一个Vue语言的实例展示。</div>
        </Demo>

        <H2>Props</H2>
        <Props type="h3" :data="`{
            // 示例的标题
            title: {
                type: String,
                default: ''
            },
            // 是否垂直显示
            vertical: {
                type: Boolean,
                default: false
            },
            // 是一个Vue的ComponentOptions，用于生成例子
            demo: {
                type: Object,
                required: true,
            },
            // 生成该示例的代码，用于展示给用户
            code: {
                type: String,
                default: ''
            },
            // 展示代码的语言
            lang: {
                type: String,
                default: 'html'
            },
        }`"></Props>

        <H2>Slot</H2>
        <Instructions type="h3" :data="[{
            name: 'deflaut',
            describe: '用于插入说明例子细节',
        }]"></Instructions>
    </Doc>
</template>
<script>
import Demo from "../../demo/Advanced/Demo/Demo.vue";
import DemoAutoCode from "../../demo/Advanced/Demo/DemoAutoCode.vue";
export default {
    data(){
        return {
            Demo,
            DemoAutoCode,
        }
    }
}
</script>
