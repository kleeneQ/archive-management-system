<template>
  <div class='container containerbox'>
    <el-row>
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row>
    <div class="previewbox">
      <div class="previewbox-title"> 
      <h1 >{{Regulationsdata.regulations_title}}</h1>
      <div class="clearfix previewbox-title2">
        <div v-if="Regulationsdata.publish_man" class="fl">发布者：{{Regulationsdata.publish_man}}</div>
        <div v-if="Regulationsdata.publish_time" class="fr">发布时间：{{Regulationsdata.publish_time}}</div>
      </div>
      </div>
    <div class="previewbox-body" v-html="Regulationsdatainfo"></div>
    <div class="previewbox-footer">
      <el-link v-if="Regulationsdata.file_url" :href="downloadUrl+Regulationsdata.file_url">{{downloadUrlname}}</el-link>
    </div>
    
    </div>
  </div>
</template>

<script>
import {
  getInfo,
  getUsersList,
  StoreHouseRegulationsList,
  StoreHouseRegulationsDelete,
  StoreHouseRegulationsSave,
  StoreHouseRegulationsFileSimple,
  StoreHouseRegulationsUpdate,
  StoreHouseRegulationsGetInfo,
} from "@/api/StoreHouse/StoreHouseRegulations"
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  data () {
    return {
      Regulationsdata:{},
      Regulationsdatainfo:'',
      downloadUrl:'',
      downloadUrlname:'',
    }
  },
 watch: {
   '$route': 'getParams'
  },

created(){
   this.getParams()
  },
    mounted () {
    this.getFileUrlFun()
  },
methods :{
  // 获取文件预览地址
  getFileUrlFun(){
    const q = {
        dict_tag:'file_server_url'
      }
    querySystemDictionary(q).then(response =>{
      if (response.status === 200) {
        const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.downloadUrl = res[0].dict_code
      }
    })
  },
  getParams(){
    // 取到路由带过来的参数
    const routerParams = this.$route.query.mallCode
    this.Regulationsdata = routerParams
    var str = this.Regulationsdata.file_url
    if (str) {
      let index = str.lastIndexOf("/")
      this.downloadUrlname = str .substring(index+1,str.length);
    }
    if(this.Regulationsdata.regulations_id === undefined) return this.goBackPage()
    this.getregulationsinfoFun()
   },
   getregulationsinfoFun(){
     const q ={
       regulations_id:this.Regulationsdata.regulations_id
     }
    StoreHouseRegulationsGetInfo(q).then(response =>{
      
      if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      
      this.Regulationsdatainfo =res
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
<style lang="less" scoped>
.el-main {
  background-color: #fff !important;
}
</style>
<style lang='less'>
.containerbox {
}
.previewbox {
  padding: 0 18%;
  box-sizing: border-box;
}
.previewbox-title {
  width: 100%;
  text-align: center;
  
  h1 {
    text-align: center;
    font-size: 30px;
  }
}
.previewbox-title2 {
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 1px solid #d3d3d3;
  padding: 20px;
  box-sizing: border-box;
}
.previewbox-body {
  height: 100%;
}
.previewbox-footer {
  margin-top: 50px;
}
</style>
