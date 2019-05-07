<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div v-if="isLogin">
      <div class="header">
        <!-- <div>车来车往</div> -->
        <!-- <div class="flex">
        <div>车辆列表</div>
        <div>卖车申请</div>
        <div>看车预约</div>
        <div>意见反馈</div>
        <div>设置</div>
        <div>权限管理</div>
        </div>-->
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="home">车辆列表</el-menu-item>
          <el-menu-item index="about">卖车申请</el-menu-item>
          <el-menu-item index="appoint">看车预约</el-menu-item>
          <el-menu-item index="setting">设置</el-menu-item>
          <el-menu-item index="suggest">意见反馈</el-menu-item>
          <!-- <el-menu-item index="dataPic">数据统计</el-menu-item> -->
          <el-menu-item v-if="isSuper" index="admin">权限管理</el-menu-item>
          <el-menu-item index="login">退出</el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
    <div v-else>
      <el-button type="primary" @click="goLogin">请先登录...</el-button>
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
    goLogin() {
      this.$router.push({ name: "login" });
    },
    handleClick(row) {
      console.log(row);
    },
    handleSelect(key, keyPath) {
      this.$router.push({ name: key });
    }
  },
  created() {
    let routerName = this.$route.name;
    if (routerName == "newCar") {
      this.activeIndex2 = "home";
    } else if (
      routerName == "brand" ||
      routerName == "hotBrand" ||
      routerName == "wheel"
    ) {
      this.activeIndex2 = "setting";
    } else {
      this.activeIndex2 = routerName;
    }
  },
  watch:{
    $route(val){
    let routerName = val.name;
    if (routerName == "newCar") {
      this.activeIndex2 = "home";
    } else if (
      routerName == "brand" ||
      routerName == "hotBrand" ||
      routerName == "wheel"
    ) {
      this.activeIndex2 = "setting";
    } else {
      this.activeIndex2 = routerName;
    }
    }
  },
  computed: {
    isLogin() {
      return sessionStorage.getItem("status");
    },
    isSuper() {
      return sessionStorage.getItem("status") == 0;
    }
  },
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
        desc: ""
      },
      activeIndex2: "",
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
          status: "审核中",
          nickName: "王先生",
          message:
            "这是测试建议反馈的数据！这是测试建议反馈的数据！这是测试建议反馈的数据！",
          clickNum: 3
        },
        {
          id: "12987112",
          name: "奔腾X80 2015款 2.0L 自动舒适周年纪念型",
          price: "6",
          brand: "奔腾",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone: "13531522222",
          date: "2014",
          mileage: "8.44",
          nickName: "王先生",
          status: "已取消",
          clickNum: 12
        },
        {
          id: "12987188",
          name: "比亚迪 唐新能源 2015款 2.0T 四驱旗舰型",
          price: "11",
          brand: "比亚迪",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone: "13531522222",
          date: "2015",
          nickName: "王先生",
          mileage: "6.07",
          status: "已售出",
          clickNum: 2
        },
        {
          id: "12987146",
          name: "日产 轩逸 2012款 1.8XL CVT豪华版",
          price: "7",
          brand: "日产",
          date: "2013",
          phone: "13531522222",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          nickName: "王先生",
          mileage: "14.98",
          status: "已下架",
          clickNum: 8
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
    min-width: 800px;
    margin: 0 auto;
  }
  .flex {
    display: flex;
    div {
      margin: 0 15px;
    }
  }
}
.box {
  margin: 20px;
  min-width: 800px;
  .box_header {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 10px;
    font-size: 20px;
  }
}
.page {
  margin-top: 20px;
}
.el-menu-vertical-demo {
  text-align: left;
  padding-top: 20px;
}
.main {
  width: 80%;
  min-width: 800px;
  margin: 0 auto;
  height: 1000px;
  // background-color: #f6f6f6;
  // .table {
  //   height: 600px;
  // }
}
.status_rej {
  font-size: 12px;
  color: red;
}
</style>
