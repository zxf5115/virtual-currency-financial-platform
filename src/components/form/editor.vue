<template>
  <div>
    <froala :config="config" v-model="content"></froala>
  </div>
</template>

<script>
  import VueFroala from 'vue-froala-wysiwyg';
  import Axios from 'axios';
  import jQuery from 'jquery'
  export default {
    editor: null,
    props: {
      value: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        config: {
          placeholder: "",
          language: "zh_cn", //中文
          width: 950,
          heightMin: 300,
          heightMax: 800,
          charCounterCount: false, //是否显示字数
          colorsHEXInput: false, //关闭16进制色值
          toolbarSticky: false, //操作栏是否自动吸顶
          quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'],//快速插入项
          secondtoolbar: false,
          allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
          imageMove: true, //图片是否能拖动
          imageDefaultDisplay: 'inline', //图片为行级元素
          imageUploadURL: this.$http.adornUrl('/file/editor_picture'), //图片上传地址
          fileUploadURL: this.$http.adornUrl('/file/editor_file'),//上传url
          requestHeaders: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          events: {
            "initialized":(e, editor)=>{
              this.editor = editor
            }
          }
        },
        content: this.value,
      };
    },
    watch: {
      value: function(val) {
        this.content = val;
      },
    }
  }
</script>
