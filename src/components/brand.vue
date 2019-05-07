<template>
  <div class="brand">
    <div class="main">
      <div class="fabu">
        <el-button type="primary" @click="openMes()">新建品牌</el-button>
        <el-input placeholder="请输入车辆名称" v-model="search" class="input-with-select">
          <el-button slot="append" @click="searchTitle" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <el-table class="table" :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="date" label="日期" width="200"></el-table-column> -->
        <el-table-column label="品牌 ID" prop="brandId"></el-table-column>
        <el-table-column label="品牌名称" prop="brand"></el-table-column>
        <el-table-column label="品牌介绍" show-overflow-tooltip prop="introduction"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteBrand(scope.row)">删除</el-button>
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
          <el-input placeholder="请输入品牌名称" v-model="brand">
            <!-- <template slot="prepend">帐号</template> -->
          </el-input>
          <div style="height:10px"></div>
          <el-input type="textarea" :rows="2" placeholder="请输入品牌介绍" v-model="introduction"></el-input>
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
import { getBrand } from "./../api/index.js";
import { debug } from "util";
export default {
  name: "brand",
  components: {
    HelloWorld
  },
  created() {
    this._getBrand();
  },
  methods: {
    _getBrand() {
      getBrand({ search: this.search }, data => {
        this.dataList = data.data.result;
        this.tableData = this.dataList.slice(0, 5);
      });
    },
    submit() {
      if (this.brand == "") {
        this.$message({
          message: "品牌名称不能为空",
          type: "error",
          duration: "1500"
        });
        return;
      }
      this.$api.setBrand(
        {
          brandId: this.brandId,
          brand: this.brand,
          introduction: this.introduction
        },
        data => {
          if (data.isSuccess) {
            this.$message({
              message: "新建成功",
              type: "success",
              duration: "1500"
            });
            this._getBrand();
            this.closeMes();
          }
        }
      );
    },
    handleClick(row) {
      this.title = "编辑品牌";
      this.brandId = row.brandId;
      this.brand = row.brand;
      this.introduction = row.introduction;
      this.showMes = true;
      console.log(row);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    searchTitle() {
      this._getBrand();
    },
    change(page) {
      this.tableData = this.dataList.slice((page - 1) * 5, page * 5);
    },
    deleteBrand(row) {
      this.$api.deleteBrand({ brandId: row.brandId }, data => {
        if (data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: "1500"
          });
          this._getBrand();
        } else {
          this.$message({
            message: "删除失败",
            type: "error",
            duration: "1500"
          });
        }
      });
    },
    openMes() {
      this.title = "新建品牌";
      this.showMes = true;
    },
    closeMes() {
      this.showMes = false;
      this.brandId = "";
      this.brand = "";
      this.introduction = "";
    }
  },
  data() {
    return {
      search: "",
      dataList: [],
      brand: "",
      introduction: "",
      brandId: "",
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
  width: 100%;
  //   margin: 0 auto;

  // background-color: #f6f6f6;
  // .table {
  //   height: 600px;
  // }
  .fabu {
    width: 100%;
    text-align: left;
    display: flex;
    padding-bottom: 10px;
    justify-content: space-between;
  }
}
.status_rej {
  font-size: 12px;
  color: red;
}
.input-with-select {
  width: 250px;
}
</style>
