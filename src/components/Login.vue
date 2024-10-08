<template>
  <div class="login_container">
    <div class="login_box">
    <div class="title">海口市城建档案管理系统</div>

      <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="user_name">
          <el-input class="vv-input" prefix-icon="iconfont icon-user" placeholder="请输入用户名" v-model="loginForm.user_name"></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
          <el-input class="vv-input" prefix-icon="iconfont icon-3702mima" type="password" placeholder="请输入密码" v-model="loginForm.user_password"></el-input>
        </el-form-item>
        <div class="cvode">
          <el-input
            ref="vcode"
            v-model="loginForm.captcha_code"
            type="text"
            placeholder="验证码"
            name="vcode"
            tabindex="1"
            auto-complete="off"
            class="v-input"
            @blur="blurFun"
            @keyup.enter.native="handleLogin"
          />
          <el-image class="v-image" :src="codeUrl" @click="changeCodeFun" />
          <span v-if="ruleCode" class="rule-code">{{ validCode }}</span>
        </div>
        <el-form-item class="btns">
          <el-button class="login-btns" type="primary" @click="login" @keyup.enter="enterLogin">登录</el-button>
          <el-button class="login-btns" type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getVerifyCode, login } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  data () {
    return {
      loginForm: {
        // user_name: '908876603',
        // user_password: 'lcz908876603',
        user_name: '',
        user_password: '',
        captcha_code: ''
      },
      src: '',
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名
        user_name: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码
        user_password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
      },
      passwordType: 'password',
      ruleCode: false,
      // 验证码错误提示
      validCode: '',
      codeUrl: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getVerifyCode()
    this.enterLogin()
  },
  methods: {
    handleLogin(){
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    blurFun() {
      if (this.loginForm.captcha_code === '') {
        this.ruleCode = true
        this.validCode = '验证码不能为空'
      } else {
        this.ruleCode = false
        this.validCode = ''
      }
    },

    // 获取图片验证码
    getVerifyCode() {
      getVerifyCode().then((res) => {
        if (res.status === 200) {
          const codeUrl = `data: image/jpeg;base64,${this.base64.btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
          this.codeUrl = codeUrl
        }
      }).catch((err) => {
      })
    },

    // 改变验证码
    changeCodeFun() {
      this.getVerifyCode()
    },

    // 重置整个表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
      this.loginForm.captcha_code = ''
      this.ruleCode = false
    },

    // 登录方法
    login() {
      // 进行表单验证
      const that = this
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return false
        const loginForm = this.loginForm
      let oldpassword = loginForm.user_password //加密前存下用户输入的密码
        loginForm.user_password = this.$md5(loginForm.user_password)
        login(this.loginForm).then(result => {
          const { data: res, headers } = result
          if (res.status !== 200) {
            that.getVerifyCode() //刷新验证码
            loginForm.user_password = oldpassword //登录错误后 还原加密前的密码
            return this.message({
              message: res.message,
              type: 'error'
            })
            
          } else {
            this.message({
              message: res.message,
              type: 'success'
            })
            const { authorization } = headers
            setToken(authorization)
            console.log(authorization)
            window.sessionStorage.setItem('activePath', '/welcome')
            this.$router.push('/home')
          }
        })
      })
    },

    // 回车登录
    enterLogin() {
      document.onkeydown = e =>{
        //13表示回车键，baseURI是当前页面的地址，为了更严谨，也可以加别的，可以打印e看一下
        if (e.keyCode === 13 && e.target.baseURI.match('/login')) {
        //回车后执行搜索方法
          this.login()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  height:100%;
  background:#a9d1f8 url(../assets/bg_body.png) no-repeat;
  background-size: 100% 100%;
}
.title{
  // position:absolute;
  // top:25%;
  // left:50%;
  // transform:translate(-50%,0);
  // font-size:46px;
  // font-weight: bolder;
  // color:#fff;
  // font-family: "SourceHanSansCN-Medium";
  width: 100%;
  height: 44px;
  font-size: 46px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #04394E;
}
.login_box{
  width:650px;
  height:390px;
  // background:#fff;
  border-radius:3px;
  position:absolute;
  top:25%;
  // left:52%;
  right: 3%;
  // transform:translate(-50%,-50%);
  .avatar_box{
      height:130px;
      width:130px;
      border:1px solid #eee;
      border-radius:50%;
      padding:10px;
      box-shadow:0 0 10px #ddd;
      position:absolute;
      left:50%;
      transform: translate(-50%,-50%);
      background:#fff;
      img{
          width:100%;
          height:100%;
          border-radius:50%;
          background:#eee;
      }
  }
}

.btns{
  display:flex;
  justify-content:flex-end;
}
</style>
<style lang="less">
.login-btns {
  width: 200px;
  height: 50px !important;
  border-radius:25px !important;
  margin-right: 10px !important;
  background-color: #68ACFF !important;
}
.login_form{
  position:absolute;
  bottom:0;
  width:85%;
  padding:0 20px;
  box-sizing: border-box;
      .vv-input{
      width: 100%;
      height: 50px;
      border-radius: 25px;
      input {
        width: 100%;
        height: 50px;
        border-radius: 25px;
        font-size: 18px;
      }
    }
  .cvode{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;

    .v-input{
      width: 50%;
      height: 50px;
      border-radius: 25px;
      input {
        width: 100%;
        height: 50px;
        border-radius: 25px;
        font-size: 18px;
      }
    }
    .v-image{
      width: 20%;
      height: 40px;
      cursor: pointer;
      margin-right: 12%;
    }
    .rule-code{
      position: absolute;
      top:100%;
      font-size:12px;
      color:#F56C6C;
      padding-top: 4px;
    }
  }
}
</style>
