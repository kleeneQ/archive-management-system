<template>
  <div class='container containerbox'>
    <el-row>
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row>
    <div class="previewbox">
      <div class="previewbox-title"> 
      <h1 >{{compilationdata.compilation_title}}</h1>
      <div class="clearfix previewbox-title2">
        <div v-if="compilationdata.publish_man" class="fl">发布者：{{compilationdata.publish_man}}</div>
        <div v-if="compilationdata.publish_time" class="fr">发布时间：{{compilationdata.publish_time}}</div>
      </div>
      </div>
    <div class="previewbox-body" v-html="compilationdatainfo"></div>
    <div class="previewbox-footer">
    <i class="el-icon-document"></i> <el-link v-if="compilationdata.compilation_url" :href="downloadUrl+compilationdata.compilation_url" target="_blank">{{downloadUrlname}}</el-link>
    </div>
    
    </div>
  </div>
</template>

<script>

import {
  getCompilationTotalCatalogueList,
  getCompilationTotalCatalogueSave,
  getCompilationTotalCatalogueListInfo,
  getCompilationTotalCatalogueDelete,
  getCompilationTotalCatalogueUpdate,
  uploadFileSimpleCompilation,
  getCompilationclassifyCatalogueListInfo,
  getCompilationfilesCatalogueListInfo,
  getCompilationfilesClassifyCatalogueListInfo,
  getCompilationmemoirListInfo,
  getCompilationdocumentCompilationListInfo,
  getCompilationyearbooksListInfo,
} from '@/api/compilation'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  data () {
    return {
      compilationdata:{},
      compilationdatainfo:'',
      downloadUrl:'',
      downloadUrlname:'',
    }
  },
 watch: {
   '$route': 'getParams'
  },

created(){
   
  },
    mounted () {
      this.getParams()
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
    this.compilationdata = routerParams
    console.log(this.$route.query.mallCode)
    var str = this.compilationdata.compilation_url
    if (str) {
      let index = str.lastIndexOf("/")
      this.downloadUrlname = str .substring(index+1,str.length);
    }
    // if(this.compilationdata.compilation_id === undefined) return this.goBackPage()
    this.getcompilationinfoFun()
   },
   getcompilationinfoFun(){
     const q ={
       compilation_id:this.compilationdata.compilation_id
     }
     if (this.compilationdata.compilation_type == '1') {
        getCompilationTotalCatalogueListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     } else if(this.compilationdata.compilation_type == '2'){
       getCompilationclassifyCatalogueListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     } else if(this.compilationdata.compilation_type == '3'){
       getCompilationfilesCatalogueListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     } else if(this.compilationdata.compilation_type == '4'){
       getCompilationfilesClassifyCatalogueListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     } else if(this.compilationdata.compilation_type == '5'){
       getCompilationmemoirListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     } else if(this.compilationdata.compilation_type == '6'){
       getCompilationdocumentCompilationListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     } else if(this.compilationdata.compilation_type == '7'){
       getCompilationyearbooksListInfo(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.compilationdatainfo =res
          }
        })
     }
   

    
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
