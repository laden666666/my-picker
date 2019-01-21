
<script>
export default {
    computed:{
        slots(){
            let arr = Object.keys(this.$slots)
                .filter(key=>/^time\d+$/.test(key))
            // arr.sort((key1, key2)=>parseInt(key1) - parseInt(key2))
            return arr.map(key=>this.$slots[key])
        },
    },
    render(h){
        return h('ITimeline', {}, this.slots.map((item, index)=>{
            return h('ITimelineItem', {attrs: {key: index}}, item)
        }))
    }
}
</script>
