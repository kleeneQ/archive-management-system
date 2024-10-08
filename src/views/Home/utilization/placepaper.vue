<template>
  <div>
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>城建档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>纸质档案管理</el-breadcrumb-item>
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
              style="width: 100%"
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
                prop="xmbh"
                label="项目编号"
                width="230">
                <!-- <template slot-scope="scope">
                  {{scope.row.xmgcdh}}-{{scope.row.dwgcdh}}-{{scope.row.ajdh}}
                </template> -->
              </el-table-column>
              <el-table-column
                prop="gcmc"
                label="工程名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="工程类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="lxpzwh"
                label="立项批准文号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="jsdw"
                label="建设单位"
                width="200">
              </el-table-column>
              <el-table-column
                prop="sgxkzh"
                label="施工许可证号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ghxkzh"
                label="规划许可证号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="gcdd"
                label="工程地点"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="310">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showDetailsDialogFun('详情', scope.row)">详 情</el-button>
                  <el-button type="success" size="small" @click="dialogPlaceVisibleFun('归档',scope.row)">归 档</el-button>
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
            <td colspan="3">
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
  </div>
</template>

<script>
  import NetWebUpload from '@/components/upload/netwebupload'
  import request from '@/utils/request'
import {
  getUtilizationPlacePaperList,
  UtilizationPlacePaper,
  getUtilizationPlaceElectronicsList,
  UtilizationElectronicsPaper,
  getUtilizationPlaceAudioList,
  UtilizationAudioPaper,
  GetUtilizationFileCount
} from "@/api/utilization"
import {
  searchFilePosition,
} from '@/api/RecorSearch/recorsearch'
import {
  getArchivesCateList,
} from '@/api/archivesCate'
export default {
  data () {
    return {
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
      FileCount:{},//归档信息
      engineeringType:[],//项目类型
       daoruFileZIPDialogVisible:false,//导入档案ZIP包 弹层 
      
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
    }
  },
  components: {
    NetWebUpload,
  },
  mounted () {
    this.setUrl()
    this.getEngineeringTypeFun() //获取项目类型
    
    setTimeout(() => {
    this.getUtilizationPlacePaperListFun() //获取项目列表 
      }, 500)
  },
  methods: {
 
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
      this.dialogProjectDetailsVisible = true
      this.ProjectDetails = row
      this.searchFilePositionFun(row.engineering_id)
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
          UtilizationPlacePaper(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            
            this.getUtilizationPlacePaperListFun()
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
    getUtilizationPlacePaperListFun(){
      const q = {
        xmbh:this.queryInfo.xmbh,
        gcmc:this.queryInfo.gcmc,
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      getUtilizationPlacePaperList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getUtilizationPlacePaperListFun()
         }
        res.list.map(v =>{
          this.engineeringType.forEach(item => {
              if (v.gclx === item.type_code) {
                v.gclxName = item.type_name
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
      this.getUtilizationPlacePaperListFun()
    },
  
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getUtilizationPlacePaperListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getUtilizationPlacePaperListFun()
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
