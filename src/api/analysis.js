import request from '@/utils/request'

// 统计分析 - 统计分析馆藏档案统计
export function getAnalysisStatisticsCollection(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/collection',
    method: 'post',
    data
  })
}

// 统计分析 - 统计分析档案分类统计
export function getAnalysisStatisticsClassification(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/classification',
    method: 'post',
    data
  })
}

// 统计分析 - 统计分析馆藏档案汇总
export function getAnalysisStatisticsCollectionSummary(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/collection/summary',
    method: 'post',
    data
  })
}

// 统计分析 - 统计分析档案利用汇总
export function getAnalysisStatisticsUtilizeSummary(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/utilize/summary',
    method: 'post',
    data
  })
}

// 统计分析 - 统计分析档案利用统计
export function getAnalysisStatisticsUtilize(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/utilize',
    method: 'post',
    data
  })
}

// 统计分析 - 统计分析数字化加工著录统计表数据导出
export function getAnalysisStatisticsDigitSummaryExport(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/digit/summary/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 统计分析 - 统计分析数字化加工著录汇总
export function getAnalysisStatisticsDigitSummary(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/digit/summary',
    method: 'post',
    data
  })
}

// 统计分析 - 统计分析数字化加工著录统计表
export function getAnalysisStatisticsDigitSummaryList(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/digit/summary/list',
    method: 'post',
    data
  })
}


//电子文件统计分析
// 统计分析 - 统计分析电子文件统计汇总
export function getAnalysisStatisticsQualitySummary(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/quality/summary',
    method: 'post',
    data
  })
}


//库房管理动态统计
// 统计分析 - 统计分析库房管理动态统计
export function getStatisticsStorehouseCollectionSummary(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/storehouse/collection/summary',
    method: 'post',
    data
  })
}
// 统计分析 - 统计分析库房管理动态统计库房统计
export function getStatisticsStorehouseSummary(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/storehouse/summary',
    method: 'post',
    data
  })
}
// 统计分析 - 统计分析库房管理动态统计饼图数据
export function getStatisticsStorehouseData(data) {
  return request.service({
    url: '/prod-api/v1/analysis/statistics/storehouse/data',
    method: 'post',
    data
  })
}