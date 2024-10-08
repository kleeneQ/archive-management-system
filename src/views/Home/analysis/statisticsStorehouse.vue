<template>
  <div>
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>库房管理动态统计</el-breadcrumb-item>
    </el-breadcrumb>

    
    <el-card class="box-card StatisticsUtilizeform-item" style="margin-bottom: 10px;" >
    <div class="tuname"> <span></span> 馆藏档案统计</div>
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
            <el-form-item label="档案分类">
            <el-select  v-model="queryInfo.dalx" placeholder="请选择档案分类" @change="getStatisticsStorehouseCollectionSummaryFun">
              <el-option  label="全部" value="all" ></el-option>
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getStatisticsStorehouseCollectionSummaryFun">生成统计</el-button>
              <el-button type="info" plain @click="clearqueryInfoFun">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
        <el-row  :gutter="20">
        <el-col :span="4" class="collection-col">
          <div class="grid-content bg-purple bg-purple1">
          <span>本期</span> {{ssCollectionSummary.engineering_num}}<span>个</span><span>  同期</span> {{ssCollectionSummary.engineeringSameNum_num}}<span>个</span> 
          <div v-if="ssCollectionSummary.engineering_TorF" class="upRate"><span>同比</span>{{ssCollectionSummary.engineering_Rate}}↑</div>
          <div v-else class="downRate"><span>同比</span>{{ssCollectionSummary.engineering_Rate}}↓</div>
          <p>项目数量（个）</p>
          </div>
          </el-col>
        <el-col :span="4" class="collection-col">
          <div class="grid-content bg-purple bg-purple1">
          <span>本期</span> {{ssCollectionSummary.projectNum_num}}<span>个</span><span>  同期</span> {{ssCollectionSummary.projectSameNum_num}}<span>个</span> 
          <div v-if="ssCollectionSummary.project_TorF" class="upRate"><span>同比</span>{{ssCollectionSummary.project_Rate}}↑</div>
          <div v-else class="downRate"><span>同比</span>{{ssCollectionSummary.project_Rate}}↓</div>
          <p>工程数量（个）</p>
          </div>
          </el-col>
        <el-col :span="3" class="collection-col"><div class="grid-content bg-purple bg-purple3">{{ssCollectionSummary.filesNum_num}} <span>张</span>  <p>案卷（卷）</p></div></el-col>
        <el-col :span="3" class="collection-col"><div class="grid-content bg-purple bg-purple4">{{ssCollectionSummary.fileNum_num}} <span>张</span>  <p>文件（份）</p></div></el-col>
        <el-col :span="3" class="collection-col"><div class="grid-content bg-purple bg-purple5">{{ssCollectionSummary.wzNum}} <span>张</span>  <p>文字（页数）</p></div></el-col>
        <el-col :span="3" class="collection-col"><div class="grid-content bg-purple bg-purple5">{{ssCollectionSummary.tzNum}} <span>张</span>  <p>图纸（张）</p></div></el-col>
        <el-col :span="3" class="collection-col"><div class="grid-content bg-purple bg-purple5">{{ssCollectionSummary.zpNum}} <span>张</span>  <p>照片（张）</p></div></el-col>
      </el-row>
    </el-card>

    <el-card class="box-card StatisticsUtilizeform-item" style="margin-bottom: 10px;" >
    <div class="tuname"> <span></span> 库房统计</div>
      <el-row style="background-color: #fff;padding:10px;">
        <el-col>
          <el-form :inline="true" :model="ssSummaryForm" class="demo-form-inline">
            <el-form-item label="统计时间">
              <el-date-picker
                v-model="ssSummaryForm.start_time"
                type="datetime"
                 value-format="yyyy-MM-dd"
                placeholder="选择时间">
              </el-date-picker> —
            <el-form-item>
              <el-date-picker
                v-model="ssSummaryForm.end_time"
                type="datetime"
                 value-format="yyyy-MM-dd"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getStatisticsStorehouseSummaryFun">生成统计</el-button>
              <el-button type="info" plain @click="clearssSummaryFormFun">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="4" class="collection-col">
          <div class="grid-content bg-purple bg-purple1">
          <span>本期</span> {{ssSummary.same_num}}<span>个</span><span>  同期</span> {{ssSummary.now_num}}<span>个</span> 
          <div v-if="ssSummary.TorF" class="upRate"><span>同比</span>{{ssSummary.Rate}}↑</div>
          <div v-else class="downRate"><span>同比</span>{{ssSummary.Rate}}↓</div>
          <p>库房数量（个）</p>
          </div>
          </el-col>
      </el-row>
  
 
    </el-card>
  <el-card>
      <div id="main" style="width: 100%;height:700px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import {
  getStatisticsStorehouseCollectionSummary,
  getStatisticsStorehouseSummary,
  getStatisticsStorehouseData,
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
      
      queryInfo:{
        start_time:'',
        end_time:'',
        dalx:'',
      },
      engineeringType:[],
      ssCollectionSummary:{
        engineering_num:'',
        projectNum_num:'',
        filesNum_num:'',
        fileNum_num:'',
        wzNum:'',
        tzNum:'',
        zpNum:'',
      },
      ssSummaryForm:{
        start_time:'',
        end_time:'',
      },
      ssSummary:{
        same_num:'',
        now_num:'',
      },
      seriesData:[],
    }
  },
  created () {
    this.getEngineeringTypeFun() //工程类型
    
  },
  mounted () {
    this.getStatisticsStorehouseCollectionSummaryFun() // 统计分析库房管理动态统计
    this.getStatisticsStorehouseSummaryFun()  // 统计分析库房管理动态统计库房统计
  },
  methods: {
  // type your function
  
     // 渲染函数
    rendererFun(seriesdata){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表

      option = {
        title: {
          text: '库房使用占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '使用占比',
            type: 'pie',
            radius: '50%',
            data:  seriesdata,
            itemStyle: {
                normal: {
                  color: function (colors) {
                    var colorList = [
                      '#f9c956',
                      '#75bedc',
                      '#5470c6',
                      '#fc8251',
                      '#91cd77',
                      '#ef6567',
                    ];
                    return colorList[colors.dataIndex];
                  }
                },
              },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);

    },
    seriesDataFun(data){
      let seriesData = []
      data.forEach(item => {
        seriesData.push({
          value: item.value * 1, 
          name: item.name
        })
      });
      this.rendererFun(seriesData)
    },
    // 统计分析 - 统计分析库房管理动态统计饼图数据
  getStatisticsStorehouseDataFun(){
    getStatisticsStorehouseData(this.ssSummaryForm).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       console.log(res)
       this.seriesData = res
       this.seriesDataFun(res)
      }
    })
  },
  // 如未筛选时间段，则同期数据 = 本期数据，同比增长率=（本期数-同期数）÷同期数×100%
  growthRatecomputeFun(now,old){
     let num = (now-old)/old*100
     let Rate = String(num.toFixed(2))+'%'
     console.log(Rate)
     return Rate
  },
  // 统计分析库房管理动态统计库房统计
  getStatisticsStorehouseSummaryFun(){
    getStatisticsStorehouseSummary(this.ssSummaryForm).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.ssSummary = res
       this.ssSummary.Rate = this.growthRatecomputeFun(res.now_num,res.same_num)
       let TorF = res.now_num - res.same_num
       if (TorF >= 0) {
          this.ssSummary.TorF = true
       } else {
         this.ssSummary.TorF = false
       }
       console.log(this.ssSummary)
       this.getStatisticsStorehouseDataFun()
      }
    })
  },
  // 统计分析库房管理动态统计
    getStatisticsStorehouseCollectionSummaryFun(){
      getStatisticsStorehouseCollectionSummary(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.ssCollectionSummary = res
       this.ssCollectionSummary.engineering_Rate = this.growthRatecomputeFun(res.engineering_num,res.engineeringSameNum_num)
        let engineering_TorF = res.engineering_num - res.engineeringSameNum_num
        if (engineering_TorF >= 0) {
            this.ssCollectionSummary.engineering_TorF = true
        } else {
          this.ssCollectionSummary.engineering_TorF = false
        }
       this.ssCollectionSummary.project_Rate = this.growthRatecomputeFun(res.projectNum_num,res.projectSameNum_num)
        let project_TorF = res.projectNum_num - res.projectSameNum_num
        if (project_TorF >= 0) {
            this.ssCollectionSummary.project_TorF = true
        } else {
          this.ssCollectionSummary.project_TorF = false
        }

        }
      })
    },
    //重置查询表单
    clearqueryInfoFun(){
      this.queryInfo.start_time = ''
      this.queryInfo.end_time = ''
      this.queryInfo.dalx = 'all'
      this.getStatisticsStorehouseCollectionSummaryFun()
    },
    //重置查询表单
    clearssSummaryFormFun(){
      this.ssSummaryForm.start_time = ''
      this.ssSummaryForm.end_time = ''
      this.getStatisticsStorehouseSummaryFun()
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
    border-radius: 5px;
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
    background-color: #ed8beb;
  }
}

</style>
