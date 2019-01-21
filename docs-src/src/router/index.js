import Vue from 'vue'
import Router from 'vue-router'
import app from '../app.json'
Vue.use(Router)

function getRoute(menu, array){
    menu.forEach(route=> {
        if(route.path){
            let path = route.path.substr(2)
            if(!path || path.endsWith('/')){
                path += 'Index'
            }
            array.push({
                path: route.path.substr(1),
                name: route.path,
                component: require('../pages/' + path).default,
            })
        }
        if(route.children){
            getRoute(route.children, array)
        }
    })
    return array 
}

export default new Router({
    routes: getRoute(app.menu, [])
})
