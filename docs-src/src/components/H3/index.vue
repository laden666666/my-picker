<template>
    <h3 class="h3"><a :v-if="isDocTitle" :name="text" class="h3-anchor"></a><slot></slot></h3>
</template>
<script>
import H from '../H1/H'
export default {
    extends: H,
    data(){
        return {
            level: 3
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../theme.less';
.h3{
    margin: 52px 0 1.2em;
    line-height: 1.2;
    position: relative;
    font-weight: 600;
    color: @font-color;
    position: relative;
}
.h3-anchor{
    position: absolute;
    top: -14px;
}
</style>