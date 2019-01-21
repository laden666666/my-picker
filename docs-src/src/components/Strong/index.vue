<template>
    <strong class="strong"><slot></slot></strong>
</template>
<style lang="less" scoped>
@import '../../theme.less';
.strong{
    background-color: #f8f8f8;
    border-radius: 2px;
    color: @font-color;
    margin: 0 2px;
    padding: 3px 5px;
    white-space: pre-wrap;
    font-size: 1em;
}
</style>
