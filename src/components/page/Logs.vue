<template>
    <el-card class="container">
        <div class="condition">
            <!-- <div class="left" id="in"> -->
                    <!-- <div class="span">操作人员：</div> -->
                    <el-input v-model="iuser" style="min-width:100px;max-width:240px" placeholder="操作人员"></el-input>
            <!-- </div> -->
            <!-- <div class="right" id="in"> -->
                    <!-- <div class="span">事件类型：</div> -->
                    <el-input v-model="ievent" style="min-width:100px;max-width:240px" placeholder="操作类型"></el-input>
            <!-- </div> -->
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>

        </div>
        <el-divider></el-divider>

        <div class="usertable">
            <template>
                <!-- //每一个el-table-column里面的prop属性要对应data()里面的table的字段 -->
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                    label="时间"
                    prop="time"
                    min-width="130px">
                    </el-table-column>
                    <el-table-column
                    label="用户"
                    prop="user"
                    min-width="80px">
                    </el-table-column>
                    <el-table-column
                    label="访问IP"
                    prop="ip"
                    min-width="90px">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    prop="action">
                    </el-table-column>
                    <el-table-column
                    label="操作对象"
                    prop="obj">
                    </el-table-column>
                    <el-table-column
                    label="操作内容"
                    prop="log"
                    min-width="150px">
                    </el-table-column>
                </el-table>
            </template>
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
    </el-card>
</template>

<script>
    // -----------------------请求-------------------------------------
    //请求的类型     get/post/delete等
    //请求的url     修改为当前操作需要请求的接口地址  如/login  /userlist
    //请求的参数    ！！！ 参数的key对应后端要接收的参数  参数的value对应前端提供的值(用户输入等)
    //传参方式      注意不同类型请求的传参方式不一样
    //响应格式      axios封装的响应默认为res.data  获取其中字段可用.获取
    //函数调用      有些非操作性调用函数要在生命周期调用  注意先后顺序
    // -----------------------表格-------------------------------------
    //表格数据      按照data()中的tableData格式返回数据即可   如：this.tableData=res.data.table
    //表格数据      多个表格 DOM中的绑定tableData命名不能一样
    //分页处理      三个字段：当前页码、当前每页数量、总数  两个函数：页码变化、每页数量变化
    //表格数据      某一行的数据可以根据绑定的函数通过row.字段获取
    // -----------------------图表-------------------------------------
    //echarts图表   保证先请求拿到数据  将接收的数据进行处理赋值给相应的数组 再渲染图表
    //echarts图表   数据使用数组形式  X轴Y轴都需要在data()里面定义相应的数组  用来存储接收数据以渲染图表
    //echarts图表   使用时在函数中通过this调用数组  同页面多个图表避免数组命名冲突
    //echarts图表   渲染图表的函数要在mounted中执行  在created中不生效

    export default {
        data(){
            return{
                iuser:'',
                ievent:'',
                currentPage:1,  //当前页码
                pagesize:10,    //每页显示多少数据
                all:10,          //当前搜索条件下总数据数量
                //表格里面的字段要对应table里面每一个el-table-column里面的prop属性
                tableData: [
                    {
                        time:'2021-04-30 10:11:05',
                        user:'admin',
                        ip: '192.168.1.111',
                        action: 'check',
                        obj:'存储空间',
                        log:'正常，使用率：70%'
                    },
                    {
                        time:'2021-04-30 10:11:05',
                        user:'admin',
                        ip: '192.168.1.111',
                        action: 'check',
                        obj:'存储空间',
                        log:'正常，使用率：70%'
                    },
                    {
                        time:'2021-04-30 10:11:05',
                        user:'admin',
                        ip: '192.168.1.111',
                        action: 'check',
                        obj:'存储空间',
                        log:'正常，使用率：70%'
                    },
                    {
                        time:'2021-04-30 10:11:05',
                        user:'admin',
                        ip: '192.168.1.111',
                        action: 'check',
                        obj:'存储空间',
                        log:'正常，使用率：70%'
                    }
                ]
            }
        },
        created(){
            this.search();
        },
        mounted(){
        },
        methods:{
            handleSizeChange(val) {
                this.pagesize=val;
                this.search();
            },

            handleCurrentChange(value) {
                this.currentPage = value;
                this.search();
            },
            //根据输入值进行搜索
            search(){
                this.$axios.get('/api/v1/logger/list',{
                    params:{
                        user:this.iuser,
                        action:this.ievent,
                        size: this.pagesize,
                        from: (this.currentPage - 1)
                    }
                }).then(
                    (res)=>{
                        let r = [];
                        res.data.hits.hits.forEach(item => {
                            let d = {};
                            // ;
                            // d.time = item._source.create_at;
                            d.time = (new Date(item._source.create_at)).toLocaleString('zh-cn', {'hour12': false });
                            d.user = item._source.user;
                            d.ip = item._source.ip;
                            d.action = item._source.action;
                            d.obj = item._source.object;
                            d.log = item._source.do_what;
                            r.push(d);
                        })

                        this.all = res.data.hits.total.value;
                        this.tableData=r;
                    }
                )
            },
        }
    }
</script>

<style scoped>
.container{
    width: 100%;
}
.condition{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.usertable{
    margin-bottom: 20px;
}
.span{
    width: 120px;
    color: #303133;
}
#in{
    width: fit-content;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
}

</style>
