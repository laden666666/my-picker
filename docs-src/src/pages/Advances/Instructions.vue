<template>
    <Doc>
        <H1>属性说明书——Instructions</H1>
        <P>使用<Strong>Instructions</Strong>控件做一组属性说明书。</P>
        <Demo :demo="Instructions" title="属性说明书">
            <div >属性说明书。</div>
        </Demo>

        <H2>Instructions的标题模式</H2>
        <P>属性说明书默认是以table形式展现，除此之外还会以<A href="#/Base#文档标题">H3</A>标题的形式展现。</P>
        <Demo :demo="InstructionsH3" title="标题模式">
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
            // 其中name和describe是必须设置项
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
        <P><Strong>Instructions</Strong>控件会根据data属性中的name配置动态生成slot，如下例：</P>
        <Demo :demo="InstructionsSlot" title="slot">
            <div >根据data属性中的name配置动态生成slot</div>
        </Demo>

    </Doc>
</template>
<script>
import Instructions from "../../demo/Advanced/Instructions/Instructions";
import InstructionsH3 from "../../demo/Advanced/Instructions/InstructionsH3";
import InstructionsSlot from "../../demo/Advanced/Instructions/InstructionsSlot";
export default {
    data(){
        return {
            Instructions,
            InstructionsH3,
            InstructionsSlot,
        }
    }
}
</script>
