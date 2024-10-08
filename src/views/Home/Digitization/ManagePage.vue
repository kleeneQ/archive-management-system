<template>
  <div class="description">
     <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item><el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button></el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案管理</el-breadcrumb-item>
        <el-breadcrumb-item>档案著录</el-breadcrumb-item>
        <el-breadcrumb-item>管理类著录单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-row>
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row> -->
    <el-card class="main-card">
      <el-container>
        <el-aside width="300px">
          <el-card class="box-card" style="max-height:793px">

            <el-tree
              :data="treeData"
              :props="defaultProps"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              ref="tree"
              node-key="treeId"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </el-aside>
        <el-main class="box-main">
          <el-card class="box-main-card">
            <el-row>
              <el-col :span="24">
                <!-- 案卷 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'engineering'">
                  <el-form-item label="案卷名称">
                    <el-input clearable v-model="ajtm" placeholder="请输入案卷名称" @change="getFilesProjectListFun"></el-input>
                  </el-form-item>
                  <el-form-item label="案卷档号">
                    <el-input clearable v-model="ajdh" placeholder="请输入案卷档号" @change="getFilesProjectListFun"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryUnitproject('工程案卷')">查询</el-button>
                  </el-form-item>

                </el-form>
                <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'files'">
                  <el-form-item label="文件题名">
                    <el-input clearable v-model="wjtm" placeholder="请输入文件题名"></el-input>
                  </el-form-item>
                  <el-form-item label="文件档号">
                    <el-input clearable v-model="wjdh" placeholder="请输入文件档号"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryUnitproject('案卷文件')">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

          </el-card>
           <!-- 列表区 -->
          <el-card>
            <!-- 项目案卷列表 -->
            <div class="eltablebox">
              <el-col>
                <!-- 案卷 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'engineering'">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="showDialogFun('新增案卷著录', {})">新增案卷著录</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入案卷')">批量导入案卷</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="warning" icon="el-icon-setting" @click="BatchAuditFiles('提交审核')">批量提交审核</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button  class="btnedit" type="primary"  icon="el-icon-sort"  @click="btneditFileOrderArrangementFilesIdFun('批量排序案卷文件')">批量排序案卷文件</el-button>
                  </el-form-item>

               <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('案卷封面')">案卷封面</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('卷内目录')">卷内目录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('备考表')">备考表</el-button>
            </el-form-item>
                  <el-form-item>
                    <el-button type="danger" icon="el-icon-delete" @click="batchRemoveFilesFun('批量删除案卷')">批量删除案卷</el-button>
                  </el-form-item>
                </el-form>
                <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === 'files'">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="showDialogFun('新增文件', {})">新增文件</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-upload2" @click="importExcelFile('批量导入文件')">批量导入文件</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" icon="el-icon-delete" @click="batchRemoveFileFun('批量删除文件')">批量删除文件</el-button>
                  </el-form-item>
                </el-form>
                </el-col>
            <el-table
              v-if="isActive === 'engineering'"
              :data="fileList"
              key="two"
              border
              style="width: 100%"
              @selection-change="changeBox"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                fixed
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
                prop="ajsxh"
                label="案卷顺序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="ajdh"
                label="案卷档号"
              show-overflow-tooltip
              width="300">
              <template slot-scope="scope">
                <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}</div>
                <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}</div>
              </template>
              </el-table-column>
              <el-table-column
                prop="ajtm"
                label="案卷题名"
                width="300">
              </el-table-column>
              <el-table-column
                prop="ajlbName"
                label="案卷类别"
                width="200"
              >
              </el-table-column>
              <el-table-column
                prop="yjdw"
                label="移交单位"
                width="300">
              </el-table-column>
              <el-table-column
                prop="jk"
                label="脊宽"
                width="200">
              </el-table-column>
              <el-table-column
                prop="mjName"
                label="密级"
                width="200">
              </el-table-column>
              <el-table-column
                prop="bgqxName"
                label="保管期限"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="qssj"
                label="起始时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.qssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="zzsj"
                label="终止时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.zzsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="cfwz"
                label="存放位置"
                width="200">
              </el-table-column>
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
                  {{scope.row.ljrq | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="450"
               fixed="right"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showDialogFun('编辑案卷著录', scope.row)">编辑</el-button>
                  <el-button type="success" size="small" @click="ZIPupload(scope.row)">导入案卷ZIP包</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">提交审核</el-button>
                  <el-button type="warning" size="small" v-show="scope.row.zt !== 'file_status1'" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
                  <el-button type="danger" size="small" @click="removeFileManageFun(scope.row)">删除</el-button>
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
              <el-table-column
                fixed
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                   <div v-if="scope.row.wjdh == '' || scope.row.wjdh == null "></div>
                  <div v-else>
                    <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                    <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="bgqxName"
                label="保管期限"
                width="200">
              </el-table-column>
              <el-table-column
                prop="sl"
                label="数量"
                width="200">
              </el-table-column>
              <el-table-column
                prop="mjName"
                label="密级"
                width="200">
              </el-table-column>
              <el-table-column
                prop="wzName"
                label="文种"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                width="300">
              </el-table-column>
              <el-table-column
                prop="xcsj"
                label="形成时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.xcsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="lrsj"
                label="著入时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="文件顺序"
                width="250">
                  <template slot-scope="scope">
                  <div class="btns">
                    <template v-if="scope.row.wjsx == minFileOrder || scope.row.wjsx === '1' ">
                      <el-button class="btn el-icon-top" type="primary" size="mini" disabled>上移</el-button>
                    </template>
                    <template v-else>
                      <el-button class="btn el-icon-top" type="primary" size="mini" @click="moveUpFun(scope.row)">上移</el-button>
                    </template>
                    <template v-if="scope.row.wjsx == maxFileOrder ">
                      <el-button class="btn el-icon-bottom" type="primary" size="mini" disabled>下移</el-button>
                    </template>
                    <template v-else>
                      <el-button class="btn el-icon-bottom" type="primary" size="mini" @click="moveDownFun(scope.row)">下移</el-button>
                    </template>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="350"
               fixed="right"

                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showDialogFun('编辑文件', scope.row)">编辑</el-button>
                  <el-button type="primary" size="small" @click.native="showfileDialogFun(scope.row)">文件预览</el-button>
                  <el-button type="primary" size="small"  v-if="scope.row.dzwjmjdz !== '1'" @click="Uploadimg(scope.row.file_id,scope.$index,scope.row)">上传附件</el-button>
                  <el-button type="primary" size="small"  v-if="scope.row.dzwjmjdz === '1'" @click="Uploadimg(scope.row.file_id,scope.$index,scope.row)">重新上传</el-button>
                  <el-button type="danger" size="small" @click="removeDocumentFun(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            </div>
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
          </el-card>
        </el-main>
      </el-container>
    </el-card>
    <!-- 新增单位工程/案卷/文件弹层 -->
    <el-dialog
      :title="optionObj"
      :visible.sync="projectDialogVisible"
      width="70%"
      @close="dialogFilesClosed"
    >
      <ManageForm :source="isActive" :optionObj="optionObj" :bool="projectDialogVisible" :row="projectForm" @saveFun="saveFun" @cancel="dialogFilesClosed"></ManageForm>
    </el-dialog>
    <!-- 选择导入文件的弹层 -->
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
    <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />
             
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

    <!-- 导入案卷ZIP包 弹层 -->
     <el-dialog
      :title="'导入案卷ZIP包'"
      :visible.sync="ZIPfjscDialogVisible"
      width="60%"
      @close="dialogClosed"
    >
   <filesZIPUpload
      :ZIPfileNumLimit="ZIPfileNumLimit"
      :ZIPfileSize="ZIPfileSize"
      :ZIPchunkSize="ZIPchunkSize"
      :uploadSuffixUrl="uploadSuffixUrl"
      :options="options"
      :ZIPfileListData="filesList"
      :fjscrow="fjscrow"
      :zipfilesid="zipfilesid"
      @childFn="parentFn"
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

      <!-- 案卷封面、卷内目录、备考表 预览弹层 -->
     <el-image-viewer  
      v-if="DialogVisibleimgview"
      :on-close="()=>{DialogVisibleimgview=false}"
      :url-list="FileUrlArrs" />


      <!-- 2022.10.12 新上传单个文件ZIP 组件  B-->
        <global-uploader/> 
      <!-- 2022.10.12 新上传单个文件ZIP 组件  E-->

      <!-- 2022.10.17 新上传文件夹ZIP 组件  B-->
        <global-uploaderBatch/> 
      <!-- 2022.10.17 新上传文件夹ZIP 组件  E-->


     <!-- 2022.10.12 新上传单个文件img 组件  B-->
          <div class="UploadImgbox" v-show="UploadImgboxflag">
            <UploadImg
            :url="2"
            :lableName="'authorizationLetter'"
            @upload='receiveFile'
            :imgUrl='ruleForm.imgUrl' />
          </div>
      <!-- 2022.10.12 新上传单个文件img 组件  E-->


  </div>
</template>

<script>
import ManageForm from "@/components/description/ManageForm"
import {
  getSideBar, // 数字化获取侧边栏数据
  getDigitFilesGetUrl,
} from "@/api/digitization/engineeringAPI"
import {
  getFileManageList,
  addFileManage,
  editFileManage,
  removeFileManage
} from "@/api/digitization/manageFileAPI"
import {
  getDocumentList,
  addDocument,
  editDocument,
  removeDocument,
  getFileUrl,
  batchRemoveFile,
} from "@/api/digitization/documentApi"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  parseTime,
  modifiTrees,
    moveUp,
  moveDown,
  modifiTreesdigit
} from "@/utils/index"
import {
  downloadArchivesProcess,
  importDigitEngineering,
  importManage,
  importDigitProject,
  importDigitFiles,
  importDigitFile,
} from '@/api/archivalDescription'
import {
  uploadFile,
  checkUploadFile,
  mergeUploadFile,
  unzipFile,
  bindFile,
  convertPdfFile
} from '@/api/digitization/uploadFile'
import {
  btneditFileOrderArrangementFilesId,
} from "@/api/digitization/fileDescription"

import {
  setManageAudit, // 管理类案卷提交审核
  getManageAuditDetail, // 管理类案卷审核详情
} from "@/api/digitization/manageFileAPI"
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import request from '@/utils/request'
import YlUpload from '@/components/upload'
import WebUpload from '@/components/upload/webupload'
import filesZIPUpload from '@/components/upload/filesZIPUpload'
import audit from '@/components/audit/audit'
import AuditDetail from '@/components/audit/AuditDetail'

import Bus from '@/assets/js/bus';
import GlobalUploader from '@/components/upload/GlobalUploader'
import GlobalUploaderBatch from '@/components/upload/GlobalUploaderBatch'

import UploadImg from '@/components/upload/UploadImg'

export default {
  components: {
     UploadImg,
    GlobalUploader,
    GlobalUploaderBatch,
    ManageForm: ManageForm,
    YlUpload:YlUpload,
    WebUpload,
    filesZIPUpload,
    audit,
    AuditDetail,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data() {
    return {
      oneLevel: '',
      engineering_id: '', // 项目id
      optionObj: '',  // 操作对象(单位工程/案卷/文件)
      queryInfo: {},
      total: 0,
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      ajtm: '',
      ajdh: '',
      wjtm: '',
      wjdh: '',
      treeData: [],  // 左侧树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isActive: 'engineering',
      uniProjectList: [],  // 工程列表
      projectId: '',
      fileList: [], // 案卷列表
      selectedList: [], // 选中的案卷数据
      documentList: [], // 文件列表
      title: '新增',
      projectDialogVisible: false,
      fileDialogVisible:false, //文件预览弹层图层 显示隐藏判断条件
      fjscDialogVisible:false, //上传附件弹窗图层 显示隐藏判断条件
      projectForm: {},
      fjscrow:{},//上传附件 所点击文件条 内容数据
      uniProjectType: [],  // 单位工程类型
      structureType: [],  // 结构类型
      fileCategory: [], // 案卷类别
      storagePeriod: [], // 保管期限
      secretGrade: [], // 密级
      carrierType: [], // 载体类型
      ajcarrierType:[],//案卷级载体类型
      specifications: [], // 规格
      language: [], // 文种
      uploadUrl:'',//上传文件地址
      FileUrlArrs: [ //图片类型 文件预览
        ],
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
        },

         ZIPfjscDialogVisible:false,//导入ZIP包弹层图层 显示隐藏判断条件
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
        auditformdesc:'', //审核描述
        filesTypeFlag:'',//工程类或是管理类区分
        treeId:'',
      DialogVisibleimgview:false,//预览图片文件 弹层
      fileURLym:'',//预览文件域名
        ruleForm:{
        imgUrl:'',
      },
      UploadImgboxflag:false,
    }
  },
  watch: {
       AuditDialogVisible:function(newQuestion, oldQuestion){
      if (newQuestion === true) {
        this.auditformdesc = ''
      } else if (newQuestion === false) {
        this.getFilesProjectListFun() //刷新案卷列表
        this.getFileUrlFun() 
      }
    },

  },
  created() {
    this.engineering_id = this.$route.query.engineering_id
    this.oneLevel = this.$route.query.engineering_id
    this.getSideBarFun(this.oneLevel)
    this.getUniProjectType()  // 单位工程类型
    this.getStructureType()  // 结构类型
    this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.getCarrierType()  // 文件级载体类型
    this.getAjCarrierType() //案卷级载体类型    
    this.getSpecifications()  // 规格
    this.getLanguage()  // 文种
    this.getFilesProjectListFun()
    this.setUrl() //获取请求后台路径
    this.getSystemDictionary()//案卷状态
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  mounted() {
     
      // 文件选择后的回调chunkNumber
      Bus.$on('fileAdded', (a) => {
        console.log('文件已选择',a)
      });

      // 文件上传成功的回调
      Bus.$on('fileSuccess', (v) => {
        // this.mergeUploadFileFun(v.chunk)
        this.getDocumentListFun()
        this.message({ message: v, type: 'success' })
        console.log('文件上传成功',v)
      }); 

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
      Bus.$off('fileAdded');
      Bus.$off('fileSuccess');
      Bus.$off('filesAdded');
      Bus.$off('filesSuccess');
    },

  methods: {    
    //2023.8.11 新上传组件方法 B
      //打开文件选择框  上传按钮
      Uploadimg(id,index,row) {
        //index为表格对应的行数
        this.rowIndex = index;
        this.file_id = id
        // 打开文件选择框
        Bus.$emit('openUploadimg', {
          file_id: id,  // 传入的参数
          total_num: '0',  // 传入的参数
          ajtm:row
        })
      },

     receiveFile(data){
      //如果设置了默认图片请注意data返回值
      //data返回值是一个数组，数组中如果设置了默认值data返回的数据会存在对象和文件流两种数据类型
      //如果数据中存在name就是一个文件流，如果没有就是设置的默认值的数据
      this.UploadImgboxflag = true
    },

    //2023.8.11 新上传组件方法 E

    
    //2022.10.17 新上传导入ZIP组件方法 B
      //打开文件选择框  上传按钮
       ZIPupload(files) {
         console.log(files)
        // this.file_id = id
        // 打开文件选择框
        Bus.$emit('openUploaderFiles', {
          files_id: files.files_id,  // 传入的参数
          files_name:files.ajsxh+'、'+files.ajtm
        })
      },

    //2022.10.17 新上传导入ZIP组件方法 E


    //2022.10.12 新上传组件方法 B
      //打开文件选择框  上传按钮
      upload(id) {
        this.file_id = id
        // 打开文件选择框
        Bus.$emit('openUploader', {
          file_id: id,  // 传入的参数
        })
      },

    //2022.10.12 新上传组件方法 E

          //预览
    showDialoimgview(data){
      const that = this
      that.FileUrlArrs = []
      if(this.selectedList.length < 1) return  this.message({ message: "请勾选需要查看的案卷", type: 'error' })
      const q = {
        files_id:this.selectedList[0].files_id
      }
      getDigitFilesGetUrl(q).then(response =>{
        if (response.status !== 200) return this.message({ message: message, type: 'error' })
        if (response.status === 200) {
          // var str = response.data.data.digitFileCover[0].file_url 
          // let index = str.lastIndexOf(".")
          // str = str .substring(index+1,str.length);
          if (data === '案卷封面') {
              if (response.data.data.digitFileCover.length !== 0) {
                var url = that.fileURLym + response.data.data.digitFileCover[0].file_url
                window.open(url+"#toolbar=0", '_blank')
              }else {
                this.message({ message: "暂无案卷封面", type: 'error' })
              }
            } else if (data === '卷内目录') {
               if (response.data.data.digitFileCatalogue.length !== 0) {
                var url = that.fileURLym + response.data.data.digitFileCatalogue[0].file_url
                window.open(url+"#toolbar=0", '_blank')
              }else {
                this.message({ message: "暂无卷内目录", type: 'error' })
              }
            } else if (data === '备考表') {
              if (response.data.data.digitFileReference.length !== 0) {
                var url = that.fileURLym + response.data.data.digitFileReference[0].file_url
                window.open(url+"#toolbar=0", '_blank')
              }else {
                this.message({ message: "暂无备考表", type: 'error' })
              }
            }
        }
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
        //批量编辑案卷文件顺序
    btneditFileOrderArrangementFilesIdFun(){
      var files_idstring = ''
      console.log(this.selectedList)
      this.selectedList.forEach(item =>{ //拼接案卷ID
        if (files_idstring === '') {
          files_idstring = item.files_id
        } else {
          files_idstring = files_idstring + "#" + item.files_id
        }
      })
       if (files_idstring === '') return this.message({ message: "请选择需要排序的案卷", type: 'error' })

      const q ={
        files_id:files_idstring
      }
      btneditFileOrderArrangementFilesId(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.message({message: message, type:'success'})
        }
      })
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
        files_type:"files_type2"
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
      console.log(row)
      this.auditfiles = row.files_id
      this.filesTypeFlag = row.files_type
      this.AuditDialogVisible = true
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
      const q = {
        files_id:row.files_id 
      }
      getManageAuditDetail(q).then(response =>{
        this.AuditDetailData = response.data.data
        this.AuditDetailDialogVisible = true
      })
    },
    //案卷ZIP包导入弹层
    showDialogImprotZIPFun(row){
      console.log(row)
      // this.importZIPDialogVisible = true
      this.ZIPfjscDialogVisible = true
      this.zipfilesid = row.files_id
    },

    //获取子组件 附件上传组件的显示隐藏条件
    parentFn(payload) {
        console.log(payload)
        this.fjscDialogVisible = payload;
        this.ZIPfjscDialogVisible = payload;
      },
      //附件上传弹层
      uploadfjFun(row){
        console.log(row)
        this.fjscrow = {}
        this.fjscrow = row
        this.fjscDialogVisible = true
         const q = {
          remove_type: 2,
          file_id: row.file_id,
        }
    removeDocument(q).then(response => {
      if (response.data.status === 200) {
      }
    })
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

        // 获取文件预览地址
      getFileUrlFun(){
        
        const q = {
          file_id:this.fjscrow.file_id
        }
        getFileUrl(q).then(response =>{
          if (response.status === 200) {
            this.FileUrlArrs = response.data.data
            this.getDocumentListFun()
          } else {
            
          }
        })
      },
    //打开文件预览弹层
    // 'AJJZTLX_DIC-01' 文字
    // 'AJJZTLX_DIC-02' 图纸
    // 'AJJZTLX_DIC-03' 照片
    // 'AJJZTLX_DIC-04' 扫描光盘
    // 'AJJZTLX_DIC-05' 录像光盘
    // 'AJJZTLX_DIC-99' 其他

   showfileDialogFun(row){
      const that = this
      console.log(row)
      const q = {
        file_id:row.file_id
      }
      //获取文件地址
        getFileUrl(q).then(response => {
          let fileUrlArr = response.data.data
          const that = this
            if (response.status === 200) {

              if (response.data.data.length == 0 || response.data.data === ''|| response.data === "" ||response.data.status !== 200) {
                 this.message({ message:'文件预览失败', type: 'error' })
                //  this.message({ message:response.data.message, type: 'error' })
                 return
              } else {
              let file_url = response.data.data[0].file_url
              let wjlx = file_url.slice(file_url.lastIndexOf('.') + 1)
                if (wjlx === 'pdf') {
                    const qq = {
                      dict_tag:'file_server_url'
                    }
                    let url = that.fileURLym + file_url + "?"+ new Date().getTime()
                    window.open(url, '_blank')
                } else {
                      this.FileUrlArrs = fileUrlArr.map(function (n) {
                        return that.fileURLym + n.file_url +"?"+ new Date().getTime();
                      });
                      this.fileDialogVisible = true
                }
              }
            }
          }).catch(error => {
            console.log(error)
          })
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
      if(this.importTitle === '批量导入案卷'){
        importManage(formData).then(response => {
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

       // 上移方法
    moveUpFun(row) {
      console.log(this.documentList, row,this.engineering_id)
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
      if (this.treeId == '')  {
        this.treeId = data
      }
      getSideBar(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          const newTress = modifiTreesdigit(res)
          this.treeData = newTress
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
      if (target === '工程案卷') {
        this.getFilesProjectListFun()
      }else if (target === '案卷文件') {
        this.getDocumentListFun()
      }
      
    },

    // 新增（编辑）单位工程/案卷/文件
    saveFun(data) {
      console.log(this.engineering_id)
      console.log(data)
      // 项目工程id
      // console.log(this.optionObj)
      if (this.optionObj === '新增案卷著录') {
        data.engineering_id = this.engineering_id
        this.addFileManageFun(data)
      } else if (this.optionObj === '编辑案卷著录') {
        data.engineering_id = this.engineering_id
        this.editFileManageFun(data)
      } else if (this.optionObj === '新增文件') {
        data.files_id = this.engineering_id
        this.addDocumentFun(data)
      } else if (this.optionObj === '编辑文件') {
        data.files_id = this.engineering_id
        this.editDocumentFun(data)
      }
    },

    // 根据单位工程id获取案卷列表
    getFilesProjectListFun() {
      this.fileList = []
      this.queryInfo = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        ajtm: this.ajtm,
        ajdh: this.ajdh,
        engineering_id: this.engineering_id
      }
      getFileManageList(this.queryInfo).then(response => {
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

                 if(v.ztlx == null ) return
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

            return
          })
          this.fileList = res.list
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
        files_type:"files_type2"
      }
      getDocumentList(this.queryInfo).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getDocumentListFun()
         }
          console.log(this.carrierType)
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
    // 根据点击的是属于项目级/案卷级的不同，调用不同的接口
    // 利用数据的层级作为唯一性判断
    handleNodeClick(data) {
      this.isActive = ''
      if (this.isActive !== data.treeLevel) {
        this.isActive = data.treeLevel
        this.engineering_id = data.treeId
        this.currentPage = 1
        this.pageSize = 10
        this.total = 0
        this.treeId = data.treeId
        if (this.isActive === 'engineering') return this.getFilesProjectListFun()
        if (this.isActive === 'files') return this.getDocumentListFun()
      }
    },

    // 每页显示条数改变
    // 根据点击的是属于项目级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      this.pageSize = newSize
         if (this.isActive === 'engineering') return this.getFilesProjectListFun()
        if (this.isActive === 'files') return this.getDocumentListFun()
    },

    // 显示页数改变
    // 根据点击的是属于项目级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      if (this.isActive === 'engineering') return this.getFilesProjectListFun()
      if (this.isActive === 'files') return this.getDocumentListFun()
    },

    // 打开新增/编辑单位工程弹层
    showDialogFun(option, row) {
      this.projectDialogVisible = true
      this.optionObj = option
      this.projectForm = row
    },
    // 关闭弹层 案卷
    dialogFilesClosed() {
      this.projectDialogVisible = false
      this.getFilesProjectListFun()
      this.projectForm = {}
    },

    // 关闭弹层
    dialogClosed() {
      this.projectDialogVisible = false
      this.getDocumentListFun()
      this.projectForm = {}
    },

    // 案卷列表选中的列
    changeBox(val) {
      // console.log(val)
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
        this.selectedList.push(item.file_id)
      })
    },

    // 新增案卷著录信息
    addFileManageFun(data) {
      addFileManage(data).then(response => {
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
    editFileManageFun(data) {
      console.log(data)
      const q = {
        engineering_id:data.engineering_id,
        files_id: data.files_id,
        ajtm: data.ajtm,
        yjdw: data.yjdw,
        ajlb: data.ajlb,
        qssj: data.qssj,
        zzsj: data.zzsj,
        mj: data.mj,
        bgqx: data.bgqx,
        bzdw: data.bzdw,
        ztlx: data.ztlx,
        ajsxh: data.ajsxh,
        jk: data.jk,
        ljr: data.ljr,
        ajshr: data.ajshr,
        shrq: data.shrq,
        fz: data.fz,
        zrz: data.zrz,
        ljrq: data.ljrq,
        xmgcdh:data.xmgcdh
      }
      editFileManage(q).then(response => {
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
   //批量删除案卷
batchRemoveFilesFun(){
  if(this.selectedList.length == 0) return this.message({ message: "请选择需要删除的案卷", type: 'warning' })
     this.confirm('删除后案卷下所有信息将一同被删除，确定将案卷信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
        var files_idstring = ''
      console.log(this.selectedList)
      this.selectedList.forEach(item =>{ //拼接案卷ID
        if (files_idstring === '') {
          files_idstring = item.files_id
        } else {
          files_idstring = files_idstring + "#" + item.files_id
        }
      })

      const q ={
        files_id:files_idstring
      }
        removeFileManage(q).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.getFilesProjectListFun()
            this.getSideBarFun(this.oneLevel)
          this.selectedList = []
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
    // 删除案卷
    removeFileManageFun(row) {
      this.confirm('删除后该案卷下所有信息将一同被删除，确定将该案卷信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          files_id: row.files_id
        }
        removeFileManage(q).then(response => {
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
      console.log(data)
      const q = {
        files_id: data.files_id,
        file_id: data.file_id,
        wjtm: data.wjtm,
        wjdh:data.wjdh,
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
      editDocument(q).then(response => {
        if (response.status === 200) {
          const { status, message } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.message({ message, type: 'success' })
          this.projectDialogVisible = false
          this.getDocumentListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 批量删除文件
    batchRemoveFileFun(){
      console.log(this.selectedList)
      if(this.selectedList.length == 0) return this.message({ message: "请选择需要删除的文件", type: 'warning' })
      this.confirm('删除后该文件下所有信息将一同被删除，确定将该文件信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
           
        let fileIdarr = this.selectedList.join("#")
        const q ={
          file_id:fileIdarr,
        }
        batchRemoveFile(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: message, type: 'success' })
          console.log(res)
          this.getDocumentListFun()
          this.selectedList = []
          }
        })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    // 删除文件
    removeDocumentFun(row) {
      this.confirm('删除后该文件下所有信息将一同被删除，确定将该文件信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          remove_type: 1,
          file_id: row.file_id,
        }
        removeDocument(q).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.getDocumentListFun()
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

    // 单位工程类型
    getUniProjectType() {
      const q = {
        bm: "DWGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.uniProjectType  = res
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
    // 载体类型
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
  }
}
</script>

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
