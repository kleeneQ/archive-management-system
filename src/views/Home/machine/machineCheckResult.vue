<template>
  <div class="box"  
  v-loading="loading"
  element-loading-text="处理中……">
    <div class="head">
      <div class="head1"></div>
      <div class="head2" @click="goBackPage"></div>
    </div>

    <div class="resultbox">
          <el-row class="margin-top-10 margin-bottom-10 margin-left-10">
      <el-col :span="6">
         <div class="topradiobutton">
            <el-radio class="btncolor" v-model="files_type" label="files_type1" border @change="selectsort()">单位查档</el-radio>
            <el-radio class="btncolor" v-model="files_type" label="files_type2" border @change="selectsort()">个人查档</el-radio>
        </div>
      </el-col>
    </el-row>
      <div class="resultboxtop" v-if="files_type == 'files_type1'">
       <!-- 搜索栏 B -->
        <el-row  style="margin-bottom: 20px;background-color: #fff;padding:20px;">
            <el-col>
              <el-form :inline="true" :model="queryInfo" ref="queryInfo" :rules="rules" class="demo-form-inline" key="one">
                <el-form-item label="借阅单位名称" prop="cddwmc">
                  <el-input clearable v-model="queryInfo.cddwmc" placeholder="请输入借阅单位名称"  @change="getMachineUtilizeIntegratedMachineRecordListFun"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" >
                  <el-input clearable v-model="queryInfo.tyshxydm" placeholder="请输入统一社会信用代码"  @change="getMachineUtilizeIntegratedMachineRecordListFun"></el-input>
                </el-form-item>
                <el-form-item label="查档登记日期" >
                  <el-date-picker
                    v-model="queryInfo.create_time"
                    type="date"
                    value-format='yyyy-MM-dd'
                    placeholder="请选择查档登记日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="getMachineUtilizeIntegratedMachineRecordListFun">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        <!-- 搜索栏 E -->

      </div>
      <div class="resultboxtop" v-else>
       <!-- 搜索栏 B -->
        <el-row  style="margin-bottom: 20px;background-color: #fff;padding:20px;">
            <el-col>
              <el-form :inline="true" :model="queryInfo" ref="queryInfo" :rules="rules" class="demo-form-inline" key="two">
                <el-form-item label="身份证号" prop="idcard">
                  <el-input clearable v-model="queryInfo.idcard" placeholder="请输入身份证号"  @change="getMachineUtilizeIntegratedMachineRecordListFun"></el-input>
                </el-form-item>
                <!-- <el-form-item label="统一社会信用代码" prop="tyshxydm">
                  <el-input clearable v-model="queryInfo.tyshxydm" placeholder="请输入统一社会信用代码"  @change="getMachineUtilizeIntegratedMachineRecordListFun"></el-input>
                </el-form-item> -->
                <el-form-item label="查档登记日期" >
                  <el-date-picker
                    v-model="queryInfo.create_time"
                    type="date"
                    value-format='yyyy-MM-dd'
                    placeholder="请选择查档登记日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="getMachineUtilizeIntegratedMachineRecordListFun">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        <!-- 搜索栏 E -->

      </div>
      <div class="resultboxtable" v-if="files_type == 'files_type1'" >
            <!-- 工程列表 B -->
            <el-table
            
              :data="EngineeringList"
              border
              key="one"
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'45px'}"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
           <el-table-column
                align="center"
                prop="damc"
                label="档案名称"
                show-overflow-tooltip
                min-width="200">
              </el-table-column>
           <el-table-column
              align="center"
                prop="cddwmc"
                label="查档单位"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="tyshxydm"
                label="统一社会信用代码"
                show-overflow-tooltip
                width="200"
              >
              </el-table-column>
           <el-table-column
              align="center"
                prop="reviewer"
                label="查阅人"
                show-overflow-tooltip
                width="150">
              </el-table-column>
           <el-table-column
              align="center"
                prop="idcard"
                label="身份证"
                show-overflow-tooltip
                width="200">
              </el-table-column>
           <el-table-column
              align="center"
                prop="tel"
                label="手机号"
                show-overflow-tooltip
                width="150">
              </el-table-column>
           <el-table-column
              align="center"
                prop="ztName"
                label="审核状态"
                show-overflow-tooltip
                width="100">
              </el-table-column>
              <el-table-column
              align="center"
                prop="shyj"
                label="审核结果"
                show-overflow-tooltip
                width="100">
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="调卷利用申请时间"
                width="150">
              <template slot-scope="scope">
                {{scope.row.create_time | formatDate}}
              </template>
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="250">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.zt == 'file_status8'" size="small" @click="gotofilespage(scope.row)">下载利用压缩包</el-button>
                  <el-button v-if="scope.row.zt == 'file_status6'" class="btnedit"  size="small" @click="dialogUtilizeFeedBackVisibleFun(scope.row)">利用反馈</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
      </div>
      <div class="resultboxtable" v-if="files_type == 'files_type2'">
            <!-- 工程列表 B -->
            <el-table
              :data="EngineeringList"
              border
              key="two"
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'45px'}"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
           <el-table-column
                align="center"
                prop="damc"
                label="档案名称"
                show-overflow-tooltip
                min-width="200">
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
                show-overflow-tooltip
                width="200">
              </el-table-column>
           <el-table-column
              align="center"
                prop="idcard"
                label="身份证"
                show-overflow-tooltip
                width="200">
              </el-table-column>
           <el-table-column
              align="center"
                prop="ztName"
                label="审核状态"
                show-overflow-tooltip
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                prop="shyj"
                label="审核结果"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="调卷利用申请时间"
                width="200">
              <template slot-scope="scope">
                {{scope.row.create_time | formatDate}}
              </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="250">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.zt == 'file_status8'" size="small" @click="gotofilespage(scope.row)">下载利用压缩包</el-button>
                  <el-button v-if="scope.row.zt == 'file_status6'" class="btnedit"  size="small" @click="dialogUtilizeFeedBackVisibleFun(scope.row)">利用反馈</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
      </div>
      </div>
         <!-- 提交完成提示 弹层 B -->
      <el-dialog
          title="提示"
          :visible.sync="dialoghintVisible"
          @close='dialogClosed'
          width="26%">
         下载的档案利用压缩包仅供查阅使用，如需使用档案文件办理其他业务<br>
        ，还需将档案文件打印出来，并拿到档案馆加盖档案馆专用章，请知悉！
         <div class="hintbtnstyle"><el-button type="primary" @click="dialoghintVisible = false">已 知 晓</el-button></div>
        </el-dialog>
      <!-- 提交完成提示 弹层 E --> 

    <!-- 提交完成提示 弹层 B -->
      <el-dialog
          title="利用反馈"
          :visible.sync="dialogUtilizeFeedBackVisible"
          width="40%">
          <el-form :model="UtilizeFeedBackForm" :rules="UtilizeFeedBackrules" ref="UtilizeFeedBackForm" label-width="180px" class="demo-ruleForm">
            <el-form-item label="调卷利用效果评价及意见:" prop="desc">
              <el-input type="textarea" v-model="UtilizeFeedBackForm.desc"></el-input>
            </el-form-item>
             <el-form-item>
                <el-button @click="resetForm('UtilizeFeedBackForm')">取消</el-button>
                <el-button type="primary" @click="submitUtilizeFeedBackFun('UtilizeFeedBackForm')">提交</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>
      <!-- 提交完成提示 弹层 E --> 
  </div>
</template>

<script>

import {
  getWebDataDictionaryBistDrop,
  getMachineUtilizeIntegratedMachineRecordList,
  getMachineUtilizeCheckRecordList,
  getDictListDictTag,
  downloadFileMachineUtilizationUtilize,
  submitUtilizeFeedBack
} from '@/api/machine'

import Download from '@/utils/download'
export default {
  data () {
    return {
      
      loading:false, //信息正在加载中
      pageSize:100,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:'',
        page_size:'',
        create_time:'',
        tyshxydm:'',
        cddwmc:'',
        idcard:'',
      },
      rules:{
        cddwmc: [
            { required: true, message: '请输入借阅单位名称', trigger: 'blur' }
          ],
        // tyshxydm: [
        //     { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
        //   { pattern:/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/, message: "统一社会信用代码格式不正确", trigger: "blur" }
        //   ],
        idcard:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
           { pattern:/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, message: "身份证号码格式不正确", trigger: "blur" },
        
        ]
      },
      EngineeringList:[],//审核列表
      files_type:'files_type1',//默认单位查档  files_type1——单位查档   files_type2——个人查档
      file_status:'',//审核状态
      dialoghintVisible:false,
      filerow:{},
      dialogUtilizeFeedBackVisible:false,//利用反馈 弹层
      UtilizeFeedBackForm:{
        desc:'',
      },
      UtilizeFeedBackrules:{
        desc: [
            { required: true, message: '请填写反馈信息', trigger: 'blur' }
          ]
      }
    }
  },
  created () {
    this.getSystemDictionary() //审核状态
  },
  mounted () {
    
  },
  methods: {
    //打开利用反馈 弹层 
    dialogUtilizeFeedBackVisibleFun(row){
      this.utilize_id = row.utilize_id
      this.dialogUtilizeFeedBackVisible = true
    },
    //取消提交
    resetForm(formName){
      this.dialogUtilizeFeedBackVisible = false
      this.$refs[formName].resetFields();
    },
    //提交利用反馈
    submitUtilizeFeedBackFun(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            const q = {
              utilize_id:this.utilize_id,
              notes:this.UtilizeFeedBackForm.desc,
            }
            submitUtilizeFeedBack(q).then(response =>{
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
              this.resetForm('UtilizeFeedBackForm') 
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

     
    },
    //关闭弹层
    dialogClosed(){
      this.dialoghintVisible = false
      this.downloadbtn(this.filerow)
      this.loading = true
    },
        //下载文件利用压缩包
    downloadbtn(row){
      const q ={
        utilize_id:row.utilize_id
      }
      downloadFileMachineUtilizationUtilize(q).then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          const fileName = decodeURI(headersName)
          const blob = new Blob([response.data], { type: 'aplication/zip' })
          Download.download(
            blob,
            fileName
          )
        this.loading = false
        this.getMachineUtilizeIntegratedMachineRecordListFun()
        }).catch(error => {
          console.log(error)
        })
    },
    //下载利用压缩包 按钮
    gotofilespage(row){
      console.log(row)
       this.filerow = row
       this.dialoghintVisible = true
    },
        //审核状态
    getSystemDictionary(){
       const q = {
          dict_tag:'file_status'
          }
          //获取字段名
          getDictListDictTag(q).then(response => { 
            
            if (response.status === 200) {
              this.file_status = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
  //案卷归属类别 工程类或管理类
    selectsort(){
      // this.files_type = files_type
      console.log(this.files_type)
      this.EngineeringList = []
      this.queryInfo.cddwmc = ''
      this.queryInfo.tyshxydm = ''
      this.queryInfo.create_time = ''
      this.queryInfo.create_time = ''
    },
    //获取审核结果查询 列表
    getMachineUtilizeIntegratedMachineRecordListFun(){
      this.$refs.queryInfo.validate((valid) => {
        if (valid) {
           let cdlx = '2'
      if (this.files_type == 'files_type2') {
        cdlx = '1'
      } else {
        cdlx = '2'
      }
      const q ={
        
      }
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      this.queryInfo.cdlx = cdlx
      getMachineUtilizeCheckRecordList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         res.list.forEach(v => {
          this.file_status.forEach(t => {
              if (v.zt === t.dict_code) {
                v.ztName = t.dict_name
              }
              return
            })
          return
        })
         this.EngineeringList = res.list
        }
      })
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
<style lang="less" >
// .btncolor {
//   background-color: #5365ED !important;
//   color: #fff !important;
// }
 .resultboxtop {
    @media screen and (max-width: 1680px){
    .el-input--suffix .el-input__inner {
      width: 220px !important;
    }
    .el-form-item {
      margin-right: 10px !important;
    }
  }
 }
</style>
<style scoped lang='less'>
.btn {
  width: 100%;
  text-align: center;
}
.box {
  width: 100%;
  height: 100%;
}
  @media screen and (min-width: 1680px){
    .head {
      height: 18%;
    }
  }
  @media screen and (max-width: 1680px){
    .head {
      height: 14%;
    }
  }
  .head {
    width: 100%;
    background: url('../../../assets/head.png') no-repeat;
    background-size: 100% ;
    position: relative;
    @media screen and (min-width: 1680px){
    .head1 {
        width: 442px;
        height: 63px;
      top: 50%;
      }
    .head2 {
      width: 108px;
      height: 50px;
      top: 50%;
      }
    
    }
    @media screen and (max-width: 1680px){
    .head1 {
      width: 300px;
      height: 50px;
      top: 40%;
    }
    .head2 {
      width: 70px;
      height: 30px;
      top: 40%;
    }
  
  }
    .head1 {
      position: absolute;
      left: 50px;
      transform: translateY(-50%);
      background: url('../../../assets/logo.png') no-repeat;
      background-size: contain;
    }
    .head2 {
      position: absolute;
      right: 50px;
      transform: translateY(-50%);
      background: url('../../../assets/btnback.png') no-repeat;
      background-size: 80%;
      
    }
  }

   @media screen and (min-width: 1680px){
      .formbody {
        padding: 2% 18%;
      }
    }
    @media screen and (max-width: 1680px){
      .formbody {
        padding: 1% 10%;
      }
  }
  .formbody {
    width: 100%;
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 18px !important;
    }
    .upload-demo {
      height: 120px;
    }
  }
  .el-upload__tip {
    color: #FF0000;
  }
  .utilizeRemarks {
  width: 100%;
  .el-form-item__content {
    width: 66%;
  }
}
.xuanzeengineering_id {
  margin-left: 10px !important;
}
</style>

<style scoped lang='less'>
  .resultbox {
    width: 100%;
    padding: 20px 50px;
    box-sizing: border-box;
  }
  .resultboxtop {
    padding-top:10px ;
    box-sizing: border-box;
    box-shadow: 0px 1px 6px 0px rgba(116, 116, 116, 0.3);
  }
  .resultboxtable {
    padding:10px 20px;
    box-sizing: border-box;
    box-shadow: 0px 1px 6px 0px rgba(116, 116, 116, 0.3);
    .el-table {
      border: 1px solid #EBEEF5;
    }
  }
  .hintbtnstyle {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
</style>
