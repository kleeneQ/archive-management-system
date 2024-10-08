<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>利用审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="background-color: #F4F4F4;">
      <div class="eltablebox">
        <!-- 利用审核列表 -->
            <el-table
              :data="auditFilesList"
              border
              style="width: 100%"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column align="center" fixed label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
              align="center"
                prop="reviewer"
                label="查阅人"
                show-overflow-tooltip
               
                width="200">
                <template slot-scope="scope" >
                  <div class="linkstyle"  @click="showUtilezeRegisterVisibleFuns(scope.row)">{{scope.row.reviewer}}</div>
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="damc"
                label="档案名称"
                show-overflow-tooltip
                width="300">
                <template slot-scope="scope" >
                  <div class="linkstyle"  @click="gotodetailsFun(scope.row)">{{scope.row.damc}}</div>
                </template>
              </el-table-column>
              <el-table-column
              align="center"
                prop="wzj"
                label="文字总卷数"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
              align="center"
                prop="tzj"
                label="图纸总张数"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                align="center"
                prop="zpz"
                label="照片总张数"
                show-overflow-tooltip
                width="300">
              </el-table-column>
              <el-table-column
                align="center" 
                prop="qtj"
                label="其他总张数"
                show-overflow-tooltip
                width="200"
              >
              </el-table-column>
              <el-table-column
              align="center"
                prop="create_time"
                label="提交审核时间"
                width="200">
              <template slot-scope="scope">
                {{scope.row.create_time | formatDate}}
              </template>
              </el-table-column>
              <el-table-column
              align="center"
                label="操作"
                fixed="right"
                width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="showUtilezeRegisterVisibleFun(scope.row)">调卷利用详情</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditFun(scope.row)">审核</el-button>
                  <el-button type="warning" size="small" @click="showDialogAuditDetailsFun(scope.row)">审核详情</el-button>
               </template>
              </el-table-column>
            </el-table>
          
      </div>
      <!-- 分页 -->
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
    <!-- 审核弹层 B-->
     <el-dialog
      :title="'审核'"
      :z-index='2001'
      :visible.sync="AuditDialogVisible"
      width="40%"
      @close="dialogClosed"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="是否通过：" prop="pass">
            <el-radio-group v-model="form.pass">
              <el-radio label="true" @change="auditpassbtn">通过</el-radio>
              <el-radio label="false" @change="auditpassbtn">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="调卷利用设置：" v-if="UtilizeAudioflag">
            <el-button type="primary" class="btnedit" @click="getUtilizeAudioFileUrlInfoListFun()">设置</el-button>
            <el-button type="primary" class="btnedit" @click="getUtilizeAudioCheckUseSetListFun()">设置详情</el-button>
          </el-form-item>
          <el-form-item label="调卷利用设置：" v-else>
            <el-button type="primary" class="btnedit" @click="UtilizeFileSettingVisibleFun(Auditrow)">设置</el-button>
            <el-button type="primary" class="btnedit" @click="setUtilizeCheckUselistFun(Auditrow)">设置详情</el-button>
          </el-form-item>
          <el-form-item label="是否添加水印：" >
            <el-radio-group v-model="form.checkWaterMarkSet">
              <el-radio :label="true" >是</el-radio>
              <el-radio :label="false" >否 </el-radio>
              <el-button type="primary" class="btnedit" @click="WaterMarkDialogVisibleshowFun()">水印设置</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核描述：" class="margin-top-10">
            <el-input type="textarea" :rows="3" v-model="form.desc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="需上级领导审核：" v-if="UtilizeUseCheckModelCountflag">
            <el-radio-group v-model="form.UtilizeUseCheckCount">
              <el-radio :label="false" >是</el-radio>
              <el-radio :label="true" >否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm()">取消</el-button>
            <el-button type="primary" @click="onSubmitAudit('form')">提交审核</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 审核弹层 E-->
<!-- 设置是否添加水印 弹层 B -->
    <el-dialog
      :title="'水印设置'"
      :z-index='2004'
      :visible.sync="WaterMarkDialogVisible"
      width="50%">
      <div class="WaterMarkbox WaterMarkbox1">
        <el-form ref="WaterMarkform" :model="WaterMarkform" label-width="80px">
  <el-form-item label="内容">
    <el-input size="mini" v-model="WaterMarkform.text_info" @change="setUtilizeUseCheckWaterMarkFun"></el-input>
  </el-form-item>
  <el-form-item label="字号">
    <el-select size="mini" v-model="WaterMarkform.font_size" @change="setUtilizeUseCheckWaterMarkFun">
      <el-option v-for="(item,index) in 60" :key="index" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="版式">
    <el-select size="mini" v-model="WaterMarkform.format" @change="setUtilizeUseCheckWaterMarkFun">
      <el-option label="倾斜" value="倾斜"></el-option>
      <el-option label="水平" value="水平"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="水平对齐">
    <el-select size="mini" v-model="WaterMarkform.horizontal_alignment" @change="setUtilizeUseCheckWaterMarkFun">
      <el-option label="水平居中" value="水平居中"></el-option>
      <el-option label="左对齐" value="左对齐"></el-option>
      <el-option label="右对齐" value="右对齐"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="垂直对齐">
    <el-select size="mini" v-model="WaterMarkform.vertical_alignment" @change="setUtilizeUseCheckWaterMarkFun">
      <el-option label="垂直居中" value="垂直居中"></el-option>
      <el-option label="顶端对齐" value="顶端对齐"></el-option>
      <el-option label="底端对齐" value="底端对齐"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="透明度">
     <el-slider
      v-model="WaterMarkform.transparency"
       @change="setUtilizeUseCheckWaterMarkFun"
      show-input
      input-size="mini"
      :step="0.01"
      :min="0"
      :max="1">
    </el-slider>
  </el-form-item>

</el-form>
      </div>
      <div class="WaterMarkbox ">
        <p>水印预览</p>
        <div class="WaterMarkbox2">
          <div class="block">
            <el-image :src="WaterMarksrc"></el-image>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="WaterMarkDialogVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="setUtilizeUseCheckWaterMarkFun2">保存设置</el-button>
      </div>

    </el-dialog>
<!-- 设置是否添加水印 弹层 E -->
  <!-- 设置文件 B-->
    <el-dialog 
    :title="'设置'" 
    :visible.sync="settingFileVisible" 
    :before-close="handleClose"
    width="60%" >
      <div class="scanrightcenter">
            <div class="utilizeAudit-images">
                    <el-checkbox-group v-model="checkList" @change="checkListFun">
                      <div class="block" v-for="(item,index) in filePreviewlist" :key="index">
                        <el-checkbox border :label="item.file_url" @change="checkFun(item.file_url,index)" >
                            <img :src="item.file_url" >
                        </el-checkbox>
                       <p style="font-size:14px">{{item.zdjh}}</p> 
                      </div> 
                    </el-checkbox-group>
                    
                </div>
              <div class="scan-image-relevancy">
                <div class="scan-image-relevancy-item scan-image-relevancy-1">文件共：<span>{{filePreviewlist.length}}</span>张/条，已选择：<span> {{checkList.length}}</span>张/条</div>
                <div class="scan-image-relevancy-item "><el-checkbox style="color: #F59A23;" v-model="allchecked" @change="allcheckedFun()">全选</el-checkbox></div>
                <div class="scan-image-relevancy-item scan-image-relevancy-2" @click="setUtilizeAudioFilesCheckPickFun()"><i class="el-icon-s-claim"> 保存设置</i></div>
              </div> 
        </div>
    </el-dialog>
    <!-- 设置文件 E-->

    <!-- 预览设置文件 B-->
    <el-dialog 
    :title="'设置详情'" 
    :visible.sync="settingdetailsFileVisible" 
    width="60%" >
      <div class="scanrightcenter">
            <div class="utilizeAudit-images">
                      <div class="block" v-for="(item,index) in detailsfilePreviewlist" :key="index">
                            <img :src="item.file_url" >
                            <p>{{item.zdjh}}</p>
                      </div> 
                </div>
              <div class="scan-image-relevancy">
                <div class="scan-image-relevancy-item scan-image-relevancy-1">文件共：<span>{{detailsfilePreviewlist.length}}</span>张/条</div>
              </div> 
        </div>
    </el-dialog>
    <!-- 预览设置文件 E-->

    <!-- 声像档案利用详情预览文件 B-->
    <el-dialog 
    :title="'调卷利用详情'" 
    :visible.sync="UtilizationOfVolleysdetailsVisible" 
    width="60%" >
      <div class="scanrightcenter">
            <div class="utilizeAudit-images">
                      <div class="block" v-for="(item,index) in filePreviewlist" :key="index">
                            <img :src="item.file_url" >
                            <p>{{item.zdjh}}</p>
                      </div> 
                </div>
              <div class="scan-image-relevancy">
                <div class="scan-image-relevancy-item scan-image-relevancy-1">文件共：<span>{{filePreviewlist.length}}</span>张/条</div>
              </div> 
        </div>
    </el-dialog>
    <!-- 声像档案利用详情预览文件 E-->


    <!-- 审核详情弹层 -->
      <el-dialog
        :title="'审核详情'"
      :z-index='2002'
        :visible.sync="AuditDetailDialogVisible"
        width="50%"
      >
      <AuditDetail
        :AuditDetailDatas='AuditDetailData'
        :auditformdesc='auditformdesc'
      ></AuditDetail>
    </el-dialog>
      <!-- 查档登记详情 B -->
      <el-dialog :title="'查档登记详情'" :visible.sync="dialogUtilezeRegisterDetailVisible" width="60%" >
            <table class="mailTable" >

      <tr  v-if="utilizeDetail.cddwmc">
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
    <!-- 调卷利用详情 B -->
        <el-dialog
          width="70%"
          title="调卷利用详情"
        :z-index='2100'
          :visible.sync="UtilizeFileInfoVisible">
            <!-- 工程列表 B -->
            <el-table
              :data="UtilizeFileInfoLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                label="调卷利用页码"
                prop="file_record_id"
                show-overflow-tooltip
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="总数量（张/卷）"
                prop="sl"
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="primary" @click="getUtilizeUseCheckFileGetUrlFun(scope.row)">预览</el-button>
                </template>
                
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
        </el-dialog>
    <!-- 调卷利用详情 E -->
        <!-- 文件预览 B-->
     <el-image-viewer 
        :z-index='2101'
        v-if="DialogVisibleimgview"
        :on-close="()=>{DialogVisibleimgview=false}"
        :url-list="FileUrlArrs" />
    <!-- 文件预览 E-->

    <!-- 调卷利用设置 B -->
        <el-dialog
          width="70%"
      :z-index='2003'
          title="调卷利用设置"
          :visible.sync="UtilizeFileSettingVisible">
            <!-- 工程列表 B -->
            <el-table
              :data="UtilizeFileInfoLists"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                align='center'
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="文件档号"
                align='center'
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                align='center'
                width="130">
              </el-table-column>
              <el-table-column
                label="调卷利用页码"
                align='center'
                prop="file_record_id"
                show-overflow-tooltip
                width="120"
                >
              </el-table-column>
              <el-table-column
                label="总数量（张/卷）"
                align='center'
                prop="sl"
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="200"
                style="text-align: left;"
                >
                <template slot-scope="scope">
                  <el-switch
                  class="mr-20"
                    v-model="scope.row.switch"
                    active-color="#5483AF"> 
                  </el-switch>
                  <el-button v-if="scope.row.ztlx == 'WJJZTLX_DIC-2'" type="primary" @click="DialogVisibleCropperimgviewFun(scope.row)">裁剪</el-button>
                </template>
                
              </el-table-column>
            </el-table>
            <div class="btnstyle">
               <el-button  @click="UtilizeFileSettingVisible = false">取消</el-button>
               <el-button  type="primary" @click="setUtilizeCheckUseFun()">保存</el-button>
            </div>
            <!-- 工程列表 E -->
        </el-dialog>
    <!-- 调卷利用设置 E -->

        <!-- 图纸文件预览 裁剪 B-->
        <div  class="cus-image" >
          <el-image-viewer
            :z-index='2220'
            :initial-index='imgindex'
            v-if="DialogVisibleCropperimgview"
            :on-close="dialogClosedCropper"
            :url-list="FileUrlArrs" >
            </el-image-viewer>
            <el-button type="primary" 
                v-show="DialogVisibleCropperimgview" 
                class="el-image-viewer__btn el-image-viewer__download " 
                icon="el-icon-scissors"  
                @click="CropperimgDialogFun(imgindex)">裁 剪 此 图 纸</el-button>
        </div>
        <!-- 图纸文件预览 裁剪 E-->
        <!-- 图纸文件预览 裁剪操作 B-->
        <el-dialog
          width="70%"
          :z-index='2222'
          title="裁剪图纸"
          :visible.sync="CropperimgDialog">
          <CropperImage v-if="CropperimgDialog" :fileBlob='fileBlob' :idobject='idobject' 
      @childFn="parentFn"></CropperImage>
          </el-dialog>
        <!-- 图纸文件预览 裁剪操作 E-->
    <!-- 调卷利用详情 设置后 B -->
        <el-dialog
          width="70%"
          title="调卷利用详情"
          :z-index='2003'
          :visible.sync="UtilizeCheckUselistVisible">
            <!-- 工程列表 B -->
            <el-table
              :data="UtilizeCheckUselist"
              border
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="wjtm"
                label="文件题名"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="wjdh"
                label="文件档号"
                show-overflow-tooltip
                width="250">
              </el-table-column>
              <el-table-column
                prop="ztlxName"
                label="载体类型"
                width="200">
              </el-table-column>
              <el-table-column
                label="调卷利用页码"
                prop="file_record_id"
                show-overflow-tooltip
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="总数量（张/卷）"
                prop="sl"
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="primary" @click="getUtilizeCheckUseGetUrlFun(scope.row)">预览</el-button>
                </template>
                
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
        </el-dialog>
    <!-- 调卷利用详情 设置后 E -->
  </div>

</template>

<script>
import {
  utilizeCheckList,
  utilizeCheckVerifyList,
  utilizeCheck,
  getFileUtilizationUtilizeList,
  getUtilizeCheckVerifyFileList,
  getUtilizeCheckList,
  getUtilizeUseCheckList,
  getUtilizeFileUrlInfoList,
  submitUtilizeuseCheck,
  getUtilizeUseCheckVerifyList,
  getUtilizeUseCheckFileGetUrl,
  getUtilizeuseCheckVerifyFileList,
  uploadFileUtilizeCut,
  setUtilizeCheckUse,
  setUtilizeCheckUselist,
  getUtilizeCheckUseGetUrl,

  //登记
  getUtilizeAudioFileUrlInfoList,
  setUtilizeAudioFilesCheckPick,
  getUtilizeAudioCheckUseSetList,
  getUtilizeAudioFileListDjh,
  getUtilizeUseCheckModelCount,

  //水印
  getFileUtilizeUseCheckWaterMarkDemo,
  setUtilizeUseCheckWaterMark,
  getUtilizeUseCheckWaterMarkinfo,

} from '@/api/utilize'
import {
  getEngineeringType
} from "@/api/digitization/projectAPI"
import {
  getAuditFilesList,
  handleAuditPass,
  handleAuditNoPass,
  getFilesMatalogueMemoCoverURL,
  getFilesAuditDetail,
} from "@/api/digitization/audit"
import AuditDetail from '@/components/audit/utilizeAuditDetail'
import CropperImage from '@/components/CropperImage'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
import {
  getArchivesCateList
} from '@/api/archivesCate'
export default {
  components: {
    AuditDetail,
    CropperImage,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')

  },
  data(){
    return {
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo:{
        page_num:'',
        page_size:'',
        ajtm:'',
        ajdh:'',
      },
      files_type:'files_type1',//案卷归属类型 默认工程类  files_type1——工程类   files_type2——管理类
      auditFilesList:[],//验收案卷列表
      AuditDialogVisible:false, //审核弹层
      // pass:'',//审核是否通过
      form:{
        pass:'true',//审核是否通过
        desc:'',//审核描述
        UtilizeUseCheckCount:true,
        checkWaterMarkSet:true,
      },
      rules:{ //表单校验
        pass: [
            { required: true, message: '请选择案卷是否通过', trigger: 'change' }
          ],
      },
      files_id:'',//提交审核的案卷ID
      selectedList: [], // 选中的案卷
      filesdetails:{}, //案卷详情列数据
      filesdetailstitle:'',//案卷详情案卷题名
      dialogFilesdetailsVisible:false,//案卷详情弹层
      DialogVisibleimgview:false,//案卷封面、卷内目录、备考表
      FileUrlArrs:[],//案卷封面、卷内目录、备考表
      fileURLym:'',//预览文件域名
      //审核详情
      AuditDetailDialogVisible:false,//审核详情弹层显示隐藏判断条件
      AuditDetailData:'',//审核详情
      auditformdesc:'', //审核描述
      file_status:[],//案卷状态
      utilize_id:'',//档案利用记录id
      dialogUtilezeRegisterDetailVisible:false,//查档登记详情 弹层
      utilizeDetail:{},//查档详情数据
      file_name:[],//查档 附件
      file_url:[],//查档 附件
      fileURLym:'',//访问附件的域名
      QueryConditionType:[],//查档类别
      QueryPurposeType:[],//查档目的
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      cityOptions:[],
      UtilizeFileInfoVisible:false,//调卷利用详情 弹层
      UtilizeFileInfoLists:[],//调卷利用详情数据
      DialogVisibleimgview:false,//文件预览 弹层
      FileUrlArrs:[],//文件预览数据
      UtilizeFileSettingVisible:false,//调卷利用设置
      Auditrow:{},//审核的 信息 条 ROW
      DialogVisibleCropperimgview:false, //图纸文件 预览 裁剪弹层
      imgindex:0, //图纸 下标
      CropperimgDialog:false,//裁剪操作 弹层
      fileBlob:'',//需要裁剪的文件 Blob
      idobject:{ //id 对象
        file_id:"",
        file_weight:'',
        utilize_id:'',
      },
      getUrlarr:[],//获取预览的完整数据
      FileUrlArrssss:[], //预览文件的数据
      sfcjArr:[],// 是否裁剪的数据
      UtilizeCheckUselistVisible:false,//调卷利用详情 设置后 弹层
      UtilizeCheckUselist:[],//调卷利用详情 设置后 数据
      Namerow:{},

      filePreviewlist:[],
      checkList:[],
      allchecked:'',//全选框
      settingFileVisible:false,//设置查询文件 弹层
      detailsfilePreviewlist:[],//
      settingdetailsFileVisible:false,//
      zdjh:[],//总登记号列表
      UtilizeAudioflag:false,//显示
      UtilizationOfVolleysdetailsVisible:false,//调卷利用详情文件弹层
      UtilizeUseCheckModelCount:'', //档案利用审核查询审核步骤数量
      UtilizeUseCheckModelCountflag:'',//是否需要上级审核
      getFileUtilizeUseCheckWaterMarkDemo:'',//水印效果文件
      WaterMarkDialogVisible:false, //设置是否添加水印 弹层
      WaterMarkform:{ //水印设置表单
        utilize_id:'',
        text_info:'海口市城建档案馆',
        font_size:30,
        transparency:0.50,
        format:'倾斜',
        horizontal_alignment:'水平居中',
        vertical_alignment:'垂直居中',
      },
      WaterMarksrc:'', //水印预览
    }
  },

  beforeMount(){
    this.getSystemDictionary()//案卷状态
    // this.getFileCategory()  // 案卷类别
    // this.getStoragePeriod()  // 保管期限
    // this.getSecretGrade()  // 密级
    this.getCarrierType()  // 载体类型
    this.getQueryPurposeType()  //查档目的
    this.getQueryConditionType() //查档类别
    this.getQueryGistType() //查档依据
    this.getEngineeringTypeFun() // 工程类型
    this.querySystemDictionaryFun() //获取文件预览域名
    this.getUtilizeUseCheckModelCountFun() // 档案利用审核查询审核步骤数量
  },
  mounted(){
    this.utilizeCheckListFun()
  },
  methods:{
    // 档案利用审核水印设置 保存设置
    setUtilizeUseCheckWaterMarkFun2(){
      setUtilizeUseCheckWaterMark(this.WaterMarkform).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: message, type: 'success' }) 
          this.WaterMarkDialogVisible = false
         this.getFileUtilizeUseCheckWaterMarkDemoFun() //获取最新预览文件
        }
      })
    },

    // 档案利用审核水印设置 
    setUtilizeUseCheckWaterMarkFun(){
      setUtilizeUseCheckWaterMark(this.WaterMarkform).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         this.getFileUtilizeUseCheckWaterMarkDemoFun() //获取最新预览文件
        }
      })
    },

    //打开水印设置 弹层
    WaterMarkDialogVisibleshowFun(){
      this.WaterMarkform.utilize_id = this.utilize_id 
      this.getUtilizeUseCheckWaterMarkinfoFun()
      this.WaterMarkDialogVisible = true

    },
    //获取水印参数
    getUtilizeUseCheckWaterMarkinfoFun(){
      const q = {
        utilize_id:this.utilize_id
      }
      getUtilizeUseCheckWaterMarkinfo(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         res.transparency = res.transparency * 1
         this.WaterMarkform = res
         this.getFileUtilizeUseCheckWaterMarkDemoFun() //获取最新预览文件
        }
      })
    },
    //获取档案利用审核水印参数效果
    getFileUtilizeUseCheckWaterMarkDemoFun(){
      getFileUtilizeUseCheckWaterMarkDemo(this.WaterMarkform).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.WaterMarksrc = this.fileURLym + res.file_url +'?'+new Date();
        }
      })
    },
    // 档案利用审核查询审核步骤数量
    getUtilizeUseCheckModelCountFun(){
      getUtilizeUseCheckModelCount().then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.UtilizeUseCheckModelCount = res.step_num
        }
      })
    },
    // 关闭设置弹层 
    handleClose(){
      this.settingFileVisible = false
      this.checkList = []
    },
    //声像档案根据案卷id获取文件登记号信息
    getUtilizeAudioFileListDjhFun(row){
      console.log(row)
      if (row.step*1 < this.UtilizeUseCheckModelCount*1) {
        this.UtilizeUseCheckModelCountflag = true
      } else {
        this.UtilizeUseCheckModelCountflag = false
      }
      this.zdjh = []
      const q = {
        files_id:row.engineering_id,
      }
      getUtilizeAudioFileListDjh(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.zdjh = res
        }
      })
    },
    //设置详情
    getUtilizeAudioCheckUseSetListFun(){
      const q = {
        utilize_id:this.utilize_id,
      }
      getUtilizeAudioCheckUseSetList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         if (res.length == 0) return this.message({ message: '未找到设置详情', type: 'warning' })
          res.map(item =>{
            this.zdjh.forEach(t=>{
             if (item.file_id == t.file_id) {
               item.zdjh = t.zdjh
             }
           })
           item.file_url = this.fileURLym + item.file_url+"?"+ new Date()
         })
          this.detailsfilePreviewlist = res
          this.settingdetailsFileVisible = true
        }
      })
    },
    // 档案利用登记审核选择可展示声像档案文件
    setUtilizeAudioFilesCheckPickFun(row){
      if (this.checkList.length == 0) return this.message({ message: ' 暂无勾选文件', type: 'error' })

      this.filePreviewlist.forEach((item,index) =>{
        console.log(item.checkedFlag)
        if (item.checkedFlag) {
         const q ={
            file_id:item.file_id,
            utilize_id:this.utilize_id,
            file_use_record:'0',
          }
          setUtilizeCheckUse(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.settingFileVisible = false
            this.checkList = []
            }
          }) 
        }else {
          const q = {
            file_id:item.file_id,
            utilize_id:this.utilize_id,
            file_use_record:'',
          }
          setUtilizeCheckUse(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.settingFileVisible = false
            this.checkList = []
            }
          })
        }
      })

         
    },
    //点击单个图片
    checkFun(fit,index){
      console.log(index)
      if (this.filePreviewlist[index].checkedFlag) {
        this.filePreviewlist[index].checkedFlag = false
      } else {
        this.filePreviewlist[index].checkedFlag = true
        // this.fileBlob = fit
        // this.$refs.Childsss.joinImgFun(fit)
      }
      
    },
      //全选
  allcheckedFun(){
    
      this.checkList = []

    if (this.allchecked) {
      this.filePreviewlist.map(item =>{
        item.checkedFlag = true
        this.checkList.push(item.url)
      })
    } else {
      this.checkList = []
    }
  },
     //多选
    checkListFun(){
      console.log(this.checkList)
    },
    //获取预览文件列表
    getUtilizeAudioFileUrlInfoListFun(){
      const q ={
        utilize_id:this.utilize_id,
      }
      console.log(q)
      getUtilizeAudioFileUrlInfoList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         res.map(item =>{
           this.zdjh.forEach(t=>{
             if (item.file_id == t.file_id) {
               item.zdjh = t.zdjh
             }
           })
           item.file_url = this.fileURLym + item.file_url+"?"+ new Date()
           item.checkedFlag = false
         })
         
          this.filePreviewlist = res
          this.settingFileVisible = true
        }
      })
    },
    //查看 H:\Git\lan-web\src\views\Home\Audit\utilizeEngineeringPage.vue
    gotodetailsFun(row){
      console.log(row)
      // /utilize/utilizeaudioPage
      if (row.lydalx == '2') {
        this.$router.push({ 
        path: '/utilize/utilizeaudioPage', 
        query: { 
           filesid: row.engineering_id,
           filesType: row.dalx
           }
        })
      } else{
       this.$router.push({ 
        path: '/Audit/utilizeEngineeringPage', 
        query: { 
           engineering_id: row.engineering_id,
           gclx: row.dalx,
           zt:row.zt
           }
        }) 
      }
      
    },
    gotodetailsFun2(){
      // /utilize/utilizeaudioPage
      if (this.UtilizeAudioflag) {
        this.$router.push({ 
        path: '/utilize/utilizeaudioPage', 
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
  
    // 调卷利用详情 设置后 文件预览
    getUtilizeCheckUseGetUrlFun(row){ 
      const that = this
      const q = {
        file_id:row.file_id,
        record_id:row.record_id,
      }
      console.log()
      getUtilizeCheckUseGetUrl(q).then(response =>{
        if (response.status === 200) {
          
          var str = response.data.data[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
            var url = that.fileURLym + response.data.data[0].file_url+"?"+Date.now()
            window.open(url, '_blank')
          } else {
            that.FileUrlArrs = []
            that.DialogVisibleimgview = true
            var FileUrlArrssss = response.data.data.sort(that.compare('file_weight'))
            FileUrlArrssss.forEach(item => {
              that.FileUrlArrs.push(that.fileURLym+item.file_url+"?"+Date.now())
            });
          }
        }
      })
    },

    //打开 调卷利用详情 设置后 弹层
    setUtilizeCheckUselistFun(row){
      console.log(row)
      const q ={
        utilize_id:row.utilize_id
      }
      setUtilizeCheckUselist(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         res.map(v =>{
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
          v.switch = true 
        })
         this.UtilizeCheckUselist = res
         this.UtilizeCheckUselistVisible = true  //打开调卷利用详情 设置后 弹层

        }
      })

    },
    //保存 设置 
    setUtilizeCheckUseFun(){
      console.log(this.UtilizeFileInfoLists)
      console.log(this.sfcjArr)
      if (this.sfcjArr.length != 0) {
        this.sfcjArr.map(sfcjM =>{
          sfcjM.yjcjItem = sfcjM.file_weight+'#0'
          sfcjM.yjcjItem2 = sfcjM.file_weight+'#1'
        })
      }
      const UtilizeFileInfoLists = this.UtilizeFileInfoLists
      UtilizeFileInfoLists.map(m =>{
        console.log(m)
        const s = m.file_record_id.split("#");
        const a = [];
        for (const s2 of s) {
          a.push(s2+'#0');
        }
        m.file_use_record = a
      })

      console.log(UtilizeFileInfoLists)
      //遍历 裁剪的数据 跟全部数据匹配（根据文件ID）
      //在转化对应的文件内附件的file_use_record  对已裁剪的文件下标进行处理
      //得出处理后的全部数据，进行循环提交
      this.sfcjArr.forEach(item =>{
        UtilizeFileInfoLists.forEach(v =>{
          if (item.file_id == v.file_id) {
            v.file_use_record.map((furMap,index) =>{
              if (furMap == item.yjcjItem) {
              console.log(furMap)
              console.log(item.yjcjItem)
                v.file_use_record[index] = item.yjcjItem2
                return
              }
            })
          }
            console.log(v.file_use_record)
        })
      })
      console.log(UtilizeFileInfoLists)
      console.log(this.sfcjArr)
      UtilizeFileInfoLists.forEach(item2 =>{
        item2.file_use_record = item2.file_use_record.join(',') //将处理过的 file_use_record  从数组转化为 字符串
        console.log(item2.file_use_record)
        // 判断是否选择 true——选中   未选中传空值 ''
        if (item2.switch == false) {
          const q = {
            utilize_id:item2.utilize_id,
            file_id:item2.file_id,
            file_use_record:'',
          }
          setUtilizeCheckUse(q).then(response =>{
          if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            
            }
          })
        } else {
          if (item2.ztlx == 'WJJZTLX_DIC-2') {
            const q = {
              utilize_id:item2.utilize_id,
              file_id:item2.file_id,
              file_use_record:item2.file_use_record,
            }
            setUtilizeCheckUse(q).then(response =>{ 
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
              }
            })
          } else {
            const q = {
              utilize_id:item2.utilize_id,
              file_id:item2.file_id,
              file_use_record:'0',
            }
            setUtilizeCheckUse(q).then(response =>{
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
              }
            })
          }
        }
      })
      console.log(UtilizeFileInfoLists)
      this.message({ message: '调卷利用设置完成', type: 'success' })
      
      return this.UtilizeFileSettingVisible = false
     
    },
    //子传父 关闭裁剪操作 弹层
    parentFn(id){
      this.CropperimgDialog = false
      console.log(id)
      this.sfcjArr.push(id) //添加 已经裁剪的文件
      this.DialogVisibleCropperimgview = true
    },
    //打开 裁剪操作弹层
    CropperimgDialogFun(index){
      console.log(index)
      this.DialogVisibleCropperimgview = false

        var imgurl = document.getElementsByClassName(
                "el-image-viewer__canvas"
            )[0].children[0].src;
        var pos = imgurl.lastIndexOf('/');//'/所在的最后位置'
        var str = imgurl.substr(pos+1)//截取文件名称字符串
        var fileWeight = '1'
        var fileId = '1'
      this.FileUrlArrssss.forEach((item,indexs) =>{
        if (str == item.file_url.substr(item.file_url.lastIndexOf('/')+1)) {
          console.log(item) 
          fileWeight = item.file_weight
          fileId = item.file_id
          index = indexs     
        }
      })
      console.log(this.FileUrlArrs[index])
      console.log(this.getUrlarr)

      this.fileBlob = this.FileUrlArrs[index]
      this.idobject = {
        file_id:fileId,
        file_weight:fileWeight,
        utilize_id:this.utilize_id,
      }
      console.log(this.getUrlarr[index])
      console.log(this.idobject)
      this.CropperimgDialog = true
    },


    // 关闭图纸文件预览 裁剪 弹层
    dialogClosedCropper(){
      this.DialogVisibleCropperimgview = false
    },
    //打开图纸文件预览 裁剪 弹层
    DialogVisibleCropperimgviewFun(row){
      

      const that = this
      const q = {
        file_id:row.file_id,
        record_id:row.record_id,
      }
      getUtilizeUseCheckFileGetUrl(q).then(response =>{
        if (response.status === 200) {
          
          var str = response.data.data[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
            var url = that.fileURLym + response.data.data[0].file_url
            window.open(url, '_blank')
          } else {
            that.FileUrlArrs = []
            that.DialogVisibleCropperimgview = true
            this.getUrlarr = response.data.data
            var FileUrlArrssss = response.data.data.sort(that.compare('file_weight'))
            this.FileUrlArrssss = FileUrlArrssss
            FileUrlArrssss.forEach(item => {
              that.FileUrlArrs.push(that.fileURLym+item.file_url)
            });
          }
        }
      })

      // this.DialogVisibleCropperimgview = true
    },
    //调卷利用设置
    UtilizeFileSettingVisibleFun(row){
      console.log(row)
       const q ={
        utilize_id:row.utilize_id,
      }
      getUtilizeFileUrlInfoList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
          res.map(v =>{
            this.carrierType.forEach(t => {
              if (v.ztlx === t.bm) {
                v.ztlxName = t.mc
              }
              return
            })
          v.switch = true 
        })
        
        this.UtilizeFileInfoLists = res
        this.UtilizeFileSettingVisible = true

        }
      })
    },
        //查看 
    showUtilezeRegisterVisibleFuns(row){
      console.log(row)
       this.UtilizeAudioflag = true

        
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
      console.log(this.cityOptions)
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
      getUtilizeuseCheckVerifyFileList(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.file_name = res.file_name
         this.file_url = res.file_url
        }
      })
      this.utilizeDetail = row

    },
    //文件预览
    getUtilizeUseCheckFileGetUrlFun(row){ 
      const that = this
      const q = {
        file_id:row.file_id,
        record_id:row.record_id,
      }
      getUtilizeUseCheckFileGetUrl(q).then(response =>{
        if (response.status === 200) {
          
          var str = response.data.data[0].file_url
          let index = str.lastIndexOf(".")
          str = str .substring(index+1,str.length);
          if (str === 'pdf') {
            var url = that.fileURLym + response.data.data[0].file_url
            window.open(url, '_blank')
          } else {
            that.FileUrlArrs = []
            that.DialogVisibleimgview = true
            var FileUrlArrssss = response.data.data.sort(that.compare('file_weight'))
            FileUrlArrssss.forEach(item => {
              that.FileUrlArrs.push(that.fileURLym+item.file_url)
            });
          }
        }
      })
    },
    compare(p){ //这是比较函数
      return function(m,n){
          var a = m[p];
          var b = n[p];
          return a.localeCompare(b,'zh-CN',{ numeric: true });
    }},
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
        //查看  调卷利用详情
    showUtilezeRegisterVisibleFun(row){
      console.log(row)
      if (row.lydalx == '2') {
        this.UtilizeAudioflag = true
        this.UtilizationOfVolleysdetailsVisible = true
        const q ={
          utilize_id:row.utilize_id,
        }
        console.log(q)
        getUtilizeAudioFileUrlInfoList(q).then(response =>{
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          
          res.map(item =>{
            this.zdjh.forEach(t=>{
              if (item.file_id == t.file_id) {
                item.zdjh = t.zdjh
              }
            })
            item.file_url = this.fileURLym + item.file_url+"?"+ new Date()
            item.checkedFlag = false
          })
            this.UtilizationOfVolleysdetailsVisible = true
            this.filePreviewlist = res
          }
        })
      } else {
            const q ={
              utilize_id:row.utilize_id
            }
            getUtilizeFileUrlInfoList(q).then(response =>{
            if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
                res.map(v =>{
                  this.carrierType.forEach(t => {
                    if (v.ztlx === t.bm) {
                      v.ztlxName = t.mc
                    }
                    return
                  })
              })
            this.UtilizeFileInfoLists = res
            this.UtilizeFileInfoVisible = true
              }
            })


      }
    
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
    // 获取档案利用审核列表
    utilizeCheckListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
      }
      getUtilizeUseCheckList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.utilizeCheckListFun()
         }
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
          return
        })
        this.auditFilesList = res.list 
        }
      })
    },

    //审核详情
    showDialogAuditDetailsFun(row){
      const that = this
      const q = {
        record_id:row.utilize_id 
      }
      console.log(row)
      getUtilizeUseCheckVerifyList(q).then(response =>{
        
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
      })
    },
        //案卷状态
    getSystemDictionary(){
       const q = {
          dict_tag:'file_status'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { //获取访问附件的域名
            if (response.status === 200) {
              this.file_status = response.data.data
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
    //案卷详情
    showDialogfilesDetailsFun(row){
      this.filesdetailstitle = row.ajtm
      this.auditFilesList.forEach(item =>{  //获取需要查看详情的案卷
        if (item.files_id === row.files_id) {
          this.filesdetails = item
        }
      })
      this.dialogFilesdetailsVisible = true  //显示案卷详情弹层

    },
    //提交审核
    onSubmitAudit(formName){
      this.auditpassbtn()
    this.$refs[formName].validate((valid) => {
      if (valid) {
        if (this.form.pass === "true") {
          const q = {
            check_status:'1',
            utilize_id:this.utilize_id,
            check_describe:this.form.desc,
            leader_check:this.form.UtilizeUseCheckCount?'1':'0',
            mark_check:this.form.checkWaterMarkSet?'0':'1',
          }
          submitUtilizeuseCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
            }
          })
        } else {
          const q = {
            check_status:'2',
            utilize_id:this.utilize_id,
            check_describe:this.form.desc,
            leader_check:this.form.UtilizeUseCheckCount?'1':'0',
            mark_check:this.form.checkWaterMarkSet?'0':'1',
          }
          submitUtilizeuseCheck(q).then(response =>{
            if (response.status === 200) {
              const { data: res } = response
              if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.message({ message: res.message, type: 'success', duration: 3000 })
              this.resetForm()
            }
          })
        }
        // this.AuditDialogVisible = false
       
      } else {
        console.log('error submit!!');
        return false;
      }
    });
      
    },
    //审核是否通过  并赋值给审核描述栏
    auditpassbtn(){
      console.log(this.form.pass == 'true')
      if (this.form.pass == 'true') {
        if (this.form.desc == '' || this.form.desc == "审核不通过") {
          this.form.desc = "审核通过"
        }
      } else {
        if (this.form.desc == '' || this.form.desc == '审核通过') {
          this.form.desc = "审核不通过"
        }
      }
    },
    // 审核按钮  审核弹层显示
    showDialogAuditFun(row){
      this.Auditrow = row
      if (row.lydalx == '2') {
        this.UtilizeAudioflag = true
      } else {
        this.UtilizeAudioflag = false
      }
      this.checkList = []
      this.getUtilizeAudioFileListDjhFun(row)
      this.utilize_id = row.utilize_id
      this.files_id = row.engineering_id
      this.AuditDialogVisible = true
    },
 

        // 切换每页显示几条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.utilizeCheckListFun()
    },

    // 页码值发生变化时的方法
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.utilizeCheckListFun()
    },
    //取消提交
    resetForm() {
      this.$refs['form'].resetFields();
      this.AuditDialogVisible = false
      this.form.desc = ''
      this.utilizeCheckListFun()
    },
    // 关闭弹层 
    dialogClosed() {
      this.AuditDialogVisible = false
      this.utilizeCheckListFun()
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

  }
}
</script>

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

<style lang="less" >
  .mr-20{
    margin-right: 20px;
  }
  .btnstyle {
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }
  .caozuo-right {
    text-align: left;
  }
  .el-image-viewer__mask-zindex {
    z-index: 2100;
  }
  .WaterMarkbox2 {
    text-align: center;
  .block {
    .el-image__inner{
      width: 244px !important;
      height: 345px !important;
    }
  }

}
</style>
<style lang="less" scoped>

.cus-image {
    .el-image-viewer__download {
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        text-align: center;
        background-color: #606266;
        z-index: 2221; /* 如果该组件需要传递 z-index 的值，这个值也需要做成动态的 props */
        cursor: pointer;
        position: fixed; 
        font-size: 20px;
    }
}
</style>

<style scoped lang='less'>

.WaterMarkbox {
  display: inline-block;
  width: 49%;
  height: 400px;
  vertical-align:top;
  p {
    line-height: 30px;
    background-color: #ddd;
    font-size: 18px;
  }
}
.WaterMarkbox2 {
  background-color: #eee;
  padding: 20px;
  box-sizing: border-box;
  .block {
    .el-image__inner{
      width: 50% !important;
    }
  }

}
.file-btn {
  display: inline-block;
    position: absolute;
    width: 60px;
    left: 0;
    cursor: pointer;
    outline: none;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
}
.scanLeft {
  float: left;

}
.scanLeftcenter {
  width: 100%;
  height: 600px;
}

.scan-image-relevancy {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: 10px;
  width: 100%;
  background-color: rgba(242, 242, 242, 1);
  padding: 20px 0 ;
  text-align: center;
  font-size: 18px;
  .scan-image-relevancy-item  {
    display: inline-block;
    cursor: pointer;
    margin-right: 30px;
    color: #F59A23;
  }
  .scan-image-relevancy-1 {
    color: #000;
    span {
      display: inline-block;
      min-width: 40px;
      color: #F59A23;
    }
  }

}
.scanBox {
  background-color: #fff;
  margin: 10px ;
  box-sizing: border-box;
  height: 750px;
  position: relative;
  div {
    display: inline-block;
    box-sizing: border-box;
  }
  .scanLeft {
    width: 40%;
    box-sizing: border-box;
    padding: 30px;
    border-right: 1px solid #cdcdcd;
  }
  .scanright {
    width: 60%;
    box-sizing: border-box;
    padding: 30px ;
  }
  .scanTitle {
    margin: 10px ;
    box-sizing: border-box;
    border-bottom: 1px solid #cdcdcd;
    width: 97%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
      p {
        width: 100px;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 2px solid #02a7f0;
        padding-left: 10px;
      }
  }
  
}

</style>
