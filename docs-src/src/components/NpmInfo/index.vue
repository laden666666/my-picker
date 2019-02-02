<template>
    <div class="npm_info" :class="{'s-center': center}">
        <a v-if="version" :href="`https://www.npmjs.com/package/${name}`">
            <img :src="`https://img.shields.io/npm/v/${name}.svg`" alt="Version">
        </a>
        <a v-if="downloads" :href="`https://www.npmjs.com/package/${name}`">
            <img :src="`https://img.shields.io/npm/dm/${name}.svg`" alt="Downloads">
        </a>
        <a v-if="license" :href="`https://www.npmjs.com/package/${name}`">
            <img :src="`https://img.shields.io/npm/l/${name}.svg`" alt="License">
        </a>
            
    </div>
</template>
<script>
export default {
    props: {
        // npm库的名字
        name: {
            type: String,
            required: true
        },
        // 是否显示npm库的版本信息
        version: {
            type: Boolean,
            default: false
        },
        // 是否显示npm库的没月下载次数
        downloads: {
            type: Boolean,
            default: false
        },
        // 是否显示npm库的所使用的协议
        license: {
            type: Boolean,
            default: false
        },
        // 是否居中显示
        center: {
            type: Boolean,
            default: false
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../theme.less';
.s-center{
    text-align: center;
}
</style>
