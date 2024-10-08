<template>
  <div >
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案编目</el-breadcrumb-item>
      <el-breadcrumb-item>文件级编目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 检索栏 B -->
    <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="文件题名">
              <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="文件档号">
              <el-input clearable v-model="queryInfo.wjdh" placeholder="请输入文件档号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryEngineering">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
      
    <!-- 列表区 B-->
    <div class="eltablebox">
            <!-- 工程案卷列表 B -->
            <el-table
              :data="filesList"
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
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="bgqxName"
                label="保管期限"
                width="230">
              </el-table-column>
              <el-table-column
                prop="sl"
                label="数量"
                width="230">
              </el-table-column>
              <el-table-column
                prop="mjName"
                label="密级"
                width="230">
              </el-table-column>
                 <el-table-column
                prop="wzName"
                label="文种"
                width="230">
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="100">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogCatalogeFormVisibleFun('编辑', scope.row)">编辑</el-button>
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
    <!-- 列表区 B-->

    <!-- 编辑编目 弹层 B -->
      <el-dialog title="编辑" :visible.sync="dialogCatalogeFormVisible" width="70%">
      <el-form class="catalogueengineering" :inline="true" :model="projectForm" ref="projectForm" :rules="projectRules" label-width="130px">
      <el-form-item label="文件题名: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.wjtm" placeholder="请输入文件题名" disabled></el-input>
      </el-form-item>
      <el-form-item label="责任者: ">
        <el-input v-model="projectForm.zrz" placeholder="请输入责任者" disabled></el-input>
      </el-form-item>
     <el-form-item label="密级: " >
      <el-select disabled v-model="projectForm.mj" placeholder="请选择密级">
        <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="载体类型: ">
      <el-select disabled v-model="projectForm.ztlx" placeholder="请选择载体类型">
        <el-option v-for="(item,index) in carrierType" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="数量: ">
        <el-input v-model="projectForm.sl" placeholder="请输入数量" disabled></el-input>
      </el-form-item>
      <el-form-item label="规格: ">
      <el-select disabled v-model="projectForm.gg" placeholder="请选择规格">
        <el-option v-for="(item,index) in specifications" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="文种: ">
      <el-select disabled v-model="projectForm.wz" placeholder="请选择文种">
        <el-option v-for="(item,index) in language" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="附注: " prop="fz" class="catalogueengineering-title">
        <el-input type='textarea' clearable v-model="projectForm.fz" placeholder="请输入附注"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="dialogCatalogeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="CataloguesaveFun">确 定</el-button>
      </el-form-item>
    </el-form>

      </el-dialog>
      <!-- 编辑编目 弹层 E -->
    </el-card>
  </div>
</template>

<script>
import {
  getCataloguefileList,
  submitCataloguefile,
} from '@/api/catalogue/catalogue'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getArchivesCateList
} from '@/api/archivesCate'

export default {
  data () {
    return {
       queryInfo:{
        wjtm:'',
        wjdh:'',
        page_num:1,
        page_size:10,
      },
      filesList:[],//列表
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      dialogCatalogeFormVisible:false,//编辑弹层
      projectForm: {
        wjtm:'',
        zrz:'',
        mj:'',
        ztlx:'',
        sl:'',
        gg:'',
        wz:'',
        fz:'',
      },  // 新增/编辑
      projectRules:{
        fz: [
          { required: true, message: '请输入附注', trigger: 'blur' }
        ],
      },
      engineeringType:[],//单位工程类型
      checkedRow:{},//选中的条
      gclx:'',
      uniProjectType:[],
      fileCategory:[],
      carrierType:[],
      secretGrade:[],
      specifications:[],
      language:[],
    }
  },
  created () {
    // this.getEngineeringTypeFun() // 工程类型
  },
  beforeMount(){
    this.getSecretGrade()  // 密级
    this.getCarrierType()  // 载体类型    
    this.getSpecifications()  // 规格
    this.getLanguage()  // 文种
    this.getStoragePeriod()  // 保管期限
  },
  mounted () {
    this.getCataloguefileListFun() //获取列表
  },
  methods: {
    CataloguesaveFun(){
      this.$refs.projectForm.validate((valid) => {
          if (valid) {
              const q = {
                file_id:this.checkedRow.file_id,
                fz:this.projectForm.fz,
              }
              console.log(q)
              submitCataloguefile(q).then(response =>{
                if (response.status === 200) {
                  const { data: res, message, status } = response.data
                  if (status !== 200) return this.message({ message: message, type: 'error' })
                  this.message({ message: message, type: 'success' })
                    this.dialogCatalogeFormVisible = false
                  }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    // 编辑弹层
    dialogCatalogeFormVisibleFun(name,row){ 
      console.log(row)
      this.checkedRow = row
      this.projectForm = {
        wjtm:row.wjtm,
        zrz:row.zrz,
        mj:row.mj,
        ztlx:row.ztlx,
        sl:row.sl,
        gg:row.gg,
        wz:row.wz,
        fz:row.fz,
      }
      this.dialogCatalogeFormVisible = true
    },
    //获取列表
    getCataloguefileListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        wjdh:this.queryInfo.wjdh,
        wjtm:this.queryInfo.wjtm,
      }
      getCataloguefileList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        console.log(this.fileCategory)
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getCataloguefileListFun()
         }
        res.list.map(v =>{
          this.secretGrade.forEach(t => {
              if (v.mj === t.bm) {
                v.mjName = t.mc
              }
              return
            })
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            this.language.forEach(t => {
              if (v.wz === t.bm) {
                v.wzName = t.mc
              }
              return
            })
            this.specifications.forEach(t => {
              if (v.gg === t.bm) {
                v.ggName = t.mc
              }
              return
            })
            this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
        })
        this.filesList = res.list
        }
      })
    },


  //查询案卷列表信息
    queryEngineering(){
      this.getCataloguefileListFun()
    },
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getCataloguefileListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getCataloguefileListFun()
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
    // 密级
    getSecretGrade() {
      const q = {
        bm: "MJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.secretGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 文件级载体类型
    getCarrierType() {
      const q = {
        bm: "WJJZTLX_DIC"
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

    // 规格
    getSpecifications() {
      const q = {
        bm: "WJGG_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.specifications  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 文种
    getLanguage() {
      const q = {
        bm: "WZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.language  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },

}
</script>

<style scoped lang='less'>
.rowStyle{
    background-color:#ecf5ff!important;
  }


</style>
<style lang="less">
.catalogueengineering {
  .btn{
  .el-form-item__content {
    width: 100% !important;
    text-align: center;
  }
      width:100%;
      margin-top:20px;
      margin-right:0;
      display: flex;
      justify-content: center;
    }
}

  .catalogueengineering {
    .el-form-item__content{
      width: 217px;
      }
  }
.catalogueengineering-title{
      display: flex !important;
      .el-form-item__content{
        flex: 1;
      }
    }
</style>
