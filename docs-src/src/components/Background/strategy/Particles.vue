<template>
    <div class="background-particles">
        <vue-particles class="particles"
            color="#ffffff"
            :particleOpacity="0.7"
            linesColor="#ffffff"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="5"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="false"
            hoverMode="grab"
            :clickEffect="false"
            clickMode="push"></vue-particles>
    </div>
</template>
<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
    
}
</script>

<style lang="less" scoped>
@import '../../../theme.less';
.background-particles {
    background-color: @bg-color1;
    position: absolute;
    width: 100%;
    height: 100%;
}
.particles{
    width: 100%;
    height: 100%;
}
</style>