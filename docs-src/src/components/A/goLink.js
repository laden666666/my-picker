
let userAgent = window.navigator.userAgent
let isIE = (function () {
    let matches;
    const tridentMap = {
        '4': 8,
        '5': 9,
        '6': 10,
        '7': 11
    };

    matches = userAgent.match(/MSIE (\d+)/i);
    if(matches && matches[1]) {
        return !!+matches[1];
    }
    matches = userAgent.match(/Trident\/(\d+)/i);
    if(matches && matches[1]) {
        return !!tridentMap[matches[1]] || false;
    }
    //we did what we could
    return false;
})();

export function goLink(path, router){
    if(path.startsWith('http') || path.startsWith('//')){
        window.open(path, '_blank')
    } else {
        if(path.startsWith('#')){
            path = path.substr(1)
        }

        let route = router.currentRoute
        let position = path.indexOf('#')
        let hash = ~position ? path.substr(position + 1) : ''
        let routePath = path.split('#')[0]
        if(route.path == routePath){
            goHash(hash, router)
            
        } else{
            if(isIE){
                router.app.$destroy()
                location.assign('#' + path)
                setTimeout(()=>{
                    location.reload()
                })
            } else {
                location.assign('#' + path)
            }
        }
    }
}

export function goHash(hash, router){
    if(hash.startsWith('#')){
        hash = hash.substr(1)
    }
    if(hash){
        try{
            let title = document.querySelector(`[name='${hash}']`)
            if(title){
                title.scrollIntoView()
            }
        } catch(e){console.log(e)}
    } else {
        let title = document.querySelector(`#menu`)
        if(title){
            title.scrollIntoView()
        }
    }
}