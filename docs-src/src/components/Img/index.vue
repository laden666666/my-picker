<template>
    <img :src="src" class="img">
</template>
<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        }
    },
}
</script>
<style lang="less" scoped>
    @import '../../theme.less';
    .img {
        max-width: 100%;
        margin: 10px 0;
    }
</style>
