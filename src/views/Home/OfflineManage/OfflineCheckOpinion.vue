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
          <li class="active"><strong>3</strong> 人工复审 <br> <span>真实性、完整性</span></li>
        　<li class="active"><strong>4</strong> 生成审核意见报告</li>
        </ul>

        <div class="CheckOpinionbox">
          <div class="titlebox">
            <div>工程档案离线移交审核意见</div>
          <div>
             <span>{{jsdw}}</span> 离线移交的 <span>{{dwgcmc}}</span> 电子档案经审核，存在部分问题，请根据审核意见清单所列内容进行修改完善。
          </div>
          </div>
          <div>需要修改、补充文件清单：</div>
           <!-- 需要修改、补充文件清单 B -->
          <el-table
              :data="offlineFileList"
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
                prop="files_id"
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
                prop="csjgms"
                label="审核结果描述"
                show-overflow-tooltip
                width="300">
              
              </el-table-column>
          </el-table>
        <!-- 需要修改、补充文件清单 E -->

         <div style="margin-top:50px;margin-bottom:10px;">缺少必要文件清单：</div>
         <!-- 缺失必要文件 B -->
          <el-table
              :data="offlineArchiveList"
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
                prop="gdmc"
                label="归档目录名称"
                show-overflow-tooltip
                min-width="250">
              </el-table-column>
              <el-table-column
                label="审核结果描述"
                show-overflow-tooltip
                prop="rqclms"
                width="300">
                <template slot-scope="scope">
                  <div >{{scope.row.rqclms}}</div>
                </template>
              </el-table-column>
          </el-table>
        <!-- 缺失必要文件 E -->
        </div>
        <div class="netbtnstyle">
          <el-button  @click="downloadFileOfflineOpinionDownloadFun()">打 印 报 告</el-button>
        </div>  
    </div>
  </div>
</template>

<script>
import {
  getOfflineLackEnclosure,
  getOfflineFileCount,
  getOfflineLackFileList,
  getOfflineLackFileHandle,
  getOfflineListSide,
  getOfflineCheckOpinion,
  downloadFileOfflineOpinionDownload
} from '@/api/OfflineManage'
import Download from "@/utils/download"
export default {
  data () {
    return {
      jsdw:"",
      dwgcmc:'',
      offlineArchiveList:[],
      offlineFileList:[],
    }
  },
  created () {
    this.project_id = this.$route.query.project_id
    this.engineering_id = this.$route.query.engineering_id
  },
  mounted () {
    this.getOfflineCheckOpinionFun() //获取工程档案离线移交审核意见数据
  },
  methods: {
  // type your function

  //获取工程档案离线移交审核意见数据
    getOfflineCheckOpinionFun(){
      const q ={
        engineering_id:this.engineering_id,
        project_id:this.project_id,
      }
      getOfflineCheckOpinion(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.jsdw = res.jsdw
         this.dwgcmc = res.dwgcmc
         this.offlineArchiveList = res.offlineArchiveList
         this.offlineFileList = res.offlineFileList
        }
      })
    },
    // 工程档案离线移交审核意见下载
    downloadFileOfflineOpinionDownloadFun(){
      const q = {
        engineering_id:this.engineering_id,
        project_id:this.project_id,
      }
      downloadFileOfflineOpinionDownload(q).then(response => {
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
        this.message({ message: '下载审核意见报告成功', type: 'success' })
      }).catch(error => {
        console.log(error)
      })
    },
         // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang='less'>
.CheckOpinionbox {
  width: 70%;
  margin: 0 auto;
  .titlebox {
    text-align: center;
    div {
      margin-bottom: 30px;
      line-height: 28px;
    }
  }
 
  span {
    display: inline-block;
    min-width: 200px;
    text-align: center;
    border-bottom: 1px solid #000;
  }
}
</style>
