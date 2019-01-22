<template>
    <Doc>
        <H1>my-picker</H1>
        <P align="center">
            <a href="https://www.npmjs.com/package/my-picker"><img src="https://img.shields.io/npm/v/my-picker.svg" alt="Version"></a>
            <a href="https://www.npmjs.com/package/my-picker"><img src="https://img.shields.io/npm/dm/my-picker.svg" alt="Downloads"></a>
            <a href="https://www.npmjs.com/package/my-picker"><img src="https://img.shields.io/npm/l/my-picker.svg" alt="License"></a>
        </P>

        <P>高仿IOS的PickerView的JavaScript插件，3D形式的滚轮选择器，同时支持最多三级联动的选择效果，支持pc端和移动端两种平台浏览器。支持chrome及移动端默认浏览器、ie（9-11）、火狐浏览器。</P>

        <H2>功能</H2>
        <Li>0、3D形式的滚轮选择器，带有透视效果</Li>
        <Li>1、选择器的前缀与后缀</Li>
        <Li>2、级联选择器</Li>
        <Li>3、提供选择音效，更接近原生控件</Li>
        <Li>4、支持手机和pc</Li>

        <H2>源码</H2>
        <P><A href="https://github.com/laden666666/my-picker">github</A>、<A href="https://gitee.com/laden666666/my-picker">码云</A></P>

        <H3>兼容性</H3>
        <P>3D模式:</P>
        <center>
            <table cellspacing="1" style="margin: 0 auto;font-size: 14px;background-color: #f9f9f9;color: #036;padding: 3px;border-radius: 4px;border: 1px solid rgba(220, 220, 220, .5);">
                <colgroup width="100" span="6" align="center"></colgroup>
                <tr style="height: 30px;">
                    <th align="center">Android</td><th align="center">Firefox</td><th align="center">Chrome</td><th align="center">iPhone</td><th align="center">Edge</td><th align="center">Safari</td>
                </tr>
                <tr style="color: #000;line-height: 28px;font-weight: bold;">
                    <td align="center" style="background-color: #60d848">>=5</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td>
                </tr>
            </table>
        </center>
        <P>非3D模式:</P>
        <center>
            <table cellspacing="1" style="margin: 0 auto;font-size: 14px;background-color: #f9f9f9;color: #036;padding: 3px;border-radius: 4px;border: 1px solid rgba(220, 220, 220, .5);">
                <colgroup width="100" span="7" align="center"></colgroup>
                <tr style="height: 30px;">
                    <th align="center">Android</td><th align="center">Firefox</td><th align="center">Chrome</td><th align="center">IE</td><th align="center">iPhone</td><th align="center">Edge</td><th align="center">Safari</td>
                </tr>
                <tr style="color: #000;line-height: 28px;font-weight: bold;">
                    <td align="center" style="background-color: #60d848">>=4.4</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">>=9</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td>
                </tr>
            </table>
        </center>



        <P>下载整个工程，然后执行：</p>
        <Code code="npm install" lang="shell"></Code>
        <P>即可安装好然后。</p>

        <H3>编辑模式</H3>
        <P>执行：</p>
        <Code code="npm run dev" lang="shell"></Code>
        <P>然后在<Strong>/src/pages</Strong>目录中编辑文档即可。</p>

        <H3>发布模式</H3>
        <P>执行：</p>
        <Code code="npm run build" lang="shell"></Code>
        <P>然后将<Strong>docs</Strong>目录拷贝到github的对应项目中的<Strong>docs</Strong>目录即可。</p>
        
        <H2>目录说明</H2>
        <P>该框架留给用户配置有三处：</P>

        <Li>文档目录</Li>
        <Li>例子目录</Li>
        <Li>全局配置</Li>
        
        <H3>文档目录</H3>
        <P>文档目录在<Strong>/src/pages</Strong>中，不同于VuePress那种基于MD，该框架是使用Vue的标签构建文档的，这些文档就创建在该目录中。</P>
        <P>创建文档的Vue控件，请参考<A href="#/Base">基础控件</A>和高级控件。</P>
        <P>文档的首页要求是在pages目录下的index.vue页面，该页面框架会做静态化，以提升seo的效率，其他页面不会做静态化处理。</P>

        <H3>例子目录</H3>
        <P>供Demo控件使用的例子vue文件所放目录。该目录的文件会通过框架开发的<Strong>vue-source_loader</Strong>将Demo的源码读取出来，供Demo框架展示。</P>

        <H3>全局配置</H3>
        <P><Strong>/src/app.js</Strong>是框架的主配置文件，配置如文档库名称、版本等功能，具体请参考<A href="#/AppConfig"></A>。</P>

    </Doc>
</template>
<script>
export default {
    data(){
        return {
        }
    }
}
</script>
