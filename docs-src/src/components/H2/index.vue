<template>
    <h2 class="h2"><a :v-if="isDocTitle" :name="text" class="h2-anchor"></a><slot></slot></h2>
</template>
<script>
import H from '../H1/H'
export default {
    extends: H,
    data(){
        return {
            level: 2
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../theme.less';
.h2{
    margin: 45px 0 0.8em;
    padding-bottom: 0.7em;
    border-bottom: 1px solid @border-color;
    font-weight: 600;
    color: @font-color;
    position: relative;
}
.h2-anchor{
    position: absolute;
    top: -10px;
}
</style>