<template>
    <div class="function">
        <P class="function-desc" v-if="calcFunData.describeText">{{calcFunData.describeText}}</P>
        <template v-if="calcFunData.paramsText && calcFunData.paramsText.length">
            <Li>参数：</Li>
            <Instructions :data="calcFunData.paramsText">
                <slot :name="name" v-for="name in $slots"></slot>
            </Instructions>
        </template>

        <template v-if="calcFunData.returnText">
            <Li>返回值：</Li>
            <Instructions :data="[calcFunData.returnText]">
                <slot name="return"></slot>
            </Instructions>
        </template>
    </div>
</template>

<script>

    //查找参数的正则
    const paramRegex = /@params?\s+({.*})?(\s+\S+)?(\s+.*)?$/

    //查找返回值的正则
    const returnRegex = /@returns?\s+({.*})?(\s+.*)?$/

    export default {
        props: {
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
        },
        computed: {
            calcFunData(){
                //将注释代码以“*”分割，因为每个个“*”是一行
                let str = this.data.trim()
                if(str.startsWith('/')){
                    str = str.substr(1)
                }
                if(str.endsWith('/')){
                    str = str.substring(0, str.length - 2)
                }

                let rows = str.split(/^\*+|\n\s*\*/).map(str=>str.trim()).filter(str=> str && str != '<br/>')
                
                //获取全部描述文本，描述文本是不以@开头的所有文本
                let describeText = rows.filter(str=> str[0] != '@').filter(str=>str).join('\n')

                //参数
                let paramsText = rows.filter(str => paramRegex.test(str)).map(str=>{
                    var paramInfo = paramRegex.exec(str).slice(1, 4).map(str=>str && str.trim());
                    let type = paramInfo[0] && /{(.*)}/.exec(paramInfo[0])[1]
                    return {
                        name: paramInfo[1],
                        type: type === '*' ? 'any' : type,
                        describe: paramInfo[2]
                    }
                })

                //返回值
                let returnText = rows.filter(str => returnRegex.test(str)).map(str=>{
                    var paramInfo = returnRegex.exec(str).slice(1, 3).map(str=>str && str.trim());
                    return {
                        name: 'return',
                        type: paramInfo[0] && /{(.*)}/.exec(paramInfo[0])[1],
                        describe: paramInfo[1]
                    }
                })[0]

                return {
                    describeText,
                    paramsText,
                    returnText,
                }

            },
        }
    };

</script>