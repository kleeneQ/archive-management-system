<template>
  <div >
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案查询</el-breadcrumb-item>
      <el-breadcrumb-item>单位工程级查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 筛选按钮B -->
     <!-- <el-row class="margin-top-10 margin-bottom-10 margin-left-10">
        <el-col :span="6">
          <div class="topradiobutton">
              <el-radio v-model="queryInfo.ly" label="1" border @change="selectsort()">已归档</el-radio>
              <el-radio v-model="queryInfo.ly" label="2" border @change="selectsort()">未归档</el-radio>
          </div>
        </el-col>
      </el-row> -->
      <!-- 筛选按钮 E -->
      <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="单位工程名称">
              <el-input clearable v-model="queryInfo.dwgcmc" placeholder="请输入单位工程名称"  @change="searchProjectListFun"></el-input>
            </el-form-item>
            <el-form-item label="档号">
              <el-input clearable v-model="queryInfo.dwgcdh" placeholder="请输入档号"  @change="searchProjectListFun"></el-input>
            </el-form-item>
             <el-form-item label="开工日期">
                 <el-date-picker
                  v-model="queryInfo.kgsj"
                  type="date"
                    value-format='yyyy-MM-dd'
                  placeholder="请选择开工日期">
                </el-date-picker>
             </el-form-item>
            <el-form-item label="竣工日期">
                  <el-date-picker
                    v-model="queryInfo.jgsj"
                    type="date"
                    value-format='yyyy-MM-dd'
                    placeholder="请选择竣工日期">
                  </el-date-picker>
               </el-form-item>
            <el-form-item label="单位工程类型">
              <el-cascader
              placeholder="请选择单位工程类型"
                :options="uniProjectTypes"
                expand-trigger="hover"
                :props="cascaderProps"
                clearable
                @change="cascaderProjectTypesFun"
                v-model="queryInfo.dwgclx"
                change-on-select
              ></el-cascader>
            </el-form-item>
            <el-form-item label="施工单位">
              <el-input clearable v-model="queryInfo.sgdw" placeholder="请输入施工单位"  @change="searchProjectListFun"></el-input>
            </el-form-item>
           
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchProjectListFun">查询</el-button>
              <el-button type="info" @click="queryEngineeringClear">重置</el-button>
              <el-button v-if="advancedFlag" type="primary" @click="searchProjectListFun">高级查询</el-button>
            </el-form-item>
            <div>
              <div class="advancedSearchDIV" v-if="advancedFlagI">
                <p class="pstext">注：使用高级查询请先选择单位工程类型</p>
                <el-form-item label="建筑工程类型">
                  <el-select v-model="queryInfo.jzgclx" placeholder="请选择建筑工程类型" clearable>
                    <el-option
                      v-for="item in architecture"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地上层数">
                  <el-input clearable v-model="queryInfo.dscs" placeholder="请输入地上层数"  @change="searchProjectListFun"></el-input>
                </el-form-item>
                <el-form-item label="地下层数">
                  <el-input clearable v-model="queryInfo.dxcs" placeholder="请输入地下层数"  @change="searchProjectListFun"></el-input>
                </el-form-item>
                <el-form-item label="结构类型">
                  <el-select v-model="queryInfo.jglx" placeholder="请选择结构类型" clearable>
                    <el-option
                      v-for="item in structureType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="advancedSearchDIV" v-if="advancedFlagQ">
                <p class="pstext">注：使用高级查询请先选择单位工程类型</p>
                <el-form-item label="管线工程类型">
                   <el-select v-model="queryInfo.gxgclx" placeholder="请选择管线工程类型" clearable>
                      <el-option
                        v-for="item in pipelineEngineeringType"
                        :key="item.bm"
                        :label="item.mc"
                        :value="item.bm">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管线位置">
                  <el-select v-model="queryInfo.gxwz" placeholder="请选择管线位置" clearable>
                      <el-option
                        v-for="item in pipelinePosition"
                        :key="item.bm"
                        :label="item.mc"
                        :value="item.bm">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管线类型">
                    <el-select v-model="queryInfo.gxlx" placeholder="请选择管线类型" clearable>
                      <el-option
                        v-for="item in pipelineType"
                        :key="item.bm"
                        :label="item.mc"
                        :value="item.bm">
                      </el-option>
                    </el-select>
                </el-form-item>
              </div>
              <div class="advancedSearchDIV" v-if="advancedProjectRoadFlagE1">
                <p class="pstext">注：使用高级查询请先选择单位工程类型</p>
                <el-form-item label="道路工程类型">
                  <el-select v-model="queryInfo.dlgclx" placeholder="请选择道路工程类型" clearable>
                    <el-option
                      v-for="item in roadType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
               </el-form-item>
                <el-form-item label="车道数">
                  <el-input clearable v-model="queryInfo.cds" placeholder="请输入车道数"  @change="searchProjectListFun"></el-input>
                </el-form-item>
                <el-form-item label="道路等级">
                  <el-select v-model="queryInfo.dldj" placeholder="请选择道路等级" clearable>
                    <el-option
                      v-for="item in roadGrade"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                 </el-form-item>
                <el-form-item label="路面种类">
                  <el-select v-model="queryInfo.lmzl" placeholder="请选择路面种类" clearable>
                    <el-option
                      v-for="item in pavementType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="advancedSearchDIV" v-if="advancedProjectRoadFlagE2">
                <p class="pstext">注：使用高级查询请先选择单位工程类型</p>
                <el-form-item label="桥梁工程类型">
                    <el-select v-model="queryInfo.qlgclx" placeholder="请选择桥梁工程类型" clearable>
                      <el-option
                        v-for="item in bridgeType"
                        :key="item.bm"
                        :label="item.mc"
                        :value="item.bm">
                      </el-option>
                    </el-select>
                 </el-form-item>
                <el-form-item label="行车道位置">
                
                 <el-select v-model="queryInfo.xcdwz" placeholder="请选择行车道位置" clearable>
                    <el-option
                      v-for="item in laneLocation"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="桥梁结构">
                   <el-select v-model="queryInfo.qljgtx" placeholder="请选择桥梁结构体系" clearable>
                    <el-option
                      v-for="item in bridgeStructureType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                 </el-form-item>
              </div>
            </div>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->

           <!-- 列表区 -->
              <div class="eltablebox">
               <el-col>
                    <!-- 案卷 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary"  @click="searchEngineeringDownloadFun('批量导出')">批量导出</el-button>
                  </el-form-item>
                </el-form>

              </el-col> 
            <!-- 工程列表 B -->
            <el-table
              :data="EngineeringList"
              border
              style="width: 100%"
              @selection-change="changeBox"
              :highlight-current-row="true"
              ref="tableRef"
              :row-class-name="rowStyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
            <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column 
              align="center" 
              prop="dwgcdh" 
              label="档号" 
              width="200" >
              </el-table-column>
              <el-table-column
              align="center"
                prop="dwgcmc"
                label="单位工程名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="dwgclxName"
                label="单位工程类型"
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="sgdw"
                label="施工单位"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="jzmj"
                label="建筑面积"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="kgsj"
                label="开工日期"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.kgsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="jgsj"
                label="竣工日期"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.jgsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="gczj"
                label="工程造价"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="left"
                fixed="right"
                label="操作"
                width="300">
                <template slot-scope="scope">
                  <el-button class="btnedit" type="primary" size="small" @click="dialogprojectdetailsVisibleFun('单位工程详情', scope.row)">详情</el-button>
                  <el-button type="success" size="small" @click="gotodetailsFun(scope.row)">查看</el-button>
                  <el-button type="primary" v-if="scope.row.sxflag" size="small" @click="gotosxpageFun(scope.row)">查看声像档案</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
            <!-- 分页 B -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 50, 200, 1000]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background>
            </el-pagination>
             <!-- 分页 E -->
            </div>

      </el-card>
        <!-- 项目工程详情 B -->
          <el-dialog :title="'项目详情'" :visible.sync="dialogEngineeringdetailsVisible" width="60%">
            <detailsEngineering v-if="dialogEngineeringdetailsVisible" :ID='Engineering_id' :source="zt"></detailsEngineering>
          </el-dialog>
        <!-- 项目工程详情 E -->
        
        <!-- 单位工程详情 B -->
          <el-dialog :title="'单位工程详情'" :visible.sync="dialogprojectdetailsVisible" width="70%">
            <specialtyDetails v-if="dialogprojectdetailsVisible" :project_id='project_id' :zt='zt' :source="isActive"></specialtyDetails>
          </el-dialog>
        <!-- 单位工程详情 E -->
  </div>
</template>

<script>
import Download from "@/utils/download"
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
import {
  searchEngineeringList,
  searchEngineeringDownload,
  searchEngineeringEngineeringId,
  searchProjectList,
  downloadSearchProject,
  getSearchAudioFilesListProjectId,
} from '@/api/RecorSearch/recorsearch'
import {
  parseTime
} from "@/utils/index"
import detailsEngineering from '@/components/details/detailsEngineering'
import specialtyDetails from '@/components/details/detailsProject'
export default {
  components: {
    detailsEngineering,
    specialtyDetails
  },
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num: 1,
        page_size: 10,
        dwgcmc: '',
        dwgcdh: '',
        dwgclx: '',
        sgdw: '',
        kgsj: '',
        jgsj: '',
        jzgclx: '',
        dscs: '',
        dxcs: '',
        jglx: '',
        dlgclx: '',
        cds: '',
        dldj: '',
        lmzl: '',
        qlgclx: '',
        xcdwz: '',
        qljgtx: '',
        gxgclx: '',
        gxwz: '',
        gxlx: '',
        ly: ''
      },
      ids:'',//选中的ID
      engineeringType:[],//项目工程类型
      EngineeringList:[],//工程列表
      engineeringIds:'',//选中的项目ID
      dialogEngineeringdetailsVisible:false,//项目详情 弹层
      isActive:"engineering",
      Engineering_id:"",//项目工程ID
      zt:"",
      archivesCateList:[],//单位工程类型
      dialogprojectdetailsVisible:false,//单位工程详情
      
      uniProjectTypes: [],  // 单位工程类型   多级选择
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_name',
        children: 'child',
        emitPath: false
      },
      //高级查询条件 
      advancedFlag:false,
      advancedFlagI:false, 
      advancedFlagQ:false, 
      advancedProjectRoadFlagE1:false, 
      advancedProjectRoadFlagE2:false, 

      architecture:[],//建筑工程类型
      structureType:[],//结构类型
      pipelineEngineeringType:[],  // 管线工程类型
      pipelinePosition:[],  // 管线位置
      pipelineType:[],  // 管线类型
      roadType:[],//道路工程类型
      pavementType:[],//路面种类
      roadGrade: [], // 道路等级
      bridgeType: [], // 桥梁工程类型
      bridgeStructureType: [], // 桥梁结构体系
      laneLocation: [], // 行车道位置
      sxflag:'',//是否显示声像档案
    }
  },
  created () {
    this.getUniProjectType() // 单位工程类型 全部数据
    // this.getUniProjectTypes() // 单位工程类型 多级选择 
    
    this.getArchitecturel() // 建筑工程类型
    this.getStructureType()  // 结构类型
    this.getPipelineEngineeringType()  // 管线工程类型
    this.getPipelinePosition()  // 管线位置
    this.getPipelineType()  // 管线类型
    this.getRoadEngineeringType()  // 道路工程类型
    this.getPavementType()  // 路面种类
    this.getRoadGrade() // 道路等级
    this.getBridgeType() // 桥梁工程类型
    this.getBridgeStructureType() // 桥梁结构体系
    this.getLaneLocation() // 行车道位置
    
  },
  mounted () {
    this.searchProjectListFun() //单位工程级 列表获取
  },
  methods: {
    //跳转声像档案查询页面
    gotosxpageFun(row){
      this.$router.push({ 
         path: '/RecorSearch/SearchfileCollection', 
         query: {
              name: row.dwgcmc
            }, 
        })
    },
    // 查看声像档案
    getSearchAudioFilesListProjectIdFun(row){
      const q = {
        page_size:100,
        page_num:1,
        project_id:row.project_id,
      }
      getSearchAudioFilesListProjectId(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         let sxflag = ''
         if (res.list.length == 0) {
          sxflag = false
         } else {
          sxflag = true
          this.EngineeringList.forEach(v =>{
           console.log(v)
           if (v.project_id == res.list[0].project_id) {
             v.sxflag = sxflag
           }
         })

         }
         
         
        }
      })
    },
    // 桥梁工程类型
    getBridgeType() {
      const q = {
        bm: "QLGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.bridgeType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 桥梁结构体系
    getBridgeStructureType() {
      const q = {
        bm: "QLJGTX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.bridgeStructureType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
   // 行车道位置
    getLaneLocation() {
      const q = {
        bm: "XCDWZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.laneLocation  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
        // 道路等级
    getRoadGrade() {
      const q = {
        bm: "DLDJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.roadGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 道路工程类型
    getRoadEngineeringType() {
      const q = {
        bm: "DLGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.roadType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 路面种类
    getPavementType() {
      const q = {
        bm: "LMZL_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pavementType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线工程类型
    getPipelineEngineeringType() {
      const q = {
        bm: "CSGXGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelineEngineeringType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 管线位置
    getPipelinePosition() {
      const q = {
        bm: "GXWZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelinePosition  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 管线类型
    getPipelineType() {
      const q = {
        bm: "GXLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.pipelineType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
   // 建筑工程类型
    getArchitecturel() {
      const q = {
        bm: "JZGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.architecture  = res
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

       //单位工程详情 弹层
    dialogprojectdetailsVisibleFun(name,row){
      console.log(row)
      this.project_id = row.project_id
      this.zt = row.zt
      this.dialogprojectdetailsVisible = true
    },

    //高级查询
    advancedSearchFun(){
      var val = this.queryInfo.dwgclx
      if (this.queryInfo.dwgclx == '') {
        this.advancedFlagI = false
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE1 = false
        this.advancedProjectRoadFlagE2 = false  
        return
      }
      if (val.charAt(0) === 'I') {
        console.log('民用建筑')
        this.advancedFlagI = true
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE1 = false
        this.advancedProjectRoadFlagE2 = false
      } else if (val.charAt(0) === 'Q') {
        console.log('地下管线类')
        this.advancedFlagQ = true
        this.advancedFlagI = false
        this.advancedProjectRoadFlagE1 = false
        this.advancedProjectRoadFlagE2 = false
      } else if (val.substr(0,val.indexOf('.')) === 'E1' || val.substring(0,2) === 'E1') {
        console.log('市政——道路、广场')
        this.advancedProjectRoadFlagE1 = true
        this.advancedFlagI = false
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE2 = false
      } else if (val.substr(0,val.indexOf('.')) === 'E2' || val.substring(0,2) === 'E2') {
        console.log('市政——桥梁')
        this.advancedProjectRoadFlagE2 = true
        this.advancedFlagI = false
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE1 = false
      }else {
        this.advancedFlagI = false
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE1 = false
        this.advancedProjectRoadFlagE2 = false  
      }
    },
    //下拉选择单位工程类型时
    cascaderProjectTypesFun(val){
      console.log(val)
      if (this.queryInfo.dwgclx == '' || this.queryInfo.dwgclx == null) {
        this.advancedFlag = false
        this.advancedFlagI = false
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE1 = false
        this.advancedProjectRoadFlagE2 = false 
        this.searchProjectListFun() 
        return
      }
      if (val.charAt(0) === 'I') {
        this.advancedFlag = true
        this.advancedSearchFun()
      } else if (val.charAt(0) === 'Q') {
        this.advancedFlag = true
        this.advancedSearchFun()
      } else if (val.substr(0,val.indexOf('.')) === 'E1' || val.substring(0,2) === 'E1') {
        this.advancedFlag = true
        this.advancedSearchFun()
      } else if (val.substr(0,val.indexOf('.')) === 'E2' || val.substring(0,2) === 'E2') {
        this.advancedFlag = true
        this.advancedSearchFun()
      }else {
        this.advancedFlag = false
        this.advancedFlagI = false
        this.advancedFlagQ = false
        this.advancedProjectRoadFlagE1 = false
        this.advancedProjectRoadFlagE2 = false 
        this.searchProjectListFun()  
      }
    },
    //单位工程级 列表获取
    searchProjectListFun(){
      
        this.queryInfo.page_num = this.currentPage,
        this.queryInfo.page_size = this.pageSize,
      searchProjectList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.searchProjectListFun()
         }
        // if (res.total == 0) {
        //   this.message({ message: '未查询到对应条件数据，请更换查询条件进行查询', type: 'success' })
        // }
          res.list.map(v => {
           this.getSearchAudioFilesListProjectIdFun(v)
           v.sxflag = this.sxflag
            this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
            return
          })
          console.log(res.list)
        this.EngineeringList = res.list

        }
      })
    },
    //查看 
    gotodetailsFun(row){
      this.$router.push({ 
        path: '/RecorSearch/SearchEngineering/searchProjectPage', 
        query: { 
           project_id: row.project_id,
           gclx: row.gclx,
           zt:row.zt
           }
        })
    },
    //项目详情
    searchEngineeringEngineeringIdFun(row){
      this.Engineering_id = row.engineering_id
      console.log(this.Engineering_id)
      this.dialogEngineeringdetailsVisible = true
      console.log(row)
      var zt = ''
      if (this.queryInfo.ly == '1') {
        zt = 'file_status5'
      } else {
        zt = 'file_status3'
      }
     this.zt = zt
      const q = {
        engineering_id:row.engineering_id,
        zt:zt
      }
      console.log(q)
      
    },

    //批量导出
    searchEngineeringDownloadFun(){
      var engineeringIds = []
      this.ids.forEach((item,index) =>{
        console.log(item)
        if (index == 0) {
           engineeringIds = item
        } else {
          engineeringIds = engineeringIds+'#'+item
        }
      })
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        project_ids:engineeringIds
      }
      downloadSearchProject(q).then(response =>{
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
        Download.download(
          blob,
          fileName
        )
      })
    },
    //工程列表查询 获取
    queryEngineering(){
      
      searchEngineeringList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        console.log(this.engineeringType)
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.queryEngineering()
         }
        res.list.map(v=>{
          this.engineeringType.forEach(t => {  //载体类型
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
        })
        this.EngineeringList = res.list
        }
      })
    },
    //重置查询条件
    queryEngineeringClear(){
      this.queryInfo = {
        ly:'',
        page_num:this.currentPage,
        page_size:this.pageSize,
        xmbh:'',
        gcmc:'',
        sgxkzh:'',
        ghxkzh:'',
        fz:'',
        gcdh:'',
        gcdd:'',
        gclx:'',
        sgdw:'',
      }
      this.advancedFlag = false
      this.searchProjectListFun() //工程列表
    },
        // 存储所有档案分类
    saveArchivesCateAll(res) {
      res.forEach(v => {
        this.archivesCateList.push(v)
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
          this.getUniProjectTypes(res)
          this.uniProjectType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

        // 递归判断列表，把最后的child设为undefined
    getTreeData(data) {
      for(var i = 0; i < data.length; i++){
        if(data[i].child.length < 1){
          // children若为空数组，则将children设为undefined
          data[i].child = undefined
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].child)
        }
      }
      return data
    },
 
    // 单位工程类型  多级选择
    getUniProjectTypes(res) {
      

          // res.forEach(v => {
          //   this.uniProjectTypes = v.child
          //   // if (this.gclx === v.type_code) {
          //   //   this.uniProjectTypes = v.child
          //   // }
          //   return
          // })
          this.uniProjectTypes = this.getTreeData(res)
          console.log(this.uniProjectTypes)
          return
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          res.forEach(v => {
            if (this.gclx === v.type_code) {
              this.uniProjectTypes = v.child
            }
            return
          })
          this.uniProjectTypes = this.getTreeData(this.uniProjectTypes)
        }
      }).catch(error => {
        console.log(error)
      })
    },
  //项目归属类别 归档或未归档
    selectsort(){
      console.log(this.queryInfo.ly)
      this.queryEngineering() //工程列表
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
    // 案卷列表选中的列 
    changeBox(selection) {
     this.ids = selection.map(item => item.project_id);
      this.selectedList = selection
      console.log(this.ids)
      console.log(this.selectedList)
    },
    //选中的列样式 高亮 改变  
    rowStyle({row}){
      var arr = this.ids;
      for(let i = 0; i < arr.length; i++){
        if(row.files_id === arr[i]){
          return 'rowStyle'
        }
      } 
    },
    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.searchProjectListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.searchProjectListFun()
    },
  },
      // 建筑工程类型
    getArchitecturel() {
      const q = {
        bm: "JZGCLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.architecture  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
}
</script>

<style scoped lang='less'>
.rowStyle{
    background-color:#ecf5ff!important;
  }
  .pstext {
    color: red;
    margin-bottom: 10px;
  }
  .advancedSearchDIV {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #dedede;
    border-radius: 5px;
    width: 100%;
  }
</style>
