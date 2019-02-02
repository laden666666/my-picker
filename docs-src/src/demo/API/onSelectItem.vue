<template>
    <A href="#" @click.native.self.prevent="select">查看</A>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        select(){
            (new myPicker({
                cols: [
                    ['一', '二', '三', '四', '五'],
                    ['I', 'II', 'III', 'IV', 'V'],
                ],
                onSelectItem(level, selectedIndex, selectedValue){
                    alert(`第${level}个滚轮第${selectedIndex}值被选中，值为“${selectedValue}”`)
                }
            })).show()
        }
    }
}
</script>