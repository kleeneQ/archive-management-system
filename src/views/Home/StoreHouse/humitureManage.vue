<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>库房管理</el-breadcrumb-item>
        <el-breadcrumb-item>温湿度管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-container>
        <el-main class="box-main">
          <el-card class="box-main-card" style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="24">
                <!--查询 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item label="库房号">
                    <el-input clearable v-model="queryInfo.house_num" placeholder="请输入库房号" @change="StoreHouseHumidityListFun"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="StoreHouseHumidityListFun()">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
              <div class="eltablebox">
               <el-col>
                 <!-- 新增温湿度记录 B -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="showDialogaddHumidityFun('新增')">新增温湿度记录</el-button>
                  </el-form-item>
                </el-form>
              </el-col> 
              <!-- 新增温湿度记录 E -->
              
            <!-- 温湿度记录列表 B-->
            <el-table
              :data="HumidityList"
              key="three"
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
                prop="house_num"
                label="库房号"
                width="250">
              </el-table-column>
              <el-table-column
                prop="record_day"
                label="日期"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.record_day | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="weather_condition"
                label="天气情况"
                width="200">
              </el-table-column>
              <el-table-column
                prop="morning_temperature"
                label="上午温度"
                width="200">
              </el-table-column>
              <el-table-column
                prop="morning_humidity"
                label="上午湿度"
                width="200">
              </el-table-column>
              <el-table-column
                prop="afternoon_temperature"
                label="下午温度"
                width="200">
              </el-table-column>
              <el-table-column
                prop="afternoon_humidity"
                label="下午湿度"
                width="200">
              </el-table-column>
              <el-table-column
                prop="measures"
                label="措施"
                width="300">
              </el-table-column>
              <el-table-column
                prop="effect"
                label="效果"
                width="300">
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="备注"
                width="300">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="登记日期"
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit"  @click="showDialogHumidityFun('编辑', scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="removeHumidityFun(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
             <!-- 温湿度记录列表 E-->
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
    <!-- 新增温湿度记录 弹层 B -->
    <el-dialog :title="dialogHumidityFormVisibletitle+'温湿度记录'" :visible.sync="dialogHumidityFormVisible" width="70%">
    <el-form class="Medicate" :inline="true" :model="HumidityForm" ref="HumidityFormRef" label-width="100px">
      <el-form-item label="库房号: " class="Medicate-title">
        <el-input clearable v-model="HumidityForm.house_num" placeholder="请填写库房号"></el-input>
      </el-form-item>
      <el-form-item label="记录日期: ">
        <el-date-picker
          v-model="HumidityForm.record_day"
          type="date"
          placeholder="请选择记录日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="天气情况: " class="weather_condition_style">
        <el-input v-model="HumidityForm.weather_condition" placeholder="请填写天气情况" clearable></el-input>
      </el-form-item>
     <el-form-item label="上午温湿度: " class="Humidity-title">
        <el-input v-model="HumidityForm.morning_temperature" placeholder="请填写温度" clearable></el-input>
        <el-input v-model="HumidityForm.morning_humidity" placeholder="请填写湿度" clearable></el-input>
      </el-form-item>
      <el-form-item label="下午温湿度: " class="Humidity-title">
        <el-input v-model="HumidityForm.afternoon_temperature" placeholder="请填写温度" clearable></el-input>
        <el-input v-model="HumidityForm.afternoon_humidity" placeholder="请填写湿度" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="投放库房: ">
        <el-select v-model="HumidityForm.delivery_ware_house" placeholder="请选择投放库房" clearable>
          <el-option
            v-for="item in LibraryList"
            :key="item.library_id"
            :label="item.library_code"
            :value="item.library_code">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="措施: " class="Medicate-title">
        <el-input v-model="HumidityForm.measures" placeholder="请填写措施" clearable></el-input>
      </el-form-item>
      <el-form-item label="效果: " class="Medicate-title">
        <el-input v-model="HumidityForm.effect" placeholder="请填写效果" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注: " class="Medicate-title">
        <el-input v-model="HumidityForm.remarks" placeholder="请填写备注" clearable></el-input>
      </el-form-item>
      <el-form-item class="btnstyle">
        <el-button @click="dialogHumidityFormVisible = false">取消</el-button>
        <el-button type="primary" v-if="dialogHumidityFormVisibletitle == '新增'" @click="saveHumidityFormFun">保存</el-button>
        <el-button type="primary" v-if="dialogHumidityFormVisibletitle == '编辑'" @click="UpdateHumidityFormFun">保存</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 新增温湿度记录 弹层 E -->
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
  StoreHouseHumidityList,
  StoreHouseHumiditySave,
  StoreHouseHumidityDelete,
  StoreHouseHumidityUpdate,
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
      queryInfo:{ //查询获取温湿度列表
        page_num: 1,
        page_size: 10,
        house_num:'',
      },
      HumidityList:[],//温湿度记录列表数据
      dialogHumidityFormVisible:false,//新增 温湿度记录 弹层
      HumidityForm:{
        humidity_id:'',
        house_num:'',
        record_day:'',
        weather_condition:'',
        morning_temperature:'',
        morning_humidity:'',
        afternoon_temperature:'',
        afternoon_humidity:'',
        measures:'',
        effect:'',
        remarks:'',
      },
      LibraryList:[],//库房列表
      dialogHumidityFormVisibletitle:'',//新增、修改  弹层名称
    }
  },
  mounted () {
    this.StoreHouseHumidityListFun()
    this.StoreHouseLibraryListFun()
  },
  methods: {
    //保存修改 温湿度记录
    UpdateHumidityFormFun(){
        StoreHouseHumidityUpdate(this.HumidityForm).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.message({ message: message, type: 'success' })
        this.StoreHouseHumidityListFun()
        this.dialogHumidityFormVisible = false
        this.HumidityForm={}
        this.HumidityForm={  //重置表单
            humidity_id:'',
            house_num:'',
            record_day:'',
            weather_condition:'',
            morning_temperature:'',
            morning_humidity:'',
            afternoon_temperature:'',
            afternoon_humidity:'',
            measures:'',
            effect:'',
            remarks:'',
          }
        }
      })
    },
    //编辑温湿度记录 弹层
    showDialogHumidityFun(name,row){
      console.log(row)
      this.dialogHumidityFormVisibletitle = name
      this.HumidityForm={}
      this.HumidityForm={  //重置表单
          humidity_id:row.humidity_id,
          house_num:row.house_num,
          record_day:row.record_day,
          weather_condition:row.weather_condition,
          morning_temperature:row.morning_temperature,
          morning_humidity:row.morning_humidity,
          afternoon_temperature:row.afternoon_temperature,
          afternoon_humidity:row.afternoon_humidity,
          measures:row.measures,
          effect:row.effect,
          remarks:row.remarks,
        }
      this.dialogHumidityFormVisible = true
    },
    //删除温湿度记录
    removeHumidityFun(row){
      console.log(row)
      const q = {
        humidity_id:row.humidity_id
      }
     this.$confirm('确定将该条信息删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              StoreHouseHumidityDelete(q).then(response => {
              if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
               this.StoreHouseHumidityListFun()
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
    //新增温湿度记录 提交表单 
  saveHumidityFormFun(){
    if(this.HumidityForm.house_num ===''
        &&this.HumidityForm.record_day===''
        &&this.HumidityForm.weather_condition===''
        &&this.HumidityForm.morning_temperature===''
        &&this.HumidityForm.morning_humidity===''
        &&this.HumidityForm.afternoon_temperature===''
        &&this.HumidityForm.afternoon_humidity===''
        &&this.HumidityForm.measures===''
        &&this.HumidityForm.effect===''
        &&this.HumidityForm.remarks==='') return this.message({ message: '请填写记录内容', type: 'error' })
    StoreHouseHumiditySave(this.HumidityForm).then(response =>{
      
      if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
      this.message({ message: message, type: 'success' })
      this.dialogHumidityFormVisible = false
      this.StoreHouseHumidityListFun()
      this.HumidityForm={}
      this.HumidityForm={  //重置表单
            humidity_id:'',
            house_num:'',
            record_day:'',
            weather_condition:'',
            morning_temperature:'',
            morning_humidity:'',
            afternoon_temperature:'',
            afternoon_humidity:'',
            measures:'',
            effect:'',
            remarks:'',
        }
      }
    })
  },
  
  //新增温湿度记录  弹层
    showDialogaddHumidityFun(name){
      this.dialogHumidityFormVisibletitle = name
      this.dialogHumidityFormVisible = true
      this.HumidityForm={}
      this.HumidityForm={  //重置表单
            humidity_id:'',
            house_num:'',
            record_day:'',
            weather_condition:'',
            morning_temperature:'',
            morning_humidity:'',
            afternoon_temperature:'',
            afternoon_humidity:'',
            measures:'',
            effect:'',
            remarks:'',
        }
    },
  //获取温湿度记录列表
    StoreHouseHumidityListFun(){
      const q = { //查询获取温湿度列表
        page_num: 1,
        page_size: 10,
        house_num:this.queryInfo.house_num,
      }
      StoreHouseHumidityList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
          this.total = res.total
          this.HumidityList = res.list
          if (res.list.length === 0 && res.pageNum>1) {
            this.queryInfo.page_num = 1
            this.currentPage = 1
            this.StoreHouseHumidityListFun()
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
      StoreHouseHumidityList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
          this.total = res.total
          this.HumidityList = res.list
        }
      })
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      StoreHouseHumidityList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
          this.total = res.total
          this.HumidityList = res.list
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
    .Humidity-title {
      width:100%;
      .el-form-item__content {
        width: 74% !important;
        .el-input {
          width: 48% !important;
          margin-right: 2%;
        }
      }
    }
    .weather_condition_style {
      width: 58%;
      .el-form-item__content {
        width: 80%;
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
