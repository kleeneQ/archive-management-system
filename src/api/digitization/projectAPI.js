import request from '@/utils/request'

// 数字化加工模块获取项目工程列表
export function getEngineeringList(data) {
    return request.service({
        url: '/prod-api/v1/digit/engineering/list',
        method: 'post',
        data
    })
}

// 数字化加工模块增加项目工程
export function addEngineeringSave(data) {
    return request.service({
        url: '/prod-api/v1/digit/engineering/save',
        method: 'post',
        data
    })
}

// 数字化加工模块编辑项目工程
export function editEngineering(data) {
    return request.service({
        url: '/prod-api/v1/digit/engineering/update',
        method: 'post',
        data
    })
}

// 数字化加工模块删除项目工程
export function removeEngineering(data) {
    return request.service({
        url: '/prod-api/v1/digit/engineering/delete',
        method: 'post',
        data
    })
}

// 获取工程类型
export function getEngineeringType(data) {
    return request.service({
        url: '/prod-api/v1/data_dictionary/list/drop',
        method: 'post',
        data
    })
}

// 点击管理类案卷生成项目档号
export function setManageFilesDh(data) {
    return request.service({
        url: '/prod-api/v1/digit/manage_files/create_dh',
        method: 'post',
        data
    })
}
