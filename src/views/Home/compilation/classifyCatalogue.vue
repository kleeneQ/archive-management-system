<template>
  <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>编研管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类目录</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card>
         <div class="eltablebox">
               <el-col>
                 <!-- 新增编研管理 - 分类目录按钮 B -->
                <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="showDialogaddcompilationFun('新增')">新增</el-button>
                  </el-form-item>
                </el-form>  
              </el-col> 
               <!-- 新增编研管理 - 分类目录按钮 E -->

               <!-- 编研管理 - 分类目录列表 B -->
              <el-table
              :data="compilationList"
              border
              style="width: 100%"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                fixed
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="compilation_title"
                label="标题"
                min-width="400">
              </el-table-column>
              <el-table-column
                prop="compilation_abstract"
                label="摘要"
                min-width="400">
              </el-table-column>
              <!-- <el-table-column
                prop="compilation_info"
                label="内容"
                min-width="400">
              </el-table-column> -->
              <el-table-column
                prop="publish_man"
                label="发布者"
                width="200">
              </el-table-column>
              <el-table-column
                prop="publish_time"
                label="发布时间"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="300"
                >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" class="btnedit"  @click="showDialogaddcompilationFun('编辑', scope.row)">编辑</el-button>
                  <el-button type="primary" size="small"   @click="gotoRegulationPreviewFun('预览', scope.row)">预 览</el-button>
                  <el-button type="danger" size="small" @click="removecompilationFun(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
               <!-- 编研管理 - 分类目录列表 E -->
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
         </div>
     </el-card>
    <!-- 新增编研管理 - 分类目录 弹层 B -->
    <el-dialog :title="dialogcompilationFormVisibletitle+'分类目录'" :visible.sync="dialogcompilationFormVisible" width="70%" @close='savecompilationFormFuntwoX'>
    <el-form class="Medicate" :inline="true" :model="compilationForm" ref="compilationForm" :rules="compilationFormrules" label-width="150px">
      <el-form-item label="分类目录名称: " prop="compilation_title" class="Medicate-title">
        <el-input clearable v-model="compilationForm.compilation_title" placeholder="请输入分类目录名称"></el-input>
      </el-form-item>
       <el-form-item label="摘要: " prop="compilation_abstract" class="Medicate-title">
        <el-input clearable v-model="compilationForm.compilation_abstract" placeholder="请输入摘要"></el-input>
      </el-form-item>
       <el-form-item label="内容" class="Medicate-title">
              <!-- 富文本编辑器组件 -->
              <quill-editor
                class="editor"
                :options="editorOption"
                v-model="compilationForm.compilation_info"
                @ready="onEditorReady($event)"
              > </quill-editor>
       </el-form-item>
      <el-form-item label="附件信息: " class="Medicate-title">
        <el-upload
            v-if="dialogcompilationFormVisibletitle == '新增'"
            class="upload-demo"
            ref="upload"
            action="#"
            accept=".doc,.docx,.pdf,.xls,.xlsx,.zip"
            :limit="1"
            :show-file-list="true"
            :http-request="myUpload"
          >
          <el-button type="success" slot="trigger" icon="el-icon-folder" size="small">上传附件</el-button>
          </el-upload>
          <el-upload
            v-if="dialogcompilationFormVisibletitle == '编辑'"
            class="upload-demo"
            ref="upload"
            action="#"
            accept=".doc,.docx,.pdf,.xls,.xlsx,.zip"
            :limit="1"
            :show-file-list="true"
            :http-request="myUpload2"
          >
          <el-button type="success" slot="trigger" icon="el-icon-folder" size="small">上传附件</el-button>
          </el-upload>
      </el-form-item>
      <el-form-item class="btnstyle">
        <el-button v-if="fileflag" @click="savecompilationFormFuntwoX()">取消</el-button>
        <el-button v-if="!fileflag" @click="dialogcompilationFormVisible = false">取消</el-button>
        <el-button type="primary" v-if="dialogcompilationFormVisibletitle == '新增' && fileflag" @click="savecompilationFormFuntwo">保存</el-button>
        <el-button type="primary" v-if="dialogcompilationFormVisibletitle == '新增'&& !fileflag" @click="savecompilationFormFun('compilationForm')">保存</el-button>
        <el-button type="primary" v-if="dialogcompilationFormVisibletitle == '编辑'" @click="UpdatecompilationFormFun('compilationForm')">保存</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 新增编研管理 - 分类目录 弹层 E -->
  </div>
</template>

<script>
import {
  getCompilationclassifyCatalogueList,
  getCompilationclassifyCatalogueSave,
  getCompilationclassifyCatalogueListInfo,
  getCompilationclassifyCatalogueDelete,
  getCompilationclassifyCatalogueUpdate,
  uploadFileSimpleCompilation,
} from '@/api/compilation'

import EditorBar from "@/components/StoreHouse/EditorBar";
var fonts = ['Microsoft-YaHei','SimSun', 'SimHei','KaiTi','Arial','Times-New-Roman'];

export default {
  components: { EditorBar },
  data () {
    return {
      isClear:false,
      detail:'',
      total: 0, //总条数
      currentPage: 1, // 当前页数
      pageSize: 10,  // 每页显示的条数
      queryInfo: { //获取编研管理 - 分类目录列表参数
        page_num:1,
        page_size:10,
        tree_id:'0',
      },
      compilationList:[],//编研管理 - 分类目录列表数据
      dialogcompilationFormVisible:false,//新增编辑编研管理 - 分类目录  弹层
      compilationForm:{ //新增编辑编研管理 - 分类目录 表单
        compilation_title:'',
        compilation_abstract:'',
        compilation_info:'',
        compilation_type:'2',
        compilation_url:'',
        compilation_id:''
      },
      dialogcompilationFormVisibletitle:'', //编辑 新增 编研管理 - 分类目录 标题
      compilationFormrules:{ //编辑 新增 编研管理 - 分类目录  校验规则
        compilation_title: [
            { required: true, message: '请输入分类目录名称', trigger: 'blur' },
          ],
        compilation_abstract: [
            { required: true, message: '请输入摘要', trigger: 'blur' },
          ],
      },
      info: '',
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: []}], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            // ["link", "image", "video"] // 链接、图片、视频
          ], //工具菜单栏配置
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        },
        placeholder: '请在这里添加内容', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
      },
      compilation_id:'',//
      fileflag:false,//是否需要保存 分类目录信息
    }
  },
  mounted () {
    // this.getInfoFun() //获取用户信息
    this.getCompilationclassifyCatalogueListFun() //获取编研管理 - 分类目录列表
  },
  methods: {
    // getCompilationclassifyCatalogueListInfoFun(compilation_id){
    //   const q ={
    //     compilation_id:compilation_id
    //   }
    //   getCompilationclassifyCatalogueListInfo().then(response =>{
    //    if (response.status === 200) {
    //     const { data: res, message, status } = response.data
    //     if (status !== 200) return this.message({ message: message, type: 'error' })
    //      
    //     }
    //   })
    // },
    //分类目录预览 跳转
    gotoRegulationPreviewFun(name,row){
      this.$router.push({  
            path: '/compilation/compilationpreview',  
            query: {
              mallCode: row
            }, 
        })  
    },
    //富文本 
    onEditorReady(quill) {
      document.querySelector("div.ql-editor").innerHTML = this.info
    },
    //编辑 编研管理 - 分类目录 保存
    UpdatecompilationFormFun(formName){
       
          getCompilationclassifyCatalogueUpdate(this.compilationForm).then(response =>{
            
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
            this.message({ message: message, type: 'success' })
            this.getCompilationclassifyCatalogueListFun()
            this.dialogcompilationFormVisible = false
              this.$refs.upload.clearFiles();
            }
          })
    },
    //如果 取消 则 删除 新添加的最新的分类目录  ID 
    savecompilationFormFuntwoX(){
      
      const q = {
        compilation_id:this.compilationForm.compilation_id
      }
      if( this.fileflag == false) return 
        getCompilationclassifyCatalogueDelete(q).then(response => {
              if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
               this.getCompilationclassifyCatalogueListFun()
               this.dialogcompilationFormVisible = false
              this.$refs.upload.clearFiles(); 
              }
            })
    },
    //保存附件到 对应的分类目录条上   如果保存新的数据的话，就将  数据更新到 最新的分类目录ID 上
    savecompilationFormFuntwo(){
      
      getCompilationclassifyCatalogueUpdate(this.compilationForm).then(response =>{
          if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.getCompilationclassifyCatalogueListFun()
          this.fileflag = false
          this.dialogcompilationFormVisible = false
          this.$refs.upload.clearFiles();
          }
        })
    },
    //新增 编研管理 - 分类目录 保存
    savecompilationFormFun(formName){
          
          
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getCompilationclassifyCatalogueSave(this.compilationForm).then(response =>{
            
            if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
              this.message({ message: message, type: 'success' })
              this.getCompilationclassifyCatalogueListFun()
              this.dialogcompilationFormVisible = false
              this.$refs.upload.clearFiles();
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //新增编研管理 - 分类目录弹层 
    showDialogaddcompilationFun(name,row){
      
      this.dialogcompilationFormVisibletitle = name
      this.dialogcompilationFormVisible = true
      if (this.dialogcompilationFormVisibletitle === '编辑') {
        this.compilationForm.compilation_id = row.compilation_id
        const q = {
          compilation_id:row.compilation_id
        }
        getCompilationclassifyCatalogueListInfo(q).then(response =>{
          this.compilationForm.compilation_info = response.data.data
        })
        this.compilationForm.compilation_title = row.compilation_title
        this.compilationForm.compilation_abstract = row.compilation_abstract
      }else {
        this.compilationForm.compilation_id = ''
        this.compilationForm.compilation_title = ''
        this.compilationForm.compilation_info = ''
        this.compilationForm.compilation_url = ''
        this.compilationForm.compilation_abstract = ''
      }
    },
    // 编辑 上传附件
    myUpload2(e){
       const formData = new FormData()
      formData.append('file', e.file)
      formData.append('compilation_id', this.compilationForm.compilation_id)
      
      uploadFileSimpleCompilation(formData).then(response =>{
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: '上传成功', type: 'success' })
            this.compilationForm.compilation_url = res.file_url   //上传后 获取最新的 文件路径  
            // this.compilationForm.compilation_id = this.compilation_id
            
          }
      })
    },
    //上传附件自定义函数
    myUpload(e){

      
      this.compilationForm.compilation_id = ''
      getCompilationclassifyCatalogueSave(this.compilationForm).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.fileflag = true
      //  this.getCompilationclassifyCatalogueListFun() //保存新的 分类目录  并且刷新列表，获取刚保存的 最新的 分类目录 ID
       const qqq = {
          page_num:1,
          page_size:10,
          compilation_type:'2',
       }
       getCompilationclassifyCatalogueList(qqq).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        this.compilationList = res.list
        this.compilation_id = res.list[0].compilation_id
        
        this.total = res.total
        }
      })
        }
      })
       clearTimeout(this.timer);  //清除延迟执行 

      this.timer = setTimeout(()=>{   //设置延迟执行
          const formData = new FormData()
      formData.append('file', e.file)
      formData.append('compilation_id', this.compilation_id)
      
      uploadFileSimpleCompilation(formData).then(response =>{
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.message({ message: '上传成功', type: 'success' })
            this.compilationForm.compilation_url = res.file_url   //上传后 获取最新的 文件路径  
            this.compilationForm.compilation_id = this.compilation_id
            
          }
      })
      },1000);
      
    },
    //删除编研管理 - 分类目录 
    removecompilationFun(row){
      
      const q = {
        compilation_id:row.compilation_id
      }
     this.$confirm('确定将该条信息删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
              getCompilationclassifyCatalogueDelete(q).then(response => {
              if (response.status === 200) {
              const { data: res, message, status } = response.data
              if (status !== 200) return this.message({ message: message, type: 'error' })
              
               this.getCompilationclassifyCatalogueListFun()
              this.message({
                  type: 'success',
                  message: message
                });
              }
            })
        }).catch(() => {
          this.message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //获取编研管理 - 分类目录列表
    getCompilationclassifyCatalogueListFun(){
      const q = {
        page_num:this.currentPage,
        page_size:this.pageSize,
        compilation_type:'2',
      }
      getCompilationclassifyCatalogueList(q).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        if (res.list.length != 0) {
          this.compilationList = res.list
          this.compilation_id = res.list[0].compilation_id
          
          this.total = res.total
          if (res.total !== 0 && res.list.length == 0 ) {
            this.currentPage = 1
            this.getCompilationclassifyCatalogueListFun()
          } 
        }
       
        }
      })
    },
    //获取当前用户信息 以及后台用户信息列表
    getInfoFun(){ 
      getInfo().then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        }
      })
      getUsersList(this.queryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        
        }
      })
    },
    
    // 每页显示条数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getCompilationclassifyCatalogueListFun()
    },

    // 显示页数改变
    // 根据点击的是属于项目级/工程级/案卷级的不同，调用不同的接口
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getCompilationclassifyCatalogueListFun()
    }, 
  },
}
</script>

<style scoped lang='less'>
.btnstyle {
  width: 100%;
  text-align: center;
}
</style>
<style lang='less'>
  .editor {
    line-height: normal !important;
    height: 500px;
    .ql-container{
      height: 400px !important;
    }
  }
  
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:" !important;
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存' !important;
    padding-right: 0px;
  }
  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:" !important;
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px' !important;
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px' !important;
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px' !important;
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px' !important;
  }
 
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6' !important;
  }
 
  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体' !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体' !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体' !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
    content: '楷体' !important;
  }

  .ql-editor .ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}
.ql-editor .ql-font-SimSun {
  font-family: "SimSun";
}
.ql-editor .ql-font-SimHei {
  font-family: "SimHei";
}
.ql-editor .ql-font-KaiTi {
  font-family: "KaiTi";
}
.ql-editor .ql-font-Arial {
  font-family: "Arial";
}
.ql-editor .Times-New-Roman {
  font-family: "Times New Roman";
}
  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '微软雅黑';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
 content: "微软雅黑";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
  content: "宋体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
 content: "黑体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
 content: "楷体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
 content: "Arial";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
 content: "Times New Roman";
}
</style>