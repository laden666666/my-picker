<template>
    <p class="p"><slot></slot></p>
</template>
<style lang="less" scoped>
@import '../../theme.less';
.p{
    line-height: 1.6em;
    margin: 1.2em 0 -1.2em;
    padding-bottom: 1.2em;
    position: relative;
    z-index: 1;
    font-size: 14px;
    color: @font-color;
}
</style>
