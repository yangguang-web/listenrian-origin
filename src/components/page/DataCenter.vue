<template>
    <div class="bigdata">
     {{poem}}
    </div>
</template>

<script>
import  * as echarts from 'echarts';
export default {
  data(){
    return{
      input:'',
      poem:''
    }
  },
  
  created(){
    this.getPoem();
  },
  mounted(){
    this.showChart();
    console.log('当前图表容器宽度是:'+this.$jquery('#test').width());
  },
  methods:{
    getPoem(){
      this.$axios.get('http://poetry.apiopen.top/sentences')
        .then((res)=>{
            this.poem=res.data.result.name;
            console.log(res.data.result.from);
        })
    },
    showChart(){
      let chartDom = document.getElementById('test');
      let myChart = echarts.init(chartDom);
      let option;

      option = {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
          }]
      };
      option && myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 60vh;
}
#test{
    width: 500px;
    height: 300px;
    background-color: white;
    border-radius: 4px;
}
</style>