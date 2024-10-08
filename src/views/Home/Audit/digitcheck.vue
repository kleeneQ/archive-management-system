<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="margin-top-10 margin-bottom-10 margin-left-10">
      <el-col :span="6">
         <div class="topradiobutton">
            <el-radio v-model="files_type" label="files_type1" border @change="selectsort()">工程类</el-radio>
            <el-radio v-model="files_type" label="files_type2" border @change="selectsort()">管理类</el-radio>
        </div>
      </el-col>
    </el-row>
    <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷题名">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷题名" @change="queryfileslist"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号" @change="queryfileslist"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryfileslist">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
            <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline el-form-item1" >
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('案卷封面')">案卷封面</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('卷内目录')">卷内目录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('备考表')">备考表</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" icon="el-icon-setting"  @click="showDialoBatchAuditFun()">批量审核</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!-- 案卷列表 -->
            <el-table
              :data="auditFilesList"
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
                prop="ajdh"
                label="案卷档号"
                width="300">
                <template slot-scope="scope">
                  {{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajtm"
                label="案卷题名"
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajlbName"
                label="案卷类别"
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
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="qssj"
                label="起始时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.qssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="zzsj"
                label="终止时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.zzsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajsxh"
                label="案卷顺序号"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                width="400">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showDialogfilesDetailsFun(scope.row)">案卷详情</el-button>
                  <el-button type="success" size="small" @click="showDialogFiledetailFun(scope.row)">文件详情</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
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
    <!-- 审核弹层 E-->
     <el-dialog
      :title="'审核'"
      :visible.sync="AuditDialogVisible"
      width="40%"
      @close="dialogClosed"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="是否通过：" prop="pass">
          <el-radio-group v-model="form.pass">
            <el-radio label="true" @change="auditpassbtn">通过</el-radio>
            <el-radio label="false" @change="auditpassbtn">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核描述：" class="margin-top-10">
          <el-input type="textarea" :rows="3" v-model="form.desc" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">取消</el-button>
          <el-button type="primary" @click="onSubmitAudit('form')">提交审核</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 审核弹层 B-->

    <!-- 案卷详情 -->
    <el-dialog :title="filesdetailstitle+'案卷详情'" :visible.sync="dialogFilesdetailsVisible">
        <table class="mailTable" >
          <tr >
            <td class="column">案卷题名：</td>
            <td colspan="3">{{filesdetails.ajtm}}</td>
          </tr>
          <tr >
            <td class="column">案卷档号：</td>
            <td >{{filesdetails.ajdh}}</td>
            <td class="column">原档号：</td>
            <td >{{filesdetails.ydh}}</td>
          </tr>
          <tr >
            <td class="column">总登记号：</td>
            <td >{{filesdetails.zdjh}}</td>
            <td class="column">保管期限：</td>
            <td >{{filesdetails.bgqxName}}</td>
          </tr>
          <tr >
            <td class="column">密级：</td>
            <td >{{filesdetails.mjName}}</td>
            <td class="column">编制单位：</td>
            <td >{{filesdetails.bzdw}}</td>
          </tr>
          <tr >
            <td class="column">移交单位：</td>
            <td >{{filesdetails.yjdw}}</td>
            <td class="column">载体类型：</td>
            <td >{{filesdetails.ztlxName}}</td>
          </tr>
          <tr >
            <td class="column">进馆日期：</td>
            <td >{{filesdetails.jgsj}}</td>
            <td class="column">脊宽：</td>
            <td >{{filesdetails.jk}}</td>
          </tr>
          <tr >
            <td class="column">数量(张/页)：</td>
            <td >{{filesdetails.sl}}</td>
            <td class="column">案卷顺序号：</td>
            <td >{{filesdetails.ajsxh}}</td>
          </tr>
          <tr >
            <td class="column">存放位置：</td>
            <td colspan="3">{{filesdetails.ajk}}库-{{filesdetails.ajl}}列-{{filesdetails.ajg}}柜-{{filesdetails.ajc}}层-{{filesdetails.ajx}}序</td>
          </tr>
     
          <tr >
            <td class="column">起始时间：</td>
            <td >{{filesdetails.qssj}}</td>
            <td class="column">终止时间：</td>
            <td >{{filesdetails.zzsj}}</td>
          </tr>
          <tr >
            <td class="column">立卷人：</td>
            <td >{{filesdetails.ljr}}</td>
            <td class="column">立卷日期：</td>
            <td >{{filesdetails.ljrq}}</td>
          </tr>
          <tr >
            <td class="column">审核人：</td>
            <td >{{filesdetails.ajshr}}</td>
            <td class="column">审核日期：</td>
            <td >{{filesdetails.shrq}}</td>
          </tr>
            <tr >
            <td class="column">附注：</td>
            <td colspan="3">{{filesdetails.fz}}</td>
          </tr>
        </table>
    </el-dialog>

        <!-- 案卷封面、卷内目录、备考表 预览弹层 -->
     <el-image-viewer  
             v-if="DialogVisibleimgview"
             :on-close="()=>{DialogVisibleimgview=false}"
             :url-list="FileUrlArrs" />

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
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getAuditFilesList,
  handleAuditPass,
  handleAuditNoPass,
  getFilesMatalogueMemoCoverURL,
  getFilesAuditDetail,
} from "@/api/digitization/audit"
import AuditDetail from '@/components/audit/AuditDetail'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  components: {
    AuditDetail,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data(){
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        ajtm:'',
        ajdh:'',
      },
      files_type:'files_type1',//案卷归属类型 默认工程类  files_type1——工程类   files_type2——管理类
      auditFilesList:[],//验收案卷列表
      AuditDialogVisible:false, //审核弹层
      // pass:'',//审核是否通过
      form:{
        pass:'',//审核是否通过
        desc:''//审核描述
      },
      rules:{ //表单校验
        pass: [
            { required: true, message: '请选择案卷是否通过', trigger: 'change' }
          ],
      },
      files_id:'',//提交审核的案卷ID
      selectedList: [], // 选中的案卷
      filesdetails:{}, //案卷详情列数据
      filesdetailstitle:'',//案卷详情案卷题名
      dialogFilesdetailsVisible:false,//案卷详情弹层
      DialogVisibleimgview:false,//案卷封面、卷内目录、备考表
      FileUrlArrs:[],//案卷封面、卷内目录、备考表
      fileURLym:'',//预览文件域名
      //审核详情
      AuditDetailDialogVisible:false,//审核详情弹层显示隐藏判断条件
      AuditDetailData:'',//审核详情
      auditformdesc:'', //审核描述
      file_status:[],//案卷状态
    }
  },
  watch:{
    AuditDialogVisible:function(newQuestion, oldQuestion){
      if (newQuestion === true) {
        this.auditformdesc = ''
      } else if (newQuestion === false) {
        this.getAuditFilesListFun() //刷新案卷列表
      }
    },
  },
  beforeMount(){
    this.getSystemDictionary()//案卷状态
    this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.getCarrierType()  // 载体类型
  },
  mounted(){
    this.querySystemDictionaryFun() //文件预览域名
    this.getAuditFilesListFun() //案卷列表

  },
  methods:{
    // 文件详情
    showDialogFiledetailFun(row){
      console.log(row)
        this.$router.push({ path: '/digitcheck_page/filedetail', query: { files_id: row.files_id,files_type:row.files_type}})
        return
    },
    //审核详情
    showDialogAuditDetailsFun(row){
      const that = this
      const q = {
        files_id:row.files_id 
      }
      getFilesAuditDetail(q).then(response =>{
        
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
      })
    },
        //案卷状态
    getSystemDictionary(){
       const q = {
          dict_tag:'file_status'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              this.file_status = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
    //预览
    showDialoimgview(data){
      const that = this
      that.FileUrlArrs = []
      if(this.selectedList.length < 1) return  this.message({ message: "请勾选需要查看的案卷", type: 'error' })
      const q = {
        files_id:this.selectedList[0].files_id
      }
      getFilesMatalogueMemoCoverURL(q).then(response =>{
        if (response.status === 200) {
          var str = response.data.data.digitFileCover[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
              if (data === '案卷封面') {
              var url = that.fileURLym + response.data.data.digitFileCover[0].file_url
              window.open(url, '_blank')
            } else if (data === '卷内目录') {
              var url = that.fileURLym + response.data.data.digitFileCatalogue[0].file_url
              window.open(url, '_blank')
            } else if (data === '备考表') {
              var url = that.fileURLym + response.data.data.digitFileReference[0].file_url
              window.open(url, '_blank')
            }
          } else {
            that.FileUrlArrs = []
              if (data === '案卷封面') {
              var url = that.fileURLym + response.data.data.digitFileCover[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            } else if (data === '卷内目录') {
              var url = that.fileURLym + response.data.data.digitFileCatalogue[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            } else if (data === '备考表') {
              var url = that.fileURLym + response.data.data.digitFileReference[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            }
          }
        
          // that.FileUrlArrs
        }
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
    //案卷详情
    showDialogfilesDetailsFun(row){
      this.filesdetailstitle = row.ajtm
      this.auditFilesList.forEach(item =>{  //获取需要查看详情的案卷
        if (item.files_id === row.files_id) {
          this.filesdetails = item
        }
      })
      this.dialogFilesdetailsVisible = true  //显示案卷详情弹层

    },
    //提交审核
    onSubmitAudit(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        const q = {
          files_id:this.files_id,
          files_type:this.files_type,
          check_describe:this.form.desc,
        }
        console.log('submit!',this.form.pass);
        if (this.form.pass === "true") {
          handleAuditPass(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
            }
          })
        } else {
           handleAuditNoPass(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
            }
          })
        }
       
      } else {
        console.log('error submit!!');
        return false;
      }
    });
      
    },
    //审核是否通过  并赋值给审核描述栏
    auditpassbtn(){
      if (this.form.pass === "true") {
        this.form.desc = "审核通过"
      } else {
        this.form.desc = "审核不通过"
      }
    },
    // 审核按钮  审核弹层显示
    showDialogAuditFun(row){
      this.files_id = row.files_id
      this.AuditDialogVisible = true
    },
     // 案卷列表选中的列
    changeBox(val) {
      this.selectedList = val
    },
    //批量审核
    showDialoBatchAuditFun(){
      
      if (this.selectedList.length >1) {
        var filesidstring = ''
          this.selectedList.forEach((item)=>{
         
          if (filesidstring === '') {
            filesidstring = item.files_id
          } else {
             filesidstring = filesidstring+"#"+item.files_id
          }
          this.files_id = filesidstring
        })  
        
      } else {
        this.files_id = this.selectedList[0].files_id
      }
      this.AuditDialogVisible = true
    },
    //查询 案卷题名  或是  案卷档号
    queryfileslist(){ 
      this.getAuditFilesListFun()
    },
    //案卷归属类别 工程类或管理类
    selectsort(){
      // this.files_type = files_type
      this.queryInfo.ajtm = ''
      this.queryInfo.ajdh = ''
      this.getAuditFilesListFun()
    },
    // 获取验收审核列表
    getAuditFilesListFun(){
      const q = {
        files_type:this.files_type,
        page_num:this.currentPage,
        page_size:this.pageSize,
        ajtm:this.queryInfo.ajtm,
        ajdh:this.queryInfo.ajdh,
      }
      console.log(q)
      getAuditFilesList(q).then(response =>{
        
        if (response.status === 200) {
          if (response.data.data !== null) {
             this.total = response.data.data.total
         if (response.data.data.total !== 0 && response.data.data.list.length == 0 ) {
           this.currentPage = 1
           this.getAuditFilesListFun()
         }
             response.data.data.list.map(v => {
            // v.cfwz = v.ajk + v.ajl + v.ajg + v.ajc + v.ajx
            this.file_status.forEach(t =>{
              if (v.zt === t.dict_code) {
                v.ztName = t.dict_name
              }
              return
            })
            this.fileCategory.forEach(t => {
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
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

             this.auditFilesList = response.data.data.list 
             
          }
         
        }
      
      })
    },
        // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAuditFilesListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getAuditFilesListFun()
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
      this.getAuditFilesListFun()
    },
    
    // 案卷类别
    getFileCategory() {
      const q = {
        bm: "AJLB_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.fileCategory  = res
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

    // 载体类型
    getCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
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

  }
}
</script>

<style lang="less" scoped>
.topradiobutton.el-radio{
  background-color: #fff;
}
.topradiobutton.el-radio__input.is-checked .el-radio__inner {
  background-color: #fff !important;
  border-color:#fff !important;
}
 .topradiobutton .is-checked {
    background-color: #5483AF !important;
    border-color: #5483AF !important;
    span {
      color: #fff !important;
    }
  }
 .topradiobutton .el-radio__input.is-checked+.el-radio__label {
    color: #fff !important;
  }
.el-radio {
  background-color: #fff !important;
}

　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 250px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>