<template>
    <Button @click="select" class="view_demo">查看</Button>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        select(){
            (new myPicker({
                cols:{
                    labelKey: 'name',
                    valueKey: 'name',
                    options: [{name: '张三'},{name: '李四'},{name: '王五'}],
                }
            })).show()
        }
    }
}
</script>