<template>
  <el-container>
    <el-header style="position:absolute;width:100%;">
      <div class="logo">
        <!-- <img class="long_img" src="../../assets/logo.png" alt=""> -->
        <span>海口市城建档案管理系统</span>
      </div>
      <div class="header-function">
        <div class="personalCenter" @click="toPersonalCenter('/personalCenter')">
          <i class="el-icon-user-solid">个人中心</i>
        </div>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <p class="messageNumber" v-if="messageNumber !== 0">{{messageNumber}}</p>
            <img :src="userInfo.user_avatar || ''" class="user-avatar">
            <i class="el-icon-caret-bottom btn" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="modifyPwd">
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="messagePageFun('/MessageListPage')">
              <span class="NewmessageNumberbox">新消息<span class="NewmessageNumber"  v-if="messageNumber !== 0">{{messageNumber}}</span></span>
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
      <div class="toggle-button" @click="toggleCollapse"> |||</div>
       
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
          <!-- <el-menu-item index="/personalCenter" @click="saveNavState('/personalCenter')">
            <i class="el-icon-user-solid" style="font-size:15px;"></i>
            <span slot="title">个人中心</span>
          </el-menu-item> -->
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
    <el-dialog title="修改密码" width="50%" :visible.sync="dialogFormVisible" @close="modifyDialogClosed">
      <el-form :model="password" label-width="70px" ref="modifyFormRef" :rules="operationUserPwdFormRules">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
          <el-input v-model="password.oldPwd" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
          <el-input v-model="password.newPwd" type="password" autocomplete="off"></el-input>
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
import { getRoleMenu } from '@/api/role'
import { 
  fetchUserMenuList,
  getMessageList,
  getMessageUpdateStatus,

  } from '@/api/systemmange'
import MenuTree from "./Menu/MenuTree"
export default {
  components: {
    MenuTree: MenuTree
  },
  data() {
    return {
      menuList: [],
      userInfo: {},
      isCollapse: false,
      activePath: '',
      dialogFormVisible: false,
      password: {},
      formLabelWidth: '120px',
      // 修改用户密码验证规则
      operationUserPwdFormRules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
      toyear:'',
      messageNumber:0, //站内 消息列表数量
    }
  },
  created() {
    this.getUserInfo()
    // this.getMenuList()
    if (window.sessionStorage.getItem('activePath') !== null) {
      this.activePath = window.sessionStorage.getItem('activePath')
    } else {
      this.activePath = '/welcome'
    }
    
    this.getMessageListFun()
  },
  watch: {
	$route(to, from){
    this.getMessageListFun()
	}
},
  mounted(){
    // this.refreshData = setInterval(() => {
    //    this.getMessageListFun()
    //   }, 30000)
     this.$bus.$on("getMessageListFun", num => { //此处的num是接收的值
      this.getMessageListFun()
    })
    let date = new Date();
    this.toyear = date.getFullYear();
  },
  methods: {
    
    //公共基础接口 - 修改站内信状态为已读
    getMessageUpdateStatusFun(){
      const q ={
        message_id:"",
      }
      getMessageUpdateStatus(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        }
      })
    },
    //跳转到新消息列表页面
    messagePageFun(val){
      this.$router.push({ path: val }).catch(()=>{})
    },
    // 公共基础接口 - 站内信列表
    getMessageListFun(){
      const q ={
        page_num:"1",
        page_size:'100',
      }
      getMessageList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         let num = 0
         res.list.forEach(item =>{
           if (item.message_is_read == 0) {
             num = num + 1
           }
         })
         this.messageNumber = num

        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      getInfo().then(response => {
        if (response.status === 200) {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          if (res.data.user_avatar == null) {
            res.data.user_avatar = ''
          }
          this.userInfo = res.data

          // 根据角色id获取角色菜单
          this.getRoleMenu(this.userInfo.user_role[0].role_id)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取角色菜单  侧边栏菜单
    getRoleMenu(roleId) {
      const q = {
        role_id: roleId
      }
      fetchUserMenuList(q).then(response => {
        if (response.status === 200) {
          const { status, message, data: res } = response.data
          const menuList = this.filterMenuHandle(res)
          this.menuList = menuList[0].child
          const buttons = queryRoleBtnsAll(res)
          this.$store.dispatch('user/save', buttons)
          
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 登出
    logout() {
      const _this = this
      _this.confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        window.sessionStorage.clear()
        _this.$router.push('/login')
        _this.message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        _this.message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 获取左侧菜单
    getMenuList() {
      fetchUserMenuList().then(response => {
        const { data: res } = response
        if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
        const menuList = this.filterMenuHandle(res.data)
        this.menuList = menuList[0].child
      })
    },

    filterMenuHandle(allMenuList) {
      const rebuildData = (arr) => {
        if (!arr) {
          return []
        }
        let newarr = []
        arr.forEach(element => {
          const obj = {
            name: element.menuName,
            path: element.menuWebUrl,
            icon: element.menuLogo,
            id: element.menuId,
            level: element.menuParentLevel
          }
          if (element.child && element.menuParentLevel < 3) {
            obj.child = rebuildData(element.child)
            newarr.push(obj)
          }
        })
        return newarr
      }
      return rebuildData(allMenuList)
    },
    // 展開收起側邊欄
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存激活的链接地址
    saveNavState(activePath) {
      this.getMessageListFun() //页面跳转时 刷新 信息栏数据
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },

    // 修改密码
    modifyPwd() {
      this.dialogFormVisible = true
    },

    modifyDialogClosed() {
      this.$refs.modifyFormRef.resetFields()
    },

    // 确定修改密码
    submitForm() {
      const q = {}
      q.pre_password = this.$md5(this.password.oldPwd)
      q.user_password = this.$md5(this.password.newPwd)
      this.$refs.modifyFormRef.validate(valid => {
        if (!valid) return false
        modifyPwd(q).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.dialogFormVisible = false
            this.$router.push({ path: '/' })
            var storage = window.localStorage
            storage.clear()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    // 去个人中心
    toPersonalCenter(url) {
    }
  },
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
