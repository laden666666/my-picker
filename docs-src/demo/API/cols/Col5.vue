<template>
    <Button @click="select" class="view_demo">查看</Button>
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