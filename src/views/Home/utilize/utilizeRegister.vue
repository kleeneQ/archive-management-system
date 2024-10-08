<template>
  <div>
     <!-- 头部 面包屑导航 B --> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案利用</el-breadcrumb-item>
      <el-breadcrumb-item>查档登记</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->
    <!-- 检索栏 B -->
      <el-card style="background-color: #F4F4F4;">
      <el-row style="margin-bottom: 20px;background-color: #fff;padding:20px;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" label-width="100px">
            <el-form-item label="查档登记日期">
              <el-date-picker
                v-model="queryInfo.create_time"
                type="date"
                value-format='yyyy-MM-dd'
                placeholder="请选择查档登记日期">
              </el-date-picker>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="utilizeRegisterListFun">查询</el-button>
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
                    <el-button type="primary"  @click="dialogUtilezeRegisterVisibleFun('新增')">新增</el-button>
                  </el-form-item>
    
                </el-form>

              </el-col> 
            <!-- 工程列表 B -->
            <el-table
              :data="EngineeringList"
              border
              style="width: 100%"
              :highlight-current-row="true"
              ref="tableRef"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                label="序号"
                fixed
                type="index"
                width="50">
              </el-table-column>
           <el-table-column
              align="center"
                prop="cdlx"
                label="查档类型"
                show-overflow-tooltip
                width="100">
                <template slot-scope="scope">
                  {{scope.row.cdlx=='1'?'个人查档':'单位查档'}}
                </template>
              </el-table-column>
           <el-table-column
              align="center"
                prop="reviewer"
                label="查阅人"
                show-overflow-tooltip
                width="150">
              </el-table-column>
           <el-table-column
              align="center"
                prop="tel"
                label="手机号"
                show-overflow-tooltip
                width="150">
              </el-table-column>
           <el-table-column
              align="center"
                prop="idcard"
                label="身份证"
                show-overflow-tooltip
                width="200">
              </el-table-column>
           <el-table-column
              align="center"
                prop="cddwmc"
                label="查档单位"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="tyshxydm"
                label="统一社会信用代码"
                show-overflow-tooltip
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="cdmdName"
                label="查档目的"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="damc"
                label="档案名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
              align="center"
                prop="cdlbName"
                label="查档类别"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
              align="center"
                prop="ztName"
                label="状态"
                width="150">
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="查档登记时间"
                width="150">
              <template slot-scope="scope">
                {{scope.row.create_time | formatDate}}
              </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button size="small" class="btnedit" @click="showUtilezeRegisterVisibleFun(scope.row)">查看</el-button>
                  <el-button type="primary" size="small" class="btnedit" @click="UtilizeConditionVisibleFun(scope.row)">查档情况登记</el-button>
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
        <!-- 查档登记 B -->
          <el-dialog :title="'查档登记'" :visible.sync="dialogUtilezeRegisterVisible" width="50%" >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="单位查档登记" name="first">
                   <el-form class="fileForm" :inline="true"  :model="utilizeSubmitForm" ref="utilizeSubmitFormRef" :rules="utilizeSubmitFormRules" label-width="150px">
                <el-form-item label="查阅人: " prop="reviewer" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.reviewer"  placeholder="请输入查阅人"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号: " prop="idcard" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.idcard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="电话: " prop="tel" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.tel" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="人数: " prop="people_num" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.people_num" placeholder="请输入人数"></el-input>
                </el-form-item>
                <el-form-item label="查档单位名称: " prop="cddwmc" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.cddwmc" placeholder="请输入查档单位名称"></el-input>
                </el-form-item>
                <el-form-item label="查档类别: " prop="cdlb" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdlb" placeholder="请选择查档类别" clearable>
                    <el-option
                      v-for="item in QueryConditionType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统一社会信用代码: " prop="tyshxydm" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.tyshxydm" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="查档目的: " prop="cdmd" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdmd" placeholder="请选择查档目的" clearable>
                    <el-option
                      v-for="item in QueryPurposeType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="档案名称: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gcmc" disabled placeholder="请选择档案名称" clearable style="width:80%;"></el-input>
                    <el-button type="primary" class="xuanzeengineering_id" @click="selectEngineeringFun">选择</el-button>
                </el-form-item>
                <el-form-item label="档案类型: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gclxName" placeholder="" disabled clearable style="width:80%;"></el-input>
                </el-form-item>
                
                <el-form-item label="查档内容: " class="utilizeRemarks">
                  <el-col :span="24">
                    <el-input type="textarea" v-model="utilizeSubmitForm.cdnr" placeholder="请输入查询的档案信息内容（主题）" clearable style="width:80%;"></el-input>
                  </el-col>
                </el-form-item>
                
                <el-form-item label="查档依据: " class="utilizeRemarks">
                      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city.mc}}</el-checkbox>
                      </el-checkbox-group>
                </el-form-item>
                <el-form-item label="附件信息: " class="utilizeRemarks">
                  <el-upload
                    class="upload-demo"
                    accept=".jpg,.png,.pdf"
                    action="#"
                    :on-change="handleChange"
                    :http-request="myUpload"
                    :file-list="fileList">
                    <el-button size="small" type="primary">选择上传附件</el-button>
                    <div slot="tip" class="el-upload__tip" >请将附件命名与上传文件内容保持一致，例如：单位介绍信.jpg，支持附件格式为：jpg、png、pdf的文件</div>
                  </el-upload>
                </el-form-item>
            
                <el-form-item class="btn" >
                  <el-button @click="dialogUtilezeRegisterVisible = false">取消</el-button>
                  <el-button type="primary" @click="utilizeSubmitFun">保存</el-button>
                </el-form-item>
              </el-form>
              </el-tab-pane>
              <el-tab-pane label="个人查档登记" name="second">
                  <el-form class="fileForm" :inline="true" :model="utilizeSubmitForm" ref="utilizeSubmitFormRef" :rules="utilizeSubmitFormRules" label-width="150px">
                <el-form-item label="查阅人: " prop="reviewer" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.reviewer" placeholder="请输入查阅人"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号: " prop="idcard" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.idcard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="电话: " prop="tel" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.tel" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="人数: " prop="people_num" class="file-title">
                  <el-input clearable v-model="utilizeSubmitForm.people_num" placeholder="请输入人数"></el-input>
                </el-form-item>
              
                <el-form-item label="查档类别: " prop="cdlb" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdlb" placeholder="请选择查档类别" clearable>
                    <el-option
                      v-for="item in QueryConditionType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="查档目的: " prop="cdmd" class="file-title">
                  <el-select v-model="utilizeSubmitForm.cdmd" placeholder="请选择查档目的" clearable>
                    <el-option
                      v-for="item in QueryPurposeType"
                      :key="item.bm"
                      :label="item.mc"
                      :value="item.bm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="档案名称: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gcmc" disabled placeholder="请选择档案名称" clearable style="width:80%;"></el-input>
                    <el-button type="primary" class="xuanzeengineering_id" @click="selectEngineeringFun">选择</el-button>
                </el-form-item>
                <el-form-item label="档案类型: " class="utilizeRemarks">
                    <el-input v-model="utilizeSubmitForm.gclxName" placeholder="" disabled clearable style="width:80%;"></el-input>

                </el-form-item>
                
                <el-form-item label="查档内容: " class="utilizeRemarks">
                  <el-col :span="24">
                    <el-input type="textarea" v-model="utilizeSubmitForm.cdnr" placeholder="请输入查询的档案信息内容（主题）" clearable style="width:80%;"></el-input>
                  </el-col>
                </el-form-item>
                
                <el-form-item label="查档依据: " class="utilizeRemarks">
                      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city.mc}}</el-checkbox>
                      </el-checkbox-group>
                </el-form-item>
                <el-form-item label="附件信息: " class="utilizeRemarks">
                  <el-upload
                    class="upload-demo"
                    accept=".jpg,.png,.pdf"
                    action="#"
                    :on-change="handleChange"
                    :http-request="myUpload"
                    :file-list="fileList">
                    <el-button size="small" type="primary">选择上传附件</el-button>
                    <div slot="tip" class="el-upload__tip" >请将附件命名与上传文件内容保持一致，例如：单位介绍信.jpg，支持附件格式为：jpg、png、pdf的文件</div>
                  </el-upload>
                </el-form-item>
            
                <el-form-item class="btn" >
                  <el-button @click="dialogUtilezeRegisterVisible = false">取消</el-button>
                  <el-button type="primary" @click="utilizeSubmitFun">保存</el-button>
                </el-form-item>
              </el-form>
              </el-tab-pane>
            </el-tabs>
           
              
          </el-dialog>
        <!-- 查档登记 E -->
         <!-- 查档登记详情 B -->
          <el-dialog :title="'查档登记详情'" :visible.sync="dialogUtilezeRegisterDetailVisible" width="60%" >
                  <!-- 查档登记信息 -->
    <table class="mailTable" >

      <tr v-if="utilizeDetail.cddwmc">
        <td class="column">查档单位：</td>
        <td >{{utilizeDetail.cddwmc}}</td>
        <td class="column">统一社会信用代码：</td>
        <td >{{utilizeDetail.tyshxydm}}</td>
      </tr>
      <tr >
        <td class="column">查档目的：</td>
        <td >{{utilizeDetail.cdmdName}}</td>
        <td class="column">查档类别：</td>
        <td >{{utilizeDetail.cdlbName}}</td>
      </tr>
      <tr >
        <td class="column">查阅人：</td>
        <td >{{utilizeDetail.reviewer}}</td>
        <td class="column">身份证号：</td>
        <td >{{utilizeDetail.idcard}}</td>
      </tr>
      <tr >
        <td class="column">手机号：</td>
        <td >{{utilizeDetail.tel}}</td>
        <td class="column">查档人数：</td>
        <td >{{utilizeDetail.people_num}}</td>
      </tr>
      <tr >
        <td class="column">查档日期：</td>
        <td colspan="3">{{utilizeDetail.create_time | formatDate}}</td>
      </tr>
      <tr >
        <td class="column">查档依据：</td>
        <td colspan="3">
          <div class="cdyjstyle" v-for="(item,index) in checkedCities" :key="index">
            <template v-if="(index+1) !== checkedCities.length">
              {{item.mc}}、
            </template>
            <template v-if="(index+1) == checkedCities.length">
              {{item.mc}}
            </template>
          </div>
        </td>
      </tr>
      <tr >
        <td class="column">附件信息：</td>
        <td colspan="3">
          <div class="cdyjstyle" v-for="(item,index) in file_name" :key='index' > 
            <template v-if="(index+1) !== file_name.length">
             <el-link type="primary" :href="fileURLym+file_url[index]" :underline="false" target="_blank">{{item}}</el-link>、
            </template>
            <template v-if="(index+1) == file_name.length">
              <el-link type="primary" :href="fileURLym+file_url[index]" :underline="false" target="_blank">{{item}}</el-link>
            </template>
          </div>
        </td>
      </tr>
      <tr >
        <td class="column">档案名称：</td>
        <td colspan="3" >
          <div class="linkstyle"  @click="gotodetailsFun2()">{{utilizeDetail.damc}}</div>
          </td>
      </tr>
      <tr >
        <td class="column">查档内容：</td>
        <td colspan="3">{{utilizeDetail.cdnr}}</td>
      </tr>
    </table>
          </el-dialog>
        <!-- 查档登记详情 E -->
        <!-- 选择工程 B -->
        <el-dialog
          width="50%"
          title="选择项目"
          :visible.sync="engineeringVisible">
          
          <el-form :inline="true" :model="EngineeringQueryInfo" class="demo-form-inline" label-width="100px">
           
            <el-form-item label="项目类型">
            <el-select clearable v-model="EngineeringQueryInfo.gclx" placeholder="请选择项目类型" @change="utilizeEngineeringListFun">
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="项目名称">
              <el-input clearable v-model="EngineeringQueryInfo.gcmc" placeholder="请输入项目名称"  @change="utilizeEngineeringListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="utilizeEngineeringListFun">查询</el-button>
            </el-form-item>
          </el-form>
            <!-- 工程列表 B -->
            <el-table
              :data="selectEngineeringLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="gcmc"
                label="项目名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="项目类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="xmbh"
                label="项目档号"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="getEngineeringNameFun(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
        </el-dialog>
        <!-- 选择工程 E -->

       <!-- 查档情况登记 B -->
          <el-dialog :title="'查档情况登记'" 
          :visible.sync="dialogUtilizeConditionVisible" 
          width="60%">
            <div class="UtilizeConditionbox">
              <el-form ref="form" :model="UtilizeConditionform" label-width="80px">
                <el-row :gutter="20">
                  <el-col :span="3" class="tright">调卷情况：</el-col>
                  <el-col :span="6"><p>文字</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.wzj"></el-input>卷</el-col>
                  <el-col :span="6"><p>图纸</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.tzj"></el-input>卷</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="3"><p>照片</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.zpz"></el-input>张</el-col>
                  <el-col :span="6"><p>其它</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.qtj"></el-input>卷</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="3" class="tright">利用情况：</el-col>
                  <el-col :span="6"><p>复印文字</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.fywzz"></el-input>张</el-col>
                  <el-col :span="9"><p>复印图纸</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.fytzz"></el-input>张</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="3"><p>翻拍照片</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.fpzpz"></el-input>张</el-col>
                  <el-col :span="6"><p>冲洗照片</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.cxzpz"></el-input>张</el-col>
                  <el-col :span="9"><p>复制光盘</p><el-input placeholder="请输入" class="UCinput" v-model="UtilizeConditionform.fzgpz"></el-input> 张</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="3" class="tright">接待人：</el-col>
                  <el-col :span="6" ><el-input v-model="UtilizeConditionform.jdr"></el-input></el-col>
                  <el-col :span="4" class="tright">清点人：</el-col>
                  <el-col :span="6" ><el-input v-model="UtilizeConditionform.qdr"></el-input></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="3" class="tright">审核意见：</el-col>
                  <el-col :span="16" ><el-input placeholder="请输入审核意见" v-model="UtilizeConditionform.shyj"></el-input></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="3" class="tright">备注：</el-col>
                  <el-col :span="16" ><el-input placeholder="请输入备注" v-model="UtilizeConditionform.bz"></el-input></el-col>
                </el-row>
                <el-form-item class="btn" style="margin-top:30px;">
                  <el-button @click="dialogUtilizeConditionVisible = false">取消</el-button>
                  <el-button type="primary" @click="submitUtilizeConditionRegisterFun()">提交</el-button>
                </el-form-item>
              </el-form>

            </div>
          </el-dialog>
       <!-- 查档情况登记 E -->
  </div>
</template>

<script>
import {
  utilizeRecordList,
  utilizeCheckVerifyList,
  utilizeRegisterList,
  utilizeSubmit,
  utilizeEngineeringList,
  submitUtilizeConditionRegister,
  getInfo,
  uploadFileSimpleUtilize,
  getFileUtilizationUtilizeList,
} from '@/api/utilize'

import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
export default {
  data () {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      queryInfo:{
        page_num:1,
        page_size:10,
        create_time:'',
      },
      EngineeringList:[],//列表数据
      utilizeSubmitForm:{
        reviewer:'',
        idcard:'',
        tel:'',
        people_num:'',
        cddwmc:'',
        cdlb:'',
        tyshxydm:'',
        cdmd:'',
        engineering_id:'',
        gcmc:'',
        gclxName:'',
        dalx:'',
        cdnr:'',
      },
      utilizeSubmitFormRules: {
        reviewer: [
          { required: true, message: '请输入查阅人', trigger: 'blur' }
        ],
        idcard:[
          { required: true, message: '请输入身份证号', trigger: ["blur"]},
          { pattern:/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, message: "身份证号码格式不正确", trigger: "blur" },
        
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' },
          { pattern:/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: "手机号格式不正确", trigger: "blur" }
        ],
        people_num: [
          { required: true, message: '请输入查档单位名称', trigger: 'blur' }
        ],
        cdlb: [
          { required: true, message: '请输入查档类别', trigger: ["blur",'change'] }
        ],
        cddwmc: [
          { required: true, message: '请输入查档单位名称', trigger: ["blur",'change'] }
        ],
        tyshxydm: [
          { required: true, message: '请输入统一社会信用代码', trigger: ["blur",'change'] },
          { pattern:/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/, message: "统一社会信用代码格式不正确", trigger: "blur" }
        ],
        cdmd: [
          { required: true, message: '请输入查档目的', trigger: ["blur",'change'] }
        ],
        engineering_id: [
          { required: true, message: '请选择档案名称', trigger: ["blur",'change'] }
        ],
        dalx: [
          { required: true, message: '请输入查档类别', trigger: ["blur",'change'] }
        ],
      },
      dialogUtilezeRegisterVisible:false,//新增 弹层
      QueryConditionType:[],//查档类别
      QueryPurposeType:[],//查档目的
      QueryGistType:[],//查档依据
      engineeringVisible:false,//选择项目 弹层
      EngineeringQueryInfo:{ //项目列表查询
        gcmc:'',
        gclx:'',
      },
      engineeringType:[],//项目工程类型
      selectEngineeringLists:[],//
      dialogUtilizeConditionVisible:false, //查档登记情况
      UtilizeConditionform:{
        utilize_id:'',
        jdr:'',
        qdr:'',
        wzj:'',
        tzj:'',
        zpz:'',
        qtj:'',
        fywzz:'',
        fytzz:'',
        fpzpz:'',
        cxzpz:'',
        fzgpz:'',
        bz:'',
        shyj:'',
      },
      username:'',//当前用户名称
      file_status:[],
      activeName: 'first',
      
       checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: false,
        cityOptions:[],
      fileList:[],
      utilize_id:'',//利用记录id 随机数
      dialogUtilezeRegisterDetailVisible:false,//查档登记详情 弹层
      utilizeDetail:{},//查档详情数据
      file_name:[],//查档 附件
      file_url:[],//查档 附件
      fileURLym:'',//访问附件的域名
      cities2:[],//已经选中的 回显
    }
  },
  created () {
    this.getInfoFun() //用户信息
  },
  beforeMount(){
    this.getQueryPurposeType() //查档目的
    this.getQueryConditionType() //查档类别
    this.getEngineeringTypeFun() // 工程类型
    this.getSystemDictionary() //状态
    this.getQueryGistType() //查档依据
    this.querySystemDictionaryFun() //获取文件预览域名
  },
  mounted () {
    this.utilizeRegisterListFun()
    this.utilizeIdFun()
  },
  methods: {
     gotodetailsFun2(){
        if (this.Namerow.lydalx == '2') {
        this.$router.push({ 
        path: '/RecorSearch/utilize/utilizeaudioPaget', 
        query: { 
           filesid: this.Namerow.engineering_id,
           filesType: this.Namerow.dalx
           }
        })
      } else{
        this.$router.push({ 
        path: '/Audit/utilizeEngineeringPage', 
        query: { 
           engineering_id: this.Namerow.engineering_id,
           gclx: this.Namerow.dalx,
           zt:this.Namerow.zt
           }
        })
      }
     
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
    //查看 
    showUtilezeRegisterVisibleFun(row){
      console.log(row)
      this.Namerow = row
      this.dialogUtilezeRegisterDetailVisible = true
      this.engineeringType.forEach(t => {  //载体类型
        if (row.dalx === t.type_code) {
          row.gclxName = t.type_name
        }
        return
      })
      var newarr = []
      this.checkedCities = []
      newarr = row.cdyj.split("#")
      console.log(newarr)
      newarr.forEach(item =>{
        this.cityOptions.forEach(v =>{
          if (item == v.bm) {
            this.checkedCities.push(v)         
          }
        })
      })
      this.cities2 = this.checkedCities
      console.log(this.checkedCities)
      const q ={
        utilize_id:row.utilize_id
      }
      getFileUtilizationUtilizeList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.file_name = res.file_name
         this.file_url = res.file_url
        }
      })
      this.utilizeDetail = row

    },
    //生成档案利用ID
    utilizeIdFun(){
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var hours = day.getHours();
        var minutes = day.getMinutes()
        var seconds = day.getSeconds();
        var CurrentDate = "";
        Year = day.getFullYear(); //支持IE和火狐浏览器.
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year;
        if (Month >= 10) {
            CurrentDate += Month;
        }
        else {
            CurrentDate += "0" + Month;
        }
        if (Day >= 10) {
            CurrentDate += Day;
        }
        else {
            CurrentDate += "0" + Day;
        }
        if (hours<10) {
          hours = '0'+hours
        }
        if (minutes<10) {
          minutes = '0'+minutes
        }
        if (seconds<10) {
          seconds = '0'+seconds
        }
        CurrentDate = CurrentDate+hours+minutes+seconds
        var OrderID = CurrentDate + Math.floor(Math.random() * 100 );
        this.utilize_id = OrderID
        console.log("随机ID:" + OrderID );
        return OrderID
    },
    //自定义上传 函数
    myUpload(e) {
      console.log(e)
      console.log(this.utilize_id)
      const formData = new FormData()
      formData.append('file', e.file)
      formData.append('utilize_id', this.utilize_id)
      uploadFileSimpleUtilize(formData).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
        }
      })
    },
    //
    handleChange(){},
    //查询依据
    handleCheckAllChange(val) {
      console.log(val,"全选")
        this.isIndeterminate = false
        this.checkedCities = val ? this.cityOptions : []
      },
      // 查询依据
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length;
        console.log(checkedCount > 0 && checkedCount < this.cities.length)
        console.log(checkedCount )
        console.log(this.cities.length)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
      //单位和个人查档切换
    handleClick(tab, event) {
        console.log(tab, event);
      },
      //用户信息
    getInfoFun(){
      getInfo().then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.username = res.user_name
        }
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
    //查档情况登记 表单提交
    submitUtilizeConditionRegisterFun(){
      console.log(this.UtilizeConditionform)
      submitUtilizeConditionRegister(this.UtilizeConditionform).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.message({ message: message, type: 'success' })
        this.utilizeRegisterListFun() //刷新列表
        this.dialogUtilizeConditionVisible = false
        }
      })
    },
    //查档情况登记 弹层
    UtilizeConditionVisibleFun(row){
      console.log(row)
      this.UtilizeConditionform = {
        utilize_id:'',
        jdr:'',
        qdr:'',
        wzj:'',
        tzj:'',
        zpz:'',
        qtj:'',
        fywzz:'',
        fytzz:'',
        fpzpz:'',
        cxzpz:'',
        fzgpz:'',
        bz:'',
        shyj:'',
      },
      
      this.UtilizeConditionform.jdr = this.username
      this.UtilizeConditionform.qdr = this.username
      this.UtilizeConditionform.utilize_id = row.utilize_id
      this.dialogUtilizeConditionVisible = true
    },
  //获取项目名称类型
  getEngineeringNameFun(row){
    console.log(row)
    this.utilizeSubmitForm.gcmc = row.gcmc
    this.utilizeSubmitForm.engineering_id = row.engineering_id
    this.utilizeSubmitForm.gclxName = row.gclxName
    this.utilizeSubmitForm.dalx = row.gclx
    this.engineeringVisible = false
  },
  //获取 项目工程 列表
  utilizeEngineeringListFun(){
    utilizeEngineeringList(this.EngineeringQueryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         

        res.map(v=>{
          this.engineeringType.forEach(t => {  //载体类型
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
           
        })
        console.log(this.selectEngineeringLists)
        this.selectEngineeringLists = res
        }
      })
  },
  //选择工程弹层
    selectEngineeringFun(){
      this.utilizeEngineeringListFun()
      this.engineeringVisible = true
    },
    //新增、添加档案利用信息
    utilizeSubmitFun(){
      const q = {
        reviewer:'',
        idcard:'',
        tel:'',
        people_num:'',
        cddwmc:'',
        cdlb:'',
        tyshxydm:'',
        cdmd:'',
        engineering_id:'',
        dalx:'',
        cdnr:'',
        cdlx:'',
        cdyj:'',
        utilize_id:this.utilize_id,
      }
      console.log(this.checkedCities)
      console.log(this.checkAll)
      var cdlx = ''
      if (this.activeName == 'first') {
        cdlx = '2'
      } else {
        cdlx = '1'
      }
      var cdyj = ''
      this.checkedCities.forEach((item,index) =>{
        if (index == 0) {
          cdyj = item.bm
        } else {
          cdyj = cdyj +'#'+item.bm
        }
      })
      this.utilizeSubmitForm.utilize_id = this.utilize_id
      this.utilizeSubmitForm.cdlx = cdlx
      this.utilizeSubmitForm.cdyj = cdyj
      utilizeSubmit(this.utilizeSubmitForm).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.message({ message: message, type: 'success' })
        this.utilizeRegisterListFun() //刷新列表
        this.dialogUtilezeRegisterVisible = false
        }
      })
    },
    // 新增 查档登记 弹层
    dialogUtilezeRegisterVisibleFun(){
      this.utilizeIdFun() //新增档案利用ID
      this.checkedCities = []
      this.dialogUtilezeRegisterVisible = true
    },
  //获取档案利用查档登记列表
    utilizeRegisterListFun(){
      this.queryInfo.page_num = this.currentPage
      this.queryInfo.page_size = this.pageSize
      utilizeRegisterList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.total = res.total
        res.list.map(v =>{
          this.QueryPurposeType.forEach(t =>{
              if (v.cdmd === t.bm) {
                v.cdmdName = t.mc
              }
              return
          })
          this.QueryConditionType.forEach(t =>{
              if (v.cdlb === t.bm) {
                v.cdlbName = t.mc
              }
              return
          })
           this.file_status.forEach(t => {  //审核状态
              if (v.zt === t.dict_code) {
                v.ztName = t.dict_name
              }
              return
            })
          return
        })
        console.log(this.EngineeringList)
        this.EngineeringList = res.list
        }
      })
    },
        //每页显示条数改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.utilizeRegisterListFun()
    },
    // 显示页数改变
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.utilizeRegisterListFun()
    },
     //查档依据
     getQueryGistType() {
      const q = {
        bm: "DICT_CDYJ"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryGistType  = res
          this.cities = res
          this.cityOptions = res
          
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //查档类别
     getQueryConditionType() {
      const q = {
        bm: "DICT_CDLB"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryConditionType  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //查档目的
     getQueryPurposeType() {
      const q = {
        bm: "DICT_CDMD"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.QueryPurposeType = res
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
          this.engineeringType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
<style lang="less" scoped>
.el-upload__tip {
  color: #D9001B;
}
.btn {
  width: 100%;
  text-align: center;
}
.tright {
  text-align: right;
}
.tcenter {
  text-align: center;
}
.UCinput {
  width: 80px;
  height: 30px !important;
  line-height: 30px !important;
  padding: none !important;
  text-align: left;
  margin: 0 3px;
}
.UtilizeConditionbox {
  .el-row {
    line-height: 50px;
    p{
      width: 65px;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>
<style lang='less'>

.utilizeRemarks {
  width: 100%;
  .el-form-item__content {
    width: 70%;
  }
}
.xuanzeengineering_id {
  margin-left: 10px !important;
}
.linkstyle {
  cursor: pointer;
  color: #409EFF;
}
.linkstyle:hover {
  color: #2874c0;
}
</style>
<style lang="less" scoped>
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

　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 250px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>