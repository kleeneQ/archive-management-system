<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-container>
        <el-aside width="250px">
          <el-card class="box-card">
            <div slot="header" class="clearfix" >
              <div class="header_top">
              <span>数据字典列表</span>
              <el-button v-if="hasPerms('/v1/data_dictionary/save')" icon="el-icon-plus" size="mini" @click="showDialogEditOrAdd(isAdd='dic')">添加</el-button>
              </div>
             <div class="demo-input-suffix">
                  <el-input
                    placeholder="请输入查询内容"
                    v-model="sjzd_query">
                    <el-button slot="append" icon="el-icon-search"  @click="searchSjzd()"></el-button>
                  </el-input>
                </div>
            </div>

           
            <div
              v-for="(item, i) in dataDictionaryList"
              :key="i"
              class="text item"
              @click="handleItemGetInfo(item.dict_id,item.bm)"
              :class="{active:categoryIndex == item.dict_id}"
            >
              <span class="ov" :title='item.mc'>{{item.mc}}</span>
              <div @click.stop>
                <el-button v-if="hasPerms('/v1/data_dictionary/update')" class="mini-btn" type="primary" icon="el-icon-edit" size="mini" @click="showDialogEditOrAdd(isAdd='edit', item)"></el-button>
                <el-button v-if="hasPerms('/v1/data_dictionary/delete')" class="mini-btn" type="danger" icon="el-icon-delete" size="mini" @click="removeDictionaryItem(item.dict_id)"></el-button>
              </div>
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <el-card class="main-card">
            <el-row>
              <el-col :span="24">
                <el-button v-if="hasPerms('/v1/data_dictionary/save')" type="primary" icon="iconfont icon-xinzeng" size="small" @click="showDialogEditOrAdd(isAdd=true)">新增</el-button>
                <el-button v-if="!hasPerms('/v1/data_dictionary/download_model')" type="success" icon="iconfont icon-xiazai" size="small" @click="downloadImportTemplateFun">下载导入模板</el-button>
                <el-button v-if="hasPerms('/v1/data_dictionary/import')" type="primary" icon="iconfont icon-Icon-daoru" size="small" @click="showUploadDialog">导入</el-button>
                <el-button v-if="hasPerms('/v1/data_dictionary/export')" type="success" icon="iconfont icon-daochu" size="small" @click="exportDataDictionaryFun">导出</el-button>
              </el-col>
            </el-row>
            <el-table v-if="hasPerms('/v1/data_dictionary/list')" stripe border :data="tableData" style="width: 100%">
              <el-table-column type="index" label="#" width="50"></el-table-column>
              <el-table-column property="bm" label="编码"></el-table-column>
              <el-table-column property="sslb" label="所属类别"></el-table-column>
              <el-table-column property="mc" label="名称"></el-table-column>
              <el-table-column property="sfqy" label="是否启用">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <el-switch :disabled="!hasPerms('/v1/data_dictionary/update')" :active-value="1" :inactive-value="0" v-model="scope.row.sfqy" @change="dictionaryStatusChange(scope.row)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column property="bz" label="备注"></el-table-column>
              <el-table-column property="options" label="操作">
                <template slot-scope="scope">
                  <el-button v-if="hasPerms('/v1/data_dictionary/update')" type="primary" size="mini" @click="showDialogEditOrAdd(isAdd=false, scope.row)">编辑</el-button>
                  <el-button v-if="hasPerms('/v1/data_dictionary/delete')" type="danger" size="mini" @click="removeDictionaryItemById(scope.row.dict_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="queryParams.page_num"
              :page-size="queryParams.page_size"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
            <!-- 新增/编辑表单 -->
            <el-dialog
              :title="title"
              :visible.sync="editDialogVisible"
              width="50%"
              @close="editDialogClosed"
            >
              <el-form
                :model="editAddForm"
                :rules="rules"
                ref="editAddForm"
                label-width="70px"
              >
                <el-form-item label="id" v-if="isAdd === 'edit'">
                  <el-input v-model="editAddForm.dict_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="bm">
                  <el-input v-model="editAddForm.bm"></el-input>
                </el-form-item>
                <el-form-item label="所属类别">
                  <el-input v-model="editAddForm.sslb"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="mc">
                  <el-input v-model="editAddForm.mc"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editAddForm.bz"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                  <el-switch :active-value="1" :inactive-value="0" v-model="editAddForm.sfqy"></el-switch>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogClosed">取 消</el-button>
                <el-button type="primary" @click="submitFormFun">确 定</el-button>
              </div>
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
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import {
  getDataDictionaryList,
  getChildrenList,
  addDataDictionaryItem,
  editDataDictionaryItem,
  removeDataDictionaryItem,
  downloadImportTemplate,
  importTemplate,
  exportDataDictionary
} from '@/api/dictionary'
import Download from "@/utils/download"
export default {
  data() {
    return {
      dataDictionaryList: [],
      categoryIndex: '',
      tableData: [],
      total: 0,
      queryParams: {
        dict_id: '',
        page_num: 1,
        page_size: 10
      },
      editAddForm: {
        parent_id:0,//父级id(没有父级则传0)
        dict_id:'',//字典id
        bm: '', // # 字典编码
        sslb: '', // 所属类别
        mc: '', // # 名称
        bz: '', // 备注
        sfqy: 1  // 是否启用，0：不启用，1：启用
      },
      rules: {
        bm: [
          { required: true, message: '请填写编码', trigger: 'blur' }
        ],
        mc: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ]
      },
      // 被选中的父级列表id
      parent_id: '',
      // 新增/编辑
      title: '新增',
      isAdd: false,
      editDialogVisible: false,
      importDialogVisible: false,
      // 数据字典查询
      sjzd_query:'',
    }
  },
  watch: {
    total() {
      if (this.total === (this.queryParams.page_num - 1) * this.queryParams.page_size && this.total !== 0) {
        this.queryParams.page_num -= 1
        this.queryParams.start = (this.queryParams.page_num - 1) * this.queryParams.page_size
        this.getDataDictionaryListFun()
      }
    },
    sjzd_query(){
      if (this.sjzd_query === '') {
        this.getDataDictionaryListFun()
      }
    },
  },
  created() {
    this.getDataDictionaryListFun()
  },
  methods: {
    searchSjzd(){
      const q = {
        mc:this.sjzd_query
      }
      getDataDictionaryList(q).then(response => {
        if (response.status === 200) {
          const { status, message, data: res } = response
          if (status !== 200) return thi.message({ message: message, type: 'error' })
          this.dataDictionaryList = res.data
          this.categoryIndex = this.dataDictionaryList[0].dict_id
          this.handleItemGetInfo(this.dataDictionaryList[0].dict_id,this.dataDictionaryList[0].bm)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取数据字典父级列表
    getDataDictionaryListFun() {
      const q = {
        mc:''
      }
      getDataDictionaryList(q).then(response => {
        if (response.status === 200) {
          const { status, message, data: res } = response
          if (status !== 200) return thi.message({ message: message, type: 'error' })
          this.dataDictionaryList = res.data
          this.categoryIndex = this.dataDictionaryList[0].dict_id
          this.handleItemGetInfo(this.dataDictionaryList[0].dict_id,this.dataDictionaryList[0].bm)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 点击列表获取具体数据信息
    handleItemGetInfo(dictId,bm) {
      // 存储左侧列表的id值，用于右侧新增按钮获取父级parent_id
      if (this.parent_id === dictId) return false
      this.parent_id = dictId
      this.categoryIndex = dictId
      const q = this.queryParams
      q.bm = bm
      q.page_num = 1
      q.page_size = 10
      this.queryParams = q
      this.getChildrenListFun(q)
    },

    // 删除数据字典列表
    removeDictionaryItem(dictId) {
      this.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          dict_id: dictId
        }
        removeDataDictionaryItem(q).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.getDataDictionaryListFun()
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

    // 翻页
    handleCurrentChange(newPage) {
      const q = {
        dict_id: this.parent_id,
        page_num: newPage,
        page_size: 10
      }
      this.getChildrenListFun(q)
    },

    // 获取子级列表数据
    getChildrenListFun(queryInfo) {
      getChildrenList(queryInfo).then(response => {
        if (response.status === 200) {
          const { status, message, data: res } = response
          if (status !== 200) return this.message({ message: message, type: 'error' })
          const { list, pageNum, pageSize, total } = res.data
          this.tableData = list
          // console.log(this.tableData)
          this.queryParams.page_num = pageNum
          this.queryParams.page_size = pageSize
          this.total = total
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 启用禁用
    dictionaryStatusChange(row) {
      console.log(row)
      const q = {
        dict_id: row.dict_id,
        sfqy: row.sfqy,
        bm: row.bm,
        sslb: row.sslb,
        mc: row.mc,
        bz: row.bz,
        parent_id:'0',
      }
      editDataDictionaryItem(q).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getChildrenListFun(this.queryParams)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增/编辑表单
    showDialogEditOrAdd(isAdd, row) {
      if (isAdd === false) {
        this.title = "编辑"
        this.isAdd = false
        let q = this.editAddForm
        q.dict_id = row.dict_id
        q.bm = row.bm
        q.sslb = row.sslb
        q.mc = row.mc
        q.bz = row.bz
        q.sfqy = row.sfqy
        this.editAddForm = q
      } else if (isAdd === 'dic') {
        this.title = "新增"
        this.isAdd = 'dic'
        let q = this.editAddForm
        if (q.hasOwnProperty('dict_id') === true) delete q.dict_id
        q.parent_id = 0
        this.editAddForm = q
      } else if (isAdd === 'edit') {
        this.title = "编辑"
        this.isAdd = 'edit'
        let q = this.editAddForm
        q.dict_id = row.dict_id
        q.bm = row.bm
        q.sslb = row.sslb
        q.mc = row.mc
        q.bz = row.bz
        q.sfqy = row.sfqy
        this.editAddForm = q
      } else {
        this.title = "新增"
        this.isAdd = true
        let q = this.editAddForm
        q.parent_id = this.parent_id
        this.editAddForm = q
      }
      this.editDialogVisible = true
    },

    // 提交表单
    submitFormFun() {
      this.$refs.editAddForm.validate((valid) => {
        if (!valid) return false
        if (this.isAdd === true) {
          addDataDictionaryItem(this.editAddForm).then(response => {
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success' })
              this.getChildrenListFun(this.queryParams)
              this.editDialogVisible = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (this.isAdd === 'dic') {
          addDataDictionaryItem(this.editAddForm).then(response => {
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success' })
              this.getDataDictionaryListFun()
              this.editDialogVisible = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (this.isAdd === 'edit') {
          editDataDictionaryItem(this.editAddForm).then(response => {
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success' })
              this.getDataDictionaryListFun()
              this.editDialogVisible = false
            }
          }).catch(error => {
            console.log(error)
          })
        }else {
          editDataDictionaryItem(this.editAddForm).then(response => {
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success' })
              this.getChildrenListFun(this.queryParams)
              this.editDialogVisible = false
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },

    // 删除子列表数据项
    removeDictionaryItemById(dictId) {
      this.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          dict_id: dictId
        }
        removeDataDictionaryItem(q).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.getChildrenListFun(this.queryParams)
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

    // 关闭表单
    editDialogClosed() {
      this.$refs.editAddForm.resetFields()
      this.editAddForm.sslb = ''
      this.editAddForm.bz = ''
      this.editAddForm.mc = ''
      this.editAddForm.bm = ''
      this.editAddForm.sfqy = 1
      this.editDialogVisible = false
    },

    // 下载导入模板
    downloadImportTemplateFun() {
      downloadImportTemplate().then(response => {
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
      importTemplate(formData).then(response => {
        // 
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success', duration: 3000 })
          this.importDialogVisible = false
          this.$refs.upload.clearFiles()
          this.getDataDictionaryListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 提交导入文件
    submitUpload() {
      this.$refs.upload.submit()
    },

    // 导出数据字典数据
    exportDataDictionaryFun() {
      const q = {
        dict_id: this.parent_id
      }
      exportDataDictionary(q).then(response => {
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
  }
}
</script>
<style lang="less">
// .el-upload{
//   display: inline !important;
//   text-align: left !important;
// }
.el-table{
  .success{
    color:darkgreen;
  }
  .error{
    color:crimson;
  }
}
</style>

<style lang="less" scoped>

.text {
  font-size: 14px;
}
.item {
  padding:10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  cursor: default;
  .ov{
    width:110px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .mini-btn{
    padding:5px;
  }
}
.active{
  color:cornflowerblue;
  font-weight: bolder;
}
.box-card{
  height:730px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.item:last-child{
  border-bottom: none;
}
.clearfix {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header_top{
    margin-bottom: 20px;
    span {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  margin-left:20px;
  padding: 0 !important;
}
.main-card{
  height:730px;
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
