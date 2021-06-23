<template>
    <el-card class="container">
        <div class="condition">
            <!-- 条件选择 -->
            <div class="but">
                <el-button type="primary" @click="visible1=true">添加策略</el-button>
            </div>
            <div class="search">
                <el-input
                    placeholder=" "
                    suffix-icon="el-icon-search"
                    v-model="s_collect"
                    @change="searchCollect"
                    style="width:150px">
                </el-input>
                <span class="none"></span>
                <el-button type="primary" @click="searchCollect">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
            </div>
            <!-- 设置添加策略弹出框 -->
            <el-dialog :visible.sync="visible1" center :width="addwidth" title="添加策略">
                <el-form :model="form1"  ref="form1">
                    <el-form-item label="探针" label-width="80px">
                        <el-select v-model="form1.aaa" placeholder="请选择" style="width:200px">
                            <el-option label="111" value="lrain"></el-option>
                            <el-option label="222" value="lrain2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审计目标"  label-width="80px">
                        <el-input v-model="form1.bbb" placeholder="目标ip地址" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="采集协议" label-width="80px">
                        <el-select multiple v-model="form1.ccc" style="width:200px" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采集方向" label-width="80px">
                        <el-select v-model="form1.ddd" placeholder="请选择" style="width:200px">
                            <el-option label="流入" value="in"></el-option>
                            <el-option label="流出" value="out"></el-option>
                            <el-option label="双向" value="both"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="端口"  label-width="80px">
                        <el-input v-model="form1.eee" placeholder="端口号：1-65536"  style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="策略" label-width="80px">
                        <el-select v-model="form1.fff" placeholder="请选择" style="width:200px">
                            <el-option label="默认（指定项不采集）" value="default"></el-option>
                            <el-option label="超过10个包后保存" value=">10"></el-option>
                            <el-option label="最多保存10个包" value="<10"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="unsubmit">取 消</el-button>
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
                    label="探针"
                    prop="aaa">
                    </el-table-column>
                    <el-table-column
                    label="审计目标"
                    prop="bbb">
                    </el-table-column>
                    <el-table-column
                    label="采集方向"
                    prop="ddd">
                    </el-table-column>
                    <el-table-column
                    label="端口"
                    prop="eee">
                    </el-table-column>
                    <el-table-column
                    label="策略"
                    prop="fff">
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
                s_collect:'',
                visible1:false,
                visible2:false,
                visible3:false,
                form1:{
                    aaa:'',
                    bbb: '',
                    ccc: '',
                    ddd:'',
                    eee:'',
                    fff:''
                },
                max_count:3,
                form2:{
                    aaa:'',
                    bbb: '',
                    ccc: '',
                    ddd:'',
                    eee:'',
                    fff:''
                },
                options: [{
                    // value: ['UDP','TCP','ICMP','TLS','SMTP','POP3','Telnet','SSH','FTP','HTTP'],
                    value:'all',
                    label: '所有'
                    }, {
                    value: 'tcp',
                    label: 'TCP'
                    }, {
                    value: 'udp',
                    label: 'UDP'
                    }, {
                    value: 'icmp',
                    label: 'ICMP'
                    }, {
                    value: 'tls',
                    label: 'TLS'
                    }, {
                    value: 'smtp',
                    label: 'SMTP'
                    }, {
                    value: 'pop3',
                    label: 'POP3'
                    }, {
                    value: 'telnet',
                    label: 'Telnet'
                    }, {
                    value: 'ssh',
                    label: 'SSH'
                    },{
                    value: 'ftp',
                    label: 'FTP'
                    }, {
                    value: 'http',
                    label: 'HTTP'
                }],
                value1: [],
                value2: [],
                addwidth:'340px',
                tableData: [{
                    aaa:'probe-1',
                    bbb: '192.168.1.111',
                    ccc: 'All',
                    ddd:'流入',
                    eee:'223',
                    fff:'默认策略'
                    }, {
                    aaa:'probe-3',
                    bbb: '192.168.1.111',
                    ccc: 'All',
                    ddd:'流出',
                    eee:'223',
                    fff:'默认策略'
                    }, {
                    aaa:'probe-8',
                    bbb: '192.168.1.111',
                    ccc: 'All',
                    ddd:'流入',
                    eee:'223',
                    fff:'默认策略'
                }, {
                    aaa:'probe-3',
                    bbb: '192.168.1.111',
                    ccc: 'All',
                    ddd:'流出',
                    eee:'223',
                    fff:'默认策略'
                    }, {
                    aaa:'probe-8',
                    bbb: '192.168.1.111',
                    ccc: 'All',
                    ddd:'流入',
                    eee:'223',
                    fff:'默认策略'
                }]
            }
        },
        created(){
            this.getList();
        },
        mounted(){

        },
        methods:{
            //获取全部数据
            getList(){
                this.$axios.get('/qqqqqqqqqq')
                .then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            //根据输入框的值进行搜索
            searchCollect(){
                this.$axios.get('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:this.s_collect
                    }
                }).then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            //取消操作同事重置字段为空
            unsubmit(){
                this.visible1=false;
                this.form1.aaa='';
                this.form1.bbb='';
                this.form1.ccc='';
                this.form1.ddd='';
                this.form1.eee='';
                this.form1.fff='';
            },
            submitAdd(){
                this.visible1=false;
                this.$axios.post('/qqqqqqqqqq',{
                    //填写实际传参字段和添加表单的对应字段
                    qqqqqqqqqq:this.form1.ccc,
                    // qqqqqqqqqq:this.form1.xx,
                    // qqqqqqqqqq:this.form1.xx,
                    // qqqqqqqqqq:this.form1.xx
                }).then(
                    (res)=>{
                        // this.getList();
                        console.log(res.data);
                        
                    }
                )
            },
            //删除当前行函数
            handleDelete(index, row){
                console.log(row.aaa);
                //删除时要传递的字段和值   值通过row.xx来拿到
                this.$axios.delete('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:row.aaa
                    }
                }).then(
                    (res)=>{
                        console.log('.');
                        
                    }
                )
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