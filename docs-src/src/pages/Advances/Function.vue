<template>
    <Doc>
        <H1>函数的说明书——Function</H1>
        <P>使用<Strong>Function</Strong>控件做一个javascript(typescript)函数的说明书，Function特点是它是基于函数的注释生成说明书。如果不希望采用函数注释的源码方式生成说明书，可以使用Instructions代替。</P>
        <Demo :demo="MyFunction" title="Function说明书" :vertical="true">
            <div >Function说明书</div>
        </Demo>

        <H2>Props</H2>
        <Props type="h3" :data="`{
            //需要输入函数在vscode里面的注释，如：
            // /**
            //  * 自定义校验函数
            //  * @param {object}  rule        当前规则对象
            //  * @param {any}     value       验证的值
            //  * @param {any}     callback    回调对象，如果验证成功，执行callback()；如果验证失败，执行callback('错误提示')
            //  */
            data: {
                type: String,
                default: ''
            },
        }`"></Props>


        <H2>Slots</H2>
        <P>与<Strong>Instructions</Strong>控件类似，<Strong>Function</Strong>会根据data属性中的name配置动态生成slot，slot名字和function的参数的名字相同，如果是返回值名字为“return”</P>
    </Doc>
</template>
<script>
import MyFunction from '../../demo/Advanced/Function/Function.vue';
export default {
    data(){
        return {
            MyFunction
        }
    }
}
</script>
