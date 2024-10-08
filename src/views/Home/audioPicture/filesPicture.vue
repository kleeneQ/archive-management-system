<template>
  <div >
       <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>声像档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>照片档案</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->

      <!-- 声像档案管理 照片档案 B -->
     <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷题名">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷题名" @change="getAudioPictureFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="关联工程名称">
              <el-input clearable v-model="queryInfo.glgcmc" placeholder="请输入关联工程名称" @change="getAudioPictureFilesListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getAudioPictureFilesListFun">查询</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" class="btnedit" icon="el-icon-plus" @click="dialogfilesPictureFormVisibleFun('添加声像档案')">新增声像档案</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
        <!-- 案卷列表 -->
            <el-table
              :data="filesPictureFilesList"
              border
              ref="table"
              style="width: 100%"
              class="tablestyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
              align="center"
                prop="ajtm"
                label="题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajdh"
                label="档号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="daxh"
                label="档案序号"
                show-overflow-tooltip
                min-width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="zh"
                label="总号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="flh"
                label="分类号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              
              <el-table-column
              align="center"
                prop="pssj"
                label="拍摄时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.pssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="psdd"
                label="拍摄地点"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="rw"
                label="人物"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="psz"
                label="拍摄者"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="sj"
                label="事件"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="nr"
                label="内容"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="glgcmc"
                label="关联工程"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="lrsj"
                label="录入时间"
                width="200">
                  <template slot-scope="scope">
                    {{scope.row.lrsj | formatDate}}
                  </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="400">
                <template slot-scope="scope">
                  <el-button type="primary" class="btnedit" size="small"  @click="editAudioPictureFilesFun('编辑案卷',scope.row)">编辑</el-button>
                  <el-button type="warning" size="small"    @click="ZIPupload(scope.row)">导入档案zip包</el-button>
                  <el-button type="danger" size="small"     @click="deletePictureFilesFun(scope.row)">删除</el-button>
                  <el-button type="primary" size="small"    @click="gotoaudioPictureFilePageFun(scope.row)">查看</el-button>
                  <el-button type="primary" size="small" v-if="scope.row.files_type == 'AJJZTLX_DIC-3'"   @click="getAudioCollectionFilesPreviewFun(scope.row)">预览</el-button>
               </template>
              </el-table-column>
            </el-table>
          
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
      <!-- 声像档案管理 照片档案 E -->

    <!-- 添加声像档案 弹层 B -->
      <el-dialog title="添加声像档案" :visible.sync="dialogfilesPictureFormVisible" width="60%">
      <el-form class="catalogueengineering" :inline="true" :model="filesPictureForm" ref="filesPictureFormref" :rules="filesPictureFormRules" label-width="100px">
        <el-form-item label="案卷题名: " class="catalogueengineering-title" prop="ajtm">
          <el-input clearable v-model="filesPictureForm.ajtm" placeholder="请输入案卷题名" ></el-input>
        </el-form-item>
      <el-form-item label="分类号: " prop="flh">
         <el-cascader
         style="width: 130px;"
          :options="engineeringType"
          expand-trigger="hover"
          :props="cascaderProps"
          v-model="filesPictureForm.flh"
          placeholder="分类号" 
          clearable
          :show-all-levels="false"
        ></el-cascader>
         <el-input style="width: 80px;" v-model="filesPictureForm.lsh" placeholder="流水号" ></el-input>
        </el-form-item>
        <el-form-item label="档号: " prop="ajdh">
          <el-input v-model="filesPictureForm.ajdh" placeholder="请输入档号" ></el-input>
        </el-form-item>
        <el-form-item label="总登记号: " prop="zh">
          <el-input v-model="filesPictureForm.zh" placeholder="请输入总登记号" ></el-input>
        </el-form-item>
        <el-form-item label="档案序号: ">
          <el-input v-model="filesPictureForm.daxh" placeholder="请输入档案序号" ></el-input>
        </el-form-item>
        <el-form-item label="拍摄地点: ">
          <el-input v-model="filesPictureForm.psdd" placeholder="请输入拍摄地点" ></el-input>
        </el-form-item>
        <el-form-item label="事件: ">
          <el-input v-model="filesPictureForm.sj" placeholder="请输入事件" ></el-input>
        </el-form-item>
        <el-form-item label="拍摄者: ">
          <el-input v-model="filesPictureForm.psz" placeholder="请输入拍摄者" ></el-input>
        </el-form-item>
        <el-form-item label="底片数量: ">
          <el-input v-model="filesPictureForm.dpsl" placeholder="请输入底片数量" ></el-input>
        </el-form-item>
        <el-form-item label="照片数量: ">
          <el-input v-model="filesPictureForm.zpsl" placeholder="请输入照片数量" ></el-input>
        </el-form-item>
        <el-form-item label="拍摄时间: ">
           <el-date-picker
          v-model="filesPictureForm.pssj"
          type="date"
          placeholder="请选择拍摄时间">
        </el-date-picker>

        </el-form-item>
        <el-form-item label="黑白照片数量: ">
          <el-input v-model="filesPictureForm.hbzpsl" placeholder="请输入黑白照片数量" ></el-input>
        </el-form-item>
        <el-form-item label="光盘数量: ">
          <el-input v-model="filesPictureForm.gpsl" placeholder="请输入光盘数量" ></el-input>
        </el-form-item>
        <el-form-item label="编制单位: ">
          <el-input v-model="filesPictureForm.bzdw" placeholder="请输入编制单位" ></el-input>
        </el-form-item>
        <el-form-item label="录像带数量: ">
          <el-input v-model="filesPictureForm.lxsl" placeholder="请输入录像带数量" ></el-input>
        </el-form-item>
        <el-form-item label="保管期限: ">
          <el-select  v-model="filesPictureForm.bgqx" placeholder="请选择保管期限">
          <el-option v-for="(item,index) in storagePeriod" :key="index" :label="item.mc" :value="item.bm"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="编制日期: ">
            <el-date-picker
              v-model="filesPictureForm.bzrq"
              type="date"
              placeholder="请选择编制日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="存放位置: ">
          <el-input v-model="filesPictureForm.cfwz" placeholder="请输入存放位置" ></el-input>
        </el-form-item>
        <el-form-item label="密级: ">
          <el-select  v-model="filesPictureForm.mj" placeholder="请选择密级">
          <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="人物: ">
          <el-input v-model="filesPictureForm.rw" placeholder="请输入人物" ></el-input>
        </el-form-item> 
        <el-form-item label="内容: ">
          <el-input v-model="filesPictureForm.nr" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="关联工程: ">
          <el-input v-model="filesPictureForm.glgcmc" placeholder="请输入关联工程" @focus="getAudioProjectListFun"></el-input>
        </el-form-item>
        <el-form-item label="备注: " class="catalogueengineering-title">
          <el-input type='textarea' clearable v-model="filesPictureForm.fz" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="dialogfilesPictureFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="titleName=='添加声像档案'" @click="addAudioPictureFilesFun">确 定</el-button>
          <el-button type="primary" v-if="titleName!=='添加声像档案'" @click="updateAudioPictureFilesFun">确 定</el-button>
       
          <!-- <el-button type="primary" @click="addAudioPictureFilesFun">确 定</el-button> -->
        </el-form-item>
      </el-form>

      </el-dialog>
      <!-- 添加声像档案 弹层 E -->

      <!-- 选择工程 B -->
        <el-dialog
          width="60%"
          title="关联工程"
          :visible.sync="ProjectVisible">
          <el-form :inline="true" :model="ProjectQueryInfo" class="demo-form-inline" label-width="100px">
             <el-form-item label="工程名称">
              <el-input clearable v-model="ProjectQueryInfo.gcmc" placeholder="请输入工程名称"  @change="getAudioProjectListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getAudioProjectListFun">查询</el-button>
            </el-form-item>
          </el-form>
            <!-- 工程列表 B -->
            <el-table
              :data="selectProjectLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="dwgcmc"
                label="工程名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="dwgclxName"
                label="工程类型"
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="getProjectNameFun(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
          </el-dialog>
        <!-- 选择工程 E --> 

          <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs">
     </el-image-viewer>

        

      <!-- 2022.11.22 新上传文件夹ZIP 组件  B-->
        <audio-uploaderBatch /> 
      <!-- 2022.11.22 新上传文件夹ZIP 组件  E-->

  </div>
</template>

<script>
import {
  getAudioPictureFilesList,
  addAudioPictureFiles,
  getAudioProjectList,
  deletePictureFiles,
  getAudioCollectionFilesPreview,
  updateAudioPictureFiles,
} from '@/api/audioPicture'

import {
  parseTime
} from "@/utils/index"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getArchivesCateList,
} from '@/api/archivesCate'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import Bus from '@/assets/js/bus';
import AudioUploaderBatch from '@/components/upload/audioUploaderBatch'
export default {
  components: {
    AudioUploaderBatch,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        ajtm:'',
        glgcmc:'',
      },
      filesPictureFilesList:[],//获取档案列表 数据
      dialogfilesPictureFormVisible:false,//添加声像档案 弹层
      filesPictureFormRules:{   //表单检验
        ajtm: [
          { required: true, message: '请输入案卷题名', trigger: 'blur' }
        ],
        flh: [
            { required: true, message: '请选择分类号', trigger: 'change' }
          ],
        ajdh: [
          { required: true, message: '请输入档号', trigger: 'blur' }
        ],
        zh: [
          { required: true, message: '请输入总登记号', trigger: 'blur' }
        ],
      },
      filesPictureForm:{ //添加声像档案表单

      },
      secretGrade:[],
      storagePeriod:[],
      engineeringType: [],  // 工程类型

      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_code',
        children: 'child',
        emitPath: false
      },
      ProjectQueryInfo:{ //选择关联工程表单
        gcmc:'',
      },
      ProjectVisible:false, //选择关联工程 弹层
      selectProjectLists:[],//关联工程列表
      uniProjectType:[],//单位工程类型
      archivesCateList:[],//单位工程类型
      dialoghintVisible:false,//删除提示
      files_id:'',//案卷ID
      titleName:"添加声像档案",//弹层名称
      fileURLym:'',//文件预览域名
      fileDialogVisible:false,//文件预览弹层
    }
  },
  created () {
    
  },
  beforeMount(){
    this.getSecretGrade()  // 密级
    this.getStoragePeriod()  // 保管期限
    this.getUniProjectType() //单位工程类型
    this.getEngineeringTypeFun() //获取工程类型
    this.querySystemDictionaryFun() //获取文件预览域名
  },

  mounted () {
    

    this.getAudioPictureFilesListFun() //获取档案列表 数据

        // 文件选择后的回调chunkNumber
      Bus.$on('filesAdded', (a) => {
        console.log('文件夹已选择',a)
      });
      // 文件上传成功的回调
      Bus.$on('filesSuccess', (v) => {
        // this.mergeUploadFileFun(v.chunk)
        // this.getFilesProjectListFun()
        // this.message({ message: v, type: 'success' })
        console.log('文件夹上传成功',v)
      });
  },
    //销毁 公用调用的函数 
destroyed() {
      Bus.$off('filesAdded');
      Bus.$off('filesSuccess');
    },
  methods: {
  // type your function

    //2022.11.22 新上传导入ZIP组件方法 B
      //打开文件选择框  上传按钮
      ZIPupload(files) {
        // this.file_id = id
        // 打开文件选择框
        console.log(files)
        Bus.$emit('openUploaderFiles', {
          files_id: files.files_id,  // 传入的参数
          files_name:files.ajtm,
          filesType:"AJJZTLX_DIC-3"
        })
      },

    //2022.11.22 新上传导入ZIP组件方法 E

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

  // 编辑案卷
  updateAudioPictureFilesFun(){
    
  if (this.filesPictureForm.bzrq !== undefined) {
      // 处理时间显示
      this.filesPictureForm.bzrq = parseTime(this.filesPictureForm.bzrq)
    }
  if (this.filesPictureForm.pssj !== undefined) {
      // 处理时间显示
      this.filesPictureForm.pssj = parseTime(this.filesPictureForm.pssj)
    }
    this.filesPictureForm.files_type = 'AJJZTLX_DIC-3'

    updateAudioPictureFiles(this.filesPictureForm).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
      
      this.dialogfilesPictureFormVisible = false
       this.filesPictureForm={}
      this.getAudioPictureFilesListFun() //刷新档案列表

      }
    })
  },
  //案卷下文件查看
  gotoaudioPictureFilePageFun(row){
       this.$router.push({ 
         path: '/audioPicture/audioPictureFilePage', 
         query: {
              filesid: row.files_id,
              filesType:'AJJZTLX_DIC-3'
            }, 
        })
    },
  //文件预览
  getAudioCollectionFilesPreviewFun(row){
    const that = this
    const q ={
      files_id:row.files_id
    }
    getAudioCollectionFilesPreview(q).then(response =>{
      let fileUrlArr = response.data.data

     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       if (res.length == 0) return this.message({ message: '该案卷下暂无文件可预览', type: 'warning' })
        this.FileUrlArrs = fileUrlArr.map(function (n) {
              return that.fileURLym + n.file_url;
          });

          console.log(this.FileUrlArrs)
         this.fileDialogVisible = true 
     //等组件显示出dom后再获取元素    
    setTimeout(() => {
            let prev = document.querySelector("span.el-image-viewer__prev")  //获取上一张按钮
            let next = document.querySelector("span.el-image-viewer__next")  //获取下一张按钮
            let on = document.querySelector("span.el-image-viewer__close")  //获取关闭按钮
              next.addEventListener('click', _ => {}) 
               let nextBtn = setInterval(function(){
                next.click()
              },2000)
              on.addEventListener('click', _ => {
                clearInterval(nextBtn)
              })
      }, 1000)
      
    
      }
    })
  },

  // 删除档案
  deletePictureFilesFun(row){

   this.confirm('是否删除该题名下所有照片档案信息么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            const q ={
              files_id:row.files_id
            }
            deletePictureFiles(q).then(response =>{
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
              
              this.getAudioPictureFilesListFun() //刷新档案列表
              }
            })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })       
      })


 
  },
  //编辑档案信息
  editAudioPictureFilesFun(titleName,row){
    this.titleName = titleName
    this.filesPictureForm = row
    this.dialogfilesPictureFormVisible = true
  },
  //选择关联的单位工程
  getProjectNameFun(row){
    this.filesPictureForm.project_id = row.project_id
    this.filesPictureForm.glgcmc = row.dwgcmc
    this.ProjectVisible = false
  },
  //声像档案管理关联工程列表
  getAudioProjectListFun(){
    const q ={
      dwgcmc:this.ProjectQueryInfo.gcmc,
    }
    getAudioProjectList(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       res.map(v =>{
         this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
       })
       
       this.selectProjectLists = res
       this.ProjectVisible = true
      }
    })
  },
  //打开新增案卷弹层
  dialogfilesPictureFormVisibleFun(titleName){
    this.titleName = titleName
    this.dialogfilesPictureFormVisible = true
  },
//添加声像档案
addAudioPictureFilesFun(){

  if (this.filesPictureForm.bzrq !== undefined) {
      // 处理时间显示
      this.filesPictureForm.bzrq = parseTime(this.filesPictureForm.bzrq)
    }
  if (this.filesPictureForm.pssj !== undefined) {
      // 处理时间显示
      this.filesPictureForm.pssj = parseTime(this.filesPictureForm.pssj)
    }
  this.filesPictureForm.files_type = 'AJJZTLX_DIC-3'
  console.log(this.filesPictureForm)
  addAudioPictureFiles(this.filesPictureForm).then(response =>{
   if (response.status === 200) {
    const { data: res, message, status } = response.data
    if (status !== 200) return this.message({ message: message, type: 'error' })
     
      
      this.dialogfilesPictureFormVisible = false
      this.filesPictureForm={}
      this.getAudioPictureFilesListFun() //刷新档案列表
    }
  })
},
  // 获取档案列表 数据
    getAudioPictureFilesListFun(){
      const q ={
        ajtm:this.queryInfo.ajtm,
        glgcmc:this.queryInfo.glgcmc,
        page_num:this.currentPage,
        page_size:this.pageSize,
        files_type:'AJJZTLX_DIC-3',
      }
      getAudioPictureFilesList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getAudioPictureFilesListFun()
         }
         
          this.filesPictureFilesList = res.list
        }
      })
    },

              // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAudioPictureFilesListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getAudioPictureFilesListFun()
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

</style>
