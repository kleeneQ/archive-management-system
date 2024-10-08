import request from '@/utils/request'



// 动态跟踪 - 获取动态跟踪信息列表
export function getFollowList(data) {
  return request.service({
    url: '/prod-api/v1/follow/list',
    method: 'post',
    data
  })
}

// 动态跟踪 - 导出动态跟踪信息列表
export function exportFollow(data) {
  return request.service({
    url: '/prod-api/v1/follow/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 动态跟踪 - 添加动态跟踪信息
export function saveFollow(data) {
  return request.service({
    url: '/prod-api/v1/follow/save',
    method: 'post',
    data
  })
}

// 动态跟踪 - 动态跟踪关联工程列表
export function getFollowProjectList(data) {
  return request.service({
    url: '/prod-api/v1/follow/project/list',
    method: 'post',
    data
  })
}

// 动态跟踪 - 编辑动态跟踪信息
export function updateFollow(data) {
  return request.service({
    url: '/prod-api/v1/follow/update',
    method: 'post',
    data
  })
}
