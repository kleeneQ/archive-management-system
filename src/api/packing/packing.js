import request from '@/utils/request'

// 工程类案卷手动装盒
export function projectFilesManualPacking(data) {
  return request.service({
      url: '/prod-api/v1/carton/project/manual',
      method: 'post',
      data
  })
}

// 工程类案卷自动装盒
export function projectFilesAutoPacking(data) {
  return request.service({
      url: '/prod-api/v1/carton/project/auto',
      method: 'post',
      data
  })
}


// 管理类案卷手动装盒
export function manageFilesManualPacking(data) {
  return request.service({
      url: '/prod-api/v1/carton/manage/manual',
      method: 'post',
      data
  })
}

// 管理类案卷手动装盒
export function manageFilesAutoPacking(data) {
  return request.service({
      url: '/prod-api/v1/carton/manage/auto',
      method: 'post',
      data
  })
}


// 装盒页面搜索案卷信息

export function searchFilesPackingList(data) {
  return request.service({
      url: '/prod-api/v1/carton/search/files/list',
      method: 'post',
      data
  })
}


// 其它尺寸案卷手动装盒
export function cartonOtherSizeManual(data) {
  return request.service({
      url: '/prod-api/v1/carton/other_size/manual',
      method: 'post',
      data
  })
}

// 其它尺寸案卷自动装盒
export function cartonOtherSizeAuto(data) {
  return request.service({
      url: '/prod-api/v1/carton/other_size/auto',
      method: 'post',
      data
  })
}


// 装盒接口 - 根据案卷id获取无分页文件列表
export function cartonFileDropList(data) {
  return request.service({
      url: '/prod-api/v1/carton/file/drop/list/files_id',
      method: 'post',
      data
  })
}