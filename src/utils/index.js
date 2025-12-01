/**
 * Created by PanJiaChen on 16/11/18.
 */
 import {
  editDocument,
} from "@/api/digitization/documentApi"

/**
 *
 * 
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
 export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string')) {
        if ((/^[0-9]+$/.test(time))) {
          // support "1548221490638"
          time = parseInt(time)
        } else {
          // support safari
          // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
          time = time.replace(new RegExp(/-/gm), '/')
        }
      }
  
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
      return value.toString().padStart(2, '0')
    })
    return time_str
  }
  
  /**
   * @param {number} time
   * @param {string} option
   * @returns {string}
   */
  export function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    } else {
      time = +time
    }
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }

  /**
   * @param {number} time
   * @returns {string}
   */
  export function formatTimeSel(time) {
    if (time === null) return false
    const stamp = time.getTime()
    const year = new Date(time).getFullYear()
    const month = units(new Date(time).getMonth() + 1)
    const day = units(new Date(time).getDate())
    return {
      time: `${year}-${month}-${day}`,
      stamp
    }
  }

  /**
   * @param {number} time
   * @returns {string}
   */
  export function formatYearSel(time) {
    if (time === null) return false
    const stamp = time.getTime()
    const year = new Date(time).getFullYear()
    // const month = units(new Date(time).getMonth() + 1)
    // const day = units(new Date(time).getDate())
    return {
      time: `${year}`,
      stamp
    }
  }

  export function units(val) {
    if (val < 10) {
      return '0' + val
    }else {
      return val
    }
  }
  
  /**
   * @param {string} url
   * @returns {Object}
   */
  export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
      return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
      const index = v.indexOf('=')
      if (index !== -1) {
        const name = v.substring(0, index)
        const val = v.substring(index + 1, v.length)
        obj[name] = val
      }
    })
    return obj
  }
  
  /**
   * @returns {String}
   */
  export function getRandom() {
    let rnum = ''
    for (var i = 0; i < 8; i++) {
      const ran = Math.floor(Math.random() * 10)
      rnum += ran
    }
    return rnum
  }
  
  export function modificationMenus(menus) {
    const rebuildData = (arr) => {
      if (!arr) {
        return []
      }
      let newarr = []
      arr.forEach(v => {
        const obj = {
          menuId: v.menuId,
          menuName: v.menuName,
          menuUrl: v.menuUrl,
          menuParentId: v.menuParentId,
          menuParentLevel: v.menuParentLevel,
          menuWebUrl: v.menuWebUrl,
          menuLogo: v.menuLogo,
          menuLog: v.menuLog,
          menuRoute: v.menuRoute,
          menuWeight: v.menuWeight
        }
        if (v.child) {
          obj.children = rebuildData(v.child)
          newarr.push(obj)
        }
      })
      return newarr
    }
    return rebuildData(menus)
  }

  export function AddAndEditModificationMenus(menus) {
    const rebuildData = (arr) => {
      if (!arr) {
        return []
      }
      let newarr = []
      arr.forEach(v => {
        const obj = {
          menuId: v.menuId,
          menuName: v.menuName,
          menuUrl: v.menuUrl,
          menuParentId: v.menuParentId,
          menuParentLevel: v.menuParentLevel,
          menuWebUrl: v.menuWebUrl,
          menuLogo: v.menuLogo,
          menuWeight: v.menuWeight
        }
        if (v.child && v.menuParentLevel < 3) {
          obj.children = rebuildData(v.child)
          newarr.push(obj)
        }
      })
      return newarr
    }
    return rebuildData(menus)
  }

  // 遍历出当前角色的所有按钮
  export function queryRoleBtnsAll(menus) {
    let newBtns = []
    const rebuildData = (arr) => {
      if (!arr || !Array.isArray(arr)) {
        return []
      }
      arr.forEach(v => {
        if (v.child && v.menuParentLevel > 0) {
          newBtns.push(v.menuUrl)
        }
        rebuildData(v.child)
      })
      return newBtns
    }
    return rebuildData(menus)
  }

  // 将图片转为base64
  export function getBase64(file) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader()
      let imgResult = ''
      reader.readAsDataURL(file)
      reader.onload = function() {
        imgResult = reader.result
      }
      reader.onerror = function(error) {
        reject(error)
      }
      reader.onloadend = function() {
        resolve(imgResult)
      }
    })
  }

  export function changeDetSelect(key,treeData){
    let arr = [] // 在递归时操作的数组
    let returnArr = [] // 存放结果的数组
    let depth = 0 // 定义全局层级
    // 定义递归函数
    function childrenEach(childrenData, depthN) {
      for (var j = 0; j < childrenData.length; j++) {
        depth = depthN // 将执行的层级赋值 到 全局层级
        arr[depthN] = (childrenData[j].menuId)
        if (childrenData[j].menuId == key) {
          returnArr = arr.slice(0, depthN+1) //将目前匹配的数组，截断并保存到结果数组，
          break
        } else {
          if (childrenData[j].children) {
            depth ++
            childrenEach(childrenData[j].children, depth)
          }
        }
      }
      return returnArr
    }
    return childrenEach(treeData, depth)
  }
  // 数字化加工
  export function modifiTreesdigit(trees) {
    const rebuildData = (arr) => {
      if (!arr) {
        return []
      }
      let newTree = []
      arr.forEach((v,index) => {

        if (v.tree_level == 'files') {
          let obj = {
            valueId: v.tree_id,
            parentId: v.parent_id,
            treeId: v.tree_id,
            treeLevel: v.tree_level,
            label: v.sx+'、'+v.tree_name
          }
          if (v.child) {
            obj.children = rebuildData(v.child)
            newTree.push(obj)
          }
        } else {
          let obj = {
            valueId: v.tree_id,
            parentId: v.parent_id,
            treeId: v.tree_id,
            treeLevel: v.tree_level,
            label: v.tree_name
          }
          if (v.child) {
            obj.children = rebuildData(v.child)
            newTree.push(obj)
          }
        }
        
        
      })
      return newTree
    }
    return rebuildData(trees)
  }
 // 企业报送
 export function modifiTreesdigit1(trees) {
  const rebuildData = (arr) => {
    if (!arr) {
      return []
    }
    let newTree = []
    arr.forEach((v,index) => {
      let obj = {
        valueId: v.tree_id,
        parentId: v.parent_id,
        treeId: v.tree_id,
        treeLevel: v.tree_level,
        label: v.tree_name
      }
      if (v.child) {
        obj.children = rebuildData(v.child)
        newTree.push(obj)
      }
    })
    return newTree
  }
  return rebuildData(trees)
}


  export function modifiTrees(trees) {
    const rebuildData = (arr) => {
      if (!arr) {
        return []
      }
      let newTree = []
      arr.forEach((v,index) => {
        let obj = {
          valueId: v.tree_id,
          parentId: v.parent_id,
          treeId: v.tree_id,
          treeLevel: v.tree_level,
          label: v.tree_name
        }
        if (v.child) {
          obj.children = rebuildData(v.child)
          newTree.push(obj)
        }
      })
      return newTree
    }
    return rebuildData(trees)
  }

  // 文件上移
  export function moveUp(arr, row,engineering_id) {
    let onOrder = '' // 存储当前传入的row的wjsx
    let preOrder = '' // 存储当前传入row的上一行wjsx
    let  prenum = {
      preOrder : '',
      prewjdh : ''
    }
    arr.forEach((v, i) => {
      if (v.file_id === row.file_id) {
        onOrder = row.wjsx
        preOrder = arr[i-1].wjsx
        prenum = {
          preOrder : arr[i-1].wjsx,
          prewjdh : arr[i-1].wjdh,
        }
        const q = {
          file_id: arr[i-1].file_id,
          files_id: engineering_id,
          wjdh: row.wjdh,
          wjsx: row.wjsx,
          wjtm: arr[i-1].wjtm,
          ztlxName: arr[i-1].ztlxName,
          ztlx: arr[i-1].ztlx,
          sl: arr[i-1].sl,
          mjName: arr[i-1].mjName,
          wzName: arr[i-1].wzName,
          fz: arr[i-1].fz,
          xcsj: arr[i-1].xcsj,
          lrsj: arr[i-1].lrsj
        }
        editDocument(q).then(response => {
          
          if (response.status === 200) {
            // const { data: res } = response
            // if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            // this.message({ message: res.message, type: 'success' })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    })
    return prenum
  }

  // 文件数据下移
  export function moveDown(arr, row,engineering_id) {
    let onOrder = '' // 存储当前传入的row的order
    let nextOrder = '' // 存储当前传入row的下一行order
    let nextnum = {
        nextOrder : '',
        nextwjdh : ''
      }
    arr.forEach((v, i) => {
      if (v.file_id === row.file_id) {
        onOrder = row.wjsx
        nextOrder = arr[i+1].wjsx //返回列表数组中 下一行的wjsx
        nextnum = {
          nextOrder : arr[i+1].wjsx,
          nextwjdh : arr[i+1].wjdh,
          nextfileid : arr[i+1].file_id
        }

        const q = {  //将下一行的内容存入本点击行
          file_id: arr[i+1].file_id,
          files_id: engineering_id,
          wjdh: row.wjdh,
          wjsx: onOrder, 
          wjtm: arr[i+1].wjtm,
          ztlxName: arr[i+1].ztlxName,
          ztlx: arr[i+1].ztlx,
          sl: arr[i+1].sl,
          mjName: arr[i+1].mjName,
          wzName: arr[i+1].wzName,
          fz: arr[i+1].fz,
          xcsj: arr[i+1].xcsj,
          lrsj: arr[i+1].lrsj
        }
        editDocument(q).then(response => {
          
          if (response.status === 200) {
            // const { data: res } = response
            // if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            // this.message({ message: res.message, type: 'success' })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    })

    return nextnum
  }