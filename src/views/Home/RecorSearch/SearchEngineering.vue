<template>
  <div >
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案查询</el-breadcrumb-item>
      <el-breadcrumb-item>项目查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 筛选按钮B -->
     <el-row class="margin-top-10 margin-bottom-10 margin-left-10">
        <el-col :span="6">
          <div class="topradiobutton">
              <el-radio v-model="queryInfo.ly" label="1" border @change="selectsort()">已归档</el-radio>
              <el-radio v-model="queryInfo.ly" label="2" border @change="selectsort()">未归档</el-radio>
          </div>
        </el-col>
      </el-row>
      <!-- 筛选按钮 E -->
      <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="项目编号">
              <el-input clearable v-model="queryInfo.xmbh" placeholder="请输入项目编号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input clearable v-model="queryInfo.gcmc" placeholder="请输入项目名称"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="施工许可证号">
              <el-input clearable v-model="queryInfo.sgxkzh" placeholder="请输入施工许可证号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="规划许可证号">
              <el-input clearable v-model="queryInfo.ghxkzh" placeholder="请输入规划许可证号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="附注">
              <el-input clearable v-model="queryInfo.fz" placeholder="请输入附注"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="项目档号">
              <el-input clearable v-model="queryInfo.gcdh" placeholder="请输入项目档号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="工程地点">
              <el-input clearable v-model="queryInfo.gcdd" placeholder="请输入工程地点"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
            <el-select clearable v-model="queryInfo.gclx" placeholder="请选择项目类型" @change="queryEngineering">
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="施工单位">
              <el-input clearable v-model="queryInfo.sgdw" placeholder="请输入施工单位"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryEngineering">查询</el-button>
              <el-button type="info" @click="queryEngineeringClear">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->

           <!-- 列表区 -->
              <div class="eltablebox">
               <el-col>
                    <!-- 案卷 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary"  @click="searchEngineeringDownloadFun('批量导出')">批量导出</el-button>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-button type="primary" @click="showBatchPackingDialogFun('档案报送承诺书')">档案报送承诺书</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="showBatchPackingDialogFun('档案接收和移交证明书')">档案接收和移交证明书</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="showBatchPackingDialogFun('档案验收意见书')">档案验收意见书</el-button>
                  </el-form-item> -->
                </el-form>

              </el-col> 
            <!-- 工程列表 B -->
            <el-table
              :data="EngineeringList"
              border
              style="width: 100%"
              @selection-change="changeBox"
              :highlight-current-row="true"
              ref="tableRef"
              :row-class-name="rowStyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="xmbh"
                label="项目编号"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                prop="gcmc"
                label="工程名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="工程类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="lxpzwh"
                label="立项批准文号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="jsdw"
                label="建设单位"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="sgxkzh"
                label="施工许可证号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="ghxkzh"
                label="规划许可证号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="gcdd"
                label="工程地点"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="sgdw"
                label="施工单位"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
               fixed="right"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="searchEngineeringEngineeringIdFun(scope.row)">项目详情</el-button>
                  <el-button type="success" size="small" @click="gotodetailsFun(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
            <!-- 分页 B -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 50, 200, 1000]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background>
            </el-pagination>
             <!-- 分页 E -->
            </div>

      </el-card>
        <!-- 项目工程详情 B -->
          <el-dialog :title="'项目详情'" :visible.sync="dialogEngineeringdetailsVisible" width="60%">
            <detailsEngineering v-if="dialogEngineeringdetailsVisible" :ID='Engineering_id' :source="zt"></detailsEngineering>
          </el-dialog>
        <!-- 项目工程详情 E -->
  </div>
</template>

<script>
import Download from "@/utils/download"
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  searchEngineeringList,
  searchEngineeringDownload,
  searchEngineeringEngineeringId,
  searchFilesListProjectId,
  searchFilePosition,
} from '@/api/RecorSearch/recorsearch'
import detailsEngineering from '@/components/details/detailsEngineering'
export default {
  components: {
    detailsEngineering,
  },
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        ly:'',
        page_num:1,
        page_size:10,
        xmbh:'',
        gcmc:'',
        sgxkzh  :'',
        ghxkzh:'',
        fz:'',
        gcdh:'',
        gcdd:'',
        gclx:'',
        sgdw:'',
      },
      ids:'',//选中的ID
      engineeringType:[],//项目工程类型
      EngineeringList:[],//工程列表
      engineeringIds:'',//选中的项目ID
      dialogEngineeringdetailsVisible:false,//项目详情 弹层
      isActive:"engineering",
      Engineering_id:"",//项目工程ID
      zt:"",
      FilePosition:[],//存放位置起始号
    }
  },
  created () {
    this.getEngineeringTypeFun() // 工程类型
    
  },
  mounted () {
      setTimeout(() => {
        this.queryEngineering() //工程列表
      }, 500)
    
  },
  methods: {
    //查看 
    gotodetailsFun(row){
      this.$router.push({ 
        path: '/RecorSearch/SearchEngineering/searchPage', 
        query: { 
           engineering_id: row.engineering_id,
           gclx: row.gclx,
           zt:row.zt
           }
        })
    },
    //项目详情
    searchEngineeringEngineeringIdFun(row){
      this.Engineering_id = row.engineering_id
      console.log(this.Engineering_id)
      this.dialogEngineeringdetailsVisible = true
      console.log(row)
      var zt = row.zt
      // if (this.queryInfo.ly == '1') {
      //   zt = 'file_status5'
      // } else {
      //   zt = 'file_status3'
      // }
     this.zt = zt
      const q = {
        engineering_id:row.engineering_id,
        zt:zt
      }
   
     
      console.log(q)
      
    },

    //批量导出
    searchEngineeringDownloadFun(){
      var engineeringIds = []
      this.ids.forEach((item,index) =>{
        console.log(item)
        if (index == 0) {
           engineeringIds = item
        } else {
          engineeringIds = engineeringIds+'#'+item
        }
       
      })
      
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        engineering_ids:engineeringIds
      }
      searchEngineeringDownload(q).then(response =>{
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
      })
    },
    //工程列表查询 获取
    queryEngineering(){
      
        this.queryInfo.page_num = this.currentPage,
        this.queryInfo.page_size = this.pageSize,
      searchEngineeringList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.queryEngineering()
         }
        console.log(this.engineeringType)
        res.list.map(v=>{
          this.engineeringType.forEach(t => {  //载体类型
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
        })
        this.EngineeringList = res.list
        }
      })
    },
    //重置查询条件
    queryEngineeringClear(){
      this.queryInfo = {
        ly:'',
        page_num:this.currentPage,
        page_size:this.pageSize,
        xmbh:'',
        gcmc:'',
        sgxkzh:'',
        ghxkzh:'',
        fz:'',
        gcdh:'',
        gcdd:'',
        gclx:'',
        sgdw:'',
      }
      this.queryEngineering() //工程列表
    },
  //项目归属类别 归档或未归档
    selectsort(){
      console.log(this.queryInfo.ly)
      this.queryEngineering() //工程列表
    },
    // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.engineeringType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 案卷列表选中的列 
    changeBox(selection) {
     this.ids = selection.map(item => item.engineering_id);
      this.selectedList = selection
      console.log(this.ids)
      console.log(this.selectedList)
    },
    //选中的列样式 高亮 改变  
    rowStyle({row}){
      var arr = this.ids;
      for(let i = 0; i < arr.length; i++){
        if(row.files_id === arr[i]){
          return 'rowStyle'
        }
      } 
    },
    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.queryEngineering()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.queryEngineering()
    },
  },
}
</script>

<style scoped lang='less'>
.rowStyle{
    background-color:#ecf5ff!important;
  }
</style>
