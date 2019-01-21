<template>
    <div class="doc">
        <slot></slot>
    </div>
</template>
<script>
export default {
    inject: ['clear'],
    name: 'Doc',
    created(){
        if( this.$parent.$parent.$vnode.componentOptions.tag === 'Menu' ){
            this.clear()
        }
    }
}
</script>

<style lang="less" scoped>
    @import '../../theme.less';
    .doc{
        margin: 0 auto;
        max-width: 100%;
        padding: 5px 30px 40px;
        position: relative;
        line-height: 1.6em;
        padding-bottom: 1.2em;
        position: relative;
        z-index: 1;
        font-size: 16px;
        color: @font-color;
    }
    .doc > br{
        
    }
    
    @media screen and (max-width: @phone-width) {
        .doc{
            padding: 5px 15px 40px;
        }
    }
</style>
