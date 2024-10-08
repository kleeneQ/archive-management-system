<template>
  <div>
  <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>档案分类统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
  <el-card class="box-card" style="margin-bottom: 10px;">
    <div class="tuname"> <span></span> 档案分类统计分析柱状图</div>
      <el-row style="background-color: #fff;padding:10px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="统计年份">
            <el-select  v-model="queryInfo.tjnf" placeholder="请选择统计年份" @change="getAnalysisStatisticsClassificationFun">
              <el-option  label="全部" value="all" ></el-option>
              <el-option v-for="(item,index) in years" :key="index" :label="item.label" :value="item.value" ></el-option>
            </el-select>
              <!-- <el-input clearable v-model="queryInfo.tjnf" placeholder="请选择统计年份"  @change="getAnalysisStatisticsClassificationFun"></el-input> -->
            </el-form-item>
            <el-form-item label="统计地区">
              <el-input clearable v-model="queryInfo.tjdq" placeholder="请输入统计地区"  @change="getAnalysisStatisticsClassificationFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getAnalysisStatisticsClassificationFun">生成统计</el-button>
              <el-button type="info" plain @click="clearqueryInfoFun">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
  </el-card>
  <el-card class="box-card">
     <div id="main" style="width: 100%;height:800px;"></div>
  </el-card>
  </div>
</template>
<script>
import {
  getAnalysisStatisticsCollection,
  getAnalysisStatisticsClassification,
} from '@/api/analysis'
import echarts from 'echarts'
export default {
  data () {
    return {
      xaxis_data:[],
      legend_data:[],
      paper_data:[],
      proportion_data:[],
      electronics_data:[],
      paper_datalength:0,
      electronics_datalength:0,
      proportion_datamax:0,
      queryInfo:{
        tjnf:'all',
        tjdq:'',
      },
      years:[],//年份
    }
  },
  created () {
    this.getAnalysisStatisticsClassificationFun()
    },
  beforeMount(){
  },
  mounted(){
    this.getYear() //获取年份，当前年前5年
  },
  methods: {
    clearqueryInfoFun(){
      this.queryInfo.tjnf = 'all'
      this.queryInfo.tjdq = ''
      this.getAnalysisStatisticsClassificationFun()
    },
    //获取年份，当前年前5年
   	getYear(){
      		var y = new Date().getFullYear();
      		for(var i = 0 ; i <= 5 ; i++){
        		if(i<5){
          			this.years.unshift({value:(y - i),label:(y - i)})
        		}
     		 }
          console.log(this.years)
     	 },
    // 渲染函数
    rendererFun(){
// 基于准备好的dom，初始化echarts实例
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;    // 绘制图表

const colors = ['#5470C6', '#91CC75', '#EE6666'];
option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: this.legend_data
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: this.xaxis_data
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: this.legend_data[0],
      position: 'right',
      alignTicks: true,
      max:this.paper_datamax,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter:  function (value, index) {
              if (value >= 100000000) {
                return value / 100000000 + "亿";
              } else if (value >= 10000) {
                return value / 10000 + "万";
              } else {
                return value;
              }
            },
      }
    },
    {
      type: 'value',
      name: this.legend_data[1],
      position: 'right',
      alignTicks: true,
      max:this.electronics_datamax,
      offset: 80,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter:   function (value, index) {
              if (value >= 100000000) {
                return value / 100000000 + "亿";
              } else if (value >= 10000) {
                return value / 10000 + "万";
              } else {
                return value;
              }
            },
      }
    },
    {
      type: 'value',
      name: this.legend_data[2],
      position: 'left',
      alignTicks: true,
   
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        show: true,  
        interval: 'auto', 
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: this.legend_data[0],
      type: 'bar',
      data: this.paper_data
    },
    {
      name: this.legend_data[1],
      type: 'bar',
      yAxisIndex: 1,
      data: this.electronics_data
    },
    {
      name: this.legend_data[2],
      type: 'line',
      yAxisIndex: 2,
      data: this.proportion_data
    }
  ]
};

option && myChart.setOption(option);


},
  getAnalysisStatisticsClassificationFun(){
    let tjnf = this.queryInfo.tjnf
    if(this.queryInfo.tjnf == 'all'){
       tjnf = ''
    }
    
    const q ={
      year:tjnf.toString(),
      region:this.queryInfo.tjdq,
    }
    getAnalysisStatisticsClassification(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.proportion_data = res.proportion_data
       this.xaxis_data = res.xaxis_data
       this.legend_data = res.legend_data
       this.paper_data = res.paper_data
       this.electronics_data = res.electronics_data
       this.paper_datamax = 0
       this.electronics_datamax = 0
       this.proportion_datamax = 0
      let paper_data = res.paper_data
      let electronics_data = res.electronics_data
      let proportion_data = res.proportion_data

      this.paper_datamax = Math.max.apply(null, res.paper_data)
      this.electronics_datamax = Math.max.apply(null, res.electronics_data)
      this.proportion_datamax = Math.max.apply(null, res.proportion_data)
      if(this.proportion_datamax <= 90){
         this.proportion_datamax = this.proportion_datamax + 10
      }
       this.paper_datamax =  Math.ceil(this.paper_datamax +  this.paper_datamax*0.2)
       this.electronics_datamax =  Math.ceil(this.electronics_datamax +  this.electronics_datamax*0.2)
       this.rendererFun() //渲染函数
      }
    })
  },
  },
}
</script>
<style scoped lang='less'>
.box-card {
  margin-bottom: 20px;
}
.tuname {
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 10px;
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
</style>
