<template>
  <div>
    <file-archiving :source="Architecture" :save="save" :updateV="update_v" :download="download" :importV="import_v" :exportV="export_v"></file-archiving>
  </div>
</template>

<script>
import FileArchiving from "./FileArchiving"
export default {
  components: {
    FileArchiving: FileArchiving
  },
  data() {
    return {
      Architecture: 'Architecture',
      save: '/v1/file_archive/architecture/save',  // 添加
      update_v: '/v1/file_archive/architecture/update',  // 更新
      download: '/v1/file_archive/architecture/download_model',  // 下载模板
      import_v: '/v1/file_archive/architecture/import',  // 导入
      export_v: '/v1/file_archive/architecture/export' // 导出
    }
  },

  created() {
    
  },

  mounted() {

  },

  methods: {
    
  },

  watch: {
    
  }
}
</script>
<style lang="less" scoped>

</style>
