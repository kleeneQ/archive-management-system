<template>
  <div  >
    <el-scrollbar >
    <!-- 基本信息 -->
    <table class="mailTable" >
      <tr>
        <thead>基本信息</thead>
      </tr>
      <tr >
        <td class="column">项目名称：</td>
        <td colspan="3">{{Engineeringdetails.gcmc}}</td>
      </tr>
      <tr >
        <td class="column">项目档号：</td>
        <td colspan="3">{{Engineeringdetails.gcdh}}</td>
      </tr>
      <tr >
        <td class="column">项目类型：</td>
        <td >{{Engineeringdetails.gclxName}}</td>
        <td class="column">项目地点：</td>
        <td >{{Engineeringdetails.gcdd}}</td>
      </tr>
      <tr >
        <td class="column" v-if="Engineeringdetails.xmsl">项目属类：</td>
        <!-- <td >{{Engineeringdetails.xmsl}}</td> -->
        <td v-if="Engineeringdetails.xmsl">
           <el-cascader
           disabled
            style="width: 100%;"
            :options="projectCategory"
            expand-trigger="hover"
            :props="cascaderProps"
            v-model="Engineeringdetails.xmsl"
            clearable
            change-on-select
          ></el-cascader>
        </td>
        <td class="column" v-if="Engineeringdetails.xmzbnf">工程中标年份：</td>
        <td v-if="Engineeringdetails.xmzbnf">{{Engineeringdetails.xmzbnf}}</td>
      </tr>
      <tr >
        <td class="column">建设单位：</td>
        <td >{{Engineeringdetails.jsdw}}</td>
        <td class="column">施工单位：</td>
        <td >{{Engineeringdetails.sgdw}}</td>
      </tr>
      <tr >
        <td class="column">勘察单位：</td>
        <td >{{Engineeringdetails.kcdw}}</td>
        <td class="column">设计单位：</td>
        <td >{{Engineeringdetails.sjdw}}</td>
      </tr>
      <tr >
        <td class="column">监理单位：</td>
        <td >{{Engineeringdetails.jldw}}</td>
        <td class="column">用地规划许可证号：</td>
        <td >{{Engineeringdetails.ydghxkzh}}</td>
      </tr>
      <tr >
        <td class="column">立项批准文号：</td>
        <td >{{Engineeringdetails.lxpzwh}}</td>
        <td class="column">规划许可证号：</td>
        <td >{{Engineeringdetails.ghxkzh}}</td>
      </tr>
      <tr >
        <td class="column">用地许可证号：</td>
        <td >{{Engineeringdetails.ydxkzh}}</td>
        <td class="column">工程结算：</td>
        <td >{{Engineeringdetails.gcjs}}</td>
      </tr>
      <tr >
        <td class="column">工程总造价：</td>
        <td >{{Engineeringdetails.gczj}}</td>
        <td class="column">用地面积：</td>
        <td >{{Engineeringdetails.zydmj}}</td>
      </tr>
      <tr >
        <td class="column">总建筑面积：</td>
        <td >{{Engineeringdetails.zjzmj}}</td>
        <td class="column">地形图号：</td>
        <td >{{Engineeringdetails.dxtxh}}</td>
      </tr>
      <tr >
        <td class="column">附注：</td>
        <td colspan="3">{{Engineeringdetails.fz}}</td>
      </tr>
    </table>

    <!-- 归档信息 -->
    <table class="mailTable" >
      <tr>
        <thead>归档信息</thead>
      </tr>
      <tr >
        <td class="column">录入人：</td>
        <td >{{Engineeringdetails.lrr}}</td>
        <td class="column">录入时间：</td>
        <td >{{Engineeringdetails.lrsj}}</td>
      </tr>
          <tr >
            <td class="column">总卷数：</td>
            <td >{{FileCount.filesNum}}</td>
            <td class="column">文字（页）：</td>
            <td >{{FileCount.wzNum}}</td>
            
          </tr>
          <tr >
            <td class="column">图纸：</td>
            <td >0（卷）{{FileCount.tzNum}}（张）</td>
            <td class="column">底片：</td>
            <td >{{FileCount.dpNum}}</td>
          </tr>
          <tr >
            <td class="column">照片：</td>
            <td >{{FileCount.zpNum}}</td>
            <td class="column">光盘：</td>
            <td >{{FileCount.gpNum}}</td>
          </tr>
      <tr >
        <td class="column">保管期限：</td>
        <td >{{Engineeringdetails.bgqxName}}</td>
        <td class="column">密级：</td>
        <td >{{Engineeringdetails.mjName}}</td>
      </tr>
      <tr >
        <td class="column">进馆日期：</td>
        <td >{{Engineeringdetails.jgrq | formatDate}}</td>
        <td class="column">移交单位：</td>
        <td >{{Engineeringdetails.yjdw}}</td>
      </tr>
    </table>
     <!-- 排检与编号 -->
    <table class="mailTable" >
      <tr>
        <thead>排检与编号</thead>
      </tr>
      <tr >
        <td class="column">档号：</td>
        <td >{{Engineeringdetails.gcdh}}</td>
        <td class="column">存放位置起始号：</td>
        <td >
           <div class="cdyjstyle" v-for="(item,index) in FilePosition" :key="index">
            <template v-if="(index+1) !== FilePosition.length">
              {{item}}、
            </template>
            <template v-if="(index+1) == FilePosition.length">
              {{item}}
            </template>
          </div>
        </td>
      </tr>
      <!-- <tr >
        <td class="column">存放位置起始号：</td>
        <td colspan="3">{{Engineeringdetails.cfwzqsh}}</td>
      </tr> -->
    </table>
  </el-scrollbar>
  </div>
</template>

<script>

import {
  searchEngineeringList,
  searchEngineeringDownload,
  searchEngineeringEngineeringId,
  searchFilePosition,
  getSearchFileCount,
} from '@/api/RecorSearch/recorsearch'
import {
  getEngineeringType
} from '@/api/digitization/projectAPI'
import {
  getArchivesCateList
} from '@/api/archivesCate'
export default {
  name: 'detailsEngineering',
  data () {
    return {
     Engineeringdetails:{},
     engineeringType:[],//项目工程类型
     storagePeriod: [], // 保管期限
     secretGrade: [], // 密级
     FilePosition:[],//存放位置
     FileCount:{},//归档信息
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'type_code',
        label: 'type_name',
        children: 'child',
        emitPath: false
      },
      xmsl:''
    }
  },
  props: {
    ID: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
  },
  components: {
    
  },
  computed: {
    
  },
  watch: {
    source: {
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        
        this.zt = newVal
      }
    },
     ID:{
      immediate:true,
      deep: true,
      handler(newVal, oldVal) {
        
        this.Engineering_id = newVal
        
      }
    }
  },
  created () {
    this.getEngineeringTypeFun() // 工程类型
    this.getStoragePeriod()  // 保管期限
    this.getSecretGrade()  // 密级
    this.searchFilePositionFun() //存放位置
     this.getSearchFileCountFun() //归档信息
  },
  mounted () {
    
  },
  methods: {
    // 递归判断列表，把最后的child设为undefined
    manageProjectCate(data) {
      console.log(data)
      for(var i = 0; i < data.length; i++){
        if(data[i].child === undefined || data[i].child.length < 1){
          // children若为空数组，则将children设为undefined
          data[i].child = undefined
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.manageProjectCate(data[i].child)
        }
      }
      console.log(data)
      this.projectCategory = data
    },
    //项目属类 处理
    showProjectInfoDialog(row) {
      let xmsl = ''

      console.log(row.gclx)
      this.engineeringType.forEach(v => {
        if (row.gclx === v.type_code) {
          console.log(v.type_code)
          const q = [].concat(v)
          this.manageProjectCate(q[0].child)
        }
      })
      // if (row.gcdh !== null) {
      //   let gcdh1 = row.gcdh.split('-')[0]
      //   var fir = gcdh1.slice(0,1)
      //   var sec = gcdh1.slice(1,3)
      //   var tre = gcdh1.slice(3,5)
      //   if (sec !== '' && sec !== '00') {
      //     if (sec[0] === '0') {
      //       sec = sec[1]
      //     } else {
      //       sec = gcdh1.slice(1,3)
      //     }
      //   } else {
      //     sec = ''
      //   }
      //   if (tre !== '' && tre !== '00') {
      //     if (tre[0] === '0') {
      //       tre = '.' + tre[1]
      //     } else {
      //       tre = gcdh1.slice(3,5)
      //     }
      //   } else {
      //     tre = ''
      //   }
      //   if (sec === '' && tre === '') {
      //     xmsl = ''
      //   } else {
      //     xmsl = fir + sec + tre
      //   }
      //   console.log(xmsl)
      //   this.xmsl = xmsl
      //   this.Engineeringdetails.xmsl = xmsl
      //   // this.$set(this.projectInfoForm, 'gclx', xmsl)
      //   // if (row.gcdh.length > 5) {
      //   //   this.$set(this.projectInfoForm, 'gcnx', row.gcdh.substring(6,10))
          
      //   // }
      //   // console.log(this.projectInfoForm.gclx)
      // }
     
    },
      //归档信息
    getSearchFileCountFun(){
      const q ={
        engineering_id:this.Engineering_id
      }
      getSearchFileCount(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FileCount = res
        }
      })
    },

    searchFilePositionFun(){
      const q = {
        engineering_id:this.Engineering_id,
      }
      searchFilePosition(q).then(response =>{
       if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
         
         this.FilePosition  = res.position
        }
      })
    },
    //获取项目详情 数据
    searchEngineeringEngineeringIdFun(){
      this.Engineeringdetails = {}
      const q = {
        engineering_id:this.Engineering_id,
        zt:this.zt
      }
      searchEngineeringEngineeringId(q).then(response =>{
        
        if (response.status === 200) {
        const { data: res, message, status } = response.data
        if (status !== 200) return this.message({ message: message, type: 'error' })
        this.showProjectInfoDialog(res)
         this.engineeringType.map(item =>{
           if (res.gclx === item.type_code) {
               res.gclxName = item.type_name
              }
         })
         this.storagePeriod.map(item =>{
           if (res.bgqx === item.bm) {
               res.bgqxName = item.mc
              }
         })
         this.secretGrade.map(item =>{
           if (res.mj === item.bm) {
             res.mjName = item.mc
            }
         })
        console.log(this.Engineeringdetails)
        this.Engineeringdetails = res
        }
      })
    },
        // 获取工程类型
    getEngineeringTypeFun() {
      getArchivesCateList().then(response => {
        
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          this.engineeringType = res
          
          setTimeout(() => {
        this.searchEngineeringEngineeringIdFun()
      }, 500)
        }
      }).catch(error => {
        console.log(error)
      })
    },
        // 保管期限
    getStoragePeriod() {
      const q = {
        bm: "BGQX_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.storagePeriod  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 密级
    getSecretGrade() {
      const q = {
        bm: "MJ_DIC"
      }
      getEngineeringType(q).then(response => {
        if (response.status === 200) {
          const { data: res, message, status } = response.data
          if (status !== 200) return this.message({ message, type: 'error' })
          this.secretGrade  = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-scrollbar {
  padding-bottom: 30px;
  box-sizing: border-box;
  
	.el-scrollbar__wrap {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
    .mailTable {width: 100%;}
    .mailTable tr thead {line-height: 40px;font-size: 18px;font-weight: 700;}
　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 14px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 280px; height: 45px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
    .mailTable tr td:nth-child(odd) {text-align: right;}
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
    .column-top {width: 80%;}
</style>