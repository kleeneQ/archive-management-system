import request from '@/utils/request'

// 电子文件管理 - 质检文件接收列表
export function getQualityList(data) {
    return request.service({
        url: '/prod-api/v1/quality/list',
        method: 'post',
        data
    })
}

// 电子文件管理 - 电子文件质检文件上传
export function uploadFileQuality(data) {
  return request.service1({
      url: '/file-api/v1/file/quality/upload',
      method: 'post',
      data
  })
}

// 电子文件管理 - 添加质检文件
export function addQualitySave(data) {
  return request.service({
      url: '/prod-api/v1/quality/save',
      method: 'post',
      data
  })
}

// 电子文件管理 - 接收质检文件
export function addQualityReceive(data) {
  return request.service({
      url: '/prod-api/v1/quality/receive',
      method: 'post',
      data
  })
}
