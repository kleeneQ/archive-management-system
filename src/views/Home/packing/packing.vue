<template>
  <div>   
    <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>档案装盒</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
      <!-- <el-row class="margin-top-10 margin-bottom-10 margin-left-10">
        <el-col :span="6">
          <div class="topradiobutton">
              <el-radio v-model="queryInfo.files_type" label="files_type1" border @change="selectsort()">工程类</el-radio>
              <el-radio v-model="queryInfo.files_type" label="files_type2" border @change="selectsort()">管理类</el-radio>
          </div>
        </el-col>
      </el-row> -->
    <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷题名">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷题名"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号"  @change="queryEngineering"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryEngineering">查询</el-button>
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
                    <el-button type="primary"  @click="dialogBatchAutoPackingVisibleFun('批量自动装盒', {})">批量自动装盒</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="showBatchPackingDialogFun('批量手动装盒')">批量手动装盒</el-button>
                  </el-form-item>
                </el-form>

              </el-col> 
            <!-- 工程案卷列表 B -->
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
            width="35">
          </el-table-column>
              <el-table-column
                label="序号"
                fixed
                type="index"
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
                prop="ajtm"
                label="案卷题名"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="ajlbName"
                label="案卷类别"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="ajsxh"
                label="案卷顺序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="310">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="showPackingDialogFun('手动装盒', scope.row)">手动装盒</el-button>
                  <el-button type="success" size="small" @click="dialogAutoPackingVisibleFun('自动装盒',scope.row)">自动装盒</el-button>
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
    <!-- 手动装盒弹层 B -->
        <el-dialog
          title="档案装盒"
          :visible.sync="dialogPackingVisible"
          width="70%"
          :before-close="handleClose">
          <el-table
            border
            :data="boxtableData"
            :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
            :cell-style="{'text-align':'center','padding':'5px'}"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="ajtm"
              label="盒内文件"
              width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="small" class="btnedit" @click="openBoxFileListFun(scope.$index, scope.row)">查看文件</el-button>
                </template>
            </el-table-column>
            <el-table-column
              prop="boxSize"
              label="盒尺寸"
              width="500">
              <template slot-scope="scope">
                <el-radio-group v-model="boxtableData[scope.$index].boxSize" @change="boxsizeRadio()">
                  <el-radio label="3公分">3公分</el-radio>
                  <el-radio label="5公分">5公分</el-radio>
                  <el-radio label="其他">其他</el-radio>
                  <el-input class="inputsizestyle" v-model="boxtableData[scope.$index].otherinput"  size="mini" v-if="boxtableData[scope.$index].boxSize == '其他'" placeholder="请输入尺寸" ><i slot="suffix" style="font-style:normal;margin-right: 10px;">公分</i></el-input>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column
            prop="pageRange"
              label="页码范围"
              width="180">
               <template slot-scope="scope">
                  <!-- <el-input v-model="boxtableData[scope.$index].pageRange" placeholder="如1-200"></el-input> -->
                  <el-row v-for="(item,index) in boxtableData[scope.$index].pageRange" :key="index">
                    <el-col :span="11">
                      <el-input class="pageRangeWidth" size="mini" v-model="item.pageRangeWidth1"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-input class="pageRangeWidth" size="mini" v-model="item.pageRangeWidth2"></el-input>
                    </el-col>
                  </el-row>
               </template>
            </el-table-column>
            <el-table-column
            prop="pageNum"
              label="页数"
              width="180">
               <template slot-scope="scope">
                  <el-input v-model="boxtableData[scope.$index].pageNum" placeholder="如200"></el-input>
               </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <div class="textalignleft">
                  <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    v-if="boxtableData.length-1 == scope.$index"
                    @click="handleadd(scope.$index, scope.row)">添加盒</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
            <!-- 盒内文件弹层 B -->
          <el-dialog
            width="40%"
            title="盒内文件"
            :visible.sync="innerBoxFileVisible"
             @close="checkedFileFun"
            append-to-body>
           <div>
              <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedFile" @change="handlecheckedFileChange">
                <el-checkbox v-for="item in fileList" :label="item" :key="item.id">{{item.wjtm}}</el-checkbox>
              </el-checkbox-group> -->
               <el-table
                  :data="fileList"
                  border
                  max-height="500"
                  :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
                  :cell-style="{'text-align':'center','padding':'5px'}"
                  @selection-change="handleSelectionChangefile"
                  style="width: 100%">
                  <el-table-column
                    fixed
                    type="selection"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="wjdh"
                    label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
                  </el-table-column>
                  <el-table-column
                    prop="wjtm"
                    label="文件题名">
                  </el-table-column>
                </el-table>
            </div>
            <div class="textaligncenter">
              <span slot="footer" class="dialog-footer ">
                <el-button type="primary" @click="checkedFileFun()">确 定</el-button>
              </span>
            </div>
          </el-dialog>
          <!-- 盒内文件弹层 E -->
          <div class="textaligncenter">
             <span slot="footer" class="dialog-footer ">
              <el-button @click="dialogPackingVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitPackingFun()">确 定</el-button>
             </span>
          </div>
         
        </el-dialog>
    <!-- 手动装盒弹层 E -->

    <!-- 自动装盒弹层 B -->
        <el-dialog
          title="档案自动装盒"
          :visible.sync="dialogAutoPackingVisible"
          width="60%"
          :before-close="handleClose">
          <div>
              盒尺寸：
               <el-radio-group v-model="autoboxSize" @change="boxsizeRadio()">
                <el-radio label="3公分">3公分</el-radio>
                <el-radio label="5公分">5公分</el-radio>
                <el-radio label="其他">其他</el-radio>
                   <el-input class="inputsizestyle" v-model="autoboxSizeOther"  size="mini" v-if="autoboxSize == '其他'" placeholder="请输入尺寸" ><i slot="suffix" style="font-style:normal;margin-right: 10px;">公分</i></el-input>
                
                </el-radio-group>
          </div>
          <el-table
            border
            max-height="500"
            :data="fileList"
            :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
            :cell-style="{'text-align':'center','padding':'5px'}"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
            prop="wjdh"
              label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
            </el-table-column>
            <el-table-column
            prop="wjtm"
              label="文件题名"
              width="180">
            </el-table-column>
            <el-table-column
            prop="ztlxName"
              label="载体类型"
              width="180">
            </el-table-column>
            <el-table-column
            prop="pageNum"
              label="页码"
              width="180">
            </el-table-column>
            <el-table-column
            prop="sl"
              label="页数"
              width="180">
            </el-table-column>
            <el-table-column label="是否装盒">
              <template slot-scope="scope">
                <el-switch
                  v-model="flagvaluearr[scope.$index]"
                  @change="flagvalueFun(scope.$index)"
                  aria-label=""
                  active-color="#13ce66"
                  inactive-color="#dcdfe6">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
          <div class="textaligncenter">
             <span slot="footer" class="dialog-footer ">
              <el-button @click="dialogAutoPackingVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitAutoPackingFun()">确 定</el-button>
             </span>
          </div>
         
        </el-dialog>
    <!-- 自动装盒弹层 E -->

    <!-- 批量手动装盒弹层 B -->
         <el-dialog
          title="档案批量手动装盒"
          :visible.sync="dialogBacthPackingVisible"
          width="70%"
          :before-close="handleClose">
          <el-table
            border
            :data="boxtableData"
            :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
            :cell-style="{'text-align':'center','padding':'5px'}"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="ajtm"
              label="盒内文件"
              width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="small" class="btnedit" @click="openBatchBoxFileListFun(scope.$index, scope.row)">查看文件</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="boxSize"
              label="盒尺寸"
              width="500">
              <template slot-scope="scope">
                <el-radio-group v-model="boxtableData[scope.$index].boxSize" @change="boxsizeRadio()">
                  <el-radio label="3公分">3公分</el-radio>
                  <el-radio label="5公分">5公分</el-radio>
                  <el-radio label="其他">其他</el-radio>
                  <el-input class="inputsizestyle" v-model="boxtableData[scope.$index].otherinput" size="mini" v-if="boxtableData[scope.$index].boxSize == '其他'" placeholder="请输入尺寸" ><i slot="suffix" style="font-style:normal;margin-right: 10px;">公分</i></el-input>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column
              prop="pageRange"
              label="页码范围"
              min-width="250">
               <template slot-scope="scope">
                <el-row v-for="(item,index) in boxtableData[scope.$index].pageRange" :key="index">
                  <el-col :span="11">
                    <el-input class="pageRangeWidth" size="mini" v-model="item.pageRangeWidth1"></el-input>
                  </el-col>
                   <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-input class="pageRangeWidth" size="mini" v-model="item.pageRangeWidth2"></el-input>
                  </el-col>
                </el-row>
               </template>
            </el-table-column>
            <el-table-column
            prop="pageNum"
              label="页数"
              width="150">
               <template slot-scope="scope">
                  <el-input v-model="boxtableData[scope.$index].pageNum" placeholder="如200"></el-input>
               </template>
            </el-table-column>
            <el-table-column label="操作"  min-width="150">
              <template slot-scope="scope">
                <div class="textalignleft">
                  <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    v-if="boxtableData.length-1 == scope.$index"
                    @click="handleadd(scope.$index, scope.row)">添加盒</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
            <!-- 盒内文件弹层 B -->
          <el-dialog
            width="50%"
            title="盒内文件"
            :visible.sync="innerBatchBoxFileVisible"
            @close="batchcheckedFileFun"
            append-to-body>
           <div >
              <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="batchcheckAll" @change="batchHandleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="batchcheckedFile" @change="batchHandlecheckedFileChange">
                  <el-checkbox v-for="item in BatchFileList" :label="item" :key="item.id">{{item.wjtm}}</el-checkbox>
                </el-checkbox-group> -->
                <el-table
                  :data="BatchFileList"
                  border
                  max-height="500"
                  :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
                  :cell-style="{'text-align':'center','padding':'5px'}"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
                  <el-table-column
                    fixed
                    type="selection"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="wjdh"
                    label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
                  </el-table-column>
                  <el-table-column
                    prop="wjtm"
                    label="文件题名">
                  </el-table-column>
                </el-table>
            </div>
            <div class="textaligncenter">
              <span slot="footer" class="dialog-footer ">
                <el-button type="primary" @click="batchcheckedFileFun()">确 定</el-button>
              </span>
            </div>
          </el-dialog>
          <!-- 盒内文件弹层 E -->
          <div class="textaligncenter">
             <span slot="footer" class="dialog-footer ">
              <el-button @click="dialogBacthPackingVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitBatchPackingFun()">确 定</el-button>
             </span>
          </div>
         
        </el-dialog>
    <!-- 批量手动装盒弹层 E -->
  
     <!-- 批量自动装盒弹层 B -->
        <el-dialog
          title="档案批量自动装盒"
          :visible.sync="dialogBatchAutoPackingVisible"
          width="60%"
          :before-close="handleClose">
          <div>
              盒尺寸：
               <el-radio-group v-model="autoboxSize" @change="boxsizeRadio()">
                <el-radio label="3公分">3公分</el-radio>
                <el-radio label="5公分">5公分</el-radio>
                <el-radio label="其他">其他</el-radio>
                   <el-input class="inputsizestyle" v-model="autoboxSizeOther"  size="mini" v-if="autoboxSize == '其他'" placeholder="请输入尺寸" ><i slot="suffix" style="font-style:normal;margin-right: 10px;">公分</i></el-input>
                
                </el-radio-group>
          </div>
          <el-table
            border
            max-height="500"
            :data="BatchFileList"
            :header-cell-style="{'text-align':'center','background-color':'#DDDDDD','color':'#000000'}"
            :cell-style="{'text-align':'center','padding':'5px'}"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
            prop="wjdh"
              label="文件档号"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.dwgcdh">{{scope.row.xmgcdh}}{{scope.row.dwgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                  <div v-else>{{scope.row.xmgcdh}}-{{scope.row.ajdh}}-{{scope.row.wjdh}}</div>
                </template>
            </el-table-column>
            <el-table-column
            prop="wjtm"
              label="文件题名"
              width="180">
            </el-table-column>
            <el-table-column
            prop="ztlxName"
              label="载体类型"
              width="180">
            </el-table-column>
            <el-table-column
            prop="pageNum"
              label="页码"
              width="180">
            </el-table-column>
            <el-table-column
            prop="sl"
              label="页数"
              width="180">
            </el-table-column>
            <el-table-column label="是否装盒">
              <template slot-scope="scope">
                <el-switch
                  v-model="flagvaluearr[scope.$index]"
                  @change="flagvalueFun(scope.$index)"
                  aria-label=""
                  active-color="#13ce66"
                  inactive-color="#dcdfe6">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
          <div class="textaligncenter">
             <span slot="footer" class="dialog-footer ">
              <el-button @click="dialogBatchAutoPackingVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitBatchAutoPackingFun()">确 定</el-button>
             </span>
          </div>
         
        </el-dialog>
    <!-- 批量自动装盒弹层 E -->
  </div>
</template>

<script>

 import { 
    projectFilesManualPacking,
    projectFilesAutoPacking,
    manageFilesManualPacking,
    manageFilesAutoPacking,
    searchFilesPackingList,
    cartonFileDropList,
    cartonOtherSizeManual,
    cartonOtherSizeAuto,
   } from "@/api/packing/packing"
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import { forEach } from 'jszip'
// import { forEach } from 'jszip'
export default {
  data(){
    return {
      queryInfo:{
        ajtm:'',
        ajdh:'',
        files_type:'files_type1',
        page_num:1,
        page_size:10,
      },
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      filesList:[],//案卷信息列表
      selectedList:'',//选中的案卷列表
      files_type:'files_type1',//工程类和管理类  区分字段
      dialogPackingVisible:false,//手动装盒弹层
      dialogBacthPackingVisible:false,//批量手动装盒弹层 
      dialogAutoPackingVisible:false,//自动装盒弹层
      fileCategory:[],//案卷类别
      carrierType:'',//载体类型
      boxtableData:[ //装盒列表 ——盒子列表
        {
          boxNum:'1',
          boxSize:'5公分',
          pageRange:[{pageRangeWidth1:'',pageRangeWidth2:''}],
          pageRange1:'',
          pageNum:'',
          filesId:'',
          packingfileIDPageNumArray:[],
          otherinput:''
        }
      ],
      files_id:'',//案卷ID
      ids:'',
       options: [{
          value: 'id',
          label: 'name'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScriptJavaScript',
          label: 'JavaScriptJavaScript'
        }],
        value: [],
        packingfileIDPageNumArray:[{wjid:''}],
        packingfileListData:[//手动装盒 下拉选择文件 菜单数据
        
        ],
        autoboxSize:'5公分',//自动装盒 盒尺寸
        autoboxSizeOther:'',//自动装盒 盒尺寸 其他输入尺寸
        fileList:[],//自动装盒文件信息列表
        flagvaluearr:[], //自动装盒 是否装盒
        innerBoxFileVisible:false,// 选择文件 弹层
        checkAll: false, //手动装盒是否全选文件
        checkedFile: [], //手动装盒，已经选中的文件
        isIndeterminate: true, //手动装盒 是否支持全选 
        checkFileBoxRowindex:'',//选中的盒子，查看选择其中文件
        innerBatchBoxFileVisible:false,//批量 手动 装盒 弹层
        BatchFileList:[],//批量手动装盒文件列表
        batchcheckAll:false,//批量手动装盒是否全选文件
        batchcheckedFile: [], //批量 手动装盒，已经选中的文件
        cityOptions:'',//批量
        bacthCheckFileBoxRowindex:'',//选中的盒子，查看选择其中文件
        dialogBatchAutoPackingVisible:false,//批量装盒 自动装盒  弹层 
        ajcarrierType:[],//案卷级载体类型
    }
  },
  created(){
    this.getFileCategory() // 案卷类别
    this.getCarrierType() //载体类型
    this.getAjCarrierType() //案卷级载体类型
  },

  mounted(){
    this.searchFilesPackingListFun() //获取需要装盒的案卷列表
  },
  methods:{
    handleSelectionChangefile(e){
      console.log(e)
      this.checkedFile = e
      this.boxtableData[this.checkFileBoxRowindex].packingfileIDPageNumArray = e
    },
    handleSelectionChange(e){
      console.log(e)
      this.batchcheckedFile = e
      this.boxtableData[this.checkFileBoxRowindex].packingfileIDPageNumArray = e
    },
    //手动装盒  选择文件 确定按钮
    checkedFileFun(){
      console.log(this.checkedFile)
      if(this.checkedFile.length === 0) return this.message({message:'未选择需要装盒的文件',type:'error'})
      this.innerBoxFileVisible = false
      var batchcheckedFile1 = this.checkedFile
      var batchcheckedFile2 = []
      this.boxtableData[this.checkFileBoxRowindex].pageRange = []
      for (let i = 0; i < batchcheckedFile1.length; i++) {
        const element = batchcheckedFile1[i].files_id;
        batchcheckedFile2.push(element)
      }
       function filesarr(array){
          return Array.from(new Set(array));
        }
       var batchcheckedFile3 =  filesarr(batchcheckedFile2)
       console.log(batchcheckedFile3)
       
       for (let j = 0; j < batchcheckedFile3.length; j++) {
         var aaaa = {
           pageRangeWidth1:'',
           pageRangeWidth2:'',
         }
          this.boxtableData[this.checkFileBoxRowindex].pageRange.push(aaaa)
          this.boxtableData[this.checkFileBoxRowindex].filesId = batchcheckedFile3[j]
       }
    },
    // 批量手动装盒  选择文件  确定按钮
    batchcheckedFileFun(){
      console.log(this.batchcheckedFile)
      if(this.batchcheckedFile.length === 0) return this.message({message:'未选择需要装盒的文件',type:'error'})
      this.innerBatchBoxFileVisible = false
      var batchcheckedFile1 = this.batchcheckedFile
      var batchcheckedFile2 = []
      this.boxtableData[this.checkFileBoxRowindex].pageRange = []
      for (let i = 0; i < batchcheckedFile1.length; i++) {
        const element = batchcheckedFile1[i].files_id;
        batchcheckedFile2.push(element)
      }
       function filesarr(array){
          return Array.from(new Set(array));
        }
       var batchcheckedFile3 =  filesarr(batchcheckedFile2)
       console.log(batchcheckedFile3)
       
       for (let j = 0; j < batchcheckedFile3.length; j++) {
         var aaaa = {
           pageRangeWidth1:'',
           pageRangeWidth2:'',
         }
          this.boxtableData[this.checkFileBoxRowindex].pageRange.push(aaaa)
       }
    },
    //批量手动装盒  选择文件   是否全选
      batchHandleCheckAllChange(val) {
        this.batchcheckedFile = val ? this.cityOptions : [];
        this.isIndeterminate = false;
        console.log(this.batchcheckedFile)
        this.boxtableData[this.checkFileBoxRowindex].packingfileIDPageNumArray = this.batchcheckedFile
      },
    //批量手动装盒  选择文件  单选或多选需要装盒的文件
      batchHandlecheckedFileChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.batchcheckAll = checkedCount === this.BatchFileList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.BatchFileList.length;
        this.boxtableData[this.checkFileBoxRowindex].packingfileIDPageNumArray = value
    },
    //批量装盒 手动装盒 选择文件 弹层
    openBatchBoxFileListFun(index,row){
      console.log(this.BatchFileList)
      this.checkFileBoxRowindex = index
      this.innerBatchBoxFileVisible = true
      this.cityOptions = this.BatchFileList
      this.batchcheckedFile = this.boxtableData[index].packingfileIDPageNumArray //查看/清空已经选中的文件集合

    },
    //批量装盒 手动装盒 信息提交
    submitBatchPackingFun(){
      console.log(this.boxtableData)
      var newboxtableDataObj = {
         boxNum:'',
         boxSize:'',
         pageRange:'',
         pageNum:'',
         filesId:'',
         fileId:'',
     }
    var newboxtableDataObjOther = {
         boxNum:'',
         boxSize:'',
         pageRange:'',
         pageNum:'',
         filesId:'',
         fileId:'',
         otherinput:''
     }
     var newboxtableDataArr = this.boxtableData
    for (let i = 0; i < newboxtableDataArr.length; i++) {
       var item = newboxtableDataArr[i]
       console.log(item)
       var newpageRange = ''
       for (let o = 0; o < item.pageRange.length; o++) {
         if (item.pageRange[o].pageRangeWidth1 === '' || item.pageRange[o].pageRangeWidth2 === '') return this.message({ message:'页面范围不能为空', type: 'error' })
         if (o === 0) {
            newpageRange = item.pageRange[o].pageRangeWidth1+'-'+item.pageRange[o].pageRangeWidth2
         } else {
            newpageRange = newpageRange+'#'+ item.pageRange[o].pageRangeWidth1+'-'+item.pageRange[o].pageRangeWidth2
         }
       }

       item.pageRange1 = newpageRange //拼接好的页码范围
      if (item.packingfileIDPageNumArray.length == 0) {
         this.message({ message:'请选择需要装盒的文件', type: 'error' })
         break
       }
      if (item.pageRange1 === '') {
         this.message({ message:'页面范围不能为空', type: 'error' })
         break
       }
       if (item.pageNum === ''){
         this.message({ message:'页面数量不能为空', type: 'error' })
         break
       }
       if (item.boxSize=== '3公分' && item.pageNum > 210 ){
         this.message({ message:'盒尺寸为：3公分，页数不能超过210', type: 'error' })
         break
       }
       if (item.boxSize=== '5公分' && item.pageNum > 360 ){
         this.message({ message:'盒尺寸为：5公分，页数不能超过360', type: 'error' })
         break
       }
       if (item.boxSize=== '其他' && item.otherinput == ''){
         this.message({ message:'请输入盒子尺寸', type: 'error' })
         break
       }
       var filearr = item.packingfileIDPageNumArray
        var filesidFidFNum = ''
        console.log(filearr)
        var filesIdone = []
        for (let j = 0; j < filearr.length; j++) {
          const filearritem = filearr[j];

          if (j == 0) {
             filesidFidFNum = filearritem.files_id+'#'+filearritem.file_id+'#'+filearritem.sl
          }else {
             filesidFidFNum = filesidFidFNum+','+filearritem.files_id+'#'+filearritem.file_id+'#'+filearritem.sl
          }

          filesIdone.push(filearritem.files_id)
        }
        console.log(filesIdone,'1123')
        function filesarr(array){
          return Array.from(new Set(array));
        }
        var newnewfilesID = filesarr(filesIdone)
        console.log(newnewfilesID)
        var filesID2 = ''
       for (let t = 0; t < newnewfilesID.length; t++) {
            if (t == 0 ) {
              filesID2 = newnewfilesID[t]
            } else {
              filesID2 = filesID2 +'#'+ newnewfilesID[t]
            }
          }

       if (i === 0 && item.boxSize !== '其他') {
         
        newboxtableDataObj.boxNum = item.boxNum
        newboxtableDataObj.filesId = filesID2
        newboxtableDataObj.pageRange = item.pageRange1
        newboxtableDataObj.pageNum = item.pageNum
        newboxtableDataObj.boxSize = item.boxSize
        newboxtableDataObj.fileId = filesidFidFNum //第一个盒子拼接的案卷ID、文件ID、文件页数
       } else if (item.boxSize !== '其他'){
        newboxtableDataObj.boxNum = newboxtableDataObj.boxNum +','+ item.boxNum
        newboxtableDataObj.filesId = newboxtableDataObj.filesId +','+ filesID2
        newboxtableDataObj.pageRange = newboxtableDataObj.pageRange +','+ item.pageRange1
        newboxtableDataObj.pageNum = newboxtableDataObj.pageNum +','+ item.pageNum
        newboxtableDataObj.boxSize = newboxtableDataObj.boxSize +','+ item.boxSize
        newboxtableDataObj.fileId = newboxtableDataObj.fileId +','+ filesidFidFNum //第二个盒子中拼接的案卷ID、文件ID、文件页数
       } else if(item.boxSize === '其他' && item.otherinput !== ''){
         if (i === 0) {
            newboxtableDataObjOther.boxNum = item.boxNum
            newboxtableDataObjOther.filesId = filesID2
            newboxtableDataObjOther.pageRange = item.pageRange1
            newboxtableDataObjOther.pageNum = item.pageNum
            newboxtableDataObjOther.boxSize = item.otherinput+'公分'
            newboxtableDataObjOther.otherinput = '其他'
            newboxtableDataObjOther.fileId = filesidFidFNum //第一个盒子拼接的案卷ID、文件ID、文件页数
         } else {
             newboxtableDataObjOther.boxNum = newboxtableDataObjOther.boxNum +','+ item.boxNum
             newboxtableDataObjOther.filesId = newboxtableDataObjOther.filesId +','+ filesID2
             newboxtableDataObjOther.pageRange = newboxtableDataObjOther.pageRange +','+ item.pageRange1
             newboxtableDataObjOther.pageNum = newboxtableDataObjOther.pageNum +','+ item.pageNum
             newboxtableDataObjOther.boxSize = newboxtableDataObjOther.boxSize +','+ item.otherinput+'公分'
             newboxtableDataObjOther.fileId = newboxtableDataObjOther.fileId +','+ filesidFidFNum //第二个盒子中拼接的案卷ID、文件ID、文件页数
             newboxtableDataObjOther.otherinput = '其他'
         }
       }
       
     }
     if ( newboxtableDataObjOther.otherinput === '其他') {
        const qq = {
          files_id:newboxtableDataObjOther.filesId,
          page_range:newboxtableDataObjOther.pageRange,
          page_num:newboxtableDataObjOther.pageNum,
          box_size:newboxtableDataObjOther.boxSize,
          box_num:newboxtableDataObjOther.boxNum,
          file_id:newboxtableDataObjOther.fileId,
        }
      console.log(newboxtableDataObjOther)
      console.log(qq)

      cartonOtherSizeManual(qq).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: '装盒失败', type: 'error' })
        
        this.dialogBacthPackingVisible = false
        this.message({ message: '装盒成功', type: 'success' })
        this.searchFilesPackingListFun() //刷新案卷列表
        }
      })
       } 
    if ( newboxtableDataObj.boxSize === '3公分' ||  newboxtableDataObj.boxSize === '5公分') {
        const q = {
        files_id:newboxtableDataObj.filesId,
        page_range:newboxtableDataObj.pageRange,
        page_num:newboxtableDataObj.pageNum,
        box_size:newboxtableDataObj.boxSize,
        box_num:newboxtableDataObj.boxNum,
        file_id:newboxtableDataObj.fileId,
      }
      console.log(newboxtableDataObj)
      console.log(q)

        projectFilesManualPacking(q).then(response =>{
          
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: '装盒失败', type: 'error' })
          
          this.dialogBacthPackingVisible = false
          this.message({ message: '装盒成功', type: 'success' })
          this.searchFilesPackingListFun() //刷新案卷列表
          }
        })
       }
   
    },
    //批量装盒 自动装盒 信息提交
    submitBatchAutoPackingFun(){
      var autopackingfileArr = this.flagvaluearr
      console.log( this.flagvaluearr)
      var autopackingfileQ = {
        page_num:'',
        box_size:'',
        file_id:'',
      }
      var allpagenum = 0 //总页数
      var batch_filesId_pageNum = ''//案卷ID以及选择的文件总页数
      var selectFilesList = this.selectedList 
     for (let j = 0; j < selectFilesList.length; j++) {
          const selectFilesID = selectFilesList[j].files_id;
        for (let i = 0; i < autopackingfileArr.length; i++) {
          const autopackingfileItem = autopackingfileArr[i];
            if (autopackingfileItem && selectFilesID == this.BatchFileList[i].files_id) { //文件是否 选择装盒
              allpagenum = allpagenum*1 + this.BatchFileList[i].sl*1 //总页数
              if (i == 0) {
              autopackingfileQ = this.BatchFileList[i].files_id+'#'+this.BatchFileList[i].file_id+'#'+this.BatchFileList[i].sl
              } else {
                autopackingfileQ = autopackingfileQ+','+this.BatchFileList[i].files_id+'#'+this.BatchFileList[i].file_id+'#'+this.BatchFileList[i].sl
              }
            } else {
              console.log("文件",i+1,'装盒')
            }
          }
          console.log(allpagenum)

          if (j===0) {
            batch_filesId_pageNum = selectFilesID+'#'+allpagenum
          } else {
            batch_filesId_pageNum = batch_filesId_pageNum +','+selectFilesID+'#'+allpagenum
          }
      }
      if (this.autoboxSize === '其他') {
         const q = {
          page_num:batch_filesId_pageNum,
          box_size: this.autoboxSizeOther +'公分',
          file_id:autopackingfileQ,
        }
        console.log(q)
        cartonOtherSizeAuto(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.dialogBatchAutoPackingVisible = false
            this.message({ message: '装盒成功', type: 'success' })
            this.searchFilesPackingListFun() //刷新案卷列表
          }
        })
      }else {
        console.log(allpagenum)
        // if (allpagenum>210 && this.autoboxSize === '3公分') return this.message({ message: '3公分的盒尺寸，不能超过210页', type: 'error' })
        // if (allpagenum>360 && this.autoboxSize === '5公分') return this.message({ message: '5公分的盒尺寸，不能超过360页', type: 'error' })
         const q = {
          page_num:batch_filesId_pageNum,
          box_size:this.autoboxSize,
          file_id:autopackingfileQ,
        }
        console.log(q)
        projectFilesAutoPacking(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          
          this.dialogBatchAutoPackingVisible = false
          this.message({ message: '装盒成功', type: 'success' })
          this.searchFilesPackingListFun() //刷新案卷列表
          }
        })
      }
      
     
    },
    //批量装盒 自动装盒 弹层
    dialogBatchAutoPackingVisibleFun(){
       const that = this
        if (this.selectedList.length === 0) return this.message({ message: '请选择需要装盒的案卷', type: 'error' })
        this.dialogBatchAutoPackingVisible = true
            var selectFilesList = this.selectedList
            console.log(this.selectedList)
            this.BatchFileList = []
            that.flagvaluearr = [] //先清空 自动装盒文件 选择状态
            for (let i = 0; i < selectFilesList.length; i++) { //所选择的案卷 循环
              const element = selectFilesList[i].files_id;

              var q = {
                 files_id:element
              }
               cartonFileDropList(q).then(response =>{
                 if (response.status === 200) {
                 const { data: res, message, status } = response.data
                 if (status !== 200) return this.message({ message: message, type: 'error' })
                 
                  
                  res.map(v => {
                   
                    that.flagvaluearr.push(true) //给自动装盒 中每个文件是否装盒添加上判断条件
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
                    return
                  })
                   let pageSum = 0
                  for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    pageSum = pageSum * 1 + res[i].sl * 1
                    if (i == 0) {
                      if (element.sl == '1') {
                          element.pageNum = '1'
                        } else {
                          element.pageNum = '1'+'~'+ element.sl
                        }
                    } else if(element.sl == '1'){  //当前页数为1时
                      element.pageNum = pageSum
                    } else {
                      element.pageNum = pageSum + 1 - res[i].sl * 1 +'~'+ pageSum
                    }
                  }
                    this.BatchFileList.push(...res)
                  }
               
                  
               })
            }
            console.log(this.BatchFileList)
    },
    //批量装盒 手动装盒 弹层 
    showBatchPackingDialogFun(){
      if (this.selectedList.length === 0) return this.message({ message: '请选择需要装盒的案卷', type: 'error' })
      this.dialogBacthPackingVisible = true
      console.log(this.selectedList)
      var selectFilesList = this.selectedList
      this.BatchFileList = []
      this.boxtableData = [
        {
          boxNum:'1',
          boxSize:'5公分',
          pageRange:[{pageRangeWidth1:'',pageRangeWidth2:''}],
          pageRange1:'',
          pageNum:'',
          filesId:'',
          packingfileIDPageNumArray:[],
          otherinput:''
        }
      ]
      for (let i = 0; i < selectFilesList.length; i++) {
        const element = selectFilesList[i];
        var q = {
           files_id:element.files_id
        }
         cartonFileDropList(q).then(response =>{
           if (response.status === 200) {
           const { data: res, message, status } = response.data
           if (status !== 200) return this.message({ message: message, type: 'error' })
           this.BatchFileList.push(...res)
           }
         })
      }
    },
    // 案卷列表选中的列 
    changeBox(selection) {
     this.ids = selection.map(item => item.files_id);
      this.selectedList = selection
      console.log(this.ids)
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
    //当前触发文件 是否装盒 —— 自动装盒
    flagvalueFun(index){
      console.log(index)
      // this.flagvaluearr[index] = !this.flagvaluearr[index]
      console.log(this.flagvaluearr)
    },
    //提交装盒表单信息 —— 自动装盒 
    submitAutoPackingFun(){
      var autopackingfileArr = this.flagvaluearr
      if (autopackingfileArr.length == 0) {
       return this.message({ message: '没有可以组卷的文件', type: 'error' })
      }
      var filesId = this.files_id
      var autopackingfileQ = {
        page_num:'',
        box_size:'',
        file_id:'',
      }
      var allpagenum = 0 //总页数
      for (let i = 0; i < autopackingfileArr.length; i++) {
        const autopackingfileItem = autopackingfileArr[i];
        if (autopackingfileItem) { //文件是否 选择装盒
          allpagenum = allpagenum*1 + this.fileList[i].sl*1 //总页数

          if (i == 0) {
           autopackingfileQ = filesId+'#'+this.fileList[i].file_id+'#'+this.fileList[i].sl
          } else {
            autopackingfileQ = autopackingfileQ+','+filesId+'#'+this.fileList[i].file_id+'#'+this.fileList[i].sl
          }
        } else {
          console.log("文件",i+1,'不装盒')
        }
      }
      if (this.autoboxSize === '其他') {
         const q = {
          page_num:this.files_id+'#'+allpagenum,
          box_size: this.autoboxSizeOther +'公分',
          file_id:autopackingfileQ,
        }
        cartonOtherSizeAuto(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
            
            this.dialogAutoPackingVisible = false
            this.message({ message: '装盒成功', type: 'success' })
            this.searchFilesPackingListFun() //刷新案卷列表
          }
        })
      }else {
         const q = {
          page_num:this.files_id+'#'+allpagenum,
          box_size:this.autoboxSize,
          file_id:autopackingfileQ,
        }
        projectFilesAutoPacking(q).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          
          this.dialogAutoPackingVisible = false
          this.message({ message: '装盒成功', type: 'success' })
          this.searchFilesPackingListFun() //刷新案卷列表
          }
        })
      }
      
     
    },
    //自动装盒  弹层
    dialogAutoPackingVisibleFun(name,row){
      console.log(row)
      this.cartonFileDropListFun(row)
      this.dialogAutoPackingVisible = true
      this.files_id = row.files_id
    },
    //手动装盒  选择文件   是否全选
      handleCheckAllChange(val) {
        this.checkedFile = val ? this.cityOptions : [];
        this.isIndeterminate = false;
        console.log(this.checkedFile)
        this.boxtableData[this.checkFileBoxRowindex].packingfileIDPageNumArray = this.checkedFile
      },
    //手动装盒  选择文件  单选或多选需要装盒的文件
      handlecheckedFileChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fileList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.fileList.length;
        this.boxtableData[this.checkFileBoxRowindex].packingfileIDPageNumArray = value
      },
    //选择、查看、盒内文件列表  弹层
    openBoxFileListFun(index,row){
      this.checkFileBoxRowindex = index
      this.innerBoxFileVisible = true
      this.cityOptions = this.fileList
      this.checkedFile = this.boxtableData[index].packingfileIDPageNumArray //清空已经选中的文件集合
    },

    // 获取案卷下的文件列表
    cartonFileDropListFun(row){
      const that = this
      const q = {
        files_id:row.files_id
      }
       cartonFileDropList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        that.flagvaluearr = [] //先清空 自动装盒文件 选择状态
         res.map(v => {
           that.flagvaluearr.push(true) //给自动装盒 中每个文件是否装盒添加上判断条件
             that.carrierType.forEach(t => {  //载体类型
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            if (v.sl == '1') {
              v.pageNum = v.sl
            } else {
              
            }
            return
          })

        let pageSum = 0
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          pageSum = pageSum * 1 + res[i].sl * 1
          if (i == 0) {
             if (element.sl == '1') {
                element.pageNum = '1'
              } else {
                element.pageNum = '1'+'~'+ element.sl
              }
          } else if(element.sl == '1'){  //当前页数为1时
             element.pageNum = pageSum
          } else {
            element.pageNum = pageSum + 1 - res[i].sl * 1 +'~'+ pageSum
          }
        }
        this.fileList = res
        console.log(that.flagvaluearr)
        }
        // this.inforpackingfileListDataFun()
      })
    },
  
    //提交装盒信息表单 —— 手动装盒
    submitPackingFun(){
     console.log(this.boxtableData)
     var newboxtableDataObj = {
         boxNum:'',
         boxSize:'',
         pageRange:'',
         pageNum:'',
         filesId:'',
         fileId:'',
     }
    var newboxtableDataObjOther = {
         boxNum:'',
         boxSize:'',
         pageRange:'',
         pageNum:'',
         filesId:'',
         fileId:'',
         otherinput:''
     }
     console.log(this.boxtableData,"++++++++++++++++++++++")
     var newboxtableDataArr = this.boxtableData
     for (let i = 0; i < newboxtableDataArr.length; i++) {
       var item = newboxtableDataArr[i]
      if (item.packingfileIDPageNumArray.length == 0) {
         this.message({ message:'请选择需要装盒的文件', type: 'error' })
         break
       }
      if (item.pageRange === '') {
         this.message({ message:'页面范围不能为空', type: 'error' })
         break
       }
       if (item.pageNum === ''){
         this.message({ message:'页面数量不能为空', type: 'error' })
         break
       }
       if (item.boxSize=== '3公分' && item.pageNum > 210 ){
         this.message({ message:'盒尺寸为：3公分，页数不能超过210', type: 'error' })
         break
       }
       if (item.boxSize=== '5公分' && item.pageNum > 360 ){
         this.message({ message:'盒尺寸为：5公分，页数不能超过360', type: 'error' })
         break
       }
       if (item.boxSize=== '其他' && item.otherinput == ''){
         this.message({ message:'请输入盒子尺寸', type: 'error' })
         break
       }
       var filearr = item.packingfileIDPageNumArray

        var filesidFidFNum = ''
        for (let j = 0; j < filearr.length; j++) {
          const filearritem = filearr[j];
          if (j == 0) {
             filesidFidFNum = item.filesId+'#'+filearritem.file_id+'#'+filearritem.sl
          }else {
             filesidFidFNum = filesidFidFNum+','+item.filesId+'#'+filearritem.file_id+'#'+filearritem.sl
          }
        }
       if (i === 0 && item.boxSize !== '其他') {
        newboxtableDataObj.boxNum = item.boxNum
        newboxtableDataObj.filesId = item.filesId
        newboxtableDataObj.pageRange = item.pageRange[0].pageRangeWidth1+'-'+item.pageRange[0].pageRangeWidth2
        newboxtableDataObj.pageNum = item.pageNum
        newboxtableDataObj.boxSize = item.boxSize
        newboxtableDataObj.fileId = filesidFidFNum //第一个盒子拼接的案卷ID、文件ID、文件页数
       } else if (item.boxSize !== '其他'){
        newboxtableDataObj.boxNum = newboxtableDataObj.boxNum +','+ item.boxNum
        newboxtableDataObj.filesId = newboxtableDataObj.filesId +','+ item.filesId
        newboxtableDataObj.pageRange = newboxtableDataObj.pageRange +','+ item.pageRange[0].pageRangeWidth1+'-'+item.pageRange[0].pageRangeWidth2
        newboxtableDataObj.pageNum = newboxtableDataObj.pageNum +','+ item.pageNum
        newboxtableDataObj.boxSize = newboxtableDataObj.boxSize +','+ item.boxSize
        newboxtableDataObj.fileId = newboxtableDataObj.fileId +','+ filesidFidFNum //第二个盒子中拼接的案卷ID、文件ID、文件页数
       } else if(item.boxSize === '其他' && item.otherinput !== ''){
         if (i === 0) {
            newboxtableDataObjOther.boxNum = item.boxNum
            newboxtableDataObjOther.filesId = item.filesId
            newboxtableDataObjOther.pageRange = item.pageRange[0].pageRangeWidth1+'-'+item.pageRange[0].pageRangeWidth2
            newboxtableDataObjOther.pageNum = item.pageNum
            newboxtableDataObjOther.boxSize = item.otherinput+'公分'
            newboxtableDataObjOther.otherinput = '其他'
            newboxtableDataObjOther.fileId = filesidFidFNum //第一个盒子拼接的案卷ID、文件ID、文件页数
         } else {
             newboxtableDataObjOther.boxNum = newboxtableDataObjOther.boxNum +','+ item.boxNum
             newboxtableDataObjOther.filesId = newboxtableDataObjOther.filesId +','+ item.filesId
             newboxtableDataObjOther.pageRange = newboxtableDataObjOther.pageRange +','+ item.pageRange[0].pageRangeWidth1+'-'+item.pageRange[0].pageRangeWidth2
             newboxtableDataObjOther.pageNum = newboxtableDataObjOther.pageNum +','+ item.pageNum
             newboxtableDataObjOther.boxSize = newboxtableDataObjOther.boxSize +','+ item.otherinput+'公分'
             newboxtableDataObjOther.fileId = newboxtableDataObjOther.fileId +','+ filesidFidFNum //第二个盒子中拼接的案卷ID、文件ID、文件页数
             newboxtableDataObjOther.otherinput = '其他'
         }
       }
       
     }
     if ( newboxtableDataObjOther.otherinput === '其他') {
        const qq = {
          files_id:newboxtableDataObjOther.filesId,
          page_range:newboxtableDataObjOther.pageRange,
          page_num:newboxtableDataObjOther.pageNum,
          box_size:newboxtableDataObjOther.boxSize,
          box_num:newboxtableDataObjOther.boxNum,
          file_id:newboxtableDataObjOther.fileId,
        }
      console.log(newboxtableDataObjOther)
      console.log(qq)

      cartonOtherSizeManual(qq).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: '装盒失败', type: 'error' })
        
        this.dialogPackingVisible = false
        this.message({ message: '装盒成功', type: 'success' })
        this.searchFilesPackingListFun() //刷新案卷列表
        }
      })
       } else {
        const q = {
        files_id:newboxtableDataObj.filesId,
        page_range:newboxtableDataObj.pageRange,
        page_num:newboxtableDataObj.pageNum,
        box_size:newboxtableDataObj.boxSize,
        box_num:newboxtableDataObj.boxNum,
        file_id:newboxtableDataObj.fileId,
      }
      console.log(newboxtableDataObj)
      console.log(q)

        projectFilesManualPacking(q).then(response =>{
          
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: '装盒失败', type: 'error' })
          
          this.dialogPackingVisible = false
          this.message({ message: '装盒成功', type: 'success' })
          this.searchFilesPackingListFun() //刷新案卷列表
          }
        })
       }
   
    },
    //选择盒尺寸
    boxsizeRadio(){
      console.log(this.boxtableData)
    },

    //手动装盒 弹层
    showPackingDialogFun(name,row){
      this.files_id = row.files_id
      this.boxtableData[0].filesId = row.files_id
      console.log(row)
      this.cartonFileDropListFun(row)
      this.dialogPackingVisible = true
       this.boxtableData = [
        {
          boxNum:'1',
          boxSize:'5公分',
          pageRange:[{pageRangeWidth1:'',pageRangeWidth2:''}],
          pageRange1:'',
          pageNum:'',
          filesId:'',
          packingfileIDPageNumArray:[],
          otherinput:''
        }
      ]
    },

    //手动装盒 增加盒
    handleadd(index,row){
      console.log(index)
      console.log(row)
      const boxrow = {
         boxNum: (row.boxNum * 1 + 1).toString(),
         boxSize:'5公分',
         pageRange:'',
         pageNum:'',
         filesId:this.files_id,
         pageRange:[{pageRangeWidth1:'',pageRangeWidth2:''}],
         packingfileIDPageNumArray:[]
      }
      this.boxtableData.push(boxrow)
      const wjidObj = {
        wjid:'',
      }
      this.packingfileIDPageNumArray.push(wjidObj)
      this.packingfileListData.push(this.fileList)
    },
    //手动装盒 删除盒
    handleDelete(index,row){
      this.boxtableData.splice(index,1)
      var newboxtableData = this.boxtableData
      for (let i = 0; i < newboxtableData.length; i++) {
        newboxtableData[i].boxNum = i+1
      }
      this.boxtableData = newboxtableData
    },
    //获取可以装盒的案卷列表
    searchFilesPackingListFun(){
      const q = {
        ajtm:this.queryInfo.ajtm,
        ajdh:this.queryInfo.ajdh,
        files_type:this.files_type,
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      searchFilesPackingList(q).then(response => {
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.searchFilesPackingListFun()
         }
        res.list.map(v => {
            this.fileCategory.forEach(t => { //案卷类别
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
             this.ajcarrierType.forEach(t => {  //载体类型
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
            return
          })
        this.filesList = res.list
        }
      })
    },
    //案卷归属类别 工程类或管理类
    selectsort(){
      // this.files_type = files_type
      this.queryInfo.ajtm = ''
      this.queryInfo.ajdh = ''
      console.log(this.files_type)
      this.searchFilesPackingListFun()
    },
    //查询案卷列表信息
    queryEngineering(){
      console.log(this.queryInfo)
      this.searchFilesPackingListFun()
    },
    // 显示弹层
    showDialogFun(){},
    // 关闭弹层
    handleClose(){
      this.dialogPackingVisible = false
      this.dialogAutoPackingVisible = false
      this.innerBatchBoxFileVisible = false
      this.dialogBacthPackingVisible = false
      this.dialogBatchAutoPackingVisible = false
    },

    //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.searchFilesPackingListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.searchFilesPackingListFun()
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
        // 案卷级载体类型
    getAjCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.ajcarrierType  = res
    this.searchFilesPackingListFun() //获取需要装盒的案卷列表
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



  },
}
</script>

<style lang="less">

.ajtmSelect .el-tag {
  width: 80px;
  overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
  
}
.ajtmSelect .el-select__input {
  display: none;
}
.el-select-dropdown__item span{
  display: inline-block;
  width: 200px !important;
  overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
  padding-right: 20px;
}
.rowStyle{
    background-color:#ecf5ff!important;
  }
.topradiobutton.el-radio{
  background-color: #fff;
}
.topradiobutton.el-radio__input.is-checked .el-radio__inner {
  background-color: #fff !important;
  border-color:#fff !important;
}
 .topradiobutton .is-checked {
    background-color: #5483AF !important;
    border-color: #5483AF !important;
    span {
      color: #fff !important;
    }
  }
 .topradiobutton .el-radio__input.is-checked+.el-radio__label {
    color: #fff !important;
  }
.el-radio {
  background-color: #fff !important;
}
.textaligncenter {
  margin-top: 30px;
  text-align: center;
}
.textalignleft {
  text-align: left;
}
.pageRangeWidth {
  width: 80px;
  .el-input__inner {
    padding: none;
  }
}
</style>

<style lang="less" scoped>
.inputsizestyle {
  width: 130px;
  line-height: 26px;
}

</style>