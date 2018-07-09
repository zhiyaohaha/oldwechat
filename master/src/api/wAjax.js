import axios from 'axios'
export default async function wAjax (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // if (type === 'GET') {
    // 准备url query参数数据
    // 发送get请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串

      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
        console.log(url)
      }
      promise = axios.get(url)
      // axios.get(url)
    } else {
      // 发送post请求
      // debugger
      promise = axios({
        method: 'post',
        url: url,
        data: postAuth(JSON.stringify(data)),
      })
    }
    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        alert(error)
        reject(error)
      })
  })
}
