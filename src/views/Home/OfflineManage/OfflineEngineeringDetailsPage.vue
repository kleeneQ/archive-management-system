<template>
  <div class="description">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业报送接收</el-breadcrumb-item>
        <el-breadcrumb-item>报送接收</el-breadcrumb-item>
        <el-breadcrumb-item>档案查看</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row>
    <el-card class="main-card">
      <el-container>
        <el-aside width="290px">
          <el-card class="box-card" style="max-height:836px">
            <!-- current-node-key  当前选中的节点 -->
            <!-- accordion  是否每次只打开一个同级树节点展开 -->
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              ref="tree"
              node-key="treeId"
              @node-click="handleNodeClick"
              style="height:100%"
            >
            </el-tree>
          </el-card>
        </el-aside>
        <el-main class="box-main">
          <el-card class="box-main-card" >
            <el-row>
              <el-col :span="24">
                <!-- 单位工程 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'engineering'">
                  <el-form-item label="单位工程名称">
                    <el-input clearable v-model="dwgcmc" placeholder="请输入工程名称" @change="getUniProjectListFun"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="档号">
                    <el-input clearable v-model="dwgcdh" placeholder="请输入工程档号" @change="getUniProjectListFun"></el-input>
                  </el-form-item> -->
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryUnitproject('单位工程')">查询</el-button>
                  </el-form-item>
                </el-form>
                <!-- 案卷 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'project'">
                  <el-form-item label="案卷名称">
                    <el-input clearable v-model="ajtm" placeholder="请输入案卷名称" @change="getFilesProjectListFun"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="案卷档号">
                    <el-input clearable v-model="ajdh" placeholder="请输入案卷档号" @change="getFilesProjectListFun"></el-input>
                  </el-form-item> -->
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryUnitproject('工程案卷')">查询</el-button>
                  </el-form-item>
        
                </el-form>
                <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'files'">
                  <el-form-item label="文件题名">
                    <el-input clearable v-model="wjtm" placeholder="请输入文件题名" @change="getDocumentListFun"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="文件档号">
                    <el-input clearable v-model="wjdh" placeholder="请输入文件档号" @change="getDocumentListFun"></el-input>
                  </el-form-item> -->
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryUnitproject('案卷文件')">查询</el-button>
                  </el-form-item>
      
                </el-form>
              </el-col>
            </el-row>

          </el-card>
          <el-card>
          <!-- 列表区 -->
              <div class="eltablebox">
         
            <!-- 项目工程列表 -->
            <el-table
              :data="uniProjectList"
              key="one"
              border
              style="width: 100%"
              v-if="isActive === 'engineering'"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <!-- <el-table-column align="center" prop="dwgcdh" label="档号" width="300" >
                <template slot-scope="scope">
                  {{scope.row.xmgcdh}}{{scope.row.dwgcdh}}
                </template>
              </el-table-column> -->
              <el-table-column
              align="center"
                prop="dwgcmc"
                label="单位工程名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="dwgclxName"
                label="单位工程类型"
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="sgdw"
                label="施工单位"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="jglxName"
                label="结构类型"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="kgsj"
                label="开工日期"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.kgsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="jgsj"
                label="竣工日期"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.jgsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="lrsj"
                label="著入时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="150">
                <template slot-scope="scope">
                  <el-button class="btnedit" type="primary" size="small" @click="dialogprojectdetailsVisibleFun('单位工程详情', scope.row)">详情</el-button>
                  </template>
              </el-table-column>
            </el-table>
          
            <!-- 工程案卷列表 -->
            <el-table
              v-if="isActive === 'project'"
              :data="fileList"
              key="two"
              border
              style="width: 100%"
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
              <!-- <el-table-column
                prop="ajdh"
                label="案卷档号"
              show-overflow-tooltip
              width="300">
              <template slot-scope="scope">
                <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}</div>
                <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}</div>
              </template>
              </el-table-column> -->
              <el-table-column
                prop="ajsxh"
                label="案卷顺序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="ajlbName"
                label="案卷类别"
                width="200"
              >
              </el-table-column>
              <el-table-column
                prop="bzdw"
                label="编制单位"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <!-- <el-table-column
                prop="cfwz"
                label="存放位置"
                width="200">
                <template slot-scope="scope" v-if="scope.row.ajk">
                  {{scope.row.ajk}}-{{scope.row.ajl}}-{{scope.row.ajg}}-{{scope.row.ajc}}-{{scope.row.ajx}}
                </template>
              </el-table-column> -->
              <el-table-column
                prop="fz"
                label="附注"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ztName"
                label="审核状态"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ljrq"
                label="著入时间"
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
                  <el-button type="primary" size="small" class="btnedit" @click="dialogFilesdetailsVisibleFun('案卷详情', scope.row)">详情</el-button>
                 </template>
              </el-table-column>
            </el-table>
            <!-- 案卷文件列表 -->
            <el-table
              v-if="isActive === 'files'"
              :data="documentList"
              key="three"
              border
              style="width: 100%"
              @selection-change="selectedDocumentList"
              
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <!-- <el-table-column
                fixed
                type="selection"
                width="50">
              </el-table-column> -->
              <el-table-column
                fixed
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <!-- <el-table-column
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <!-- <el-table-column
                prop="bgqxName"
                label="保管期限"
                width="200">
              </el-table-column> -->
              <el-table-column
                prop="sl"
                label="数量"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <!-- <el-table-column
                prop="mjName"
                label="密级"
                width="200">
              </el-table-column> -->
              <el-table-column
                prop="wzName"
                label="文种"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="xcsj"
                label="形成时间"
                show-overflow-tooltip
                width="200">
                <template slot-scope="scope">
                  {{scope.row.xcsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="lrsj"
                label="著入时间"
                show-overflow-tooltip
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
                  <el-button type="primary" size="small" class="btnedit"  @click="dialogFilesdetailsVisibleFun('文件详情', scope.row)">详情</el-button>
                  <el-button type="primary" size="small" @click.native="showfileDialogFun(scope.row)">文件预览</el-button>
               </template>
              </el-table-column>
            </el-table>
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

            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-card>
    <!-- 新增单位工程/案卷/文件弹层 -->
    <el-dialog
      :title="optionObj"
      :visible.sync="projectDialogVisible"
      width="60%"
      @close="dialogClosed"
    >
      <ComprehensiveForm :source="isActive" :gclx="gclx" :optionObj="optionObj" :bool="projectDialogVisible" :row="projectForm" @saveFun="saveFun" @cancel="dialogClosed"></ComprehensiveForm>
    </el-dialog>
    <!-- 专业信息著录弹层 -->
    <el-dialog
      :title="engineType + '专业信息'"
      :visible.sync="descriptionDialogVisible"
      width="60%"
      @close="descriptionDialogClosed"
    >
      <Description :source="engineTypestring" :pId="projectId" @saveInfo="saveProfeInfoFun" @cancel="descriptionDialogClosed"></Description>
    </el-dialog>
    <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />
<!-- 选择导入文件的弹层 （表格） -->
    <el-dialog
      :title="importTitle"
      :visible.sync="importDialogVisible"
      width="40%"
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

    <!-- 附件上传弹层 -->
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


   <!-- 选择导入文件的弹层 （ZIP包） -->
    <el-dialog
      :title="importZIPTitle"
      :visible.sync="importZIPDialogVisible"
      
      width="40%"
      @close="importZIPDialogClosed"
    >
    <!-- ZIP包上传组件 -->
    <zipupload
      v-if="importZIPDialogVisible"
      :zipfilesid="zipfilesid"
    > </zipupload>


    </el-dialog>         


    <!-- 导入案卷ZIP包 弹层 -->
     <el-dialog
      :title="'导入案卷ZIP包'"
      :visible.sync="ZIPfjscDialogVisible"
      width="60%"
      @close="zipdialogClosed"
    >
   <filesZIPUpload
      v-if="ZIPfjscDialogVisibleson"
      :ZIPfileNumLimit="ZIPfileNumLimit"
      :ZIPfileSize="ZIPfileSize"
      :ZIPchunkSize="ZIPchunkSize"
      :uploadSuffixUrl="uploadSuffixUrl"
      :options="options"
      :ZIPfileListData="ZIPfilesList"
      :fjscrow="fjscrow"
      :zipfilesid="zipfilesid"
      :ZIPfjscDialogVisibles="ZIPfjscDialogVisibleson" 
            > </filesZIPUpload>
    </el-dialog>


    <!-- 提交审核弹层 -->
     <el-dialog
      :title="'提交审核'"
      :visible.sync="AuditDialogVisible"
      width="40%"
      @close="dialogClosed"
    >
    <audit
      :files='auditfiles'
      :filesType='filesTypeFlag'
      @auditchildFn="auditparentFn"
    ></audit>
    </el-dialog>
    <!-- 审核详情弹层 -->
      <el-dialog
        :title="'审核详情'"
        :visible.sync="AuditDetailDialogVisible"
        width="50%"
        @close="dialogClosed"
      >
      <AuditDetail
        :AuditDetailDatas='AuditDetailData'
        :auditformdesc='auditformdesc'
      ></AuditDetail>
    </el-dialog>

        <!-- 单位工程详情 B -->
          <el-dialog :title="'详情'" :visible.sync="dialogprojectdetailsVisible" width="70%">
            <specialtyDetails v-if="dialogprojectdetailsVisible" :project_id='project_id' :zt='zt' :source="isActive"></specialtyDetails>
          </el-dialog>
        <!-- 单位工程详情 E -->
        <!-- 案卷详情 B -->
          <el-dialog :title="'详情'" :visible.sync="dialogprojectdetailsVisibleFiles" width="70%">
            <specialtyDetailsFiles v-if="dialogprojectdetailsVisibleFiles" :project_id='project_id' :zt='zt' :source="isActive" :filesrow='filesrow'></specialtyDetailsFiles>
          </el-dialog>
        <!-- 案卷详情 E -->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getRandom } from '@/utils/index'
import md5 from 'js-md5'
const TAG = 'TQKJ'
import $ from "jquery"
import Description from "@/components/description/Description"
import ComprehensiveForm from "@/components/description/ComprehensiveForm"
import {
  getUniProjectList,
  queryUniProjectList,
  addUniProject,
  editUniProject,
  removeUniProject,
  getSideBar, // 数字化获取侧边栏数据
} from "@/api/digitization/engineeringAPI"
import {
  getFilesList,
  getFilesProjectList,
  addFiles,
  editFiles,
  removeFiles,
  descriptionSubmitAudit, // 工程类案卷提交审核
} from "@/api/digitization/fileDescription"
import {
  getDocumentList,
  addDocument,
  editDocument,
  removeDocument,
  getFileUrl,
  getDocumentLists
} from "@/api/digitization/documentApi"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  editRoadProfeInfo, // 获取道路工程专业信息
  editTunnelProfeInfo, // 获取隧道工程专业信息
  editTrackProfeInfo,  // 获取轨道工程专业信息
  editPipelineProfeInfo, // 获取管线工程专业信息
  editBridgeProfeInfo, // 获取桥涵工程专业信息
  editBuildProfeInfo // 获取建筑工程专业信息
} from '@/api/digitization/profeInfoAPI'
import {
  parseTime,
  modifiTrees,
  moveUp,
  moveDown
} from "@/utils/index"
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  uploadFile,
  checkUploadFile,
  mergeUploadFile,
  unzipFile,
  bindFile,
  convertPdfFile
} from '@/api/digitization/uploadFile'
import {
  getFilesAuditDetail,
  getFilesVerifyDetail,
  getManageFilesAuditDetail,
} from '@/api/digitization/audit'
import {
  downloadArchivesProcess,
  importDigitEngineering,
  importManage,
  importDigitProject,
  importDigitFiles,
  importDigitFile,
} from '@/api/archivalDescription'

import request from '@/utils/request'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  searchEngineeringList,
  searchEngineeringDownload,
  searchEngineeringEngineeringId,
  searchFilesListProjectId,
  searchFileListFilesId,
  searchEngineeringListSide,
  searchProjectListEngineeringId,
  searchFilesListEngineeringId,
} from '@/api/RecorSearch/recorsearch'
import {
  getOfflineListSide,
  getOfflineProjectListEngineeringId,
  getOfflineFileslistProjectId,
  getOfflineFileListFilesId,
  getOfflineFileslistEngineeringId,
  getOfflineFileOfflineFileUrlFileId,
} from '@/api/OfflineManage'
import YlUpload from '@/components/upload'
import WebUpload from '@/components/upload/webupload'
import JSZip from 'jszip'
import filesZIPUpload from '@/components/upload/filesZIPUpload'
import audit from '@/components/audit/audit'
import AuditDetail from '@/components/audit/AuditDetail'
import specialtyDetails from '@/components/OfflineManage/detailsProject'
import detailsEngineering from '@/components/details/detailsEngineering'
import specialtyDetailsFiles from '@/components/OfflineManage/detailsFiles'
export default {
  components: {
    Description: Description,
    ComprehensiveForm: ComprehensiveForm,
    YlUpload:YlUpload,
    WebUpload,
    filesZIPUpload,
    audit,
    AuditDetail,
    specialtyDetails,
    specialtyDetailsFiles,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data() {
    return {
     dialogprojectdetailsVisible:false,//单位工程详情
      checkDefault:[], //默认选中第一条节点
      scfjtext:'上传附件',
      fjscrow:{},//上传附件 所点击文件条 内容数据
      maxFileOrder: '',  // 文件列表顺序最大值
      minFileOrder: '',  // 文件列表顺序最小值

      oneLevel: '',
      engineering_id: '', // 项目id
      gclx: '',
      optionObj: '',  // 操作对象(单位工程/案卷/文件)
      queryInfo: {},
      total: 0,//总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      dwgcmc: '',
      dwgcdh: '',
      ajtm: '',
      ajdh: '',
      wjtm: '',
      wjdh: '',
      wjsx: '',
      fjdz: '',//文件地址
      listlength:'',
      treeData: [],  // 左侧树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isActive: 'engineering',
      uniProjectList: [],  // 工程列表
      engineType: '', // 点击专业信息时，弹层显示得标题
      engineTypestring: '', // 工程类型编号
      projectId: '',
      descriptionDialogVisible: false,
      fileList: [], // 案卷列表
      selectedList: [], // 选中的案卷数据
      documentList: [], // 文件列表
      title: '新增',
      projectDialogVisible: false, //工程案卷文件弹窗图层 显示隐藏判断条件
      fileDialogVisible:false, //文件预览弹层图层 显示隐藏判断条件
      fjscDialogVisible:false, //上传附件弹窗图层 显示隐藏判断条件
      ZIPfjscDialogVisible:false,//导入ZIP包弹层图层 显示隐藏判断条件
      projectForm: {},
      treeId:"",//当前选中
      uniProjectType: [],  // 单位工程类型
      structureType: [],  // 结构类型
      fileCategory: [], // 案卷类别
      storagePeriod: [], // 保管期限
      secretGrade: [], // 密级
      carrierType: [], // 载体类型
      specifications: [], // 规格
      language: [], // 文种
      archivesCateList: [], // 档案分类列表，用于列表渲染
      uploadUrl:'',//上传文件地址
      FileUrlArrs: [ //图片类型 文件预览
        ],
      url: '',
      imgs: "",
　　  imgsVisible: false, //默认弹窗属性是隐藏的
      importTitle: '',  // 批量导入弹层标题
      importDialogVisible:false, //批量导入弹层条件
      rules: {   //是否上传导入文件判断条件
        bm: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      },
      objectsss:{},
      query: {
            orgName: '',
            fileType: '',
            pageIndex: 1,
            pageSize: 10
        },
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
            fileType:"doc,docx,pdf,xls,xlsx,ppt,pptx,gif,jpg,jpeg,bmp,png,rar,zip,mp4,avi",
            fileUploadUrl:"/file-api/v1/file/digit/upload",//上传地址
            fileCheckUrl:"/file-api/v1/file/digit/check",//检测文件是否存在url
            checkChunkUrl:"/file-api/v1/file/digit/check",//检测分片url
            mergeChunksUrl:"/file-api/v1/file/digit/merge",//合并文件请求地址
            headers:{},
            file_id:'',
        },
        //导入案卷ZIP包文件
        zipfilesid:'',//案卷id传值给子组件导入案卷ZIP包
        importZIPTitle:'导入案卷ZIP包',
        importZIPDialogVisible:false,
        ZIPform:{
              instFilePics:[],
              instFile:[]
          },
        ZIPfilesList:[],//附件显示集合
        ZIPfileNumLimit:200,//文件总数
        ZIPfileSize:100*1024*1024*1024,//默认上传文件大小
        ZIPchunkSize:5*1024*1024,//默认文件片段
        uploadSuffixUrl:"",
        options:{
            //允许上传的文件
            fileType:"doc,docx,pdf,xls,xlsx,ppt,pptx,gif,jpg,jpeg,bmp,png,rar,zip,mp4,avi",
            fileUploadUrl:"/file-api/v1/file/digit/upload",//上传地址
            fileCheckUrl:"/file-api/v1/file/digit/check",//检测文件是否存在url
            checkChunkUrl:"/file-api/v1/file/digit/check",//检测分片url
            mergeChunksUrl:"/file-api/v1/file/digit/merge",//合并文件请求地址
            headers:{},
            file_id:'',
        },
        // 审核弹层
        AuditDialogVisible:false,//审核弹层显示隐藏判断条件  
        auditfiles:{},//提交的案卷信息,
        auditfilesflag:false,
        file_status:[],//案卷状态
        //审核详情
        AuditDetailDialogVisible:false,//审核详情弹层显示隐藏判断条件
        AuditDetailData:'',//审核详情数据
        AuditDetailDatas:'',
        auditformdesc:'', //审核描述
        filesTypeFlag:'',//工程类或是管理类区分
        ZIPfjscDialogVisibles:false,
        ZIPfjscDialogVisibleson:false,
        project_id:'',//单位工程id
        zt:'',//状态
        ajcarrierType:[],//案卷级载体类型
        dialogprojectdetailsVisibleFiles:false, //案卷详情 弹层
    }

  },
  watch: {
    AuditDialogVisible:function(newQuestion, oldQuestion){
      if (newQuestion === true) {
        this.auditformdesc = ''
      } else if (newQuestion === false) {
        this.getFilesProjectListFun() //刷新案卷列表
      }
    },
    fjscDialogVisible:function(newQuestion, oldQuestion){
      if (newQuestion === true) {
      } else if (newQuestion === false) {
        this.getFileUrlFun()

      }
    },
    
  },
  created() {
    this.oneLevel = this.$route.query.engineering_id
    this.gclx = this.$route.query.gclx
    this.engineering_id = this.$route.query.engineering_id
    this.zt = this.$route.query.zt
    this.getUniProjectType()  // 单位工程类型
    this.getStructureType()  // 结构类型
    this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.getCarrierType()  // 载体类型  
    this.getAjCarrierType() //案卷级载体类型  
    this.getSpecifications()  // 规格
    this.getLanguage()  // 文种
    this.getUniProjectListFun() //工程列表
    this.setHeaders() //获取组件请求数据表头
    this.setUrl() //获取请求后台路径
    this.getSystemDictionary()//案卷状态
    this.getSideBarFun(this.oneLevel)
  },
  mounted() {
    this.getUniProjectType()  // 单位工程类型
    },
  methods: {
    
      //案卷详情 弹层
    dialogFilesdetailsVisibleFun(name,row){
      console.log(row)
      this.filesrow = row
      if (name == '案卷详情') {
        this.project_id = row.files_id
      } else {
        this.project_id = row.file_id
      }
      
      this.zt = row.zt
      this.dialogprojectdetailsVisibleFiles = true
      
    },
      //单位工程详情 弹层
    dialogprojectdetailsVisibleFun(name,row){
      console.log(row)
      this.project_id = row.project_id
      this.dialogprojectdetailsVisible = true
    },
    //批量提交审核
    BatchAuditFiles(){
      var files_idstring = ''
      console.log(this.selectedList)
      this.selectedList.forEach(item =>{ //拼接案卷ID
        if (files_idstring === '') {
          files_idstring = item.files_id
        } else {
          files_idstring = files_idstring + "#" + item.files_id
        }
      })
       if (files_idstring === '') return this.message({ message: "请选择需要提交的案卷", type: 'error' })
      this.selectedList.forEach(item =>{
        var q = {
        page_num: '1',
        page_size: '10',
        wjtm: '',
        wjdh: '',
        files_id: item.files_id,
        files_type:"files_type1"
      }
      var sftjshFlag = true
      getDocumentList(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
           
           if (res.list.length === 0) {
            return this.message({ message: '有案卷无文件，不可提交审核！', type: 'error' ,duration:'5000'})
           } else {
              res.list.forEach(item => {  
              if(item.ajdh === null || item.ajdh === '' || item.ajdh === undefined){
                }else {
                  if (item.dzwjmjdz === null || item.dzwjmjdz === '' || item.dzwjmjdz === undefined) {
                  sftjshFlag = false
                  }
                }
              });
           }
          
           if (sftjshFlag == false) {
             this.AuditDialogVisible = false
            return this.message({ message: '有案卷存在文件未挂接附件，不可提交审核！', type: 'error' })
            
          } else {
            this.filesTypeFlag = item.files_type
            this.AuditDialogVisible = true
          }
        }
      })
      }) 
      const q = {
        files_id:'',
        check_describe:''
      }
      this.auditfiles = files_idstring
    },
    //提交审核弹层
    showDialogAuditFun(row){
      this.auditfiles = row.files_id
      console.log(this.queryInfo)
      var q = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        wjtm: this.wjtm,
        wjdh: this.wjdh,
        files_id: row.files_id,
        files_type:"files_type1"
      }
      var sftjshFlag = true
      getDocumentList(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
           
           res.list.forEach(item => {
             if (item.dzwjmjdz === null || item.dzwjmjdz === '' || item.dzwjmjdz === undefined) {
               sftjshFlag = false
             }
           });
           if (sftjshFlag == false) {
            this.message({ message: '该案卷存在文件未挂接附件，不可提交审核！', type: 'error',duration:'5000' })
          } else {
            this.filesTypeFlag = row.files_type
          this.AuditDialogVisible = true
          }
        }
      })
      console.log(sftjshFlag)
      
    },
    //审核提交子组件  传值 关闭 审核弹层
    auditparentFn(cancel){  
      this.AuditDialogVisible = cancel
    },
    //案卷状态
    getSystemDictionary(){
       const q = {
          dict_tag:'file_status'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              this.file_status = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
    //审核详情弹层
    showDialogAuditDetailsFun(row){
      console.log(row)
      const that = this
      const q = {
        files_id:row.files_id 
      }
      getFilesVerifyDetail(q).then(response =>{
        
        that.AuditDetailDialogVisible = true
        response.data.data.forEach(v => {
        that.file_status.forEach(t => {
            if (v.check_result === t.dict_code) {
              v.check_result = t.dict_name
            }
            return
          })
          return
        })
        console.log(response.data.data)
        that.AuditDetailData = response.data.data
      })
    },
     // 关闭导入ZIP模板弹层
    importZIPDialogClosed() {
      this.importZIPDialogVisible = false
    },



    //获取子组件 附件上传组件的显示隐藏条件
    parentFn(payload) {
        this.fjscDialogVisible = payload;
      },
// 批量导入
    // 导入弹层
    importExcelFile(source) {
      this.importTitle = source
      this.importDialogVisible = true
    },

    // 导入表格数据相关方法
    myUpload(e) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e.file)
      if(this.importTitle === '批量导入单位工程'){
        importDigitProject(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getUniProjectListFun()
            this.getSideBarFun(this.oneLevel)
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
            this.getFilesProjectListFun()
            this.getSideBarFun(this.oneLevel)
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
            this.getDocumentListFun()
            this.getSideBarFun(this.oneLevel)
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

    //案卷ZIP包导入弹层
    showDialogImprotZIPFun(row){
      // this.importZIPDialogVisible = true
      this.zipfilesid = row.files_id
      console.log(this.zipfilesid)
      // 强制刷新子组件
      this.$nextTick(() => {
       this.ZIPfjscDialogVisibleson = true
       this.ZIPfjscDialogVisible = true
      })
    },
    zipdialogClosed(){
      console.log(this.ZIPfjscDialogVisibleson)
      this.ZIPfjscDialogVisibleson = false
      this.ZIPfjscDialogVisible = false
    },
      //附件上传弹层
      uploadfjFun(row){
        this.fjscrow = {}
        this.fjscrow = row
        this.fjscDialogVisible = true
      },

      //获取文件上传路径
        setUrl() {
            this.uploadSuffixUrl = request.service1.defaults.baseURL
            return request.service1.defaults.baseURL
        },
        //获取文件上传表头
          setHeaders(){
            const RANDOM = getRandom()
            const TIME = new Date().getTime()
            this.options.headers = {
              authorization: getToken(),
              random: RANDOM,
              expiration_time: TIME,
              check_code: md5(TAG + getToken() + TIME + '/file-api/v1/file/digit/check' + RANDOM)
            }
          },


        // 上移方法
    moveUpFun(row) {
      let prenum = moveUp(this.documentList, row,this.engineering_id)
      this.editAddForm = {
        file_id: row.file_id,
        files_id: this.engineering_id,
        wjtm:row.wjtm,
        wjdh: prenum.prewjdh,
        wjsx: prenum.preOrder,
        ztlx: row.ztlx,
        ztlxName:row.ztlxName,
        sl:row.sl,
        fz:row.fz,
        xcsj:row.xcsj,
        lrsj:row.lrsj,
      }
      console.log(this.editAddForm)
      editDocument(this.editAddForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          // this.message({ message: res.message, type: 'success' })
          this.message({ message: '上移成功', type: 'success' })
          this.getDocumentListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

  // 下移方法
    moveDownFun(row) {
      let nextnum = moveDown(this.documentList, row,this.engineering_id)  // 接收返回的下一行wjsx 
      console.log(nextnum)
      this.editAddForm = {
          file_id: row.file_id,
          files_id: this.engineering_id,
          wjdh: nextnum.nextwjdh,
          wjsx: nextnum.nextOrder,
          wjtm: row.wjtm,
          ztlx: row.ztlx,
          ztlxName:row.ztlxName,
          sl:row.sl,
          fz:row.fz,
          xcsj:row.xcsj,
          lrsj:row.lrsj,
      }
      console.log(this.editAddForm)
      editDocument(this.editAddForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          // this.message({ message: res.message, type: 'success' })
          this.message({ message: '下移成功', type: 'success' })
          this.getDocumentListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },


    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },

    // 数字化获取侧边栏数据
    getSideBarFun(data) {
      const q = {
        engineering_id: data
      }
      console.log(data)
      if (this.treeId == '')  {
        this.treeId = data
      }
      getOfflineListSide(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          
          console.log(res[0].child[0].child)
          res[0].child.forEach(t=>{
              t.child.forEach(item =>{
              item.tree_name = item.sx+'、'+item.tree_name
            })
          })
          const newTress = modifiTrees(res)
          this.treeData = newTress
          console.log(this.treeData)
          if (newTress[0].children[0].treeLevel == 'files') {
            this.isActive = 'project'
            this.searchFilesListEngineeringIdFun()
          }
        }
      this.$nextTick(function(){ 
        this.$refs['tree'].setCurrentKey(this.treeId); //默认选中第一条数据 高亮
      })
      }).catch(error => {
        console.log(error)
      })
    },

    // 查询
    queryUnitproject(target) {
      if (target === '单位工程') {
        this.getUniProjectListFun()
        return
      }
      if (target === '工程案卷') {
        this.getFilesProjectListFun()
        return
      }
      if (target === '案卷文件') {
        this.getDocumentListFun()
        return
      }
      
    },

    // 新增（编辑）单位工程/案卷/文件
    saveFun(data) {
      // 项目工程id
      if (this.optionObj === '新增单位工程') {
        data.engineering_id = this.engineering_id
        this.addUniProjectFun(data)
      } else if (this.optionObj === '编辑单位工程') {
        data.engineering_id = this.engineering_id
        this.editUniProjectFun(data)
      } else if (this.optionObj === '新增案卷著录') {
        data.project_id = this.engineering_id
        this.addFileFun(data)
      } else if (this.optionObj === '编辑案卷著录') {
        data.project_id = this.engineering_id
        this.editFileFun(data)
      } else if (this.optionObj === '新增文件') {
        data.files_id = this.engineering_id
        this.addDocumentFun(data)
      } else if (this.optionObj === '编辑文件') {
        data.files_id = this.engineering_id
        this.editDocumentFun(data)
      }
    },
    //档案查询根据项目id获取案卷列表
    searchFilesListEngineeringIdFun(){
      const that = this
      const q ={
          page_num: this.currentPage,
            page_size: this.pageSize,
            ajtm: this.ajtm,
            ajdh: this.ajdh,
            zt:this.zt,
            engineering_id: this.engineering_id
        }
        getOfflineFileslistEngineeringId(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.searchFilesListEngineeringIdFun()
         }
          res.list.map(v => {
            // v.cfwz = v.ajk + v.ajl + v.ajg + v.ajc + v.ajx
             this.file_status.forEach(t =>{
              if (v.zt === t.dict_code) {
                v.ztName = t.dict_name
              }
              return
            })
            this.fileCategory.forEach(t => {
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
            this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
            this.secretGrade.forEach(t => {
              if (v.mj === t.bm) {
                v.mjName = t.mc
              }
              return
            })
              this.ajcarrierType.forEach(t => {
                if (v.ztlx === t.bm) {
                  v.ztlxName = t.mc
                }
                return
              })
            return
          })
          that.fileList = res.list
          }
        })
      },
    // 根据项目工程id获取单位工程列表
    getUniProjectListFun() {
      this.queryInfo = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        dwgcmc: this.dwgcmc,
        dwgcdh: this.dwgcdh,
        zt:this.zt,
        engineering_id: this.engineering_id
      }
      getOfflineProjectListEngineeringId(this.queryInfo).then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getUniProjectListFun()
         }
          res.list.map(v => {
            this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
            this.structureType.forEach(t => {
              if (v.jglx === t.bm) {
                v.jglxName = t.mc
              }
              return
            })
            return
          })
          this.uniProjectList = res.list
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 根据单位工程id获取案卷列表
    getFilesProjectListFun() {
      const that = this
      this.fileList = []
      this.queryInfo = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        ajtm: this.ajtm,
        ajdh: this.ajdh,
        project_id: this.engineering_id,
        zt:this.zt
      }
      console.log(this.queryInfo)
      getOfflineFileslistProjectId(this.queryInfo).then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getFilesProjectListFun()
         }
          res.list.map(v => {
            // v.cfwz = v.ajk + v.ajl + v.ajg + v.ajc + v.ajx
             this.file_status.forEach(t =>{
              if (v.zt === t.dict_code) {
                v.ztName = t.dict_name
              }
              return
            })
            this.fileCategory.forEach(t => {
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
            this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
            this.secretGrade.forEach(t => {
              if (v.mj === t.bm) {
                v.mjName = t.mc
              }
              return
            })
              console.log(v.ztlx)
            if (v.ztlx.indexOf("#") != -1 ) {
              let ztlxArr = v.ztlx.split('#')
                ztlxArr.forEach((n,index) =>{
                  if (index == 0 ) {
                    this.ajcarrierType.forEach(t => {
                      if (n === t.bm) {
                        v.ztlxName = t.mc
                      }
                      return
                    })
                  } else {
                    this.ajcarrierType.forEach(t => {
                      if (n === t.bm) {
                        v.ztlxName = v.ztlxName+'、'+t.mc
                      }
                      return
                    })
                    
                  }
                })
              console.log(ztlxArr)
            } else {
              this.ajcarrierType.forEach(t => {
                if (v.ztlx === t.bm) {
                  v.ztlxName = t.mc
                }
                return
              })
            }

            // this.ajcarrierType.forEach(t => {
            //   if (v.ztlx === t.bm) {
            //     v.ztlxName = t.mc
            //   }
            //   return
            // })
            return
          })
          that.fileList = res.list
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 根据案卷id获取该案卷下的文件列表
    getDocumentListFun() {
      this.documentList = []
      this.queryInfo = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        wjtm: this.wjtm,
        wjdh: this.wjdh,
        files_id: this.engineering_id,
        files_type:"files_type1",
        zt:this.zt
      }
      getOfflineFileListFilesId(this.queryInfo).then(response => {
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
            this.specifications.forEach(t => {
              if (v.gg === t.bm) {
                v.ggName = t.mc
              }
              return
            })
            this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
            this.secretGrade.forEach(t => {
              if (v.mj === t.bm) {
                v.mjName = t.mc
              }
              return
            })
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            this.language.forEach(t => {
              if (v.wz === t.bm) {
                v.wzName = t.mc
              }
              return
            })
            return
          })
          this.documentList = res.list
          this.maxFileOrder = Math.max.apply(Math,this.documentList.map(item => { return item.wjsx }))
          this.minFileOrder = Math.min.apply(Math,this.documentList.map(item => { return item.wjsx }))
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取点击节点
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    // 利用数据的层级作为唯一性判断
    handleNodeClick(data) {
      console.log(data)
      this.isActive = ''
      if (data.treeLevel == 'files') {
        this.isActive = data.treeLevel
          this.engineering_id = data.treeId
          this.currentPage = 1
          this.pageSize = 10
          this.total = 0
          this.treeId = data.treeId
          if (this.isActive === 'engineering') return this.getUniProjectListFun()
          if (this.isActive === 'project') return this.getFilesProjectListFun()
          if (this.isActive === 'files') return this.getDocumentListFun()
      } else {
        if (data.children[0].treeLevel == 'files' && data.treeLevel == 'engineering') {
        this.isActive = 'project'
        this.engineering_id = data.treeId
        this.currentPage = 1
        this.pageSize = 10
        this.total = 0
        this.treeId = data.treeId
        if (this.isActive === 'engineering') return this.getUniProjectListFun()
        if (this.isActive === 'project') return this.searchFilesListEngineeringIdFun()
        if (this.isActive === 'files') return this.getDocumentListFun()
      } else {
        if (this.isActive !== data.treeLevel) {
          this.isActive = data.treeLevel
          this.engineering_id = data.treeId
          this.currentPage = 1
          this.pageSize = 10
          this.total = 0
          this.treeId = data.treeId
          if (this.isActive === 'engineering') return this.getUniProjectListFun()
          if (this.isActive === 'project') return this.getFilesProjectListFun()
          if (this.isActive === 'files') return this.getDocumentListFun()
        }
      }
      }
      
      
    },

    // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      console.log(newSize)
      this.pageSize = newSize
      if (this.isActive === 'engineering') {
        this.getUniProjectListFun()
        return
      }
      if (this.isActive === 'project') {
        this.getFilesProjectListFun()
        return
      }
      if (this.isActive === 'files') {
        this.getDocumentListFun()
        return
      }
    },

    // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      if (this.isActive === 'engineering') {
        this.getUniProjectListFun()
        return
      }
      if (this.isActive === 'project') {
        this.getFilesProjectListFun()
        return
      }
      if (this.isActive === 'files') {
        this.getDocumentListFun()
        return
      }
    },

    // 点击单位工程专业信息著录弹层
    showDialogDescriptionInfo(row) {
      this.engineType = row.dwgclxName
      this.engineTypestring = row.dwgclx
      this.projectId = row.project_id
      setTimeout(() => {
        this.descriptionDialogVisible = true
      }, 62)
    },

    // 提交单位工程专业信息著录
    // saveProfeInfoFun(data) {
    //   if (this.engineType === '道路工程') {
    //     this.editRoadProfeInfo(data)
    //   } else if (this.engineType === '隧道工程') {
    //     this.editTunnelProfeInfo(data)
    //   } else if (this.engineType === '轨道交通工程') {
    //     this.editTrackProfeInfo(data)
    //   } else if (this.engineType === '桥涵工程') {
    //     this.editBridgeProfeInfo(data)
    //   } else if (this.engineType === '管线工程') {
    //     data.tcrq = parseTime(data.tcrq)  // 处理日期问题
    //     this.editPipelineProfeInfo(data)
    //   } else if (this.engineType === '建筑工程') {
    //     this.editBuildProfeInfo(data)
    //   }
    // },


      // 提交单位工程专业信息著录  修改判断条件
    saveProfeInfoFun(data) {
      console.log(data)
      
      if (this.engineTypestring.substring(0,2) == 'E1') {
        this.editRoadProfeInfo(data)
      } else if (this.engineTypestring.substring(0,2) == 'E4') {
        this.editTunnelProfeInfo(data)
      } else if (this.engineTypestring.substring(0,1) == 'G') {
        this.editTrackProfeInfo(data)
      } else if (this.engineTypestring.substring(0,2) == 'E2') {
        this.editBridgeProfeInfo(data)
      } else if (this.engineTypestring.substring(0,1) == 'Q') {
        data.tcrq = parseTime(data.tcrq)  // 处理日期问题
        this.editPipelineProfeInfo(data)
      } else if (this.engineTypestring.substring(0,1) == 'I') {
        this.editBuildProfeInfo(data)
      }
    },

    // 修改道路工程专业信息
    editRoadProfeInfo(data) {
      editRoadProfeInfo(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.descriptionDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改隧道工程专业信息
    editTunnelProfeInfo(data) {
      editTunnelProfeInfo(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.descriptionDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改轨道工程专业信息
    editTrackProfeInfo(data) {
      editTrackProfeInfo(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.descriptionDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改桥梁工程专业信息
    editBridgeProfeInfo(data) {
      editBridgeProfeInfo(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.descriptionDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改管线工程专业信息
    editPipelineProfeInfo(data) {
      editPipelineProfeInfo(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.descriptionDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改建筑工程专业信息
    editBuildProfeInfo(data) {
      editBuildProfeInfo(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.descriptionDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 关闭单位工程专业信息著录弹层
    descriptionDialogClosed() {
      this.descriptionDialogVisible = false
    },

    // 打开新增/编辑单位工程弹层
    showDialogFun(option, row) {
      console.log(row)
      this.projectDialogVisible = true
      this.optionObj = option
      this.projectForm = row
    },

    // 关闭弹层
    dialogClosed() {
      this.projectDialogVisible = false
      this.projectForm = {}
    },


    
      // 获取文件预览地址
      getFileUrlFun(){
        
        const q = {
          file_id:this.fjscrow.file_id
        }
        getOfflineFileOfflineFileUrlFileId(q).then(response =>{
          if (response.status === 200) {
            this.FileUrlArrs = response.data.data
            this.getDocumentListFun()
          } else {
            
          }
        })
      },

    //打开文件预览弹层

    showfileDialogFun(row){
      console.log(row)
      const that = this
      const q = {
        file_id:row.file_id
      }
      //获取文件地址
        getOfflineFileOfflineFileUrlFileId(q).then(response => {
          let fileUrlArr = response.data.data
          
            if (response.status === 200) {
              if (response.data.data === ''|| response.data === "" ||response.data.status !== 200) {
                 this.message({ message:'文件预览失败', type: 'error' })
                //  this.message({ message:response.data.message, type: 'error' })
              }else if(response.data.data.length == 0){
                this.message({ message:'文件预览失败，该文件下未挂接附件', type: 'error' })
              }else {
              let file_url = response.data.data[0].file_url
              let wjlx = file_url.slice(file_url.lastIndexOf('.') + 1)
                if (wjlx === 'pdf') {
                    const qq = {
                      dict_tag:'file_server_url'
                    }
                    //获取文件预览域名
                    querySystemDictionary(qq).then(response => { //获取访问附件的域名
                      if (response.status === 200) {
                        let url = response.data.data[0].dict_code + file_url
                        window.open(url, '_blank')
                      }
                    }).catch(error => {
                      console.log(error)
                    })
                } else {
                  const qq = {
                    dict_tag:'file_server_url'
                  }
                  //预览图片数组
                  //获取文件预览域名+地址的数组
                  querySystemDictionary(qq).then(response => { //获取访问附件的域名
                    if (response.status === 200) {
                      this.FileUrlArrs = fileUrlArr.map(function (n) {
                        return response.data.data[0].dict_code + n.file_url;
                      });
                      this.fileDialogVisible = true
                    }
                  }).catch(error => {
                    console.log(error)
                  })
                }
              }
            }
          }).catch(error => {
            console.log(error)
          })
    },
    // 案卷列表选中的列
    changeBox(val) {
      this.selectedList = val
      // val.forEach((item) => {
      //   this.selectedList.push(item.serve_menu_id)
      // })
    },

    // 文件列表选中的列
    selectedDocumentList(val) {
      // console.log(val)
      this.selectedList = []
      val.forEach((item) => {
        this.selectedList.push(item.serve_menu_id)
      })
    },


    // 新增单位工程
    addUniProjectFun(data) {
      addUniProject(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getUniProjectListFun()
          this.getSideBarFun(this.oneLevel)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 编辑单位工程
    editUniProjectFun(data) {
      const q = {
        project_id: data.project_id,
        engineering_id: data.engineering_id,
        dwgcmc: data.dwgcmc,
        dwgcdh: data.dwgcdh,
        dwgclx:data.dwgclx,
        jzmj: data.jzmj,
        gcdd: data.gcdd,
        jglx: data.jglx,
        gczj: data.gczj,
        sgdw: data.sgdw,
        gcjs: data.gcjs,
        kgsj: data.kgsj,
        jgsj: data.jgsj
      }
      console.log(data)
      console.log(q)
      editUniProject(q).then(response => {
        if (response.status === 200) {
          
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getUniProjectListFun()
          this.getSideBarFun(this.oneLevel)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 删除单位工程
    removeUniProjectFun(row) {
      this.confirm('删除后该单位工程下所有信息将一同被删除，确定将该单位工程删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          project_id: row.project_id
        }
        removeUniProject(q).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.getUniProjectListFun()
            this.getSideBarFun(this.oneLevel)
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

    // 新增案卷著录信息
    addFileFun(data) {
      addFiles(data).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getFilesProjectListFun()
          this.getSideBarFun(this.oneLevel)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 编辑案卷著录信息
    editFileFun(data) {
      const q = {
        files_id: data.files_id,
        ajtm: data.ajtm,
        yjdw: data.yjdw,
        ajlb: data.ajlb,
        qssj: data.qssj,
        zzsj: data.zzsj,
        mj: data.mj,
        bgqx: data.bgqx,
        ztlx: data.ztlx,
        ajsxh: data.ajsxh,
        jk: data.jk,
        ljr: data.ljr,
        ajshr: data.ajshr,
        shrq: data.shrq,
        fz: data.fz,
        zrz: data.zrz,
        ljrq: data.ljrq
      }
      editFiles(q).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getFilesProjectListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 删除案卷
    removeFileFun(row) {
      this.confirm('删除后该案卷下所有信息将一同被删除，确定将该案卷信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          files_id: row.files_id
        }
        removeFiles(q).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.getFilesProjectListFun()
            this.getSideBarFun(this.oneLevel)
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

    // 新增文件
    addDocumentFun(data) {
      if (data.ztlx === '' || data.ztlx === undefined) {
        this.message({ message:'载体类型不能为空', type: 'error' })
        return
      }
      addDocument(data).then(response => {
      
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getDocumentListFun()
          this.getSideBarFun(this.oneLevel)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 编辑文件
    editDocumentFun(data) {
     
      const q = {
        file_id: data.file_id,
        files_id: data.files_id,
        wjdh:data.wjdh,
        wjtm: data.wjtm,
        zrz: data.zrz,
        bgqx: data.bgqx,
        mj: data.mj,
        ztlx: data.ztlx,
        sl: data.sl,
        gg: data.gg,
        wz: data.wz,
        fz: data.fz,
        wjsx: data.wjsx
      }
       if (data.ztlx === '' || data.ztlx === 'undefined') {
        this.message({ message:'载体类型不能为空', type: 'error' })
        return
      }
      editDocument(q).then(response => {
     
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getDocumentListFun()
          this.getSideBarFun(this.oneLevel)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 删除文件
    removeDocumentFun(row) {
      const that = this
      const dh = row.xmgcdh + row.dwgcdh + '-' + row.ajdh + '-' + row.wjdh
      this.confirm('删除后该文件下所有信息将一同被删除，确定将该文件信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          remove_type: "1",
          file_id: row.file_id
        }
        removeDocument(q).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            that.getDocumentListFun()
            this.getSideBarFun(this.oneLevel)
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

    // 案卷类别
    getFileCategory() {
      const q = {
        bm: "AJLB_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.fileCategory  = res
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
    // 案卷级载体类型
    getAjCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.ajcarrierType  = res
        }
      }).catch(error => {
        console.log(error)
      })
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
    }
  },

}
</script>

<style lang="less">
.el-card__body {
  height: 100%;
}
.el-tree{
      overflow-x: scroll;
      height: 95% !important;
      >.el-tree-node{
        /*设置横向滚动条*/
        height: 100%;
        min-width: 100%;
        display: inline-block;
      }
    }

.btns{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .el-button+.el-button{
    margin-left: 5px;
  }
  .btn{
    margin: 5px;
  }
}
</style>
<style lang="less">
.fjform {
  display: inline-block;
  margin: 0 10px;
    .el-form-item {
      margin-bottom: 0 !important;
    }
}
 
.form{
  .documentForm,.fileForm,.engineering{
    .remarks,.document-title,.file-title,.file-dh,.engineering-title{
      width:100%;
      display: flex !important;
      .el-form-item__content{
        flex: 1;
      }
    }
   
    .upload-box{
      width:100%;
      margin-bottom: 0 !important;
      display: flex !important;
      .el-form-item__content{
        flex: 1;
      }
    }
    .btn{
      width:100%;
      margin-top:20px;
      margin-right:0;
      display: flex;
      justify-content: center;
    }
  }
}

</style>

<style lang="less" scoped>
.box-card {
  height: 100%;
  box-sizing: border-box;
}
.description{
  .el-row{
    margin-bottom:10px;
  }
  .main-card{
    .box-main{
      border:1px solid #EBEEF5;
      margin-left:10px;
      padding:0;
      .box-main-card{
        height:100px;
        border:0 none;
        margin-bottom: 10px;
        box-shadow: none;
      }
    }
  }
}
.btn{
  display: inline-block;
  margin-right:10px;
}

 .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .table-td-thumb-from-item {
        display: block;
        max-width: 200px;
        max-height: 200px;
    }


    .avatar {
        min-width: 100px;
        min-height: 100px;
        max-width: 80%;
        max-height: 80%;
        width: auto;
        height: auto;
        display: block;
        cursor: pointer;
        border: 1px solid #eee;
    }

    .el-image__inner{
        width: auto;
        height: auto;
    }

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
