import request from '@/utils/request'

// 档案查询 - 档案查询获取项目查询列表
export function searchEngineeringList(data) {
  return request.service({
      url: '/prod-api/v1/search/engineering/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询导出选中项目数据
export function searchEngineeringDownload(data) {
  return request.service({
      url: '/prod-api/v1/search/engineering/download',
      method: 'post',
      responseType: 'blob',
      data
  })
}

// 档案查询 - 档案查询获取项目详情
export function searchEngineeringEngineeringId(data) {
  return request.service({
      url: '/prod-api/v1/search/engineering/engineering_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取建筑工程专业信息
export function searchProjectBuildList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/build/list',
      method: 'post',
      data
  })
}


// 档案查询 - 档案查询模块单位工程获取桥梁工程专业信息
export function searchProjectBridgeList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/bridge/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取管线工程专业信息
export function searchProjectPipelineList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/pipeline/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取轨道工程专业信息
export function searchProjectTrackList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/track/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询模块单位工程获取道路工程专业信息
export function searchProjectRoadList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/road/list',
      method: 'post',
      data
  })
}


// 档案查询 - 档案查询模块单位工程获取隧道工程专业信息
export function searchProjectTunnelList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/tunnel/list',
      method: 'post',
      data
  })
}


// 档案查询 - 档案查询根据单位工程id查询单位工程信息
export function searchProjectProjectId(data) {
  return request.service({
      url: '/prod-api/v1/search/project/project_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据单位工程id获取案卷列表
export function searchFilesListProjectId(data) {
  return request.service({
      url: '/prod-api/v1/search/files/list/project_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据案卷id获取文件列表
export function searchFileListFilesId(data) {
  return request.service({
      url: '/prod-api/v1/search/file/list/files_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据案卷id查询案卷详情
export function searchFilesListFilesId(data) {
  return request.service({
      url: '/prod-api/v1/search/files/list/files_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据文件id查询文件详情
export function searchFilesListFileId(data) {
  return request.service({
      url: '/prod-api/v1/search/file/list/file_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询获取项目侧边栏数据
export function searchEngineeringListSide(data) {
  return request.service({
      url: '/prod-api/v1/search/engineering/list_side',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据项目id获取单位工程列表
export function searchProjectListEngineeringId(data) {
  return request.service({
      url: '/prod-api/v1/search/project/list/engineering_id',
      method: 'post',
      data
  })
}


//单位工程级 

// 档案查询 - 档案查询查询单位工程列表
export function searchProjectList(data) {
  return request.service({
      url: '/prod-api/v1/search/project/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询获取单位工程侧边栏数据
export function searchProjectListSide(data) {
  return request.service({
      url: '/prod-api/v1/search/project/list_side',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询导出选中单位工程数据
export function downloadSearchProject(data) {
  return request.service({
      url: '/prod-api/v1/search/project/download',
      method: 'post',
      responseType: 'blob',
      data
  })
}


//案卷级查询

// 档案查询 - 档案查询案卷级列表查询
export function searchFilesList(data) {
  return request.service({
      url: '/prod-api/v1/search/files/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询导出选中单位工程数据
export function downloadSearchFiles(data) {
  return request.service({
      url: '/prod-api/v1/search/files/download',
      method: 'post',
      responseType: 'blob',
      data
  })
}


// 文件级

// 档案查询 - 档案查询文件级列表查询
export function searchFileList(data) {
  return request.service({
      url: '/prod-api/v1/search/file/list',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询导出选中文件数据
export function downloadSearchFile(data) {
  return request.service({
      url: '/prod-api/v1/search/file/download',
      method: 'post',
      responseType: 'blob',
      data
  })
}

// 档案查询 - 档案查询查询文件存放位置
export function searchFilePosition(data) {
  return request.service({
      url: '/prod-api/v1/search/file/position',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据项目id获取案卷列表
export function searchFilesListEngineeringId(data) {
  return request.service({
      url: '/prod-api/v1/search/files/list/engineering_id',
      method: 'post',
      data
  })
}


// 档案查询 - 获取案卷目录备忘封面地址
export function getSearchFilesGetUrl(data) {
  return request.service({
      url: '/prod-api/v1/search/file/get_url',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询通过工程id获取声像档案列表
export function getSearchAudioFilesListProjectId(data) {
  return request.service({
      url: '/prod-api/v1/search/audio/files/list/project_id',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询查询文件附件数量
export function getSearchFileCount(data) {
  return request.service({
      url: '/prod-api/v1/search/file/count',
      method: 'post',
      data
  })
}

// 档案查询 - 档案查询根据文件id获取文件url地址
export function getSearchFileUrl(data) {
  return request.service({
    url: '/prod-api/v1/search/file/url/file_id',
    method: 'post',
    data,
  })
}
