import request from '@/utils/request'

// 根据单位工程id获取案卷列表
export function getFilesProjectList(data) {
  return request.service({
    url: '/prod-api/v1/digit/files/list/project_id',
    method: 'post',
    data
  })
}

// 数字化模块案卷信息添加
export function addFiles(data) {
  return request.service({
    url: '/prod-api/v1/digit/files/save',
    method: 'post',
    data
  })
}

// 数字化模块案卷信息修改
export function editFiles(data) {
  return request.service({
    url: '/prod-api/v1/digit/files/update',
    method: 'post',
    data
  })
}

// 数字化模块案卷信息删除
export function removeFiles(data) {
  return request.service({
    url: '/prod-api/v1/digit/files/delete',
    method: 'post',
    data
  })
}


// 工程类案卷提交审核
export function descriptionSubmitAudit(data) {
  return request.service({
    url: '/prod-api/v1/digit/files/check/submit',
    method: 'post',
    data
  })
}


// 批量编辑案卷文件顺序
export function btneditFileOrderArrangementFilesId(data) {
  return request.service({
    url: '/prod-api/v1/digit/file/order/arrangement/files_id',
    method: 'post',
    data
  })
}
