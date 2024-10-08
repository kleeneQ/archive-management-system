import request from '@/utils/request'

// 库房管理接口 - 库房状态根据树id获取下级列表
export function StoreHouseStatusListTreeId(data) {
  return request.service({
      url: '/prod-api/v1/store_house_status/list/tree_id',
      method: 'post',
      data
  })
}


// 库房管理接口 - 获取库房状况柜状况接口
export function StoreHouseStatusLibraryStatusCabinet(data) {
  return request.service({
      url: '/prod-api/v1/store_house_status/library_status/cabinet',
      method: 'post',
      data
  })
}


// 库房管理接口 - 获取库房状况列状况接口
export function StoreHouseStatusLibraryStatusColumn(data) {
  return request.service({
      url: '/prod-api/v1/store_house_status/library_status/column',
      method: 'post',
      data
  })
}


// 库房管理接口 - 获取库房状况层状况接口
export function StoreHouseStatusLibraryStatusLayer(data) {
  return request.service({
      url: '/prod-api/v1/store_house_status/library_status/layer',
      method: 'post',
      data
  })
}


// 库房管理接口 - 获取库房状况盒子状况接口
export function StoreHouseStatusLibraryStatusBox(data) {
  return request.service({
      url: '/prod-api/v1/store_house_status/library_status/box',
      method: 'post',
      data
  })
}


// 库房管理接口 - 库房状态获取存档详情
export function StoreHouseStatusListBox(data) {
  return request.service({
      url: '/prod-api/v1/store_house_status/list/box',
      method: 'post',
      data
  })
}


// 库房管理接口 - 获取投药管理记录列表
export function StoreHouseMedicateList(data) {
  return request.service({
      url: '/prod-api/v1/store_house/medicate/list',
      method: 'post',
      data
  })
}


// 库房管理接口 - 增加投药管理记录
export function StoreHouseMedicateSave(data) {
  return request.service({
      url: '/prod-api/v1/store_house/medicate/save',
      method: 'post',
      data
  })
}

// 库房管理接口 - 删除投药管理记录
export function StoreHouseMedicateDelete(data) {
  return request.service({
      url: '/prod-api/v1/store_house/medicate/delete',
      method: 'post',
      data
  })
}


// 库房管理接口 - 修改投药管理记录
export function StoreHouseMedicateUpdate(data) {
  return request.service({
      url: '/prod-api/v1/store_house/medicate/update',
      method: 'post',
      data
  })
}


// 库房管理接口 - 库房温湿度记录列表
export function StoreHouseHumidityList(data) {
  return request.service({
      url: '/prod-api/v1/store_house/humidity/list',
      method: 'post',
      data
  })
}

// 库房管理接口 -  增加库房温湿度记录
export function StoreHouseHumiditySave(data) {
  return request.service({
      url: '/prod-api/v1/store_house/humidity/save',
      method: 'post',
      data
  })
}

// 库房管理接口 -  删除库房温湿度记录
export function StoreHouseHumidityDelete(data) {
  return request.service({
      url: '/prod-api/v1/store_house/humidity/delete',
      method: 'post',
      data
  })
}

// 库房管理接口 -  编辑库房温湿度记录
export function StoreHouseHumidityUpdate(data) {
  return request.service({
      url: '/prod-api/v1/store_house/humidity/update',
      method: 'post',
      data
  })
}