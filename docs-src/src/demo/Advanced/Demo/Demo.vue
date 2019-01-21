<template>
    <Doc>
        <Demo :demo="demo" :code="code" title="例子的标题">
            <!-- 使用slot=desc定义一段说明语句 -->
            <P >例子的说明</P>
        </Demo>
    </Doc>
</template>
<script>
import DemoExample from './DemoExample'
export default {
    data: ()=>{
        return {
            demo: {
                template: '<Doc><P>test</P></Doc>',
            },
            code: 
`<Doc>
    <P>test</P>
</Doc>`
        }
    },
}
</script>
