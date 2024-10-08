<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统字典</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="queryInfo" ref="queryDictionaryRef" class="demo-form-inline">
            <el-form-item label="字典标签">
              <el-input clearable v-model="queryInfo.dict_tag" placeholder="请输入字典标签" @change="queryDictionaryAll"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="querySystemDictionaryList">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 添加字典 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button v-if="hasPerms('/v1/dict/save')" type="primary" @click="showAddDicDialog">添加字典</el-button>
          <!-- 添加字典的对话框 -->
          <el-dialog
            title="添加字典"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDictionaryClosed"
          >
            <el-form :model="addDictionary" label-width="100px" ref="addDictionaryRef" :rules="operationUserFormRules">
              <el-form-item label="字典标签" prop="dict_tag">
                <el-input v-model="addDictionary.dict_tag"></el-input>
              </el-form-item>
              <el-form-item label="类别编码" prop="dict_code">
                <el-input v-model="addDictionary.dict_code"></el-input>
              </el-form-item>
              <el-form-item label="字典名称" prop="dict_name">
                <el-input v-model="addDictionary.dict_name"></el-input>
              </el-form-item>
              <el-form-item label="所属类型名" prop="dict_type_name">
                <el-input v-model="addDictionary.dict_type_name"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSystemDictionary">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 字典列表区 -->
      <el-table
        :data="systemDicList"
        stripe
        border
        style="width: 100%"
        v-if="hasPerms('/v1/dict/list')"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="dict_tag" label="字典标签"></el-table-column>
        <el-table-column prop="dict_code" label="类别编码"></el-table-column>
        <el-table-column prop="dict_name" label="字典名称"></el-table-column>
        <el-table-column prop="dict_type_name" label="字典所属类型名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn edit">
              <el-button v-if="hasPerms('/v1/dict/update')" type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
              <!-- 修改字典的表单 -->
              <!-- 添加字典的对话框 -->
              <el-dialog
                title="添加字典"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDictionaryClosed"
              >
                <el-form :model="editDictionary" label-width="100px">
                  <el-form-item label="字典id" prop="dict_id">
                    <el-input disabled v-model="editDictionary.dict_id"></el-input>
                  </el-form-item>
                  <el-form-item label="字典标签">
                    <el-input disabled v-model="editDictionary.dict_tag"></el-input>
                  </el-form-item>
                  <el-form-item label="类别编码">
                    <el-input v-model="editDictionary.dict_code"></el-input>
                  </el-form-item>
                  <el-form-item label="字典名称">
                    <el-input v-model="editDictionary.dict_name"></el-input>
                  </el-form-item>
                  <el-form-item label="所属类型名">
                    <el-input v-model="editDictionary.dict_type_name"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editSystemDictionary">确 定</el-button>
                </div>
               </el-dialog>
            </div>
            <!-- 删除字典 -->
            <div class="btn delete">
              <el-button v-if="hasPerms('/v1/dict/remove')" type="danger" icon="el-icon-delete" size="mini" @click="removeDictionary(scope.row.dict_id)"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page_num"
        :page-sizes="[10, 20, 30]"
        :page-size="queryInfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getSystemDictionaryList,
  querySystemDictionary,
  addSystemDictionary,
  editSystemDictionary,
  removeSystemDictionary
} from '@/api/systemDictionary'
export default {
  data() {
    return {
      operationUserFormRules: {
        dict_tag: [
          { required: true, message: '请输入字典标签', trigger: 'blur' }
        ],
        dict_code: [
          { required: true, message: '请输入类别编码', trigger: 'blur' }
        ],
        dict_name: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dict_type_name: [
          { required: true, message: '请输入字典所属类型名', trigger: 'blur' }
        ],
      },
      systemDicList: [],
      queryInfo: {
        page_num: 1,
        page_size: 10,
        dict_tag: ''
      },
      total: 0,
      addDialogVisible: false,
      addDictionary: {
        dict_tag: '',
        dict_code: null,
        dict_name: '',
        dict_type_name: ''
      },
      editDictionary: {},
      editDialogVisible: false
    }
  },
  watch: {
    total() {
      if (this.total === (this.queryInfo.page_num - 1) * this.queryInfo.page_size && this.total !== 0) {
        this.queryInfo.page_num -= 1
        this.queryInfo.start = (this.queryInfo.page_num - 1) * this.queryInfo.page_size
        this.getSystemDictionaryList()
      }
    }
  },
  created() {
    this.getSystemDictionaryList()
  },
  methods: {
    getSystemDictionaryList() {
      getSystemDictionaryList(this.queryInfo).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.systemDicList = res.data.list
          this.queryInfo.page_num = res.data.pageNum
          this.total = res.data.total
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 根据字典标签查询字典列表
    querySystemDictionaryList() {
      const q = {
        dict_tag: this.queryInfo.dict_tag
      }
      if ( q.dict_tag !== '' ) {
        querySystemDictionary(q).then(response => {
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success' })
              this.systemDicList = res.data
            }
        }).catch(error => {
            console.log(error)
        })
      } else {
        this.getSystemDictionaryList()
      }
    },

    // 点击清空按钮时触发的事件
    queryDictionaryAll() {
      this.getSystemDictionaryList()
    },

    // 显示条数改变
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
      this.getSystemDictionaryList()
    },

    // 显示页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.page_num = newPage
      this.getSystemDictionaryList()
    },

    // 显示添加字典弹层
    showAddDicDialog() {
      this.addDialogVisible = true
    },

    // 关闭添加字典弹层
    addDictionaryClosed() {
      this.addDialogVisible = false
      this.$refs.addDictionaryRef.resetFields()
    },

    // 点击添加字典弹层确定按钮
    addSystemDictionary() {
      this.$refs.addDictionaryRef.validate(valid => {
        if (!valid) return false
        addSystemDictionary(this.addDictionary).then(response => {
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success' })
              this.addDialogVisible = false
              this.getSystemDictionaryList()
            }
        }).catch(error => {
            console.log(error)
        })
      })
    },

    // 点击编辑图标，弹出编辑弹层
    showEditDialog(row) {
      this.editDialogVisible = true
      delete row.dict_create_time
      this.editDictionary = row
    },

    // 关闭编辑弹层
    editDictionaryClosed() {
      this.editDialogVisible = false
      this.editDictionary = {}
    },

    // 点击编辑弹层确定按钮
    editSystemDictionary() {
      editSystemDictionary(this.editDictionary).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.editDialogVisible = false
          this.getSystemDictionaryList()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 删除字典
    removeDictionary(dictId) {
      const q = {
        dict_id: dictId
      }
      removeSystemDictionary(q).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getSystemDictionaryList()
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
  display: inline-block;
  margin-right:10px;
}
.dialog-footer-icon {
  z-index: 9999;
}
</style>
