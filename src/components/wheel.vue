<template>
  <div class="wheel">
    <div class="item">
      <div class="item_title">轮播图1</div>
      <div>
        <el-input placeholder="请输入轮播图片地址" v-model="wheelList[0].img">
          <template slot="prepend">轮播图片地址</template>
          <!-- <el-button slot="append" @click="clickButton(index)" icon="el-icon-plus"></el-button> -->
          <el-upload
            
            :ref="'upload'+index"
            slot="append"
            class="upload-demo"
            :action="baseURL+'uploads'"
            multiple
            :limit="1"
            list-type="picture"
            name="imageFile"
            :http-request="postImg0"
            :on-exceed="exceed"
            :show-file-list="false"
          >
            <i class="el-icon-upload"></i>
            <!-- <div class="el-upload__tip" slot="tip">只能上传5张图片</div> -->
          </el-upload>
        </el-input>
        <div style="height:10px"></div>
        <el-input placeholder="请输入轮播图跳转连接" v-model="wheelList[0].carId">
          <template slot="prepend">轮播图跳转连接</template>
          <el-button slot="append" @click="setWheel(wheelList[0])">提交</el-button>
        </el-input>
      </div>
    </div>
        <div class="item">
      <div class="item_title">轮播图1</div>
      <div>
        <el-input placeholder="请输入轮播图片地址" v-model="wheelList[1].img">
          <template slot="prepend">轮播图片地址</template>
          <!-- <el-button slot="append" @click="clickButton(index)" icon="el-icon-plus"></el-button> -->
          <el-upload
            
            :ref="'upload'+index"
            slot="append"
            class="upload-demo"
            :action="baseURL+'uploads'"
            multiple
            :limit="1"
            list-type="picture"
            name="imageFile"
            :http-request="postImg1"
            :on-exceed="exceed"
            :show-file-list="false"
          >
            <i class="el-icon-upload"></i>
            <!-- <div class="el-upload__tip" slot="tip">只能上传5张图片</div> -->
          </el-upload>
        </el-input>
        <div style="height:10px"></div>
        <el-input placeholder="请输入轮播图跳转连接" v-model="wheelList[1].carId">
          <template slot="prepend">轮播图跳转连接</template>
          <el-button slot="append" @click="setWheel(wheelList[1])">提交</el-button>
        </el-input>
      </div>
    </div>
        <div class="item">
      <div class="item_title">轮播图1</div>
      <div>
        <el-input placeholder="请输入轮播图片地址" v-model="wheelList[2].img">
          <template slot="prepend">轮播图片地址</template>
          <!-- <el-button slot="append" @click="clickButton(index)" icon="el-icon-plus"></el-button> -->
          <el-upload
            
            :ref="'upload'+index"
            slot="append"
            class="upload-demo"
            :action="baseURL+'uploads'"
            multiple
            :limit="1"
            list-type="picture"
            name="imageFile"
            :http-request="postImg2"
            :on-exceed="exceed"
            :show-file-list="false"
          >
            <i class="el-icon-upload"></i>
            <!-- <div class="el-upload__tip" slot="tip">只能上传5张图片</div> -->
          </el-upload>
        </el-input>
        <div style="height:10px"></div>
        <el-input placeholder="请输入轮播图跳转连接" v-model="wheelList[2].carId">
          <template slot="prepend">轮播图跳转连接</template>
          <el-button slot="append" @click="setWheel(wheelList[2])">提交</el-button>
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
    exceed() {
      this.$message({
        message: "只能上传一个",
        type: "error",
        duration: "1500"
      });
      return
    },
    clickButton(index) {
      this.index = index;
      this.$refs.upload1.onClick();
    },
    postImg0(img){
      this.postImg(img,0)
    },
        postImg1(img){
      this.postImg(img,1)
    },
        postImg2(img){
      this.postImg(img,2)
    },
    postImg(img,index) {
      let formData = new FormData();
      formData.append("imageFile", img.file);
      // formData.append("carId", "1231414");
      // formData.append("userName", "123456");
      axios
        .post(this.baseURL + "uploadWheel", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(result => {
          if (result.data.code == 0) {
            this.$message({
              message: "上传成功",
              type: "success",
              duration: "1500"
            });
            this.wheelList[index].img = result.data.data.url;
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
        this.$message({
          message: "轮播图片不能为空",
          type: "error",
          duration: "1500"
        });
        return;
      }
      if (item.carId == "") {
        this.$message({
          message: "跳转连接不能为空",
          type: "error",
          duration: "1500"
        });
        return;
      }
      this.$api.setWheel(
        { wheelId: item.wheelId, img: item.img, carId: item.carId },
        data => {
          if (data.code == 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: "1500"
            });
            this.getWheel();
          } else {
            this.$message({
              message: "操作失败",
              type: "error",
              duration: "1500"
            });
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
