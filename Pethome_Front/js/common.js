//全局设置axios
axios.defaults.baseURL="http://api.petspet.xyz/"
Vue.prototype.$http=axios
//axios的请求前拦截器
axios.interceptors.request.use(config=>{//成功的回调函数
    //取出存在本地存储里的登录用户信息
    let userToken = localStorage.getItem("userToken");
    //如果存在则设置请求头
    if (userToken){
        //将令牌设置进消息头
        config.headers["User-Token"]=userToken;
        config.headers["User-Type"]="1";
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
        location.href="login.html";
    }
    return res;
},
    err=>{
    return Promise.reject(err);
    }
)

//公用获取url参数方法
//js代码获取get请求地址中的参数值，封装成方法，方便调用
function getParameter(param){
    //query的值为  code=00121G0w36nuaV2CH84w3RcVI5021G0-&state=STATE
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] == param){
            return pair[1];
        }
    }
    return(false);
}

