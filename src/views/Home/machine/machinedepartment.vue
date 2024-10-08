<template>
  <div class="box">
    <div class="head">
      <div class="head1"></div>
      <div class="head2" @click="goBackPage"></div>
    </div>
    <div class="formbody">
           <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="单位查档登记" name="first">
                   <el-form class="fileForm" :inline="true" :model="utilizeSubmitForm" ref="utilizeSubmitForm" :rules="utilizeSubmitFormRules" label-width="150px">
                <el-form-item label="查阅人: " prop="reviewer" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.reviewer" placeholder="请输入查阅人"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号: " prop="idcard" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.idcard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="电话: " prop="tel" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.tel" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="人数: " prop="people_num" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.people_num" placeholder="请输入人数"></el-input>
                </el-form-item>
                <el-form-item label="查档单位名称: " prop="cddwmc" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.cddwmc" placeholder="请输入查档单位名称"></el-input>
                </el-form-item>
                <el-form-item label="查档类别: " prop="cdlb" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdlb" placeholder="请选择查档类别" clearable>
                    <el-option
                      v-for="item in QueryConditionType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统一社会信用代码: " prop="tyshxydm" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.tyshxydm" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="查档目的: " prop="cdmd" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdmd" placeholder="请选择查档目的" clearable>
                    <el-option
                      v-for="item in QueryPurposeType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="档案名称: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gcmc" disabled placeholder="请选择档案名称" clearable style="width:80%;"></el-input>
                    <el-button type="primary" class="xuanzeengineering_id" @click="selectEngineeringFun">选择</el-button>
                </el-form-item>
                <el-form-item v-if="lbname !== '声像档案查档登记'" label="档案类型: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gclxName" placeholder="" disabled clearable style="width:80%;"></el-input>
                </el-form-item>
                
                <el-form-item v-if="lbname !== '声像档案查档登记'" label="项目地址: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gcdd" placeholder="" disabled clearable style="width:80%;"></el-input>
                </el-form-item>
                
                <el-form-item label="查档内容: " class="utilizeRemarks">
                  <el-col :span="24">
                    <el-input type="textarea" v-model="utilizeSubmitForm.cdnr" placeholder="请输入备注信息" clearable style="width:80%;"></el-input>
                  </el-col>
                </el-form-item>
                
                <el-form-item label="查档依据: " class="utilizeRemarks" prop="checkedCities" >
                      <el-checkbox-group v-model="utilizeSubmitForm.checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city.mc}}</el-checkbox>
                      </el-checkbox-group>
                </el-form-item>
                <el-form-item label="附件信息: " class="utilizeRemarks " >
                  <label slot="label"><span style="color:red">*</span>&nbsp;&nbsp;附件信息: </label>
                  <el-upload
                    class="upload-demo"
                    accept=".jpg,.png,.pdf"
                    action="#"
                    :on-change="handleChange"
                    :http-request="myUpload"
                    :file-list="fileList">
                    <el-button size="small" type="primary">选择上传附件</el-button>
                    <div slot="tip" class="el-upload__tip" >请将附件命名与上传文件内容保持一致，例如：单位介绍信.jpg，支持附件格式为：jpg、png、pdf的文件</div>
                  </el-upload>
                </el-form-item>
            
                <el-form-item class="btn" >
                  <el-button @click="clearUtilizeSubmitFun">取 消</el-button>
                  <el-button type="primary" @click="utilizeSubmitFun">保 存</el-button>
                </el-form-item>
              </el-form>
              </el-tab-pane>
              <el-tab-pane label="个人查档登记" name="second">
                  <el-form class="fileForm" :inline="true" :model="utilizeSubmitForm" ref="utilizeSubmitForm" :rules="utilizeSubmitFormRules" label-width="150px">
                <el-form-item label="查阅人: " prop="reviewer" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.reviewer" placeholder="请输入查阅人"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号: " prop="idcard" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.idcard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="电话: " prop="tel" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.tel" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="人数: " prop="people_num" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.people_num" placeholder="请输入人数"></el-input>
                </el-form-item>
              
                <el-form-item label="查档目的: " prop="cdmd" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdmd" placeholder="请选择查档目的" clearable>
                    <el-option
                      v-for="item in QueryPurposeType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="查档类别: " prop="cdlb" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdlb" placeholder="请选择查档类别" clearable>
                    <el-option
                      v-for="item in QueryConditionType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="档案名称: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gcmc" disabled placeholder="请选择档案名称" clearable style="width:80%;"></el-input>
                    <el-button type="primary" class="xuanzeengineering_id" @click="selectEngineeringFun">选择</el-button>
                </el-form-item>
                <el-form-item v-if="lbname !== '声像档案查档登记'" label="档案类型: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gclxName" placeholder="" disabled clearable style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item v-if="lbname !== '声像档案查档登记'" label="项目地址: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gcdd" placeholder="" disabled clearable style="width:80%;"></el-input>
                </el-form-item>

                <el-form-item label="查档内容: " class="utilizeRemarks">
                  <el-col :span="24">
                    <el-input type="textarea" v-model="utilizeSubmitForm.cdnr" placeholder="请输入查询的档案信息内容（主题）" clearable style="width:80%;"></el-input>
                  </el-col>
                </el-form-item>
                 
                <el-form-item label="查档依据: " class="utilizeRemarks" prop="checkedCities" >
                      <el-checkbox-group v-model="utilizeSubmitForm.checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city.mc}}</el-checkbox>
                      </el-checkbox-group>
                </el-form-item>
                <el-form-item label="附件信息: " class="utilizeRemarks " >
                  <label slot="label"><span style="color:red">*</span>&nbsp;&nbsp;附件信息: </label>
                  <el-upload
                    class="upload-demo "
                    accept=".jpg,.png,.pdf"
                    action="#"
                    :on-change="handleChange"
                    :http-request="myUpload"
                    :file-list="fileList">
                    <el-button size="small" type="primary">选择上传附件</el-button>
                    <div slot="tip" class="el-upload__tip" >请将附件命名与上传文件内容保持一致，例如：单位介绍信.jpg，支持附件格式为：jpg、png、pdf的文件</div>
                  </el-upload>
                </el-form-item>
            
                <el-form-item class="btn" >
                  <el-button @click="clearUtilizeSubmitFun">取 消</el-button>
                  <el-button type="primary" @click="utilizeSubmitFun">保 存</el-button>
                </el-form-item>
              </el-form>
              </el-tab-pane>
            </el-tabs>
    </div>
         <!-- 选择工程 B -->
        <el-dialog
          width="60%"
          title="选择档案"
          :visible.sync="engineeringVisible">
           <!-- 声像档案 -->
           <div v-if="lbname == '声像档案查档登记'">
             <el-form  :inline="true" :model="AudioQueryInfo" class="demo-form-inline" label-width="100px">
           
            <el-form-item label="案卷题名">
              <el-input clearable v-model="AudioQueryInfo.ajtm" placeholder="请输入案卷题名"  @change="getWebMachineUtilizeEngineeringListFun"></el-input>
            </el-form-item>
             <el-form-item label="拍摄地点">
              <el-input clearable v-model="AudioQueryInfo.psdd" placeholder="请输入拍摄地点"  @change="getWebMachineUtilizeEngineeringListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getUtilizeAudioFilesListFun">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 工程列表 B -->
            <el-table
              :data="selectFilesLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="ajtm"
                label="档案名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="psdd"
                label="拍摄地点"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="getfileNameFun(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->

           </div>

           <div v-else>
                  <!-- 工程 -->
          <el-form  :inline="true" :model="EngineeringQueryInfo" class="demo-form-inline" label-width="100px">
           
            <el-form-item label="项目类型">
            <el-select clearable v-model="EngineeringQueryInfo.gclx" placeholder="请选择项目类型" @change="getWebMachineUtilizeEngineeringListFun">
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="项目名称">
              <el-input clearable v-model="EngineeringQueryInfo.gcmc" placeholder="请输入项目名称"  @change="getWebMachineUtilizeEngineeringListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getWebMachineUtilizeEngineeringListFun">查询</el-button>
            </el-form-item>
          </el-form>
            <!-- 工程列表 B -->
            <el-table
              :data="selectEngineeringLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="gcmc"
                label="项目名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="项目类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="gcdd"
                label="项目地址"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="getEngineeringNameFun(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
           </div>
          
     
        </el-dialog>
        <!-- 选择工程 E -->   
       <!-- 提交完成提示 弹层 B -->
      <el-dialog
          title="提示"
          @close="dialogClosed"
          :visible.sync="dialoghintVisible"
          width="25%">
          查档登记申请提交成功，请将查档资料提交至1507室进行审核<br>
                      审核需要1~3分钟，请耐心等待。
        </el-dialog>
      <!-- 提交完成提示 弹层 E -->   
  </div>
</template>

<script>
import {
  getWebDataDictionaryBistDrop,
  getWebMachineUtilizeEngineeringList,
  getWebFileTypeListDrop,
  submitFileMachineSimpleUtilize,
  submitWebMachineUtilizeSubmit,
  getUtilizeAudioFilesList,

} from '@/api/machine'
import { removeToken } from '@/utils/auth'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
export default {
  data () {
     return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:1,
        page_size:10,
        create_time:'',
      },
      EngineeringList:[],//列表数据
      utilizeSubmitForm:{
        reviewer:'',
        idcard:'',
        tel:'',
        people_num:'',
        cddwmc:'',
        cdlb:'',
        tyshxydm:'',
        cdmd:'',
        engineering_id:'',
        gcmc:'',
        gclxName:'',
        dalx:'',
        cdnr:'',
        checkedCities:[],
      },
      utilizeSubmitFormRules: {
        reviewer: [
          { required: true, message: '请输入查阅人', trigger: 'blur' }
        ],
        idcard:[
          { required: true, message: '请输入身份证号', trigger: ["blur"]},
          { pattern:/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, message: "身份证号码格式不正确", trigger: "blur" },
        
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' },
          { pattern:/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: "手机号格式不正确", trigger: "blur" }
        ],
        people_num: [
          { required: true, message: '请输入查档单位名称', trigger: 'blur' }
        ],
        cdlb: [
          { required: true, message: '请输入查档类别', trigger: ["blur",'change'] }
        ],
        cddwmc: [
          { required: true, message: '请输入查档单位名称', trigger: ["blur",'change'] }
        ],
        tyshxydm: [
          { required: true, message: '请输入统一社会信用代码', trigger: ["blur",'change'] },
          { pattern:/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/, message: "统一社会信用代码格式不正确", trigger: "blur" }
        ],
        cdmd: [
          { required: true, message: '请输入查档目的', trigger: ["blur",'change'] }
        ],
        engineering_id: [
          { required: true, message: '请选择档案名称', trigger: ["blur",'change'] }
        ],
        dalx: [
          { required: true, message: '请输入查档类别', trigger: ["blur",'change'] }
        ],
        fileList: [
          { type: 'array', required: true, message: '请上传附件', trigger: ["blur",'change'] }
        ],
        checkedCities: [
          // { required: true, message: '请选择查档依据', trigger: ["blur",'change'] }
          { type: 'array', required: true, message: '请选择查档依据', trigger: 'change' }
        ],
        
      },
      dialogUtilezeRegisterVisible:false,//新增 弹层
      QueryConditionType:[],//查档类别
      QueryPurposeType:[],//查档目的
      QueryGistType:[],//查档依据
      engineeringVisible:false,//选择项目 弹层
      EngineeringQueryInfo:{ //项目列表查询
        gcmc:'',
        gclx:'',
      },
      engineeringType:[],//项目工程类型
      selectEngineeringLists:[],//
      dialogUtilizeConditionVisible:false, //查档登记情况
      UtilizeConditionform:{
        utilize_id:'',
        jdr:'',
        qdr:'',
        wzj:'',
        tzj:'',
        zpz:'',
        qtj:'',
        fywzz:'',
        fytzz:'',
        fpzpz:'',
        cxzpz:'',
        fzgpz:'',
        bz:'',
        shyj:'',
      },
      username:'',//当前用户名称
      file_status:[],
      activeName: 'first',
      
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      cityOptions:[],
      fileList:[],
      utilize_id:'',//利用记录id 随机数
      dialogUtilezeRegisterDetailVisible:false,//查档登记详情 弹层
      utilizeDetail:{},//查档详情数据
      file_name:[],//查档 附件
      file_url:[],//查档 附件
      fileURLym:'',//访问附件的域名
      cdlbbm:'', //
      dialoghintVisible:false,//提示 弹层
      lbname:'',//查档类别
      AudioQueryInfo:{ 
        ajtm:'',
        psdd:'',
      },
      selectFilesLists:[],
    }
  },
  created () {
    console.log(this.$route.params)
    this.utilizeSubmitForm.cdlb = this.$route.params.bm
    this.utilizeSubmitForm.idcard = this.$route.params.idcardnum
    this.utilizeSubmitForm.reviewer = this.$route.params.idcardname
    this.lbname = this.$route.params.lb
      this.utilizeSubmitForm.gcmc = this.$route.params.gcmc
      this.utilizeSubmitForm.engineering_id = this.$route.params.engineering_id
      this.utilizeSubmitForm.gclxName = this.$route.params.gclxName
      this.utilizeSubmitForm.gcdd = this.$route.params.gcdd
      this.utilizeSubmitForm.dalx = this.$route.params.dalx

    this.getQueryGistType() //查档依据
    this.getQueryConditionType() //查档类别
    this.getQueryPurposeType() //查档目的
    this.getEngineeringTypeFun() //工程类型
  },
  mounted () {
    this.utilizeIdFun() //生成档案利用ID
  },
  methods: {
    //关闭提示 弹层 后跳转
    dialogClosed(){
      console.log("/machineHome")
       this.$router.push({ 
        path: '/machineHome', 
        })
    },
    //取消
    clearUtilizeSubmitFun(){
      console.log(this.$route.query.bm)
      const cdlb = this.$route.query.bm
      this.utilizeSubmitForm = {
        cdlb:cdlb,
        reviewer:'',
        idcard:'',
        tel:'',
        people_num:'',
        cddwmc:'',
        tyshxydm:'',
        cdmd:'',
        gcmc:'',
        gclxName:'',
        gcdd:'',
        cdnr:'',
      }
      this.utilizeSubmitForm.checkedCities = []
      this.fileList = []
      console.log(this.utilizeSubmitForm)

    },
        // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
     //生成档案利用ID
    utilizeIdFun(){
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var hours = day.getHours();
        var minutes = day.getMinutes()
        var seconds = day.getSeconds();
        var CurrentDate = "";
        Year = day.getFullYear(); //支持IE和火狐浏览器.
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year;
        if (Month >= 10) {
            CurrentDate += Month;
        }
        else {
            CurrentDate += "0" + Month;
        }
        if (Day >= 10) {
            CurrentDate += Day;
        }
        else {
            CurrentDate += "0" + Day;
        }
        if (hours<10) {
          hours = '0'+hours
        }
        if (minutes<10) {
          minutes = '0'+minutes
        }
        if (seconds<10) {
          seconds = '0'+seconds
        }
        CurrentDate = CurrentDate+hours+minutes+seconds
        var OrderID = CurrentDate + Math.floor(Math.random() * 100 );
        this.utilize_id = OrderID
        console.log("随机ID:" + OrderID );
        return OrderID
    },
     //获取项目名称类型
  getEngineeringNameFun(row){
    console.log(row)
    this.utilizeSubmitForm.gcmc = row.gcmc
    this.utilizeSubmitForm.engineering_id = row.engineering_id
    this.utilizeSubmitForm.gclxName = row.gclxName
    this.utilizeSubmitForm.gcdd = row.gcdd
    this.utilizeSubmitForm.dalx = row.gclx
    this.engineeringVisible = false
  },
      //获取案卷名称类型
  getfileNameFun(row){
    console.log(row)
    this.utilizeSubmitForm.gcmc = row.ajtm
    this.utilizeSubmitForm.engineering_id = row.files_id
    this.engineeringVisible = false
  },

    //选择工程弹层
    selectEngineeringFun(){
      if (this.lbname == '工程档案查档登记') {
         this.getWebMachineUtilizeEngineeringListFun()
      } else {
        this.getUtilizeAudioFilesListFun()
      }
      
     
      this.engineeringVisible = true
    },
    // 获取声像档案列表
    getUtilizeAudioFilesListFun(){
      const q ={
        ajtm:'',
        psdd:'',
      }
      getUtilizeAudioFilesList(this.AudioQueryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.selectFilesLists = res
        }
      })
    },
    //获取 项目工程 列表
  getWebMachineUtilizeEngineeringListFun(){
    getWebMachineUtilizeEngineeringList(this.EngineeringQueryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
        res.map(v=>{
          this.engineeringType.forEach(t => {  //载体类型
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
           
        })
        console.log(this.selectEngineeringLists)
        this.selectEngineeringLists = res
        }
      })
  },
    //新增、添加档案利用信息
    utilizeSubmitFun(){
       this.$refs.utilizeSubmitForm.validate((valid) => {
          if (valid) {
           const q = {
              reviewer:'',
              idcard:'',
              tel:'',
              people_num:'',
              cddwmc:'',
              cdlb:'',
              tyshxydm:'',
              cdmd:'',
              engineering_id:'',
              dalx:'',
              cdnr:'',
              cdlx:'',
              cdyj:'',
              utilize_id:this.utilize_id,
            }
            var cdlx = ''
            if (this.activeName == 'first') {
              cdlx = '2'
            } else {
              cdlx = '1'
            }
            var cdyj = ''
            if(this.utilizeSubmitForm.checkedCities.length == 0) return this.message({ message: '查档依据不能为空', type: 'error' })
            this.utilizeSubmitForm.checkedCities.forEach((item,index) =>{
              if (index == 0) {
                cdyj = item.bm
              } else {
                cdyj = cdyj +'#'+item.bm
              }
            })
            this.utilizeSubmitForm.utilize_id = this.utilize_id
            this.utilizeSubmitForm.cdlx = cdlx
            this.utilizeSubmitForm.cdyj = cdyj
            console.log(this.utilizeSubmitForm)
            submitWebMachineUtilizeSubmit(this.utilizeSubmitForm).then(response =>{
              if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
              this.message({ message: message, type: 'success' })
              // this.utilizeRegisterListFun() //刷新列表
              // this.dialogUtilezeRegisterVisible = false
              this.utilizeSubmitForm = {
                cdlb:this.$route.query.bm,
                reviewer:'',
                idcard:'',
                tel:'',
                people_num:'',
                cddwmc:'',
                tyshxydm:'',
                cdmd:'',
                gcmc:'',
                gclxName:'',
                gcdd:'',
                cdnr:'',
              }
              this.utilizeSubmitForm.checkedCities = []
              this.dialoghintVisible = true
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
    },
      //自定义上传 函数
    myUpload(e) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e.file)
      formData.append('utilize_id', this.utilize_id)
      submitFileMachineSimpleUtilize(formData).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
        }
      })
    },
    handleChange(file, fileList){
      this.fileList = fileList;
      console.log(this.fileList)
    },
    //查档目的
     getQueryPurposeType() {
      const q = {
        bm: "DICT_CDMD"
      }
      getWebDataDictionaryBistDrop(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryPurposeType = res
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
      getWebDataDictionaryBistDrop(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryConditionType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
         //查档依据
     getQueryGistType() {
     removeToken()
      const q = {
        bm: "DICT_CDYJ"
      }
      getWebDataDictionaryBistDrop(q).then(response => {
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
        this.utilizeSubmitForm.checkedCities = val ? this.cityOptions : []
      },
      // 查询依据
      handleCheckedCitiesChange(value) {
        console.log(value)
        console.log(this.utilizeSubmitForm.checkedCities)
        // this.checkedCities = value
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
        //单位和个人查档切换
    handleClick(tab, event) {
        console.log(tab, event);

      },
    // 获取工程类型
    getEngineeringTypeFun() {
      getWebFileTypeListDrop().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.engineeringType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },

}
</script>

<style scoped lang='less'>
.bitianxiangicon::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.btn {
  width: 100%;
  text-align: center;
}
.box {
  width: 100%;
  height: 100%;
}
  .head {
    width: 100%;
    height: 18%;
    background: url('../../../assets/head.png') no-repeat;
    background-size: 100% ;
    position: fixed;
    top: 0;
    z-index: 999;
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
    margin-top: 10%;
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

<style lang="less" scoped>

.btn {
  width: 100%;
  text-align: center;
}
.tright {
  text-align: right;
}
.tcenter {
  text-align: center;
}
.UCinput {
  width: 80px;
  height: 30px !important;
  line-height: 30px !important;
  padding: none !important;
  text-align: left;
  margin: 0 3px;
}
.UtilizeConditionbox {
  .el-row {
    line-height: 50px;
    p{
      width: 65px;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>
