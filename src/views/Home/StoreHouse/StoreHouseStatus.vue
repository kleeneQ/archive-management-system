<template>
  <div class="app_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>库房管理</el-breadcrumb-item>
        <el-breadcrumb-item>库房状态</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="main-card-height">
        <el-container>
            <!-- 内容区 B -->
            <el-main class="box-main clearfix">
            <el-aside  class="main-elasidemaxheigth fl main-left" >
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
                  :current-node-key="CurrentKey"
                  highlight-current
                ></el-tree>
              </el-card>
            </el-aside>
              <el-card class="box-card main-right fl">
                <!-- 库房状态 B -->
                <div v-if="isActive === '1'">
                  <div class="box-card-title">库房状况</div>
                  <div class="box-card-body">
                    <div class="bcb-item bgcolor1">
                      <div class="bcb-item-left">
                        <p>{{Librarydetails.sumCabinet}}</p>
                        <span>总柜数</span>
                      </div>
                      <div class="bcb-item-border"></div>
                      <div class="bcb-item-right">
                        <p>可用：{{Librarydetails.sumCabinet_un_use_num}}</p>
                        <p>已满：{{Librarydetails.sumCabinet_used_num}}</p>
                      </div>
                    </div>
                    <div class="bcb-item bgcolor2">
                      <div class="bcb-item-left">
                        <p>{{Librarydetails.sumLie}}</p>
                        <span>总列数</span>
                      </div>
                      <div class="bcb-item-border"></div>
                      <div class="bcb-item-right">
                        <p>可用：{{Librarydetails.sumLie_un_use_num}}</p>
                        <p>已满：{{Librarydetails.sumLie_used_num}}</p>
                      </div>
                    </div>
                    <div class="bcb-item bgcolor3">
                      <div class="bcb-item-left">
                        <p>{{Librarydetails.sumCeng}}</p>
                        <span>总层数</span>
                      </div>
                      <div class="bcb-item-border"></div>
                      <div class="bcb-item-right">
                        <p>可用：{{Librarydetails.sumCeng_un_use_num}}</p>
                        <p>已满：{{Librarydetails.sumCeng_used_num}}</p>
                      </div>
                    </div>
                    <div class="bcb-item bgcolor4">
                      <div class="bcb-item-left">
                        <p>{{Librarydetails.sumHe}}</p>
                        <span>预计可存档（盒）</span>
                      </div>
                      <div class="bcb-item-border"></div>
                      <div class="bcb-item-right">
                        <p>已用：{{Librarydetails.sumHe_used_num}}</p>
                        <p>预计可用：{{Librarydetails.sumHe_un_use_num}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="box-card-title">库柜状况</div>
                  <div class="box-card-body">
                    <div class="box-card-kgqk">
                      <div class="bcb-item " :class="[item.is_full == '1' ? 'bgcolor1' : 'bgcolor5']" v-for="(item,index) in Cabinetlistdata" :key="index">
                        <p v-if="item.is_full == '1'">可用</p>
                        <p v-if="item.is_full == '0'">已满</p>
                        <span>{{item.cabinet_name}} (编号{{item.cabinet_code}})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 库房状态 E -->

                <!-- 库柜状态 B -->
                <div v-if="isActive === '2'">
                  <div class="box-card-title">库柜存储情况</div>
                  <div class="box-card-body">
                    <div class="box-card-kgqk">
                      <div class="bcb-item " :class="[item.is_full == '1' ? 'bgcolor1' : 'bgcolor5']" v-for="(item,index) in Cabinetlistdata" :key="index">
                        <p v-if="item.is_full == '1'">可用</p>
                        <p v-if="item.is_full == '0'">已满</p>
                        <span>编号：{{item.column_code}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 库柜状态 E -->

                <!-- 列状态 B -->
                <div v-if="isActive === '3'">
                  <el-col>
                   <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                       <el-form-item label="状态">
                        <el-select v-model="queryInfo.is_full" placeholder="请选择状态">
                          <el-option label="全部" value=""></el-option>
                          <el-option label="可用" value="1"></el-option>
                          <el-option label="不可用" value="0"></el-option>
                        </el-select>
                      </el-form-item>
                       <el-button type="primary" icon="el-icon-search" @click="StoreHouseStatusListTreeIdFun('新增库房')">查询</el-button>
                   </el-form>
                  </el-col> 
                  <el-table
                    :data="Cabinetlistdata"
                    border
                    style="width: 100%"
                    v-if="isActive === '3'"
                    :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
                    :cell-style="{'text-align':'center','padding':'0px'}"
                    :row-style="{'height':'40px'}"
                  >
                    <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
                    <el-table-column
                    align="center"
                      prop="layer_code"
                      label="层编号"
                      width="250">
                    </el-table-column>
                    <el-table-column
                    align="center"
                      prop="is_full"
                      label="状态"
                      width="100"
                    >
                   <template slot-scope="scope">
                      <p v-if="scope.row.is_full == '1'">可用</p>
                      <p v-if="scope.row.is_full == '0'">不可用</p>
                    </template>
                    </el-table-column>
                    <el-table-column
                    align="center"
                      prop="archived_num"
                      label="已存档（盒）"
                      width="150"
                    >
                    </el-table-column>
                     <el-table-column
                    align="center"
                      prop="layer_un_use_wide"
                      label="预计存档（盒）"
                      width="150"
                    >
                    <template slot-scope="scope">
                      <p v-if="scope.row.layer_un_use_wide == '0'">0</p>
                      <p v-if="scope.row.layer_un_use_wide !== '0'">{{Math.floor(scope.row.layer_un_use_wide / 50)}}~{{Math.floor(scope.row.layer_un_use_wide / 30)}}</p>
                    </template>
                    </el-table-column>
                     <el-table-column
                    align="center"
                      prop="layer_un_use_wide"
                      label="操作 "
                      width="200"
                    >
                    <template slot-scope="scope">
                      <el-button  class="btnedit" type="primary" size="small" @click="ListBoxDetailsFun('存档详情', scope.row)">存档详情</el-button>
                    </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- 列状态 E -->

              </el-card>
            </el-main>
            <!-- 内容区 E -->
        </el-container>   
      </div>
      <!-- 存档详情 B -->
      <el-dialog title="存档详情" :visible.sync="dialogListBoxDetailsVisible" width="65%">
        <el-table :data="ListBoxDetails" border >
          <el-table-column align="center" property="ajc" label="层序号" width="80"></el-table-column>
          <el-table-column align="center" property="box_num" label="盒序号" width="80"></el-table-column>
          <el-table-column align="center" property="ajdh" label="案卷档号" width="200"></el-table-column>
          <el-table-column align="center" property="ajtm" label="案卷题名"  width="200"></el-table-column>
          <el-table-column align="center" property="address" label="存放位置" width="200">
            <template slot-scope="scope">
              {{scope.row.ajk}}-{{scope.row.ajg}}-{{scope.row.ajl}}-{{scope.row.ajc}}-{{scope.row.ajx}}
            </template>
          </el-table-column>
          <el-table-column align="center" property="put_on_time" label="上架日期" width="120">
             <template slot-scope="scope">
              {{scope.row.put_on_time | formatDate}}
            </template>
          </el-table-column>
          <el-table-column align="center" property="fz" label="附注"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- 存档详情 E -->
  </div>
</template>

<script>
import {
  StoreHouseListSide,
  StoreHouseLibraryList,
} from "@/api/StoreHouse/LibraryManage"
import {
  StoreHouseStatusListTreeId,
  StoreHouseStatusLibraryStatusCabinet,
  StoreHouseStatusLibraryStatusColumn,
  StoreHouseStatusLibraryStatusLayer,
  StoreHouseStatusLibraryStatusBox,
  StoreHouseStatusListBox,
  StoreHouseMedicateList, 
} from "@/api/StoreHouse/StoreHouseStatus"
import {
  parseTime,
  modifiTrees,
  moveUp,
  moveDown
} from "@/utils/index"
export default {
  data () {
    return {
      record_id:'',//记录ID
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo: {
        page_num:1,
        page_size:10,
        tree_id:'0',
        is_full:'',
      },//新增库房列表参数
      treeData: [],  // 左侧树  库房管理
      defaultProps: {  //库房管理  左侧树 
        children: 'children',
        label: 'label'
      },
      LibraryList:[],//库房列表数据
      isActive:'1',//显示状态
      Librarydetails:{ //库房下的柜、列、层  序 详情
          sumCabinet:'', //柜
          sumCabinet_un_use_num:'', //可用
          sumCabinet_used_num:'',  //已满
          sumLie:'', //列
          sumLie_un_use_num:'', //可用
          sumLie_used_num:'',  //已满
          sumCeng:'', //层
          sumCeng_un_use_num:'', //可用
          sumCeng_used_num:'',  //已满
          sumHe:'', //盒
          sumHe_un_use_num:'', //可用
          sumHe_used_num:'',  //已满
          sumXu:'', //序

      },
      CurrentKey:1, // 
      Cabinetlistdata:[], //房下的柜/列/层 列表数据  
      ListBoxDetails:[], // 存档详情数据
      dialogListBoxDetailsVisible:false,//存档详情 弹层
    }
  },
  mounted () {
    this.StoreHouseListSideFun() // 获取库房管理侧边栏数据
    this.StoreHouseLibraryListFun() // 获取库房列表数据
    // this.StoreHouseStatusListTreeIdFun()  //  获取库房下的柜/列/层 列表数据  
  },
  methods: {
    //存档详情 弹层
    ListBoxDetailsFun(name,row){
      console.log(row)
      const q = {
        record_id:row.record_id,
        page_num:1,
        page_size:10,
      }
      StoreHouseStatusListBox(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.ListBoxDetails = res.list
        this.dialogListBoxDetailsVisible = true
        }
      })
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
        this.queryInfo.tree_id = res.list[0].library_id
        this.StoreHouseStatusListTreeIdFun() 
        }
      })
    },

      //获取库房下的柜/列/层 列表数据  
    StoreHouseStatusListTreeIdFun(){
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      console.log(this.queryInfo)
      StoreHouseStatusListTreeId(this.queryInfo).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          
          this.total = res.total
        //  if (res.total !== 0 && res.list.length == 0 ) {
        //    this.currentPage = 1
        //    this.StoreHouseStatusListTreeIdFun()
        //  }
          this.Cabinetlistdata = res
          this.CountdataFun(res)
          
        }
      })
      //柜
      StoreHouseStatusLibraryStatusCabinet(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.Librarydetails.sumCabinet = res.total_num
          this.Librarydetails.sumCabinet_un_use_num = res.un_use_num
          this.Librarydetails.sumCabinet_used_num = res.used_num
        }
      })
      // 列
      StoreHouseStatusLibraryStatusColumn(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.Librarydetails.sumLie = res.total_num
          this.Librarydetails.sumLie_un_use_num = res.un_use_num
          this.Librarydetails.sumLie_used_num = res.used_num
        }
      })
       // 层
      StoreHouseStatusLibraryStatusLayer(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.Librarydetails.sumCeng = res.total_num
          this.Librarydetails.sumCeng_un_use_num = res.un_use_num
          this.Librarydetails.sumCeng_used_num = res.used_num
        }
      })
      // 盒
      StoreHouseStatusLibraryStatusBox(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.Librarydetails.sumHe = res.total_num
          this.Librarydetails.sumHe_used_num = res.used_num
          this.Librarydetails.sumHe_un_use_num = res.un_use_num
        }
      })
    },
    //计算 库房下的柜数、列数、层数 
    CountdataFun(data){
      var Countdata = data
      console.log(Countdata)
      //赋值 给 库下的 柜、列、层
      var sumLie_is_full = 0
      var sumLie_no_full = 0
      Countdata.forEach((element,index) => {
        if (element.is_full == '1') {
          sumLie_is_full += element.is_full*1
        } else if(element.is_full == '0'){
          sumLie_no_full += 1
        }
        
      });

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
        if (data.treeId == '') return this.StoreHouseLibraryListFun()
        this.queryInfo.tree_id = data.treeId
        this.record_id = data.treeId

        this.StoreHouseStatusListTreeIdFun()
        // if (this.isActive === '1') return this.StoreHouseLibraryListFun()
        // if (this.isActive === '1') return this.StoreHouseStatusListTreeIdFun()
        // if (this.isActive === '2') return this.StoreHouseStatusListTreeIdFun()
        // if (this.isActive === '3') return this.StoreHouseStatusListTreeIdFun()
      } 
    },
      //获取库房管理侧边栏数据
    StoreHouseListSideFun(){
      var newtreeData = [
        {
          tree_id:'',
          tree_name:'库房列表',
          tree_level:'1',
          child:[]
        }
      ]
      StoreHouseListSide().then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
        newtreeData[0].child = res
         const newTress = modifiTrees(newtreeData)
         this.treeData = newTress
         console.log(newTress)
         this.$nextTick(function(){ 
            this.$refs['tree'].setCurrentKey(newTress[0].children[0].treeId); //默认选中第一条数据 高亮
          })
        //  this.isActive
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
.box-main {
  height: 100%;
  .el-table--border::after, .el-table--group::after, .el-table::before{
  }
}
.main-elasidemaxheigth {
  max-height: 600px;
}
.main-card-height {
  background-color: #fff;
}
.bgcolor1 {
  background-color:rgba(26, 188, 156, 1);
}
.bgcolor2 {
  background-color: rgba(0, 191, 191, 1);
}
.bgcolor3 {
  background-color: rgba(0, 128, 128, 1);
}
.bgcolor4 {
  background-color: rgba(245, 154, 35, 1);
}
.bgcolor5 {
  background-color: rgba(153, 153, 153, 1);
}
.box-card-title {
  font-weight: 700;
  font-size: 20px;
}
.box-card-body {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
  .bcb-item {
    min-width: 200px;
    box-shadow: 3px 1px 5px rgb(215 215 215);
    color: #fff;
    padding: 5px 15px;
    box-sizing: border-box;
    border-radius: 3px;
    margin-right: 49px;
    margin-top: 10px;
    .bcb-item-left {
      display: inline-block;
      p {
        font-size: 30px;
        font-weight: 700;
        line-height: 80px;
      }
      span {
        font-size: 16px;
      }
    }
    .bcb-item-right {
      display: inline-block;
      line-height: 50px;

    }
    .bcb-item-border {
      display: inline-block;
      width: 1px;
      height: 60px;
      background-color: rgba(53, 53, 53,.5);
      margin: 0 20px;
    }
  }
  .box-card-kgqk {
    .bcb-item {
      padding-bottom: 5px;
      display: inline-block;
    text-align: center;

      p {
       font-size: 30px;
        font-weight: 700;
        line-height: 80px;
      }
      span {
          font-size: 16px;
      }
    }
  }
}
.main-left {
  width: 15% !important;
  height: 100%;
  max-height: 780px;
}
.main-right {
  width: 84.7%;
  height: 100%;
}
</style>
