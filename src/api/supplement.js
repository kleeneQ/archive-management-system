import request from '@/utils/request'

// 补卷审核 - 补卷审核案卷列表
export function getSupplementFilesCheckList(data) {
    return request.service({
        url: '/prod-api/v1/supplement/files/check/list',
        method: 'post',
        data
    })
}

// 补卷审核 - 获取补卷案卷目录备忘封面地址
export function getSupplementFilesCheckGetUrl(data) {
    return request.service({
        url: '/prod-api/v1/supplement/files/check/get_url',
        method: 'post',
        data
    })
}

// 补卷审核 - 根据案卷id获取补卷审核文件列表
export function getSupplementFileCheckList(data) {
    return request.service({
        url: '/prod-api/v1/supplement/file/check/list',
        method: 'post',
        data
    })
}

// 补卷审核 - 补卷审核根据文件id获取文件url地址
export function getSupplementFileUrlFileId(data) {
    return request.service({
        url: '/prod-api/v1/supplement/file/url/file_id',
        method: 'post',
        data
    })
}

// 补卷审核 - 补卷审核通过
export function submitSupplementCheckPass(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/check/pass',
        method: 'post',
        data
    })
}

// 补卷审核 - 补卷审核不通过
export function submitSupplementCheckRefuse(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/check/refuse',
        method: 'post',
        data
    })
}

// 补卷审核 - 获取补卷审核详情
export function getSupplementCheckVerifyList(data) {
    return request.service({
        url: '/prod-api/v1/supplement/check/verify/list',
        method: 'post',
        data
    })
}


// 补卷
// 档案补卷 - 补卷案卷搜索列表
export function getSupplementFilesSearch(data) {
    return request.service({
        url: '/prod-api/v1/supplement/files/search',
        method: 'post',
        data
    })
}

// 档案补卷 - 根据案卷id获取补卷文件列表
export function getSupplementFileList(data) {
    return request.service({
        url: '/prod-api/v1/supplement/file/list',
        method: 'post',
        data
    })
}

// 档案补卷 - 添加补卷文件
export function addSupplementFileSave(data) {
    return request.service({
        url: '/prod-api/v1/supplement/file/save',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷将图片和文件绑定  
export function bindFilefileSupplement(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/bind_file',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷将图片文件转换pdf并绑定
export function convertPdffileSupplement(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/convert_pdf',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷文件级合并切片生成文件
export function mergefileSupplement(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/merge',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷文件级文件切片上传
export function uploadfileSupplement(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/upload',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷文件级检查文件切片是否存在
export function checkfileSupplement(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/check',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷解压文件夹
export function unzipfileSupplement(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/unzip',
        method: 'post',
        data
    })
}

// 档案补卷 - 档案补卷文件级检查文件切片是否存在
export function downloadfileSupplementfile(data) {
    return request.service1({
        url: '/file-api/v1/file/supplement/file/download',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

// 档案补卷 - 提交补卷审核信息
export function submitSupplementFileSave(data) {
    return request.service({
        url: '/prod-api/v1/supplement/file/submit',
        method: 'post',
        data
    })
}

