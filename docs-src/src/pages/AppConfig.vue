<template>
    <Doc>
        <H1>app配置</H1>
        <P>框架的配置文件在<Strong>/src/app.json</Strong>文件中，通过这个文件配置文档的基础信息，一个实例配置文件如下：</P>
        <Code :code='`{
    "name": "my-vue-doc",
    "background": "BackgroundColor",
    "logo": "./static/icon.svg",
    "version": "v0.0.0",
    "subhead": "一个用于创建my系列控件文档的框架",
    "describe": "这是一个用于创建my系列控件文档的框架，样式参考iview。目前不对外开放，仅针对my系列控件定制化使用。",
    "link": [
        {
            "title": "文档",
            "path": "/",
            "primary": true
        },
        {
            "title": "源码",
            "path": "https://www.github.com/laden666666/my-vue-doc"
        }
    ],
    "menu": [
        {
            "title": "主页",
            "path": "#/"
        },
        {
            "title": "进阶文档控件",
            "children": [
                {
                    "title": "源代码展示控件",
                    "path": "#/Advances/Code"
                },
            ]
        }
    ]
}`' lang="json"></Code>
        <H2>基础配置</H2>
        <P>包括配置文档对应库的名字、版本、描述等信息</P>
        <Instructions type="h3" :data="[{
            name: 'name',
            type: 'String',
            required: true,
            describe: '库的名字',
        }, {
            name: 'logo',
            type: 'String',
            describe: '库的图标的rul路径，可以是一个static目录里面的一个文件相对index.html的路径，也可以是一个url',
        }, {
            name: 'version',
            type: 'String',
            describe: '库的版本',
        }, {
            name: 'subhead',
            type: 'String',
            describe: '库的副标题',
        }, {
            name: 'describe',
            type: 'String',
            describe: '库的描述说明，支持“\\n”换行',
        }]">
        </Instructions>
        
        <Instructions type="h3" :data="[{
            name: 'link',
            type: 'Array',
            describe: '配置文档的首页链接，可以是站内链接，也可以是一个url',
        }]">
            <template slot="link">
                <P>例如：</P>
                <Code :code='`{
    "link": [
        {
            "title": "文档",
            "path": "/",
            "primary": true
        },
        {
            "title": "源码",
            "path": "https://www.github.com/laden666666/my-vue-doc"
        }
    ]
}`'></Code>
                <Instructions :data="[{
                    name: 'title',
                    type: 'String',
                    required: true,
                    describe: '链接的显示的文字',
                }, {
                    name: 'path',
                    type: 'String',
                    required: true,
                    describe: '链接的url，如果是站内的链接以“#”开头，然后填相对pages的路径',
                }, {
                    name: 'primary',
                    type: 'Boolean',
                    required: false,
                    describe: '是否是重要链接，如果是重要链接会用深色显示。',
                }]"></Instructions>
            </template>
        </Instructions>

        
        
        <Instructions type="h3" :data="[{
            name: 'menu',
            type: 'Array',
            describe: '配置文档的左侧菜单链接，可以是站内链接，也可以是一个url',
        }]">
            <template slot="menu">
                <P>例如：</P>
                <Code :code='`{
    "menu": [
        {
            "title": "文档",
            "children": [
                "title": "文档",
                "path": "/",
            ]
        },
        {
            "title": "源码",
            "path": "https://www.github.com/laden666666/my-vue-doc"
        }
    ]
}`'></Code>
                <Instructions :data="[{
                    name: 'title',
                    type: 'String',
                    required: true,
                    describe: '菜单的显示的文字，如配置了path是一个超链接，如果不配做path是一组菜单的标题',
                }, {
                    name: 'path',
                    type: 'String',
                    required: false,
                    describe: '链接的url，如果是站内的链接以“#”开头，然后填相对pages的路径',
                }, {
                    name: 'children',
                    type: 'Array',
                    required: false,
                    describe: '递归生成子菜单',
                }]"></Instructions>
            </template>
        </Instructions>

        <H3>例子</H3>
        <Demo title="app.js示例" :demo="AppConfig" lang="json" :code='`{
    "name": "my-vue-doc",
    "background": "BackgroundColor",
    "logo": "./static/icon.svg",
    "version": "v0.0.0",
    "subhead": "一个用于创建my系列控件文档的框架",
    "describe": "这是一个用于创建my系列控件文档的框架，样式参考iview。目前不对外开放，仅针对my系列控件定制化使用。",
    "link": [
        {
            "title": "文档",
            "path": "/",
            "primary": true
        },
        {
            "title": "源码",
            "path": "https://www.github.com/laden666666/my-vue-doc"
        }
    ],
}`'>
            <div >通过app.json配置示例。</div>
        </Demo>

        <H2>背景配置</H2>
        <P>app.json的<Strong>background</Strong>属性可以配置首页的背景，用于不同风格的文档提供不同种类的背景。</P>

        <H3>BackgroundColor</H3>
        <P>使用渐变的背景色当背景</P>
        <div class="bg">
            <BackgroundColor></BackgroundColor>
        </div>
        
        <H3>Particles</H3>
        <P>使用<A href="https://github.com/VincentGarreau/particles.js">Particles</A>的背景色当背景</P>
        <div class="bg">
            <Particles></Particles>
        </div>
    </Doc>
</template>
<script>
import AppConfig from '../demo/AppConfig/AppConfig'
import BackgroundColor from '../components/Background/strategy/BackgroundColor'
import Particles from '../components/Background/strategy/Particles'
export default {
    data() {
        return {
            AppConfig
        }
    },
    components:{
        BackgroundColor,
        Particles,
    }
}
</script>
<style scoped>
    .bg{
        width: 400px;
        max-width: 100%;
        height: 200px;
        position: relative;
    }
</style>
