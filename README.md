# vue_shop

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 记录

1. 兄弟组件之间传值

   在 main.js 中声明一个 $bus

```代码块
const bus = new Vue();  //main.js中声明一个 $bus
Vue.prototype.$bus = bus  //挂在全局上
```

​ 在需要传值出去的组件中使用 $emit

```
this.$bus.$emit('方法名称'，值)
```

​ 需要接受值的组件中使用 $on 方法操作 (生命周期上)

```
this.$bus.$on ('方法名',值 =>{ 数据处理 或是调用方法 })
```

使用完后在 beforeDestroy 中销毁

```
beforeDestroy(){
  this.$bus.$off('方法名')
}
```

---

## 2. 原生 input 上传文件

```
<el-button  type="primary" icon="el-icon-plus">
                            <input type="file"  id="avatar" name="avatar" multiple class="file-btn" required
                                @change="upload"/>添加质检文件
                        </el-button>

	// 获取dom 对象
let file = document.getElementById("avatar");
// FileList 对象如下：
let fileList = file.files;  // 表示 fileList 对象集合  可获得二进制文件 用于上传操作

```

## 3.base64 转 Blob

```
//base64转Blob
convertBase64UrlToBlob(urlData){
  //去掉url的头，并转换为byte
  var split = urlData.split(',');
  var bytes=window.atob(split[1]);
  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type : split[0]});
},


```

## 4. 删除按钮 提示弹层

```
  //删除文件
  removeFileAudioFun(removeType,row){
      this.confirm('删除后该文件下所有信息及附件将一同被删除，确定将该文件信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         const q ={
            remove_type:removeType,
            file_id:row.file_id,
          }
          removeFileAudio(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })

            this.message({ message: message, type: 'success' })
            this.getAudioPictureFileListFun() //刷新文件列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
```

## 5. 隐藏传参页面跳转

```
    this.$router.push({
            name: 'machinedepartment',  //路由声明
            params:{
              bm: bm,
              lb: lb,
              idcardnum:'',
              idcardname:'',
            },
        })

```

## 6.对象数组转化为多个数组 （根据对象中的某个特殊值做分类判断）

```
let arr = [
     { date: '2018-01-06',SW: '90.95', LL: '136', XXSW: '80.22',CKLL: '500' },
     { date: '2018-01-06', SW: '164.95', LL: '137', XXSW: '99.22', CKLL: '93' },
     { date: '2018-01-07', SW: '176.95', LL: '236', XXSW: '99.22', CKLL: '93' },
     { date: '2018-01-07', SW: '178.95', LL: '236', XXSW: '99.22', CKLL: '93' },
     { date: '2018-01-07', SW: '182.95', LL: '236', XXSW: '99.22', CKLL: '93' },
     { date: '2018-01-08', SW: '187.95', LL: '366', XXSW: '99.22', CKLL: '93' },
     { date: '2018-01-09', SW: '197.95', LL: '466', XXSW: '99.22', CKLL: '93' }
   ]

  <!-- 如上数据可以用此法 -->

   let dataArr = [];
    arr.map(mapItem => {
      if (dataArr.length == 0) {
          dataArr.push({ date: mapItem.date, List: [mapItem] })
      } else {
         let res = dataArr.some(item=> {//判断相同日期，有就添加到当前项
          if (item.date == mapItem.date) {
            item.List.push(mapItem)
            return true
          }
        })
        if (!res) {//如果没找相同日期添加一个新对象
          dataArr.push({ date: mapItem.date, List: [mapItem] })
        }
      }
    })
```

## 2.局域网技术

1. vue 全家桶
2. element-UI 交互界面
3. 插件
4. mock.js 模拟数据

git 提交规范
检查仓库状态，是否有未提交的文件

```
git status
```

提交代码

```
git add .
git commit -m "更新README.md和package-lock.json"
```

推送代码到 Gitee 远程仓库

```
git push origin master
```
