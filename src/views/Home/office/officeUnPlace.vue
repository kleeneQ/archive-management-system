<template>
  <div>
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>馆内办公流程</el-breadcrumb-item>
      <el-breadcrumb-item>已办结</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
       <el-card style="background-color: #F4F4F4;">
        <!-- 检索栏 B -->
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="标题">
              <el-input clearable v-model="queryInfo.file_title" placeholder="请输入标题"  @change="getOfficeFileUnPlaceListFun"></el-input>
            </el-form-item>
            <el-form-item label="来文时间">
              <el-date-picker
                v-model="queryInfo.start_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileUnPlaceListFun"
                placeholder="请选择来文时间">
              </el-date-picker> —
              <el-date-picker
                v-model="queryInfo.end_time"
                type="date"
                 value-format="yyyy-MM-dd"
                @change="getOfficeFileUnPlaceListFun"
                placeholder="请选择来文时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getOfficeFileUnPlaceListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
 
          <!-- 列表区 -->
              <div class="eltablebox">
            <el-table
              :data="OfficeFileUnPlaceList"
              border
              class="gw_table"
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px',}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="file_code"
                 align="center"
                label="文件编号"
              show-overflow-tooltip
              width="200">
              </el-table-column>
              <el-table-column
                prop="file_title"
                 align="center"
                label="标题"
                show-overflow-tooltip
                width="400">
                <template slot-scope="scope">
                  {{scope.row.file_title}}
                </template>
              </el-table-column>
              <el-table-column
                prop="file_receive_time"
                label="来文时间"
                 align="center"
                width="150"> 
                <template slot-scope="scope">
                  {{scope.row.file_receive_time | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="file_source"
                 align="center"
                label="公文来源"
                width="250">
              </el-table-column>
              <el-table-column
                prop="file_publish_man"
                 align="center"
                label="发件人"
                width="150">
              </el-table-column>
              <el-table-column
                prop="file_place"
                 align="right"
                label="状态"
                show-overflow-tooltip
                width="200">
                <template slot-scope="scope">
                    <div><el-tag>{{scope.row.file_place == 0 ?'未归档':'已归档'}}</el-tag></div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                 align="right"
                min-width="100">
                <template slot-scope="scope">
                  <el-button type="primary" size="small"  @click="gotoOfficeInfoPage(scope.row)">详情</el-button>
                  <el-button type="success" size="small" @click="gotoOfficePrintPage(scope.row)">打印</el-button>
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
            </div>

      </el-card>
  </div>
</template>

<script>
import {
  getOfficeFileUnPlaceList,
} from '@/api/office'

export default {
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:1,
        page_size:10,
        file_title:'',
        start_time:'',
        end_time:'',
      },
      
      OfficeFileUnPlaceList:[],//已归档列表
    }
  },
  created () {
    
  },
  mounted () {
    this.getOfficeFileUnPlaceListFun() //已归档列表
    
  },
  methods: {
  // type your function
  //已归档列表
    getOfficeFileUnPlaceListFun(){
        this.queryInfo.page_num=this.currentPage,
        this.queryInfo.page_size=this.pageSize,
      getOfficeFileUnPlaceList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfficeFileUnPlaceListFun()
         }
         this.OfficeFileUnPlaceList = res.list
         
        }
      })
    },

  //公文详情
  gotoOfficeInfoPage(row){
    this.$router.push({ 
         path: '/office/officeInfo', 
         query: {
              fileid: row.file_id
            }, 
        })
  },
  //打印
  gotoOfficePrintPage(row){
    this.$router.push({ 
       path: '/office/officePrint', 
       query: {
            fileid: row.file_id
          }, 
      })
  },
    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getOfficeFileUnPlaceListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getOfficeFileUnPlaceListFun()
    },
  },
}
</script>

<style scoped lang='less'>

</style>
