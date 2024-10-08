import request from '@/utils/request'


// 声像档案管理 - 声像档案管理文件级检查文件切片是否存在
export function checkUploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/audio/check',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理文件级合并切片生成文件
export function mergeUploadFile(data) {
  return request.service1({
    url: '/file-api/v1/file/audio/merge',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理解压文件夹
export function unzipFile(data) {
  return request.service1({
    url: '/file-api/v1/file/audio/unzip',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理文件级删除文件
export function removeFileAudio(data) {
  return request.service1({
    url: '/file-api/v1/file/audio/remove',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案文件及导入模板下载
export function downloadAudioModel(data) {
  return request.service1({
    url: '/file-api/v1/file/audio/model/download',
    method: 'post',
    data,
    responseType: 'blob'
  })
}


// 声像档案管理 - 声像档案管理馆藏案卷档案预览
export function getAudioCollectionFilesPreview(data) {
  return request.service({
    url: '/prod-api/v1/audio/collection/files/preview',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理关联工程列表
export function getAudioProjectList(data) {
  return request.service({
    url: '/prod-api/v1/audio/project/list',
    method: 'post',
    data
  })
}

// 录像 B
// 声像档案管理 - 声像档案管理录像文件档案列表
export function getAudiovideoFileList(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/file/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理录像文件档案导入
export function importAudiovideoFile(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/file/import',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理编辑录像案卷档案
export function updateAudiovideoFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/files/update',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理添加录像文件档案
export function addAudiovideoFile(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/file/add',
    method: 'post',
    data,
  })
}

// 声像档案管理 - 声像档案管理编辑录像文件档案
export function updateAudiovideoFile(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/file/update',
    method: 'post',
    data,
  })
}

// 声像档案管理 - 声像档案管理录像文件根据文件id获取文件url地址
export function getAudiovideoFileUrlFileId(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/file/url/file_id',
    method: 'post',
    data,
  })
}

// 声像档案管理 - 声像档案获取录像案卷档案
export function getAudiovideoFilesList(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/files/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理添加录像案卷档案
export function addAudiovideoFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/files/add',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理删除录像案卷档案
export function deletevideoFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/video/files/delete',
    method: 'post',
    data
  })
}

// 录像 E


// 照片 B
// 声像档案管理 - 声像档案管理照片文件档案列表
export function getAudioPictureFileList(data,url) {
  return request.service({
    url: url ,
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理照片文件档案导入
export function importAudioPictureFile(data,url) {
  return request.service({
    url: url,
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理编辑照片案卷档案
export function updateAudioPictureFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/picture/files/update',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理添加照片文件档案
export function addAudioPictureFile(data,url) {
  return request.service({
    url: url,
    method: 'post',
    data,
  })
}


// 声像档案管理 - 声像档案管理编辑照片文件档案
export function updateAudioPictureFile(data,url) {
  return request.service({
    url: url,
    method: 'post',
    data,
  })
}

// 声像档案管理 - 声像档案管理照片文件根据文件id获取文件url地址
export function getAudioPictureFileUrlFileId(data,url) {
  return request.service({
    url: url,
    method: 'post',
    data,
  })
}

// 声像档案管理 - 声像档案获取照片案卷档案
export function getAudioPictureFilesList(data) {
  return request.service({
    url: '/prod-api/v1/audio/picture/files/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理添加照片案卷档案
export function addAudioPictureFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/picture/files/add',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理删除照片案卷档案
export function deletePictureFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/picture/files/delete',
    method: 'post',
    data
  })
}
// 照片 B

//光盘  B

// 声像档案管理 - 声像档案获取录像案卷档案
export function getAudioCdFilesList(data) {
  return request.service({
    url: '/prod-api/v1/audio/cd/files/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理添加录像案卷档案
export function addAudioCdFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/cd/files/add',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理删除录像案卷档案
export function deleteCdFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/cd/files/delete',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理编辑录像案卷档案
export function updateAudioCdFiles(data) {
  return request.service({
    url: '/prod-api/v1/audio/cd/files/update',
    method: 'post',
    data
  })
}
//光盘  C

// 馆藏目录 B

// 声像档案管理 - 声像档案查询获取馆藏案卷档案
export function getAudioCollectionFilesList(data) {
  return request.service({
    url: '/prod-api/v1/audio/collection/files/list',
    method: 'post',
    data
  })
}

// // 声像档案管理 - 声像档案查询馆藏案卷档案预览
// export function getAudioCollectionFilesPreview(data) {
//   return request.service({
//     url: '/prod-api/v1/audio/collection/files/preview',
//     method: 'post',
//     data
//   })
// }

// 声像档案管理 - 声像档案管理馆藏文件档案列表
export function getAudioCollectionFileList(data) {
  return request.service({
    url: '/prod-api/v1/audio/collection/file/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理馆藏文件根据文件id获取文件url地址
export function getAudioCollectionFileUrlFileId(data) {
  return request.service({
    url: '/prod-api/v1/audio/collection/file/url/file_id',
    method: 'post',
    data
  })
}

// 声像档案管理 - 导出馆藏档案文件信息
export function exportAudioCollectionFile(data) {
  return request.service({
    url: '/prod-api/v1/audio/collection/file/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 声像档案管理 - 声像档案管理文件级附件下载
export function downloadFileAudio(data) {
  return request.service1({
    url: '/file-api/v1/file/audio/download',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 馆藏目录 E



// 查询声像档案 B
// 声像档案管理 - 声像档案查询获取馆藏案卷档案
export function getSearchAudioCollectionFilesList(data) {
  return request.service({
    url: '/prod-api/v1/search/audio/collection/files/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案查询馆藏案卷档案预览
export function getSearchAudioCollectionFilesPreview(data) {
  return request.service({
    url: '/prod-api/v1/search/audio/collection/files/preview',
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理馆藏文件根据文件id获取文件url地址
export function getSearchAudioCollectionFileUrlFileId(data) {
  return request.service({
    url: '/prod-api/v1/search/audio/collection/file/url/file_id',
    
    method: 'post',
    data
  })
}

// 声像档案管理 - 声像档案管理馆藏文件档案列表
export function getSearchAudioCollectionFileList(data) {
  return request.service({
    url: '/prod-api/v1/search/audio/collection/file/list',
    method: 'post',
    data
  })
}

// 声像档案管理 - 导出馆藏档案文件信息
export function exportSearchAudioCollectionFile(data) {
  return request.service({
    url: '/prod-api/v1/search/audio/collection/file/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 声像档案管理 - 声像档案管理文件级附件下载
export function downloadSearchFileAudio(data) {
  return request.service1({
    url: '/file-api/v1/search/file/audio/download',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 档案查询 - 档案查询通过工程id获取声像档案列表
export function getSearchAudioFilesListProjectId(data) {
  return request.service1({
    url: '/prod-api/v1/search/audio/files/list/project_id',
    method: 'post',
    data,
  })
}

// 查询声像档案 E