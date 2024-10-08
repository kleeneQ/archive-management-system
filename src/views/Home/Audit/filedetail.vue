<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案审核</el-breadcrumb-item>
      <el-breadcrumb-item>文件详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="margin-10">
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row>
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="文件题名">
              <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名" @change="queryfilelist"></el-input>
            </el-form-item>
            <el-form-item label="文件档号">
              <el-input clearable v-model="queryInfo.wjdh" placeholder="请输入文件档号" @change="queryfilelist"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryfilelist">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
        <!-- 文件列表 -->
            <el-table
              :data="auditFileList"
              border
              style="width: 100%"
              @selection-change="changeBox"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                fixed
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
              align="center"
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="wjtm"
                label="文件题名"
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="ztlxName"
                label="载体类型"
                width="300">
              </el-table-column>
              <!-- <el-table-column
              align="center"
                prop="bgqxName"
                label="保管期限"
                width="200">
              </el-table-column> -->
              <el-table-column
              align="center"
                prop="sl"
                label="数量"
                width="200">
              </el-table-column>
              <!-- <el-table-column
              align="center"
                prop="mjName"
                label="密级"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="wzName"
                label="文种"
                width="200">
              </el-table-column> -->
              <el-table-column
              align="center"
                prop="fz"
                label="附注"
                width="200">
              </el-table-column>
               <el-table-column
              align="center"
                prop="xcsj"
                label="形成时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.xcsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showDialogfileDetailsFun(scope.row)">查看</el-button>
                  <el-button type="success" size="small" @click="showDialogFiledetailFun(scope.row)">文件预览</el-button>
                </template>
              </el-table-column>
            </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        >
      </el-pagination>
    </el-card>
    <!-- 查看文件详情 -->
    <el-dialog :title="filedetailstitle+'—文件详情'" :visible.sync="dialogFiledetailsVisible">
        <table class="mailTable" >
          <tr >
            <td class="column">文件题名：</td>
            <td colspan="3">{{filedetails.wjtm}}</td>
          </tr>
          <tr >
            <td class="column">文件档号：</td>
            <td >{{filedetails.wjdh}}</td>
            <td class="column">总登记号：</td>
            <td >{{filedetails.zdjh}}</td>
          </tr>
          <tr >
            <td class="column">文(图)号：</td>
            <td >{{filedetails.wh}}</td>
            <td class="column">保管期限：</td>
            <td >{{filedetails.bgqxName}}</td>
          </tr>
          <tr >
            <td class="column">密级：</td>
            <td >{{filedetails.mjName}}</td>
            <td class="column">形成时间：</td>
            <td >{{filedetails.xcsj}}</td>
          </tr>
          <tr >
            <td class="column">数量(张/页)：</td>
            <td >{{filedetails.sl}}</td>
            <td class="column">载体类型：</td>
            <td >{{filedetails.ztlxName}}</td>
          </tr>
          <tr >
            <td class="column">录入人：</td>
            <td >{{filedetails.lrr}}</td>
            <td class="column">录入时间：</td>
            <td >{{filedetails.lrsj}}</td>
          </tr>
          <tr >
            <td class="column">存放位置：</td>
            <td colspan="3">{{filedetails.ajk}}库-{{filedetails.ajl}}列-{{filedetails.ajg}}柜-{{filedetails.ajc}}层</td>
           </tr>
          <tr >
            <td class="column">附注：</td>
            <td colspan="3">{{filedetails.fz}}</td>
          </tr>
        </table>
    </el-dialog>
    <!-- 文件预览 -->
     <el-image-viewer  
        v-if="DialogVisibleimgview"
        :on-close="()=>{DialogVisibleimgview=false}"
        :url-list="FileUrlArrs" />
    

  </div>
</template>

<script>
import {
  getAuditFilesList,
  handleAuditPass,
  handleAuditNoPass,
  getFilesMatalogueMemoCoverURL,
  getFilesAuditDetail,
  getauditFilelist,
  getauditFileURL,
} from "@/api/digitization/audit"
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
  data(){
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      files_id:'',//案卷ID
      files_type:'',//工程类型
      queryInfo:{ //查询数据
        wjtm:'',
        wjhd:'',
      },
      auditFileList:[],//文件列表数据
      selectedList:[],//文件列表中选中的列
      filedetailstitle:'',//查看文件详情
      dialogFiledetailsVisible:false,//查看文件详情弹层
      filedetails:{},//文件详情内容
      fileURLym:'',//预览文件域名
      DialogVisibleimgview:'',//文件预览
      FileUrlArrs:[],//文件预览 图集
      
    }
  },

  created(){
    const that = this
    that.files_id = that.$route.query.files_id
    that.files_type = that.$route.query.files_type

  },
  beforeMount(){
    this.getCarrierType()  // 载体类型 
    this.getLanguage() //文种
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
  },
  mounted(){
    this.getAuditFileListFun()
    this.querySystemDictionaryFun()
  },
  methods:{

    //文件预览
    showDialogFiledetailFun(row){
      const that = this
      const q = {
        file_id:row.file_id
      }
      getauditFileURL(q).then(response =>{
        if (response.status === 200) {
          
          var str = response.data.data[0].file_url
          let index = str.lastIndexOf(".")
          str = str.substring(index+1,str.length);
          if (str === 'pdf') {
            var url = that.fileURLym + response.data.data[0].file_url
            window.open(url, '_blank')
          } else {
            that.FileUrlArrs = []
            that.DialogVisibleimgview = true
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
            }
          }).catch(error => {
            console.log(error)
          })
    },
    //查看文件详情
    showDialogfileDetailsFun(row){
      this.dialogFiledetailsVisible = true
      this.filedetails = row
      this.filedetailstitle = row.wjtm
    },
    // setTimeoutFun(){
    //   setTimeout(this.getAuditFileListFun(), 1000)
    // },
    //获取文件列表
    getAuditFileListFun(){
      const that = this

      const q = {
        files_id:that.files_id,
        files_type:that.files_type,
        page_num:this.currentPage,
        page_size:this.pageSize,
        wjdh:this.queryInfo.wjdh,
        wjtm:this.queryInfo.wjtm,
      }
      getauditFilelist(q).then(response =>{
        
        if (response.status === 200 ) {
          that.total = response.data.data.total
          console.log(this.language)
          console.log(this.storagePeriod)
          console.log(this.secretGrade)
          console.log(this.carrierType)
          response.data.data.list.map(v => {
            this.language.forEach(t => {
              if (v.wz === t.bm) {
                v.wzName = t.mc
              }
              return
            })
            this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
            this.secretGrade.forEach(t => {
              if (v.mj === t.bm) {
                v.mjName = t.mc
              }
              return
            })
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            return
          }) 
          that.auditFileList = response.data.data.list
        }
      })
      
    },
    //查询 文件题名  或是  文件档号
    queryfilelist(){ 
      this.getAuditFileListFun()                          
    },
    // 文件列表选中的列
    changeBox(val) {
      this.selectedList = val
    },
    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAuditFileListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getAuditFileListFun()
    },
        // 保管期限
    getStoragePeriod() {
      const q = {
        bm: "BGQX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.storagePeriod  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 密级
    getSecretGrade() {
      const q = {
        bm: "MJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.secretGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
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
     // 文种
    getLanguage() {
      const q = {
        bm: "WZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.language  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 250px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>