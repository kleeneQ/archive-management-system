let FileSaver = require("file-saver")

export default {
  download: (dataBlob, fileName) => {
    FileSaver.saveAs(dataBlob, fileName)
  }
}