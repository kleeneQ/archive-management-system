<template>
  <div  >
    <!-- 案卷级 -->
    <el-scrollbar v-loading="loading" v-if="projectName == 'project'">
    <!-- 基础信息 -->
    <table class="mailTable" >
      <tr>
        <thead>基础信息</thead>
      </tr>
      <tr >
        <td class="column">案卷题名：</td>
        <td colspan="3">{{projectdetails.ajtm}}</td>
      </tr>
      <tr >
        <td class="column">案卷档号：</td>
        <td >{{projectdetails.ajdh}}</td>
        <td class="column">原档号：</td>
        <td >{{projectdetails.ydh}}</td>
      </tr>
      <tr >
        <td class="column">案卷类别：</td>
        <td >{{projectdetails.ajlbName}}</td>
        <td class="column">载体类型：</td>
        <td >{{projectdetails.ztlxName}}</td>
      </tr>
      <tr >
        <td class="column">编制单位：</td>
        <td >{{projectdetails.bzdw}}</td>
        <td class="column">移交单位：</td>
        <td >{{projectdetails.yjdw}}</td>
      </tr>
      <tr >
        <td class="column">起始日期：</td>
        <td >{{projectdetails.qssj | formatDate}}</td>
        <td class="column">终止日期：</td>
        <td >{{projectdetails.zzsj | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">录入者：</td>
        <td >{{projectdetails.lrr}}</td>
        <td class="column">录入日期：</td>
        <td >{{projectdetails.lrsj | formatDate}}</td>
      </tr>
    </table>
    <!-- 归档信息 -->
    <table class="mailTable" >
      <tr>
        <thead>归档信息</thead>
      </tr>
       <tr >
         <td class="column">立卷人：</td>
         <td >{{FileCount.ljr}}</td>
         <td class="column">立卷日期：</td>
         <td >{{FileCount.ljrq | formatDate}}</td>
       </tr>
       <tr >
         <td class="column">审核人：</td>
         <td >{{FileCount.shr}}</td>
         <td class="column">审核日期：</td>
         <td >{{FileCount.shrq | formatDate}}</td>
       </tr>
       <tr >
         <td class="column">存放位置起始号：</td>
         <td >{{FileCount.cfwzqsh}}</td>
         <td class="column">进馆日期：</td>
         <td >{{FileCount.jgrq | formatDate}}</td>
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
        <td class="column">录音带：</td>
        <td >{{FileCount.lydNum}}</td>
        <td class="column">录像带：</td>
        <td >{{FileCount.lxdNum}}</td>
      </tr>
      <tr >
        <td class="column">保管期限：</td>
        <td >{{projectdetails.bgqxName}}</td>
        <td class="column">密级：</td>
        <td >{{projectdetails.mjName}}</td>
      </tr>
      <tr >
        <td class="column">附注：</td>
        <td colspan="3">{{projectdetails.fz}}</td>
      </tr>
    </table>
  
  </el-scrollbar>
    <!-- 文件级 -->
      <el-scrollbar v-loading="loading" v-if="projectName == 'files'">
    <!-- 基础信息 -->
    <table class="mailTable" >
      <tr >
        <td class="column">文件题名：</td>
        <td colspan="3">{{projectdetails.wjtm}}</td>
      </tr>
      <tr >
        <td class="column">文件档号：</td>
        <td >{{projectdetails.wjdh}}</td>
        <td class="column">总登记号：</td>
        <td >{{projectdetails.zdjh}}</td>
      </tr>
      <tr >
        <td class="column">文图号：</td>
        <td >{{projectdetails.wh}}</td>
        <td class="column">保管期限：</td>
        <td >{{projectdetails.bgqxName}}</td>
      </tr>
      <tr >
        <td class="column">密级：</td>
        <td >{{projectdetails.mjName}}</td>
        <td class="column">形成时间：</td>
        <td >{{projectdetails.xcsj | formatDate}}</td>
      </tr>
         <tr >
        <td class="column">数量(张/页)：</td>
        <td >{{projectdetails.sl}}</td>
        <td class="column">载体类型：</td>
        <td >{{projectdetails.ztlxName}}</td>
      </tr>
         <tr >
        <td class="column">录入人：</td>
        <td >{{projectdetails.lrr}}</td>
        <td class="column">录入时间：</td>
        <td >{{projectdetails.lrsj | formatDate}}</td>
      </tr>
       
         <tr >
        <td class="column">存放位置：</td>
        <td >
          <div class="cdyjstyle" v-for="(item,index) in FilePosition" :key="index">
                <template v-if="(index+1) !== FilePosition.length">
                  {{item}}、
                </template>
                <template v-if="(index+1) == FilePosition.length">
                  {{item}}
                </template>
              </div>
        </td>
        <td class="column">责任者：</td>
        <td >{{projectdetails.zrz}}</td>
      </tr>
         <tr >
        <td class="column">附注：</td>
         <td colspan="3">{{projectdetails.fz}}</td>
      </tr>
    </table>

  </el-scrollbar>

  </div>
</template>


<script>

import {
  getUtilizeUseEngineeringListSide,
  getOfflineProjectListEngineeringId,
  getUtilizeUseFilesListProjectId,
  getUtilizeUseFileListFilesId,
  getUtilizeUseFilesListEngineeringId,
  getOfflineFileCount,
  getOfflineProjectBuildList,// 获取建筑工程专业信息
  getOfflineProjectBridgeList,// 获取桥涵工程专业信息
  getOfflineProjectPipelineList,// 获取管线工程专业信息
  getOfflineProjectTrackList,// 获取轨道工程专业信息
  getOfflineProjectRoadList,// 获取道路工程专业信息
  getOfflineProjectTunnelList,//获取隧道工程专业信息
} from '@/api/OfflineManage'
import {
  searchFilesListFilesId,
  searchFilesListFileId,
  searchFilePosition,
} from '@/api/RecorSearch/recorsearch'
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
export default {
  name: 'specialtyDetailsFiles',
  props: {
    project_id: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    zt: {
      type: String,
      default: ''
    },
    filesrow:{
      type: Object,
    }
  },
  data () {
    return {
      loading:true, //信息正在加载中
      // 具体的专业信息名称
      projectName: '',
      projectId: '',
      archivesCateList:[],//单位工程类型
      storagePeriod:[],//保管期限
      projectdetails:[],//案卷信息
      fileCategory: [], // 案卷类别
      storagePeriod: [], // 保管期限
      secretGrade: [], // 密级
      carrierType: [], // 载体类型
      carrierTypefile:[],// 文件级载体类型
     FilePosition:[],//存放位置
     FileCount:{},//归档信息
    }
  },
  watch: {
    source: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        
        this.projectName = newVal
      }
    },

    project_id:{
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        
        this.project_id = newVal
        
      }
    },
  filesrow:{
        immediate:true,
        deep: true,
        handler(newVal, oldVal) {
          
          this.filesrow = newVal
          
        }
      },
    
  },
  created() {
    this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.getCarrierType()  // 载体类型 
    this.getCarrierTypefile() //文件级载体类型
    // this.searchFilePositionFun() //存放位置
    

  },
  beforeMount(){
    setTimeout(() => {
       this.searchFilesListFilesIdFun()
      }, 500)
    
  },
  methods:{
  //归档信息
    getOfflineFileCountFun(){
      const q ={
        files_id:this.project_id
      }
      getOfflineFileCount(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FileCount = res
        }
      })
    },

    searchFilePositionFun(){
      const q = {
        files_id:this.project_id,
      }
      searchFilePosition(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FilePosition  = res.position
        }
      })
    },

    // 获取案卷信息
    searchFilesListFilesIdFun(){
      if (this.projectName == 'project') {
      this.getOfflineFileCountFun() //归档信息

        var res = this.filesrow
        let storagePeriod = JSON.parse(JSON.stringify(this.storagePeriod));  
        storagePeriod.forEach(item =>{
          if (res.bgqx == item.bm) {
            res.bgqxName = item.mc
          }

        })
        let fileCategory = JSON.parse(JSON.stringify(this.fileCategory)); 
        fileCategory.forEach(item =>{
          if (res.ajlb == item.bm) {
            res.ajlbName = item.mc
          }

        })
        let secretGrade = JSON.parse(JSON.stringify(this.secretGrade)); 
        secretGrade.forEach(item =>{
          if (res.mj == item.bm) {
            res.mjName = item.mc
          }

        })
        let carrierType = JSON.parse(JSON.stringify(this.carrierType));  
        carrierType.forEach(item =>{
          if (res.ztlx == item.bm) {
            res.ztlxName = item.mc
          }

        })
        this.projectdetails = res
        this.loading = false
      } else if(this.projectName == 'files'){
        var res = this.filesrow
        let storagePeriod = JSON.parse(JSON.stringify(this.storagePeriod));  
        storagePeriod.forEach(item =>{
          if (res.bgqx == item.bm) {
            res.bgqxName = item.mc
          }

        })
        let secretGrade = JSON.parse(JSON.stringify(this.secretGrade));  
        secretGrade.forEach(item =>{
      
          if (res.mj == item.bm) {
            res.mjName = item.mc
          }

        })
        let carrierTypefile = JSON.parse(JSON.stringify(this.carrierTypefile));  
        carrierTypefile.forEach(item =>{
          if (res.ztlx == item.bm) {
            res.ztlxName = item.mc
          }

        })
        
        this.projectdetails = res
        this.loading = false
      }

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
    getCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
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
        }
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less">
.form{
  .form-true{
    @media all and (min-width:1290px) { 
          .el-form-item { 
           width:30% !important;
           margin-right:20px !important;
          } 
      }
      @media all and (max-width:1290px) { 
          .el-form-item { 
           width:42% !important;
           margin-right:20px !important;
          } 
      }
      
      
    .position{
      .hover{
        position: relative;
        .tips{
          position: absolute;
          top:-170px;
          left: 10px;
          width:200px;
          padding:10px;
          line-height: 20px;
          border-radius: 5px;
          z-index:99999;
          border:1px solid #eee;
          background: #eee;
          display: none;
        }
      }
      .hover:hover{
        .tips{
          display: block;
        }
      }
    }
    .btn{
      width:100% !important;
      margin-top:20px;
      margin-right:0;
      display: flex;
      justify-content: center;
    }
    .el-form-item__content{
      .el-input{
        width:220px;
        margin-right:5px;
      }
    }
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
