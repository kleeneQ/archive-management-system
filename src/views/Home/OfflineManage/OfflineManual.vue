<template>
  <div >
    <!-- 头部 面包屑导航 B --> 
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业报送接收</el-breadcrumb-item>
        <el-breadcrumb-item>接收审核</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部 面包屑导航 E -->
      <div class="bodybox">
        <el-row>
          <el-col :span="6">
            <el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">上一步</el-button>
          </el-col>
        </el-row>
        <ul class="Steps">
        　<li class="active"><strong>1</strong> 系统初审 <br> <span>查缺、查误</span></li>
        　<li class="active"><strong>2</strong> 初审报告</li>
          <li class="active"><strong>3</strong> 人工复审 <br> <span>真实性、完整性</span></li>
        　<li><strong>4</strong> 生成审核意见报告</li>
        </ul>
        <div class="centerbox">
          <el-container>
          <el-aside>
            <el-card class="box-card" >
              <!-- current-node-key  当前选中的节点 -->
              <!-- accordion  是否每次只打开一个同级树节点展开 -->
              <el-tree
                :data="treeData"
                :props="defaultProps"
                :highlight-current="true"
                :default-expand-all="true"
                :expand-on-click-node="false"
                ref="tree"
                node-key="treeId"
                @node-click="handleNodeClick"
                style="max-height:730px;overflow:scroll;"
               
              ></el-tree>
            </el-card>
          </el-aside>
          <el-main class="box-main">
            <el-card class="box-main-card" >
            <el-row>
              <el-col :span="24">
                <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline" >
                  <el-form-item label="文件题名">
                    <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名" @change="getOfflineManualFileListFilesIdFun"></el-input>
                  </el-form-item>
                   <el-form-item label="文本动态">
                    <el-select v-model="queryInfo.wjdt" placeholder="请选择文本动态" @change="getOfflineManualFileListFilesIdFun">
                      <el-option  label="全部" value="" ></el-option>
                      <el-option  label="重新提交" value="file_dynamic2" ></el-option>
                      <el-option  label="首次提交" value="file_dynamic1" ></el-option>
                      <el-option  label="新增" value="file_dynamic3" ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="审核状态">
                    <el-select v-model="queryInfo.zt" placeholder="请选择审核状态" @change="getOfflineManualFileListFilesIdFun">
                      <el-option  label="全部" value="" ></el-option>
                      <el-option  label="待审核" value="file_status2" ></el-option>
                      <el-option  label="已通过" value="file_status3" ></el-option>
                      <el-option  label="不通过" value="file_status4" ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getOfflineManualFileListFilesIdFun()">查询</el-button>
                  </el-form-item>
      
                </el-form>
              </el-col>
              <el-col :span="24">
                <div class="FileCountstyle FileCountstyle1">通过数：{{passNum}} 份</div>
                <div class="FileCountstyle FileCountstyle2">不通过数：{{unPassNum}} 份</div>
                <div class="FileCountstyle FileCountstyle3">重新提交：{{secondSubmitNum}} 份</div>
                <div class="FileCountstyle FileCountstyle4">首次提交：{{firstSubmitNum}} 份</div>
                <div class="FileCountstyle FileCountstyle5">新增：{{newNum}} 份</div>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
            <el-col>
              <el-form :inline="true" :model="queryInfo" class="demo-form-inline el-form-item1" >
                <el-form-item>
                  <el-button type="warning" icon="el-icon-setting"  @click="showDialoBatchAuditFun()">批量审核</el-button>
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
        <!-- 文件列表 B -->
          <el-table
              :data="fileList"
              border
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              max-height="500"
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="250">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                show-overflow-tooltip
                width="150">
              </el-table-column>
              <el-table-column
                prop="sl"
                label="数量(页/张)"
                show-overflow-tooltip
                width="100">
              </el-table-column>
              <el-table-column
                prop="wjdtName"
                label="文件动态"
                show-overflow-tooltip
                width="150">
              </el-table-column>
              <el-table-column
                prop="ztName"
                label="审核状态"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="csjgms"
                label="审核结果描述"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="250">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogFilesdetailsVisibleFun('详情',scope.row)">详情</el-button>
                  <el-button type="primary" size="small" class="btnedit" @click="showfileDialogFun('预览',scope.row)">预览</el-button>
                  <el-button type="warning" size="small"  @click="showDialogAuditFun('审核',scope.row)">审核</el-button>
                </template>
              </el-table-column>
          </el-table>
        <!-- 文件列表 E -->
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

          </el-card>
          </el-main>
          </el-container>
        </div>
      <div class="netbtnstyle">
        <el-button  @click="gotoPage">保存，生成审核意见报告</el-button>
      </div>  
    </div> 
            <!-- 案卷详情 B -->
          <el-dialog :title="'详情'" :visible.sync="dialogprojectdetailsVisibleFiles" width="70%">
            <specialtyDetailsFiles v-if="dialogprojectdetailsVisibleFiles" :project_id='project_id' :zt='zt' :source="isActive" :filesrow='filesrow'></specialtyDetailsFiles>
          </el-dialog>
        <!-- 案卷详情 E -->
            <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />

    <!-- 审核弹层 E-->
     <el-dialog
      :title="'审核'"
      :visible.sync="AuditDialogVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="是否通过：" prop="pass">
          <el-radio-group v-model="form.pass" >
            <el-radio label="1">通过</el-radio>
            <el-radio label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核描述：" class="margin-top-10">
          <el-input type="textarea" :rows="3" v-model="form.desc" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">取消</el-button>
          <el-button type="primary" @click="onSubmitAudit('form')">提交审核</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 审核弹层 B-->
  </div>
</template>

<script>
import {
  parseTime,
  modifiTrees,
  moveUp,
  moveDown,
  modifiTreesdigit,
  modifiTreesdigit1
} from "@/utils/index"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getOfflineLackEnclosure,
  getOfflineFileCount,
  getOfflineLackFileList,
  getOfflineLackFileHandle,
  getOfflineListSide,
  getOfflineManualFileListFilesId,
  getOfflineManualFileCount,
  getOfflineManualFileGetUrl,
  getOfflineManualFileUrlFileId,
  getOfflineManualFileCheck,
} from '@/api/OfflineManage'
import specialtyDetailsFiles from '@/components/audit/offlinedetailsFiles'
export default {
    components: {
    specialtyDetailsFiles,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      total: 0,//总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      isActiveId:'',//案卷 文件 ID
      isActive:'',
      treeData: [],  // 左侧树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeId:'',
      queryInfo:{
        zt:'',
        wjdt:'',
        wjtm:'',
        page_num:1,
        page_size:10,
      },
      fileList:[],
      carrierType:[],//文件级载体类型
      file_status:[],//审核状态
      firstSubmitNum:'',
      newNum:'',
      passNum:'',
      secondSubmitNum:'',
      unPassNum:'',
      fileURLym:'',//文件预览域名
      selectedList:[],//选中的案卷
      dialogprojectdetailsVisibleFiles:false,//文件详情 弹层
      fileDialogVisible:false,//文件预览 弹层
      AuditDialogVisible:false,//审核弹层
      form:{
        pass:'1',
        desc:'',
      },
      files_id:'',//案卷ID
    }
  },
  created () {
    this.project_id = this.$route.query.project_id
    this.engineering_id = this.$route.query.engineering_id
    this.getOfflineListSideFun() //企业报送接收获取项目侧边栏数据
    this.getCarrierType() //文件级载体类型
    this.getSystemDictionary() //审核状态
    this.getSystemFileDynamic() //文件动态
    this.querySystemDictionaryFun() //文件预览域名
  },
  mounted () {
    
    this.querySystemDictionaryFun() //文件预览域名
  },
  methods: {
    //下一步
    gotoPage(){
      this.$router.push({  
            path: '/OfflineManage/OfflineCheckOpinion',  
            query: {
              project_id: this.project_id,
              engineering_id: this.engineering_id,
            },
        }) 
    },

    //批量审核
    showDialoBatchAuditFun(){
      if(this.selectedList.length < 1) return  this.message({ message: "请勾选需要批量审核的文件", type: 'error' })
      if (this.selectedList.length >1) {
        var filesidstring = ''
          this.selectedList.forEach((item)=>{
          if (filesidstring === '') {
            filesidstring = item.file_id
          } else {
             filesidstring = filesidstring+"#"+item.file_id
          }
          this.file_id = filesidstring
        })  
        
      } else {
        this.file_id = this.selectedList[0].file_id
      }
      this.AuditDialogVisible = true
    },


       // 审核按钮  审核弹层显示
    showDialogAuditFun(name,row){
      console.log(row)
      this.file_id = row.file_id
      this.AuditDialogVisible = true
    },
       //提交审核
    onSubmitAudit(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        const q = {
          file_id:this.file_id,
          zt:this.form.pass,
          csjgms:this.form.desc,
        }

        getOfflineManualFileCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.getOfflineManualFileListFilesIdFun() 
              this.resetForm()
            }
          })
       
      } else {
        console.log('error submit!!');
        return false;
      }
    });
      
    },
    //取消提交
    resetForm() {
      this.$refs['form'].resetFields();
      this.AuditDialogVisible = false
      this.form.desc = ''
    },

     //打开文件预览弹层
    showfileDialogFun(name,row){
      console.log(this.fileURLym)
      const that = this
      const q = {
        file_id:row.file_id
      }
      //获取文件地址
        getOfflineManualFileUrlFileId(q).then(response => {
          let fileUrlArr = response.data.data
            if (response.status === 200) {
              if (response.data.data === ''|| response.data === "" ||response.data.status !== 200) {
                 this.message({ message:'文件预览失败', type: 'error' })
                //  this.message({ message:response.data.message, type: 'error' })
              }else if(response.data.data.length == 0){
                this.message({ message:'文件预览失败，该文件下未挂接附件', type: 'error' })
              }else {
              let file_url = response.data.data[0].file_url
              let wjlx = file_url.slice(file_url.lastIndexOf('.') + 1)
                if (wjlx === 'pdf') {
                    let url = that.fileURLym + file_url
                    window.open(url, '_blank')
                } else {
                  const qq = {
                    dict_tag:'file_server_url'
                  }
                  //预览图片数组
                  //获取文件预览域名+地址的数组
                   this.FileUrlArrs = fileUrlArr.map(function (n) {
                        return that.fileURLym + n.file_url;
                      });
                      this.fileDialogVisible = true
                }
              }
            }
          }).catch(error => {
            console.log(error)
          })
    },
    
        //案卷文件详情 弹层
    dialogFilesdetailsVisibleFun(name,row){
      console.log(row)
      this.filesrow = row
      if (name == '案卷详情') {
        this.isActive = 'project'
        this.isActiveId = row.files_id
      } else {
        this.isActive = 'files'
        this.isActiveId = row.file_id
      }
      this.zt = row.zt
      this.dialogprojectdetailsVisibleFiles = true
    },


    //预览 封面 目录 备考表
    showDialoimgview(data){
      const that = this
      that.FileUrlArrs = []
      // if(this.selectedList.length < 1) return  this.message({ message: "请勾选需要查看的案卷", type: 'error' })
      const q = {
        files_id:this.treeId
      }
      getOfflineManualFileGetUrl(q).then(response =>{
        if (response.status === 200) {
          var str = response.data.data.digitFileCover[0]
          console.log(response.data.data.digitFileCover)
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
              if (data === '案卷封面') {
              var url = that.fileURLym + response.data.data.digitFileCover[0]
              window.open(url, '_blank')
            } else if (data === '卷内目录') {
              var url = that.fileURLym + response.data.data.digitFileCatalogue[0]
              window.open(url, '_blank')
            } else if (data === '备考表') {
              var url = that.fileURLym + response.data.data.digitFileReference[0]
              window.open(url, '_blank')
            }
          } else {
            that.FileUrlArrs = []
              if (data === '案卷封面') {
              var url = that.fileURLym + response.data.data.digitFileCover[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            } else if (data === '卷内目录') {
              var url = that.fileURLym + response.data.data.digitFileCatalogue[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            } else if (data === '备考表') {
              var url = that.fileURLym + response.data.data.digitFileReference[0].file_url
              that.FileUrlArrs.push(url)
              that.DialogVisibleimgview = true
            }
          }
        
          // that.FileUrlArrs
        }
      })
    },

  //企业报送接收人工复审数据统计
getOfflineManualFileCountFun(){
  const q ={
    files_id:this.treeId
  }
  getOfflineManualFileCount(q).then(response =>{
   if (response.status === 200) {
    const { data: res, message, status } = response.data
    if (status !== 200) return this.message({ message: message, type: 'error' })
     

     this.firstSubmitNum=res.firstSubmitNum
     this.newNum=res.newNum
     this.passNum=res.passNum
     this.secondSubmitNum=res.secondSubmitNum
     this.unPassNum=res.unPassNum
    }
  })
},
  //批量多选
handleSelectionChange(val){
  this.selectedList = val
},
//企业报送接收人工复审根据案卷id获取文件列表
  getOfflineManualFileListFilesIdFun(){
    const q ={
      files_id:this.treeId,
      zt:this.queryInfo.zt,
      wjdt:this.queryInfo.wjdt,
      wjtm:this.queryInfo.wjtm,
      page_num:this.queryInfo.page_num,
      page_size:this.queryInfo.page_size,
    }
    getOfflineManualFileListFilesId(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getOfflineManualFileListFilesIdFun()
         }
        res.list.map(v => {
          this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
          this.file_status.forEach(t => {
              if (v.zt === t.dict_code) {
                if (v.zt ==  'file_status4') {
                  v.ztName = '不通过'
                }else {
                  v.ztName = t.dict_name
                }
              }
              return
            })
          this.file_dynamic.forEach(t => {
              if (v.wjdt === t.dict_code) {
                v.wjdtName = t.dict_name
              }
              return
            })
        })
       this.fileList = res.list
       this.getOfflineManualFileCountFun() //企业报送接收人工复审数据统计
      }
    })
  },
  //企业报送接收获取项目侧边栏数据
  getOfflineListSideFun(){
    const q = {
      engineering_id: this.engineering_id,
      project_id: this.project_id,
    }
    if (this.treeId == '')  {
        this.treeId = this.engineering_id
      }
    getOfflineListSide(q).then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       const newTress = modifiTreesdigit1(res)
       this.treeData = newTress
      }
      console.log(this.treeData)
       this.treeId = this.treeData[0].children[0].children[0].treeId
      this.getOfflineManualFileListFilesIdFun()
        this.$nextTick(function(){ 
          this.$refs['tree'].setCurrentKey(this.treeData[0].children[0].children[0].treeId); //默认选中第一条数据 高亮
        })
      
    })
  },
     // 获取点击节点
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    // 利用数据的层级作为唯一性判断
    handleNodeClick(data) {
      console.log(data)
      console.log(data.treeLevel)
      this.queryInfo = {
        zt:'',
        wjdt:'',
        wjtm:'',
        page_num:1,
        page_size:10,
      }
      if (data.treeLevel == 'engineering') {
        data = data.children[0].children[0]
      }else if (data.treeLevel == 'project') {
        data = data.children[0]
      }
      // console.log(data)
        this.engineering_id = data.treeId
        this.currentPage = 1
        this.pageSize = 10
        this.total = 0
        this.treeId = data.treeId
        this.$nextTick(function(){ 
          this.$refs['tree'].setCurrentKey(this.treeId); //默认选中第一条数据 高亮
        })
       this.getOfflineManualFileListFilesIdFun()
    },
        // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.page_size = newSize
      this.getOfflineManualFileListFilesIdFun() 
    },

    // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.queryInfo.page_num = newPage
      this.getOfflineManualFileListFilesIdFun() 
      
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
        //审核状态
        getSystemDictionary(){
       const q = {
          dict_tag:'file_status'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { 
            
            if (response.status === 200) {
              this.file_status = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
     //文件动态
        getSystemFileDynamic(){
       const q = {
          dict_tag:'file_dynamic'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { 
            
            if (response.status === 200) {
              this.file_dynamic = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
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

       // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang='less'>
  .FileCountstyle {
    line-height: 30px;
    border-radius: 10px;
    padding: 0 15px;
    box-sizing: border-box;
    display: inline-block;
    margin: 10px;
    color: #fff;

  }
  .FileCountstyle1 {
    background-color:  rgba(26, 188, 156, 1);
  }
  .FileCountstyle2 {
    background-color: rgb(188, 50, 26);
  }
  .FileCountstyle3 {
    background-color: rgb(188, 185, 26);
  }
  .FileCountstyle4 {
    background-color: rgb(174, 26, 188);
  }
  .FileCountstyle5 {
    background-color: rgb(26, 164, 188);
  }

</style>
