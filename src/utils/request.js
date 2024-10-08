import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, getCookie } from '@/utils/auth'
import { getRandom } from '@/utils/index'
import md5 from 'js-md5'
// 导入进度条插件
import Nprogress from 'nprogress'

const TAG = 'TQKJ'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 200000 // request timeout
})
const service1 = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_FILE, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 2000000 // request timeout
})

// 单独设置请求超时时间
// export function bbb(data, applyNo) {
//   return request({
//       url: `/aaa/bbb/ddd`,
//       method: 'post',
//       headers: { // 可直接在请求头上添加属性
//           'ApplyNo': applyNo 
//       },
//       timeout: 3 * 60 * 1000,
//       data
//  })
// }


// request interceptor
service.interceptors.request.use(
  config => {
    const RANDOM = getRandom()
    const TIME = new Date().getTime()
    config.headers["random"] = RANDOM
    config.headers['expiration_time'] = TIME

    //接口链接中含有 web 的不用传token 值
    if (config.url.indexOf("web") == -1) {
      // if (config.url !== '/prod-api/web/v1/user/verify-code/get') {
      config.headers['authorization'] = getToken()
      config.headers['check_code'] = md5(TAG + getToken() + TIME + config.url + RANDOM)
      // 在最后必须返回config
      Nprogress.start()
      return config
    }
    
    config.headers['check_code'] = md5(TAG + TIME + config.url + RANDOM)
    if (config.url === '/prod-api/v1/user/login') {
      config.headers['captcha_cookie'] = getCookie()
    }
    // 在最后必须返回config
    Nprogress.start()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service1.interceptors.request.use(
  config => {
    const RANDOM = getRandom()
    const TIME = new Date().getTime()
    config.headers["random"] = RANDOM
    config.headers['expiration_time'] = TIME

    //接口链接中含有 web 的不用传token 值
    if (config.url.indexOf("web") == -1) {
      // if (config.url !== '/prod-api/web/v1/user/verify-code/get') {
      config.headers['authorization'] = getToken()
      config.headers['check_code'] = md5(TAG + getToken() + TIME + config.url + RANDOM)
      // 在最后必须返回config
      Nprogress.start()
      return config
    }
    
    config.headers['check_code'] = md5(TAG + getToken() + TIME + config.url + RANDOM)
    // 在最后必须返回config
    Nprogress.start()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response
    if (response.status !== 200) {
      Message({
        message: response.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (response.status === 10000 || response.status === 50012 || response.status === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          
        })
      }
      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      // 
      if (res.data.status && res.data.status === 10000) {
        MessageBox.confirm('登录信息过期，请重新登录', '登录错误', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = '/'
        })
        return
      }
      Nprogress.done()
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
// response interceptor
service1.interceptors.response.use(
  response => {
    const res = response
    if (response.status !== 200) {
      Message({
        message: response.message || 'Error',
        type: 'error',
        duration: 5 * 10000
      })
      if (response.status === 10000 || response.status === 50012 || response.status === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          
        })
      }
      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      // 
      if (res.data.status && res.data.status === 10000) {
        MessageBox.confirm('登录信息过期，请重新登录', '登录错误', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = '/'
        })
        return
      }
      Nprogress.done()
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 10000
    })
    return Promise.reject(error)
  }
)

export default {service, service1}
