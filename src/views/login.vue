<template>
  <div class="login">
    <div class="box"/>

    <el-form
      :model="form"
      status-icon
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="帐号" prop="userNname">
        <el-input v-model="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="form.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        passWord: ""
      }
    };
  },
  created() {
    sessionStorage.removeItem("adminName");
  },
  methods: {
    submitForm(formName) {
      if (this.form.userName != "" && this.form.passWord != "") {
        this.$api.login(
          { adminName: this.form.userName, passWord: this.form.passWord },
          data => {
            if (data.code == 0) {
              this.$message({
                message: "登录成功",
                type: "success",
                duration: "1500"
              });
              sessionStorage.setItem("status", data.data.status);
              this.$router.push({ name: "home" });
            } else {
              this.$message({
                message: "帐号或密码错误",
                type: "error",
                duration: "1500"
              });
            }
          }
        );
      } else {
        this.$message({
          message: "请输入帐号和密码",
          type: "error",
          duration: "1500"
        });
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  position: absolute;
  right: 10%;
  top: 30%;
  height: 190px;
  padding: 40px 40px 10px 0px;
  background-color: #fff;
  border-radius: 10px;
  opacity: 0.5;
}
.demo-ruleForm {
  width: 500px;
  position: absolute;
  right: 10%;
  top: 30%;
  padding: 40px 40px 10px 0px;
  border-radius: 10px;
  text-align: left;
  /deep/ .el-button {
    width: 100px;
  }
}
.login {
  background: url("../assets/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  padding: 5%;
  line-height: 300px;
  height: 600px;
  background-color: #42b983;
}
</style>
