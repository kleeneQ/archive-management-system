import request from '@/utils/request'

// 获取道路工程专业信息
export function getRoadProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/road/list',
      method: 'post',
      data
  })
}

// 获取隧道工程专业信息
export function getTunnelProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/tunnel/list',
      method: 'post',
      data
  })
}

// 获取轨道工程专业信息
export function getTrackProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/track/list',
      method: 'post',
      data
  })
}

// 获取管线工程专业信息
export function getPipelineProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/pipeline/list',
      method: 'post',
      data
  })
}

// 获取桥梁工程专业信息
export function getBridgeProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/bridge/list',
      method: 'post',
      data
  })
}

// 获取建筑工程专业信息
export function getBuildProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/build/list',
      method: 'post',
      data
  })
}

// 编辑道路工程专业信息
export function editRoadProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/road/edit',
      method: 'post',
      data
  })
}

// 编辑隧道工程专业信息
export function editTunnelProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/tunnel/edit',
      method: 'post',
      data
  })
}

// 编辑轨道工程专业信息
export function editTrackProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/track/edit',
      method: 'post',
      data
  })
}

// 编辑管线工程专业信息
export function editPipelineProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/pipeline/edit',
      method: 'post',
      data
  })
}

// 编辑桥梁工程专业信息
export function editBridgeProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/bridge/edit',
      method: 'post',
      data
  })
}

// 编辑建筑工程专业信息
export function editBuildProfeInfo(data) {
  return request.service({
      url: '/prod-api/v1/digit/project/build/edit',
      method: 'post',
      data
  })
}
