<template>
  <div >
      <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>档案分类统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card StatisticsUtilizeform-item" style="margin-bottom: 10px;" >
      <el-row style="background-color: #fff;padding:10px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="统计时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="datetime"
                 value-format="yyyy-MM-dd"
                placeholder="选择时间">
              </el-date-picker> —
            <el-form-item>
              <el-date-picker
                v-model="queryInfo.end_time"
                type="datetime"
                 value-format="yyyy-MM-dd"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
            </el-form-item>
            <el-form-item label="统计档案类型">
            <el-select  v-model="queryInfo.dalx" placeholder="请选择统计档案类型" @change="getAnalysisStatisticsUtilizeSummaryFun">
              <el-option  label="全部" value="all" ></el-option>
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getAnalysisStatisticsUtilizeSummaryFun">生成统计</el-button>
              <el-button type="info" plain @click="clearqueryInfoFun">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!-- 头部 面包屑导航 E -->
      <el-card class="box-card" style="margin-bottom: 10px;" >
    <div class="tuname"> <span></span> 档案利用汇总</div>
      <el-row  :gutter="20">
        
        <el-col :span="4" class="collection-col">
          <div class="grid-content bg-purple bg-purple1">
          <span>本期</span> {{UtilizeSummary.query_user}}<span>次</span><span>  同期</span> {{UtilizeSummary.query_user_same}}<span>次</span> 
          <div v-if="UtilizeSummary.TorF" class="upRate"><span>同比</span>{{UtilizeSummary.Rate}}↑</div>
          <div v-else class="downRate"><span>同比</span>{{UtilizeSummary.Rate}}↓</div>
          <p>查询利用人（单位）</p>
          </div>
          </el-col>
          
        <el-col :span="4" class="collection-col">
          <div class="grid-content bg-purple bg-purple2">
          <span>本期</span> {{UtilizeSummary.query_utilize}}<span>卷</span><span>  同期</span> {{UtilizeSummary.query_utilize_same}}<span>卷</span> 
          <div v-if="UtilizeSummary.query_utilize_TorF" class="upRate"><span>同比</span>{{UtilizeSummary.query_utilize_Rate}}↑</div>
          <div v-else class="downRate"><span>同比</span>{{UtilizeSummary.query_utilize_Rate}}↓</div>
          <p>查询利用档案</p>
          </div>
          </el-col>
        <el-col :span="4" class="collection-col"><div class="grid-content bg-purple bg-purple3">{{copy_paper}} <span>张</span>  <p>复印图纸文字</p></div></el-col>
        <el-col :span="4" class="collection-col"><div class="grid-content bg-purple bg-purple4">{{develop_films}} <span>张</span>  <p>翻拍冲洗照片</p></div></el-col>
        <el-col :span="4" class="collection-col"><div class="grid-content bg-purple bg-purple5">{{copy_disc}} <span>张</span>  <p>复制光盘</p></div></el-col>
      </el-row>
  </el-card>
<!-- 图标区域 B -->
<el-card>
   <div class="tuname"> <span></span> 利用统计分析</div>
   <div class="">
        <div>

        y轴 <el-select  v-model="queryInfo.type_num" placeholder="请选择" @change="getAnalysisStatisticsUtilizeFun">
           <el-option label="人次" value="rc"></el-option>
           <el-option label="占比" value="zb"></el-option>
         </el-select>
        </div>
        <div>
          
        x轴 <el-select  v-model="queryInfo.xAxis_data" placeholder="请选择" @change="getAnalysisStatisticsUtilizeFun">
           <el-option label="查档目的" value="cdmd"></el-option>
           <el-option label="查档类别" value="cdlb"></el-option>
         </el-select>
        </div>
            
   </div>
    <div id="main" style="width: 100%;height:700px;" >
    </div>
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
} from '@/api/analysis'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
export default {
  data () {
    return {
      query_user:'',
      query_utilize:'',
      copy_paper:'',
      develop_films:'',
      copy_disc:'',
      
      xAxis_data:[],
      engineeringType:[],
      series1:[],
      series2:[],
      series3:[],
      series4:[],
      series5:[],
      queryInfo:{
        start_time:'',
        end_time:'',
        dalx:'all',
        xAxis_data:"cdmd",
        type_num:"rc",
      },
      engineeringType:[],
      QueryConditionType:[],
      series:[],
      seriesarr:[],
      legend_CDMD:[],
      legend_CDLB:[],
      UtilizeSummary:{},
    }
  },
  created () {
    this.getEngineeringTypeFun() //工程类型
    this.getQueryConditionType()
    this.getQueryConditionType_CDMD()
  },
  mounted () {
    this.getAnalysisStatisticsUtilizeSummaryFun()
  },
  methods: {
    clearqueryInfoFun(){
      this.queryInfo.start_time = ''
      this.queryInfo.end_time = ''
      this.queryInfo.dalx = 'all'
      this.getAnalysisStatisticsUtilizeFun()
    },
  // 如未筛选时间段，则同期数据 = 本期数据，同比增长率=（本期数-同期数）÷同期数×100%
  growthRatecomputeFun(now,old){
    if (now==0 && old) return Rate = 0
     let num = (now-old)/old*100
     let Rate = String(num.toFixed(2))+'%'
     console.log(Rate)
     return Rate
  },

         //查档类别
     getQueryConditionType() {
      const q = {
        bm: "DICT_CDLB"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryConditionType  = res
          res.forEach(item =>{
            this.legend_CDLB.unshift(item.mc)
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
         //查档目的
     getQueryConditionType_CDMD() {
      const q = {
        bm: "DICT_CDMD"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryConditionType_CDMD  = res
          res.forEach(item => {
            this.legend_CDMD.unshift(item.mc)
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },

     // 渲染函数
    rendererFun_cdlb(){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表
      console.log('rendererFun_cdlb')
      option = {
          tooltip: {
              trigger: 'axis',
          },
          legend: {
              data: this.legend_CDLB
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          grid: {
            with:"80%",
            top : '13%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.legend_CDMD
              }
          ],
          yAxis: [
              {
                type: 'value',
                name: '人次',
                min:'dataMin', //取最小值为最小刻度
                max: 'dataMax', //取最大值为最大刻度
                position: 'left',
                axisLabel: {
                    formatter: '{value}'
                }
            }
          ],
          series: this.series
      };
      option && myChart.setOption(option);

    },
     // 渲染函数  查档类别
    rendererFun_cdmd(){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表
      console.log('rendererFun_cdmd')
      option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data:this.legend_CDMD,
        },
        grid: {
          with:"80%",
          top : '13%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
        xAxis: [
          {
            type: 'category',
            data: this.legend_CDLB
          }
        ],
        yAxis: [
            {
                type: 'value',
            }
        ],
        series:this.series
      };
      option && myChart.setOption(option);

    },

     // 渲染函数  查档类别  占比
    rendererFun_cdmd_zb(){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表
      option = {
         tooltip: {
          trigger: "axis",
        },
        legend: {
          data:this.legend_CDMD,
        },
        grid: {
          with:"80%",
          top : '13%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
        xAxis: [
          {
            type: 'category',
            data: this.legend_CDLB
          }
        ],
        yAxis: [
            {
                type: 'value',
                name: '占比',
                min: 0,
                max: 100,
                position: 'left',
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series:this.series
      };
      option && myChart.setOption(option);

    },
  // 渲染函数
    rendererFun_cdlb_zb(){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表
      option = {
         tooltip: {
          trigger: "axis",
        },
          legend: {
              data: this.legend_CDLB
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          grid: {
            with:"80%",
            top : '13%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.legend_CDMD
              }
          ],
          yAxis: [
              {
                type: 'value',
                name: '占比',
                min: 0,
                max: 100,
                position: 'left',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
          ],
          series: this.series
      };
      option && myChart.setOption(option);

    },
    seriesFun_cdlb(){
      this.series = []
      this.legend_CDLB.forEach((item,i) =>{
        this.series.push({
          name:item,
          type:'bar',
          data:this.seriesarr[i]
        })
      })
      if (this.queryInfo.type_num == 'zb') {
        this.rendererFun_cdlb_zb()
      } else {
        this.rendererFun_cdlb()
      }
      
    },
    seriesFun_cdmd(){
      this.series = []
      this.legend_CDMD.forEach((item,i) =>{
        this.series.push({
          name:item,
          type:'bar',
          data:this.seriesarr[i]
        })
      })
      console.log(this.series)
      if (this.queryInfo.type_num == 'zb') {
        this.rendererFun_cdmd_zb()
      } else {
        this.rendererFun_cdmd()
      }
    },
    //统计分析档案利用汇总
    getAnalysisStatisticsUtilizeSummaryFun(){
      let dalx = this.queryInfo.dalx
      if(this.queryInfo.dalx == 'all'){
        dalx = ''
      }
      const q ={
        start_time:this.queryInfo.start_time,
        end_time:this.queryInfo.end_time,
        dalx:dalx,
      }
      getAnalysisStatisticsUtilizeSummary(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.query_user = res.query_user
         this.query_utilize = res.query_utilize
         this.copy_paper = res.copy_paper
         this.develop_films = res.develop_films
         this.copy_disc = res.copy_disc
         this.UtilizeSummary = res

         this.UtilizeSummary.Rate = this.growthRatecomputeFun(res.query_user,res.query_user_same)
          let TorF = res.query_user - res.query_user_same
          if (TorF >= 0) {
              this.UtilizeSummary.TorF = true
          } else {
            this.UtilizeSummary.TorF = false
          }
         this.UtilizeSummary.query_utilize_Rate = this.growthRatecomputeFun(res.query_utilize,res.query_utilize_same)
          let query_utilize_TorF = res.query_utilize - res.query_utilize_same
          if (query_utilize_TorF >= 0) {
              this.UtilizeSummary.query_utilize_TorF = true
          } else {
            this.UtilizeSummary.query_utilize_TorF = false
          }

    this.getAnalysisStatisticsUtilizeFun() 
        }
      })
    },

    // 统计分析馆藏档案统计
  getAnalysisStatisticsUtilizeFun(){
    let dalx = this.queryInfo.dalx
      if(this.queryInfo.dalx == 'all'){
        dalx = ''
      }
      const q ={
        start_time:this.queryInfo.start_time,
        end_time:this.queryInfo.end_time,
        dalx:dalx,
        xAxis_data:this.queryInfo.xAxis_data,
        type_num:this.queryInfo.type_num,
      }
    getAnalysisStatisticsUtilize(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      this.seriesarr = []
       this.xAxis_data = res.xAxis_data
       console.log(res.xAxis_data.Length)
       if (res.DICT_CDMD_1 == undefined) {
         this.seriesarr = [res.DICT_CDLB_1,res.DICT_CDLB_2,res.DICT_CDLB_3,res.DICT_CDLB_4,res.DICT_CDLB_5]
         this.seriesFun_cdlb()
         console.log('cdlb')
       } else {
         this.seriesarr = [res.DICT_CDMD_1,res.DICT_CDMD_2,res.DICT_CDMD_3,res.DICT_CDMD_4,res.DICT_CDMD_5,res.DICT_CDMD_6,res.DICT_CDMD_7,res.DICT_CDMD_8,res.DICT_CDMD_9]
         
      this.seriesFun_cdmd()
         console.log('cdmd')
      // this.rendererFun_cdmd() //渲染图表 函数
       }
       console.log(this.seriesarr)
      }
    })
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
    padding-top: 20px;
    box-sizing: border-box;
    box-shadow: 3px 1px 5px rgb(215 215 215);
    color: #fff;
     .upRate {
      color: #bf0606;
      span {
        color: #fff;
      }
    }
    .downRate {
      color: #085fe7;
      span {
        color: #fff;
      }
    }
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
