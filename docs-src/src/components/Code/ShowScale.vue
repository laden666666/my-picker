<style scoped>
    .code pre code{
        padding: 5px 15px;
    }
    .code-scale-modal{
        background-color: #fafafa;
        padding: 3px 5px;
        border-radius: 5px;
        height: 100%;
        line-height: 1.6;
    }
    .code-scale-modal pre{
        font-size: 14px;
    }
</style>
<template>
    <div class="code-scale-modal">
        <pre :class="{bg: bg}"><code :class="language" v-html="showCode"></code></pre>
    </div>
</template>
<script>
    import highlight from './highlight';

    export default {
        props: {
            lang: {
                type: String,
                default: 'javascript'
            },
            code: {
                type: String,
                required: true,
            },
            bg: {
                type: Boolean,
                default: false
            },
        },
        data () {
            return {
                docLang: this.$lang,
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
    }
</script>
