<template>
    <ul class="menu-nav_list">
        <li class="menu-nav_item" v-for="(menu1, index1) in menu" :key="index1">
            <a class="menu-nav_link" :class="{'active': '#' + $route.path == menu1.path}" 
                v-if="menu1.path" :href="menu1.path" @click.prevent="goPage(menu1.path)">{{menu1.title}}</a>

            <p class="menu-nav_link" v-else>{{menu1.title}}</p>
            <ul class="menu-nav_title_list" v-if="'#' + $route.path == menu1.path">
                <template v-for="(title, index) in titleList">
                    <li class="menu-nav_title_item"  :key="index" v-if="title.level > 1">
                        <a class="menu-nav_title_link" 
                            :class="{
                                'active': $route.hash == '#' + title.title, 
                                level2: title.level == 2,
                                level3: title.level == 3,
                            }" @click="clickLink(title.title)">- {{title.title}}</a>
                    </li>
                </template>
            </ul>
            <MenuNavList v-if="menu1.children && menu1.children.length" :menu="menu1.children" :titleList="titleList"></MenuNavList>
        </li>
    </ul>
</template>
<script>
let userAgent = window.navigator.userAgent
let isIE = (function () {
    let matches;
    const tridentMap = {
        '4': 8,
        '5': 9,
        '6': 10,
        '7': 11
    };

    matches = userAgent.match(/MSIE (\d+)/i);
    if(matches && matches[1]) {
        return !!+matches[1];
    }
    matches = userAgent.match(/Trident\/(\d+)/i);
    if(matches && matches[1]) {
        return !!tridentMap[matches[1]] || false;
    }
    //we did what we could
    return false;
})();
export default {
    name: 'MenuNavList',
    props: {
        // 同Menu的menu
        menu: {
            type: Array,
            isRequired: true
        },
        // 同Menu的titleList
        titleList: {
            type: Array,
            isRequired: true
        },
    },
    methods: {
        clickLink(titleText){
            try{
                let title = document.querySelector(`[name='${titleText}']`)
                if(title){
                    title.scrollIntoView()
                }
                this.$router.replace(this.$router.history.current.path + '#' + titleText)
            } catch(e){}
        },
        goPage(path){
            if(path === this.$route.path){
                if(path === '#' + this.$route.path){
                    let menu = document.querySelector('#menu')
                    if(menu){
                        menu.scrollIntoView()
                    }
                }
            } else {
                if(isIE){
                    window.app.$destroy()
                    location.assign(location.pathname + path)
                    setTimeout(()=>{
                        location.reload()
                    })
                } else {
                    location.assign(location.pathname + path)
                    this.$nextTick(()=>{
                        window.scrollTo(0, 0)
                    })
                }
                
            }
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../../theme.less';
    .menu-nav_list{
        list-style: none;
        margin: 0 0 0 25px;
        padding: 0;
        font-size: 16px;
    }
    .menu-nav_item{
        margin: 6px 0;
        list-style: none;
    }
    .menu-nav_item a{
        color: #7f8c8d;
        font-size: 16px;
        font-weight: 400;
        overflow: hidden;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: none;
        display: block;
        list-style: none;
    }
    .menu-nav_link{
        font-size: 16px;
        line-height: 1.6em;
        overflow: hidden;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: none;
        display: block;
        list-style: none;
    }
    p.menu-nav_link{
        color: #2c3e50;
        font-weight: 600;
        margin: 1em 0 .5em;
    }
    a.menu-nav_link:hover{
        text-decoration: underline;
    }
    a.menu-nav_link.active{
        color: @main-color;
    }
    .menu-nav_title_item{
        list-style: none;
    }
    a.menu-nav_title_link{
        color: @font-color;
        font-size-adjust: none;
        text-size-adjust: none;
        font-size: 0.85em;
        display: block;
        line-height: 2;
    }
    .menu-nav_title_link:hover{
        color: @main-color;
        text-decoration: underline;
    }
    .menu-nav_title_link.active{
        color: @main-color;
    }
    .menu-nav_title_link.level2{
        padding-left: 15px;
    }
    .menu-nav_title_link.level3{
        padding-left: 30px;
    }
</style>
