<template>
  <div >
    <div class="pdf">
      <pdf 
        ref="pdf"
        :src="pdfUrl">
      </pdf>
    </div>
  </div>
</template>

<script>

import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components:{
      pdf
  },
  data () {
    return {
       pdfUrl:"http://192.168.1.186:2011/file-api/web/sign/file/archives/dp985586003994824704/dp985586003994824704.pdf",
    }
  },
  props: {
    filespdfUrl:{
      type: String,
      default: ''
    },
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

<style scoped lang=''>

</style>
