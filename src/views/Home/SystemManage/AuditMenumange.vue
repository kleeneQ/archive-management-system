<template>
  <div>
    <!-- 头部导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核模板管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="margin-10">
       <el-button type="primary" icon="el-icon-folder-add" @click="setAuditTemplateFun('新增审核流程模板')">新增</el-button>
    </el-row>

    <!-- 审核流程模板列表 -->
    <el-table
      :data="AuditTemplatetableData"
      border
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center','padding':'0px'}"
      :row-style="{'height':'40px'}"
      >
    <el-table-column label="序号" type="index" width="80"> </el-table-column>
      <el-table-column
        prop="model_name"
        label="审核名称">
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="审核人员">
      </el-table-column>
       <el-table-column
        prop="address"
        label="抄送人">
      </el-table-column> -->
       <el-table-column
        prop="create_time"
        label="添加时间">
      </el-table-column>
       <el-table-column
        label="操作">
          <template slot-scope="scope">
           <el-button type="primary" size="small" @click="editAuditTemplateFun(scope.row)">编辑</el-button>
           <el-button type="danger" size="small" @click="DeleteAuditTemplateFun('删除',scope.row)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
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
    <!-- 新增编辑审核模板 -->
      <el-dialog
      :title="AuditTemplate"
      :visible.sync="AuditTemplateDialogVisible"
      width="45%"
      @close="dialogClosed"
     >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="审核流程名称：" prop="AuditTemplatename">
          <el-select v-model="ruleForm.AuditTemplatename" placeholder="请选择审核流程名称" class="el-select-width">
            <el-option 
            v-for="(auditname,index) in AuditTemplatenameList" 
            :key="index" 
            :label="auditname.dict_name" 
            :value="auditname.dict_code"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="审核人员：" required>
        <el-row v-for="(steplistsitem,index) in ruleForm.steplists" :key="index" class="margin-bottom-30">
          <el-col :span="8" >
            <el-input
              :placeholder="'审核步骤 '+(index+1)"
              :disabled="true">
            </el-input>
          </el-col>
          <el-col :span="10" class="center">
            <el-form-item :prop="'steplists.' + index + '.user_id'" :rules="{required: true, message: '请选择审核人员', trigger: 'change' }">
                <el-select multiple class="margin-left-10" @change="useridFun"  v-model="steplistsitem.user_id"   placeholder="请选择审核人员">
                <el-option  
                  v-for="(useritem,userindex) in Userlist"
                  :key="userindex"
                  :label="useritem.user_name"
                  :value="useritem.user_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="center-left padding-left-10">
            <el-button type="primary" icon="el-icon-plus" @click="addstepFun()"></el-button>
            <el-button type="danger" icon="el-icon-delete" v-if="index !== 0" @click="reomvestepFun(index)"></el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="抄送人员：">
          <el-select 
          v-model="ruleForm.copysuername" 
          placeholder="请选择抄送人员" 
          class="el-select-width"    
          multiple
         >
           <el-option  
              v-for="(useritem,userindex) in Userlist"
              :key="userindex"
              :label="useritem.user_name"
              :value="useritem.user_id"
              @change="copychange"
              ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleForm)">取消</el-button>
        <el-button type="primary" @click="AuditTemplatetableForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFilesAuditDetail,
  getAuditTemplateList,
  addAuditTemplate,
  getUserList,
  getAuditFlowTemplate,
  getAuditTagCopy,
  updateAuditTemplate,
  DeleteAuditTemplate,
} from '@/api/digitization/audit'
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  data(){
    return{
      AuditTemplatetableData:[],//审核模板列表
      AuditTemplateDialogVisible:false,//审核模板弹层 判断条件
      AuditTemplate:'',//审核模板  编辑或是新增
      ruleForm: {
        AuditTemplatename:'',
        copysuername:'',
        Audituserid:'',
        user_id:'',
        steplists:[
        {addstepidnex:1,audituser:'',userid:'1',indexs:'一',step:"",user_id:'1',user_list:[]},
      ],
      },
       steplists:[
        {addstepidnex:1,audituser:'',userid:'1',indexs:'一',step:"",user_id:'1',user_list:[]},
      ],
      rules: { //表单校验
          AuditTemplatename: [
            { required: true, message: '请选择审核流程名称', trigger: 'change' }
          ],
          // user_id: [
          //   { required: true, message: '请选择审核人员', trigger:'change' }
          // ],

      },
  
      Userlist:[],//审核人员列表
      userlabel:'',
      AuditTemplatenameList:[],//审核流程名称、审核字典标签
      AuditTemplatedata:[
        {model_name:'新增模板测试1',dict_tag:'',step:'',copy_for_user:''},
        
      ],//审核模板数据 新增需要传递的数据
      updaterow:{},//要编辑的模板列
      total: 0, //总页数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      forresdata:[],//
    
    }
  },
  watch:{
    AuditTemplateDialogVisible(newQuestion, oldQuestion){
      if(newQuestion === false){
        this.getAuditFlowListFun()//模板列表
      }
    },
  },
  mounted(){
    this.getUserListFun() //审核人员、抄送人员
    this.getSystemAudit()//审核流程名称、审核字典标签
    this.getAuditFlowListFun()//模板列表

  },
  methods:{
    useridFun(e){
      console.log(e)
      console.log(this.ruleForm)
    },
    //删除审核模板 
    DeleteAuditTemplateFun(name,row){
        const q = {
            model_id:row.model_id
          }
      this.$confirm('确定将该模板删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           DeleteAuditTemplate(q).then(response =>{
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getAuditFlowListFun()
            }
          })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },

    // 处理一步骤 多人审核 字段
    AuditbeingFun(data){
      const that = this
        const responsearr = this.forresdata
        const responsearr2 = data
        var newuserid = []
        var newuserid2 = []
        var a = 0
        var b = 0
        console.log(responsearr)
        console.log(responsearr.length)
        for (let index = 0; index < responsearr.length; index++) {
          const item = responsearr[index];
          console.log("循环次数",index)
          console.log("循环次数",item)
          console.log("步骤",responsearr)
          if (item.step === '1') {
            newuserid.push(item.user_id)
            responsearr2[0].user_id = newuserid
          } else if (item.step === '2'){
            newuserid.push(item.user_id)
            responsearr2[0].user_id = newuserid
          }
        }
        // console.log(responsearr2.splice(0, responsearr2.length - b))
        // setTimeout(function() {
        //   that.ruleForm.steplists = responsearr2.splice(0, responsearr2.length - b)
        // },1000)
            
    },

    //editAuditTemplateFun   编辑审核流程模板
    editAuditTemplateFun(row){
      const that = this
      that.updaterow = row
      this.AuditTemplate = '编辑审核流程模板'
      this.AuditTemplateDialogVisible = true
      const q = {
          model_id:row.model_id
      }
      getAuditFlowTemplate(q).then(response => {
        
        that.ruleForm.AuditTemplatename = response.data.data[0].dict_tag
        var csdict_tag = response.data.data[0].dict_tag
       if (response.status === 200) {
       const { data: res, message, status } = response.data
       if (status !== 200) return this.message({ message: message, type: 'error' })
          
          that.ruleForm.steplists = res
          var newuseridss = []
          res.forEach((item,index) => {
            that.ruleForm.steplists[index].user_id = item.user_list
           });
       }
          const qq = {
            dict_tag:csdict_tag
          }
          //获取审核抄送人员
          getAuditTagCopy(qq).then(response => { //获取审核抄送人员
          
            if (response.status === 200) {
              let newcopyarr =  []
             response.data.data.forEach(item => {
                 newcopyarr.push(item.user_id)
              });
              that.ruleForm.copysuername = newcopyarr
            }

          }).catch(error => {
            console.log(error)
          })
      })
    },
    copychange(e){
      console.log(e)
    },
    //保存编辑的模板
    updateAuditTemplateFun(){
      const that = this
      console.log(that.updaterow)
      var step = that.jointUserStepFun()
      console.log(step)
      var copy_for_user =  that.jointCopyidFun(that.ruleForm.copysuername)
       const q = {
         model_id:that.updaterow.model_id,
         model_name:that.updaterow.model_name,
         dict_tag:that.updaterow.dict_tag,
         step:step,
         copy_for_user:copy_for_user,
       
       }
       updateAuditTemplate(q).then(response=>{
         if(response.data.status === 200){
            this.AuditTemplateDialogVisible = false
          }else {
            this.message({ message: response.data.message, type: 'error' })
          }
       })
    },
    // 用户步骤拼接
    jointUserStepFun(){
      //步骤(用户id#步骤,用户id#步骤,用户id#步骤)
      var userid_step = ''
      var steplistsArr = this.ruleForm.steplists
      for (let i = 0; i < steplistsArr.length; i++) { //拼接用户ID和步骤
        if (i===0) {
          for (let j = 0; j < steplistsArr[i].user_id.length; j++) {
            const element = steplistsArr[i].user_id[j];
           
            if (j===0) {
               userid_step = steplistsArr[i].user_id[j]+'#'+(i+1) 
            } else {
               userid_step = userid_step+","+steplistsArr[i].user_id[j]+'#'+(i+1) 
            }
          }
        } else {
          for (let j = 0; j < steplistsArr[i].user_id.length; j++) {
            const element = steplistsArr[i].user_id[j];
            userid_step =  userid_step+","+steplistsArr[i].user_id[j]+'#'+(i+1) 
          }
          
        }
      }
      return userid_step
    },
    //抄送人员 拼接
    jointCopyidFun(copysuername){
      //抄送人员ID拼接 
      var copyidstring = ''
      var copysueridArr = copysuername
      for (let j = 0; j < copysueridArr.length; j++) {
        if (j=== 0) {
          copyidstring = copysueridArr[j]
        } else {
          copyidstring = copyidstring+"#"+copysueridArr[j]
        }
      }
      return copyidstring
    },

    //添加新模板  上传
    AuditTemplatetableForm(formName) {
      console.log(this.ruleForm.steplists)
         this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.AuditTemplate === '编辑审核流程模板') { 
                this.updateAuditTemplateFun() //如果是编辑则会 去调用 编辑保存的函数
                return
            }
              var formData = this.ruleForm
                //步骤(用户id#步骤,用户id#步骤,用户id#步骤)
                var userid_step = ''
                var steplistsArr = this.ruleForm.steplists
                for (let i = 0; i < steplistsArr.length; i++) { //拼接用户ID和步骤
                  if (i===0) {
                    for (let j = 0; j < steplistsArr[i].user_id.length; j++) {
                      const element = steplistsArr[i].user_id[j];
                      if (j === 0) {
                        userid_step = element+'#'+(i+1)
                      } else {
                        userid_step = userid_step+","+element+'#'+(i+1)
                      }
                    }
                    
                  } else {
                    for (let t = 0; t < steplistsArr[i].user_id.length; t++) {
                      userid_step = userid_step+","+steplistsArr[i].user_id[t]+'#'+(i+1)
                    }
                    
                  }
                  
                }
                //抄送人员ID拼接 
                var copyidstring = ''
                var copysueridArr = formData.copysuername
                for (let j = 0; j < copysueridArr.length; j++) {
                  if (j=== 0) {
                    copyidstring = copysueridArr[j]
                  } else {
                    copyidstring = copyidstring+"#"+copysueridArr[j]
                  }
                }

                //模板名称处理  根据模板名称和字典标签进行转化 
                var AuditTemplatenameListarr = this.AuditTemplatenameList
                var AuditTemplatenames = ''
                for (let t = 0; t < AuditTemplatenameListarr.length; t++) {
                  if(formData.AuditTemplatename === AuditTemplatenameListarr[t].dict_code){
                    AuditTemplatenames = AuditTemplatenameListarr[t].dict_name
                  }
                }    
                const q = {
                  model_name:AuditTemplatenames,
                  dict_tag:formData.AuditTemplatename,
                  step:userid_step,
                  copy_for_user:copyidstring,
                }
                addAuditTemplate(q).then(response =>{ //新增模板接口
                  if(response.data.status === 200){
                    this.AuditTemplateDialogVisible = false
                  }else {
                    this.message({ message: response.data.message, type: 'error' })
                  }
                })
          } else {
            console.log('表单校验失败');
            return
          }
        });
   
   
    },
    //审核流程名称、审核字典标签
    getSystemAudit(){
       const q = {
          dict_tag:'check'
          }
          //获取字段名
          querySystemDictionary(q).then(response => { //获取审核流程名称、审核字典标签
            if (response.status === 200) {
              this.AuditTemplatenameList = response.data.data
            }
          }).catch(error => {
            console.log(error)
          })
    },
    addstepFun(){ //添加步骤
      var addstepidnex = this.ruleForm.steplists.length + 1
      var userid = ''
      var user_list = []
      var audituser = ''
      var indexs = ''
      if(addstepidnex === 2){indexs = '二'}
      else if(addstepidnex === 3){indexs = '三'}
      else if(addstepidnex === 4){indexs = '四'}
      else if(addstepidnex === 5){indexs = '五'}
      else if(addstepidnex === 6){indexs = '六'}
      else if(addstepidnex === 7){indexs = '七'}
      else if(addstepidnex === 8){indexs = '八'}
      else if(addstepidnex === 9){indexs = '九'}
      else if(addstepidnex === 10){indexs = '十'}
      this.ruleForm.steplists.push({
        addstepidnex:addstepidnex,
        userid,
        audituser,
        indexs:indexs,
        user_list,
        })
    },
    reomvestepFun(index){ //移除步骤
      var newarr = this.ruleForm.steplists
      var a  = newarr.splice(index,1)

    },
   //getUserList 获取审核人员列表
   getUserListFun(){
     getUserList().then(response =>{
       this.Userlist = response.data.data
     })
   },
    //获取审核流程列表
    getAuditFlowListFun(){
      const q = {
        page_num:'1',
        page_size:'10',
      }
      getAuditTemplateList(q).then(response => {
        this.AuditTemplatetableData = response.data.data.list
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.total = res.total
         if (res.total !== 0 && res.list.length == 0 ) {
           this.currentPage = 1
           this.getAuditFlowListFun()
         }
        this.currentPage = res.pageNum
        this.pageSize = res.pageSize
      }) 
    },
    //审核模板 新增编辑
    setAuditTemplateFun(data){
       this.AuditTemplate = data
       this.AuditTemplateDialogVisible = true
      if (data === '新增审核流程模板') {
       this.ruleForm.AuditTemplatename = ''
       this.ruleForm.steplists = [{addstepidnex:1,audituser:'',userid:'',indexs:'一',step:"",user_id:''}]
       this.ruleForm.copysuername = []
      } else if(data === '编辑审核流程模板'){
      }
    },
    // 关闭弹层
    dialogClosed() {
      this.AuditTemplateDialogVisible = false
    },
    
    resetForm(formName) {
      this.AuditTemplateDialogVisible = false
    },
        // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      this.pageSize = newSize
      // if (this.isActive === 'engineering') {
      //   this.getUniProjectListFun()
      //   return
      // }
      // if (this.isActive === 'project') {
      //   this.getFilesProjectListFun()
      //   return
      // }
      // if (this.isActive === 'files') {
      //   this.getDocumentListFun()
      //   return
      // }
    },
    // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      // if (this.isActive === 'engineering') {
      //   this.getUniProjectListFun()
      //   return
      // }
      // if (this.isActive === 'project') {
      //   this.getFilesProjectListFun()
      //   return
      // }
      // if (this.isActive === 'files') {
      //   this.getDocumentListFun()
      //   return
      // }
    },
  }
}
</script>

<style>

</style>