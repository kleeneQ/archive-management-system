<template>
  <div>
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>馆内办公流程</el-breadcrumb-item>
      <el-breadcrumb-item>我的公文</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <div class="bodybox">
      
      <el-row>
        <el-col :span="6">
          <el-button plain icon="el-icon-arrow-left" @click="goBackPage">返回</el-button>
          <el-button type="success" icon="el-icon-printer" @click="gotoOfficePrintPage">打印预览</el-button>
        </el-col>
      </el-row>

    <div class="gw_box">
        <div class="gw_box_title">{{file_detail.file_title}}</div>
        <div class="gw_center">
          <div class="gw_center_title">公文信息</div>
          <div class="gw_center_row">
            <div class="gw_center_row_l">公文编号：</div>
            <div class="gw_center_row_r">{{file_detail.file_code}}</div>
          </div>
          <div class="gw_center_row">
            <div class="gw_center_row_l">标题：</div>
            <div class="gw_center_row_r">{{file_detail.file_title}}</div>
          </div>
          <div class="gw_center_row">
            <div class="gw_center_row_l">来文时间：</div>
            <div class="gw_center_row_r">{{file_detail.file_receive_time}}</div>
          </div>
          <div class="gw_center_row">
            <div class="gw_center_row_l">发件人：</div>
            <div class="gw_center_row_r">{{file_detail.file_publish_man}}</div>
          </div>
          <div class="gw_center_row">
            <div class="gw_center_row_l">公文来源：</div>
            <div class="gw_center_row_r">{{file_detail.file_source}}</div>
          </div>
          <div class="gw_center_row">
            <div class="gw_center_row_l">摘要：</div>
            <div class="gw_center_row_r">{{file_detail.file_summary}}</div>
          </div>
          <div class="gw_center_row_gw">
            <div class="gw_center_row_lgw">公文正文：</div>
            <div class="gw_center_row_rgw" v-html="file_detail.file_info"></div>
          </div>
        </div>
        <div class="gw_center_tab">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="附件" name="first">
              <div class="gw_center_row">
                <div class="gw_center_row_l">正文附件：</div>
                <div class="gw_center_row_r">
                  <div class="fj_box" v-for="(furlN_item,furlN_index) in file_url.file_url_normal" :key="furlN_index">
                    <div v-if="furlN_index == 0">
                      【{{furlN_item.file_url_man}}】<p @click="openfilelinkFun(furlN_item.file_url)">{{furlN_item.file_name}}</p>
                    </div>
                    <div v-else> 
                      <div v-if="furlN_item.file_url_man == file_url.file_url_normal[furlN_index-1].file_url_man">
                        、<p @click="openfilelinkFun(furlN_item.file_url)">{{furlN_item.file_name}}</p>
                      </div>
                      <div v-else> 
                        【{{furlN_item.file_url_man}}】<p @click="openfilelinkFun(furlN_item.file_url)">{{furlN_item.file_name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gw_center_row">
                <div class="gw_center_row_l">其他附件：</div>
                <div class="gw_center_row_r">
                  <div class="fj_box" v-for="(furlO_item,furlO_index) in file_url.file_url_other" :key="furlO_index">
                    <div v-if="furlO_index == 0">
                      【{{furlO_item.file_url_man}}】<p @click="openfilelinkFun(furlO_item.file_url)">{{furlO_item.file_name}}</p>
                    </div>
                    <div v-else> 
                      <div v-if="furlO_item.file_url_man == file_url.file_url_other[furlO_index-1].file_url_man">
                        、<p @click="openfilelinkFun(furlO_item.file_url)">{{furlO_item.file_name}}</p>
                      </div>
                      <div v-else> 
                        【{{furlO_item.file_url_man}}】<p @click="openfilelinkFun(furlO_item.file_url)">{{furlO_item.file_name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="公文轨迹" name="second">
              <div class="gw_locus_body">
                <div class="gw_locus_box" v-for="(fl_item,fl_index) in file_locus" :key="fl_index">
                  <div class="gw_time_box"> <i class="el-icon-time gw_time"></i> {{fl_item.date}}</div>
                  <el-steps direction="vertical" :active="-1" >

                    <el-step v-for="(fli_item,fli_index) in fl_item.List" :key="fli_index" 
                      :title="fli_item.operator_title+' '+'【'+fli_item.create_man+'】'+fli_item.hm" 
                      :description="fli_item.info">
                       <template slot="description" v-if="fli_item.file_url.length !== 0">  
                         {{fli_item.info}}<span class="fliiurl_text" v-for="(fliiurl_item,fliiurl_index) in fli_item.file_url" :key="fliiurl_index"
                          @click="openfilelinkFun(fliiurl_item.file_url)">{{fliiurl_item.file_name}}</span>
                       </template>
                    </el-step>
                  </el-steps>
                </div>
              
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import {
  getOfficeFileMySignInfo,
  getOfficeFileMyReadInfo,
  getOfficeFileMyInfo,
} from '@/api/office'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import { forEach } from 'jszip'
export default {
  data () {
    return {
      file_id:'',
      OfficeFileInfo:{},
      file_detail:{},
      file_locus:[],
      file_url:{},
      activeName: 'first',
      fileURLym:'',
      locusarr:[],
    }
  },
  created () {
    
  },
  mounted () {
    this.file_id = this.$route.query.fileid
    this.tabName = this.$route.query.name
    console.log(this.tabName)
    if (this.tabName == '传阅') {
      this.getOfficeFileMyReadInfoFun()
    } else if (this.tabName == '签收'){
    this.getOfficeFileMySignInfoFun()
      
    }else { //
      this.getOfficeFileMyInfoFun()
    }
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  methods: {
  // type your function
  //公文审批——我的公文详情
getOfficeFileMyInfoFun(){
    const q ={
      file_id: this.file_id
    }
    getOfficeFileMyInfo(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          console.log(res)
          this.OfficeFileInfo = res
          this.file_detail = res.file_detail
          this.file_url = res.file_url
        
      let arr = res.file_locus  
      let dataArr = [];
      arr.map(mapItem => {
        if (dataArr.length == 0) {
            dataArr.push({ date: mapItem.ymd, List: [mapItem] })
        } else {
          let res = dataArr.some(item=> {//判断相同日期，有就添加到当前项
          console.log(item)
          console.log(item.date == mapItem.ymd)
            if (item.date == mapItem.ymd) {
              item.List.push(mapItem)
              return true
            }
          })
          if (!res) {//如果没找相同日期添加一个新对象
            dataArr.push({ date: mapItem.ymd, List: [mapItem] })
          }
        }
      })
        console.log(dataArr)
          this.file_locus = dataArr
        }
      })
  },
  //公文传阅 ——公文详情数据
  getOfficeFileMyReadInfoFun(){
    const q ={
      file_id: this.file_id
    }
    getOfficeFileMyReadInfo(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          console.log(res)
          this.OfficeFileInfo = res
          this.file_detail = res.file_detail
          this.file_url = res.file_url
        
      let arr = res.file_locus  
      let dataArr = [];
      arr.map(mapItem => {
        console.log(mapItem)
        if (dataArr.length == 0) {
            dataArr.push({ date: mapItem.ymd, List: [mapItem] })
        } else {
          let res = dataArr.some(item=> {//判断相同日期，有就添加到当前项
          console.log(item)
          console.log(item.date == mapItem.ymd)
            if (item.date == mapItem.ymd) {
              item.List.push(mapItem)
              return true
            }
          })
          if (!res) {//如果没找相同日期添加一个新对象
            dataArr.push({ date: mapItem.ymd, List: [mapItem] })
          }
        }
      })
        console.log(dataArr)
          this.file_locus = dataArr


        }
      })
  },

  //打开文件
  openfilelinkFun(url){
    let urllink = this.fileURLym + url +'?'+new Date().getTime()
    window.open(urllink, '_blank')
  },
  //tab 栏切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获取我的公文签收详情
    getOfficeFileMySignInfoFun(){
      const q ={
        file_id:this.file_id
      }
      getOfficeFileMySignInfo(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          console.log(res)
          this.OfficeFileInfo = res
          this.file_detail = res.file_detail
          this.file_url = res.file_url
        
      let arr = res.file_locus  
      let dataArr = [];
      arr.map(mapItem => {
        console.log(mapItem)
        if (dataArr.length == 0) {
            dataArr.push({ date: mapItem.ymd, List: [mapItem] })
        } else {
          let res = dataArr.some(item=> {//判断相同日期，有就添加到当前项
          console.log(item)
          console.log(item.date == mapItem.ymd)
            if (item.date == mapItem.ymd) {
              item.List.push(mapItem)
              return true
            }
          })
          if (!res) {//如果没找相同日期添加一个新对象
            dataArr.push({ date: mapItem.ymd, List: [mapItem] })
          }
        }
      })
        console.log(dataArr)
          this.file_locus = dataArr


        }
      })
    },
      //打印
    gotoOfficePrintPage(){
      this.$router.push({ 
          path: '/office/officePrint', 
          query: {
                fileid: this.file_id
              }, 
          })
    },
    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
    
   //获取文件预览域名
    querySystemDictionaryFun(){
        const q = {
            dict_tag:'file_server_url'
          }
          //获取文件预览域名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              this.fileURLym = response.data.data[0].dict_code
            }
          })
    },
  },
}
</script>
<style lang="less">
.gw_center_tab {
  .el-tabs__header {
    margin: 0;
  }
}
.gw_locus_body {
  width: 100%;
  white-space: nowrap;
  overflow-X: auto;
  .fliiurl_text {
    display: inline-block;
    color: #0000BF;
    box-sizing: border-box;
    cursor: pointer;
  }
  .fliiurl_text:hover {
    text-decoration:underline;
    box-sizing: border-box;
  }
  .gw_locus_box {
  display: inline-block;
  margin: 0 20px;
}
.gw_time_box {
  margin-top: 20px;
    font-size: 20px;
  .gw_time {
    color: #409EFF;
    font-size: 24px;
    font-weight: 700;
  }
}
}

</style>
<style scoped lang='less'>
  .gw_box {
    width: 1000px;
    margin: 50px auto 10px;
    .gw_box_title {
      width: 100%;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .gw_center {
      width: 100%;
      border: 1px solid #eee;
      box-sizing: border-box;
      .gw_center_title {
        width: 100%;
        background-color: #f2f2f2;
        font-weight: 700;
        padding:5px 10px;
        box-sizing: border-box;
      }
      .gw_center_row {
        width: 100%;
        border: 1px solid #eee;
        box-sizing: border-box;
        line-height: 30px;
        background-color: #fafdff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .gw_center_row_l {
          display: inline-block;
          width: 30%;
          text-align: right;
        }
        .gw_center_row_r {
          display: inline-block;
          padding-left: 10px;
          width: 70%;
          border-left: 1px solid #eee;
          background-color: #fff;
          box-sizing: border-box;
        }
      }
      .gw_center_row_gw {
        width: 100%;
        border: 1px solid #eee;
        box-sizing: border-box;
        background-color: #fff;
        background-color: #fafdff;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .gw_center_row_lgw {
          display: inline-block;
          width: 30%;
          text-align: right;
          background-color: #fafdff;
        }
        .gw_center_row_rgw {
          display: inline-block;
          padding: 0 15px;
          box-sizing: border-box;
          width: 70%;
          line-height: 28px;
          font-size: 14px;
          border-left: 1px solid #eee;
          background-color: #fff;
        }
      }
    }
    .gw_center_tab {
      border: 1px solid #eee;
      box-sizing: border-box;
      .el-tabs__header {
        margin-bottom: 0;
      }
      .gw_center_row {
        width: 100%;
        border: 1px solid #eee;
        box-sizing: border-box;
        line-height: 30px;
        background-color: #fafdff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .gw_center_row_l {
          display: inline-block;
          width: 30%;
          text-align: right;
        }
        .gw_center_row_r {
          display: inline-block;
          padding-left: 10px;
          width: 70%;
          border-left: 1px solid #eee;
          background-color: #fff;
          box-sizing: border-box;
        }
      }
      .fj_box {
        display: inline-block;
        p {
          display: inline-block;
          color: #0000BF;
          box-sizing: border-box;
          cursor: pointer;
        }
        p:hover {
          text-decoration:underline;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
