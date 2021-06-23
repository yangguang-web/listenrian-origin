<template>
    <el-card class="wrap">
        
        <div class="condition">
            <el-input
                placeholder="请输入目标网段或IP 如192.168.1.111/134"
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
                style="max-width: 370px;;margin-right:10px">
            </el-date-picker>
            <el-button type="primary" style="height:36px" @click="search">搜索</el-button>
        </div>
        
        <el-divider>
        </el-divider>

        <div class="row">
            <div id="c1">

            </div>
        </div>
        <el-divider>
            
        </el-divider>
        <div class="row1">
            <div class="chart" id="c11"></div>
            <div class="chart" id="c22"></div>
        </div>

  </el-card>
</template>

<script>
import Vue from 'vue'
import  * as echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';
export default {
    data(){
        return{
            host:'',
            timerange:[],
            order:['100','92','86','70','63','53','40','20'],
            x1:[],
            y1:[],
            x11:[],
            y11:[],
            x22:[],
            y22:[],
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
        }
    },
    created(){
        this.getc1();
        this.getc11();
        this.getc22();
    },    
    mounted(){
        var erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementsByClassName("wrap"), function (element) {
            var width = element.offsetWidth
            var height = element.offsetHeight
            Vue.nextTick(function () {
                console.log("Size: " + width + "x" + height)
                echarts.init(document.getElementById("c1")).resize();
                echarts.init(document.getElementById("c11")).resize();
                echarts.init(document.getElementById("c22")).resize();
            })
        });
        this.showc1(); //非法访问趋势
        this.showc11();//违规会话目标IP
        this.showc22();//违规会话来源IP
    },
    methods:{
        getc1(){
            this.$axios.get('/qqqqqqqqqq')
                .then(
                    (res)=>{
                        this.x1=res.data.qqqqqqqqqq;
                        this.y1=res.data.qqqqqqqqqq;
                        // this.showc1();
                    }
                )
        },
        getc11(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    this.x11=res.data.qqqqqqqqqq;
                    this.y11=res.data.qqqqqqqqqq;
                }
            )
        },
        getc22(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    this.x22=res.data.qqqqqqqqqq;
                    this.y22=res.data.qqqqqqqqqq;
                }
            )
        },
        showc1(){
            const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
            var c1=echarts.init(document.getElementById('c1'));
            var option ={
                title: {
                    text: ' ',
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
                    right: '2%',
                    itemWidth: 12,
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
                    top: '12%',
                    left: '2%',
                    right: '2%',
                    bottom:'15%',
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
                dataZoom: [
                    {
                        show: true,
                        height: 18,
                        showDataShadow: false,
                        start: 0,
                        end: 100,
                    }
                ],
                series:[
                    {
                        name: '非法访问量',
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
                    }
                ]
            };
            c1.setOption(option);
            window.addEventListener("resize", () => { c1.resize(); });
        },
        showc11(){
            var c11=echarts.init(document.getElementById('c11'));
            var optionTop ={
                title: {
                    text: '目的IP（违规）TOP10',
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
            c11.setOption(optionTop);
            window.addEventListener("resize", () => { c11.resize(); });
        },
        showc22(){
            var c22=echarts.init(document.getElementById('c22'));
            var optionTop ={
                title: {
                    text: '来源IP （违规） TOP10',
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
            c22.setOption(optionTop);
            window.addEventListener("resize", () => { c22.resize(); });
        },
        //获取非法访问量的数据
        search(){
            this.$axios.get('/qqqqqqqqqq',{
                params:{
                    qqqqqqqqqq:this.xxx,
                    qqqqqqqqqq:this.xxx
                }
            }).then(
                (res)=>{
                    console.log(res.data);
                    
                }
            )
        }
    }
}
</script>

<style scoped>
.wrap{
    width: 100%;
    margin: auto;
}
.row1{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
#c11{
    width: 48%;
    height: 320px;
    border-radius: 6px;
    /* box-shadow: 0px 8px 15px rgba(65, 46, 46, 0.1); */
    background-color: white;
    padding: 10px;
}
#c22{
    width: 48%;
    height: 320px;
    border-radius: 6px;
    /* box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); */
    background-color: white;
    padding: 10px;
}
#c1{
    width: 100%;
    height: 360px;
    border-radius: 6px;
    background-color: white;
    padding: 10px;
}
.row{
    width: 100%;
}
.condition{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>