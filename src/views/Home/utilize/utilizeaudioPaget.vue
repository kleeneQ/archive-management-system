<template>
  <div class="description">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案利用</el-breadcrumb-item>
        <el-breadcrumb-item>文件详情</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card class="box-main-card">
            <el-row>
              <el-col :span="24">
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" >
                  <el-form-item label="文件题名">
                    <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名" @change="getUtilizeRegisterFileListFun"></el-input>
                  </el-form-item>
                  <el-form-item label="文件档号">
                    <el-input clearable v-model="queryInfo.wjdh" placeholder="请输入文件档号" @change="getUtilizeRegisterFileListFun"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getUtilizeRegisterFileListFun">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

          </el-card>
         <el-card>
          <!-- 列表区 -->
              <div class="eltablebox" style="padding:0px">
               <!-- <el-col>
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="addfileDialogVisibleFun('新增文件', {})">新增文件</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-download" @click="downloadTelplate">下载导入模板</el-button>
                  </el-form-item>
                   <el-form-item>
                    <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入文件')">批量导入</el-button>
                  </el-form-item>
                </el-form>
              </el-col>  -->
            <!-- 案卷文件列表 -->
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
                width="50">
                 <template slot-scope="scope">
                  <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
              </el-table-column>
              <el-table-column
                prop="zdjh"
                label="总登记号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="档号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="field_one"
                label="分类号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="psdd"
                label="拍摄地点"
                width="200">
              </el-table-column>
              <el-table-column
                prop="pssj"
                label="拍摄时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.pssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="psz"
                label="拍摄者"
                width="200">
              </el-table-column>
              <el-table-column
                prop="pszdw"
                label="拍摄单位"
                width="200">
              </el-table-column>
              <el-table-column
                prop="dpbh"
                label="底片编号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="sbName"
                label="色别"
                width="200">
              </el-table-column>
              <el-table-column
                prop="pxName"
                label="片型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="dpwz"
                label="底片位置"
                width="200">
              </el-table-column>
              <el-table-column
                prop="kcdz"
                label="库存地址"
                width="200">
              </el-table-column>
              <el-table-column
                prop="lrsj"
                label="著录时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
               fixed="right"
                >
                <template slot-scope="scope">
                  <!-- <el-button type="primary" size="small" class="btnedit"  @click="editFileDialogFun('编辑文件', scope.row)">编辑</el-button> -->
                  <!-- <el-button type="warning" size="small" v-if="scope.row.field_two === '0'" @click="upload(scope.row)">上传附件</el-button> -->
                  <!-- <el-button type="warning" size="small" v-if="scope.row.field_two !== '0'" @click="upload(scope.row)">重新上传</el-button> -->
                  <el-button type="primary" size="small" @click.native="getRegisterUtilizeFileUrlFileIdFun(scope.row)">文件预览</el-button>
                  <!-- <el-button type="danger" size="small" @click="removeFileAudioFun('1',scope.row)">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[50, 100, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
              >
            </el-pagination>

            </div>
          </el-card>

   <!-- 选择导入文件的弹层 （表格） -->
    <el-dialog
      :title="importTitle"
      :visible.sync="importDialogVisible"
      width="40%"
      @close="importDialogClosed"
    >
      <el-form
        ref="editAddForm"
        label-width="100px"
      >
        <el-form-item label="导入文件：" prop="bm" style="margin-bottom:0;">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            accept=".csv,.xls,.xlsx"
            :limit="1"
            :show-file-list="true"
            :auto-upload="false"
            :http-request="myUpload"
          >
            <el-button type="success" slot="trigger" icon="el-icon-folder" size="small">请选择要上传的文件</el-button>
              <span class="tip">请先下载导入模板，将需要导入的数据填入导入模板中，再进行导入喔~以免导入失败！</span>
            <div class="up-btn">
              <el-button @click="importDialogClosed">取 消</el-button>
              <el-button type="primary" @click="submitUpload">立即上传</el-button>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>  

    <!-- 新增文件弹层 B-->
    <el-dialog
      :title="titleName"
      :visible.sync="addfileDialogVisible"
      width="60%"
      @close="dialogaddFileClosed"
    >
          <el-form class="catalogueengineering" :inline="true" :model="addfileeForm" ref="addfileeFormref" :rules="addfileeFormRules" label-width="100px">
        <el-form-item label="文件题名: " class="catalogueengineering-title" prop="wjtm">
          <el-input clearable v-model="addfileeForm.wjtm" placeholder="请输入文件题名" ></el-input>
        </el-form-item>
           <el-form-item label="分类号: " prop="field_one">
         <el-cascader
            :options="engineeringType"
            expand-trigger="hover"
            :props="cascaderProps"
            v-model="addfileeForm.field_one"
            placeholder="分类号" 
            clearable
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="档号: " prop="wjdh">
          <el-input v-model="addfileeForm.wjdh" placeholder="请输入档号" ></el-input>
        </el-form-item>

        <el-form-item label="总登记号: " prop="zdjh">
          <el-input v-model="addfileeForm.zdjh" placeholder="请输入总登记号" ></el-input>
        </el-form-item>
        <el-form-item label="拍摄者: ">
          <el-input v-model="addfileeForm.psz" placeholder="请输入拍摄者" ></el-input>
        </el-form-item>
        <el-form-item label="拍摄地点: ">
          <el-input v-model="addfileeForm.psdd" placeholder="请输入拍摄地点" ></el-input>
        </el-form-item>
        <el-form-item label="事件: ">
          <el-input v-model="addfileeForm.sj" placeholder="请输入事件" ></el-input>
        </el-form-item>
        <el-form-item label="拍摄时间: ">
           <el-date-picker
            v-model="addfileeForm.pssj"
            type="date"
            placeholder="请选择拍摄时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="底片数量: ">
          <el-input v-model="addfileeForm.dpsl" placeholder="请输入底片数量" ></el-input>
        </el-form-item>
        <el-form-item label="色别: ">
            <el-select  v-model="addfileeForm.sb" placeholder="请选择色别">
            <el-option v-for="(item,index) in ColorCode" :key="index" :label="item.mc" :value="item.bm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拍摄者单位: " >
          <el-input v-model="addfileeForm.pszdw" placeholder="请输入拍摄者单位" ></el-input>
        </el-form-item>
        <el-form-item label="片型: ">
          <el-select  v-model="addfileeForm.px" placeholder="请选择片型">
          <el-option v-for="(item,index) in PieceType" :key="index" :label="item.mc" :value="item.bm"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="底片规格: ">
          <el-select  v-model="addfileeForm.dpgg" placeholder="请选择底片规格">
            <el-option v-for="(item,index) in SpecificationFilm" :key="index" :label="item.mc" :value="item.bm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="底片位置: ">
          <el-input v-model="addfileeForm.dpwz" placeholder="请输入底片位置" ></el-input>
        </el-form-item> 
        <el-form-item label="底片编号: ">
           <el-input v-model="addfileeForm.dpbh" placeholder="请输入底片编号" ></el-input>
        </el-form-item>
        <el-form-item label="分辨率: ">
          <el-input v-model="addfileeForm.fbl" placeholder="请输入分辨率" ></el-input>
        </el-form-item> 
        <el-form-item label="人物: ">
          <el-input v-model="addfileeForm.rw" placeholder="请输入人物" ></el-input>
        </el-form-item> 
        <el-form-item label="内容: ">
          <el-input v-model="addfileeForm.nr" placeholder="请输入内容" ></el-input>
        </el-form-item> 
        <el-form-item label="文件大小: ">
          <el-input v-model="addfileeForm.wjdx" placeholder="请输入文件大小" ></el-input>
        </el-form-item> 
        <el-form-item label="光盘号: ">
          <el-input v-model="addfileeForm.gph" placeholder="请输入光盘号" ></el-input>
        </el-form-item>  
        <el-form-item label="库存地址: ">
          <el-input v-model="addfileeForm.kcdz" placeholder="请输入库存地址" ></el-input>
        </el-form-item>
        <el-form-item label="入馆时间: ">
            <el-date-picker
              v-model="addfileeForm.rgsj"
              type="date"
              placeholder="请选择入馆时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话: ">
          <el-input v-model="addfileeForm.lxdh" placeholder="请输入联系电话" ></el-input>
        </el-form-item>
        <el-form-item label="备注: " class="catalogueengineering-title">
          <el-input type='textarea' clearable v-model="addfileeForm.fz" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="dialogaddFileClosed">取 消</el-button>
          <el-button type="primary" v-if="titleName=='新增文件'" @click="addAudioPictureFileFun">确 定</el-button>
          <el-button type="primary" v-if="titleName!=='新增文件'" @click="updateAudioPictureFileFun">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增文件弹层 E-->


      <!-- 2022.10.12 新上传单个文件ZIP 组件  B-->
        <audio-uploader /> 
      <!-- 2022.10.12 新上传单个文件ZIP 组件  E-->


          <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />

  </div>
</template>

<script>
import {
  importAudioPictureFile,
  addAudioPictureFile,
  updateAudioPictureFile,
  downloadAudioModel,
  removeFileAudio,
} from '@/api/audioPicture'

import {
  getUtilizeRegisterFileList,
  getRegisterUtilizeFileUrlFileId
} from '@/api/utilize'


import Download from "@/utils/download"
import {
  parseTime
} from "@/utils/index"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getArchivesCateList,
} from '@/api/archivesCate'
import AudioUploader from '@/components/upload/audioUploader'
import Bus from '@/assets/js/bus';
import {
  querySystemDictionary
} from '@/api/systemDictionary'

export default {
  components: {
    AudioUploader,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        wjtm:'',
        wjdh:'',
      },
      documentList:[],//文件列表
      files_id:'',//案卷ID
      importDialogVisible:false, //批量导入弹层条件
      importTitle:"",//导入弹层 标题
      addfileDialogVisible:false,//新增文件弹层
      titleName:"新增文件",//弹层名称
      addfileeForm:{},//新增文件表单 
        addfileeFormRules:{   //表单检验
        wjtm: [
          { required: true, message: '请输入案卷题名', trigger: 'blur' }
        ],
        field_one: [
          // { type: 'array', required: true, message: '请选择分类号', trigger: 'blur' }
          {  required: true, message: '请选择分类号', trigger: 'blur' }
          ],
        wjdh: [
          { required: true, message: '请输入档号', trigger: 'blur' }
        ],
        zdjh: [
          { required: true, message: '请输入总登记号', trigger: 'blur' }
        ],
      },
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_code',
        children: 'child',
        emitPath: false
      },
      PieceType:[], //片型
      SpecificationFilm:[], //底片规格
      ColorCode:[], //色别
      archivesCateList:[],//单位工程类型
      uniProjectType:[],//单位工程类型
      engineeringType: [],  // 工程类型
      fileDialogVisible:false, //文件预览弹层图层 显示隐藏判断条件
      fileURLym:'',//文件预览域名
      filesType:"",//案卷类型
    }
  },
  created () {
    this.files_id = this.$route.query.filesid
    this.filesType =  this.$route.query.filesType
  },
  mounted () {
    this.getPieceType() //片型
    this.getSpecificationFilm() //底片规格
    this.getColorCode() //色别
    this.getEngineeringTypeFun() //获取工程类型
    this.getUtilizeRegisterFileListFun()
    this.querySystemDictionaryFun() //获取文件预览域名


    // 文件选择后的回调chunkNumber
      Bus.$on('fileAdded', (a) => {
        console.log('文件已选择',a)
      });

      // 文件上传成功的回调
      Bus.$on('fileSuccess', (v) => {
        // this.mergeUploadFileFun(v.chunk)
        this.message({ message: v, type: 'success' })
        console.log('文件上传成功',v)
        this.getUtilizeRegisterFileListFun()
      }); 

  },
    //销毁 公用调用的函数 
destroyed() {
      Bus.$off('fileAdded');
      Bus.$off('fileSuccess');

    },
  methods: {
  // type your function
   //获取文件预览域名
    querySystemDictionaryFun(){
      const that = this
        const q = {
            dict_tag:'file_server_url'
          }
          //获取文件预览域名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              that.fileURLym = response.data.data[0].dict_code
            }
          }).catch(error => {
            console.log(error)
          })
    },

    //文件预览
    getRegisterUtilizeFileUrlFileIdFun(row){
        const that = this
      const q ={
        file_id:row.file_id
      }
        let apiUrl = ''
      if (this.filesType == 'AJJZTLX_DIC-5') {  //录像
        apiUrl = '/prod-api/v1/audio/video/file/url/file_id'
      } else if (this.filesType == 'AJJZTLX_DIC-4'){  //光盘
        apiUrl = '/prod-api/v1/audio/cd/file/url/file_id'
      } else{  //照片
        apiUrl = '/prod-api/v1/audio/picture/file/url/file_id'
      }
      
      getRegisterUtilizeFileUrlFileId(q,apiUrl).then(response =>{
        let fileUrlArr = response.data.data
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        if(fileUrlArr.length == 0) return this.message({ message: '暂无可预览文件', type: 'error' })
          this.FileUrlArrs = fileUrlArr.map(function (n) {
              return that.fileURLym + n.file_url+'?'+new Date();
          });
         this.fileDialogVisible = true 
        }
      })
    },


      //2022.11.15 音像上传导入ZIP组件方法 B
      //打开文件选择框  上传按钮
      upload(row) {
        this.file_id = row.file_id
        // 打开文件选择框
        Bus.$emit('openUploader', {
          file_id: row.file_id,  // 传入的参数
        })
      },
    //2022.11.15 音像上传导入ZIP组件方法 E

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
            this.getUtilizeRegisterFileListFun() //刷新文件列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })       
      })



   
  },
  //编辑文件 弹层
  editFileDialogFun(titleName,row){

    this.titleName = titleName
    this.addfileeForm = row
    console.log(row)
    this.addfileDialogVisible = true

  },
  updateAudioPictureFileFun(){
     if (this.addfileeForm.pssj !== undefined) {
      // 处理时间显示
      this.addfileeForm.pssj = parseTime(this.addfileeForm.pssj)
    }
    if (this.addfileeForm.rgsj !== undefined) {
      // 处理时间显示
      this.addfileeForm.rgsj = parseTime(this.addfileeForm.rgsj)
    }
     let apiUrl = ''
      if (this.filesType == 'AJJZTLX_DIC-5') {  //录像
        apiUrl = '/prod-api/v1/audio/video/file/update'
      } else if (this.filesType == 'AJJZTLX_DIC-4'){  //光盘
        apiUrl = '/prod-api/v1/audio/cd/file/update'
      } else{  //照片
        apiUrl = '/prod-api/v1/audio/picture/file/update'
      }

      this.$refs['addfileeFormref'].validate((valid) => {
          if (valid) {
            updateAudioPictureFile(this.addfileeForm,apiUrl).then(response =>{
              if (response.status === 200) {
                const { data: res, message, status } = response.data
                if (status !== 200) return this.message({ message: message, type: 'error' })
                this.message({ message: message, type: 'success' })
                this.dialogaddFileClosed() //关闭弹层 
                this.getUtilizeRegisterFileListFun() //刷新文件列表
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    
  },
      resetForm(formName) {
        this.$refs['addfileeFormref'].resetFields();
      },
  //新增文件
  addAudioPictureFileFun(){
      if (this.addfileeForm.pssj !== undefined) {
      // 处理时间显示
      this.addfileeForm.pssj = parseTime(this.addfileeForm.pssj)
    }
    if (this.addfileeForm.bzrq !== undefined) {
      // 处理时间显示
      this.addfileeForm.bzrq = parseTime(this.addfileeForm.bzrq)
    }
    if (this.addfileeForm.rgsj !== undefined) {
      // 处理时间显示
      this.addfileeForm.rgsj = parseTime(this.addfileeForm.rgsj)
    }
    this.addfileeForm.files_id = this.files_id

    let apiUrl = ''
      if (this.filesType == 'AJJZTLX_DIC-5') {  //录像
        apiUrl = '/prod-api/v1/audio/video/file/add'
      } else if (this.filesType == 'AJJZTLX_DIC-4'){  //光盘
        apiUrl = '/prod-api/v1/audio/cd/file/add'
      } else{  //照片
        apiUrl = '/prod-api/v1/audio/picture/file/add'
      }
      
   this.$refs['addfileeFormref'].validate((valid) => {
          if (valid) {
              addAudioPictureFile(this.addfileeForm,apiUrl).then(response =>{
              if (response.status === 200) {
                const { data: res, message, status } = response.data
                
                if (status !== 200) return this.message({ message: message, type: 'error' })
                this.message({ message: message, type: 'success' })
                this.dialogaddFileClosed() //关闭弹层 
                
                this.getUtilizeRegisterFileListFun() //刷新文件列表
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

 
  },
  //打开新增文件弹层
    addfileDialogVisibleFun(){
      this.addfileDialogVisible = true
    },
    //关闭新增文件弹层
    dialogaddFileClosed(){
      this.addfileDialogVisible = false
      this.addfileeForm = {} //清空弹层表单
    },
      // 下载导入模板
    downloadTelplate() {
      downloadAudioModel().then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
        Download.download(
          blob,
          fileName
        )
      }).catch(error => {
        console.log(error)
      })
    },

      // 批量导入文件弹层
    importExcelFile(source) {
      this.importTitle = source
      this.importDialogVisible = true
    },
    // 关闭导入模板弹层
    importDialogClosed() {
      this.importDialogVisible = false
      this.$refs.upload.clearFiles()
    },
        // 立即导入
    submitUpload() {
      this.$refs.upload.submit()
    },
    //导入表格数据
    myUpload(e){
      const formData = new FormData()
      formData.append('file', e.file)
      let apiUrl = ''
      if (this.filesType == 'AJJZTLX_DIC-5') {  //录像
        apiUrl = '/prod-api/v1/audio/video/file/import'
      } else if (this.filesType == 'AJJZTLX_DIC-4'){  //光盘
        apiUrl = '/prod-api/v1/audio/cd/file/import'
      } else{  //照片
        apiUrl = '/prod-api/v1/audio/picture/file/import'
      }


      importAudioPictureFile(formData,apiUrl).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getUtilizeRegisterFileListFun()
          }
        }).catch(error => {
          console.log(error)
        })
    },
    //获取文件列表
    getUtilizeRegisterFileListFun(){
      const q ={
        page_num:this.currentPage,
        page_size:this.pageSize,
        wjtm:this.queryInfo.wjtm,
        wjdh:this.queryInfo.wjdh,
        files_id:this.files_id
      }
      let apiUrl = ''
      if (this.filesType == 'AJJZTLX_DIC-5') {  //录像
        apiUrl = '/prod-api/v1/audio/video/file/list'
      } else if (this.filesType == 'AJJZTLX_DIC-4'){  //光盘
        apiUrl = '/prod-api/v1/audio/cd/file/list'
      } else{  //照片
        apiUrl = '/prod-api/v1/audio/picture/file/list'
      }
      console.log(apiUrl)
      getUtilizeRegisterFileList(q,apiUrl).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.total = res.total
         
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getUtilizeRegisterFileListFun()
         }
         res.list.forEach(v => {
          this.ColorCode.forEach(t => {
              if (v.sb === t.bm) {
                v.sbName = t.mc
              }
              return
            })
          return
        })
        res.list.forEach(v => {
          this.PieceType.forEach(t => {
              if (v.px === t.bm) {
                v.pxName = t.mc
              }
              return
            })
          return
        })
         this.documentList = res.list
        }
      })
    },

    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getUtilizeRegisterFileListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getUtilizeRegisterFileListFun()
    },
    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },

        // 片型
    getPieceType() {
      const q = {
        bm: "DICT_PX"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.PieceType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },   
    // 底片规格
    getSpecificationFilm() {
      const q = {
        bm: "DICT_DPGG"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.SpecificationFilm  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 色别
    getColorCode() {
      const q = {
        bm: "DICT_SB"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.ColorCode  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })

          res.map(item =>{
            item.child.forEach(element => {
              element.child = undefined  //去掉第三级选择
            });
          })
          // this.manageProjectCate(res)
          this.engineeringType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

     // 存储所有档案分类
    saveArchivesCateAll(res) {
      res.forEach(v => {
        this.archivesCateList.push(v)
        if (v.child) {
          this.saveArchivesCateAll(v.child)
        }
      })
    },

    // 单位工程类型
    getUniProjectType() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.saveArchivesCateAll(res)
          this.uniProjectType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },

}
</script>

<style scoped lang='less'>
.box-main-card{
        border:0 none;
        margin-bottom: 10px;
        box-shadow: none;
      }
</style>
