import request from '@/utils/request'

// 数字化加工模块根据项目工程id获取单位工程列表
export function getUniProjectList(data) {
    return request.service({
        url: '/prod-api/v1/digit/project/list/engineering_id',
        method: 'post',
        data
    })
}

// 数字化加工模块单位工程列表-查询
export function queryUniProjectList(data) {
    return request.service({
        url: '/prod-api/v1/digit/project/list',
        method: 'post',
        data
    })
}

// 数字化加工模块增加单位工程
export function addUniProject(data) {
    return request.service({
        url: '/prod-api/v1/digit/project/save',
        method: 'post',
        data
    })
}

// 数字化加工模块修改单位工程
export function editUniProject(data) {
    return request.service({
        url: '/prod-api/v1/digit/project/update',
        method: 'post',
        data
    })
}

// 数字化加工模块删除单位工程
export function removeUniProject(data) {
    return request.service({
        url: '/prod-api/v1/digit/project/delete',
        method: 'post',
        data
    })
}

// 数字化获取侧边栏数据
export function getSideBar(data) {
    return request.service({
        url: '/prod-api/v1/digit/list_side',
        method: 'post',
        data
    })
}

// 档案扫描著录接口 - 获取案卷目录备忘封面地址
export function getDigitFilesGetUrl(data) {
    return request.service({
        url: '/prod-api/v1/digit/files/get_url',
        method: 'post',
        data
    })
}

