import request from '@/utils/request'

// 企业报送接收 - 报送接收项目列表
export function getOfflineEngineeringList(data) {
    return request.service({
        url: '/prod-api/v1/offline/engineering/list',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收根据项目id获取单位工程列表
export function getOfflineProjectListEngineeringId(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/list/engineering_id',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收根据项目id获取案卷列表
export function getOfflineFileslistEngineeringId(data) {
    return request.service({
        url: '/prod-api/v1/offline/files/list/engineering_id',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收根据单位工程id获取案卷列表
export function getOfflineFileslistProjectId(data) {
    return request.service({
        url: '/prod-api/v1/offline/files/list/project_id',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收根据案卷id获取文件列表
export function getOfflineFileListFilesId(data) {
    return request.service({
        url: '/prod-api/v1/offline/file/list/files_id',
        method: 'post',
        data 
    })
}

// 企业报送接收 - 企业报送接收根据文件id获取文件url地址
export function getOfflineFileOfflineFileUrlFileId(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/file/url/file_id',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收查询文件附件数量
export function getOfflineFileCount(data) {
    return request.service({
        url: '/prod-api/v1/offline/file/count',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收单位工程获取建筑工程专业信息
export function getOfflineProjectBuildList(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/build/list',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收单位工程获取桥梁工程专业信息
export function getOfflineProjectBridgeList(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/bridge/list',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收单位工程获取管线工程专业信息
export function getOfflineProjectPipelineList(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/pipeline/list',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收单位工程获取轨道工程专业信息
export function getOfflineProjectTrackList(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/track/list',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收单位工程获取道路工程专业信息
export function getOfflineProjectRoadList(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/road/list',
        method: 'post',
        data
    })
}

// 企业报送接收 - 企业报送接收单位工程获取隧道工程专业信息
export function getOfflineProjectTunnelList(data) {
    return request.service({
        url: '/prod-api/v1/offline/project/tunnel/list',
        method: 'post',
        data
    })
}

// 档案分类模板下载
export function downloadFileOfflineDownloadHandoverCertificate() {
    return request.service1({
      url: '/file-api/v1/file/offline/download/handover_certificate',
      method: 'post',
      responseType: 'blob'
    })
  }

  // 企业报送接收 - 开具接收和移交证明书
export function getfileOfflineDownloadHandoverCertificate(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/download/handover_certificate',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

  // 企业报送接收 - 预览接收和移交证明书
  export function getfileOfflineViewHandoverCertificate(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/view/handover_certificate',
        method: 'post',
        data
    })
}

//企业报送接收 - 获取验收意见书准备数据
  export function getOfflineDataProposal(data) {
      return request.service({
          url: '/prod-api/v1/offline/data/proposal',
          method: 'post',
          data
      })
  }

// 企业报送接收 - 预览验收意见书
export function getFileOfflineViewProposal(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/view/proposal',
        method: 'post',
        data
    })
}

// 企业报送接收 - 开具验收意见书
export function getFileOfflineDownloadProposal(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/download/proposal',
        method: 'post',
        data,
        responseType: 'blob'
    })
}


// 企业报送接收 - 企业报送接收附件信息不匹配和缺失文件列表
export function getOfflineLackEnclosure(data) {
    return request.service({
        url: '/prod-api/v1/offline/lack/enclosure',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收附件信息不匹配和缺失文件列表获取案卷信息
export function getOfflineLackEnclosureFilesInfo(data) {
    return request.service({
        url: '/prod-api/v1/offline/lack/enclosure/files/info',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收缺失必要文件
export function getOfflineLackFileList(data) {
    return request.service({
        url: '/prod-api/v1/offline/lack/file/list',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收缺失必要文件设置是否容缺
export function getOfflineLackFileHandle(data) {
    return request.service({
        url: '/prod-api/v1/offline/lack/file/handle',
        method: 'post',
        data,
    })
}


// 企业报送接收 - 企业报送接收获取项目侧边栏数据
export function getOfflineListSide(data) {
    return request.service({
        url: '/prod-api/v1/offline/list_side',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收人工复审根据案卷id获取文件列表
export function getOfflineManualFileListFilesId(data) {
    return request.service({
        url: '/prod-api/v1/offline/manual/file/list/files_id',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收人工复审数据统计
export function getOfflineManualFileCount(data) {
    return request.service({
        url: '/prod-api/v1/offline/manual/file/count',
        method: 'post',
        data,
    })
}


// 企业报送接收 - 获取企业报送接收案卷目录备忘封面地址
export function getOfflineManualFileGetUrl(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/file/get_url',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收人工复审根据文件id获取文件url地址
export function getOfflineManualFileUrlFileId(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/manual/file/url/file_id',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 企业报送接收人工复审审核操作
export function getOfflineManualFileCheck(data) {
    return request.service({
        url: '/prod-api/v1/offline/manual/file/check',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 获取工程档案离线移交审核意见数据
export function getOfflineCheckOpinion(data) {
    return request.service({
        url: '/prod-api/v1/offline/check/opinion',
        method: 'post',
        data,
    })
}

// 企业报送接收 - 工程档案离线移交审核意见下载
export function downloadFileOfflineOpinionDownload(data) {
    return request.service({
        url: '/prod-api/v1/offline/check/opinion/download',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

// 企业报送接收 - 企业报送接收按单位工程归档入库
export function getFileOfflineFilePlace(data) {
    return request.service1({
        url: '/file-api/v1/file/offline/file/place',
        method: 'post',
        data,
    })
}

// 数字化文件级检查文件切片是否存在
export function checkOfflineFile(data) {
    return request.service1({
      url: '/file-api/v1/file/offline/check',
      method: 'post',
      data
    })
  }

// 离线数据压缩包文件合并切片生成文件
export function mergeOfflineFile(data) {
    return request.service1({
      url: '/file-api/v1/file/offline/merge',
      method: 'post',
      data
    })
  }
  
//  离线数据压缩包解压
export function unzipOfflineFile(data) {
    return request.service1({
      url: '/file-api/v1/file/offline/unzip',
      method: 'post',
      data
    })
  }
