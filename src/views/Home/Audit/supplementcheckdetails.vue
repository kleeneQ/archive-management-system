<template>
  <div >
       <!-- 头部 面包屑导航 B --> 
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案审核</el-breadcrumb-item>
        <el-breadcrumb-item>档案补卷审核</el-breadcrumb-item>
      </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    
    <el-row class="margin-10">
      <el-col :span="6">
        <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button>
      </el-col>
    </el-row>

    <el-card style="background-color: #F4F4F4;">
    <!-- 搜索栏 B -->
     <el-row  style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="文件题名">
              <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名"  @change="getSupplementFileCheckListFun"></el-input>
            </el-form-item>
            <el-form-item label="文件档号">
              <el-input clearable v-model="queryInfo.wjdh" placeholder="请输入文件档号"  @change="getSupplementFileCheckListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getSupplementFileCheckListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 搜索栏 E -->
      <div class="eltablebox">
        <!-- 文件列表 B -->
          <el-table
              :data="fileList"
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
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="350">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="sl"
                label="数量"
                width="150">
              </el-table-column>
              <el-table-column
                prop="wzName"
                label="文种"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="lrsj"
                label="补卷时间"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="400">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogFiledetailsVisibleFun(scope.row)">查看</el-button>
                  <el-button type="primary" size="small" class="btnedit" @click="showDialogFiledetailFun(scope.row)">文件预览</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
                </template>
              </el-table-column>
          </el-table>
        <!-- 文件列表 E -->
      </div>
      <!-- 分页 B-->
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
      <!-- 分页 E-->

    </el-card>
      <!-- 查看文件详情 B-->
    <el-dialog :title="'文件详情'" :visible.sync="dialogFiledetailsVisible">
        <table class="mailTable" >
          <tr >
            <td class="column">文件题名：</td>
            <td colspan="3">{{filedetails.wjtm}}</td>
          </tr>
          <tr >
            <td class="column">文件档号：</td>
            <td >
                  <div v-if="filedetails.dwgcdh">{{filedetails.xmgcdh}}{{filedetails.dwgcdh}}-{{filedetails.ajdh}}-{{filedetails.wjdh}}</div>
                  <div v-else>{{filedetails.xmgcdh}}-{{filedetails.ajdh}}-{{filedetails.wjdh}}</div>
            </td>
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
            <td >{{filedetails.lrsj | formatDate}}</td>
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
      <!-- 查看文件详情 E-->
    <!-- 文件预览 B-->
     <el-image-viewer  
        v-if="DialogVisibleimgview"
        :on-close="()=>{DialogVisibleimgview=false}"
        :url-list="FileUrlArrs" />
    <!-- 文件预览 E-->

    <!-- 审核弹层 B-->
     <el-dialog
      :title="'审核'"
      :visible.sync="AuditDialogVisible"
      width="40%"
      @close="dialogClosed"
    >
      <el-form ref="form" :model="form"  :rules="rules" label-width="100px">
        <el-form-item label="是否通过：" prop="pass">
          <el-radio-group v-model="form.pass">
            <el-radio :label="'true'" @change="auditpassbtn">通过</el-radio>
            <el-radio :label="'false'" @change="auditpassbtn">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核描述：" class="margin-top-10">
          <el-input type="textarea" :rows="3" v-model="form.desc" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">取消</el-button>
          <el-button type="primary" @click="onSubmitAudit()">提交审核</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 审核弹层 E--> 
    <!-- 审核详情弹层 -->
      <el-dialog
        :title="'审核详情'"
        :visible.sync="AuditDetailDialogVisible"
        width="50%"
      >
      <AuditDetail
        :AuditDetailDatas='AuditDetailData'
        :auditformdesc='auditformdesc'
      ></AuditDetail>
    </el-dialog>   

  </div>
</template>

<script>
import {
  getSupplementFilesCheckList,
  getSupplementFilesCheckGetUrl,
  getSupplementFileCheckList,
  getSupplementFileUrlFileId,
  submitSupplementCheckRefuse,
  submitSupplementCheckPass,
  getSupplementCheckVerifyList,

} from '@/api/supplement'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getEngineeringType,
} from "@/api/digitization/projectAPI"
import AuditDetail from '@/components/audit/utilizeAuditDetail'
export default {
  components: {
    AuditDetail,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      total: 0, //总条数
      currentPage: 1, // 当前页数 
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        page_num:'',
        page_size:'',
        files_id:'',
        wjdh:'',
        wjtm:'',
      },
      Filesid:'',//案卷ID
      fileList:[],//列表
      carrierTypefile:[],//文件级 载体类型
      language:[],//文种
      dialogFiledetailsVisible:false,//文件详情 弹层\
      filedetails:{},//文件详情
      storagePeriod:[],//保管期限
      secretGrade:[],//密级
      fileURLym:'',//文件域名
      DialogVisibleimgview:false,//文件预览 弹层
      FileUrlArrs:[],//文件预览数据

      AuditDialogVisible:false, //审核 弹层
      form:{//审核表单
        pass:'true',
        desc:'',
      },
      AuditDetailDialogVisible:false,//审核详情 弹层
      AuditDetailData:[],//审核详情
      auditformdesc:[], //审核描述
      rules:{
        pass: [
            { required: true, message: '请选择审核是否通过', trigger: 'change' }
          ],
      },
      file_status:[],//案卷状态
    }
  },
  created () {
    this.Filesid = this.$route.query.files_id
    
  },
  beforeMount(){
    this.getCarrierTypefile()//文件级 载体类型
    this.getLanguage() //文种
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.querySystemDictionaryFun() //文件域名
    this.getSystemDictionary() //审核状态
  },
  mounted () {
    this.getSupplementFileCheckListFun() //根据案卷id获取补卷审核文件列表
  },
  watch: {
    // total() {
    //    if (this.total !== 0) {
    //     this.queryInfo.page_num = 1
    //     this.getSupplementFileCheckListFun()
    //   }
    // },
  },
  methods: {
  // type your function
      //审核状态
    getSystemDictionary(){
       const q = {
          dict_tag:'file_status'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { 
            
            if (response.status === 200) {
              this.file_status = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
      //审核详情
    showDialogAuditDetailsFun(row){
      const that = this
      const q = {
        record_id:row.file_id 
      }
      console.log(row)
      getSupplementCheckVerifyList(q).then(response =>{
        
        that.AuditDetailDialogVisible = true
        response.data.data.forEach(v => {
        that.file_status.forEach(t => {
            if (v.check_result === t.dict_code) {
              v.check_result = t.dict_name
            }
            return
          })
          return
        })
        that.AuditDetailData = response.data.data
        console.log(that.AuditDetailData)
      })
    },

        //审核是否通过  并赋值给审核描述栏
    auditpassbtn(){
      if (this.form.pass == "true") {
        this.form.desc = "审核通过"
      } else {
        this.form.desc = "审核不通过"
      }
    },
  //提交审核 
    onSubmitAudit(formName){
        this.$refs.form.validate((valid) => {
          if (valid) {
      console.log(this.form)

            if (this.form.pass == "true") {
              console.log(this.form.pass)
              this.check_status = '1'
              this.form.desc = "审核通过"
              const q = {
              file_id:this.file_id,
              check_describe:this.form.desc,
              }
              console.log(q)
              submitSupplementCheckPass(q).then(response =>{
                if (response.status === 200) {
                  const { data: res } = response
                  if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
                  this.message({ message: res.message, type: 'success', duration: 3000 })
                  this.resetForm()
                  this.getSupplementFileCheckListFun() //获取列表 文件级
                }
              })
            } else {
              console.log(this.form.pass)
              this.check_status = '2'
              this.form.desc = "审核不通过"
              const q = {
                file_id:this.file_id,
              }
              submitSupplementCheckRefuse(q).then(response =>{
                if (response.status === 200) {
                  const { data: res } = response
                  if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
                  this.message({ message: res.message, type: 'success', duration: 3000 })
                  this.resetForm() 
                  this.getSupplementFileCheckListFun() //获取列表 文件级
                }
              })
            }
          }
        })
    },
  //取消提交
    resetForm() {
      this.$refs['form'].resetFields();
      this.AuditDialogVisible = false
      this.form.desc = ''
    },
    // 关闭弹层 
    dialogClosed() {
      this.AuditDialogVisible = false
    },

    // 审核按钮  审核弹层显示
    showDialogAuditFun(row){
       this.file_id = row.file_id
       this.AuditDialogVisible = true
    },

      //文件预览
    showDialogFiledetailFun(row){
      const that = this
      const q = {
        file_id:row.file_id
      }
      getSupplementFileUrlFileId(q).then(response =>{
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
  //文件详情 弹层 
  dialogFiledetailsVisibleFun(row){
    this.filedetails = row
    this.dialogFiledetailsVisible = true
  },
  //补卷审核 - 根据案卷id获取补卷审核文件列表
  getSupplementFileCheckListFun(){
    const q ={
      page_num:this.currentPage,
      page_size:this.pageSize,
      files_id:this.Filesid,
      wjdh:this.queryInfo.wjdh,
      wjtm:this.queryInfo.wjtm,
    }
    getSupplementFileCheckList(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getSupplementFileCheckListFun()
         }
       res.list.map(v => {
      
          this.carrierTypefile.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
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
          return
        })
       this.fileList = res.list
       this.total = res.total
      }
    })
  },
  // 返回上一页
  goBackPage() {
    this.$router.go(-1)
  },
  // 文件级载体类型
  getCarrierTypefile() {
    const q = {
      bm: "WJJZTLX_DIC"
    }
    getEngineeringType(q).then(response => {
      if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message, type: 'error' })
        this.carrierTypefile  = res
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
      //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getSupplementFileCheckListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getSupplementFileCheckListFun()
    },
  },
  
}
</script>

<style scoped lang='less'>

</style>

<style lang="less" scoped>
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 250px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>