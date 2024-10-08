import request from '@/utils/request'

// 获取系统字典列表
export function getSystemDictionaryList(data) {
    return request.service({
        url: '/prod-api/v1/dict/list',
        method: 'post',
        data
    })
}

// 根据字典标签查询字典列表
export function querySystemDictionary(data) {
    return request.service({
        url: '/prod-api/v1/dict/list/dict-tag',
        method: 'post',
        data
    })
}

// 添加系统字典
export function addSystemDictionary(data) {
    return request.service({
        url: '/prod-api/v1/dict/save',
        method: 'post',
        data
    })
}

// 编辑系统字典
export function editSystemDictionary(data) {
    return request.service({
        url: '/prod-api/v1/dict/update',
        method: 'post',
        data
    })
}

// 删除系统字典
export function removeSystemDictionary(data) {
    return request.service({
        url: '/prod-api/v1/dict/remove',
        method: 'post',
        data
    })
}
