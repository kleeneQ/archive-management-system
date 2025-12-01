<template>
  <div class='welcome'>
    <div class="text eff">欢迎使用管理系统</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    prop: {
      type: String,
      required: false,
    },
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  // type your function
  },
  created () {

  },
  mounted () {

  },
  updated () {

  },
  destroyed () {

  },
  filters: {

  },
}
</script>
<style scoped lang='less'>
.welcome{
  width: 100%;
  height: 100%;
  background:linear-gradient(#c9e2e3,#a9d1f8) ;

}
  .text {
    font-family:"微软雅黑", "Dosis", sans-serif;
    font-size: 60px;
    text-align: center;
    font-weight: bold;
    line-height:200px;
    text-transform:uppercase;
    position: relative;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
}
.eff{
    color:#fefefe;
    text-shadow:
    0px 1px 0px #c0c0c0,
    0px 2px 0px #b0b0b0,
    0px 3px 0px #a0a0a0,
    0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.6);
}
</style>
