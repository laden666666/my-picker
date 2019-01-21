
<template>
    <Row class="example" :class="{'example-vertical': vertical}" type="flex" justify="center" align="top">
        <i-col class="example-demo" ref="demo" :xs="24" :sm="vertical ? 24 : 12">
            <div class="example-case">
                <component :is="demo"></component>
            </div>
            <header class="example-header">
                <span>
                    {{ title }}
                    <a >#</a>
                </span>
            </header>
            <div class="example-desc">
                <slot></slot>
            </div>
        </i-col>
        <div class="example-split"></div>
        <i-col class="example-code" ref="code" :style="codeHeight" :xs="24" :sm="vertical ? 24 : 12">
            <div :style="style">
                <Code :lang="lang" :code="vueSource"></Code>
            </div>
            <div class="example-code-more" v-if="showMore" @click="showCode = !showCode">
                <Icon type="ios-arrow-down" v-show="!showCode"></Icon>
                <Icon type="ios-arrow-up" v-show="showCode"></Icon>
            </div>
        </i-col>
    </Row>
</template>
<script>
    export default {
        name: 'Demo',
        props: {
            // 示例的标题
            title: {
                type: String,
                default: ''
            },
            // 是否垂直显示
            vertical: {
                type: Boolean,
                default: false
            },
            // 是一个Vue的ComponentOptions，用于生成例子
            demo: {
                type: Object,
                required: true,
            },
            // 生成该示例的代码，用于展示给用户
            code: {
                type: String,
                default: ''
            },
            // 展示代码的语言
            lang: {
                type: String,
                default: 'html'
            },
        },
        data () {
            return {
                showCode: false,
                showMore: true,
                demo_height: 0,
                code_height: 0,
                ready: false,
            }
        },
        computed: {
            codeHeight () {
                let style = {};
                if (this.ready) {
                    if (this.showCode) {
                        style.height = `${this.code_height}px`;
                    } else {
                        style.height = `${Math.min(this.demo_height, this.code_height)}px`;
                    }
                }
                return style;
            },
            vueSource () {
                if(this.code){
                    return this.code
                } else if(this.demo.__vueSource){
                    let vueSource = decodeURI( window.atob(this.demo.__vueSource)) || ''
                    vueSource = vueSource.trim().replace('<template></template>')
                    return decodeURI( window.atob(this.demo.__vueSource)) 
                } else {
                    return ''
                }
            },
            style () {
                let style = {
                    opacity: 1
                };
                return style;
            }
        },
        mounted () {
            this.$nextTick(() => {
                const demo_height = this.$refs.demo.$el.clientHeight;
                const code_height = this.$refs.code.$el.clientHeight + 20;
                this.code_height = code_height;
                if (code_height <= demo_height) {
                    this.showMore = false;
                }
                this.demo_height = demo_height;
                this.ready = true;
            });
        }
    }
</script>

<style lang="less" scoped>
    
    @import '../../theme.less';

    .example{
        margin-top: 20px;
        border: 1px solid @border-color;
        border-radius: 6px;
        margin-bottom: 20px;
        position: relative;
        transition: all .2s ease-in-out;
        display: flex;

        &:hover{
            box-shadow: 0 2px 7px rgba(0,0,0,.15);
            border-color: transparent;
            position: relative;
        }

        &-split{
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            border: 1px dashed @border-color;
        }
        &-vertical &-split{
            width: 100%;
            float: left;
            position: relative;
            left: 0;
        }
        
        @media screen and (max-width: @phone-width) {
            &-split{
                width: 100%;
                float: left;
                position: relative;
                left: 0;
            }
        }

        &-demo{
            padding: 20px 0;
            position: relative;
        }

        &-case{
            padding: 0 20px;
            overflow-x: auto;
            width: 100%;
        }

        &-header{
            font-weight: 500;
            margin: 30px 0 10px;
            position: relative;
            span{
                display: inline-block;
                background: #fff;
                padding: 0 5px 0 18px;
                position: relative;
                margin-left: 30px;
                font-size: 14px;

                a{
                    opacity: 0;
                    transition: opacity .2s ease-in-out;
                }
            }
            &:hover span a{
                opacity: 1;
            }
            &:before{
                content: '';
                display: block;
                width: 100%;
                height: 1px;
                background: #eee;
                position: absolute;
                top: 10px;
                left: 0;
            }
        }

        &-desc{
            font-size: 12px;
            padding: 0 20px;
            p{
                font-size: 12px !important;
                text-align: justify;
            }
            ul li {
                font-size: 12px !important;
            }
            blockquote{
                font-size: 12px !important;
            }
        }

        &-code{
            padding: 0 10px;
            position: relative;
            overflow: hidden;
            transition: height .2s ease-in-out;

            &-more{
                position: absolute;
                bottom: 0;
                left: 4px;
                right: 4px;
                text-align: center;
                cursor: pointer;
                padding: 5px 0;
                /*transition: background .1s ease-in-out;*/

                &:after{
                    content: '';
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    z-index: 1;
                    box-shadow: 0 -15px 30px #fff inset;
                }

                i{
                    position: relative;
                    top: 5px;
                    z-index: 2;
                }
                .ivu-btn{
                    padding: 0 0 4px;
                    position: relative;
                    top: 4px;
                    z-index: 2;
                }

                &:hover{
                    /*background: #fff;*/
                    i{
                        color: @main-color;
                    }
                }
            }
        }
    }
</style>