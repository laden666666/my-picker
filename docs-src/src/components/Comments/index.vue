<template>
    <div id="SOHUCS" ></div> 
</template>
<script>
export default {
    mounted(){
        var appid = 'cyu46HbRc'; 
        var conf = 'prod_243494f956de9dc1a8ab7e28f3432078'; 
        var loadJs=function(d,a){
            var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;
            var b=document.createElement("script");
            b.setAttribute("type","text/javascript");
            b.setAttribute("charset","UTF-8");
            b.setAttribute("src",d);
            if(typeof a==="function"){
                if(window.attachEvent){
                    b.onreadystatechange=function(){
                        var e=b.readyState;
                        if(e==="loaded"||e==="complete"){
                            b.onreadystatechange=null;
                            a()
                        }
                    }
                }else{
                    b.onload=a
                }
            }
            c.appendChild(b)
        };
        loadJs("http://changyan.sohu.com/upload/changyan.js",function(){
            window.changyan.api.config({appid:appid,conf:conf})
        }); 
    }
}
</script>
