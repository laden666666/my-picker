<style scoped>
    .code{
        background-color: #fafafa;
        border-radius: 5px;
        margin: 10px 0;
        line-height: 1.6;
    }
    .code pre{
        padding: 10px 15px;
        overflow-x: auto;
    }
    div{
        position: relative;
        font-size: 14px;
    }
    span.copy, span.scale, span.open-fiddle{
        border-radius: 0 0 3px 3px;
        padding: 2px 5px;
        position: absolute; 
        top: 5px;
        right: 0;
        color: #b2b2b2;
        cursor: pointer;
    }
    span.scale{
        right: 5px;
    }
    span.open-fiddle{
        right: 50px;
    }
    .bg + span.copy{
        right: 5px;
    }
    span.copy:hover, span.scale:hover, span.open-fiddle:hover{
        color: #5c6b77;
    }
</style>
<template>
    <div class="code" v-if="!onlyBtn">
        <pre :class="{bg: bg}"><code :class="language" ref="code" v-html="showCode"></code></pre>
        <span class="scale" @click="scale">
            <Tooltip :content="'放大'" placement="top" transfer>
                <Icon type="md-qr-scanner" size="18"></Icon>
            </Tooltip>
        </span>
        <!-- <span class="copy" @click="clip">
            <Tooltip :content="'复制代码'" placement="top" transfer>
                <Icon type="md-clipboard" size="18" v-show="!copied"></Icon>
                <Icon type="md-checkmark" size="18" v-show="copied" style="color:#5cb85c"></Icon>
            </Tooltip>
        </span> -->
    </div>

    <Button v-else @click="scale" icon="md-qr-scanner"  shape="circle">
        查看代码
        <div ref="code" style="display: none"><slot></slot></div>
    </Button>

</template>
<script>
    import Clipboard from 'clipboard';
    import ShowScale from './ShowScale';
    import highlight from './highlight';

    export default {
        props: {
            // 展示代码的语言
            lang: {
                type: String,
                default: 'javascript'
            },
            // 只渲染一个展示代码的按钮，而不直接显示代码
            onlyBtn: {
                type: Boolean,
                default: false
            },
            // 源代码
            code: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                copied: false,
                docLang: this.$lang,
                title: 'Code',
                bg: false,
            }
        },
        computed: {
            language () {
                if (this.lang == 'auto') {
                    return ''
                } else {
                    return this.lang;
                }
            },
            showCode(){
                return highlight(this.code, this.language)
            },
        },
        mounted () {

            const Demo = this.$parent.$parent.$parent;
            if (Demo.$options.name === 'Demo') {
                this.title = Demo.title;
            }
        },
        methods: {
            clip () {
                const code = this.code.replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                const clipboard = new Clipboard('.copy', {
                    text () {
                        return code
                    }
                });

                clipboard.on('success', (e) => {
                    e.clearSelection();
                    clipboard.destroy();
                    this.copied = true;
                    if (this.docLang === 'zh-CN') {
                        this.$Message.success('代码已复制到剪贴板');
                    } else {
                        this.$Message.success('Code copied');
                    }
                    setTimeout(() => {
                        this.copied = false;
                    }, 2000);
                });
            },
            scale () {
                this.$MyDialog.open({
                    title: this.title,
                    propsData: {
                        lang: this.language,
                        code: this.code,
                        bg: this.bg
                    },
                    width: 800,
                    height: 500,
                    content: ShowScale
                })
            },
        }
    }
</script>
