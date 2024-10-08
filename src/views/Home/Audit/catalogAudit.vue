<template>
  <div >
   <!-- 头部 面包屑导航 B --> 
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>档案审核</el-breadcrumb-item>
        <el-breadcrumb-item>档案编目审核</el-breadcrumb-item>
      </el-breadcrumb>
    <!-- 头部 面包屑导航 E -->

    <el-tabs type="border-card"  v-model="activeName" >
        <!-- 项目级 B -->
        <el-tab-pane label="项目级" name="Engineering">
            <!-- 检索栏 B -->
      <el-row style="background-color: #fff;padding:20px;padding-bottom:0;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="项目编号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入项目编号"  @change="getCatalogueEngineeringCheckListFun"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入项目名称"  @change="getCatalogueEngineeringCheckListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getCatalogueEngineeringCheckListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
    <!-- 列表区 B-->
    <div class="eltablebox" >
            <!-- 工程案卷列表 B -->
            <el-table
              :data="engineeringList"
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
                prop="gcdh"
                show-overflow-tooltip
                label="项目档号"
                width="230">
              </el-table-column>
              <el-table-column
                prop="gcmc"
                show-overflow-tooltip
                label="工程名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="工程类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="lxpzwh"
                label="立项批准文号"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                prop="jsdw"
                label="建设单位"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                prop="sgxkzh"
                label="施工许可证号"
                show-overflow-tooltip
                width="230">
              </el-table-column>
               <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogCatalogeFormVisibleFun(scope.row)">详情</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="primary" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
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
    <!-- 列表区 B-->
        </el-tab-pane>
        <!-- 项目级 E -->
        <!-- 单位工程级 B -->
        <el-tab-pane label="工程级" name="Project">
              <!-- 检索栏 B -->
      <el-row style="background-color: #fff;padding:20px;padding-bottom:0;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="单位工程名称">
              <el-input clearable v-model="queryInfo.dwgcmc" placeholder="请输入单位工程名称"  @change="getCatalogueProjectCheckListFun"></el-input>
            </el-form-item>
            <el-form-item label="单位工程档号">
              <el-input clearable v-model="queryInfo.dwgcdh" placeholder="请输入单位工程档号"  @change="getCatalogueProjectCheckListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getCatalogueProjectCheckListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
      
    <!-- 列表区 B-->
    <div class="eltablebox">
            <!-- 工程案卷列表 B -->
            <el-table
              :data="projectList"
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
                prop="dwgcdh"
                show-overflow-tooltip
                label="档号"
                width="230">
              </el-table-column>
              <el-table-column
                prop="dwgcmc"
                label="单位工程名称"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                prop="dwgclxName"
                label="单位工程类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="sgdw"
                label="施工单位"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                prop="kgsj"
                label="开工日期"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.kgsj | formatDate}}
                </template>
              </el-table-column>
                 <el-table-column
                prop="jgsj"
                label="竣工日期"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.jgsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogCatalogeProjectFormVisibleFun(scope.row)">详情</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="primary" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
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
    <!-- 列表区 B-->
        </el-tab-pane>
        <!-- 单位工程级 E -->

        <el-tab-pane label="案卷级" name="files">
      <el-row style="background-color: #fff;padding:20px;padding-bottom:0;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="案卷名称">
              <el-input clearable v-model="queryInfo.ajtm" placeholder="请输入案卷名称"  @change="getCatalogueFilesCheckListFun"></el-input>
            </el-form-item>
            <el-form-item label="案卷档号">
              <el-input clearable v-model="queryInfo.ajdh" placeholder="请输入案卷档号"  @change="getCatalogueFilesCheckListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getCatalogueFilesCheckListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
      
    <!-- 列表区 B-->
    <div class="eltablebox">
            <!-- 工程案卷列表 B -->
            <el-table
              :data="filesList"
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
                prop="ajdh"
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
                width="230">
              </el-table-column>
              <el-table-column
                prop="sgdw"
                label="移交单位"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="qssj"
                label="起始时间"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.qssj | formatDate}}
                </template>
              </el-table-column>
                 <el-table-column
                prop="zzsj"
                label="终止时间"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.zzsj | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="230">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogCatalogeFilesFormVisibleFun(scope.row)">详情</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="primary" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
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
    <!-- 列表区 B-->
        </el-tab-pane>
        <el-tab-pane label="文件级" name="file">
        <el-row style="background-color: #fff;padding:20px;padding-bottom:0;">
        <el-col>
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            <el-form-item label="文件题名">
              <el-input clearable v-model="queryInfo.wjtm" placeholder="请输入文件题名"  @change="getCatalogueFileCheckListFun"></el-input>
            </el-form-item>
            <el-form-item label="文件档号">
              <el-input clearable v-model="queryInfo.wjdh" placeholder="请输入文件档号"  @change="getCatalogueFileCheckListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getCatalogueFileCheckListFun">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <!-- 检索栏 E -->
      
    <!-- 列表区 B-->
    <div class="eltablebox">
            <!-- 工程案卷列表 B -->
            <el-table
              :data="fileList"
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
                show-overflow-tooltip
                min-width="350">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="230">
              </el-table-column>
              <el-table-column
                prop="sl"
                label="数量"
                width="230">
              </el-table-column>
                 <el-table-column
                prop="fz"
                label="附注"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit" @click="dialogCatalogeFileFormVisibleFun(scope.row)">详情</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="primary" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
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
    <!-- 列表区 B-->
        </el-tab-pane>
      </el-tabs>

      <!-- 项目级详情 B -->
       <el-dialog title="编辑" :visible.sync="dialogCatalogeFormVisible" width="50%">
          <el-form class="catalogueengineering" :inline="true" :model="projectForm" label-width="130px">
      <el-form-item label="项目名称: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.gcmc" placeholder="请输入项目名称" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目类型: " >
      <el-select disabled v-model="projectForm.gclx" placeholder="请选择项目类型">
        <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="工程结算: ">
        <el-input v-model="projectForm.gcjs" placeholder="请输入工程结算" disabled></el-input>
      </el-form-item>
      <el-form-item label="工程总造价: ">
        <el-input v-model="projectForm.gczj" placeholder="请输入工程造价" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="施工许可证号: ">
        <el-input v-model="projectForm.sgxkzh" placeholder="请输入施工许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="总建筑面积: ">
        <el-input v-model="projectForm.zjzmj" placeholder="请输入总建筑面积" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
       <el-form-item label="总用地面积: ">
        <el-input v-model="projectForm.zydmj" placeholder="请输入总用地面积" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
      <el-form-item label="建设单位: ">
        <el-input v-model="projectForm.jsdw" placeholder="请输入建设单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目地点: ">
        <el-input v-model="projectForm.gcdd" placeholder="请输入项目地点" disabled></el-input>
      </el-form-item>
      <el-form-item label="勘察单位: ">
        <el-input v-model="projectForm.kcdw" placeholder="请输入勘察单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="设计单位: ">
        <el-input v-model="projectForm.sjdw" placeholder="请输入设计单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="监理单位: ">
        <el-input v-model="projectForm.jldw" placeholder="请输入监理单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="用地规划许可证号: ">
        <el-input v-model="projectForm.ydghxkzh" placeholder="请输入用地规划许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="立项批准文号: ">
        <el-input v-model="projectForm.lxpzwh" placeholder="请输入立项批准文号" disabled></el-input>
      </el-form-item>
      <el-form-item label="规划许可证号: ">
        <el-input v-model="projectForm.ghxkzh" placeholder="请输入规划许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="用地许可证号: ">
        <el-input v-model="projectForm.ydxkzh" placeholder="请输入用地许可证号" disabled></el-input>
      </el-form-item>
      <el-form-item label="附注: " prop="fz" class="catalogueengineering-title">
        <el-input type='textarea' clearable v-model="projectForm.fz" placeholder="请输入附注"></el-input>
      </el-form-item>
    </el-form>

       </el-dialog>
      <!-- 项目级详情 E -->  
        <!-- 单位工程详情 弹层 B -->
      <el-dialog title="编辑" :visible.sync="dialogCatalogeProjectFormVisible" width="70%">
      <el-form class="catalogueengineering" :inline="true" :model="projectForm" label-width="130px">
      <el-form-item label="工程名称: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.dwgcmc" placeholder="请输入工程名称" disabled></el-input>
      </el-form-item>
      <el-form-item label="单位工程类型: " >
      <el-select disabled v-model="projectForm.dwgclx" placeholder="请选择单位工程类型">
        <el-option v-for="(item,index) in uniProjectType" :key="index" :label="item.type_name" :value="item.type_code"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="建筑面积: ">
        <el-input v-model="projectForm.jzmj" placeholder="请输入建筑面积" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
      <el-form-item label="工程地点: ">
        <el-input v-model="projectForm.gcdd" placeholder="请输入工程地点" disabled></el-input>
      </el-form-item>
      <el-form-item label="施工单位: ">
        <el-input v-model="projectForm.sgdw" placeholder="请输入施工单位" disabled></el-input>
      </el-form-item>
      <el-form-item label="结构类型: ">
        <el-input v-model="projectForm.jglx" placeholder="请输入结构类型" disabled></el-input>
      </el-form-item>
       <el-form-item label="工程造价: ">
        <el-input  v-model="projectForm.gczj" placeholder="请输入工程造价" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="开工日期: ">
        <el-input v-model="projectForm.kgsj" placeholder="请输入开工日期" disabled></el-input>
      </el-form-item>
      <el-form-item label="竣工日期: ">
        <el-input v-model="projectForm.jgsj" placeholder="请输入竣工日期" disabled></el-input>
      </el-form-item>
      <el-form-item label="工程结算: ">
        <el-input v-model="projectForm.gcjs" placeholder="请输入工程结算" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">万元</i></el-input>
      </el-form-item>
      <el-form-item label="附注: " prop="fz" class="catalogueengineering-title">
        <el-input type='textarea' clearable v-model="projectForm.fz" placeholder="请输入附注"></el-input>
      </el-form-item>
    </el-form>

      </el-dialog>
      <!-- 单位工程详情 弹层 E -->
    <!-- 案卷级详情 弹层 B -->
      <el-dialog title="编辑" :visible.sync="dialogCatalogefilesFormVisible" width="70%">
      <el-form class="catalogueengineering" :inline="true" :model="projectForm" label-width="130px">
      <el-form-item label="案卷题名: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.ajtm" placeholder="请输入案卷题名" disabled></el-input>
      </el-form-item>
      <el-form-item label="移交单位: ">
        <el-input v-model="projectForm.yjdw" placeholder="请输入移交单位" disabled><i slot="suffix" style="font-style:normal;margin-right: 10px;">m²</i></el-input>
      </el-form-item>
      <el-form-item label="案卷类别: " >
      <el-select disabled v-model="projectForm.ajlb" placeholder="请选择案卷类别">
        <el-option v-for="(item,index) in fileCategory" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="起始时间: ">
        <el-input v-model="projectForm.qssj" placeholder="请输入起始时间" disabled></el-input>
      </el-form-item>
      <el-form-item label="终止时间: ">
        <el-input v-model="projectForm.zzsj" placeholder="请输入终止时间" disabled></el-input>
      </el-form-item>
      <el-form-item label="保管期限: ">
      <el-select disabled v-model="projectForm.bgqx" placeholder="请选择保管期限">
        <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="密级: ">
      <el-select disabled v-model="projectForm.mj" placeholder="请选择密级">
        <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="载体类型: ">
      <el-select disabled v-model="projectForm.ztlx" placeholder="请选择载体类型">
        <el-option v-for="(item,index) in carrierType" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="责任者: ">
        <el-input v-model="projectForm.zrz" placeholder="请输入责任者" disabled></el-input>
      </el-form-item>
      <el-form-item label="案卷顺序号: ">
        <el-input v-model="projectForm.ajsxh"  oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入案卷顺序号" disabled></el-input>
      </el-form-item>
      <el-form-item label="附注: " prop="fz" class="catalogueengineering-title">
        <el-input type='textarea' clearable v-model="projectForm.fz" placeholder="请输入附注"></el-input>
      </el-form-item>
    </el-form>

      </el-dialog>
      <!-- 案卷级详情 弹层 E -->
    <!-- 文件详情 弹层 B -->
      <el-dialog title="编辑" :visible.sync="dialogCatalogefileFormVisible" width="70%">
      <el-form class="catalogueengineering" :inline="true" :model="projectForm" label-width="130px">
      <el-form-item label="文件题名: " class="catalogueengineering-title">
        <el-input clearable v-model="projectForm.wjtm" placeholder="请输入文件题名" disabled></el-input>
      </el-form-item>
      <el-form-item label="责任者: ">
        <el-input v-model="projectForm.zrz" placeholder="请输入责任者" disabled></el-input>
      </el-form-item>
      <el-form-item label="密级: " >
      <el-select disabled v-model="projectForm.mj" placeholder="请选择密级">
        <el-option v-for="(item,index) in secretGrade" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="载体类型: ">
      <el-select disabled v-model="projectForm.ztlx" placeholder="请选择载体类型">
        <el-option v-for="(item,index) in carrierTypefile" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="数量: ">
        <el-input v-model="projectForm.sl" placeholder="请输入数量" disabled></el-input>
      </el-form-item>
      <el-form-item label="规格: ">
      <el-select disabled v-model="projectForm.wz" placeholder="请选择文种">
        <el-option v-for="(item,index) in specifications" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="文种: ">
      <el-select disabled v-model="projectForm.wz" placeholder="请选择文种">
        <el-option v-for="(item,index) in language" :key="index" :label="item.mc" :value="item.bm"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="附注: " prop="fz" class="catalogueengineering-title">
        <el-input type='textarea' clearable v-model="projectForm.fz" placeholder="请输入附注"></el-input>
      </el-form-item>
    </el-form>

      </el-dialog>
      <!-- 文件详情 弹层 E -->

          <!-- 审核弹层 B-->
     <el-dialog
      :title="'审核'"
      :visible.sync="AuditDialogVisible"
      width="40%"
      @close="dialogClosed"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="是否通过：" prop="pass">
          <el-radio-group v-model="form.pass">
            <el-radio label="true" @change="auditpassbtn">通过</el-radio>
            <el-radio label="false" @change="auditpassbtn">不通过</el-radio>
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
    <!-- 审核弹层 E--> 
       <!-- 审核详情弹层 -->
      <el-dialog
        :title="'审核详情'"
        :visible.sync="AuditDetailDialogVisible"
        width="50%"
      >
      <AuditDetail
        :AuditDetailDatas='AuditDetailData'
        :auditformdesc='auditformdesc'
      ></AuditDetail>
    </el-dialog>   
  </div>
</template>

<script>
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getCatalogueCheckVerifyList,
  getCatalogueEngineeringCheckList,
  submitCatalogueEngineeringCheck,
  getCatalogueProjectCheckList,
  submitCatalogueProjectCheck,
  getCatalogueFilesCheckList,
  submitCatalogueFilesCheck,
  getCatalogueFileCheckList,
  submitCatalogueFileCheck,
} from '@/api/catalogue/catalogue'
import {
  getArchivesCateList
} from '@/api/archivesCate'
import AuditDetail from '@/components/audit/utilizeAuditDetail'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  components: {
    AuditDetail,
  },
  data () {
    return {
      total: 0, //总条数
      currentPage: 1, // 当前页数 
      pageSize: 10,  // 每页显示的条数
      //检索查询条件
      queryInfo:{
        ajdh:'',
        ajtm:'',
        dwgcmc:'',
        dwgcdh:'',
        ajtm:'',
        ajdh:'',
        wjdh:'',
        wjtm:'',
        
      },
      filesList:[],//列表
      dialogCatalogeFormVisible:false,//项目级详情
      projectForm:[],// 项目级详情
      engineeringType:[],//单位工程类型
      auditFilesList:[],//验收案卷列表
      AuditDialogVisible:false, //审核弹层
      // pass:'',//审核是否通过
      form:{
        pass:'true',//审核是否通过
        desc:''//审核描述
      },
      check_status:'',// 审核是否通过 数字
      rules:{ //表单校验
        pass: [
            { required: true, message: '请选择案卷是否通过', trigger: 'change' }
          ],
      },
      AuditDetailDialogVisible:false,//审核详情 弹层
      dialogCatalogeProjectFormVisible:false,//单位工程详情 弹层
      dialogCatalogefilesFormVisible:false,//案卷详情 弹层
      dialogCatalogefileFormVisible:false,//文件详情 弹层
      AuditDetailData:'',//审核详情
      auditformdesc:'', //审核描述
      engineering_id:'',//项目级ID
      project_id:'',//单位工程级ID
      files_id:'',//案卷级ID
      file_id:'',//文件级ID
      file_status:[],//案卷状态
      activeName:'Engineering',// tab栏 默认选中
      engineeringList:[],//项目级 列表
      projectList:[],//工程级 列表
      filesList:[],//案卷级 列表
      fileList:[],//文件级 列表
      uniProjectType:[],//单位工程类型
      fileCategory:[],//案卷类别 
      carrierType:[],//案卷级载体类型
      carrierTypefile:[],//文件级载体类型
      secretGrade:[],//密级
      specifications:[],//规格
      language:[], //文种
      storagePeriod:[],//保管期限
    }
  },
  created(){
    this.getFileCategory() //案卷类别
    this.getCarrierType() //案卷级载体类型
    this.getSecretGrade()  // 密级
    this.getCarrierTypefile()  // 载体类型    
    this.getSpecifications()  // 规格
    this.getLanguage()  // 文种
    this.getStoragePeriod()  // 保管期限
  },
  beforeMount(){
    this.getEngineeringTypeFun() // 工程类型
    this.getSystemDictionary()//审核状态
    this.getUniProjectType() //单位工程类型
  },
  mounted () {
    
    this.getCatalogueEngineeringCheckListFun() //获取列表  项目级
    this.getCatalogueProjectCheckListFun()//获取列表 工程级
    this.getCatalogueFilesCheckListFun() //获取列表 案卷级
    this.getCatalogueFileCheckListFun() //获取列表 文件级
  },
  methods: {
    //获取列表 文件级
    getCatalogueFileCheckListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        wjdh:this.queryInfo.wjdh,
        wjtm:this.queryInfo.wjtm,
      }
      getCatalogueFileCheckList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        if (res === null ) {
          return
        }
        res.list.map(v =>{
            this.carrierTypefile.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
        })
        this.fileList = res.list
        }
      })
    },
    // 获取列表 案卷级
    getCatalogueFilesCheckListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        ajtm:this.queryInfo.ajtm,
        ajdh:this.queryInfo.ajdh,
      }
      getCatalogueFilesCheckList(q).then(response =>{

        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        if (res === null ) {
          return
        }
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getCatalogueFilesCheckListFun()
         }
        res.list.map(v =>{
          this.fileCategory.forEach(t => {
              if (v.ajlb === t.bm) {
                v.ajlbName = t.mc
              }
              return
            })
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
        })
        this.filesList = res.list
        }
      })
    },
    //编目单位工程级审核列表
    getCatalogueProjectCheckListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        dwgcmc:this.queryInfo.dwgcmc,
        dwgcdh:this.queryInfo.dwgcdh,
      }
      getCatalogueProjectCheckList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        console.log(this.engineeringType)
        if (res === null ) {
          return
        }
        this.total = res.total
        res.list.map(v =>{
          this.uniProjectType.forEach(t => { //案卷类别
              if (v.dwgclx === t.type_code) {
                v.dwgclxName = t.type_name
              }
              return
            })
        })
        this.projectList = res.list
        }
      })
    },

        //审核详情
    showDialogAuditDetailsFun(row){
      const that = this
      if (this.activeName == 'Engineering') {
        this.record_id = row.engineering_id
      }else if(this.activeName == 'Project') {
        this.record_id = row.project_id
      }else if(this.activeName == 'files') {
        this.record_id = row.files_id
      }else if(this.activeName == 'file') {
        this.record_id = row.file_id
      }
      const q = {
        record_id:this.record_id 
      }
      console.log(row)
      getCatalogueCheckVerifyList(q).then(response =>{
        
        that.AuditDetailDialogVisible = true
        response.data.data.forEach(v => {
        that.file_status.forEach(t => {
            if (v.check_result === t.dict_code) {
              v.check_result = t.dict_name
            }
            return
          })
          return
        })
        that.AuditDetailData = response.data.data
        console.log(that.AuditDetailData)
      })
    },
       //提交审核
    onSubmitAudit(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        if (this.form.pass === "true") {
          this.check_status = '1'
          this.form.desc = "审核通过"
        } else {
          this.check_status = '2'
          this.form.desc = "审核不通过"
        }

        if (this.activeName == 'Engineering') {
          const q = {
            check_status:this.check_status,
            engineering_id:this.engineering_id,
            check_describe:this.form.desc,
          }
          submitCatalogueEngineeringCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
               this.getCatalogueEngineeringCheckListFun() //获取列表  项目级
            }
          })
        } else if (this.activeName == 'Project') {
          const q = {
            check_status:this.check_status,
            project_id:this.project_id,
            check_describe:this.form.desc,
          }
          submitCatalogueProjectCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
              this.getCatalogueProjectCheckListFun()//获取列表 工程级
            }
          })
        } else if (this.activeName == 'files') {
          const q = {
            check_status:this.check_status,
            files_id:this.files_id,
            check_describe:this.form.desc,
          }
          submitCatalogueFilesCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
              this.getCatalogueFilesCheckListFun() //获取列表 案卷级
            }
          })
        } else if (this.activeName == 'file') {
          const q = {
            check_status:this.check_status,
            file_id:this.file_id,
            check_describe:this.form.desc,
          }
          submitCatalogueFileCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
              this.getCatalogueFileCheckListFun() //获取列表 文件级
            }
          })
        } 
        
        
        this.AuditDialogVisible = true
        console.log('submit!',this.form.pass);
       
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
       //审核是否通过  并赋值给审核描述栏
    auditpassbtn(){
      if (this.form.pass === "true") {
        this.form.desc = "审核通过"
      } else {
        this.form.desc = "审核不通过"
      }
    },
    // 审核按钮  审核弹层显示
    showDialogAuditFun(row){
      if (this.activeName == 'Engineering') {
        this.engineering_id = row.engineering_id
      }else if(this.activeName == 'Project') {
        this.project_id = row.project_id
      }else if(this.activeName == 'files') {
        this.files_id = row.files_id
      }else if(this.activeName == 'file') {
        this.file_id = row.file_id
      }
      this.AuditDialogVisible = true
    },
   // 关闭弹层 
    dialogClosed() {
      this.AuditDialogVisible = false
    },
    //项目级详情 弹层
    dialogCatalogeFormVisibleFun(row){
      console.log(row)
      this.projectForm = row
      this.dialogCatalogeFormVisible = true
    },
    // 文件详情 弹层
    dialogCatalogeFileFormVisibleFun(row){
      this.projectForm = row
      this.dialogCatalogefileFormVisible = true
    },
    //案卷详情 弹层
    dialogCatalogeFilesFormVisibleFun(row){
      console.log(row)
      this.projectForm = row
      this.dialogCatalogefilesFormVisible = true
    },
    //单位工程级详情 弹层 
    dialogCatalogeProjectFormVisibleFun(row){
      this.projectForm = row
      this.dialogCatalogeProjectFormVisible = true
    },
   //获取列表 项目级列表
    getCatalogueEngineeringCheckListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        gcmc:this.queryInfo.ajtm,
        xmbh:this.queryInfo.ajdh,
      }
      getCatalogueEngineeringCheckList(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        if (res === null ) {
          return
        }
        this.total = res.total
        res.list.map(v =>{
          this.engineeringType.forEach(t => { //案卷类别
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
        })
        this.engineeringList = res.list
        }
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

    // 单位工程类型
    getUniProjectType() {
      getArchivesCateList().then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          // this.uniProjectType  = res
          
          var newArr = []
          res.forEach(v => {
            newArr = newArr.concat(v.child)
            if (this.gclx === v.type_code) {
              this.uniProjectType = v.child
            }
            return
          })
          this.uniProjectType = this.getTreeData(newArr)
        }
      }).catch(error => {
        console.log(error)
      })
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
    getCarrierType() {
      const q = {
        bm: "AJJZTLX_DIC"
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

    // 文件级载体类型
    getCarrierTypefile() {
      const q = {
        bm: "WJJZTLX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.carrierTypefile  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 规格
    getSpecifications() {
      const q = {
        bm: "WJGG_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.specifications  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 文种
    getLanguage() {
      const q = {
        bm: "WZ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.language  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
      //每页显示条数改变
        handleSizeChange(newSize) {
          this.pageSize = newSize
          this.getCatalogueEngineeringCheckListFun()
        },
        // 显示页数改变
        handleCurrentChange(newPage) {
          this.currentPage = newPage
          this.getCatalogueEngineeringCheckListFun()
        },
  },
}
</script>

<style scoped lang='less'>
.catalogueengineering {
  .btn{
  .el-form-item__content {
    width: 100% !important;
    text-align: center;
  }
      width:100%;
      margin-top:20px;
      margin-right:0;
      display: flex;
      justify-content: center;
    }
}

  .catalogueengineering {
    .el-form-item__content{
      width: 217px;
      }
  }
.catalogueengineering-title{
      display: flex !important;
      .el-form-item__content{
        flex: 1;
      }
    }
</style>
