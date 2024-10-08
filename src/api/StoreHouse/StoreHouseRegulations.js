import request from '@/utils/request'

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

// 库房管理接口 - 获取规章制度列表
export function StoreHouseRegulationsList(data) {
  return request.service({
      url: '/prod-api/v1/store_house/regulations/list',
      method: 'post',
      data
  })
}

// 库房管理接口 - 删除库房管理制度
export function StoreHouseRegulationsDelete(data) {
  return request.service({
      url: '/prod-api/v1/store_house/regulations/delete',
      method: 'post',
      data
  })
}


// 库房管理接口 - 增加库房管理制度
export function StoreHouseRegulationsSave(data) {
  return request.service({
      url: '/prod-api/v1/store_house/regulations/save',
      method: 'post',
      data
  })
}

// 库房规章制度附件上传
export function StoreHouseRegulationsFileSimple(data) {
  return request.service1({
      url: '/file-api/v1/file/simple/regulations',
      method: 'post',
      data
  })
}

// 库房管理接口 - 修改库房管理制度
export function StoreHouseRegulationsUpdate(data) {
  return request.service({
      url: '/prod-api/v1/store_house/regulations/update',
      method: 'post',
      data
  })
}


// 库房管理接口 - 获取规章制度详情
export function StoreHouseRegulationsGetInfo(data) {
  return request.service({
      url: '/prod-api/v1/store_house/regulations/get_info',
      method: 'post',
      data
  })
}
