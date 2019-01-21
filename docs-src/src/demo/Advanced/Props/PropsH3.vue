<template>
    <Doc>
        <P>标题模式</P>
        <Props type="h3" :data="`{
            // 展示代码的语言
            lang: {
                type: String,
                default: 'javascript'
            },
            // 只渲染一个展示代码的按钮，而不直接显示代码
            onlyBtn: {
                type: Boolean,
                default: false
            },
            // 源代码
            code: {
                type: String,
                required: true
            }
        }`"></Props>

    </Doc>
</template>
