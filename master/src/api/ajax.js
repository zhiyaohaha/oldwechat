import axios from 'axios'
import md5 from 'js-md5'
import {postAuth} from '../util/viewportWidth'
import {
  getCookie,
} from '../util/cookieUtil'
import {MessageBox} from "mint-ui"

axios.defaults.withCredentials = true
export default function ajax(url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // if (type === 'GET') {
    // 准备url query参数数据
    // 发送get请求
    let promise
    let a = getCookie("token")
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      data.weChatUserIdHanLi = a
      let dataArr = Object.keys(data).sort()
      dataArr.forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })

      let timestamp = (new Date().getTime()).toString().substr(0, 10)
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      let sign = md5(dataStr + timestamp + '84qudMIhOkX5JMQXVd0f4jneqfP2Lp')
      url = url + '?' + dataStr + '&timestamp=' + timestamp + '&sign=' + sign
      // alert(JSON.stringify(url))
      promise = axios.get(url)

      // axios.get(url)
    } else {
      // 发送post请求
      // debugger
      // alert(JSON.stringify(data))
      promise = axios({
        method: 'post',
        url: url,
        data: postAuth(JSON.stringify(data), a),
      })
    }
    promise.then(response => {
      resolve(response.data)
      if (!response.data.success && response.data.code === "UnknownError") {
        MessageBox.alert(response.data.message, "提示")
      }
      //  alert(JSON.stringify(response.data))
    })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}


