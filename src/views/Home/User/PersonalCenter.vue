<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      
    </el-card>
  </div>
</template>

<script>
import { getInfo, modifyPwd } from '@/api/user'
export default {
  data() {
    return {
      
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取个人用户信息
    getUserInfo() {
      getInfo().then(response => {
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
