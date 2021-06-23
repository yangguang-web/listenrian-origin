import Vue from 'vue'
import App from './App'
import qs from 'qs'
import axios from 'axios'
import jquery from 'jquery'
import NProgress from 'nprogress';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import * as echarts from 'echarts'
import router from './router/router.js'
import { store } from './store/store.js'
import "babel-polyfill"
import 'nprogress/nprogress.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.use(VueRouter);
Vue.use(ElementUI, { size: 'medium' });

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.prototype.$jquery = jquery;
Vue.prototype.$echarts = echarts;
Vue.prototype.$getCookie = getCookie;


NProgress.configure({
    showSpinner: false
});
router.beforeEach((to, from, next) => {
    //请求拦截
    axios.interceptors.request.use(
        config =>{
            // NProgress.start();       //请求时打开进度条
            return config;
        }, error => {
            return Promise.reject(error)
    });
    //响应拦截
    axios.interceptors.response.use(
        config =>{
            // NProgress.done();        //响应时关闭进度条
            store.commit('getTime'); //响应时调整更新时间
            return config;
        }, error => {
            return Promise.reject(error)
    });
    //根据权限和本地缓存判断是否跳转 暂未完善
    if(to.path === '/login'){
        window.localStorage.clear();
        next();
    }else{
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

function getCookie(userName) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(userName + "=");
        if (c_start !== -1) {
            c_start = c_start + userName.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}
