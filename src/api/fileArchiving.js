import request from '@/utils/request'
// 市政接口
// 市政工程文件归档列表
export function getMunicipalList(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/municipal/list',
        method: 'post',
        data
    })
}

// 新增市政工程文件
export function addMunicipalItem(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/municipal/save',
        method: 'post',
        data
    })
}

// 修改市政工程文件
export function editMunicipalItem(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/municipal/update',
        method: 'post',
        data
    })
}

// 下载市政工程导入模板
export function downloadImportMunicipalTemplate() {
    return request.service1({
        url: '/file-api/v1/file/file_archive/municipal/download_model',
        method: 'post',
        responseType: 'blob'
    })
}

// 导入市政工程数据
export function importMunicipalData(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/municipal/import',
        method: 'post',
        data
    })
}

// 导出市政工程数据
export function downloadMunicipalData(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/municipal/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

// 建筑接口
// 建筑工程文件归档列表
export function getArchitetureList(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/architecture/list',
        method: 'post',
        data
    })
}

// 新增建筑工程文件
export function addArchitetureItem(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/architecture/save',
        method: 'post',
        data
    })
}

// 修改建筑工程文件
export function editArchitetureItem(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/architecture/update',
        method: 'post',
        data
    })
}

// 下载建筑工程导入模板
export function downloadImportArchitetureTemplate() {
    return request.service1({
        url: '/file-api/v1/file/file_archive/architecture/download_model',
        method: 'post',
        responseType: 'blob'
    })
}

// 导入建筑工程数据
export function importArchitetureData(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/architecture/import',
        method: 'post',
        data
    })
}

// 导出建筑工程数据
export function downloadArchitetureData(data) {
    return request.service({
        url: '/prod-api/v1/file_archive/architecture/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
