import request from '@/utils/request'

// 库房管理接口 - 获取库房侧边栏
export function StoreHouseListSide(data) {
  return request.service({
      url: '/prod-api/v1/store_house/list/side',
      method: 'post',
      data
  })
}


//库房管理接口 - 库房列表
export function StoreHouseLibraryList(data) {
  return request.service({
      url: '/prod-api/v1/store_house/library/list',
      method: 'post',
      data
  })
}


//库房管理接口 - 添加库房
export function StoreHouseLibrarySave(data) {
  return request.service({
      url: '/prod-api/v1/store_house/library/save',
      method: 'post',
      data
  })
}

//库房管理接口 - 删除库房
export function StoreHouseLibraryDelete(data) {
  return request.service({
      url: '/prod-api/v1/store_house/library/delete',
      method: 'post',
      data
  })
}


//库房管理接口 - 修改库房
export function StoreHouseLibraryUpdate(data) {
  return request.service({
      url: '/prod-api/v1/store_house/library/update',
      method: 'post',
      data
  })
}

//库房管理接口 - 根据树id获取下级列表
export function StoreHouseListTreeId(data) {
  return request.service({
      url: '/prod-api/v1/store_house/list/tree_id',
      method: 'post',
      data
  })
}


//库房管理接口 - 添加柜列层信息
export function StoreHouseCabinetSave(data) {
  return request.service({
      url: '/prod-api/v1/store_house/cabinet/save',
      method: 'post',
      data
  })
}


//库房管理接口 - 删除柜
export function StoreHouseCabinetDelete(data) {
  return request.service({
      url: '/prod-api/v1/store_house/cabinet/delete',
      method: 'post',
      data
  })
}


//库房管理接口 - 修改柜信息
export function StoreHouseCabinetUpdate(data) {
  return request.service({
      url: '/prod-api/v1/store_house/cabinet/update',
      method: 'post',
      data
  })
}



