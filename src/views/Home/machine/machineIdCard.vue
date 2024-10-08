<template>
  <div class='ytjbox'>
    <div class="divbox div1 " >
      <div class="hintTxttitle">查档登记身份信息获取</div>
      <div class="hintTxt">请将身份证放在读卡器上自动读取个人信息，读取信息后将进入信息登记窗口，您也可以点击下方按钮直接进入登记窗口手动填写</div>
      <div class="gotobtnbox clearfix">
        <div class="gotobtn fl" @click="selectEngineeringFun('/machineHome/machinedepartment',cdlb,'工程档案查档登记','idcard_box1')">工程档案查档登记</div>
        <div class="gotobtn fr" @click="selectEngineeringFun('/machineHome/machinedepartment',cdlb,'声像档案查档登记','idcard_box1')">声像档案查档登记</div>
      </div>
    </div>
      <!-- 读取身份证信息成功 B -->
      <el-dialog
          width="40%"
          title="提示"
          :visible.sync="successHintVisible">
            <div class="successHint">身份识别成功，点击下方按钮进入查档登记</div>
             <div class="gotobtnbox clearfix">
        <div class="gotobtn fl" @click="selectEngineeringFun('/machineHome/machinedepartment',cdlb,'工程档案查档登记','idcard_box2')">工程档案查档登记</div>
        <div class="gotobtn fr" @click="selectEngineeringFun('/machineHome/machinedepartment',cdlb,'声像档案查档登记','idcard_box2')">声像档案查档登记</div>
      </div>
          </el-dialog>
      <!-- 读取身份证信息成功 E -->

               <!-- 选择工程 B -->
        <el-dialog
          width="60%"
          title="选择档案"
          :visible.sync="engineeringVisible">
           <!-- 声像档案 -->
           <div v-if="lbname == '声像档案查档登记'">
             <el-form  :inline="true" :model="AudioQueryInfo" class="demo-form-inline" label-width="100px">
           
            <el-form-item label="案卷题名">
              <el-input clearable v-model="AudioQueryInfo.ajtm" placeholder="请输入案卷题名"  @change="getWebMachineUtilizeEngineeringListFun"></el-input>
            </el-form-item>
             <el-form-item label="拍摄地点">
              <el-input clearable v-model="AudioQueryInfo.psdd" placeholder="请输入拍摄地点"  @change="getWebMachineUtilizeEngineeringListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getUtilizeAudioFilesListFun">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 工程列表 B -->
            <el-table
              :data="selectFilesLists"
              border
              style="width: 100%"
              ref="tableRef"
              key="one"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="ajtm"
                label="档案名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="psdd"
                label="拍摄地点"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="gotopagesx(scope.row,cdlb,'声像档案查档登记')">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->

           </div>

           <div v-else>
                  <!-- 工程 -->
          <el-form  :inline="true" :model="EngineeringQueryInfo" class="demo-form-inline" label-width="100px">
           
            <el-form-item label="项目类型">
            <el-select clearable v-model="EngineeringQueryInfo.gclx" placeholder="请选择项目类型" @change="getWebMachineUtilizeEngineeringListFun">
              <el-option v-for="(item,index) in engineeringType" :key="index" :label="item.type_name" :value="item.type_code" ></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="项目名称">
              <el-input clearable v-model="EngineeringQueryInfo.gcmc" placeholder="请输入项目名称"  @change="getWebMachineUtilizeEngineeringListFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getWebMachineUtilizeEngineeringListFun">查询</el-button>
            </el-form-item>
          </el-form>
            <!-- 工程列表 B -->
            <el-table
              :data="selectEngineeringLists"
              border
              key="two"
              style="width: 100%"
              ref="tableRef"
              max-height="500px"
              :header-cell-style="{'text-align':'center','padding-top':'5px','padding-bottom':'5px','background-color':'#DDDDDD','color':'#000000'}"
              :cell-style="{'text-align':'center','padding':'0px'}"
              :row-style="{'height':'30px'}"
            >
              <el-table-column
                prop="gcmc"
                label="项目名称"
                show-overflow-tooltip
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="gclxName"
                label="项目类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="gcdd"
                label="项目地址"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="gotopage(scope.row,cdlb,'工程档案查档登记')">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 工程列表 E -->
           </div>
        </el-dialog>
        <!-- 选择工程 E -->  
  </div>
</template>

<script>
import {
  getUtilizeIdCardInfo,
  getWebDataDictionaryBistDrop,
  getWebMachineUtilizeEngineeringList,
  getWebFileTypeListDrop,
  submitFileMachineSimpleUtilize,
  submitWebMachineUtilizeSubmit,
  getUtilizeAudioFilesList,
} from '@/api/machine'
export default {
  data () {
    return {
      cdlb:'',
      lb:'',
      idcard:{
        user_name:'',
        user_num:'',
      },
      successHintVisible:false,
      engineeringVisible:false,//选择项目 弹层
      EngineeringQueryInfo:{ //项目列表查询
        gcmc:'',
        gclx:'',
      },
      lbname:'',//查档类别
      AudioQueryInfo:{ 
        ajtm:'',
        psdd:'',
      },
      selectFilesLists:[],
      engineeringType:[],//项目工程类型
      selectEngineeringLists:[],//
      websocket: null,
    }
  },
  created () {
    this.cdlb = this.$route.query.bm
  },
  mounted () {
   this.timerId =  setTimeout(()=>{
    //  this.readCard() //读卡
      // this.successHintVisible=true
      // this.getUtilizeIdCardInfoFun() //获取身份证信息
        this.startPushInfosWithImg() //开启推送
        this.Routon_Mute()
    },1000)
    
    this.getEngineeringTypeFun() //工程类型
    this.openWebSocket() //打开WebSocket连接

  },
  methods: {

  // type your function
	
		// 开启静音
		Routon_Mute() {
			var jsonObj = {
				"name":"mute",
				"isMute": true
			};
			
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
		},
    //关闭推送
		 stopPushInfos(){
			var jsonObj = {
				"name":"closePush"
			};
			
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
		},
    		
		//开启推送（带图片)
		startPushInfosWithImg()
		{
			var jsonObj = {
				"name":"openPush",
				"withImg": true,
				"interval": "100",				
			};
			
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
		},
		//开启推送（不带图片)
		startPushInfosWithOutImg(){
			var jsonObj = {
				"name":"openPush",
				"withImg": false,
				"interval": "100",
			};
			
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
		},
		//读卡
		readCard()
		{
			var jsonObj = {
				"name":"readCard"
			};
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
      
		},

		// 允许重复读卡
		enableRepeatRead() {
			var jsonObj = {
				"name":"repeatRead",
				"isRepeatRead": true
			};
			
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
		},
    	// 禁止重复读卡
		disableRepeatRead() {
			var jsonObj = {
				"name":"repeatRead",
				"isRepeatRead": false
			};
			
			var jStr = JSON.stringify(jsonObj);
			
			this.websocket.send(jStr);
		},
		// 连接服务端
		openWebSocket(){
      const that = this
      var websocket = null;
			 var url = 'ws://127.0.0.1:18890';
			//  var url = document.getElementById('url').value;  
			 //var token = document.getElementById('token').value;  
			if('WebSocket' in window) {
				//websocket = new WebSocket(url,[token]); 
				that.websocket = new WebSocket(url);
			} else if('MozWebSocket' in window) {
			    console.log("MozWebSocket");
				that.websocket = new MozWebSocket(url);
			} else {
				console.log("SockJS");
				//websocket = new SockJS("localhost:8088/websocket/webSocketByTomcat/"+document.getElementById('sessionId').value);
			}
			
			if(that.websocket == null)
			{
				alert("创建WebSocket对象失败");
			}
			
            //连接发生错误的回调方法
            this.websocket.onerror = function () {
              that.message({ message: "WebSocket连接发生错误", type: 'error' })
                // setMessageInnerHTML("WebSocket连接发生错误");
            };

            //连接成功建立的回调方法
            that.websocket.onopen = function () {
                // setMessageInnerHTML("WebSocket连接成功");
                console.log('连接成功')
                that.enableRepeatRead();// 由于客户测试时一般都使用同一张卡测试，所以默认开启允许重复读卡，避免客户出现未重新放卡导致出现读卡失败现象
                
              // this.startPushInfosWithOutImg() //开启推送
                
            };

            //接收到消息的回调方法
            this.websocket.onmessage = function (event) {
                
                var resultObj = eval('(' +event.data+')');
               
								//resultFlag为0代表读卡成功
								if (resultObj.name == "readCard" || resultObj.name == "readCert"
										|| resultObj.name == "PushWithImg" || resultObj.name == "PushWithOutImg")
								{
	                if (resultObj.resultFlag == "0") {
											//回显相关数据
                console.log(resultObj.resultContent.certNumber);
                console.log(resultObj.resultContent.partyName);
                that.idcard.user_name = resultObj.resultContent.partyName
                that.idcard.user_num = resultObj.resultContent.certNumber
                that.successHintVisible = true //显示提示弹层
                return
	                 
									} else if (resultObj.resultFlag == "-1") {
	                    if (resultObj.errorMsg == "端口打开失败") {
	                        //alert("读卡器未连接");
	                    } else {
	                        //alert(resultObj.errorMsg);
	                    }
	                } else if (resultObj.resultFlag == "-2") {
	                    //alert(resultObj.errorMsg);
	                }            
	              } 
	            	else if (resultObj.name == "getStatus")
	            	{
	            		if (resultObj.resultFlag == "0")
	            		{
	            			if (resultObj.status == "0")
	            			{
	            			}
	            			else
	            			{
	            				alert("设备连接已断开，请检查读卡器连接");
	            			}
	            		}
	            	}
	            	else if (resultObj.name == "readM1Card" || resultObj.name == "writeM1Card" || resultObj.name == "handleAPDUCMD" || resultObj.name == "readM1CardEx" || resultObj.name == "writeM1CardEx") {
	            		document.getElementById("ACardResult").value = event.data;
	            	}
	              	
            };

            //连接关闭的回调方法
            this.websocket.onclose = function () {
              console.log('WebSocket连接关闭')
                // setMessageInnerHTML("WebSocket连接关闭");
            };
    },
		



    //选择工程弹层
    selectEngineeringFun(url,cldb,lbname,idcard_box){
      if(idcard_box == 'idcard_box1'){
        // 取消定时器的执行
        // window.clearTimeout(this.timerId);
        this.idcard.user_name = ''
        this.idcard.user_num = ''
      }
      this.lbname = lbname
      if (lbname == '工程档案查档登记') {
         this.getWebMachineUtilizeEngineeringListFun()
      } else {
        this.getUtilizeAudioFilesListFun()
      }
      this.engineeringVisible = true
    },
    
    // 获取声像档案列表
    getUtilizeAudioFilesListFun(){
      const q ={
        ajtm:'',
        psdd:'',
      }
      getUtilizeAudioFilesList(this.AudioQueryInfo).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.selectFilesLists = res
        }
      })
    },
    //获取 项目工程 列表
  getWebMachineUtilizeEngineeringListFun(){
    getWebMachineUtilizeEngineeringList(this.EngineeringQueryInfo).then(response =>{
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
        res.map(v=>{
          this.engineeringType.forEach(t => {  //载体类型
              if (v.gclx === t.type_code) {
                v.gclxName = t.type_name
              }
              return
            })
           
        })
        console.log(this.selectEngineeringLists)
        this.selectEngineeringLists = res
        }
      })
  },

    // 获取工程类型
    getEngineeringTypeFun() {
      getWebFileTypeListDrop().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.engineeringType = res
        }
      }).catch(error => {
        console.log(error)
      })
    },


  getUtilizeIdCardInfoFun(){
    const q ={

    }
    getUtilizeIdCardInfo().then(response =>{
     if (response.status === 200) {
      const { data: res, message, status } = response.data
      if (status !== 200) return this.message({ message: message, type: 'error' })
       
       this.idcard = res
      }
    })
  },
  gotopage2(row,bm,lb){
    this.$router.push({  
            name: 'machinedepartment',  
            params:{
              bm: bm,
              lb: lb,
              idcardnum:this.idcard.user_num,
              idcardname:this.idcard.user_name,
              gcmc:row.gcmc,
              engineering_id:row.engineering_id,
              gclxName:row.gclxName,
              gcdd:row.gcdd,
              dalx:row.dalx,
            },
        })
  },
  gotopage(row,bm,lb){
console.log(row,bm,lb)
    this.$router.push({  
            name: 'machinedepartment',  
            params:{
              bm: bm,
              lb: lb,
              idcardnum:this.idcard.user_num,
              idcardname:this.idcard.user_name,
              gcmc:row.gcmc,
              engineering_id:row.engineering_id,
              gclxName:row.gclxName,
              gcdd:row.gcdd,
              dalx:row.gclx,
            },
        })
  },
 
  gotopagesx(row,bm,lb){
console.log(row,bm,lb)
    this.$router.push({  
            name: 'machinedepartment',  
            params:{
              bm: bm,
              lb: lb,
              idcardnum:this.idcard.user_num,
              idcardname:this.idcard.user_name,
              gcmc:row.ajtm,
              engineering_id:row.files_id,
              gclxName:row.gclxName,
              gcdd:row.gcdd,
              dalx:row.gclx,
            },
        })
  },
  },
  
  beforeDestroy() {
   	this.stopPushInfos() //关闭推送
		this.websocket.close();
  },

}
</script>

<style scoped lang='less'>
.successHint {
  font-size: 28px;
  color: #1ABC9C;
  font-weight: 700;
  width: 100%;
  text-align: center;
}
.gotobtnbox{
    width: 60%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
    .gotobtn {
      padding: 10px;
      border: 1px solid #dcdcdc;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,0.15);
    }
    .gotobtn:hover {
      background-color: #596eed;
      border: 1px solid #596eed;
      color: #fff;
    }
  }
  .dv_bt_buttoncommit:active{
      opacity: 0.3;    //这里重要，就是通过这个透明度来设置
  }
  .ytjbox {
    width: 100%;
    height: 100%;
    background: url('../../../assets/ytjbg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .divbox {
      width: 50%;
      height: 60%;
      // background-color: #fff;
      text-align: center;
      margin: 25px 4%;
      border-radius: 20px;
      // box-shadow: 0px 0px 30px #242f7c;
      padding: 8px;
      box-sizing: border-box;

      position: absolute;
      top: 20%;
      left: 47%;
      transform: translate(-50%);
    }
    .div1 {
      background: #fff url('../../../assets/idbg.png') no-repeat;
      background-position: center ;
      background-size: 50%;
      .hintTxttitle {
        font-size: 24px;
        font-weight: 700;
        width: 100%;
        text-align: center;
      }
      .hintTxt {
        display: inline-block;
        width: 55%;
        padding: 30px 50px;
        color: #e92d0c;
        font-weight: 700;
        font-size: 20px;
      }

    }
    
    .div2 {
      background: #fff url('../../../assets/2.png') no-repeat;
      background-position: center ;
      background-size: contain;
      div {
        background: url('../../../assets/2-1.png')no-repeat;
      }
    }
    
    .div3 {
      background: #fff url('../../../assets/3.png') no-repeat;
      background-position: center ;
      background-size: contain;
      div {
        background: url('../../../assets/3-1.png')no-repeat;
      }
    }
    
    .div4 {
      background: #fff url('../../../assets/4.png') no-repeat;
      background-position: center ;
      background-size: contain;
      div {
        background: url('../../../assets/4-1.png')no-repeat;
      }
    }
    .div5 {
      background: #fff url('../../../assets/5.png') no-repeat;
      background-position: center ;
      background-size: contain;
      div {
        background: url('../../../assets/5-1.png')no-repeat;
      }
    }
    .div6 {
      background: #fff url('../../../assets/6.png') no-repeat;
      background-position: center ;
      background-size: contain;
      div {
        background: url('../../../assets/6-1.png')no-repeat;
      }
    }
  }
</style>
