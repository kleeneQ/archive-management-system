<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案补卷</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="margin-10">
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row>
     <el-card style="background-color: #F4F4F4;">
            <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
              <el-col :span="24">
                <!-- 文件 查询-->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" >
                  <el-form-item label="文件题名">
                    <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名" @change="getDocumentListFun"></el-input>
                  </el-form-item>
                  <el-form-item label="文件档号">
                    <el-input clearable v-model="queryInfo.wjdh" placeholder="请输入文件档号" @change="getDocumentListFun"></el-input>
                  </el-form-item>
                
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getDocumentListFun()">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!-- 文件列表 B -->
          <div class="eltablebox">
            <el-col>
                    <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary"  @click="showAddSupplementFileDialog">新增补卷</el-button>
                  </el-form-item>
                </el-form>
              </el-col> 
            <el-table
              :data="documentList"
              key="three"
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
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="300">
              <template slot-scope="scope" >
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}-{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="150">
              </el-table-column>
              <!-- <el-table-column
                prop="bgqxName"
                label="保管期限"
                width="200">
              </el-table-column> -->
              <el-table-column
                prop="sl"
                label="数量"
                width="100">
              </el-table-column>
              <!-- <el-table-column
                prop="mjName"
                label="密级"
                width="200">
              </el-table-column> -->
              <el-table-column
                prop="wzName"
                label="文种"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="zlrs"
                label="著录时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="200"
               fixed="right"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit"  @click="fjscDialogVisibleFun(scope.row)">补卷</el-button>
                  <el-button type="primary" size="small" @click.native="downloadfileSupplementfileFun(scope.row)">下载原件</el-button>
               </template>
              </el-table-column>
            </el-table>
            <!-- 分页 B -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 50, 200, 1000]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
              >
            </el-pagination>
            <!-- 分页 E -->
          </div>
          <!-- 文件列表 E -->
     </el-card>
         <!-- 添加补卷文件 弹层 B-->
      <el-dialog
        :title="'添加补卷'"
        :visible.sync="addSupplementFileDialogVisible"
        width="50%"
        @close="dialogClosed"
      >
        <el-form class="catalogueengineering" :inline="true" :model="SupplementFileForm" ref="SupplementFileRef" :rules="SupplementFileRules" label-width="130px">
      <el-form-item label="文件题名: " class="catalogueengineering-title" prop="wjtm" >
        <el-input clearable v-model="SupplementFileForm.wjtm" placeholder="请输入文件题名" ></el-input>
      </el-form-item>
      <el-form-item label="载体类型: " prop='ztlx'>
        <el-select  v-model="SupplementFileForm.ztlx" placeholder="请选择载体类型" >
          <el-option v-for="(item,index) in carrierType" :key="index" :label="item.mc"  :value="item.bm"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="保管期限: ">
        <el-select  v-model="SupplementFileForm.bgqx" placeholder="请选择保管期限" >
          <el-option v-for="(item,index) in storagePeriod" :key="index" :label="item.mc"  :value="item.bm"></el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="密级: " >
      <el-select  v-model="SupplementFileForm.mj" placeholder="请选择密级">
        <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="责任者: ">
        <el-input v-model="SupplementFileForm.zrz" placeholder="请输入责任者" ></el-input>
      </el-form-item>
      
      <el-form-item label="数量: ">
        <el-input v-model="SupplementFileForm.sl" placeholder="请输入数量" ></el-input>
      </el-form-item>
      <el-form-item label="规格: ">
      <el-select  v-model="SupplementFileForm.gg" placeholder="请选择规格">
        <el-option v-for="(item,index) in specifications" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="文种: ">
      <el-select  v-model="SupplementFileForm.wz" placeholder="请选择文种">
        <el-option v-for="(item,index) in language" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="附注: " class="catalogueengineering-title">
        <el-input type='textarea' clearable v-model="SupplementFileForm.fz" placeholder="请输入附注"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="addSupplementFileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSupplementFileSaveFun">下 一 步</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
         <!-- 添加补卷文件 弹层 E-->

       <!-- 附件上传弹层 B-->
     <el-dialog
      :title="'上传附件'"
      :visible.sync="fjscDialogVisible"
      width="60%"
      @close="dialogClosed"
    >
   <WebUpload
      :fileNumLimit="fileNumLimit"
      :fileSize="fileSize"
      :chunkSize="chunkSize"
      :uploadSuffixUrl="uploadSuffixUrl"
      :options="options"
      :fileListData="filesList"
      :fjscrow="fjscrow"
      @childFn="parentFn"
      > </WebUpload>
    </el-dialog>
       <!-- 附件上传弹层 E-->
         <!-- 添加补卷 弹层 B-->
      <el-dialog
        :title="'补卷'"
        :visible.sync="SupplementFilefzDialogVisible"
        width="50%"
        @close="dialogClosed"
      >
      <el-form class="catalogueengineering" :inline="true" :model="SupplementFilefzForm" ref="SupplementFilefzRef" :rules="SupplementFilefzRules" label-width="130px">
      <el-form-item label="附注: " class="catalogueengineering-title" prop="fz">
        <el-input type='textarea' clearable v-model="SupplementFilefzForm.fz" placeholder="请填写附注"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="SupplementFilefzDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSupplementFileSaveFun">确 定</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
         <!-- 添加补卷 弹层 E-->

  </div>
</template>

<script>
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getSupplementFilesSearch,
  getSupplementFileList,
  addSupplementFileSave,
  downloadfileSupplementfile,
  submitSupplementFileSave,
} from '@/api/supplement'
import Download from "@/utils/download"
import WebUpload from '@/components/upload/SupplementFileupload'
export default {
  components: {
    WebUpload,
  },
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        page_size:10,
        page_num:1,
        ajtm:'',
        ajdh:'',
      },
      documentList:[],//文件列表数据
      Filesid:'',//案卷id
      zt:'',//案卷状态
      file_status:[],//状态
      language: [], // 文种
      carrierType: [], // 载体类型
      addSupplementFileDialogVisible:false,//添加补卷 弹层
      SupplementFileForm:{}, //添加补卷表单
      SupplementFileRules:{//添加补卷表单校验
        wjtm: [
          { required: true, message: '请输入文件题名', trigger: 'blur' }
        ],
        ztlx: [
          { required: true, message: '请选择载体类型', trigger: '[blur,change]' }
        ],
      },
      secretGrade:[],
      specifications:[],
      storagePeriod:[],//保管期限
      fjscDialogVisible:false, //上传附件弹窗图层 显示隐藏判断条件
      SupplementFilefzDialogVisible:false,//提交补卷审核信息 弹层
      SupplementFilefzForm:{  //提交补卷审核信息 表单
        fz:'',
      },
      SupplementFilefzRules:{
        fz: [
          { required: true, message: '请填写附注', trigger: 'blur' }
        ],
      },
       fjscrow:{},//上传附件 所点击文件条 内容数据
        id: -1,
        loading:true,
        uploadLoading: false,
        showRemoveFile: false,
        uploader:{},
        uploadBtnDisabled:false,
        uploadStaus:"el-icon-upload",
        filesList:[],//附件显示集合
        fileNumLimit:200,//文件总数
        fileSize:100*1024*1024*1024,//默认上传文件大小
        chunkSize:5*1024*1024,//默认文件片段
        uploadSuffixUrl:"",
        options:{
          //允许上传的文件
          fileType:"zip",
          fileUploadUrl:"/file-api/v1/file/supplement/upload",//上传地址
          fileCheckUrl:"/file-api/v1/file/supplement/check",//检测文件是否存在url
          checkChunkUrl:"/file-api/v1/file/supplement/check",//检测分片url
          mergeChunksUrl:"/file-api/v1/file/supplement/merge",//合并文件请求地址
          uploadSuffixUrl:'',
          headers:{},
          file_id:'',
        },
    }
  },
  watch: {
    total() {
       if (this.total !== 0 && this.queryInfo.page_num !== 1) {
        this.queryInfo.page_num = 1
        this.getDocumentListFun()
      }
    },
    
  },
  created () {
    this.Filesid = this.$route.query.Filesid
    this.zt = this.$route.query.zt
    this.getCarrierType()  // 载体类型 
    this.getLanguage()  // 文种
    this.getSecretGrade()  // 密级
    this.getSpecifications()  // 规格
    this.getStoragePeriod()  // 保管期限
  },
  mounted () {
    this.getDocumentListFun() //获取文件列表
  },
  methods: {
  // type your function
  // 确定提交审核附注 
  submitSupplementFileSaveFun(){  
       this.$refs.SupplementFilefzRef.validate((valid) => {
          if (valid) {
            const q ={
                file_id:this.fjscrow.file_id,
                fz:this.SupplementFilefzForm.fz,
              }
              submitSupplementFileSave(q).then(response =>{
              if (response.status === 200) {
                const { data: res, message, status } = response.data
                if (status !== 200) return this.message({ message: message, type: 'error' })
                
                this.fjscDialogVisible = true
                this.SupplementFilefzDialogVisible = false
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
 
  },
  // 补卷  提交补卷审核信息


  //下载原件
  downloadfileSupplementfileFun(row){
    const q ={
      file_id:row.file_id
    }
    downloadfileSupplementfile(q).then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'aplication/zip'})
        Download.download(
          blob,
          fileName
        )
      }).catch(error => {
        console.log(error)
      })
  },
  //打开 文件上传 弹层
  fjscDialogVisibleFun(row){
    this.fjscrow = {}
    this.fjscrow = row
    this.SupplementFilefzDialogVisible = true
  },
      //获取子组件 附件上传组件的显示隐藏条件
    parentFn(payload) {
        this.fjscDialogVisible = payload;
        this.message({ message: '提交审核，文件上传成功', type: 'success' })
      },
  //添加补卷 提交表单
  addSupplementFileSaveFun(){
    
    this.$refs.SupplementFileRef.validate((valid) => {
          if (valid) {
            
            this.SupplementFileForm.files_id = this.Filesid
            addSupplementFileSave(this.SupplementFileForm).then(response =>{
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
                this.addSupplementFileDialogVisible = false
                this.fjscDialogVisible = true
                this.fjscrow = res
                this.fjscrow.ztlx = this.SupplementFileForm.ztlx
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    
  },
  // 添加补卷 弹层
  showAddSupplementFileDialog(){
    this.SupplementFileForm = {}
    this.addSupplementFileDialogVisible = true
  },
  //关闭弹层
  dialogClosed(){
    this.addSupplementFileDialogVisible = false
  },
  // 获取文件列表
  getDocumentListFun(){
    const q ={
      zt:this.zt,
      files_id:this.Filesid,
      wjdh:this.queryInfo.wjdh,
      wjtm:this.queryInfo.wjtm,
        page_num: this.currentPage,
        page_size: this.pageSize,
    }
    getSupplementFileList(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getDocumentListFun()
         }
        res.list.map(v => {
            // v.cfwz = v.ajk + v.ajl + v.ajg + v.ajc + v.ajx
             this.file_status.forEach(t =>{
              if (v.zt === t.dict_code) {
                v.ztName = t.dict_name
              }
              return
            })
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            return
          })
       this.documentList = res.list
      }
    })
  },
    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
    // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.page_size = newSize
      this.getDocumentListFun() //获取文件列表
    },
        // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.queryInfo.page_num = newPage
       this.getDocumentListFun() //获取文件列表
    },
     // 文件级载体类型
    getCarrierType() {
      const q = {
        bm: "WJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.carrierType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 文种
    getLanguage() {
      const q = {
        bm: "WZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.language  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
      // 规格
    getSpecifications() {
      const q = {
        bm: "WJGG_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.specifications  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
           // 保管期限
    getStoragePeriod() {
      const q = {
        bm: "BGQX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.storagePeriod  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 密级
    getSecretGrade() {
      const q = {
        bm: "MJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.secretGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },
}
</script>

<style scoped lang='less'>

</style>
