<template>
    <Doc>
        <H1>TimeLine</H1>
        <P>使用<Strong>TimeLine</Strong>控件完成对一系列信息进行时间排序时，垂直地展示。。</P>
        <Demo :demo="TimeLine" title="Vue的props说明书" :vertical="true">
            <div >Vue的props说明书。</div>
        </Demo>

        <H2>Slots</H2>
        <Instructions type="h3" :data="[{
            name: 'timex',
            describe: '用于插入每个时间点的内容，x是一个数字，用于给各个时间排序',
        }]"></Instructions>
    </Doc>
</template>
<script>
import TimeLine from '../../demo/Advanced/TimeLine/TimeLine';
export default {
    data(){
        return {
            TimeLine
        }
    }
}
</script>
