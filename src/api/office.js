import request from '@/utils/request'

// 馆内办公流程 - 馆内办公流程->公文管理列表
export function getOfficeFileList(data) {
    return request.service({
        url: '/prod-api/v1/office/file/list',
        method: 'post',
        data
    })
}

// 馆内办公流程 - 馆内办公流程->公文管理->编辑公文
export function updateOfficeFile(data) {
  return request.service({
      url: '/prod-api/v1/office/file/update',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->添加公文
export function saveOfficeFile(data) {
  return request.service({
      url: '/prod-api/v1/office/file/save',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程公文上传
export function uploadFileOffice(data) {
  return request.service1({
      url: '/file-api/v1/file/office/upload',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->公文详情
export function getOfficeFileInfo(data) {
  return request.service({
      url: '/prod-api/v1/office/file/info',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->发起审批
export function createOfficeFileApprove(data) {
  return request.service({
      url: '/prod-api/v1/office/file/create/approve',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->发起签收
export function createOfficeFileSign(data) {
  return request.service({
      url: '/prod-api/v1/office/file/create/sign',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->发起传阅
export function createOfficeFileRead(data) {
  return request.service({
      url: '/prod-api/v1/office/file/create/read',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->公文办结
export function finishOfficeFile(data) {
  return request.service({
      url: '/prod-api/v1/office/file/finish',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->公文归档
export function placeOfficeFile(data) {
  return request.service({
      url: '/prod-api/v1/office/file/place',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->公文管理->公文删除
export function deleteOfficeFile(data) {
  return request.service({
      url: '/prod-api/v1/file/office/file/delete',
      method: 'post',
      data
  })
}

// 打印
// 馆内办公流程 - 馆内办公流程->打印数据
export function getOfficeFilePrintData(data) {
  return request.service({
      url: '/prod-api/v1/office/file/print/data',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->打印
export function downloadOfficeFilePrint(data) {
  return request.service({
      url: '/prod-api/v1/office/file/print/download',
      method: 'post',
      responseType: 'blob',
      data
  })
}


// 我的公文
// 馆内办公流程 - 馆内办公流程->我的公文->公文审批列表
export function getOfficeFileMyApproveList(data) {
  return request.service({
      url: '/prod-api/v1/office/file/my/approve/list',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->我的公文->审批公文
export function checkOfficeFileApprove(data) {
  return request.service({
      url: '/prod-api/v1/office/file/check/approve',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->我的公文->公文签收列表
export function getOfficeFileMySignList(data) {
  return request.service({
      url: '/prod-api/v1/office/file/my/sign/list',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->我的公文->签收公文
export function signOfficeFile(data) {
  return request.service({
      url: '/prod-api/v1/office/file/sign',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->我的公文->公文传阅列表
export function getOfficeFileMyReadList(data) {
  return request.service({
      url: '/prod-api/v1/office/file/my/read/list',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->我的公文->公文传阅详情
export function getOfficeFileMyReadInfo(data) {
  return request.service({
      url: '/prod-api/v1/office/file/my/read/info',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->已归档
export function getOfficeFilePlaceList(data) {
  return request.service({
      url: '/prod-api/v1/office/file/place/list',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->未归档
export function getOfficeFileUnPlaceList(data) {
  return request.service({
      url: '/prod-api/v1/office/file/un_place/list',
      method: 'post',
      data
  })
}



// 馆内办公流程 - 馆内办公流程->我的公文签收详情
export function getOfficeFileMySignInfo(data) {
  return request.service({
      url: '/prod-api/v1/office/file/my/sign/info',
      method: 'post',
      data
  })
}

// 馆内办公流程 - 馆内办公流程->我的公文 详情
export function getOfficeFileMyInfo(data) {
  return request.service({
      url: '/prod-api/v1/office/file/info',
      method: 'post',
      data
  })
}
