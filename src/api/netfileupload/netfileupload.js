import request from '@/utils/request'

// 互联网文件操作相关接口 - 互联网数据压缩包文件切片上传
export function netuploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/net/upload',
    method: 'post',
    data
  })
}


// 互联网文件操作相关接口 - 互联网数据压缩包文件切片是否存在
export function netcheckFile(data) {
  return request.service1({
    url: '/file-api/v1/file/net/check',
    method: 'post',
    data
  })
}


// 互联网文件操作相关接口 - 互联网数据压缩包文件合并切片生成文件
export function netmergeFile(data) {
  return request.service1({
    url: '/file-api/v1/file/net/merge',
    method: 'post',
    data
  })
}


// 互联网文件操作相关接口 - 互联网数据压缩包解压
export function netunzipFile(data) {
  return request.service1({
    url: '/file-api/v1/file/net/unzip',
    method: 'post',
    data
  })
}


// 互联网文件操作相关接口 - 互联网数据导入
export function netimportFile(data) {
  return request.service1({
    url: '/file-api/v1/file/net/import',
    method: 'post',
    data
  })
}



// 企业报送接收 - 离线数据压缩包文件切片上传
export function offlineFileupload(data) {
  return request.service1({
    url: '/file-api/v1/file/offline/upload',
    method: 'post',
    data
  })
}

// 企业报送接收 - 离线数据压缩包文件切片是否存在
export function offlineFilecheck(data) {
  return request.service1({
    url: '/file-api/v1/file/offline/check',
    method: 'post',
    data
  })
}

// 企业报送接收 - 离线数据压缩包文件合并切片生成文件
export function offlineFilemerge(data) {
  return request.service1({
    url: '/file-api/v1/file/offline/merge',
    method: 'post',
    data,
  })
}

// 企业报送接收 - 离线数据压缩包解压
export function offlineFileunzip(data) {
  return request.service1({
    url: '/file-api/v1/file/offline/unzip',
    method: 'post',
    data,
  })
}


// 企业报送接收 - 离线数据导入
export function offlineFileimport(data) {
  return request.service1({
    url: '/file-api/v1/file/offline/import',
    method: 'post',
    data
  })
}