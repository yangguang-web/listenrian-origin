<template>
    <el-card class="wrap">
        <div class="condition">
            <el-input
                placeholder="输入目标ip地址"
                v-model="input"
                @change="search"
                style="width:20%;margin-right:10px">
            </el-input>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
      <el-divider></el-divider>

      <div class="usertable">
          <template>
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                label="时间"
                prop="time">
                </el-table-column>
                <el-table-column
                label="来源IP"
                prop="fromip">
                </el-table-column>
                <el-table-column
                label="目标IP"
                prop="toip">
                </el-table-column>
                 <el-table-column
                label="来源端口"
                prop="fromhost">
                </el-table-column>
                <el-table-column
                label="目标端口"
                prop="tohost">
                </el-table-column>
                <el-table-column
                label="安全事件"
                prop="judge">
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
    export default {
        name:'unnormallist',
        data(){
            return{
                input:'',
                currentPage:1,
                pagesize:10,
                all:0,
                tableData: [
                    {
                    fromip: '192.168.1.111',
                    toip: '192.168.1.121',
                    fromhost:'8080',
                    tohost:'8000',
                    time:'2021-12-03 08:32',
                    protocol:'ssh',
                    judge:'暂无威胁'
                    },
                    {
                    fromip: '192.168.3.230',
                    toip: '192.168.2.132',
                    fromhost:'3003',
                    tohost:'3000',
                    time:'2021-04-31 08:32',
                    protocol:'telnet',
                    judge:'暂无威胁'
                    }
                ]
            }
        },
        created(){
            this.getList();
        },
        mounted(){

        },
        methods:{
            handleSizeChange(){
                console.log('jj');
            },
            handleCurrentChange(){

            },
            getList(){
                this.$axios.get('/qqqqqqqqqq')
                .then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            search(){
                this.$axios.get('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:this.input
                    }
                }).then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            }
        }
    }
</script>

<style>

</style>
<style scoped>
.none{
    height: 15px;
    width: 100%;
}
.wrap{
    width: 100%;
    margin: auto;
}
.condition{
    display: flex;
    /* justify-content: space-between; */
    flex-direction: row;
}
.search{
    display: flex;
    flex-direction: row;
}
.count{
    margin-right: 20px;
}
.none{
    width: 10px;
}
</style>