// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Popup, Swipe, SwipeItem, MessageBox} from 'mint-ui'
import store from './store'
import BScroll from 'better-scroll'
import headline from './components/headline/headline.vue'
import footline from './components/footline/footline.vue'
import pickerMod from './components/pickerMod/pickerMod.vue'
import scroll from './components/scroll/scroll.vue'
// import vConsole from 'vconsole'
// import wx from 'weixin-js-sdk'
import {
  __boxheight,
  __GetRequest,
  __newGuid,
  pushHistory
} from './util/viewportWidth.js'
import {
  getCookie,
  setCookie
} from './util/cookieUtil.js'
import {
  toPercent
} from "./common/js/ArrayChange"

import storageUtil from './util/storageUtil.js'
import '../static/css/reset.styl'
import './common/js/adaptive'
import 'mint-ui/lib/style.css'

// import 'vue-ydui/dist/ydui.base.css'
// Vue.component(Loadmore.name, Loadmore);
Vue.component("scroll", scroll);
Vue.component('headline', headline)
Vue.component('pickerMod', pickerMod)
Vue.component('footline', footline)
Vue.component(Popup.name, Popup)
// Vue.component(DateTime.name, DateTime)
// Vue.component(Picker.name, Picker)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.prototype.__boxheight = __boxheight
Vue.prototype.__GetRequest = __GetRequest
Vue.prototype.__newGuid = __newGuid
Vue.prototype.getCookie = getCookie
Vue.prototype.setCookie = setCookie
Vue.prototype.saveTodos = storageUtil.saveTodos
Vue.prototype.readTodos = storageUtil.readTodos
Vue.prototype.toPercent = toPercent
Vue.prototype.MessageBox = MessageBox
Vue.prototype.pushHistory = pushHistory
Vue.prototype.BScroll = BScroll
Vue.prototype.apiPrefix = 'http://api2.cpf360.com/'
// Vue.prototype.apiPrefix = 'http://api4.cpf360.com/'
// Vue.prototype.apiPrefix = 'http://211.94.137.70:8001/'
/*wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看

  // 传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp:'' , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名，见附录1
  jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});*/
/*let obj = __GetRequest()
let num  = obj.id ? obj.id : ""
console.log(num);
if (!obj.code) {
  window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3e7e9692d8fc4a4b&redirect_uri=http://wechat.cpf360.com/index.html?id=${num}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`)
}*/
// eslint-disable no-new
// new vConsole
new Vue({
  el: '#app',
  render: h  => h(App),
  router,
  store,
})


