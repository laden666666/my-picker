<template>
    <div class="props">
        <Table v-if="type === 'table'">
            <Tr>
                <Th>属性名</Th>
                <Th v-if="calcPropskey['type']">类型</Th>
                <Th v-if="calcPropskey['required']">必填</Th>
                <Th v-if="calcPropskey['default']">默认值</Th>
                <Th>说明</Th>
            </Tr>
            <Tr v-for="(param, index) in calcPropsData" :key="index">
                <Td><strong>{{param.name}}</strong></Td>
                <Td v-if="calcPropskey['type']" v-html="param.type || ''"></Td>
                <Td v-if="calcPropskey['required']">{{param.required ? '是' : '否'}}</Td>
                <Td v-if="calcPropskey['default']" v-html="param.default || '-'"></Td>
                <Td>
                    <Code :code="param.demo" v-if="calcPropskey['demo']"></Code>
                    <pre>{{param.describe || ''}}</pre>
                    <slot :name="param.name"></slot>
                </Td>
            </Tr>
        </Table>
        <template v-else>
            <template v-for="(param, index) in calcPropsData">
                <H3 :key="'h3' + index">{{param.name}}</H3>
                <Li :key="'type' + index" v-if="calcPropskey['type']">类型：<Strong><span v-html="param.type || ''"></span></Strong></Li>
                <Li :key="'required' + index" v-if="calcPropskey['required']">必填：<Strong>{{param.required ? '是' : '否'}}</Strong></Li>
                <Li :key="'default' + index" v-if="calcPropskey['default']">默认值：<Strong><span v-html="param.default || '-'"></span></Strong></Li>
                <Li :key="'li' + index">用法：</Li>
                <div style="padding: 10px 0 0 10px;" :key="'div' + index">
                    <Code :code="param.demo" v-if="calcPropskey['demo']"></Code>
                    <P style="white-space: pre-wrap;line-height: 1.5;padding: 0;margin: 0;" :key="i" v-for="(txt, i) in param.describe.split('\n')">{{txt || '\n'}}</P>
                    <slot :name="param.name"></slot>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import highlight from '../Code/highlight'

    export default {
        props: {
            // 一个属性的说明书，例如：
            // [{
            //     name: '属性名',
            //     type: 'Number', 
            //     default: '"1"', 
            //     required: true, 
            //     describe: '说明', 
            //     demo: '示例代码'
            // },]
            // 其中name和describe是必须设置项
            data: {
                type: Array,
                required: true
            },
            // 属性说明展现的形式，支持表格（table）和标题（h3）形式
            type: {
                type: String,
                default: 'table',
            }
        },
        computed: {
            calcPropsData(){
                return this.data.map(item=> {
                    return {
                        name: item.name,
                        type: highlight(item.type, 'javascript' || ''), 
                        default: highlight(item.default || '', 'typescript'), 
                        required: item.required, 
                        describe: item.describe, 
                        demo: item.demo,
                    }
                })
            },
            calcPropskey(){
                return this.data.reduce((map, item, index)=>{
                    Object.keys(map).forEach(key=>{
                        map[key] = map[key] || item[key] !== undefined
                    })

                    return map
                } ,{
                    type: false, 
                    default: false, 
                    required: false, 
                    describe: false, 
                    demo: false,
                })
            },
        },
    };

</script>

<style lang="less" scoped>
    @import '../../theme.less';
    .props {
        width: 100%;
        line-height: 40px;
        text-align: left;
        margin-top: 20px;
        box-sizing: border-box;
    }
    .mydoc_api_describe {
        box-sizing : border-box ;
        position : relative ;
        padding : 24px 15px ;
        margin : 0px 0px 15px ;
        border-color : rgb(0,0,0) ;
        border-style : solid ;
        border-width : 1px ;
        box-shadow : none ;
        background-color : rgb(255,255,255) ;
        border-radius : 4px 4px 0px 0px ;
        color : rgb(51, 51, 51) ;
    }
    .mydoc_api_content {
        box-sizing : border-box ;
        margin : -16px 0px 15px ;
        padding : 9px 14px ;
        background-color : rgb(255,255,255) ;
        border : 1px solid rgb(0,0,0) ;
        border-radius : 0px 0px 4px 4px ;
        color : rgb(51, 51, 51) ;
    }
</style>