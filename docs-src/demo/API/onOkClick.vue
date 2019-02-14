<template>
    <Button @click="select" class="view_demo">查看</Button>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        select(){
            (new myPicker({
                cols: [
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                ],
                title: '第一列选奇数，第二列选偶数',
                onOkClick: function(values){
                    if(values[0] % 2 === 0 || values[1] % 2 === 1){
                        alert('第一列只能选奇数，第二列只能选偶数!');
                        //返回false,不准关闭,继续选择
                        return false;
                    }
                },
            })).show()
        }
    }
}
</script>