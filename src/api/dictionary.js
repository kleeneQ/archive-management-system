import request from '@/utils/request'
// 数据字典父级列表
export function getDataDictionaryList(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/list_parent',
        method: 'post',
        data
    })
}

// 根据字典父级id获取子级列表
export function getChildrenList(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/list',
        method: 'post',
        data: data
    })
}

// 增加数据字典
export function addDataDictionaryItem(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/save',
        method: 'post',
        data: data
    })
}

// 编辑数据字典
export function editDataDictionaryItem(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/update',
        method: 'post',
        data: data
    })
}

// 删除数据字典
export function removeDataDictionaryItem(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/delete',
        method: 'post',
        data: data
    })
}

// 下载数据字典导入模板
export function downloadImportTemplate() {
    return request.service1({
        url: '/file-api/v1/file/data_dictionary/download_model',
        method: 'post',
        responseType: 'blob'
    })
}

// 数据字典导入
export function importTemplate(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/import',
        method: 'post',
        data
    })
}

// 导出数据字典数据
export function exportDataDictionary(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/export',
        method: 'post',
        responseType: 'blob',
        data
    })
}