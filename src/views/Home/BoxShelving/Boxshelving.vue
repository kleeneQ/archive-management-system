<template>
  <div>
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>上下架管理</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 头部 面包屑导航 E --> 

   <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷题名">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷题名"  @change="getBoxshelvingListFun"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号"  @change="getBoxshelvingListFun"></el-input>
            </el-form-item>
            <el-form-item label="上架状态">
              <!-- <el-input clearable v-model="queryInfo.box_status" placeholder="请选择上架状态"  @change="getBoxshelvingListFun"></el-input> -->
              <el-select v-model="queryInfo.box_status" placeholder="请选择上架状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="待上架" value="box_status2"></el-option>
                <el-option label="已上架" value="box_status3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getBoxshelvingListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->

              <!-- 列表区 -->
              <div class="eltablebox">
               <el-col>
                    <!-- 批量操作 B-->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary"  @click="opendialogautoPositionShelvingFormVisibleFun('批量自动上架')">批量自动上架</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="showBatchManualShelvingDialogFun('批量手动上架')">批量手动上架</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="batchUndercarriageBoxFun('批量下架',1)">批量下架</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="gotoBackpageFun('生成脊背')">生成脊背</el-button>
                  </el-form-item>
                </el-form>
               <!-- 批量操作 E-->
              </el-col> 
            <!-- 盒上架列表 B-->
            <el-table
              :data="filesList"
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
            fixed
            width="35">
          </el-table-column>
              <el-table-column
                label="盒序号"
                fixed
                prop="box_num"
                width="80">
              </el-table-column>
              <el-table-column
                prop="box_size"
                label="盒尺寸（mm）"
                show-overflow-tooltip
                width="150">
                 </el-table-column>
              <el-table-column
                prop="ajdh"
                label="案卷档号"
              show-overflow-tooltip
              width="300">
              <!-- <template slot-scope="scope">
                <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}</div>
                <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}</div>
              </template> -->
              </el-table-column>
              <!-- <el-table-column
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                width="300">
                 </el-table-column> -->
              <el-table-column
                prop="ajsxh"
                label="案卷顺序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="存放位置"
                width="200">
                <template slot-scope="scope" v-if="scope.row.ajk">
                  {{scope.row.ajk}}-{{scope.row.ajg}}-{{scope.row.ajl}}-{{scope.row.ajc}}-{{scope.row.ajx}}
                </template>
              </el-table-column>
              <el-table-column
                prop="dictCodeName"
                label="上架状态"
                width="100">
              </el-table-column>
                <el-table-column
                prop="put_on_time"
                label="上架日期"
                width="100">
              </el-table-column>
                <el-table-column
                prop="put_down_time"
                label="下架日期"
                width="100">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                width="200">
                <template slot-scope="scope">
                  <el-tooltip effect="light" :content="scope.row.fz" placement="top" :enterable="false">
                   <p> {{scope.row.fz}}</p>
                  </el-tooltip>
                </template>
              </el-table-column>
                <el-table-column
                prop="create_time"
                label="装盒日期"
                width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="250"
                fixed='right'
                >
                <template slot-scope="scope">
                  <div class="boxshelvingcaozuo">
                     <el-button type="primary" size="small" class="btnedit" v-if="scope.row.box_status === 'box_status2'" @click="showBoxManualShelvingDialogFun('手动上架', scope.row)">手动上架</el-button>
                  <el-button type="primary" size="small" class="btnedit" v-if="scope.row.box_status === 'box_status2'" @click="opendialogautoPositionShelvingFormVisibleFun('自动上架', scope.row)">自动上架</el-button>
                  <el-button type="danger" size="small" v-if="scope.row.box_status === 'box_status3'" @click="UndercarriageBoxFun('下架',scope.row)">下架</el-button>
                  <el-button type="danger" size="small" @click="UnPacketBoxFun('拆盒',scope.row)">拆盒</el-button>
                  </div>
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
      </el-card>
      <!-- 手动上架 弹层 B -->
      <el-dialog title="手动上架" :visible.sync="dialogBoxManualShelvingFormVisible" width="70%">
        <el-form :model="BoxManualShelvingForm" label-width="100px">
          <div class="bitianxiangiconbox"> <i class="bitianxiangicon"></i> 库房编号</div>
          <el-form-item >
            <el-select v-model="BoxManualShelvingForm.ShelvingKU" placeholder="请选择库号" @change='ShelvingKUFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingKU"  :label="item.library_code" :value="`${item.library_id},${item.library_code}`" :key="item.library_id"></el-option>
            </el-select>
            <el-select v-model="BoxManualShelvingForm.ShelvingGUI" placeholder="请选择柜号" @change='ShelvingGUIFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingGUI"  :label="item.cabinet_code" :value="`${item.cabinet_id},${item.cabinet_code}`" :key="item.cabinet_id"></el-option>
            </el-select>
            <el-select v-model="BoxManualShelvingForm.ShelvingLIE" placeholder="请选择列号" @change='ShelvingLIEFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingLIE"  :label="item.column_code" :value="`${item.column_id},${item.column_code}`" :key="item.column_id"></el-option>
            </el-select>
            <el-select v-model="BoxManualShelvingForm.ShelvingCENG" placeholder="请选择层号" @change='ShelvingCENGFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingCENG"  :label="item.layer_code" :value="`${item.layer_id},${item.layer_code}`" :key="item.layer_id"></el-option>
            </el-select>
            <el-input type="input" v-model="BoxManualShelvingForm.ShelvingXU" placeholder="请输入序号" style="width:120px"></el-input>
          </el-form-item>
           <el-form-item label="附注" >
             <el-input type="textarea" v-model="BoxManualShelvingForm.fz"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBoxManualShelvingFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="BoxManualShelvingFun">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 手动上架 弹层 E -->
            <!-- 批量手动上架 弹层 B -->
      <el-dialog title="批量手动上架" :visible.sync="dialogBatchBoxManualShelvingFormVisible" width="70%">
        <el-table
            border
            :data="batchboxShelvingtableData"
            :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
            :cell-style="{'text-align':'center','padding':'5px'}"
            style="width: 100%;"
            :header-cell-class-name='must'
            >
            <el-table-column
              type="index"
              label="序号"
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
              label="存放位置"
              width="700"
              >
              <template slot-scope="scope">
                <el-select v-model="scope.row.ajk" placeholder="" @change='ShelvingKUFun' style="width:100px;margin-right: 5px;">
                  <el-option v-for="item in ShelvingKU"  :label="item.library_code" :value="`${item.library_id},${item.library_code}`" :key="item.library_id"></el-option>
                </el-select>库
                <el-select v-model="scope.row.ajg" placeholder="" @change='ShelvingGUIFun' style="width:100px;margin-right: 5px;">
                  <el-option v-for="item in ShelvingGUI"  :label="item.cabinet_code" :value="`${item.cabinet_id},${item.cabinet_code}`" :key="item.cabinet_id"></el-option>
                </el-select>柜
                <el-select v-model="scope.row.ajl" placeholder="" @change='ShelvingLIEFun' style="width:100px;margin-right: 5px;">
                  <el-option v-for="item in ShelvingLIE"  :label="item.column_code" :value="`${item.column_id},${item.column_code}`" :key="item.column_id"></el-option>
                </el-select>列
                <el-select v-model="scope.row.ajc" placeholder="" @change='ShelvingCENGFun' style="width:100px;margin-right: 5px;">
                  <el-option v-for="item in ShelvingCENG"  :label="item.layer_code" :value="`${item.layer_id},${item.layer_code}`" :key="item.layer_id"></el-option>
                </el-select>层
                <el-input type="input" v-model="scope.row.ajx" placeholder="序号" style="width:100px;margin-right: 5px;"></el-input>序
                                                                  
              </template>
            </el-table-column>
            <el-table-column
              label="附注"
              min-width="200">
              <template slot-scope="scope">
                <el-input type="input" v-model="scope.row.shelvingfz" placeholder="请输入附注"></el-input>
              </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBatchBoxManualShelvingFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="batchBoxManualShelvingFun">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 批量手动上架 弹层 E -->
      <!-- 自动上架 起始位置选择 弹层 B -->
      <el-dialog title="自动上架" :visible.sync="dialogautoPositionShelvingFormVisible" width="50%">
        <el-form :model="autoPositionShelvingForm" label-width="120px">
          <div class="bitianxiangiconbox"> 存放起始位置</div>
          <el-form-item >
            <el-select v-model="autoPositionShelvingForm.ShelvingKU" placeholder="请选择库号" @change='ShelvingKUFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingKU"  :label="item.library_code" :value="`${item.library_id},${item.library_code}`" :key="item.library_id"></el-option>
            </el-select>
            <el-select v-model="autoPositionShelvingForm.ShelvingGUI" placeholder="请选择柜号" @change='ShelvingGUIFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingGUI"  :label="item.cabinet_code" :value="`${item.cabinet_id},${item.cabinet_code}`" :key="item.cabinet_id"></el-option>
            </el-select>
            <el-select v-model="autoPositionShelvingForm.ShelvingLIE" placeholder="请选择列号" @change='ShelvingLIEFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingLIE"  :label="item.column_code" :value="`${item.column_id},${item.column_code}`" :key="item.column_id"></el-option>
            </el-select>
            <el-select v-model="autoPositionShelvingForm.ShelvingCENG" placeholder="请选择层号" @change='ShelvingCENGFun' style="width:120px;margin-right: 5px;">
              <el-option v-for="item in ShelvingCENG"  :label="item.layer_code" :value="`${item.layer_id},${item.layer_code}`" :key="item.layer_id"></el-option>
            </el-select>
            <!-- <el-input type="input" v-model="autoPositionShelvingForm.ShelvingXU" placeholder="请输入序号" style="width:120px"></el-input> -->
          </el-form-item>
           <el-form-item label="附注" >
             <el-input type="textarea" v-model="autoPositionShelvingForm.fz"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogautoPositionShelvingFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="autoPositionShelvingFun">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 自动上架 起始位置选择 弹层 E -->

  </div>
</template>

<script>
import Download from "@/utils/download"
import {
  getBoxshelvingList,
  UnPacketBox,
  UndercarriageBox,
  BoxAutoShelving,
  BoxManualShelving,
  BoxStoreHouseListRecordId,
  BoxBackDownload,
  autoPositionShelving,
} from "@/api/boxshelving/boxshelving"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  data () {
    return {
      queryInfo:{
        ajtm:'',
        ajdh:'',
        box_status:'',
        page_num:1,
        page_size:10,
      },
      files_id:'',//案卷ID
      ids:[],
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      fileCategory:[],//案卷类别
      carrierType:[],//载体类型
      filesList:[],//案卷信息列表
      box_status:[],//盒状态
      ids:'',//选中的盒id
      selectedList:'',//选中列表
      dialogBoxManualShelvingFormVisible:false,// 手动 上架 弹层
      BoxManualShelvingForm:{ //手动上架 表单
          param:'',
          ShelvingKU:'',
          ShelvingGUI:'',
          ShelvingLIE:'',
          ShelvingCENG:'',
          ShelvingXU:'',
          fz:'',
          boxId:'',
      }, 
      ShelvingKU:[],//库列表
      ShelvingGUI:[],//库列表
      ShelvingLIE:[],//库列表
      ShelvingCENG:[],//库列表
      dialogBatchBoxManualShelvingFormVisible:false,//批量 手动 上架 弹层
      batchboxShelvingtableData:'',//批量 手动 上架 多选上架数据
      boxStatusflag:false,//结束循环 
      dialogautoPositionShelvingFormVisible:false,//自动上架弹层 
      autoPositionShelvingForm:{ //自动上架 起始位置选择 表单
        param:'',
        ShelvingKU:'',
        ShelvingGUI:'',
        ShelvingLIE:'',
        ShelvingCENG:'',
        ShelvingXU:'',
        fz:'',
        boxId:'',
      },
      files_row:{},
    }
  },
  created(){
    this.getFileCategory() // 案卷类别
    this.getCarrierType() //载体类型
  },
  beforeMount(){
    this.querySystemDictionaryFun() //盒状态
  },
  mounted(){
  
    
    this.BoxStoreHouseListRecordIdFun() //获取库列表 
  },
  methods: {
    
    //自动上架弹层
    opendialogautoPositionShelvingFormVisibleFun(name,row){
      this.files_row = row
      if (name == '批量自动上架') {
        if (this.selectedList.length === 0) return this.message({ message: '请选择需要上架的案卷', type: 'error' })
        this.dialogautoPositionShelvingFormVisible = true
          this.autoPositionShelvingForm.boxId = ''
      } else {
        this.dialogautoPositionShelvingFormVisible = true
          this.autoPositionShelvingForm.boxId = row.box_id
      }
    },
    //自动上架
    autoPositionShelvingFun(){
     
      if (this.autoPositionShelvingForm.ShelvingKU == '') {
        if (this.selectedList.length == 0) {
          this.BoxAutoShelvingFun('自动上架',this.files_row)
        } else {
          this.batchBoxAutoShelvingFun('批量自动上架')
        }
      }else {
         
      if (this.autoPositionShelvingForm.ShelvingKU === '') return  this.message({ message: '存放位置，库房不能为空', type: 'error' })
      if (this.autoPositionShelvingForm.ShelvingGUI === '') return this.message({ message: '存放位置，库柜不能为空', type: 'error' })
      if (this.autoPositionShelvingForm.ShelvingLIE === '') return this.message({ message: '存放位置，列不能为空', type: 'error' })
      if (this.autoPositionShelvingForm.ShelvingCENG === '') return this.message({ message: '存放位置，层不能为空', type: 'error' })
      console.log(this.autoPositionShelvingForm)
      var ku = this.autoPositionShelvingForm.ShelvingKU 
      var gui = this.autoPositionShelvingForm.ShelvingGUI 
      var lie = this.autoPositionShelvingForm.ShelvingLIE 
      var ceng = this.autoPositionShelvingForm.ShelvingCENG 
      var fz = this.autoPositionShelvingForm.fz

      var boxIds = this.autoPositionShelvingForm.boxId

      for (let i = 0; i < this.selectedList.length; i++) {
        const element = this.selectedList[i];
        if (i === 0) {
          boxIds = element.box_id
        } else {
          boxIds = boxIds+'#'+element.box_id
        }
      }

      if(fz){
        var q = {
          param:boxIds,
          position:ku+'#'+gui+'#'+lie+'#'+ceng+'#'+fz
        }
      }else {
        var q = {
          param:boxIds,
          position:ku+'#'+gui+'#'+lie+'#'+ceng
        }
      }
      
      console.log(q)
     
        autoPositionShelving(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: message, type: 'success' })
          this.dialogautoPositionShelvingFormVisible = false
            this.getBoxshelvingListFun()
          console.log(res)
          }
        })

      }
    },  
    //跳转 生成脊背页面
    gotoBackpageFun(name){
      var selectedList = this.selectedList
      if (this.selectedList.length == 0) {
        this.message({ message: '请勾选案卷', type: 'error' })
        return
      }
      this.boxStatusflag = false
      for (let i = 0; i < selectedList.length; i++) {
        const element = selectedList[i];
        if (element.box_status == 'box_status2') {
           this.boxStatusflag = true
           break;
        }
      }
      if (this.boxStatusflag) {
        this.message({ message: '未上架的案卷不能生成脊背', type: 'error' })
      } else {
        console.log(this.ids.join('#'))
       this.$router.push({  
            path: '/BoxShelving/backpage',  
            query: {
              box_ids: this.ids.join('#'),
            }, 
        })
      }

        
    },
    //批量 手动 上架 表单提交 
    batchBoxManualShelvingFun(){
     var batchboxShelvingtableDatas = this.batchboxShelvingtableData 
      var boxIDkglcxfz = ''
      for (let i = 0; i < batchboxShelvingtableDatas.length; i++) {

        const element = batchboxShelvingtableDatas[i];
        if (element.ajk === '' || element.ajk === null) return  this.message({ message: '存放位置，库房不能为空', type: 'error' })
        if (element.ajg === '' || element.ajg === null) return this.message({ message: '存放位置，库柜不能为空', type: 'error' })
        if (element.ajl === '' || element.ajl === null) return this.message({ message: '存放位置，列不能为空', type: 'error' })
        if (element.ajc === '' || element.ajc === null) return this.message({ message: '存放位置，层不能为空', type: 'error' })
        if (element.ajx === '' || element.ajx === null) return  this.message({ message: '存放位置，序不能为空', type: 'error' })
        let [valuek,labelk] = element.ajk.split(",");
        let [valueg,labelg] = element.ajg.split(",");
        let [valuel,labell] = element.ajl.split(",");
        let [valuec,labelc] = element.ajc.split(",");
        if (i == 0) {
         boxIDkglcxfz =  element.box_id +'#'+labelk+'#'+labelg+'#'+labell+'#'+labelc+'#'+element.ajx+'#'+element.shelvingfz
        } else {
          boxIDkglcxfz = boxIDkglcxfz+','+element.box_id +'#'+labelk+'#'+labelg+'#'+labell+'#'+labelc+'#'+element.ajx+'#'+element.shelvingfz
        }
      }
      console.log(boxIDkglcxfz)
      const q = {
        param:boxIDkglcxfz
      }
      BoxManualShelving(q).then(response =>{
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.message({ message: message, type: 'success' })
            this.getBoxshelvingListFun()
            this.dialogBatchBoxManualShelvingFormVisible = false
          }
      })
    },
    //批量 手动 上架 弹层 
    showBatchManualShelvingDialogFun(){
      var selectedList = this.selectedList
      var boxIds = ''
      if (this.selectedList.length === 0) return this.message({ message: '请选择需要上架的案卷', type: 'error' })
      selectedList.map(item =>{
        console.log(item)
        item.shelvingfz
      })
      this.boxStatusflag = false
      for (let i = 0; i < selectedList.length; i++) {
        const element = selectedList[i];
        if (element.box_status == 'box_status3') {
           this.boxStatusflag = true
           break;
        }
      }
      if (this.boxStatusflag) {
        this.message({ message: '已上架的案卷不能重复上架', type: 'error' })
      } else {
       this.batchboxShelvingtableData = selectedList
       this.dialogBatchBoxManualShelvingFormVisible = true
      }
      

    },
    //手动 上架 保存 函数
    BoxManualShelvingFun(){
      if (this.BoxManualShelvingForm.ShelvingKU === '') return  this.message({ message: '存放位置，库房不能为空', type: 'error' })
      if (this.BoxManualShelvingForm.ShelvingGUI === '') return this.message({ message: '存放位置，库柜不能为空', type: 'error' })
      if (this.BoxManualShelvingForm.ShelvingLIE === '') return this.message({ message: '存放位置，列不能为空', type: 'error' })
      if (this.BoxManualShelvingForm.ShelvingCENG === '') return this.message({ message: '存放位置，层不能为空', type: 'error' })
      if (this.BoxManualShelvingForm.ShelvingXU === '') return  this.message({ message: '存放位置，序不能为空', type: 'error' })
      console.log(this.BoxManualShelvingForm)
      var ku = this.BoxManualShelvingForm.ShelvingKU 
      var gui = this.BoxManualShelvingForm.ShelvingGUI 
      var lie = this.BoxManualShelvingForm.ShelvingLIE 
      var ceng = this.BoxManualShelvingForm.ShelvingCENG 
      var xu = this.BoxManualShelvingForm.ShelvingXU 
      var boxId = this.BoxManualShelvingForm.boxId
      var fz = this.BoxManualShelvingForm.fz
      if(fz){
        var q = {
          param:boxId+'#'+ku+'#'+gui+'#'+lie+'#'+ceng+'#'+xu+'#'+fz
        }
      }else {
        var q = {
          param:boxId+'#'+ku+'#'+gui+'#'+lie+'#'+ceng+'#'+xu
        }
      }
      
      BoxManualShelving(q).then(response =>{
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.message({ message: message, type: 'success' })
            this.getBoxshelvingListFun()
            this.dialogBoxManualShelvingFormVisible = false
          }
      }) 
    },
    //选择库 后获取 柜
    ShelvingKUFun(data){
      console.log(data)
      let [value,label] = data.split(",");
      console.log(value,label)
      const q = {
        record_id:value
      }
      this.BoxManualShelvingForm.ShelvingKU = label
      this.autoPositionShelvingForm.ShelvingKU = label
      BoxStoreHouseListRecordId(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map((item,index) =>{
          if (item.is_full === '0' ) {
            res.splice(index,1)
          } 
        })
        this.ShelvingGUI = res
        }
      })
    },
    //选择柜 后获取列
    ShelvingGUIFun(data){
      console.log(data)
      let [value,label] = data.split(",");
      console.log(value,label)
      const q = {
        record_id:value
      }
      this.BoxManualShelvingForm.ShelvingGUI = label
      this.autoPositionShelvingForm.ShelvingGUI = label
      BoxStoreHouseListRecordId(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map((item,index) =>{
          if (item.is_full === '0' ) {
            res.splice(index,1)
          } 
        })
        this.ShelvingLIE = res
        }
      })
    },
    //选择列 后获取层
    ShelvingLIEFun(data){
      console.log(data)
      let [value,label] = data.split(",");
      console.log(value,label)
      const q = {
        record_id:value
      }
      this.BoxManualShelvingForm.ShelvingLIE = label
      this.autoPositionShelvingForm.ShelvingLIE = label
      BoxStoreHouseListRecordId(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map((item,index) =>{
          if (item.is_full === '0' ) {
            res.splice(index,1)
          } 
        })
        this.ShelvingCENG = res
        
        }
      })
    },
    //选择层 后获取序
    ShelvingCENGFun(data){
      let [value,label] = data.split(",");
      console.log(value,label)
      const q = {
        record_id:value
      }
      this.BoxManualShelvingForm.ShelvingCENG = label
      this.autoPositionShelvingForm.ShelvingCENG = label
      BoxStoreHouseListRecordId(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map((item,index) =>{
          if (item.is_full === '0' ) {
            res.splice(index,1)
          } 
        })
        this.ShelvingXU = res
        }
      })
    },
    //获取 库列表
    BoxStoreHouseListRecordIdFun(){
      const q = {
        record_id:'0'
      }
      BoxStoreHouseListRecordId(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        res.map((item,index) =>{
          if (item.is_full === '0' ) {
            res.splice(index,1)
          } 
        })
        this.ShelvingKU = res
        }
      })
    },
    // 手动上架 弹层
    showBoxManualShelvingDialogFun(name,row){
      this.dialogBoxManualShelvingFormVisible = true
      this.BoxManualShelvingForm.boxId = row.box_id
    },
    //禁止勾选
    selectInit(row,index){
        if(row.box_status == 'box_status3'){
            return false  //不可勾选
        }else{    
            return true  //可勾选
        }
    },
    //批量 自动上架
    batchBoxAutoShelvingFun(){
      var selectedList = this.selectedList
      var boxIds = ''
      if (this.selectedList.length === 0) return this.message({ message: '请选择需要上架的案卷', type: 'error' })
       this.boxStatusflag = false
      for (let i = 0; i < selectedList.length; i++) {
        const element = selectedList[i];
        if (element.box_status == 'box_status3') {
           this.boxStatusflag = true
           break;
        }
      }
      if (this.boxStatusflag) {
        this.message({ message: '已上架的案卷不能重复上架', type: 'error' })
      } else {
        for (let i = 0; i < selectedList.length; i++) {
        const element = selectedList[i];
        if (i === 0) {
          boxIds = selectedList[i].box_id
        } else {
          boxIds = boxIds+'#'+selectedList[i].box_id
        }
      }
      const q = {
        param:boxIds
      }
      BoxAutoShelving(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.dialogautoPositionShelvingFormVisible = false
            this.getBoxshelvingListFun()
          }
      }) 
      }

     
    },
    // 盒列表选中的列 
    changeBox(selection) {
      this.ids = selection.map(item => item.box_id);
      this.selectedList = selection
      console.log(this.ids)
      console.log(this.selectedList)
    },
    // 自动上架方法
    BoxAutoShelvingFun(name,row){
      console.log(row)
      const q = {
        param:row.box_id
      }
      BoxAutoShelving(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.dialogautoPositionShelvingFormVisible = false
            this.getBoxshelvingListFun()
          }
      })
    },

    //批量下架
    batchUndercarriageBoxFun(name,row){
      
      var selectedList = this.selectedList
      var boxIds = ''
      if (this.selectedList.length === 0) return this.message({ message: '请选择需要上架的案卷', type: 'error' })
       this.boxStatusflag = false
      for (let i = 0; i < selectedList.length; i++) {
        const element = selectedList[i];
        if (element.box_status == 'box_status3') {
           this.boxStatusflag = true
           break;
        }
      }
      if (this.boxStatusflag) {
        this.message({ message: '已下架的案卷不能重复下架', type: 'error' })
      } else {
        for (let i = 0; i < selectedList.length; i++) {
        const element = selectedList[i];
        if (i === 0) {
          boxIds = selectedList[i].box_id
        } else {
          boxIds = boxIds+'#'+selectedList[i].box_id
        }
      }
      const q = {
        box_id:boxIds
      }
      this.$confirm('确定将该盒下架么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           UndercarriageBox(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getBoxshelvingListFun()
            }
          })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消下架'
          });          
        });
        }
    },

    //下架
    UndercarriageBoxFun(name,row){
      
      const q = {
        box_id:row.box_id
      }
      this.$confirm('确定将该盒下架么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           UndercarriageBox(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getBoxshelvingListFun()
            }
          })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消下架'
          });          
        });
     
    },
    //拆盒
    UnPacketBoxFun(name,row){
      const q = {
        box_id:row.box_id
      }
        this.$confirm('确定进行拆盒么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          UnPacketBox(q).then(response =>{
            
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({
            type: 'success',
            message: '拆盒成功!'
            });
            this.getBoxshelvingListFun()
            }
          })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消拆盒'
          });          
        });
      },

    //获取盒上架 盒列表
    getBoxshelvingListFun(){
      const q = {
        ajtm:this.queryInfo.ajtm,
        ajdh:this.queryInfo.ajdh,
        box_status:this.queryInfo.box_status,
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      getBoxshelvingList(q).then(response => {
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getBoxshelvingListFun()
         }
        console.log(res.list)
        res.list.map(v => {
            this.fileCategory.forEach(t => { //案卷类别
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
             this.carrierType.forEach(t => {  //载体类型
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            this.boxStatus.forEach(t => {  //盒状态
              if (v.box_status === t.dict_code) {
                v.dictCodeName = t.dict_name
              }
              return
            })
            return
          })
        this.filesList = res.list

        }
      })

    },
    //查询案卷列表信息
    queryEngineering(){
      console.log(this.queryInfo)
    },
    //列表样式
    rowStyle({row}){
      var arr = this.ids;
      for(let i = 0; i < arr.length; i++){
        if(row.box_id === arr[i]){
          return 'rowStyle'
        }
      } 
    },
    // 显示弹层
    showDialogFun(){},
    // 关闭弹层
    handleClose(){
      this.dialogPackingVisible = false
      this.dialogAutoPackingVisible = false
    },
    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getBoxshelvingListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getBoxshelvingListFun()
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
    //盒状态
     querySystemDictionaryFun(){
      const that = this
        const q = {
            dict_tag:'box_status'
          }
          //获取文件预览域名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.boxStatus = res
            this.getBoxshelvingListFun() //获取需要上架的盒列表
            }
          }).catch(error => {
            console.log(error)
          })
    },
    //给表头添加 必须 样式
  must(obj){
		if(obj.columnIndex == 2) {
			return 'must';
		}
	}
  },

}
</script>
<style lang="less">
.el-table th.must>.cell:before {
	content: '*';
	color: #ff1818;
}

</style>
<style scoped lang='less'>
.rowStyle{
    background-color:#ecf5ff!important;
    text-align: left;
  }
  .boxshelvingcaozuo {
    width: 100%;
    text-align: right;
    
  }
  .bitianxiangiconbox {
    width: 120px;
    float: left;
    text-align: right;
    padding: 10px;
    box-sizing: border-box;
  }
  .bitianxiangicon::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.dialog-footer {
  width: 100%;
  text-align: center;
}

</style>
