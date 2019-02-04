<template>
    <div class="menu" :class="{close: showToggle}">

        <!-- 手机模式关闭菜单的弹层 -->
        <div class="menu-aside_mark" @click="toggle"></div>

        <!-- 侧拉菜单 -->
        <aside class="menu-aside" :class="{fixed: fixed}">
            <div class="menu-nav">
                <MenuNavList :menu="menu" :titleList="titleList"></MenuNavList>
            </div>
            <!-- 菜单显示隐藏的切换按钮 -->
            <div class="menu-toggle">
                <svg @click="toggle" class="menu-toggle_btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 128l0 128 1024 0 0-128-1024 0zm0 380.16l0 128 1024 0 0-128-1024 0zm0 384l0 128 1024 0 0-128-1024 0z"></path>
                </svg>
            </div>
        </aside>
        <!-- 主要内容 -->
        <div class="menu-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import MenuNavList from './MenuNavList'
import debounce from 'lodash.debounce'

let cacheTitleDom
export default {
    props: {
        // 菜单信息，是一个数组，具体配置如下：
        // 数组中，属性path是链接地址；title是链接的名称；children下一级链接，最多支持两级链接。如：
        // [{
        //     path : '/',
        //     title : '一级链接',
        //     children :[
        //         {
        //             path: '/#'
        //             title : '二级链接',
        //         },
        //     ]
        // }],
        menu: {
            type: Array,
            isRequired: true
        },
    },
    provide(){
        return {
            clear: ()=>{
                this.titleList = []
                cacheTitleDom = null
            },
            setTitle: (level, title)=>{
                this.titleList.push({
                    level,
                    title,
                })
            }
        }
    },
    data() {
        return {
            fixed: false,
            showToggle: false,
            titleList: [],
        }
    },
    methods:{
        toggle(){
            this.showToggle = !this.showToggle
        },
    },
    mounted(){
        let top = this.$el.getBoundingClientRect().top
        let handleHash = debounce(()=>{
            if(!cacheTitleDom){
                cacheTitleDom = []
                this.titleList.forEach(item=>{
                    try{
                        let title = document.querySelector(`[name='${item.title}']`)
                        if(title){
                            cacheTitleDom.push(title)
                        }
                    } catch(e){}
                })
            }

            if(!cacheTitleDom.length || window.scrollY <= top){
                this.$router.replace(this.$router.history.current.path)
            } else {
                for(let title of cacheTitleDom){
                    if(title && title.getBoundingClientRect().top >= 0){
                        this.$router.replace(this.$router.history.current.path + '#' + title.getAttribute('name'))
                        break ;
                    }
                }
            }
        }, 500, {maxWait: 500})

        let scrollHandle = ()=> {
            let rect = this.$el.getBoundingClientRect()
            if(rect.top <= 0){
                this.fixed = true
            } else {
                this.fixed = false
            }

            handleHash()
        }
        window.addEventListener('scroll', scrollHandle, {
            passive: true
        })
        this.$once('hook:beforeDestroy', function () {
            window.removeEventListener('scroll', scrollHandle, {
                passive: true
            })
        })

        if(this.$route.hash){
            try{
                let title = document.querySelector(`[name='${this.$route.hash.substr(1)}']`)
                if(title){
                    title.scrollIntoView()
                }
            } catch(e){console.log(e)}
        } else if(this.$route.path != '/'){
            let title = document.querySelector(`#menu`)
            if(title){
                title.scrollIntoView()
            }
        }
        let rect = this.$el.getBoundingClientRect()
        if(rect.top <= 0){
            this.fixed = true
        } else {
            this.fixed = false
        }
    },
    components: {
        MenuNavList
    },
}
</script>

<style lang="less" scoped>
    @import '../../theme.less';
    .menu{
        height: 100vh;
        width: 100%;    
        position: relative;
    }
    .menu-aside{
        width: 300px;
        height: 100vh;
        border-right: 1px solid rgba(0,0,0,.07);
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        transition: transform .25s ease-out;
        z-index: 3;
        transition: all .3s;
        background-color: rgba(255, 255, 255, .9);
        overflow-y: visible;
    }
    .menu-aside.fixed{
        position: fixed;
    }
    .close > .menu-aside{
        width: 0;
    }
    .menu-nav{
        padding-top: 20px;
        overflow-y: scroll;
        height: calc(100% - 40px);
    }
    .close > .menu-nav{
        overflow-y: visible;
    }
    .menu-nav::-webkit-scrollbar-thumb{
        border-radius:4px;
        background:transparent;
    }
    .menu-nav:hover::-webkit-scrollbar-thumb{
        background:hsla(0,0%,53%,.4)
    }
    .menu-nav::-webkit-scrollbar-track{
        background:transparent;
    }
    .menu-nav:hover::-webkit-scrollbar-track{
        background:hsla(0,0%,53%,.1)
    }
    .menu-toggle{
        box-sizing: border-box;
        background-color: transparent;
        background-color: hsla(0,0%,100%,.8);
        border: 0;
        outline: none;
        padding: 10px;
        position: absolute;
        bottom: -40px;
        left: 0;
        text-align: center;
        transition: all .3s;
        width: 100%;
        min-width: 40px;
        z-index: 4;
        transition-timing-function: ease-in-out;
    }
    .fixed .menu-toggle{
        bottom: 0;
        left: 0;
    }
    .menu-toggle_btn{
        height: 18px;
        width: 18px;
        cursor: pointer;
    }
    .menu-toggle_btn:hover path, .menu-toggle_btn:active path{
        fill: @main-color;
    }
    .menu-content{
        position: absolute;
        width: calc(100% - 300px);    
        height: auto;
        top: 0;
        left: 300px;
        transition: all .3s;
    }
    .close > .menu-content{
        width: 100%; 
        left: 0;   
    }

    @media screen and (max-width: @phone-width) {
        .menu-content{
            width: 100%; 
            left: 0;   
        }
        .close > .menu-content{
            width: 100%; 
            left: 0; 
        }
        .menu-aside{
            width: 0;
            opacity: 0;
        }
        .close > .menu-aside{
            width: 300px;
            opacity: 1;
        }
        .menu-nav{
            overflow-y: visible;
        }
        .close  .menu-nav{
            overflow-y: scroll;
        }
        .close > .menu-aside_mark{
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 100vw;
            z-index: 2;
        }
    }
</style>
