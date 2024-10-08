<template>
  <div id="global-uploader">

    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="true"
      @file-added="onFileAdded"
      @files-added="onFilesAdded"
      @file-success="onFileSuccess"
      @file-error="onFileError"
      class="uploader-app">
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn" :attrs="attrs"  ref="uploadBtn">选择文件</uploader-btn>
      <uploader-btn id="global-uploader-btn" :directory="true" ref="uploadFolderBtn">选择文件夹</uploader-btn>

      <uploader-list v-show="panelShow">
        <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
          <div class="file-title">
            
            <div><h2>上传列表</h2></div>
            <div class="operate">
              <el-button @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' " 
              style="background-color: transparent;color:#000;"
              >
                <i style="font-size: 28px;" :class="collapse ? 'el-icon-arrow-up': 'el-icon-arrow-down'"></i>
              </el-button>
              <el-button @click="close" type="text" title="关闭" style="background-color: transparent;color:#000;" >
                <i  class="el-icon-close" style="font-size: 28px;"></i>
              </el-button>
            </div>
          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
            </li>
            <div class="no-file" v-if="!props.fileList.length"><i  class="el-icon-s-release"></i> 暂无待上传文件</div>
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
    convertPdfFile,
    bindFileDigitSingleUpload,
    zipFileDigitSingleUpload,
  } from '@/api/digitization/uploadFile'

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
        is_bind:'0',
        count_one:0,
        count_two:0,
        count_filesLength:0,
        options: {
          target: '/file-api/v1/file/digit/single/upload', //分片上传地址
          chunkSize: '5120000000',//分片时按照该值来分 500M
          fileParameterName: 'file',//上传文件时文件的参数名
          maxChunkRetries: 3,//重试次数
          forceChunkSize:false, //是否强制所有的块都是小于等于 chunkSize 的值。默认是 false
          testChunks: false,   //是否开启服务器分片校验
          //请求头
          headers: { 
            authorization: getToken(),
            random: getRandom(),
            expiration_time: new Date().getTime(),
            check_code: md5(TAG + getToken() + new Date().getTime() + '/file-api/v1/file/digit/single/upload' + getRandom())
          },
          // 其他额外的参数，这个可以是一个对象或者是一个函数，如果是函数的话，则会传入 Uploader.File 实例
          query() {
            
          },
          processParams(params) {//每一次分片传给后台的参数，params是该方法返回的形参，包含分片信息
            return {//返回一个对象，会添加到每一个分片的请求参数里面
              total_num: params.total_num,
              file_id: params.file_id,
            };
          },
          directory:true,//是否允许文件夹上传  
        },
        attrs: {
          // accept: ACCEPT_CONFIG.getAll()
        },
        panelShow: false,   //选择文件后，展示上传panel
        collapse: false, //展开收起上传列表框
        chunknum:'',//切片下标uploadSuffixUrl
        uploadSuffixUrl:'',//文件上传路径
        // fileStatusText: { // 上传列表状态提示
        //   success: '文件上传成功',
        //   error: '失败',
        //   uploading: '上传中',
        //   paused: '暂停中',
        //   waiting: '排队中'
        // },
        fileArr:[],
      }
    },
    mounted() {
      Bus.$on('openUploader', query => { 
        this.file_id = query.file_id
        this.params = query || {};
        if (this.$refs.uploadBtn) {
          this.$refs.uploadBtn.$el.click();
        }
      });

    },
    computed: {
      //Uploader实例
      uploader() {
        return this.$refs.uploader.uploader;
      }
    },
    methods: {
   
      //合并
      bindFileDigitSingleUploadFun(file){
        this.count_filesLength = 0
            this.fileArr.forEach(item =>{
              $(`.myStatus_${item.id}`).text('绑定中...')
            })
        const q = {
          file_id:file.file_id,
        }
        bindFileDigitSingleUpload(q).then(response =>{
         if (response.status === 200) {
          const { data: res, message, status } = response.data
            this.fileArr.forEach(item =>{
              $(`.myStatus_${item.id}`).text(message)
            })
          if (status !== 200) return $(`.myStatus_${file.id}`).text(message)
           console.log(message)
          $(`.myStatus_${file.id}`).text(message)
          //上传——合并——解压绑定完成——关闭组件
          Bus.$emit('fileSuccess',message)
            this.fileArr = []
          //  this.unzipFileFun(file)

        //重置队列,选择后再次上传
          this.uploader.cancel();
          

          }
        })
      },
      // 压缩
      zipFileDigitSingleUploadFun(file){
            this.fileArr.forEach(item =>{
              $(`.myStatus_${item.id}`).text('压缩中...')
            })
        const q ={
          file_id:file.file_id
        }
        zipFileDigitSingleUpload(q).then(response =>{
         if (response.status === 200) {
        this.count_filesLength = 0
          const { data: res, message, status } = response.data
            this.fileArr.forEach(item =>{
              $(`.myStatus_${item.id}`).text(message)
            })
          if (status == 200) {
              // this.close()
              setTimeout(() => {
              this.bindFileDigitSingleUploadFun(file)
              }, 1000);
            }
          }
        })
      },

      //获取文件上传路径
        setUrl() {
            this.uploadSuffixUrl = request.service1.defaults.baseURL
            return request.service1.defaults.baseURL
        },
        //添加文件夹
      onFilesAdded(files,filelist){
        files.map(item =>{
          item.file_count = files.length
        })

      },
      //添加文件
      onFileAdded(file) {
        this.panelShow = true;
        file.file_id = this.file_id
        this.count_one = this.count_one + 1
        file.file_count = this.count_one
        this.computeMD5Success(file);
        this.fileArr.push(file)
        Bus.$emit('fileAdded',file);

      },
      onFileProgress(rootFile, file, chunk) {
        
        console.log(chunk.offset, `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`, chunk)
      },
      
      onFileSuccess(rootFile, file, response, chunk) {
        let res = JSON.parse(response);
        // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
        if (res.flag) {
          this.message({message: res.message, type: 'error'});
          // 文件状态设为“失败”
          this.statusSet(file.id, 'failed');
          return;
        }
        if (res.data && res.data.skipUpload) {
          this.statusSet(file.id, 'transmission');
          return;
        }
        if (res.status == 200) {
          this.statusSet(file.id, 'success',res.message);
          this.count_filesLength = this.count_filesLength + 1
          if (this.count_filesLength == file.file_count) { //在全部上传完成后 调取压缩接口
            setTimeout(() => {
              this.zipFileDigitSingleUploadFun(file)
              }, 1000);
          } else {
            console.log(this.count_filesLength)
            console.log(file.file_count)
          }
          // $(`.myStatus_${file.id}`).text(res.message)
          // Bus.$emit('fileSuccess',res.message)
          // file.chunk = this.params.chunk
          //上传完成，合并切片
          // this.mergeUploadFileFun(file) 
          
          // this.close()
        }else {
          this.statusSet(file.id,'failed',res.message);
        }
      },
      onFileError(rootFile, file, response, chunk) {
        this.message({
          message: response,
          type: 'error'
        })
      },

      /**
       * 计算md5，实现断点续传及秒传
       * @param file
       */
      computeMD5(file) {
        let fileRaw = file.raw

        let time = new Date().getTime();
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let currentChunk = 0;
        const chunkSize = 5 * 1024 * 1000;
        let chunks = Math.ceil(file.size / chunkSize);
        let spark = new SparkMD5.ArrayBuffer();

        // 文件状态设为"计算MD5"
        this.statusSet(file.id, '校验中');
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
            // this.$nextTick(() => {
            //   $(`.myStatus_${file.id}`).text('校验MD5 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%')

            // })

          } else {
            let md5 = spark.end();

            this.computeMD5Success(md5, file);
            console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
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

      computeMD5Success(file) {
        
        this.params.total_num = file.file_count.toString()
        console.log(this.params.total_num)
        // 将自定义参数直接加载uploader实例的opts上
        Object.assign(this.uploader.opts, {
          query: {
            ...this.params,
          }
        })


        // file.uniqueIdentifier = md5;
        // file.resume();
        // this.statusRemove(file.id);
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
        this.count_filesLength = 0
        this.panelShow = false;
      },

      /**
       * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
       * @param id
       * @param status
       */
      statusSet(id, status,message) {
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
            text: message,
            bgc: '#e2eeff'
          },
          transmission: {
            text: '秒传',
            bgc: '#e2eeff'
          },
          success: {
            text: message,
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
      Bus.$off('openUploader');
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
    .uploader-app {
      width: 580px;
    }

    .file-panel {
      background-color: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 7px 7px 0 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);

      .file-title {
        display: flex;
        height: 40px;
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
        padding: 0;

        > li {
          background-color: #fff;
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

    /deep/ .uploader-file-actions > span {
      margin-top: 12px;
      margin-right: 6px;
    }
  }

  /* 隐藏上传按钮 */
  #global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
</style>
