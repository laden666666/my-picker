<template>
    <p class="alert"><slot></slot></p>
</template>
<style lang="less" scoped>
@import '../../theme.less';
.alert{
    line-height: 1.6em;
    margin: 1.2em 0;
    padding: 1.5em 1.2em;
    position: relative;
    z-index: 1;
    font-size: 14px;
    color: @font-color;
    background-color: #f8f8f8;
    border-left-color: #f66;
    border-left-width: 4px;
    border-left-style: solid;
}
.alert::before{
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    content: "!";
    left: calc(-1.2em + 4px);
    top: 50%;
    background-color: #f66;
    color: #f8f8f8;
    text-align: center;
    transform: translateY(-50%);
}
</style>
