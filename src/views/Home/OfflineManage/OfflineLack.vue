<template>
  <div >
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业报送接收</el-breadcrumb-item>
      <el-breadcrumb-item>接收审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <div class="bodybox">
       <el-row>
        <el-col :span="6">
          <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">上一步</el-button>
        </el-col>
      </el-row>
      <ul class="Steps">
      　<li class="active"><strong>1</strong> 系统初审 <br> <span>查缺、查误</span></li>
      　<li class="active"><strong>2</strong> 初审报告</li>
        <li><strong>3</strong> 人工复审 <br> <span>真实性、完整性</span></li>
      　<li><strong>4</strong> 生成审核意见报告</li>
      </ul>

      <div class="centerbox">
      <div class="tabletitle">附件信息不匹配、缺失</div>
           <!-- 附件信息不匹配、缺失列表 B -->
          <el-table
              :data="fileList"
              border
              style="width: 100%"
              max-height="300"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="box_id"
                label="案卷题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="250">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="sl"
                label="数量(页/张)"
                show-overflow-tooltip
                width="150">
              </el-table-column>
              <el-table-column
                prop="csjgms"
                label="初审结果描述"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="230">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogFilesdetailsVisibleFun('案卷详情',scope.row)">案卷详情</el-button>
                  <el-button type="primary" size="small" class="btnedit" @click="dialogFilesdetailsVisibleFun('文件详情',scope.row)">文件详情</el-button>
                </template>
              </el-table-column>
          </el-table>
        <!-- 附件信息不匹配、缺失列表 E -->

        <div class="tabletitle" style="margin-top:50px;margin-bottom:10px;">缺失必要文件</div>
        
                    <el-row>
              <el-col :span="24">
                <!-- 声像档案 -->
                  <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="110px">
                    <el-form-item label="是否应提供">
                      <el-select v-model="queryInfo.sfrq" @change="getOfflineLackFileListFun" placeholder="请选择是否应提供" >
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="无相关文件处理">
                      <el-select v-model="queryInfo.wxgwjcl" @change="getOfflineLackFileListFun" placeholder="请选择" >
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="馆内工作人员" value="1"></el-option>
                        <el-option label="送档单位人员" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getOfflineLackFileListFun">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
              <el-row>
            <el-col :span="6">
              <el-button class="btnedit"  type="primary" size="small" @click="batchOfflineLackFileHandleFun">批量设置无相关文件处理</el-button>
            </el-col>
          </el-row>
           <!-- 缺失必要文件 B -->
          <el-table
              :data="lackFileList"
              border
              style="width: 100%"
              max-height="300"
              :highlight-current-row="true"
              ref="tableRef"
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="gdmc"
                label="档案归档文件目录名称"
                show-overflow-tooltip
                min-width="250">
                <template slot-scope="scope">
                <span v-if="scope.row.sfcl == '1'" style="color:red">
                  {{scope.row.gdmc}}
                </span>
                <span v-else>
                  {{scope.row.gdmc}}
                </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sfrq"
                label="是否应提供相关文件"
                show-overflow-tooltip
                width="150">
              </el-table-column>
              <el-table-column
                prop="csjgms"
                label="送档单位处理描述"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="rqclms"
                label="馆内工作人员处理描述"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="lackformDialogVisibleFun('处理',scope.row)">无相关文件处理</el-button>
                </template>
              </el-table-column>
          </el-table>
        <!-- 缺失必要文件 E -->
      <div class="netbtnstyle">
        <el-button  @click="gotoPage">保存，进入人工复审</el-button>
      </div>
</div>
    </div>
    <!-- 审核弹层 B-->
     <el-dialog
      :title="'应归档文件处理'"
      :visible.sync="lackformDialogVisible"
      width="40%"
    >
      <el-form ref="form" :model="lackform" label-width="130px">
        <el-form-item label="应提供相关文件：" prop="pass">
          <el-radio-group v-model="lackform.sfrq">
            <el-radio label="是" >是</el-radio>
            <el-radio label="否" >否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理描述：" class="margin-top-10">
          <el-input type="textarea" :rows="3" v-model="lackform.rqclms" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="lackformDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="getOfflineLackFileHandleFun()">提交处理</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
<!-- 审核弹层 E-->



        <!-- 案卷详情 文件详情 B -->
          <el-dialog :title="'详情'" :visible.sync="dialogprojectdetailsVisibleFiles" width="70%">
            <specialtyDetailsFiles v-if="dialogprojectdetailsVisibleFiles" :project_id='isActiveId' :zt='zt' :source="isActive" :filesrow='filesrow'></specialtyDetailsFiles>
          </el-dialog>
        <!-- 案卷详情 文件详情 E -->
  </div>
</template>

<script>
import {
  getEngineeringType,
} from "@/api/digitization/projectAPI"
import {
  getOfflineLackEnclosure,
  getOfflineFileCount,
  getOfflineLackFileList,
  getOfflineLackFileHandle,
  getOfflineListSide,
  getOfflineCheckOpinion
} from '@/api/OfflineManage'
import specialtyDetailsFiles from '@/components/audit/offlinedetailsFiles'
export default {
  components: {
    specialtyDetailsFiles,
  },
  data () {
    return {
      project_id:'',
      engineering_id:'',
      fileList:[],
      carrierTypefile:[],//文件级载体类型
      dialogprojectdetailsVisibleFiles:false, //案卷详情 文件详情 弹层
      isActiveId:'',//案卷 文件 ID
      isActive:'',
      filesrow:{},
      zt:'',
      lackFileList:[],
      lackform:{
        sfrq:"",
        rqclms:"",
      },//容缺表单处理
      lackformDialogVisible:false,//容缺处理表单
      record_id:'',//
      SelectionFile:[],
      queryInfo:{
        sfrq:'0',
        wxgwjcl:'0',
      },
    }
  },
  created () {
    this.project_id = this.$route.query.project_id
    this.engineering_id = this.$route.query.engineering_id
    this.getCarrierTypefile() //获取文件级载体类型
  },
  mounted () {
    this.getCarrierTypefile() //获取文件级载体类型
    this.getOfflineLackEnclosureFun() //企业报送接收附件信息不匹配和缺失文件列表
    this.getOfflineLackFileListFun() //企业报送接收缺失必要文件
  },
  methods: {
  // type your function
  //下一步
  gotoPage(){
    this.$router.push({  
          path: '/OfflineManage/OfflineManual',  
          query: {
            project_id: this.project_id,
            engineering_id: this.engineering_id,
          },
         
      }) 
  },

  // 批量容缺处理
  batchOfflineLackFileHandleFun(){
    if (this.SelectionFile.length == 0) {
      this.message({ message: '请选择需要批量处理的文件', type: 'error' })
    } else {
      this.lackformDialogVisible = true
    }
  },
  //容缺处理
  getOfflineLackFileHandleFun(){
    const q ={
      record_id:this.record_id,
      sfrq:this.lackform.sfrq,
      rqclms:this.lackform.rqclms,
    }
    getOfflineLackFileHandle(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      this.message({ message: message, type: 'success' })
      this.lackformDialogVisible = false
      this.getOfflineLackFileListFun() //企业报送接收缺失必要文件
      this.record_id = ''
       
      }
    })
  },
lackformDialogVisibleFun(name,row){
  this.record_id = row.record_id
  this.lackformDialogVisible = true
},
  handleSelectionChange(val){
    console.log(val)
    this.SelectionFile = val
    val.forEach((item,index) => {
      if (index == 0) {
       this.record_id = item.record_id
      } else {
        this.record_id = this.record_id+'#'+item.record_id
      }
      
    })
  },
  //企业报送接收缺失必要文件
  getOfflineLackFileListFun(){
    const q ={
      project_id:this.project_id,
      sfrq:'',
      wxgwjcl:'',
    }
    if (this.queryInfo.sfrq == '1') {
      q.sfrq = '是'
    } else if (this.queryInfo.sfrq == '2') {
      q.sfrq = '否'
    }else {
      q.sfrq = ''
    }
    if (this.queryInfo.wxgwjcl == '1') {
      q.wxgwjcl = '1'
    } else if (this.queryInfo.wxgwjcl == '2') {
      q.wxgwjcl = '2'
    }else {
      q.wxgwjcl = ''
    }

    getOfflineLackFileList(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.lackFileList = res
      }
    })
  },
        //案卷详情 弹层
    dialogFilesdetailsVisibleFun(name,row){
      console.log(row)
      this.filesrow = row
      if (name == '案卷详情') {
        this.isActive = 'project'
        this.isActiveId = row.files_id
      } else {
        this.isActive = 'files'
        this.isActiveId = row.file_id
      }
      this.zt = row.zt
      this.dialogprojectdetailsVisibleFiles = true
    },
  //企业报送接收附件信息不匹配和缺失文件列表
  getOfflineLackEnclosureFun(){
    const q ={
      project_id:this.project_id,
      engineering_id:this.engineering_id,
    }
    getOfflineLackEnclosure(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       res.map(v => {
         this.carrierTypefile.forEach(t => {
            if (v.ztlx === t.bm) {
              v.ztlxName = t.mc
            }
            return
          })
       })
       
       this.fileList = res
      }
    })
  },

     // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
      // 文件级载体类型
  getCarrierTypefile() {
    const q = {
      bm: "WJJZTLX_DIC"
    }
    getEngineeringType(q).then(response => {
      if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message, type: 'error' })
        this.carrierTypefile  = res
    this.getOfflineLackEnclosureFun() //企业报送接收附件信息不匹配和缺失文件列表
      }
    }).catch(error => {
      console.log(error)
    })
  },
  },
}
</script>

<style scoped lang='less'>

.tabletitle {
  line-height: 30px;
  border-left: 3px red solid;
  padding-left: 10px;
}

</style>
<style lang="less">
.centerbox {
  padding:0 50px;
  box-sizing: border-box;
}
.netbtnstyle {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>