<template>
  <div class="newCar">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="车辆名称" prop="carTitle">
        <el-input v-model="form.carTitle" placeholder="车辆名称"></el-input>
      </el-form-item>
      <el-form-item label="购车时间" prop="buyTime">
        <el-date-picker v-model="form.buyTime" type="month" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="行驶里程" prop="mileage">
        <el-input v-model="form.mileage" placeholder="行驶里程"></el-input>
      </el-form-item>
      <el-form-item label="过户次数" prop="transferTimes">
        <el-select v-model="form.transferTimes" placeholder="请选择">
          <el-option label="0" value="0"></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌" prop="carBrand">
        <el-select v-model="form.carBrand" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.brandId"
      :label="item.brand"
      :value="item.brand">
    </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出售价格" prop="price">
        <el-input v-model="form.price" placeholder="出售价格"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" prop="carImg">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8088/uploads"
          multiple
          :limit="5"
          list-type="picture"
          name="imageFile"
          :fileList="fileList"
          :http-request="postImg"
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
      </el-form-item>-->
      <!-- <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助" value="0"></el-radio>
          <el-radio label="线下场地免费" value="1"></el-radio>
        </el-radio-group>
      </el-form-item>-->

      <el-form-item label="年险到期时间">
        <el-date-picker v-model="form.annualRisk" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="商业险到期时间">
        <el-date-picker v-model="form.compulsoryInsurance" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="交强险到期时间">
        <el-date-picker v-model="form.commercialInsurance" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="变速箱">
        <el-select v-model="form.variableSpeed" placeholder="请选择">
          <el-option label="手动" value="0"></el-option>
          <el-option label="自动" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排放标准">
        <el-input v-model="form.emissionStandard" placeholder="排放标准"></el-input>
      </el-form-item>
      <el-form-item label="排放量">
        <el-input v-model="form.emissions" placeholder="排放量"></el-input>
      </el-form-item>
      <el-form-item label="车主介绍" prop="introduction">
        <el-input type="textarea" v-model="form.introduction" placeholder="车主介绍"></el-input>
      </el-form-item>
      <el-form-item label="技术评估" prop="assess">
        <el-input type="textarea" v-model="form.assess" placeholder="技术评估" prop="assess"></el-input>
      </el-form-item>
      <div style="height:50px"></div>
      <el-form-item class="my_button">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploads, newCar, getDetail } from "./../api/index.js";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        carTitle: "",
        buyTime: "",
        carBrand: "",
        mileage: "",
        price: "",
        annualRisk: "",
        compulsoryInsurance: "",
        commercialInsurance: "",
        emissionStandard: "",
        emissions: "",
        transferTimes: "",
        variableSpeed: "",
        assess: "",
        carImg: "",
        applyId: "",
        carId: "",
        introduction: ""
      },
      rules: {
        carTitle: [
          { required: true, message: "车辆名称不能为空", trigger: "blur" }
        ],
        buyTime: [
          { required: true, message: "购车时间不能为空", trigger: "blur" }
        ],
        carBrand: [
          {
            required: true,
            message: "车辆品牌不能为空",
            trigger: "blur"
          }
        ],
        mileage: [
          {
            required: true,
            message: "行驶里程不能为空",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "出售价格不能为空",
            trigger: "blur"
          }
        ],
        transferTimes: [
          { required: true, message: "过户次数不能为空", trigger: "blur" }
        ],
        assess: [
          { required: true, message: "车辆评估不能为空", trigger: "blur" }
        ],
        carImg: [
          { required: true, message: "车辆图片不能为空", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "车主介绍不能为空", trigger: "blur" }
        ]
      },
      fileList: [],
      options:[],
      fileName:
        "http://localhost:8088/1553610717252-benten.jpg,http://localhost:8088/1553610764391-benten4.jpg"
    };
  },
  created() {
    if (this.$route.query.id) {
      this.form.carId = this.$route.query.id;
      this._getDetail();
    }
    this._getBrand()
  },
  methods: {
     _getBrand(){
      this.$api.getBrand({},data=>{
        this.options = data.data.result
      })
    },
    _getDetail() {
      getDetail({ carId: this.form.carId }, data => {
        this.form = data;
        if (data.carImg != "") {
          let file = data.carImg.split(",");
          let self = this;
          file.forEach(item => {
            let name = item.split("/");
            self.fileList.push({ name: `${name[name.length - 1]}`, url: item });
          });
        }
      });
    },
    removeFile(file, fileList) {
      let index = fileList.findIndex(item => {
        return item.name == file.name;
      });
      this.fileList.splice(index, 1);
    },
    exceed() {
      //超限弹窗
      this.$message({ message: "只能上传5张图片！", type: "error",duration:'1500' });
    },
    postImg(img) {
      let formData = new FormData();
      formData.append("imageFile", img.file);
      formData.append("carId", "1231414");
      formData.append("userName", "123456");
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
            this.fileList.push(result.data.data);
          } else {
          }
        });
    },
    onSubmit() {
      let imgList = [];
      this.fileList.forEach(item => {
        imgList.push(item.url);
      });
      this.form.carImg = imgList.join(",");
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.buyTime = this.formatDate(this.form.buyTime);
          if(this.form.annualRisk!=''){
             this.form.annualRisk = this.formatDate(this.form.annualRisk);
          }
          if(this.form.compulsoryInsurance!='')
          this.form.compulsoryInsurance = this.formatDate(
            this.form.compulsoryInsurance
          );
          if(this.form.commercialInsurance!='')
          this.form.commercialInsurance = this.formatDate(
            this.form.commercialInsurance
          );
          newCar(this.form, data => {
            if (data.isSuccess) {
              this.$message({ message: "发布成功", type: "success",duration:'1500' });
              this.$router.push({name: 'home'})
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit(file) {
      console.log(file);
    },
    formatDate(val, type) {
      let date = new Date(val);
      if (type == 1)
        return `${date.getFullYear().toString()}年${(
          date.getMonth() + 1
        ).toString()}月`;
      else
        return `${date.getFullYear().toString()}-${(
          date.getMonth() + 1
        ).toString()}-${date.getDate().toString()}`;
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
  /deep/ .el-upload-list__item-thumbnail {
    width: 110px;
  }
  .my_button {
    width: 80%;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    margin: 0 !important;
    padding: 10px 0;
    background-color: rgb(84, 92, 100);
  }
}
</style>
