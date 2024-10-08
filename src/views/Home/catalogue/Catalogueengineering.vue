<template>
  <div >
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案编目</el-breadcrumb-item>
      <el-breadcrumb-item>项目级编目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 检索栏 B -->
    <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="项目编号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入项目编号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入项目名称"  @change="queryEngineering"></el-input>
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
                prop="xmbh"
                show-overflow-tooltip
                label="项目编号"
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
                width="230">
              </el-table-column>
              <el-table-column
                prop="lxpzwh"
                show-overflow-tooltip
                label="立项批准文号"
                width="230">
              </el-table-column>
              <el-table-column
                prop="jsdw"
                show-overflow-tooltip
                label="建设单位"
                width="230">
              </el-table-column>
              <el-table-column
                prop="sgxkzh"
                show-overflow-tooltip
                label="施工许可证号"
                width="230">
              </el-table-column>
                 <el-table-column
                prop="ghxkzh"
                show-overflow-tooltip
                label="规划许可证号"
                width="230">
              </el-table-column>
              <el-table-column
                prop="gcdd"
                show-overflow-tooltip
                label="工程地点"
                width="230">
              </el-table-column>
               <el-table-column
                prop="fz"
                label="附注"
                width="230">
                <template slot-scope="scope">
                  <el-tooltip effect="light" :content="scope.row.fz" placement="top" :enterable="false">
                   <p> {{scope.row.fz}}</p>
                </el-tooltip>
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
      <el-form-item label="项目名称: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.gcmc" placeholder="请输入项目名称" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目类型: " >
      <el-select disabled v-model="projectForm.gclx" placeholder="请选择项目类型">
        <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="工程结算: ">
        <el-input v-model="projectForm.gcjs" placeholder="请输入工程结算" disabled></el-input>
      </el-form-item>
      <el-form-item label="工程总造价: ">
        <el-input v-model="projectForm.gczj" placeholder="请输入工程造价" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="施工许可证号: ">
        <el-input v-model="projectForm.sgxkzh" placeholder="请输入施工许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="总建筑面积: ">
        <el-input v-model="projectForm.zjzmj" placeholder="请输入总建筑面积" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
       <el-form-item label="总用地面积: ">
        <el-input v-model="projectForm.zydmj" placeholder="请输入总用地面积" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
      <el-form-item label="建设单位: ">
        <el-input v-model="projectForm.jsdw" placeholder="请输入建设单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目地点: ">
        <el-input v-model="projectForm.gcdd" placeholder="请输入项目地点" disabled></el-input>
      </el-form-item>
      <el-form-item label="勘察单位: ">
        <el-input v-model="projectForm.kcdw" placeholder="请输入勘察单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="设计单位: ">
        <el-input v-model="projectForm.sjdw" placeholder="请输入设计单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="监理单位: ">
        <el-input v-model="projectForm.jldw" placeholder="请输入监理单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="用地规划许可证号: ">
        <el-input v-model="projectForm.ydghxkzh" placeholder="请输入用地规划许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="立项批准文号: ">
        <el-input v-model="projectForm.lxpzwh" placeholder="请输入立项批准文号" disabled></el-input>
      </el-form-item>
      <el-form-item label="规划许可证号: ">
        <el-input v-model="projectForm.ghxkzh" placeholder="请输入规划许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="用地许可证号: ">
        <el-input v-model="projectForm.ydxkzh" placeholder="请输入用地许可证号" disabled></el-input>
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
  getCatalogueEngineeringList,
  submitCatalogueEngineering,

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
        gcmc:'',
        gclx:'',
        gcjs:'',
        sgxkzh:'',
        zjzmj:'',
        zydmj:'',
        jsdw:'',
        gcdd:'',
        kcdw:'',
        sjdw:'',
        jldw:'',
        ydghxkzh:'',
        lxpzwh:'',
        ghxkzh:'',
        ydxkzh:'',
        fz:'',
      },  // 新增/编辑
      projectRules:{
        fz: [
          { required: true, message: '请输入附注', trigger: 'blur' }
        ],
      },
      engineeringType:[],//单位工程类型
      checkedRow:{},//选中的条
    }
  },
  created () {
    this.getEngineeringTypeFun() // 工程类型
  },
  mounted () {
    this.getCatalogueEngineeringListFun() //获取列表
  },
  methods: {
    CataloguesaveFun(){
      this.$refs.projectForm.validate((valid) => {
          if (valid) {
              const q = {
                engineering_id:this.checkedRow.engineering_id,
                fz:this.projectForm.fz,
              }
              submitCatalogueEngineering(q).then(response =>{
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
        gcmc:row.gcmc,
        gclx:row.gclx,
        gcjs:row.gcjs,
        sgxkzh:row.sgxkzh,
        zjzmj:row.zjzmj,
        zydmj:row.zydmj,
        jsdw:row.jsdw,
        gcdd:row.gcdd,
        kcdw:row.kcdw,
        sjdw:row.sjdw,
        jldw:row.jldw,
        ydghxkzh:row.ydghxkzh,
        lxpzwh:row.lxpzwh,
        ghxkzh:row.ghxkzh,
        ydxkzh:row.ydxkzh,
        fz:row.fz,
      }
      console.log(this.projectForm)
      this.dialogCatalogeFormVisible = true
    },
    //获取列表
    getCatalogueEngineeringListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        gcmc:this.queryInfo.ajtm,
        xmbh:this.queryInfo.ajdh,
      }
      getCatalogueEngineeringList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        console.log(this.engineeringType)
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getCatalogueEngineeringListFun()
         }
        res.list.map(v =>{
          this.engineeringType.forEach(t => { //案卷类别
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
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
      this.getCatalogueEngineeringListFun()
    },
  //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getCatalogueEngineeringListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getCatalogueEngineeringListFun()
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
