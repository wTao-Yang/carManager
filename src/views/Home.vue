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
          <el-input placeholder="请输入车辆名称" v-model="search" class="input-with-select">
    <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select> -->
    <el-button slot="append" @click="searchTitle" icon="el-icon-search"></el-button>
  </el-input>
      </div>
      
      <el-table class="table" :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="date" label="日期" width="200"></el-table-column> -->
        <el-table-column label="车辆 ID" prop="carId"></el-table-column>
        <el-table-column label="车辆名称" prop="carTitle"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="行驶里程" prop="mileage"></el-table-column>
        <el-table-column label="购买时间" prop="buyTime"></el-table-column>
        <el-table-column label="点击次数" prop="clickNum"></el-table-column>
        <el-table-column  label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status=='0'">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="setCarStatus(scope.row,1)" type="text" size="small">下架</el-button>
            <el-button @click="setCarStatus(scope.row,2)" type="text" size="small">售出</el-button>
            </div>
            <div v-else-if="scope.row.status=='1'"><span class="status_rej">{{  statusList[scope.row.status]  }}</span>
              <el-button @click="setCarStatus(scope.row,0)" type="text" size="small">重新上架</el-button>
            </div>
            <div v-else class="status_rej">{{  statusList[scope.row.status]  }}</div>
            <el-button @click="deleteCar(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="change" class="page" :page-size="5" background layout="prev, pager, next" :total="dataList.length"></el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getCarList } from './../api/index.js'
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created(){
    this._getCarList()
  },
  methods: {
    searchTitle(){
      this._getCarList()
    },
    deleteCar(row){
      this.$api.deleteCar({carId:row.carId},data=>{
        if(data.code==0){
          this.$message({ message: "删除成功", type: "success",duration:'1500' });
          this._getCarList()
        }else{
          this.$message({ message: "删除失败", type: "error" ,duration:'1500'});
        }
      })
    },
    change(page){
      this.tableData = this.dataList.slice((page-1)*5,page*5)
    },
    setCarStatus(row,type){
      this.$api.setCarStatus({status:type,carId:row.carId},data=>{
        if(data.code==0){
          this.$message({ message: "操作成功", type: "success",duration:'1500' });
          this._getCarList()
        }else{
          this.$message({ message: "操作失败", type: "error" ,duration:'1500'});
        }
      })
    },
    _getCarList(){
      getCarList({search:this.search},data=>{
        this.dataList = data
        this.tableData = data.slice(0,5)
      })
    },
    handleClick(row) {
      this.$router.push({name: 'newCar',query:{id: row.carId}})
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
      dataList:[],
      search:'',
      activeIndex2: "1",
      statusList:['热卖中','已下架','已售出'],
     tableData: [

      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.input-with-select{
  width: 250px;
}
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
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding: 10px 20px 10px 0;
  }
}
.status_rej{
  font-size: 12px;
  color: red;
  margin-right: 10px;
}
</style>
