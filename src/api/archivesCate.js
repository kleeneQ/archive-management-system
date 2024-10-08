import request from '@/utils/request'

// 档案分类管理
export function getArchivesCateList() {
  return request.service({
    url: '/prod-api/v1/file_type/list/drop',
    method: 'post'
  })
}

// 添加档案分类
export function addArchivesCate(data) {
  return request.service({
    url: '/prod-api/v1/file_type/save',
    method: 'post',
    data
  })
}

// 编辑档案分类
export function editArchivesCate(data) {
  return request.service({
    url: '/prod-api/v1/file_type/update',
    method: 'post',
    data
  })
}

// 删除档案分类
export function removeArchivesCate(data) {
  return request.service({
    url: '/prod-api/v1/file_type/delete',
    method: 'post',
    data
  })
}

// 导入档案分类
export function importArchivesCate(data) {
  return request.service({
    url: '/prod-api/v1/file_type/import',
    method: 'post',
    data
  })
}

// 导出档案分类
export function exportArchivesCate(data) {
  return request.service({
      url: '/prod-api/v1/file_type/export',
      method: 'post',
      data,
      responseType: 'blob'
  })
}

// 档案分类模板下载
export function downloadArchivesCate() {
  return request.service1({
    url: '/file-api/v1/file/file_type/model/download',
    method: 'post',
    responseType: 'blob'
  })
}


// 数字化加工项目工程数据导入
export function importDigitEngineering() {
  return request.service({
      url: '/prod-api/v1/digit/engineering/import',
      method: 'post',
      data
  })
}