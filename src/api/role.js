import request from '@/utils/request'

// 获取角色列表
export function getRolesList(data) {
    return request.service({
        url: '/prod-api/v1/role/list',
        method: 'post',
        data
    })
}

// 获取角色菜单(权限)
export function getRoleMenu(data) {
    return request.service({
        url: '/prod-api/v1/role/get-menu',
        method: 'post',
        data: data
    })
}

// 设置角色对应权限菜单
export function setRoleMenu(data) {
    return request.service({
        url: '/prod-api/v1/role/set-menu',
        method: 'post',
        data: data
    })
}

// 添加角色
export function addRole(data) {
    return request.service({
        url: '/prod-api/v1/role/save',
        method: 'post',
        data: data
    })
}

// 修改角色
export function updateRole(data) {
    return request.service({
        url: '/prod-api/v1/role/update',
        method: 'post',
        data: data
    })
}

// 删除角色
export function removeRole(data) {
    return request.service({
        url: '/prod-api/v1/role/remove',
        method: 'post',
        data: data
    })
}

// 获取角色下拉框数据
export function getRoleDropList() {
    return request.service({
        url: '/prod-api/v1/role/list/drop',
        method: 'post'
    })
}