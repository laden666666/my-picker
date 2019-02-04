<template>
    <div class="comments">
        <div id="SOHUCS" :sid="sid"></div>
    </div>
</template>
<script>
import app from '../../app.json'

function initChangyan(){
    return new Promise((resolve, reject)=>{
        let d = "http://changyan.sohu.com/upload/changyan.js"
        var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;
        var b=document.createElement("script");
        b.setAttribute("type","text/javascript");
        b.setAttribute("charset","UTF-8");
        b.setAttribute("src",d);
        if(window.attachEvent){
            b.onreadystatechange=function(){
                var e=b.readyState;
                if(e==="loaded"||e==="complete"){
                    b.onreadystatechange=null;
                    resolve()
                } else {
                    reject()
                }
            }
        }else{
            b.onload=resolve
            b.onerror=reject
        }
        c.appendChild(b)
    })
}

export default {
    data(){
        let sid = app.name + this.$route.fullPath.split('#')[0]
        return {
            sid
        }
    },
    beforeCreate(){
        // 删除id=SOHUCS
        Array.from(document.querySelectorAll('[id=SOHUCS]'))
            .forEach(el=>{
                el.parentElement.removeChild(el)
            })
        window.changyan=undefined;
        window.cyan=undefined;
    },
    mounted(){
        var appid = 'cyu46HbRc'; 
        var conf = 'prod_243494f956de9dc1a8ab7e28f3432078'; 
        initChangyan()
        .then(()=>{
            window.changyan.api.config({
                appid,
                conf,
            });
        })
    },
}
</script>