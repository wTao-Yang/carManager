<template>
  <div class="wheel">
    <div class="item" v-for="(item,index) in wheelList" :key="index">
      <div class="item_title">轮播图{{ index+1 }}</div>
      <div>
        <el-input placeholder="请输入轮播图片地址" v-model="item.img">
          <template slot="prepend">轮播图片地址</template>
          <!-- <el-button slot="append" @click="clickButton(index)" icon="el-icon-plus"></el-button> -->
          <el-upload
            ref="upload"
            slot="append"
            class="upload-demo"
            action="http://localhost:8088/uploads"
            multiple
            :limit="1"
            list-type="picture"
            name="imageFile"
            :fileList="fileList"
            :http-request="postImg"
            :on-exceed="exceed"
            :show-file-list="false"
            :before-remove="removeFile"
          >
            <i class="el-icon-upload"></i>
            <!-- <div class="el-upload__tip" slot="tip">只能上传5张图片</div> -->
          </el-upload>
        </el-input>
        <div style="height:10px"></div>
        <el-input placeholder="请输入轮播图跳转连接" v-model="item.carId">
          <template slot="prepend">轮播图跳转连接</template>
          <el-button slot="append" @click="setWheel(item)">提交</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "wheel",
  data() {
    return {
      wheelList: [],
      index: 0
    };
  },
  created() {
    this.getWheel();
  },
  methods: {
    clickButton(index) {
      this.index = index;
      this.$refs.upload.onClick();
    },
    postImg(img) {
      let formData = new FormData();
      formData.append("imageFile", img.file);
      formData.append("carId", "1231414");
      formData.append("userName", "123456");
      axios
        .post("http://localhost:8088/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(result => {
          if (result.data.code == 0) {
            this.$message({ message: "上传成功", type: "success",duration:'1500' });
            this.wheelList[this.index].img=result.data.data.url;
          } else {
          }
        });
    },
    getWheel() {
      let self = this;
      this.$api.getWheel({}, data => {
        self.wheelList = data.data.result;
      });
    },
    setWheel(item) {
      if (item.img == "") {
        this.$message({ message: "轮播图片不能为空", type: "error",duration:'1500' });
        return;
      }
      if (item.carId == "") {
        this.$message({ message: "跳转连接不能为空", type: "error",duration:'1500' });
        return;
      }
      this.$api.setWheel(
        { wheelId: item.wheelId, img: item.img, carId: item.carId },
        data => {
          if (data.code == 0) {
            this.$message({ message: "操作成功", type: "success",duration:'1500' });
            this.getWheel();
          } else {
            this.$message({ message: "操作失败", type: "error",duration:'1500' });
          }
        }
      );
    }
  }
};
</script>


<style lang="scss" scoped>
.item {
  width: 80%;
  &_title {
    color: #666;
    margin: 5px 0;
  }
}
</style>
