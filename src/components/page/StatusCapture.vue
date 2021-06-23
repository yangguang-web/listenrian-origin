<template>
    <el-card class="capture">
        <div class="capture-header">
            <div class="capture-title">
                <i class="bi bi-compass-fill" style="padding-left:5px;"></i>
                探针状态
            </div>
            <div class="capture-action">
                <span><el-input v-model="input" suffix-icon="el-icon-search" style="width:200px" @change="search"></el-input></span>
                <span><el-button type="primary" @click="search">搜索</el-button></span>
                <span><el-button type="primary">Excel</el-button></span>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="capture-table">
            <el-table
            :data="tableData"
            stripe
            border
            round
            header-row-class-name
            style="width: 100%">
                <el-table-column
                prop="a"
                label="节点"
                sortable
                min-width="65"
                resizable>
                </el-table-column>
                <el-table-column
                prop="b"
                sortable
                min-width="130"
                label="节点时间"
                resizable>
                </el-table-column>
                <el-table-column
                prop="c" 
                sortable
                resizable
                label="流量(KB)">
                </el-table-column>
                <el-table-column
                prop="d"
                sortable
                resizable
                label="总会话">
                </el-table-column>
                <!-- <el-table-column
                prop="e"
                sortable
                resizable
                label="总字节">
                </el-table-column> -->
                <el-table-column
                prop="f"
                sortable
                resizable
                label="硬盘余量">
                </el-table-column>
                <el-table-column
                prop="g"
                sortable
                resizable
                label="CPU占用">
                </el-table-column>
                <el-table-column
                prop="h"
                sortable
                resizable
                label="内存余量">
                </el-table-column>
                <el-table-column sortable label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">
                        <i class="el-icon-time" style="margin-right:5px;"></i>同步
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            input:'',
            tableData:[
                {
                    a:'111',b:'2021-04-14 08:53',c:'333',
                    d:'444',e:'555',f:'333',g:'555',h:'444'
                },{
                    a:'222',b:'2021-04-14 08:53',c:'777',
                    d:'111',e:'666',f:'444',g:'222',h:'444'
                },{
                    a:'123',b:'2021-04-14 08:53',c:'333',
                    d:'369',e:'345',f:'076',g:'732',h:'385'
                },{
                    a:'433',b:'2021-04-14 08:53',c:'370',
                    d:'246',e:'093',f:'528',g:'852',h:'336'
                },{
                    a:'222',b:'2021-04-14 08:53',c:'777',
                    d:'111',e:'666',f:'444',g:'222',h:'444'
                },{
                    a:'123',b:'2021-04-14 08:53',c:'333',
                    d:'369',e:'345',f:'076',g:'732',h:'385'
                },{
                    a:'433',b:'2021-04-14 08:53',c:'370',
                    d:'246',e:'093',f:'528',g:'852',h:'336'
                },{
                    a:'222',b:'2021-04-14 08:53',c:'777',
                    d:'111',e:'666',f:'444',g:'222',h:'444'
                },{
                    a:'123',b:'2021-04-14 08:53',c:'333',
                    d:'369',e:'345',f:'076',g:'732',h:'385'
                },{
                    a:'433',b:'2021-04-14 08:53',c:'370',
                    d:'246',e:'093',f:'528',g:'852',h:'336'
                },{
                    a:'222',b:'2021-04-14 08:53',c:'777',
                    d:'111',e:'666',f:'444',g:'222',h:'444'
                },{
                    a:'123',b:'2021-04-14 08:53',c:'333',
                    d:'369',e:'345',f:'076',g:'732',h:'385'
                },{
                    a:'433',b:'2021-04-14 08:53',c:'370',
                    d:'246',e:'093',f:'528',g:'852',h:'336'
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
        getList(){
            this.$axios.get('/qqqqqqqqqq')
            .then(
                (res)=>{
                    this.tableData=res.data.qqqqqqqqqq;
                }
            )
        },
        //根据输入的值进行搜索
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
        },
        //同步时钟
        handleEdit(index,row){
            // row.cpu  row.name
            this.$axios.get('/qqqqqqqqqq',{
                params:{
                    qqqqqqqqqq:row.qqqqqqqqqq
                }
            }).then(
                (res)=>{
                    console.log('.');
                    
                }
            )
        },
    }
}
</script>

<style scoped>
.capture{
    width: 100%;
    margin: auto;
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
/* span:first-child{
    margin-right: 10px;
} */
span:not(:last-child){
    margin-right: 10px;
}
.capture-table{
    font-weight: normal;
}
</style>