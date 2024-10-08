<template>
  <div >
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案编目</el-breadcrumb-item>
      <el-breadcrumb-item>案卷级编目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 检索栏 B -->
    <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷名称">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷名称"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号"  @change="queryEngineering"></el-input>
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
                prop="ajtm"
                label="案卷题名"
                width="300">
                 <template slot-scope="scope">
                  <el-tooltip effect="light" :content="scope.row.ajtm" placement="top" :enterable="false">
                   <p> {{scope.row.ajtm}}</p>
                  </el-tooltip>
                 </template>
              </el-table-column>
              <el-table-column
                prop="ajlbName"
                label="案卷类别"
                width="230">
              </el-table-column>
              <el-table-column
                prop="sgdw"
                label="移交单位"
                width="230">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="qssj"
                label="起始时间"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.qssj | formatDate}}
                </template>
              </el-table-column>
                 <el-table-column
                prop="zzsj"
                label="终止时间"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.zzsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="ajsxh"
                label="案卷顺序号"
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
      <el-form-item label="案卷题名: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.ajtm" placeholder="请输入案卷题名" disabled></el-input>
      </el-form-item>
      <el-form-item label="移交单位: ">
        <el-input v-model="projectForm.yjdw" placeholder="请输入移交单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="案卷类别: " >
      <el-select disabled v-model="projectForm.ajlb" placeholder="请选择案卷类别">
        <el-option v-for="(item,index) in fileCategory" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="起始时间: ">
        <el-input v-model="projectForm.qssj" placeholder="请输入起始时间" disabled></el-input>
      </el-form-item>
      <el-form-item label="终止时间: ">
        <el-input v-model="projectForm.zzsj" placeholder="请输入终止时间" disabled></el-input>
      </el-form-item>
      <el-form-item label="保管期限: ">
      <el-select disabled v-model="projectForm.bgqx" placeholder="请选择保管期限">
        <el-option v-for="(item,index) in storagePeriod" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="密级: ">
      <el-select disabled v-model="projectForm.mj" placeholder="请选择密级">
        <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
       </el-form-item>
      <el-form-item label="载体类型: ">
      <el-select disabled v-model="projectForm.ztlx" placeholder="请选择载体类型">
        <el-option v-for="(item,index) in carrierType" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="责任者: ">
        <el-input v-model="projectForm.zrz" placeholder="请输入责任者" disabled></el-input>
      </el-form-item>
      <el-form-item label="案卷顺序号: ">
        <el-input v-model="projectForm.ajsxh"  oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入案卷顺序号" disabled></el-input>
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
  getCataloguefilesList,
  submitCataloguefiles,
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
        ajtm:'',
        ajdh:'',
        page_num:1,
        page_size:10,
      },
      filesList:[],//列表
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      dialogCatalogeFormVisible:false,//编辑弹层
      projectForm: {
        ajdh:'',
        ajtm:'',
        ajlb:'',
        yjdw:'',
        ztlx:'',
        qssj:'',
        zzsj:'',
        ajsxh:'',
        mj:'',
        zrz:'',
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
      storagePeriod: [], // 保管期限
      secretGrade: [], // 密级
    }
  },
  created () {
    // this.getEngineeringTypeFun() // 工程类型
  },
  beforeMount(){
      this.getCarrierType()  // 载体类型  
      this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.getCarrierType()  // 载体类型    
  },
  mounted () {
    this.getCataloguefilesListFun() //获取列表
  },
  methods: {
    CataloguesaveFun(){
      this.$refs.projectForm.validate((valid) => {
          if (valid) {
              const q = {
                files_id:this.checkedRow.files_id,
                fz:this.projectForm.fz,
              }
              console.log(q)
              submitCataloguefiles(q).then(response =>{
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
        ajdh:row.ajdh,
        ajtm:row.ajtm,
        ajlb:row.ajlb,
        yjdw:row.yjdw,
        ztlx:row.ztlx,
        qssj:row.qssj,
        zzsj:row.zzsj,
        ajsxh:row.ajsxh,
        mj:row.mj,
        zrz:row.zrz,
        fz:row.fz,
      }
      this.dialogCatalogeFormVisible = true
    },
    //获取列表
    getCataloguefilesListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        ajdh:this.queryInfo.ajdh,
        ajtm:this.queryInfo.ajtm,
      }
      getCataloguefilesList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        console.log(this.fileCategory)
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getCataloguefilesListFun()
         }
        res.list.map(v =>{
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
        })
        this.filesList = res.list
        }
      })
    },
  //查询案卷列表信息
    queryEngineering(){
      this.getCataloguefilesListFun()
    },
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getCataloguefilesListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getCataloguefilesListFun()
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

    // 结构类型
    getStructureType() {
      const q = {
        bm: "JGLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.structureType  = res
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
       // 案卷级载体类型
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
