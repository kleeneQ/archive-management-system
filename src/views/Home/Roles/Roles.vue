<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="角色名称">
              <el-input clearable v-model="queryInfo.user_name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色状态">
              <el-select clearable v-model="queryInfo.user_forbid" placeholder="请选择角色状态">
                <el-option label="启用" value="0"></el-option>
                <el-option label="停用" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getRoleInfo">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 添加角色按钮 -->
      <el-row>
        <!-- <el-col class="account-total" :span="20">
          <p class="p">您共有<span class="num">{{total}}</span>条数据</p>
        </el-col> -->
        <!-- <el-col :span="4"> -->
        <el-col :span="24">
          <!-- <div class="btn-box"> -->
          <div>
            <el-button size="mini" v-if="hasPerms('/v1/role/save')" type="primary" @click="addRolesDialogVisible = true">添加角色</el-button>
          </div>
          <el-dialog
            title="添加新角色"
            :visible.sync="addRolesDialogVisible"
            @close="addRolesClosed"
          >
            <el-form ref="addRolesFromRef" :model="addRolesForm" :rules="rolesFormrules" label-width="80px">
              <el-form-item label="角色名称" prop="role_name">
                <el-input v-model="addRolesForm.role_name"></el-input>
              </el-form-item>
              <el-form-item label="角色标签">
                <el-input v-model="addRolesForm.role_tag"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addRolesDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table :data="roleList" stripe border>
        <!-- 点击箭头展开权限列表 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-if="scope.row.child === undefined">
              <el-col>
                <el-alert
                  title="该角色还没有分配菜单哦"
                  type="warning"
                  :closable="false"
                  show-icon
                >
                </el-alert>
              </el-col>
            </el-row>
            <el-row v-else :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']" v-for="(item1,i1) of scope.row.child" :key="item1.menuId">
              <!-- 渲染一级权限 -->
              <el-col :span="2">
                <el-tag>{{item1.menuName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级三级权限 -->
              <el-col :span="22">
                <el-row :class="[i2 === 0 ? '' : 'bdtop','vcenter']" v-for="(item2,i2) of item1.child" :key="item2.menuId">
                  <el-col :span="2">
                    <el-tag type="success">{{item2.menuName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="22">
                    <el-row :class="[i3 === 0 ? '' : 'bdtop','vcenter']" v-for="(item3,i3) of item2.child" :key="item3.menuId">
                      <!-- <el-tag type="warning" v-for="item3 of item2.child" :key="item3.menuId">{{item3.menuName}}</el-tag> -->
                      <el-col :span="3">
                        <el-tag type="warning">{{item3.menuName}}</el-tag>
                        <i v-if="item3.child.length" class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="20">
                        <el-tag type="info" v-for="item4 of item3.child" :key="item4.menuId">{{item4.menuName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 角色序号 -->
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <!-- 角色名称 -->
        <el-table-column prop="role_name" label="角色名称"></el-table-column>
        <!-- 角色描述 -->
        <el-table-column prop="role_tag" label="角色描述"></el-table-column>
        <!-- 角色状态 -->
        <el-table-column prop="role_state" label="角色状态"></el-table-column>
        <!-- 操作人 -->
        <el-table-column prop="role_operator" label="操作人"></el-table-column>
        <!-- 提交时间 -->
        <el-table-column prop="role_time" label="提交时间"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <!-- 编辑角色 -->
            <div class="btn edit">
              <el-button v-if="hasPerms('/v1/role/update')" type="primary" icon="el-icon-edit" size="mini" @click="showDialogEdit(scope.row)">修改</el-button>
              <el-dialog
                title="修改角色"
                :visible.sync="editRoleDialogVisible"
                @close="editRoleDialogClosed"
              >
                <el-form ref="editRolesFromRef" :model="editRolesForm" :rules="rolesFormrules" label-width="80px">
                  <el-form-item label="角色名称" prop="role_name">
                    <el-input v-model="editRolesForm.role_name"></el-input>
                  </el-form-item>
                  <el-form-item label="角色描述">
                    <el-input v-model="editRolesForm.role_tag"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editRole">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <!-- 删除角色 -->
            <div class="btn delete">
              <el-button v-if="hasPerms('/v1/role/remove')" type="danger" icon="el-icon-delete" size="mini" @click="removeRoleById(scope.row.role_id)">删除</el-button>
            </div>
            <!-- 分配权限 -->
            <div class="btn setting">
              <el-button v-if="hasPerms('/v1/role/perms')" type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            
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

      <el-dialog
                title="权限分配"
                custom-class="setRightDialogVisible"
                :visible.sync="setRightDialogVisible"
                @close="setRightDialogClosed"
              >
                <!-- 树形控件 -->
                  <!-- check-strictly 是否关联-->

                <el-tree
                  :data="rightsList"
                  show-checkbox
                  node-key="menuId"
                  default-expand-all
                  :default-checked-keys="defkeys"
                  :props="treeProps"
                  ref="treeRef"
                  highlight-current
                 :check-strictly="checkStrictly"
                ></el-tree>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="setRightDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="allotRights">确 定</el-button>
                </span>
              </el-dialog>
  </div>
</template>

<script>
import { getRolesList, getRoleMenu, setRoleMenu, addRole, updateRole, removeRole } from '@/api/role'
import { getMenusList, getMenusRoleList } from '@/api/systemmange'
import { modificationMenus } from '@/utils/index'
export default {
  data() {
    return {
      queryInfo: {        
        page_num: 0,
        page_size: 10,},
      // 所有角色列表数据
      roleList: [],
      setRightDialogVisible: false,
      // 所有权限的数据
      rightsList: [],
      // 树形控件属性绑定对象
      treeProps: {
        child: 'child',
        label: 'menuName'
      },
      // 默认选中的节点
      defkeys: [],
      checkStrictly:false,
      // 角色id
      roleId: null,
      addRolesDialogVisible: false, // 添加角色的对话框
      // 添加角色表单
      addRolesForm: {
        role_name: '',   // 角色名称
        role_tag: ''    // 角色标签
      },
      // 添加角色表单的验证
      rolesFormrules: {
        role_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      // 编辑角色的对话框
      editRoleDialogVisible: false,
      // 保存被编辑的角色信息
      editRolesForm: {},
      total: 0,

      // 用户权限 menuId 数组
      olaKeyArr:[],
      newKeyArr:[],

    }
  },
    watch: {
    total() {
      if (this.total === (this.queryInfo.page_num - 1) * this.queryInfo.page_size && this.total !== 0) {
        this.queryInfo.page_num -= 1
        this.queryInfo.start = (this.queryInfo.page_num - 1) * this.queryInfo.page_size
        this.getUsersInfo()
      }
    },
    
  },
  created() {
    this.getRoleList()
  },
  mounted(){
      // 定位到上次查看的位置  
    const lastNodeIndex = this.$refs.treeRef.getLevelIndex(this.$el);  
    // 选中上次查看的位置所对应的节点  
    this.$refs.treeRef.selectNode(lastNodeIndex); 
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      const q = {
        page_num:"0",
        page_size: "10",
      }
      getRolesList(this.queryInfo).then(response => {
        if (response.status === 200) {
          
          const { data, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          data.list.forEach(v => {
            // 获取角色菜单
            getRoleMenu({ role_id: v.role_id }).then(response => {
              if (response.data.data.length !== 0) {
                v.child = response.data.data
              }
            }).catch(error => {
              console.log(error)
            })
          })
          this.roleList = data.list
          console.log(data.list)
          this.pageCount = Math.ceil(data.total / data.pageSize)
          this.total = data.total
          this.queryInfo.page_num = data.pageNum
          this.queryInfo.page_size = data.pageSize
        }
      }).catch(error => {
        console.log(error)
      })
    },

   // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
       this.getRoleList()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.queryInfo.page_num = newPage
      this.getRoleList()
    },

    // 查询角色
    getRoleInfo() {
      console.log('查询角色')
    },

    // 显示分配权限的弹框
    showSetRightDialog(role) {
      var _this = this
      this.roleId = role.role_id
      this.getRightsTree(role)
      // 处理表框先显示，数据后加载的时间差问题
      setTimeout(function() {
        _this.setRightDialogVisible = true
      }, 16)
    },

    // 获取所有权限列表
    getRightsTree(role) {
      this.checkStrictly = true
      const q = {
        role_id:role.role_id
      }
      getMenusRoleList(q).then(response => {
        if (response.status === 200) {
          const { data, message, status } = response.data
          this.rightsList = modificationMenus(data)
          this.getLeafKeys(role, this.defkeys)
          this.checkStrictly = false;
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 关闭弹框后，重置默认属性
    setRightDialogClosed() {
      this.defkeys = []
    },

    // 递归获取角色所有节点的3级权限
    getLeafKeys(node, arr) {
      // 如果当前节点不包含child属性，则是3级节点
      if (node.child === undefined) return
      arr.push(node.menuId)
      // if (node.child) {
      //   return arr.push(node.menuId)
      // }
      // 如果不是3级节点，就继续
      node.child.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },

    // 获取所有被选中和半选中的节点id
    allotRights() {
      const keys = [...this.$refs.treeRef.getHalfCheckedKeys(), ...this.$refs.treeRef.getCheckedKeys()]
      const arrs = keys.join('#')
      const data = {
        role_id: this.roleId,
        menu_ids: arrs
      }
      setRoleMenu(data).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getRoleList()
          this.setRightDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 添加角色
    addRole() {
      addRole(this.addRolesForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getRoleList()
          this.addRolesDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 监听添加角色表单的关闭状态
    addRolesClosed() {
      this.$refs.addRolesFromRef.resetFields()
      this.addRolesForm = {}
    },

    // 编辑角色按钮
    showDialogEdit(roleInfo) {
      this.editRolesForm = roleInfo
      this.editRoleDialogVisible = true
    },

    // 编辑角色确定按钮
    editRole() {
      updateRole(this.editRolesForm).then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getRoleList()
          this.editRoleDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 监听编辑角色表单的关闭状态
    editRoleDialogClosed() {
      this.$refs.editRolesFromRef.resetFields()
      this.editRolesForm = {}
    },

    // 删除角色
    removeRoleById(id) {
      this.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          role_id: id
        }
        removeRole(data).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.getRoleList()
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
    }
  }
}
</script>
<style lang="less">
  .setRightDialogVisible {
    .el-dialog__body {
      height: 550px;
      overflow-y: auto;
      .el-tree {
        overflow-x:auto;
      }
    }
  }
  .dialog-footer {
    width: 100%;
    display: inline-block;
    text-align: center;
  }
</style>
<style lang="less" scoped>
.btn{
  display: inline-block;
  margin-right:10px;
}
.el-tag{
  margin:7px;
}
.bdtop{
  border-top:1px solid #eee;
}
.bdbottom{
  border-bottom:1px solid #eee;
}
.vcenter{
  display:flex;
  align-items:center;
}
.account-total{
  height:28px;
  line-height: 28px;
  .p{
    margin:0;
    padding:0;
    font-size:14px;
    .num{
      padding: 0 5px;
    }
  }
}
.btn-box{
  text-align: right;
}
</style>
