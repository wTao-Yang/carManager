<template>
  <div class="home">
    <div class="main">
      <div style="display:flex;min-height:60%;">
      <el-menu
      @select="handleSelect"
      :default-active="brand"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="brand">
        <i class="el-icon-menu"></i>
        <span slot="title">品牌</span>
      </el-menu-item>
      <el-menu-item index="wheel">
        <i class="el-icon-setting"></i>
        <span slot="title">轮播图</span>
      </el-menu-item>
      <el-menu-item index="hotBrand">
        <i class="el-icon-tickets"></i>
        <span slot="title">热门品牌</span>
      </el-menu-item>
    </el-menu>
    <div class="box">
      <router-view></router-view>
        <!-- <div class="box_header">热门品牌导航设置</div>
  <el-form ref="form" style="width:300px;margin:20px 100px" :model="form" label-width="80px">
  <el-form-item label="热门品牌1">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="热门品牌2">
    <el-input v-model="form.date2"></el-input>
  </el-form-item>
    <el-form-item label="热门品牌3">
    <el-input v-model="form.date1"></el-input>
  </el-form-item>
    <el-form-item label="热门品牌4">
    <el-input v-model="form.desc"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit">设置</el-button>
  </el-form-item>
        </el-form> -->
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
  created(){
    this.brand = this.$route.name
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelect(key, keyPath) {
      this.$router.push({name: key})
    },
    handleOpen(key){
      console.log(key)
    }
  },

  data() {
    return {
                form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      brand:'',
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
.box{
    margin:20px;
    min-width: 800px;
    .box_header{
        border-bottom: 1px solid #ebeef5;
        padding-bottom:10px;
        font-size:20px;
    }
}
.page{
  margin-top: 20px;
}
.el-menu-vertical-demo{
    text-align: left;
    padding-top: 20px;
}
.main {
  width: 80%;
  margin:0 auto;
  height: 1000px;
  // background-color: #f6f6f6;
  // .table {
  //   height: 600px;
  // }

}
.status_rej{
  font-size: 12px;
  color: red;
}
</style>
