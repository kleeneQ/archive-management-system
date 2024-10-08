<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>利用审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="background-color: #F4F4F4;">
      <div class="eltablebox">
        <!-- 案卷列表 -->
            <el-table
              :data="auditFilesList"
              border
              style="width: 100%"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
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
                width="200"
              >
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
                prop="cdlx"
                label="查档类型"
                show-overflow-tooltip
                width="200">
                <template slot-scope="scope">
                {{scope.row.cdlx=='1'?'个人查档':'单位查档'}}
              </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="people_num"
                label="查档人数"
                width="200">
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
              align="center"
                label="操作"
                fixed="right"
                width="300">
                <template slot-scope="scope">
                  <el-button size="small" class="btnedit" @click="showUtilezeRegisterVisibleFun(scope.row)">查档登记详情</el-button>
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
    <!-- 审核弹层 B-->
     <el-dialog
      :title="'审核'"
      :visible.sync="AuditDialogVisible"
      width="40%"
      @close="dialogClosed"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="是否通过：" prop="pass">
          <el-radio-group v-model="form.pass">
            <el-radio label="true" @change="auditpassbtn">通过</el-radio>
            <el-radio label="false" @change="auditpassbtn">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="调卷利用设置：" v-if="UtilizeAudioflag">
            <el-button type="primary" class="btnedit" @click="getUtilizeAudioFilesPreviewFun()">设置</el-button>
            <el-button type="primary" class="btnedit" @click="getUtilizeAudioFileSetInfoFun()">设置详情</el-button>
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
      <!-- 查档登记详情 B -->
      <el-dialog :title="'查档登记详情'" :visible.sync="dialogUtilezeRegisterDetailVisible" width="60%" >
           <!-- 查档登记信息 -->
    <table class="mailTable" >

      <tr v-if="utilizeDetail.cddwmc">
        <td class="column">查档单位：</td>
        <td >{{utilizeDetail.cddwmc}}</td>
        <td class="column">统一社会信用代码：</td>
        <td >{{utilizeDetail.tyshxydm}}</td>
      </tr>
      <tr >
        <td class="column">查档目的：</td>
        <td >{{utilizeDetail.cdmdName}}</td>
        <td class="column">查档类别：</td>
        <td >{{utilizeDetail.cdlbName}}</td>
      </tr>
      <tr >
        <td class="column">查阅人：</td>
        <td >{{utilizeDetail.reviewer}}</td>
        <td class="column">身份证号：</td>
        <td >{{utilizeDetail.idcard}}</td>
      </tr>
      <tr >
        <td class="column">手机号：</td>
        <td >{{utilizeDetail.tel}}</td>
        <td class="column">查档人数：</td>
        <td >{{utilizeDetail.people_num}}</td>
      </tr>
      <tr >
        <td class="column">查档日期：</td>
        <td colspan="3">{{utilizeDetail.create_time | formatDate}}</td>
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
          <div class="linkstyle"  @click="gotodetailsFun(utilizeDetail)">{{utilizeDetail.damc}}</div>
          </td>
      </tr>
      <tr >
        <td class="column">查档内容：</td>
        <td colspan="3">{{utilizeDetail.cdnr}}</td>
      </tr>
    </table>

      </el-dialog>
    <!-- 查档登记详情 E -->
  <!-- 设置文件 B-->
    <el-dialog 
    :title="'设置'" 
    :visible.sync="settingFileVisible" 
    width="60%" >
      <div class="scanrightcenter">
            <div class="utilizeAudit-images">
                    <el-checkbox-group v-model="checkList" @change="checkListFun">
                      <div class="block" v-for="(item,index) in filePreviewlist" :key="index">
                        <el-checkbox border :label="item.file_url" @change="checkFun(item.file_url,index)" >
                            <img :src="item.file_url" >
                        </el-checkbox>
                       <p style="font-size:14px">{{item.zdjh}}</p> 
                      </div> 
                    </el-checkbox-group>
                    
                </div>
              <div class="scan-image-relevancy">
                <div class="scan-image-relevancy-item scan-image-relevancy-1">文件共：<span>{{filePreviewlist.length}}</span>张/条，已选择：<span> {{checkList.length}}</span>张/条</div>
                <div class="scan-image-relevancy-item "><el-checkbox style="color: #F59A23;" v-model="allchecked" @change="allcheckedFun()">全选</el-checkbox></div>
                <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="setUtilizeAudioFilesCheckPickFun()"><i class="el-icon-s-claim"> 保存设置</i></div>
              </div> 
        </div>
    </el-dialog>
    <!-- 设置文件 E-->

    <!-- 预览设置文件 B-->
    <el-dialog 
    :title="'设置详情'" 
    :visible.sync="settingdetailsFileVisible" 
    width="60%" >
      <div class="scanrightcenter">
            <div class="utilizeAudit-images">
                      <div class="block" v-for="(item,index) in detailsfilePreviewlist" :key="index">
                            <img :src="item.file_url" >
                            <p>{{item.zdjh}}</p>
                      </div> 
                </div>
        </div>
    </el-dialog>
    <!-- 预览设置文件 E-->
  </div>

</template>

<script>
import {
  utilizeCheckList,
  utilizeCheckVerifyList,
  utilizeCheck,
  getFileUtilizationUtilizeList,
  getUtilizeCheckVerifyFileList,
  getUtilizeAudioFilesPreview,
  setUtilizeAudioFilesCheckPick,
  getUtilizeAudioFileSetInfo,
  getUtilizeAudioFileListDjh,
} from '@/api/utilize'
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
import AuditDetail from '@/components/audit/utilizeAuditDetail'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getArchivesCateList
} from '@/api/archivesCate'
export default {
  components: {
    AuditDetail,
  },
  data(){
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        page_num:'',
        page_size:'',
        ajtm:'',
        ajdh:'',
      },
      files_type:'files_type1',//案卷归属类型 默认工程类  files_type1——工程类   files_type2——管理类
      auditFilesList:[],//验收案卷列表
      AuditDialogVisible:false, //审核弹层
      // pass:'',//审核是否通过
      form:{
        pass:'true',//审核是否通过
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
      utilize_id:'',//档案利用记录id
      dialogUtilezeRegisterDetailVisible:false,//查档登记详情 弹层
      utilizeDetail:{},//查档详情数据
      file_name:[],//查档 附件
      file_url:[],//查档 附件
      fileURLym:'',//访问附件的域名
      QueryConditionType:[],//查档类别
      QueryPurposeType:[],//查档目的
       checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: false,
        cityOptions:[],
      Namerow:{},
      filePreviewlist:[],
      checkList:[],
      allchecked:'',//全选框
      settingFileVisible:false,//设置查询文件 弹层
      detailsfilePreviewlist:[],//
      settingdetailsFileVisible:false,//
      zdjh:[],//总登记号列表
      UtilizeAudioflag:false,//显示
    }
  },

  beforeMount(){
    this.getSystemDictionary()//案卷状态
    // this.getFileCategory()  // 案卷类别
    // this.getStoragePeriod()  // 保管期限
    // this.getSecretGrade()  // 密级
    // this.getCarrierType()  // 载体类型
    this.getQueryPurposeType()  //查档目的
    this.getQueryConditionType() //查档类别
    this.getQueryGistType() //查档依据
    this.getEngineeringTypeFun() // 工程类型
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  mounted(){
    this.utilizeCheckListFun()
  },
  methods:{

    //声像档案根据案卷id获取文件登记号信息
    getUtilizeAudioFileListDjhFun(row){
      this.zdjh = []
      const q = {
        files_id:row.engineering_id,
      }
      getUtilizeAudioFileListDjh(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.zdjh = res
        }
      })
    },
    //设置详情
    getUtilizeAudioFileSetInfoFun(){
      const q = {
        utilize_id:this.utilize_id,
      }
      getUtilizeAudioFileSetInfo(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         if (res.length == 0) return this.message({ message: '未找到设置详情', type: 'warning' })
          res.map(item =>{
            this.zdjh.forEach(t=>{
             if (item.file_id == t.file_id) {
               item.zdjh = t.zdjh
             }
           })
           item.file_url = this.fileURLym + item.file_url+"?"+ new Date()
         })
          this.detailsfilePreviewlist = res
          this.settingdetailsFileVisible = true
        }
      })
    },
    // 档案利用登记审核选择可展示声像档案文件
    setUtilizeAudioFilesCheckPickFun(row){
      if (this.checkList.length == 0) return this.message({ message: ' 暂无勾选文件', type: 'error' })
      let fileID = ''
      console.log(this.filePreviewlist)
      this.filePreviewlist.forEach((item,index) =>{
        if (item.checkedFlag == true) {
          fileID =item.file_id+'#'+fileID
        } else {
          // fileID = fileID+'#'+item.file_id
        }
      })

          const q ={
            file_id:fileID,
            utilize_id:this.utilize_id,
          }
          console.log(q)
          setUtilizeAudioFilesCheckPick(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.settingFileVisible = false
            this.message({ message: message, type: 'success' })
            }
          })
    },

    //点击单个图片
    checkFun(fit,index){

      if (this.filePreviewlist[index].checkedFlag) {
        this.filePreviewlist[index].checkedFlag = false
      } else {
        this.filePreviewlist[index].checkedFlag = true
        // this.fileBlob = fit
        // this.$refs.Childsss.joinImgFun(fit)
      }
      
    },
      //全选
  allcheckedFun(){
    if (this.allchecked) {
      this.filePreviewlist.map(item =>{
        item.checkedFlag = true
        this.checkList.push(item.url)
      })
    } else {
      this.checkList = []
    }
  },
     //多选
    checkListFun(){
      // console.log(this.checkList)
    },
    //获取预览文件列表
    getUtilizeAudioFilesPreviewFun(){
      const q ={
        files_id:this.files_id,
      }
      console.log(q)
      getUtilizeAudioFilesPreview(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         res.map(item =>{
           this.zdjh.forEach(t=>{
             if (item.file_id == t.file_id) {
               item.zdjh = t.zdjh
             }
           })
           item.file_url = this.fileURLym + item.file_url+"?"+ new Date()
           item.checkedFlag = false
         })
         
          this.filePreviewlist = res
          this.settingFileVisible = true
        }
      })
    },
    //查看 H:\Git\lan-web\src\views\Home\Audit\utilizeEngineeringPage.vue
    gotodetailsFun(row){
      console.log(row)
      if (row.lydalx == '2') {
        this.UtilizeAudioflag = true
      } else {
        this.UtilizeAudioflag = false
      }
      // /utilize/utilizeaudioPage
      if (this.UtilizeAudioflag) {
        this.$router.push({ 
        path: '/utilize/utilizeaudioPage', 
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

      // this.$router.push({ 
      //   path: '/Audit/utilizeEngineeringPage', 
      //   query: {
      //      engineering_id: this.Namerow.engineering_id,
      //      gclx: this.Namerow.dalx,
      //      zt:this.Namerow.zt
      //      }
      //   })
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
        //查看 
    showUtilezeRegisterVisibleFun(row){
      console.log(row)
      this.Namerow = row
      this.dialogUtilezeRegisterDetailVisible = true
      console.log(this.engineeringType)
      this.engineeringType.forEach(t => {  //载体类型
        if (row.dalx === t.type_code) {
          row.gclxName = t.type_name
        }
        return
      })
      var newarr = []
      newarr = row.cdyj.split("#")
      console.log(newarr)
      newarr.forEach(item =>{
        this.cityOptions.forEach(v =>{
          if (item == v.bm) {
            this.checkedCities.push(v)         
          }
        })
      })
      this.cities = this.checkedCities
      console.log(this.checkedCities)
      const q ={
        utilize_id:row.utilize_id
      }
      getUtilizeCheckVerifyFileList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.file_name = res.file_name
         this.file_url = res.file_url
        }
      })
      this.utilizeDetail = row

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
          this.cities = res
          this.cityOptions = res
          
        }
      }).catch(error => {
        console.log(error)
      })
    },
        //查询依据
    handleCheckAllChange(val) {
      console.log(val,"全选")
        this.isIndeterminate = false
        this.checkedCities = val ? this.cityOptions : []
      },
      // 查询依据
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length;
        console.log(checkedCount > 0 && checkedCount < this.cities.length)
        console.log(checkedCount )
        console.log(this.cities.length)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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
    // 获取档案利用审核列表
    utilizeCheckListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      utilizeCheckList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        if (res === null ) {
          return
        }
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.utilizeCheckListFun()
         }
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
        this.auditFilesList = res.list 
        }
      })
    },

    //审核详情
    showDialogAuditDetailsFun(row){
      const that = this
      const q = {
        record_id:row.utilize_id 
      }
      console.log(row)
      utilizeCheckVerifyList(q).then(response =>{
        
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
      this.auditpassbtn()
    this.$refs[formName].validate((valid) => {
      if (valid) {
        if (this.form.pass === "true") {
          const q = {
            check_status:'1',
            utilize_id:this.utilize_id,
            check_describe:this.form.desc,
          }
          utilizeCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
            }
          })
        } else {
          const q = {
            check_status:'2',
            utilize_id:this.utilize_id,
            check_describe:this.form.desc,
          }
          utilizeCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
            }
          })
        }
        this.AuditDialogVisible = true
        console.log('submit!',this.form.pass);
       
      } else {
        console.log('error submit!!');
        return false;
      }
    });
      
    },
    //审核是否通过  并赋值给审核描述栏
    auditpassbtn(){
      if (this.form.pass === "true") {
        if (this.form.desc == '') {
          this.form.desc = "审核通过"
        }
      } else {
        if (this.form.desc == '') {
          this.form.desc = "审核不通过"
        }
      }
    },
    // 审核按钮  审核弹层显示
    showDialogAuditFun(row){
      console.log(row)
      if (row.lydalx == '2') {
        this.UtilizeAudioflag = true
      } else {
        this.UtilizeAudioflag = false
      }
      this.getUtilizeAudioFileListDjhFun(row)
      this.utilize_id = row.utilize_id
      this.files_id = row.engineering_id
      this.AuditDialogVisible = true
    },
 

        // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.utilizeCheckListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.utilizeCheckListFun()
    },
    //取消提交
    resetForm() {
      this.$refs['form'].resetFields();
      this.AuditDialogVisible = false
      this.form.desc = ''
      this.utilizeCheckListFun()
    },
    // 关闭弹层 
    dialogClosed() {
      this.AuditDialogVisible = false
      this.utilizeCheckListFun()
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

<style  lang='less' >
.utilizeAudit-images{
  overflow: auto;
  height: 600px;
  padding-top: 20px;
  padding-bottom: 40px;
  .el-checkbox {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    
    .el-checkbox__input {
      position: absolute;
        top: -5px;
        left: -5px;
    }
    .el-checkbox__label {
      padding: 2px;
    }
  }
  .block {
    box-sizing: border-box;
    display: inline-block;
    width: 160px;
    height: 225px;
    // border: 1px solid #cdcdcd;
    margin-left:20px ;
    margin-bottom: 20px;
    margin-top: 10px;
    p {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-top: 5px;
      padding-bottom: 5px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
    object-fit: contain;
    vertical-align:top;
  }
}


</style>


<style scoped lang='less'>

.file-btn {
  display: inline-block;
    position: absolute;
    width: 60px;
    left: 0;
    cursor: pointer;
    outline: none;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
}
.scanLeft {
  float: left;

}
.scanLeftcenter {
  width: 100%;
  height: 600px;
}

.scan-image-relevancy {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: 10px;
  width: 100%;
  background-color: rgba(242, 242, 242, 1);
  padding: 20px 0 ;
  text-align: center;
  font-size: 18px;
  .scan-image-relevancy-item  {
    display: inline-block;
    cursor: pointer;
    margin-right: 30px;
    color: #F59A23;
  }
  .scan-image-relevancy-1 {
    color: #000;
    span {
      display: inline-block;
      min-width: 40px;
      color: #F59A23;
    }
  }

}
.scanBox {
  background-color: #fff;
  margin: 10px ;
  box-sizing: border-box;
  height: 750px;
  position: relative;
  div {
    display: inline-block;
    box-sizing: border-box;
  }
  .scanLeft {
    width: 40%;
    box-sizing: border-box;
    padding: 30px;
    border-right: 1px solid #cdcdcd;
  }
  .scanright {
    width: 60%;
    box-sizing: border-box;
    padding: 30px ;
  }
  .scanTitle {
    margin: 10px ;
    box-sizing: border-box;
    border-bottom: 1px solid #cdcdcd;
    width: 97%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
      p {
        width: 100px;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 2px solid #02a7f0;
        padding-left: 10px;
      }
  }
  
}

</style>
