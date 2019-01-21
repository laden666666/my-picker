<script>
function getDoc(element){
        // console.log(element, element.$vnode.componentOptions.tag, element.$parent.$vnode.componentOptions.tag)

    if(!element || element === element.$root){
        return null
    } else if(element.$vnode.componentOptions.tag === 'Doc'){
        if(element.$parent && element.$parent.$parent
            && element.$parent.$parent.$vnode.componentOptions.tag === 'Menu'){
            return element
        } else {
            return null
        }
    } else {
        return getDoc(element.$parent)
    }
}

export default {
    inject: ['setTitle'],
    computed: {
        text(){
            let $slots = this.$slots
            if($slots.default && $slots.default[0]){
                return $slots.default[0].text
            }
            return ''
        },
    },
    data: ()=>{
        return {
            isDocTitle: false
        }
    },
    created(){
        let doc = getDoc(this)
        if( doc ){
            this.isDocTitle = true
            this.setTitle(this.level, this.text)
        }
    }
}
</script>
