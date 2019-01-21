<template>
    <Doc>
        <!-- 不用设置code属性，自动导出源码文档 -->
        <Demo :demo="DemoExample"></Demo>
    </Doc>
</template>
<script>
import DemoExample from './DemoExample'
export default {
    data: ()=>{
        return {DemoExample}
    },
}
</script>
