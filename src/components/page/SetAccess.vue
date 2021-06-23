<template>
    <el-card class="container">
        <div class="condition">
            <div class="but">
                <el-button type="primary" @click="visible1=true">添加IP</el-button>
                <el-button type="success"  v-if="!isOn" @click="open">开启</el-button>
                <el-button type="danger"  v-if="isOn" @click="close">关闭</el-button>
            </div>
            <div class="search">
                <el-input
                    placeholder=" "
                    suffix-icon="el-icon-search"
                    v-model="s_access"
                    @change="searchAccess"
                    style="width:150px">
                </el-input>
                <span class="none"></span>
                <el-button type="primary" @click="searchAccess">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="getAccessList"></el-button>
            </div>
            <!-- 设置添加IP弹出框 -->
            <el-dialog :visible.sync="visible1" center :width="addwidth" title="添加IP">
                <el-form :model="form1"  ref="form1">
                        <el-form-item label="IP地址"  label-width="80px">
                            <el-input v-model="form1.ip" placeholder="ip地址" style="width:200px"></el-input>
                        </el-form-item>
                        <el-form-item label="访问行为"  label-width="80px">
                            <el-input  v-model="form1.action" placeholder="行为"  style="width:200px"></el-input>
                        </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="visible1=false">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">保 存</el-button>
                </div>
            </el-dialog>
        </div>

        <el-divider></el-divider>

        <div class="usertable">
            <template>
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                    label="IP"
                    prop="ip">
                    </el-table-column>
                    <el-table-column
                    label="访问行为"
                    prop="action">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </el-card>
</template>

<script>
    export default {
        data(){
            return{
                isOn:false,
                s_access:'',
                visible1:false,
                visible2:false,
                visible3:false,
                form1:{
                    ip:'',
                    action:''
                },
                max_count:3,
                addwidth:'340px',
                tableData: [{
                    ip: '192.168.1.111',
                    action: 'pass'
                    }, {
                    ip: '192.168.1.111',
                    action: 'pass'
                    }, {
                    ip: '192.168.1.111',
                    action: 'pass'
                    }, {
                    ip: '192.168.1.111',
                    action: 'pass'
                }]
            }
        },
        created(){
            this.getAccessList();
        },
        mounted(){

        },
        methods:{
            //开启
            open(){
                this.isOn=true;
                this.$axios.post('/qqqqqqqqqq',{
                        qqqqqqqqqq:this.isOn
                }).then((res)=>{
                    console.log('jj');
                })
            },
            //关闭
            close(){
                this.isOn=false;
                this.$axios.post('/qqqqqqqqqq',{
                        qqqqqqqqqq:this.isOn
                }).then((res)=>{
                    console.log('jj');
                })
            },
            getAccessList(){
                this.$axios.get('/qqqqqqqqqq').then((res)=>{
                    console.log('jj');
                })
            },
            //根据输入值进行搜索
            searchAccess(){
                this.$axios.get('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:this.s_access
                    }
                })
                .then((res) => {
                    this.tableData=res.data;
                })
            },
            //添加新数据
            submitAdd(){
                this.visible1=false;
                this.$axios.post('/qqqqqqqqqq',{
                    qqqqqqqqqq:this.form1.ip,
                    qqqqqqqqqq:this.form1.action
                })
                .then((res) => {
                    this.getAccessList();
                    console.log(res.status);
                })
            },
            //开启关闭函数
            handleDelete(index, row){
                console.log(' ');
            }
        }
    }
</script>

<style scoped>
.container{
    width: 90%;
}
.condition{
    display: flex;
    justify-content: space-between;
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