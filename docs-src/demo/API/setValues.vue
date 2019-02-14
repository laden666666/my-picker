<template>
    <Button @click="select" class="view_demo">查看</Button>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        select(){
            (new myPicker({
                cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
                setValues: ['钱'],
            })).show()
        }
    }
}
</script>