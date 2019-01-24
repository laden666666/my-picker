<template>
    <div class="table">
        <table class="table_table"><slot></slot></table>
    </div>
</template>
<style lang="less" scoped>
@import '../../theme.less';
.table{
    overflow-x: auto;
    border-top: 1px solid #eee ;
}
.table_table{
    margin : 15px 0px 0px ;
    padding : 0px ;
    border : 1px solid @border-color ;
    border-collapse : collapse ;
    width : 100% ;
    color : rgb(0, 0, 0) ;
    font-size : 14px ;
    background-color : rgb(253, 252, 248) ;
    margin-top: -1px;
    margin-bottom: 8px;
}
</style>
