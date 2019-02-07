<template>
    <a class="a" :href="href" @click.stop.prevent="goLink"><slot></slot></a>
</template>
<script>
import {goLink} from './goLink'
export default {
    props: {
        href: {
            type: String,
            required: true
        },
    },
    methods: {
        goLink($event){
            goLink(this.href, this.$router)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../theme.less';

.a{
    color: @main-color;
    font-weight: 500;
    word-spacing: .05rem;
    text-decoration: underline;
    letter-spacing: 0;
    text-decoration-style: solid;
}
</style>
