import request from '@/utils/request'

// 根据案卷id获取文件列表
export function getDocumentList(data) {
  return request.service({
    url: '/prod-api/v1/digit/file/list/files_id',
    method: 'post',
    data
  })
}

// 根据案卷id获取无分页文件列表
export function getDocumentLists(data) {
  return request.service({
    url: '/prod-api/v1/digit/file/drop/list/files_id',
    method: 'post',
    data
  })
}

// 数字化文件添加
export function addDocument(data) {
  return request.service({
    url: '/prod-api/v1/digit/file/save',
    method: 'post',
    data
  })
}

// 数字化文件修改
export function editDocument(data) {
  return request.service({
    url: '/prod-api/v1/digit/file/update',
    method: 'post',
    data
  })
}

// 数字化文件级删除文件
export function removeDocument(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/remove',
    method: 'post',
    data
  })
}


//根据文件id获取文件url地址
export function getFileUrl(data) {
  return request.service({
    url: '/prod-api/v1/digit/file/url/file_id',
    method: 'post',
    data
  })
}


//数字化加工文件操作相关接口 - 数字化文件级批量删除文件
export function batchRemoveFile(data) {
  return request.service1({
    url: '/file-api/v1/file/digit/batch/remove',
    method: 'post',
    data
  })
}

