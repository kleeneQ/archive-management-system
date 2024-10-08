<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案补卷</el-breadcrumb-item>
    </el-breadcrumb>

      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷题名">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷题名" @change="getSupplementFilesSearchFun"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号" @change="getSupplementFilesSearchFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getSupplementFilesSearchFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
        <!-- 案卷列表 -->
            <el-table
              :data="auditFilesList"
              border
              style="width: 100%"
              max-height="550px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
              align="center"
                label="案卷档号"
                show-overflow-tooltip
                width="300">
              <template slot-scope="scope" >
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}-{{scope.row.dwgcdh}}-{{scope.row.ajdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}</div>
                </template>
              
              </el-table-column>
              
              <el-table-column
              align="center"
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                width="300"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajlbName"
                label="案卷类别"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="qssj"
                label="起始时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.qssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="zzsj"
                label="终止时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.zzsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="存放位置"
                show-overflow-tooltip
                width="300">
              <template slot-scope="scope" v-if="scope.row.ajk">
                  {{scope.row.ajk+'-'}}{{scope.row.ajg+'-'}}{{scope.row.ajl+'-'}}{{scope.row.ajc+'-'}}{{scope.row.ajx}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajsxh"
                label="案卷顺序号"
                show-overflow-tooltip
                width="100">
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="150">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="gotoSupplementFileFun(scope.row)">补卷</el-button>
               </template>
              </el-table-column>
            </el-table>
          
      </div>

    </el-card>
  </div>
</template>

<script>
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getEngineeringType,
} from "@/api/digitization/projectAPI"
import {
  getSupplementFilesSearch,
  getSupplementFileList
} from '@/api/supplement'
export default {
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        ajtm:'',
        ajdh:'',
      },
      auditFilesList:[],//案卷列表 
      selectedList:'',//选中的案卷
      fileCategory:[],// 案卷类别
      carrierType:[],// 案卷 载体类型
    }
  },
  created () {
    this.getFileCategory()  // 案卷类别
    this.getCarrierType()  // 载体类型
  },
  mounted () {
    this.getSupplementFilesSearchFun() //案卷列表
  },
  methods: {
  // type your function
    gotoSupplementFileFun(row){
      console.log(row)
      this.$router.push({  
            path: '/supplement/SupplementFile',  
            query: {
              Filesid: row.files_id,
              zt:row.zt
            }, 
        })
    },
       // 案卷列表选中的列
    changeBox(val) {
      this.selectedList = val
    },
    //获取 案卷列表
    getSupplementFilesSearchFun(){
      const q ={
        page_num:this.currentPage,
        page_size:this.pageSize,
        ajdh:this.queryInfo.ajdh,
        ajtm:this.queryInfo.ajtm,
      }
      getSupplementFilesSearch(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
          res.map(v => {
            // v.cfwz = v.ajk + v.ajl + v.ajg + v.ajc + v.ajx
            this.fileCategory.forEach(t => {
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            return
          }) 
         this.auditFilesList = res
        }
      })
    },

        // 案卷类别
    getFileCategory() {
      const q = {
        bm: "AJLB_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.fileCategory  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
       // 载体类型
    getCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.carrierType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
            // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getSupplementFilesSearchFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getSupplementFilesSearchFun()
    },
  },
}
</script>

<style scoped lang='less'>

</style>
