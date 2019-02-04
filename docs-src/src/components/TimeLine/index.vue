
<script>
export default {
    props: {
        reverse: {
            type: Boolean,
            default: true
        }
    },
    computed:{
        slots(){
            let arr = Object.keys(this.$slots)
                .filter(key=>/^time\d+$/.test(key))
            // arr.sort((key1, key2)=>parseInt(key1) - parseInt(key2))
            arr = arr.map(key=>this.$slots[key])
            if(this.reverse){
                arr.reverse()
            }
            return arr
        },
    },
    render(h){
        return h('ITimeline', {}, this.slots.map((item, index)=>{
            return h('ITimelineItem', {attrs: {key: index}}, item)
        }))
    }
}
</script>
