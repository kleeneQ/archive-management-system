<template>
  <div >
      <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>档案分类统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
      <el-card class="box-card" style="margin-bottom: 10px;" >
    <div class="tuname"> <span></span> 馆藏档案汇总</div>
      <el-row  :gutter="20">
        <el-col :span="5" class="collection-col"><div  @click="getAnalysisStatisticsCollectionFuns('engineering')" class="grid-content bg-purple bg-purple1">{{engineering_num}} <p>项目级总数（个）</p></div></el-col>
        <el-col :span="5" class="collection-col"><div  @click="getAnalysisStatisticsCollectionFuns('project')" class="grid-content bg-purple bg-purple2">{{project_num}} <p>工程级总数（个）</p></div></el-col>
        <el-col :span="5" class="collection-col"><div  @click="getAnalysisStatisticsCollectionFuns('files')" class="grid-content bg-purple bg-purple3">{{files_num}} <p>案卷级总数（个）</p></div></el-col>
        <el-col :span="5" class="collection-col"><div  @click="getAnalysisStatisticsCollectionFuns('file')" class="grid-content bg-purple bg-purple4">{{file_num}} <p>文件级总数（个）</p></div></el-col>
      </el-row>
  </el-card>
<!-- 图标区域 B -->
<el-card>
   <div class="tuname"> <span></span> 馆藏档案统计图</div>
         <el-row style="background-color: #fff;padding:10px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="统计层级">
            <el-select  v-model="queryInfo.type" placeholder="请选择统计层级" @change="getAnalysisStatisticsCollectionFun">
              <el-option v-for="(item,index) in typearr" :key="index" :label="item.label" :value="item.value" ></el-option>
            </el-select>
            </el-form-item>
      
            <el-form-item>
              <el-button type="primary" @click="getAnalysisStatisticsCollectionFun">生成统计</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <div id="main" style="width: 100%;height:700px;"></div>
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
} from '@/api/analysis'
import {
  getArchivesCateList
} from '@/api/archivesCate'
export default {
  data () {
    return {
      engineering_num:'',
      project_num:'',
      files_num:'',
      file_num:'',
      
      xAxis_data:[],
      engineeringType:[],
      seriesA:[],
      seriesB:[],
      seriesC:[],
      seriesD:[],
      seriesE:[],
      seriesF:[],
      seriesG:[],
      seriesH:[],
      seriesI:[],
      seriesJ:[],
      seriesK:[],
      seriesL:[],
      seriesM:[],
      seriesN:[],
      seriesO:[],
      seriesP:[],
      seriesQ:[],
      seriesR:[],
      queryInfo:{
        type:'engineering',
      },
      typearr:[
        {
          label:'项目级',
          value:'engineering',
        },
        {
          label:'工程级',
          value:'project',
        },
        {
          label:'案卷级',
          value:'files',
        },
        {
          label:'文件级',
          value:'file',
        },
      ],
    }
  },
  created () {
    this.getEngineeringTypeFun() //工程类型
  },
  beforeMount(){
  },
  mounted () {
   
  },
  methods: {
    
    getAnalysisStatisticsCollectionFuns(val){
      this.queryInfo.type = val
      this.getAnalysisStatisticsCollectionFun()
    },
     // 渲染函数
    rendererFun(){
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;    // 绘制图表

      option = {
        tooltip: {
          trigger: 'axis',
         
        },
        legend: {},
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
            data: this.xAxis_data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.engineeringType[0].type_name+'('+this.engineeringType[0].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesA
          },
          {
            name:  this.engineeringType[1].type_name+'('+this.engineeringType[1].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesB
          },
          {
            name:  this.engineeringType[2].type_name+'('+this.engineeringType[2].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesC
          },
          {
            name:  this.engineeringType[3].type_name+'('+this.engineeringType[3].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesD
          },
          {
            name:  this.engineeringType[4].type_name+'('+this.engineeringType[4].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesE
          },
          {
            name:  this.engineeringType[5].type_name+'('+this.engineeringType[5].type_code+')',
            type: 'bar',
            barWidth: 15,
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesF
          },
          {
            name:  this.engineeringType[6].type_name+'('+this.engineeringType[6].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:   this.seriesG
          },
          {
            name:  this.engineeringType[7].type_name+'('+this.engineeringType[7].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesH
          },
          {
            name:  this.engineeringType[8].type_name+'('+this.engineeringType[8].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesI
          },
          {
            name:  this.engineeringType[9].type_name+'('+this.engineeringType[9].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesJ
          },
          {
            name:  this.engineeringType[10].type_name+'('+this.engineeringType[10].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesK
          },
          {
            name:  this.engineeringType[11].type_name+'('+this.engineeringType[11].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesL
          },
          {
            name:  this.engineeringType[12].type_name+'('+this.engineeringType[12].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesM
          },
          {
            name:  this.engineeringType[13].type_name+'('+this.engineeringType[13].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesN
          },
          {
            name:  this.engineeringType[14].type_name+'('+this.engineeringType[14].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesO
          },
          {
            name:  this.engineeringType[15].type_name+'('+this.engineeringType[15].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesP
          },
          {
            name:  this.engineeringType[16].type_name+'('+this.engineeringType[16].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesQ
          },
          {
            name:  this.engineeringType[17].type_name+'('+this.engineeringType[17].type_code+')',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data:  this.seriesR
          },

        ]
      };

      option && myChart.setOption(option);

    },
    //统计分析馆藏档案汇总
    getAnalysisStatisticsCollectionSummaryFun(){
      const q ={

      }
      getAnalysisStatisticsCollectionSummary().then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.engineering_num = res.engineering_num
         this.project_num = res.project_num
         this.files_num = res.files_num
         this.file_num = res.file_num
        }
      })
    },

    // 统计分析馆藏档案统计
  getAnalysisStatisticsCollectionFun(){
    
    // var type = ''
    // if (this.queryInfo.type == 'file') {
    //       type =  'files'
    // }else {
    //   type = this.queryInfo.type
    // }
    const q ={
      type:this.queryInfo.type
    }
    console.log(this.queryInfo.type)
    getAnalysisStatisticsCollection(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.xAxis_data = res.xAxis_data
       this.seriesA = res.A
       this.seriesB = res.B
       this.seriesC = res.C
       this.seriesD = res.D
       this.seriesE = res.E
       this.seriesF = res.F
       this.seriesG = res.G
       this.seriesH = res.H
       this.seriesI = res.I
       this.seriesJ = res.J
       this.seriesK = res.K
       this.seriesL = res.L
       this.seriesM = res.M
       this.seriesN = res.N
       this.seriesO = res.O
       this.seriesP = res.P
       this.seriesQ = res.Q
       this.seriesR = res.R
        this.rendererFun() //渲染图表 函数
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
           this.getAnalysisStatisticsCollectionFun() 
            this.getAnalysisStatisticsCollectionSummaryFun()
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
  line-height: 40px;
  .bg-purple {
    height: 100%;
    font-size: 24px;
    font-weight: 700;
    padding-top: 30px;
    box-sizing: border-box;
    box-shadow: 3px 1px 5px rgb(215 215 215);
    color: #fff;
    p {
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
}

</style>
