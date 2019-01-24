<template>
    <Doc>
        <H1>my-picker</H1>
        <P>
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

        <H2>安装</H2>

        <H3>浏览器环境</H3>
        <P>浏览器环境直接导入dist下的my-picker.js和my-picker.css文件即可，可以使用<A href="https://www.npmjs.com">npm</A>提供的<Strong>CDN</Strong>引入：</P>
        <Code :code="code" lang="html"></Code>

        <P>执行cli命令:</P>
        <Code code="npm i my-picker -S" lang="shell"></Code>
        <P>并在js文件中引用:</P>
        <Code :code="
`import myPicker form 'my-picker'
import 'my-picker/dist/my-picker.css'`" lang="javascript"></Code>

        <H3>兼容性</H3>
        <P>3D模式:</P>
        <Table>
            <Tr>
                <Th>Android</Th><Th>Firefox</Th><Th>Chrome</Th><Th>iPhone</Th><Th>Edge</Th><Th>Safari</Th>
            </Tr>
            <Tr>
                <Td>>=5</Td><Td>√</Td><Td>√</Td><Td>√</Td><Td>√</Td><Td>√</Td>
            </Tr>
        </Table>
        <P>非3D模式:</P>
        <Table>
            <Tr>
                <Th>Android</Th><Th>Firefox</Th><Th>Chrome</Th><Th>IE</Th><Th>iPhone</Th><Th>Edge</Th><Th>Safari</Th>
            </Tr>
            <Tr>
                <Td>>=4.4</Td><Td>√</Td><Td>√</Td><Td>>=9</Td><Td>√</Td><Td>√</Td><Td>√</Td>
            </Tr>
        </Table>
        
        <H2>效果图</H2>
        <H3>移动端demo效果图:</H3>
        <Img src="../assert/mobileDemo.gif" />

        <H3>pc端demo效果图:</H3>
        <Img src="../assert/pcDemo.gif" />


        <H2>源码</H2>
        <P><A href="https://github.com/laden666666/my-picker">github</A>、<A href="https://gitee.com/laden666666/my-picker">码云</A></P>
    </Doc>
</template>
<script>
export default {
    data(){
        return {
            code: `<link rel="stylesheet" href="//unpkg.com/my-picker/dist/my-picker.css">
<script src="//unpkg.com/iview/dist/my-picker.min.js"><\/script>`
        }
    }
}
</script>
