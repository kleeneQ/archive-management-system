import request from '@/utils/request'

// 获取返回信息列表
export function getBackInfoList(data) {
    return request.service({
        url: '/prod-api/v1/msg/list',
        method: 'post',
        data
    })
}

// 新增返回信息
export function addBackInfoSave(data) {
    return request.service({
        url: '/prod-api/v1/msg/save',
        method: 'post',
        data
    })
}

// 修改返回信息
export function editBackInfo(data) {
    return request.service({
        url: '/prod-api/v1/msg/update',
        method: 'post',
        data
    })
}
