import request from '@/utils/request'

// 下载数据字典导入模板
export function downloadImportTemplate() {
  return request.service({
      url: '/prod-api/v1/data_dictionary/download_model',
      method: 'post',
      responseType: 'blob'
  })
}


// 数字化加工导入模板下载
export function downloadArchivesProcess() {
  return request.service1({
    url: '/file-api/v1/file/digit/model/download',
    method: 'post',
    responseType: 'blob'
  })
}


// 数字化加工项目工程数据导入
export function importDigitEngineering(data) {
  return request.service({
      url: '/prod-api/v1/digit/engineering/import',
      method: 'post',
      data
  })
}

// 数字化加工管理类案卷数据导入
export function importManage(data) {
  return request.service({
      url: '/prod-api/v1/digit/manage/files/import',
      method: 'post',
      data
  })
}

// 数字化加工单位工程数据导入
export function importDigitProject(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/import',
      method: 'post',
      data
  })
}
//数字化加工案卷数据导入
export function importDigitFiles(data) {
  return request.service({
      url: '/prod-api/v1/digit/files/import',
      method: 'post',
      data
  })
}

// 数字化加工文件数据导入
export function importDigitFile(data) {
  return request.service({
      url: '/prod-api/v1/digit/file/import',
      method: 'post',
      data
  })
}

// 档案扫描著录接口 - 修改数字化加工项目工程数据是否录入完成状态
export function EngineeringFinishStatus(data) {
  return request.service({
      url: '/prod-api/v1/digit/engineering/finish/status',
      method: 'post',
      data
  })
}

// 数字化加工文件操作相关接口 - 数字化加工脏数据清理
export function resetFileDigitData(data) {
  return request.service1({
      url: '/file-api/v1/file/digit/data/reset',
      method: 'post',
      data
  })
}

