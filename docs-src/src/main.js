// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './components'

import MyDialog from 'my-vue-dialog';
import 'my-vue-dialog/dist/my-vue-dialog.css';
Vue.use(MyDialog)

import {Icon, Button, Tooltip, Row, Col, Timeline, TimelineItem} from 'iview';
import 'iview/dist/styles/iview.css';
Vue.component('Icon', Icon)
Vue.component('Button', Button)
Vue.component('Tooltip', Tooltip)
Vue.component('Row', Row)
Vue.component('ICol', Col)
Vue.component('ITimeline', Timeline)
Vue.component('ITimelineItem', TimelineItem)

import MyPicker from 'my-picker'
import 'my-picker/dist/my-picker.css'

Vue.config.productionTip = false

history.scrollRestoration = 'manual'

;(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

window.router = router

/* eslint-disable no-new */
window.app = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    myDialog: {key: 'my-vue-doc'},
    mounted () {
      document.dispatchEvent(new Event('render-event'))
    }
})
