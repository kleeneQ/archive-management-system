<template>
  <div id="global-uploader" :class="panelShow?'parameter':'parameterShwo' " v-dialogDrag >

    <!-- 上传 -->
    <uploader
      ref="uploaderform"
      :options="options"
      :autoStart="true"
      :fileStatusText="fileStatusText"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app">
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn" :directory="true" ref="uploadBtn">选择文件夹</uploader-btn>

      <uploader-list v-show="panelShow">
        <div class="file-panel "   :class="{'collapse': collapse}">
          <div class="file-title title">
            
            <div><h2>批量导入案卷ZIP包</h2> </div>
            <!-- <div><el-button type="primary" @click="allSubmitFun(addCabinetinputlist)">全部上传</el-button></div> -->
            <div class="operate " >
              <!-- <el-button @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' " 
              style="background-color: transparent;color:#000;"
              >
                <i style="font-size: 28px;" :class="collapse ? 'el-icon-arrow-up': 'el-icon-arrow-down'"></i>
              </el-button> -->
              <el-button @click="close" type="text" title="关闭" style="background-color: transparent;color:#000;" >
                <i  class="el-icon-close" style="font-size: 28px;"></i>
              </el-button>
            </div>
          </div>

          <ul class="content file-list">
            <li v-for="file in ZIPfileListData" :key="file.id" class="li">
              <div class="files_name_style">案卷：{{file.files_name}}</div>
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
              <i class="remove_file_style el-icon-close" @click="liclickFun(file.id)"></i>
            </li>
            <div class="no-file" v-if="!ZIPfileListData.length"><i  class="el-icon-s-release"></i> 暂无待上传文件</div>
          </ul>
        </div>
      </uploader-list>

    </uploader>

  </div>
</template>

<script>
  /**
   *   全局上传插件
   *   调用方法：Bus.$emit('openUploader', {}) 打开文件选择框，参数为需要传递的额外参数
   *   监听函数：Bus.$on('fileAdded', fn); 文件选择后的回调 
   *            Bus.$on('fileSuccess', fn); 文件上传成功的回调
   */
  import {
    uploadFile,
    checkUploadFile,
    mergeUploadFile,
    unzipFile,
    bindFile,
    convertPdfFile
  } from '@/api/digitization/uploadFile'
  import {
    getDocumentList,
    addDocument,
    editDocument,
    removeDocument,
    getFileUrl,
    getDocumentLists,
  } from "@/api/digitization/documentApi"

  import request from '@/utils/request'
  import Bus from '@/assets/js/bus';
  import SparkMD5 from 'spark-md5';

  import { getToken } from '@/utils/auth'
  import { getRandom } from '@/utils/index'
  import md5 from 'js-md5'
  const TAG = 'TQKJ';


  export default {
    
    data() {
    const that = this
      return {
        file_id:"",
        files_id:"",
        files_name:'',
        ZIPfileListData:[], //导入的文件夹下全部文件
        options: {
          target: '/file-api/v1/file/digit/upload', //分片上传地址
          chunkSize: '5120000',//分片时按照该值来分 5M
          fileParameterName: 'file',//上传文件时文件的参数名
          maxChunkRetries: 3,//重试次数
          simultaneousUploads:10,
          forceChunkSize:true, //是否强制所有的块都是小于等于 chunkSize 的值。默认是 false
          testChunks: false,   //是否开启服务器分片校验
          // 服务器分片校验函数，秒传及断点续传基础
          // checkChunkUploadedByResponse: function (chunk, message,params) { //默认先进行一次get 请求
          //   const q ={
          //     chunk:chunk.offset+1,
          //     file_id:that.file_id,
          //   }
          //   checkUploadFile(q).then(response =>{ //后端接口请求 分片是否需要已经上传
          //    if (response.status === 200) {
          //     const { data: res, message, status } = response.data
          //     if (status !== 200) return false
          //      return res.check_result
          //     }
          //   })
   
          // },
          //请求头
          headers: { 
            //  contentType:false
            //Authorization: Ticket.get() && "Bearer " + Ticket.get().access_token
            
            authorization: getToken(),
            random: getRandom(),
            expiration_time: new Date().getTime(),
            check_code: md5(TAG + getToken() + new Date().getTime() + '/file-api/v1/file/digit/check' + getRandom())
          },
          // 其他额外的参数，这个可以是一个对象或者是一个函数，如果是函数的话，则会传入 Uploader.File 实例
          query:(file, chunk) => {
            return {
                ...file.params,
              }
            },
          processParams(params,File,Chunk) {//每一次分片传给后台的参数，params是该方法返回的形参，包含分片信息
          that.file_id = File.file_id
            return {//返回一个对象，会添加到每一个分片的请求参数里面
              chunk: params.chunkNumber - 1,
              file_id: File.file_id,
            };
          }
        },
        attrs: {
          // accept: ACCEPT_CONFIG.getAll()
        },
        panelShow: false,   //选择文件后，展示上传panel
        collapse: false, //展开收起上传列表框
        chunknum:'',//切片下标uploadSuffixUrl
        uploadSuffixUrl:'',//文件上传路径
        fileStatusText: { // 上传列表状态提示
          success: '成功',
          error: '失败',
          uploading: '上传中',
          paused: '上传中',
          waiting: '排队中'
        },
      }
    },
    created(){
    },
    mounted() {
      Bus.$on('openUploaderFiles', query => { 
        this.files_id = query.files_id
        this.files_name = query.files_name
        this.getDocumentListsFun(query.files_id)
        this.params = query || {};
        if (this.$refs.uploadBtn) {
          this.$refs.uploadBtn.$el.click();
        }
      });

    },
    computed: {
      //Uploader实例
      uploader() {
        return this.$refs.uploaderform.uploader;
      }
    },
    methods: {
      liclickFun(id){
        this.ZIPfileListData.map((item,index) =>{
          if (item.id == id) {
            this.ZIPfileListData.splice(index,1)
          }
        })
      },
             // 导入案卷ZIP包——获取案卷下的文件
        getDocumentListsFun(files_id){
          const that = this
          const q = {
            files_id:files_id
          }
        getDocumentLists(q).then(response => {
          if (response.status === 200 ) {
              if (response.data.data.length === 0) return this.message({ message: "该案卷下暂无文件,会导致导入ZIP包失败", type: 'error' })
                that.filesList = response.data.data
                this.filesList.forEach((item,index) =>{
                  item.wjtm = (index+1)+'.'+item.wjtm
                })
                // that.filesList.reverse()
              }
            })
          },




      //合并
      mergeUploadFileFun(file){
        $(`.myStatus_${file.id}`).text('合并中...')
        const q = {
          file_id:file.file_id,
          chunk_total:file.chunk,
          file_ext:'zip',
        }
        mergeUploadFile(q).then(response =>{
         if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return $(`.myStatus_${file.id}`).text('文件不匹配，无法上传')
         $(`.myStatus_${file.id}`).text(message)
           this.unzipFileFun(file)
          }
        })
      },
      // 解压
      unzipFileFun(file){
         $(`.myStatus_${file.id}`).text('解压绑定中...')
        const q ={
          file_id:file.file_id
        }
        unzipFile(q).then(response =>{
         if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return $(`.myStatus_${file.id}`).text(message)
          $(`.myStatus_${file.id}`).text(message)
          //上传——合并——解压绑定完成——关闭组件
          this.ZIPfileListData.forEach((item,index) =>{
            if (item.file_id == file.file_id) {
              this.ZIPfileListData.splice(index, 1);//存在即删除
            }
          })
          Bus.$emit('filesSuccess',message)
          // this.close()
          //  console.log(message)
          }
        })
      },

      //获取文件上传路径
        setUrl() {
            this.uploadSuffixUrl = request.service1.defaults.baseURL
            return request.service1.defaults.baseURL
        },

      //添加文件
      onFileAdded(file,event) {
        console.log(file.name)
        let str = file.name 
        let indexss = str.lastIndexOf(".zip")
        var resolvess = str.substring(0, indexss);
        console.log(indexss,'序号')
        console.log(resolvess,'附件名称')
        console.log(this.filesList,'全部文件信息')
        this.filesList.forEach((item,i) =>{
            if (resolvess == item.wjtm) {
              file.file_id = item.file_id
            } 
        })
        file.files_name = this.files_name //添加案卷名称
        this.ZIPfileListData.unshift(file)
        this.panelShow = true;  //显示上传弹窗
        file.params = this.params
        this.computeMD5(file);
        Bus.$emit('filesAdded',file);
        return
      },
      onFileProgress(rootFile, file, chunk) {
        this.file_id = file.file_id
        // console.log(chunk.offset, `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`, chunk)
      },
      
      onFileSuccess(rootFile, file, response, chunk) {
        let res = JSON.parse(response);
        // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
        if (res.flag) {
          // this.$message({message: res.message, type: 'error'});
          // 文件状态设为“失败”
          this.statusSet(file.id, 'failed');
          return;
        }
        if (res.data && res.data.skipUpload) {
          this.statusSet(file.id, 'transmission');
          return;
        }
        if (res.status == 200) {
          this.statusSet(file.id, 'merging');
          //上传完成，合并切片
          this.mergeUploadFileFun(file) 
          
          // this.close()
        }
      },
      onfileRemoved(file) {
          const that = this
        that.$refs.uploader.uploader.removeFile(file)
        

      },
      onFileError(rootFile, file, response, chunk) {
        
        console.log(rootFile)
        console.log(chunk)
        
        // this.$message({
        //   message: response,
        //   type: 'error'
        // })
      },

      /**
       * 计算md5，实现断点续传及秒传
       * @param file
       */
      computeMD5(file) {
        let that = this
        let fileRaw = file.raw
        let time = new Date().getTime();
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let currentChunk = 0;
        const chunkSize = 5 * 1024 * 1000;
        let chunks = Math.ceil(file.size / chunkSize);
        let spark = new SparkMD5.ArrayBuffer();

        // 文件状态设为"计算MD5"
        this.statusSet(file.id, 'md5');
        file.pause();
        let fileReader = new FileReader();
        loadNext();
        fileReader.onload = (e => {
          spark.append(e.target.result);
          file.chunk = chunks
          // up.setOption("multipart_params", {"chunk":currentChunk});
          currentChunk++;
          if (currentChunk < chunks) {

            loadNext();

            // 实时展示MD5的计算进度
            this.$nextTick(() => {
              $(`.myStatus_${file.id}`).text('校验文件 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%')

            })

          } else {
            let md5 = spark.end();
            if (file.file_id == '' || file.file_id == undefined) {
              $(`.myStatus_${file.id}`).text('文件不匹配，无法上传')
              file.bootstrap()  // 重新初始化 Uploader.File 对象的状态
            } else {
              this.computeMD5Success(md5, file);
            }
            
            console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms \nID：${file.file_id}`);
          }
          return currentChunk
        });

        fileReader.onerror = function () {
          this.error(`文件${file.name}读取出错，请检查该文件`)
          file.cancel();
        };

        function loadNext() {
          let start = currentChunk * chunkSize;
          let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

          fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
        }

      },

      computeMD5Success(md5, file) {
        this.params.file_id = file.file_id  
        // 将自定义参数直接加载uploader实例的opts上
        Object.assign(this.uploader.opts, {
          query: {
            ...this.params,
          }
        })


        file.uniqueIdentifier = md5;
        file.resume();
        this.statusRemove(file.id);
      },

      fileListShow() {
        let $list = $('#global-uploader .file-list');

        if ($list.is(':visible')) {
          $list.slideUp();
          this.collapse = true;
        } else {
          $list.slideDown();
          this.collapse = false;
        }
      },
      close() {
        this.uploader.cancel();

        this.panelShow = false;
      },

      /**
       * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
       * @param id
       * @param status
       */
      statusSet(id, status) {
        let statusMap = {
          md5: {
            text: '校验MD5',
            bgc: '#fff'
          },
          merging: {
            text: '合并中',
            bgc: '#e2eeff'
          },
          transcoding: {
            text: '转码中',
            bgc: '#e2eeff'
          },
          failed: {
            text: '上传失败',
            bgc: '#e2eeff'
          },
          transmission: {
            text: '秒传',
            bgc: '#e2eeff'
          },
          success: {
            text: '上传完成',
            bgc: '#e2eeff'
          }
        }

        this.$nextTick(() => {
          $(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'zIndex': '1',
            'margin': '0',
            'padding': '0',
            'backgroundColor': statusMap[status].bgc
          }).text(statusMap[status].text);
        })
      },
      statusRemove(id) {
        this.$nextTick(() => {
          $(`.myStatus_${id}`).remove();
        })
      },

      error(msg) {
        this.$notify({
          title: '错误',
          message: msg,
          type: 'error',
          duration: 2000
        })
      }
    },
    watch: {},
    destroyed() {
      Bus.$off('openUploaderFiles');
    },
    components: {}
  }
</script>

<style scoped lang="less">
  #global-uploader {
    position: fixed;
    z-index: 20;
    right: 15px;
    bottom: 33px;
    font-size: 14px;
     min-width: 680px;
    z-index: 9999;
    .uploader-app {
      min-width: 680px;
      height: 100%;
      .uploader-list {
        height: 100%;
      }
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
        height: 100%;
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