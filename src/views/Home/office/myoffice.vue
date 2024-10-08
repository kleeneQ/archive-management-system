<template>
  <div>
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>馆内办公流程</el-breadcrumb-item>
      <el-breadcrumb-item>我的公文</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
   <el-tabs type="border-card" @tab-click="handleClick">
    <el-tab-pane label="审批">
      <el-card style="background-color: #F4F4F4;">
        <!-- 检索栏 B -->
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="标题">
              <el-input clearable v-model="queryInfo.file_title" placeholder="请输入标题"  @change="getOfficeFileMyApproveListFun"></el-input>
            </el-form-item>
            <el-form-item label="来文时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileMyApproveListFun"
                placeholder="请选择来文时间">
              </el-date-picker> —
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileMyApproveListFun"
                placeholder="请选择来文时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getOfficeFileMyApproveListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
 
          <!-- 列表区 -->
              <div class="eltablebox">
            <el-table
              :data="MyApproveList"
              border
              class="gw_table"
              style="width: 100%"
              height="470px"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px',}"
              :row-style="{'height':'30px'}"
            >
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
                width="350">
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
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                min-width="250">
                <template slot-scope="scope">
                  <el-button type="primary" size="small"  @click="gotoOfficeInfoPage(scope.row,'审批')">详情</el-button>
                  <el-button type="warning" size="small"  @click="checkOfficeDialogVisibleFun(scope.row)">审批</el-button>
                  <el-button type="danger" size="small" class="btnpink"  @click="finishOfficeFileFun(scope.row)">办结</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 审批列表 E -->
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
    </el-tab-pane>
    <el-tab-pane label="签收">
      <el-card style="background-color: #F4F4F4;">
        <!-- 检索栏 B -->
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="标题">
              <el-input clearable v-model="queryInfo.file_title" placeholder="请输入标题"  @change="getOfficeFileMySignListFun"></el-input>
            </el-form-item>
            <el-form-item label="来文时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileMySignListFun"
                placeholder="请选择来文时间">
              </el-date-picker> —
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileMySignListFun"
                placeholder="请选择来文时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getOfficeFileMySignListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
 
          <!-- 列表区 -->
              <div class="eltablebox">
            <el-table
              :data="OfficeFileMySignList"
              border
              class="gw_table"
              style="width: 100%"
              height="470px"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px',}"
              :row-style="{'height':'30px'}"
            >
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
                width="350">
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
                      <div v-if="scope.row.file_sign_status">
                        <div v-for="(fas_item,fas_index) in scope.row.file_sign_status" :key="fas_index">
                          {{fas_item.sign_man}}：<el-tag>{{fas_item.sign_statusName}}</el-tag>
                        </div>
                      </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                 align="right"
                min-width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small"  @click="gotoOfficeInfoPage(scope.row,'签收')">详情</el-button>
                  <el-button type="warning" size="small"  @click="signOfficeFileFun(scope.row)">签收</el-button>
                  <el-button type="success" size="small" @click="gotoOfficePrintPage(scope.row)">打印</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 签收列表 E -->
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
    </el-tab-pane>
    <el-tab-pane label="传阅">
      
      <el-card style="background-color: #F4F4F4;">
        <!-- 检索栏 B -->
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="标题">
              <el-input clearable v-model="queryInfo.file_title" placeholder="请输入标题"  @change="getOfficeFileMyReadListFun"></el-input>
            </el-form-item>
            <el-form-item label="来文时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileMyReadListFun"
                placeholder="请选择来文时间">
              </el-date-picker> —
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileMyReadListFun"
                placeholder="请选择来文时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getOfficeFileMyReadListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
 
          <!-- 列表区 -->
              <div class="eltablebox">
            <el-table
              :data="OfficeFileMyReadList"
              border
              class="gw_table"
              style="width: 100%"
              height="470px"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px',}"
              :row-style="{'height':'30px'}"
            >
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
                width="350">
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
                min-width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small"  @click="gotoOfficeInfoPage(scope.row,'传阅')">详情</el-button>
                  <el-button type="success" size="small" @click="gotoOfficePrintPage(scope.row)">打印</el-button>
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
    </el-tab-pane>
  </el-tabs>

      <!-- 发起审批 B-->
        <el-dialog
          :title="'审批'"
          :visible.sync="checkOfficeDialogVisible"
          width="40%">
          <el-form class="Medicate" :inline="true" :model="checkOfficeForm" ref="checkOfficeForm" :rules="checkOfficeFormrules" label-width="100px">
            <el-form-item label="审批内容: " prop="check_info" class="Medicate-title">
              <el-input type="textarea" v-model="checkOfficeForm.check_info"></el-input>
            </el-form-item>
            <el-form-item label="附件: " class="Medicate-title">
              <el-upload
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
            <el-form-item label="审核人员: " class="Medicate-title">
              <el-select v-model="checkOfficeForm.approve_man" multiple placeholder="请选择审核人员">
                <el-option
                  v-for="item in Userlist"
                  :key="item.user_id"
                  :label="item.user_name"
                  :value="item.user_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄送人员: "  class="Medicate-title">
              <el-select v-model="checkOfficeForm.copy_for_man" multiple placeholder="请选择抄送人员">
                <el-option
                  v-for="item in Userlist"
                  :key="item.user_id"
                  :label="item.user_name"
                  :value="item.user_id">
                </el-option>
              </el-select>
            </el-form-item>
               <div class="btnstyle">
                <el-button @click="checkOfficeDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="checkOfficeFileApproveFun('checkOfficeForm')">保存</el-button>
              </div>
          </el-form>
        </el-dialog>
      <!-- 发起审批 E-->
  </div>
</template>

<script>
import {
  getOfficeFileMyApproveList,
  finishOfficeFile,
  uploadFileOffice,
  checkOfficeFileApprove,
  getOfficeFileMySignList,
  signOfficeFile,
  getOfficeFileMyReadList,
  getOfficeFileMyReadInfo,
} from '@/api/office'
import {
  getUserList,
} from '@/api/digitization/audit'
export default {
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
      MyApproveList:[],//公文审批列表
      Userlist:[],//用户列表
      checkOfficeForm:{
        file_url:'',
      },
      checkOfficeDialogVisible:false,//审批弹层
      checkOfficeFormrules:{
        check_info: [
            { required: true, message: '请输入审批内容', trigger: 'blur' },
          ],
      },
      OfficeFileMySignList:[], //签收列表
      OfficeFileMyReadList:[],//传阅列表
      tabLabel:'审批',
    }
  },
  created () {
    
  },
  mounted () {
    this.getUserListFun() //获取用户列表
    this.getOfficeFileMyApproveListFun() // 公文审批列表
    this.getOfficeFileMySignListFun() // 公文签收列表
    this.getOfficeFileMyReadListFun() // 公文传阅列表
  },
  methods: {
  //公文详情
  gotoOfficeInfoPage(row,name){
    this.$router.push({ 
         path: '/office/officeInfo', 
         query: {
              fileid: row.file_id,
              name:name
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

  // 获取公文传阅列表
  getOfficeFileMyReadListFun(){
      this.queryInfo.page_num=this.currentPage,
      this.queryInfo.page_size=this.pageSize,
    getOfficeFileMyReadList(this.queryInfo).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfficeFileMySignListFun()
         }
         this.OfficeFileMyReadList = res.list
       
      }
    })
  },
  //签收
  signOfficeFileFun(row){
      this.confirm('确定进行该操作么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         const q ={
            file_id:row.file_id,
          }
          signOfficeFile(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
              this.getOfficeFileMySignListFun() // 公文签收列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消操作'
        })       
      })
  },
  // 获取公文签收列表
  getOfficeFileMySignListFun(){
      this.queryInfo.page_num=this.currentPage,
      this.queryInfo.page_size=this.pageSize,
    getOfficeFileMySignList(this.queryInfo).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfficeFileMySignListFun()
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
         this.OfficeFileMySignList = res.list
       
      }
    })
  },
  //保存审批
  checkOfficeFileApproveFun(formName){
    this.$refs[formName].validate((valid) => {
        if (valid) {
          let approve_man = this.checkOfficeForm.approve_man.join('#')
          let copy_for_man = this.checkOfficeForm.copy_for_man.join('#')
          const q = {
            file_id:this.checkOfficeForm.file_id,
            check_info:this.checkOfficeForm.check_info,
            file_url:this.checkOfficeForm.file_url,
            approve_man:approve_man,
            copy_for_man:copy_for_man,
          }
          console.log(q)
           checkOfficeFileApprove(q).then(response =>{
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
              this.checkOfficeDialogVisible = false
              this.getOfficeFileMyApproveListFun() // 公文审批列表
              
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
      formData.append('file_id', this.checkOfficeForm.file_id)
      let file_name = e.file.name
      uploadFileOffice(formData).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: '上传成功', type: 'success' })
            if (this.checkOfficeForm.file_url == '') {
              this.checkOfficeForm.file_url = file_name+'-'+res.file_url   //上传后 获取最新的 文件路径
            } else {
              this.checkOfficeForm.file_url = file_name+'-'+res.file_url+'#'+this.saveOfficeForm.file_url   //上传后 获取最新的 文件路径
            }
          }
      })
    },
  //打开审批 弹层
  checkOfficeDialogVisibleFun(row){
    this.checkOfficeDialogVisible = true
    this.checkOfficeForm.file_id = row.file_id
  },
  //发起办结
  finishOfficeFileFun(row){
      this.confirm('确定进行该操作么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         const q ={
            file_id:row.file_id,
          }
          finishOfficeFile(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
            this.getOfficeFileMyApproveListFun() //刷新公文管理列表
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消操作'
        })       
      })
  },
  // 公文审批列表
  getOfficeFileMyApproveListFun(){
        this.queryInfo.page_num=this.currentPage,
        this.queryInfo.page_size=this.pageSize,
      getOfficeFileMyApproveList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfficeFileMyApproveListFun()
         }
         this.MyApproveList = res.list
         
        }
      })
    },

   //getUserList 获取审核人员列表
   getUserListFun(){
     getUserList().then(response =>{
       this.Userlist = response.data.data
       console.log(this.Userlist)
     })
   },
    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      if (this.tabLabel == '审批') {
      this.getOfficeFileMyApproveListFun()// 公文审批列表
      } else if (this.tabLabel == '签收') {
       this.getOfficeFileMySignListFun() // 公文签收列表
      }else {
        this.getOfficeFileMyReadListFun() // 公文传阅列表
      }
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      if (this.tabLabel == '审批') {
      this.getOfficeFileMyApproveListFun()// 公文审批列表
      } else if (this.tabLabel == '签收') {
       this.getOfficeFileMySignListFun() // 公文签收列表
      }else {
        this.getOfficeFileMyReadListFun() // 公文传阅列表
      }
    },

    handleClick(tab, event) {
        console.log(tab.label)
        this.tabLabel = tab.label

        if (tab.label == '审批') {
        this.getOfficeFileMyApproveListFun()// 公文审批列表
        } else if (tab.label == '签收') {
        this.getOfficeFileMySignListFun() // 公文签收列表
        }else {
          this.getOfficeFileMyReadListFun() // 公文传阅列表
        }
        
      }
  },
}
</script>

<style scoped lang='less'>

</style>
