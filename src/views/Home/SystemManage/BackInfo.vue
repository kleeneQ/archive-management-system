<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>返回信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="提示编码">
              <el-input clearable v-model="queryInfo.msg_code" placeholder="提示编码" @change="queryBackInfo"></el-input>
            </el-form-item>
            <el-form-item label="提示内容">
              <el-input clearable v-model="queryInfo.msg_message" placeholder="提示内容" @change="queryBackInfo"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryBackInfo">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addBackInfoFun">添加</el-button>
          <el-dialog
            title="添加提示信息"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed"
          >
            <el-form :model="addBackInfo" label-width="70px" ref="addBackInfoForm">
              <el-form-item label="提示编码">
                <el-input v-model="addBackInfo.msg_code"></el-input>
              </el-form-item>
              <el-form-item label="提示内容">
                <el-input v-model="addBackInfo.msg_message"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addBackInfoSubmit">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 提示信息列表区域 -->
      <el-table
        :data="backInfoList"
        stripe
        border
        style="width: 100%"
        v-if="hasPerms('/v1/msg/list')"
      >
        <el-table-column type="index" label="#" width="80"></el-table-column>
        <el-table-column prop="msg_code" label="提示编码"></el-table-column>
        <el-table-column prop="msg_message" label="提示内容"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <div class="btn edit">
              <el-button v-if="hasPerms('/v1/msg/update')" type="primary" icon="el-icon-edit" size="mini" @click="showDialogEdit(scope.row)">编辑</el-button>
              <!-- 修改提示信息的表单 -->
              <el-dialog
                title="修改返回信息"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed"
              >
                <el-form :model="editInfoForm" label-width="70px">
                  <el-form-item label="提示编码">
                    <el-input v-model="editInfoForm.msg_code"></el-input>
                  </el-form-item>
                  <el-form-item label="提示内容">
                    <el-input v-model="editInfoForm.msg_message"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editBackInfoOk">确 定</el-button>
                </div>
              </el-dialog>
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
import { getBackInfoList, addBackInfoSave, editBackInfo } from '@/api/backInfo'
export default {
  data() {
    return {
      backInfoList: [],
      addDialogVisible: false,
      addBackInfo: {
        msg_code: '',
        msg_message: ''
      },
      queryInfo: {
        page_num: 1,
        page_size: 10,
        msg_code: '',
        msg_message: ''
      },
      total: 0,
      editDialogVisible: false,
      editInfoForm: {}
    }
  },
  watch: {
    total() {}
  },
  created() {
    this.getBackInfoListFun()
  },
  methods: {
    getBackInfoListFun() {
      getBackInfoList(this.queryInfo).then(response => {
        if (response.status === 200) {
          const { data, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.backInfoList = data.list
          this.total = data.total
          this.queryInfo.page_num = data.pageNum
          this.queryInfo.page_size = data.pageSize
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增返回信息管理
    addBackInfoFun() {
      this.addDialogVisible = true
    },

    // 关闭新增提示信息框
    addDialogClosed() {
      this.addDialogVisible = false
      this.addBackInfo = {
        msg_code: '',
        msg_message: ''
      }
    },

    // 新增提示信息框确定按钮
    addBackInfoSubmit() {
      if (this.addBackInfo.msg_code === '' || this.addBackInfo.msg_code === null) return this.message({ message: '提示编码不能为空', type: 'error' })
      if (this.addBackInfo.msg_message === '' || this.addBackInfo.msg_message === null) return this.message({ message: '提示内容不能为空', type: 'error' })
      addBackInfoSave(this.addBackInfo).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.addDialogVisible = false
          this.addBackInfo = {
            msg_code: '',
            msg_message: ''
          }
          this.getBackInfoListFun()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
      this.getBackInfoListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.queryInfo.page_num = newPage
      this.getBackInfoListFun()
    },

    queryBackInfo() {
      this.getBackInfoListFun()
    },

    showDialogEdit(row) {
      this.editDialogVisible = true
      this.editInfoForm = row
    },
    editDialogClosed() {
      this.editDialogVisible = false
      this.editInfoForm = {}
    },

    // 编辑返回信息确定
    editBackInfoOk() {
      editBackInfo(this.editInfoForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.editDialogVisible = false
          this.getBackInfoListFun()
          this.message({ message: res.message, type: 'success' })
        }
      }).catch(eror => {
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
</style>
