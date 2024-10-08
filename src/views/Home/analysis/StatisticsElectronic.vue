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
                type="date"
                 value-format="yyyy-MM-DD"
                placeholder="选择开始时间">
              </el-date-picker> —
            <el-form-item>
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-DD"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getAnalysisStatisticsQualitySummaryFun">生成统计</el-button>
              <el-button type="info" plain @click="clearqueryInfoFun">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!-- 头部 面包屑导航 E -->
      <el-card class="box-card" style="margin-bottom: 10px;" >
    <div class="tuname"> <span></span> 电子文件质检接收汇总</div>
      <el-row  :gutter="20">
        <el-col :span="4" class="collection-col"><div class="grid-content bg-purple bg-purple1">{{quality_num}} <span>份</span> <p>质检总数</p></div></el-col>
        <el-col :span="4" class="collection-col"><div class="grid-content bg-purple bg-purple2">{{receive_num}} <span>份</span>  <p>接收总数</p></div></el-col>
      </el-row>
  </el-card>
<!-- 图标区域 B -->
<el-card>
   <div class="tuname"> <span></span> 电子文件质检接收统计分析</div>
   <el-card>
      <div id="main" style="width: 100%;height:700px;"></div>
  </el-card>
</el-card>
<!-- 图标区域 E -->
  </div>
</template>

<script>
import echarts from 'echarts'
import {
  getAnalysisStatisticsQualitySummary,
} from '@/api/analysis'
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
      },
      engineeringType:[],
      QueryConditionType:[],
      quality_num:'',
      receive_num:'',
    }
  },
  created () {

  },
  mounted () {
    this.getAnalysisStatisticsQualitySummaryFun()
    
  },
  methods: {
    //电子文件统计分析
    getAnalysisStatisticsQualitySummaryFun(){
      const q ={
      }
      getAnalysisStatisticsQualitySummary(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.quality_num = res.quality_num
         this.receive_num = res.receive_num
         this.rendererFun() //渲染函数
        }
      })
    },
    clearqueryInfoFun(){
      this.queryInfo.start_time = ''
      this.queryInfo.end_time = ''
      this.queryInfo.dalx = 'all'
      this.getAnalysisStatisticsQualitySummaryFun()
    },


     // 渲染函数
    rendererFun(){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表

      option = {
        title: {
          text: '电子文件质检接收统计分析',
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
            name: '统计分析',
            type: 'pie',
            radius: '50%',
            data: [
                { value: this.quality_num, name: '质检' },
                { value: this.receive_num, name: '接收' },
            ],
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
    background-color: #f9c956;
  }
  .bg-purple2 {
    background-color: #75bedc;
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
