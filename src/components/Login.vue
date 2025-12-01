<template>
  <div class="login_container">
    <div class="login_box">
    <div class="title">管理系统</div>

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
        user_name: 'admin',
        user_password: '123456',
        captcha_code: ''
      },
      currentVerifyCode: '', // 当前生成的验证码
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

    // 生成验证码图片的方法
    generateVerifyCode() {
      const canvas = document.createElement('canvas')
      canvas.width = 120
      canvas.height = 40
      const ctx = canvas.getContext('2d')

      // 绘制背景
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 添加干扰线
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.stroke()
      }

      // 添加干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI)
        ctx.fill()
      }

      // 生成随机验证码（数字和字母混合）
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let code = ''
      ctx.font = 'bold 24px Arial'

      for (let i = 0; i < 4; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length))
        code += char

        // 随机颜色
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`

        // 随机旋转角度
        const angle = (Math.random() - 0.5) * 0.3
        ctx.save()
        ctx.translate(30 + i * 20, 25)
        ctx.rotate(angle)
        ctx.fillText(char, -8, 8)
        ctx.restore()
      }

      // 保存验证码以便验证
      this.currentVerifyCode = code

      return canvas.toDataURL('image/jpeg')
    },

    // 获取图片验证码
    getVerifyCode() {
      // 直接调用接口，不关心返回的数据，因为我们会在前端生成验证码
      getVerifyCode().then(() => {
        // 调用前端验证码生成方法
        this.codeUrl = this.generateVerifyCode()
      }).catch((err) => {
        console.log('获取验证码失败，但仍使用本地生成的验证码', err)
        // 即使接口失败，也使用前端生成的验证码
        this.codeUrl = this.generateVerifyCode()
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

        // 验证验证码
        if (!this.loginForm.captcha_code) {
          this.$message({
            message: '请输入验证码',
            type: 'warning'
          })
          return false
        }

        // 验证码不区分大小写
        if (this.loginForm.captcha_code.toUpperCase() !== this.currentVerifyCode) {
          this.$message({
            message: '验证码错误',
            type: 'error'
          })
          this.getVerifyCode() // 刷新验证码
          return false
        }

        const loginForm = this.loginForm
        let oldpassword = loginForm.user_password //加密前存下用户输入的密码
        loginForm.user_password = this.$md5(loginForm.user_password)
        login(this.loginForm).then(result => {
          // 兼容mock和真实接口的数据格式
          let res, headers
          if (result.data && result.data.status !== undefined) {
            // mock返回的数据格式
            res = result.data
            headers = result.headers || {}
          } else {
            // 真实接口的数据格式
            res = result.data
            headers = result.headers
          }
          console.log('登录成功，返回数据:', res)
          if (res.status !== 200) {
            that.getVerifyCode() //刷新验证码
            loginForm.user_password = oldpassword //登录错误后 还原加密前的密码
            // 使用Element UI的message方法显示错误信息
            this.$message({
              message: res.message || '登录失败',
              type: 'error'
            })
            return
          } else {
            // 使用Element UI的message方法显示成功信息
            this.$message({
              message: res.message || '登录成功',
              type: 'success'
            })
            // 获取token
            const authorization = headers.authorization || 'mock_token_' + Date.now()
            setToken(authorization)
            console.log('登录成功，token:', authorization)
            window.sessionStorage.setItem('activePath', '/welcome')
            this.$router.push('/home')
          }
        }).catch(error => {
          console.error('登录请求失败:', error)
          loginForm.user_password = oldpassword //错误后还原密码
          that.getVerifyCode() //刷新验证码
          this.$message({
            message: '登录请求失败，请稍后重试',
            type: 'error'
          })
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
