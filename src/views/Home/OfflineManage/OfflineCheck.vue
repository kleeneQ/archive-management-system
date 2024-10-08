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
          <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
        </el-col>
      </el-row>
      <ul class="Steps">
      　<li class="active"><strong>1</strong> 系统初审 <br> <span>查缺、查误</span></li>
      　<li><strong>2</strong> 初审报告</li>
        <li><strong>3</strong> 人工复审 <br> <span>真实性、完整性</span></li>
      　<li><strong>4</strong> 生成审核意见报告</li>
      </ul>
      <div style="height: 500px; padding-left:80px;" class="Stepsbox">
        <el-steps direction="vertical" :active="6" finish-status="success" :space="200">
          <el-step title="第一步" description="审核项目信息完整性、准确性"></el-step>
          <el-step title="第二步" description="审核工程信息完整性、准确性"></el-step>
          <el-step title="第三步" description="审核案卷信息完整性、准确性"></el-step>
          <el-step title="第四步" description="审核文件信息完整性、准确性"></el-step>
          <el-step title="第五步" description="审核附件信息完整性、真实性"></el-step>
          <el-step title="第六步" description="生成系统初审报告"></el-step>
        </el-steps>
      </div>
      <div class="netbtns">
          <el-button   @click="gotoPage">查看系统自审报告</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
  // type your function
    //下一步
    gotoPage(){
      this.$router.push({  
            path: '/OfflineManage/OfflineLack',  
            query: {
              project_id: this.$route.query.project_id,
              engineering_id: this.$route.query.engineering_id,
            },
           
        }) 
    },

     // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang='less'>
.bodybox {
  background-color: #fff;
  padding: 30px 10px;
}
.netbtns {
  width: 600px;
  text-align: center;
  
}
.Stepsbox {
  .el-step.is-vertical .el-step__title {
    font-size: 18px;
  }
}
 .Steps {
   height: 100px;
 }
  .Steps li {
   padding: 15px 0px 0 35px;
   box-sizing: border-box;
   height: 50px;
   background: #D4D4D4;
   display: inline-block;
   color: #000;
   position: relative;
   float: left;
   font-size: 18px;
   margin-right: 5px;
   text-align: center;
   line-height: 16px;
   cursor: pointer;
   span {
     font-size: 11px;
   }
  }
  
  .Steps li:after {
   content: '';
   display: block;
   border-top: 25px solid #D4D4D4;
   border-bottom: 25px solid #D4D4D4;
   border-left: 25px solid #fff;
   position: absolute;
   right: -25px;
   top: 0;
  }
  .Steps li:after {
   content: '';
   display: block;
   border-top: 25px solid transparent;
   border-bottom: 25px solid transparent;
   border-left: 25px solid #D4D4D4;
   position: absolute;
   right: -25px;
   top: 0;
   z-index: 10;
  }
  .Steps li:before {
   content: '';
   display: block;
   border-top: 25px solid #D4D4D4;
   border-bottom: 25px solid #D4D4D4;
   border-left: 25px solid #fff;
   position: absolute;
   left: 0px;
   top: 0;
  }
  .Steps li:first-child {
   border-radius: 4px 0 0 4px;
   padding-left: 25px;
  }
  .Steps li:first-child:before {
   display: none;
  }
  .Steps li:last-child:after {
   display: none;
  }
  .Steps li:last-child{
   border-radius: 4px 0 0 4px;
   padding-right: 25px;
  }
  .Steps li.active {
   background-color: #019BF2;
   color: #fff;
  }
  .Steps li.active:after {
   border-left-color: #019BF2;
  }
  .Steps li.active:before {
   border-top-color: #019BF2;
   border-bottom-color: #019BF2;
  }
</style>
