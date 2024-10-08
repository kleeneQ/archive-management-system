<template>
  <div id="global-uploader" :class="panelShow?'parameter':'parameterShwo' " v-dialogDrag >
  <div class="file-panel "   :class="{'collapse': collapse}" style="background-color: #fff;">
          <div class="file-title title">
            
            <div><h2>文件上传</h2> </div>
            <div class="operate " >
              <el-button @click="close" type="text" title="关闭" style="background-color: transparent;color:#000;" >
                <i  class="el-icon-close" style="font-size: 28px;"></i>
              </el-button>
            </div>
          </div>
     <div class="pstestBox">
       <!-- 注：如文件列表出现红色表示上传出错，请清空文件队列重新上传 -->
       <el-button  type="success" size="small" @click="ClearqueueFun">清空上传列表</el-button>
     </div>

    <el-upload
    action="false"
    class="upload-file"
    :class="isAddImg ? 'disabled' : ''"
    accept="image/png,image/gif,image/jpg,image/jpeg,.pdf, .doc, .docx, .xls, .xlsx"
    :limit="limit"
    :with-credentials="true"
    :multiple="true"
    list-type="picture"
    :before-upload="beforeUpload"
    :file-list="fileList"
    :show-file-list='false'
    :http-request="httpRequest"
    :on-change="handFileChange"
    >
     <el-button id="global-uploader-btn" type="success" size="small" ref="uploadBtn">上传附件</el-button>
    </el-upload>
  <div>
    <ul class="file-list">
      <li v-for="file in fileList" :key="file.id" class="el-upload-list__item is-success">
        <a :class="'el-upload-list__item-name'+' '+'file_' + file.id" ref="files" >{{file.name}} </a>
        <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
      </li>
    </ul>
  </div>
 </div>

   </div>
</template>
<script>
  import Bus from '@/assets/js/bus';
  import {
    uploadFile,
    checkUploadFile,
    mergeUploadFile,
    unzipFile,
    bindFile,
    convertPdfFile,
    bindFileDigitSingleUpload,
    zipFileDigitSingleUpload,
    digitSingleUpload,
  } from '@/api/digitization/uploadFile'
export default {
  props: {
    limit: {
      type: Number,
      default: 500,
    },
    imgUrl: {
      type: String,
      required:true,
    },
    lableName: {
      type: String,
      default: '',
    },
    uploadType:{
      type: String,
       default: '上传图片',
    },
    marginLeft:{
      type: String,
       default: '0px',
    }
  },
  data() {
    return {
      fileArr:[],
      fileList: [],
      isRemove: false, // 用于编辑时是否上传了图标
      dialogVisible1: false,
      dialogImageUrl: "",
      count_filesLength:0,
      
      panelShow: false,   //选择文件后，展示上传panel
      collapse: false, //展开收起上传列表框
      id:0,//文件下标
      uploadNum:0,
      order:0,
    };
  },
    mounted() {
      Bus.$on('openUploadimg', query => { 
        this.panelShow = true
        this.file_id = query.file_id
        if (this.$refs.uploadBtn) {
          this.$refs.uploadBtn.$el.click();
        }
      });

    },

  computed:{
    isAddImg(){
      if(this.limit == this.fileArr.length){
          return true
      }else{
          return false
      }
    },
  },
  watch:{
    imgUrl:{
      immediate: true,
      deep: true,
      handler(val,oldVal){
        if(val!=''){
          this.dialogImageUrl = val;
          this.fileList = [{ url: val }];
          this.fileArr = [{ url: val }];
        }else{
          this.dialogImageUrl = '';
          this.fileList = [];
        }
      },
    },
  },

  methods: {
      //获取每次文件上传的个数
      handFileChange(files, fileList) {
      var upload_img = document.getElementsByClassName('upload-file')
      if (upload_img && upload_img.length > 0) {
        var upload = upload_img[0].getElementsByTagName('input')
        if (upload && upload.length > 0 && upload[0].files && upload[0].files.length > 0) {
          this.uploadNum = upload[0].files.length
        }
      }
    },

    // 清空文件上传队列
      ClearqueueFun(){
        this.fileList = []
      },
      //合并
      bindFileDigitSingleUploadFun(file){

           this.fileList.forEach(item =>{
          if (file.file_id == item.file_id) {
            this.$nextTick(() => {
              $(`.myStatus_${item.id}`).text('合并中')
            })  
          }
        })

        const q = {
          file_id:file.file_id,
        }
        bindFileDigitSingleUpload(q).then(response =>{
         if (response.status === 200) {
          const { data: res, message, status } = response.data
            this.fileList.map((item,index) =>{
          if (file.file_id == item.file_id) {
            this.fileList.splice(index,file.uploadNum)
          }
        })
        console.log(this.fileList)
            this.fileArr = []
          if (status !== 200) return console.log(message)
          //上传——合并——解压绑定完成——关闭组件
          Bus.$emit('fileSuccess',message)
          }
        })
      },
      // 压缩
      zipFileDigitSingleUploadFun(file){
        this.fileList.forEach(item =>{
          if (file.file_id == item.file_id) {
            this.$nextTick(() => {
              $(`.myStatus_${item.id}`).text('压缩中')
            })  
          }
        })
        const q ={
          file_id:file.file_id
        }
        zipFileDigitSingleUpload(q).then(response =>{
         if (response.status === 200) {
        this.count_filesLength = 0
          const { data: res, message, status } = response.data
        this.fileList.forEach(item =>{
          if (file.file_id == item.file_id) {
            this.$nextTick(() => {
              $(`.myStatus_${item.id}`).text(message)
            })  
          }
        })
          if (status == 200) {
              setTimeout(() => {
              this.bindFileDigitSingleUploadFun(file)
              }, 1000);
            }else {
              console.log(message)
            }
          }
        })
      },

    //限制图片格式及大小  每个文件上添加总上传数量
    beforeUpload(file) {
      file.file_id = this.file_id
      this.id = this.id+1
      file.id = this.id
      file.uploadNum = this.uploadNum
      this.order = this.order + 1
      file.order = this.order

      this.fileList.unshift(file)
      
 this.$nextTick(() => {
        $(`<p class="myStatus_${this.id}"></p>`).appendTo(`.file_${file.id}`).css({
              'position': 'absolute',
              'top': '0',
              'right': '35px',
              'bottom': '0',
              'zIndex': '1',
              'margin': '0',
              'padding': '0',
              'color': '#409EFF'
            }).text('上传中');
      })
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "application/pdf"||
        file.type === "application/doc"||
        file.type === "application/docx"||
        file.type === "application/xls"||
        file.type === "application/xlsx";
      const isLt2M = file.size / 1024 / 1024 < 50000;
      if (!isJPG) {
        console.log("上传图片只能是 png、gif、jpeg、jpg 格式!");
      } else if (!isLt2M) {
        console.log("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //上传后获取文件流  
    async httpRequest(file) {
      this.fileArr.push(file.file)

      this.$emit("upload", { fileArr:this.fileArr , type:'add',lableName:this.lableName });

      if (file.file.order == file.file.uploadNum) { //在全部上传完成后 调取压缩接口
          this.fileArr = []
          this.order = 0
      }

      //调用后台上传文件接口  并传入文件ID 
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('file_id', file.file.file_id)
     await digitSingleUpload(formData).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return console.log(message)
          if (file.file.order == file.file.uploadNum) { //在全部上传完成后 调取压缩接口

        this.fileList.forEach(item =>{
          if (file.file.file_id == item.file_id) {
            this.$nextTick(() => {
              $(`.myStatus_${item.id}`).text(message)
            })  
          }
        })
        this.$nextTick(() => {
              setTimeout(() => {
                this.zipFileDigitSingleUploadFun(file.file)
              }, 5000);
            }) 

             
          } 
         
        }
      })
    },

    //删除
    onRemove(file, fileList) {
      let arr = []
      fileList.forEach((item)=>{
        if(item.raw){
          arr.push(item.raw)
        }else{
          arr.push(item)
        }
      });
      this.fileArr = arr;
      this.$emit("upload", { fileArr:this.fileArr , type:'del',lableName:this.lableName });
    },



      fileListShow() {
        let $list = $('#global-uploader .el-upload-list');

        if ($list.is(':visible')) {
          $list.slideUp();
          this.collapse = true;
        } else {
          $list.slideDown();
          this.collapse = false;
        }
      },
      close() {
        this.fileList = []
        this.panelShow = false;
      },

  },
  destroyed() {
      Bus.$off('openUploadimg');
    },
};
</script>
<style lang="less" scoped>
#global-uploader{
  .uploadIco {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    line-height: 17px !important;
  }
}
::v-deep .disabled .el-upload{
  display: none;
}

  /* 隐藏上传按钮 */
  #global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
</style>
<style lang="less">
.UploadImgbox {
  overflow: auto;
  .el-upload-list {
    background: #fff;
    height: 230px;
    padding-bottom: 20px;
    box-sizing: border-box;
    overflow: auto;
  }
  .el-icon-close-tip {
    display: inline-block;
    padding-right: 40px;
  }
  .el-upload-list__item-name {
    margin-top: 0 !important;
    .el-upload-list--picture .el-upload-list__item-name i {
      font-size: 16px;
      top: 0;
    }
  }
  .el-upload-list--picture .el-upload-list__item {
    
  }
  .is-ready {
      background-color: #f99292 !important;
  }
  .is-success {
    background-color: #deecf3 !important;
  }
  .el-upload-list__item-name {
    margin-top: 5px;
    height: 28px !important;
    line-height: 28px !important;
  }
  .el-upload-list__item{
    height: 30px !important;
    line-height: 30px !important;
    margin-top: 5px !important;
    padding: 0 30px !important;
    
    .el-upload-list--picture .el-upload-list__item-thumbnail {
      width: 20px;
      height: 20px;
      
    }
    
  }
}

</style>


<style scoped lang="less">
  #global-uploader {
    position: fixed;
    z-index: 20;
    right: 15px;
    bottom: 33px;
    font-size: 14px;
     min-width: 680px;
    z-index: 9999;
    background-color: #fff;
    .upload-file {
      background-color: #fff;
    }   

    .uploader-app {
      min-width: 680px;
      height: 100%;
      .uploader-list {
        height: 100%;
      }
    }
    .pstestBox {
      color: red;
      text-align: right;
      background-color: #fff;
    }
    .file-panel {
      background-color: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 7px 7px 0 0;
      // box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      height: 100%;
      .file-title {
        display: flex;
        height: 46px;
        line-height: 10px;
        padding: 0 15px;
        border-bottom: 1px solid #ddd;

        .operate {
          flex: 1;
          text-align: right;
        }
      }

      .file-list {
        position: relative;
        height: 240px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;
        list-style-type: none;
        margin: 0;
        padding: 10px 0;

        > li {
          background-color: #fff;
          position: relative;
        }
      }

      &.collapse {
        .file-title {
          background-color: #E7ECF2;
        }
      }
    }

    .no-file {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }

    .uploader-file {
      height: 40px;
      line-height: 40px;
    }
   /deep/ .uploader-file-icon {
      margin-top: 7px !important;
    }
    // /deep/ .uploader-file-icon {
    //   &:before {
    //     content: '' !important;
    //   }

    //   &[icon=image] {
    //     background: url(../../assets/images/image-icon.png);
    //   }

    //   &[icon=video] {
    //     background: url(../../assets/images/video-icon.png);
    //   }

    //   &[icon=document] {
    //     background: url(../../assets/images/text-icon.png);
    //   }
    // }

    .uploader-file-status {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }

    /deep/ .uploader-file-actions {
      display: none;
      margin-top: 12px;
      margin-right: 6px;
    }
  }

  /* 隐藏上传按钮 */
  #global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  .files_name_style {
    font-size: 12px;
    width: 35%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 15px;
  }
  .remove_file_style {
   position: absolute;
   right: 10px;
   top: 50%;
   z-index: 20000;
  }
</style>


<style scoped lang="less">
.parameterShwo {
  display: none ;
}
.parameter {
  height: 300px;
  width: 580px;
  position: absolute;
  // left: 50%;
  // top: 50%;
  right: 0;
  bottom: 30px;
  margin-left: calc(-960px / 2);
  margin-top: calc(-569px / 2);
  z-index: 9999;
  background: transparent;
  box-sizing: border-box;
  box-shadow: 0px 12px 32px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  .rightBlank {
    position: absolute;
    top: 48px;
    right: -5px;
    width: 5px;
    height: calc(100% - 53px);
  }
  .bottomBlank {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 5px;
  }
  .title {
    // display: flex;
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    background: #f5f5f5;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.12);
    border-radius: 2px 2px 0px 0px;
    padding: 0 20px;
    z-index: 99;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .close {
      img {
        width: 10px;
      }
      margin-left: auto; // 右对齐
    }
  }
  .content {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    height: calc(100% - 48px);
    box-sizing: border-box;
    background: #666;
    overflow-y: auto;
  }
}
</style>
