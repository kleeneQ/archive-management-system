import request from '@/utils/request'

// 档案利用 - 数据字典
export function getWebDataDictionaryBistDrop(data) {
    return request.service({
        url: '/prod-api/web/v1/data_dictionary/list/drop',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用一体机项目列表
export function getWebMachineUtilizeEngineeringList(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/engineering/list',
      method: 'post',
      data
  })
}



// 档案利用 - 档案利用一体机上传附件信息
export function submitFileMachineSimpleUtilize(data) {
  return request.service1({
      url: '/file-api/web/v1/file/machine/simple/utilize',
      method: 'post',
      data
  })
}


// 档案利用 - 档案利用一体机添加档案利用信息
export function submitWebMachineUtilizeSubmit(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/submit',
      method: 'post',
      data
  })
}


// 档案利用 - 档案利用一体机查档登记申请审核结果查询
export function getMachineUtilizeIntegratedMachineRecordList(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/integrated_machine/record/list',
      method: 'post',
      data
  })
}

// 档案利用 - 审核状态
export function getDictListDictTag(data) {
  return request.service({
      url: '/prod-api/web/v1/dict/list/dict-tag',
      method: 'post',
      data
  })
}


// 档案利用 - 数据字典
export function getWebFileTypeListDrop(data) {
  return request.service({
      url: '/prod-api/web/v1/file_type/list/drop',
      method: 'post',
      data
  })
}

// 档案利用 - 档案利用一体机下载利用文件压缩包
export function downloadFileMachineUtilizationUtilize(data) {
  return request.service1({
      url: '/file-api/web/v1/file/machine/utilization/utilize/download',
      method: 'post',
      data,
      responseType: 'blob'
  })
}

// 档案利用 - 档案利用一体机获取项目侧边栏数据
export function getMachineUtilizeEngineeringListSide(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/engineering/list_side',
      method: 'post',
      data
  })
}

// 档案利用 - 档案利用一体机根据项目id获取单位工程列表
export function getMachineUtilizeProjectListEngineeringId(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/project/list/engineering_id',
      method: 'post',
      data
  })
}

// 档案利用 - 档案利用一体机根据单位工程id获取案卷列表
export function getMachineUtilizeProjectListProjectId(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/files/list/project_id',
      method: 'post',
      data
  })
}

// 档案利用 - 档案利用一体机根据案卷id获取文件列表
export function getMachineUtilizeProjectListfilesId(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/file/list/files_id',
      method: 'post',
      data
  })
}



// 档案利用 - 存放位置
export function getWebSearchFilePosition(data) {
  return request.service({
      url: '/prod-api/web/v1/search/file/position',
      method: 'post',
      data
  })
}


// 档案利用 - 归档统计
export function getWebUtilizationFileCount(data) {
  return request.service({
      url: '/prod-api/web/v1/utilization/file/count',
      method: 'post',
      data
  })
}


// 档案查询 - 档案查询模块单位工程获取建筑工程专业信息
export function searchProjectBuildList(data) {
  return request.service({
      url: '/prod-api/web/v1/search/project/build/list',
      method: 'post',
      data
  })
}


// 档案查询 - 档案查询模块单位工程获取桥梁工程专业信息
export function searchProjectBridgeList(data) {
  return request.service({
      url: '/prod-api/web/v1/search/project/bridge/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取管线工程专业信息
export function searchProjectPipelineList(data) {
  return request.service({
      url: '/prod-api/web/v1/search/project/pipeline/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取轨道工程专业信息
export function searchProjectTrackList(data) {
  return request.service({
      url: '/prod-api/web/v1/search/project/track/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取道路工程专业信息
export function searchProjectRoadList(data) {
  return request.service({
      url: '/prod-api/web/v1/search/project/road/list',
      method: 'post',
      data
  })
}


// 档案查询 - 档案查询模块单位工程获取隧道工程专业信息
export function searchProjectTunnelList(data) {
  return request.service({
      url: '/prod-api/web/v1/search/project/tunnel/list',
      method: 'post',
      data
  })
}

// 档案利用 - 档案利用一体机添加调卷
export function addMachineUtilizeFileSave(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/file/save',
      method: 'post',
      data
  })
}

//档案利用 - 档案利用一体机已添加调卷列表
export function addMachineUtilizeFileSaveList(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/file/save/list',
      method: 'post',
      data
  })
}


//档案利用 - 档案利用一体机模块提交档案利用调卷审核
export function submitUtilizeFilesVerify(data) {
  return request.service({
      url: '/prod-api/web/v1/utilize/files/verify/submit',
      method: 'post',
      data
  })
}

//档案利用 - 档案利用一体机模块根据文件id获取文件url地址
export function getSearchFileUrlFileId(data) {
  return request.service({
      url: '/prod-api/web/v1/search/file/url/file_id',
      method: 'post',
      data
  })
}

//档案利用 - 档案利用一体机调卷利用审核结果查询
export function getMachineUtilizeCheckRecordList(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/utilize/check/record/list',
      method: 'post',
      data
  })
}

//档案利用 - 档案利用一体机提交利用反馈信息
export function submitUtilizeFeedBack(data) {
  return request.service({
      url: '/prod-api/web/v1/utilize/feed_back/submit',
      method: 'post',
      data
  })
}


//档案利用 - 档案利用一体机获取身份证信息
export function getUtilizeIdCardInfo() {
  return request.service({
      url: '/prod-api/web/v1/utilize/id_card/info/get',
      method: 'post',
  })
}

//档案利用 - 档案利用一体机获取声像档案案卷列表
export function getUtilizeAudioFilesList(data) {
  return request.service({
      url: '/prod-api/web/v1/utilize/audio/files/list',
      method: 'post',
      data
  })
}

//档案利用 - 档案利用一体机获取声像档案利用文件列表
export function getUtilizeAudioPickFileLis(data) {
  return request.service({
      url: '/prod-api/web/v1/utilize/audio/pick/file/list',
      method: 'post',
      data
  })
}

//档案利用 - 档案利用一体机获取声像档案利用文件预览
export function getAudioUtilizePickFileUrlFileId(data) {
  return request.service({
      url: '/prod-api/web/v1/audio/Utilize/pick/file/url/file_id',
      method: 'post',
      data
  })
}

// 档案利用 - 档案利用一体机声像档案添加调卷
export function saveMachineAudioUtilizeFile(data) {
  return request.service({
      url: '/prod-api/web/v1/machine/audio/utilize/file/save',
      method: 'post',
      data
  })
}