<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>电子文件管理</el-breadcrumb-item>
        <el-breadcrumb-item>接收</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加质检文件 B -->
          <el-col>
                <el-form :inline="true" :model="queryInfo" >
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="addQualityFileDialogFun">添加质检文件</el-button>
                  </el-form-item>
                </el-form>  
              </el-col> 
      <!-- 添加质检文件 E -->
      <!-- 质检文件列表 B -->
              <el-table
              :data="qualityList"
              border
              style="width: 100%"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                fixed
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="wjgs"
                label="文件格式"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="wjdx"
                label="文件大小"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="wjfbl"
                label="文件分辨率"
                min-width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="100"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small"   @click="QualityFilePreviewFun(scope.row)">预 览</el-button>
                </template>
              </el-table-column>
            </el-table>
               <!-- 质检文件列表 E -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
              >
            </el-pagination>

  <!-- 添加质检文件弹层 B -->
  <el-dialog title="质检" :visible.sync="dialogTableVisible" width="50%" :before-close="handleClose">

    <el-button  type="primary" icon="el-icon-plus" class="file-box btnedit" >
                            <input type="file"  id="avatar" name="avatar" multiple class="file-btn" required 
                                @change="upload"/>添加质检文件
                        </el-button>
      <el-button type="primary" @click="batchSelectionFun">批量接收</el-button>
    <el-table 
    :data="fileDatalist"
    border
    style="width: 100%"
    :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
    :cell-style="{'text-align':'center','padding':'0px'}"
    :row-style="{'height':'30px'}"
    @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="wjtm" 
        label="文件题名" 
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="wjgs" 
        label="文件格式" 
        min-width="100">
        </el-table-column>
      <el-table-column
        prop="wjdx" 
        label="文件大小" 
        min-width="100"></el-table-column>
      <el-table-column
        prop="wjfbl" 
        label="文件分辨率" 
        min-width="100"></el-table-column>
      <el-table-column
        label="操作"
        min-width="100"
        >
        <template slot-scope="scope">
          <el-button type="primary" size="small"   @click="addQualityReceiveFun(scope.row.quality_id)">接 收</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <!-- 添加质检文件弹层 E -->
    </el-card>
  </div>
</template>

<script>
import {
  getQualityList,
  uploadFileQuality,
  addQualitySave,
  addQualityReceive,
} from '@/api/quality'
import {
  querySystemDictionary,
} from '@/api/systemDictionary'
import { getBase64 } from '@/utils/index'
export default {
   name:'imgCheck',
  data () {
    return {
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo: {
        page_num:1,
        page_size:10,
      },

      qualityList:[], //质检文件列表
      downloadUrl:'',//文件预览地址
      dialogTableVisible:false,//弹层
      fileList:[],//上传文件列表
      fileDatalist:[],//添加质检文件列表
      fileI_id:'',//文件ID 随机生成
      quality_idlists:[],//
      quality_ids:'',
    }
  },
  created () {
    this.getFileUrlFun() //文件预览地址
  },
  mounted () {
    this.getQualityListFun() //获取质检文件列表 
  },
  methods: {
    //
    batchSelectionFun(){
      if (this.quality_idlists.length == 0) return this.message({ message: '请选择需要批量接收的文件', type: 'error' })
      this.quality_idlists.forEach((item,index) => {
      if (index == 0) {
       this.quality_ids = item.quality_id
      } else {
        this.quality_ids = this.quality_ids+'#'+item.quality_id
      }
    })
      this.addQualityReceiveFun(this.quality_ids)
    },
    // 批量接收质检文件选择
    handleSelectionChange(val){
      console.log(val)
      this.quality_idlists = val
    },
    //接收质检文件
    addQualityReceiveFun(quality_id){
      const q ={
        quality_id:quality_id
      }
      addQualityReceive(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.message({ message: message, type: 'success' })
        }
      })
    },
    // 添加质检文件
    addQualitySaveFun(row){
      console.log(row)
      // const q = 
      addQualitySave(row).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        // this.message({ message: message, type: 'success' })
         
        }
      })
    },
     //生成档案利用ID
    utilizeIdFun(){
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var hours = day.getHours();
        var minutes = day.getMinutes()
        var seconds = day.getSeconds();
        var CurrentDate = "";
        Year = day.getFullYear(); //支持IE和火狐浏览器.
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year;
        if (Month >= 10) { CurrentDate += Month;}else { CurrentDate += "0" + Month;}
        if (Day >= 10) { CurrentDate += Day;}else {CurrentDate += "0" + Day;}
        if (hours<10) { hours = '0'+hours}
        if (minutes<10) {minutes = '0'+minutes}
        if (seconds<10) {seconds = '0'+seconds}
        CurrentDate = CurrentDate+hours+minutes+seconds
        var OrderID = CurrentDate + Math.floor(Math.random() * 100 );
        this.fileI_id = OrderID
        console.log("随机ID:" + OrderID );
        return OrderID
    },
   async upload(e){
     // 获取dom 对象
let file = document.getElementById("avatar");
// FileList 对象如下：
let fileList = file.files;  // 表示 fileList 对象集合

            this.utilizeIdFun() //获取随机生成文件ID
            var aBlob = new Blob( files );
            this.myUpload(fileList[0],this.fileI_id)
            const files = e.target.files; //获取文件用于转化获取分辨率
            let imggs = files[0].name.substring(files[0].name.lastIndexOf(".")+1)
            // 'bmp，jpg，png，tif，gif，pcx，tga，exif，fpx，svg，psd，cdr，pcd，dxf，ufo，eps，ai，raw，WMF，webp，avif，apng' 
            if ( imggs == 'jpg' || imggs == 'png' || imggs == 'gif' || imggs == 'svg' || imggs == 'webp' || imggs == 'jpeg') {
              const fileBase64 = await this.getBase64(files[0]);
              const res = await this.getImgPx(fileBase64);
              let fileI = {
                wjtm:files[0].name.substring(0, files[0].name.indexOf('.')),
                wjgs:files[0].name.substring(files[0].name.lastIndexOf(".")+1),
                wjdx:this.formatBytes((files[0].size).toFixed(2)),
                wjfbl:res.width+" X "+res.height,
                quality_id:this.fileI_id,
                file_url:'',
              }
              console.log(fileI)
            
            this.fileDatalist.push(fileI)
            } else {
            let fileI = {
              wjtm:files[0].name.substring(0, files[0].name.lastIndexOf('.')),
              wjgs:files[0].name.substring(files[0].name.lastIndexOf(".")+1),
              wjdx:this.formatBytes((files[0].size).toFixed(2)),
              wjfbl:'',
              quality_id:this.fileI_id,
              file_url:'',
            }
              console.log(fileI)
              this.fileDatalist.push(fileI)
            }
        },
        //单位转化
        formatBytes(a, b) { 
            if (0 == a) return "0 B"; 
            var c = 1024, d = b || 2, e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); 
            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
        },
        getBase64(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => {
                    resolve(reader.result);
                };
            });
        },
        getImgPx(img) {
            const image = new Image();
            image.src = img;
            return new Promise((resolve) => {
                image.onload = () => {
                    const width = image.width;
                    const height = image.height;
                    resolve({ width, height });
                };
            });
        },

  // type your function
  handleChange(file, fileLists) {
    ;
    console.log(fileLists);

  },
  //上传文件
    myUpload(e,id){
      console.log(e,id)
       const formData = new FormData()

      formData.append('file', e)
      formData.append('quality_id', id)
      
      uploadFileQuality(formData).then(response =>{
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          // this.message({ message: '上传成功', type: 'success' })
          
          console.log(this.fileDatalist)
          this.fileDatalist[this.fileDatalist.length - 1].file_url = res.file_url
          console.log(this.fileDatalist)  
          this.addQualitySaveFun(this.fileDatalist[this.fileDatalist.length - 1])
           // this.compilationForm.compilation_url = res.file_url   //上传后 获取最新的 文件路径  
          // this.compilationForm.compilation_id = this.compilation_id
            
          }
      })
    },

  //打开添加质检文件弹层
  addQualityFileDialogFun(){
    this.dialogTableVisible = true
  },
  //关闭添加质检文件弹层
  handleClose(){
    this.dialogTableVisible = false
    this.fileDatalist = []
    this.getQualityListFun()
  },
  //获取质检文件列表
  getQualityListFun(){
    const q ={
      page_num:this.currentPage,
      page_size:this.pageSize,
    }
    getQualityList(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.qualityList = res.list
       
       this.total = res.total
          if (res.total !== 0 && res.list.length == 0 ) {
            this.currentPage = 1
            this.getQualityListFun()
          } 
      }
    })
  },
    //预览文件
    QualityFilePreviewFun(row){
      if (row.file_url == '' || row.file_url == undefined || row.file_url == null) {
        this.message({ message: '文件无法预览', type: 'error' })
      }else {
        var url = this.downloadUrl + row.file_url
        window.open(url, '_blank')
      }
      
    },

  // 获取文件预览地址
  getFileUrlFun(){
    const q = {
        dict_tag:'file_server_url'
      }
    querySystemDictionary(q).then(response =>{
      if (response.status === 200) {
        const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
        this.downloadUrl = res[0].dict_code
      }
    })
  },

    // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getQualityListFun()
    },

    // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getQualityListFun()
    }, 
  },
}
</script>

<style scoped lang='less'>
.upload-demo {
  height: 40px;
}

.file-box {
    display: inline-block;
    position: relative;
    overflow: hidden;
    // color: rgb(252, 113, 0);
    // background-color: rgb(255, 255, 255);
}
 
.file-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
}
</style>
