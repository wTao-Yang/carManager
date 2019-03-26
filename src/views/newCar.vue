<template>
  <div class="newCar">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="车辆名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="变速箱">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="手动" value="0"></el-option>
          <el-option label="自动" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
    <el-date-picker
      v-model="value5"
      type="year"
      placeholder="选择年">
    </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item> -->
      <el-form-item label="图片上传">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8088/uploads"
          multiple
          limit="5"
          list-type="picture"
          name='imageFile'
          :fileList="fileList"
          :http-request='postImg'
          :on-exceed="exceed"
          :before-remove="removeFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传5张图片</div>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助" value="0"></el-radio>
          <el-radio label="线下场地免费" value="1"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="年险到期时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="车主介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="技术评估">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploads} from './../api/index.js'
import axios from  'axios'
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      fileList:[],
      fileName:'http://localhost:8088/1553610717252-benten.jpg,http://localhost:8088/1553610764391-benten4.jpg'
    };
  },
  created(){
    let file=this.fileName.split(',')
    let self=this;
    file.forEach((item)=>{
      let name=item.split('/')
      self.fileList.push({name:`${name[name.length - 1]}`,url:item})
    })
  },
  methods: {
    removeFile(file,fileList){
      debugger
      let index=fileList.findIndex((item)=>{ return item.name==file.name })
      this.fileList.splice(index,1)
    },
    exceed(){
      //超限弹窗
    },
    postImg(img){
      console.log(img)
      let formData = new FormData();
      formData.append("imageFile", img.file);
      formData.append("carId", '1231414');
      formData.append("userName", '123456');
        // uploads({formData},result => {
        //   if (result.data.code == 0) {
        //     this.$toast.success("上传成功");
        //   } else {
        //     this.$toast.error("上传失败");
        //   }
        // });
              axios
        .post("http://localhost:8088/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(result => {
          if (result.data.code == 0) {
            this.fileList.push(result.data.url)
          } else {
          }
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    submit(file){
      console.log(file)
    }
  }
};
</script>


<style lang="scss">
.newCar {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  /deep/ .el-upload-list__item-thumbnail{
    width: 110px;
  }
}
</style>
