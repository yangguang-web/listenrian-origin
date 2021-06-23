<template>
    <el-card class="wrap">
        <div class="condition">
            <span><el-button type="primary" @click="visible=true">设定条件</el-button></span>
            <!-- <span><el-input v-model="input" placeholder="搜索条件" @change="search" suffix-icon="el-icon-search" style="width:300px;"></el-input></span> -->
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
              <!-- =============================== -->
                <el-form-item label="策略一" label-width="60px">
                    <span>
                      <el-select v-model="form.key1" placeholder="请选择" style="width:100px">
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
                      <el-select v-model="form.key2" placeholder="请选择" style="width:100px">
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
                      <el-select v-model="form.key3" placeholder="请选择" style="width:100px">
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
                      <el-select v-model="form.key4" placeholder="请选择" style="width:100px">
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
                      <el-select v-model="form.key5" placeholder="请选择" style="width:100px">
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
        <div id="main">
            <div id="left_chart">
            </div>
            <div id="right_chart">
            </div>
        </div>
        <el-divider></el-divider>
        <div class="row">
            <div class="left">
              <div class="capture-header">
                <div class="capture-title">
                    <i class="bi bi-display-fill" style="padding-left:5px;"></i>
                    来源IP
                </div>
                <div class="capture-action">
                    <span><el-input v-model="input1" suffix-icon="el-icon-search" style="width:160px"></el-input></span>
                    <span><el-button type="primary">Excel</el-button></span>
                </div>
              </div>
              <el-divider></el-divider>
              <el-table
                  :data="tableData1"
                  stripe
                  border
                  style="width: 100%;margin-bottom:15px">
                  <el-table-column
                  prop="date"
                  label="字段">
                  </el-table-column>
                  <el-table-column
                  prop="name"
                  label="类型">
                  </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize1"   
                layout="total, sizes, prev, pager, next"
                :total="all1">
              </el-pagination>
            </div>
            <div class="right">
              <div class="capture-header">
                <div class="capture-title">
                    <i class="bi bi-display-fill" style="padding-left:5px;"></i>
                    目的IP
                </div>
                <div class="capture-action">
                    <span><el-input v-model="input2" suffix-icon="el-icon-search" style="width:160px"></el-input></span>
                    <span><el-button type="primary">Excel</el-button></span>
                </div>
              </div>
              <el-divider></el-divider>
              <el-table
                  :data="tableData2"
                  stripe
                  border
                  style="width: 100%;margin-bottom:15px">
                  <el-table-column
                  prop="date"
                  label="字段">
                  </el-table-column>
                  <el-table-column
                  prop="name"
                  label="类型">
                  </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize2"   
                layout="total, sizes, prev, pager, next"
                :total="all2">
              </el-pagination>
            </div>
        </div>
        <!-- ------------------------------------------------ -->
        <!-- ------------------------------------------------ -->
        <div class="row">
            <div class="left">
              <div class="capture-header">
                <div class="capture-title">
                    <i class="bi bi-compass-fill" style="padding-left:5px;"></i>
                    协议目录
                </div>
                <div class="capture-action">
                    <span><el-input v-model="input3" suffix-icon="el-icon-search" style="width:160px"></el-input></span>
                    <span><el-button type="primary">Excel</el-button></span>
                </div>
              </div>
              <el-divider></el-divider>
              <el-table
                  :data="tableData3"
                  stripe
                  border
                  style="width: 100%;margin-bottom:15px">
                  <el-table-column
                  prop="date"
                  label="字段">
                  </el-table-column>
                  <el-table-column
                  prop="name"
                  label="类型">
                  </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange3"
                @current-change="handleCurrentChange3"
                :current-page="currentPage3"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize3"   
                layout="total, sizes, prev, pager, next"
                :total="all3">
              </el-pagination>
            </div>
            <div class="right">
              <div class="capture-header">
                <div class="capture-title">
                    <i class="bi bi-compass-fill" style="padding-left:5px;"></i>
                    端口目录
                </div>
                <div class="capture-action">
                    <span><el-input v-model="input4" suffix-icon="el-icon-search" style="width:160px"></el-input></span>
                    <span><el-button type="primary">Excel</el-button></span>
                </div>
              </div>
              <el-divider></el-divider>
              <el-table
                  :data="tableData4"
                  stripe
                  border
                  style="width: 100%;margin-bottom:15px">
                  <el-table-column
                  prop="date"
                  label="字段">
                  </el-table-column>
                  <el-table-column
                  prop="name"
                  label="类型">
                  </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange4"
                @current-change="handleCurrentChange4"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize4"   
                layout="total, sizes, prev, pager, next"
                :total="all4">
              </el-pagination>
            </div>
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
      // =========
      input1:'',
      currentPage1:1,
      pagesize1:10,
      all1:14,
      tableData1: [{
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
      }],
      // =========
      input2:'',
      currentPage2:1,
      pagesize2:10,
      all2:11,
      tableData2: [{
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
      }],
      // =========
      input3:'',
      currentPage3:1,
      pagesize3:10,
      all3:10,
      tableData3: [{
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
      }],
      // =========
      input4:'',
      currentPage4:1,
      pagesize4:10,
      all4:10,
      tableData4: [{
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
      }],
      // =========
      poem:'',
      c2:false,
      c3:false,
      c4:false,
      c5:false,
      c6:false,
      c7:false,
      visible:false,
      addwidth:'460px',
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
      timerange:[],
      // pagesize:10,
      // currentPage:1,
      visible2:false,
      // all:0,
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
              echarts.init(document.getElementById("left_chart")).resize();
              echarts.init(document.getElementById("right_chart")).resize();
          })
      });
    this.show();
    this.showleft();
    this.showright();
  },
  methods:{
    headClass(){
      return 'color:#606266;background-color:#3fb1e3;font-size:15px'
    },

    getList(){
      
      // 转换时间timerange

      this.$axios.get('/qqqqqqqqqq',{
        params:{
          //默认已使用input保存五个值   (5个key,5个value 根据后端接收要求进行发送 )
          //分别是this.form.key1-5,this.form.value1-5
        }
      })
      .then((res) => {
          //将响应数据处理成X轴和Y轴需要的2个数组
      })
    },
    //根据设置条件进行搜索
    submitAdd(){
      this.showinput();//拿到设定的五个值
      this.visible=false;
    },
    //渲染左边图表
    showleft(){
            var myChart=echarts.init(document.getElementById('left_chart'));
            var option = {
                title: {
                    text: '协议比例图',// subtext: '纯属虚构',
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
    //渲染右边图表
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
      console.log(this.input);
      
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
    // 第一个表格的分页相关函数
    handleSizeChange1(){
      //从warninglist安全事件中赋值代表 只要修改对应字段即可
    },
    handleCurrentChange1(){

    },
    // 第2个表格的分页相关函数
    handleSizeChange2(){

    },
    handleCurrentChange2(){

    },
    // 第3个表格的分页相关函数
    handleSizeChange3(){

    },
    handleCurrentChange3(){

    },
    // 第4个表格的分页相关函数
    handleSizeChange4(){

    },
    handleCurrentChange4(){

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
    },
    getPoem(){
      this.$axios.get('http://poetry.apiopen.top/sentences')
        .then((res)=>{
            this.poem=res.data.result.name;
            console.log(res.data.result.from);
        })
    },
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
#main{
    width: 100%;
    height: 420px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    width: fit-content;
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
.row{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    padding-bottom: 25px;
    margin: auto;
}
.left{
    width: 45%;
    background-color: white;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 15%);
}
.right{
    width: 45%;
    background-color: white;
    border-radius: 6px;
    border: 1px solid white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 15%);
    padding: 20px;
}
.capture-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.capture-title{
    color: #404244;
    font-size: 18px;
}
span:not(:last-child){
    margin-right: 10px;
}
</style>