<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统日志</el-breadcrumb-item>
    </el-breadcrumb>

   <el-card>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="queryInfo" ref="queryDictionaryRef" class="demo-form-inline">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getLogListFun"
                placeholder="请选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getLogListFun"
                placeholder="请选择结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="操作人">
              <el-input clearable v-model="queryInfo.user_name" placeholder="请输入操作人" @blur="getLogListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getLogListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
         <el-button type="danger" @click="deleteMessageLogFun" icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
      <!-- 系统日志列表区 -->
      <el-table
        :data="systemLogList"
        stripe
        border
        @selection-change="changeBox"
        style="width: 100%"
        :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
        :cell-style="{'text-align':'center','padding':'0px'}"
        :row-style="{'height':'30px'}"
      >
          <el-table-column
            type="selection"
            fixed
            width="35">
          </el-table-column>
        <el-table-column width="50" align="center" type="index" label="序号"></el-table-column>
        <el-table-column width="200" prop="user_name" label="操作人"></el-table-column>
        <el-table-column min-width="500" prop="info" show-overflow-tooltip label="操作内容"></el-table-column>
        <el-table-column width="200" prop="create_time" label="操作时间"></el-table-column>
        <el-table-column min-width="500" prop="param" label="操作参数"></el-table-column>
        <el-table-column width="200" prop="method" label="请求方式"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
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
    getLogList,
    deleteMessageLog,
  } from '@/api/systemmange'
import {
  parseTime
} from "@/utils/index"

export default {
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:1,
        page_size:10,
        start_time:'',
        end_time:'',
        user_name:'',
      },
      systemLogList:[],
      ids:'',
      selectedList:[],
    }
  },
  components: {
    
  },
  watch: {
    total() {
      if (this.total === (this.currentPage - 1) * this.pageSize && this.total !== 0) {
      // if (this.total !== 0) {
      console.log(this.currentPage)
        this.currentPage = 1
        // this.getLogListFun()
      }
    }
  },
  created () {
    
  },
  mounted () {
    this.getLogListFun() 
  },
  methods: {
  // type your function
    deleteMessageLogFun(){
      if (this.selectedList.length === 0) return this.message({ message: '请选择需要删除的信息', type: 'error' })
      this.confirm('确定将选中的信息删除么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         var record_ids = this.ids.join('#')
          const q ={
            record_ids:record_ids
          }
          deleteMessageLog(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getLogListFun() 
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })       
      })

      
    },
    // 盒列表选中的列 
    changeBox(selection) {
      this.ids = selection.map(item => item.record_id);
      this.selectedList = selection
      console.log(this.ids)
      console.log(this.selectedList)
    },

    getLogListFun(){

      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        start_time:this.queryInfo.start_time,
        end_time:this.queryInfo.end_time,
        user_name:this.queryInfo.user_name,
      }
      getLogList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.systemLogList = res.list
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getLogListFun()
         }
          
        }
      })
    },

    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getLogListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.getLogListFun()
    },
  },
}
</script>

<style scoped lang=''>

</style>
