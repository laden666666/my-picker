<template>
    <A href="#" @click.native.self.prevent="select">查看</A>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        select(){
            (new myPicker({cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']})).show()
        }
    }
}
</script>