import request from '@/utils/request'

// 档案扫描著录接口 - 数字化加工扫描插件关联工程声像文件列表
export function getDigitAudioFileScanList(data) {
  return request.service({
    url: '/prod-api/v1/digit/audio/file/scan/list',
    method: 'post',
    data
  })
}

// 档案扫描著录接口 - 数字化加工扫描插件关联工程工程文件列表
export function getDigiProjectFileScanList(data) {
  return request.service({
    url: '/prod-api/v1/digit/project/file/scan/list',
    method: 'post',
    data
  })
}

// 数字化加工文件操作相关接口 - 数字化加工加工扫描插件文件上传
export function uploadDigitScanFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/scan/file/upload',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 数字化加工文件操作相关接口 - 数字化加工加工扫描插件文件绑定
export function bindDigitScanFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/scan/file/bind',
    method: 'post',
    data
  })
}




// 档案修护加工文件操作相关接口 - 档案修护档案扫描插件文件上传
export function uploadMaintenanceScanFile(data) {
  return request.service1({
    url: '/file-api/v1/file/maintenance/scan/file/upload',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 档案修护加工文件操作相关接口 - 档案修护档案扫描插件文件绑定
export function bindMaintenanceScanFile(data) {
  return request.service1({
    url: '/file-api/v1/file/maintenance/scan/file/bind',
    method: 'post',
    data
  })
}

// 档案扫描著录接口 - 档案维护加工扫描插件关联工程声像文件列表
export function getMaintenanceAudioFileScanList(data) {
  return request.service({
    url: '/prod-api/v1/maintenance/audio/file/scan/list',
    method: 'post',
    data
  })
}

// 档案扫描著录接口 - 档案维护加工扫描插件关联工程工程文件列表
export function getMaintenanceProjectFileScanList(data) {
  return request.service({
    url: '/prod-api/v1/maintenance/project/file/scan/list',
    method: 'post',
    data
  })
}