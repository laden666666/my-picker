<template>
    <td class="td"><slot></slot></td>
</template>
<style lang="less" scoped>
    @import '../../theme.less';

    .td{
        line-height: 1.5;
        margin : 0px ;
        padding : 3px 15px 3px 6px ;
        border: 1px solid @border-color;
        vertical-align : text-top ;
        word-break: normal;
        font-size: 12px;
        color: @font-color;
    }
</style>
