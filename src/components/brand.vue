<template>
  <div class="brand">
    <div class="main">
      <div class="fabu">
        <el-button type="primary" @click="openMes()">新建品牌</el-button>
      </div>
      <el-table class="table" :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="date" label="日期" width="200"></el-table-column> -->
        <el-table-column label="品牌 ID" prop="id"></el-table-column>
        <el-table-column label="品牌名称" prop="name"></el-table-column>
        <el-table-column label="品牌介绍" show-overflow-tooltip prop="introduction"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteAdmin(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background layout="prev, pager, next" :total="4"></el-pagination>
    </div>
    <div class="message" v-if="showMes"></div>
    <div class="mes" v-if="showMes">
      <div class="mes_box">
        <div class="mes_title">{{ title }}</div>
        <div class="mes_main">
          <el-input placeholder="请输入品牌名称" v-model="adminName">
            <!-- <template slot="prepend">帐号</template> -->
          </el-input>
          <div style="height:10px"></div>
          <el-input type="textarea" :rows="2" placeholder="请输入品牌介绍" v-model="textarea"></el-input>
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
  name: "brand",
  components: {
    HelloWorld
  },
  methods: {
    submit() {},
    handleClick(row) {
      this.title = "编辑品牌";
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
      this.title = "新建品牌";
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
      passWord: "",
      vPassWord: "",
      adminName: "",
      title: "",
      showMes: false,
      activeIndex2: "1",
      tableData: [
        {
          id: "123456",
          name: "日产-轩逸 1025款 经典 2.6XE CVT舒适版",
          price: "8",
          brand: "日产",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          date: "2014",
          phone: "13531522222",
          mileage: "4.32",
          status: "普通管理员",
          nickName: "王先生",
          message:
            "这是测试建议反馈的数据！这是测试建议反馈的数据！这是测试建议反馈的数据！",
          clickNum: 3,
          passWord: 123456
        },
        {
          id: "123458",
          name: "奔腾X80 2015款 2.0L 自动舒适周年纪念型",
          price: "6",
          brand: "奔腾",
          access: "上海市普陀区真北路",
          introduction: "王小虎夫妻店",
          phone: "13531522222",
          date: "2014",
          mileage: "8.44",
          nickName: "王先生",
          status: "普通管理员",
          passWord: 123458,
          clickNum: 12
        }
        // {
        //   id: "12987188",
        //   name: "比亚迪 唐新能源 2015款 2.0T 四驱旗舰型",
        //   price: "11",
        //   brand: "比亚迪",
        //   access: "上海市普陀区真北路",
        //   introduction: "王小虎夫妻店",
        //   phone:'13531522222',
        //   date: '2015',
        //   nickName:'王先生',
        //   mileage: "6.07",
        //   status:'已售出',
        //   clickNum:2
        // },
        // {
        //   id: "12987146",
        //   name: "日产 轩逸 2012款 1.8XL CVT豪华版",
        //   price: "7",
        //   brand: "日产",
        //   date: '2013',
        //   phone:'13531522222',
        //   access: "上海市普陀区真北路",
        //   introduction: "王小虎夫妻店",
        //   nickName:'王先生',
        //   mileage: "14.98",
        //   status:'已下架',
        //   clickNum:8
        // },
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
    padding: 10px;
  }
}
.status_rej {
  font-size: 12px;
  color: red;
}
</style>
