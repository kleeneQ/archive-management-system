<template>
  <div >
      <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>数字化加工著录统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card StatisticsUtilizeform-item" style="margin-bottom: 10px;" >
      <el-row style="background-color: #fff;padding:10px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="统计时间">
              <!-- <el-date-picker
                v-model="queryInfo.start_time"
                type="month"
                 value-format="yyyy-MM-dd"
                placeholder="选择年月">
              </el-date-picker> —
            <el-form-item>
              <el-date-picker
                v-model="queryInfo.end_time"
                type="month"
                 value-format="yyyy-MM-dd"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item> -->

              <el-date-picker
                v-model="queryInfo.time"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changedataFun"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getAnalysisStatisticsDigitSummaryFun">生成统计</el-button>
              <el-button type="info" plain @click="clearqueryInfoFun">重 置</el-button>
              <el-button type="primary" class="btnedit" @click="getAnalysisStatisticsDigitSummaryExportFun">导 出</el-button>

            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!-- 头部 面包屑导航 E -->
      <el-card class="box-card" style="margin-bottom: 10px;" >
    <div class="tuname"> <span></span> 数字化加工著录汇总</div>
      <el-row  :gutter="20">
        <el-col :span="6" class="collection-col"><div class="grid-content bg-purple bg-purple1">{{filesNum}}<span>卷</span> {{pageNumTotal}}页/张 <p>著 录 总 数</p></div></el-col>
        <el-col :span="6" class="collection-col"><div class="grid-content bg-purple bg-purple2">{{wzTotalNum}} <span>卷</span> {{wzPageNum}} <span>页</span>  <p>文 字 卷 总 数</p></div></el-col>
        <el-col :span="6" class="collection-col"><div class="grid-content bg-purple bg-purple3">{{tpTotalNum}} <span>卷</span> {{tpPageNum}} <span>张</span>  <p>图 纸 卷 总 数</p></div></el-col>
      </el-row>
  </el-card>
<!-- 图标区域 B -->
<el-card>
   <div class="tuname"> <span></span> 数字化加工著录统计表</div>
   
          <el-table
              :data="dataList"
              border
              style="width: 100%"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'35px'}"
            >
              <el-table-column
                label="序号"
                type="index"
                
                width="80">
              </el-table-column>
              <el-table-column
                prop="lrr"
                
                label="著录人员姓名"
                show-overflow-tooltip
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="files_num"
                label="著录总数（卷）"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="page_num_total"
                label="案卷附件总数（页/张）"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="wztotal_num"
                label="文字总数（卷）"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="wzpage_num"
                label="文字总数（页）"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="tztotal_num"
                label="图纸总数（卷）"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="tzpage_num"
                label="图纸总数（张）"
                min-width="200">
              </el-table-column>
            </el-table>
</el-card>
<!-- 图标区域 E -->
  </div>
</template>

<script>
import echarts from 'echarts'
import {
  getAnalysisStatisticsCollection,
  getAnalysisStatisticsClassification,
  getAnalysisStatisticsCollectionSummary,
  getAnalysisStatisticsUtilizeSummary,
  getAnalysisStatisticsUtilize,
  getAnalysisStatisticsDigitSummaryExport,
  getAnalysisStatisticsDigitSummary,
  getAnalysisStatisticsDigitSummaryList,
} from '@/api/analysis'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import Download from "@/utils/download"
export default {
  data () {
    return {
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        filesNum:'',
        tpTotalNum:'',
        wzPageNum:'',
        wzTotalNum:'',
        tpPageNum:'',
        pageNumTotal:'',
      queryInfo:{
        start_time:'',
        end_time:'',
        time:[],
      },
      dataList:[],
    }
  },
  created () {
  },
  mounted () {
    this.getAnalysisStatisticsDigitSummaryFun()
  },
  methods: {
    changedataFun(){
      this.getAnalysisStatisticsDigitSummaryFun()
    },
    // 统计分析 - 统计分析数字化加工著录统计表
    getAnalysisStatisticsDigitSummaryListFun(){
      if ( this.queryInfo.time == null) {
         var start_time = ''
       var end_time = ''
      } else {
         var start_time = this.queryInfo.time[0]
       var end_time = this.queryInfo.time[1]
      }
      const q ={
        start_time:start_time,
        end_time:end_time,
      }
      getAnalysisStatisticsDigitSummaryList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.dataList = res
        }
      })
    },
    // 统计分析 - 统计分析数字化加工著录汇总
    getAnalysisStatisticsDigitSummaryFun(){
      if ( this.queryInfo.time == null) {
         var start_time = ''
       var end_time = ''
      } else {
         var start_time = this.queryInfo.time[0]
       var end_time = this.queryInfo.time[1]
      }
      
      const q ={
        start_time:start_time,
        end_time:end_time,
      }
      console.log(q)
      getAnalysisStatisticsDigitSummary(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.pageNumTotal = res.pageNumTotal
         this.filesNum = res.filesNum
         this.wzPageNum = res.wzPageNum
         this.wzTotalNum = res.wzTotalNum
         this.tpTotalNum = res.tpTotalNum
         this.tpPageNum = res.tpPageNum
        }
    this.getAnalysisStatisticsDigitSummaryListFun()
      })
    },
    //统计分析数字化加工著录统计表数据导出
    getAnalysisStatisticsDigitSummaryExportFun(){
      if ( this.queryInfo.time == null) {
         var start_time = ''
       var end_time = ''
      } else {
         var start_time = this.queryInfo.time[0]
       var end_time = this.queryInfo.time[1]
      }
      const q ={
        start_time:start_time,
        end_time:end_time,
      }
      getAnalysisStatisticsDigitSummaryExport(q).then(response =>{
        
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


    clearqueryInfoFun(){
      this.queryInfo.start_time = ''
      this.queryInfo.end_time = ''
      this.queryInfo.time = []
      this.getAnalysisStatisticsDigitSummaryFun()
    },


  },
}
</script>
<style lang="less">
.StatisticsUtilizeform-item {
  .el-form-item {
    margin-right: 18px !important;
  }
}
</style>
<style scoped lang='less'>
.tuname {
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  span {
    float: left;
    height: 30px;
    width: 5px;
    margin-right: 5px;
    background-color: #d9001b;
  }
}
.collection-col {
  text-align: center;
  height: 120px;
  .bg-purple {
    height: 100%;
    font-size: 24px;
    font-weight: 700;
    padding-top: 30px;
    box-sizing: border-box;
    box-shadow: 3px 1px 5px rgb(215 215 215);
    color: #fff;
    span {
      font-size: 14px;
    }
    p {
      margin-top: 5px;
      font-size: 18px;
      font-weight: normal;
      
    }
  }
  .bg-purple1 {
    background-color: rgb(26 188 156);
  }
  .bg-purple2 {
    background-color: rgba(0, 191, 191, 1);
  }
  .bg-purple3 {
    background-color: rgba(0, 128, 128, 1);
  }
  .bg-purple4 {
    background-color: rgba(245, 154, 35, 1);
  }
  .bg-purple5 {
    background-color: rgb(123, 77, 18);
  }
}

</style>
