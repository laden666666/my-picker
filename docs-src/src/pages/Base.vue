<template>
    <Doc>
        <H1>基础文档控件</H1>
        <P>框架提供了基础文档控件，用于创建声明式的文档。</P>

        <H2>文档根标签</H2>
        <P>使用<Strong>Doc标签</Strong>定义文档的根标签。</P>

        <Demo title="文档根标签" :demo="Doc">
            <div >使用Doc定义文档根标签</div>
        </Demo>

        <H2>文档标题</H2>
        <P>使用<Strong>H1、H2、H3标签</Strong>定义文档标签。</P>

        <Demo title="文档标题" :demo="Title">
            <div >使用H1、H2、H3定义文档标签。</div>
        </Demo>

        <H2>文档段落</H2>
        <P>使用<Strong>P标签</Strong>定义文档段落。</P>

        <Demo title="文档段落" :demo="P">
            <div >使用P标签定义文档段落。</div>
        </Demo>

        <H2>超链接</H2>
        <P>使用<Strong>A标签</Strong>定义超链接，支持href属性。超链接中，如果href是非“http”、“https”、“//”开头的，表示是站内链接，会跳转到该链接处；如果是表示非站内链接，会再打开一个浏览器tab跳转的链接页面。</P>

        <Demo title="超链接" :demo="A">
            <div >使用A标签定义超链接。</div>
        </Demo>

        <H2>强调</H2>
        <P>使用<Strong>Strong标签</Strong>定义强调的语句。</P>

        <Demo title="强调" :demo="Strong">
            <div >使用Strong标签定义强调的语句。</div>
        </Demo>

        <H2>列表</H2>
        <P>使用<Strong>Li标签</Strong>定义列表。</P>

        <Demo title="列表" :demo="Li">
            <div >使用Li标签定义列表。</div>
        </Demo>
    </Doc>
</template>
<script>
import Doc from '../demo/Base/Doc'
import Title from '../demo/Base/Title'
import P from '../demo/Base/P'
import A from '../demo/Base/A'
import Strong from '../demo/Base/Strong'
import Li from '../demo/Base/Li'
export default {
    data(){
        return {
            Doc,
            Title,
            P,
            A,
            Strong,
            Li,
        }
    }
}
</script>
