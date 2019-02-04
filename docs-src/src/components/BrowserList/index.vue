<template>
    <div class="browser_list">
        <ul class="browser_list-content" :style="{width: 88 * browserList.length - 8 + 'px'}">
            <li class="browser_list-item" v-for="browser in browserList" :key="browser[0]">
                <h4 class="browser_list-title">{{browser[0].replace(/-/g, ' ')}}</h4>
                <div class="browser_list-result" :class="{'s-no_compatible': browser[1] === false}">
                    <svg class="browser_list-value" v-if="browser[1] === ''"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M879.7 193.8l-495 495-240.4-240.4-70.7 70.7L314 759.5l70.7 70.7 70.7-70.7 495-495z" ></path>
                    </svg>
                    <svg class="browser_list-value" v-else-if="browser[1] === false" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z" fill="#fff"></path>
                    </svg>
                    <template v-else>
                        {{browser[1]}}
                    </template>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    computed: {
        browserList(){
            return Object.entries(this.$attrs)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../theme.less';
.browser_list{
    overflow-x: auto;
    overflow-y: hidden;
    color: rgb(0, 0, 0);
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    font-size: 16px;
    max-width: 100%;
}
.browser_list-content{
    position: relative;
    display: flex;
    -webkit-box-align: end;
    align-items: flex-start;
    justify-content: space-around;
    padding-top: 0.5em;
    margin: 0 4px 20px -4px;
    overflow-x: hidden;
}
.browser_list-item{
    position: relative;
    top: 0px;
    margin-bottom: 30px;
    margin: 4px;
    transition: top 0.5s, vertical-align 0.5s;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    width: 80px;
    list-style: none;
}
.browser_list-title{
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 -4px;
    height: 41px;
    border-width: 1px 0 0;
    border-style: solid;
    padding-bottom: 2px;
    vertical-align: middle;
    text-align: center;
    width: 88px;
    line-height: 1.2;
    font-family: sans-serif;
    font-size: 0.75em;
}

.browser_list-result{
    background-color: rgb(57, 181, 74);
    transition: height 0.5s, line-height 0.5s, font-size 0.5s;
    position: relative;
    list-style: none;
    margin: 0 0 0 -4px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    height: 38px;
    line-height: 32px;
    text-align: center;
    color: white;
    font-size: 1rem;
    vertical-align: middle;
    border: rgb(88, 78, 59) solid;
    border-width:  4px 4px;
    visibility: visible;
    width: 88px;
}
.browser_list-value{
    width: 20px; height: 20px;margin-top: 5px;
}

.s-no_compatible{
    background-color: rgb(196, 66, 48);
}
</style>
