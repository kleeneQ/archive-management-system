<template>
  <div>
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>城建档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>声像档案管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="项目编号">
              <el-input clearable v-model="queryInfo.xmbh" placeholder="请输入项目编号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="工程名称">
              <el-input clearable v-model="queryInfo.gcmc" placeholder="请输入工程名称"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryEngineering">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->

              <!-- 列表区 -->
              <div class="eltablebox">
              <el-col>
                    <!-- 导入档案ZIP包 B -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="daoruFileZIPFun('导入档案ZIP包', {})">导入档案ZIP包</el-button>
                  </el-form-item>
                </el-form>
                    <!-- 导入档案ZIP包 E -->
              </el-col> 
            <!-- 项目列表 B -->
            <el-table
              :data="projectList"
              border
              ref="table"
              style="width: 100%"
              class="tablestyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
           
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
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="pssj"
                label="拍摄时间"
                width="150">
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
                width="150">
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
                  <el-button type="primary" class="btnedit" size="small"  @click="detailsVisibleFun(scope.row)">详 情</el-button>
                  
                   <!-- <el-button type="primary" size="small" class="btnedit" @click="showDetailsDialogFun('详情', scope.row)">详 情</el-button> -->
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
    <!-- 项目详情弹层 B -->
     <el-dialog :title="'项目文件详情'" :visible.sync="dialogProjectDetailsVisible" custom-class="ProjectDetailsVisible">
        
        <div class="ProjectDetailstitle">基本信息</div>
        <table class="mailTable" >
          <tr >
            <td class="column">项目名称：</td>
            <td colspan="3">{{ProjectDetails.gcmc}}</td>
          </tr>
          <tr >
            <td class="column">项目档号：</td>
            <td colspan="3">{{ProjectDetails.gcdh}}</td>
          </tr>
          <tr >
            <td class="column">项目类型：</td>
            <td >{{ProjectDetails.gclxName}}</td>
            <td class="column">项目地点：</td>
            <td >{{ProjectDetails.gcdd}}</td>
          </tr>
          <tr >
            <td class="column">建设单位：</td>
            <td >{{ProjectDetails.jsdw}}</td>
            <td class="column">施工单位：</td>
            <td >{{ProjectDetails.sgdw}}</td>
          </tr>
          <tr >
            <td class="column">勘察单位：</td>
            <td >{{ProjectDetails.kcdw}}</td>
            <td class="column">设计单位：</td>
            <td >{{ProjectDetails.sjdw}}</td>
          </tr>
          <tr >
            <td class="column">监理单位：</td>
            <td >{{ProjectDetails.jldw}}</td>
            <td class="column">用地规划许可证号：</td>
            <td >{{ProjectDetails.ydghxkzh}}</td>
          </tr>
          <tr >
            <td class="column">立项批准文号：</td>
            <td >{{ProjectDetails.lxpzwh}}</td>
            <td class="column">规划许可证号：</td>
            <td >{{ProjectDetails.ghxkzh}}</td>
          </tr>
          <tr >
            <td class="column">用地许可证号：</td>
            <td >{{ProjectDetails.ydxkzh}}</td>
            <td class="column">工程结算：</td>
            <td >{{ProjectDetails.gcjs}}</td>
          </tr>
           <tr >
            <td class="column">工程总造价：</td>
            <td >{{ProjectDetails.gczj}}</td>
            <td class="column">总用地面积：</td>
            <td >{{ProjectDetails.zydmj}}</td>
          </tr>
          <tr >
            <td class="column">总建筑面积：</td>
            <td >{{ProjectDetails.zjzmj}}</td>
            <td class="column">地形图号：</td>
            <td >{{ProjectDetails.dxtxh}}</td>
     
          </tr>
          <tr >
            <td class="column">附注：</td>
            <td colspan="3">{{ProjectDetails.fz}}</td>
          </tr>
        </table>



          <div class="ProjectDetailstitle">归档信息</div>
        <table class="mailTable" >
           <tr >
            <td class="column">录入人：</td>
            <td >{{ProjectDetails.lrr}}</td>
            <td class="column">录入日期：</td>
            <td >{{ProjectDetails.lrsj | formatDate}}</td>
          </tr>
            <tr >
            <td class="column">总卷数：</td>
            <td >{{FileCount.filesNum}}</td>
            <td class="column">文字（页）：</td>
            <td >{{FileCount.wzNum}}</td>
            
          </tr>
          <tr >
            <td class="column">图纸：</td>
            <td >0（卷）{{FileCount.tzNum}}（张）</td>
            <td class="column">底片：</td>
            <td >{{FileCount.dpNum}}</td>
          </tr>
          <tr >
            <td class="column">照片：</td>
            <td >{{FileCount.zpNum}}</td>
            <td class="column">光盘：</td>
            <td >{{FileCount.gpNum}}</td>
          </tr>
          <tr >
            <td class="column">保管期限：</td>
            <td >{{ProjectDetails.bgqx}}</td>
            <td class="column">密级：</td>
            <td >{{ProjectDetails.mj}}</td>
          </tr>
          <tr >
            <td class="column">进馆日期：</td>
            <td >{{ProjectDetails.jgrq | formatDate}}</td>
            <td class="column">移交单位：</td>
            <td >{{ProjectDetails.yjdw}}</td>
          </tr>
         
        </table>

        <div class="ProjectDetailstitle">排检与编号</div>
        <table class="mailTable">
          <tr >
            <td class="column">档号：</td>
            <td >{{ProjectDetails.gcdh}}</td>
            <td class="column">原档号：</td>
            <td >-</td>
          </tr>
          <tr >
            <td class="column">存放位置起始号：</td>
            <td  colspan="3">
              <div class="cdyjstyle" v-for="(item,index) in FilePosition" :key="index">
                <template v-if="(index+1) !== FilePosition.length">
                  {{item}}、
                </template>
                <template v-if="(index+1) == FilePosition.length">
                  {{item}}
                </template>
              </div>
            </td>
          </tr>
        </table>
    </el-dialog>
    <!-- 项目详情弹层 E -->

        <!-- 导入档案ZIP包 弹层 B-->
     <el-dialog
      :title="'导入档案ZIP包'"
      :visible.sync="daoruFileZIPDialogVisible"
      width="60%"
      @close="zipdialogClosed"
    >
       <NetWebUpload
      :fileNumLimit="fileNumLimit"
      :fileSize="fileSize"
      :chunkSize="chunkSize"
      :uploadSuffixUrl="uploadSuffixUrl"
      :options="options"
      :fjscrow="fjscrow"
      :fileListData="filesList"
            > </NetWebUpload>
    </el-dialog>
     <!-- 导入档案ZIP包 弹层 E-->
     
      <!-- 案卷详情   B -->
          <el-dialog
          width="60%"
          title="案卷详情"
          :visible.sync="detailsVisible">
        <table class="mailTable" >
          <tr >
            <td class="column">案卷题名：</td>
            <td colspan="3">{{filesDetails.ajtm}}</td>
          </tr>
          <tr >
              <td class="column">档号：</td>
              <td >{{filesDetails.ajdh}}</td>
              <td class="column">总登记号：</td>
              <td >{{filesDetails.zh}}</td>
            </tr>
            <tr >
              <td class="column">分类号：</td>
              <td >{{filesDetails.flh}}</td>
              <td class="column">拍摄地点</td>
              <td >{{filesDetails.psdd}}</td>
            </tr>
            <tr >
              <td class="column">拍摄者：</td>
              <td >{{filesDetails.psz}}</td>
              <td class="column">拍摄时间：</td>
              <td >{{filesDetails.pssj}}</td>
            </tr>
          <tr >
            <td class="column">事件：</td>
            <td >{{filesDetails.sj}}</td>
            <td class="column">底片数量：</td>
            <td >{{filesDetails.dpsl}}</td>
          </tr>
          <tr >
            <td class="column">照片数量：</td>
            <td >{{filesDetails.zpsl}}</td>
            <td class="column">黑白照片数量：</td>
            <td >{{filesDetails.hbzpsl}}</td>
          </tr>
          <tr >
            <td class="column">保管期限：</td>
            <td >{{filesDetails.bgqxName}}</td>
            <td class="column">密级：</td>
            <td >{{filesDetails.mjName}}</td>
          </tr>
          <tr >
            <td class="column">编制单位：</td>
            <td >{{filesDetails.bzdw}}</td>
            <td class="column">编制日期：</td>
            <td >{{filesDetails.bzrq}}</td>
          </tr>
          <tr >
            <td class="column">存放位置：</td>
            <td >{{filesDetails.cfwz}}</td>
            <td class="column">内容：</td>
            <td >{{filesDetails.nr}}</td>
          </tr>
          <tr >
            <td class="column">人物：</td>
            <td >{{filesDetails.rw}}</td>
            <td class="column">关联工程：</td>
            <td >{{filesDetails.glgcmc}}</td>
          </tr>
          <tr >
            <td class="column">备注：</td>
            <td colspan="3">{{filesDetails.fz}}</td>
          </tr>
        </table>
   </el-dialog>
    <!-- 案卷详情 E -->
  </div>
</template>

<script>
import {
  GetUtilizationFileCount
} from "@/api/utilization"
  import NetWebUpload from '@/components/upload/netwebupload'
  import request from '@/utils/request'
import {

  getUtilizationPlaceAudioList,
  UtilizationAudioPaper
} from "@/api/utilization"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  searchFilePosition,
} from '@/api/RecorSearch/recorsearch'
import {
  getArchivesCateList,
} from '@/api/archivesCate'
export default {
  data () {
    return {
     FileCount:{},//归档信息
      daoruFileZIPDialogVisible:false,//导入档案ZIP包 弹层 
      queryInfo:{
        xmbh:'',
        gcmc:'',
        page_num:1,
        page_size:10,
      },
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      projectList:[],//项目列表
      dialogProjectDetailsVisible:false,//项目详情 弹层
      ProjectDetails:{ //项目详情 数据
        gcmc:'',
        gcdh:'',
        gclx:'',
        gclxName:'',
        gcdd:'',
        jsdw:'',
        sgdw:'',
        kcdw:'',
        sjdw:'',
        jldw:'',
        ydghxkzh:'',
        ghxkzh:'',
        ydxkzh:'',
        gcjs:'',
        gczj:'',
        zydmj:'',
        zjzmj:'',
        fz:'',
        lrr:'',
        lrsj:'',
        zajs:'',
        wz:'',
        tzj:'',
        tzz:'',
        dp:'',
        zp:'',
        gp:'',
        bgqx:'',
        mj:'',
        jgrq:'',
        yjdw:'',
        cfwzqsh:'',
      },
      engineeringType:[],//项目类型

        fjscrow:{},//上传附件 所点击文件条 内容数据
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
            fileUploadUrl:"/file-api/v1/file/net/upload",//上传地址
            fileCheckUrl:"/file-api/v1/file/net/check",//检测文件是否存在url
            checkChunkUrl:"/file-api/v1/file/net/check",//检测分片url
            mergeChunksUrl:"/file-api/v1/file/net/merge",//合并文件请求地址
            uploadSuffixUrl:'',
            headers:{},
            file_id:'',
        },
        FilePosition:[],//存放位置
      filesDetails:{},//案卷详情
      detailsVisible:false,//案卷详情预览弹层
      secretGrade:[],
      storagePeriod:[],
    }
  },
  components: {
    NetWebUpload,
  },
  mounted () {
    this.setUrl()
    
     this.getSecretGrade()  // 密级
    this.getStoragePeriod()  // 保管期限
    this.getEngineeringTypeFun() //获取项目类型
    setTimeout(() => {
         this.getUtilizationPlaceAudioListFun() //获取项目列表
      }, 500)
   
  },
  methods: {
  detailsVisibleFun(row){
    this.filesDetails = row
    this.detailsVisible = true
  },

      //归档信息
    GetUtilizationFileCountFun(row){
      const q ={
        engineering_id:row.engineering_id
      }
      GetUtilizationFileCount(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FileCount = res
        }
      })
    },
    searchFilePositionFun(id){
      const q = {
        engineering_id:id,
      }
      searchFilePosition(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FilePosition  = res.position
        }
      })
    },

    zipdialogClosed(){
      this.daoruFileZIPDialogVisible = false
    },
    daoruFileZIPFun(){
      this.daoruFileZIPDialogVisible = true
    },
     //获取文件上传路径
     setUrl() {
          console.log(request.service1.defaults.baseURL)
          this.uploadSuffixUrl = request.service1.defaults.baseURL
          this.options.uploadSuffixUrl = request.service1.defaults.baseURL
          return request.service1.defaults.baseURL
        },
    //详情弹层 
    showDetailsDialogFun(name,row){
      console.log(row)
      this.searchFilePositionFun(row.engineering_id)
      this.GetUtilizationFileCountFun(row)//归档信息
      this.dialogProjectDetailsVisible = true
      this.ProjectDetails = row
    },
    //归档操作
    dialogPlaceVisibleFun(name,row){
      console.log(row)
      const q = {
        engineering_id:row.engineering_id
      }
      this.$confirm('确定将该项目归档么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          UtilizationAudioPaper(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getUtilizationPlaceAudioListFun()
            }
          })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消归档'
          });          
        });

      
    },
    // 获取项目档案列表
    getUtilizationPlaceAudioListFun(){
      const q = {
        xmbh:this.queryInfo.xmbh,
        gcmc:this.queryInfo.gcmc,
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      getUtilizationPlaceAudioList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getUtilizationPlaceAudioListFun()
         }
        res.list.map(v =>{
          this.engineeringType.forEach(item => {
              if (v.gclx === item.type_code) {
                v.gclxName = item.type_name
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
        })
        this.projectList = res.list
        this.total = res.total
        }
      })
    },
  //查询案卷列表信息
    queryEngineering(){
      console.log(this.queryInfo)
      this.getUtilizationPlaceAudioListFun()
    },
  
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getUtilizationPlaceAudioListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getUtilizationPlaceAudioListFun()
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
  },
  

}
</script>
<style lang="less">
  .ProjectDetailsVisible {
    .el-dialog__body {
      height: 500px;
      overflow: auto;
    }
  }
</style>
<style scoped lang='less' scoped>
.ProjectDetailstitle {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 15px;
}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 250px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>
