<template>
  <div class="form">
    <!-- 新增/编辑单位工程 -->
    <el-form class="engineering" :inline="true" :model="projectForm" ref="projectFormRef" :rules="projectRules" label-width="130px" v-if="source === 'engineering'">
      <el-form-item label="工程名称: " prop="dwgcmc" class="engineering-title">
        <el-input clearable v-model="projectForm.dwgcmc" placeholder="请输入工程名称"></el-input>
      </el-form-item>
      <el-form-item label="单位工程类型: " prop="dwgclx">
        <!-- props 配置选项 -->
        <el-cascader
          v-if="optionObjForm === '新增单位工程'"
          :options="uniProjectType"
          expand-trigger="hover"
          :props="cascaderProps"
          v-model="selectedKey"
          clearable
          change-on-select
        ></el-cascader>
        <el-cascader
        v-if="optionObjForm === '编辑单位工程'"
          :options="uniProjectType"
          expand-trigger="hover"
          :props="cascaderProps"
          v-model="projectForm.dwgclx"
          clearable
          change-on-select
          disabled
        ></el-cascader>
      </el-form-item>
      <el-form-item label="单位工程档号: ">
        <el-input type="number" v-model="projectForm.dwgcdh" placeholder="请输入单位工程档号" clearable oninput="if(value>999)value=999;if(value.length>3)value=value.slice(0,3);if(value<0)value=0;"></el-input>
      </el-form-item>
        <el-form-item label="建设单位: ">
          <el-input v-model="projectForm.jsdw" placeholder="请输入建设单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="代建单位: ">
          <el-input v-model="projectForm.djdw" placeholder="请输入代建单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="工程地点: ">
          <el-input v-model="projectForm.gcdd" placeholder="请输入工程地点" clearable></el-input>
        </el-form-item>
        <el-form-item label="勘察单位: ">
          <el-input v-model="projectForm.kcdw" placeholder="请输入勘察单位" clearable></el-input>
        </el-form-item>
        <el-form-item label="监理单位: ">
          <el-input v-model="projectForm.field_one" placeholder="请输入监理单位" clearable></el-input>
        </el-form-item>
      <el-form-item label="建筑面积: ">
        <el-input v-model="projectForm.jzmj" type="number" placeholder="请输入建筑面积" clearable><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
        <el-form-item label="工程规划许可证号: ">
          <el-input v-model="projectForm.ghxkzh" placeholder="请输入工程规划许可证号" clearable></el-input>
        </el-form-item>
      <el-form-item label="结构类型: ">
        <el-select v-model="projectForm.jglx" placeholder="请选择结构类型" clearable>
          <el-option
            v-for="item in structureType"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工程造价: ">
        <el-input v-model="projectForm.gczj" type="number" placeholder="请输入工程造价" clearable><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="施工单位: ">
        <el-input v-model="projectForm.sgdw" placeholder="请输入施工单位" clearable></el-input>
      </el-form-item>
        <el-form-item label="施工许可证号: ">
          <el-input v-model="projectForm.sgxkzh" placeholder="请输入施工许可证号" clearable></el-input>
        </el-form-item>
      <el-form-item label="工程结算: ">
        <el-input v-model="projectForm.gcjs" type="number" placeholder="请输入工程结算" clearable><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="开工日期: ">
        <el-date-picker
          v-model="projectForm.kgsj"
          type="date"
          placeholder="请选择开工日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="竣工日期: ">
        <el-date-picker
          v-model="projectForm.jgsj"
          type="date"
          placeholder="请选择竣工日期">
        </el-date-picker>
      </el-form-item>
        <el-form-item label="栋数: ">
          <el-input v-model="projectForm.ds" type="number" placeholder="请输入栋数" clearable></el-input>
        </el-form-item>
        <el-form-item label="长度: ">
          <el-input v-model="projectForm.cd" type="number" placeholder="请输入长度" clearable></el-input>
        </el-form-item>
      <el-form-item class="btn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveFun">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增/编辑案卷 -->
    <el-form class="fileForm" :inline="true" :model="projectForm" ref="projectFormRef" :rules="projectRules" label-width="100px" v-if="source === 'project'">
      <el-form-item label="案卷题名: " prop="ajtm" class="file-title">
        <el-input clearable v-model="projectForm.ajtm" placeholder="请输入案卷题名"></el-input>
      </el-form-item>
      <el-form-item label="案卷类别: " prop="ajlb">
        <el-select v-model="projectForm.ajlb" placeholder="请选择案卷类别" clearable>
          <el-option
            v-for="item in fileCategory"
            :key="item.bm"
            :label="item.mc"
            :value="item.bm">
          </el-option>
        </el-select>
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
            v-for="item in carrierTypefiles"
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
        <el-input v-model="projectForm.ajsxh" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入案卷顺序号" clearable></el-input>
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
      <!-- <el-form-item v-if="optionObjForm === '编辑文件'" label="导入文件：" class="upload-box">
        <yl-upload
          :action="setUrl()"
          :data="chunkData"
          :on-success="handleSuccess"
          :chunk-size="1024 * 1024 * 0.5"
          :thread="4"
        >
          <el-button size="small" type="primary">点击上传附件</el-button>
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
        <el-input v-model="projectForm.wjsx"  @input="e => (projectForm.wjsx = isnumber(e))" placeholder="请输入文件顺序"
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
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  uploadFile,
  checkUploadFile,
  mergeUploadFile,
  unzipFile,
  bindFile,
  convertPdfFile
} from '@/api/digitization/uploadFile'
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
    },
    gclx: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      projectRules: {
        dwgcmc: [
          { required: true, message: '请输入工程名称', trigger: 'blur' }
        ],
        dwgclx:[
          { required: true, message: '请选择单位工程类型', trigger: ["blur"]}
          // { required: true, message: '请选择单位工程类型', trigger: 'change' }
        ],
        ajtm: [
          { required: true, message: '请输入案卷题名', trigger: 'blur' }
        ],
        wjtm: [
          { required: true, message: '请输入文件题名', trigger: 'blur' }
        ],
        ztlx: [
          { required: true, message: '请选择载体类型', trigger: ["blur",'change'] }
          // { required: true, message: '请选择载体类型', trigger: 'change' }
        ],
        ajlb:[
          { required: true, message: '请选择案卷类别', trigger: ["blur",'change'] }
        ],
      },
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_name',
        children: 'child',
        emitPath: false
      },
      selectedKey: '',
      dialogBool: false,
      projectForm: {
      },  // 新增/编辑
      optionObjForm: '',
      uniProjectType: [],  // 单位工程类型
      structureType: [],  // 结构类型
      fileCategory: [], // 案卷类别
      storagePeriod: [], // 保管期限
      secretGrade: [], // 密级
      carrierType: [], // 载体类型
      carrierTypefiles:[],//案卷级载体类型
      specifications: [], // 规格
      language: [], // 文种
      //文件上传的路径
      // uploadUrl: request.service1.defaults.baseURL + "/file-api/v1/file/digit/upload", //文件上传的路径
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
    this.getCarrierType()  // 载体类型    
    this.getSpecifications()  // 规格
    this.getLanguage()  // 文种
    this.getCarrierTypefiles() //案卷级载体类型
  },
  methods: {
    // 在 Input 值改变时触发
    isnumber (val) {
      val = val.replace(/\b(0+)+[^0-9]*/gi, "");
      return val;
    },

    setUrl() {
      return request.service1.defaults.baseURL + "/file-api/v1/file/digit/upload"
    },
    // 新增单位工程/案卷/文件   保存
    saveFun() {
      if (this.source === 'engineering') {
        if (this.projectForm.kgsj !== undefined) {
          // 处理时间显示
          this.projectForm.kgsj = parseTime(this.projectForm.kgsj)
        }
        if (this.projectForm.jgsj !== undefined) {
          // 处理时间显示
          this.projectForm.jgsj = parseTime(this.projectForm.jgsj)
        }
        if (this.selectedKey === '' || this.selectedKey === null) {
        } else {
          this.projectForm.dwgclx = this.selectedKey
        }
        
      } else if (this.source === 'project') {
        // 处理时间显示
        if (this.projectForm.ljrq !== undefined) {
          // 处理时间显示
          this.projectForm.ljrq = parseTime(this.projectForm.ljrq)
        }
        if (this.projectForm.qssj !== undefined) {
          // 处理时间显示
          this.projectForm.qssj = parseTime(this.projectForm.qssj)
        }
        if (this.projectForm.shrq !== undefined) {
          // 处理时间显示
          this.projectForm.shrq = parseTime(this.projectForm.shrq)
        }
        if (this.projectForm.zzsj !== undefined) {
          // 处理时间显示
          this.projectForm.zzsj = parseTime(this.projectForm.zzsj)
        }
      } else if (this.source === 'files') {

      }
      this.$emit('saveFun', this.projectForm)
    },

    // 取消
    cancel() {
      // this.$refs.projectFormRef.resetFields()
      // this.projectForm = {}
      this.$emit('cancel')
    },

    // 递归判断列表，把最后的child设为undefined
    getTreeData(data) {
      for(var i = 0; i < data.length; i++){
        if(data[i].child.length < 1){
          // children若为空数组，则将children设为undefined
          data[i].child = undefined
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].child)
        }
      }
      return data
    },

    // 单位工程类型
    getUniProjectType() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          // this.uniProjectType  = res

          res.forEach(v => {
            if (this.gclx === v.type_code) {
              this.uniProjectType = v.child
            }
            return
          })
          this.uniProjectType = this.getTreeData(this.uniProjectType)
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

        // 案卷级载体类型
    getCarrierTypefiles() {
      const q = {
        bm: "AJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.carrierTypefiles  = res
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

    // 文件规格
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
        file_num: this.projectForm.xmgcdh + this.projectForm.dwgcdh + '-' + this.projectForm.ajdh + '-' + this.projectForm.wjdh,
        file_id: this.projectForm.file_id
      }
    },

    indexOf(response) {
      //文件上传成功
      let index = this.options.fileName.lastIndexOf('.')
      let ext = this.options.fileName.substring(index + 1)
      const wjdh = this.projectForm.xmgcdh + this.projectForm.dwgcdh + '-' + this.projectForm.ajdh + '-' + this.projectForm.wjdh
      const wjid = this.projectForm.file_id
      const q = {
        chunk_total: this.options.chunkTotal,
        // file_num: wjdh,
        file_id: wjid,
        file_ext: ext
      }
      mergeUploadFile(q).then(response => {
        if (response.data.status === 200) {
          unzipFile({ file_id: wjid }).then(response => {
            if (response.data.status === 200) {
              if (this.projectForm.ztlx === 'AJJZTLX_DIC-01') {
                convertPdfFile({  file_id: wjid }).then(response => {
                }).catch(error => {
                  console.log(error)
                })
                return
              } else {
                bindFile({ file_id: wjid }).then(response => {
                }).catch(error => {
                  console.log(error)
                })
                return
              }
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }).catch(error => {
        console.log(error)
      })
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
