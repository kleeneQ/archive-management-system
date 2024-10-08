import request from '@/utils/request'

// 验证码
export function getVerifyCode() {
  return request.service({
    url: '/prod-api/web/v1/user/verify-code/get',
    method: 'get',
    responseType: 'arraybuffer'
  })
}

// 登录
export function login(data) {
  return request.service({
    url: '/prod-api/v1/user/login',
    method: 'post',
    data
  })
}

// 用户信息
export function getInfo() {
  return request.service({
    url: '/prod-api/v1/user/get',
    method: 'post'
  })
}

// 用户信息列表
export function getUsersList(data) {
  return request.service({
    url: '/prod-api/v1/user/list',
    method: 'post',
    data
  })
}

// 新增用户
export function addUserFun(data) {
  return request.service({
    url: '/prod-api/v1/user/save',
    method: 'post',
    data
  })
}

// 用户 启用 1 / 禁用 0 / 删除 2
export function userStatrChange(data) {
  return request.service({
    url: '/prod-api/v1/user/forbid',
    method: 'post',
    data
  })
}

// 修改用户信息
export function editUserInfo(data) {
  return request.service({
    url: '/prod-api/v1/user/update',
    method: 'post',
    data
  })
}

// 修改密码
export function modifyPwd(data) {
  return request.service({
    url: '/prod-api/v1/user/change_password',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request.service({
    url: '/prod-api/v1/user/login_out',
    method: 'post'
  })
}
