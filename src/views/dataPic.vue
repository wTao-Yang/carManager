
<style scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#chart_example {
  width: 100%;
  height: 500px;
  /* border: 1px solid red; */
  /* margin: 0 auto; */
}

#chart_example1 {
  width: 100%;
  height: 500px;
  /* border: 1px solid red; */
  /* margin: 0 auto; */
}
</style>
<template>
  <div>
    <div id="chart_example"></div>
    <div id="chart_example1"></div>
  </div>
</template>
 
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      brandData: [],
      brandList: [],
      priceList: []
    };
  },
  mounted() {
    let self = this;
    this.$api.getChart({}, data => {
      this.brandData = data;
      this.brandData.forEach(item => {
        self.brandList.push(item.name);
      });
      let option = {
        title: {
          text: "平台前5品牌数量占比",
          // subtext: '纯属虚构',
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.brandList
        },
        series: [
          {
            name: "品牌",
            type: "pie",
            radius: "55%",
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            center: ["50%", "60%"],
            // radius: ['40%', '55%'],
            data: this.brandData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let myChart = echarts.init(document.getElementById("chart_example"));
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    });
    this.$api.getPriceChart({}, data => {
      this.priceList.push(data[0].num1);
      this.priceList.push(data[0].num2);
      this.priceList.push(data[0].num3);
      this.priceList.push(data[0].num4);
      this.priceList.push(data[0].num5);
      this.priceList.push(data[0].num6);
      let option1 = {
        title: {
          text: "平台车辆价格区间数量占比",
          // subtext: '纯属虚构',
          x: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "0-10万",
              "10-20万",
              "20-30万",
              "30-40万",
              "40-50万",
              "50万以上"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "60%",
            data: this.priceList
          }
        ]
      };
      let myChart1 = echarts.init(document.getElementById("chart_example1"));
      myChart1.setOption(option1);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart1.resize();
      });
    });
  },
  methods: {},
  watch: {},
  created() {}
};
</script>
