<template>
  <div class="home">
    <div class="main">
      <div style="display:flex;min-height:60%;">
        <div class="box">
          <div class="box_header">热门品牌导航设置</div>
          <el-form
            style="width:500px;margin:20px 20px"
            label-width="80px"
          >
            <el-form-item label="热门品牌1">
              <el-input v-model="brand1"><el-button slot="append">提交</el-button></el-input>
            </el-form-item>
            <el-form-item label="热门品牌2">
              <el-input v-model="brand2"><el-button slot="append">提交</el-button></el-input>
            </el-form-item>
            <el-form-item label="热门品牌3">
              <el-input v-model="brand3"><el-button slot="append">提交</el-button></el-input>
            </el-form-item>
            <el-form-item label="热门品牌4">
              <el-input v-model="brand4"><el-button slot="append">提交</el-button></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "hotBrand",
  components: {
    HelloWorld
  },
  methods: {
    submit() {},
    handleClick(row) {
      this.title = "编辑管理";
      this.adminName = row.id;
      this.passWord = row.passWord;
      this.showMes = true;
      console.log(row);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    deleteAdmin(row) {},
    openMes() {
      this.title = "新建管理";
      this.showMes = true;
    },
    closeMes() {
      this.showMes = false;
      this.adminName = "";
      this.passWord = "";
      this.vPassWord = "";
    }
  },

  data() {
    return {
        brand1:'',
        brand2:'',
        brand3:'',
        brand4:'',
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  // height: 80px;
  // width: 100%;
  // background-color: #42b983;
  // text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  /deep/ .el-menu {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }
  .flex {
    display: flex;
    div {
      margin: 0 15px;
    }
  }
}
.message {
  position: fixed;
  top: 0;
  padding-top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  overflow: hidden;
  z-index: 2045;
  background-color: black;
  opacity: 0.5;
}

.mes {
  position: fixed;
  top: 0;
  padding-top: 10%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  z-index: 2999;
  .mes_box {
    width: 500px;
    margin: 0 auto;
    border-radius: 3px;
    opacity: initial;
  }
  .mes_title {
    height: 40px;
    background-color: #fff;
    line-height: 40px;
  }
  .mes_main {
    padding: 20px 10px;
    background-color: #eee;
  }
}
.page {
  margin-top: 20px;
}
.main {
  margin: 0 auto;

  // background-color: #f6f6f6;
  // .table {
  //   height: 600px;
  // }
  .fabu {
    width: 100%;
    text-align: left;
    padding: 10px;
  }
}
.status_rej {
  font-size: 12px;
  color: red;
}
.box {
  margin: 20px 0;
  min-width: 100%;
  .box_header {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 10px;
    font-size: 20px;
  }
}
</style>
