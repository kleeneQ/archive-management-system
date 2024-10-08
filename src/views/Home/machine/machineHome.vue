<template>
  <div class='ytjbox'>
    <div class="divbox div1 dv_bt_buttoncommit" @click="gotopage('/machineHome/machineIdCard','DICT_CDLB-1')"><div class="divtext"></div></div>
    <div class="divbox div2 dv_bt_buttoncommit" @click="gotopage('/machineHome/machineIdCard','DICT_CDLB-2')"><div class="divtext"></div></div>
    <div class="divbox div3 dv_bt_buttoncommit" @click="gotopage('/machineHome/machineIdCard','DICT_CDLB-3')"><div class="divtext"></div></div>
    <div class="divbox div4 dv_bt_buttoncommit" @click="gotopage('/machineHome/machineIdCard','DICT_CDLB-4')"><div class="divtext"></div></div>
    <div class="divbox div5 dv_bt_buttoncommit" @click="gotopage('/machineHome/machineResult')"><div class="divtext"></div></div>
    <div class="divbox div6 dv_bt_buttoncommit" @click="gotopage('/machineHome/machineCheckResult')"><div class="divtext"></div></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
  // type your function
  gotopage(url,bm){
    this.$router.push({  
            path: url,  
            query: {
              bm: bm,
            }, 
        })
  }
 
  },
}
</script>

<style scoped lang='less'>
.dv_bt_buttoncommit{
  }
  .dv_bt_buttoncommit:active{
      opacity: 0.3;    //这里重要，就是通过这个透明度来设置
  }
  .ytjbox {
    width: 100%;
    height: 100%;
    background: url('../../../assets/ytjbg.png') no-repeat;
    background-size: 100% 100%;
    padding: 150px 130px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .divbox {
      width: 25%;
      height: 40%;
      background-color: #fff;
      text-align: center;
      margin: 25px 4%;
      border-radius: 20px;
      box-shadow: 0px 0px 30px #242f7c;
      padding: 8px;
      box-sizing: border-box;
      position: relative;
      .divtext {
        position: absolute;
        bottom: 10%;
        left: 0;
        width: 100%;
        height: 26px;
        text-align: center;
        background-position: center;
        background-size: contain;
      }
    }
    .div1 {
      background: #fff url('../../../assets/1.png') no-repeat;
      background-position: center ;
      background-size: contain;
      div {
        background: url('../../../assets/1-1.png')no-repeat;
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
