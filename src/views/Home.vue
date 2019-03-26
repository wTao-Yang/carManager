<template>
  <div class="home">
    <!-- <div class="header">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">车辆列表</el-menu-item>
        <el-menu-item index="2">卖车申请</el-menu-item>
        <el-menu-item index="3">看车预约</el-menu-item>
        <el-menu-item index="4">设置</el-menu-item>
        <el-menu-item index="5">意见反馈</el-menu-item>
        <el-menu-item index="6">权限管理</el-menu-item>
      </el-menu>
    </div> -->
    <div class="main">
      <div class="fabu">
        <el-button type="primary" @click="goNewCar">发布</el-button>
      </div>
      
      <el-table class="table" :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="date" label="日期" width="200"></el-table-column> -->
        <el-table-column label="车辆 ID" prop="id" width="150"></el-table-column>
        <el-table-column label="车辆名称" prop="name" width="200"></el-table-column>
        <el-table-column label="价格" prop="price" width="200"></el-table-column>
        <el-table-column label="行驶里程" prop="mileage" width="200"></el-table-column>
        <el-table-column label="购买时间" prop="date" width="200"></el-table-column>
        <el-table-column label="点击次数" prop="clickNum" width="200"></el-table-column>
        <el-table-column  label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status=='审核中'">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">下架</el-button>
            <el-button type="text" size="small">售出</el-button>
            </div>
            <div v-else class="status_rej">{{  scope.row.status  }}</div>
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
      this.$router.push({name: 'newCar',query:{id: row.id}})
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goNewCar(){
      this.$router.push({name: 'newCar'})
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
          status:'审核中',
          nickName:'王先生',
          message:'这是测试建议反馈的数据！这是测试建议反馈的数据！这是测试建议反馈的数据！',
          clickNum:3
        },
        {
          id: "12987112",
          name: "奔腾X80 2015款 2.0L 自动舒适周年纪念型",
          price: "6",
          brand: "奔腾",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone:'13531522222',
          date: '2014',
          mileage: "8.44",
          nickName:'王先生',
          status:'已取消',
          clickNum:12
        },
        {
          id: "12987188",
          name: "比亚迪 唐新能源 2015款 2.0T 四驱旗舰型",
          price: "11",
          brand: "比亚迪",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone:'13531522222',
          date: '2015',
          nickName:'王先生',
          mileage: "6.07",
          status:'已售出',
          clickNum:2
        },
        {
          id: "12987146",
          name: "日产 轩逸 2012款 1.8XL CVT豪华版",
          price: "7",
          brand: "日产",
          date: '2013',
          phone:'13531522222',
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          nickName:'王先生',
          mileage: "14.98",
          status:'已下架',
          clickNum:8
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
  /deep/ .el-menu{
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
.page{
  margin-top: 20px;
}
.main {
  width: 80%;
  margin:0 auto;
  height: 1000px;
  // background-color: #f6f6f6;
  // .table {
  //   height: 600px;
  // }
  .fabu{
    width: 100%;
    text-align: left;
    padding: 10px;
  }
}
.status_rej{
  font-size: 12px;
  color: red;
}
</style>
