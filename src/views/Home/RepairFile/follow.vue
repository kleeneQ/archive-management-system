<template>
  <div >
       <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案修护</el-breadcrumb-item>
      <el-breadcrumb-item>动态跟踪</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->

      <!-- 动态跟踪 B -->
     <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline"  >
            <el-form-item label="工程名称">
              <el-input clearable  v-model="queryInfo.dwgcmc" placeholder="请输入工程名称" @change="getFollowListFun"></el-input>
            </el-form-item>
            <el-form-item label="工程档号">
              <el-input clearable v-model="queryInfo.gcdh" placeholder="请输入工程档号" @change="getFollowListFun"></el-input>
            </el-form-item>
            <el-form-item label="操作者">
              <el-input clearable v-model="queryInfo.czz" placeholder="请输入操作者" @change="getFollowListFun"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryInfo.zt" placeholder="请选择状态" clearable @change="getFollowListFun">
                <el-option
                  v-for="item in stateType"
                  :key="item.bm"
                  :label="item.mc"
                  :value="item.bm">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getFollowListFun">查询</el-button>
            </el-form-item>
            
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
              <el-col>
                 <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-upload2" @click="exportFollowFun()">批量导出</el-button>
                  </el-form-item>
                   <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="saveFollowVisibleFun('新增动态跟踪')">新增动态跟踪</el-button>
                  </el-form-item>
                </el-form>
              </el-col> 

        <!-- 信息列表 -->
            <el-table
              :data="FollowList"
              border
              ref="table"
              style="width: 100%"
              class="tablestyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px'}"
              :row-style="{'height':'30px'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
              align="center"
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
              align="center"
                prop="gcdh"
                label="档号"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
              align="center"
                prop="dwgcmc"
                label="工程名称"
                show-overflow-tooltip
                min-width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="gcztName"
                label="状态"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="状态变更时间"
                show-overflow-tooltip
                width="200">
                <template slot-scope="scope">
                  {{scope.row.create_time | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="czz"
                label="操作者"
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary" class="btnedit" size="small"  @click="detailsVisibleFun(scope.row)">详 情</el-button>
                  <el-button type="primary" size="small"    @click="editFilePageFun('编辑信息',scope.row)">编辑</el-button>
               </template>
              </el-table-column>
            </el-table>
          
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
      <!-- 动态跟踪 E -->

    <!-- 工程状态变更信息 详情 B-->
    <el-dialog
      title="工程状态变更信息"
      :visible.sync="detailsVisible"
      width="60%"
    >
       <table class="mailTable" >
          <tr >
            <td class="column">工程名称：</td>
            <td colspan="3">{{fileDetails.dwgcmc}}</td>
          </tr>
          <tr >
              <td class="column">借出/承诺/开具时间：</td>
              <td >{{fileDetails.kjsj}}</td>
              <td class="column">状态：</td>
              <td >{{fileDetails.gcztName}}</td>
            </tr>
            <tr >
              <td class="column">归还时间：</td>
              <td >{{fileDetails.ghsj}}</td>
              <td class="column">借出地：</td>
              <td >{{fileDetails.jcd}}</td>
            </tr>
            <tr >
              <td class="column">状态更新时间：</td>
              <td >{{fileDetails.create_time | formatDate}}</td>
              <td class="column">操作者：</td>
              <td >{{fileDetails.czz}}</td>
            </tr>
          <tr >
            <td class="column">备注：</td>
            <td colspan="3">{{fileDetails.bz}}</td>
          </tr>
        </table>
    </el-dialog>
    <!-- 工程状态变更信息 详情 E-->
    
    <!-- 新增信息 弹层 B -->
    <el-dialog
      :title="titleName"
      :visible.sync="saveFollowVisible"
      width="70%"
    >
       <el-form class="catalogueengineering" :inline="true" :model="saveFollowForm" ref="saveFollowFormref"  label-width="150px">
         
        <el-form-item label="工程名称：">
          <el-input v-model="saveFollowForm.dwgcmc" placeholder="请输入工程名称" @focus="getFollowProjectListFun"></el-input>
        </el-form-item>
        <el-form-item label="工程状态">
          <el-select v-model="saveFollowForm.gczt" placeholder="请选择工程状态" clearable >
            <el-option
              v-for="item in stateType"
              :key="item.bm"
              :label="item.mc"
              :value="item.bm">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借出/承诺/开具时间: ">
         <el-date-picker
          v-model="saveFollowForm.kjsj"
          type="date"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd"
          placeholder="请选择时间">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="归还时间: ">
           <el-date-picker
          v-model="saveFollowForm.ghsj"
          type="date"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd"
          placeholder="请选择时间">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="借出地：">
          <el-input v-model="saveFollowForm.jcd" placeholder="请输入借出地" ></el-input>
        </el-form-item>
        <el-form-item label="备注: " class="catalogueengineering-title">
          <el-input type='textarea' clearable v-model="saveFollowForm.bz" placeholder="请输入备注"></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button @click="saveFollowVisible = false">取 消</el-button>
          <el-button type="primary" v-if="titleName=='新增信息'" @click="saveFollowFun">确 定</el-button>
          <el-button type="primary" v-if="titleName!=='新增信息'" @click="updateFollowFun">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增信息 弹层 E -->

      <!-- 选择工程 B -->
        <el-dialog
          width="60%"
          title="关联工程"
          :visible.sync="ProjectVisible">
          <el-form :inline="true" :model="ProjectQueryInfo" class="demo-form-inline" label-width="100px">
             <el-form-item label="工程名称">
              <el-input clearable v-model="ProjectQueryInfo.gcmc" placeholder="请输入工程名称"  @change="getFollowProjectListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getFollowProjectListFun">查询</el-button>
            </el-form-item>
          </el-form>
            <!-- 工程列表 B -->
            <el-table
              :data="selectProjectLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="dwgcmc"
                label="工程名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="dwgclxName"
                label="工程类型"
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="getProjectNameFun(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
          </el-dialog>
        <!-- 选择工程 E --> 

  </div>
</template>

<script>
import {
  getFollowList,
  exportFollow,
  saveFollow,
  updateFollow,
  getFollowProjectList
} from '@/api/RepairFile'
import Download from "@/utils/download"
import {
  getArchivesCateList,
} from '@/api/archivesCate'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
export default {
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 50,  // 每页显示的条数
      queryInfo:{
        dwgcmc:'',
        gcdh:'',
        czz:'',
        zt:'',
      },

      stateType:[], //工程类型
      FollowList:[],//获取动态跟踪信息列表
      fileDetails:'',//详情
      detailsVisible:false,//文件详情 弹层
      file_ids:[], //选择文件
      saveFollowVisible:false,//新增信息 弹层
      saveFollowForm:{},//新增信息 提交表单
      ProjectVisible:false, //选择关联工程 弹层
      selectProjectLists:[],//关联工程列表
      ProjectQueryInfo:{},//关联工程 查询
      titleName:'新增信息',
      archivesCateList:[],//单位工程类型
    }
  },
  created () {
    
  },
  mounted () {
    this.getstateTypeCode() //工程状态
    this.getUniProjectType() //单位工程类型
    this.getFollowListFun() //获取动态跟踪信息列表
  },
  methods: {
  // type your function
  editFilePageFun(name,row){
    console.log(name,row)
    this.titleName = name
    this.saveFollowForm = row
    this.saveFollowVisible = true
  },
  //编辑信息
  updateFollowFun(){
    updateFollow(this.saveFollowForm).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       this.message({ message: message, type: 'success' })
       this.getFollowListFun() //刷新信息列表
       this.saveFollowVisible = false 
      }
    })
  },
   //选择关联的单位工程
  getProjectNameFun(row){
    this.saveFollowForm.project_id = row.project_id
    this.saveFollowForm.dwgcmc = row.dwgcmc
    this.ProjectVisible = false
  },
  //打开新增信息 弹层
  saveFollowVisibleFun(){ 
    this.saveFollowVisible = true
  },
  // 添加动态跟踪信息
  saveFollowFun(){

    saveFollow(this.saveFollowForm).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      this.message({ message: message, type: 'success' })
       this.getFollowListFun() //刷新信息列表
       this.saveFollowVisible = false 
       this.saveFollowForm = {}
      }
    })
  },
  //导出动态跟踪信息列表
  exportFollowFun(){
    console.log(this.file_ids.length)
    // if (this.file_ids.length == 0) return this.message({ message: '请勾选需要导出的文件', type: 'warning' })
    // const q = {
    //   file_ids:this.file_ids.join('#')
    // }
    exportFollow(this.queryInfo).then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
        Download.download(
          blob,
          fileName
        )
      }).catch(error => {
        console.log(error)
      })
  },
  //选择文件
   handleSelectionChange(val){
    this.file_ids = []
    val.forEach(item =>{
      this.file_ids.push(item.file_id)
    })
  },

 // 文件详情
  detailsVisibleFun(row){
    this.fileDetails = row
    this.detailsVisible = true
  },

    //获取信息列表
    getFollowListFun(){
      const q ={

      }
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      getFollowList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
           this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getFollowListFun()
         }
         res.list.forEach(v => {
          this.stateType.forEach(t => {
              if (v.gczt === t.bm) {
                v.gcztName = t.mc
              }
              return
            })
          return
        })
          this.FollowList = res.list
        }
      })
    },

    // 工程状态
    getstateTypeCode() {
      const q = {
        bm: "DICT_GCZT"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.stateType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

  //动态跟踪关联工程列表
  getFollowProjectListFun(){
    const q ={
      dwgcmc:this.ProjectQueryInfo.gcmc,
    }
    getFollowProjectList(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       res.map(v =>{
         this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
       })
       this.selectProjectLists = res
       this.ProjectVisible = true
      }
    })
  },

 // 存储所有档案分类
    saveArchivesCateAll(res) {
      res.forEach(v => {
        this.archivesCateList.push(v)
        if (v.child) {
          this.saveArchivesCateAll(v.child)
        }
      })
    },

    // 单位工程类型
    getUniProjectType() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.saveArchivesCateAll(res)
          this.uniProjectType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },


    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getFollowListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getFollowListFun()
    },
  },
}
</script>

<style scoped lang='less'>

</style>
<style lang="less" scoped>
/deep/ .el-scrollbar {
    padding-bottom: 30px;
  box-sizing: border-box;
	.el-scrollbar__wrap {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
    .mailTable {width: 100%;}
    .mailTable tr thead {line-height: 40px;font-size: 18px;font-weight: 700;}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 280px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>