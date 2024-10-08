import request from '@/utils/request'

//档案利用审核

// 档案查询利用审核 - 获取档案利用审核列表
export function utilizeCheckList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 获取档案利用审核详情
export function utilizeCheckVerifyList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/verify/list',
        method: 'post',
        data
    })
}
// 档案查询利用审核 - 审核档案利用
export function utilizeCheck(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check',
        method: 'post',
        data
    })
}

//查询记录
// 档案利用 - 获取档案利用查档记录列表
export function utilizeRecordList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/record/list',
        method: 'post',
        data
    })
}

//查询登记

// 档案利用 - 获取档案利用查档登记列表
export function utilizeRegisterList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/register/list',
        method: 'post',
        data
    })
}

//档案利用 - 添加档案利用信息
export function utilizeSubmit(data) {
    return request.service({
        url: '/prod-api/v1/utilize/submit',
        method: 'post',
        data
    })
}


//档案利用 - 档案利用项目列表
export function utilizeEngineeringList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/engineering/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用查档情况登记
export function submitUtilizeConditionRegister(data) {
    return request.service({
        url: '/prod-api/v1/utilize/register',
        method: 'post',
        data
    })
}

// 用户信息
export function getInfo() {
    return request.service({
      url: '/prod-api/v1/user/get',
      method: 'post'
    })
  }

// 档案利用 - 档案利用上传附件信息
export function uploadFileSimpleUtilize(data) {
    return request.service1({
        url: '/file-api/v1/file/simple/utilize',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用获取利用附件列表
export function getFileUtilizationUtilizeList(data) {
    return request.service1({
        url: '/file-api/v1/file/utilization/utilize/list',
        method: 'post',
        data
    })
}


// 档案利用审核 - 档案利用上传附件信息获取利用附件列表
export function getUtilizeCheckVerifyFileList(data) {
    return request.service1({
        url: '/file-api/v1/file/utilize/check/verify/file/list',
        method: 'post',
        data
    })
}

// 档案利用审核 - 档案利用上传附件信息获取利用附件列表
export function getUtilizeuseCheckVerifyFileList(data) {
    return request.service1({
        url: '/file-api/v1/file/utilize/use/check/verify/file/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用获取调卷详情列表
export function getUtilizeFileInfoList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/file/info/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用获取利用详情列表
export function getUtilizeInfoList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/info/list',
        method: 'post',
        data
    })
}


// 档案查询利用审核 - 获取档案利用审核列表
export function getUtilizeCheckList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/list',
        method: 'post',
        data
    })
}


// 档案利用 - 档案利用一体机模块根据文件id获取文件url地址
export function getSearchFileUrlFileId(data) {
    return request.service({
        url: '/prod-api/web/v1/search/file/url/file_id',
        method: 'post',
        data
    })
}

// 档案查询调卷审核 - 获取档案利用调卷审核列表
export function getUtilizeUseCheckList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/check/list',
        method: 'post',
        data
    })
}

// 档案查询调卷审核 - 获取档案利用调卷利用详情
export function getUtilizeFileUrlInfoList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/file_url/info/list',
        method: 'post',
        data
    })
}

// 档案查询调卷审核 - 审核档案调卷利用
export function submitUtilizeuseCheck(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/check',
        method: 'post',
        data
    })
}


// 档案查询调卷审核 - 获取档案利用调卷审核详情
export function getUtilizeUseCheckVerifyList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/check/verify/list',
        method: 'post',
        data
    })
}

// 档案查询调卷审核 - 档案查询调卷审核预览选中的附件
export function getUtilizeUseCheckFileGetUrl(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/file/get_url',
        method: 'post',
        data
    })
}


// 档案利用 - 档案档案利用预览选中的附件
export function getUtilizeFileGetUrl(data) {
    return request.service({
        url: '/prod-api/v1/utilize/file/get_url',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用上传审核裁剪文件
export function uploadFileUtilizeCut(data) {
    return request.service1({
        url: '/file-api/v1/file/utilize/cut/upload',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核设置
export function setUtilizeCheckUse(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/use/set',
        method: 'post',
        data
    })
}


// 档案查询利用审核 - 档案利用审核获取设置详情列表
export function setUtilizeCheckUselist(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/use/set/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核设置详情列表预览附件
export function getUtilizeCheckUseGetUrl(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/use/get_url',
        method: 'post',
        data
    })
}


// 档案查询利用审核 - 档案利用审核取项目侧边栏数据
export function getUtilizeUseEngineeringListSide(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/engineering/list_side',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核根据项目id获取单位工程列表
export function getUtilizeUseProjectListEngineeringId(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/list/engineering_id',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核根据单位工程id获取案卷列表
export function getUtilizeUseFilesListProjectId(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/files/list/project_id',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核根据案卷id获取文件列表
export function getUtilizeUseFileListFilesId(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/file/list/files_id',
        method: 'post',
        data
    })
}

// 案查询利用审核 - 档案利用审核根据项目id获取案卷列表
export function getUtilizeUseFilesListEngineeringId(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/files/list/engineering_id',
        method: 'post',
        data
    })
}


// 案查询利用审核 - 档案利用审核根据项目id获取案卷列表
export function getUtilizeUseCheckFileCount(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/check/file/count',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核单位工程获取建筑工程专业信息
export function getUtilizeUseProjectBuildList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/build/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核单位工程获取桥梁工程专业信息
export function getUtilizeUseProjectBridgeList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/bridge/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核单位工程获取管线工程专业信息
export function getUtilizeUseProjectPipelineList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/pipeline/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核单位工程获取轨道工程专业信息
export function getUtilizeUseProjectTrackList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/track/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核单位工程获取道路工程专业信息
export function getUtilizeUseProjectRoadList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/road/list',
        method: 'post',
        data
    })
}

// 档案查询利用审核 - 档案利用审核单位工程获取隧道工程专业信息
export function getUtilizeUseProjectTunnelList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/project/tunnel/list',
        method: 'post',
        data
    })
}


// 档案查询利用审核 - 档案查询利用审核 - 档案利用审核根据文件id获取文件url地址
export function getUtilizeUseFileUrlFileId(data) {
    return request.service({
        url: '/prod-api/v1/utilize/use/file/url/file_id',
        method: 'post',
        data
    })
}


// 档案利用 - 档案利用登记审核声像档案附件列表
export function getUtilizeAudioFilesPreview(data) {
    return request.service({
        url: '/prod-api/v1/utilize/audio/files/preview',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用登记审核选择可展示声像档案文件
export function setUtilizeAudioFilesCheckPick(data) {
    return request.service({
        url: '/prod-api/v1/utilize/audio/files/check/pick',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用登记审核查看审核详情
export function getUtilizeAudioFileSetInfo(data) {
    return request.service({
        url: '/prod-api/v1/utilize/audio/file/set/info',
        method: 'post',
        data
    })
}

// 档案利用 - 声像档案根据案卷id获取文件登记号信息
export function getUtilizeAudioFileListDjh(data) {
    return request.service({
        url: '/prod-api/v1/utilize/audio/file/list/djh',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用审核获取声像档案调卷利用详情列表
export function getUtilizeAudioFileUrlInfoList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/audio/file_url/info/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用审核获取声像档案设置详情列表
export function getUtilizeAudioCheckUseSetList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/audio/check/use/set/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用审核查档查档记录档案名称跳转
export function getUtilizeCheckRecordFileList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/check/record/file/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用审核查档登记详情档案名称跳转附件信息
export function getRegisterCheckUtilizeFileUrlFileId(data) {
    return request.service({
      url: '/prod-api/v1/register/check/utilize/file/url/file_id',
      method: 'post',
      data,
    })
  }


// 档案利用 - 档案利用声像档案查档登记详情档案名称跳转
export function getUtilizeRegisterFileList(data) {
    return request.service({
        url: '/prod-api/v1/utilize/register/file/list',
        method: 'post',
        data
    })
}

// 档案利用 - 档案利用查档登记详情档案名称跳转附件信息
export function getRegisterUtilizeFileUrlFileId(data) {
    return request.service({
      url: '/prod-api/v1/register/utilize/file/url/file_id',
      method: 'post',
      data,
    })
  }


// 档案查询利用审核 - 档案利用审核查询审核步骤数量
export function getUtilizeUseCheckModelCount(data) {
    return request.service({
      url: '/prod-api/v1/utilize/use/check/model/count',
      method: 'post',
      data,
    })
  }

  // 档案查询利用审核 - 获取档案利用审核水印参数效果
export function getFileUtilizeUseCheckWaterMarkDemo(data) {
    return request.service1({
      url: '/file-api/v1/file/utilize/use/check/water/mark/demo',
      method: 'post',
      data,
    })
  }

  // 档案查询利用审核 - 档案利用审核水印设置
  export function setUtilizeUseCheckWaterMark(data) {
    return request.service({
      url: '/prod-api/v1/utilize/use/check/water/mark/set',
      method: 'post',
      data,
    })
  }

  // 档案查询利用审核 - 获取利用审核水印设置参数
  export function getUtilizeUseCheckWaterMarkinfo(data) {
    return request.service({
      url: '/prod-api/v1/utilize/use/check/water/mark/info',
      method: 'post',
      data,
    })
  }
