<template>
    <Instructions :data="calcPropsData" :type="type">
        <slot :name="name" v-for="name in $slots"></slot>
    </Instructions>
</template>

<script>

    //正则获取注释
    function getComment(jsonStr){
        var codes = jsonStr.split('\n').map(code=>code.trim()).map(code=>code.indexOf('//') == 0 ? code : code.replace(/\s*/, ''))

        return function(name){
            var comments = []
            for(let index in codes){
                let code = codes[index]
                if(code.indexOf('//') == 0){
                    comments.push(code)
                } else {
                    if(code.indexOf(`${name}:`) == 0 || code.indexOf(`'${name}':`) == 0 || code.indexOf(`"${name}":`) == 0){
                        if(comments[0]){
                            let hasSpace = comments[0][2] === ' '
                            return comments.map(comment=>comment.substr(hasSpace ? 3 : 2, comment.length)).join('\n')
                        }
                        comments = []
                    }else {
                        comments = []
                    }
                }
            }
            return ''
        }
    }

    export default {
        props: {
            //props的数据，是控件的props处的源码，例如：
            //控件为{props:{text1:{type: Number, default: 1},text1:{type: String, default: 'test'}}，应该传入：
            //“text1:{type: Number, default: 1},
            //text1:{type: String, default: 'test'}”
            //注意“,”和换行不能省略
            data: {
                type: String,
                default: ''
            },
            // 属性说明展现的形式，支持表格（table）和标题（h3）形式
            type: {
                type: String,
                default: 'table',
            }
        },
        computed: {
            calcPropsData(){
                try{

                    let _getComment = getComment(this.data)

                    //将json字符串转为json
                    var functionStr = this.data.trim()
                    // console.log(functionStr)

                    //如果json字符串以“,”为结尾，将“,”去除
                    functionStr = functionStr.endsWith(",") ? functionStr.slice(0, -1) : functionStr
                    // console.log(functionStr)


                    //如果json字符串外部没有“{}”，将“{}”补充上，并购造function内部的代码，用于生成json对象
                    if(this.data.startsWith("{")){
                        functionStr = 'return (' + this.data + ')'
                    } else {
                        functionStr = 'return ({' + this.data + '})'
                    }
                    var json = new Function(functionStr)()

                    return Object.keys(json).map((name)=>{
                        var type =  json[name].type
                        if(Array.isArray(type)){
                            type = type.map(type=>type.name).join(" | ")
                        } else {
                            type = type.name
                        }
                        return {
                            name,
                            default: JSON.stringify(json[name].default),
                            type: type,
                            required: json[name].required || false,
                            describe: _getComment(name),
                        }
                    })
                } catch(e) {
                    console.error(e)
                    console.error('calcProps 计算错误：' + e)
                    return []
                }

            },
        },
        watch:{
            propsData(){
                this._getComment = getComment(this.data)
            }
        },
        created(){
            this._getComment = getComment(this.data)
        }
    };

</script>