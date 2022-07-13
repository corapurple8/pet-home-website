import babelpolyfill from 'babel-polyfill'
//导入vue
import Vue from 'vue'
import App from './App'
//导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
//导入路由
import VueRouter from 'vue-router'
//导入vue扩展
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//不需要全局导入该文件
/*import Mock from './mock'
Mock.bootstrap();*/
//只导入发送请求的axios包
import axios from "axios"
//所有vue对象的属性
Vue.prototype.$http=axios
//设置请求的默认域名
axios.defaults.baseURL="http://api.petspet.xyz/"

//axios的请求前拦截器

axios.interceptors.request.use(config=>{//成功的回调函数
      //取出存在本地存储里的登录用户信息
      let userToken = localStorage.getItem("userToken");
      //如果存在则设置请求头
      if (userToken){
        //将令牌设置进消息头
        config.headers["User-Token"]=userToken;
        config.headers["User-Type"]="2";
      }
      return config;
    },
    err=>{//失败的回调函数
      return Promise.reject(err);
    }
)
//axios的响应拦截器
axios.interceptors.response.use(res=>{
      let{success,msg,data}=res.data;
      if (!success&&(msg=="noUser")){//
        //直接转到主页面
        this.$router.push({ path: '/login' });
      }
      return res;
    },
    err=>{
      return Promise.reject(err);
    })


//elementui的扩展图标
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
//登录拦截 暂时不开放 可以直接访问部门管理
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userToken');
  }
  let user = JSON.parse(localStorage.getItem('loginUser'));//前端项目的会话管理工具
  if (!user && to.path != '/login') {//如果登录不成功则跳转到登录界面
    next({ path: '/login' })//跳转页面的方法
  } else {
    next()
  }
})
/*
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));//前端项目的会话管理工具
  if (!user && to.path != '/login') {//如果登录不成功则跳转到登录界面
    next({ path: '/login' })//跳转页面的方法
  } else {
    next()
  }
})
*/

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

