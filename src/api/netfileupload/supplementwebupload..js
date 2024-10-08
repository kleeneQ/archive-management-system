import request from '@/utils/request'

// 档案补卷 - 档案补卷文件级文件切片上传
export function netuploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/supplement/upload',
    method: 'post',
    data
  })
}


// 档案补卷 - 档案补卷文件级检查文件切片是否存在
export function netcheckFile(data) {
  return request.service1({
    url: '/file-api/v1/file/supplement/check',
    method: 'post',
    data
  })
}


// 档案补卷 - 档案补卷文件级合并切片生成文件
export function netmergeFile(data) {
  return request.service1({
    url: '/file-api/v1/file/supplement/merge',
    method: 'post',
    data
  })
}


// 档案补卷 - 档案补卷解压文件夹
export function netunzipFile(data) {
  return request.service1({
    url: '/file-api/v1/file/supplement/unzip',
    method: 'post',
    data
  })
}


// 档案补卷 - 档案补卷将图片文件转换pdf并绑定
export function supplementConvertPdf(data) {
  return request.service1({
    url: '/file-api/v1/file/supplement/convert_pdf',
    method: 'post',
    data
  })
}

// 档案补卷 - 档案补卷将图片和文件绑定
export function supplementBindFile(data) {
  return request.service1({
    url: '/file-api/v1/file/supplement/bind_file',
    method: 'post',
    data
  })
}
