<template>
    <el-card class="wrap">
        <div class="condition">
            <el-input
                    placeholder="源IP地址"
                    v-model="fromhost"
                    style="min-width:130px;max-width:150px;margin-right:10px;margin-bottom:12px">
            </el-input>
            <el-input
                    placeholder="目标IP地址"
                    v-model="tohost"
                    style="min-width:130px;max-width:150px;margin-right:10px;margin-bottom:12px">
            </el-input>
            <el-date-picker
                    v-model="timerange"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    style="max-width: 370px;;margin-right:10px;margin-bottom:12px">
            </el-date-picker>
            <el-select v-model="kindof" placeholder="事件类型" style="width:130px;margin-right:10px">
                <el-option label="清除选择" value=""></el-option>
                <el-option label="试图窃取信息" value="lrain"></el-option>
                <el-option label="尝试删除信息" value="lrain2"></el-option>
            </el-select>
            <el-button type="primary" style="height:36px" @click="getList">搜索</el-button>
        </div>
        <el-divider></el-divider>

        <div class="usertable">
            <template>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props" icon="el-icon-user">
                            <el-card>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="匹配 ID">
                                        <span>{{ props.row.id }}</span>
                                    </el-form-item>
                                    <el-form-item label="详细信息">
                                        <span>{{ props.row.detail }}</span>
                                    </el-form-item>
                                </el-form>
                            </el-card>
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
                            label="目标IP"
                            prop="toip">
                    </el-table-column>
                    <el-table-column
                            label="协议"
                            prop="protocol">
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
export default {
    name: 'warninglist',
    data() {
        return {
            fromhost: '',
            tohost: '',
            timerange: [((new Date()) - 3600000), (new Date() - 1)],   //时间选择器选择的时间
            kindof: '',
            start_time: '',
            end_time: '',
            currentPage: 1,  //当前页码
            pagesize: 10,    //每页显示多少数据
            all: 0,          //当前搜索条件下总数据数量
            tableData: [
                {
                    fromip: '192.168.1.122',
                    protocol: '8080',
                    toip: '175.132.2.124',
                    toport: '3003',
                    type: '试图窃取信息',
                    time: '2021-04-30 11:07',
                    id: '00000',
                    detail: 'ET COMPROMISED Known Compromised or Hostile Host Traffic group 23'
                },
                {
                    fromip: '192.168.1.122',
                    protocol: '8080',
                    toip: '175.132.2.124',
                    toport: '3003',
                    type: '试图窃取信息',
                    time: '2021-04-30 11:07',
                    id: '11111',
                    detail: 'ET COMPROMISED Known Compromised or Hostile Host Traffic group 23'
                },
                {
                    fromip: '192.168.1.122',
                    protocol: '8080',
                    toip: '175.132.2.124',
                    toport: '3003',
                    type: '试图窃取信息',
                    time: '2021-04-30 11:07',
                    id: '22222',
                    detail: 'ET COMPROMISED Known Compromised or Hostile Host Traffic group 23'
                },
                {
                    fromip: '192.168.1.122',
                    protocol: '8080',
                    toip: '175.132.2.124',
                    toport: '3003',
                    type: '试图窃取信息',
                    time: '2021-04-30 11:07',
                    id: '33333',
                    detail: 'ET COMPROMISED Known Compromised or Hostile Host Traffic group 23'
                },
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
            },
        }
    },
    created() {
        this.getList();//获取初始数据
    },
    mounted() {

    },
    methods: {
        formatTime(time, format) {
            var date = new Date(time);
            var formatter = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return formatter(date.getFullYear());
                        break;
                    case 'MM':
                        return formatter(date.getMonth() + 1);
                        break;
                    case 'mm':
                        return formatter(date.getMinutes());
                        break;
                    case 'dd':
                        return formatter(date.getDate());
                        break;
                    case 'HH':
                        return formatter(date.getHours());
                        break;
                    case 'ss':
                        return formatter(date.getSeconds());
                        break;
                }
            })
        },
        //每页显示数量变化时
        handleSizeChange(val) {
            this.pagesize = val;
            this.getList();
        },
        //改变当前页码时
        handleCurrentChange(value) {
            this.currentPage = value;
            this.getList();
        },
        // 页码或者每页显示数量变化时
        getList() {
            this.$axios.get('/api/v1/alert/list', {
                params: {
                    class: this.kindof,
                    src_ip: this.fromhost,
                    dst_ip: this.tohost,
                    start_time: this.timerange[0], //||
                    end_time: this.timerange[1], // ||
                    size: this.pagesize,
                    from: (this.currentPage - 1)
                }
            }).then(
                (res) => {
                    let r = [];
                    res.data.hits.hits.forEach( item => {
                        let d = {};
                        d.time = (new Date(item._source.timestamp)).toLocaleString('zh-cn', {'hour12': false });
                        d.fromip = item._source.srcIp; d.protocol = item._source.protocol.toString(); d.toip = item._source.dstIp ;
                        d.toport = item._source.dstPort; d.type = item._source.suricata.category;
                        d.id = item._source.suricata.signatureId; d.detail = item._source.suricata.signature;
                        r.push(d);
                    })
                    this.all = res.data.hits.total.value;
                    //console.dir(r[0].protocol);
                    this.tableData=r;
                }
            )
        },
        //开启关闭函数
        handleDelete(index, row) {
            console.log(' ');
        }
    }
}
</script>

<style>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}

.el-icon-arrow-right {
    font-weight: bolder;
    font-size: 16px;
    color: rgb(0, 153, 204);
}
</style>
<style scoped>
.none {
    height: 15px;
    width: 100%;
}

.wrap {
    width: 100%;
    margin: auto;
}

.condition {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.search {
    display: flex;
    flex-direction: row;
}

.count {
    margin-right: 20px;
}

.none {
    width: 10px;
}

@media screen and (min-width: 1920px) {
    .wrap {
        width: 94%;
        margin: auto;
    }
}

@media screen and (min-height: 800px) {
    .wrap {
        width: 94%;
        margin: auto;
    }
}
</style>
