<template>
  <div class="wheel">
    <div class="item" v-for="(item,index) in [0,1,2,3,4]" :key="index">
      <div class="item_title">轮播图{{ index+1 }}</div>
      <div>
        <el-input placeholder="请输入轮播图片地址" v-model="wheelList[index].imgUrl" disabled>
          <template slot="prepend">轮播图片地址</template>
          <el-button slot="append" icon="el-icon-plus"></el-button>
        </el-input>
        <div style="height:10px"></div>
        <el-input placeholder="请输入轮播图跳转连接" v-model="wheelList[index].link">
          <template slot="prepend">轮播图跳转连接</template>
          <el-button slot="append">提交</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'wheel',
  data(){
    return {
      wheelList:[
        {link:'aaaaa',imgUrl:'wwwwww'},
        {link:'aaaaa',imgUrl:'wwwwww'},
                {link:'aaaaa',imgUrl:'wwwwww'},
                        {link:'aaaaa',imgUrl:'wwwwww'},
                                {link:'aaaaa',imgUrl:'wwwwww'}
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
.item {
  width: 80%;
  &_title{
    color:#666;
    margin: 5px 0 ;
  }
}
</style>
