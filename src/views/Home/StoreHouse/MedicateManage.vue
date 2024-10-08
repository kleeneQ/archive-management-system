<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>库房管理</el-breadcrumb-item>
        <el-breadcrumb-item>投药管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-container>
        <el-main class="box-main">
          <el-card class="box-main-card" style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="24">
                <!--查询 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item label="投放库房">
                    <el-input clearable v-model="queryInfo.delivery_ware_house" placeholder="请输入投放库房" @change="StoreHouseMedicateListFun"></el-input>
                  </el-form-item>
                  <el-form-item label="投放人员">
                    <el-input clearable v-model="queryInfo.delivery_personnel" placeholder="请输入投放人员" @change="StoreHouseMedicateListFun"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="StoreHouseMedicateListFun()">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
              <div class="eltablebox">
               <el-col>
                 <!-- 新增投药记录 B -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="showDialogaddMedicateFun('新增')">新增投药记录</el-button>
                  </el-form-item>
                </el-form>
              </el-col> 
              <!-- 新增投药记录 E -->
              
            <!-- 投药记录列表 B-->
            <el-table
              :data="MedicateList"
              border
              style="width: 100%"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                fixed
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="drug_name"
                label="药品名称"
                width="250">
              </el-table-column>
              <el-table-column
                prop="record_day"
                label="投放日期"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.record_day | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="delivery_volume"
                label="投放量"
                width="200">
              </el-table-column>
              <el-table-column
                prop="delivery_personnel"
                label="投放人员"
                width="200">
              </el-table-column>
              <el-table-column
                prop="delivery_ware_house"
                label="投放库房"
                width="200">
              </el-table-column>
              <el-table-column
                prop="delivery_position"
                label="投放位置"
                width="200">
              </el-table-column>
              <el-table-column
                prop="delivery_effect"
                label="投放效果"
                width="200">
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="备注"
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit"  @click="showDialogMedicateFun('编辑', scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="removeMedicateFun(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
             <!-- 投药记录列表 E-->
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

            </div>
          </el-card>
        </el-main>
      </el-container>
    </div>
    <!-- 新增投药记录 弹层 B -->
    <el-dialog :title="dialogMedicateFormVisibletitle+'投药记录'" :visible.sync="dialogMedicateFormVisible" width="70%">
    <el-form class="Medicate" :inline="true" :model="MedicateForm" ref="MedicateFormRef" label-width="100px">
      <el-form-item label="药品名称: " class="Medicate-title">
        <el-input clearable v-model="MedicateForm.drug_name" placeholder="请输入药品名称"></el-input>
      </el-form-item>
      <el-form-item label="投放日期: ">
        <el-date-picker
          v-model="MedicateForm.record_day"
          type="date"
          placeholder="请选择投放日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="投放量: ">
        <el-input v-model="MedicateForm.delivery_volume" placeholder="请输入投放量" clearable></el-input>
      </el-form-item>
     <el-form-item label="投放人员: ">
        <el-input v-model="MedicateForm.delivery_personnel" placeholder="请输入投放人员" clearable></el-input>
      </el-form-item>
      <el-form-item label="投放库房: ">
        <el-select v-model="MedicateForm.delivery_ware_house" placeholder="请选择投放库房" clearable>
          <el-option
            v-for="item in LibraryList"
            :key="item.library_id"
            :label="item.library_code"
            :value="item.library_code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放位置: ">
        <el-input v-model="MedicateForm.delivery_position" placeholder="请输入投放位置" clearable></el-input>
      </el-form-item>
      <el-form-item label="投放效果: ">
        <el-input v-model="MedicateForm.delivery_effect" placeholder="请输入投放效果" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注: " class="Medicate-title">
        <el-input v-model="MedicateForm.remarks" placeholder="请输入备注" clearable></el-input>
      </el-form-item>
      <el-form-item class="btnstyle">
        <el-button @click="dialogMedicateFormVisible = false">取消</el-button>
        <el-button type="primary" v-if="dialogMedicateFormVisibletitle == '新增'" @click="saveMedicateFormFun">保存</el-button>
        <el-button type="primary" v-if="dialogMedicateFormVisibletitle == '编辑'" @click="UpdateMedicateFormFun">保存</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 新增投药记录 弹层 E -->
  </div>
</template>

<script>
import {
  StoreHouseStatusListTreeId,
  StoreHouseStatusLibraryStatusCabinet,
  StoreHouseStatusLibraryStatusColumn,
  StoreHouseStatusLibraryStatusLayer,
  StoreHouseStatusLibraryStatusBox,
  StoreHouseStatusListBox,
  StoreHouseMedicateList, 
  StoreHouseMedicateSave,
  StoreHouseMedicateDelete,
  StoreHouseMedicateUpdate,
} from "@/api/StoreHouse/StoreHouseStatus"
import {
  StoreHouseListSide,
  StoreHouseLibraryList,
  StoreHouseLibrarySave,
  StoreHouseLibraryDelete,
  StoreHouseLibraryUpdate,
  StoreHouseListTreeId,
  StoreHouseCabinetSave,
  StoreHouseCabinetDelete,
  StoreHouseCabinetUpdate,
  
} from "@/api/StoreHouse/LibraryManage"
export default {
  data () {
    return {
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{ //查询获取投药列表
        page_num: 1,
        page_size: 10,
        delivery_ware_house:'',
        delivery_personnel:'',
      },
      MedicateList:[],//投药记录列表数据
      dialogMedicateFormVisible:false,//新增 投药记录 弹层
      MedicateForm:{
        medicate_id:'',
        remarks:'',
        record_day:'',
        drug_name:'',
        delivery_volume:'',
        delivery_personnel:'',
        delivery_ware_house:'',
        delivery_position:'',
        delivery_effect:'',
      },
      LibraryList:[],//库房列表
      dialogMedicateFormVisibletitle:'',//新增、修改  弹层名称
    }
  },
  mounted () {
    this.StoreHouseMedicateListFun()
    this.StoreHouseLibraryListFun()
  },
  methods: {
    //保存修改 投药记录
    UpdateMedicateFormFun(){
        StoreHouseMedicateUpdate(this.MedicateForm).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.message({ message: message, type: 'success' })
        this.StoreHouseMedicateListFun()
        this.dialogMedicateFormVisible = false
        this.MedicateForm={}
        this.MedicateForm={  //重置表单
            medicate_id:'',
            remarks:'',
            record_day:'',
            drug_name:'',
            delivery_volume:'',
            delivery_personnel:'',
            delivery_ware_house:'',
            delivery_position:'',
            delivery_effect:'',
          }
        }
      })
    },
    //编辑投药记录 弹层
    showDialogMedicateFun(name,row){
      console.log(row)
      this.dialogMedicateFormVisibletitle = name
      this.MedicateForm={}
      this.MedicateForm={  //重置表单
          medicate_id:row.medicate_id,
          remarks:row.remarks,
          record_day:row.record_day,
          drug_name:row.drug_name,
          delivery_volume:row.delivery_volume,
          delivery_personnel:row.delivery_personnel,
          delivery_ware_house:row.delivery_ware_house,
          delivery_position:row.delivery_position,
          delivery_effect:row.delivery_effect,
        }
      this.dialogMedicateFormVisible = true
    },
    //删除投药记录
    removeMedicateFun(row){
      console.log(row)
      const q = {
        medicate_id:row.medicate_id
      }
     this.$confirm('确定将该条信息删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              StoreHouseMedicateDelete(q).then(response => {
              if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
               this.StoreHouseMedicateListFun()
              this.message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //新增投药记录 提交表单 
  saveMedicateFormFun(){
    if(this.MedicateForm.remarks ===''
        &&this.MedicateForm.record_day===''
        &&this.MedicateForm.drug_name===''
        &&this.MedicateForm.delivery_volume===''
        &&this.MedicateForm.delivery_personnel===''
        &&this.MedicateForm.delivery_ware_house===''
        &&this.MedicateForm.delivery_position===''
        &&this.MedicateForm.delivery_effect==='') return this.message({ message: '请填写记录内容', type: 'error' })
    StoreHouseMedicateSave(this.MedicateForm).then(response =>{
      
      if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      this.message({ message: message, type: 'success' })
      this.dialogMedicateFormVisible = false
      this.StoreHouseMedicateListFun()
      this.MedicateForm={}
      this.MedicateForm={  //重置表单
          medicate_id:'',
          remarks:'',
          record_day:'',
          drug_name:'',
          delivery_volume:'',
          delivery_personnel:'',
          delivery_ware_house:'',
          delivery_position:'',
          delivery_effect:'',
        }
      }
    })
  },
  
  //新增投药记录  弹层
    showDialogaddMedicateFun(name){
      this.dialogMedicateFormVisibletitle = name
      this.dialogMedicateFormVisible = true
      this.MedicateForm={}
      this.MedicateForm={  //重置表单
          medicate_id:'',
          remarks:'',
          record_day:'',
          drug_name:'',
          delivery_volume:'',
          delivery_personnel:'',
          delivery_ware_house:'',
          delivery_position:'',
          delivery_effect:'',
        }
    },
  //获取投药记录列表
    StoreHouseMedicateListFun(){
      const q = { //查询获取投药列表
        page_num: 1,
        page_size: 10,
        delivery_ware_house:this.queryInfo.delivery_ware_house,
        delivery_personnel:this.queryInfo.delivery_personnel,
      }
      StoreHouseMedicateList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
          this.total = res.total
          this.MedicateList = res.list
          if (res.list.length === 0 && res.pageNum>1) {
            this.queryInfo.page_num = 1
            this.currentPage = 1
            this.StoreHouseMedicateListFun()
            return
          }
        }
      })
    },
    //获取库房列表
    StoreHouseLibraryListFun(){
        const q = { 
          page_num: 1,
          page_size: 10,
        }
      StoreHouseLibraryList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.LibraryList = res.list
        }
      })
    },
    // 每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      StoreHouseMedicateList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
          this.total = res.total
          this.MedicateList = res.list
        }
      })
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      StoreHouseMedicateList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
          this.total = res.total
          this.MedicateList = res.list
        }
      })

    }, 
      // 关闭弹层
    dialogClosed() {
      this.dialogaddLibraryManageFormVisible = false
      this.StoreHouseLibraryListFun()
    },


  },
}
</script>
<style lang="less">
    .Medicate-title{
      width:100%;
      .el-form-item__content {
        width: 76% !important;
      }
    }
</style>
<style scoped lang='less'>
  .btnstyle {
    width: 100%;
    text-align: center;
  }
  .box-card {
    width: 100%;
    .box-main-card {
      margin-bottom: 10px !important;
    }
  }
</style>
