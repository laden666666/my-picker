<template>
    <div id="background">
        <component :is="component"></component>
        <slot></slot>
    </div>
</template>
<script>

import background from 'background'

export default {
    // props: {
    //     type: {
    //         type: String,
    //         default: 'BackgroundColor'
    //     }
    // },
    name: 'Background',
    data(){
        // let component;
        // switch (this.type) {
        //     case 'BackgroundColor':
        //         component = ()=>import('./strategy/BackgroundColor.vue')
        //         break;
        //     default:
        //         break;
        // }
        return {
            component: background
        }
    }
}
</script>

<style>
.background {
    position: relative;
    width: 100%;
}
</style>