<template>
  <div>
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>馆内办公流程</el-breadcrumb-item>
      <el-breadcrumb-item>公文打印</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <div class="bodybox">
      
      <el-row>
        <el-col :span="6">
          <el-button plain icon="el-icon-arrow-left" @click="goBackPage">返回</el-button>
          <el-button type="success" icon="el-icon-printer" @click="downloadOfficeFilePrintFun">打印</el-button>
        </el-col>
      </el-row>


      <div class="Print_box">
        <div class="Print_box_title">{{file_info.file_title}}</div>
        <div class="Print_box_bh" v-if="file_info.file_code">编号：{{file_info.file_code}}</div>
        <div class="row-box">
          <el-row>
            <el-col :span="6"><div class="grid-content grid-content-title">标题</div></el-col>
            <el-col :span="18"><div class="grid-content grid-content-right">{{file_info.file_title}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content grid-content-title">发件人</div></el-col>
            <el-col :span="6"><div class="grid-content grid-content-right">{{file_info.file_publish_man}}</div></el-col>
            <el-col :span="6"><div class="grid-content grid-content-title">来文时间</div></el-col>
            <el-col :span="6"><div class="grid-content grid-content-right">{{file_info.file_create_time}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content grid-content-title">公文来源</div></el-col>
            <el-col :span="6"><div class="grid-content grid-content-right">{{file_info.file_source}}</div></el-col>
            <el-col :span="6"><div class="grid-content grid-content-title">摘要</div></el-col>
            <el-col :span="6"><div class="grid-content grid-content-right">{{file_info.file_summary}}</div></el-col>
          </el-row>
           <el-row>
            <el-col :span="6"><div class="grid-content grid-content-title">公文正文</div></el-col>
            <el-col :span="18"><div class="grid-content grid-content-right" v-html="file_info.file_info"></div>
              <p class="Print_C_row_right_fj" v-for="(furl_item,furl_index) in file_url" :key="furl_index">
                {{furl_item.file_name}}
              </p></el-col>
          </el-row>
          <el-row v-for="(fa_item,fa_index) in file_approve" :key="fa_index">
            <el-col :span="6"><div class="grid-content grid-content-title">公文审批</div></el-col>
            <el-col :span="18">
              <div class="grid-content grid-content-right"><div v-for="(faitem_item,faitem_index) in fa_item" :key="faitem_index">{{faitem_item}}</div></div>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content grid-content-title">签收信息</div></el-col>
            <el-col :span="18">
              <div class="grid-content grid-content-right">
                <div  v-for="(fs_item,fs_index) in file_sign" :key="fs_index">【{{fs_item.sign_man}}】</div>
              </div>
              </el-col>
          </el-row>
        </div>


      </div>
    </div>
  </div>
</template>

<script>

import {
  getOfficeFilePrintData,
  downloadOfficeFilePrint,
} from '@/api/office'
import Download from "@/utils/download"
export default {
  data () {
    return {
      file_id:'',
      file_info:{},
      file_url:[],
      file_approve:[],
      file_sign:[],
      size: ''
    }
  },
  created () {
    
  },
  mounted () {
    this.file_id = this.$route.query.fileid
    console.log(this.file_id)
    this.getOfficeFilePrintDataFun() //获取打印数据
  },
  methods: {
  // type your function
  downloadOfficeFilePrintFun(){
    const q ={
      file_id:this.file_id
    }
    downloadOfficeFilePrint(q).then(response =>{
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
    //获取打印数据
    getOfficeFilePrintDataFun(){
      const q ={
        file_id:this.file_id,
      }
      getOfficeFilePrintData(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.file_info = res.file_info
         this.file_url = res.file_url
         this.file_approve = res.file_approve
         this.file_sign = res.file_sign
        }
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
.border_bottom {
  border-bottom: 1px solid #ddd;
}
.row-box {
  border-top: 1px solid #ddd ;
  .el-row {
    
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #ddd ;
        border-left:1px solid #ddd ;
        .el-col{
          height: 100%;
        }
  }
}
.grid-content {
  text-align: left;
  padding: 5px 5px 5px 10px;
  box-sizing: border-box;
  min-height: 40px;
  line-height: 30px;
}
.grid-content-right {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}
.Print_C_row_right_fj {
    border-left: 1px solid #ddd;
    padding-left: 10px;
    padding-bottom: 10px;
    border-right: 1px solid #ddd;
  }
.grid-content-title {
    text-align:center ;
}


.Print_box {
  width: 1000px;
  margin: 50px auto 10px;
    .Print_box_title {
      width: 100%;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .Print_box_bh {
      width: 100%;
      text-align: right;
      margin-bottom: 10px;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .Print_center {
      width: 100%;
      border: 1px solid #ddd;
      border-bottom: 1px solid transparent;
      box-sizing: border-box;
      .Print_C_row_flex{
        width: 100%;
        height: 100%;
        line-height: 30px;
        .Print_C_row_left {
          display: inline-block;
          width: 25%;
          height: 100%;
          box-sizing: border-box;
          padding-left: 10px;
          text-align: center;
        }
        .Print_C_row_right {
          display: inline-block;
          width: 75%;
          box-sizing: border-box;
          border-left: 1px solid #ddd;
          padding-left: 10px;
          
        }
      }
      .Print_C_row {
        div {
          line-height: 40px;
        }
        .Print_C_row_left {
          display: inline-block;
          width: 25%;
          box-sizing: border-box;
          padding-left: 10px;
          text-align: center;
        }
        .Print_C_row_right {
          display: inline-block;
          width: 75%;
          box-sizing: border-box;
          border-left: 1px solid #ddd;
          padding-left: 10px;
          .Print_C_row_right_gwzw {
            line-height: 26px;
            margin-bottom: 30px;
          box-sizing: border-box;
          }
          .Print_C_row_right_fj{
            display: inline-block;
            line-height: 26px;
            box-sizing: border-box;
          }
        }
        
        .Print_C_row_left1 {
          display: inline-block;
          width: 25%;
          box-sizing: border-box;
          border-bottom: 1px solid #ddd;
          padding-left: 10px;
          text-align: center;
        }
        .Print_C_row_left2 {
          display: inline-block;
          width: 20%;
          box-sizing: border-box;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          border-left: 1px solid #ddd;
          padding-left: 10px;
        }
        .Print_C_row_right1 {
          display: inline-block;
          width: 20%;
          box-sizing: border-box;
          border-bottom: 1px solid #ddd;
          padding-left: 10px;
          text-align: center;
        }
        .Print_C_row_right2 {
          display: inline-block;
          width: 35%;
          box-sizing: border-box;
          border-left: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          padding-left: 10px;
        }
        .Print_C_row_right_gwsp {
          
        }
      }
    }

}
</style>
