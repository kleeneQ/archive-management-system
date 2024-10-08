import request from '@/utils/request'

// 盒上架接口 - 获取盒列表数据
export function getBoxshelvingList(data) {
  return request.service({
      url: '/prod-api/v1/box/list',
      method: 'post',
      data
  })
}

// 盒上架接口 - 拆盒操作
export function UnPacketBox(data) {
  return request.service({
      url: '/prod-api/v1/box/un_packet',
      method: 'post',
      data
  })
}

// 盒上架接口 - 盒子下架
export function UndercarriageBox(data) {
  return request.service({
      url: '/prod-api/v1/box/undercarriage',
      method: 'post',
      data
  })
}


// 盒上架接口 - 盒子自动上架
export function BoxAutoShelving(data) {
  return request.service({
      url: '/prod-api/v1/box/auto/shelving',
      method: 'post',
      data
  })
}

// 盒上架接口 - 盒子手动上架
export function BoxManualShelving(data) {
  return request.service({
      url: '/prod-api/v1/box/manual/shelving',
      method: 'post',
      data
  })
}

// 盒上架接口 - 手动上架库房级联列表
export function BoxStoreHouseListRecordId(data) {
  return request.service({
      url: '/prod-api/v1/box/store_house/list/record_id',
      method: 'post',
      data
  })
}


// 盒上架接口 - 下载脊背
export function BoxBackDownload(data) {
  return request.service({
      url: '/prod-api/v1/box/back/download',
      method: 'post',
      responseType: 'blob',
      data
  })
}

// 盒上架接口 - 根据盒id生成脊背
export function getBoxBack(data) {
  return request.service({
      url: '/prod-api/v1/box/back',
      method: 'post',
      data
  })
}

// 盒上架接口 - 盒子带起始位置自动上架
export function autoPositionShelving(data) {
  return request.service({
      url: '/prod-api/v1/box/auto/position/shelving',
      method: 'post',
      data
  })
}
