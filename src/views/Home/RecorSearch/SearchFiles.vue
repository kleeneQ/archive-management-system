<template>
  <div >
   <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案查询</el-breadcrumb-item>
      <el-breadcrumb-item>案卷级查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->

      <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="案卷名称">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷名称"  @change="searchProjectListFun"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号"  @change="searchProjectListFun"></el-input>
            </el-form-item>
            <el-form-item label="编制单位">
              <el-input clearable v-model="queryInfo.bzdw" placeholder="请输入编制单位"  @change="searchProjectListFun"></el-input>
            </el-form-item>
            <el-form-item label="载体类型">
              <el-select v-model="queryInfo.ztlx" placeholder="请选择载体类型" clearable>
                  <el-option
                    v-for="item in filescarrierType"
                    :key="item.bm"
                    :label="item.mc"
                    :value="item.bm">
                  </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="起始时间">
                 <el-date-picker
                  v-model="queryInfo.qssj"
                    value-format='yyyy-MM-dd'
                  type="date"
                  placeholder="请选择开工日期">
                </el-date-picker>
             </el-form-item>
            <el-form-item label="终止时间">
                  <el-date-picker
                    v-model="queryInfo.zzsj"
                    value-format='yyyy-MM-dd'
                    type="date"
                    placeholder="请选择竣工日期">
                  </el-date-picker>
               </el-form-item>
            <el-form-item label="附注">
              <el-input clearable v-model="queryInfo.fz" placeholder="请输入附注"  @change="searchProjectListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchProjectListFun">查询</el-button>
              <el-button type="info" @click="queryEngineeringClear">重置</el-button>
            </el-form-item>
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
                      <el-form-item>
                    <el-button type="primary"  @click="showDialoimgview('案卷封面')">案卷封面</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"  @click="showDialoimgview('卷内目录')">卷内目录</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"  @click="showDialoimgview('备考表')">备考表</el-button>
                  </el-form-item>
                </el-form>

              </el-col> 
            <!-- 工程列表 B -->
            <el-table
              :data="EngineeringList"
              border
              style="width: 100%"
              @selection-change="changeBox"
              class="tablestyle"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
            <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column 
              align="center" 
              prop="ajdh" 
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
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajlbName"
                label="案卷类别"
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="bzdw"
                label="编制单位"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="jk"
                label="脊宽"
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                prop="mjName"
                label="密级"
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                prop="bgqxName"
                label="保管期限"
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                prop="ztlxName"
                label="载体类型"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="qssj"
                label="起始时间"
                width="150">
                <template slot-scope="scope">
                  {{scope.row.qssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="zzsj"
                label="终止时间"
                width="150">
                <template slot-scope="scope">
                  {{scope.row.zzsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="存放位置"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.ajk">
                    {{scope.row.ajk-scope.row.ajg-scope.row.ajl-scope.row.ajc-scope.row.ajx}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajsxh"
                label="案卷顺序号"
                width="100">
              </el-table-column>
              <el-table-column
              align="center"
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="150">
                <template slot-scope="scope">
                  <el-button class="btnedit" type="primary" size="small" @click="dialogFilesdetailsVisibleFun('案卷详情', scope.row)">详情</el-button>
                  <el-button type="success" size="small" @click="gotodetailsFun(scope.row)">查看</el-button>
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
          <el-dialog :title="'详情'" :visible.sync="dialogprojectdetailsVisible" width="70%">
            <specialtyDetails v-if="dialogprojectdetailsVisible" :project_id='project_id' :zt='zt' :source="isActive"></specialtyDetails>
          </el-dialog>
        <!-- 单位工程详情 E -->
        
         <!-- 案卷详情 B -->
          <el-dialog :title="'案卷详情'" :visible.sync="dialogprojectdetailsVisibleFiles" width="70%">
            <specialtyDetailsFiles v-if="dialogprojectdetailsVisibleFiles" :project_id='project_id' :zt='zt' :source="isActive"></specialtyDetailsFiles>
          </el-dialog>
        <!-- 案卷详情 E -->
        <!-- 案卷封面、卷内目录、备考表 预览弹层 -->
     <el-image-viewer  
      v-if="DialogVisibleimgview"
      :on-close="()=>{DialogVisibleimgview=false}"
      :url-list="FileUrlArrs" />
  </div>
</template>

<script>
import Download from "@/utils/download"
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  searchEngineeringList,
  searchEngineeringDownload,
  searchEngineeringEngineeringId,
  searchProjectList,
  downloadSearchProject,
  searchFilesList,
  downloadSearchFiles,
  searchFilesListFilesId,
  getSearchFilesGetUrl,
} from '@/api/RecorSearch/recorsearch'
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
import detailsEngineering from '@/components/details/detailsEngineering'
import specialtyDetails from '@/components/details/detailsProject'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import specialtyDetailsFiles from '@/components/details/detailsFiles'
export default {
  components: {
    detailsEngineering,
    specialtyDetails,
    specialtyDetailsFiles,
  },
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num: 1,
        page_size: 10,
        ajtm: '',
        ajdh: '',
        ztlx: '',
        qssj: '',
        zzsj: '',
        jgsj: '',
        fz: '',
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
      filescarrierType:[],//案卷级载体类型
    
      fileCategory: [], // 案卷类别
      dialogprojectdetailsVisibleFiles:false, //案卷详情 弹层
      DialogVisibleimgview:false,//预览图片文件 弹层
      fileURLym:'',//预览文件域名
      selectedList:[],//选中的查看列
      ids:[],
    }
  },
  created () {
    this.getUniProjectType() // 单位工程类型 全部数据
    // this.getUniProjectTypes() // 单位工程类型 多级选择 
    
  },
  beforeMount(){
    this.getfilesCarrierType() //案卷级载体类型
    this.getFileCategory()  // 案卷类别
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.querySystemDictionaryFun() //文件预览地址

  },
  mounted () {
    this.searchProjectListFun() //单位工程级 列表获取
  },
  methods: {
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

          //预览
    showDialoimgview(value){
      const that = this
      that.FileUrlArrs = []
      if(this.selectedList.length < 1) return  this.message({ message: "请勾选需要查看的案卷", type: 'error' })
      const q = {
        files_id:this.selectedList[0].files_id
      }
      getSearchFilesGetUrl(q).then(response =>{
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
      //案卷详情 弹层
    dialogFilesdetailsVisibleFun(name,row){
      console.log(row)
      if (name == '案卷详情') {
        this.project_id = row.files_id
      } else {
        this.project_id = row.file_id
      }
      this.isActive = 'project'
      this.zt = row.zt
      this.dialogprojectdetailsVisibleFiles = true
      
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
      //案卷级载体类型
  getfilesCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.filescarrierType  = res
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
    //案卷级 列表获取
    searchProjectListFun(){
        this.queryInfo.page_num = this.currentPage,
        this.queryInfo.page_size = this.pageSize,
      searchFilesList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.searchProjectListFun()
         }
          res.list.map(v => {
            this.filescarrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            this.archivesCateList.forEach(t => {
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
            this.fileCategory.forEach(t => {
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
            this.storagePeriod.forEach(t => {
              if (v.bgqx === t.bm) {
                v.bgqxName = t.mc
              }
              return
            })
            this.secretGrade.forEach(t => {
              if (v.mj === t.bm) {
                v.mjName = t.mc
              }
              return
            })
            return
          })
        this.EngineeringList = res.list

        }
      })
    },
    //查看 
    gotodetailsFun(row){
      this.$router.push({ 
        path: '/RecorSearch/SearchEngineering/searchFilesPage', 
        query: { 
           project_id: row.files_id,
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
   // 案卷列表选中的列 
    changeBox(selection) {

     this.ids = selection.map(item => item.files_id);
      this.selectedList = selection
      console.log(this.ids)
      console.log(this.selectedList)
      return

      console.log(selection.length)
      if (selection.length >1) {
        selection = selection.pop() //取出最后一项选中的值row
        this.$refs.tableRef.clearSelection() //清空全部选中
        this.$refs.tableRef.toggleRowSelection(selection) //选中 单个赋值
      }
        console.log(selection,'啊哈哈哈')
      this.selectedList = []
      this.selectedList.push(selection)
      this.ids.push(selection.files_id)
      console.log(this.selectedList)
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
        files_ids:engineeringIds
      }
      downloadSearchFiles(q).then(response =>{
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
      if (this.queryInfo.kgsj !== undefined) {
          // 处理时间显示
          this.queryInfo.kgsj = parseTime(this.queryInfo.kgsj)
        }
       if (this.queryInfo.jgsj !== undefined) {
          // 处理时间显示
          this.queryInfo.jgsj = parseTime(this.queryInfo.jgsj)
        }
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
          this.engineeringType.forEach(t => {  
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
        ajtm: '',
        ajdh: '',
        ztlx: '',
        qssj: '',
        zzsj: '',
        jgsj: '',
        fz: '',
      }
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
}
</script>

<style scoped lang='less'>
.rowStyle{
    background-color:#ecf5ff!important;
  }
</style>
