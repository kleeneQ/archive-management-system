<template>
  <div>
      <div class="AuditPS">注：提交前请先进行自检，确保案卷数据的准确性、完整性</div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="审核描述：">
          <el-input type="textarea" :rows="5" v-model="form.desc" placeholder="案卷著录提交审核"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="auditchildFn">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交审核</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {
  getFilesList,
  getFilesProjectList,
  addFiles,
  editFiles,
  removeFiles,
  descriptionSubmitAudit, // 工程类案卷提交审核
} from "@/api/digitization/fileDescription"
import {
  setManageAudit, // 管理类案卷提交审核
  getManageAuditDetail, // 管理类案卷审核详情
} from "@/api/digitization/manageFileAPI"
export default {
  name:'audit',
  props:{
    filesType:{
      type: String,
      default: ''
    },
    files:{
      type: String,
      default: ''
    },
     auditformdesc:{
      type: String,
      default: ''
    },
  },
  data(){
    return{
       form: {
          desc: this.auditformdesc
        }
    }
  },
  created(){
    this.clearform()//进入组件时清空审核描述
  },
   methods: {
     clearform(){
       this.form.desc = ''
     },
      onSubmit() {
        if (this.form.desc === '') {
          this.form.desc = '案卷著录提交审核'
        }
        const q = {
          files_id:this.files,
          check_describe:this.form.desc
        }
        if (this.filesType === "files_type1") {
          descriptionSubmitAudit(q).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.$emit('auditchildFn', false);
            if(response.data.message.length >= 15){
              if (response.status === 200) return this.message({ message: response.data.message, type: 'success' })
            }else {
              if (response.status === 200) return this.message({ message: response.data.message, type: 'success' })
            }
          }
        })
        } else {
          setManageAudit(q).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
              this.$emit('auditchildFn', false);
            if(response.data.message.length >= 15){
              if (response.status === 200) return this.message({ message: response.data.message, type: 'success' })
            }else {
              if (response.status === 200) return this.message({ message: response.data.message, type: 'success' })
            }
            
          }
        })
        }
  
      },
       // 取消
      auditchildFn() {
        this.$emit('auditchildFn', false);
        this.clearform()
      },
    }
}
</script>

<style>

</style>