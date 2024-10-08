<template>
  <div class="cropper-content">
    <div class="cropper-box">
          <!--底部操作工具按钮-->
      <div class="footer-btn">
        <div class="scope-btn">
          <!-- <label class="btn" for="uploads">选择图片</label> -->
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">
          <el-button size="mini" type="danger" plain icon="el-icon-zoom-in" @click="changeScale(1)">放大</el-button>
          <el-button size="mini" type="danger" plain icon="el-icon-zoom-out" @click="changeScale(-1)">缩小</el-button>
          <el-button size="mini" type="danger" plain @click="rotateLeft">↺ 左旋转</el-button>
          <el-button size="mini" type="danger" plain @click="rotateRight">↻ 右旋转</el-button>
        </div>
        <div class="upload-btn">
          <el-button size="mini" type="success" @click="cropperimageFun()">剪切 <i class="el-icon-scissors"></i></el-button>
          <el-button size="mini" type="warning" @click="resetImageFun()">重置 <i class="el-icon-refresh"></i> </el-button>
          <el-button size="mini" type="info" class="btnedit" @click="disposeFun()">保存 <i class="el-icon-upload"></i> </el-button>
        </div>
      </div>
      <div class="cropper" >
        <vue-cropper ref="cropper" :img="option.img" :outputSize="option.outputSize" :outputType="option.outputType"
          :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixed="option.fixed"
          :fixedNumber="option.fixedNumber" :full="option.full" :fixedBox="option.fixedBox" :canMove="option.canMove"
          :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox"
          :height="option.height" :infoTrue="option.infoTrue" :maxImgSize="option.maxImgSize" :enlarge="option.enlarge"
          :mode="option.mode" @realTime="realTime" @imgLoad="imgLoad">
        </vue-cropper>
      </div>
  
    </div>
    <!--预览效果图-->
    <!-- <div class="show-preview">
      <div :style="previews.div" class="preview">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div> -->
  </div>
</template>
 
<script>
import {
  uploadFileUtilizeCut,
} from '@/api/utilize'
  import {
    VueCropper
  } from 'vue-cropper'
  import {
  imageToBase64,
  base64ToFile,
} from "@/utils/common.js";
  export default {
    name: "CropperImage",
    components: {
      VueCropper
    },
    // props: ['Name'],
    props:{
      fileBlob:{
        type: String,
        default:''
      },
      idobject:{
        type: Object,
        default:{}
      }
    },

    data() {
      return {
        // name: this.Name,
        previews: {},
        loading:true, //信息正在加载中
        option: {
          img: '', //裁剪图片的地址
          outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
          outputType: 'jpeg', //裁剪生成图片的格式（jpeg || png || webp）
          info: true, //图片大小信息
          canScale: true, //图片是否允许滚轮缩放
          autoCrop: true, //是否默认生成截图框
          autoCropWidth: 160, //默认生成截图框宽度
          autoCropHeight: 90, //默认生成截图框高度
          fixed: false, //是否开启截图框宽高固定比例
          fixedNumber: [1, 1], //截图框的宽高比例
          full: false, //false按原比例裁切图片，不失真
          fixedBox: false, //固定截图框大小，不允许改变
          canMove: true, //上传图片是否可以移动
          canMoveBox: true, //截图框能否拖动
          original: false, //上传图片按照原始比例渲染
          centerBox: true, //截图框是否被限制在图片里面
          height: true, //是否按照设备的dpr 输出等比例图片
          infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
          maxImgSize: 3000, //限制图片最大宽度和高度
          enlarge: 1, //图片根据截图框输出比例倍数
          mode: '100%', //图片默认渲染方式
        },
        url:'',//图片路径
        base64img:'',
      };
    },
    beforeMount(){
      // this.joinImgFun()
    },
    methods: {
      childFn(){
        
      },
      //保存已经处理的文件 
      disposeFun(){
        const that = this
     
        this.$refs.cropper.getCropData((base64) => {
           that.$emit('childFn',base64)
          //  return base64
         })     
        // this.$emit('childFn',that.base64img)
        
      },
      //重置
      resetImageFun(){
        this.joinImgFun(this.url)
      },
      // 剪切
      cropperimageFun(){
        if (this.option.autoCrop) {
           this.$refs.cropper.getCropData((base64) => {
           this.option.img = base64
           this.option.autoCrop = false
         })
        } else {
          this.option.autoCrop = true
        }
       
        // this.option.img = this.previews.url
      },
      //封装调取 处理图片路径转化格式 的函数
      handleImgToBase64(url, cb) {
        let that = this;
        var image = new Image()
        image.crossOrigin = ""
        image.src = url
        image.onload = function () {
          let base64 = imageToBase64(image); //图片转base64
          that.option.img = base64
          let file = base64ToFile(base64, "file") //base64转File
          // 根据自身需求调整【因个人项目逻辑不一样，这里使用回调函数】
          cb && typeof cb == "function" && cb(file)
          return file
        };
      },
      //导入选中的图片
      joinImgFun(url){
        this.url = url
        // var url = this.fileBlob 
        //调用封装的函数
        this.handleImgToBase64(url, (res) => { 
          // this.selectImg(res)
        });
      },
      //初始化函数
      imgLoad(msg) {
        this.loading = false
        // this.fileBlob = ''
      },
      //图片缩放
      changeScale(num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      //向左旋转
      rotateLeft() {
        this.$refs.cropper.rotateLeft()
      },
      //向右旋转
      rotateRight() {
        this.$refs.cropper.rotateRight()
      },
      //实时预览函数
      realTime(data) {
        this.previews = data
      },
      //选择图片
      selectImg(e) {
        let file = e.target.files[0]
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
          this.$message({
            message: '图片类型要求：jpeg、jpg、png',
            type: "error"
          });
          return false
        }
        //转化为blob
        let reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.option.img = data //将创建的blob图片链接保存到数据里面，跟正常图片一样
        }
        //转化为base64
        reader.readAsDataURL(file)
      },
       onfjscDialogVisible(){
            this.$emit('childFn', {file_id:this.idobject.file_id,file_weight:this.idobject.file_weight,});
        },


      //上传图片
      uploadImg(type) {
        let _this = this;
        if (type === 'blob') {
          //获取截图的blob数据
          this.$refs.cropper.getCropBlob((file) => {//得到裁剪以后的图片文件,方便使用
          const formData = new FormData()
          formData.append('file', file)
          formData.append('utilize_id', this.idobject.utilize_id)
          formData.append('file_id', this.idobject.file_id)
          formData.append('file_weight', this.idobject.file_weight)
          uploadFileUtilizeCut(formData).then(response =>{
           if (response.status === 200) {
            const { data: res, message, status } = response.data
            if (status !== 200) return this.message({ message: message, type: 'error' })
             this.message({ message: '裁剪完毕', type: 'success' })
             this.onfjscDialogVisible() //关闭裁剪 弹层
            }
          })
          return
            this.$refs.cropper.getCropData((base64) => {//得到裁剪以后的base64图片，方便使用
            alert('裁剪完毕，请看代码里面的uploadImg函数里面教你的使用方法，懒狗记得看')            
            //如果你想使用file二进制文件上传！那么请用11111111里面的代码，尤其是formData这样的上传格式，否则上传失败
            //1111111111111111111111111111111111111111111111111111111111111111111111111
            // let formData = new FormData();
            // formData.append('file',data,"DX.jpg")
            // let {data: res} = await _this.$http.post('/api/file/imgUpload', formData)
            //1111111111111111111111111111111111111111111111111111111111111111111111111111
            
            //如果你用base64那用请用22222222
            //2222222222222222222222222222222222222222222222222222222222222222222
 
              //就正常post上传就行，这样都不会啊
 
            //22222222222222222222222222222222222222222222222222222222222222222
            })
          })
        }
      },
    },
  }
</script>
 
<style scoped lang="less">
  .cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    width: 100%;
    .cropper-box {
      flex: 1;
      width: 100%;
      .cropper {
        
      border: 1px solid #dcdcdc;
        width: 100%;
        height: 500px;
      }
    }
 
    .show-preview {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
 
      .preview {
        overflow: hidden;
        border: 1px solid #67c23a;
        background: #cccccc;
      }
    }
  }
 
  .footer-btn {
    margin-bottom: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
 
    .scope-btn {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding-right: 10px;
    }
 
    .upload-btn {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
    }
 
    .btn {
      outline: none;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #409EFF;
      border-color: #409EFF;
      margin-right: 10px;
    }
  }
</style>