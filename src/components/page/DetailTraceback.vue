<template>
  <div class="wrap">
    <el-card>

      <!-- 标题 -->
      <div class="condition">
        <i class="bi bi-compass-fill"></i>
        <span>会话信息记录</span>
      </div>
      <el-divider></el-divider>

      <!-- 点击行的信息表格 -->
      <el-table
        :data="tableData"
        border
        stripe
        :header-row-style="headClass"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column label="探针"  prop="node"></el-table-column>

          <el-table-column  label="源IP"  prop="fromip"></el-table-column>

          <el-table-column  label="源端口"  prop="fromport"></el-table-column>

          <el-table-column  label="传输协议"  prop="toport"></el-table-column>

          <el-table-column  label="应用协议"  prop="protocol"></el-table-column>

          <el-table-column  label="目标IP"  prop="toip"></el-table-column>

          <el-table-column  label="目标端口"  prop="toport"></el-table-column>

          <el-table-column  label="数据包数"  prop="totPackets"></el-table-column>
      </el-table>

      <div class="condition">
        <p>　</p>
      </div>

      <!-- 循环渲染数据 -->
      <div class="main">
          <el-timeline>
              <!-- 每一个时间戳 -->
              <el-timeline-item
                  v-for="(item,index) in items"
                  :key="index"
                  :timestamp="item.type=='0'?item.time+'  　请求':item.time+'  　响应'"
                  :type="item.type=='0'?'primary':'warning'"
                  size="large"
                  placement="top">
                  <!-- 每个时间戳下面的数据 -->
                  <el-card id="list">
                      <!-- 当前时间对应的数据 -->
                      <p><span class="cmd">>>&nbsp;</span>{{item.data}}</p>
                  </el-card>
              </el-timeline-item>
          </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
          //当前表格数据  来自超级搜索点击行的数据  已完成
          tableData:[],
          // 时间轴数据  格式
          items:[
            {
              time:'2021-06-09 13:10:17',
              data:'测试数据  SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.2',
              type:0
            },
            {
              time:'2021-06-10 13:10:17',
              data:'测试数据  SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.2',
              type:1
            },
            {
              time:'2021-06-11 13:10:17',
              data:'测试数据  SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.2',
              type:0
            }
          ]
        }
    },
    created(){
        //处理表格数据
        let obj={
            node:sessionStorage.getItem('node'),
            toip:sessionStorage.getItem('toip'),
            toport:sessionStorage.getItem('toport'),
            fromip:sessionStorage.getItem('fromip'),
            fromport:sessionStorage.getItem('fromport'),
            totPackets:sessionStorage.getItem('totPackets')
        };
        this.tableData.push(obj);
    },
    methods:{
        //表头样式
        headClass(){
            return 'color:#606266;background-color:#3fb1e3;font-size:15px'
        }
    }
}
</script>
<style>
  .el-timeline-item__timestamp.is-top{
  color: #505255;
  font-size: 14px;
  padding: 7px;
  border-radius: 5px;
  background-color: #4fcaff;
  color: white;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

</style>
<style scoped>
.wrap{
  width: 100%;
}
span{
  padding: 5px;
}
.condition{
  font-size: 16px;
}
.main{
  width: 85%;
  margin: auto;
  padding-top: 20px;
}
#list{
    background-color: #303133;
    border-radius: 5px;
    padding: 0px;
    color: whitesmoke;
    color: rgb(59, 252, 0);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
}
p{
  margin-bottom: 5px;
  /* font-style: oblique; */
}
.cmd{
  color: #17a2b8;
  font-size: 18px;
}
</style>