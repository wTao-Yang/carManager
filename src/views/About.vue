<template>
  <div class="home">
    <div class="main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请者 ID">
                <span>{{ props.row.id }}</span>
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
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="申请者 ID" prop="id"></el-table-column>
        <el-table-column label="车辆名称" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status=='审核中'">
            <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
            <el-button type="text" size="small">拒绝</el-button>
            </div>
            <div v-else class="status">
              {{ scope.row.status }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background layout="prev, pager, next" :total="4"></el-pagination>
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
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  data() {
    return {
      activeIndex2: "1",
      tableData: [
        {
          id: "12987122",
          name: "日产-轩逸 1025款 经典 2.6XE CVT舒适版",
          price: "8",
          brand: "日产",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          date: '2014',
          phone:'13531522222',
          mileage: "4.32",
          status:'审核中'
        },
        {
          id: "12987123",
          name: "奔腾X80 2015款 2.0L 自动舒适周年纪念型",
          price: "6",
          brand: "奔腾",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone:'13531522222',
          date: '2014',
          mileage: "8.44",
          status:'已通过'
        },
        {
          id: "12987124",
          name: "比亚迪 唐新能源 2015款 2.0T 四驱旗舰型",
          price: "11",
          brand: "比亚迪",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone:'13531522222',
          date: '2015',
          mileage: "6.07",
          status:'审核中'
        },
        {
          id: "12987125",
          name: "日产 轩逸 2012款 1.8XL CVT豪华版",
          price: "7",
          brand: "日产",
          date: '2013',
          phone:'13531522222',
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          mileage: "14.98",
          status:'审核中'
        },
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
.status{
  font-size: 12px;
  color: green;
}
.main {
  width: 80%;
  margin: 50px auto;
  height: 1000px;
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
</style>
