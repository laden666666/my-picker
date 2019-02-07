<template>
    <div class="home">
        <div class="home-main">
            <p class="home-logo" v-if="logo">
                <img :src="logo" class="home-logo_image">
            </p>
            <div class="home-name">
                <span class="home-name_value">{{name}}</span>
                <div class="home-version" v-if="version">
                    <span class="home-version_value">{{version}}</span>
                </div>
            </div>
            <p class="home-subhead" v-if="subhead">{{subhead}}</p>
            <pre class="home-describe" v-if="describe">{{describe}}</pre>

            <div class="home-buttons" v-if="link">
                <template v-for="(item, index) in link">
                    <a :key="index" class="home-button" 
                        v-if="item.path && (item.path.startsWith('http') || item.path.startsWith('//'))"
                        :href="item.path" 
                        target="_blank"
                        :class="{'home-button_primary': item.primary}">
                        {{item.title}}
                    </a>
                    <a :key="index" class="home-button" v-else
                        @click="goLink(item.path)"
                        target="_blank"
                        :class="{'home-button_primary': item.primary}">
                        {{item.title}}
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import {goLink, goHash} from '../A/goLink'
export default {
    name: 'Home',
    props: {
        // 库的名字
        name: {
            type: String,
            isRequired: true,
        },
        // 库的版本
        version: {
            type: String,
        },
        // 库的副标题
        subhead: {
            type: String,
        },
        // 库的描述，支持换行，用\n表示换行
        describe: {
            type: String,
        },
        // 一个图片的url，库的logo
        logo: {
            type: String,
        },
        // 一个数组，用于显示库的相关资源链接
        // 具体配置如下：path表示超链接路径，title表示链接标题，primary表示该标签是否是强调显示的标签
        // 例如：[{
        //     path: '超链接路径',
        //     title: '链接标题',
        //     primary: false,
        // }]
        link: {
            type: Array,
        },
    },
    methods: {
        goLink(path){
            goLink(path, this.$router)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../theme.less';
.home{
    height: 100vh;
    margin: 0 16px;
    text-align: center;
    z-index: 1;
    position: relative;
    display: flex;
    justify-content: center;
}
.home-main{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.home-logo{
    line-height: 1.5rem;
    margin: 1em 0;
}
.home-logo_image{

}
.home-name{
    color: darken(@font-color, 10%);
    font-size: 2.2rem;
    font-weight: 300;
    margin: .625rem 0 2.5rem;
    position: relative;
    display: flex;
    justify-content: center
}
.home-version{
    position: relative;
}
.home-version_value{
    bottom: -.3rem;
    left: .1rem;
    font-size: 1rem;
    position: absolute;
}
.home-subhead{
    line-height: 1.5rem;
    margin: 1em 0;
    font-size: 1.3rem;
    text-align: center;
}
.home-describe{
    line-height: 1.8;
    list-style-type: none;
    margin: 1em auto;
    max-width: 500px;
    padding: 0;
    font-size: 14px;
    color:  @font-color;
    word-wrap: break-word;
    white-space: pre-wrap;
}
.home-buttons{
    -webkit-font-smoothing : antialiased ;
    -webkit-tap-highlight-color : rgba(0, 0, 0, 0) ;
    text-size-adjust : none ;
    box-sizing : border-box ;
    line-height : 1.5rem ;
    margin : 1em 0px ;
    color : rgb(52, 73, 94) ;
    font-size : 15px ;
    text-align : center ;
}
.home-button{
    -webkit-font-smoothing : antialiased ;
    -webkit-tap-highlight-color : rgba(0, 0, 0, 0) ;
    text-size-adjust : none ;
    box-sizing : border-box ;
    text-decoration-line : none ;
    border : 1px solid @main-color;
    color: @main-color;
    border-radius : 2rem ;
    display : inline-block ;
    font-size : 1.05rem ;
    letter-spacing : 0.1rem ;
    margin : 0.25rem 0.5rem ;
    padding : 0.3em 1rem ;
    transition : all 0.15s ease ;
    background-color: transparent;
    cursor: pointer;
    outline: none;
}
.home-button:hover{
    background-color: @main-color;
    border : 1px solid @main-color;
    color: #fff;
}
.home-button.home-button_primary{
    background-color: @main-color;
    border : 1px solid @main-color;
    color: #fff;
}
.home-button.home-button_primary:hover{
    background-color: transparent;
    border : 1px solid @main-color;
    color: @main-color;
}
</style>
