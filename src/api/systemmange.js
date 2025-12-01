import request from '@/utils/request'

// 侧边菜单
export function fetchUserMenuList () {
  return request.service({
    url: '/v1/menu/list/side',
    method: 'post'
  })
}

// 总菜单列表
export function getMenusList () {
  return request.service({
    url: '/v1/menu/list',
    method: 'post'
  })
}

// 分类权限
export function getMenusRoleList (data) {
  return request.service({
    url: '/v1/menu/list/drop',
    method: 'post',
    data
  })
}

// 新增菜单
export function addMenuItem (data) {
  return request.service({
    url: '/v1/menu/save',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function modifyMenuItem (data) {
  return request.service({
    url: '/v1/menu/update',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function removeMenuItem (data) {
  return request.service({
    url: '/v1/menu/remove',
    method: 'post',
    data: data
  })
}

// 系统日志
export function getLogList (data) {
  return request.service({
    url: '/v1/log/list',
    method: 'post',
    data: data
  })
}

// 公共基础接口 - 站内信列表
export function getMessageList (data) {
  return request.service({
    url: '/v1/message/list',
    method: 'post',
    data: data
  })
}

// 公共基础接口 - 修改站内信状态为已读
export function getMessageUpdateStatus (data) {
  return request.service({
    url: '/v1/message/update_status',
    method: 'post',
    data: data
  })
}

// 系统管理接口 - 删除系统日志
export function deleteMessageLog (data) {
  return request.service({
    url: '/v1/log/delete',
    method: 'post',
    data: data
  })
}
