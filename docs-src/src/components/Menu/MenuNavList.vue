<template>
    <ul class="menu-nav_list">
        <li class="menu-nav_item" v-for="(menu1, index1) in menu" :key="index1">
            <a class="menu-nav_link" :class="{'active': '#' + $route.path == menu1.path}" 
                v-if="menu1.path" :href="menu1.path" @click="goTop(menu1.path)">{{menu1.title}}</a>

            <p class="menu-nav_link" v-else>{{menu1.title}}</p>
            <ul class="menu-nav_title_list" v-if="'#' + $route.path == menu1.path">
                <template v-for="(title, index) in titleList">
                    <li :key="index" v-if="title.level > 1">
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
        goTop(path){
            if(path === '#' + this.$route.path){
                let menu = document.querySelector('#menu')
                if(menu){
                    menu.scrollIntoView()
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
        margin: 0 0 0 15px;
        padding: 0;
    }
    .menu-nav_item{
        margin: 6px 0;
    }
    .menu-nav_item a{
        color: @font-color;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: none;
        display: block;
        list-style: none;
    }
    p.menu-nav_link{
        color: @font-color;
        font-size: 14px;
        font-weight: 700;
        overflow: hidden;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: none;
        display: block;
        list-style: none;
        line-height: 2;
    }
    a.menu-nav_link{
        color: @font-color;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: none;
        display: block;
        list-style: none;
        line-height: 1.8;
    }
    a.menu-nav_link:hover{
        text-decoration: underline;
    }
    a.menu-nav_link.active{
        color: @main-color;
    }
    a.menu-nav_title_link{
        font-size-adjust: none;
        text-size-adjust: none;
        font-size: 12px;
        display: block;
        line-height: 1.8;
    }
    .menu-nav_title_link:hover{
        color: @main-color;
        text-decoration: underline;
    }
    .menu-nav_title_link.active{
        color: @main-color;
    }
    .menu-nav_title_link.level2{
        padding-left: 10px;
    }
    .menu-nav_title_link.level3{
        padding-left: 20px;
    }
</style>
