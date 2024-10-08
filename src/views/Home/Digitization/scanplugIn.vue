<template>
   <div class="description">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数字化加工</el-breadcrumb-item>
        <el-breadcrumb-item>加工扫描插件</el-breadcrumb-item>
    </el-breadcrumb>
    
    <div class="scanBox clearfix">
      <div class="scanLeft">
        <div class="scanTitle"><p>预览</p></div>
        <div class="scanLeftcenter">
          <div  class="scanLeftcenter-center">
            <ScanCropperImage  :fileBlob='fileBlob' :idobject='idobject'  @childFn="parentFn" ref="Childsss"></ScanCropperImage>
          </div>
        </div>

      </div>
      <div class="scanright">
        <div class="scanTitle"><p>附件信息</p></div>
        <div class="scanrightcenter">
           <el-tabs v-model="activeName" type="card"  >
              <el-tab-pane label="待整理" name="first">
                <div class="scan-image">
                    <el-checkbox-group v-model="checkList" @change="checkListFun">
                      <div class="block" v-for="(fit,index) in url" :key="index">
                        <el-checkbox border :label="fit.url" @change="checkFun(fit.url,index)">
                            <img :src="fit.url" >
                          </el-checkbox>
                      </div> 
                    </el-checkbox-group>
                    
                </div>
              <div class="scan-image-relevancy">
                <div class="scan-image-relevancy-item scan-image-relevancy-1">文件共：<span>{{url.length}}</span> 份，已选择：<span> {{checkList.length}}</span>份</div>
                <div class="scan-image-relevancy-item "><el-checkbox style="color: #F59A23;" v-model="allchecked" @change="allcheckedFun()">全选</el-checkbox></div>
                <div class="scan-image-relevancy-item scan-image-relevancy-2" style="position: relative;"><i class="el-icon-document-add"></i>导入<input type="file"  id="avatar" accept="image/*" name="avatar" multiple class="file-btn" required @change="importFileFun"></div>
                <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="saveFileFun()"><i class="el-icon-s-claim"> 导出</i></div>
                <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="fileVisibleFun"><i class="el-icon-connection"> 关联文件</i></div>
                <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="deleteFileFun()"><i class="el-icon-delete-solid"> 删除</i></div>
              </div>  
              </el-tab-pane>
              <el-tab-pane label="已整理" name="second">
                <div  class="scan-image">
                  <el-checkbox-group v-model="disposeList" @change="disposeListFun">
                      <div class="block" v-for="(item,index) in disposeData" :key="index">
                        <el-checkbox border :label="item.base64Url" @change="checkFun2(item.base64Url,index)">
                            <img  :src="item.base64Url">
                          </el-checkbox>
                      </div> 
                    </el-checkbox-group>
                </div>
                <div class="scan-image-relevancy">
                  <div class="scan-image-relevancy-item scan-image-relevancy-1">文件共：<span>{{disposeData.length}}</span> 份，已选择：<span> {{disposeList.length}}</span>份</div>
                  <div class="scan-image-relevancy-item "><el-checkbox style="color: #F59A23;" v-model="allchecked2" @change="allcheckedFun2()">全选</el-checkbox></div>
                  <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="saveFileFun2()"><i class="el-icon-s-claim"> 保存</i></div>
                  <div class="scan-image-relevancy-item scan-image-relevancy-2"  @click="fileVisibleFun2"><i class="el-icon-connection"> 关联文件</i></div>
                  <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="deleteFileFun2()"><i class="el-icon-delete-solid"> 删除</i></div>
                </div>
                </el-tab-pane>

            </el-tabs>
        </div>
      </div>
    </div>
      <!-- 关联文件 B -->
        <el-dialog
          width="60%"
          title="关联文件"
          :visible.sync="fileVisible">
          <el-form :inline="true" :model="fileInfo" class="demo-form-inline" label-width="100px">
             <el-form-item label="文件档号">
              <el-input clearable v-model="fileInfo.wjdh" placeholder="请输入文件档号"  @change="getDigiProjectFileScanListFun"></el-input>
            </el-form-item>
            <el-form-item label="文件名称">
              <el-input clearable v-model="fileInfo.wjtm" placeholder="请输入文件名称"  @change="getDigiProjectFileScanListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getDigiProjectFileScanListFun">查询</el-button>
            </el-form-item>
          </el-form>
            <el-tabs v-model="fileActiveName" type="card" @tab-click="handleClick">
              <el-tab-pane label="数字化加工文件" name="first">
              </el-tab-pane>
              <el-tab-pane label="声像文件" name="second"></el-tab-pane>
            </el-tabs>
               <!-- 文件列表 B -->
            <el-table
              :data="selectFileLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              
              v-loading="loading"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="wjdh"
                label="文件档号"
                width="300">
                <template slot-scope="scope">
                   <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                   <div v-else>{{scope.row.wjdh}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="scanFileFun(scope.row)">关 联</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 文件列表 E -->
          </el-dialog>
        <!-- 关联文件 E --> 

  </div>
</template>

<script>
import ScanCropperImage from '@/components/ScanCropperImage'
import { file } from 'jszip'
import { getBase64 } from '@/utils/index'
import { 
  getDigiProjectFileScanList,
  getDigitAudioFileScanList,
  uploadDigitScanFile,
  bindDigitScanFile,
 } from '@/api/scan'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
  import {
  imageToBase64,
  base64ToFile,
} from "@/utils/common.js";
export default {
    components: {
      ScanCropperImage,
    },
  data () {
    return {
      loading:false, //信息正在加载中
      activeName: 'first',
      fits:11,
        url:[], //接收扫描机子的文件
        checkList:[],
        checked1:'',
        allchecked:'',//全选框
        allchecked2:'',//全选框 2
        checked:'',//单选框
      fileBlob:'',//需要裁剪的文件 Blob
      idobject:{ //id 对象
        file_id:"",
        file_weight:'',
        utilize_id:'',
      },
      checkedFlag:'',//是否选中
      disposeData:[ //已处理图片数据
        
      ],
      disposeList:[],//已处理文件勾选集合
      fileVisible:false,//关联文件弹层
      fileInfo:{
       wjdh:'',
       wjtm:'', 
      },
      selectFileLists:[],//文件列表
      fileActiveName:'first',//文件弹层 选项卡
    }
  },
  created () {
    
  },
  mounted () {
    // this.getDigiProjectFileScanListFun() //获取关联文件列表
  },
  methods: {
  // type your function
  //切换文件弹层选项卡
  handleClick(){  
    if (this.fileInfo.wjtm != '' || this.fileInfo.wjdh != '') {
      if (this.fileActiveName == 'first') {
        this.getDigiProjectFileScanListFun()
      }else {
        this.getDigitAudioFileScanListFun()
      }
    }
  },
  //关联文件 上传文件
  scanFileFun(row){
    let fileList = this.checkList
    if (this.activeName == 'first') {
      fileList = this.checkList
    } else {
      fileList = this.disposeList
    }
    
    fileList.forEach((item,index)=>{
      console.log(item)
      console.log(typeof item)
        const formData = new FormData()
        let f = this.convertBase64UrlToBlob(item)  //base64转Blob
          formData.append('file', f, row.file_id+index + '.jpg')
          formData.append('file_id', row.file_id)
          console.log(this.convertBase64UrlToBlob(item,'file'+index))
         uploadDigitScanFile(formData).then(response =>{
           if (response.status === 200) {
            const { data: res, message, status } = response.data
                  
                this.loading = true             
            }
          }) 
    })
    setTimeout(() => {
        this.bindDigitScanFileFun(row.file_id)
      }, 3000)
  },


//将base64转换为文件
 
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


  //关联文件 绑定文件
  bindDigitScanFileFun(id){
    const q ={
      file_id:id
    }
    bindDigitScanFile(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      this.message({ message: '关联'+message, type: 'success' })
      this.loading = false
      }
    })
  },
  //打开关联文件弹层
  fileVisibleFun(){
    if (this.checkList.length === 0) return this.message({ message: '请先勾选需要关联的文件!', type: 'error' })
      this.fileVisible = true
    },
    fileVisibleFun2(){
    if (this.disposeList.length === 0) return this.message({ message: '请先勾选需要关联的文件!', type: 'error' })
      this.fileVisible = true
    },
  //获取声像档案关联文件列表
    getDigitAudioFileScanListFun(){
    if(this.fileInfo.wjtm == '' && this.fileInfo.wjdh == '') return this.message({ message: '请输入文件档号或文件提名', type: 'error' })
      getDigitAudioFileScanList(this.fileInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.selectFileLists = res
        }
      })
    },
  //获取关联文件列表
  getDigiProjectFileScanListFun(){
    if(this.fileInfo.wjtm == '' && this.fileInfo.wjdh == '') return this.message({ message: '请输入文件档号或文件提名', type: 'error' })
    getDigiProjectFileScanList(this.fileInfo).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.selectFileLists = res
      }
    })
  },

  // 删除2
  deleteFileFun2(){
    const that = this
    console.log(this.disposeData)
    if (this.disposeList.length === 0) return this.message({ message: '请先勾选需要删除的数据!', type: 'error' })
    let newarr = []
    this.disposeData.map((t,index) =>{
      console.log(t )
        if (t.checkedFlag == false) {
          newarr.push(t)
        }
      })
    this.disposeData = newarr
    this.disposeList = [] 
    this.allchecked2 = false
  },
  // 删除
  deleteFileFun(){
    const that = this
    if (this.checkList.length === 0) return this.message({ message: '请先勾选需要删除的数据!', type: 'error' })
    let newarr = []
    this.url.map((t,index) =>{
        if (t.checkedFlag == false) {
          newarr.push(t)
        }
      })
    this.url = newarr
    this.checkList = [] 
    this.allchecked = false
  },
  //保存下载 ZIP包
   saveFileFun2(){
    if (this.disposeList.length === 0) return this.message({ message: '请先勾选需要保存的数据!', type: 'error' })
     const zip = new JSZip()
      const _this = this
      const promises = []
      const cache = {}
      this.disposeList.forEach((item,index) =>{
        promises.push(item)
        //添加文件 到zip 中
        zip.file('文件'+index+'.jpg', item.substring(item.indexOf(",") + 1), {base64: true}); 
      })

      Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
            // 生成二进制流
            FileSaver.saveAs(content, '加工扫描已处理文件') // 利用file-saver保存文件  自定义文件名
            console.log('下载完成')
        })
      }).catch(res => {
        console.log('文件下载失败')
      })
  },
  //保存下载 ZIP包
  saveFileFun(){
    if (this.checkList.length === 0) return this.message({ message: '请先勾选需要保存的数据!', type: 'error' })
     const zip = new JSZip()
      const _this = this
      const promises = []
      const cache = {}
      this.checkList.forEach((item,index) =>{
        promises.push(item)
        //添加文件 到zip 中
        zip.file('文件'+index+'.jpg', item.substring(item.indexOf(",") + 1), {base64: true}); 
      })

      Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
            // 生成二进制流
            FileSaver.saveAs(content, '加工扫描待处理文件') // 利用file-saver保存文件  自定义文件名
            console.log('下载完成')
        })
      }).catch(res => {
        console.log('文件下载失败')
      })
  },
   //引入文件
      importFileFun(e){
          // 获取dom 对象
          let file = document.getElementById("avatar");
          // FileList 对象如下：
          let fileList = file.files;  // 表示 fileList 对象集合
            fileList.forEach((item,index) =>{
              const files = e.target.files 
              getBase64(files[index]).then((res) => {
                
                this.url.unshift({
                  checkedFlag:false,
                  url:res,
                })
              })
          
            })
            
        },

  //已处理文件 勾选
    disposeListFun(){

    },
    //子传父 保存已处理文件
    parentFn(file){
      
      this.activeName = 'second'
      this.disposeData.push({
        checkedFlag:false,
        base64Url:file,
      })
      console.log(this.disposeData)
    },
    //全选2
  allcheckedFun2(){
    console.log(this.disposeData)
    if (this.allchecked2) {
      this.disposeData.map(item =>{
        item.checkedFlag = true
        this.disposeList.push(item.base64Url)
      })
    } else {
      this.disposeList = []
    }
  },
  //全选
  allcheckedFun(){
    if (this.allchecked) {
      this.url.map(item =>{
        item.checkedFlag = true
        this.checkList.push(item.url)
      })
    } else {
      this.checkList = []
    }
  },
  //多选
    checkListFun(){
      console.log(this.checkList)
    },
    //点击单个图片
    checkFun(fit,index){

      if (this.url[index].checkedFlag) {
        this.url[index].checkedFlag = false
      } else {
        this.url[index].checkedFlag = true
        this.fileBlob = fit
        this.$refs.Childsss.joinImgFun(fit)
      }
      
    },
    //点击单个图片
    checkFun2(fit,index){
      console.log(fit,index)
      if (this.disposeData[index].checkedFlag) {
        this.disposeData[index].checkedFlag = false
      } else {
        this.disposeData[index].checkedFlag = true
      }
      
    },

  },
}
</script>
<style  lang='less'>
.scan-image{
  height: 500px;
  overflow: auto;
  padding-top: 20px;
  .el-checkbox {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    
    .el-checkbox__input {
      position: absolute;
        top: -5px;
        left: -5px;
    }
    .el-checkbox__label {
      padding: 2px;
    }
  }
  .block {
    box-sizing: border-box;
    display: inline-block;
    width: 160px;
    height: 225px;
    // border: 1px solid #cdcdcd;
    margin-left:20px ;
    margin-bottom: 20px;
  }
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
    object-fit: contain;
    vertical-align:top;
  }
}
</style>
<style scoped lang='less'>
.file-btn {
  display: inline-block;
    position: absolute;
    width: 60px;
    left: 0;
    cursor: pointer;
    outline: none;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
}
.scanLeft {
  float: left;

}
.scanLeftcenter {
  width: 100%;
  height: 600px;
}

.scan-image-relevancy {
  margin-top: 10px;
  width: 100%;
  background-color: rgba(242, 242, 242, 1);
  padding: 20px ;
  text-align: center;
  .scan-image-relevancy-item  {
    display: inline-block;
    cursor: pointer;
    margin-right: 30px;
    color: #F59A23;
  }
  .scan-image-relevancy-1 {
    color: #000;
    span {
      display: inline-block;
      min-width: 40px;
      color: #F59A23;
    }
  }

}
.scanBox {
  background-color: #fff;
  margin: 10px ;
  box-sizing: border-box;
  height: 750px;
  div {
    display: inline-block;
    box-sizing: border-box;
  }
  .scanLeft {
    width: 40%;
    box-sizing: border-box;
    padding: 30px;
    border-right: 1px solid #cdcdcd;
  }
  .scanright {
    width: 60%;
    box-sizing: border-box;
    padding: 30px ;
  }
  .scanTitle {
    margin: 10px ;
    box-sizing: border-box;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
      p {
        width: 100px;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 2px solid #02a7f0;
        padding-left: 10px;
      }
  }
  
}

</style>
