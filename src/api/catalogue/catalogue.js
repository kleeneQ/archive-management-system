import request from '@/utils/request'

// 档案编目 - 获取项目级编目列表
export function getCatalogueEngineeringList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/engineering/list',
      method: 'post',
      data
  })
}

// 档案编目 - 编目项目级提交审核
export function submitCatalogueEngineering(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/engineering/submit',
      method: 'post',
      data
  })
}

// 档案编目 - 获取单位工程编目列表
export function getCatalogueProjectList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/project/list',
      method: 'post',
      data
  })
}

// 档案编目 - 编目单位工程级提交审核
export function submitCatalogueProject(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/project/submit',
      method: 'post',
      data
  })
}

// 档案编目 - 获取案卷编目列表
export function getCataloguefilesList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/files/list',
      method: 'post',
      data
  })
}

// 档案编目 - 编目单位工程级提交审核
export function submitCataloguefiles(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/files/submit',
      method: 'post',
      data
  })
}

// 档案编目 - 获取文件编目列表
export function getCataloguefileList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/file/list',
      method: 'post',
      data
  })
}

// 档案编目 - 编目文件级提交审核
export function submitCataloguefile(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/file/submit',
      method: 'post',
      data
  })
}


//编目审核

// 编目审核 - 获取编目审核详情
export function getCatalogueCheckVerifyList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/check/verify/list',
      method: 'post',
      data
  })
}

// 编目审核 - 编目项目级审核列表
export function getCatalogueEngineeringCheckList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/engineering/check_list',
      method: 'post',
      data
  })
}

// 编目审核 - 审核工程编目信息
export function submitCatalogueEngineeringCheck(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/engineering/check',
      method: 'post',
      data
  })
}

// 编目审核 - 编目单位工程级审核列表
export function getCatalogueProjectCheckList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/project/check_list',
      method: 'post',
      data
  })
}

// 编目审核 - 审核单位工程编目信息
export function submitCatalogueProjectCheck(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/project/check',
      method: 'post',
      data
  })
}

// 编目审核 - 编目案卷级审核列表
export function getCatalogueFilesCheckList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/files/check_list',
      method: 'post',
      data
  })
}

// 编目审核 - 审核案卷编目信息
export function submitCatalogueFilesCheck(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/files/check',
      method: 'post',
      data
  })
}

// 编目审核 - 编目案卷级审核列表
export function getCatalogueFileCheckList(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/file/check_list',
      method: 'post',
      data
  })
}

// 编目审核 - 审核案卷编目信息
export function submitCatalogueFileCheck(data) {
  return request.service({
      url: '/prod-api/v1/catalogue/file/check',
      method: 'post',
      data
  })
}