<template>
    <tr class="tr"><slot></slot></tr>
</template>
<style lang="less" scoped>
    @import '../../theme.less';
    .tr{
        margin : 0px ;
        padding : 0px ;
        border : 0px ;
        background-color : rgb(255, 255, 255) ;
    }
    .tr:nth-child(odd){
        background-color : rgb(245, 245, 245) ;
    }
    .tr:nth-child(1){
        background-color : rgb(63, 63, 63);
    }
</style>
