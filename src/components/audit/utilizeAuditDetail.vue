<template>
  <div>
    <div class="block">
      <el-timeline>
         <el-timeline-item
          v-for="(activity, index) in AuditDetailDatas"
          :key="index"
          :timestamp="activity.create_time"
          placement="top">
            <el-row>
            <el-col :span="6">
              <div v-if="activity.submit_user !== null">{{activity.submit_user}} </div>
              <div v-if="activity.check_user !== null">{{activity.check_user}} </div>
              </el-col>
              <el-col :span="18">
              <el-row v-if="index !== 0"> 
                  <el-col :span="3">审核结果：</el-col>
                  <el-col :span="21">{{activity.check_result}}</el-col>
              </el-row>
                <el-row style="margin-bottom:10px"> 
                  <el-col :span="3">审核描述：</el-col>
                  <el-col :span="21">{{activity.check_describe}}</el-col>
                </el-row>
              </el-col>
            </el-row>
        </el-timeline-item>

   
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {
  querySystemDictionary
} from '@/api/systemDictionary'
export default {
  name:'AuditDetail',
  props:{
    AuditDetailDatas:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      file_status:''
    }
  },
}
</script>

<style>
  .el-timeli-right{
    float: right;
    width: 60%;
    padding-right: 15%;
    box-sizing: border-box;
  }
  .el-timeline-item {
    padding-bottom: 80px;
    height: 100%;
    box-sizing: border-box;
  }
  .block{
    height: 100%;
  }
</style>