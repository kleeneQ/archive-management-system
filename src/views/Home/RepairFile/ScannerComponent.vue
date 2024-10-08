<template>
  <div>
    <object id="KODAKSCANSDK" classid="CLSID:A2AC9A1D-171D-4E24-BF19-B08228F2DAA0" codebase="KODAKSCANSDK.CAB"></object>
    <!-- 显示捕获的图像 -->
    <img v-if="capturedImage" :src="capturedImage" alt="Captured Image" />

    <!-- 选择扫描仪按钮 -->
    <button @click="selectScanner">Select Scanner</button>

    <!-- 打开扫描仪按钮 -->
    <button @click="openScanner">Open Scanner</button>

    <!-- 关闭扫描仪按钮 -->
    <button @click="closeScanner">Close Scanner</button>

    <!-- 扫描文件按钮 -->
    <button @click="scanFile">Scan File</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      capturedImage: null,
      scanner: null, // ActiveX控件对象
    };
  },
  mounted() {
    // 在组件挂载后创建ActiveX控件对象
    this.createScanner();
  },
  methods: {
    createScanner() {
      try {
        // 创建ActiveX对象
        this.scanner = new ActiveXObject("KODAKSCANSDK.Program");
        console.log("Scanner initialized successfully.");
      } catch (e) {
        console.error("Failed to create ActiveX object:", e);
      }
    },
    selectScanner() {
      if (this.scanner) {
        try {
          // 执行选择扫描仪的操作
          this.scanner.SelectScanner();
        } catch (e) {
          console.error("Error selecting scanner:", e);
        }
      } else {
        console.error("ActiveX scanner not initialized.");
      }
    },
    openScanner() {
      if (this.scanner) {
        try {
          // 执行打开扫描仪的操作
          this.scanner.OpenScanner();
        } catch (e) {
          console.error("Error opening scanner:", e);
        }
      } else {
        console.error("ActiveX scanner not initialized.");
      }
    },
    closeScanner() {
      if (this.scanner) {
        try {
          // 执行关闭扫描仪的操作
          this.scanner.CloseScanner();
        } catch (e) {
          console.error("Error closing scanner:", e);
        }
      } else {
        console.error("ActiveX scanner not initialized.");
      }
    },
    scanFile() {
      if (this.scanner) {
        try {
          // 执行扫描文件的操作，并获取捕获的图像数据
          const imageData = this.scanner.ScanFile(settings);

          // 将捕获的图像数据转换为Data URL，并显示在页面上
          this.capturedImage = "data:image/jpeg;base64," + imageData;
        } catch (e) {
          console.error("Error scanning file:", e);
        }
      } else {
        console.error("ActiveX scanner not initialized.");
      }
    },
  },
};
</script>
