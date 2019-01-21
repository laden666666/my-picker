<template>
    <Doc>
        <Instructions type="h3" :data="[{
            name: '属性1',
            type: 'String',
            default: '\'test\'',
            describe: '属性的说明',
            demo: `var shuxing1 = '属性1'`
        }, {
            name: '属性2',
            type: 'Boolean',
            default: 'true',
            describe: '属性的说明',
            demo: `var shuxing2 = '属性2'`
        }]">
            <P slot="属性1">属性1的slot插入的内容</P>
            <P slot="属性2">属性2的slot插入的内容</P>
        </Instructions>
    </Doc>
</template>