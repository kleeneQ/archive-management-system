<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>库房管理</el-breadcrumb-item>
        <el-breadcrumb-item>库房管理</el-breadcrumb-item>
    </el-breadcrumb>

     <div class=" main-card-height">
       <el-container>
        <el-aside width="290px" class="main-elasidemaxheigth">
          <el-card class="box-card">
            <!-- current-node-key  当前选中的节点 -->
            <!-- accordion  是否每次只打开一个同级树节点展开 -->
            <!-- <p class="getisActivestyle" @click="isActive = '0'">库房列表</p> -->
            <el-tree
              class="eltreestyle"
              :data="treeData"
              :props="defaultProps"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              ref="tree"
              node-key="treeId"
            ></el-tree>
          </el-card>
        </el-aside>
        <!-- 列表区 B-->
        <el-main class="box-main">
          <el-card>
            
              <div class="eltablebox">
                <!-- 新增库房 B -->
               <el-col>
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === '0'">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="addLibraryManageFun('新增库房')">新增库房</el-button>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" v-if="isActive === '1'">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogaddCabinetFormVisibleFun('新增库柜')">新增库柜</el-button>
                  </el-form-item>
                </el-form>
                
              </el-col> 
              <!-- 新增库房 E -->
          <div v-if="isActive === '0'">库房信息</div>
            <!-- 库房列表 B-->
            <el-table
              :data="LibraryList"
              key="one"
              border
              style="width: 100%"
              v-if="isActive === '0'"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
    
              <el-table-column
              align="center"
                prop="library_code"
                label="库房编号"
                width="400">
              </el-table-column>
              <el-table-column
              align="center"
                prop="library_name"
                label="库房名称"
                min-width="400"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="添加时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.create_time | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button  class="btnedit" type="primary" size="small" @click="UpdateLibraryManageFun('库房编辑', scope.row)">库房编辑</el-button>
                  <el-button  type="danger" size="small" @click="StoreHouseLibraryDeleteFun('库房', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <!-- 库房列表 E-->
          <div v-if="isActive === '1'">库柜信息</div>
          <!-- 库柜列表 B-->
            <el-table
              :data="Cabinetlistdata"
              key="one"
              border
              style="width: 100%"
              v-if="isActive === '1'"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
    
              <el-table-column
              align="center"
                prop="cabinet_code"
                label="库柜编号"
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="cabinet_name"
                label="库柜名称"
                min-width="300"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="添加时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.create_time | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button  class="btnedit" type="primary" size="small" @click="dialogCabinetUpdateFormVisibleFun('库柜编辑', scope.row)">库柜编辑</el-button>
                  <el-button  type="danger" size="small" @click="StoreHouseLibraryDeleteFun('库柜', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <!-- 库柜列表 E-->
     <!-- 列-列表 B-->
            <div v-if="isActive === '2'">列信息</div>
            <el-table
              :data="Cabinetlistdata"
              border
              style="width: 100%"
              v-if="isActive === '2'"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
    
              <el-table-column
              align="center"
                prop="column_code"
                label="列编号"
                min-width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="添加时间"
                min-width="300"
              >
              </el-table-column>
            </el-table>
          <!-- 列-列表 E-->

     <!-- 层-列表 B-->
            <div v-if="isActive === '3'">层信息</div>
            <el-table
              :data="Cabinetlistdata"
              border
              style="width: 100%"
              v-if="isActive === '3'"
                            :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
    
              <el-table-column
              align="center"
                prop="layer_code"
                label="层编号"
                min-width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="layer_wide"
                label="层宽（mm）"
                min-width="300"
              >
              </el-table-column>
                            <el-table-column
              align="center"
                prop="layer_un_use_wide"
                label="预计可使用数"
                min-width="300"
              >
              <template slot-scope="scope">
                  {{Math.floor(scope.row.layer_un_use_wide/5)}}~ {{Math.floor(scope.row.layer_un_use_wide/3)}}
                </template>
              </el-table-column>
            </el-table>
          <!-- 层-列表 E-->

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
         <!-- 列表区 E-->
      </el-container>   
    </div>

  <!-- 新增库房 B -->
      <el-dialog 
      title="新增库房" 
      :visible.sync="dialogaddLibraryManageFormVisible"
       width="850px"
       @close="dialogClosed"
       >
         <div class="addLibraryManageFormStyle">
           <div class="addLibraryManageFormStyleTitle clearfix">
             <div> <i class="bitianxiangicon"></i> 库房编号</div>
             <div>库房名称</div>
           </div>
              <el-form :model="addLibraryManageForm" >
                <el-form-item
                    v-for="(domain,index) in dynamicValidataForm.domains"
                    :key="domain.key"
                  >
                    <el-input v-model="domain.kfbh" class="almf_input" placeholder="请输入库房编号"></el-input>
                    <el-input v-model="domain.kfmc" class="almf_input" placeholder="请输入库房名称"></el-input>
                    <el-button v-if="dynamicValidataForm.domains.length > 1" style="margin-left:10px"  type="danger"  @click.prevent="removeDomain(domain)"><i class="el-icon-delete-solid"></i></el-button>
                    <el-button v-if="index+1 == dynamicValidataForm.domains.length && dynamicValidataForm.domains.length !== 0" @click="addDomain"><i class="el-icon-plus"></i></el-button>
                </el-form-item>
              </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogaddLibraryManageFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLibraryManageFormSubmit(dynamicValidataForm.domains)">提 交</el-button>
        </div>
      </el-dialog>
  <!-- 新增库房 E -->

  <!-- 编辑库房 B -->
    <el-dialog title="编辑库房" width="40%" :visible.sync="dialogLibraryUpdateFormVisible">
      <el-form :model="LibraryUpdateform" label-width="100px">
        <el-form-item label="库房编号：" >
          <el-input v-model="LibraryUpdateform.kfbh" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="库房名称：">
          <el-input v-model="LibraryUpdateform.kfmc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLibraryUpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="StoreHouseLibraryUpdateFun">确 定</el-button>
      </div>
    </el-dialog>
  <!-- 编辑库房 E -->

  <!-- 新增库柜 B -->
      <el-dialog 
      title="新增库柜" 
      :visible.sync="dialogaddCabinetFormVisible"
       width="69%"
       @close="dialogClosed"
       >
         <div class="addCabinetFormStyle">
           <div class="addCabinetFormStyleTitle clearfix">
             
             <div>库柜编号</div>
             <div>库柜名称</div>
             <div>列总数</div>
             <div>单列总层数</div>
             <div>单层宽（mm）</div>
           </div>
              <el-form :model="addCabinetForm" :rules="rules" ref="ruleForm" >
                <el-form-item
                    v-for="(domain,index) in addCabinetinputlist"
                    :key="domain.key"
                  >
                    <el-input v-model="domain.kgbh" class="almf_input" placeholder="请输入库柜编号"></el-input>
                    <el-input v-model="domain.kgmc" class="almf_input" placeholder="请输入库柜名称"></el-input>
                    <el-input v-model="domain.kgzls" class="almf_input" placeholder="请输入库柜列总数(小于10)" 
                    type="number"
                    :controls="false" 
                    oninput="if(value){value=value.replace(/[^\d]/g,'')} if(value<=0){value=0} if(value>10){value=10}"
                    ></el-input>
                    <el-input v-model="domain.kgdlzcs" class="almf_input" placeholder="请输入库柜单列总层数(小于10)"
                    type="number"
                    :controls="false" 
                    oninput="if(value){value=value.replace(/[^\d]/g,'')} if(value<=0){value=0} if(value>10){value=10}"
                   
                    ></el-input>
                    <el-input v-model="domain.kgdck" class="almf_input" placeholder="请输入库柜单层宽（mm）"
                       type="number"
                    :controls="false" 
                    oninput="if(value){value=value.replace(/[^\d]/g,'')} if(value<=0){value=0} if(value>2000){value=2000}"
                   
                    ></el-input>
                    <div class="addbtnstyle">
                      <el-button style="margin-left:10px"  type="danger"  @click.prevent="removeCabinetDomain(domain)"><i class="el-icon-delete-solid"></i></el-button>
                      <el-button v-if="index+1 == addCabinetinputlist.length" @click="addCabinetDomain"><i class="el-icon-plus"></i></el-button>
                    </div>
                </el-form-item>
              </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogaddCabinetFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCabinetFormFun(addCabinetinputlist)">提 交</el-button>
        </div>
      </el-dialog>
  <!-- 新增库柜 E -->

  <!-- 编辑库柜 B -->
    <el-dialog title="编辑库柜" width="40%" :visible.sync="dialogCabinetUpdateFormVisible">
      <el-form :model="CabinetUpdateform" label-width="100px">
        <el-form-item label="库柜编号：" >
          <el-input v-model="CabinetUpdateform.kgbh" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="库柜名称：">
          <el-input v-model="CabinetUpdateform.cabinet_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCabinetUpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="StoreHouseCabinetUpdateFun">确 定</el-button>
      </div>
    </el-dialog>
  <!-- 编辑库柜 E -->

  </div>
</template>

<script>
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
import {
  parseTime,
  modifiTrees,
  moveUp,
  moveDown
} from "@/utils/index"
export default {
  data () {
    const NumberPattern = new RegExp(/^([1-9]?\d|10)$/);
    return {
      record_id:'',//记录ID
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo: {
        page_num:1,
        page_size:10,
        tree_id:'0',
      },//新增库房列表参数
      treeData: [],  // 左侧树  库房管理
      defaultProps: {  //库房管理  左侧树 
        children: 'children',
        label: 'label'
      },
      LibraryList:[],//库房列表数据
      isActive:'0',//显示状态
      dialogaddLibraryManageFormVisible:false,//新增库房弹层
      addLibraryManageForm:{ //新增库房表单
        kfbh:'',
        kfmc:'',
      },
      gridData:[
        {
          kfbh:'',
          kfmc:'',
        }
      ],
      dynamicValidataForm: {  //循环增加录入表单input
       domains: [{
         kfbh: '',
         kfmc: ''
       }],
     },
     dialogLibraryUpdateFormVisible:false,//库房编辑  弹层
     LibraryUpdateform://库房编辑 提交表单
       {
         kfbh:'',
         kfmc:'',
         library_row:'',
       },
      Cabinetlistdata:[],//选中库后下面的柜数据
      dialogaddCabinetFormVisible:false,//新增库柜 弹层
      addCabinetinputlist:[ //新增库柜信息条数 
        {
          kgbh:'',
          kgmc:'',
          kgzls:'',
          kgdlzcs:'',
          kgdck:'',
        }
      ],
      addCabinetForm:{ //新增库柜信息提交表单
        kgbh:'',
        kgmc:'',
        kgzls:'',
        kgdlzcs:'',
        kgdck:'',
      },
      dialogCabinetUpdateFormVisible:false,// 编辑库柜 弹层
      CabinetUpdateform:// 编辑库柜 提交表单
       {
         kgbh:'',
         cabinet_name:'',
         record_id:'',
       },
       rules: { //表单校验
          AuditTemplatename: [
            { required: true, message: '请选择审核流程名称', trigger: 'change' }
          ],
      },
    }

  },
  components: {
    
  },
  mounted () {
    this.StoreHouseListSideFun() // 获取库房管理侧边栏数据
    this.StoreHouseLibraryListFun() // 获取库房列表数据

  },
  methods: {
    // 编辑库柜弹层
    dialogCabinetUpdateFormVisibleFun(name,row){
      console.log(row)
      this.dialogCabinetUpdateFormVisible = true
      this.CabinetUpdateform.kgbh = row.cabinet_code
      this.CabinetUpdateform.cabinet_name = row.cabinet_name
      this.CabinetUpdateform.record_id = row.record_id
    },
    //编辑库柜信息 
    StoreHouseCabinetUpdateFun(){
      StoreHouseCabinetUpdate(this.CabinetUpdateform).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.StoreHouseListTreeIdFun() //刷新柜列表信息
        this.dialogCabinetUpdateFormVisible = false
        }
      })
    },
    getinfodatagui(infodataguilist){
      if (infodataguilist.length == 0) {
          this.StoreHouseListTreeIdFun() //刷新库柜列表
          this.StoreHouseListSideFun() //刷新库房侧边栏
          this.dialogaddCabinetFormVisible = false
          this.addCabinetinputlist = [//提交完成后重置库柜 表单
            {  
            kgbh:'',
            kgmc:'',
            kgzls:'',
            kgdlzcs:'',
            kgdck:'',
          }
          ]
      } else {
        this.addCabinetFormFun(infodataguilist)
      }
      
    },
    //新增库柜信息  提交 表单
    addCabinetFormFun(addCabinetinputlist){
      console.log(this.addCabinetinputlist)
       var NEWaddCabinetinputlist = []
          if (addCabinetinputlist.length <  this.addCabinetinputlist.length) {
            NEWaddCabinetinputlist = addCabinetinputlist
          } else {
            NEWaddCabinetinputlist = this.addCabinetinputlist
          }
            const q = {
              record_id:this.record_id,
              cabinet_code:NEWaddCabinetinputlist[0].kgbh,
              cabinet_name:NEWaddCabinetinputlist[0].kgmc,
              total_column:NEWaddCabinetinputlist[0].kgzls,
              total_layer:NEWaddCabinetinputlist[0].kgdlzcs,
              layer_wide:NEWaddCabinetinputlist[0].kgdck,
            }
            StoreHouseCabinetSave(q).then(response =>{
              console.log(response.data)
              if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
              NEWaddCabinetinputlist.splice(0, 1)
                this.getinfodatagui(NEWaddCabinetinputlist)
              }
            })
    },
    // 新增库柜 弹层
    dialogaddCabinetFormVisibleFun(){
      this.addCabinetinputlist = [
         {
          kgbh:'',
          kgmc:'',
          kgzls:'',
          kgdlzcs:'',
          kgdck:'',
        }
      ]
      this.dialogaddCabinetFormVisible = true
    },
     //删除库房信息添加条input表单   
     removeCabinetDomain(item) {
        var index = this.addCabinetinputlist.indexOf(item)
        if (index !== -1) {
          this.addCabinetinputlist.splice(index, 1)
        }
      },
      //增加库柜信息添加条input表单 
      addCabinetDomain(){ 
      this.addCabinetinputlist.push({
          value: '',
          key: Date.now()
        });
      },
    //获取库房下的柜/列/层 列表数据  
    StoreHouseListTreeIdFun(){
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      StoreHouseListTreeId(this.queryInfo).then(response =>{
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.StoreHouseListTreeIdFun()
         }
          this.Cabinetlistdata = res.list
        }
      })
    },
    // 编辑库房 弹层
    UpdateLibraryManageFun(name,row){
      this.dialogLibraryUpdateFormVisible = true
      this.LibraryUpdateform.kfbh = row.library_code
      this.LibraryUpdateform.kfmc = row.library_name
      this.LibraryUpdateform.library_row = row
    },
    //编辑库房
    StoreHouseLibraryUpdateFun(){
      
      const q = {
        library_name:this.LibraryUpdateform.kfmc,
        record_id:this.LibraryUpdateform.library_row.record_id,
      }
      StoreHouseLibraryUpdate(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.StoreHouseLibraryListFun() //更新库房列表
        this.StoreHouseLibraryListFun() //更新库房侧边栏
        this.dialogLibraryUpdateFormVisible = false
        }
      })
    },
    // 删除库房 库柜 
    StoreHouseLibraryDeleteFun(name,row){
      console.log(row)
      const q = {
        record_id:row.record_id
      }
      this.$confirm('确定将该条'+name+'信息删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (name === '库房') {
            console.log(name)
             StoreHouseLibraryDelete(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.StoreHouseLibraryListFun() //刷新库房列表
            this.StoreHouseListSideFun() //刷新库房侧边栏
            this.message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
          } else if(name === '库柜'){
            console.log(name)
             StoreHouseCabinetDelete(q).then(response =>{
               
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.StoreHouseListTreeIdFun() //刷新库柜列表
            this.StoreHouseListSideFun() //刷新库房侧边栏
            this.message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
          }
         
          
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    //再次 判断是否需要再次调用 提交表单接口
    getinfodatass(dynamicValidatalist){
      if (dynamicValidatalist.length == 0) {
          this.StoreHouseLibraryListFun() //刷新库房列表
          this.StoreHouseListSideFun() //刷新库房侧边栏
      } else {
        this.addLibraryManageFormSubmit(dynamicValidatalist)
      }
      
    },
    //提交库房添加表单信息
   addLibraryManageFormSubmit(infodatass){
     var dynamicValidatalist = []
     if (infodatass.length <  this.dynamicValidataForm.domains.length) {
       dynamicValidatalist = infodatass
     } else {
       dynamicValidatalist = this.dynamicValidataForm.domains
     }
      const qq = {
        library_name:dynamicValidatalist[0].kfmc,
        library_code:dynamicValidatalist[0].kfbh,
      }
      StoreHouseLibrarySave(qq).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.dialogaddLibraryManageFormVisible = false
          dynamicValidatalist.splice(0, 1)
          this.getinfodatass(dynamicValidatalist)
        }
      })
      if (dynamicValidatalist.length === 0) {
        this.dynamicValidataForm.domains = [  //提交后重置库房
            {
             kfbh: '',
             kfmc: ''
            }
          ]
      }
      
    },

     //删除库房信息添加条input表单   
     removeDomain(item) {
        var index = this.dynamicValidataForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidataForm.domains.splice(index, 1)
        }
      },
      //增加库房信息添加条input表单  
      addDomain() {
        this.dynamicValidataForm.domains.push({
          value: '',
          key: Date.now()
        });
      },

    //获取库房列表
    StoreHouseLibraryListFun(){
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      StoreHouseLibraryList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.LibraryList = res.list
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.StoreHouseLibraryListFun()
         }
        }
      })
    },


    //新增库房
    addLibraryManageFun(){
      this.dialogaddLibraryManageFormVisible = true
      if (this.dynamicValidataForm.domains.length == 0) {
        this.dynamicValidataForm.domains = [  //提交后重置库房
            {
             kfbh: '',
             kfmc: ''
            }
          ]
      }
    },

    // 获取点击节点
    // 根据点击的是属于库房列表/库房/柜/列的不同，调用不同的接口
    // 利用数据的层级作为唯一性判断
    handleNodeClick(data) {
      console.log(data)
       this.isActive = ''

      if (this.isActive !== data.treeLevel) {
        this.isActive = data.treeLevel
        // this.engineering_id = data.treeId
        this.currentPage = 1
        this.pageSize = 10
        this.total = 0
        console.log(this.isActive)
        this.queryInfo.tree_id = data.treeId
        this.record_id = data.treeId
        this.treeId = data.treeId
        if (this.isActive === '0') return this.StoreHouseLibraryListFun()
        if (this.isActive === '1') return this.StoreHouseListTreeIdFun()
        if (this.isActive === '2') return this.StoreHouseListTreeIdFun()
        if (this.isActive === '3') return this.StoreHouseListTreeIdFun()
      } 
    },
  //获取库房管理侧边栏数据
    StoreHouseListSideFun(){
      var newtreeData = [
        {
          tree_id:'',
          tree_name:'库房列表',
          tree_level:'0',
          child:[]
        }
      ]
      console.log(this.treeId)
      if (this.treeId == '' || this.treeId == undefined || this.treeId == null)  {
        this.treeId = ''
      }
      StoreHouseListSide().then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
        newtreeData[0].child = res
         const newTress = modifiTrees(newtreeData)
         this.treeData = newTress
         console.log(newTress)
        //  this.isActive
        this.$nextTick(function(){ 
            this.$refs['tree'].setCurrentKey(this.treeId); //默认选中第一条数据 高亮
          })
        }
      })
    },
       // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      this.pageSize = newSize
      if (this.isActive === '0') {
        this.StoreHouseLibraryListFun()
        return
      }
      if (this.isActive === '1') {
        this.StoreHouseListTreeIdFun()
        return
      }
      if (this.isActive === '2') {
        this.StoreHouseListTreeIdFun()
        return
      }
      if (this.isActive === '3') {
        this.StoreHouseListTreeIdFun()
        return
      }
    },

    // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      if (this.isActive === '0') {
        this.StoreHouseLibraryListFun()
        return
      }
      if (this.isActive === '1') {
        this.StoreHouseListTreeIdFun()
        return
      }
      if (this.isActive === '2') {
        this.StoreHouseListTreeIdFun()
        return
      }
      if (this.isActive === '3') {
        this.StoreHouseListTreeIdFun()
        return
      }
    }, 
      // 关闭弹层
    dialogClosed() {
      this.dialogaddLibraryManageFormVisible = false
      this.StoreHouseLibraryListFun()
    },



    
  },
}
</script>

<style scoped lang='less'>
.main-elasidemaxheigth{
  max-height: 641px;
}
.main-card-height {
  height: 80%;
  background-color: #fff;
}
.box-card {
  height: 100%;
  box-sizing: border-box;
}
.addCabinetFormStyle {

  .addCabinetFormStyleTitle {
    width: 100%;
    margin-right: 24%;
    height: 42px;
    font-weight: 600;
    div {
      width: 16%;
      text-align: center;
      float: left;
      line-height: 40px;
      background-color: #DDDDDD;
      color: #000;
      border: 1px solid #d1d1d1;
    }
  }
    .el-form-item {
    margin-bottom: 0;
    div {
      float: left;
    }
  }
  .almf_input {
    width: 16.2%;
    border-radius:none ;
  }
  .el-form-item {
    margin-right: 0 !important;
  }
}
.addLibraryManageFormStyle {
    max-height: 450px;
    overflow-y: auto;
  .addLibraryManageFormStyleTitle {
    width: 100%;
    // margin-right: 24%;
    height: 45px;
    font-weight: 600;
    div {
      width: 300px;
      text-align: center;
      float: left;
      line-height: 40px;
      background-color: #DDDDDD;
      color: #000;
      border: 1px solid #d1d1d1;
    }
  }
  .el-form-item {
    margin-bottom: 0;
    div {
      float: left;
    }
  }
  .almf_input {
    width: 302px;
    border-radius:none ;
  }
}
.dialog-footer {
  text-align: center;
}
.bitianxiangicon::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.getisActivestyle {
  cursor: pointer;
}
.addbtnstyle {
  width: 16%;
}

</style>
