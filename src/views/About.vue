<template>
  <div class="home">
    <div class="main">
      <el-input placeholder="请输入车辆名称" v-model="search" class="input-with-select">
        <el-button slot="append" @click="searchTitle" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请 ID">
                <span>{{ props.row.applyId }}</span>
              </el-form-item>
              <el-form-item label="车辆名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="车辆价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="车辆品牌">
                <span>{{ props.row.brand }}</span>
              </el-form-item>
              <el-form-item label="行驶里程">
                <span>{{ props.row.mileage }}</span>
              </el-form-item>
              <el-form-item label="上牌时间">
                <span>{{ props.row.year }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="申请人姓名">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="申请 ID" prop="applyId"></el-table-column>
        <el-table-column label="车辆名称" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status=='审核中'">
              <el-button @click="handleClick(scope.row,2)" type="text" size="small">通过</el-button>
              <el-button @click="handleClick(scope.row,3)" type="text" size="small">拒绝</el-button>
            </div>
            <div v-else-if="scope.row.status=='已通过'" class="status_res">{{ scope.row.status }}</div>
            <div
              v-else-if="scope.row.status=='已拒绝'|| scope.row.status=='已取消'"
              class="status_rej"
            >{{ scope.row.status }}</div>
            <el-button @click="deleteApply(scope.row)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getApplyList, setApplyStatus } from "./../api/index.js";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    this.getList();
  },
  methods: {
    deleteApply(row) {
      this.$api.deleteApply({ applyId: row.applyId }, data => {
        if (data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: "1500"
          });
          this.getList();
        } else {
          this.$message({
            message: "删除失败",
            type: "error",
            duration: "1500"
          });
        }
      });
    },
    getList() {
      let self = this;
      getApplyList({ search: this.search }, data => {
        this.dataList = data;

        let self = this;
        this.dataList.forEach(item => {
          item.status = self.statusList[item.status];
        });

        this.tableData = this.dataList.slice(0, 5);
      });
    },
    handleClick(row, status) {
      if (status == 2) {
        this.$router.push({
          name: "newCar",
          query: { applyId: row.applyId, userName: row.userName }
        });
        return;
      }
      setApplyStatus({ status: status, applyId: row.applyId }, data => {
        if (data.code == 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: "1500"
          });
          this.getList();
        } else {
          this.$message({
            message: "操作失败",
            type: "error",
            duration: "1500"
          });
        }
      });
    },
    change(page) {
      this.tableData = this.dataList.slice((page - 1) * 5, page * 5);
    },
    searchTitle() {
      this.getList();
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },

  data() {
    return {
      dataList: [],
      statusList: ["审核中", "已取消", "已通过", "已拒绝"],
      activeIndex2: "1",
      search: "",
      tableData: [
        {
          id: "12987122",
          name: "日产-轩逸 1025款 经典 2.6XE CVT舒适版",
          price: "8",
          brand: "日产",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          date: "2014",
          phone: "13531522222",
          mileage: "4.32",
          status: "审核中"
        },
        {
          id: "12987123",
          name: "奔腾X80 2015款 2.0L 自动舒适周年纪念型",
          price: "6",
          brand: "奔腾",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone: "13531522222",
          date: "2014",
          mileage: "8.44",
          status: "已通过"
        },
        {
          id: "12987124",
          name: "比亚迪 唐新能源 2015款 2.0T 四驱旗舰型",
          price: "11",
          brand: "比亚迪",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone: "13531522222",
          date: "2015",
          mileage: "6.07",
          status: "审核中"
        },
        {
          id: "12987125",
          name: "日产 轩逸 2012款 1.8XL CVT豪华版",
          price: "7",
          brand: "日产",
          date: "2013",
          phone: "13531522222",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          mileage: "14.98",
          status: "审核中"
        }
      ]
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
.page {
  margin-top: 20px;
}
.status_res {
  font-size: 12px;
  color: green;
}
.status_rej {
  font-size: 12px;
  color: red;
}
.main {
  width: 80%;
  margin: 10px auto;
  // background-color: #f6f6f6;
  // .table {
  //   height: 600px;
  // }
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.input-with-select {
  float: right;
  width: 250px;
}
</style>
