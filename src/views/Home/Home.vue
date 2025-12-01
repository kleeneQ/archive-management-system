<template>
  <el-container>
    <el-header style="position:absolute;width:100%;">
      <div class="logo">
        <span>管理系统</span>
      </div>
      <div class="header-function">
        <div class="personalCenter" @click="toPersonalCenter">
          <i class="el-icon-user-solid">个人中心</i>
        </div>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <p class="messageNumber" v-if="messageNumber > 0">{{messageNumber}}</p>
            <img :src="userInfo.user_avatar || ''" class="user-avatar">
            <i class="el-icon-caret-bottom btn" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="modifyPwd">
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="messagePageFun">
              <span class="NewmessageNumberbox">新消息<span class="NewmessageNumber" v-if="messageNumber > 0">{{messageNumber}}</span></span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="padding-top:60px;">
      <el-aside :width="isCollapse ? '64px' : '230px'">
        <div class="toggle-button" @click="toggleCollapse" :title="isCollapse ? '展开菜单' : '收起菜单'">
          {{ isCollapse ? '>>' : '<<' }}
        </div>

        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#0D2943"
          text-color="#fff"
          active-text-color="#275784"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-menu-item index="/welcome" @click="saveNavState('/welcome')">
            <i class="el-icon-s-home" style="font-size:15px;"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <MenuTree :menuData="menuList" v-if="menuList.length > 0"></MenuTree>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer style="height:30px;">© 2021-{{toyear}} 天齐科技 v1.0.0</el-footer>
      </el-container>
    </el-container>

    <!-- 修改密码弹层 -->
    <el-dialog title="修改密码" width="40%" :visible.sync="dialogFormVisible" @close="modifyDialogClosed" center>
      <el-form :model="password" label-width="70px" ref="modifyFormRef" :rules="operationUserPwdFormRules">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
          <el-input v-model="password.oldPwd" type="password" autocomplete="off" show-password placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
          <el-input v-model="password.newPwd" type="password" autocomplete="off" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPwd">
          <el-input v-model="password.confirmPwd" type="password" autocomplete="off" show-password placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/auth'
import { queryRoleBtnsAll } from '@/utils/index'
import { getInfo, modifyPwd } from '@/api/user'
import { fetchUserMenuList, getMessageList } from '@/api/systemmange'
import MenuTree from "./Menu/MenuTree"

export default {
  components: {
    MenuTree
  },
  data() {
    return {
      menuList: [],
      userInfo: {},
      isCollapse: false,
      activePath: '',
      dialogFormVisible: false,
      password: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      formLabelWidth: '120px',
      toyear: new Date().getFullYear(),
      messageNumber: 0 //站内消息列表数量
    }
  },
  // 修改用户密码验证规则
  computed: {
    operationUserPwdFormRules() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码长度不能小于6位'))
        } else {
          callback()
        }
      }

      const validateConfirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.password.newPwd) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }

      return {
        oldPwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, validator: validateConfirmPass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()

    // 从sessionStorage中恢复激活的路由路径
    const savedActivePath = window.sessionStorage.getItem('activePath')
    this.activePath = savedActivePath || '/welcome'

    this.getMessageListFun()
  },
  watch: {
    $route: {
      handler() {
        this.getMessageListFun()
      },
      immediate: false
    }
  },
  mounted(){
    // 监听全局消息刷新事件
    this.$bus.$on("getMessageListFun", () => {
      this.getMessageListFun()
    })
  },

  beforeDestroy() {
    // 清理事件监听器，防止内存泄漏
    this.$bus.$off("getMessageListFun")
  },
  methods: {
    //跳转到新消息列表页面
    messagePageFun(){
      this.$router.push({ path: '/MessageListPage' }).catch(()=>{})
    },

    // 公共基础接口 - 站内信列表
    getMessageListFun(){
      const q ={
        page_num: "1",
        page_size: '100',
      }

      getMessageList(q).then(response => {
        if (response && response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) {
            this.$message({ message: message || '获取消息列表失败', type: 'error' })
            return
          }

          // 优化未读消息统计方式，添加安全检查
          this.messageNumber = res.list && Array.isArray(res.list) ? res.list.filter(item => item.message_is_read === 0).length : 0
        }
      }).catch(error => {
        console.error('获取消息列表失败:', error)
        this.$message({ message: '获取消息列表失败', type: 'error' })
      })
    },
    // 获取用户信息
    getUserInfo() {
      getInfo().then(response => {
        if (response && response.status === 200) {
          const { data: res } = response
          if (res && res.status !== 200) {
            this.$message({ message: res.message || '获取用户信息失败', type: 'error' })
            return
          }

          // 设置默认头像
          if (res.data) {
            res.data.user_avatar = res.data.user_avatar || ''
            this.userInfo = res.data

            // 根据角色id获取角色菜单
            if (res.data.data.user_role && res.data.data.user_role.length > 0) {
              this.getRoleMenu(res.data.data.user_role[0].role_id)
            } else {
              console.warn('用户没有分配角色权限')
            }
          }
        }
      }).catch(err => {
        console.error('获取用户信息失败:', err)
        this.$message({ message: '获取用户信息失败', type: 'error' })
      })
    },

    // 获取角色菜单 侧边栏菜单
    getRoleMenu(roleId) {
      if (!roleId) return

      const q = {
        role_id: roleId
      }

      fetchUserMenuList(q).then(response => {
        if (response && response.status === 200) {
          const { status, message, data: res } = response.data

          if (status !== 200) {
            this.$message({ message: message || '获取菜单失败', type: 'error' })
            return
          }

          try {
            const menuList = this.filterMenuHandle(res.data)
            this.menuList = menuList && menuList.length > 0 && menuList[0].child ? menuList[0].child : []

            // 获取按钮权限并存储
            const buttons = queryRoleBtnsAll(res)
            this.$store.dispatch('user/save', buttons)
          } catch (err) {
            console.error('处理菜单数据失败:', err)
            this.menuList = []
          }
        }
      }).catch(error => {
        console.error('获取菜单列表失败:', error)
        this.$message({ message: '获取菜单列表失败', type: 'error' })
      })
    },

    // 登出
    logout() {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        window.sessionStorage.clear()

        // 登出后跳转到登录页
        this.$router.replace('/login').catch(() => {})

        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    // 过滤菜单处理
    filterMenuHandle(allMenuList) {
      const rebuildData = (arr) => {
        if (!Array.isArray(arr)) {
          return []
        }

        return arr.map(element => {
          const obj = {
            name: element.menuName,
            path: element.menuWebUrl,
            icon: element.menuLogo,
            id: element.menuId,
            level: element.menuParentLevel
          }

          // 仅对3级以下菜单进行子菜单处理
          if (element.child && element.menuParentLevel < 3) {
            obj.child = rebuildData(element.child)
          }

          return obj
        }).filter(Boolean) // 过滤掉无效项
      }

      return rebuildData(allMenuList)
    },
    // 展开收起侧边栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      // 可以添加动画效果或其他逻辑
    },

    // 保存激活的链接地址
    saveNavState(activePath) {
      if (activePath) {
        // 页面跳转时刷新信息栏数据
        this.getMessageListFun()
        // 保存到sessionStorage
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    },

    // 修改密码
    modifyPwd() {
      // 重置表单后再打开弹窗
      this.$nextTick(() => {
        if (this.$refs.modifyFormRef) {
          this.$refs.modifyFormRef.resetFields()
        }
        this.dialogFormVisible = true
      })
    },

    // 弹窗关闭时重置表单
    modifyDialogClosed() {
      this.$nextTick(() => {
        if (this.$refs.modifyFormRef) {
          this.$refs.modifyFormRef.resetFields()
        }
      })
    },

    // 确定修改密码
    submitForm() {
      this.$refs.modifyFormRef.validate(valid => {
        if (!valid) return false

        const params = {
          pre_password: this.$md5(this.password.oldPwd),
          user_password: this.$md5(this.password.newPwd)
        }

        modifyPwd(params).then(response => {
          if (response && response.status === 200) {
            const { data: res } = response
            if (res && res.status !== 200) {
              this.$message({ message: res.message || '修改密码失败', type: 'error' })
              return
            }

            this.$message({ message: res.message || '修改密码成功', type: 'success' })
            this.dialogFormVisible = false

            // 密码修改成功后退出登录
            this.$confirm('密码修改成功，请重新登录', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'info'
            }).then(() => {
              // 清除本地存储并跳转登录页
              window.localStorage.clear()
              this.$router.replace('/login').catch(() => {})
            })
          }
        }).catch(error => {
          console.error('修改密码失败:', error)
          this.$message({ message: '修改密码失败，请重试', type: 'error' })
        })
      })
    },

    // 去个人中心
    toPersonalCenter() {
      this.$router.push({ path: '/personalCenter' }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.NewmessageNumberbox {
  position: relative;
}
.NewmessageNumber {
  position: absolute;
  top: -5px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: red;
  text-align: center;
  line-height: 15px;
  color: white;
  font-size: 10px;
}
.el-container{
    height:100%;
}
.el-header{
  background: #373d41;
  display:flex;
  justify-content: space-between;
  padding-left:0;
  align-items:center;
  color:#fff;
  font-size:20px;
  > div.logo{
    height:60px;
    display:flex;
    align-items:center;
    .long_img{
      width:80%;
    }
    span{
      margin-left:15px;
    }
  }
  .header-function{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .personalCenter{
      font-size:14px;
      margin-right:10px;
      cursor: pointer;
    }
    .personalCenter:hover{
      color: #409EFF;
    }
    .avatar-container {
      margin-right: 30px;
      width:50px;
      height:50px;
      .avatar-wrapper {
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-radius: 50%;
        .messageNumber {
          position: absolute;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background-color: red;
          text-align: center;
          line-height: 20px;
          color: white;
          font-size: 12px;
          top: -3px;
          right: -5px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-image: url('../../../src/assets/tx.png') ;
          background-size: 100% 100%;
        }

        .btn {
          cursor: pointer;
          position: absolute;
          color: #fff;
          right: -10px;
          top: 35px;
          font-size: 15px;
        }
      }
    }
  }
}
.el-aside{
  position: relative;
  background: #0D2943;
  transition: all 0.5s;
  .el-menu{
    border-right:0 none;
    .el-submenu__title {
         background: #0D2943 !important;
     }
    li {
        background: #1A232A !important;
        .el-submenu__icon-arrow {
          font-size: 18px;
        }
    }
    .is-active {
        background: #275784 !important;
    }
    .el-menu-item {
         background: #0D2943 !important;
     }
     .el-submenu {
         background: #0D2943 !important;
         .el-submenu__title {
             background: #0D2943 !important;
         }
     }
  }
  .toggle-button{
    background:#4A5064;
    color:#fff;
    text-align:center;
    font-size:10px;
    line-height:24px;
    letter-spacing:0.2em;
    cursor:pointer;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 999;
  }
}
.el-main{
  background: #EAEDF1;
}
.el-footer{
  background: #F7F7F7;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  font-size:14px;
  color:#333;
}
</style>
