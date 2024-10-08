<template>
  <div class="box" >
    <div class="head">
      <div class="head1"></div>
      <div class="head2" @click="goBackPage"></div>
    </div>
    <div class="detailbox">
      <div class="detailboxright1">
        <div class="detailboxrightTop clearfix">
          <div class="detailboxrightToptitle">添加利用情况</div>
          <div class="detailboxrightTopRow">
            <div class="detailboxrightTopRow4">
              <div class="datacol">文字卷 <span>{{rowsl.wz}}</span>页</div>
              <div class="datacol">图纸   <span>{{rowsl.tz}}</span>张</div>
              <div class="datacol">照片   <span>{{rowsl.zp}}</span>张</div>
              <div class="datacol">光盘   <span>{{rowsl.gp}}</span>张</div>
              <div class="datacol">录像带  <span>{{rowsl.lxd}}</span>张</div>
            </div>
            <div class="detailboxrightTopRowPs">注：光盘的利用请到1507室联系查档管理员进行复制</div>
          </div>
          <div class="detailboxrightTopbtnbox">
            <div class="detailboxrightTopbtn" @click="submitUtilizeFilesVerifyFun">提交调卷利用审核</div>
          </div>
        </div>
        <div class="detailboxrightbottom">
              <!-- 列表区 -->
              <div class="eltablebox">
          <el-row>
              <el-col :span="24">
                <!-- 声像档案 -->
                  <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="110px">
                    <el-form-item label="题名">
                      <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入题名" @change="getUtilizeAudioPickFileLisFun"></el-input>
                    </el-form-item>
                  <el-form-item label="拍摄起始时间">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择拍摄起始时间" v-model="queryInfo.start_time" @change="getUtilizeAudioPickFileLisFun"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="拍摄终止时间">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择	拍摄终止时间" v-model="queryInfo.end_time" @change="getUtilizeAudioPickFileLisFun"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="拍摄者">
                    <el-input clearable v-model="queryInfo.psz" placeholder="请输入拍摄者" @change="getUtilizeAudioPickFileLisFun"></el-input>
                  </el-form-item>
                  <el-form-item label="拍摄地点">
                    <el-input clearable v-model="queryInfo.psdd" placeholder="请输入拍摄地点" @change="getUtilizeAudioPickFileLisFun"></el-input>
                  </el-form-item>
                  <el-form-item label="人物">
                    <el-input clearable v-model="queryInfo.rw" placeholder="请输入人物" @change="getUtilizeAudioPickFileLisFun"></el-input>
                  </el-form-item>
                  <el-form-item label="事件">
                    <el-input clearable v-model="queryInfo.sj" placeholder="请输入事件" @change="getUtilizeAudioPickFileLisFun"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getUtilizeAudioPickFileLisFun">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!-- 声像列表 -->
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
                type="selection"
                width="55">
              </el-table-column>
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
                label="题名"
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
                width="300"
                fixed="right"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit"  @click="detailsVisibleFun(scope.row)">详 情</el-button>
                  <el-button type="primary" size="small" @click.native="getAudioUtilizePickFileUrlFileIdFun(scope.row)">预 览</el-button>
                  <el-button type="primary" size="small" :disabled='addUtilizeflag' @click.native="dialogMachineUtilizeFileSaveVisibleFun(scope.row)">添加利用</el-button>
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
        </div>
      </div>
    </div>


    <!-- 详情弹层 B-->
    <el-dialog
      title="详情"
      :visible.sync="detailsVisible"
      width="60%"
    >
       <table class="mailTable" >
          <tr >
            <td class="column">题名：</td>
            <td colspan="3">{{fileDetails.wjtm}}</td>
          </tr>
          <tr >
              <td class="column">档号：</td>
              <td >{{fileDetails.wjdh}}</td>
              <td class="column">总登记号：</td>
              <td >{{fileDetails.zdjh}}</td>
            </tr>
            <tr >
              <td class="column">拍摄者：</td>
              <td >{{fileDetails.psz}}</td>
              <td class="column">拍摄地点</td>
              <td >{{fileDetails.psdd}}</td>
            </tr>
            <tr >
              <td class="column">事件：</td>
              <td >{{fileDetails.sj}}</td>
              <td class="column">拍摄时间：</td>
              <td >{{fileDetails.pssj | formatDate}}</td>
            </tr>
          <tr >
            <td class="column">拍摄者单位：</td>
            <td >{{fileDetails.pszdw}}</td>
            <td class="column">色别：</td>
            <td >{{fileDetails.sbName}}</td>
          </tr>
          <tr >
            <td class="column">底片规格：</td>
            <td >{{fileDetails.dpggName}}</td>
            <td class="column">片型：</td>
            <td >{{fileDetails.pxName}}</td>
          </tr>
          <tr >
            <td class="column">底片位置：</td>
            <td >{{fileDetails.dpwz}}</td>
            <td class="column">底片编号：</td>
            <td >{{fileDetails.dpbh}}</td>
          </tr>
          <tr >
            <td class="column">人物：</td>
            <td >{{fileDetails.rw}}</td>
            <td class="column">编制日期：</td>
            <td >{{fileDetails.bzrq | formatDate}}</td>
          </tr>
          <tr >
            <td class="column">存放位置：</td>
            <td >{{fileDetails.cfwz}}</td>
            <td class="column">分辨率：</td>
            <td >{{fileDetails.fbl}}</td>
          </tr>
          <tr >
            <td class="column">文件大小：</td>
            <td >{{fileDetails.wjdx}}</td>
            <td class="column">内容：</td>
            <td >{{fileDetails.nr}}</td>
          </tr>
          <tr >
            <td class="column">库存地址：</td>
            <td >{{fileDetails.kcdz}}</td>
            <td class="column">光盘号：</td>
            <td >{{fileDetails.gph}}</td>
          </tr>
          <tr >
            <td class="column">联系电话：</td>
            <td >{{fileDetails.lxdh}}</td>
            <td class="column">入馆时间：</td>
            <td >{{fileDetails.rgsj}}</td>
          </tr>
          <tr >
            <td class="column">备注：</td>
            <td colspan="3">{{fileDetails.fz}}</td>
          </tr>
        </table>
    </el-dialog>
    <!-- 详情弹层 E-->

      <!-- 添加调卷 弹层  B -->
        <el-dialog :title="'添加调卷'"  :visible.sync="dialogPageVisibleFiles" width="45%">
          <!-- <div style="color:#D9001B;font-size:15px;">请按照如下格式添加需要调卷利用的文件页码：</div>
          <div style="color:#D9001B;font-size:15px;">1、如连续页码，请使用 ”~“ 符号隔开起止页，如1~10；</div>
          <div style="color:#D9001B;font-size:15px;">2、如不连续页码，请使用“#“符号分布填写页码，如1#7#9等。</div> -->
          <div class="pagesbox">调卷页码：
            <el-input class="pagesinput" :disabled='inputdisabled' v-model="pagesinput" placeholder="请选择需要添加的文件"></el-input>
            <el-button type="primary" style="margin-right:20px;" class="btnedit " @click="dialogFilePreviewVisibleFun('文件预览', filerow)">选择添加</el-button>
            <el-radio-group v-model="radio">
              <el-radio :label="'0'" @click.native.prevent="radioClick('0')">添加所有</el-radio>
            </el-radio-group>
            </div>
          <div class="pagesbtnbox"><el-button type="primary" @click="addpagesFun">添加调卷</el-button></div>
        </el-dialog>
      <!-- 添加调卷 弹层  E -->

        <!-- 图片文件预览 B-->
        <div  class="cus-image" >
          <el-image-viewer
            :initial-index='imgindex'
            v-if="DialogVisibleimgview"
            :on-close="dialogClosed"
            :url-list="FileUrlArrs" >
            </el-image-viewer>
          <el-button type="primary" v-show="DialogVisibleimgview" class=" el-image-viewer__btn el-image-viewer__download "  @click="dnImage(imgindex)">添加调卷</el-button>
        </div>
        <!-- 图片文件预览 E-->

        <!-- pdf文件预览B -->
        <div class="cus-pdf">
          <el-dialog :title="'文件预览'" class="dialogPdfVisiblestyle" :visible.sync="dialogPdfVisibleFiles" width="70%">
            <pdf
            v-for="i in numPages" :key="i" :page="i"
              ref="pdf"
              :src="pdfUrl">
            </pdf>
          </el-dialog>

        </div>
        <!-- pdf文件预览 E -->
   <!-- 提交完成提示 弹层 B -->
      <el-dialog
          title="提示"
          :visible.sync="dialoghintVisible"
          @close="dialoghintVisibleClosed"
          width="25%">
         提交审核成功，审核结果请通过首页“档案调卷利用审核结果查询”
        </el-dialog>
      <!-- 提交完成提示 弹层 E -->

         <!-- 文件预览弹层 -->
     <el-image-viewer
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />

  </div>
</template>

<script>
import specialtyDetails from '@/components/details/machinedetailsProject'
import specialtyDetailsFiles from '@/components/details/machinedetailsFiles'
import {
  parseTime,
  modifiTrees,
  moveUp,
  moveDown
} from "@/utils/index"
import {
  getMachineUtilizeEngineeringListSide,
  downloadFileMachineUtilizationUtilize,
  getMachineUtilizeProjectListEngineeringId,
  getMachineUtilizeProjectListProjectId,
  getMachineUtilizeProjectListfilesId,
  getWebDataDictionaryBistDrop,
  getMachineUtilizeIntegratedMachineRecordList,
  getDictListDictTag,
  getWebFileTypeListDrop,
  addMachineUtilizeFileSave,
  addMachineUtilizeFileSaveList,
  submitUtilizeFilesVerify,
  getUtilizeCheckVerifyFileList,
  getSearchFileUrlFileId,
  getUtilizeAudioPickFileLis,
  getAudioUtilizePickFileUrlFileId,
  saveMachineAudioUtilizeFile,

} from '@/api/machine'

import {
  querySystemDictionary
} from '@/api/systemDictionary'
import Download from '@/utils/download'
import pdf from 'vue-pdf'
export default {
    components: {
      specialtyDetails,
      specialtyDetailsFiles,
      pdf,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
    },
  data () {
    return {
      numPages:'',
      dialogPdfVisibleFiles:false,
      pdfUrl:"",
      imgindex:0,
      DialogVisibleimgview:false, //图片预览
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
      queryInfo: {
        page_num:'1',
        page_size:'10',
      },
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
        rowsl:{ //添加调卷
          wz:0,
          tz:0,
          zp:0,
          gp:0,
          lxd:0,
        },
        addUtilizeFileList:[],
        addUtilizeFileFlag:false,//是否已经添加调卷
        fileURLym:'',//文件预览地址
        FileUrlArrssss:[], //预览文件的数据
        radio:'1',//添加所有
        pagesinput:'',//添加调卷 页码
        dialogPageVisibleFiles:false,//添加调卷 选择页面 弹层
        inputdisabled:false,//全选后不能输入 input
        filerow:"",//选择的文件row
        addUtilizeFile:[],//选中的要添加调卷的文件列表
        file_record_id:[],//选中的文件页码拼接后
        dialoghintVisible:false,//提交成功 提示弹层
        filesimgarr:[],//选中的文件，未做提交，用于计算
        filesimgarr2:[],//选中的文件，未做提交，用于计算
        ztlx:'',//文件载体类型
        file_id:'',//文件id
        fileDetails:{},
        detailsVisible:false,//详情弹层
      PieceType:[], //片型
      SpecificationFilm:[], //底片规格
      ColorCode:[], //色别
      lxdaddrowlist:[],//添加的文件
      gpaddrowlist:[],//添加的文件
      zpaddrowlist:[],//添加的文件
      addUtilizeflag:false,//添加利用按钮 判断
    }
  },
  created () {
    this.engineering_id = this.$route.query.engineering_id
    this.oneLevel = this.$route.query.engineering_id
    this.utilize_id = this.$route.query.utilize
    this.zt = this.$route.query.zt
      this.queryInfo.files_id = this.$route.query.engineering_id
    this.getPieceType() //片型
    this.getSpecificationFilm() //底片规格
    this.getColorCode() //色别
    this.querySystemDictionaryFun() //文件预览地址
    this.getUtilizeAudioPickFileLisFun() //获取声像文件列表
  },
  mounted () {
     setTimeout(() => {
        this.addMachineUtilizeFileSaveListFun()//已添加调卷列表
      }, 500)
      document.oncontextmenu = function(e){ return false;} //禁止浏览器右键行为
  },
  methods: {

    //文件预览
    getAudioUtilizePickFileUrlFileIdFun(row){
        const that = this
      const q ={
        file_id:row.file_id
      }
      getAudioUtilizePickFileUrlFileId(q).then(response =>{
        let fileUrlArr = response.data.data
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        if(fileUrlArr.length == 0) return this.message({ message: '暂无可预览文件', type: 'warning' })
          this.FileUrlArrs = fileUrlArr.map(function (n) {
              return that.fileURLym + n.file_url+'?'+new Date();
          });
         this.fileDialogVisible = true
        }
      })
    },

    //查看声像档案详情
    detailsVisibleFun(row){
      this.detailsVisible = true
      this.fileDetails = row
    },
    // 获取声像文件列表
    getUtilizeAudioPickFileLisFun(){
      this.queryInfo.page_num = this.currentPage,
      this.queryInfo.page_size = this.pageSize,
      this.queryInfo.utilize_id = this.utilize_id,
      getUtilizeAudioPickFileLis(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getUtilizeAudioPickFileLisFun()
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
        res.list.forEach(v => {
          this.SpecificationFilm.forEach(t => {
              if (v.dpgg === t.bm) {
                v.dpggName = t.mc
              }
              return
            })
          return
        })

         this.documentList = res.list
        }
      })
    },
    dialoghintVisibleClosed(){
      this.$router.push({  //跳回首页
            path: '/machineHome',
          })
    },
    // 关闭弹层 文件预览（选择文件时）弹层
    dialogClosed() {
      this.radio = '1'

        console.log(this.addUtilizeFile)
      if (this.addUtilizeFile.length != 0) {
        this.dialogPageVisibleFiles = true
        this.addUtilizeFile.forEach((item,index) =>{
          if (index == 0) {
            this.pagesinput = item.file_weight
          } else {
            this.pagesinput = this.pagesinput+'#'+item.file_weight
          }

        })
      this.filesimgarr2.push({
         file_id:this.file_id,
         utilize_id:this.utilize_id,
         file_record_id:this.pagesinput,
       })
      }
      this.DialogVisibleimgview = false
    },
    //添加所有，清空并且禁用input
    radioClick (e) {
      e === this.radio? (this.radio = '1'):(this.radio = e)
      this.pagesinput = ''
      if (this.radio == '0') {
        this.inputdisabled = true
      }else if(this.radio == '1'){
        this.inputdisabled = false
      }
      console.log(this.radio)
    },


    // 添加调卷页数 弹层
    dialogMachineUtilizeFileSaveVisibleFun(row){
      console.log(row)
      this.ztlx  = row.field_three
      this.file_id = row.file_id
      this.radio = '1'

      if (row.field_three == 'WJJZTLX_DIC-7') {// 录像带
        console.log('录像带')


        this.lxdaddrowlist.push(row)
         // 对象数组去重
      let obj = {};
      this.lxdaddrowlist = this.lxdaddrowlist.reduce((item, next) => {
          obj[next.file_id] ? '' : obj[next.file_id] = true && item.push(next);
              return item;
          }, []);

        this.rowsl.lxd = this.lxdaddrowlist.length
      }else if (row.field_three == 'WJJZTLX_DIC-8'){ //光盘
        console.log('光盘')
        this.gpaddrowlist.push(row)
         // 对象数组去重
      let obj = {};
      this.gpaddrowlist = this.gpaddrowlist.reduce((item, next) => {
          obj[next.file_id] ? '' : obj[next.file_id] = true && item.push(next);
              return item;
          }, []);
        this.rowsl.gp = this.gpaddrowlist.length
      }else if (row.field_three == 'WJJZTLX_DIC-4'){  //照片
        console.log('照片')
        this.zpaddrowlist.push(row)
         // 对象数组去重
        let obj = {};
        this.zpaddrowlist = this.zpaddrowlist.reduce((item, next) => {
          obj[next.file_id] ? '' : obj[next.file_id] = true && item.push(next);
              return item;
          }, []);
        this.rowsl.zp = this.zpaddrowlist.length
      }
      return

      if (row.ztlx == 'WJJZTLX_DIC-1') {
        console.log('文字类型 添加调卷')
        this.filerow = row
        this.addUtilizeFile = [] //清空已经选中的图片
        this.pagesinput = '' //清空已经选中的页码
        this.file_record_id = '0'
        this.addMachineUtilizeFileSaveFun(row)
      }else {
        console.log('非文字类型 添加调卷')
       this.filerow = row
      this.dialogPageVisibleFiles = true
      this.addUtilizeFile = [] //清空已经选中的图片
      this.pagesinput = '' //清空已经选中的页码
      }
    },
    // 对象数组去重
    getlist2(arr) {
    // 缓存用于记录
    const cache = [];
    for (const t of arr) {
        // 检查缓存中是否已经存在
        if (cache.find(c => c.file_id=== t.file_id&& c.file_weight=== t.file_weight)) {
            // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
            continue;
        }
        // 不存在就说明以前没遇到过，把它记录下来
        cache.push(t);
    }
    // 记录结果就是过滤后的结果
    return cache;
},
    //确定 需要统计的 图片数
    addpagesFun(){
      console.log(this.pagesinput)
      console.log(this.radio)
      if (this.pagesinput == 0 && this.radio == '1') {
        return this.message({ message: '请选择需要添加调卷的文件或选择添加所有', type: 'error' })
      }

      if (this.radio == "0") {
        this.file_record_id = '0'
        console.log(this.file_record_id)
        var row = this.filerow
        console.log(row.sl)
        if (row.ztlx == 'WJJZTLX_DIC-2') {
            if (this.rowsl.tz*1 == 0) {
              this.rowsl.tz = row.sl*1
            } else {
              this.rowsl.tz = this.rowsl.tz*1 + row.sl*1
            }
          }else if (row.ztlx == 'WJJZTLX_DIC-4') {
            if (this.rowsl.zp*1 == 0) {
              this.rowsl.zp = row.sl*1
            } else {
              this.rowsl.zp = this.rowsl.zp*1 + row.sl*1
            }
          }else if (row.ztlx == 'WJJZTLX_DIC-8') {
              if (this.rowsl.gp*1 == 0) {
              this.rowsl.gp = row.sl*1
            } else {
              this.rowsl.gp = this.rowsl.gp*1 + row.sl*1
            }
          }
          var pagesinput = '1'
          for (let i = 1; i <= row.sl; i++) {
            // const element = array[i];
            if (i == 1 ) {
              pagesinput = i
            } else {
              pagesinput = pagesinput+'#'+i
            }

          }
          console.log(pagesinput)
        this.filesimgarr2.push(
          {
            file_id:this.file_id,
            utilize_id:this.utilize_id,
            file_record_id:pagesinput,
          }
        )
      } else {
        console.log(this.filesimgarr)
        // this.filesimgarr2 = [...this.filesimgarr2,...this.filesimgarr] //保存选中的文件，用于提交调卷利用审核
        this.filesimgarr = this.getlist2(this.filesimgarr)

        this.filesimgarr.forEach(row =>{
          console.log(row)
           if (row.ztlx == 'WJJZTLX_DIC-2') {
                if (this.rowsl.tz*1 == 0) {
                  this.rowsl.tz = 1
                } else {
                  this.rowsl.tz = this.rowsl.tz*1 + 1
                }
              }else if (row.ztlx == 'WJJZTLX_DIC-4') {

                if (this.rowsl.zp*1 == 0) {
                  this.rowsl.zp = 1
                } else {
                  this.rowsl.zp = this.rowsl.zp*1 + 1
                }
              }else if (row.ztlx == 'WJJZTLX_DIC-8') {
                  if (this.rowsl.gp*1 == 0) {
                  this.rowsl.gp = 1
                } else {
                  this.rowsl.gp = this.rowsl.gp*1 + 1
                }
              }
           })
        // this.file_record_id = this.pagesinput
      }
       this.filesimgarr = []
      // this.addMachineUtilizeFileSaveFun(this.filerow)
      this.dialogPageVisibleFiles = false
    },
    // 添加调卷 图片按钮
    dnImage(index){
      var imgurl = document.getElementsByClassName(
                "el-image-viewer__canvas"
            )[0].children[0].src;
        var pos = imgurl.lastIndexOf('/');//'/所在的最后位置'
        var str = imgurl.substr(pos+1)//截取文件名称字符串

      var nerarr = []
      console.log(this.FileUrlArrssss)
      this.FileUrlArrssss.forEach(item =>{
        if (str == item.file_url.substr(item.file_url.lastIndexOf('/')+1)) {
          // this.addMachineUtilizeFileImgSaveFun(item)
          item.ztlx = this.ztlx
        this.addUtilizeFile.push(item)
        }
      })

      // 对象数组去重
      let obj = {};
      this.addUtilizeFile = this.addUtilizeFile.reduce((item, next) => {
          obj[next.file_weight] ? '' : obj[next.file_weight] = true && item.push(next);
          return item;
      }, []);
      this.filesimgarr = [...this.filesimgarr, ...this.addUtilizeFile] //合并数组 用于保存 数据
      // this.filesimgarr.concat(this.addUtilizeFile) //合并数组 用于保存 数据
      console.log(this.addUtilizeFile)
      this.message({ message: '已选中文件', type: 'success' })
    },
    //添加调卷——图片
     addMachineUtilizeFileImgSaveFun(row){
       console.log(row)
       const q ={
         file_id:row.file_id,
         utilize_id:this.utilize_id,
         file_record_id:row.record_id,
       }
       addMachineUtilizeFileSave(q).then(response =>{
        if (response.status === 200) {
         const { data: res, message, status } = response.data
         if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: message, type: 'success' })
          // this.addMachineUtilizeFileSaveListFun()
          // this.getDocumentListFun()
         }
       })
     },

    //  文件预览
    dialogFilePreviewVisibleFun(name,row){
      this.ztlx  = row.ztlx
      this.file_id = row.file_id
      this.dialogPageVisibleFiles = false
      this.addUtilizeFile = [] //清空已经选中的图片
      this.pagesinput = '' //清空已经选中的页码
      this.filerow = row
      const that = this
      const q = {
        file_id:row.file_id
      }
      console.log(q)
      getSearchFileUrlFileId(q).then(response =>{
        if (response.status === 200) {

          var str = response.data.data[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
            this.dialogPdfVisibleFiles = true
            this.pdfUrl = that.fileURLym + response.data.data[0].file_url
            let src = pdf.createLoadingTask(this.pdfUrl)
            console.log(src)
            src.promise.then(pdf => {
                this.numPages = pdf.numPages
            })
            // var url = that.fileURLym + response.data.data[0].file_url
            // window.open(url, '_blank')
          } else {
            that.DialogVisibleimgview = true
            that.FileUrlArrs = []
            var FileUrlArrssss = response.data.data.sort(that.compare('file_weight'))
            this.FileUrlArrssss = FileUrlArrssss
            FileUrlArrssss.forEach(item => {
              that.FileUrlArrs.push(that.fileURLym+item.file_url)
            });
          }
        }
      })
    },
    compare(p){ //这是比较函数
      return function(m,n){
          var a = m[p];
          var b = n[p];
          return a.localeCompare(b,'zh-CN',{ numeric: true });
    }},
    // 对象数组去重
    getlist(arr) {
    // 缓存用于记录
    const cache = [];
    for (const t of arr) {
        // 检查缓存中是否已经存在
        if (cache.find(c => c.file_id=== t.file_id&& c.file_record_id=== t.file_record_id)) {
            // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
            continue;
        }
        // 不存在就说明以前没遇到过，把它记录下来
        cache.push(t);
    }
    // 记录结果就是过滤后的结果
    return cache;
},
    //提交调卷利用审核
    submitUtilizeFilesVerifyFun(){
      let fileID = ''
      let utilizeId = ''
      let fileRecordId = '0'
    let newArray = [...this.lxdaddrowlist,...this.gpaddrowlist,...this.zpaddrowlist]

      // 对象数组去重
      let obj = {};
      newArray = newArray.reduce((item, next) => {
          obj[next.file_id] ? '' : obj[next.file_id] = true && item.push(next);
          return item;
      }, []);

      newArray.forEach((item,index) =>{
        if (index == 0) {
          fileID = item.file_id
          utilizeId = item.utilize_id
          fileRecordId = '0'
        } else {
          fileID = fileID+'#'+item.file_id
          utilizeId = utilizeId+'#'+item.utilize_id
          fileRecordId = fileRecordId+','+'0'
        }
      })

      console.log('arrayResult2',fileID)
      const q = {
        file_id:fileID,
        utilize_id:utilizeId,
        file_record_id:fileRecordId,
      }
      saveMachineAudioUtilizeFile(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })

         this.rowsl.wz = 0
         this.rowsl.tz = 0
         this.rowsl.zp = 0
         this.rowsl.gp = 0
         this.rowsl.lxd = 0
        this.dialoghintVisible = true

        }
      })

    },
    //已添加调卷列表
    addMachineUtilizeFileSaveListFun(){
      const q ={
        utilize_id:this.utilize_id
      }
      addMachineUtilizeFileSaveList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })

         this.rowsl.wz = 0
         this.rowsl.tz = 0
         this.rowsl.zp = 0
         this.rowsl.gp = 0
         if (res.length != 0) {
           res.forEach(row =>{
            if (row.ztlx == 'WJJZTLX_DIC-1') {
              console.log(this.rowsl.wz)
              console.log(row.sl)
                if (this.rowsl.wz*1 == 0) {
                  this.rowsl.wz = row.sl*1
                } else {
                  this.rowsl.wz = this.rowsl.wz*1 + row.sl*1
                }
              } else if (row.ztlx == 'WJJZTLX_DIC-2') {
                if (this.rowsl.tz*1 == 0) {
                  this.rowsl.tz = row.sl*1
                } else {
                  this.rowsl.tz = this.rowsl.tz*1 + row.sl*1
                }
              }else if (row.ztlx == 'WJJZTLX_DIC-4') {
                if (this.rowsl.zp*1 == 0) {
                  this.rowsl.zp = row.sl*1
                } else {
                  this.rowsl.zp = this.rowsl.zp*1 + row.sl*1
                }
              }else if (row.ztlx == 'WJJZTLX_DIC-8') {
                  if (this.rowsl.gp*1 == 0) {
                  this.rowsl.gp = row.sl*1
                } else {
                  this.rowsl.gp = this.rowsl.gp*1 + row.gp*1
                }
              }
           })
           this.addUtilizeFileList = res
         }
        }
      })
    },

    //添加调卷_文字
     addMachineUtilizeFileSaveFun(row){
       console.log(row.ztlx)

       const q ={
         file_id:row.file_id,
         utilize_id:this.utilize_id,
         file_record_id:this.file_record_id,
       }
       addMachineUtilizeFileSave(q).then(response =>{
        if (response.status === 200) {
         const { data: res, message, status } = response.data
         if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: message, type: 'success' })
          // this.addMachineUtilizeFileSaveListFun()
          if (this.rowsl.wz*1 == 0) {
            this.rowsl.wz = row.sl*1
          } else {
            this.rowsl.wz = this.rowsl.wz*1 + row.sl*1
          }
          this.getDocumentListFun()
         }
       })
     },



    //下载文件利用压缩包
    downloadbtn(){
      const q ={
        utilize_id:this.utilize_id
      }
      downloadFileMachineUtilizationUtilize(q).then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          const fileName = decodeURI(headersName)
          const blob = new Blob([response.data], { type: 'aplication/zip' })
          Download.download(
            blob,
            fileName
          )
        }).catch(error => {
          console.log(error)
        })
    },
    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },

    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getUtilizeAudioPickFileLisFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getUtilizeAudioPickFileLisFun()
    },
       //获取文件预览域名
    querySystemDictionaryFun(){
      const that = this
        const q = {
            dict_tag:'file_server_url'
          }
          //获取文件预览域名
          getDictListDictTag(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              that.fileURLym = response.data.data[0].dict_code
            }
          }).catch(error => {
            console.log(error)
          })
    },
            // 片型
    getPieceType() {
      const q = {
        bm: "DICT_PX"
      }
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
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
      getWebDataDictionaryBistDrop(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.ColorCode  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<style  lang='less'>

.detailbox {
    width: 100%;
    padding: 20px 50px;
    box-sizing: border-box;
    position: relative;

.el-tooltip__popper {
    max-width: 260px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
}
.detailboxtitle {
  font-size: 20px;
  color: #5390F2;
  margin-bottom: 10px;
}




.detailboxright1 {
  width: 100%;
  .detailboxrightTop {

    height: 150px;
    box-shadow: 0px 1px 6px 0px rgba(116, 116, 116, 0.3);
    margin-bottom: 20px;
    padding: 5px 10px;
    box-sizing: border-box;

    .detailboxrightToptitle {
      background-color: #848FD5;
      color: #fff;
      width: 155px;
      text-align: center;
      height: 135px;
      padding-top: 50px;
      box-sizing: border-box;
      border-radius: 10px;
      float: left;
      letter-spacing:6px;
    }
    .detailboxrightTopRow {
      float: left;
      margin-left: 30px;
      .detailboxrightTopRow4 {
        padding-top: 20px;
        height: 80px;
        line-height: 80px;
      }
      .datacol {
        display: inline-block;
        font-size: 22px;
        font-weight: 700;
        color: #000;
        margin-right: 20px;
        span{
          font-size: 30px;
          color: #566BEC;
        }
      }
      .detailboxrightTopRowPs {
        font-size: 14px;
        font-family: Microsoft YaHei;
        color: #FF1010;
      }
    }
    .detailboxrightTopbtnbox {
      float: left;
      height: 135px;
      padding-top: 50px;
      box-sizing: border-box;
      margin-left: 60px;
      .detailboxrightTopbtn {
        width: 204px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #5365ED;
        color: #fff;
        border-radius: 5px;
      }
      .detailboxrightTopbtn:hover {
        cursor: pointer;
      }
    }
  }
  .detailboxrightbottom {
    box-shadow: 0px 1px 6px 0px rgba(116, 116, 116, 0.3);
    margin-bottom: 20px;
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
.dialogPdfVisiblestyle {
  background-color: rgba(0,0,0,.3);
  .el-dialog__body {
  background-color: rgba(0,0,0,.3);
  max-height: 650px;
  overflow-y: auto;
  }
}
.pagesbox {
  margin-top: 30px;
  margin-bottom: 20px;
}
.pagesinput {
  width: 400px !important;
}
.pagesbtnbox {
  width: 100%;
  text-align: center;
}
</style>

<style scoped lang='less'>

.btn {
  width: 100%;
  text-align: center;
}
.box {
  width: 100%;
  height: 100%;
}
  @media screen and (min-width: 1680px){
    .head {
      height: 18%;
    }
  }
  @media screen and (max-width: 1680px){
    .head {
      height: 14%;
    }
  }
  .head {
    width: 100%;
    background: url('../../../assets/head.png') no-repeat;
    background-size: 100% ;
    position: relative;
    @media screen and (min-width: 1680px){
    .head1 {
        width: 442px;
        height: 63px;
      top: 50%;
      }
    .head2 {
      width: 108px;
      height: 50px;
      top: 50%;
      }

    }
    @media screen and (max-width: 1680px){
    .head1 {
      width: 300px;
      height: 50px;
      top: 40%;
    }
    .head2 {
      width: 70px;
      height: 30px;
      top: 40%;
    }

  }
    .head1 {
      position: absolute;
      left: 50px;
      transform: translateY(-50%);
      background: url('../../../assets/logo.png') no-repeat;
      background-size: contain;
    }
    .head2 {
      position: absolute;
      right: 50px;
      transform: translateY(-50%);
      background: url('../../../assets/btnback.png') no-repeat;
      background-size: 80%;

    }
  }

   @media screen and (min-width: 1680px){
      .formbody {
        padding: 2% 18%;
      }
    }
    @media screen and (max-width: 1680px){
      .formbody {
        padding: 1% 10%;
      }
  }
  .formbody {
    width: 100%;
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 18px !important;
    }
    .upload-demo {
      height: 120px;
    }
  }
  .el-upload__tip {
    color: #FF0000;
  }
  .utilizeRemarks {
  width: 100%;
  .el-form-item__content {
    width: 66%;
  }
}
.xuanzeengineering_id {
  margin-left: 10px !important;
}
.cus-image {
    .el-image-viewer__download {
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        text-align: center;
        background-color: #606266;
        z-index: 2001; /* 如果该组件需要传递 z-index 的值，这个值也需要做成动态的 props */
        cursor: pointer;
        position: fixed;
        font-size: 20px;
    }
}
</style>
<style lang="less" scoped>
/deep/ .el-scrollbar {
    padding-bottom: 30px;
  box-sizing: border-box;
	.el-scrollbar__wrap {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
    .mailTable {width: 100%;}
    .mailTable tr thead {line-height: 40px;font-size: 18px;font-weight: 700;}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 280px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>
