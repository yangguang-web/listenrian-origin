<template>
    <div class="wrap">
        <div class="bar">
        <div class="square">
            <div class="i-title">网络会话次数</div>
            <div class="i-count">
            <i class="bi bi-chat-dots-fill"></i>
            <span>{{value1}}</span>
            </div>
        </div>
        <div class="square">
            <div class="i-title">安全事件数量</div>
            <div class="i-count">
            <i class="bi bi-clipboard-data"></i>
            <span>{{value2}}</span>
            </div>
        </div>
        <div class="square">
            <div class="i-title">违规事件数量</div>
            <div class="i-count">
            <i class="bi bi-graph-up"></i>
            <span>{{value3}}</span>
            </div>
        </div>
        <div class="square">
            <div class="i-title">可用存储空间</div>
            <div class="i-count">
            <i class="bi bi-hdd-rack-fill"></i>
            <span>{{value4}}%</span>
            </div>
        </div>
        </div>
        <!-- <div>
            {{test}}
        </div> -->
        <div class="row3">
            <!-- <div class="chart" id="c5"></div> -->
            <div class="chart" id="c6"></div>
        </div>
        <div class="row3">
            <div class="chart" id="c5"></div>
            <!-- <div class="chart" id="c6"></div> -->
        </div>
        <div class="row1">
            <div class="chart" id="c1"></div>
            <div class="chart" id="c2"></div>
        </div>
        <div class="row2">
            <div class="chart" id="c3"></div>
            <div class="chart" id="c4"></div>
        </div>
        
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
        test:'',
        value1:'9600',  //网络会话
        value2:'1204',  //安全事件
        value3:'720',   //违规事件
        value4:'43.8',  //存储空间
        order:['100','92','86','70','63','53','40','20'],  
        fromip:[],      //来源IP
        interfromip:[], //来源IP 内网
        toip:[],        //目标IP
        intertoip:[]    //目标IP 内网
      }
    },
    created(){
        // this.getFromIP();           //来源IP
        // this.getInterFromIP();      //来源IP（内网）TOP10
        // this.getToIP();             //目的IP
        // this.getInterToIp();        //目的IP（内网）TOP10
        // this.getCount();            //四个数量
        // this.getSecure();           //安全趋势
        // this.getPackage();          //会话数包数
    },
    mounted(){
        this.getPoem();
        var erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementsByClassName("wrap"), function (element) {
            var width = element.offsetWidth
            var height = element.offsetHeight
            Vue.nextTick(function () {
                console.log("Size: " + width + "x" + height)
                echarts.init(document.getElementById("c1")).resize();
                echarts.init(document.getElementById("c2")).resize();
                echarts.init(document.getElementById("c3")).resize();
                echarts.init(document.getElementById("c4")).resize();
                echarts.init(document.getElementById("c5")).resize();
                echarts.init(document.getElementById("c6")).resize();
            })
        });
        this.showc1();  //目的IP（内网）TOP10
        this.showc2();  //来源IP（内网）TOP10
        this.showc3();  //目的IP TOP10
        this.showc4();  //来源IP TOP10
        this.showc5();  //安全趋势
        this.showc6();  //会话数包数
    },
    methods: {
        getPoem(){
            console.log('------------打印结果------------');
            
            this.$axios.get('http://poetry.apiopen.top/sentences')
                .then((res)=>{
                    this.test=res.data.result.name;
                    console.log(res.data.result.from);
                })
        },
        // 调整完字段将函数里面的对应部分死数据换成新的数组名
        getSecure(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    //先在data里面定义四个数组 showc5函数的横坐标的数组   series的三个数组 高危中危低危
                    //然后将res里面的对应字段赋值给相应的数组
                }
            )
        },
        //会话数包数
        getPackage(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    //先在data里面定义几个数组 showc5函数的横坐标的数组   series的两三个数组 三种类型的数量
                    //然后将res里面的对应字段赋值给相应的数组  不能和其他数组重名
                }
            )
        },

        getCount(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    this.value1=res.data.qqqqqqqqqq;   //网络会话数量
                    this.value2=res.data.qqqqqqqqqq;   //安全事件数量
                    this.value3=res.data.qqqqqqqqqq;   //违规事件数量
                    this.value4=res.data.qqqqqqqqqq;   //可用存储空间
                }
            )
        },
        //来源IP TOP10
        getFromIP(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    this.fromip=res.data.qqqqqqqqqq;
                }
            )
        },
        //来源IP TOP10 内网
        getInterFromIP(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    this.interfromip=res.data.qqqqqqqqqq;
                }
            )
        },
        //目的IP TOP10
        getToIP(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    this.toip=res.data.qqqqqqqqqq;
                }
            )
        },
        //目的IP（内网）TOP10
        getInterToIp(){
            this.$axios.get('/qqqqqqqqqq').then(
                (res)=>{
                    this.intertoip=res.data.qqqqqqqqqq;
                }
            )
        },
        //渲染各个图表
        // showc1()  //目的IP（内网）TOP10
        // showc2()  //来源IP（内网）TOP10
        // showc3()  //目的IP TOP10
        // showc4()  //来源IP TOP10
        // showc5() //安全趋势
        // showc6()  //会话数包数
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
        showc3(){
            var c3=echarts.init(document.getElementById('c3'));
            var optionTop ={
                title: {
                    text: '目的IP TOP10',
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
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "#00FFE3"
                                    },
                                    {
                                        offset: 1,
                                        color: "#4693EC"
                                    }
                                ])
                            }
                        },
                        data:this.order
                    }
                ]
            };
            c3.setOption(optionTop);
            window.addEventListener("resize", () => { c3.resize(); });
        },
        showc4(){
            var c4=echarts.init(document.getElementById('c4'));
            var optionTop ={
                title: {
                    text: '来源IP TOP10',
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
                        show: true //隐藏X轴刻度
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
                        show: true
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
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "#00FFE3"
                                    },
                                    {
                                        offset: 1,
                                        color: "#4693EC"
                                    }
                                ])
                            }
                        },
                        data:this.order
                    }
                ]
            };
            c4.setOption(optionTop);
            window.addEventListener("resize", () => { c4.resize(); });
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
        },
        showc6(){
            let bgColor = "#fff";
            let color = [
                "#0090FF",
                "#36CE9E",
                "#FFC005",
                "#FF515A",
                "#8B5CFF",
                "#00CA69"
            ];
            let echartData = [{
                    name: "1",
                    value1: 100,
                    value2: 233
                },
                {
                    name: "2",
                    value1: 138,
                    value2: 233
                },
                {
                    name: "3",
                    value1: 350,
                    value2: 200
                },
                {
                    name: "4",
                    value1: 173,
                    value2: 180
                },
                {
                    name: "5",
                    value1: 180,
                    value2: 199
                },
                {
                    name: "6",
                    value1: 150,
                    value2: 233
                },
                {
                    name: "7",
                    value1: 180,
                    value2: 210
                },
                {
                    name: "8",
                    value1: 230,
                    value2: 180
                }
            ];

            let xAxisData = echartData.map(v => v.name);
            //  ["1", "2", "3", "4", "5", "6", "7", "8"]
            let yAxisData1 = echartData.map(v => v.value1);
            // [100, 138, 350, 173, 180, 150, 180, 230]
            let yAxisData2 = echartData.map(v => v.value2);
            // [233, 233, 200, 180, 199, 233, 210, 180]
            const hexToRgba = (hex, opacity) => {
                let rgbaColor = "";
                let reg = /^#[\da-f]{6}$/i;
                if (reg.test(hex)) {
                    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
                "0x" + hex.slice(3, 5)
                )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
                }
                return rgbaColor;
            };
            var c6=echarts.init(document.getElementById('c6'));
            var optionTop ={
                backgroundColor: bgColor,
                color: color,
                legend: {
                    right: 10,
                    top: 10
                },
                tooltip: {
                    trigger: "axis",
                    formatter: function(params) {
                        let html = '';
                        params.forEach(v => {
                            console.log(v)
                            html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                            ${v.seriesName}
                            <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                            `;
                        })
                        
                

                        return html
                    },
                    extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: '#ffffff',
                            shadowColor: 'rgba(225,225,225,1)',
                            shadowBlur: 5
                        }
                    }
                },
                grid: {
                    top: '16%',
                    left:'4%',
                    right:'4%',
                    bottom:'6%',
                    containLabel: true
                },
                xAxis: [{
                    type: "category",
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value}月',
                        textStyle: {
                            color: "#333"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#D9D9D9"
                        }
                    },
                    data: xAxisData
                }],
                yAxis: [{
                    type: "value",
                    name: '数量',
                    axisLabel: {
                        textStyle: {
                            color: "#666"
                        }
                    },
                    nameTextStyle: {
                        color: "#666",
                        fontSize: 12,
                        lineHeight: 40
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#E9E9E9"
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: "包数",
                    type: "line",
                    smooth: true,
                    // showSymbol: false,/
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[0],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[0], 0.5),
                            shadowOffsetY: 8
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [{
                                        offset: 0,
                                        color: hexToRgba(color[0], 0.3)
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color[0], 0.1)
                                    }
                                ],
                                false
                            ),
                            shadowColor: hexToRgba(color[0], 0.1),
                            shadowBlur: 10
                        }
                    },
                    data: yAxisData1
                }, {
                    name: "会话数",
                    type: "line",
                    smooth: true,
                    // showSymbol: false,
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[1],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[1], 0.5),
                            shadowOffsetY: 8
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [{
                                        offset: 0,
                                        color: hexToRgba(color[1], 0.3)
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color[1], 0.1)
                                    }
                                ],
                                false
                            ),
                            shadowColor: hexToRgba(color[1], 0.1),
                            shadowBlur: 10
                        }
                    },
                    data: yAxisData2
                }]
            };
            c6.setOption(optionTop);
            window.addEventListener("resize", () => { c6.resize(); });
        }
    }
}
</script>

<style scoped>
.wrap{
    width: 100%;
    padding: 0px 5px;
}
.bar{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 0px;
}
.square{
    width: 22%;
    height: 140px;
    border-radius: 10px;
    text-align: center;
    color: white;
    box-shadow: 0 6px 18px 0 rgb(82 94 102 / 15%);
    background-color: white;
    /* background: linear-gradient(118deg, rgb(103, 190, 240),rgba(103,190,240,0.5)); */
}
.i-title{
  width: 100%;
  height: 50px;
  font-size: 20px;
  line-height: 70px;
  color: #000102e3;
  letter-spacing: 1.5px;
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
  margin-top: 25px;
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
    border-radius: 6px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
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