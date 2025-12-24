<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="账户">
              <el-input clearable v-model="queryInfo.user_name" placeholder="请输入账户"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
              <el-select clearable v-model="queryInfo.user_forbid" placeholder="请选择用户状态">
                <el-option label="启用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getUsersInfo">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="account-total" :span="20">
          <p class="p">您共有<span class="num">{{total}}</span>条数据</p>
        </el-col>
        <el-col :span="4">
          <div class="btn-box">
            <el-button size="mini" type="primary" @click="handleShowAddDialog">添加用户</el-button>
          </div>

        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table
        :data="usersList"
        stripe
        border
        style="width: 100%"
        :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
        :cell-style="{'text-align':'center','padding':'0px'}"
        :row-style="{'height':'30px'}"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="user_name" label="账户"></el-table-column>
        <el-table-column prop="user_true_name" label="用户姓名"></el-table-column>
        <el-table-column prop="user_tel" label="联系方式"></el-table-column>
        <el-table-column prop="user_email" label="邮箱"></el-table-column>
        <el-table-column label="角色">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-tag v-for="(item, i) in scope.row.user_role" :key="i">{{ item.role_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户状态" width="100">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch :disabled="!hasPerms('/v1/user/forbid')" :active-value="1" :inactive-value="0" v-model="scope.row.user_forbid" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" width="120"></el-table-column>
        <el-table-column prop="user_create_time" label="提交时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn edit">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialogEdit(scope.row)"></el-button>
            </div>
            <!-- 删除用户 -->
            <div class="btn delete">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.user_id)"></el-button>
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

      <!-- 添加用户的对话框 -->
          <el-dialog
            title="添加新用户"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed"
          >
            <el-form :model="addUserForm" label-width="70px" ref="addUserFormRef" :rules="operationUserFormRules">
              <el-form-item label="账户" prop="user_name">
                <el-input v-model="addUserForm.user_name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="user_password">
                <el-input v-model="addUserForm.user_password" type="password"  show-password></el-input>
              </el-form-item>
              <el-form-item label="用户姓名">
                <el-input v-model="addUserForm.user_true_name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="addUserForm.user_sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="addUserForm.user_tel"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="addUserForm.user_email"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  list-type="picture"
                  :http-request="upload"
                >
                  <img v-if="addUserForm.user_avatar" :src="addUserForm.user_avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!-- <el-form-item label="角色" prop="user_role_id">
                <el-select v-model="addUserForm.user_role_id" placeholder="请选择角色">
                  <el-option
                    v-for="item in rolesList"
                    :key="item.role_tag"
                    :label="item.role_name"
                    :value="item.role_id">
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
          </el-dialog>

         <!-- 修改用户的表单 -->
              <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed"
              >
                <el-form :model="editUserForm" label-width="70px"  :rules="operationUserFormRules">
                  <el-form-item label="账户"  prop="user_name">
                    <el-input v-model="editUserForm.user_name" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="editUserForm.user_password" type="password" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <el-input v-model="editUserForm.user_true_name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="editUserForm.user_sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <el-input v-model="editUserForm.user_tel"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="editUserForm.user_email"></el-input>
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      :show-file-list="false"
                      list-type="picture"
                      :http-request="editUpload"
                    >
                      <img v-if="editUserForm.user_avatar" :src="editUserForm.user_avatar" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="角色"  prop="user_role_id">
                    <el-select v-model="editUserForm.user_role_id" placeholder="请选择角色">
                      <el-option
                        v-for="item in rolesList"
                        :key="item.role_tag"
                        :label="item.role_name"
                        :value="item.role_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editUserInfo">确 定</el-button>
                </div>
              </el-dialog>
  </div>
</template>

<script>
import { getUsersList, addUserFun, userStatrChange, editUserInfo } from '@/api/user'
import { getRoleDropList } from '@/api/role'
import { getBase64 } from '@/utils/index'
export default {
  data() {
    // *********************************************
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        page_num: 0,
        page_size: 10,
        user_name: '',
        user_true_name: '',
        user_sex: null,
        user_tel: '',
        user_forbid: null
      },
      usersList: [],
      total: 0,
      pageCount: 0,
      addDialogVisible: false, // 新增用户对话框显示隐藏
      addUserForm: {
        user_name: '',  // *
        user_password: '',  // *
        user_true_name: '',
        user_sex: 0,
        user_tel: '',
        user_email: '',
        user_avatar: '',
        user_role_id: '',

      },
      // 角色列表数据
      rolesList: [],
      value: '',
      // 添加/修改用户表单验证规则对象
      operationUserFormRules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: ['blur', 'change'] }
        ],
        user_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 1000, message: '长度在 6 到 1000 个字符', trigger: ['blur', 'change'] }
        ],
        user_role_id:[
           { required: true, message: '请选择角色', trigger: ['blur', 'change'] },
        ]
      },
      editDialogVisible: false, // 修改用户对话框显示隐藏
      editUserForm: {} // 查询到的用户信息
    }
  },
  watch: {
    total() {
      if (this.total === (this.queryInfo.page_num - 1) * this.queryInfo.page_size && this.total !== 0) {
        this.queryInfo.page_num -= 1
        this.queryInfo.start = (this.queryInfo.page_num - 1) * this.queryInfo.page_size
        this.getUsersInfo()
      }
    }
  },
  created() {
    this.getUsersInfo()
  },
  methods: {
    getUsersInfo() {
      getUsersList(this.queryInfo).then(response => {
        console.log(response)
        if (response.status === 200) {
          const { data, message, status } = response.data.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.usersList = data.list
          this.pageCount = Math.ceil(data.total / data.pageSize)
          this.total = data.total
          this.queryInfo.page_num = data.pageNum
          this.queryInfo.page_size = data.pageSize
        }
      })
    },

    // 切换每页显示几条数据
    handleSizeChange(newSize) {
    //   console.log(newSize)
      this.queryInfo.page_size = newSize
      this.getUsersInfo()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
    //   console.log(newPage)
      this.queryInfo.page_num = newPage
      this.getUsersInfo()
    },

    // 监听switch开关状态的变化
    userStateChange(userinfo) {
      const data = {
        user_forbid: userinfo.user_forbid,
        user_id: userinfo.user_id
      }
      userStatrChange(data).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 添加用户弹层
    handleShowAddDialog() {
      this.addDialogVisible = true
      // 获取角色下拉列表数据
      this.getRoleDropList()
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      // 对话框关闭之后，重置整个表单
      this.$refs.addUserFormRef.resetFields()
      this.addUserForm = {
        user_name: '',  // *
        user_password: '',  // *
        user_true_name: '',
        user_sex: 0,
        user_tel: '',
        user_email: '',
        user_avatar: '',
        user_role_id: ''
      }
    },

    // 上传头像
    upload(e) {
      getBase64(e.file).then((res) => {
        this.addUserForm.user_avatar = res
      })
    },

    // 添加用户时，进行表单的预校验
    addUser() {
      this.$refs.addUserFormRef.validate(valid => {
        if (!valid) return false
        // 发起添加用户的请求
        let user_password = this.$md5(this.addUserForm.user_password)
        this.addUserForm.user_password = user_password
        addUserFun(this.addUserForm).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.$message({ message: res.message, type: 'error' })
            this.$message({ message: res.message, type: 'success' })
            this.addDialogVisible = false
            this.getUsersInfo()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    // 修改用户信息方法
    showDialogEdit(row) {
      console.log(row)
      this.editUserForm = row
      // 获取角色下拉列表数据
      this.getRoleDropList()
      this.editDialogVisible = true
    },

    // 监听修改用户表单重置
    editDialogClosed() {
      this.editUserForm = {}
    },

    // 修改头像
    editUpload(e) {
      getBase64(e.file).then((res) => {
        this.editUserForm.user_avatar = res
      })
    },

    // 修改用户信息
    editUserInfo() {
      const data = {
        user_avatar: this.editUserForm.user_avatar,
        user_email: this.editUserForm.user_email,
        user_id: this.editUserForm.user_id,
        user_password: this.editUserForm.user_password,
        user_role_id: this.editUserForm.user_role_id,
        user_sex: this.editUserForm.user_sex,
        user_tel: this.editUserForm.user_tel,
        user_true_name: this.editUserForm.user_true_name
      }
      let user_password = null
      if (data.user_password === null) {
        user_password = ''
      } else {
        user_password = this.$md5(data.user_password)
      }
      data.user_password = user_password
      // 发起修改用户信息的请求
      editUserInfo(data).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.editDialogVisible = false
          this.getUsersInfo()
          this.message({ message: res.message, type: 'success' })
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 删除用户信息
    removeUserById(user_id) {
      this.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          user_id: user_id,
          user_forbid: 2
        }
        userStatrChange(data).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.getUsersInfo()
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

    // 获取角色下拉列表
    getRoleDropList() {
      getRoleDropList().then(response => {
        //
        if (response.status === 200) {
          const { data, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.rolesList = data
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
.account-total{
  height:28px;
  line-height: 28px;
  .p{
    margin:0;
    padding:0;
    font-size:14px;
    .num{
      font-weight: bolder;
      padding: 0 5px;
    }
  }
}
.btn-box{
  text-align: right;
}
.page-count{
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box;
    margin-right: 5px;
    font-weight: 400;
    color: #606266;
}
</style>
