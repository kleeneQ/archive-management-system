<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案管理</el-breadcrumb-item>
        <el-breadcrumb-item>档案著录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="工程编号">
              <el-input clearable v-model="queryInfo.xmbh" placeholder="请输入工程编号" @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="工程名称">
              <el-input clearable v-model="queryInfo.gcmc" placeholder="请输入工程名称" @change="queryEngineering"></el-input>
            </el-form-item>
            <!-- <el-form-item label="施工许可证号">
              <el-input clearable v-model="queryInfo.sgnum" placeholder="请输入施工许可证号"></el-input>
            </el-form-item>
            <el-form-item label="规划许可证号">
              <el-input clearable v-model="queryInfo.ghnum" placeholder="请输入规划许可证号"></el-input>
            </el-form-item>
            <el-form-item label="工程地点">
              <el-input clearable v-model="queryInfo.address" placeholder="请输入工程地点"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryEngineering">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
         <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline el-form-item1" >
            <el-form-item v-if="hasPerms('/v1/digit/engineering/save')">
              <el-button type="primary" icon="el-icon-plus" @click="projectDescription('add', {})">新增项目著录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-download" @click="downloadTelplate">下载导入模板</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入项目工程')">批量导入项目工程</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量管理类工程')">批量管理类案卷</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入单位工程')">批量导入单位工程</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入案卷')">批量导入案卷</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入文件')">批量导入文件</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" icon="el-icon-data-line" @click="EngineeringFinishStatusVisibleFun('档案加工著入状态')">档案加工著入状态</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" icon="el-icon-delete-solid" @click="resetFileDigitDataFun('数字化加工脏数据清理')">数字化加工脏数据清理</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-table
        :data="itemList"
        stripe
        border
        style="width: 100%"
        :cell-style="{'text-align':'center','padding':'0px'}"
        :row-style="{'height':'40px'}"
         @selection-change="handleSelectionChange"
         :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
      >
        <el-table-column type="selection" width="50" fixed></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  type="index" label="序号" width="50" fixed></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="xmbh" label="项目编号" width="200"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="gcmc" label="工程名称" width="200"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="gclxName" label="工程类型" width="200"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="lxpzwh" label="立项批准文号" width="200"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="jsdw" label="建设单位" width="300"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="sgxkzh" label="施工许可证号" width="300"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="ghxkzh" label="规划许可证号" width="300"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="gcdd" label="工程地点" width="200"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="zydmj" label="用地总面积" width="150"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="zjzmj" label="建筑总面积" width="150"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="gcjs" label="结算总额" width="150"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip  prop="lrsj" label="著入时间" width="150">
          <template slot-scope="scope">
            {{scope.row.lrsj | formatDate}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作"  width="450" fixed="right">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <div class="btn edit" v-if="hasPerms('/v1/digit/engineering/update')">
              <el-button class="btnedit" type="primary" icon="el-icon-edit" size="mini" @click="projectDescription('edit', scope.row)">编辑</el-button>
            </div>
            <template v-if="scope.row.gcdh === null">
              <!-- 工程类著录单 -->
              <div class="btn delete">
                <el-button class="btnld" type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="handleToDescriptionPage('工程类著录单', scope.row)">工程类著录单</el-button>
              </div>
              <!-- 管理类著录单 -->
              <div class="btn delete">
                <!-- <el-button type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="handleToDescriptionPage('管理类著录单', scope.row)">管理类著录单</el-button> -->
                <el-button class="btnld" type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="showProjectInfoDialog(scope.row)">管理类著录单</el-button>
              </div>
            </template>
            <template v-else>
              <!-- 工程类著录单 -->
              <!-- <template
                v-if="scope.row.gclx === 'E' || 
                scope.row.gclx === 'F' || 
                scope.row.gclx === 'G' || 
                scope.row.gclx === 'H' || 
                scope.row.gclx === 'I' || 
                scope.row.gclx === 'J' || 
                scope.row.gclx === 'M' || 
                scope.row.gclx === 'N' || 
                scope.row.gclx === 'O' || 
                scope.row.gclx === 'Q'">
                <div class="btn delete">
                  <el-button type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="handleToDescriptionPage('工程类著录单', scope.row)">工程类著录单</el-button>
                </div>
              </template> -->
              <template
                v-if="scope.row.gcdh.indexOf('-') == -1"
              >
                <div class="btn delete">
                  <el-button class="btnld" type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="handleToDescriptionPage('工程类著录单', scope.row)">工程类著录单</el-button>
                </div>
              </template>
              <!-- 管理类著录单 -->
              <!-- <template
                v-if="scope.row.gclx === 'A' ||   
                scope.row.gclx === 'B' || 
                scope.row.gclx === 'C' || 
                scope.row.gclx === 'D' || 
                scope.row.gclx === 'L' || 
                scope.row.gclx === 'P' || 
                scope.row.gclx === 'K'">
                <div class="btn delete">
                 // <el-button type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="handleToDescriptionPage('管理类著录单', scope.row)">管理类著录单</el-button>
                  <el-button type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="showProjectInfoDialog(scope.row)">管理类著录单</el-button>
                </div>
              </template> -->
               <template
                v-if="scope.row.gcdh.indexOf('-') != -1"
              >
                <div class="btn delete">
                 <el-button class="btnld" type="warning" icon="el-icon-circle-plus-outline" size="mini" @click="showProjectInfoDialog(scope.row)">管理类著录单</el-button>
                </div>
              </template>
            </template>
            <!-- 删除 -->
            <div class="btn delete" v-if="hasPerms('/v1/digit/engineering/delete')">
              <el-button class="btndelete" type="danger" icon="el-icon-delete" size="mini" @click="removeDescription(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page_num"
        :page-sizes="[10, 20, 30]"
        :page-size="queryInfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 新增/修改项目著录表单 -->
    <el-dialog
      :title="title + '项目著录'"
      :visible.sync="projectDialogVisible"
      width="65%"
      @close="dialogClosed"
    >
      <el-form class="projectForm" :inline="true" :model="projectForm" ref="projectFormRef" :rules="projectRules" label-width="130px">
        <el-form-item label="工程名称: " prop="gcmc" class="engineName">
          <el-input clearable v-model="projectForm.gcmc" placeholder="请输入项目工程名称"></el-input>
        </el-form-item>
        <el-form-item label="工程类型: " prop="gclx">
          <el-select v-if="title==='新增'" v-model="projectForm.gclx" placeholder="请选择工程类型" clearable>
            <el-option
              v-for="item in engineeringType"
              :key="item.type_code"
              :label="item.type_name"
              :value="item.type_code">
            </el-option>
          </el-select>
          <el-select v-else disabled v-model="projectForm.gclx" placeholder="请选择工程类型" clearable>
            <el-option
              v-for="item in engineeringType"
              :key="item.type_code"
              :label="item.type_name"
              :value="item.type_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号: " prop="xmbh">
          <el-input clearable v-model="projectForm.xmbh" placeholder="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="工程总造价: " >
          <el-input clearable v-model="projectForm.gczj" placeholder="请输入工程造价" ><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
        </el-form-item>
        <el-form-item label="施工许可证号: ">
          <el-input v-model="projectForm.sgxkzh" placeholder="请输入施工许可证号" clearable></el-input>
        </el-form-item>
        <el-form-item label="总建筑面积: ">
          <el-input v-model="projectForm.zjzmj" type="number" placeholder="请输入总建筑面积" clearable><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
        </el-form-item>
        <el-form-item label="总用地面积: ">
          <el-input v-model="projectForm.zydmj" type="number" placeholder="请输入总用地面积" clearable><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
        </el-form-item>
        <el-form-item label="建设单位: ">
          <el-input v-model="projectForm.jsdw" placeholder="请输入建设单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="代建单位: ">
          <el-input v-model="projectForm.djdw" placeholder="请输入代建单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="工程地点: ">
          <el-input v-model="projectForm.gcdd" placeholder="请输入工程地点" clearable></el-input>
        </el-form-item>
        <el-form-item label="勘察单位: ">
          <el-input v-model="projectForm.kcdw" placeholder="请输入勘察单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="施工单位: ">
          <el-input v-model="projectForm.sgdw" placeholder="请输入施工单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="设计单位: ">
          <el-input v-model="projectForm.sjdw" placeholder="请输入设计单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="监理单位: ">
          <el-input v-model="projectForm.jldw" placeholder="请输入监理单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="用地规划许可证号: ">
          <el-input v-model="projectForm.ydghxkzh" placeholder="请输入用地规划许可证号" clearable></el-input>
        </el-form-item>
        <el-form-item label="立项批准文号: ">
          <el-input v-model="projectForm.lxpzwh" placeholder="请输入立项批准文号" clearable></el-input>
        </el-form-item>
        <el-form-item label="工程规划许可证号: ">
          <el-input v-model="projectForm.ghxkzh" placeholder="请输入工程规划许可证号" clearable></el-input>
        </el-form-item>
        <el-form-item label="工程结算: ">
          <el-input v-model="projectForm.gcjs" type="number" placeholder="请输入工程结算" clearable><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
        </el-form-item>
        <el-form-item label="用地许可证号: ">
          <el-input v-model="projectForm.ydxkzh" placeholder="请输入用地许可证号" clearable></el-input>
        </el-form-item>
        <el-form-item label="栋数: ">
          <el-input v-model="projectForm.ds" type="number" placeholder="请输入栋数" clearable></el-input>
        </el-form-item>
        <el-form-item label="总长度: ">
          <el-input v-model="projectForm.zcd" type="number" placeholder="请输入总长度" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitObj">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择导入文件的弹层 -->
    <el-dialog
      :title="importTitle"
      :visible.sync="importDialogVisible"
      width="60%"
      @close="importDialogClosed"
    >
    
      <el-form
        :rules="rules"
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
    <!-- 管理类著录弹层 -->
    <el-dialog
      title="项目信息"
      :visible.sync="projectInfoVisible"
      width="60%"
      @close="closeProjectInfoDialog"
    >
      <el-form class="projectInfoForm" :model="projectInfoForm" ref="projectInfoFormRef" :rules="projectInfoRules" label-width="130px">
        <el-form-item label="项目中标年份: " prop="xmzbnf" class="engineName">
          <el-date-picker
            v-model="projectInfoForm.xmzbnf"
            value-format="yyyy"
            type="year"
            placeholder="选择年份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目属类: " prop="xmsl" class="engineName" >
          <el-cascader
          style="width: 100%;"
            :options="projectCategory"
            expand-trigger="hover"
            :props="cascaderProps"
            v-model="projectInfoForm.xmsl"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProjectInfo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 档案加工著入状态 弹层 -->
        <el-dialog
      title="项目信息"
      :visible.sync="EngineeringFinishStatusVisible"
      width="30%"
      @close="closeEngineeringFinishStatusDialog"
    >
       <div> <i class="bitianxiangicon"></i> 是否加工著入完毕：  
       <el-radio v-model="EngineeringFinishStatusradio" label="1">是</el-radio>
      <el-radio v-model="EngineeringFinishStatusradio" label="0">否</el-radio>
      </div>
    
      <div slot="footer" class="dialog-footer">
        <el-button @click="EngineeringFinishStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="EngineeringFinishStatusFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEngineeringList,
  addEngineeringSave,
  editEngineering,
  removeEngineering,
  getEngineeringType,
  setManageFilesDh
} from '@/api/digitization/projectAPI'
import {
  getArchivesCateList,
  addArchivesCate,
  editArchivesCate,
  removeArchivesCate,
  importArchivesCate,
  exportArchivesCate,
} from '@/api/archivesCate'
import {
  downloadArchivesProcess,
  importDigitEngineering,
  importManage,
  importDigitProject,
  importDigitFiles,
  importDigitFile,
  EngineeringFinishStatus,
  resetFileDigitData
} from '@/api/archivalDescription'
// import cityData from './cityData.js'
import Download from "@/utils/download"
export default {
  data() {
    return {
      queryInfo: {
        page_num: 1,
        page_size: 10,
        gcmc: '',
        gcdh: ''
      },
      total: 0,
      itemList: [],
      projectDialogVisible: false,
      projectInfoVisible: false,
      projectInfoForm: {
        xmzbnf:"",
        xmsl:'',
      },
      title: '',
      // cityData,
      engineeringType: [],  // 工程类型
      projectForm: {},
      projectRules: {
        gcmc: [
          { required: true, message: '请输入工程名称', trigger: 'blur' }
        ],
        gcdh: [
          { required: true, message: '请输入工程规模', trigger: 'blur' }
        ],
        gclx: [
          { required: true, message: '请选择工程类型', trigger: 'change' }
        ],
        xmbh: [
          { required: true, message: '请输入项目编号', trigger: 'blur' }
        ]
      },
      projectInfoRules: {
        xmzbnf: [
          { required: true, message: '请选择项目中标年份', trigger: 'change' }
        ],
        xmsl: [
          { required: true, message: '请选择项目属类', trigger: 'change' }
        ]
      },
      importTitle: '',  // 导入弹层标题
      importDialogVisible: false,
      fileList: [],
      projectCategory: [],  // 项目属类
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_name',
        children: 'child',
        emitPath: false
      },
      selectedKey: '',
      rules: {
        bm: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      },
      EngineeringFinishStatusradio:'1',// 档案加工著入是否完成 
      EngineeringFinishStatusVisible:false,//档案加工著入 弹层
      EngineeringFinishStatusList:[],//档案加工著入 列表
    }
  },
  watch: {
    total() {
      if (this.total === (this.queryInfo.page_num - 1) * this.queryInfo.page_size && this.total !== 0) {
        this.queryInfo.page_num -= 1
        this.queryInfo.start = (this.queryInfo.page_num - 1) * this.queryInfo.page_size
        this.getEngineeringListFun()
      }
    }
  },
  created() {
    this.getEngineeringTypeFun()
  },
  mounted(){
    this.getEngineeringTypeFun()
  },
  methods: { 
    // 数字化加工脏数据清理
    resetFileDigitDataFun(){
      resetFileDigitData().then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.message({ message: message, type: 'success' })
         
        }
      })
    },
    //档案加工著入状态 选择 
    handleSelectionChange(val){
      console.log(val)
      this.EngineeringFinishStatusList = val
    },
    //档案加工著入 状态 弹层 
    EngineeringFinishStatusVisibleFun(){
      var EngineeringFinishStatusList = this.EngineeringFinishStatusList
      if (EngineeringFinishStatusList.length == 0) return this.message({ message: '请选择需要设置的项目', type: 'error'})
      console.log(EngineeringFinishStatusList)
      this.EngineeringFinishStatusVisible = true
      
    },
    closeEngineeringFinishStatusDialog(){
      this.EngineeringFinishStatusVisible = false
      
    },
    //档案加工著入状态 
    EngineeringFinishStatusFun(){
      var EngineeringFinishStatusList = this.EngineeringFinishStatusList
      var q = {
        engineering_id:'',
        finish_status:this.EngineeringFinishStatusradio
      }
      EngineeringFinishStatusList.forEach((item,index) =>{
        if (index == 0) {
          q.engineering_id = item.engineering_id
        } else {
          q.engineering_id = q.engineering_id +'#'+ item.engineering_id
        }
      })
    
      EngineeringFinishStatus(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.message({ message: message, type: 'success' })
         this.EngineeringFinishStatusVisible = false
        }
      })
    },
    // 递归判断列表，把最后的child设为undefined
    manageProjectCate(data) {
      console.log(data)
      for(var i = 0; i < data.length; i++){
        if(data[i].child === undefined || data[i].child.length < 1){
          // children若为空数组，则将children设为undefined
          data[i].child = undefined
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.manageProjectCate(data[i].child)
        }
      }
      this.projectCategory = data
    },
    // 数字化加工模块获取项目工程列表
    getEngineeringListFun() {
      getEngineeringList(this.queryInfo).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.total = res.total
          this.queryInfo.page_num = res.pageNum
          this.queryInfo.page_size = res.pageSize
          res.list.map(v => {
            this.engineeringType.forEach(item => {
              if (v.gclx === item.type_code) {
                v.gclxName = item.type_name
              }
              return
            })
          })
          this.itemList = res.list
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
      this.getEngineeringListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.queryInfo.page_num = newPage
      this.getEngineeringListFun()
    },

    // 查询项目
    queryEngineering() {
      this.getEngineeringListFun()
    },  

    // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.engineeringType = res
          setTimeout(() => {
            this.getEngineeringListFun()
            }, 500)
          
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增项目著录
    projectDescription(source, row) {
      this.projectDialogVisible = true
      if (source === 'add') {
        this.title = '新增'
        this.projectForm = {}
      } else if (source === 'edit') {
        this.title = '编辑'
        this.projectForm = row
      }
    },

    // 提交表单
    submitObj() {
      if (this.projectForm.xmbh === null || this.projectForm.xmbh === undefined) {
        this.message({ message: "请输入项目编号", type: 'error' })
        return
      }
      if (this.title === '新增') {
        addEngineeringSave(this.projectForm).then(response => {
          if (response.status === 200) {
            const { message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.projectForm = {}
            this.projectDialogVisible = false
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      } else if (this.title === '编辑') {
        // console.log(this.projectForm)
        const q = {
          engineering_id: this.projectForm.engineering_id,
          gcmc: this.projectForm.gcmc,
          gclx: this.projectForm.gclx,
          xmbh: this.projectForm.xmbh,
          gczj: this.projectForm.gczj,
          sgxkzh: this.projectForm.sgxkzh,
          zjzmj: this.projectForm.zjzmj,
          zydmj: this.projectForm.zydmj,
          jsdw: this.projectForm.jsdw,
          gcdd: this.projectForm.gcdd,
          kcdw: this.projectForm.kcdw,
          sjdw: this.projectForm.sjdw,
          jldw: this.projectForm.jldw,
          ydghxkzh: this.projectForm.ydghxkzh,
          ydxkzh: this.projectForm.ydxkzh,
          gcjs: this.projectForm.gcjs,
          lxpzwh: this.projectForm.lxpzwh,
          ghxkzh: this.projectForm.ghxkzh
        }
        // console.log(q)
        editEngineering(q).then(response => {
          if (response.status === 200) {
            const { message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.projectForm = {}
            this.projectDialogVisible = false
            // this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    // 删除项目
    removeDescription(row) {
      this.confirm('删除后该项目下所有信息将一同被删除，确定将该项目删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          engineering_id: row.engineering_id
        }
        removeEngineering(q).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },


    // 级联选择器改变时触发方法
    handleChange() {
    },

    // 关闭弹层
    dialogClosed() {
      this.$refs.projectFormRef.resetFields()
      this.projectDialogVisible = false
      this.getEngineeringListFun()
    },


    // 下载导入模板
    downloadTelplate() {
      downloadArchivesProcess().then(response => {
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

    // 导入
    importExcelFile(source) {
      this.importTitle = source
      this.importDialogVisible = true
    },

    // 导入表格数据相关方法
    myUpload(e) {
      const formData = new FormData()
      formData.append('file', e.file)

      if (this.importTitle === '批量导入项目工程') {
         importDigitEngineering(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      } else if(this.importTitle === '批量管理类工程'){
        importManage(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }else if(this.importTitle === '批量导入单位工程'){
        importDigitProject(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }else if(this.importTitle === '批量导入案卷'){
        importDigitFiles(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }else if(this.importTitle === '批量导入文件'){
        importDigitFile(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getEngineeringListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }
     
    },

    // 立即导入
    submitUpload() {
      this.$refs.upload.submit()
    },

    // 关闭导入模板弹层
    importDialogClosed() {
      this.importDialogVisible = false
      this.$refs.upload.clearFiles()
    },

    handleToDescriptionPage(source, row) {
      if (source === '工程类著录单') {
        this.$router.push({ path: '/archivalDescription/description_page', query: { engineering_id: row.engineering_id, gclx: row.gclx }})
        return
      }
      if (source === '管理类著录单') {
        this.$router.push({ path: '/archivalDescription/manage_page', query: { engineering_id: row.engineering_id }})
        return
      }
    },

    showProjectInfoDialog(row) {
      let xmsl = ''
      this.projectInfoVisible = true
      this.projectCategory = []
      this.projectInfoForm.engineering_id = row.engineering_id
      console.log(row)
      this.projectInfoForm.xmzbnf = row.xmzbnf
      this.projectInfoForm.xmsl = row.xmsl
      this.projectInfoForm.gclx = row.xmsl
      this.engineeringType.forEach(v => {
        if (row.gclx === v.type_code) {
          console.log(v.type_code)
          const q = [].concat(v)
          this.manageProjectCate(q[0].child)
        }
      })
      // if (row.gcdh !== null) {
      //   let gcdh1 = row.gcdh.split('-')[0]
      //   var fir = gcdh1.slice(0,1)
      //   var sec = gcdh1.slice(1,3)
      //   var tre = gcdh1.slice(3,5)
      //   if (sec !== '' && sec !== '00') {
      //     if (sec[0] === '0') {
      //       sec = sec[1]
      //     } else {
      //       sec = gcdh1.slice(1,3)
      //     }
      //   } else {
      //     sec = ''
      //   }
      //   if (tre !== '' && tre !== '00') {
      //     if (tre[0] === '0') {
      //       tre = '.' + tre[1]
      //     } else {
      //       tre = gcdh1.slice(3,5)
      //     }
      //   } else {
      //     tre = ''
      //   }
      //   if (sec === '' && tre === '') {
      //     xmsl = ''
      //   } else {
      //     xmsl = fir + sec + tre
      //   }
      //   // if (row.gcdh)
      //   console.log(this.projectInfoForm)
      //   // this.$set(this.projectInfoForm, 'gclx', xmsl)
      //   if (row.gcdh.length > 5) {
      //     this.$set(this.projectInfoForm, 'gcnx', row.gcdh.substring(6,10))
          
      //   }
      //   console.log(this.projectInfoForm.gclx)
      // }
     
    },

    // 提交工程信息
    submitProjectInfo() {
      this.$refs['projectInfoFormRef'].validate((valid) => {
        if (valid) {
          // engineering_id
          // this.projectInfoForm.gcnx = this.projectInfoForm.gcdh.substring(6)
          console.log(this.projectInfoForm)
          this.projectInfoForm.gclx = this.projectInfoForm.xmsl
          this.projectInfoForm.gcnx = this.projectInfoForm.xmzbnf
          setManageFilesDh(this.projectInfoForm).then(response => {
            if (response.status === 200) {
              const { status, message } = response.data
              if (status !== 200) return this.message({ message, type: 'error' })
              this.handleToDescriptionPage('管理类著录单', this.projectInfoForm)
            }
          }).catch(error => {
            console.log(error)
          })
          
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },

    // 关闭
    closeProjectInfoDialog() {
      this.$refs['projectInfoFormRef'].resetFields()
      this.projectInfoForm = {}
      this.projectInfoVisible = false
    },
  }
}
</script>
<style lang="less">
.projectForm{
  .engineName{
    width:100%;
    display: flex !important;
    .el-form-item__content{
      flex: 1;
    }
  }
}
.upload-demo{
  position: relative;
  height:100px;
  padding-bottom: 40px;
  .up-btn{
    position:absolute;
    width:100%;
    margin-top:40px;
    text-align: right;
  }
  .tip{
    display: block;
    color: firebrick;
    font-size: 12px;
  }
}
</style>

<style lang="less" scoped>
.bitianxiangicon::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
 .btndelete {
    background-color: #CB3737;
  }
  .btnedit {
    background-color: #54AF85;
  }
  .btnld {
    background-color: #7BA1EF;
  }

.btn{
  display: inline-block;
  // margin-right:10px;
  margin: 5px;
}
.importFile{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .title{
    flex:2;
    margin-right:10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height:32px;
    font-size:14px;
    font-weight: 500;
  }
  .title::before{
    display: table;
    content: '*';
    margin-right: 5px;
    color:firebrick;
  }
  .upload-demo{
    flex:18;
    position: relative;
    height:180px;
    .up-btn{
      position:absolute;
      width:100%;
      margin-top:40px;
      text-align: right;
    }
    .tip{
      display: block;
      color: firebrick;
      font-size: 12px;
      margin-top:10px;
      
    }
  }
}
.el-form-item1 {
  .el-form-item {
    margin-right: 10px !important;
  }
}
.upload-demo{
  position: relative;
  height:180px;
  .up-btn{
    position:absolute;
    width:100%;
    margin-top:40px;
    text-align: right;
  }
  .tip{
    display: block;
    color: firebrick;
    font-size: 12px;
  }
}
</style>
