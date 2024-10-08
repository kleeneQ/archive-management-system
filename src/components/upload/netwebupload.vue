<template>
<div>
    <div class="container">
        <div class="handle-box" >
            <div id="extend-upload-chooseFile"
                 style="float: left;margin: 0px 5px;">
                <i class="el-icon-plus"></i>
                选择文件</div>
            <el-button
                    type="success"
                    :icon="uploadStaus"
                    class="handle-del mr10"
                    @click="uploadToServer()"
                    :disabled="uploadBtnDisabled"
            >开始上传</el-button>
            <el-button
                    type="danger"
                    icon="el-icon-close"
                    class="handle-del mr10"
                    @click="clearFiles()"
                    :disabled="uploadBtnDisabled"
            >清空上传队列</el-button>
        </div>
        <!-- <div class="showMsg">支持上传的文件后缀：{{ options.fileType }}</div> -->
        <el-table
                :data="fileListData"
                style="width: 100%">
            <el-table-column
                    prop="fileName"
                    label="文件名称"
                    align="center"
                    width="250">

            </el-table-column>
            <el-table-column
                    prop="fileSize"
                    align="center"
                    label="文件大小"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="progress"
                    align="center"
                    label="进度"
                    width="300">
            <!-- <el-progress :text-inside="true" :stroke-width="26" :percentage="progress" ></el-progress>         -->
            </el-table-column>
            <el-table-column label="操作" width="300" align="center" >
                <template slot-scope="scope">
                    <el-button
                      type="danger"
                      icon="el-icon-close"
                      class="red"
                      @click="removeRow(scope.$index, scope.row)"
                    >移除</el-button>
                    <!-- <el-button
                            type="text"
                            icon="el-icon-search"
                            class="red"
                            @click="seeFile(scope.$index, scope.row)"
                    >查看</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</div>
</template>
<script>
import $ from 'jquery'
import JSZip, { file, files } from "jszip";
import webUploader from 'webuploader'
import { getToken } from '@/utils/auth'
import { getRandom } from '@/utils/index'
import md5 from 'js-md5'
const TAG = 'TQKJ'

  import request from '@/utils/request'
  import {
    uploadFile,
    // netcheckFile,
    // netmergeFile,
    // netunzipFile,
    bindFile,
    convertPdfFile,

  } from '@/api/digitization/uploadFile'
  import {
    netuploadFile,
    netcheckFile,
    netmergeFile,
    netunzipFile,
    netimportFile,
  } from '@/api/netfileupload/netfileupload'
import {
  getDocumentList,
  addDocument,
  editDocument,
  removeDocument
} from "@/api/digitization/documentApi"
export default {
    name: 'netwebupload',
    props:{
        headers:{
            type: String,
            default:''
        },
        fileNumLimit:{
            type:Number,
            default:500
        },
        fileSize:{
            type:Number,
            default:100*1024*1024*1024
        },
        chunkSize:{
            type: Number,
            default: 5*1024*1024
        },
        uploadSuffixUrl:{
            type:String,
            default: ''
        },
        options:{
            type:Object,
            default:{
                //允许上传的文件类型
                fileType:"doc,docx,pdf,xls,xlsx,ppt,pptx,gif,jpg,jpeg,bmp,png,rar,zip,mp4,avi,file",
                fileUploadUrl:"/file-api/v1/file/net/upload",//上传地址
                fileCheckUrl:"/file-api/v1/file/net/check",//检测文件是否存在url
                checkChunkUrl:"/file-api/v1/file/net/check",//检测分片url
                mergeChunksUrl:"/file-api/v1/file/net/merge",//合并文件请求地址 headers:{},
                file_id:'',
                uploadSuffixUrl:'',
                headers:{},
            }
        },
        fileListData:{
            type:Array,
            default:[]
        },
        fjscrow:{
            type:Object,
            default:{}
        },
        

    },
    data() {
        return {
            uploader:{},
            uploadBtnDisabled:false,
            uploadStaus:"el-icon-upload",
            fList:[{
                numbers:1,
                fileName:"",
                fileSize:"120",
                progress:"20%",
                oper:""
            }],//文件集合 在前台展示文件列表内容
            addZIPFiles:'',//导入案卷ZIP包 子组件传过来的值
            fjscrowfile_id:"",
            hpcgfiles:[], //已经合并成功的文件
        }
    },
    mounted() {
        this.register();
        this.createUploader();
        this.events();
        // addFiles()
    },
    methods: {
        
        onfjscDialogVisible(){
            this.$emit('childFn', false);
        },
        createUploader(){
            var fileType=this.options.fileType;
            this.uploader = webUploader.create({
                // 不压缩image
                resize: false,
                // swf文件路径
                swf: '@/assets/Uploader.swf', // swf文件路径
                // 默认文件接收服务端。
                server: this.options.fileUploadUrl,
                pick: {
                    id: '#extend-upload-chooseFile',//指定选择文件的按钮容器，不指定则不创建按钮。注意 这里虽然写的是 id, 不仅支持 id, 还支持 class, 或者 dom 节点。
                    multiple :true //开启文件多选
                },
                // fileSingleSizeLimit:fileSize,//单个文件大小
                accept:[{  //指定接受哪些类型的文件
                    title: 'file',
                    extensions: fileType,
                    mimeTypes: this.buildFileType(fileType)
                }],
                file_id:this.options.file_id,
                // 单位字节，如果图片大小小于此值，不会采用压缩。512k  512*1024，如果设置为0，原图尺寸大于设置的尺寸就会压缩；如果大于0，只有在原图尺寸大于设置的尺寸，并且图片大小大于此值，才会压缩
                compressSize: 0,
                fileNumLimit : this.fileNumLimit,//验证文件总数量, 超出则不允许加入队列,默认值：undefined,如果不配置，则不限制数量
                fileSizeLimit : 100*1024*1024*1024, //1kb=1024*1024,验证文件总大小是否超出限制, 超出则不允许加入队列。
                fileSingleSizeLimit:this.fileSize, //验证单个文件大小是否超出限制, 超出则不允许加入队列。
                chunked:true,//是否开启分片上传
                threads:5,//上传并发数，可同时发送请求数
                chunkSize:this.chunkSize,//如果要分片，每一片的文件大小
                prepareNextFile:false//在上传当前文件时，准备好下一个文件,请设置成false，不然开启文件多选你浏览器会卡死
            });
        },

        register(){//注册函数
            var uploadSuffixUrl=this.options.uploadSuffixUrl;
            var that=this;
            var options = this.options;
            var headers=options.headers||{};
            var fileCheckUrl=uploadSuffixUrl+options.fileCheckUrl;//检测文件是否存在url
            var checkChunkUrl=uploadSuffixUrl+options.checkChunkUrl;//检测分片url
            var mergeChunksUrl=uploadSuffixUrl+options.mergeChunksUrl;//合并文件请求地址
        
            //监控文件上传的三个时间点(注意：该段代码必须放在WebUploader.create之前)
            //时间点1：:所有分块进行上传之前（1.可以计算文件的唯一标记;2.可以判断是否秒传）
            //时间点2： 如果分块上传，每个分块上传之前（1.询问后台该分块是否已经保存成功，用于断点续传）
            //时间点3：所有分块上传成功之后（1.通知后台进行分块文件的合并工作）
            webUploader.Uploader.register({
                "before-send-file":"beforeSendFile",
                "before-send":"beforeSend",
                "after-send-file":"afterSendFile"
            },{
                //时间点1：:所有分块进行上传之前调用此函数
                beforeSendFile:function(file){//利用md5File（）方法计算文件的唯一标记符
                
                    //创建一个deffered
                    var deferred = webUploader.Deferred();
                    //1.计算文件的唯一标记，用于断点续传和秒传,获取文件前20m的md5值，越小越快，防止碰撞，把文件名文件大小和md5拼接作为文件唯一标识
                    (new webUploader.Uploader()).md5File(file,0,5*1024*1024).progress(function(percentage){
                    }).then(function(val){
                        file.fileMd5=val;
                        //2.请求后台是否保存过该文件，如果存在，则跳过该文件，实现秒传功能
                        const q = {
                          chunk: Math.ceil(file.size/(5*1024*1024)),
                          file_id:file.name.substr(0, file.name.indexOf("."))
                        }
                          // contentType:file.type,
                          // zoneTotalMd5:val
                        netcheckFile(q).then(response =>{
                          if (response.data.data.check_result === false) {
                            //继续上传
                            deferred.resolve();
                          } else {
                             that.uploader.skipFile(file);
                             that.setTableBtn(file.id,"上传成功");
                             that.afterSendFile(file)
                             //如果存在，则跳过该文件，秒传成功
                             deferred.reject();
                             that.fList.push(response.data);
                          }
                        })

                    });
                    //返回deffered
                    return deferred.promise();
                },
                //时间点2：如果有分块上传，则 每个分块上传之前调用此函数
                //block:代表当前分块对象
                beforeSend:function(block){//向后台发送当前文件的唯一标记，用于后台创建保存分块文件的目录
                    //1.请求后台是否保存过当前分块，如果存在，则跳过该分块文件，实现断点续传功能
                    
                    var deferred = webUploader.Deferred();
                    //请求后台是否保存完成该文件信息，如果保存过，则跳过，如果没有，则发送该分块内容
                    (new webUploader.Uploader()).md5File(block.file,block.start,block.end).progress(function(percentage){
                    }).then(function(val){
                        block.zoneMd5=val;
                        const q = {
                          chunk:block.chunk,
                          file_id:block.file.name.substr(0, block.file.name.indexOf("."))
                        }
                        netcheckFile(q).then(response =>{
                          if (response.data.data.check_result === false) {
                            //分块不存在或者不完整，重新发送该分块内容
                            deferred.resolve();
                          } else {
                              //分块存在，跳过该分块
                            deferred.reject();

                          }
                        })
                    });
                    return deferred.promise();
                },
                //时间点3：所有分块上传成功之后调用此函数
                afterSendFile:function(file){//前台通知后台合并文件
                    //1.如果分块上传，则通过后台合并所有分块文件
                    //请求后台合并文件
                    
                that.hpcgfiles.push(file) //已经合并 成功的文件
                }
            });
        },
        netmergeFileFun(file){
            const that = this
                const q = {
                        chunk_total: Math.ceil(file.size/that.chunkSize),
                        file_ext: file.ext,
                        file_id:file.name.substr(0, file.name.indexOf(".")),
                    }
                    //合并已经上传的切片  合并为压缩包
                    netmergeFile(q).then(response =>{ 
                       that.uploader.skipFile(file);
                       that.setTableBtn(file.id,'上传成功');
                       that.fList.push(response.data);
                       if (response.data.status === 200) {
                        //解压文件合并的文件
                        netunzipFile({ file_id: file.name.substr(0, file.name.indexOf(".")) }).then(response => {
                            
                            that.setTableBtn(file.id,'正在导入数据');
                            netimportFile({ file_id: file.name.substr(0, file.name.indexOf(".")) }).then(response =>{
                                
                                if (response.status === 200) {
                                    
                                const { data: res, message, status } = response.data
                                that.setTableBtn(file.id,message);
                                if (status !== 200) return console.log("数据导入失败",message)
                                
                                
                                }
                            })
                            return
                        }).catch(error => {
                            console.log(error)
                        })
                        }
                    }) 
        },
         setHeaders(){
            const RANDOM = getRandom()
            const TIME = new Date().getTime()
            this.options.headers = {
              authorization: getToken(),
              random: RANDOM,
              expiration_time: TIME,
              check_code: md5(TAG + getToken() + TIME + '/file-api/v1/file/net/check' + RANDOM)
            }
          },
        events(){
            var that = this;
            var uplaod=this.uploader;
            //当文件添加进去
            uplaod.on('fileQueued', function(file){
                
                var fileSize = that.formatFileSize(file.size);
                var row={fileId:file.id,fileName:file.name,fileSize:fileSize,validateMd5:'0%',progress:"等待上传",state:'就绪'};
                that.fileListData.push(row);
                this.fjscrowfile_id = file.name.substr(0, file.name.indexOf("."))
            });

            //监听进度条,更新进度条信息
            uplaod.on( 'uploadProgress', function( file, percentage ) {
                that.setTableBtn(file.id,(percentage * 100).toFixed(2)+'%');
            });
            
            /**上传之前**/
            uplaod.on('uploadBeforeSend', function( block, data, headers ) {
                const RANDOM = getRandom()
                const TIME = new Date().getTime()
                that.options.headers = {
                    Authorization: getToken(),
                    random: RANDOM,
                    expiration_time: TIME,
                    check_code: md5(TAG + getToken() + TIME + '/file-api/v1/file/net/upload' + RANDOM)
                }
                data.chunk = block.chunk;
                data.file_id = block.file.name.substr(0, block.file.name.indexOf("."));
                data.fileMd5 = block.file.fileMd5;
                data.contentType=block.file.type;
                data.chunks = block.file.chunks;
                data.zoneTotalMd5= block.file.fileMd5;
                data.zoneMd5=block.zoneMd5;
                data.zoneTotalCount=block.chunks;
                data.zoneNowIndex=block.chunk;
                data.zoneTotalSize=block.total;
                data.zoneStartSize=block.start;
                data.zoneEndSize=block.end;
                 headers.Authorization=that.options.headers.Authorization;
                headers.random = RANDOM
                headers.expiration_time = TIME
                headers.check_code = md5(TAG + getToken() + TIME + '/file-api/v1/file/digit/upload' + RANDOM)
            });

            //错误信息监听
            uplaod.on('error', function(handler){

                if(handler=='F_EXCEED_SIZE'){
                  console.log("上传的单个太大!")
                    // that.$message.error({
                    //     showClose: true,
                    //     message: '上传的单个太大!\n最大支持'+that.formatFileSize(that.fileSize)+'! \n操作无法进行,如有需求请联系管理员'
                    // });
                }else if(handler=='Q_TYPE_DENIED'){
                  console.log("不允许上传此类文件!")
                    // that.$message.error({
                    //     showClose: true,
                    //     message: '不允许上传此类文件!。<br>操作无法进行,如有需求请联系管理员'
                    // });
                }
            });

            /**从文件队列移除**/
            uplaod.on('fileDequeued', function( file ) {
                // delete percentages[ file.id ];
              
                console.log("从文件队列移除")

            });

            //当文件上传成功时触发。file {ArchivesFile} File对象, response {Object}服务端返回的数据
            uplaod.on('uploadSuccess',function(file,response){
                // debugger;
                if(file.blocks === 200 ){
                    that.setTableBtn(file.id,'正在校验文件...');
                }
            })
            //所有文件上传成功后
            uplaod.on('uploadFinished',function(){//成功后
                that.uploadBtnDisabled=false;
                that.uploadStaus="el-icon-upload";
                var hpcgfiles = that.hpcgfiles
                console.log(that.hpcgfiles)
                for (let i = 0; i < hpcgfiles.length; i++) {
                    const element = hpcgfiles[i];
                    that.netmergeFileFun(element)
                }
                // that.$message.success({
                //     showClose: true,
                //     message: '文件上传完毕'
                // });

            });
        },
        setTableBtn(fileId,showmsg,networkPath){
            var fileList=this.fileListData;
            for(var i=0;i<fileList.length;i++){
                if(fileList[i].fileId==fileId){
                    this.fileListData[i].progress=showmsg;
                    this.fileListData[i].networkPath=networkPath||"";
                }
            }
        },
        removeRow(index,row){
            const that = this
            this.uploader.removeFile(row.fileId);
            this.fileListData.splice(index,1);
 
        },
        seeFile(index,row){
            var npath=row.networkPath;
            if(this.strIsNull(npath)){
                this.$message.error({
                    showClose: true,
                    message: '文件未上传，请等待文件上传完成后，方可查看'
                });
                return;
            }
            var filens=npath.substring(npath.lastIndexOf(".")+1);
            if(filens=="png"||filens=="jpg"||filens=="jpeg"
                ||filens=="gif"){//图片，在当前窗口查看
                console.log("图片，在当前窗口查看")
                // this.$message.success({
                //     dangerouslyUseHTMLString: true,
                //     showClose: true,
                //     message: `<img src="${this.options.uploadSuffixUrl+npath}" style="max-width: 80%;max-height: 80%;"/>`
                // });
            }else{
               window.open(this.options.uploadSuffixUrl+npath);
            }
        },
        uploadToServer(){
            const that = this
            if(this.fileListData.length<=0){
              console.log("没有上传的文件")
              this.message({ message: "没有需要上传的文件", type: 'error' })
                // this.$message.error({
                //     showClose: true,
                //     message: '没有上传的文件'
                // });
                return;
            }
              //移除服务器上的文件
              console.log(this.fjscrowfile_id)
            //   const q = {
            //     remove_type: 2,
            //     file_id: that.fjscrow.file_id,
            //     }
            //     removeDocument(q).then(response => {
            //     if (response.data.status === 200) {
            //     }
            // })
            this.uploadBtnDisabled=true;
            this.uploadStaus="el-icon-loading";
            $("#extent-button-uploader").text("正在上传，请稍等...");
            // $("#extent-button-uploader").addClass('layui-btn-disabled');
            this.uploader.upload();
        },
        clearFiles(){
            var that=this;
            that.uploadBtnDisabled=false;
            that.uploadStaus="el-icon-upload";
            that.uploader.reset();
            that.fileListData.splice(0,that.fileListData.length);
        },
        beginUploadFile(index,row){
            this.uploadBtnDisabled=false;
            this.uploadStaus="el-icon-upload";
            this.uploader.upload();
        },
        stopUploadFile(index,row){
            this.uploadBtnDisabled=false;
            this.uploadStaus="el-icon-upload";
            this.uploader.stop();
        },
        buildFileType(fileType){
            var ts = fileType.split(',');
            var ty='';

            for(var i=0;i<ts.length;i++){
                ty=ty+ "."+ts[i]+",";
            }
            return  ty.substring(0, ty.length - 1)
        },
        strIsNull(str){
            if(typeof str == "undefined" || str == null || str == "")
                return true;
            else
                return false;
        },
        formatFileSize(size){
            var fileSize =0;
            if(size/1024>1024){
                var len = size/1024/1024;
                fileSize = len.toFixed(2) +"MB";
            }else if(size/1024/1024>1024){
                var len = size/1024/1024;
                fileSize = len.toFixed(2)+"GB";
            }else{
                var len = size/1024;
                fileSize = len.toFixed(2)+"KB";
            }
            return fileSize;
        },
        addFiles(){
        //  var webupload = new webUploader()
         var file = this.addZIPFiles
         this.uploader.addFiles(file) //添加文件到队列上
         return
         let fileList = file[2].fileBlob
         for (let i = 0; i < fileList.length; i++) {
            zip.file(fileList[i].name, fileList[i]);
        }
         zip.generateAsync({
            type: "blob",
            compression: "DEFLATE", 
            compressionOptions: {
            level: 8  //压缩等级 1-9  1是最低，9是最高
            }
        }).then(response =>{
            
        })
        //  webupload.uploader.addFiles(file) //添加文件到队列上
        },

    },
    computed:{
    //   zipbin(){
    //     console.log(this.$store.state.zipbin)
    //     this.addZIPFiles = this.$store.state.zipbin
    //     // this.addFiles(this.$store.state.zipbin)
    //     return this.$store.state.zipbin
    //   }
    }



}
</script>
<style>
    .container {
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    #picker div:nth-child(2){width:100%!important;height:100%!important;}
    .webuploader-container {
        position: relative;
    }
    .webuploader-element-invisible {
        position: absolute !important;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px,1px,1px,1px);
    }
    .webuploader-pick {
        position: relative;
        display: inline-block;
        cursor: pointer;
        background:#409eff;
        color: #fff;
        font-size: 10px;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
        width: 100px;
        padding: 10px;
        margin-right: 5px;
    }
    .webuploader-pick-hover {
        background: #409EFF;
    }

    .showMsg{
        margin: 5px;
        background: radial-gradient(#d2b8b8, transparent);
    }
</style>
