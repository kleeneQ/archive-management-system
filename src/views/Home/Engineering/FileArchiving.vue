<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <template>
        <el-breadcrumb-item v-if="this.source === 'Architecture'">建筑工程文件归档</el-breadcrumb-item>
        <el-breadcrumb-item v-if="this.source === 'municipal'">市政工程文件归档</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card>
      <el-row class="tabs">
        <el-col :span="24">
          <span class="spn municipal" v-if="this.source === 'municipal'" :class="source === 'municipal' ? 'active' : ''" >市政工程文件归档范围及保管期限</span>
          <span class="spn Architecture" v-if="this.source === 'Architecture'" :class="source === 'Architecture' ? 'active' : ''">建筑工程文件归档范围及保管期限</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="保管单位：">
              <el-select v-model="value" clearable placeholder="选择保管单位" @change="queryAllList">
                <el-option v-for="(item, i) in safekeeping" :key="i" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchFun">查询</el-button>
            </el-form-item>
          </el-form>
          <template>
            <el-button v-if="hasPerms(this.save)" class="small-btn add" type="primary" icon="iconfont icon-xinzeng" size="small" @click="showDialogAdd">新增</el-button>
            <el-dialog :title="isAdd ? '新增' : '修改'" :visible.sync="dialogFormVisible" @close="closeDialogForm">
              <el-form :model="AddEditForm" :rules="rules" ref="AddEditForm">
                <el-form-item v-if="isAdd" label="类别" :label-width="formLabelWidth" prop="lb">
                  <el-input v-model="AddEditForm.lb" autocomplete="off" placeholder="请填写类别，各级类别用“-”号隔开，如：A-A1-1"></el-input>
                </el-form-item>
                <el-form-item v-if="isAdd" label="归档文件" :label-width="formLabelWidth" prop="gdwj">
                  <el-input v-model="AddEditForm.gdwj" autocomplete="off" placeholder="请填写归档文件名称，如：项目建议书批复文件及项目建议书"></el-input>
                </el-form-item>
                <el-form-item v-else label="归档文件" :label-width="formLabelWidth" prop="">
                  <el-input v-model="AddEditForm.gdwj" autocomplete="off" placeholder="请填写归档文件名称，如：项目建议书批复文件及项目建议书"></el-input>
                </el-form-item>
                <el-form-item label="建设单位" :label-width="formLabelWidth">
                  <el-select v-model="AddEditForm.jsdw" placeholder="请选择建设单位保管期限">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设计单位" :label-width="formLabelWidth">
                  <el-select v-model="AddEditForm.sjdw" placeholder="请选择设计单位保管期限">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设计单位" :label-width="formLabelWidth">
                  <el-select v-model="AddEditForm.sgdw" placeholder="请选择设计单位保管期限">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="监理单位" :label-width="formLabelWidth">
                  <el-select v-model="AddEditForm.jldw" placeholder="请选择监理单位保管期限">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="城建档案馆" :label-width="formLabelWidth">
                  <el-select v-model="AddEditForm.cjdag" placeholder="请选择城建档案馆保管期限">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据来源" :label-width="formLabelWidth">
                  <el-input v-model="AddEditForm.sjly" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表格编码" :label-width="formLabelWidth">
                  <el-input v-model="AddEditForm.bgbm" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogFormOk()">确 定</el-button>
              </div>
            </el-dialog>
          </template>
          <el-button v-if="!hasPerms(this.download)" class="small-btn" type="success" icon="iconfont icon-xiazai" size="small" @click="downloadImportTemplateFun">下载导入模板</el-button>
          <el-button v-if="hasPerms(this.importV)" class="small-btn" type="primary" icon="iconfont icon-Icon-daoru" size="small" @click="showUploadDialog">导入</el-button>
          <el-button v-if="hasPerms(this.exportV)" class="small-btn" type="success" icon="iconfont icon-daochu" size="small" @click="exportDataFileArchivingFun">导出</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="fileArchivingList"
        stripe
        border
        style="width: 100%"
        row-key="archive_id"
        default-expand
        lazy
        :tree-props="{children: 'child', hasChildren: 'hasChild'}"
      >
        <el-table-column
          label="#"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="lb"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="gdwj"
          label="归档文件">
        </el-table-column>
        <el-table-column label="保存单位和保管期限">
          <el-table-column
            prop="jsdw"
            label="建设单位"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.jsdw === '无'">-</span>
              <span v-else>{{scope.row.jsdw}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sjdw"
            label="设计单位">
            <template slot-scope="scope">
              <span v-if="scope.row.sjdw === '无'">-</span>
              <span v-else>{{scope.row.sjdw}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sgdw"
            label="施工单位">
            <template slot-scope="scope">
              <span v-if="scope.row.sgdw === '无'">-</span>
              <span v-else>{{scope.row.sgdw}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="jldw"
            label="监理单位">
            <template slot-scope="scope">
              <span v-if="scope.row.jldw === '无'">-</span>
              <span v-else>{{scope.row.jldw}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cjdag"
            label="城建档案馆">
            <template slot-scope="scope">
              <span v-if="scope.row.cjdag === '无'">-</span>
              <span v-else>{{scope.row.cjdag}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="sjly"
          label="数据来源">
        </el-table-column>
        <el-table-column
          prop="bgbm"
          label="操作"
        >
          <template v-if="hasPerms(updateV)" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialogEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 选择导入文件的弹层 -->
      <el-dialog
        title="导入数据"
        :visible.sync="importDialogVisible"
        width="60%"
        @close="importDialogClosed"
      >
        <el-form
          :rules="rules"
          ref="editAddForm"
          label-width="100px"
        >
          <el-form-item label="导入文件：" prop="bm" style="margin-bottom:0;">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="#"
              accept=".csv,.xls,.xlsx"
              :limit="1"
              :show-file-list="true"
              :auto-upload="false"
              :http-request="myUpload"
            >
              <el-button slot="trigger" icon="el-icon-folder" plain size="small">请选择要上传的文件</el-button>
              <span class="tip">请先下载导入模板，将需要导入的数据填入导入模板中，再进行导入喔~以免导入失败！</span>
              <div class="up-btn">
                <el-button @click="importDialogClosed">取 消</el-button>
                <el-button type="primary" @click="submitUpload">立即上传</el-button>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getMunicipalList,
  getArchitetureList,
  addMunicipalItem,
  addArchitetureItem,
  editMunicipalItem,
  editArchitetureItem,
  downloadImportMunicipalTemplate,
  downloadImportArchitetureTemplate,
  importMunicipalData,
  importArchitetureData,
  downloadMunicipalData,
  downloadArchitetureData
} from '@/api/fileArchiving'
import Download from '@/utils/download'
export default {
  name: 'FileArchitecture',
  props: ['source', 'save', 'updateV', 'download', 'importV', 'exportV'],
  data() {
    return {
      fileArchivingList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      options: [
        {
          value: '无',
          label: '无'
        },
        {
          value: '短期',
          label: '短期'
        },
        {
          value: '长期',
          label: '长期'
        },
        {
          value: '永久',
          label: '永久'
        }
      ],
      rules: {
        lb: [
          { required: true, message: '请填写类别，各级类别用“-”号隔开，如：A-A1-1', trigger: 'blur' }
        ],
        gdwj: [
          { required: true, message: '请填写归档文件名称，如：项目建议书批复文件及项目建议书', trigger: 'blur' }
        ]
      },
      AddEditForm: {
        archive_id:'',
        lb: '', // 类别
        gdwj: '', // 归档文件
        jsdw: '永久', // 建设单位
        sjdw: '无', // 设计单位
        sgdw: '无', // 施工单位
        jldw: '无', // 监理单位
        cjdag: '永久', // 城建档案馆
        sjly: '', // 数据来源 -- 可选
        bgbm: '' // 表格编码 -- 可选
      },
      formInline: {},
      exportData: {},
      // 全部、建设单位、设计单位、施工单位、监理单位、城建档案馆
      safekeeping: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: 'jsdw',
          label: '建设单位'
        },
        {
          value: 'sjdw',
          label: '设计单位'
        },
        {
          value: 'sgdw',
          label: '施工单位'
        },
        {
          value: 'jldw',
          label: '监理单位'
        },
        {
          value: 'cjdag',
          label: '城建档案馆'
        }
      ],
      value: '',
      // 判断点击的是编辑 / 新增
      isAdd: true,
      importDialogVisible: false
    }
  },

  created() {
    this.getFileArchivingList()
  },

  mounted() {

  },

  methods: {
    // 获取市政 / 建筑归档文件列表
    getFileArchivingList() {
      this.fileArchivingList = []
      // 判断当前是市政 / 建筑
      if (this.source === 'municipal') {
        this.getMunicipalList()
      } else {
        this.getArchitetureList()
      }
    },
    // 查询
    searchFun() {
      this.fileArchivingList = []
      if (this.value === 'all' || this.value === '') {
        this.formInline = {}
      } else {
        this.formInline = {}
        this.formInline[this.value] = this.value
      }
      // 判断当前是市政 / 建筑
      if (this.source === 'municipal') {
        this.getMunicipalList()
      } else {
        this.getArchitetureList()
      }
    },

    // 当点击清空搜索条件时触发
    queryAllList() {
      this.searchFun()
    },

    // 新增
    showDialogAdd() {
      this.isAdd = true
      this.AddEditForm = {
       
        lb: '', // 类别
        gdwj: '', // 归档文件
        jsdw: '永久', // 建设单位
        sjdw: '无', // 设计单位
        sgdw: '无', // 施工单位
        jldw: '无', // 监理单位
        cjdag: '永久', // 城建档案馆
        sjly: '', // 数据来源 -- 可选
        bgbm: '' // 表格编码 -- 可选

      }
      this.dialogFormVisible = true
    },

    // 新增表单的确定按钮
    addDialogFormOk() {
      if (this.isAdd) {
        this.$refs.AddEditForm.validate((valid) => {
          if (valid) {
            if (this.source === 'municipal') {
              this.addMunicipalItem()
            } else {
              this.addArchitetureItem()
            }
          } else {
            return false
          }
        })
      } else {
        if (this.source === 'municipal') {
          this.editMunicipalItem()
        } else {
          this.editArchitetureItem()
        }
      }
    },

    // 新增表单的取消按钮
    closeDialogForm() {
      this.$refs.AddEditForm.resetFields()
      if (this.isAdd) {
        this.AddEditForm = {
          archive_id:'',
          lb: '', // 类别
          gdwj: '', // 归档文件
          jsdw: '永久', // 建设单位
          sjdw: '无', // 设计单位
          sgdw: '无', // 施工单位
          jldw: '无', // 监理单位
          cjdag: '永久', // 城建档案馆
          sjly: '', // 数据来源 -- 可选
          bgbm: '' // 表格编码 -- 可选
        }
      } else {
        this.AddEditForm = {
          gdwj: '', // 归档文件
          jsdw: '永久', // 建设单位
          sjdw: '无', // 设计单位
          sgdw: '无', // 施工单位
          jldw: '无', // 监理单位
          cjdag: '永久', // 城建档案馆
          sjly: '', // 数据来源 -- 可选
          bgbm: '' // 表格编码 -- 可选
        }
      }
      this.dialogFormVisible = false
    },

    // 修改
    showDialogEdit(row) {
      this.isAdd = false
      this.dialogFormVisible = true
      const q = this.AddEditForm
      q.lb = row.lb
      q.archive_id = row.archive_id
      q.gdwj = row.gdwj
      q.jsdw = row.jsdw
      q.sjdw = row.sjdw
      q.sgdw = row.sgdw
      q.jldw = row.jldw
      q.cjdag = row.cjdag
      q.sjly = row.sjly
      q.bgbm = row.bgbm
      this.AddEditForm = q
    },

    // 下载导入模板
    downloadImportTemplateFun() {
      if (this.source === 'municipal') {
        downloadImportMunicipalTemplate().then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          const fileName = decodeURI(headersName)
          const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
          Download.download(
            blob,
            fileName
          )
        }).catch(error => {
          console.log(error)
        })
      } else {
        downloadImportArchitetureTemplate().then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          const fileName = decodeURI(headersName)
          const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
          Download.download(
            blob,
            fileName
          )
        }).catch(error => {
          console.log(error)
        })
      }
    },

    // 导入工程文件
    // 导入按钮
    showUploadDialog() {
      this.importDialogVisible = true
    },

    // 关闭导入弹层
    importDialogClosed() {
      this.importDialogVisible = false
      this.$refs.upload.clearFiles()
    },

    // 导入数据字典数据相关方法
    myUpload(e) {
      const formData = new FormData()
      if (this.source === 'municipal') {
        formData.append('file', e.file)
        importMunicipalData(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.getMunicipalList()
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        formData.append('file', e.file)
        importArchitetureData(formData).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success', duration: 3000 })
            this.importDialogVisible = false
            this.$refs.upload.clearFiles()
            this.addArchitetureItem()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    // 提交导入文件
    submitUpload() {
      this.$refs.upload.submit()
    },

    // 导出市政 / 建筑工程文件
    exportDataFileArchivingFun() {
      if (this.value === 'all' || this.value === '') {
        this.exportData = {}
      } else {
        this.exportData = {}
        this.exportData[this.value] = this.value
      }
      if (this.source === 'municipal') {
        downloadMunicipalData(this.exportData).then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          let fileName = decodeURI(headersName)
          let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
          Download.download(
            blob,
            fileName
          )
        }).catch(error => {
          console.log(error)
        })
      } else {
        downloadArchitetureData(this.exportData).then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          let fileName = decodeURI(headersName)
          let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
          Download.download(
            blob,
            fileName
          )
        }).catch(error => {
          console.log(error)
        })
      }
    },

    // 市政文件归档列表
    getMunicipalList() {
      getMunicipalList(this.formInline).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.fileArchivingList = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增市政工程文件
    addMunicipalItem() {
      addMunicipalItem(this.AddEditForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getMunicipalList()
          this.dialogFormVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改市政工程文件
    editMunicipalItem() {
      editMunicipalItem(this.AddEditForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getMunicipalList()
          this.dialogFormVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 建筑文件归档列表
    getArchitetureList() {
      getArchitetureList(this.formInline).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.fileArchivingList = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增建筑工程文件
    addArchitetureItem() {
      addArchitetureItem(this.AddEditForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getArchitetureList()
          this.dialogFormVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 修改建筑工程文件
    editArchitetureItem() {
      editArchitetureItem(this.AddEditForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getArchitetureList()
          this.dialogFormVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },

  watch: {
    
  }
}
</script>
<style>
.el-form--inline .el-form-item__content {
  display: inline-block;
  vertical-align: inherit !important;
}
</style>
<style lang="less" scoped>
.tabs{
  margin-bottom:15px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  .spn{
    margin-right:10px;
    padding: 5px;
  }
  .active{
    font-weight: bolder;
    border-bottom: 1px solid #409EFF;
  }
}
.demo-form-inline{
  display: inline-block;
  .el-form-item {
    margin-bottom: 0px;
    vertical-align: inherit;
  }
}
.small-btn{
  height:40px;
}
.add{
  margin-right: 10px;
}
.upload-demo{
  position: relative;
  height:180px;
  .up-btn{
    position:absolute;
    width:100%;
    margin-top:40px;
    text-align: right;
  }
  .tip{
    display: block;
    color: firebrick;
    font-size: 12px;
  }
}
</style>
