<template>
  <div>
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新消息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <el-card >
        <!-- 项目列表 B -->
            <el-table
              :data="MessageList"
              border
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="message_title"
                label="站内信标题"
              show-overflow-tooltip
                 min-width="300">
              </el-table-column>
              <!-- <el-table-column
                prop="message_info"
                label="站内信内容"
              show-overflow-tooltip
                min-width="300">
              </el-table-column> -->
              <el-table-column
                prop="message_create_time"
                label="发送时间"
                width="300">
              </el-table-column>
              <el-table-column
                prop="messageName"
                label="接收用户"
              show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="message_is_read"
                label="是否读取"
                width="100">
                <template slot-scope="scope">
                  <div class="message_is_read message_is_read_yes" v-if="scope.row.message_is_read == '1'">是</div>
                  <div class="message_is_read message_is_read_no" v-else>否</div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="getMessageUpdateStatusFun('详情', scope.row)">详  情</el-button>
                  <!-- <el-button type="success" size="small" @click="getMessageUpdateStatusFun('归档',scope.row)">详 情</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程案卷列表 E -->
            <!-- 分页 B -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background>
            </el-pagination>
             <!-- 分页 E -->
    </el-card>

    <!-- 消息详情 -->
        <el-dialog
        :title="'站内信内容'"
        :visible.sync="DetailDialogVisible"
        width="30%"
        @close="dialogClosed"
      >
      {{DetailData}}
    </el-dialog>

  </div>
</template>

<script>
import {
  getUserList,
} from '@/api/digitization/audit'

  import { 
    getMessageList,
    getMessageUpdateStatus
  } from '@/api/systemmange'

export default {
  data () {
    return {
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      MessageList:[],
      Userlist:[],//用户列表
      DetailDialogVisible:false,//消息详情 弹层
      DetailData:'',
    }
  },
  created () {
    
  },
  mounted () {
    this.getUserListFun() //获取用户列表
    this.getMessageListFun() 
  },
  methods: {
       //getUserList 获取审核人员列表
   getUserListFun(){
     getUserList().then(response =>{
       this.Userlist = response.data.data
       console.log(this.Userlist)
     })
   },
    // 关闭弹层
    dialogClosed(){
      this.DetailDialogVisible = false  
      //  this.getMessageListFun()
    },
    //修改站内信状态为已读
    getMessageUpdateStatusFun(name,row){
      this.DetailDialogVisible = true 
      this.DetailData = row.message_info
      if (row.message_is_read == '1') return
      const q ={
        message_id:row.message_id
      }
      getMessageUpdateStatus(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return // this.message({ message: message, type: 'error' })
        // this.message({ message: message, type: 'success' })
         this.getMessageListFun()
         this.$bus.$emit("getMessageListFun",10)
        }
      })
    },
   
    //站内信列表
    getMessageListFun(){
      const q ={
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      getMessageList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getMessageListFun()
         }
         res.list.map(v =>{
           this.Userlist.forEach(item =>{
             if (v.message_user_id == item.user_id) {
             v.messageName = item.user_name
           }
           })
           
         })
         this.MessageList = res.list
        }
      })
    },
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getMessageListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getMessageListFun()
    },

  },
  beforeDestroy(){
  this.$bus.$off("getMessageListFun")
}
}
</script>

<style scoped lang='less'>
  .message_is_read {
    box-sizing: border-box;
    border-radius: 15px;
    color: #fff;
  }
  .message_is_read_yes {
    background-color: #1ab394;
  }
  .message_is_read_no {
    background-color: #ed5565;
  }
</style>
