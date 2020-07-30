<template>
  <div class="form-wrapper">
    <el-form ref="form" inline :model="form" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-divider>状态与格式</el-divider>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="文章置顶"
      >
      </el-switch>
      <el-divider>分类与标签</el-divider>
      <el-divider>特色图片</el-divider>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-divider>上传与编辑</el-divider>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        name="upload"
        :on-remove="handleRemove"
        :on-success="handleSuccss"
        multiple
        :limit="3"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>

      <div>
        <mavon-editor v-model="article" />
      </div>
    </el-form>
  </div>
</template>

<script>
  import findMdImgUrl from "@/utils/findMdImgUrl";
export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
      value: "",
      article: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleSuccss(res, file) {
      const reader = new FileReader();
      reader.readAsText(file.raw);
      /*var md = require("markdown-it")({
        html: false
      });*/
      let that = this;
      reader.onload = function(e) {
        // that.article = md.render("# a");
        findMdImgUrl(e.target.result);
        that.article = e.target.result;
      };
    },
    handleRemove() {
      this.article = "";
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  padding: 20px;
}
</style>
