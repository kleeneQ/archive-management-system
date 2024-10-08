<template>
  <div>
    <h3>选择一个压缩文件 {{zipbin}}</h3>
    <input type="file" id="file" name="file" ref="inputerZIP" multiple :value="zipbin" @change="change">

    <div id="result_block" class="hidden">
      <h3>压缩包中文件列表 :</h3>
      <div id="result"></div>
    </div>
    <div>
       <span>选择文件:</span><input type="file" id="fileID" webkitdirectory multiple>
       <button @click="toZip()">压缩选择的文件并保存</button>
    </div>
  </div>
</template>

<script>
import JSZip, { file, files } from "jszip";
import $ from "jquery";
import {
  getDocumentList,
  addDocument,
  editDocument,
  removeDocument,
  getFileUrl,
  getDocumentLists
} from "@/api/digitization/documentApi"
import {
    uploadFile,
    checkUploadFile,
    mergeUploadFile,
    unzipFile,
    bindFile,
    convertPdfFile
  } from '@/api/digitization/uploadFile'
export default {
  name: 'zipupload',
  props:{
    zipfilesid:{
      type: String,
      default:''
    }
  },
  data(){
    return {
      filesList:[],//该案卷ID下的全部文件
    }
  },
  created(){
    this.getDocumentListsFun()
  },
  methods: {
    toZip(){
      const _this = this
       var file = document.getElementById("fileID");
           var zip = new JSZip();
          _this.$store.dispatch('setzipname',file.files)
          return
           zip.generateAsync({
              type: "Blob",
              compression: "DEFLATE", 
              compressionOptions: {
                 level: 5 
              }
           }).then(function (content) {
             console.log(content) //二进制的压缩文件
             saveAs(content, '封面.zip')
              _this.$store.dispatch('setzipname',content) //设置要传给上传附件子组件的值
              // saveAs(content, 'newZip.zip');
           });
    },
    getDocumentListsFun(){
      const q = {
        files_id:this.zipfilesid
      }
      getDocumentLists(q).then(response => {
        if (response.status === 200 ) {
          this.filesList = response.data.data
          
        }
      }).then(response =>{
          this.filesList.forEach(item => {
          item.fileBlob = []
        })
      })
      
    },
    handleFile(f) {
      let _this = this;
      //显示Zip名和创建filesname的ul容器
      var $title = $("<h4>", {
        text: f.name,
      });
      var $fileContent = $("<ul>");
      $("#result").append($title);
      $("#result").append($fileContent);
      var iconv = require('iconv-lite');

      // var zip = new JSZip();
      // zip.folder("封面").async('blob').then(function(content){
      //   console.log(content)
      //   _this.$store.dispatch('setzipname',content) //设置要传给上传附件子组件的值
      // })
      // var zip = new JSZip();
      // console.log(f)
      // console.log(this.filesList)
      // zip.folder("封面").file("0001.text", "FUCK")

      // zip.generateAsync({
      //    type: "Blob",
      //    compression: "DEFLATE", 
      //    compressionOptions: {
      //       level: 5 
      //    }
      // }).then(function (content) {
      //   console.log(content) //二进制的压缩文件
      //   saveAs(content, '封面.zip')
      //    _this.$store.dispatch('setzipname',content) //设置要传给上传附件子组件的值
      //    // saveAs(content, 'newZip.zip');
      // });
      // this.filesList.forEach(item =>{
      // JSZip.folder(item.wjtm).then(function(zip){
      //     console.log(zip)
      //   })
      // })
      // zip.generateAsync({
      //     type: "Blob",
      //     compression: "DEFLATE", 
      //     compressionOptions: {
      //        level: 1 
      //     }
      //  }).then(function (content) {
      //    console.log(content) //二进制的压缩文件
         
      //     _this.$store.dispatch('setzipname',content) //设置要传给上传附件子组件的值
      //     // saveAs(content, 'newZip.zip');
      //  });
      JSZip.loadAsync(f, {
        decodeFileName: function (bytes) {
          return iconv.decode(bytes, 'gbk');
        }
      }).then(function (zip) {
        
          var filesArr = []
          for (let i in zip.files) {
            // const element = array[i];
            filesArr.push(zip.files[i])
          }
          zip.folder("封面").file("0001.jpg", filesArr[2],{base64: true})
        zip.generateAsync({
         type: "Blob",
         compression: "DEFLATE", 
         compressionOptions: {
            level: 5 
         }
      }).then(function (content) {
        saveAs(content, '封面.zip')
         _this.$store.dispatch('setzipname',content) //设置要传给上传附件子组件的值
         // saveAs(content, 'newZip.zip');
      });
      return
          zip.forEach(function(relativePath,zipEntry){
            var fileName = zipEntry.name
            console.log(zipEntry)

            if (zipEntry.name.slice(zipEntry.name.length - 1) !== '/'){
              zip.file(zipEntry.name).async('Blob').then(function success (e){
                console.log(zipEntry.name.replace(/[^\u4e00-\u9fa5]/gi,"")) //提取文件名中的汉字
                var filesnameC = zipEntry.name.replace(/[^\u4e00-\u9fa5]/gi,"")
                //文件夹名称 
                console.log(e)
                
                // var fileBlob = new Array();
                _this.filesList.forEach(item =>{
                  if (item.wjtm === filesnameC) {
                    item.fileBlob.push(zipEntry) //往解压的文件对象中插入数组  
                  }
                })
                console.log(_this.filesList)//新的对象数组，其中是案卷下的每个文件  并且里面包含有需要上传的blob文件流(数组)
                //  _this.$store.dispatch('setzipname',_this.filesList) //设置要传给上传附件子组件的值

              })
            }
          })
          // zip.forEach(function(relativePath,zipEntry){
          // var fileName = zipEntry.name
          // console.log(zipEntry)
          // if (zipEntry.name.slice(zipEntry.name.length - 1) !== '/') {  //  后面是斜线的不要，因为是目录即文件夹
          //   zip.file(zipEntry.name).async('blob').then(function success (text) {
          //     text.text().then(function(e){
          //       console.log(e)
          //     })
          //   }, function error (e) {
          //   })
          // }
          // },
          //循环获取ZIP包下面的文件夹名称
          filesArr.forEach(item => {
             // console.log(item.name.lastIndexOf("."))
              var  str = item.name
              let index = str.lastIndexOf(".")
              str = str.substring(index+1,str.length);
              // console.log(str.replace("/","")) //压缩文件夹下面的文件夹名称
              var zipfilename = str.replace("/","")
              //该案卷下已有的文件名称 进行循环  遍历出需要上传的文件
              _this.filesList.forEach(files =>{
                if (files.wjtm == zipfilename) {
                    var fileBlob = new Array();
                    files.fileBlob.push()
                }
              })
          })
      });
    },
    change(e){
    //  this.$nextTick(() => {
    //     console.log(this.$refs.inputerZIP)
    //     this.$refs.inputerZIP.$children[0].$refs.input.webkitdirectory = true
        
    //   })
      var inputerZIP = this.$refs.inputerZIP
      // this.$store.dispatch('setzipname',e.target.value) //设置要传值的值
    },
  },
  mounted() {
    let _this = this;
    $("#file").on("change", function (evt) {
      $("#result").html("");
      $("#result_block").removeClass("hidden").addClass("show");
      var files = evt.target.files;
      for (var i = 0; i < files.length; i++) {
        _this.handleFile(files[i]);
      }
    });

    $("#fileID").on("change",function(events){
      console.log(events.target.files)
    })
  },
  computed:{
    zipbin:function(){  //通过vuex 将导入ZIP包组件的解压 数据 传值给   上传附件组件
       return this.$store.getters.getzip
    }
    // zipbin(){
     
    // },
  }
};
</script>

<style>
code {
  display: block;
  padding: 10px;
  background: #eee;
}
</style>
