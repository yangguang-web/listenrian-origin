<template>
    <div class="wrap">
        
        
        <!-- <el-divider> -->
        <!-- </el-divider> -->
        <div class="row3">
            <div class="condition">
                <el-input
                    placeholder="请输入IP 如192.168.1.111/134"
                    v-model="host"
                    style="max-width:290px;margin-right:10px">
                </el-input>
                <el-date-picker
                    v-model="timerange"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    style="max-width: 370px;margin-right:10px">
                </el-date-picker>
                <el-button type="primary" style="height:36px" @click="search">搜索</el-button>
            </div>
            <el-divider></el-divider>
            <div class="chart" id="c5"></div>
            <!-- <div class="chart" id="c6"></div> -->
        </div>
        <div id="main">
            <div id="left_chart">
            </div>
            <div id="right_chart">
            </div>
        </div>
        <div class="row1">
            <div class="chart" id="c1"></div>
            <div class="chart" id="c2"></div>
        </div>
        <!-- <div class="row2">
            <div class="chart" id="c3"></div>
            <div class="chart" id="c4"></div>
        </div> -->
    </div>
</template>

<script>
import Vue from 'vue'
import  * as echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';

export default {
    name:'index',
    data() {
      return {
        host:'',
        order:['100','92','86','70','63','53','40','20'],
        fromip:[],
        interfromip:[],
        toip:[],
        intertoip:[],
        formInline: {
          user: '',
          region: ''
        },
        timerange:[],
        pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
                }
            }]
        },
        rightlegend:['GET','POST','OPTION','PUT','DELETE','HEAD'],
        leftlegend:['TCP','UDP','HTTP','SMTP','SSH','FTP'],
        tem:[{value:'1',name:'TCP'},{value:'2',name:'UDP'},{value:'3',name:'HTTP'},{value:'4',name:'SMTP'},{value:'5',name:'SSH'},{value:'6',name:'FTP'}],
        temright:[{value:'4',name:'GET'},{value:'3',name:'POST'},{value:'2',name:'OPTION'},{value:'5',name:'PUT'},{value:'7',name:'DELETE'},{value:'4',name:'HEAD'}],
      }
    },
    created(){
        this.getSecure();           //安全趋势
    },
    mounted(){
        var erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementsByClassName("wrap"), function (element) {
            var width = element.offsetWidth
            var height = element.offsetHeight
            Vue.nextTick(function () {
                console.log("Size: " + width + "x" + height)
                echarts.init(document.getElementById("c1")).resize();
                echarts.init(document.getElementById("c2")).resize();
                echarts.init(document.getElementById("c5")).resize();
                echarts.init(document.getElementById("left_chart")).resize();
                echarts.init(document.getElementById("right_chart")).resize();
            })
        });
        this.showc1();  //告警源 IP TOP10
        this.showc2();  //告警目标 IP TOP10
        this.showc5();  //安全趋势
        this.showleft();//攻击类型
        this.showright();//端口
    },
    methods: {

        
        // 调整完字段将函数里面的对应部分死数据换成新的数组名
        getSecure(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    //先在data里面定义四个数组 showc5函数的横坐标的数组   series的三个数组 高危中危低危
                    //然后将res里面的对应字段赋值给相应的数组
                }
            )
        },
        search(){

        },
        //告警源 IP TOP10
        getc1(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    console.log('.');
                }
            )
        },
        //告警目标 IP TOP10
        getc2(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    console.log('.');
                }
            )
        },
        //攻击类型趋势
        getLeft(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    console.log('.');
                }
            )
        },
        getRight(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    console.log('.');
                }
            )
        },
        // ---------------------------------------
        showleft(){
            var myChart=echarts.init(document.getElementById('left_chart'));
            var option = {
                title: {
                    text: '攻击类型比例图',// subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    borderWidth:4,
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data:this.leftlegend
                },
                series:[
                    {
                        // name: '模块类型',
                        name:'',
                        type: 'pie',
                        radius: ['30%','50%'],
                        center: ['50%', '50%'],
                        color:['#37A2DA','#32C5E9' ,'#9FE6B8' ,'#FFDB5C' ,'#FF9F7F', '#FB7293' ,'#8378EA','#17a2b8'],
                        // roseType: 'radius',
                        label: {
                            show: true
                        },
                        itemStyle: {
                            borderRadius:8,
                            borderColor: '#fff',
                            borderWidth: 3
                        },
                        emphasis:{
                            label: {
                                show: true
                            }
                        },
                        data:this.tem
                    },
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", () => { myChart.resize(); });
        },
        showright(){
            var myCharts=echarts.init(document.getElementById('right_chart'));
            var optionRight = {
                title: {
                    text: '端口比例图',
                    left: 'center'
                },
                tooltip: {
                    borderWidth:4,
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%) '
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    type: 'scroll',
                    // orient: 'vertical',
                    data:this.rightlegend
                },
                series:[
                    {
                        name:'端口类型',
                        type: 'pie',
                        radius: ['30%','50%'],
                        center: ['50%', '50%'],
                        color:['#37A2DA','#32C5E9' ,'#9FE6B8' ,'#FFDB5C' ,'#FF9F7F', '#FB7293' ,'#8378EA','#17a2b8'],
                        itemStyle: {
                            borderRadius: 8,
                            borderColor: '#fff',
                            borderWidth: 3
                        },
                        label: {
                            show: true
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data:this.temright
                    },
                ]
            };
            myCharts.setOption(optionRight);
            window.addEventListener("resize", () => { myCharts.resize(); });
        },
        showc1(){
            var c1=echarts.init(document.getElementById('c1'));
            var optionTop ={
                title: {
                    text: '目的IP（内网）TOP10',
                    textStyle: {
                        align: 'center',
                        // color: '#17a2b8',
                        color: '#606266',
                        fontSize: 20,
                    },
                    top: '3%',
                    left: '5%',
                },
                grid: {
                    top: "20%",
                    left:'5%',
                    right:'5%',
                    bottom: "5%",containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            show: true
                        }
                    }
                },
                yAxis: {
                    data: ['192.168.1.121','192.168.1.121','192.168.1.121','192.168.1.121',
                    '192.168.1.121','192.168.1.121','192.168.1.121','192.168.1.121'],
                    axisLine: {
                        show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: '#3FB1E3'
                        }
                    },
                    axisTick: {
                        show: true, //隐藏X轴刻度
                        // alignWithLabel: true
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#3FB1E3" //X轴文字颜色
                        }
                    },
                },
                xAxis: [{
                    type: "value",
                    // name: "亿元",
                    nameTextStyle: {
                        color: "#3FB1E3"
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: "#3FB1E3"
                        }
                    },
                    
                },
                {
                    type: "value",
                    gridIndex: 0,
                    min: 50,
                    max: 100,
                    splitNumber: 8,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                        }
                    }
                }
                ],
                series: [
                    {
                        name: "次数",
                        type: "bar",
                        barWidth: 15,
                        // itemStyle:{
                        //         normal: {
                        //             borderRadius: 10,
                        //             color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        //                 offset: 0,
                        //                 color: 'rgb(128,204,255,1)'
                        //             }, {
                        //                 offset: 1,
                        //                 color: 'rgb(46,200,255,1)'
                        //             }]),
                        //         },
                        //     },
                        itemStyle: {
                            normal: {
                                borderRadius: 10,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "rgb(128,234,255,1)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(46,200,255,1)"
                                    }
                                ])
                            }
                        },
                        data:this.order.reverse()
                    }
                ]
            };
            c1.setOption(optionTop);
            window.addEventListener("resize", () => { c1.resize(); });
        },
        showc2(){
            var c2=echarts.init(document.getElementById('c2'));
            var optionTop ={
                title: {
                    text: '来源IP （内网） TOP10',
                    textStyle: {
                        align: 'center',
                        color: '#505255',
                        fontSize: 20,
                    },
                    top: '3%',
                    left: '5%',
                },
                grid: {
                    top: "20%",
                    left:'5%',
                    right:'5%',
                    bottom: "5%",containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            show: true
                        }
                    }
                },
                yAxis: {
                    data: ['192.168.1.121','192.168.1.121','192.168.1.121','192.168.1.121',
                    '192.168.1.121','192.168.1.121','192.168.1.121','192.168.1.121'],
                    axisLine: {
                        show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: '#3FB1E3'
                        }
                    },
                    axisTick: {
                        show: true, //隐藏X轴刻度
                        // alignWithLabel: true
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#3FB1E3" //X轴文字颜色
                        }
                    },
                },
                xAxis: [{
                    type: "value",
                    // name: "亿元",
                    nameTextStyle: {
                        color: "#3FB1E3"
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: "#3FB1E3"
                        }
                    },
                    
                },
                {
                    type: "value",
                    gridIndex: 0,
                    min: 50,
                    max: 100,
                    splitNumber: 8,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                        }
                    }
                }
                ],
                series: [
                    {
                        name: "次数",
                        type: "bar",
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                borderRadius: 10,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "rgb(128,234,255,1)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(46,200,255,1)"
                                    }
                                ])
                            }
                        },
                        data:this.order
                    }
                ]
            };
            c2.setOption(optionTop);
            window.addEventListener("resize", () => { c2.resize(); });
        },
        showc5(){
            const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
            var c5=echarts.init(document.getElementById('c5'));
            var optionTop ={
                title: {
                    text: '安全趋势',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 400
                    },
                    left: 'center',
                    top: '5%'
                },
                legend: {
                    icon: 'circle',
                    top: '5%',
                    right: '5%',
                    itemWidth: 6,
                    itemGap: 20,
                    textStyle: {
                        color: '#556677'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        label: {
                            show: true,
                            backgroundColor: '#fff',
                            color: '#556677',
                            borderColor: 'rgba(0,0,0,0)',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowOffsetY: 0
                        },
                        lineStyle: {
                            width: 0
                        }
                    },
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#5c6c7c'
                    },
                    padding: [10, 10],
                    extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
                },
                grid: {
                    top: '15%',
                    left:'5%',
                    bottom:'5%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
                    axisLine: {
                        lineStyle: {
                            color: '#DCE2E8'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#556677'
                        },
                        // 默认x轴字体大小
                        fontSize: 12,
                        // margin:文字到x轴的距离
                        margin: 15
                    },
                    axisPointer: {
                        label: {
                            // padding: [11, 5, 7],
                            padding: [0, 0, 10, 0],
                            // 这里的margin和axisLabel的margin要一致!
                            margin: 15,
                            // 移入时的字体大小
                            fontSize: 12,
                            backgroundColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#fff' // 0% 处的颜色
                                }, {
                                    // offset: 0.9,
                                    offset: 0.86,
                                    /*
            0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
                                    
                                    */
                                    color: '#fff' // 0% 处的颜色
                                }, {
                                    offset: 0.86,
                                    color: '#33c0cd' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#33c0cd' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    boundaryGap: false
                }],
                yAxis: [
                    {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#DCE2E8'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#556677'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                    },
                ],
                series:[
                    {
                        name: '低危',
                        type: 'line',
                        data: [10, 10, 14, 12, 15, 18, 27],
                        symbolSize: 1,
                        symbol: 'circle',
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#9effff'
                                },
                                {
                                    offset: 1,
                                    color: '#9E87FF'
                                }
                            ]),
                            shadowColor: 'rgba(158,135,255, 0.3)',
                            shadowBlur: 10,
                            shadowOffsetY: 20
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[0],
                                borderColor: colorList[0]
                            }
                        }
                    }, 
                    {
                        name: '中危',
                        type: 'line',
                        data: [5, 16, 10, 14, 25, 16, 22],
                        symbolSize: 1,
                        symbol: 'circle',
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#73DD39'
                                },
                                {
                                    offset: 1,
                                    color: '#73DDFF'
                                }
                            ]),
                            shadowColor: 'rgba(115,221,255, 0.3)',
                            shadowBlur: 10,
                            shadowOffsetY: 20
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[1],
                                borderColor: colorList[1]
                            }
                        }
                    },
                    {
                        name: '高危',
                        type: 'line',
                        data: [15, 12, 17, 14, 50, 16, 11],
                        symbolSize: 1,
                        yAxisIndex: 0,
                        symbol: 'circle',
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#fe9a'
                                },
                                {
                                    offset: 1,
                                    color: '#fe9a8b'
                                }
                            ]),
                            shadowColor: 'rgba(254,154,139, 0.3)',
                            shadowBlur: 10,
                            shadowOffsetY: 20
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[2],
                                borderColor: colorList[2]
                            }
                        }
                    }
                ]
            };
            c5.setOption(optionTop);
            window.addEventListener("resize", () => { c5.resize(); });
        }
    }
}
</script>

<style scoped>
.condition{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 15px;
}
#main{
    width: 100%;
    height: 450px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 15%);
    margin-top: 25px;
}
#left_chart{
    width: 47%;
    height: 400px;
}
#right_chart{
    width: 47%;
    height: 400px;
}
.wrap{
    width: 100%;
    padding: 0px 10px;
}
.square{
    width: 22%;
    height: 140px;
    border-radius: 10px;
    text-align: center;
    color: white;
    box-shadow: 0 6px 18px 0 rgb(82 94 102 / 15%);
    background-color: white;
}
.i-title{
  width: 100%;
  height: 50px;
  font-size: 20px;
  line-height: 70px;
  color: #000102e3;
}
.i-count i{
  height: 100px;
  line-height: 80px;
  font-size: 50px;
  color: #796EF1;
}
.square:first-child i{
  color: rgb(255, 130, 130);
}
.square:nth-child(2) i{
  color: rgb(140, 255, 130);
}
.square:last-child i{
  color: rgb(253, 242, 84);
}
.i-count span{
  height: 100px;
  line-height: 80px;
  font-size: 30px;
  margin-left: 20px;
  color: #0000009a;
}
.row1{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
.row2{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
.row3{
    width: 100%;
    /* margin-top: 25px; */
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 10px;
}
#c1{
    width: 48%;
    height: 320px;
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(65, 46, 46, 0.1);
    background-color: white;
    padding: 10px;
}
#c2{
    width: 48%;
    height: 320px;
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 10px;
}
#c3{
    width: 48%;
    height: 320px;
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(65, 46, 46, 0.1);
    background-color: white;
    padding: 10px;
}
#c4{
    width: 48%;
    height: 320px;
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 10px;
}
#c5{
    width: 100%;
    height: 360px;
    /* border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: white; */
    padding: 10px;
}
#c6{
    width: 100%;
    height: 360px;
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 10px;
}
@media screen and (min-width: 1920px){
    .wrap{
        width: 85%;
        margin: auto;
    }
    #c1,#c2,#c3,#c4,#c5{
        height: 360px;
    }
}
@media screen and (min-height: 800px){
    .wrap{
        width: 94%;
        margin: auto;
    }
    #c1,#c2,#c3,#c4,#c5{
        height: 360px;
    }
}
</style>