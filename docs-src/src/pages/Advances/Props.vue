<template>
    <Doc>
        <H1>Vue的props说明书——Props</H1>
        <P>使用<Strong>Props</Strong>控件做一个Vue组件Props的说明书，Props特点是它是基于Vue的源码生成说明书，如果不希望采用Vue的源码方式生成说明书，可以使用Instructions代替。</P>
        <Demo :demo="Props" title="Vue的props说明书" :vertical="true">
            <div >Vue的props说明书。</div>
        </Demo>

        <H2>Props的标题模式</H2>
        <P>属性说明书默认是以table形式展现，除此之外还会以<A href="#/Base#文档标题">H3</A>标题的形式展现。</P>
        <Demo :demo="PropsH3" title="标题模式">
            <div >属性说明书标题模式。</div>
        </Demo>

        <H2>Props</H2>
        <Props type="h3" :data="`{
            // 一个属性的说明书，例如：
            // [{
            //     name: '属性名',
            //     type: 'Number', 
            //     default: '\'1\'', 
            //     required: true, 
            //     describe: '说明', 
            //     demo: '示例代码'
            // },]
            data: {
                type: Array,
                required: true
            },
            // 属性说明展现的形式，支持表格（table）和标题（h3）形式
            type: {
                type: String,
                default: 'table',
            }
        }`"></Props>

        <H2>Slots</H2>
        <P>与<Strong>Instructions</Strong>控件类似，<Strong>Props</Strong>会根据data属性中的name配置动态生成slot，slot名字和vue控件prop的名字相同</P>

    </Doc>
</template>
<script>
import Props from '../../demo/Advanced/Props/Props.vue';
import PropsH3 from '../../demo/Advanced/Props/PropsH3.vue';
export default {
    data(){
        return {
            Props,
            PropsH3,
        }
    }
}
</script>
