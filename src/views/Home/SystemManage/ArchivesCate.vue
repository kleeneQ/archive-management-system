<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <!-- <el-button v-if="hasPerms('/v1/data_dictionary/save')" icon="el-icon-plus" size="mini" @click="showDialogEditOrAdd(isAdd='dic')">添加</el-button> -->
          <el-button icon="el-icon-plus" type="primary" size="small" @click="addArchivesCateFun('add', {})">新增</el-button>
          <el-button icon="el-icon-download" type="success" size="small" @click="downloadImportTemplateFun">下载导入模板</el-button>
          <el-button icon="el-icon-upload2" type="primary" size="small" @click="showUploadDialog">导入</el-button>
          <el-button icon="el-icon-download" type="success" size="small" @click="exportDataDictionaryFun">导出</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="archivesCateList"
        stripe
        border
        style="width: 100%"
        row-key="type_id"
        default-expand
        lazy
        :tree-props="{children: 'child', hasChildren: 'hasChild'}"
      >
        <el-table-column
          label="#"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="type_code"
          label="类别"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="类别名称">
        </el-table-column>
        <el-table-column
          prop="bgbm"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="addArchivesCateFun('edit', scope.row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeArchivesCateFun(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增档案分类弹层 -->
    <el-dialog
      :title="title + '档案分类'"
      :visible.sync="addArchivesCateVisible"
    >
      <el-form class="catFormRef" ref="catFormRef" :model="addMenuForm" :rules="catFormRules" label-width="100px">
        <el-form-item label="菜单父级分类:" class="typeClass">
          <!-- props 配置选项 -->
          <el-cascader
            :options="archivesCateList"
            expand-trigger="hover"
            :props="cascaderProps"
            v-model="selectedKey"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item class="tip-box">
          <p class="tip">注：为了新增数据准确性，请选择上级类别，如不选择，默认新增第一级类别</p>
        </el-form-item>
        <el-form-item label="类别:">
          <el-input v-if="title === '修改'" disabled v-model="addMenuForm.type_code" placeholder="请填写，初级类别请填入大写英文字母，如：A，子级填写如：A.1"></el-input>
          <el-input v-else v-model="addMenuForm.type_code" placeholder="请填写，初级类别请填入大写英文字母，如：A，子级填写如：A.1"></el-input>
        </el-form-item>
        <el-form-item label="类别名称:">
          <el-input v-model="addMenuForm.type_name" placeholder="请填写类别名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addArchivesCateVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
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
            <el-button slot="trigger" icon="el-icon-folder"  size="small">请选择要上传的文件</el-button>
            <span class="tip">请先下载导入模板，将需要导入的数据填入导入模板中，再进行导入喔~以免导入失败！</span>
            <div class="up-btn">
              <el-button @click="importDialogClosed">取 消</el-button>
              <el-button type="primary" @click="submitUpload">立即上传</el-button>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArchivesCateList,
  addArchivesCate,
  editArchivesCate,
  removeArchivesCate,
  importArchivesCate,
  exportArchivesCate,
  downloadArchivesCate
} from '@/api/archivesCate'
import Download from "@/utils/download"
export default {
  data() {
    return {
      archivesCateList: [],
      addMenuForm: {},
      title: '',
      catFormRules: {},
      addArchivesCateVisible: false,
      selectedKey: '',
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_name',
        children: 'child',
        emitPath: false
      },
      importDialogVisible: false,
      rules: {
        bm: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      },
    }
  },
  created() {
    this.getArchivesCateListFun()
  },
  methods: {
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

    // 获取档案分类管理列表
    getArchivesCateListFun() {
      getArchivesCateList().then(response => {
        // 
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.archivesCateList = this.getTreeData(res)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增或修改
    addArchivesCateFun(source, obj) {
      this.addArchivesCateVisible = true
      if (source === 'add') {
        this.title = '新增'
        this.addMenuForm = {}
        return
      }

      if (source === 'edit') {
        this.title = '修改'
        this.selectedKey = obj.type_parent_id
        this.addMenuForm = obj
      }
    },

    // 提交新增或修改
    submitForm() {
      if (this.selectedKey === '') {
        this.selectedKey = '0'
      }
      this.addMenuForm.type_parent_id = this.selectedKey
      if (this.title === '新增') {
        addArchivesCate(this.addMenuForm).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.addArchivesCateVisible = false
            this.getArchivesCateListFun()
          }
        }).catch(error => {
          console.log(error)
        })
        return
      }
      
      if (this.title === '修改') {
        editArchivesCate(this.addMenuForm).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.addArchivesCateVisible = false
            this.getArchivesCateListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    // 关闭新增分类弹层
    addArchivesCateClosed() {
      this.selectedKey = ''
      this.addMenuForm = {}
    },

    // 删除分类
    removeArchivesCateFun(row) {
      this.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          type_id: row.type_id
        }
        removeArchivesCate(q).then(response => {
          if (response.status === 200) {
            const { status, message } = response.data
            if (status !== 200) return this.message({ message, type: 'error' })
            this.message({ message, type: 'success' })
            this.getArchivesCateListFun()
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },

    // 下载导入模板
    downloadImportTemplateFun() {
      downloadArchivesCate().then(response => {
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
    },

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
      formData.append('file', e.file)
      importArchivesCate(formData).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success', duration: 3000 })
          this.importDialogVisible = false
          this.$refs.upload.clearFiles()
          this.getArchivesCateListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 提交导入文件
    submitUpload() {
      this.$refs.upload.submit()
    },

    // 导出分类
    exportDataDictionaryFun() {
      exportArchivesCate().then(response => {
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
    },
  }
}
</script>
<style lang="less">
.catFormRef{
  .typeClass{
    margin-bottom: 0;
  }
  .tip-box{
    margin-bottom: 0;
    .tip{
      font-size: 14px;
      color: #f00;
    }
  }
}
</style>
<style lang="less" scoped>
.tree-table{
  margin-top:15px;
  font-size:14px;
}
.el-cascader{
  width:100%;
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
