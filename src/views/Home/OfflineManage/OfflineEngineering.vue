<template>
  <div >
       <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业报送接收</el-breadcrumb-item>
      <el-breadcrumb-item>报送接收</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
          <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="项目名称">
              <el-input clearable v-model="queryInfo.gcmc" placeholder="请输入项目名称"  @change="getOfflineEngineeringListFun"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
            <el-select clearable v-model="queryInfo.gclx" placeholder="请选择项目类型" @change="getOfflineEngineeringListFun">
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getOfflineEngineeringListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
               <!-- 列表区 -->
              <div class="eltablebox" v-loading="loading" >
          <el-col>
          <!-- 导入档案ZIP包 B -->
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="upload('1')">导入档案ZIP包</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  @click="showDialogFun('开具接收和移交证明书')">开具接收和移交证明书</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  @click="showDialogFun('预览接收和移交证明书')">预览接收和移交证明书</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  @click="showDialogFun('开具验收意见书')">开具验收意见书</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  @click="showDialogFun('预览验收意见书')">预览验收意见书</el-button>
              </el-form-item>
            </el-form>
                <!-- 导入档案ZIP包 E -->
          </el-col> 
            <!-- 工程列表 B -->
            <el-table
              :data="EngineeringList"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :highlight-current-row="true"
              ref="tableRef"
              :row-class-name="rowStyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="gcmc"
                label="项目名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="项目类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="jsdw"
                label="建设单位"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="sgxkzh"
                label="施工许可证号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="ghxkzh"
                label="规划许可证号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="gcdd"
                label="项目地点"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="sgdw"
                label="施工单位"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="500">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="searchEngineeringEngineeringIdFun(scope.row)">项目详情</el-button>
                  <el-button type="success" size="small" @click="gotodetailsFun(scope.row)">档案查看</el-button>
                  <el-button type="success" size="small" @click="upload('2')">重新导入数据包</el-button>
                  <el-button type="primary" size="small" @click="showDialogFun2('归档入库',scope.row)">归档入库</el-button>
                  <el-button type="warning" size="small" @click="showDialogFun2('接收审核',scope.row)">接收审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
            <!-- 分页 B -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 50, 200, 1000]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background>
            </el-pagination>
             <!-- 分页 E -->
            </div>

      </el-card>

        <!-- 导入档案ZIP包 弹层 B-->
     <el-dialog
      :title="'导入档案ZIP包'"
      :visible.sync="daoruFileZIPDialogVisible"
      width="60%"
    >
       <offlinewebupload
       v-if="daoruFileZIPDialogVisible"
      :fileNumLimit="fileNumLimit"
      :fileSize="fileSize"
      :chunkSize="chunkSize"
      :uploadSuffixUrl="uploadSuffixUrl"
      :options="options"
      :fjscrow="fjscrow"
      :filely='filely'
      :fileListData="filesList"
      > </offlinewebupload>
    </el-dialog>
     <!-- 导入档案ZIP包 弹层 E-->

        <!-- 项目工程详情 B -->
          <el-dialog :title="'项目详情'" :visible.sync="dialogEngineeringdetailsVisible" width="60%">
            <offlineEngineering v-if="dialogEngineeringdetailsVisible" :ID='Engineering_id' :source="zt" :Engineeringrow='Engineeringrow'></offlineEngineering>
          </el-dialog>
        <!-- 项目工程详情 E -->

      <!-- 选择工程 B -->
    <el-dialog
        title="选择工程"
        :visible.sync="selectProjectDialogVisible"
        width="60%"
      >
      <el-table
        :data="selectProjectData"
        border
        max-height="500px"
        style="width: 100%"
        :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
        :cell-style="{'text-align':'center','padding':'0px'}"
        :row-style="{'height':'4rem'}"
        >
        <el-table-column
          prop="dwgcmc"
          label="单位工程名称"
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="dwgclxName"
          label="工程类型"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150"
          >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="selectProjectDialogVisibleFun(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 选择工程 E -->

        <!-- 开具验收意见书 B -->
            <el-dialog
          title="开具验收意见书"
          :visible.sync="opinionDownLoadVisible"
          width="65%" >
       <el-scrollbar style="padding-bottom: 20px;">
        <div class="clearfix Dutybookbox scodestyle" >
          <div class="Dutybook-title" >海口市城建档案馆<br/>建设工程档案验收意见书</div>
          <div class="Dutybook-body-bh"  v-if="!serialNoflag">编号：
            <el-select v-model="serialModelBH"  @change="serialModelBHFun">
              <el-option label="建筑A" value="建筑A"></el-option>
              <el-option label="建筑B" value="建筑B"></el-option>
              <el-option label="市政"  value="市政"></el-option>
            </el-select>{{OpinionData.serialNo}}
          </div>
          <div class="Dutybook-body-bh" v-else >编号：{{OpinionData.serialNo}}</div>
          <table class="ArchiveTable" cellspacing="0px">
            <tr>
               <td>工程名称</td>
              <td colspan='2'><input v-model='OpinionData.gcmc' type="text" style="text-align: center;"></td>
              <td>工程地点</td>
              <td colspan='2'><input v-model='OpinionData.gcdd' type="text" style="text-align: center;"></td>
            </tr>
            <tr>
              <td>开工日期</td>
              <td colspan='2'>  
                  <el-date-picker
                  value-format='yyyy-MM-dd'
                    v-model="OpinionData.kgrq"
                    type="date">
                  </el-date-picker>
                </td>
              <td>竣工日期</td>
              <td colspan='2'>
                <el-date-picker
                value-format='yyyy-MM-dd'
                  v-model="OpinionData.jgrq"
                  type="date">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <td>建设单位</td>
              <td colspan='5'><input v-model='OpinionData.jsdw' type="text"></td>
            </tr>
            <tr>
               <td>施工单位</td>
              <td colspan='2'><input v-model='OpinionData.sgdw' type="text"></td>
              <td>监理单位</td>
              <td colspan='2'><input v-model='OpinionData.jldw' type="text"></td>
            </tr>
            <tr>
              <td>建设工程规划许可证号</td>
              <td colspan='2'><input v-model='OpinionData.ghxkzh' type="text"></td>
              <td>建设工程施工许可证号</td>
              <td colspan='2'><input v-model='OpinionData.sgxkzh' type="text"></td>
            </tr>
            <tr>
              <td>建筑面积m²<br/>（工程规模）</td>
              <td><input v-model='OpinionData.jzmj' type="text"></td>
              <template v-if="serialModelBH == '市政'">
                <td >长度</td>
                <td><input v-model='OpinionData.cs' type="text"></td>
              </template>
               <template v-if="serialModelBH == '建筑A'">
                <td >层数</td>
                <td><input v-model='OpinionData.cs' type="text"></td>
              </template>
               <template v-if="serialModelBH == '建筑B'">
                <td >层数</td>
                <td><input v-model='OpinionData.cs' type="text"></td>
              </template>
              
              <td>结构类型</td>
              <td><input v-model='OpinionData.jglxName' type="text"></td>
            </tr>
            <tr>
              <td>项目负责人</td>
              <td colspan='2'><input v-model='OpinionData.xmfzr' type="text"></td>
              <td>电话</td>
              <td colspan='2'><input v-model='OpinionData.xmfzrdh' type="text"></td>
            </tr>
            <tr>
              <td>建设单位档案员</td>
              <td colspan='2'><input v-model='OpinionData.jsdwday' type="text"></td>
              <td>电话</td>
              <td colspan='2'><input v-model='OpinionData.jsdwdaydh' type="text"></td>
            </tr>
            <tr>
              <td  colspan='6' style="text-align: left;">
                 验收意见：
                 <p>
                  1.经查验，该项建设工程档案有关准备阶段文件、监理文件、施工文件、竣工验收文件和竣工图等五个方面的重要档案资料基本符合《建设工程文件归档规范》GB/T50328-2014标准及相关规定要求，同意验收；
                 </p>
                 <p>
                  2.本意见书不得涂改，未经海口市城建档案馆（海口市建设信息中心）盖章无效；
                 </p>
                 <p>
                  3.本意见书一式三份（市城建档案馆、建设单位、建设工程竣工备案部门各一份）；本意见书为建设单位办理建设工程竣工备案手续的必要认可文件，不作为其他用途凭证。
                 </p>
                 <p>
                  请建设单位在工程竣工验收后三个月内向市城建档案馆报送后续档案资料。
                 </p>
              </td>
            </tr>
            <tr >
              <td colspan='4' class="scode-left">
                  <!-- <div ><img :src="fileURLym+OpinionData.ewm_url+'?timestamp='+ new Date().getTime()" alt="二维码" class="OpinionOnlineName"/> </div>
                  <div>您可以使用手机扫描二维码或访问网站{{OpinionData.ewm_msg}}验证此单据真伪。</div>
                  <div>验证号{{OpinionData.yzh}} <span style="margin-left:20px">联系电话 66155325</span></div> -->
              </td>
              <td colspan='2' class="scode-rigth">
                <div class="scode-Dutybook_bottom">
                    <!-- <el-upload
                      class="avatar-uploader-none"
                      action="#"
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG"
                      :http-request="myUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                    <img v-if="OpinionData.hkscjdaggz" :src="fileURLym+OpinionData.hkscjdaggz" alt="海口市城建档案馆盖章" class="OpinionOnlineName"/>
                    <div>
                      海口市城建档案馆<br>
                      （海口市建设信息中心）<br>
                    </div>
                    </el-upload> -->
                    <div>
                      海口市城建档案馆<br>
                      （海口市建设信息中心）<br>
                    </div>
                    <div class="datestyle">
                     <input  type="text">年 
                     <input  type="text">月
                     <input  type="text">日
                    </div>
                </div>
              </td>
            </tr>
          </table>
          </div>
         </el-scrollbar>
          <div slot="footer" class="dialog-footer downbtn">
            <el-button   @click="opinionDownLoadVisible = false">取 消</el-button>
            <el-button type="primary"  @click="getFileOfflineDownloadProposalFun">确定开具证明</el-button>
          </div>
        </el-dialog>
    <!-- 开具验收意见书 E -->
    <!-- 未开具验收意见书 提示咨询弹层 B -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>该工程未开具验收意见书，是否立即开具验收意见书？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleFun(Projectrow)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 未开具验收意见书 提示咨询弹层 E -->

      <!-- 2023.06.05 新上传单个文件ZIP 组件  B-->
        <offlinewebupload /> 
      <!-- 2023.06.05 新上传单个文件ZIP 组件  E-->

  </div>
</template>

<script>
import Bus from '@/assets/js/bus';
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getOfflineEngineeringList,
  downloadFileOfflineDownloadHandoverCertificate,
  getOfflineProjectListEngineeringId,
  getfileOfflineDownloadHandoverCertificate,
  getfileOfflineViewHandoverCertificate,
  getOfflineDataProposal,
  getFileOfflineViewProposal,
  getFileOfflineDownloadProposal,
  getFileOfflineFilePlace,
} from '@/api/OfflineManage'
import offlinewebupload from '@/components/upload/offlinewebupload'
import offlineEngineering from '@/components/details/offlineEngineering'
import Download from "@/utils/download"
export default {
  components: {
    offlinewebupload,
    offlineEngineering,
  },
  data () {
    return { 
      isActive:'project',
      daoruFileZIPDialogVisible:false,//导入档案ZIP包 弹层 
      queryInfo:{
        gclx:'',
        gcmc:'',
        page_num:1,
        page_size:10,
      },

        fjscrow:{},//上传附件 所点击文件条 内容数据
        id: -1,
        loading:false,
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
            fileUploadUrl:"/file-api/v1/file/offline/upload",//上传地址
            fileCheckUrl:"/file-api/v1/file/offline/check",//检测文件是否存在url
            checkChunkUrl:"/file-api/v1/file/offline/check",//检测分片url
            mergeChunksUrl:"/file-api/v1/file/offline/merge",//合并文件请求地址
            uploadSuffixUrl:'',
            headers:{},
            file_id:'',
        },
      pageSize:10,
      currentPage:1,
      total:0,
      engineeringType:[],//项目类型
      EngineeringList:[],//项目列表
      ids:'',//选中的ID
      dialogEngineeringdetailsVisible:false,//项目详情 弹层
      Engineering_id:"",//项目工程ID
      zt:"",
      Engineeringrow:{},//项目
      filely:'1',//文件来源 1:第一次导入  2：重新导入
      activeName:'',
      selectProjectDialogVisible:false,//选择单位工程 弹层
      selectProjectData:[],// 选择单位工程 数据
      Selectionlist:[], //选中的项目
      archivesCateList:[],//单位工程类型
      fileURLym:'',//文件预览域名
      opinionDownLoadVisible:false,//开具验收意见书 弹层
      OpinionData:{},//开具验收意见书 数据  
      serialModel:[],//编码数据
      serialModelBH:"建筑A",//编码
      yy:'',//年
      mm:'',//月
      dd:'',//日
      dialogVisible:false,//未开具验收意见书 提示弹层
      Projectrow:{},//选中的单位工程条
      serialNoflag:false, //编号是否包含 汉字
    }
  },
  created () {
    this.getEngineeringTypeFun() // 工程类型
    this.getUniProjectType() //单位工程类型
    this.getStructureType() //结构类型
  },
  mounted () {
    this.getEngineeringTypeFun() // 工程类型
    this.getUniProjectType() //单位工程类型
    this.querySystemDictionaryFun() //获取文件域名
    this.getStructureType() //结构类型
    this.getOfflineEngineeringListFun() //报送接收项目列表

     
      // 文件选择后的回调chunkNumber
      Bus.$on('fileAdded', (a) => {
        console.log('文件已选择',a)
      });

      // 文件上传成功的回调
      Bus.$on('fileSuccess', (v) => {
        this.getOfflineEngineeringListFun()
        this.message({ message: v, type: 'success' })
        console.log('文件上传成功',v)
      }); 

  },
  watch:{
    daoruFileZIPDialogVisible:function(newQuestion, oldQuestion){
      this.getOfflineEngineeringListFun() //报送接收项目列表
    },
  },
  methods: {
    
    //2022.10.12 新上传组件方法 B
      //打开文件选择框  上传按钮
      upload(id) {
        //index为表格对应的行数
        //data是这一行对应的值，这里不做说明
        // this.rowIndex = index;
        this.file_id = id
        // 打开文件选择框
        Bus.$emit('openUploader', {
          file_id: id,  // 传入的参数
          total_num: '0',  // 传入的参数
        })
      },

    //2022.10.12 新上传组件方法 E


        //获取单位列表
    getOfflineProjectListEngineeringIdFun(id){
      const q ={
        page_num:1,
        page_size:100,
        dwgcmc:'',
        engineering_id:id,
      }
      getOfflineProjectListEngineeringId(q).then(response =>{
        
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         res.list.map(v => {
            this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
            
            return
          })
         this.selectProjectData = res.list
         this.selectProjectDialogVisible = true
        }
      })
    },
    //选中 文件
    handleSelectionChange(val){
      console.log(val)
      this.Selectionlist = val
    },
    //接收审核 按钮
    showDialogFun2(name,row){
      
      this.activeName = name
      this.getOfflineProjectListEngineeringIdFun(row.engineering_id)
    },
    //按钮
    showDialogFun(name){
       if (this.Selectionlist.length == 0) {
         this.message({ message: '请选择工程', type: 'error' })
         return
       } 
       this.activeName = name
       if (name === '开具接收和移交证明书') {
         this.getOfflineProjectListEngineeringIdFun(this.Selectionlist[0].engineering_id)
       }else if (name === '预览接收和移交证明书') {
          this.getOfflineProjectListEngineeringIdFun(this.Selectionlist[0].engineering_id)
       }else if (name === '开具验收意见书') {
          this.getOfflineProjectListEngineeringIdFun(this.Selectionlist[0].engineering_id)
       }else if (name === '预览验收意见书') {
         this.getOfflineProjectListEngineeringIdFun(this.Selectionlist[0].engineering_id)
       }
    },

     //选择单位工程
    selectProjectDialogVisibleFun(row){
      this.Projectrow = row
      if (this.activeName == '开具接收和移交证明书') {
        this.project_id = row.project_id
        this.getfileOfflineDownloadHandoverCertificateFun(row) //移交证明书 
      } else if(this.activeName == '开具验收意见书'){
        this.opinionDownLoadVisible = true //打开 开具验收意见书 弹层
        this.getOfflineDataProposalFun(row)
        this.project_id = row.project_id
      } else if(this.activeName == '预览验收意见书'){
         this.getFileOfflineViewProposalFun(row) 
      }else if (this.activeName == '预览接收和移交证明书'){
        this.getfileOfflineViewHandoverCertificateFun(row)
      }else if (this.activeName == '归档入库'){
        this.loading = true
        this.getFileOfflineFilePlaceFun(row)
      }else if (this.activeName == '接收审核'){
         this.$router.push({  
            path: '/OfflineManage/OfflineCheck',  
            query: {
              engineering_id: row.engineering_id,
              project_id: row.project_id
            },
           
        }) 
      }
      this.selectProjectDialogVisible = false   //关闭选择工程弹层
    },
    //企业报送接收 - 企业报送接收按单位工程归档入库
    getFileOfflineFilePlaceFun(row){
      const q ={
        engineering_id: row.engineering_id,
        project_id: row.project_id
      }
      getFileOfflineFilePlace(q).then(response =>{
        let setTimeoutflag = false
       var t = setTimeout(() => {
             this.message({ message: '归档成功', type: 'success' })
             this.loading = false
             this.selectProjectDialogVisible = false
        }, 10000)

        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         clearTimeout(t)
         this.message({ message: message, type: 'success' })
         this.loading = false
         this.selectProjectDialogVisible = false
        }
        
        
      })
    },
 
    //选择编码
    serialModelBHFun(){
      console.log(this.serialModelBH)
      this.getOfflineDataProposalFun(this.Projectrow) //获取验收意见书准备数据
    },
    //开具验收意见书
    getFileOfflineDownloadProposalFun(row){
      var serialNo = ''
      if (this.serialNoflag) {
        serialNo = this.OpinionData.serialNo
      } else {
        serialNo = this.serialModelBH+this.OpinionData.serialNo
      }
      const q = {
        type:this.serialModelBH,
        project_id:this.Projectrow.project_id,
        serial_no:serialNo,
        jsdwday:this.OpinionData.jsdwday,
        xmfzr:this.OpinionData.xmfzr,
        xmfzrdh:this.OpinionData.xmfzrdh,
        jsdwdaydh:this.OpinionData.jsdwdaydh,
      }
      console.log(this.OpinionData)
      getFileOfflineDownloadProposal(q).then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'application/pdf;charset-UTF-8'})
        Download.download(
          blob,
          fileName
        )
        this.opinionDownLoadVisible = false
        this.message({ message: '开具验收意见书成功', type: 'success' })
      }).catch(error => {
        console.log(error)
      })

    },
    

    //获取验收意见书准备数据
    getOfflineDataProposalFun(row){
      const q ={
        type:this.serialModelBH,
        project_id:row.project_id,
      }
      getOfflineDataProposal(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         console.log(this.structureType)
         this.structureType.forEach(item => {
              if (res.jglx === item.bm) {
                res.jglxName = item.mc
              }
              return
            })

          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g"); //判断字符串中是否包含汉字
      　　if(reg.test(res.serialNo)){
      　　	this.serialNoflag = true
            this.serialModelBH = res.serialNo.replace(/[0-9]+/g,"")
            console.log(this.serialModelBH)
      　　}else{
           this.serialNoflag = false
          //  this.serialModelBH = '建筑A'
        }
        
         this.OpinionData = res
        }
      })
    },
    //未开具验收意见书 方法
    dialogVisibleFun(row){
      this.getOfflineDataProposalFun(row)
      this.opinionDownLoadVisible = true //打开 开具验收意见书 弹层
      this.dialogVisible = false
    },
        //预览验收意见书
    getFileOfflineViewProposalFun(row){
      const q ={
        project_id:row.project_id
      }
      getFileOfflineViewProposal(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        if (res.file_url == null || res.file_url == '') {
          this.dialogVisible = true
        } else {
         var url = this.fileURLym + res.file_url
         window.open(url, '_blank')
        }
        }
      })
    },

    //开具接收和移交证明书
    getfileOfflineDownloadHandoverCertificateFun(row){
      const q = {
        engineering_id:row.engineering_id,
        project_id:row.project_id,
      }
      getfileOfflineDownloadHandoverCertificate(q).then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'application/pdf;charset-UTF-8'})
        Download.download(
          blob,
          fileName
        )
      }).catch(error => {
        console.log(error)
      })
    },

    // 预览接收和移交证明书
    getfileOfflineViewHandoverCertificateFun(row){
      const q ={
        engineering_id:row.engineering_id,
        project_id:row.project_id,
      }
      getfileOfflineViewHandoverCertificate(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         var url = this.fileURLym + res.file_url
         window.open(url, '_blank')
        }
      })
    },
    // 下载导入模板
    downloadFileOfflineDownloadHandoverCertificateFun() {
      downloadFileOfflineDownloadHandoverCertificate().then(response => {
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
      //查看 
    gotodetailsFun(row){
      console.log(row)
      this.$router.push({ 
        path: '/OfflineManage/OfflineEngineeringDetailsPage', 
        query: { 
           engineering_id: row.engineering_id,
           gclx: row.gclx,
           zt:row.zt
           }
        })
    },
      //项目详情
    searchEngineeringEngineeringIdFun(row){
      console.log(row)
      this.Engineeringrow = row
      this.Engineering_id = row.engineering_id
      this.dialogEngineeringdetailsVisible = true
      var zt = row.zt
      this.zt = zt
      const q = {
        engineering_id:row.engineering_id,
        zt:row.zt
      }
      console.log(q)
      
    },
  //报送接收项目列表
  getOfflineEngineeringListFun(){
      this.queryInfo.page_num = this.currentPage,
      this.queryInfo.page_size = this.pageSize,
    getOfflineEngineeringList(this.queryInfo).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfflineEngineeringListFun()
         }
        res.list.map(v=>{
          this.engineeringType.forEach(t => {  //载体类型
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
        })
       this.EngineeringList = res.list
      }
    })
  },
  //导入案卷 弹层
    daoruFileZIPFun(name,ly){
      this.filely = ly
      this.daoruFileZIPDialogVisible = true
    },
//每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.getOfflineEngineeringListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getOfflineEngineeringListFun()
    },
    // 案卷列表选中的列 
    changeBox(selection) {
     this.ids = selection.map(item => item.engineering_id);
      this.selectedList = selection
    },
    //选中的列样式 高亮 改变  
    rowStyle({row}){
      var arr = this.ids;
      for(let i = 0; i < arr.length; i++){
        if(row.files_id === arr[i]){
          return 'rowStyle'
        }
      } 
    },
    // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
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
              console.log(response.data.data[0].dict_code)
            }
          }).catch(error => {
            console.log(error)
          })
    },
    // 结构类型
    getStructureType() {
      const q = {
        bm: "JGLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.structureType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  //销毁 公用调用的函数 
destroyed() {
      Bus.$off('fileAdded');
      Bus.$off('fileSuccess');
    },
}
</script>

<style scoped lang='less'>
.rowStyle{
    background-color:#ecf5ff!important;
  }
</style>

<style scoped lang='less'>
.scode-Dutybook_bottom {
  text-align: center;
  font-size: 16px;
  line-height: 2rem;
  margin-bottom: 1rem;
  position: relative;
  img {
    position: absolute;
    width: 16rem;
    height: 16rem;
    opacity: 0.7;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%,-50%);
  }
}
.scodestyle {
  font-weight: 700 ;
}
.scode-left {
  text-align: left !important;
  border-top: none !important;
  font-size: 12px ;
  font-weight: normal;
  padding-top: 50px !important;
  padding-bottom: 50px !important;
}
.scode-rigth {
  text-align: left !important;
  border-top: none !important;
  border-left: none !important;
  padding-top: 50px !important;
  padding-bottom: 50px !important;
}
.OpinionOnlineName {
  width: 9rem;
  height:9rem;
  display: inline-block;
  vertical-align: middle;
}

.gaizhang_img {
  width: 9rem;
  height: 9rem;
  vertical-align: middle;
}

.onlineName {
  width: 9rem;
  height:4.5rem;
  display: inline-block;
  vertical-align: middle;
}
.upload-demo {
  width: 9rem;
  height: 4rem;
  
}
/deep/ .el-scrollbar {
	.el-scrollbar__wrap {
		height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
.ArchiveTable {
  width: 100%;
  border-bottom:2px solid #E6EAEE;
  border-right:2px solid #E6EAEE;
  input {
    background:none; 
    outline:none; 
    border:none; 
    width: 100%;
    height: 100%;
    line-height: 100%;
  }
  
}
.ArchiveTable tr, .ArchiveTable tr td{ 
    padding: 1rem 2rem;
    // border:2px solid #E6EAEE; 
    border-top: 2px solid #E6EAEE;
    border-left: 2px solid #E6EAEE;
    text-align: center;
  }
.ArchiveTable tr td {
  width: 12%;
  p {
    text-indent: 2em;
  }
}
.Dutybookbox {
  width: 100%;
  padding: 0 4rem;
  box-sizing: border-box;
}
.Dutybook-title {
  font-size: 20px;
  text-align: center;
  width: 100%;
  font-weight: 700;
  letter-spacing:5px;
}
.Dutybook-body-bh {
  margin-top: 3rem;
  font-size: 14px;
  width: 100%;
  text-align: right;
  padding-right: 2rem;
  box-sizing: border-box;
  margin-bottom: 20px;
  .el-input__inner {
    width: 90px !important;
    border: none !important;
  }
}
.Dutybook-body {
  margin-top: 2rem;
  font-size: 18px;
  line-height: 28px;
}
.bsqkStyle {
  width: 100%;
  text-align: left;
  line-height: 30px;
}
.ArchivePS {
  margin-top: 5px;
  width: 100%;
  font-size: 14px;

}
.bsqkStyleInput {
  border-bottom: 1px solid #606266 !important;
  width: 50px !important;
  box-sizing: border-box;
  padding: 0 8px;
  display: inline-block;
}
.bsqkStyleInput1 {
  border-bottom: 1px solid #606266 !important;
  width: 200px !important;
  box-sizing: border-box;
  padding: 0 8px;
  display: inline-block;
}
.Dutybook_bottom {
  text-align: left;
  float: right;
  width: 100%;
  line-height: 3rem;
  div {
    margin-top: 5px;
  }
}
.Transferdatadatestyle {
  width: 100%;
  input {
    width: 35px;
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    color: #606266;
  }
}
.datestyle {
  z-index: 999;
  position: absolute;
  left: 50%;
  bottom: -50%;
  transform: translate(-50%);
  width: 100%;
  input {
    width: 35px;
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    color: #606266;
  }
}
.downbtn {
  width: 100%;
  text-align: center;
}
</style>
<style lang="less">
.Bboxbg .el-main {
  background-color: transparent;
}
.ArchiveTable {
  .el-input__inner{
    border:none; 
  }
  .el-input__prefix {
    display: none;
  }
}
.Dutybook-body-bh {
  margin-top: 3rem;
  font-size: 14px;
  width: 100%;
  text-align: right;
  padding-right: 2rem;
  box-sizing: border-box;
  margin-bottom: 20px;
  .el-input__inner {
    font-weight: 700;
    width: 50px !important;
    border: none !important;
    padding: 1px !important;
  }
  .el-input__suffix {
    display: none;
  }
}
</style>