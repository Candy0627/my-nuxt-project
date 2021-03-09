import Vue from 'vue'
import App from './App.vue'
// import 'lib-flexible'
import router from './router'
import store from './store'
import axios from 'axios'
import utils from './utils/urlGet'
import http from './utils/config'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import $ from 'jquery'
import VueCookies from 'vue-cookies'
import CryptoJS from 'crypto-js'
import ElementUI from 'element-ui'
import layer from 'vue-layer'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// let vConsole = new VConsole()
import ScreentipsMask from './pages/mComponents/common/ScreenTips.vue'
import 'mint-ui/lib/style.css'
import {
    Picker
} from 'mint-ui';

Vue.component(Picker.name, Picker);


import Vant from 'vant';
import 'vant/lib/index.css';
import {
    DropdownMenu,
    DropdownItem
} from 'vant';
import {
    Popup
} from 'mint-ui';
import {
    Toast
} from 'mint-ui';
import {
    Actionsheet
} from 'mint-ui';
import {
    DatetimePicker
} from 'mint-ui';
import {
    MessageBox
} from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

Vue.use(Vant);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// Vue.use(Toast);
Vue.component(Toast);
Vue.component(Popup.name, Popup);
Vue.component(Actionsheet.name, Actionsheet);

import 'vue-layer/lib/vue-layer.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
import './assets/styles/animate.css'
import './assets/styles/pcMedia.css'
import './assets/styles/common.css'

import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)

import VueBus from 'vue-bus'
Vue.use(VueBus)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(VueCookies)
// Vue.use(VueToast)
Vue.prototype.$layer = layer(Vue)
Vue.prototype.CryptoJS = CryptoJS
Vue.prototype.$utils = utils
//全局使用，挂载到原型上
Vue.prototype.$messagebox = MessageBox

/* axios配置 */
//axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


Vue.prototype.$http = axios;
Vue.prototype.$axios = http;
var querystring = require('querystring');



// var baseUrl = "http://192.168.2.10"; //本机接口前缀地址
// 荷米斯正式服接口地址
// var baseUrl = "https://api.hermesgames.com.tw";
// 荷米斯测试服接口地址
var baseUrl = "http://devapi.morefun.zone";

/*
 * 封装ajax
 * obj : 全局this
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj:this, data:response
 * */

Vue.prototype.postHttp = function (obj, data, address, fn) {
    http.post(baseUrl + address, querystring.stringify(data)).then(response => {
        // console.log('main.js axios封装中————post接口拦截的状态status', response);
        fn(obj, response);
    }, response => {

    })
}

Vue.prototype.getHttp = function (obj, data, address, fn) {
    http.get(baseUrl + address, {
        params: data
    }).then(function (response) {
        // console.log('main.js axios封装中————get接口拦截的状态status', response);
        fn(obj, response)
    }).catch(function (response) {

    });
}

// 全局前置守卫（回调函数）
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//         if (localStorage.token) {
//             next();
//         } else {

//             if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
//                 router.push({
//                     path: '/mobile/memberCenter'
//                 });
//             } else {
//                 router.push({
//                     path: '/memberCenter'
//                 });
//             }
//         }
//     } else {
//         next();
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


let s_simpol = false;
// 终端判断放在vue实例下面才生效
if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    // 移动端
    require("./assets/styles_m/mMedia.css");
    require("./assets/styles_m/reset.css");
    require("./assets/styles_m/border.css");
    require("./assets/js_m/rem.js");
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        if (window.orientation === 180 || window.orientation === 0) {
            store.commit('setIsMaskScreenTips', false);
        }
        if (window.orientation === 90 || window.orientation === -90) {
            store.commit('setIsMaskScreenTips', true);
        }
    }, false);

    let account = Vue.prototype.$utils.getUrlKey("account");
    let name = Vue.prototype.$utils.getUrlKey("name");
    let token = Vue.prototype.$utils.getUrlKey("token");
    let type = Vue.prototype.$utils.getUrlKey("type");
    let signature = Vue.prototype.$utils.getUrlKey("signature");

    // console.log("11此时能从连接上截取的参数",'account:', account, 'name:', name,'token:', token,'type:', type, 'signature',signature);
    if (account && name && token && type) {
        console.log("test1"+account+name+token+type);
        router.push("/mobile/home?account="+account+"&name="+name+"&token="+token+"&type="+type);
    } else {
        router.push("/mobile/home");
    }
    let typeGame = Vue.prototype.$utils.getUrlKey("type");
    switch (typeGame) {
        case 'register':
            router.push("/mobile/memberCenter?type=register");
            break;
        case 'forgetPassword':
            router.push("/mobile/memberCenter?type=forgetPassword");
            break;
        case 'formDownload':
            router.push("/mobile/memberCenter?type=formDownload");
            break;
    }
} else {
    // PC端
    require("./assets/styles/pcMedia.css");
    require("./assets/styles/common.css");
    requireParams();
    let id = Vue.prototype.$utils.getUrlKey("id");
    switch (id) {
        case '1':
            router.push("/customerCenter?id=1");
            store.commit("setFooterId", 1);
            break;
        case '2':
            router.push("/customerCenter?id=2");
            store.commit("setFooterId", 2);
            break;
        case '3':
            router.push("/customerCenter?id=3");
            store.commit("setFooterId", 3);
			break;
		case 'companyInfo':
			console.log("52",id);
			router.push("/customerCenter?id=companyInfo");
			store.commit('setFooterId', 4)
    }
}

setTimeout(() => {
    requireParams();
}, 1000)

function requireParams() {
    let account = Vue.prototype.$utils.getUrlKey("account");
    let name = Vue.prototype.$utils.getUrlKey("name");
    let token = Vue.prototype.$utils.getUrlKey("token");
    let type = Vue.prototype.$utils.getUrlKey("type");
    let signature = Vue.prototype.$utils.getUrlKey("signature");
    // console.log("22此时能从连接上截取的参数",'account:', account, 'name:', name,'token:', token,'type:', type, 'signature',signature);
    if (account && name && token && type) {
        let datas = {
            account: account,
            name: name,
            token: token,
            type: type,
        };
        Vue.prototype.postHttp(this, datas, "/front/others/login", function (
            obj,
            data
        ) {
            if (data.status == "2000") {

                // obj.options.isHmsLogin = false;
                // obj.options.isLoading = false;
                // obj.options.isMask = false;
                store.commit('setIsHmsLogin', false);
                Toast(data.message);
                let token = data.data.bear_token;
                let userInfo = data.data.user_info;
                store.commit("setToken", token);
                store.commit("setUserInfo", userInfo);
                localStorage.setItem("token", token);
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(userInfo)
                );
            } else {
                Toast(data.message);
                // obj.$notify.error({
                //     title: "錯誤",
                //     message: data.message
                // });
                // obj.options.isLoading = false;
            }
        });
    } else {
        // this.options.isLoading = false;
    }
}
