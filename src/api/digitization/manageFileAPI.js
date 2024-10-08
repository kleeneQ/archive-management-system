import request from '@/utils/request'

// 根据项目工程id获取管理类案卷列表
export function getFileManageList(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/list/engineering_id',
    method: 'post',
    data
  })
}

// 数字化增加管理类案卷
export function addFileManage(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/save',
    method: 'post',
    data
  })
}

// 数字化修改管理类案卷
export function editFileManage(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/update',
    method: 'post',
    data
  })
}

// 数字化删除管理类案卷
export function removeFileManage(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/delete',
    method: 'post',
    data
  })
}

// 管理类案卷提交审核
export function setManageAudit(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/check/submit',
    method: 'post',
    data
  })
}

// 获取管理类案卷审核详情
export function getManageAuditDetail(data) {
  return request.service({
    url: '/prod-api/v1/digit/manage/files/verify/list',
    method: 'post',
    data
  })
}
