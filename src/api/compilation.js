import request from '@/utils/request'

// 编研管理 - 总目录列表
export function getCompilationTotalCatalogueList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/totalCatalogue/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加总目录
export function getCompilationTotalCatalogueSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/totalCatalogue/save',
        method: 'post',
        data
    })
}


// 编研管理 - 获取总目录详情
export function getCompilationTotalCatalogueDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/totalCatalogue/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑总目录
export function getCompilationTotalCatalogueUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/totalCatalogue/update',
        method: 'post',
        data
    })
}

// 编研管理 - 附件上传
export function uploadFileSimpleCompilation(data) {
    return request.service1({
        url: '/file-api/v1/file/simple/compilation',
        method: 'post',
        data
    })
}


// 编研管理 - 获取总目录详情
export function getCompilationTotalCatalogueListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/totalCatalogue/list/info',
        method: 'post',
        data
    })
}

// 编研管理 - 获取分类目录详情
export function getCompilationclassifyCatalogueListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/classifyCatalogue/list/info',
        method: 'post',
        data
    })
}

// 编研管理 - 获取案卷总目录详情
export function getCompilationfilesCatalogueListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesCatalogue/list/info',
        method: 'post',
        data
    })
}

// 编研管理 - 获取案卷分类目录详情
export function getCompilationfilesClassifyCatalogueListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesClassifyCatalogue/list/info',
        method: 'post',
        data
    })
}

// 编研管理 - 获取大事记详情
export function getCompilationmemoirListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/memoir/list/info',
        method: 'post',
        data
    })
}

// 编研管理 - 获取文件汇编详情
export function getCompilationdocumentCompilationListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/documentCompilation/list/info',
        method: 'post',
        data
    })
}

// 编研管理 - 获取年鉴详情
export function getCompilationyearbooksListInfo(data) {
    return request.service({
        url: '/prod-api/v1/compilation/yearbooks/list/info',
        method: 'post',
        data
    })
}

// 分类目录
// 编研管理 - 分类目录列表
export function getCompilationclassifyCatalogueList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/classifyCatalogue/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加分类目录
export function getCompilationclassifyCatalogueSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/classifyCatalogue/save',
        method: 'post',
        data
    })
}


// 编研管理 - 删除分类目录
export function getCompilationclassifyCatalogueDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/classifyCatalogue/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑分类目录
export function getCompilationclassifyCatalogueUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/classifyCatalogue/update',
        method: 'post',
        data
    })
}


// 案卷总目录
// 编研管理 - 案卷总目录列表
export function getCompilationfilesCatalogueList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesCatalogue/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加案卷总目录
export function getCompilationfilesCatalogueSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesCatalogue/save',
        method: 'post',
        data
    })
}


// 编研管理 - 删除案卷总目录
export function getCompilationfilesCatalogueDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesCatalogue/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑案卷总目录
export function getCompilationfilesCatalogueUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesCatalogue/update',
        method: 'post',
        data
    })
}

// 案卷分类目录
// 编研管理 - 案卷分类目录列表
export function getCompilationfilesClassifyCatalogueList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesClassifyCatalogue/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加案卷分类目录
export function getCompilationfilesClassifyCatalogueSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesClassifyCatalogue/save',
        method: 'post',
        data
    })
}


// 编研管理 - 删除案卷分类目录
export function getCompilationfilesClassifyCatalogueDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesClassifyCatalogue/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑案卷分类目录
export function getCompilationfilesClassifyCatalogueUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/filesClassifyCatalogue/update',
        method: 'post',
        data
    })
}

// 大事记

// 编研管理 - 大事记列表
export function getCompilationmemoirList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/memoir/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加大事记
export function getCompilationmemoirSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/memoir/save',
        method: 'post',
        data
    })
}


// 编研管理 - 删除大事记
export function getCompilationmemoirDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/memoir/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑大事记
export function getCompilationmemoirUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/memoir/update',
        method: 'post',
        data
    })
}


// 文件汇编

// 编研管理 - 文件汇编列表
export function getCompilationdocumentCompilationList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/documentCompilation/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加文件汇编
export function getCompilationdocumentCompilationSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/documentCompilation/save',
        method: 'post',
        data
    })
}


// 编研管理 - 删除文件汇编
export function getCompilationdocumentCompilationDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/documentCompilation/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑文件汇编
export function getCompilationdocumentCompilationUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/documentCompilation/update',
        method: 'post',
        data
    })
}


//年鉴

// 编研管理 - 年鉴列表
export function getCompilationyearbooksList(data) {
    return request.service({
        url: '/prod-api/v1/compilation/yearbooks/list',
        method: 'post',
        data
    })
}

// 编研管理 - 增加年鉴
export function getCompilationyearbooksSave(data) {
    return request.service({
        url: '/prod-api/v1/compilation/yearbooks/save',
        method: 'post',
        data
    })
}


// 编研管理 - 删除年鉴
export function getCompilationyearbooksDelete(data) {
    return request.service({
        url: '/prod-api/v1/compilation/yearbooks/delete',
        method: 'post',
        data
    })
}

// 编研管理 - 编辑年鉴
export function getCompilationyearbooksUpdate(data) {
    return request.service({
        url: '/prod-api/v1/compilation/yearbooks/update',
        method: 'post',
        data
    })
}