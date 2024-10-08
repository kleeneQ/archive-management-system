import request from '@/utils/request'

//  获取案卷审核详情
export function getFilesAuditDetail(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/files/verify/list',
    method: 'post',
    data
  })
}

//  档案扫描著录接口 - 获取工程类案卷审核详情
export function getFilesVerifyDetail(data) {
  return request.service({
    url: '/prod-api/v1/digit/files/verify/list',
    method: 'post',
    data
  })
}

//  档案扫描著录接口 - 获取管理类案卷审核详情
export function getManageFilesAuditDetail(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/verify/list',
    method: 'post',
    data
  })
}

//获取审核模板列表

export function getAuditTemplateList(data) {
  return request.service({
    url: '/prod-api/v1/check_process/list',
    method: 'post',
    data
  })
}

//增加审核流程模板
export function addAuditTemplate(data) {
  return request.service({
    url: '/prod-api/v1/check_process/save',
    method: 'post',
    data
  })
}
//删除审核流程模板
export function DeleteAuditTemplate(data) {
  return request.service({
    url: '/prod-api/v1/check_process/delete',
    method: 'post',
    data
  })
}


//获取用户下拉列表 审核人员 抄送人员
export function getUserList() {
  return request.service({
    url: '/prod-api/v1/user/list/drop',
    method: 'post',
  })
}

//根据模型id查询模型审核流程
export function getAuditFlowTemplate(data) {
  return request.service({
    url: '/prod-api/v1/check_process/list/model_id',
    method: 'post',
    data
  })
}

//根据字典tag查询审核抄送人
export function getAuditTagCopy(data) {
  return request.service({
    url: '/prod-api/v1/check_process/copy_user/list',
    method: 'post',
    data
  })
}

// 编辑审核流程模板
export function updateAuditTemplate(data) {
  return request.service({
    url: '/prod-api/v1/check_process/update',
    method: 'post',
    data
  })
}



// 数字化加工验收审核列表
export function getAuditFilesList(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/list',
    method: 'post',
    data
  })
}

// 数字化加工验收审核列表
export function handleAuditPass(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/check_pass',
    method: 'post',
    data
  })
}

// 数字化加工审核不通过操作
export function handleAuditNoPass(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/check_refuse',
    method: 'post',
    data
  })
}

// 获取案卷目录备忘封面地址
export function getFilesMatalogueMemoCoverURL(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/get_url',
    method: 'post',
    data
  })
}

// 根据案卷id获取文件列表
export function getauditFilelist(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/file/list/files_id',
    method: 'post',
    data
  })
}

// 档案审核 - 根据文件id获取文件url地址
export function getauditFileURL(data) {
  return request.service({
    url: '/prod-api/v1/digit/check/file/url/file_id',
    method: 'post',
    data
  })
}

