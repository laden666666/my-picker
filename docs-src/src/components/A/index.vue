<template>
    <a class="a" :href="href" :target="href && (href.startsWith('http') || href.startsWith('//')) ? '_blank' : '_self'"><slot></slot></a>
</template>
<script>
export default {
    props: {
        href: {
            type: String,
            required: true
        },
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
