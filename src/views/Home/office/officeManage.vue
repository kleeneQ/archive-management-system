<template>
  <div>
    <!-- 头部 面包屑导航 B --> 
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>馆内办公流程</el-breadcrumb-item>
        <el-breadcrumb-item>公文管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部 面包屑导航 E -->     
      <el-card style="background-color: #F4F4F4;">
        <!-- 检索栏 B -->
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="标题">
              <el-input clearable v-model="queryInfo.file_title" placeholder="请输入标题"  @change="getOfficeFileListFun"></el-input>
            </el-form-item>
            <el-form-item label="来文时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileListFun"
                placeholder="请选择来文时间">
              </el-date-picker> —
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileListFun"
                placeholder="请选择来文时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getOfficeFileListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
 
          <!-- 列表区 -->
              <div class="eltablebox">
               <el-col>
                    <!-- 案卷 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" @click="saveOfficeFileDialogVisibleFun" >添加公文</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="warning" @click="FileApproveDialogVisibleFun" >审批</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" @click="FileSignDialogVisibleFun" >签收</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="FileReadDialogVisibleFun" class="btnedit" >传阅</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="finishOfficeFileFun" class="btnpink">办结</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="info"  @click="placeOfficeFileFun">归档</el-button>
                  </el-form-item>
            
                </el-form>

              </el-col> 
            <!-- 工程案卷列表 B -->
            <el-table
              :data="OfficeFileList"
              border
              class="gw_table"
              style="width: 100%"
              height="470px"
              @selection-change="changeBox"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px',}"
              :row-style="{'height':'30px'}"
            >
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
              <el-table-column
                label="序号"
                 align="center"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="file_code"
                 align="center"
                label="文件编号"
              show-overflow-tooltip
              width="200">
              </el-table-column>
              <el-table-column
                prop="file_title"
                 align="center"
                label="标题"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  {{scope.row.file_title}}
                </template>
              </el-table-column>
              <el-table-column
                prop="file_receive_time"
                label="来文时间"
                 align="center"
                width="150"> 
                <template slot-scope="scope">
                  {{scope.row.file_receive_time | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="file_source"
                 align="center"
                label="公文来源"
                width="200">
              </el-table-column>
              <el-table-column
                prop="file_publish_man"
                 align="center"
                label="发件人"
                width="150">
              </el-table-column>
              <el-table-column
                prop="file_place"
                 align="right"
                label="状态"
                show-overflow-tooltip
                width="200">
                <template slot-scope="scope">
                  <div class="gw_table_zt">
                      <div><el-tag>{{scope.row.file_place == 0 ?'未归档':'已归档'}}</el-tag></div>
                      <div><el-tag>{{scope.row.file_finish == 0 ?'未办结':'已办结'}}</el-tag></div>

                      <div v-if="scope.row.file_approve_status">
                        <div v-for="(fas_item,fas_index) in scope.row.file_approve_status" :key="fas_index">
                          {{fas_item.approve_man}}：<el-tag>{{fas_item.approve_status == 0 ?'待审批':'已审批'}}</el-tag>
                        </div>
                      </div>
                      <div v-if="scope.row.file_sign_status">
                        <div v-for="(fas_item,fas_index) in scope.row.file_sign_status" :key="fas_index">
                          {{fas_item.sign_man}}：<el-tag>{{fas_item.sign_statusName}}</el-tag>
                        </div>
                      </div>
                      <div v-if="scope.row.file_read_status">
                        <div v-for="(fas_item,fas_index) in scope.row.file_read_status" :key="fas_index">
                          {{fas_item.read_man}}：<el-tag>{{fas_item.read_status == 0 ?'待传阅':'已传阅'}}</el-tag>
                        </div>
                      </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                 align="right"
                min-width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showUpdateDialogFun(scope.row)">编辑</el-button>
                  <el-button type="primary" size="small"  @click="gotoOfficeInfoPage(scope.row)">详情</el-button>
                  <el-button type="success" size="small"  @click="gotoOfficePrintPage(scope.row)">打印</el-button>
                  <el-button type="danger" size="small"  @click="deleteOfficeFileFun(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程案卷列表 E -->
            <!-- 分页 B -->
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
             <!-- 分页 E -->
            </div>

      </el-card>
      <!-- 添加公文 B-->
     <el-dialog
      :title="OfficeFileDialogtitel+'公文'"
      :visible.sync="saveOfficeFileDialogVisible"
      width="70%">
      <el-form class="Medicate Medicate_gw" :inline="true" :model="saveOfficeForm" ref="saveOfficeForm" :rules="saveOfficeFormrules" label-width="100px">
      <el-form-item label="标题: " prop="file_title" class="Medicate-title">
        <el-input clearable v-model="saveOfficeForm.file_title" placeholder="请输入标题"></el-input>
      </el-form-item>
       <el-form-item label="来源: " class="Medicate-title">
        <el-input clearable v-model="saveOfficeForm.file_source" placeholder="请输入来源"></el-input>
      </el-form-item>
       <el-form-item label="摘要: " class="Medicate-title">
        <el-input clearable v-model="saveOfficeForm.file_summary" placeholder="请输入摘要"></el-input>
      </el-form-item>
       <el-form-item label="来文时间: " class="Medicate-title">
         <el-date-picker
          clearable
          v-model="saveOfficeForm.file_receive_time"
          type="date"
          value-format='yyyy-MM-dd'
          placeholder="请输入来文时间">
        </el-date-picker>
      </el-form-item>
       <el-form-item label="内容" class="Medicate-title">
              <!-- 富文本编辑器组件 -->
              <quill-editor
                class="editor_gw"
                :options="editorOption"
                v-model="saveOfficeForm.file_info"
                @ready="onEditorReady($event)"
              >
              </quill-editor>
       </el-form-item>
      <el-form-item label="附件信息: " class="Medicate-title">
        <el-upload
            v-if="OfficeFileDialogtitel == '新增'"
            class="upload-demo"
            ref="upload"
            action="#"
            :multiple='true'
            :show-file-list="true"
            :http-request="myUpload2"
          >
          <el-button type="success" slot="trigger" icon="el-icon-folder" size="small">上传附件</el-button>
          </el-upload>
          <el-upload
            v-if="OfficeFileDialogtitel == '编辑'"
            class="upload-demo"
            ref="upload"
            action="#"
            :multiple='true'
            :show-file-list="true"
            :http-request="myUpload2"
          >
          <el-button type="success" slot="trigger" icon="el-icon-folder" size="small">上传附件</el-button>
          </el-upload>
      </el-form-item>
      <div class="btnstyle">
        <el-button @click="saveOfficeFileDialogVisible = false">取消</el-button>
        <el-button type="primary" v-if="OfficeFileDialogtitel == '新增'" @click="saveOfficeFileFun('saveOfficeForm')">保存</el-button>
        <el-button type="primary" v-if="OfficeFileDialogtitel == '编辑'" @click="updateOfficeFileFun('saveOfficeForm')">保存</el-button>
      </div>
    </el-form>
      </el-dialog>
      <!-- 添加公文 E-->
      <!-- 发起审批 B-->
        <el-dialog
          :title="'审批'"
          :visible.sync="FileApproveDialogVisible"
          width="40%">
          <el-form class="audit_gw_box Medicate_gw" :inline="true" :model="OfficeFileApproveForm" ref="OfficeFileApproveForm" :rules="OfficeFileApproveFormrules" label-width="100px">
            <el-form-item label="审核人员: " prop="approve_man" class="Medicate-title">
              <el-select v-model="OfficeFileApproveForm.approve_man" multiple placeholder="请选择审核人员">
                <el-option
                  v-for="item in Userlist"
                  :key="item.user_id"
                  :label="item.user_name"
                  :value="item.user_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄送人员: "  class="Medicate-title">
              <el-select v-model="OfficeFileApproveForm.copy_for_man" multiple placeholder="请选择抄送人员">
                <el-option
                  v-for="item in Userlist"
                  :key="item.user_id"
                  :label="item.user_name"
                  :value="item.user_id">
                </el-option>
              </el-select>
            </el-form-item>
               <div class="btnstyle">
                <el-button @click="FileApproveDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="createOfficeFileApproveFun('OfficeFileApproveForm')">保存</el-button>
              </div>
          </el-form>
        </el-dialog>
      <!-- 发起审批 E-->
      <!-- 发起签收 B -->
         <el-dialog
            :title="'签收'"
            :visible.sync="FileSignDialogVisible"
            width="40%">
            <el-form class="audit_gw_box Medicate_gw" :inline="true" :model="OfficeFileSignForm" ref="OfficeFileSignForm" :rules="OfficeFileSignFormrules" label-width="100px">
              <el-form-item label="签收人员: " prop="approve_man" class="Medicate-title">
                <el-select v-model="OfficeFileSignForm.approve_man" multiple placeholder="请选择签收人员">
                  <el-option
                    v-for="item in Userlist"
                    :key="item.user_id"
                    :label="item.user_name"
                    :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
                <div class="btnstyle">
                  <el-button @click="FileSignDialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="createOfficeFileSignFun('OfficeFileSignForm')">保存</el-button>
                </div>
            </el-form>
          </el-dialog>
      <!-- 发起签收 E -->
      <!-- 发起传阅 B -->
         <el-dialog
            :title="'传阅'"
            :visible.sync="FileReadDialogVisible"
            width="40%">
            <el-form class="audit_gw_box Medicate_gw" :inline="true" :model="OfficeFileReadForm" ref="OfficeFileReadForm" :rules="OfficeFileReadFormrules" label-width="100px">
              <el-form-item label="传阅人员: " prop="approve_man" class="Medicate-title">
                <el-select v-model="OfficeFileReadForm.approve_man" multiple placeholder="请选择传阅人员">
                  <el-option
                    v-for="item in Userlist"
                    :key="item.user_id"
                    :label="item.user_name"
                    :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
                <div class="btnstyle">
                  <el-button @click="FileReadDialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="createOfficeFileReadFun('OfficeFileReadForm')">保存</el-button>
                </div>
            </el-form>
          </el-dialog>
      <!-- 发起传阅 E -->
  </div>
</template>

<script>
import {
  getOfficeFileList,
  updateOfficeFile,
  saveOfficeFile,
  uploadFileOffice,
  getOfficeFileInfo,
  createOfficeFileApprove,
  createOfficeFileSign,
  createOfficeFileRead,
  finishOfficeFile,
  placeOfficeFile,
  deleteOfficeFile,
} from '@/api/office'
import {
  getUserList,
} from '@/api/digitization/audit'
import EditorBar from "@/components/StoreHouse/EditorBar";
export default {
  components: { EditorBar },
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:1,
        page_size:10,
        file_title:'',
        start_time:'',
        end_time:'',
      },
      OfficeFileList:[],
      ids:[],
      file_id:'',//选中公文ID
      saveOfficeFileDialogVisible:false, //新增公文弹层
      OfficeFileDialogtitel:'新增',
      saveOfficeForm:{
        file_url:'',
      },
      saveOfficeFormrules:{
        file_title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
      },
      Userlist:[],//用户列表
      fileflag:false,//是否需要保存 公文信息
      FileApproveDialogVisible:false,//审批弹层
      OfficeFileApproveFormrules:{
        approve_man: [
          { type: 'array', required: true, message: '请至少选择一个审核人员', trigger: 'change' }
        ],
      },
      OfficeFileApproveForm:{
        file_id:'',
        approve_man:[],
        copy_for_man:[],
      },
      FileSignDialogVisible:false,//签收弹层
      OfficeFileSignFormrules:{
        approve_man: [
          { type: 'array', required: true, message: '请至少选择一个审核人员', trigger: 'change' }
        ],
      },
      OfficeFileSignForm:{
        file_id:'',
        approve_man:[],
      },

      FileReadDialogVisible:false,//传阅弹层
      OfficeFileReadFormrules:{
        approve_man: [
          { type: 'array', required: true, message: '请至少选择一个审核人员', trigger: 'change' }
        ],
      },

      OfficeFileReadForm:{
        file_id:'',
        approve_man:[],
      },

      info: '',
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: []}], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            // ["link", "image", "video"] // 链接、图片、视频
          ], //工具菜单栏配置
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        },
        placeholder: '请在这里添加内容', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
      },
    }
  },
  created () {
    
  },
  mounted () {
    this.getUserListFun() //获取用户列表
    this.getOfficeFileListFun() //获取公文管理列表
  },
  methods: {
  // type your function
  //公文详情
  gotoOfficeInfoPage(row){
    this.$router.push({ 
         path: '/office/officeInfo', 
         query: {
              fileid: row.file_id
            }, 
        })
  },
  //打印
  gotoOfficePrintPage(row){
    this.$router.push({ 
         path: '/office/officePrint', 
         query: {
              fileid: row.file_id
            }, 
        })
  },
  // 、、删除
  deleteOfficeFileFun(row){
      this.confirm('确定删除该条公文么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         const q ={
            file_id:row.file_id,
          }
          deleteOfficeFile(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
            this.getOfficeFileListFun() //刷新公文管理列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消操作'
        })       
      })
  },
  //发起归档
  placeOfficeFileFun(){
    if(this.file_id == '') return this.message({ message: '请选择需要操作的公文', type: 'error' })
      this.confirm('确定进行该操作么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         const q ={
            file_id:this.file_id,
          }
          placeOfficeFile(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
            this.getOfficeFileListFun() //刷新公文管理列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消操作'
        })       
      })
  },
  //发起办结
  finishOfficeFileFun(){
    if(this.file_id == '') return this.message({ message: '请选择需要操作的公文', type: 'error' })
      this.confirm('确定进行该操作么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         const q ={
            file_id:this.file_id,
          }
          finishOfficeFile(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
            this.getOfficeFileListFun() //刷新公文管理列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消操作'
        })       
      })
  },
  // 打开传阅弹层
  FileReadDialogVisibleFun(){
     if (this.file_id == '') {
      this.message({ message: '请选择需要操作的公文', type: 'error' })
    } else {
      this.FileReadDialogVisible = true
    }
  },
  //保存传阅
  createOfficeFileReadFun(formName){
    this.$refs[formName].validate((valid) => {
        if (valid) {
          let approve_man = this.OfficeFileReadForm.approve_man.join('#')
          const q = {
            file_id:this.file_id,
            approve_man:approve_man,
          }
          createOfficeFileRead(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.FileReadDialogVisible = false
            this.$refs.tableRef.clearSelection()
            this.file_id = ''
            this.getOfficeFileListFun() //刷新公文管理列表
            
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });  
  },
  // 打开签收弹层
  FileSignDialogVisibleFun(){
     if (this.file_id == '') {
      this.message({ message: '请选择需要操作的公文', type: 'error' })
    } else {
      this.FileSignDialogVisible = true
    }
  },
  //保存签收
  createOfficeFileSignFun(formName){
    this.$refs[formName].validate((valid) => {
        if (valid) {
          let approve_man = this.OfficeFileSignForm.approve_man.join('#')
          const q = {
            file_id:this.file_id,
            approve_man:approve_man,
          }
          createOfficeFileSign(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.FileSignDialogVisible = false
            this.$refs.tableRef.clearSelection()
            this.file_id = ''
            this.getOfficeFileListFun() //刷新公文管理列表
            
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });  
  },
  //保存审核 
  createOfficeFileApproveFun(formName){
    this.$refs[formName].validate((valid) => {
        if (valid) {
          let approve_man = this.OfficeFileApproveForm.approve_man.join('#')
          let copy_for_man = this.OfficeFileApproveForm.copy_for_man.join('#')
          const q = {
            file_id:this.file_id,
            approve_man:approve_man,
            copy_for_man:copy_for_man,
          }
          createOfficeFileApprove(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.FileApproveDialogVisible = false
            this.$refs.tableRef.clearSelection()
            this.file_id = ''
            this.getOfficeFileListFun() //刷新公文管理列表

            
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  },
  //打开审批弹层
  FileApproveDialogVisibleFun(){
    if (this.file_id == '') {
      this.message({ message: '请选择需要操作的公文', type: 'error' })
    } else {
      this.FileApproveDialogVisible = true
    }
    
  },
       //getUserList 获取审核人员列表
   getUserListFun(){
     getUserList().then(response =>{
       this.Userlist = response.data.data
       console.log(this.Userlist)
     })
   },
  //保存更新公文编辑
  updateOfficeFileFun(){
    updateOfficeFile(this.saveOfficeForm).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.message({ message: message, type: 'success' })
       this.saveOfficeFileDialogVisible = false 
       
      }
    })
  },
  //获取公文详情
  getOfficeFileInfoFun(row){
    const q ={
      file_id:row.file_id
    }
    getOfficeFileInfo(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.saveOfficeForm.file_info = res.file_detail.file_info

      }
    })
  },
  //打开公文编辑弹层
  showUpdateDialogFun(row){
    console.log(row)
    this.getOfficeFileInfoFun(row)
    this.saveOfficeFileDialogVisible = true
    this.OfficeFileDialogtitel  = '编辑'
    this.saveOfficeForm = row
    this.saveOfficeForm.file_url = ''
  },
  //新增添加公文
  saveOfficeFileFun(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveOfficeFile(this.saveOfficeForm).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getOfficeFileListFun() //刷新公文管理列表
            this.saveOfficeFileDialogVisible = false
            
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    
  },
    //  上传附件
    myUpload2(e){
       const formData = new FormData()
      formData.append('file', e.file)
      formData.append('file_id', this.saveOfficeForm.file_id)
      let file_name = e.file.name
      console.log(file_name)
      console.log(e)
      console.log(this.saveOfficeForm.file_id)
      uploadFileOffice(formData).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: '上传成功', type: 'success' })
            if (this.saveOfficeForm.file_url == '') {
              this.saveOfficeForm.file_url = file_name+'-'+res.file_url   //上传后 获取最新的 文件路径
            } else {
              this.saveOfficeForm.file_url = file_name+'-'+res.file_url+'#'+this.saveOfficeForm.file_url   //上传后 获取最新的 文件路径
            }
          }
      })
    },
    //富文本 
    onEditorReady(quill) {
      document.querySelector("div.ql-editor").innerHTML = this.info
    },
    //发开新增公文弹层
  saveOfficeFileDialogVisibleFun(){
    this.saveOfficeFileDialogVisible = true
    this.OfficeFileDialogtitel = '新增'
    this.utilizeIdFun() //生成公文附件文件ID
  },
    //列表选中的列 
    changeBox(selection) {
        console.log(selection)
       // 单选
        if (selection.length > 1) {
            this.$refs.tableRef.clearSelection()
            this.$refs.tableRef.toggleRowSelection(selection.pop())
        }
      if(selection.length != 0){
        console.log(selection)
        this.file_id = selection[0].file_id
      }else {
        this.file_id = ''
      }
    },

  //获取公文管理列表
    getOfficeFileListFun(){
        this.queryInfo.page_num=this.currentPage,
        this.queryInfo.page_size=this.pageSize,
      getOfficeFileList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfficeFileListFun()
         }
         console.log(res.list)
         res.list.map(t => {
           t.file_sign_status.map(v => {
             if (v.sign_status == '2') {
               v.sign_statusName = '已阅未签收'
             }else if (v.sign_status == '1') {
               v.sign_statusName = '已签收'
             }else {
               v.sign_statusName = '未签收'
             }
           });

         });

         this.OfficeFileList =res.list

         
        }
      })
    },
    
     //生成公文附件文件ID
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
        this.saveOfficeForm.file_id = OrderID
        console.log("随机ID:" + OrderID );
        return OrderID
    },

    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getOfficeFileListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getOfficeFileListFun()
    },
  },
}
</script>
<style lang="less" >
  .gw_table_zt{
  height: 100px;
  overflow-y: auto;
}
.Medicate_gw{
  .upload-demo {
    padding-bottom: 10px;
  }
    .btnstyle {
      width: 100%;
      text-align: center;
      margin-top: 5px;
    }
}
 .editor_gw {
    line-height: normal !important;
    height: 400px !important;
    .ql-container{
      height: 300px !important;
    }
  }
</style>
<style scoped lang='less'>

 .audit_gw_box {
   .el-form-item__content {
     .el-select {
       width: 100%;

     }
   }
 }
.rowStyle{
    background-color:#ecf5ff!important;
  }
</style>
