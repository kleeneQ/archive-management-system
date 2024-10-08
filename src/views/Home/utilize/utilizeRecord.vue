<template>
  <div >
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案利用</el-breadcrumb-item>
      <el-breadcrumb-item>查档记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="查档单位">
              <el-input clearable v-model="queryInfo.cddwmc" placeholder="请输入查档单位"  @change="utilizeRecordListFun"></el-input>
            </el-form-item>
            <el-form-item label="查档类别">
            <el-select clearable v-model="queryInfo.cdlb" placeholder="请选择查档类别" @change="utilizeRecordListFun">
              <el-option v-for="(item,index) in QueryConditionType" :key="index" :label="item.mc" :value="item.bm" ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="查档日期">
               <el-date-picker
                  v-model="queryInfo.create_time"
                  type="date"
                  @change="utilizeRecordListFun"
                    value-format='yyyy-MM-dd'
                  placeholder="请输入查档日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="utilizeRecordListFun">查询</el-button>
              <el-button type="info" @click="utilizeRecordListFunClear">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->

           <!-- 列表区 -->
              <div class="eltablebox">
            <!-- 工程列表 B -->
             <el-table
              :data="EngineeringList"
              border
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
           <el-table-column
              align="center"
              prop="cdlx"
              label="查档类型"
              show-overflow-tooltip
              width="100">
              <template slot-scope="scope">
                {{scope.row.cdlx=='1'?'个人查档':'单位查档'}}
              </template>
            </el-table-column>
           <el-table-column
              align="center"
                prop="utilize_id"
                label="查档单号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="damc"
                label="档案名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="cdmdName"
                label="查档目的"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="cdlbName"
                label="查档类别"
                show-overflow-tooltip
                width="200">
              </el-table-column>
           <el-table-column
              align="center"
                prop="cddwmc"
                label="查档单位"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="tyshxydm"
                label="统一社会信用代码"
                show-overflow-tooltip
                width="250"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="reviewer"
                label="查阅人"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="tel"
                label="手机号"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="idcard"
                label="身份证"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
              align="center"
                prop="people_num"
                label="查档人数"
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="查档登记时间"
                width="200">
              <template slot-scope="scope">
                {{scope.row.create_time | formatDate}}
              </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="UtilizeConditionVisibleFun(scope.row)">查档情况</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
            <!-- 分页 B -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 50, 200, 1000]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background>
            </el-pagination>
             <!-- 分页 E -->
            </div>

      </el-card>
      <el-dialog :title="'查档情况'" 
          :visible.sync="dialogUtilizeConditionVisible" 
          width="60%">
   <el-scrollbar >
    <!-- 查档登记信息 -->
    <table class="mailTable" >
      <tr>
        <thead>查档登记信息</thead>
      </tr>
      <tr v-if="projectdetails.cddwmc">
        <td class="column">查档单位：</td>
        <td >{{projectdetails.cddwmc}}</td>
        <td class="column">统一社会信用代码：</td>
        <td >{{projectdetails.tyshxydm}}</td>
      </tr>
      <tr >
        <td class="column">查档目的：</td>
        <td >{{projectdetails.cdmdName}}</td>
        <td class="column">查档类别：</td>
        <td >{{projectdetails.cdlbName}}</td>
      </tr>
      <tr >
        <td class="column">查阅人：</td>
        <td >{{projectdetails.reviewer}}</td>
        <td class="column">身份证号：</td>
        <td >{{projectdetails.idcard}}</td>
      </tr>
      <tr >
        <td class="column">手机号：</td>
        <td >{{projectdetails.tel}}</td>
        <td class="column">查档人数：</td>
        <td >{{projectdetails.people_num}}</td>
      </tr>
      <tr >
        <td class="column">查档日期：</td>
        <td colspan="3">{{projectdetails.create_time | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">查档依据：</td>
        <td colspan="3">
          <div class="cdyjstyle" v-for="(item,index) in checkedCities" :key="index">
            <template v-if="(index+1) !== checkedCities.length">
              {{item.mc}}、
            </template>
            <template v-if="(index+1) == checkedCities.length">
              {{item.mc}}
            </template>
          </div>
        </td>
      </tr>
      <tr >
        <td class="column">附件信息：</td>
        <td colspan="3">
          <div class="cdyjstyle" v-for="(item,index) in file_name" :key='index' > 
            <template v-if="(index+1) !== file_name.length">
             <el-link type="primary" :href="fileURLym+file_url[index]" :underline="false" target="_blank">{{item}}</el-link>、
            </template>
            <template v-if="(index+1) == file_name.length">
              <el-link type="primary" :href="fileURLym+file_url[index]" :underline="false" target="_blank">{{item}}</el-link>
            </template>
          </div>
        </td>
      </tr>
      <tr >
        <td class="column">档案名称：</td>
        <td colspan="3" >
           <div class="linkstyle"  @click="gotodetailsFun2()">{{projectdetails.damc}}</div>
          </td>
      </tr>
      <tr >
        <td class="column">查档内容：</td>
        <td colspan="3">{{projectdetails.cdnr}}</td>
      </tr>
    </table>
    <!-- 查档审核信息 -->
    <table class="mailTable" >
      <tr>
        <thead>查档审核信息</thead>
      </tr>
      <tr >
        <td class="column">查档登记审核人员：</td>
        <td >{{projectdetails.shry}}</td>
        <td class="column">审核日期：</td>
        <td >{{projectdetails.shrq | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">审核意见：</td>
        <td colspan="3">{{projectdetails.shyj}}</td>
      </tr>
      <tr >
        <td class="column">调卷利用审核人员：</td>
        <td >{{projectdetails.djshry}}</td>
        <td class="column">审核日期：</td>
        <td >{{projectdetails.djshrq | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">审核意见：</td>
        <td colspan="3">{{projectdetails.djshyj}}</td>
      </tr>
    </table>
    <!-- 查档情况信息 -->
    <table class="mailTable" >
      <tr>
        <thead>查档情况信息</thead>
      </tr>
      <tr >
        <td class="column">调卷情况：</td>
        <td colspan="3">文字 {{projectdetails.wzj}} 卷、图纸 {{projectdetails.tzj}} 卷、照片 {{projectdetails.zpz}} 张、其它 {{projectdetails.qtj}} 张
          <el-button type="primary" size="small" class=" fr" @click="getUtilizeFileInfoListFun('调卷详情')">调卷详情</el-button>
        </td>
      </tr>
      <tr >
        <td class="column">利用情况：</td>
        <td colspan="3">文字 {{projectdetails.fywzz}} 张、图纸 {{projectdetails.fytzz}} 张、翻拍照片 {{projectdetails.fpzpz}} 张、冲洗照片 {{projectdetails.cxzpz}} 张、复制光盘 {{projectdetails.fzgpz}} 张
          <el-button type="primary" size="small" class=" fr" @click="getUtilizeFileInfoListFun('利用详情')">利用详情</el-button>
        </td>
      </tr>
      <tr >
        <td class="column">接待人：</td>
        <td >{{projectdetails.jdr}}</td>
        <td class="column">清点人：</td>
        <td >{{projectdetails.qdr}}</td>
      </tr>
      <tr >
        <td class="column">备注：</td>
        <td colspan="3">{{projectdetails.bz}}</td>
      </tr>
    </table>
        <!-- 查档情况信息 -->
    <table class="mailTable" >
      <tr>
        <thead>利用反馈</thead>
      </tr>
      <tr >
        <td class="column">利用效果评价及意见：</td>
        <td colspan="3">{{projectdetails.lyfk}}</td>
      </tr>
    </table>
  </el-scrollbar>
      </el-dialog>

         <!-- 选择工程 B -->
        <el-dialog
          width="70%"
          :title="UtilizeFileInfoTitle"
          :visible.sync="UtilizeFileInfoVisible">
          <el-form :inline="true" :model="UtilizeFileInfo" class="demo-form-inline" label-width="100px">
             <el-form-item label="文件题名：">
              <el-input clearable v-model="UtilizeFileInfo.wjtm" placeholder="请输入文件题名"  @change="getUtilizeFileInfoListFun('')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getUtilizeFileInfoListFun('')">查询</el-button>
            </el-form-item>
          </el-form>
            <!-- 工程列表 B -->
            <el-table
              :data="UtilizeFileInfoLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                label="调卷利用页码"
                prop="file_record_id"
                show-overflow-tooltip
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="总数量（张/卷）"
                prop="sl"
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="primary" @click="getUtilizeFileGetUrlFun(scope.row)">预览</el-button>
                </template>
                
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
        </el-dialog>
        <!-- 选择工程 E -->  
        <!-- 文件预览 B-->
     <el-image-viewer  
        v-if="DialogVisibleimgview"
        :on-close="()=>{DialogVisibleimgview=false}"
        :url-list="FileUrlArrs" />
    <!-- 文件预览 E-->
  </div>
</template>

<script>
import {
  utilizeRecordList,
  utilizeCheckVerifyList,
  getFileUtilizationUtilizeList,
  getUtilizeFileInfoList,
  getUtilizeInfoList,
  getUtilizeFileGetUrl,
} from '@/api/utilize'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  components: {
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:1,
        page_size:10,
        create_time:'',
        cdlb:'',
        cddwmc:'',
      },
      engineeringType:[],//项目工程类型
      EngineeringList:[],//查询记录列表
      dialogUtilizeConditionVisible:false,//查档情况 弹窗
      projectdetails:{},//查档详情 
      file_name:[],//查档 附件
      file_url:[],//查档 附件
      fileURLym:'',//访问附件的域名
      QueryGistType:[],//查档依据数据
      checkedCities:[],//选中的查档依据数据\
      UtilizeFileInfo:{
        wjtm:"",
      },
      UtilizeFileInfoVisible:false,//调卷详情弹层
      UtilizeFileInfoLists:[],//调卷详情
      UtilizeFileInfoTitle:'', //弹层标头
      carrierType:[],//文件级载体类型
      DialogVisibleimgview:false,//文件预览 弹层
      FileUrlArrs:[],//文件预览数据
      QueryConditionType:[],
    }
  },
  created () {
    this.getEngineeringTypeFun() // 工程类型
    this.getCarrierType() //文件级载体类型
  },
  beforeMount(){
    this.getQueryPurposeType()  //查档目的
    this.getQueryConditionType() //查档类别
    this.getQueryGistType() //查档依据
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  mounted () {
    this.utilizeRecordListFun() //查档记录列表

  },
  methods: {
         gotodetailsFun2(){
        if (this.Namerow.lydalx == '2') {
        this.$router.push({ 
        path: '/RecorSearch/utilize/utilizeaudioPaget', 
        query: { 
           filesid: this.Namerow.engineering_id,
           filesType: this.Namerow.dalx
           }
        })
      } else{
        this.$router.push({ 
        path: '/Audit/utilizeEngineeringPage', 
        query: { 
           engineering_id: this.Namerow.engineering_id,
           gclx: this.Namerow.dalx,
           zt:this.Namerow.zt
           }
        })
      }
     
    },
  
        //文件预览
    getUtilizeFileGetUrlFun(row){
      const that = this
      const q = {
        file_id:row.file_id,
        record_id:row.record_id,
      }
      getUtilizeFileGetUrl(q).then(response =>{
        if (response.status === 200) {
          
          var str = response.data.data[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
            var url = that.fileURLym + response.data.data[0].file_url
            window.open(url, '_blank')
          } else {
            that.FileUrlArrs = []
            that.DialogVisibleimgview = true
            this.UtilizeFileInfoVisible = false
            this.dialogUtilizeConditionVisible = false
            var FileUrlArrssss = response.data.data.sort(that.compare('file_weight'))
            FileUrlArrssss.forEach(item => {
              that.FileUrlArrs.push(that.fileURLym+item.file_url)
            });
          }
        }
      })
    },
    compare(p){ //这是比较函数
      return function(m,n){
          var a = m[p];
          var b = n[p];
          return a.localeCompare(b,'zh-CN',{ numeric: true });
    }},
    //调卷详情   利用详情
  getUtilizeFileInfoListFun(val){
    if(val != ''){
      this.UtilizeFileInfoTitle = val
    }
    
    if (this.UtilizeFileInfoTitle == '调卷详情') {
      const q ={
        page_num:'1',
        page_size:'1000',
        utilize_id:this.projectdetails.utilize_id,
        wjtm:this.UtilizeFileInfo.wjtm,
      }
      getUtilizeFileInfoList(q).then(response =>{
      if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map(v =>{
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
        })
        this.UtilizeFileInfoLists = res
        this.UtilizeFileInfoVisible = true
        }
      })
    } else {
      const q ={
        page_num:'1',
        page_size:'1000',
        utilize_id:this.projectdetails.utilize_id,
        wjtm:this.UtilizeFileInfo.wjtm,
      }
      getUtilizeInfoList(q).then(response =>{
      if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map(v =>{
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
        })
        this.UtilizeFileInfoLists = res
        this.UtilizeFileInfoVisible = true
        }
      })
    }
    
  },
     //查档依据
     getQueryGistType() {
      const q = {
        bm: "DICT_CDYJ"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryGistType  = res
          // this.cities = res
          // this.cityOptions = res
          
        }
      }).catch(error => {
        console.log(error)
      })
    },
          //获取文件预览域名
    querySystemDictionaryFun(){
      const that = this
        const q = {
            dict_tag:'file_server_url'
          }
          //获取文件预览域名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              
              that.fileURLym = response.data.data[0].dict_code
              console.log(response.data.data[0].dict_code)
            }
          }).catch(error => {
            console.log(error)
          })
    },
  //查档情况 弹层
  UtilizeConditionVisibleFun(row){
    console.log(row)
    this.Namerow = row
    var newarr = []
      newarr = row.cdyj.split("#")
      newarr.forEach(item =>{
        this.QueryGistType.forEach(v =>{
          if (item == v.bm) {
            this.checkedCities.push(v)         
          }
        })
      })

     const q ={
        utilize_id:row.utilize_id
      }
      getFileUtilizationUtilizeList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.file_name = res.file_name
         this.file_url = res.file_url
        }
      })


    this.projectdetails = row

    this.dialogUtilizeConditionVisible = true
  },
  //获取 查档记录列表
    utilizeRecordListFun(){
      this.queryInfo.page_num=this.currentPage
      this.queryInfo.page_size=this.pageSize
      utilizeRecordList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.utilizeRecordListFun()
         }
        this.total = res.total
        res.list.map(v =>{
          this.QueryPurposeType.forEach(t =>{
              if (v.cdmd === t.bm) {
                v.cdmdName = t.mc
              }
              return
          })
          this.QueryConditionType.forEach(t =>{
              if (v.cdlb === t.bm) {
                v.cdlbName = t.mc
              }
              return
          })
          return
        })
        this.EngineeringList = res.list
        }
      })
    },
    //重置查询表单
    utilizeRecordListFunClear(){
      this.queryInfo = {
        page_num:1,
        page_size:10,
        create_time:'',
        cdlb:'',
        cddwmc:'',
      }
      this.utilizeRecordListFun()
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
        //查档类别
     getQueryConditionType() {
      const q = {
        bm: "DICT_CDLB"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryConditionType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //查档目的
     getQueryPurposeType() {
      const q = {
        bm: "DICT_CDMD"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryPurposeType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.utilizeRecordListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.utilizeRecordListFun()
    },

       // 文件级载体类型
    getCarrierType() {
      const q = {
        bm: "WJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.carrierType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
<style lang="less">
.cdyjstyle {
  display: inline-block;
}
</style>
<style lang="less" scoped>
/deep/ .el-scrollbar {
  padding-bottom: 30px;
  box-sizing: border-box;
	.el-scrollbar__wrap {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
    .mailTable {width: 100%;}
    .mailTable tr thead {line-height: 40px;font-size: 18px;font-weight: 700;}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 280px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>
