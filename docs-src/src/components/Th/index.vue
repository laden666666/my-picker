<template>
    <th class="th"><slot></slot></th>
</template>
<style lang="less" scoped>
    @import '../../theme.less';

    .th{
        margin : 0px ;
        padding : 0px 15px 0px 6px ;
        border: 1px solid @border-color;
        vertical-align : baseline ;
        text-align : left ;
        width : 123px ;
        word-break: break-all;
        background: #f7f7f7;
        white-space: nowrap;
        color: @main-color;
        font-weight: 600;
    }
</style>
