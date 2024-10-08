import request from '@/utils/request'

// 数字化文件级文件切片上传
export function uploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/upload',
    method: 'post',
    data
  })
}

// 数字化文件级检查文件切片是否存在
export function checkUploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/check',
    method: 'post',
    data
  })
}

// 数字化文件级合并切片生成文件
export function mergeUploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/merge',
    method: 'post',
    data
  })
}

// 数字化解压文件夹
export function unzipFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/unzip',
    method: 'post',
    data
  })
}

// 数字化将图片和文件绑定
export function bindFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/bind_file',
    method: 'post',
    data
  })
}

// 数字化将图片文件转换pdf并绑定
export function convertPdfFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/convert_pdf',
    method: 'post',
    data
  })
}

// 数字化加工文件操作相关接口 - 数字化加工单个文件上传压缩
export function zipFileDigitSingleUpload(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/single/upload/zip',
    method: 'post',
    data
  })
}

// 数字化加工文件操作相关接口 - 数字化加工单个文件上传绑定
export function bindFileDigitSingleUpload(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/single/upload/bind',
    method: 'post',
    data
  })
}


// 数字化加工文件操作相关接口 - 数字化加工单个文件上传
export function digitSingleUpload(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/single/upload',
    method: 'post',
    data
  })
}