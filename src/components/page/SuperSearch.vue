<template>
    <el-card class="wrap">
        <!-- <h2>{{poem}}</h2> -->
        <div class="condition">
            <span><el-button type="primary" @click="visible=true">设定条件</el-button></span>
            <!-- <span><el-input v-model="input" placeholder="搜索条件" suffix-icon="el-icon-search" style="width:400px"></el-input></span> -->
            <span>
              <el-date-picker
              v-model="timerange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="max-width: 370px">
              </el-date-picker>
            </span>
            <span><el-button type="primary" @click="getList">查询</el-button></span>
            <span><el-button type="primary">PDF</el-button></span>
        </div>
        <el-dialog :visible.sync="visible" center class="layer" :width="addwidth" title="添加策略">
            <el-form :model="form"  ref="form">
                <el-form-item label="策略一" label-width="60px">
                    <span>
                      <el-select v-model="form.key1" placeholder="请选择" style="width:120px">
                        <el-option label="item1" value="item1"></el-option>
                        <el-option label="item2" value="item2"></el-option>
                        <el-option label="item3" value="item3"></el-option>
                        <el-option label="item4" value="item4"></el-option>
                        <el-option label="item5" value="item5"></el-option>
                      </el-select>
                    </span>
                    <span>&nbsp;=&nbsp;</span>
                    <span>
                      <el-input v-model="form.value1" placeholder="设定值"  style="width:160px"></el-input>
                    </span>
                    <span>
                      <el-button type="primary" v-show="!c2" size="mini" circle @click="c2=true"><i class="el-icon-plus"></i></el-button>
                    </span>
                </el-form-item>
                <!-- ====================== -->
                <el-form-item label="策略二" label-width="60px" v-show="c2">
                    <span>
                      <el-select v-model="form.key2" placeholder="请选择" style="width:120px">
                        <el-option label="item1" value="item1"></el-option>
                        <el-option label="item2" value="item2"></el-option>
                        <el-option label="item3" value="item3"></el-option>
                        <el-option label="item4" value="item4"></el-option>
                        <el-option label="item5" value="item5"></el-option>
                      </el-select>
                    </span>
                    <span>&nbsp;=&nbsp;</span>
                    <span>
                      <el-input v-model="form.value2" placeholder="设定值"  style="width:160px"></el-input>
                    </span>
                    <span>
                      <el-button type="primary" v-show="!c3" size="mini" circle @click="c3=true"><i class="el-icon-plus"></i></el-button>
                    </span>
                </el-form-item>
                <!-- ====================== -->
                <!-- ====================== -->
                <el-form-item label="策略三" label-width="60px" v-show="c3">
                    <span>
                      <el-select v-model="form.key3" placeholder="请选择" style="width:120px">
                        <el-option label="item1" value="item1"></el-option>
                        <el-option label="item2" value="item2"></el-option>
                        <el-option label="item3" value="item3"></el-option>
                        <el-option label="item4" value="item4"></el-option>
                        <el-option label="item5" value="item5"></el-option>
                      </el-select>
                    </span>
                    <span>&nbsp;=&nbsp;</span>
                    <span>
                      <el-input v-model="form.value3" placeholder="设定值"  style="width:160px"></el-input>
                    </span>
                    <span>
                      <el-button type="primary" v-show="!c4" size="mini" circle @click="c4=true"><i class="el-icon-plus"></i></el-button>
                    </span>
                </el-form-item>
                <el-form-item label="策略四" label-width="60px" v-show="c4">
                    <span>
                      <el-select v-model="form.key4" placeholder="请选择" style="width:120px">
                        <el-option label="item1" value="item1"></el-option>
                        <el-option label="item2" value="item2"></el-option>
                        <el-option label="item3" value="item3"></el-option>
                        <el-option label="item4" value="item4"></el-option>
                        <el-option label="item5" value="item5"></el-option>
                      </el-select>
                    </span>
                    <span>&nbsp;=&nbsp;</span>
                    <span>
                      <el-input v-model="form.value4" placeholder="设定值"  style="width:160px"></el-input>
                    </span>
                    <span>
                      <el-button type="primary" v-show="!c5" size="mini" circle @click="c5=true"><i class="el-icon-plus"></i></el-button>
                    </span>
                </el-form-item>
                <el-form-item label="策略五" label-width="60px" v-show="c5">
                    <span>
                      <el-select v-model="form.key5" placeholder="请选择" style="width:120px">
                        <el-option label="item1" value="item1"></el-option>
                        <el-option label="item2" value="item2"></el-option>
                        <el-option label="item3" value="item3"></el-option>
                        <el-option label="item4" value="item4"></el-option>
                        <el-option label="item5" value="item5"></el-option>
                      </el-select>
                    </span>
                    <span>&nbsp;=&nbsp;</span>
                    <span>
                      <el-input v-model="form.value5" placeholder="设定值"  style="width:160px"></el-input>
                    </span>
                    <span>
                      　
                      <!-- <el-button type="primary"  size="mini" circle ><i class="el-icon-plus"></i></el-button> -->
                    </span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="reset">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-divider></el-divider>
        <div id="core">
        </div>
        <el-divider></el-divider>
        <div class="usertable">
            <template>
                <el-table
                  :data="tableData"
                  stripe
                  border
                  style="width: 100%"
                  :header-row-style="headClass"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}">

                    <!-- 扩展表格 -->
                    <el-table-column type="expand">
                      <template slot-scope="scope">
                        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">回溯该会话</el-button>
                        <el-button type="primary">下载PCAP包</el-button>
                        <el-divider></el-divider>
                        <div class="detail-table">
                          <!-- 渲染表格 -->

                          <!-- 渲染表格 -->
                        </div>
                      </template>
                    </el-table-column> 

                    <el-table-column
                    label="时间"
                    prop="time">
                    </el-table-column>

                    <el-table-column
                    label="源IP"
                    prop="fromip">
                    </el-table-column>

                    <el-table-column
                    label="源端口"
                    prop="fromport">
                    </el-table-column>
                    <el-table-column
                    label="目标IP"
                    prop="toip">
                    </el-table-column>

                    <el-table-column
                    label="目标端口"
                    prop="toport">
                    </el-table-column>

                    <el-table-column
                    label="类型"
                    prop="type">
                    </el-table-column>

                </el-table>
            </template>
            <div class="none">
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize"   
                layout="total, sizes, prev, pager, next, jumper"
                :total="all">
            </el-pagination>
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
      timerange:[],
      poem:'',
      c2:false,
      c3:false,
      c4:false,
      c5:false,
      c6:false,
      c7:false,
      visible:false,
      addwidth:'450px',
      input:'',
      form:{
        key1:'',
        key2:'',
        key3:'',
        key4:'',
        key5:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:''
      },
      t1:'',
      t2:'',
      t3:'',
      t4:'',
      t5:'',
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
      pagesize:10,
      currentPage:1,
      visible2:false,
      all:0,
      tableData: [
          {
              fromip: '192.168.1.111',
              fromport: '8080',
              toip: '175.132.2.124',
              toport: '3003',
              type: '试图窃取信息',
              time: '2021-04-30 11:07',
              id:'30021',
              index:'sessions2-210403',
              type:'_doc',
              source:{
                srcIp:'80.246.2.153',
                initRTT:'198',
                node:'lrain1',
                totPackets:31,
                protocol:{
                  0:'ssh',
                  1:'tcp'
                }
              }
          }, 
          {
              fromip: '192.168.1.222',
              fromport: '8080',
              toip: '175.132.2.124',
              toport: '3003',
              type: '试图窃取信息',
              time: '2021-04-30 11:07',
              id:'30021',
              detail:'ET COMPROMISED Known Compromised or Hostile Host Traffic group 23',
              index:'session_1111',
              type:'_doc',
              source:{
                srcIp:'80.246.2.153',
                initRTT:'198',
                node:'lrain2',
                totPackets:32,
                protocol:{
                  0:'ssh',
                  1:'tcp'
                }
              }
          },
          {
              fromip: '192.168.1.333',
              fromport: '8080',
              toip: '175.132.2.124',
              toport: '3003',
              type: '试图窃取信息',
              time: '2021-04-30 11:07',
              id:'30021',
              detail:'ET COMPROMISED Known Compromised or Hostile Host Traffic group 23',
              index:'session_1111',
              type:'_doc',
              source:{
                srcIp:'80.246.2.153',
                initRTT:'198',
                node:'lrain3',
                totPackets:33,
                protocol:{
                  0:'ssh',
                  1:'tcp'
                }
              }
          }
      ],
    }
  },
  created(){
    // this.getPoem();
  },
  mounted(){
      var erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementsByClassName("wrap"), function (element) {
          var width = element.offsetWidth
          var height = element.offsetHeight
          Vue.nextTick(function () {
              console.log("Size: " + width + "x" + height)
              echarts.init(document.getElementById("core")).resize();
          })
      });
      this.show();
  },
  methods:{
    //回溯当前会话
    handleEdit(index,row){
        //先获取当前行信息 存在localstorage中  跳转后获取该行信息渲染到表格中
        sessionStorage.setItem('toip',row.toip);
        sessionStorage.setItem('fromip',row.fromip);
        sessionStorage.setItem('toport',row.toport);
        sessionStorage.setItem('node',row.source.node);
        sessionStorage.setItem('fromport',row.fromport);
        sessionStorage.setItem('totPackets',row.source.totPackets);
        
        //存储信息后 跳转到回溯详情界面  并获取数据进行展示
        this.$router.push('/detail');
    },
    headClass(){
      return 'color:#606266;background-color:#3fb1e3;font-size:15px'
    },
    getList(){
      //设定条件在showinput中  再传入时间timerange
    },
    showinput(){
      if(this.form.value5==''){
          this.t5='';
      }
      else{
        this.t5=this.form.key5+'：'+this.form.value5;
      }

      if(this.form.value4==''){
        this.t4='';
      }
      else{
        if(this.t5==''){
          this.t4=this.form.key4+'：'+this.form.value4;
        }
        else{
          this.t4=this.form.key4+'：'+this.form.value4+'、';
        }
      }

      if(this.form.value3==''){
        this.t3='';
      }
      else{
        if(this.t4==''){
          this.t3=this.form.key3+'：'+this.form.value3;
        }
        else{
          this.t3=this.form.key3+'：'+this.form.value3+'、';
        }
      }
      if(this.form.value2==''){
        this.t2='';
      }
      else{
        if(this.t3==''){
          this.t2=this.form.key2+'：'+this.form.value2;
        }
        else{
          this.t2=this.form.key2+'：'+this.form.value2+'、';
        }
      }
      if(this.form.value1==''){
        this.t1='';
      }
      else{
        if(this.t2==''){
          this.t1=this.form.key1+'：'+this.form.value1;
        }
        else{
          this.t1=this.form.key1+'：'+this.form.value1+'、';
        }
      }
      this.input=this.t1+this.t2+this.t3+this.t4+this.t5;
    },
    reset(){
        this.c2=false;
        this.c3=false;
        this.c4=false;
        this.c5=false;
        this.c6=false;
        this.form.key1='';
        this.form.key2='';
        this.form.key3='';
        this.form.key4='';
        this.form.key5='';
        this.form.value1='';
        this.form.value2='';
        this.form.value3='';
        this.form.value4='';
        this.form.value5='';
        this.input='';
        this.visible=false;
    },
    // 调整每页显示数量时
    handleSizeChange(){

    },
    // 调整当前页码时
    handleCurrentChange(){

    },
    submitAdd(){
      this.showinput();
      this.visible=false;
    },
    submitCancel(){
      this.visible=false;
    },
    show(){
        const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
        var c5=echarts.init(document.getElementById('core'));
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
                    name: '会话数',
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
                    name: '流量',
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
                    name: '包数',
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
        c5.setOption(option);
        window.addEventListener("resize", () => { c5.resize(); });
    }
  }
}
</script>

<style>
.el-icon-arrow-right{
    font-weight: bolder;
    font-size: 16px;
    color: rgb(0, 153, 204);
}

</style>
<style scoped>
/* .detail-table{

} */
.wrap{
    width: 100%;
    margin: auto;
}
.expand th{
    width: 100px;
    text-align: left;
    background-color: rgb(239, 253, 255);
}
table{
    border: 1px solid rgb(162, 194, 214);
}
tr{
    width:auto;
    border: 1px solid lightblue;
}
th{
    padding: 0;
}
td{
    border: 1px solid lightblue;
    padding: 0;
}
.usertable{
    margin-bottom: 10px;
}
.none{
    height: 15px;
    width: 100%;
}
.condition{
    width: 100%;
    display: flex;
}
#core{
    width: 100%;
    height: 360px;
    border-radius: 6px;
    background-color: white;
    padding: 10px;
}
.condition span:not(:last-child){
    margin-right: 15px;
}
.layer span:last-child{
    margin-left: 10px;
}
</style>