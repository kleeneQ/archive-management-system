<template>

  <div class='container'>
     <!-- 头部 面包屑导航 B --> 
      <el-breadcrumb class="jbxz" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/boxshelving' }">盒上架</el-breadcrumb-item>
        <el-breadcrumb-item>脊背下载</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
  <!-- 头部 面包屑导航 E --> 
   
    <el-row>
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
      <el-col :span="6" >
        <el-button size="small" @click="downloadImportTemplateFun">下 载</el-button>
      </el-col>
    </el-row>
    <!-- <img src="@/assets/backimg.png" alt=""> -->
    <div class="rowbox">
      <el-row>
        <el-col :span="itme.box_size == '3公分'?4:6" v-for="(itme,index) in BoxBacklist" :key='index'>
          <div class="back">{{itme.back_up}}<div>{{itme.back_down}}</div> </div>
          <div class="xmdh"><div>档号</div>{{itme.xmdh_up}}<div>{{itme.xmdh_down}}</div></div>
          <div class="xmmc"><div>{{itme.xmmc}}</div></div>
          <div class="ajlx"><div>{{itme.ajlx}}</div><div>{{itme.box_num}}</div></div>
        </el-col>
        
      </el-row>
    </div>
  </div>
</template>

<script>
import Download from "@/utils/download"
import {
  getBoxshelvingList,
  UnPacketBox,
  UndercarriageBox,
  BoxAutoShelving,
  BoxManualShelving,
  BoxStoreHouseListRecordId,
  BoxBackDownload,
  getBoxBack,
} from "@/api/boxshelving/boxshelving"
export default {
  data () {
    return {
      box_ids:'',//案卷ID 合集
      BoxBacklist:[],//脊背 数据
      boxSizelist:[],//盒大小 数据
    }
  },
  created () {
   this.box_ids =  this.$route.query.box_ids
  },
  mounted () {
    this.getBoxBackFun()
  },
  methods: {
  // type your function
  getBoxBackFun(){
    const q ={
      box_ids:this.box_ids,
    }
    getBoxBack(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.BoxBacklist = res
      }
    })
  },
     // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },

    // 下载文件
    downloadImportTemplateFun() {
      this.boxSizelist = []
      this.BoxBacklist.forEach(itme => {
         this.boxSizelist.push(itme.box_size)
      });
      console.log(this.boxSizelist)
      const q = {
        box_ids:this.box_ids,
        box_size:this.boxSizelist.join('#'),
      }
      BoxBackDownload(q).then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'application/msword;charset=utf-8'})
        Download.download(
          blob,
          fileName
        )
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<style scoped lang='less'>
.jbxz {
  background: transparent;
  padding-left: 0px;
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
    color: #99a9bf !important;
  }
  }
  
}
  .rowbox {
    margin: 50px;
    width: 812px;
    text-align: center;
    .el-col{
      margin: 10px 0;
      border: 1px #99a9bf dotted;
    }
  }
  .rowboxbottom {
    margin: 50px;
    width: 812px;
  }
  .back {
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #99a9bf;
    font-family:"黑体";
    font-size: 24px;
  }
  .xmdh {
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #99a9bf;
  }
  .xmmc {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #99a9bf;
    text-align: center;
    div {
      display: inline-block;
      text-align: justify;
      writing-mode: vertical-rl;
      font-size: 24px;
      font-weight: 700;
      height: 400px;
      line-height: 40px;
    }
  
  }
  .ajlx {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    font-family:"黑体";
    font-weight: 700;
  }
</style>
