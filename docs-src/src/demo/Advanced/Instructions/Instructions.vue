<template>
    <Doc>
        <Instructions :data="[{
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
        }]"></Instructions>
    </Doc>
</template>