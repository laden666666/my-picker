<template>
    <Doc>
        <P><Button class="view_demo" @click="show">显示picker，两秒后自动关闭picker</Button></P>
        <P><Button class="view_demo" @click="close">销毁picker</Button></P>
    </Doc>
</template>
<script>
import myPicker from 'my-picker'

export default {
    methods: {
        show(){
            try{
                this.picker.show()
                setTimeout(()=>{
                    this.picker.hide()
                }, 2000)
            } catch(e){
                alert('出现错误，应该是picker已经被销毁，不能再显示')
            }
        },
        close(){
            try{
                this.picker.close()
                alert('picker销毁成功')
            } catch(e){
                alert('出现错误，应该是picker已经被销毁，不能再销毁')
            }
        },
    },
    created(){
        this.picker = new myPicker({
            cols: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
        })
    }
}
</script>