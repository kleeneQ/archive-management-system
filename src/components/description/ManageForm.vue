<template>
  <div class="form">
    <!-- 新增/编辑案卷 -->
    <el-form class="fileForm" :inline="true" :model="projectForm" ref="projectFormRef" :rules="projectRules" label-width="110px" v-if="source === 'engineering'">
      <el-form-item label="案卷题名: " prop="ajtm" class="file-title">
        <el-input clearable v-model="projectForm.ajtm" placeholder="请输入案卷题名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="案卷档号: " class="file-dh">
        <el-input clearable v-model="projectForm.pro_scale" placeholder="请输入案卷档号"></el-input>
      </el-form-item> -->
      <el-form-item label="案卷类别: "  prop="ajlb">
        <el-select v-model="projectForm.ajlb" placeholder="请选择案卷类别" clearable>
          <el-option
            v-for="item in fileCategory"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目工程档号: " v-if="projectForm.xmgcdh">
        <el-input v-model="projectForm.xmgcdh" placeholder="请输入项目工程档号" clearable></el-input>
      </el-form-item>

      <el-form-item label="编制单位: ">
        <el-input v-model="projectForm.bzdw" placeholder="请输入编制单位" clearable></el-input>
      </el-form-item>
      <el-form-item label="起始时间: ">
        <el-date-picker
          v-model="projectForm.qssj"
          type="date"
          placeholder="请选择起始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="终止时间: ">
        <el-date-picker
          v-model="projectForm.zzsj"
          type="date"
          placeholder="请选择终止时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="保管期限: ">
        <el-select v-model="projectForm.bgqx" placeholder="请选择保管期限" clearable>
          <el-option
            v-for="item in storagePeriod"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密级: ">
        <el-select v-model="projectForm.mj" placeholder="请选择密级" clearable>
          <el-option
            v-for="item in secretGrade"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="载体类型: ">
        <el-select v-model="projectForm.ztlx" placeholder="请选择载体类型" clearable>
          <el-option
            v-for="item in filescarrierType"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="责任者: ">
        <el-input v-model="projectForm.zrz" placeholder="请输入责任者" clearable></el-input>
      </el-form-item>
      <el-form-item label="案卷顺序号: ">
        <el-input v-model="projectForm.ajsxh" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入案卷顺序号" clearable></el-input>
      </el-form-item>
      <el-form-item label="脊宽: ">
        <el-input v-model="projectForm.jk" placeholder="请输入脊宽" clearable></el-input>
      </el-form-item>
      <el-form-item label="立卷人: ">
        <el-input v-model="projectForm.ljr" placeholder="请输入立卷人" clearable></el-input>
      </el-form-item>
      <el-form-item label="立卷日期: ">
        <el-date-picker
          v-model="projectForm.ljrq"
          type="date"
          placeholder="请选择立卷日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核人: ">
        <el-input v-model="projectForm.ajshr" placeholder="请输入审核人" clearable></el-input>
      </el-form-item>
      <el-form-item label="审核日期: ">
        <el-date-picker
          v-model="projectForm.shrq"
          type="date"
          placeholder="请选择审核日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="移交单位: ">
        <el-input v-model="projectForm.yjdw" placeholder="请输入移交单位" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注: " class="remarks">
        <el-col :span="24">
          <el-input type="textarea" v-model="projectForm.fz" placeholder="请输入备注信息" clearable style="width:100%;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveFun">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增/编辑文件 -->
    <el-form class="documentForm" :inline="true" :model="projectForm" ref="projectFormRef" :rules="projectRules" label-width="100px" v-if="source === 'files'">
      <el-form-item label="文件题名: " prop="wjtm" class="document-title">
        <el-input clearable v-model="projectForm.wjtm" placeholder="请输入文件题名"></el-input>
      </el-form-item>
      <el-form-item label="载体类型: " prop="ztlx">
        <el-select v-model="projectForm.ztlx" placeholder="请选择载体类型" clearable>
          <el-option
            v-for="item in carrierType"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="导入文件：" class="upload-box">
        <yl-upload
          :action="uploadUrl"
          :data="chunkData"
          :on-success="handleSuccess"
          :chunk-size="1024 * 1024 * 0.5"
          :thread="4"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </yl-upload>
      </el-form-item> -->
      <el-form-item label="责任者: ">
        <el-input clearable v-model="projectForm.zrz" placeholder="请输入责任者"></el-input>
      </el-form-item>
      <el-form-item label="保管期限: ">
        <el-select v-model="projectForm.bgqx" placeholder="请选择保管期限" clearable>
          <el-option
            v-for="item in storagePeriod"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密级: ">
        <el-select v-model="projectForm.mj" placeholder="请选择密级" clearable>
          <el-option
            v-for="item in secretGrade"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="数量: ">
        <el-input v-model="projectForm.sl" placeholder="请输入文件页数" clearable></el-input>
      </el-form-item>
      <el-form-item label="规格: ">
        <el-select v-model="projectForm.gg" placeholder="请选择规格" clearable>
          <el-option
            v-for="item in specifications"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文种: ">
        <el-select v-model="projectForm.wz" placeholder="请选择文种" clearable>
          <el-option
            v-for="item in language"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件顺序: ">
        <el-input v-model="projectForm.wjsx"  @input="e => (projectForm.wjsx = isnumber(e))" placeholder="请输入文件顺序" clearable 
        :disabled="projectForm.wjtm=='封面'||projectForm.wjtm=='目录'|| projectForm.wjtm=='备考表'? true:false"></el-input>
      </el-form-item>
      <el-form-item label="附注: " class="remarks">
        <el-col :span="24">
          <el-input type="textarea" v-model="projectForm.fz" placeholder="请输入附注信息" clearable style="width:100%;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveFun">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  parseTime
} from "@/utils/index"
import YlUpload from '@/components/upload'
export default {
  name: 'ComprehensiveForm',
  components:{ YlUpload },
  props: {
    source: {
      type: String,
      default: ''
    },
    optionObj: {
      type: String,
      default: ''
    },
    bool: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      projectRules: {
        dwgcmc: [
          { required: true, message: '请输入工程名称', trigger: 'blur' }
        ],
        dwgcdh: [
          { required: true, message: '请输入档号', trigger: 'blur' }
        ],
        dwgclx: [
          { required: true, message: '请选择单位工程类型', trigger: 'change' }
        ],
        ztlx: [
          { required: true, message: '请选择载体类型', trigger: 'change' }
        ],
        ajtm: [
          { required: true, message: '请输入案卷题名', trigger: 'blur' }
        ],
        wjtm: [
          { required: true, message: '请输入文件题名', trigger: 'blur' }
        ],
        ajlb:[
          { required: true, message: '请选择案卷类别', trigger: ["blur",'change'] }
        ],
      },
      dialogBool: false,
      projectForm: {},  // 新增/编辑
      optionObjForm: '',
      uniProjectType: [],  // 单位工程类型
      structureType: [],  // 结构类型
      fileCategory: [], // 案卷类别
      storagePeriod: [], // 保管期限
      secretGrade: [], // 密级
      carrierType: [], // 载体类型
      filescarrierType:[],//案卷级载体类型
      specifications: [], // 规格
      language: [], // 文种
      //文件上传的路径
      uploadUrl: request.service1.defaults.baseURL + "/file-api/v1/file/digit/upload", //文件上传的路径
      options: ''
    }
  },
  watch: {
    bool() {
      if (this.bool === false) {
        this.$refs.projectFormRef.resetFields()
      }
    },
    row: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.projectForm = newVal
      }
    },
    optionObj: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        this.optionObjForm = newVal
      }
    }
  },
  created() {
    this.getUniProjectType()  // 单位工程类型
    this.getStructureType()  // 结构类型
    this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.getfilesCarrierType() //案卷级载体类型
    this.getCarrierType()  // 载体类型    
    this.getSpecifications()  // 规格
    this.getLanguage()  // 文种
  },
  methods: {
     // 在 Input 值改变时触发
    isnumber (val) {
      val = val.replace(/\b(0+)+[^0-9]*/gi, "");
      return val;
    },
    // 新增单位工程/案卷/文件
    saveFun() {
      if (this.source === 'engineering') {
        // 处理时间显示
        this.projectForm.ljrq = parseTime(this.projectForm.ljrq)
        this.projectForm.qssj = parseTime(this.projectForm.qssj)
        this.projectForm.shrq = parseTime(this.projectForm.shrq)
        this.projectForm.zzsj = parseTime(this.projectForm.zzsj)
      }
      this.$emit('saveFun', this.projectForm)
    },

    // 取消
    cancel() {
      this.$refs.projectFormRef.resetFields()
      this.projectForm = {}
      this.$emit('cancel')
    },

    // 上传文件
    myUploadServeType() {},

    // 单位工程类型
    getUniProjectType() {
      const q = {
        bm: "DWGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.uniProjectType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 结构类型
    getStructureType() {
      const q = {
        bm: "JGLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.structureType  = res
        }
      }).catch(error => {
        console.log(error)
      })
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

  //案卷级载体类型
  getfilesCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.filescarrierType  = res
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

    // 规格
    getSpecifications() {
      const q = {
        bm: "WJGG_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.specifications  = res
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

    chunkData(option){
      this.options = option
      return {
        chunk: option.chunkIndex,
        file_num: option.fileHash,
        file_name: option.fileName
      }
    },

    handleSuccess(response, file) {
      //文件上传成功
      let index = this.options.fileName.lastIndexOf('.')
      let ext = this.options.fileName.substring(index + 1)
      const q = {
        chunk_total: this.options.chunkTotal,
        file_num: this.options.fileHash,
        file_name: this.options.fileName,
        file_ext: ext
      }
      if (response) {
        mergeUploadFile(q).then(response => {
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style lang="less">
.form{
  .documentForm,.fileForm,.engineering{
    .remarks,.document-title,.file-title,.file-dh,.engineering-title{
      width:100%;
      display: flex !important;
      .el-form-item__content{
        flex: 1;
      }
    }
    .upload-box{
      width:100%;
      display: flex !important;
      .el-form-item__content{
        flex: 1;
      }
    }
    .btn{
      width:100%;
      margin-top:20px;
      margin-right:0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
<style lang="less" scoped>
.description{
  .el-row{
    margin-bottom:10px;
  }
  .main-card{
    .box-main{
      border:1px solid #EBEEF5;
      margin-left:10px;
      padding:0;
      .box-main-card{
        height:100%;
        border:0 none;
      }
    }
  }
}
</style>
