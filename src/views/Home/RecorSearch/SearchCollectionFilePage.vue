<template>
  <div class="description">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><el-button plain icon="el-icon-arrow-left" size="small" @click="goBackPage">返回</el-button></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案查询</el-breadcrumb-item>
      <el-breadcrumb-item>声像档案查询</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card class="box-main-card">
         <el-row>
           <el-col :span="24">
             <!-- 文件 -->
             <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="110px">
               <el-form-item label="题名">
                 <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入题名" @change="getSearchAudioCollectionFileListFun"></el-input>
               </el-form-item>
            <el-form-item label="拍摄起始时间">
              <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择拍摄起始时间" v-model="queryInfo.start_time" @change="getSearchAudioCollectionFileListFun"></el-date-picker>
            </el-form-item>
             <el-form-item label="拍摄终止时间">
              <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择	拍摄终止时间" v-model="queryInfo.end_time" @change="getSearchAudioCollectionFileListFun"></el-date-picker>
            </el-form-item>
            <el-form-item label="拍摄者">
              <el-input clearable v-model="queryInfo.psz" placeholder="请输入拍摄者" @change="getSearchAudioCollectionFileListFun"></el-input>
            </el-form-item>
            <el-form-item label="拍摄地点">
              <el-input clearable v-model="queryInfo.psdd" placeholder="请输入拍摄地点" @change="getSearchAudioCollectionFileListFun"></el-input>
            </el-form-item>
            <el-form-item label="人物">
              <el-input clearable v-model="queryInfo.rw" placeholder="请输入人物" @change="getSearchAudioCollectionFileListFun"></el-input>
            </el-form-item>
            <el-form-item label="事件">
              <el-input clearable v-model="queryInfo.sj" placeholder="请输入事件" @change="getSearchAudioCollectionFileListFun"></el-input>
            </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getSearchAudioCollectionFileListFun">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

          </el-card>
         <el-card>
          <!-- 列表区 -->
              <div class="eltablebox" style="padding:0px">
               <el-col>
                 <!-- 文件 -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-upload2" @click="downloadSearchFileAudioFun()">批量导出附件</el-button>
                  </el-form-item>
                   <el-form-item>
                    <el-button type="primary" icon="el-icon-upload2" @click="exportSearchAudioCollectionFileFun('批量导入文件')">批量导出附件信息</el-button>
                  </el-form-item>
                </el-form>
              </el-col> 
            <!-- 案卷文件列表 -->
            <el-table
              
              :data="documentList"
              key="three"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed
                label="序号"
                width="50">
                 <template slot-scope="scope">
                  <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
              </el-table-column>
              <el-table-column
                prop="zdjh"
                label="总登记号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="档号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="wjtm"
                label="题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                prop="field_one"
                label="分类号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="psdd"
                label="拍摄地点"
                width="200">
              </el-table-column>
              <el-table-column
                prop="pssj"
                label="拍摄时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.pssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="psz"
                label="拍摄者"
                width="200">
              </el-table-column>
              <el-table-column
                prop="pszdw"
                label="拍摄单位"
                width="200">
              </el-table-column>
              <el-table-column
                prop="dpbh"
                label="底片编号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="sbName"
                label="色别"
                width="200">
              </el-table-column>
              <el-table-column
                prop="pxName"
                label="片型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="dpwz"
                label="底片位置"
                width="200">
              </el-table-column>
              <el-table-column
                prop="kcdz"
                label="库存地址"
                width="200">
              </el-table-column>
              <el-table-column
                prop="lrsj"
                label="著录时间"
                width="200">
                <template slot-scope="scope">
                  {{scope.row.lrsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="200"
               fixed="right"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit"  @click="detailsVisibleFun(scope.row)">详 情</el-button>
                  <el-button type="primary" size="small" @click.native="getSearchAudioCollectionFileUrlFileIdFun(scope.row)">文件预览</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[50, 100, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
              >
            </el-pagination>

            </div>
          </el-card>

 

    <!-- 新增文件弹层 B-->
    <el-dialog
      title="详情"
      :visible.sync="detailsVisible"
      width="60%"
    >
       <table class="mailTable" >
          <tr >
            <td class="column">题名：</td>
            <td colspan="3">{{fileDetails.wjtm}}</td>
          </tr>
          <tr >
              <td class="column">档号：</td>
              <td >{{fileDetails.wjdh}}</td>
              <td class="column">总登记号：</td>
              <td >{{fileDetails.zdjh}}</td>
            </tr>
            <tr >
              <td class="column">拍摄者：</td>
              <td >{{fileDetails.psz}}</td>
              <td class="column">拍摄地点</td>
              <td >{{fileDetails.psdd}}</td>
            </tr>
            <tr >
              <td class="column">事件：</td>
              <td >{{fileDetails.sj}}</td>
              <td class="column">拍摄时间：</td>
              <td >{{fileDetails.pssj | formatDate}}</td>
            </tr>
          <tr >
            <td class="column">拍摄者单位：</td>
            <td >{{fileDetails.pszdw}}</td>
            <td class="column">色别：</td>
            <td >{{fileDetails.sbName}}</td>
          </tr>
          <tr >
            <td class="column">底片规格：</td>
            <td >{{fileDetails.dpggName}}</td>
            <td class="column">片型：</td>
            <td >{{fileDetails.pxName}}</td>
          </tr>
          <tr >
            <td class="column">底片位置：</td>
            <td >{{fileDetails.dpwz}}</td>
            <td class="column">底片编号：</td>
            <td >{{fileDetails.dpbh}}</td>
          </tr>
          <tr >
            <td class="column">人物：</td>
            <td >{{fileDetails.rw}}</td>
            <td class="column">编制日期：</td>
            <td >{{fileDetails.bzrq | formatDate}}</td>
          </tr>
          <tr >
            <td class="column">存放位置：</td>
            <td >{{fileDetails.cfwz}}</td>
            <td class="column">分辨率：</td>
            <td >{{fileDetails.fbl}}</td>
          </tr>
          <tr >
            <td class="column">文件大小：</td>
            <td >{{fileDetails.wjdx}}</td>
            <td class="column">内容：</td>
            <td >{{fileDetails.nr}}</td>
          </tr>
          <tr >
            <td class="column">库存地址：</td>
            <td >{{fileDetails.kcdz}}</td>
            <td class="column">光盘号：</td>
            <td >{{fileDetails.gph}}</td>
          </tr>
          <tr >
            <td class="column">联系电话：</td>
            <td >{{fileDetails.lxdh}}</td>
            <td class="column">入馆时间：</td>
            <td >{{fileDetails.rgsj}}</td>
          </tr>
          <tr >
            <td class="column">备注：</td>
            <td colspan="3">{{fileDetails.fz}}</td>
          </tr>
        </table>
    </el-dialog>
    <!-- 新增文件弹层 E-->

         <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />

  </div>
</template>

<script>
import {
  importAudioPictureFile,
  addAudioPictureFile,
  updateAudioPictureFile,
  removeFileAudio,


  downloadAudioModel,
  downloadSearchFileAudio,
  exportSearchAudioCollectionFile,
  getSearchAudioCollectionFileList,
  getSearchAudioCollectionFileUrlFileId,
} from '@/api/audioPicture'

import Download from "@/utils/download"
import {
  parseTime
} from "@/utils/index"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getArchivesCateList,
} from '@/api/archivesCate'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import { forEach } from 'jszip'

export default {
  components: {
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        wjtm:'',
        wjdh:'',
      },
      documentList:[],//文件列表
      files_id:'',//案卷ID
      importDialogVisible:false, //批量导入弹层条件
      importTitle:"",//导入弹层 标题
      addfileDialogVisible:false,//新增文件弹层
      titleName:"新增文件",//弹层名称
      addfileeForm:{},//新增文件表单 

      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_code',
        children: 'child',
        emitPath: false
      },
      PieceType:[], //片型
      SpecificationFilm:[], //底片规格
      ColorCode:[], //色别
      archivesCateList:[],//单位工程类型
      uniProjectType:[],//单位工程类型
      engineeringType: [],  // 工程类型
      fileDialogVisible:false, //文件预览弹层图层 显示隐藏判断条件
      fileURLym:'',//文件预览域名
      filesType:"",//案卷类型
      detailsVisible:false,//文件详情 弹层
      fileDetails:{},//文件详情
      file_ids:[], //文件ID
    }
  },
  created () {
    this.files_id = this.$route.query.filesid
    this.filesType =  this.$route.query.filesType
  },
  mounted () {
    this.getPieceType() //片型
    this.getSpecificationFilm() //底片规格
    this.getColorCode() //色别
    this.getEngineeringTypeFun() //获取工程类型
    this.getSearchAudioCollectionFileListFun()
    this.querySystemDictionaryFun() //获取文件预览域名
  },

  methods: {
  // type your function
  handleSelectionChange(val){
    this.file_ids = []
    val.forEach(item =>{
      this.file_ids.push(item.file_id)
    })
  },

  //声像档案管理文件级附件下载
  downloadSearchFileAudioFun(){
    const that = this
    if (this.file_ids.length == 0) return this.message({ message: '请勾选需要导出的文件', type: 'warning' })
    const q = {
      file_ids:this.file_ids.join('#')
    }
    downloadSearchFileAudio(q).then(response => {
          let headersName = ''
          if (response.headers['content-disposition']) {
            headersName = response.headers['content-disposition'].split('=')[1]
          }
          const fileName = decodeURI(headersName)
          const blob = new Blob([response.data], { type: 'aplication/zip' })
          Download.download(
            blob,
            fileName
          )
       
        }).catch(error => {
          console.log(error)
        })
    

  // var url = that.fileURLym + response.data.data.digitFileCatalogue[0].file_url
        // window.open(url, '_blank')
  },
  // 导出馆藏档案文件信息
  exportSearchAudioCollectionFileFun(){
    console.log(this.file_ids.length)
    if (this.file_ids.length == 0) return this.message({ message: '请勾选需要导出的文件', type: 'warning' })
    const q = {
      file_ids:this.file_ids.join('#')
    }
    exportSearchAudioCollectionFile(q).then(response => {
        let headersName = ''
        if (response.headers['content-disposition']) {
          headersName = response.headers['content-disposition'].split('=')[1]
        }
        let fileName = decodeURI(headersName)
        console.log(headersName)
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
        Download.download(
          blob,
          fileName
        )
      }).catch(error => {
        console.log(error)
      })
  },
  // 文件详情
  detailsVisibleFun(row){
    console.log(row)
    this.fileDetails = row
    this.detailsVisible = true
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
            }
          }).catch(error => {
            console.log(error)
          })
    },

    //文件预览
    getSearchAudioCollectionFileUrlFileIdFun(row){
        const that = this
      const q ={
        file_id:row.file_id
      }   
      getSearchAudioCollectionFileUrlFileId(q).then(response =>{
        let fileUrlArr = response.data.data
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        if(fileUrlArr.length == 0) return this.message({ message: '暂无可预览文件', type: 'warning' })
          this.FileUrlArrs = fileUrlArr.map(function (n) {
              return that.fileURLym + n.file_url+'?'+new Date();
          });
         this.fileDialogVisible = true 
        }
      })
    },

      // 下载导入模板
    downloadTelplate() {
      downloadAudioModel().then(response => {
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
      }).catch(error => {
        console.log(error)
      })
    },

    //获取文件列表
    getSearchAudioCollectionFileListFun(){

      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      this.queryInfo.files_id = this.files_id

      getSearchAudioCollectionFileList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.total = res.total
         
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getSearchAudioCollectionFileListFun()
         }
         res.list.forEach(v => {
          this.ColorCode.forEach(t => {
              if (v.sb === t.bm) {
                v.sbName = t.mc
              }
              return
            })

           this.SpecificationFilm.forEach(t => {
            if (v.dpgg === t.bm) {
              v.dpggName = t.mc
            }
            return
          })

           this.PieceType.forEach(t => {
            if (v.px === t.bm) {
              v.pxName = t.mc
            }
            return
          })

          return
        })
       
         this.documentList = res.list
        }
      })
    },

    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getSearchAudioCollectionFileListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getSearchAudioCollectionFileListFun()
    },
    // 返回上一页
    goBackPage() {
      this.$router.go(-1)
    },

        // 片型
    getPieceType() {
      const q = {
        bm: "DICT_PX"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.PieceType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },   
    // 底片规格
    getSpecificationFilm() {
      const q = {
        bm: "DICT_DPGG"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.SpecificationFilm  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 色别
    getColorCode() {
      const q = {
        bm: "DICT_SB"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.ColorCode  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })

          res.map(item =>{
            item.child.forEach(element => {
              element.child = undefined  //去掉第三级选择
            });
          })
          // this.manageProjectCate(res)
          this.engineeringType = res
        }
      }).catch(error => {
        console.log(error)
      })
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
          this.uniProjectType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },

}
</script>

<style scoped lang='less'>
.box-main-card{
        border:0 none;
        margin-bottom: 10px;
        box-shadow: none;
      }
</style>
<style lang="less" scoped>
/deep/ .el-scrollbar {
    padding-bottom: 30px;
  box-sizing: border-box;
	.el-scrollbar__wrap {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
    .mailTable {width: 100%;}
    .mailTable tr thead {line-height: 40px;font-size: 18px;font-weight: 700;}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 280px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>