import request from '@/utils/request'

// 城建档案管理 - 城建档案管理纸质档案列表
export function getUtilizationPlacePaperList(data) {
    return request.service({
        url: '/prod-api/v1/utilization/place/paper/list',
        method: 'post',
        data
    })
}

// 城建档案管理 - 纸质文件归档操作
export function UtilizationPlacePaper(data) {
  return request.service({
      url: '/prod-api/v1/utilization/place/paper',
      method: 'post',
      data
  })
}


// 城建档案管理 - 城建档案管理电子档案列表
export function getUtilizationPlaceElectronicsList(data) {
    return request.service({
        url: '/prod-api/v1/utilization/place/electronics/list',
        method: 'post',
        data
    })
}

// 城建档案管理 - 电子文件归档操作
export function UtilizationElectronicsPaper(data) {
  return request.service({
      url: '/prod-api/v1/utilization/place/electronics',
      method: 'post',
      data
  })
}

// 城建档案管理 - 城建档案管理电子档案列表
export function getUtilizationPlaceAudioList(data) {
    return request.service({
        url: '/prod-api/v1/utilization/place/audio/list',
        method: 'post',
        data
    })
}

// 城建档案管理 -  声像文件归档操作
export function UtilizationAudioPaper(data) {
  return request.service({
      url: '/prod-api/v1/utilization/place/audio',
      method: 'post',
      data
  })
}

// 城建档案管理 - 城建档案管理查询文件附件数量
export function GetUtilizationFileCount(data) {
    return request.service({
        url: '/prod-api/v1/utilization/file/count',
        method: 'post',
        data
    })
  }