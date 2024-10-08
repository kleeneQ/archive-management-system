<template>
  <div >
       <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>声像档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>馆藏目录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    
      <!-- 声像档案管理 光盘档案 B -->
     <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline"  label-width="110px">
            <el-form-item label="案卷题名">
              <el-input clearable  v-model="queryInfo.ajtm" placeholder="请输入案卷题名" @change="getAudioCollectionFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="关联工程名称">
              <el-input clearable v-model="queryInfo.glgcmc" placeholder="请输入关联工程名称" @change="getAudioCollectionFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="拍摄起始时间">
              <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择拍摄起始时间" v-model="queryInfo.start_time" @change="getAudioCollectionFilesListFun"></el-date-picker>
            </el-form-item>
             <el-form-item label="拍摄终止时间">
              <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择拍摄终止时间" v-model="queryInfo.end_time" @change="getAudioCollectionFilesListFun"></el-date-picker>
            </el-form-item>
            <el-form-item label="拍摄者">
              <el-input clearable v-model="queryInfo.psz" placeholder="请输入拍摄者" @change="getAudioCollectionFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="拍摄地点">
              <el-input clearable v-model="queryInfo.psdd" placeholder="请输入拍摄地点" @change="getAudioCollectionFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="分类号">
              <el-input clearable v-model="queryInfo.flh" placeholder="请输入分类号" @change="getAudioCollectionFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="人物">
              <el-input clearable v-model="queryInfo.rw" placeholder="请输入人物" @change="getAudioCollectionFilesListFun"></el-input>
            </el-form-item>
            <el-form-item label="载体类型">
              <el-select clearable  v-model="queryInfo.files_type" placeholder="请选择载体类型"  @change="getAudioCollectionFilesListFun">
                <el-option label="照片" value="AJJZTLX_DIC-3"></el-option>
                <el-option label="录像" value="AJJZTLX_DIC-5"></el-option>
                <el-option label="光盘" value="AJJZTLX_DIC-4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getAudioCollectionFilesListFun">查询</el-button>
            </el-form-item>
            
          </el-form>
        </el-col>
      </el-row>
      <div class="eltablebox">
        <!-- 案卷列表 -->
            <el-table
              :data="filesPictureFilesList"
              border
              ref="table"
              style="width: 100%"
              class="tablestyle"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
           
              <el-table-column
              align="center"
                prop="daxh"
                label="档案序号"
                show-overflow-tooltip
                min-width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="zh"
                label="总号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="flh"
                label="分类号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="pssj"
                label="拍摄时间"
                width="150">
                <template slot-scope="scope">
                  {{scope.row.pssj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="psdd"
                label="拍摄地点"
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="rw"
                label="人物"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="psz"
                label="拍摄者"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="nr"
                label="内容"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="glgcmc"
                label="关联工程"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="lrsj"
                label="录入时间"
                width="150">
                  <template slot-scope="scope">
                    {{scope.row.lrsj | formatDate}}
                  </template>
              </el-table-column>
              <el-table-column
              align="left"
                label="操作"
                fixed="right"
                width="250">
                <template slot-scope="scope">
                  <el-button type="primary" class="btnedit" size="small"  @click="detailsVisibleFun(scope.row)">详 情</el-button>
                  <el-button type="primary" size="small"    @click="gotoCollectionFilePageFun(scope.row)">查看档案</el-button>
                  <el-button type="primary" size="small" v-if="scope.row.files_type == 'AJJZTLX_DIC-3'"   @click="getAudioCollectionFilesPreviewFun(scope.row)">预 览</el-button>
               </template>
              </el-table-column>
            </el-table>
          
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
      <!-- 声像档案管理 光盘档案 E -->

            <!-- 文件预览弹层 -->
     <el-image-viewer  
             v-if="fileDialogVisible"
             :on-close="()=>{fileDialogVisible=false}"
             :url-list="FileUrlArrs" />

      <!-- 案卷详情   B -->
          <el-dialog
          width="60%"
          title="案卷详情"
          :visible.sync="detailsVisible">
        <table class="mailTable" >
          <tr >
            <td class="column">案卷题名：</td>
            <td colspan="3">{{filesDetails.ajtm}}</td>
          </tr>
          <tr >
              <td class="column">档号：</td>
              <td >{{filesDetails.ajdh}}</td>
              <td class="column">总登记号：</td>
              <td >{{filesDetails.zh}}</td>
            </tr>
            <tr >
              <td class="column">分类号：</td>
              <td >{{filesDetails.flh}}</td>
              <td class="column">拍摄地点</td>
              <td >{{filesDetails.psdd}}</td>
            </tr>
            <tr >
              <td class="column">拍摄者：</td>
              <td >{{filesDetails.psz}}</td>
              <td class="column">拍摄时间：</td>
              <td >{{filesDetails.pssj}}</td>
            </tr>
          <tr >
            <td class="column">事件：</td>
            <td >{{filesDetails.sj}}</td>
            <td class="column">底片数量：</td>
            <td >{{filesDetails.dpsl}}</td>
          </tr>
          <tr >
            <td class="column">照片数量：</td>
            <td >{{filesDetails.zpsl}}</td>
            <td class="column">黑白照片数量：</td>
            <td >{{filesDetails.hbzpsl}}</td>
          </tr>
          <tr >
            <td class="column">保管期限：</td>
            <td >{{filesDetails.bgqxName}}</td>
            <td class="column">密级：</td>
            <td >{{filesDetails.mjName}}</td>
          </tr>
          <tr >
            <td class="column">编制单位：</td>
            <td >{{filesDetails.bzdw}}</td>
            <td class="column">编制日期：</td>
            <td >{{filesDetails.bzrq}}</td>
          </tr>
          <tr >
            <td class="column">存放位置：</td>
            <td >{{filesDetails.cfwz}}</td>
            <td class="column">内容：</td>
            <td >{{filesDetails.nr}}</td>
          </tr>
          <tr >
            <td class="column">人物：</td>
            <td >{{filesDetails.rw}}</td>
            <td class="column">关联工程：</td>
            <td >{{filesDetails.glgcmc}}</td>
          </tr>
          <tr >
            <td class="column">备注：</td>
            <td colspan="3">{{filesDetails.fz}}</td>
          </tr>
        </table>
   </el-dialog>
    <!-- 案卷详情 E -->
  </div>
</template>

<script>
import {
    getAudioCollectionFilesList,
    getAudioCollectionFilesPreview,
} from '@/api/audioPicture'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  parseTime
} from "@/utils/index"
export default {
    components: {
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
  },
  data () {
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 50,  // 每页显示的条数
      queryInfo:{
        ajtm:'',
        glgcmc:'',
      },
      filesPictureFilesList:[],//获取档案列表 数据
      fileURLym:'',//文件预览域名
      fileDialogVisible:false,//文件预览弹层
      filesDetails:{},//案卷详情
      detailsVisible:false,//案卷详情预览弹层
      secretGrade:[],
      storagePeriod:[],
    }
  },
  created () {
    
  },
  mounted () {
     this.getSecretGrade()  // 密级
    this.getStoragePeriod()  // 保管期限
    this.getAudioCollectionFilesListFun() //声像档案查询获取馆藏案卷档案列表
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  methods: {
  // type your function

  //案卷下文件查看
  gotoCollectionFilePageFun(row){
       this.$router.push({ 
         path: '/audioPicture/CollectionFilePage', 
         query: {
              filesid: row.files_id
            }, 
        })
    },

  //案卷详情
  detailsVisibleFun(row){
    this.filesDetails = row
    this.detailsVisible = true
  },

  //文件预览
  getAudioCollectionFilesPreviewFun(row){
    const that = this
    const q ={
      files_id:row.files_id
    }
    getAudioCollectionFilesPreview(q).then(response =>{
      let fileUrlArr = response.data.data

     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       if (res.length == 0) return this.message({ message: '该案卷下暂无文件可预览', type: 'warning' })
        this.FileUrlArrs = fileUrlArr.map(function (n) {
              return that.fileURLym + n.file_url;
          });
         this.fileDialogVisible = true 
      }
    })
  },

    //声像档案查询获取馆藏案卷档案列表
    getAudioCollectionFilesListFun(){
      this.queryInfo.page_size = this.pageSize
      this.queryInfo.page_num = this.currentPage
      getAudioCollectionFilesList(this.queryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getAudioCollectionFilesListFun()
         }
          res.list.map(v =>{
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
          })

          this.filesPictureFilesList = res.list
        }
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
            }
          }).catch(error => {
            console.log(error)
          })
    },
    // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAudioCollectionFilesListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getAudioCollectionFilesListFun()
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

  },
}
</script>
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
