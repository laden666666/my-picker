<template>
    <Doc>
        <H2>0.x系列将不再维护</H2>
        <P><Strong>1.x系列</Strong>兼容<Strong>0.x系列</Strong>的全部功能，建议用户升级到1.x系列，0.x系列将不在维护。</P>

        <H2>升级日志</H2>

        <TimeLine>
            <template slot="time2">
                <H3>v1.0.1</H3>
*
                <Li>优化了3D模式的setOptions函数，使其更新DOM效率更高</Li>
                <Li>提升了在微信内置浏览器的滚轮响应速度，解决了级联形式的闪白问题</Li>
                <Li>修复bug：<A href="https://github.com/laden666666/my-picker/issues/9">#9</A></Li>
            </template>
            <template slot="time1">
                <H3>v1.0.0</H3>
                <Li>提升了移动端的响应速度</Li>
                <Li>优化了显示样式</Li>
                <Li>优化了加载动画</Li>
                <Li>优化了pc端和竖屏的显示形式</Li>
                <Li>增加了滚轮选择功能</Li>
                <Li>增加了玻璃罩的配置功能</Li>
                <Li>修复了PC等不支持<Strong>-webkit-mask-box-image</Strong>属性不显示玻璃罩的问题</Li>
                <Li>修复bug：<A href="https://github.com/laden666666/my-picker/issues/4">#4</A></Li>
            </template>
        </TimeLine>
    </Doc>
</template>
<style scoped>
    h3.h3{
        margin-top: 0;
    }
</style>
