<template>
  <div >
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案编目</el-breadcrumb-item>
      <el-breadcrumb-item>单位工程级编目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 检索栏 B -->
    <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="单位工程名称">
              <el-input clearable v-model="queryInfo.dwgcmc" placeholder="请输入单位工程名称"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="单位工程档号">
              <el-input clearable v-model="queryInfo.dwgcdh" placeholder="请输入单位工程档号"  @change="queryEngineering"></el-input>
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
                prop="dwgcdh"
                label="档号"
                width="230">
              </el-table-column>
              <el-table-column
                prop="dwgcmc"
                label="单位工程名称"
                width="300">
                 <template slot-scope="scope">
                  <el-tooltip effect="light" :content="scope.row.dwgcmc" placement="top" :enterable="false">
                   <p> {{scope.row.dwgcmc}}</p>
                  </el-tooltip>
                 </template>
              </el-table-column>
              <el-table-column
                prop="dwgclxName"
                label="单位工程类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="sgdw"
                label="施工单位"
                width="230">
              </el-table-column>
              <el-table-column
                prop="jglxName"
                label="结构类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="kgsj"
                label="开工日期"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.kgsj | formatDate}}
                </template>
              </el-table-column>
                 <el-table-column
                prop="jgsj"
                label="竣工日期"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.jgsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="lrsj"
                label="著入时间"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
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
      <el-form-item label="工程名称: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.dwgcmc" placeholder="请输入工程名称" disabled></el-input>
      </el-form-item>
      <el-form-item label="单位工程类型: " >
      <el-select disabled v-model="projectForm.dwgclx" placeholder="请选择单位工程类型">
        <el-option v-for="(item,index) in uniProjectType" :key="index" :label="item.type_name" :value="item.type_code"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="建筑面积: ">
        <el-input v-model="projectForm.jzmj" placeholder="请输入建筑面积" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
      <el-form-item label="工程地点: ">
        <el-input v-model="projectForm.gcdd" placeholder="请输入工程地点" disabled></el-input>
      </el-form-item>
      <el-form-item label="施工单位: ">
        <el-input v-model="projectForm.sgdw" placeholder="请输入施工单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="结构类型: ">
        <el-input v-model="projectForm.jglx" placeholder="请输入结构类型" disabled></el-input>
      </el-form-item>
       <el-form-item label="工程造价: ">
        <el-input  v-model="projectForm.gczj" placeholder="请输入工程造价" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="开工日期: ">
        <el-input v-model="projectForm.kgsj" placeholder="请输入开工日期" disabled></el-input>
      </el-form-item>
      <el-form-item label="竣工日期: ">
        <el-input v-model="projectForm.jgsj" placeholder="请输入竣工日期" disabled></el-input>
      </el-form-item>
      <el-form-item label="工程结算: ">
        <el-input v-model="projectForm.gcjs" placeholder="请输入工程结算" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
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
  getCatalogueProjectList,
  submitCatalogueProject,
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
        dwgcdh:'',
        dwgcmc:'',
        page_num:1,
        page_size:10,
      },
      filesList:[],//列表
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      dialogCatalogeFormVisible:false,//编辑弹层
      projectForm: {
        dwgcmc:'',
        dwgclx:'',
        dwgclxName:'',
        jzmj:'',
        gcdd:'',
        sgdw:'',
        jglx:'',
        gczj:'',
        kgsj:'',
        jgsj:'',
        gcjs:'',
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
    }
  },
  created () {
    // this.getEngineeringTypeFun() // 工程类型
  },
  beforeMount(){
    this.getUniProjectType()  // 单位工程类型
    this.getStructureType()
  },
  mounted () {
    this.getCatalogueProjectListFun() //获取列表
  },
  methods: {
    CataloguesaveFun(){
      this.$refs.projectForm.validate((valid) => {
          if (valid) {
              const q = {
                project_id:this.checkedRow.project_id,
                fz:this.projectForm.fz,
              }
              console.log(q)
              submitCatalogueProject(q).then(response =>{
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
        dwgcmc:row.dwgcmc,
        dwgclx:row.dwgclx,
        jzmj:row.jzmj,
        gcdd:row.gcdd,
        sgdw:row.sgdw,
        jglx:row.jglx,
        gczj:row.gczj,
        kgsj:row.kgsj,
        jgsj:row.jgsj,
        gcjs:row.gcjs,
        fz:row.fz,
      }
      console.log(this.projectForm)
      this.dialogCatalogeFormVisible = true
    },
    //获取列表
    getCatalogueProjectListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        dwgcmc:this.queryInfo.dwgcmc,
        dwgcdh:this.queryInfo.dwgcdh,
      }
      getCatalogueProjectList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        console.log(this.uniProjectType)
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getCatalogueProjectListFun()
         }
        res.list.map(v =>{
          this.uniProjectType.forEach(t => { 
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
            this.structureType.forEach(t => {
              if (v.jglx === t.bm) {
                v.jglxName = t.mc
              }
              return
            })
        })
        this.filesList = res.list
        }
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

  //查询案卷列表信息
    queryEngineering(){
      this.getCatalogueProjectListFun()
    },
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getCatalogueProjectListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getCatalogueProjectListFun()
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
        // 存储所有档案分类
    saveArchivesCateAll(res) {
      res.forEach(v => {
        this.uniProjectType.push(v)
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
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //     // 递归判断列表，把最后的child设为undefined
    // getTreeData(data) {
    //   for(var i = 0; i < data.length; i++){
    //     if(data[i].child.length < 1){
    //       // children若为空数组，则将children设为undefined
    //       data[i].child = undefined
    //     }else {
    //       // children若不为空数组，则继续 递归调用 本方法
    //       this.getTreeData(data[i].child)
    //     }
    //   }
    //   return data
    // },

    // // 单位工程类型
    // getUniProjectType() {
    //   getArchivesCateList().then(response => {
    //     if (response.status === 200) {
    //       const { data: res, message, status } = response.data
    //       if (status !== 200) return this.message({ message, type: 'error' })
    //       // this.uniProjectType  = res
    //       
    //       var newArr = []
    //       res.forEach(v => {
    //         newArr = newArr.concat(v.child)
    //         if (this.gclx === v.type_code) {
    //           this.uniProjectType = v.child
    //         }
    //         return
    //       })
    //       this.uniProjectType = this.getTreeData(newArr)
    //     }
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
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
