<template>
  <div class="home">
    <div class="main">
      <div class="fabu">
        <el-button type="primary" @click="openMes()">新建管理员</el-button>
              <el-input placeholder="请输入管理帐号" v-model="search" class="input-with-select">
        <el-button slot="append" @click="searchTitle" icon="el-icon-search"></el-button>
      </el-input>
      </div>
      <el-table class="table" :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="date" label="日期" width="200"></el-table-column> -->
        <el-table-column label="管理员帐号" prop="adminName"></el-table-column>
        <el-table-column label="管理员密码" prop="passWord"></el-table-column>
        <el-table-column label="权限等级" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteAdmin(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="change"
        class="page"
        :page-size="5"
        background
        layout="prev, pager, next"
        :total="dataList.length"
      ></el-pagination>
    </div>
    <div class="message" v-if="showMes"></div>
    <div class="mes" v-if="showMes">
      <div class="mes_box">
        <div class="mes_title">{{ title }}</div>
        <div class="mes_main">
          <el-input placeholder="请输入帐号" v-model="adminName">
            <template slot="prepend">帐号</template>
          </el-input>
          <div style="height:10px"></div>
          <el-input placeholder="请输入密码" v-model="passWord" show-password>
            <template slot="prepend">密码</template>
          </el-input>
          <div style="height:10px"></div>
          <el-input placeholder="请再次输入密码验证" v-model="vPassWord" show-password>
            <template slot="prepend">验证</template>
          </el-input>
          <div style="height:10px"></div>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="closeMes">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    this.getAdmin();
  },
  methods: {
    getAdmin() {
      let self = this;
      this.$api.getAdmin({search:this.search}, data => {
        this.dataList = data;

        let self = this;
        this.dataList.forEach(item => {
          item.status = self.statusList[item.status];
        });

        this.tableData = this.dataList.slice(0, 5);
      });
    },
    searchTitle() {
      this.getAdmin();
    },
    submit() {
      if (this.adminName == "" || this.passWord == "") {
        this.$message({
          message: "帐号密码不能为空",
          type: "error",
          duration: "1500"
        });
        return;
      }
      if (this.passWord != this.vPassWord) {
        this.$message({
          message: "第二次密码输入错误",
          type: "error",
          duration: "1500"
        });
        return;
      }
      this.$api.setAdmin(
        {
          adminId: this.adminId,
          adminName: this.adminName,
          passWord: this.passWord
        },
        data => {
          if (data.isSuccess) {
            this.$message({
              message: "新建成功",
              type: "success",
              duration: "1500"
            });
            this.getAdmin();
            this.closeMes();
          }
        }
      );
    },
    handleClick(row) {
      this.title = "编辑管理";
      this.adminName = row.adminName;
      this.passWord = row.passWord;
      this.adminId = row.adminId;
      this.showMes = true;
      console.log(row);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    deleteAdmin(row) {
      this.$api.deleteAdmin({ adminId: row.adminId }, data => {
        if (data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: "1500"
          });
          this.getAdmin();
        }
      });
    },
    change(page) {
      this.tableData = this.dataList.slice((page - 1) * 5, page * 5);
    },
    openMes() {
      this.title = "新建管理";
      this.showMes = true;
      this.adminId = "";
      this.adminName = "";
      this.passWord = "";
      this.vPassWord = "";
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
      search:'',
      dataList: [],
      statusList: ["超级管理员", "普通管理员"],
      adminId: "",
      passWord: "",
      vPassWord: "",
      adminName: "",
      title: "",
      showMes: false,
      activeIndex2: "1",
      tableData: []
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
  width: 80%;
  margin: 0 auto;

  .fabu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding: 10px;
  }
}
.status_rej {
  font-size: 12px;
  color: red;
}
.input-with-select{
  width:250px;
}
</style>
