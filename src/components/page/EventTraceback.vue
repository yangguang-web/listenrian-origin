<template>
    <el-card class="wrap">
        <!-- 图表 -->
        <!-- <div class="row">
            <div id="c1">

            </div>
        </div> -->
        <!-- 搜索条件 -->
        <div class="condition">
            <el-input v-model="ip" placeholder="请输入IP地址" 
            style="width:180px;min-width:120px;margin-right:10px">

            </el-input>
            <el-date-picker
                v-model="timerange"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="min-width:300px;margin-right:10px">
            </el-date-picker>
            <el-select v-model="space" placeholder="时间粒度" style="min-width:110px;margin-right:10px">
                <el-option label="15min" value="15"></el-option>
                <el-option label="30min" value="30"></el-option>
                <el-option label="60min" value="60"></el-option>
            </el-select>
            <el-button type="primary" style="height:36px" @click="search">搜 索</el-button>
        </div>
        
        <el-divider>
        </el-divider>
        <!-- 时间轴渲染 -->
        <div class="container">
            <el-timeline>
                <!-- 每一个时间戳 -->
                <el-timeline-item
                    v-for="(item,index) in items"
                    :key="index"
                    :timestamp="item.time"
                    type="primary"
                    size="large"
                    placement="top">
                    <div class="toggle" @click="item.show=!item.show">
                        <!-- <i class="el-icon-arrow-down" v-show="!item.show"></i>
                        <i class="el-icon-arrow-up" v-show="item.show"></i> -->
                    </div>
                    <el-collapse-transition>
                        <!-- 每个时间戳下面的数据 -->
                        
                        <el-card id="list" v-show="item.show">
                            <p>
                                当前时间范围内，系统运行正常，被攻击{{item.attack}}次，违规{{item.against}}次。
                            </p>
                        
                            <p>攻击IP前三分别是：{{item.top3.toString()}}</p>
                            <p>被攻击目标是：{{item.target}}</p>
                            <p>违规会话IP是：{{item.againstip}}.</p>
                            
                            <el-divider content-position="center">攻击信息-TOP3</el-divider>
                            <el-table
                                :data="item.attackInfo"
                                border
                                stripe
                                :header-row-style="headClass"
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                >
                                <el-table-column label="源IP"  prop="fromip"></el-table-column>
                                <el-table-column label="目标IP"  prop="toip"></el-table-column>
                                <el-table-column label="目标端口"  prop="toport"></el-table-column>
                                <el-table-column  label="类型"  prop="type"></el-table-column>
                                <el-table-column  label="协议"  prop="protocol"></el-table-column>

                            </el-table>
                            <el-divider content-position="center">违规信息-TOP3</el-divider>
                            <el-table
                                :data="item.againstInfo"
                                border
                                stripe
                                :header-row-style="headClass"
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                >
                                <el-table-column label="IP"  prop="againstip"></el-table-column>

                                <el-table-column  label="违反规则"  prop="rule"></el-table-column>

                                <el-table-column  label="协议"  prop="protocol"></el-table-column>

                            </el-table>
                        </el-card>
                    </el-collapse-transition>
                </el-timeline-item>
          </el-timeline>
            
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
            ip:'',
            timerange:[],
            space:'',
            show:true,
            items:[
                {
                    time:'2021-06-07 12:03:04 —— 2021-06-07 12:03:04',
                    attack:120,
                    against:24,
                    top3:['192.168.1.121,192.168.1.121,192.168.1.121'],
                    target:'192.168.1.121',
                    againstip:'192.168.1.121',
                    show:true,
                    //攻击信息
                    attackInfo:[
                        {
                            fromip:'192.168.1.212',
                            toip:'192.168.1.301',
                            toport:'80',
                            type:'AAA',
                            protocol:'TCP'
                        },
                        {
                            fromip:'192.168.1.213',
                            toip:'192.168.1.305',
                            toport:'70',
                            type:'AAA',
                            protocol:'TCP'
                        },
                        {
                            fromip:'192.168.1.214',
                            toip:'192.168.1.307',
                            toport:'3080',
                            type:'BBB',
                            protocol:'TCP'
                        }
                    ],
                    //违规信息
                    againstInfo:[
                        {
                            againstip:'192.168.1.121',
                            rule:'规则1',
                            protocol:'TCP'
                        },
                        {
                            againstip:'192.168.1.121',
                            rule:'规则1',
                            protocol:'TCP'
                        },
                        {
                            againstip:'192.168.1.121',
                            rule:'规则1',
                            protocol:'TCP'
                        }
                    ]
                    
                },
                {
                    time:'2021-06-07 12:03:04 —— 2021-06-07 12:03:04',
                    attack:120,
                    against:24,
                    top3:['192.168.1.121,192.168.1.121,192.168.1.121'],
                    target:'192.168.1.121',
                    show:false,
                    //攻击信息
                    attackInfo:[
                        {
                            fromip:'192.168.1.212',
                            toip:'192.168.1.301',
                            toport:'80',
                            type:'AAA',
                            protocol:'TCP'
                        },
                        {
                            fromip:'192.168.1.212',
                            toip:'192.168.1.301',
                            toport:'80',
                            type:'AAA',
                            protocol:'TCP'
                        }
                    ],
                    againstInfo:[
                        {
                            againstip:'192.168.1.181',
                            rule:'规则3',
                            protocol:'UDP'
                        },
                        {
                            againstip:'192.168.1.181',
                            rule:'规则3',
                            protocol:'UDP'
                        }
                    ]
                }
            ],
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
            }
        }
    },
    mounted(){
        console.log('666');
        
        var erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementsByClassName("wrap"), function (element) {
            var width = element.offsetWidth
            var height = element.offsetHeight
            Vue.nextTick(function () {
                console.log("Size: " + width + "x" + height)
                var cc=document.getElementById("c1");
                echarts.init(cc).resize();
                // echarts.init(document.getElementById("c1")).resize();
            })
        });
        this.showc1();
    },
    methods:{
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
                // legend: {
                //     icon: 'circle',
                //     top: '5%',
                //     right: '2%',
                //     itemWidth: 12,
                //     itemGap: 20,
                //     textStyle: {
                //         color: '#556677'
                //     }
                // },
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
                                    offset: 0.86,
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
            c1.setOption(option);
            window.addEventListener("resize", () => { c1.resize(); });
        },
        //表头样式
        headClass(){
            return 'color:#606266;background-color:#3fb1e3;font-size:15px'
        },
        search(){
            this.$axios.get('/qqqqqqq').then(
                (res)=>{
                    this.items=res.data.data;
                }
            )
        },

    }
}
</script>
<style>
.el-timeline-item__timestamp.is-top{
  font-size: 14px;
  padding: 7px;
  border-radius: 5px;
  background-color: #4fcaff;
  color: white;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 12%);
}
</style>
<style scoped>
.toggle{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 28px;
    padding: 2px;
    cursor: pointer;
}
.wrap{
    width: 100%;
    margin: auto;
}
#c1{
    width: 100%;
    height: 360px;
    border-radius: 6px;
    /* box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); */
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
#list{
    margin-top: 15px;
}
</style>