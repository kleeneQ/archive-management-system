<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案补卷审核</el-breadcrumb-item>
    </el-breadcrumb>

      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷题名">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷题名" @change="getSupplementFilesCheckListFun"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号" @change="getSupplementFilesCheckListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getSupplementFilesCheckListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
            <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline el-form-item1" >
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('案卷封面')">案卷封面</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('卷内目录')">卷内目录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="showDialoimgview('备考表')">备考表</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="warning" icon="el-icon-setting"  @click="showDialoBatchAuditFun()">批量审核</el-button>
            </el-form-item> -->
          </el-form>
        </el-col>

        <!-- 案卷列表 -->
            <el-table
              :data="auditFilesList"
              border
              ref="table"
              style="width: 100%"
              @selection-change="changeBox"
              class="tablestyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                fixed
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
              align="center"
                prop="ajdh"
                label="案卷档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}</div>
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                min-width="300"
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
                prop="bgqxName"
                label="保管期限"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="ztlxName"
                label="载体类型"
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
                prop="ajsxh"
                label="案卷顺序号"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="150">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="gotosupplementcheckdetails(scope.row)">补卷详情</el-button>
               </template>
              </el-table-column>
            </el-table>
          
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        >
      </el-pagination>
    </el-card>
           <!-- 案卷封面、卷内目录、备考表 预览弹层 -->
     <el-image-viewer  
             v-if="DialogVisibleimgview"
             :on-close="()=>{DialogVisibleimgview=false}"
             :url-list="FileUrlArrs" />
  </div>
</template>

<script>
import {
  getEngineeringType,
} from "@/api/digitization/projectAPI"
import {
  getSupplementFilesCheckList,
  getSupplementFilesCheckGetUrl,
} from '@/api/supplement'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  components: {
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
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
      storagePeriod:[],//保管期限
      DialogVisibleimgview:false,//预览图片文件 弹层
      fileURLym:'',//预览文件域名
    }
  },
  created () {
    this.getFileCategory()  // 案卷类别
    this.getCarrierType()  // 载体类型
    this.getStoragePeriod() //保管期限
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  mounted () {
    this.getSupplementFilesCheckListFun() //案卷列表
  },
  watch: {
    // total() {
    //    if (this.total !== 0) {
    //     this.queryInfo.page_num = 1
    //     this.getSupplementFilesCheckListFun()
    //   }
    // },
  },
  methods: {
  // type your function
  //补卷详情 跳转页面
  gotosupplementcheckdetails(row){
    this.$router.push({ 
        path: '/supplementcheck/supplementcheckdetails', 
        query: { 
           files_id: row.files_id,
           }
        })
  },
    //获取文件预览域名
    querySystemDictionaryFun(){
      const that = this
        const q = {
            dict_tag:'file_server_url'
          }
          //获取文件预览域名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              
              that.fileURLym = response.data.data[0].dict_code
              console.log(response.data.data[0].dict_code)
            }
          }).catch(error => {
            console.log(error)
          })
    },
       // 案卷列表选中的列
    changeBox(val) {
      if (val.length >1) {
        val = val.pop() //取出最后一项选中的值row
        this.$refs.table.clearSelection() //清空全部选中
        this.$refs.table.toggleRowSelection(val) //选中 单个赋值
      }
      this.selectedList = []
      this.selectedList.push(val)
    },
    //获取审核 案卷列表
    getSupplementFilesCheckListFun(){
      const q ={
        page_num:this.currentPage,
        page_size:this.pageSize,
        ajdh:this.queryInfo.ajdh,
        ajtm:this.queryInfo.ajtm,
      }
      getSupplementFilesCheckList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         console.log(this.carrierType)
        if (res === null ) {
          return
        }
         this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getSupplementFilesCheckListFun()
         }
          res.list.map(v => {
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
             this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
            return
          }) 
         this.auditFilesList = res.list
        }
      })
    },
      showDialoimgview(value){
      const that = this
      that.FileUrlArrs = []
      if(this.selectedList.length < 1) return  this.message({ message: "请勾选需要查看的案卷", type: 'error' })
      const q = {
        files_id:this.selectedList[0].files_id
      }
      getSupplementFilesCheckGetUrl(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (res.digitFileCover.length == 0 && res.digitFileCatalogue.length == 0 && res.digitFileReference.length == 0) return this.message({ message: "案卷暂无"+value+'信息', type: 'error' })
          var str = res.digitFileCover[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
              if (value === '案卷封面') {
              var url = that.fileURLym + res.digitFileCover[0].file_url
              window.open(url, '_blank')
            } else if (value === '卷内目录') {
              var url = that.fileURLym + res.digitFileCatalogue[0].file_url
              window.open(url, '_blank')
            } else if (value === '备考表') {
              var url = that.fileURLym + res.digitFileReference[0].file_url
              window.open(url, '_blank')
            }
          } else {
            that.FileUrlArrs = []
              if (value === '案卷封面') {
              var url = that.fileURLym + res.digitFileCover[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            } else if (value === '卷内目录') {
              var url = that.fileURLym + res.digitFileCatalogue[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            } else if (value === '备考表') {
              var url = that.fileURLym + res.digitFileReference[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            }
          }
          // that.FileUrlArrs
        }
      })
    },
 
        // 保管期限
    getStoragePeriod() {
      const q = {
        bm: "BGQX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.storagePeriod  = res
        }
      }).catch(error => {
        console.log(error)
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
      this.getSupplementFilesCheckListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getSupplementFilesCheckListFun()
    },
  },
}
</script>

<style  lang='less'>
.tablestyle thead {
    .el-table-column--selection {
      .cell {
        display: none;
      }
    }
  }
</style>
