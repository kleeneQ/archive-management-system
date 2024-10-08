<template>
  <div  >
    <el-scrollbar >
    <!-- 基本信息 -->
    <table class="mailTable" >
      <tr>
        <thead>基本信息</thead>
      </tr>
      <tr >
        <td class="column">项目名称：</td>
        <td colspan="3">{{Engineeringdetails.gcmc}}</td>
      </tr>
      <!-- <tr >
        <td class="column">项目档号：</td>
        <td colspan="3">{{Engineeringdetails.gcdh}}</td>
      </tr> -->
      <tr >
        <td class="column">项目类型：</td>
        <td >{{Engineeringdetails.gclxName}}</td>
        <td class="column">项目地点：</td>
        <td >{{Engineeringdetails.gcdd}}</td>
      </tr>
      <tr >
        <td class="column">建设单位：</td>
        <td >{{Engineeringdetails.jsdw}}</td>
        <td class="column">代建单位：</td>
        <td >{{Engineeringdetails.djdw}}</td>
      </tr>
      <tr >
        <td class="column">勘察单位：</td>
        <td >{{Engineeringdetails.kcdw}}</td>
        <td class="column">施工单位：</td>
        <td >{{Engineeringdetails.sgdw}}</td>
      </tr>
      <tr >
        <td class="column">监理单位：</td>
        <td >{{Engineeringdetails.jldw}}</td>
        <td class="column">设计单位：</td>
        <td >{{Engineeringdetails.sjdw}}</td>
      </tr>
      <tr >
        <td class="column">立项批准单位：</td>
        <td >{{Engineeringdetails.lxpzdw}}</td>
        <td class="column">工程规划许可证号：</td>
        <td >{{Engineeringdetails.ghxkzh}}</td>
      </tr>
      <tr >
        <td class="column">工程总造价：</td>
        <td >{{Engineeringdetails.gczj}}</td>
        <td class="column">施工许可证号：</td>
        <td >{{Engineeringdetails.sgxkzh}}</td>
      </tr>
      <tr >
        <td class="column">总用地面积：</td>
        <td >{{Engineeringdetails.zydmj}}</td>
        <td class="column">工程结算：</td>
        <td >{{Engineeringdetails.gcjs}}</td>
      </tr>
      <tr >
        <td class="column">总建筑面积：</td>
        <td >{{Engineeringdetails.zjzmj}}</td>
        <td class="column">总长度：</td>
        <td >{{Engineeringdetails.zcd}}</td>
      </tr>
      <tr >
        <td class="column">开工时间：</td>
        <td >{{Engineeringdetails.gckgrq | formatDate}}</td>
        <td class="column">竣工时间：</td>
        <td >{{Engineeringdetails.gcjgrq | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">附注：</td>
        <td colspan="3">{{Engineeringdetails.fz}}</td>
      </tr>
    </table>

    <!-- 归档信息 -->
    <table class="mailTable" >
      <tr>
        <thead>归档信息</thead>
      </tr>
      <tr >
        <td class="column">录入人：</td>
        <td >{{Engineeringdetails.lrr}}</td>
        <td class="column">录入时间：</td>
        <td >{{Engineeringdetails.lrsj | formatDate}}</td>
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
        <td >{{Engineeringdetails.bgqxName}}</td>
        <td class="column">密级：</td>
        <td >{{Engineeringdetails.mjName}}</td>
      </tr>
      <tr >
        <td class="column">进馆日期：</td>
        <td >{{Engineeringdetails.jgrq | formatDate}}</td>
        <td class="column">移交单位：</td>
        <td >{{Engineeringdetails.jsdw}}</td>
      </tr>
    </table>
     <!-- 排检与编号 -->
    <!-- <table class="mailTable" >
      <tr>
        <thead>排检与编号</thead>
      </tr>
      <tr >
        <td class="column">档号：</td>
        <td >{{Engineeringdetails.gcdh}}</td>
        <td class="column">存放位置起始号：</td>
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
      </tr>
    </table> -->
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
  searchEngineeringList,
  searchEngineeringDownload,
  searchEngineeringEngineeringId,
  searchFilePosition,
} from '@/api/RecorSearch/recorsearch'
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
import {
  getArchivesCateList
} from '@/api/archivesCate'
export default {
  name: 'detailsEngineering',
  data () {
    return {
     Engineeringdetails:{},
     engineeringType:[],//项目工程类型
     storagePeriod: [], // 保管期限
     secretGrade: [], // 密级
     FilePosition:[],//存放位置
     FileCount:{},//归档信息
    }
  },
  props: {
    ID: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    
  },
  props: ['Engineeringrow'],
  components: {
    
  },
  computed: {
    
  },
  watch: {
    source: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        
        this.zt = newVal
      }
    },
     ID:{
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        
        this.Engineering_id = newVal
        
      }
    },
  
  },
  created () {
    this.Engineering_id = this.Engineeringrow.engineering_id
    this.zt = this.Engineeringrow.zt
    this.getEngineeringTypeFun() // 工程类型
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    // this.searchFilePositionFun() //存放位置
     this.getOfflineFileCountFun() //归档信息
  },
  mounted () {
  },
  methods: {
      //归档信息
    getOfflineFileCountFun(){
      const q ={
        engineering_id:this.Engineering_id
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
        engineering_id:this.Engineering_id,
      }
      searchFilePosition(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FilePosition  = res.position
        }
      })
    },
    //获取项目详情 数据
    searchEngineeringEngineeringIdFun(){
      this.Engineeringdetails = {}
      const q = {
        engineering_id:this.Engineering_id,
        zt:this.zt
      }
      
      var res = this.Engineeringrow
         this.engineeringType.map(item =>{
           if (res.gclx === item.type_code) {
               res.gclxName = item.type_name
              }
         })
         this.storagePeriod.map(item =>{
           if (res.bgqx === item.bm) {
               res.bgqxName = item.mc
              }
         })
         this.secretGrade.map(item =>{
           if (res.mj === item.bm) {
             res.mjName = item.mc
            }
         })

        this.Engineeringdetails = res
    },
        // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.engineeringType = res
          
          setTimeout(() => {
        this.searchEngineeringEngineeringIdFun()
      }, 500)
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
  },
}
</script>

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