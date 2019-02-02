<template>
    <A href="#" @click.native.self.prevent="select">查看</A>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        select(){
            (new myPicker({
                cols: {
                    prefix: '第',
                    options: ['一', '二', '三', '四', '五'],
                    suffix: '章',
                }
            })).show()
        }
    }
}
</script>